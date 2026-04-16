
import { Outlet } from "react-router";
import { Header } from "../components/layout/Header";
import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";
export const ShopLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Header pegajoso */}
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8 lg:px-8">
        <Outlet />
      </main>

      {/* Barra de navegación inferior (solo móvil) */}
      <Navigation />

      <Footer />
    </div>
  );
};