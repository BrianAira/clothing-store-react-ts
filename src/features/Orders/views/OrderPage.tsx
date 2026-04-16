import React from "react";
import { useMyOrders, useUpdateOrderStatus } from "../hooks/useOrder";
import { Link } from "react-router";
import {
    Accordion,
    AccordionItem,
    Chip,
    Card,
    CardBody,
    Divider,
    Button,
    Skeleton
} from "@heroui/react";
import {
    FaBagShopping,
    FaArrowLeft,
    FaTruckFast,
    FaRegCalendarDays,
    FaCircleCheck,
    FaClock,
    FaCheck
} from "react-icons/fa6";
import { OrderItemRow } from "../components/OrderItemRow";
// import { OrderItemRow } from "../components/OrderItemRow";

// Configuración de estados normalizada a minúsculas
const getStatusConfig = (status: string = "") => {
    const s = status.toLowerCase();
    switch (s) {
        case 'completed': 
            return { color: "success" as const, icon: <FaCircleCheck />, label: "Completado" };
        case 'pending': 
            return { color: "warning" as const, icon: <FaClock />, label: "Pendiente" };
        case 'cancelled': 
            return { color: "danger" as const, icon: null, label: "Cancelado" };
        default: 
            return { color: "default" as const, icon: null, label: s || "Desconocido" };
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return "Fecha no disponible";
    return new Date(dateString).toLocaleDateString("es-ES", {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

export const OrderPage: React.FC = () => {
    const { data: orders = [], isLoading, isError } = useMyOrders();
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

    if (isLoading) return (
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
            <Skeleton className="h-12 w-1/3 rounded-lg" />
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
        </div>
    );

    if (isError) return (
        <div className="p-10 text-center text-danger font-medium">
            Hubo un problema al cargar tus órdenes. Por favor, intenta de nuevo.
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <FaBagShopping className="text-indigo-600" />
                        Mis Compras
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Historial de tus pedidos recientes
                    </p>
                </div>
                <Button
                    as={Link}
                    to="/products"
                    variant="flat"
                    color="primary"
                    startContent={<FaArrowLeft />}
                >
                    Ir a la tienda
                </Button>
            </div>

            {orders.length === 0 ? (
                <Card className="py-16 text-center bg-gray-50 dark:bg-neutral-800/50 border-none shadow-none">
                    <CardBody className="items-center">
                        <FaBagShopping size={48} className="text-gray-300 mb-4" />
                        <p className="text-gray-500 mb-6 font-medium">No tienes órdenes registradas aún.</p>
                        <Button as={Link} to="/products" color="primary" variant="shadow">
                            Comenzar a comprar
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                <Accordion variant="splitted" className="px-0">
                    {orders.map((order) => {
                        const statusConfig = getStatusConfig(order.status);
                        const isCompleted = order.status?.toLowerCase() === 'completed';
                        const orderTotal = Number(order.total || 0);

                        return (
                            <AccordionItem
                                key={order.id}
                                aria-label={`Orden #${order.id}`}
                                classNames={{
                                    base: "group-[.is-splitted]:bg-white dark:group-[.is-splitted]:bg-neutral-800 group-[.is-splitted]:shadow-sm border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all",
                                    title: "font-semibold text-gray-700 dark:text-gray-200",
                                    subtitle: "text-gray-400"
                                }}
                                startContent={
                                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-lg shadow-sm">
                                        #{order.id}
                                    </div>
                                }
                                title={
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span>Orden de Compra</span>
                                        <Chip
                                            color={statusConfig.color}
                                            variant="flat"
                                            size="sm"
                                            startContent={statusConfig.icon}
                                            className="capitalize font-medium"
                                        >
                                            {statusConfig.label}
                                        </Chip>
                                    </div>
                                }
                                subtitle={
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <FaRegCalendarDays />
                                        {formatDate(order.orderDate)}
                                    </div>
                                }
                            >
                                <div className="pt-2 pb-4">
                                    {/* Información de Envío */}
                                    <div className="flex items-start gap-3 p-4 mb-6 bg-gray-50 dark:bg-neutral-900/50 rounded-xl border border-gray-100 dark:border-neutral-800">
                                        <div className="p-2.5 bg-white dark:bg-neutral-800 rounded-full shadow-sm text-indigo-500">
                                            <FaTruckFast size={18} />
                                        </div>
                                        <div className='flex-1'>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dirección de entrega</p>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5">
                                                {order.shippingAddress || "Retiro en sucursal / No especificada"}
                                            </p>
                                        </div>

                                        {isCompleted ? (
                                            <div className="ml-auto flex items-center gap-2 text-success font-semibold text-xs border border-success-200 bg-success-50 dark:bg-success-900/10 px-3 py-1.5 rounded-full">
                                                <FaCheck />
                                                <span>Entregado</span>
                                            </div>
                                        ) : (
                                            <Button
                                                className="ml-auto font-bold"
                                                color="success"
                                                variant="flat"
                                                size="sm"
                                                onPress={() => updateStatus({ id: order.id, status: "Completed" })}
                                                isLoading={isUpdating}
                                                startContent={!isUpdating && <FaCheck />}
                                            >
                                                Confirmar llegada
                                            </Button>
                                        )}
                                    </div>

                                    {/* Lista de Productos */}
                                    <div className="space-y-1">
                                        {order.items?.map((item, idx) => (
                                            <OrderItemRow key={`${order.id}-${idx}`} item={item} />
                                        ))}
                                    </div>

                                    <Divider className="my-5 opacity-50" />

                                    {/* Total Footer */}
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-sm text-gray-500 font-medium">Total de la transacción</span>
                                        <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                            ${orderTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </div>
    );
};