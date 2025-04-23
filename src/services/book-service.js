import Book from "../models/Book.js";
import { Op } from "sequelize";
import { isDefined } from "../utils/helper.js";
import { validate } from "../validation/validation.js";
import { bookValidation, updateBookValidation } from "../validation/book-validation.js";
import ResponseError from "../utils/response-error.js";

const create = async (request) => {
  const {
    title,
    author,
    date,
    category,
    image,
    description,
    publisher,
    year_published,
    page_count,
    format,
    doi,
  } = validate(bookValidation, request);

  const newBook = await Book.create({
    title,
    author,
    date,
    category,
    image,
    description,
    publisher,
    year_published,
    page_count,
    format,
    doi,
  });

  if (!newBook) throw ResponseError.badRequest("Failed to create book");

  return newBook;
};

const findAll = async (query = {}) => {
  const where = {};

  const likeFields = ["title", "author", "category"];
  likeFields.forEach((field) => {
    if (isDefined(query[field])) {
      where[field] = { [Op.iLike]: `%${query[field]}%` };
    }
  });

  if (isDefined(query.year_published) && !isNaN(query.year_published)) {
    where.year_published = parseInt(query.year_published, 10);
  }

  const books = await Book.findAll({ where });

  if (!books.length) throw ResponseError.notFound("Book not found");

  return books;
};

const findById = async (id) => {
  if (!id || isNaN(id)) throw ResponseError.badRequest("Invalid ID");

  const book = await Book.findByPk(id);

  if (!book) throw ResponseError.notFound("Book not found");

  return book;
};

const update = async (id, updateData) => {
  const { error, value } = updateBookValidation.validate(updateData);
  if (error) throw ResponseError.badRequest(`Validation error: ${error.details[0].message}`);

  const book = await findById(id);
  await book.update(value);
  return book;
};

const remove = async (id) => {
  const book = await findById(id);
  await book.destroy();
  return book;
};

export default {
  create,
  findAll,
  findById,
  update,
  remove,
};gi