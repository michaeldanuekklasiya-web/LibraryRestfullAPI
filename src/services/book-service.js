import Book from "../models/Book.js";
import { Op } from "sequelize";
import { isDefined } from "../utils/helper.js";

const create = async (data) => {
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
    } = data;

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

    if (!newBook) throw new Error("Failed to create book");

    return newBook;
  } catch (error) {
    throw error;
  }
};

const findAll = async (query = {}) => {
  try {
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
    if (!books.length) throw new Error("Book not found");

    return books;
  } catch (error) {
    throw error;
  } 
};

const findById = async (id) => {
  try {
    if (!id || isNaN(id)) throw new Error("Invalid ID");

    const book = await Book.findByPk(id);
    if (!book) throw new Error("Book not found");

    return book;
  } catch (error) {
    throw error;
  }
};

const update = async (id, updateData) => {
  try {
    const book = await findById(id);
    await book.update(updateData);
    return book;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const book = await findById(id);
    await book.destroy();
    return book;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  findAll,
  findById,
  update,
  remove,
};