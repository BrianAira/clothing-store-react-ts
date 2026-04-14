import {
  type ICategory,
  type IProduct,
  // type ICategory,
  // type NewProductPayload,
  // type UpdateProductPayload,
  // toProductImage,
  // toProductVariant,
  type IProductImage,
  type IProductVariant,
} from "../types/Product";
import type { ImageAPi as ImageApi, ProductApi, VariantApi } from "../types/Products.api";


export function toProductImage(api:ImageApi):IProductImage{
  return{
    id:api.id,
    url:api.url, 
    isPrimary:api.is_main
  };
}

export function toProductVariant(api:VariantApi):IProductVariant{
  return {
    id:api.id,
    size:api.talle,
    color:api.color,
    stock:api.stock_current,
    sku:api.sku
  };
}


export function toProduct(api: ProductApi): IProduct {
  
  const images=(api.images||[]).map(toProductImage);

  const variants=(api.variants||[]).map(toProductVariant);

  const primaryImage=images.find(img=>img.isPrimary)||images[0];


  return {
    id: api.id,
    name: api.name,
    description: api.description,
    price: api.price,
    rating: 5,
    imageUrl:primaryImage?.url|| "https://via.placeholder.com/400",
    allImages:images,
    variants:variants,
    categoryId: api.category_id,
    totalStock: variants.reduce((acc, v)=>acc+v.stock,0),
    // stock_min: api.stock_min,
    skuBase: api.sku_base,
  };
}


export interface CategoryApi {
  id: number;
  name: string;
}
export function toCategory(api: CategoryApi): ICategory {
  return {
    id: api.id,
    name: api.name,
  };
}