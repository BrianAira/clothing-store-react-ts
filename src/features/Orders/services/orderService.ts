import * as orderApi from "../api/orders";
import type { IOrder, 
    // CreateOrderPayload, 
    CheckoutPayload, CheckoutResponse } from "../types/Order";

export const orderService = {
    create: async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
        return await orderApi.createCheckout(payload);
    },

    getMyOrders: async (): Promise<IOrder[]> => {
        return await orderApi.getMyOrders();
    },
};