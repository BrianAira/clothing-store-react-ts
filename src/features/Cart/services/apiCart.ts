import { apiClient } from "../../../services/apiClient";
import type { CartItemPayload } from "../types/Cart";
// import type { IProduct } from "../../Products/types/Product";
import type { CartApi } from "../types/Cart.api";

// export interface CartItem {
//   id: number;
//   product: IProduct;
//   quantity: number;
// }

// export interface Cart {
//   id: number;
//   user_id: number;
//   items: CartItem[];
// }

export const getCart = async (): Promise<CartApi> => {
  const { data } = await apiClient.get<CartApi>(`/cart/`);
  return data;
};

export const addItemToCart = async (payload:CartItemPayload) => {
  const { data } = await apiClient.post(`/cart/items/`, payload)
    //  {
    // variant_id: variant_id,
    // quantity,
  // });
  return data;
};

export const updateItemQuantity = async (variantId: number, quantity: number) => {
  const { data } = await apiClient.patch(`/cart/items/${variantId}`, {
    // variant_id: variantId,
    quantity,
  });
  return data;
};

export const removeItemFromCart = async (itemId: number) => {
  const { data } = await apiClient.delete(`/cart/items/${itemId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await apiClient.delete(`/cart/`);
  return data;
};

