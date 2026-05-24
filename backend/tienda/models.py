from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre")
    descripcion = models.TextField(blank=True, verbose_name="Descripción")
    imagen = models.ImageField(upload_to="categorias/", blank=True, null=True, verbose_name="Imagen")

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=200, verbose_name="Nombre")
    descripcion = models.TextField(blank=True, verbose_name="Descripción")
    precio = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Precio (€)")
    imagen = models.ImageField(upload_to="productos/", blank=True, null=True, verbose_name="Imagen principal")
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="productos",
        verbose_name="Categoría",
    )
    disponible = models.BooleanField(default=True, verbose_name="Disponible")
    destacado = models.BooleanField(default=False, verbose_name="Destacado")
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ["-destacado", "nombre"]

    def __str__(self):
        return self.nombre


class ImagenGaleria(models.Model):
    """Imágenes adicionales de galería para un producto."""
    producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE,
        related_name="galeria",
        verbose_name="Producto",
    )
    imagen = models.ImageField(upload_to="productos/galeria/", verbose_name="Imagen")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden")

    class Meta:
        verbose_name = "Imagen de Galería"
        verbose_name_plural = "Imágenes de Galería"
        ordering = ["orden"]

    def __str__(self):
        return f"Foto {self.orden + 1} — {self.producto.nombre}"


class Configuracion(models.Model):
    nombre_pasteleria = models.CharField(max_length=200, verbose_name="Nombre de la Pastelería")
    numero_whatsapp = models.CharField(max_length=20, verbose_name="Número de WhatsApp")
    instagram = models.CharField(max_length=100, blank=True, verbose_name="Instagram (@usuario)")
    facebook = models.CharField(max_length=200, blank=True, verbose_name="Facebook (/usuario)")
    direccion = models.TextField(blank=True, verbose_name="Dirección")
    descripcion = models.TextField(blank=True, verbose_name="Descripción / Sobre Nosotros")
    logo = models.ImageField(upload_to="config/", blank=True, null=True, verbose_name="Logo")

    class Meta:
        verbose_name = "Configuración"
        verbose_name_plural = "Configuración"
        ordering = ["pk"]

    def __str__(self):
        return self.nombre_pasteleria

    def save(self, *args, **kwargs):
        # Solo permite un registro de configuración (singleton)
        self.pk = 1
        super().save(*args, **kwargs)
