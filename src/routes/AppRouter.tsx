// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ProductsPage } from "../features/Products/views/ProductsPage";
import { ProductDetailPage } from "../features/Products/views/ProductDetailPage";
import { CartPage } from "../features/Cart/views/CartPage";
import { LoginPage } from "../features/Auth/views/LoginPage";
import { RegisterPage } from "../features/Auth/views/RegisterPage";
import { Setting } from "../features/Settings/views/Settings";
import { ShopLayout } from "./ShopLayout";
import { ProtectedLayout } from "./ProtectedLayout";
import { ProfilePage } from "../features/Auth/views/ProfilePage";
import { OrderPage } from "../features/Orders/views/OrderPage";
import { CheckoutPage } from "../features/Orders/views/CheckoutPage";
import { HomePage } from "../features/Home/views/HomePage";
import { SuccessPage } from "../features/Orders/views/SuccessPage";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Agregamos un contenedor global con bg-color para evitar 
          destellos blancos al navegar en modo oscuro 
      */}
      <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
        <Routes>
          {/* 1. RUTAS DE AUTENTICACIÓN (Sin Header/Footer para menos distracción) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 2. RUTAS DE LA TIENDA (Públicas abiertas) */}
          <Route element={<ShopLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            {/* Unificamos el parámetro a 'id' para ser consistentes con tu ProductDetailPage */}
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          {/* 3. RUTAS PROTEGIDAS (Solo Clientes Autenticados) */}
          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/my-orders" element={<OrderPage />} />
            <Route path="/checkout/success" element={<SuccessPage />} />
{/* <Route path="/checkout/failure" element={<FailurePage />} /> */}
            {/* Agregamos una posible ruta de éxito para Mercado Pago */}
            {/* <Route path="/order-success" element={<OrderSuccessPage />} /> */}
          </Route>

          {/* Catch-all: Redirige cualquier ruta inexistente al Home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};