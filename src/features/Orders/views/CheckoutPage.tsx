import React, { useState, useEffect } from "react";
import { useCart } from "../../Cart/hooks/useCart";
// import { useCreateOrder } from "../hook/useOrder";
import { useNavigate } from "react-router";
import { useCheckout } from "../hooks/useOrder";
// import { useAddress } from "../../Auth/hooks/useAddress";
import {  CreditCardIcon, ShoppingBagIcon } from "lucide-react";
import { Button, Card, CardBody, CardHeader, Divider, Image, Badge } from "@heroui/react";
import { AddressSelector } from "../../Auth/components/AddressSelector";
import { useAuth } from "../../Auth/hooks/useAuth";
import { ShippingSelector } from "../components/ShippingSelector";
// import { useCreateOrder } from "../hooks/useOrder";

export const CheckoutPage: React.FC = () => {
    const { cart, totalPrice, items } = useCart();
    const { mutate: processCheckout, isPending } = useCheckout();
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [selectedShippingId, setSelectedShippingId]=useState<number|null>(null);
    const navigate = useNavigate();
    const {user}=useAuth()
    // Redirección si el carrito está vacío
    useEffect(() => {
        if (!isPending && items.length === 0) {
            navigate("/products");
        }
    }, [items, navigate, isPending]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Cambiado a cart?.id según la estructura de tu modelo
        if (!selectedAddressId || !cart?.cartId) return;
        
        console.log("Validación pasada, llamando a mutate...")
        processCheckout({
            cart_id: cart.cartId,
            shipping_address_id: selectedAddressId,
            // shipping_method_id:selectedShippingId,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3">
                <ShoppingBagIcon size={32} className="text-primary" />
                Finalizar Compra
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* COLUMNA IZQUIERDA: Direcciones (2/3 del ancho) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-2 shadow-sm border-none bg-white dark:bg-neutral-900">
                        <CardBody>
                            {/* Cambio importante: Usamos el componente unificado */}
                            <AddressSelector 
                            userId={user!.id}
                                selectedId={selectedAddressId} 
                                onSelect={setSelectedAddressId} 
                            />
                        </CardBody>
                    </Card>
                </div>
                {selectedAddressId&&(
                    <Card className="p-4 shadow-sm border-none bg-white dark:bg-neutral-900 animate-appearance-in">
                            <CardBody>
                                <ShippingSelector 
                                    // selectedId={selectedShippingId}
                                    // onSelect={setSelectedShippingId}
                                />
                            </CardBody>
                        </Card>
                )}

                {/* COLUMNA DERECHA: Resumen de Compra (1/3 del ancho) */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24 shadow-md border-none">
                        <CardHeader className="flex flex-col items-start px-6 pt-6">
                            <h2 className="text-xl font-bold">Resumen del Pedido</h2>
                            <p className="text-small text-default-500">{items.length} productos en tu carrito</p>
                        </CardHeader>
                        
                        <Divider className="my-2" />
                        
                        <CardBody className="px-6">
                            {/* Lista de productos mejorada */}
                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.variantId} className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <Badge content={item.quantity} color="primary" variant="flat" size="sm">
                                                <Image
                                                    src={item.imageUrl || "/placeholder-product.png"}
                                                    alt={item.name}
                                                    className="w-12 h-12 object-cover rounded-lg bg-default-100"
                                                />
                                            </Badge>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium line-clamp-1">{item.name}</span>
                                                <span className="text-tiny text-default-400">Unit: ${item.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Desglose de costos */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-default-600">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-success font-medium">
                                    <span>Envío</span>
                                    <span>Gratis</span>
                                </div>
                                
                                <Divider className="my-4" />
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-black text-primary">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Botón de acción principal */}
                            <form onSubmit={handleSubmit} className="mt-8">
                                <Button
                                    type="submit"
                                    color="primary"
                                    size="lg"
                                    className="w-full font-bold shadow-lg"
                                    isLoading={isPending}
                                    isDisabled={!selectedAddressId}
                                    startContent={!isPending && <CreditCardIcon size={20} />}
                                >
                                    {isPending ? "Procesando..." : "Proceder al Pago"}
                                </Button>
                                {!selectedAddressId && (
                                    <p className="text-tiny text-danger text-center mt-2 italic">
                                        * Selecciona una dirección para continuar
                                    </p>
                                )}
                            </form>
                        </CardBody>
                    </Card>
                </div>

            </div>
        </div>
    );
};
