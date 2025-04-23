import collectionService from "../services/collection-service.js";
import ResponseSuccess from "../utils/response-success.js";
import { formatCollectionData } from "../utils/helper.js";

const createCollection = async (req, res) => {
  try {
    const collection = await collectionService.create(req.body);

    const response = ResponseSuccess.created(
      "Data added successfully",
      formatCollectionData(collection.book)
    );

    return res.status(response.status).json(response);
  } catch (error) {
    console.error(error instanceof ResponseError); // Log the error for debugging
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

// const deleteCollectionByUserAndBook = async (req, res) => {
//   try {
//     const { user_id, book_id } = req.query;

//     const deleted = await collectionService.deleteByUserAndBook(user_id, book_id);

//     if (deleted === 0) {
//       return res.status(404).json({
//         status_code: 404,
//         message: "Collection not found for the given user_id and book_id",
//       });
//     }

//     return res.status(200).json({
//       error: false,
//       message: "Collection deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status_code: 500,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

export default {
  createCollection,
  getAllCollections,
  deleteCollectionById,
};
