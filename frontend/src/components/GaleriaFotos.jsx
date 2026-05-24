import { useState } from "react";

const PLACEHOLDER = "https://placehold.co/800x600/ffe0eb/c2185b?text=🎂";

export default function GaleriaFotos({ imagenPrincipal, galeria = [] }) {
  // Construimos la lista completa: imagen principal + extras de galería
  const todasLasFotos = [
    { id: "principal", url: imagenPrincipal || PLACEHOLDER },
    ...galeria.map((g) => ({ id: g.id, url: g.imagen || PLACEHOLDER })),
  ];

  const [fotoActiva, setFotoActiva] = useState(0);
  const [zoom, setZoom] = useState(false);

  const hayMiniaturas = todasLasFotos.length > 1;

  return (
    <div className="flex flex-col gap-3">
      {/* Foto principal */}
      <div
        className="relative overflow-hidden rounded-2xl bg-rosa-50 shadow-md"
        style={{ aspectRatio: "4/3" }}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <img
          src={todasLasFotos[fotoActiva].url}
          alt="Foto del producto"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            zoom ? "scale-110" : "scale-100"
          }`}
          onError={(e) => {
            e.target.src = PLACEHOLDER;
          }}
        />

        {/* Navegación por flechas (solo si hay varias fotos) */}
        {hayMiniaturas && (
          <>
            <button
              onClick={() => setFotoActiva((f) => (f - 1 + todasLasFotos.length) % todasLasFotos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-rosa-400 transition-all duration-200 backdrop-blur-sm"
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              onClick={() => setFotoActiva((f) => (f + 1) % todasLasFotos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-rosa-400 transition-all duration-200 backdrop-blur-sm"
              aria-label="Foto siguiente"
            >
              ›
            </button>

            {/* Indicador de posición */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {todasLasFotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFotoActiva(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === fotoActiva ? "bg-white w-4" : "bg-white/60 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Miniaturas (solo si hay más de una foto) */}
      {hayMiniaturas && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {todasLasFotos.map((foto, i) => (
            <button
              key={foto.id}
              onClick={() => setFotoActiva(i)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === fotoActiva
                  ? "border-rosa-400 shadow-md opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90 hover:border-rosa-200"
              }`}
            >
              <img
                src={foto.url}
                alt={`Miniatura ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = PLACEHOLDER; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
