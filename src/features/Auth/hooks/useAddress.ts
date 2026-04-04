// // src/hooks/useAddress.ts
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../store";
// import { setAddresses, addAddressSuccess, setAddressLoading } from "../store/slices/authSlice";
// import { authService } from "../services/auth.service";
// import { getErrorMessage } from "../utils/getErrorMessage";
// import { IAddressRequest } from "../types/Address";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { authService } from "../api/auth";
import type { IAddressRequest } from "../types/user";
import {addAddressSuccess, setAddresses, setAddressLoading} from "../redux/authSlice";
export const useAddress = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addresses, isLoading, user } = useSelector((state: RootState) => state.auth);

  // Esta función es necesaria porque las direcciones no vienen 
  // en el login inicial, hay que pedirlas bajo demanda.
  const getAddresses = async () => {
    dispatch(setAddressLoading());
    try {
      const data = await authService.getUserAddresses();
      dispatch(setAddresses(data));
    } catch (err) {
      // Manejo de error silencioso o notificación
      console.log(err)
    }
  };

  const createNewAddress = async (data: Omit<IAddressRequest, "user_id">) => {
    if (!user?.id) return;
    dispatch(setAddressLoading());
    try {
      const newAddress = await authService.createAddress({
        ...data,
        user_id: user.id
      });
      dispatch(addAddressSuccess(newAddress));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    addresses,
    isLoading,
    getAddresses,
    createNewAddress
  };
};