import bookService from "../services/book-service.js";
import ResponseSuccess from "../utils/response-success.js";
import { formatBookData } from "../utils/helper.js";

const uploadBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await bookService.create(bookData);
    console.error(newBook);
    const response = ResponseSuccess.created("Data added successfully", formatBookData(newBook));

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedBook = await bookService.update(id, newData);
    const response = ResponseSuccess.created(
      "Data updated successfully",
      formatBookData(updatedBook)
    );

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.remove(id);

    const response = ResponseSuccess.created(
      "Data deleted successfully",
      formatBookData(deletedBook)
    );

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllBook = async (req, res, next) => {
  try {
    // Ambil filter dari query params
    const filters = {
      title: req.query.title || null,
      author: req.query.author || null,
      year_published: req.query.year || null,
      category: req.query.category || null,
    };

    // Ambil limit dan page dari query params, dengan default 10 untuk limit dan 1 untuk page
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit; // Hitung offset berdasarkan page dan limit

    // Panggil service untuk mendapatkan data buku dengan pagination
    const { books, total_record } = await bookService.findAll(filters, limit, offset);

    // Format data buku
    const formattedBooks = books.map(formatBookData);

    // Hitung total halaman (total_pages)
    const totalPages = Math.ceil(total_record / limit);

    // Struktur pagination
    const pagination = {
      total_record,
      page,
      limit,
      total_pages: totalPages,
    };

    // console.log("Total Records:", total_record);
    // console.log("Current Page:", page);
    // console.log("Limit:", limit);
    // console.log("Total Pages:", totalPages);

    // Kirim response dengan data buku dan pagination
    const response = ResponseSuccess.created(
      "Data retrieved successfully",
      formattedBooks,
      pagination
    );

    return res.status(response.status).json(response);
  } catch (error) {
    next(error); // Pass error to the next middleware (error handler)
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.findById(id);
    const response = ResponseSuccess.created("Data retrieved successfully", {
      user: formatUserData(book),
    });

    return res.status(response.status).json(response);
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
