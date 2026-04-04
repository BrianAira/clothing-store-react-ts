import { NavLink } from "react-router-dom";
import { 
  FiHome, 
  FiBookOpen, 
  FiShoppingCart, 
  FiUser, 
  FiSettings 
} from "react-icons/fi";

const navItems = [
  { to: "/home", label: "Inicio", icon: <FiHome size={20} /> },
  { to: "/products", label: "Catálogo", icon: <FiBookOpen size={20} /> },
  { to: "/cart", label: "Carrito", icon: <FiShoppingCart size={20} /> },
  { to: "/login", label: "Cuenta", icon: <FiUser size={20} /> }, // Corregido el label
  { to: "/settings", label: "Ajustes", icon: <FiSettings size={20} /> },
];

export const Navigation = () => {
  return (
    <nav className="
      md:hidden fixed bottom-0 left-0 right-0 z-50
      bg-white/80 backdrop-blur-md border-t border-slate-200 px-2 py-3 
      flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]
      dark:bg-neutral-950/90 dark:border-neutral-800 dark:text-gray-200
    ">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 min-w-[64px] transition-all duration-200 ${
              isActive 
                ? "text-indigo-600 dark:text-emerald-400 scale-110" 
                : "text-slate-500 dark:text-neutral-500 hover:text-indigo-400"
            }`
          }
        >
          {item.icon}
          <span className="text-[10px] font-medium uppercase tracking-wider">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};