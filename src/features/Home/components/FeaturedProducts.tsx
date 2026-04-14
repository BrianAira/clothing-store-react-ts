import { motion } from "framer-motion";
import { Button, Card, Skeleton } from "@heroui/react";
import { Link } from "react-router-dom";
// import { FiArrowRight } from "react-icons/fi";
// import { ProductCard } from "./ProductCard";
import { useProducts } from "../../Products/hooks/useProducts";
import { ProductCard } from "../../Products/components/ProductCard2";

// Datos de ejemplo (Luego vendrán de tu API/Redux)
export const FeaturedProducts: React.FC = () => {
  // Consumimos datos reales. 
  // Pasamos un objeto vacío o filtros iniciales si tu API los requiere.
  const { data: products, isLoading, isError } = useProducts({
    sort: "newest" // Opcional: podrías filtrar por los más nuevos
  });

  // Limitamos a 4 productos para la Home
  const displayedProducts = products?.slice(0, 4) || [];

  return (
    <section className=" bg-gray-50 dark:bg-neutral-900/50 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Encabezado de la sección */}
        {/* <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Lo más buscado
            </h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-2">
              Nuestras prendas estrella para revendedores
            </p>
          </div>
          <Button 
            as={Link} 
            to="/products" 
            variant="light" 
            color="primary" 
            endContent={<FiArrowRight />}
            className="hidden sm:flex font-bold"
          >
            Ver catálogo completo
          </Button>
        </div> */}

        {/* Estado de Carga: Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="space-y-3 p-4 shadow-none border border-default-200" radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-48 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        ) : isError ? (
          /* Estado de Error Local (Si falla la API) */
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-dashed border-danger-100">
            <p className="text-danger font-medium">No pudimos conectar con el catálogo.</p>
            <Button variant="flat" color="danger" className="mt-4" onPress={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        ) : (
          /* Estado Listo: Renderizado de productos reales con animación */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product}/>
              // <ProductCard key={product.id} product={product}  />
            ))}
          </motion.div>
        )}
        
        {/* Botón móvil */}
        <div className="mt-10 sm:hidden">
          <Button 
            as={Link} 
            to="/products" 
            className="w-full bg-indigo-600 text-white font-bold py-7 shadow-lg"
            radius="full"
          >
            Ver todo el catálogo
          </Button>
        </div>
      </div>
    </section>
  );
};