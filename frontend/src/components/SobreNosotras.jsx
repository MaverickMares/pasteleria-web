import { useConfig } from "../context/ConfigContext";

export default function SobreNosotras() {
  const { config } = useConfig();
  const descripcion = config?.descripcion ||
    "Cafetería · postres · celebraciones. Especialistas en tartas de cumpleaños y eventos pequeños con mucho amor y creatividad.";

  const valores = [
    { emoji: "🌸", titulo: "Artesanal", texto: "Cada pieza hecha a mano con dedicación y esmero." },
    { emoji: "🥚", titulo: "Ingredientes frescos", texto: "Usamos solo los mejores insumos locales y naturales." },
    { emoji: "💝", titulo: "Con amor", texto: "Ponemos el corazón en cada creación para ti." },
  ];

  return (
    <section id="nosotras" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div className="animate-fade-in">
            <p className="font-lato text-rosa-400 tracking-widest uppercase text-sm mb-3">
              Nuestra historia
            </p>
            <h2 className="seccion-titulo text-left mb-5">Sobre Nosotras</h2>
            <p className="font-lato text-gray-600 leading-relaxed text-lg mb-8">
              {descripcion}
            </p>

            <div className="space-y-4">
              {valores.map((v) => (
                <div key={v.titulo} className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{v.emoji}</span>
                  <div>
                    <p className="font-playfair font-semibold text-gray-800">{v.titulo}</p>
                    <p className="font-lato text-gray-500 text-sm">{v.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen / decoración visual */}
          <div className="relative h-80 md:h-auto">
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl"
              style={{
                background: "linear-gradient(135deg, #ffe0eb 0%, #fdf8f0 50%, #ffb3cc 100%)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8">
                <span className="text-8xl">🎂</span>
                <p className="font-playfair text-2xl font-semibold text-rosa-600 italic">
                  &ldquo;La pastelería es el arte de hacer feliz a la gente.&rdquo;
                </p>
                <div className="flex gap-6 mt-4">
                  <div className="text-center">
                    <p className="font-playfair text-3xl font-bold text-rosa-400">+500</p>
                    <p className="font-lato text-xs text-gray-500">Clientes felices</p>
                  </div>
                  <div className="w-px bg-rosa-200" />
                  <div className="text-center">
                    <p className="font-playfair text-3xl font-bold text-rosa-400">10+</p>
                    <p className="font-lato text-xs text-gray-500">Años de amor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
