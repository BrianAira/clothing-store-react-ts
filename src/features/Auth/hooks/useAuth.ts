import { useDispatch, useSelector } from "react-redux";
// import { apiClient } from "../../../services/apiClient";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setAuthError,
  updateUser,
  // updateUser,
} from "../redux/authSlice";
import type { AppDispatch, RootState } from "../../../store/store";
import type { ILoginRequest, IRegisterRequest, IUser } from "../types/user";
import { authService } from "../api/auth";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token,isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  //Login
  const login = async (credentials:ILoginRequest) => {
    dispatch(loginStart());
    try {
      

      const data=await authService.login(credentials);
      
      localStorage.setItem("token", data.access_token)
      const userProfile=await authService.getMyProfile()

      // Guardar en Redux + localStorage
      dispatch(loginSuccess({ 
        user:userProfile, 
        token: data.access_token }));
      // localStorage.setItem("token", access_token);
    } catch (err: any) {
      // localStorage.removeItem("token")
      console.error("Error en login:", err);
      console.log("Detalles del error 422:", err.response?.data?.detail);
      // const message = err.response?.data?.message || "Credenciales inválidas";
      dispatch(loginFailure("Credenciales inválidas o error del servidor"));
    }
  };

  const logoutUser = () => {
    dispatch(logout())
   
  };

  //Register
  const register = async (
    userData:IRegisterRequest
  ) => {
    dispatch(loginStart());
    try {
      const data=await authService.register(userData);
      // await login({email:userData.email, password:userData.password });
      dispatch(loginSuccess({
        user:data.user,
        token:data.access_token,
      }))

      // login(res.data.username, password);
    } catch (err: any) {
      console.error(err);

      dispatch(setAuthError(err.message || "Error al registrarse"));
    }
  };

  const updateUserState = async (data: Partial<IUser>) => {
    try {
      dispatch(loginStart())

      


      // Guardar en Redux + localStorage;
      dispatch(updateUser(data));
      return true;

    } catch (err: any) {
      console.error(err)

      dispatch(setAuthError(err.message || "Error a actualizar usuario"))
      return false;
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    login,
    logoutUser,
    // isAuthenticated: Boolean(token),
    isAuthenticated,
    register,
    updateUserState,
  };
};
