// src/routes/ProtectedLayout.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Header } from "../components/layout/Header";
import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";
export const ProtectedLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Header fijo arriba */}
      <Header />

    
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-4 pb-24 md:pb-8 lg:px-8">
        <Outlet />
      </main>

      {/* Navegación móvil (fixed bottom) */}
      <Navigation />

      {/* Footer (solo visible al final del scroll) */}
      <Footer />
    </div>
  );
};