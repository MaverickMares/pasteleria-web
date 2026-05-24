import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import CardProducto from "../components/CardProducto";

const POR_PAGINA = 9;

const EMOJIS = {
  tartas: "🎂", tortas: "🎂", cafetería: "☕", cafeteria: "☕",
  postres: "🍮", celebraciones: "🎉", cupcakes: "🧁", galletas: "🍪",
};
function getEmoji(nombre) {
  const key = nombre.toLowerCase();
  for (const [k, v] of Object.entries(EMOJIS)) {
    if (key.includes(k)) return v;
  }
  return "🍰";
}

export default function CatalogoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagina, setPagina] = useState(1);

  const categoriaParam = searchParams.get("categoria");
  const categoriaActiva = categoriaParam ? parseInt(categoriaParam) : null;

  const { data: categorias } = useApi("/categorias/");
  const { data: productos, cargando } = useApi(
    categoriaActiva ? `/productos/?categoria=${categoriaActiva}` : "/productos/"
  );

  // Volver a página 1 al cambiar categoría
  useEffect(() => {
    setPagina(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoriaActiva]);

  const total = productos?.length || 0;
  const totalPaginas = Math.ceil(total / POR_PAGINA);
  const inicio = (pagina - 1) * POR_PAGINA;
  const productosEnPagina = productos?.slice(inicio, inicio + POR_PAGINA) || [];

  function seleccionarCategoria(id) {
    const params = new URLSearchParams(searchParams);
    if (id === null) {
      params.delete("categoria");
    } else {
      params.set("categoria", id);
    }
    setSearchParams(params);
  }

  function cambiarPagina(nueva) {
    setPagina(nueva);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const nombreCatActiva = categorias?.find((c) => c.id === categoriaActiva)?.nombre;

  return (
    <div className="min-h-screen bg-crema">
      {/* Cabecera de página */}
      <div
        className="bg-white border-b border-rosa-100 py-10 px-4"
        style={{ background: "linear-gradient(135deg, #fff0f5 0%, #fefaf6 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="font-lato text-rosa-400 tracking-widest uppercase text-xs mb-2">
            Melani's Sweet Creations
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-2">
            {nombreCatActiva ?? "Catálogo completo"}
          </h1>
          <p className="font-lato text-gray-500 text-base">
            {total > 0 ? `${total} creacion${total === 1 ? "" : "es"} artesanales` : ""}
          </p>
        </div>
      </div>

      {/* Barra de filtros sticky */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-rosa-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            <button
              onClick={() => seleccionarCategoria(null)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-lato font-semibold transition-all duration-200 border ${
                categoriaActiva === null
                  ? "bg-rosa-400 text-white border-rosa-400 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-rosa-300 hover:text-rosa-400"
              }`}
            >
              <span>🎀</span> Todos
            </button>
            {categorias?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => seleccionarCategoria(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-lato font-semibold transition-all duration-200 border ${
                  categoriaActiva === cat.id
                    ? "bg-rosa-400 text-white border-rosa-400 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-rosa-300 hover:text-rosa-400"
                }`}
              >
                <span>{getEmoji(cat.nombre)}</span> {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {cargando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-64 bg-rosa-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-8 bg-rosa-100 rounded-full w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : productosEnPagina.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <p className="font-playfair text-xl text-gray-600">Sin productos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosEnPagina.map((producto, idx) => (
              <div
                key={producto.id}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <CardProducto producto={producto} />
              </div>
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => cambiarPagina(pagina - 1)}
              disabled={pagina === 1}
              className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-lato font-semibold text-gray-600 hover:border-rosa-300 hover:text-rosa-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              ← Anterior
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => cambiarPagina(num)}
                  className={`w-9 h-9 rounded-full text-sm font-lato font-semibold transition-all duration-200 ${
                    num === pagina
                      ? "bg-rosa-400 text-white shadow-sm"
                      : "text-gray-500 hover:bg-rosa-50 hover:text-rosa-400"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => cambiarPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
              className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-lato font-semibold text-gray-600 hover:border-rosa-300 hover:text-rosa-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* Texto de página */}
        {totalPaginas > 1 && (
          <p className="text-center text-xs text-gray-400 font-lato mt-3">
            Página {pagina} de {totalPaginas} · {total} productos
          </p>
        )}
      </div>
    </div>
  );
}
