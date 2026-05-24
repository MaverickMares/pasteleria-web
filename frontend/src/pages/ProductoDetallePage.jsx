import { useParams, Link, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useConfig } from "../context/ConfigContext";
import GaleriaFotos from "../components/GaleriaFotos";
import ProductosRelacionados from "../components/ProductosRelacionados";

export default function ProductoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { config } = useConfig();
  const { data: producto, cargando, error } = useApi(`/productos/${id}/`);

  const whatsapp = config?.numero_whatsapp?.replace(/\D/g, "") || "34638982368";
  const urlWhatsApp = producto
    ? `https://wa.me/${whatsapp}?text=Hola!%20Me%20interesa%20${encodeURIComponent(producto.nombre)}%20%E2%80%94%20%C2%BFme%20puedes%20dar%20m%C3%A1s%20informaci%C3%B3n%3F`
    : "#";

  // Estado de carga
  if (cargando) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-[4/3] bg-rosa-100 rounded-2xl" />
          <div className="space-y-4 pt-4">
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-rosa-100 rounded w-1/4" />
            <div className="space-y-2 pt-4">
              <div className="h-3 bg-gray-100 rounded" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/6" />
            </div>
            <div className="h-12 bg-rosa-200 rounded-full w-full mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-6xl mb-4">🍰</p>
        <h2 className="font-playfair text-2xl text-gray-700 mb-2">Producto no encontrado</h2>
        <p className="font-lato text-gray-500 mb-8">
          Este producto no está disponible o fue retirado del catálogo.
        </p>
        <Link to="/catalogo" className="btn-rosa">
          Ver catálogo completo
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-crema min-h-screen">
      {/* Migas de pan */}
      <div className="bg-white border-b border-rosa-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-xs font-lato text-gray-400">
            <Link to="/" className="hover:text-rosa-400 transition-colors">Inicio</Link>
            <span>›</span>
            <Link to="/catalogo" className="hover:text-rosa-400 transition-colors">Catálogo</Link>
            {producto.categoria_nombre && (
              <>
                <span>›</span>
                <Link
                  to={`/catalogo?categoria=${producto.categoria}`}
                  className="hover:text-rosa-400 transition-colors"
                >
                  {producto.categoria_nombre}
                </Link>
              </>
            )}
            <span>›</span>
            <span className="text-gray-600 truncate max-w-[160px]">{producto.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ─── Galería ─── */}
          <div className="animate-fade-in">
            <GaleriaFotos
              imagenPrincipal={producto.imagen}
              galeria={producto.galeria || []}
            />
          </div>

          {/* ─── Información del producto ─── */}
          <div className="animate-slide-up py-2">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {producto.destacado && (
                <span className="inline-flex items-center gap-1 bg-rosa-400 text-white text-xs font-lato font-semibold px-3 py-1 rounded-full">
                  ✨ Destacado
                </span>
              )}
              {producto.categoria_nombre && (
                <Link
                  to={`/catalogo?categoria=${producto.categoria}`}
                  className="inline-flex items-center gap-1 bg-beige-100 text-gray-600 text-xs font-lato px-3 py-1 rounded-full hover:bg-rosa-50 hover:text-rosa-500 transition-colors border border-beige-300"
                >
                  {producto.categoria_nombre}
                </Link>
              )}
            </div>

            {/* Nombre */}
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
              {producto.nombre}
            </h1>

            {/* Precio */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-lato text-xs text-gray-400 uppercase tracking-wider">Desde</span>
              <span className="font-playfair text-4xl font-bold text-rosa-500">
                {parseFloat(producto.precio).toFixed(2)} €
              </span>
            </div>

            {/* Separador decorativo */}
            <div className="w-16 h-0.5 bg-rosa-200 mb-6" />

            {/* Descripción */}
            {producto.descripcion && (
              <p className="font-lato text-gray-600 leading-relaxed text-base mb-8">
                {producto.descripcion}
              </p>
            )}

            {/* CTA WhatsApp */}
            <a
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-rosa-400 hover:bg-rosa-500 text-white font-lato font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-base mb-3"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hacer pedido por WhatsApp
            </a>

            {/* Volver al catálogo */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-500 hover:border-rosa-300 hover:text-rosa-400 font-lato font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-sm"
            >
              ← Volver al catálogo
            </button>

            {/* Nota de pedido */}
            <p className="text-center text-xs text-gray-400 font-lato mt-4 leading-relaxed">
              Los pedidos se gestionan por WhatsApp. Te respondemos en breve.
            </p>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <ProductosRelacionados
        categoriaId={producto.categoria}
        productoActualId={producto.id}
      />
    </div>
  );
}
