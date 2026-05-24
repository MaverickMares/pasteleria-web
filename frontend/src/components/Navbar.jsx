import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useConfig } from "../context/ConfigContext";

export default function Navbar() {
  const { config } = useConfig();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const nombre = config?.nombre_pasteleria || "Melani's Sweet Creations";
  const whatsapp = config?.numero_whatsapp?.replace(/\D/g, "") || "34638982368";
  const instagram = config?.instagram || "@melani_cabrelles";
  const facebook = config?.facebook || "";

  // Anchors solo funcionan bien desde la home; desde otras rutas navegamos a /
  const homeHref = (hash) => (location.pathname === "/" ? hash : `/${hash}`);

  const enlaces = [
    { label: "Inicio", href: homeHref("#inicio"), interno: location.pathname !== "/" },
    { label: "Catálogo", href: "/catalogo", router: true },
    { label: "Nosotras", href: homeHref("#nosotras"), interno: location.pathname !== "/" },
    { label: "Contacto", href: homeHref("#contacto"), interno: location.pathname !== "/" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b border-rosa-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo / Nombre */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🎂</span>
            <span className="font-playfair text-lg font-semibold text-rosa-500 leading-tight">
              {nombre}
            </span>
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center gap-6">
            {enlaces.map((e) =>
              e.router ? (
                <NavLink
                  key={e.href}
                  to={e.href}
                  className={({ isActive }) =>
                    `font-lato text-sm transition-colors duration-200 ${
                      isActive ? "text-rosa-400 font-semibold" : "text-gray-600 hover:text-rosa-400"
                    }`
                  }
                >
                  {e.label}
                </NavLink>
              ) : (
                <a
                  key={e.href}
                  href={e.href}
                  className="font-lato text-sm text-gray-600 hover:text-rosa-400 transition-colors duration-200"
                >
                  {e.label}
                </a>
              )
            )}
          </div>

          {/* Redes sociales + CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://instagram.com/${instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-rosa-400 transition-colors"
              title="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {facebook && (
              <a
                href={`https://facebook.com${facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rosa-400 transition-colors"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            <a
              href={`https://wa.me/${whatsapp}?text=Hola!%20Me%20gustaría%20hacer%20un%20pedido.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rosa text-sm py-2 px-4"
            >
              Pedir ahora
            </a>
          </div>

          {/* Hamburguesa mobile */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-rosa-400 hover:bg-rosa-50 transition-colors"
          >
            {menuAbierto ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menú mobile */}
        {menuAbierto && (
          <div className="md:hidden py-4 border-t border-rosa-100 animate-fade-in">
            <div className="flex flex-col gap-1">
              {enlaces.map((e) =>
                e.router ? (
                  <NavLink
                    key={e.href}
                    to={e.href}
                    onClick={() => setMenuAbierto(false)}
                    className={({ isActive }) =>
                      `font-lato py-2.5 px-3 rounded-xl transition-colors ${
                        isActive ? "bg-rosa-50 text-rosa-400 font-semibold" : "text-gray-700 hover:bg-rosa-50 hover:text-rosa-400"
                      }`
                    }
                  >
                    {e.label}
                  </NavLink>
                ) : (
                  <a
                    key={e.href}
                    href={e.href}
                    onClick={() => setMenuAbierto(false)}
                    className="font-lato text-gray-700 hover:text-rosa-400 py-2.5 px-3 rounded-xl hover:bg-rosa-50 transition-colors"
                  >
                    {e.label}
                  </a>
                )
              )}
              <a
                href={`https://wa.me/${whatsapp}?text=Hola!%20Me%20gustaría%20hacer%20un%20pedido.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rosa text-center mt-3"
              >
                Pedir ahora 🎂
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
