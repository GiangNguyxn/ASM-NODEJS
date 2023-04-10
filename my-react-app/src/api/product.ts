import { IProduct } from "../interfaces/product";
import instance from "./instance";
import { token } from "./instance";
export const getAllProducts = () => {
  return instance.get("/products");
};
export const getLimit = () => {
  return instance.get("/products?_limit=3");
};

export const deleteProduct = (id: number | string) => {
  return instance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createProduct = (product: IProduct) => {
  return instance.post(`/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = (product: IProduct) => {
  const id = product._id;

  return instance.patch(`/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
