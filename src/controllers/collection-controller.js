import collectionService from "../services/collection-service.js";

const createCollection = async (req, res) => {
  try {
    const collection = await collectionService.create(req.body);

    return res.status(201).json({
      status_code: 201,
      message: "Book added to collection successfully",
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllCollections = async (req, res) => {
  try {
    const collections = await collectionService.findAll();

    return res.status(200).json({
      status_code: 200,
      message: "Collections fetched successfully",
      data: collections,
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteCollectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await collectionService.deleteById(id);

    if (deleted === 0) {
      return res.status(404).json({
        status_code: 404,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteCollectionByUserAndBook = async (req, res) => {
  try {
    const { user_id, book_id } = req.query;

    const deleted = await collectionService.deleteByUserAndBook(user_id, book_id);

    if (deleted === 0) {
      return res.status(404).json({
        status_code: 404,
        message: "Collection not found for the given user_id and book_id",
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default {
  createCollection,
  getAllCollections,
  deleteCollectionById,
  deleteCollectionByUserAndBook,
};
