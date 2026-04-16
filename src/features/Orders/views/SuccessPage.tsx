import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import { CheckCircleIcon } from 'lucide-react';

export const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Mercado Pago envía estos datos en la URL
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    return (
        <div className="container mx-auto px-4 py-16 max-w-lg text-center">
            <Card className="p-8 shadow-xl border-none bg-white dark:bg-neutral-900">
                <CardBody className="flex flex-col items-center gap-6">
                    <CheckCircleIcon size={80} className="text-success animate-bounce" />
                    
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        ¡Pago Exitoso!
                    </h1>
                    
                    <p className="text-gray-500 dark:text-neutral-400">
                        Tu pedido ha sido procesado correctamente. 
                        {paymentId && <span className="block mt-2 font-mono text-sm">Comprobante: {paymentId}</span>}
                    </p>

                    <div className="flex flex-col w-full gap-3 mt-4">
                        <Button 
                            color="primary" 
                            size="lg" 
                            onPress={() => navigate('/my-orders')}
                            className="font-bold"
                        >
                            Ver Mis Pedidos
                        </Button>
                        <Button 
                            variant="light" 
                            onPress={() => navigate('/products')}
                        >
                            Seguir Comprando
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};