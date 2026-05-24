import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

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

export default function Categorias() {
  const { data: categorias, cargando } = useApi("/categorias/");

  if (cargando) {
    return (
      <section id="categorias" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-36 bg-rosa-50 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categorias" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="seccion-titulo">Nuestras Delicias</h2>
          <p className="seccion-subtitulo">Explora todas nuestras creaciones</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {categorias?.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalogo?categoria=${cat.id}`}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-rosa-100 bg-white hover:border-rosa-300 hover:bg-rosa-50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-center"
            >
              {cat.imagen ? (
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-14 h-14 object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {getEmoji(cat.nombre)}
                </span>
              )}
              <div>
                <p className="font-playfair text-gray-800 font-semibold text-base leading-tight">
                  {cat.nombre}
                </p>
                {cat.descripcion && (
                  <p className="text-gray-400 text-xs mt-1 font-lato line-clamp-2 hidden md:block">
                    {cat.descripcion}
                  </p>
                )}
              </div>
            </Link>
          ))}

          {/* Card "Ver todo" */}
          <Link
            to="/catalogo"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-dashed border-rosa-200 hover:border-rosa-400 hover:bg-rosa-50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-center"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🎀</span>
            <p className="font-playfair text-gray-700 font-semibold text-base">Ver todo</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
