import Collection from "../models/Collection.js";

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
    const collections = await Collection.findAll();
    return collections;
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await Collection.destroy({ where: { id } });
    if (!deleted) throw new Error("Collection not found or already deleted");
    return { message: "Collection deleted successfully", deleted };
  } catch (error) {
    throw error;
  }
};

const deleteByUserAndBook = async (user_id, book_id) => {
  try {
    if (!user_id || !book_id) throw new Error("user_id and book_id are required");

    const deleted = await Collection.destroy({
      where: { user_id, book_id },
    });

    if (!deleted) throw new Error("Collection not found or already deleted");

    return { message: "Collection deleted successfully", deleted };
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  findAll,
  deleteById,
  deleteByUserAndBook,
};