import { useState } from "react";
import { useApi } from "../hooks/useApi";
import CardProducto from "./CardProducto";

export default function Catalogo({ categoriaActiva }) {
  const endpoint = categoriaActiva
    ? `/productos/?categoria=${categoriaActiva}`
    : "/productos/";

  const { data: productos, cargando, error } = useApi(endpoint);

  if (error) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-4">😕</p>
        <p className="font-lato">No se pudieron cargar los productos.</p>
      </div>
    );
  }

  return (
    <section id="productos" className="py-16 px-4 bg-crema">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="seccion-titulo">Nuestros Productos</h2>
          <p className="seccion-subtitulo">
            Elaborados con ingredientes frescos y mucho amor
          </p>
        </div>

        {cargando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-rosa-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                  <div className="h-8 bg-rosa-100 rounded-full w-1/2 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : productos?.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-lato">No hay productos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos?.map((producto) => (
              <CardProducto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
