import { apiClient } from "../../../services/apiClient";
import type { IOrder, 
    // CreateOrderPayload, 
    OrderApi, CheckoutPayload, CheckoutResponse } from "../types/Order";
import { toOrder } from "./mappers";


export async function createCheckout(payload: CheckoutPayload): Promise<CheckoutResponse> {
    // Nota: Usamos la ruta /checkout que mencionaste antes
    const response = await apiClient.post<CheckoutResponse>("/orders", payload);
    return response.data; 
    // Aquí devolvemos CheckoutResponse porque contiene la payment_url de MercadoPago/Stripe
}

/**
 * Obtiene el historial de órdenes del usuario autenticado
 */
export async function getMyOrders(): Promise<IOrder[]> {
    try {
        const response = await apiClient.get<OrderApi[]>("/orders/my-orders");
        // Validamos que data sea un array antes de mapear
        return (response.data || []).map(toOrder);
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        throw error;
    }
}