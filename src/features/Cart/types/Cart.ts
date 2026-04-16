
export interface CartItemPayload {
  variant_id: number; // La API ahora identifica por variante
  quantity: number;
}

/** --- INTERFACES PARA EL FRONTEND (Estado de Redux / UI) --- **/
export interface ICartItem {
  id: number;        // ID del item en el carrito
  // cartId: number;
  variantId: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
  size: string;
  color: string;
  sku:string;
  // stockAvailable:number;
}

export interface ICart {
  id: number;
  userId: number;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
}
