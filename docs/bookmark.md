# API for Library Digital / Perpustakaan
A Digital Library is a platform or system that provides access to a collection of library materials in digital form, allowing users to access, search, and read various types of resources without the need to visit a physical library.

## Endpoint
https://localhost:3000/api/v1

### Book Collection ( Bookmarks )
- URL
    - /collections
- Method
    - POST
- Headers
    - `Authorization`: `Bearer <token>`
- Request Body
    - user_id as integer
    - book_id as integer
```Response
{
    "error": false,
    "message": "Successfully saved book to collection",
    "data": {
        "id": 1,
        "user_id": 1,
        "book_id": 2
    }
}
```

### Get Book Collection
- URL
    - /collections
- Method
    - GET
- Headers
    - `Authorization`: `Bearer <token>`
- Parameters
    - category : journal/ebook
```Response
{
    "error": false,
    "message": "Collection data retrieved successfully",
    "data": [
        {
            "id": 3,
            "user_id": 1,
            "book_id": 2,
            "book_title": "The Future of Artificial Intelligence",
            "book_author": "Sarah Williams",
            "book_category": "Article",
            "book_date": "2023-11-22T00:00:00.000Z"
        }
    ],
    "pagination": {
        "total_record": 100,
        "page": 1,
        "limit": 8,
        "total_pages": 10
    }
}
```

### Delete Book from Collection
- URL
    - /collections/{id}
- Method
    - DELETE
- Headers
    - `Authorization`: `Bearer <token>`
```Response
{
    "error": false,
    "message": "Collection deleted successfully"
    "data": {
        "id": 3,
        "user_id": 1,
        "book_id": 2,
        "book_title": "The Future of Artificial Intelligence",
        "book_author": "Sarah Williams",
        "book_category": "Article",
        "book_created_at": "2025-04-10T02:25:12.350Z"
    }
}
```