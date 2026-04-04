import { FiBookOpen, FiHome, FiShoppingCart, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-neutral-950 dark:to-neutral-900 text-slate-800 dark:text-slate-200 p-8 border-t border-slate-300 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
        
        {/* Sección: Marca / Descripción */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold border-b border-slate-400/40 pb-1 mb-2 text-indigo-700 dark:text-indigo-400">
            Mi Odisea
          </h3>
          <p className="text-sm leading-relaxed opacity-80">
            Tu distribuidor mayorista de confianza en indumentaria de alta calidad. 
            Calidad y compromiso en cada prenda.
          </p>
        </div>

        {/* Sección: Enlaces Rápidos */}
        <div>
          <h3 className="text-xl font-semibold border-b border-slate-400/40 pb-1 mb-2">
            Enlaces Rápidos
          </h3>
          <ul className="space-y-2">
            <li>
              {/* Cambio: Link de react-router-dom para evitar recargar la página */}
              <Link to="/" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <FiHome size={16} /> Inicio
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <FiBookOpen size={16} /> Catálogo
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <FiShoppingCart size={16} /> Carrito
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección: Contacto */}
        <div>
          <h3 className="text-xl font-semibold border-b border-slate-400/40 pb-1 mb-2">
            Contacto
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@miodisea.com" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <FiMail size={16} /> info@miodisea.com
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <FiPhone size={16} /> (123) 456-7890
              </a>
            </li>
            <li className="flex items-start gap-2 opacity-90 italic">
              <FiMapPin size={16} className="mt-1 flex-shrink-0" /> 
              <span>Flores, Buenos Aires, Argentina</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-slate-500 dark:text-neutral-500 border-t border-slate-400/20 pt-6">
        &copy; {new Date().getFullYear()} Mi Odisea. Todos los derechos reservados.
      </div>
    </footer>
  );
};