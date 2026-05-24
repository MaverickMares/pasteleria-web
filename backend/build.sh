#!/usr/bin/env bash
# Script de build para Railway / Render
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Cargar datos iniciales solo si la base de datos está vacía
python manage.py shell -c "
from tienda.models import Categoria
if not Categoria.objects.exists():
    from django.core.management import call_command
    call_command('loaddata', 'tienda/fixtures/datos_iniciales.json')
    print('✓ Datos iniciales cargados')
else:
    print('✓ Base de datos ya tiene datos, omitiendo fixtures')
"
