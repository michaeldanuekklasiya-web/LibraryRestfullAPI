import Book from "../models/Book.js";
import { Op } from "sequelize";
import { isDefined } from "../utils/helper.js";
import { validate } from "../validation/validation.js";
import { bookValidation, updateBookValidation } from "../validation/book.validation.js";
import ResponseError from "../utils/response.error.js";
import logger from "../config/logger.js";

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
  
  logger.info(`Book created successfully: ${newBook.id} - "${newBook.title}"`);
  return newBook;
};

const findAll = async (query = {}, limit, offset) => {
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

  const { count: total_record, rows: books } = await Book.findAndCountAll({
    where,
    limit,
    offset,
  });

  logger.info(`Books fetched: ${books.length} records, total: ${total_record}`);
  return { books, total_record };
};

const findById = async (id) => {
  if (!id || isNaN(id)) throw ResponseError.badRequest("Invalid ID");

  const book = await Book.findByPk(id);
  if (!book) throw ResponseError.notFound("Book not found");

  logger.info(`Book fetched by ID: ${id}`);
  return book;
};

const update = async (id, updateData) => {
  const value = validate(updateBookValidation, updateData);

  const book = await findById(id);
  await book.update(value);

  logger.info(`Book updated: ${id}`);
  return book;
};

const remove = async (id) => {
  const book = await findById(id);
  await book.destroy();

  logger.info(`Book deleted: ${id}`);
  return book;
};

export default {
  create,
  findAll,
  findById,
  update,
  remove,
};