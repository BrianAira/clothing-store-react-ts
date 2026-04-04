export type UserRole= "client";

export interface IUser{
    id:number;
    username:string;
    email:string;
    role:UserRole;
    directions:IAddress[]
}

export interface IRegisterRequest{
    username:string;
    email:string;
    password:string;
    role?:UserRole;
}

export interface ILoginRequest{
    email:string;
    password:string;
}

export interface IRegisterResponse{
    access_token:string;
    token_type:string;

    user:IUser;
}

export interface ILoginResponse{
    access_token:string;
    token_type:string;
}

export interface IAuthState{
    user:IUser|null;
    token:string|null;
    isAuthenticated:boolean;
    isLoading:boolean;
    error:string|null;
    addresses:IAddress[];
}


export interface IAddressRequest{
    street_address:string;
    city:string;
    state:string;
    postal_code:string;
    country:string;
    additional_info:string;
    user_id:number
}

export interface IAddress extends IAddressRequest{
    id:number
}