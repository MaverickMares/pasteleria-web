from django.contrib import admin
from .models import Categoria, Producto, ImagenGaleria, Configuracion


class ImagenGaleriaInline(admin.TabularInline):
    model = ImagenGaleria
    extra = 2
    fields = ("imagen", "orden")


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")
    search_fields = ("nombre",)


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "categoria", "precio", "disponible", "destacado", "creado")
    list_filter = ("categoria", "disponible", "destacado")
    search_fields = ("nombre", "descripcion")
    list_editable = ("disponible", "destacado", "precio")
    list_per_page = 20
    inlines = [ImagenGaleriaInline]


@admin.register(Configuracion)
class ConfiguracionAdmin(admin.ModelAdmin):
    list_display = ("nombre_pasteleria", "numero_whatsapp", "instagram", "facebook")

    def has_add_permission(self, request):
        return not Configuracion.objects.exists()
