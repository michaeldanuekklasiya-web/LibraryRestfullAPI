import collectionService from "../services/collection-service.js";
import ResponseSuccess from "../utils/response-success.js";
import { formatCollectionData } from "../utils/helper.js";

const createCollection = async (req, res, next) => {
  try {
    const collection = await collectionService.create(req.body);

    const response = ResponseSuccess.created(
      "Data added successfully",
      formatCollectionData(collection.book)
    );

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllCollections = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { books, total_record } = await collectionService.findAll(limit, offset);

    const formattedCollections = books.map(formatCollectionData);

    return res.status(200).json({
      error: false,
      message: "Collection data retrieved successfully",
      data: formattedCollections,
      pagination: {
        total_record,
        page,
        limit,
        total_pages: Math.ceil(total_record / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    next(error);
  }
};

const deleteCollectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await collectionService.deleteById(id);

    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createCollection,
  getAllCollections,
  deleteCollectionById,
};
