// src/features/Cart/components/CartItem.tsx
import React from "react";
import { useCart } from "../hooks/useCart";
import type { ICartItem } from "../types/Cart";
import { formatCurrency } from "../../../utils/format";


interface CartItemProps {
  // item: CartItemData;
  item:ICartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  //precio y cantidad para el total por linea
  const itemTotal = item.price * item.quantity;
  const { removeItem, updateItem } = useCart();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) return;

    updateItem(item.variantId, newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-100 dark:border-neutral-700">

      {/* Imagen e Info */}
      <div className="flex items-center gap-4 flex-grow w-full sm:w-auto">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-100">
            {item.name}
            </h4>
            <div className="flex gap-3 mt-1 text-xs text-gray-500 dark:text-neutral-400 capitalize">
              <span><strong>Talle:</strong>{item.size}</span>
              <span><strong>Color:</strong>{item.color}</span>
            </div>
          <button
            onClick={() => removeItem(item.variantId)}
            className="text-red-500 text-sm flex items-center gap-1 hover:underline mt-1"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/*Precio unitario */}
      <div className="font-medium text-gray-600 dark:text-gray-300">
        {/* ${item.price.toFixed(2)} */}
        {/* ${item.price.toLocaleString('es-AR', {minimumFractionDigits:2})} */}
        {formatCurrency(item.price)}
      </div>

      {/*Control de cantidad */}
      <div className="flex items-center border border-gray-300 dark:border-neutral-600 rounded-md">
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={item.quantity <= 1} // Deshabilitar si es 1
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-700 disabled:opacity-50"
        >
          -
        </button>
        <span className="w-10 text-center font-medium text-gray-900 dark:text-white">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          +
        </button>
      </div>
      {/*subtotal por item */}
      <div className="font-bold text-gray-800 dark:text-gray-100 min-w-[80px] text-right">
        {formatCurrency(itemTotal)}
      </div>
    </div>
  );
};