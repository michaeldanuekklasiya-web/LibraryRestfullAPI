import bookService from '../services/book-service.js';

const uploadBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await bookService.create(bookData);

    return res.status(201).json({
      status_code: 201,
      message: 'Data Added Successfully',
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export default {
  uploadBook
}