import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IAddress, IAuthState, IUser } from "../types/user";



//funcion auxiliar para leer localstorage de forma segura
const getSafeStorage=(key:string)=>{
  const item=localStorage.getItem(key);
  //si devuelve algo que no sea un Json valido retorna null
  if(!item)return null;
  try{
    return JSON.parse(item);

  }catch{
    return null;
  }
};

const initialState: IAuthState = {
  // user: userFromStorage ? JSON.parse(userFromStorage) : null,
  user:getSafeStorage("user"),
  // token: tokenFromStorage,
  token:localStorage.getItem("token"),
  isAuthenticated:!!localStorage.getItem("token"),
  // loading: false,
  isLoading:false,
  error: null,
  addresses:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      const {user, token}=action.payload;
      state.isLoading = false;
      state.isAuthenticated=true;
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      state.user=user;
      state.token=token;
      state.error=null;


      // Guardar en localStorage
      // localStorage.setItem("token", action.payload.token);
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated=false;
      state.user=null;
      state.token=null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated=false;

      state.isLoading = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      // state.user = { ...state.user, ...action.payload };
      if(state.user){
        state.user={...state.user, ...action.payload};
        localStorage.setItem("user", JSON.stringify(state.user));
      }

      // localStorage.removeItem("user");
      // localStorage.setItem("user", JSON.stringify(state.user));
    },

    setAuthError:(state,action:PayloadAction<string>)=>{
      state.error=action.payload;
      state.isLoading=false;
    },

    setAddresses:(state, action:PayloadAction<IAddress[]>)=>{
    state.addresses=action.payload;
    state.isLoading=false;
    },
    addAddressSuccess:(state, action:PayloadAction<IAddress>)=>{
      state.addresses.push(action.payload);
      state.isLoading=false;
    },
    setAddressLoading:(state)=>{
      state.isLoading=true;
    }
    // setErrorRegister: (state) => {
    //   state.error = "No se pudo registrar el usuario"
    // }
  },
  
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout,
  setAuthError, 
  // setErrorRegister, 
  updateUser,
  setAddressLoading,
  setAddresses,
  addAddressSuccess,
} =authSlice.actions;

export default authSlice.reducer;


