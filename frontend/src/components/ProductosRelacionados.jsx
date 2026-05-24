import { useApi } from "../hooks/useApi";
import CardProducto from "./CardProducto";

export default function ProductosRelacionados({ categoriaId, productoActualId }) {
  const { data: productos, cargando } = useApi(
    categoriaId ? `/productos/?categoria=${categoriaId}` : null
  );

  // Excluimos el producto actual y limitamos a 3
  const relacionados = productos
    ?.filter((p) => p.id !== productoActualId)
    .slice(0, 3);

  if (!categoriaId || cargando || !relacionados?.length) return null;

  return (
    <section className="py-14 px-4 border-t border-rosa-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-playfair text-2xl md:text-3xl text-gray-800 mb-1">
            También te puede gustar
          </h2>
          <p className="font-lato text-gray-500 text-sm">De la misma categoría</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relacionados.map((producto, i) => (
            <div key={producto.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <CardProducto producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
