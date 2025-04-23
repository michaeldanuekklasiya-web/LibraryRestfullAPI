import bookService from "../services/book-service.js";

const uploadBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await bookService.create(bookData);

    const response = ResponseSuccess.created("Data added successfully", {
      user: formatUserData(newBook),
    });

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
    const response = ResponseSuccess.created("Data updated successfully", {
      user: formatUserData(updatedBook),
    });

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.remove(id);

    const response = ResponseSuccess.created("Data deleted successfully", {
      user: formatUserData(deletedBook),
    });

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllBook = async (req, res) => {
  try {
    const filters = {
      title: req.query.title || null,
      author: req.query.author || null,
      year_published: req.query.year || null,
      category: req.query.category || null,
    };

    const books = await bookService.findAll(filters);
    const response = ResponseSuccess.created("Data retrieved successfully", {
      user: formatUserData(books),
      pagination: {
        total_record: books.length,
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        totalPages: Math.ceil(books.length / (req.query.limit || 10)),
      },
    });

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
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
