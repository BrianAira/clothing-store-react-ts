import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../services/orderService";
import { useCart } from "../../Cart/hooks/useCart";
// import { useNavigate } from "react-router";
import type { CheckoutPayload, CheckoutResponse, 
    // CreateOrderPayload 
} from "../types/Order";
import { useToast } from "../../../components/ui/ToastProvider";
import { apiClient } from "../../../services/apiClient";

export const useMyOrders = () => {
    return useQuery({
        queryKey: ["my-orders"],
        queryFn: orderService.getMyOrders,
        staleTime: 1000 * 60 * 5, // 5 minutos está perfecto
    });
};


export const useCheckout = () => {
    const queryClient = useQueryClient();
    const { emptyCart } = useCart();
    const { addToast } = useToast();

    return useMutation<CheckoutResponse, Error, CheckoutPayload>({
        // 1. Usamos CheckoutPayload (IDs) en lugar de CreateOrderPayload (Strings)
        mutationFn: (payload) => orderService.create(payload),
        
        onSuccess: async (data: CheckoutResponse) => {
            // 2. Vaciamos el carrito local
            await emptyCart();
            console.log(data)

            // 3. Invalidamos caché de órdenes
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });

            // 4. Lógica de Redirección:
            // Si la API nos dio una URL de pago, enviamos al usuario allá.
            if (data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                // Si por alguna razón no hay URL, enviamos a mis órdenes
                window.location.href = "/my-orders";
            }
        },
        onError: (error: any) => {
            console.error("Error en el checkout:", error);
            addToast("No se pudo procesar el pago. Inténtalo de nuevo.", "error");
        },
    });
};

/**
 * REFACTORIZADO: useUpdateOrderStatus
 * Tipado más estricto y limpieza de código.
 */
export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    return useMutation({
        mutationFn: async ({ id, status }: { id: number; status: string }) => {
            // Se mantiene el patch a la ruta de status
            const res = await apiClient.patch(`/orders/${id}/status`, { status });
            return res.data;
        },
        onSuccess: () => {
            // Refrescamos la lista para que el usuario vea el cambio de estado (ej: 'Entregado')
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
            addToast("¡Estado de la orden actualizado!", "success");
        },
        onError: () => {
            addToast("Error al actualizar la orden", "error");
        },
    });
};