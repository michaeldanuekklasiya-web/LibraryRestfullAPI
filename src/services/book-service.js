import Book from "../models/Book.js";
import { Op } from "sequelize";

const create = async (request) => {
  try {
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
    } = request;

    const book = await Book.create({
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

    if (book.affectedRows === 0) throw new ResponseError(500, "Failed to create Book");

    return book;
  } catch (e) {
    throw e;
  }
};

const findAll = async (filters = {}) => {
  const where = {};

  if (filters.title !== null && filters.title !== undefined) {
    where.title = { [Op.like]: `%${filters.title}%` };
  }

  if (filters.category !== null && filters.category !== undefined) {
    where.category = { [Op.like]: `%${filters.category}%` };
  }

  return await Book.findAll({ where });
};

const findById = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found");
  return book;
};

const update = async (id, updateData) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found");

  await book.update(updateData);
  return book;
};

const remove = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found");

  await book.destroy();
  return { message: "Book deleted successfully" };
};

export default {
  create,
  update,
  remove,
  findAll,
  findById,
};
