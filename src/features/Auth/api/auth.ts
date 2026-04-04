// import apiClient from "../api/apiClient";
import { apiClient } from "../../../services/apiClient";
import { type ILoginRequest, 
    type IRegisterRequest, 
    // type ILoginResponse, 
    type IUser, 
    type IRegisterResponse,
    type IAddress,
    type IAddressRequest} from "../types/user";
  
export const authService = {
  login: async (credentials: ILoginRequest) => {
  
    const params = new URLSearchParams();
    params.append("username", credentials.email);
    params.append("password", credentials.password);
    console.log("Enviando al servidor:", params.toString());
    // 2. Enviamos los params. Axios detectará automáticamente 
    // que debe usar 'application/x-www-form-urlencoded'
    const response = await apiClient.post("/users/login", params,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    
    return response.data;
  },

  register: async (userData: IRegisterRequest): Promise<IRegisterResponse> => {
    const response = await apiClient.post<IRegisterResponse>("/users/register", userData);
    return response.data;
  },

  updateMe: async (userData: Partial<IUser>): Promise<IUser> => {
    const response = await apiClient.patch<IUser>("/users/me", userData);
    return response.data;
  },

  getMyProfile:async():Promise<IUser>=>{
    const response=await apiClient.get<IUser>("users/me");
    return response.data
  },

  getUserAddresses: async():Promise<IAddress[]>=>{
    const response= await apiClient.get<IAddress[]>("/users/addresses")
    return response.data

  },

  createAddress:async(addressData:IAddressRequest):Promise<IAddress>=>{
    const response =await apiClient.post<IAddress>("/users/addresses", addressData);
    return response.data
  }
};