import React from "react";
import { Link } from "react-router";
import {
  Button,
  Card,
  // CardBody,
  // CardFooter,
  // Image,
  CardHeader
} from "@heroui/react";
import {  FaRocket, FaBusSimple} from "react-icons/fa6";
import { FiArrowRight, FiBookOpen, FiBox, FiPercent, FiShield } from "react-icons/fi";
import { FeaturedProducts } from "../components/FeaturedProducts";
// Definimos la interfaz más limpia
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string; // Agregamos color dinámico para los iconos
}

const features: Feature[] = [
  {
    id: 1,
    title: "Envío Gratis",
    description: "En compras mayoristas seleccionadas a todo el país.",
    icon: <FaBusSimple />,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: 2,
    title: "Calidad Garantizada",
    description: "Indumentaria con procesos de fabricación certificados.",
    icon: <FiShield />,
    color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    id: 3,
    title: "Precios Mayoristas",
    description: "Escalas de precios competitivas para revendedores.",
    icon: <FiPercent />,
    color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    id: 4,
    title: "Stock Permanente",
    description: "Disponibilidad inmediata para envíos en el día.",
    icon: <FiBox />,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400",
  },
];

export const HomePage: React.FC = () => {
  return (
    <main className="flex-grow bg-white dark:bg-neutral-950 transition-colors duration-500 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full bg-slate-900 dark:bg-neutral-900 py-24 px-4 overflow-hidden">
        {/* Efectos de luces de fondo (Glow) */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight text-white">
            Tu distribuidor de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Indumentaria Mayorista
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Impulsamos tu negocio con calidad profesional y los mejores precios del mercado. 
            Directo de fábrica a tu local.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/products"
              size="lg"
              radius="full"
              className="bg-emerald-500 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all"
              startContent={<FiBookOpen size={20} />}
            >
              Explorar Catálogo
            </Button>
            <Button
              as={Link}
              to="/register"
              radius="full"
              size="lg"
              variant="bordered"
              className="text-white border-white/20 hover:bg-white/5 font-semibold"
              startContent={<FaRocket />}
            >
              Unirse como Revendedor
            </Button>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              ¿Por qué elegir Educart?
            </h2>
            <p className="text-slate-500 dark:text-neutral-400 mt-2">
              Beneficios diseñados exclusivamente para el crecimiento de tu comercio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              isPressable
              className="p-4 border border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50 shadow-none hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300"
            >
              <CardHeader className="flex-col items-start gap-4">
                <div className={`p-4 rounded-2xl text-2xl shadow-sm ${feature.color}`}>
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xl text-slate-900 dark:text-white uppercase tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 dark:text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-slate-50 dark:bg-neutral-900/30 py-20 border-y border-slate-100 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <h3 className="text-5xl font-black text-emerald-500 tracking-tighter">+5k</h3>
              <p className="text-slate-600 dark:text-neutral-400 font-medium uppercase text-xs tracking-widest">
                Clientes Activos
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-black text-blue-500 tracking-tighter">24h</h3>
              <p className="text-slate-600 dark:text-neutral-400 font-medium uppercase text-xs tracking-widest">
                Logística Express
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-black text-purple-500 tracking-tighter">100%</h3>
              <p className="text-slate-600 dark:text-neutral-400 font-medium uppercase text-xs tracking-widest">
                Fábrica Nacional
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* --- SECCIÓN DE PRODUCTOS --- */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Productos Destacados
              </h2>
              <p className="text-slate-500 dark:text-neutral-400 mt-1">
                Nuestra selección de los más vendidos esta semana.
              </p>
            </div>
            <Button 
              as={Link} 
              to="/products" 
              variant="light" 
              color="primary"
              endContent={<FiArrowRight />}
              className="hidden sm:flex"
            >
              Ver todo el catálogo
            </Button>
          </div>

          {/* Aquí es donde vive el componente que se me escapó */}
          <FeaturedProducts />

          <div className="mt-10 text-center sm:hidden">
            <Button 
              as={Link} 
              to="/products" 
              variant="flat" 
              color="primary" 
              className="w-full"
            >
              Ver todo el catálogo
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
};