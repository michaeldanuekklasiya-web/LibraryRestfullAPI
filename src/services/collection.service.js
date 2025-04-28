import Collection from "../models/Collection.js";
import Book from "../models/Book.js";
import ResponseError from "../utils/response.error.js";

const create = async (request) => {
  const { user_id, book_id } = request;

  if (!user_id || !book_id) {
    throw ResponseError.badRequest("user_id and book_id are required");
  }

  const bookExists = await Book.findByPk(book_id);
  if (!bookExists) throw ResponseError.notFound("Book not found");
  const existingCollection = await Collection.findOne({
    where: { user_id, book_id },
  });

  if (existingCollection)
    throw ResponseError.conflict("This book is already bookmarked by the user");

  const collection = await Collection.create({ user_id, book_id });

  const createdCollection = await Collection.findOne({
    where: { id: collection.id },
    include: [
      {
        model: Book,
        as: "book",
        attributes: ["id", "title", "author", "category", "date"],
      },
    ],
  });

  return createdCollection;
};

const findAll = async (userId, limit, offset) => {
  const collections = await Collection.findAll({
    attributes: ["book_id"],
    where: { user_id: userId }, // ✅ Filter by user
  });

  const bookIds = collections.map((c) => c.book_id);

  if (bookIds.length === 0) {
    return { books: [], total_record: 0 };
  }

  const { count: total_record, rows: books } = await Book.findAndCountAll({
    where: {
      id: bookIds,
    },
    userId,
    limit,
    offset,
  });

  return { books, total_record };
};

const deleteById = async (book_id, userId) => {
  try {
    // Cari koleksi berdasarkan book_id dan user_id
    const collection = await Collection.findOne({
      where: {
        book_id, // book_id yang diterima dari parameter
        user_id: userId, // Pastikan koleksi milik user yang terautentikasi
      },
      include: [
        {
          model: Book,
          as: "book",
          attributes: ["title", "author", "category", "date"],
        },
      ],
    });

    // Jika koleksi tidak ditemukan, lemparkan error
    if (!collection) {
      throw ResponseError.notFound("Collection with this book_id not found");
    }

    // Melakukan penghapusan koleksi berdasarkan book_id dan user_id
    const result = await Collection.destroy({
      where: {
        book_id, // Menghapus berdasarkan book_id
        user_id: userId, // Pastikan hanya koleksi milik user yang dihapus
      },
    });

    // Jika tidak ada koleksi yang dihapus, lemparkan error
    if (result === 0) {
      throw ResponseError.notFound("Collection with this book_id not found or already deleted");
    }

    // Format data untuk dikembalikan sebagai respons
    const responseData = {
      id: collection.id,
      user_id: collection.user_id,
      book_id: collection.book_id,
      book_title: collection.book?.title,
      book_author: collection.book?.author,
      book_category: collection.book?.category,
      book_date: collection.book?.date,
    };

    return {
      error: false,
      message: "Collection deleted successfully",
      data: responseData,
    };
  } catch (error) {
    // Log error untuk debugging
    console.error("Error in deleteByBookId:", error);
    throw error; // Lemparkan error ke handler error yang ada
  }
};

export default {
  create,
  findAll,
  deleteById,
};
