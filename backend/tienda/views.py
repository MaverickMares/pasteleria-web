from rest_framework import viewsets
from .models import Categoria, Producto, Configuracion
from .serializers import (
    CategoriaSerializer,
    ProductoSerializer,
    ProductoDetalleSerializer,
    ConfiguracionSerializer,
)


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductoDetalleSerializer
        return ProductoSerializer

    def get_queryset(self):
        queryset = Producto.objects.filter(disponible=True)
        if self.action == "retrieve":
            queryset = queryset.prefetch_related("galeria")
        categoria_id = self.request.query_params.get("categoria")
        if categoria_id:
            queryset = queryset.filter(categoria_id=categoria_id)
        return queryset


class ConfiguracionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Configuracion.objects.all()
    serializer_class = ConfiguracionSerializer
