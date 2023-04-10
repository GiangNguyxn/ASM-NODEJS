import Joi from "joi";

export const productValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string(),
  price: Joi.number(),
  des: Joi.string(),
  // image: Joi.string(),
  categoryId: Joi.string(),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
});
