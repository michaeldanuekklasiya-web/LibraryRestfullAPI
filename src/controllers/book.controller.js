import bookService from "../services/book.service.js";
import { ResponseSuccess } from "../utils/response.default.js";
import { formatBookData } from "../utils/helper.js";
import { validate as isValidUuid } from "uuid";

const uploadBook = async (req, res, next) => {
  try {
    const bookData = req.body;

    const newBook = await bookService.create(bookData);
    const response = ResponseSuccess.created("Data added successfully", formatBookData(newBook));

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedBook = await bookService.update(id, newData);
    const response = ResponseSuccess.ok("Data updated successfully", formatBookData(updatedBook));

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.remove(id);

    const response = ResponseSuccess.ok("Data deleted successfully", formatBookData(deletedBook));

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const getAllBook = async (req, res, next) => {
  try {
    const filters = {
      title: req.query.title || null,
      author: req.query.author || null,
      year_published: req.query.year || null,
      category: req.query.category || null,
    };

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { books, total_record } = await bookService.findAll(filters, limit, offset);

    const formattedBooks = books.map(formatBookData);
    const totalPages = Math.ceil(total_record / limit);

    const meta = {
      pagination: {
        total_record,
        page,
        limit,
        total_pages: totalPages,
      },
    };

    const response = ResponseSuccess.ok("Data retrieved successfully", formattedBooks, meta);

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidUuid(id)) {
      return res.status(400).json({ error: true, message: "Invalid UUID" });
    }

    const book = await bookService.findById(id);
    if (!book) {
      return res.status(404).json({ error: true, message: "Book not found" });
    }

    const response = ResponseSuccess.ok("Data retrieved successfully", formatBookData(book));
    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

export default {
  uploadBook,
  updateBook,
  deleteBook,
  getAllBook,
  getBookById,
};
