import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICart, ICartItem } from "../types/Cart";
// import { removeItemFromCart } from "../services/apiCart";

interface CartState {
  cartId: number | null;
  items: ICartItem[];
  totalPrice:number;
  totalItems: number;
  loading: boolean;
  error: string | null;
  alert: string | null;
}

const initialState: CartState = {
  cartId: 0,
  items: [],
  totalItems:0,
  totalPrice: 0,
  loading: false,
  error: null,
  alert: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    cartSuccess: (state, action: PayloadAction<ICart>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.totalItems=action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
      state.cartId = action.payload.id;
    },
    cartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCartState: () => {
      
      return initialState; //Más limpio, reinicio completo
    },

    cartRemoveItem: (state, actions: PayloadAction<number>) => {

      const variantIdToRemove = actions.payload;
      const itemToRemove=state.items.find(i=>i.variantId===variantIdToRemove);

      if(itemToRemove){
        state.items=state.items.filter(
          i=>i.variantId!==variantIdToRemove
        );

        // state.totalPrice-=itemToRemove.price*itemToRemove.quantity;

        // state.totalItems-=itemToRemove.quantity;
        //recalcular totales en lugar de restar
        state.totalItems=state.items.reduce((acc, item)=>acc+item.quantity, 0)
        state.totalPrice=state.items.reduce((acc, item)=>acc+(item.price*item.quantity),0)
        
      }
      // state.items = state.items.filter(
        // (item) => item.productId !== variantIdToRemove
      // );
    },

    cartAddItem: (state, action: PayloadAction<ICartItem>) => {
      //Sumar productos iguales
      const existingItemIndex = state.items.findIndex(
        (item) => item.variantId === action.payload.variantId
      );
      if (existingItemIndex !== -1) {

        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      // state.totalPrice += action.payload.price * action.payload.quantity;
      // state.totalItems+=action.payload.quantity;
      state.totalItems=state.items.reduce((acc,item)=>acc+item.quantity, 0);
      state.totalPrice=state.items.reduce((acc, item)=>acc+(item.price*item.quantity),0)
      
      state.loading = false;

    },
    
    setAlert: (state, action: PayloadAction<string | null>) => {
      state.alert = action.payload;
    },
  },
});

export const {
  cartStart,
  cartSuccess,
  cartFailure,
  cartAddItem,
  clearCartState,
  cartRemoveItem,
  setAlert,
} = cartSlice.actions;
export default cartSlice.reducer;
