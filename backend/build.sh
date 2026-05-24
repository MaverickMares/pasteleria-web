#!/usr/bin/env bash
# Script de build para Railway / Render

set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Cargar datos iniciales solo si no existen
python manage.py loaddata tienda/fixtures/datos_iniciales.json || true
