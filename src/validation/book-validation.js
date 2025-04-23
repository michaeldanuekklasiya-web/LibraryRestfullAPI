import Joi from "joi";

const bookValidation = Joi.object({
  title: Joi.string().max(255).required(),
  author: Joi.string().max(255).required(),
  date: Joi.date().required(),
  category: Joi.string().max(100).required(),
  image: Joi.string().max(255),
  description: Joi.string(),
  publisher: Joi.string().max(255),
  year_published: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
  page_count: Joi.number().integer().min(1).required(),
  format: Joi.string().max(100).required(),
  doi: Joi.string().max(100),
});

const updateBookValidation = Joi.object({
  title: Joi.string().max(255),
  author: Joi.string().max(255),
  date: Joi.date(),
  category: Joi.string().max(100),
  image: Joi.string().max(255),
  description: Joi.string(),
  publisher: Joi.string().max(255),
  year_published: Joi.number().integer().min(1000).max(new Date().getFullYear()),
  page_count: Joi.number().integer().min(1),
  format: Joi.string().max(100),
  doi: Joi.string().max(100),
}).min(1);

export { bookValidation, updateBookValidation };
