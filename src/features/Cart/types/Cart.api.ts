/** --- INTERFACES PARA LA API (Respuesta del Servidor) --- **/
export interface CartItemApi {
  // id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  variant: {
    id: number;
    // product_id: number;
    talle: string;
    color: string;
    sku: string;
    // stock_current: number;
    // El producto suele venir anidado o sus datos básicos
    product: {
      id: number;
      name: string;
      price: number;
      url: string|null;
    };
  };
}

export interface CartApi {
  id: number;
  user_id: number;
  items: CartItemApi[];
  total_items: number;
  total_price: number;
}
