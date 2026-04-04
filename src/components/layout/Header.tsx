import {
  FiBook,
  FiBookOpen,
  FiHome,
  FiLogIn,
  // FiSettings,
  FiShoppingCart,
} from "react-icons/fi";
import { Link } from "react-router";
// import { useAuth } from "../../features/Auth/hooks/useAuth";
import { 
  // Avatar, 
  Badge, 
  // Button, 
  // Popover, 
  // PopoverContent, 
  // PopoverTrigger, 
  Tooltip } from "@heroui/react";
import { UserMenu } from "./UserMenu";
import { useCart } from "../../features/Cart/hooks/useCart";
import { useAuth } from "../../features/Auth/hooks/useAuth";

export const Header = () => {

  const { user } = useAuth();
  const { items } = useCart();


  return (
    <header className="
    bg-linear-to-r from-green-400 via-emerald-400 to-green-300 px-6 py-4 flex justify-between items-center shadow-lg
     dark:from-neutral-800 dark:via-emerald-800  dark:to-neutral-900/90 dark:border-b dark:border-green-900/30">
      <Link
        to="/"
        className="flex items-center gap-2 text-white font-bold text-xl dark:text-green-400"
      >
        <FiBook /> Mi Odisea
        
      </Link>
      <nav className="flex justify-between items-center gap-1">
  
        <Link
          to="/home"
          className="flex items-center gap-1 text-white hover:bg-white/10 rounded px-3 py-3 transition dark:text-gray-300 dark:hover:bg-green-900/30"
        >
          <FiHome />
          Inicio
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-1 text-white hover:bg-white/10 rounded px-3 py-3 transition dark:text-gray-300" 
        >
          <FiBookOpen />
          Catalogo
        </Link>
        <Link
          to="/cart"
          className="flex items-center gap-1 hover:bg-white/10 rounded px-3 py-3 transition dark:text-gray-300"
        >
          <Badge content={items.length == 0 ? false : items.length} size="sm" showOutline={false} color="success" shape="circle">

            <FiShoppingCart />
          </Badge>
        </Link>
        {
          !user ?
            <Tooltip content="Iniciar sesión">
              <Link
                to="/login"
                className="flex items-center gap-1 text-white hover:bg-white/10 rounded px-3 py-3 transition"
              >
                <FiLogIn />
              </Link>
            </Tooltip>
            :
            <UserMenu />
        }

      </nav>
    </header>
  );
};
