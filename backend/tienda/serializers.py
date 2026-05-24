from rest_framework import serializers
from .models import Categoria, Producto, ImagenGaleria, Configuracion


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nombre", "descripcion", "imagen"]


class ImagenGaleriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenGaleria
        fields = ["id", "imagen", "orden"]


class ProductoSerializer(serializers.ModelSerializer):
    """Serializer para listados — sin galería para mantener respuestas ligeras."""
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)

    class Meta:
        model = Producto
        fields = [
            "id", "nombre", "descripcion", "precio", "imagen",
            "categoria", "categoria_nombre", "disponible", "destacado",
        ]


class ProductoDetalleSerializer(serializers.ModelSerializer):
    """Serializer para la vista de detalle — incluye galería de imágenes."""
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)
    galeria = ImagenGaleriaSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = [
            "id", "nombre", "descripcion", "precio", "imagen",
            "categoria", "categoria_nombre", "disponible", "destacado",
            "galeria",
        ]


class ConfiguracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuracion
        fields = [
            "id", "nombre_pasteleria", "numero_whatsapp",
            "instagram", "facebook", "direccion", "descripcion", "logo",
        ]
