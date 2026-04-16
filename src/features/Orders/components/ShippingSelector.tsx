import React from "react";
import { Card, CardBody, RadioGroup, Radio, Chip } from "@heroui/react";
import { TruckIcon, MapPinIcon, CalendarIcon } from "lucide-react";

interface ShippingOption {
  id: string;
  title: string;
  provider: string;
  eta: string; // "miércoles 11/03 y el lunes 16/03"
  price: number;
  type: "delivery" | "pickup";
}

export const ShippingSelector: React.FC = () => {
  // Estos datos vendrían idealmente de una API de logística
  const options: ShippingOption[] = [
    {
      id: "andreani-home",
      title: "Envío Nube - Andreani a domicilio",
      provider: "Andreani",
      eta: "miércoles 11/03 y el lunes 16/03",
      price: 0,
      type: "delivery"
    },
    {
      id: "correo-home",
      title: "Envío Nube - Correo Argentino Clásico",
      provider: "Correo Argentino",
      eta: "miércoles 11/03 y el martes 17/03",
      price: 0,
      type: "delivery"
    },
    {
      id: "pickup-1",
      title: "Punto de retiro - Sucursal Centro",
      provider: "Punto de retiro dos",
      eta: "miércoles 11/03 y el lunes 16/03",
      price: 0,
      type: "pickup"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <TruckIcon className="text-primary" size={20} /> Método de Entrega
      </h3>

      <RadioGroup label="Selecciona cómo quieres recibir tu compra">
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => (
            <Card 
              key={option.id}
              isPressable
              className="border-none bg-default-50 hover:bg-default-100 transition-colors"
            >
              <CardBody className="p-4 flex flex-row items-center gap-4">
                <Radio value={option.id} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm">{option.title}</p>
                    <Chip size="sm" color="success" variant="flat">
                      {option.price === 0 ? "Gratis" : `$${option.price}`}
                    </Chip>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-default-500">
                    <CalendarIcon size={14} />
                    <p className="text-tiny">
                      {option.type === "delivery" ? "Llega entre el" : "Retiras entre el"} <strong>{option.eta}</strong>
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};