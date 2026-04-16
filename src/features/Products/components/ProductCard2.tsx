import { 
    Card, 
    CardBody, 
    CardFooter, 
    Image, 
    Button,
    // Spinner 
} from "@heroui/react";
import { FiShoppingCart, FiEye, FiStar } from "react-icons/fi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "../types/Product";

interface ProductCardProps {
  product: IProduct;
  isCompact?: boolean;
  onAddToCart?: (product: IProduct) => void;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProductCard = ({ 
  product, 
  isCompact = false, 
  onAddToCart, 
  isAdmin = false,
  onEdit,
  onDelete 
}: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      // isPressable 
      shadow="sm" 
      className="bg-white dark:bg-neutral-800 border-none hover:translate-y-[-4px] transition-transform duration-300"
      onPress={() => navigate(`/products/${product.id}`)}
    >
      <CardBody className="p-0 overflow-hidden relative">
        {/* Botones de Admin con stopPropagation en el contenedor */}
        {isAdmin && !isCompact && (
          <div className="absolute top-2 right-2 z-20 flex gap-1">
            <div onClick={(e) => e.stopPropagation()}>
              <Button isIconOnly size="sm" color="warning" variant="flat" onPress={onEdit}>
                <AiFillEdit />
              </Button>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Button isIconOnly size="sm" color="danger" variant="flat" onPress={onDelete}>
                <AiFillDelete />
              </Button>
            </div>
          </div>
        )}
        
        <Image
          isZoomed
          alt={product.name}
          className="w-full object-cover h-[220px]"
          radius="none"
          src={product.imageUrl || product.allImages?.[0]?.url}
          width="100%"
        />
      </CardBody>

      <CardFooter className="flex-col items-start px-4 py-4 gap-2">
        <div className="flex justify-between w-full items-start gap-2">
          <h4 className="font-bold text-gray-800 dark:text-white text-medium truncate flex-1">
            {product.name}
          </h4>
          <span className="text-gray-600 dark:text-indigo-400 font-extrabold text-lg">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {!isCompact && (
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  fill={i < Math.round(product.rating || 0) ? "currentColor" : "none"} 
                  className="w-3 h-3"
                />
              ))}
            </div>
            <span className="text-tiny text-default-400">({product.rating})</span>
          </div>
        )}

        <div className="flex w-full gap-2 mt-2">
          <Button
            className="flex-1 font-bold text-tiny"
            variant="flat"
            color="primary"
            size="sm"
            startContent={!isCompact && <FiEye />}
            onPress={() => navigate(`/products/${product.id}`)}
          >
            {isCompact ? "Ver Más" : "Detalles"}
          </Button>

          {/* Contenedor para evitar que el click en 'Añadir' dispare el 'onPress' de la Card */}
          <div onClick={(e) => e.stopPropagation()} className={isCompact ? "flex-1" : ""}>
            <Button
              isIconOnly={!isCompact}
              className="w-full font-bold text-tiny min-w-[40px]"
              color="primary"
              size="sm"
              onPress={() => onAddToCart?.(product)}
            >
              {isCompact ? "Añadir" : <FiShoppingCart />}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};