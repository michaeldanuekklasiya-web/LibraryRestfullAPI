import collectionService from "../services/collection.service.js";
import ResponseSuccess from "../utils/response.success.js";
import { formatCollectionData } from "../utils/helper.js";

const createCollection = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = { ...req.body, user_id: userId };

    const collection = await collectionService.create(data);

    const response = ResponseSuccess.created(
      "Data added successfully",
      formatCollectionData(collection.book)
    );

    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

const getAllCollections = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    console.log(userId);
    const { books, total_record } = await collectionService.findAll(userId, limit, offset);

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

const deleteCollectionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("ID dari param:", id);

    const userIdFromToken = req.user?.id;
    console.log("User ID dari token:", userIdFromToken);

    if (!userIdFromToken) {
      return next(ResponseError.unauthorized("Invalid token"));
    }

    // Panggil service untuk menghapus koleksi berdasarkan ID dan user_id
    const result = await collectionService.deleteById(id, userIdFromToken);
    console.log("Hasil delete:", result);

    const response = ResponseSuccess.ok("Collection deleted successfully", result?.data || null);
    return res.status(response.statusCode).json(response.body);
  } catch (error) {
    console.error("DELETE ERROR:", error);
    next(error);
  }
};

export default {
  createCollection,
  getAllCollections,
  deleteCollectionById,
};
