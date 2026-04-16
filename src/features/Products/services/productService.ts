import * as productApi from "../api/products";
import type {
  IProduct,
  // NewProductPayload,
  // UpdateProductPayload,
} from "../types/Product";

export const productService = {

  getAll: async (filters?: {
    categories?: string[];
    price_min?: number;
    price_max?: number;
    sort?: string;
  }) => {
    return await productApi.getProducts(filters);
  },
  getById: async (id: number): Promise<IProduct> => {
    return await productApi.getProductById(id);
  },

};
