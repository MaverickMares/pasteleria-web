from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet, ConfiguracionViewSet

router = DefaultRouter()
router.register(r"categorias", CategoriaViewSet)
router.register(r"productos", ProductoViewSet, basename="producto")
router.register(r"configuracion", ConfiguracionViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
