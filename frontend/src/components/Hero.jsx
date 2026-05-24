import { Link } from "react-router-dom";
import { useConfig } from "../context/ConfigContext";

export default function Hero() {
  const { config } = useConfig();
  const whatsapp = config?.numero_whatsapp?.replace(/\D/g, "") || "34638982368";

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fff0f5 0%, #fdf8f0 50%, #ffe0eb 100%)",
      }}
    >
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-rosa-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-beige-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rosa-50 rounded-full mix-blend-multiply filter blur-2xl opacity-40" />

      {/* Contenido central */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 animate-fade-in">
        {/* Ícono decorativo */}
        <div className="text-6xl mb-6 animate-slide-up">🎂</div>

        <p className="font-lato text-rosa-400 tracking-[0.3em] uppercase text-sm mb-4 animate-slide-up">
          Tartas artesanas &amp; dulces creativos
        </p>

        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-gray-800 leading-tight mb-6 animate-slide-up">
          Cada tarta,
          <span className="text-rosa-400 italic"> una historia</span>
          <br /> dulce
        </h1>

        <p className="font-lato text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto animate-slide-up">
          Cafetería · postres · celebraciones. Especialistas en tartas de cumpleaños
          y eventos pequeños con mucho amor y creatividad.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link to="/catalogo" className="btn-rosa text-base px-8 py-4">
            Ver catálogo
          </Link>
          <a
            href={`https://wa.me/${whatsapp}?text=Hola!%20Quisiera%20hacer%20un%20pedido%20especial.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-rosa text-base px-8 py-4"
          >
            Hacer un pedido
          </a>
        </div>

        {/* Indicadores de confianza */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-center animate-fade-in">
          {[
            { numero: "+500", texto: "Pedidos felices" },
            { numero: "10+", texto: "Años de experiencia" },
            { numero: "100%", texto: "Ingredientes frescos" },
          ].map((stat) => (
            <div key={stat.texto}>
              <p className="font-playfair text-3xl font-bold text-rosa-400">{stat.numero}</p>
              <p className="font-lato text-sm text-gray-500 mt-1">{stat.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ola decorativa al fondo */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 74.7C120 69.3 240 58.7 360 53.3C480 48 600 48 720 53.3C840 58.7 960 69.3 1080 69.3C1200 69.3 1320 58.7 1380 53.3L1440 48V80H0Z" fill="#fefaf6"/>
        </svg>
      </div>
    </section>
  );
}
