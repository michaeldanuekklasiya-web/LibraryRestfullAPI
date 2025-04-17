import Collection from "../models/Collection.js";

const create = async (request) => {
  const { user_id, book_id } = request;

  if (!user_id || !book_id) {
    throw new Error("user_id and book_id are required");
  }

  const collection = await Collection.create({ user_id, book_id });
  return collection;
};

const findAll = async () => {
  const collections = await Collection.findAll();
  return collections;
};

const deleteById = async (id) => {
  const deleted = await Collection.destroy({ where: { id } });
  return deleted;
};

export default {
  create,
  findAll,
  deleteById,
};
