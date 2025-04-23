import Collection from "../models/Collection.js";
import Book from "../models/Book.js";
import ResponseError from "../utils/response-error.js";

const create = async (request) => {
  const { user_id, book_id } = request;

  if (!user_id || !book_id) throw ResponseError.badRequest("user_id and book_id are required");

  const collection = await Collection.create({ user_id, book_id });
  return collection;
};

const findAll = async () => {
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
};

const deleteById = async (id) => {
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

  if (!collection) throw ResponseError.notFound("Collection not found");

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
};

export default {
  create,
  findAll,
  deleteById,
};
