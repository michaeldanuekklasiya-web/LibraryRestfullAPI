import Collection from "../models/Collection.js";
import Book from "../models/Book.js";

const create = async (request) => {
  try {
    const { user_id, book_id } = request;

    if (!user_id || !book_id) throw new Error("user_id and book_id are required");

    const collection = await Collection.create({ user_id, book_id });
    return collection;
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    const collections = await Collection.findAll({
      include: [
        {
          model: Book,
          as: "book",
          attributes: ["title", "author", "category", "date"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return collections;
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const collection = await Collection.findOne({
      where: { id },
      include: [
        {
          model: Book,
          as: "book",
          attributes: ["title", "author", "category", "date"],
        },
      ],
    });

    if (!collection) throw new Error("Collection not found");
    const responseData = {
      id: collection.id,
      user_id: collection.user_id,
      book_id: collection.book_id,
      book_title: collection.book?.title,
      book_author: collection.book?.author,
      book_category: collection.book?.category,
      book_date: collection.book?.date,
    };
    await Collection.destroy({ where: { id } });
    return {
      error: false,
      message: "Collection deleted successfully",
      data: responseData,
    };
  } catch (error) {
    throw error;
  }
};

// const deleteByUserAndBook = async (user_id, book_id) => {
//   try {
//     if (!user_id || !book_id) throw new Error("user_id and book_id are required");

//     const deleted = await Collection.destroy({
//       where: { user_id, book_id },
//     });

//     if (!deleted) throw new Error("Collection not found or already deleted");

//     return { message: "Collection deleted successfully", deleted };
//   } catch (error) {
//     throw error;
//   }
// };

export default {
  create,
  findAll,
  deleteById,
};
