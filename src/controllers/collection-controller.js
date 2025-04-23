import collectionService from "../services/collection-service.js";

const createCollection = async (req, res) => {
  try {
    const collection = await collectionService.create(req.body);

    return res.status(201).json({
      error: false,
      message: "Successfully saved book to collection",
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

    const formattedCollections = collections.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      book_id: item.book_id,
      book_title: item.book.title,
      book_author: item.book.author,
      book_category: item.book.category,
      book_date: item.book.date,
    }));

    return res.status(200).json({
      error: false,
      message: "Collection data retrieved successfully",
      data: formattedCollections,
      pagination: {
        total_record: collections.length,
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        totalPages: Math.ceil(collections.length / (req.query.limit || 10)),
      },
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

    const result = await collectionService.deleteById(id);

    return res.status(200).json({
      error: false,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    const status = error.message === "Collection not found" ? 404 : 500;
    return res.status(status).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
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
