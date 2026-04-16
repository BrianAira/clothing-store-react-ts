
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

import {
  cartStart,
  cartSuccess,
  cartFailure,
} from "../redux/cartSlice";
// Importamos tu API existente
import {
  getCart as getCartApi,
  addItemToCart as addItemApi,
  updateItemQuantity as updateItemApi,
  removeItemFromCart as removeItemApi,
  // clearCart as clearCartApi,
} from "../services/apiCart.ts";
import type { IProduct } from "../../Products/types/Product";
import type { ICartItem } from "../types/Cart";
import { toCart } from "../api/mappers.ts";

// Clave para localStorage
const GUEST_CART_KEY = "educart_guest_cart";

export function useCart() {
  const dispatch = useDispatch();
// En useCart.ts
const auth = useSelector((state: RootState) => state.auth) || {};
const cart = useSelector((state: RootState) => state.cart) || {};

// Usamos desestructuración con valores por defecto para que NUNCA sea undefined
const { user = null, token = null } = auth;
const { 
  items = [], 
  totalPrice = 0,
  totalItems=0, 
  loading = false, 
  error = null 
} = cart;
  const fetchCart = useCallback(async () => {
    dispatch(cartStart());

    // MODO INVITADO (Leer de LocalStorage)
    if (!user || !token) {
      const storedCart = localStorage.getItem(GUEST_CART_KEY);
      const guestItems: ICartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const totalP=guestItems.reduce((acc,item)=>acc+(item.price*item.quantity), 0)
      const totalI=guestItems.reduce((acc, item)=>acc+item.quantity,0)

      // const guestTotal = guestItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      dispatch(cartSuccess({
        items: guestItems,
        
        totalItems:totalI,
        totalPrice:totalP,
        // total: guestTotal,
        id: 0,
        userId: 0
      }));
      return;
    }

    // MODO CLIENTE (API)
    try {
      // Antes de pedir el carrito a la API, revisamos si hay algo "pendiente" en local
      const localCartJson = localStorage.getItem(GUEST_CART_KEY);

      if (localCartJson) {
        const localItems: ICartItem[] = JSON.parse(localCartJson);

        if (localItems.length > 0) {
          console.log("🔄 Sincronizando carrito local con la nube...", localItems);

          // Subimos cada item local al backend
          // Usamos Promise.all para hacerlo en paralelo (más rápido)
          await Promise.all(localItems.map(item=>
            addItemApi({variant_id:item.variantId, quantity: item.quantity})
            .catch(err=>console.log(`Error sincronizando variante ${item.variantId } error: ${err}`))
          ));
       
        }

        //  Borramos el carrito local para no duplicar en el futuro
        localStorage.removeItem(GUEST_CART_KEY);
      }

      const data = await getCartApi();


      // const serverTotal = mappedItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
      const mappedCart=toCart(data);

      dispatch(cartSuccess(mappedCart));
  

    } catch (err) {
      console.error(err);
      dispatch(cartFailure("Error al cargar el carrito del servidor"));
    }
  }, [user, token, dispatch]);

  // Helper para guardar en localStorage (Solo Invitados)
  const saveLocalCart = (newItems: ICartItem[]) => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(newItems));
    const totalP=newItems.reduce((acc, item)=>acc+(item.price*item.quantity), 0);
    const totalI=newItems.reduce((acc, item)=>acc+item.quantity,0);

    // const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    dispatch(
      cartSuccess({ 
        items: newItems, 
        totalPrice: totalP, 
        totalItems:totalI,
        id: 0, 
        userId: 0 
      }));
  };

  // AGREGAR ITEM 
  const addItem = async (
    product: IProduct&{selectedSize?:string; selectedColor?:string}, 
    quantity: number = 1
  ) => {
    dispatch(cartStart());
    //busqueda de variatne por seleccion de UI
    const variant=product.variants.find(
      v=>v.size===product.selectedSize&&v.color===product.selectedColor
    );

    if(!variant){
      dispatch(cartFailure("Por favor, selecciona una variante valida"))
      return;
    }

    // MODO INVITADO
    if (!user) {
      //logica de duplicados basado en variantId
      const existingItem = items.find((i) => i.variantId === variant.id);
      let newItems = [...items];

      if (existingItem) {
        // Si ya existe, sumamos cantidad
        newItems = newItems.map((i) =>
          i.variantId === variant.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        // Si es nuevo, lo creamos
        const newItem: ICartItem = {
          id: Math.random(), 
          // cartId: 0,
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          //elcarrito no trae imagenes aun, se usa la extraida de detalles de producto
          imageUrl: product.imageUrl || (product.allImages[0].url),
          size: variant.size,
          color: variant.color,
          sku:variant.sku||""
        };
        newItems.push(newItem);
      }
      saveLocalCart(newItems);
      return;
    }

    // MODO CLIENTE (API)
    try {

      await addItemApi({variant_id:variant.id, quantity});
      await fetchCart();
    } catch (err) {
      dispatch(cartFailure("Error al agregar producto :"+err));
    }
  };


  const updateItem = async (variantId: number, quantity: number) => {
    dispatch(cartStart());

    // MODO INVITADO
    if (!user) {
      console.log("Actualizando local:", variantId, quantity);

      const newItems = items.map((i) => 
        i.variantId===variantId?{... i, quantity}:i

        // if (Number(i.variantId) === Number(productId)) {
          // return { ...i, quantity: quantity };
        // }
        // return i;
      );
      

      saveLocalCart(newItems);
      return;
    }

    // MODO CLIENTE
    try {
      await updateItemApi(variantId, quantity);
      await fetchCart();
    } catch (err) {
      dispatch(cartFailure("Error al actualizar cantidad: "+ err));
    }
  };


  const removeItem = async (variantId: number) => {
    dispatch(cartStart());

    // MODO INVITADO
    if (!user) {
      const newItems = items.filter((i) => i.variantId !== variantId);
      saveLocalCart(newItems);
      return;
    }

    // MODO CLIENTE
    try {
      await removeItemApi(variantId); // O cartItem.id si fuera necesario
      await fetchCart();
    } catch (err) {
      dispatch(cartFailure("Error al eliminar producto :"+err));
    }
  };



  const emptyCart = async () => {
    dispatch(cartStart());

    // Si es invitado, solo borramos local
    if (!user) {
      localStorage.removeItem(GUEST_CART_KEY);
      dispatch(cartSuccess({ items: [], totalPrice: 0, totalItems: 0, id: 0, userId: user!.id || 0 }));
      return;
    }

    // Si es cliente
    dispatch(cartSuccess({ items: [], totalPrice: 0, totalItems: 0, id: 0, userId: user!.id || 0 }));
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);


  return {
    cart,
    items,
    totalPrice,
    totalItems,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    fetchCart,
    emptyCart,
  };
}


