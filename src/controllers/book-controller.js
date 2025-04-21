import bookService from "../services/book-service.js";

const uploadBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await bookService.create(bookData);

    return res.status(201).json({
      status_code: 201,
      message: "Data Added Successfully",
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedBook = await bookService.update(id, newData);

    return res.status(200).json({
      status_code: 200,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    return res.status(404).json({
      status_code: 404,
      message: "Book not found",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.remove(id);

    return res.status(200).json({
      status_code: 200,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    return res.status(404).json({
      status_code: 404,
      message: "Book not found",
      error: error.message,
    });
  }
};

const getAllBook = async (req, res) => {
  try {
    const filters = {
      title: req.query.title || null,
      author: req.query.author || null,
      year_published: req.query.year || null,
      category: req.query.category || null
    };

    const books = await bookService.findAll(filters);

    return res.status(200).json({
      status_code: 200,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    return res.status(404).json({
      status_code: 404,
      message: "Book not found",
      error: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.findById(id);
    return res.status(200).json({
      status_code: 200,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    return res.status(404).json({
      status_code: 404,
      message: "Book not found",
      error: error.message,
    });
  }
};

export default {
  uploadBook,
  updateBook,
  deleteBook,
  getAllBook,
  getBookById,
};
