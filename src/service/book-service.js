import Book from "../models/books";
const createBook = async (request) => {
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
        doi
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
        doi
      });
     
      if (book.affectedRows === 0) throw new ResponseError(500, "Failed to create Book");

  
      return book;
    } catch (e) {
      throw e;
    }
};
  
export default {
    createBook,
};