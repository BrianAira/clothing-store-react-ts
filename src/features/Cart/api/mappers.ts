import type { ICart, ICartItem, CartItemPayload } from "../types/Cart";
import type { CartApi, CartItemApi } from "../types/Cart.api";

export function toCart(apiData: CartApi): ICart {
  return {
    id: apiData.id ,
    userId: apiData.user_id,
    totalPrice: apiData.total_price,
    totalItems:apiData.total_items,

    // items: apiData.items.map(toCartItem),
    items: (apiData.items || []).map((item: CartItemApi) => toCartItem(item)),
  };
}

export function toCartItem(apiItem: CartItemApi): ICartItem {
  
  const {variant}=apiItem;
  const {product}=variant;

  return {
    id:apiItem.cart_id,
    // cartId: apiItem.cart_id,
    variantId:apiItem.variant_id,
    productId: product.id,
    name: product.name,
    quantity: apiItem.quantity,
    price: product.price,
    imageUrl:product?.url||"https://placehold.co/100",
    size:variant.talle||"",
    color:variant.color||"",
    sku:variant.sku
  };
}

export function toCartApiAdd(payload: CartItemPayload) {
  return {
    variant_id:payload.variant_id,
    // product_id: payload.product_id,
    quantity: payload.quantity,
  };
}
