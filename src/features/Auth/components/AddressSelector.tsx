import React, { useEffect, useState } from "react";
import { 
  Card, CardBody, Button, useDisclosure, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Input, RadioGroup, Radio 
} from "@heroui/react";
// import { useUserAddresses, useCreateAddress } from "../hooks/useAuth";
import { type IAddress, type IAddressRequest } from "../types/user.ts"; // Tus interfaces
import { PlusIcon, MapPinIcon, 
    // HomeIcon 
} from "lucide-react";
import { useAddress } from "../hooks/useAddress";

interface AddressSelectorProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
  userId: number; // Necesario para el payload de IAddressRequest
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({ selectedId, onSelect }) => {
  const { addresses, isLoading, createNewAddress, getAddresses } = useAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();

// Estado local para el formulario (Omitimos user_id porque el hook lo pone)
  const [formData, setFormData] = useState<Omit<IAddressRequest, "user_id">>({
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Argentina",
    additional_info: ""
  });

// Cargamos las direcciones al montar si no existen
    useEffect(() => {
        getAddresses();
    }, []);  

  const handleCreate = async () => {
    await createNewAddress(formData);
    // Nota: Como Redux actualiza la lista global, el nuevo elemento 
    // aparecerá automáticamente en 'addresses'
    onClose();
    setFormData({
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Argentina",
      additional_info: ""
    });
  };

  if (isLoading&&addresses.length===0) return <div className="h-40 w-full bg-default-100 animate-pulse rounded-xl" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
          <MapPinIcon className="text-primary" size={20} /> Mis Direcciones
        </h3>
        <Button 
          size="sm" 
          color="primary" 
          variant="flat"
          startContent={<PlusIcon size={16} />}
          onPress={onOpen}
        >
          Nueva Dirección
        </Button>
      </div>

      <RadioGroup
        value={selectedId?.toString()}
        onValueChange={(val) => onSelect(Number(val))}
      >
        <div className="grid grid-cols-1 gap-3">
          {addresses?.map((addr: IAddress) => (
            <Card 
              key={addr.id} 
              isPressable
              className={`border-2 transition-all ${
                selectedId === addr.id ? "border-primary bg-primary-50/20" : "border-default-100"
              }`}
              onPress={() => onSelect(addr.id)}
            >
              <CardBody className="flex flex-row items-center gap-4 p-4">
                <Radio value={addr.id.toString()} />
                <div className="flex flex-col overflow-hidden">
                  <p className="font-semibold text-sm truncate">{addr.street_address}</p>
                  <p className="text-tiny text-default-500">
                    {addr.city}, {addr.state} ({addr.postal_code})
                  </p>
                  {addr.additional_info && (
                    <p className="text-tiny italic text-default-400 mt-1">
                      Ref: {addr.additional_info}
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </RadioGroup>

      {/* Modal de Creación Adaptado a IAddressRequest */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Registrar Dirección</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Calle y Número"
                placeholder="Ej: Av. Siempreviva 742"
                value={formData.street_address}
                onValueChange={(v) => setFormData({...formData, street_address: v})}
                className="md:col-span-2"
                isRequired
              />
              <Input
                label="Ciudad"
                value={formData.city}
                onValueChange={(v) => setFormData({...formData, city: v})}
                isRequired
              />
              <Input
                label="Provincia / Estado"
                value={formData.state}
                onValueChange={(v) => setFormData({...formData, state: v})}
                isRequired
              />
              <Input
                label="Código Postal"
                value={formData.postal_code}
                onValueChange={(v) => setFormData({...formData, postal_code: v})}
                isRequired
              />
              <Input
                label="País"
                value={formData.country}
                onValueChange={(v) => setFormData({...formData, country: v})}
                isRequired
              />
              <Input
                label="Información Adicional (Opcional)"
                placeholder="Piso, Depto, timbre..."
                value={formData.additional_info}
                onValueChange={(v) => setFormData({...formData, additional_info: v})}
                className="md:col-span-2"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancelar</Button>
            <Button 
              color="primary" 
              isLoading={isLoading} 
              onPress={handleCreate}
              isDisabled={!formData.street_address || !formData.city || !formData.postal_code}
            >
              Guardar Dirección
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};