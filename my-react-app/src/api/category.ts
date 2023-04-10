import instance from "./instance";
import { token } from "./instance";

export const getAllCate = () => {
  return instance.get("/categories");
};
export const removeCate = (id: number | string) => {
  return instance.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};
export const addCategory = (category) => {
  return instance.post("/categories", category, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};
export const updateCategory = (category) => {
  const _id = category._id;
  return instance.patch(`/categories/${_id}`, category, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};
