#!/bin/bash
set -e

python manage.py migrate --no-input
python manage.py loaddata tienda/fixtures/datos_iniciales.json || true
exec gunicorn config.wsgi:application --bind "0.0.0.0:${PORT:-8000}" --workers 2 --timeout 120
