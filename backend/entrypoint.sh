#!/bin/bash
set -e

echo "▶ Aplicando migraciones..."
python manage.py migrate --no-input

echo "▶ Cargando datos iniciales si la base de datos está vacía..."
python manage.py shell -c "
from tienda.models import Categoria
if not Categoria.objects.exists():
    from django.core.management import call_command
    call_command('loaddata', 'tienda/fixtures/datos_iniciales.json')
    print('  ✓ Datos iniciales cargados')
else:
    print('  ✓ Base de datos ya contiene datos, omitiendo fixtures')
"

echo "▶ Arrancando Gunicorn en puerto ${PORT:-8000}..."
exec gunicorn config.wsgi:application \
    --bind "0.0.0.0:${PORT:-8000}" \
    --workers 2 \
    --timeout 120 \
    --log-level info
