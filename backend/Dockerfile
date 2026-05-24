FROM python:3.12-slim

# Dependencias del sistema para psycopg2 (PostgreSQL)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instalar dependencias Python primero (mejor uso del cache de capas)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del proyecto
COPY . .

# Recopilar archivos estáticos en tiempo de build
# SECRET_KEY ficticia solo para este paso — se sobreescribe con la real en Railway
ENV SECRET_KEY=django-build-dummy-key-not-used-in-production \
    DEBUG=False \
    DATABASE_URL=sqlite:///tmp/build.sqlite3
RUN python manage.py collectstatic --no-input

EXPOSE 8000

# El entrypoint aplica migraciones y arranca gunicorn
ENTRYPOINT ["./entrypoint.sh"]
