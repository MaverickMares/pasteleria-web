import { Link } from "react-router-dom";
import { useConfig } from "../context/ConfigContext";

const PLACEHOLDER = "https://placehold.co/600x450/ffe0eb/c2185b?text=🎂";

export default function CardProducto({ producto }) {
  const { config } = useConfig();
  const whatsapp = config?.numero_whatsapp?.replace(/\D/g, "") || "34638982368";

  const urlWhatsApp = `https://wa.me/${whatsapp}?text=Hola!%20Me%20interesa%20${encodeURIComponent(producto.nombre)}%20%E2%80%94%20%C2%BFme%20puedes%20dar%20m%C3%A1s%20informaci%C3%B3n%3F`;

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-400 overflow-hidden hover:-translate-y-1.5 flex flex-col">
      {/* Foto con zoom al hover */}
      <Link to={`/producto/${producto.id}`} className="block relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={producto.imagen || PLACEHOLDER}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        {/* Overlay sutil al hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges sobre la imagen */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {producto.destacado && (
            <span className="bg-rosa-400 text-white text-xs font-lato font-semibold px-2.5 py-1 rounded-full shadow-sm">
              ✨ Destacado
            </span>
          )}
          {producto.categoria_nombre && (
            <span className="ml-auto bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-lato px-2.5 py-1 rounded-full shadow-sm">
              {producto.categoria_nombre}
            </span>
          )}
        </div>

        {/* CTA "Ver detalle" visible al hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="bg-white/95 backdrop-blur-sm text-gray-800 font-lato font-semibold text-sm px-5 py-2 rounded-full shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Ver detalle →
          </span>
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/producto/${producto.id}`} className="block mb-2">
          <h3 className="font-playfair text-gray-800 text-lg font-semibold leading-snug hover:text-rosa-500 transition-colors duration-200 line-clamp-2">
            {producto.nombre}
          </h3>
        </Link>

        {producto.descripcion && (
          <p className="font-lato text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {producto.descripcion}
          </p>
        )}

        {/* Precio y botón */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <p className="font-playfair text-2xl font-bold text-rosa-500">
              {parseFloat(producto.precio).toFixed(2)} €
            </p>
          </div>
          <a
            href={urlWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 bg-rosa-400 hover:bg-rosa-500 text-white text-xs font-lato font-semibold py-2 px-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            title="Pedir por WhatsApp"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir
          </a>
        </div>
      </div>
    </article>
  );
}
