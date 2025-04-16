# API for Library Digital / Perpustakaan
A Digital Library is a platform or system that provides access to a collection of library materials in digital form, allowing users to access, search, and read various types of resources without the need to visit a physical library.

## Endpoint
https://localhost:3000/api/v1

### Upload Books
- URL
    - /books
- Method
    - POST
- Request Body
    - title as string
    - author as string
    - date as date (YYYY-MM-DD)
    - category as string
    - image as string (URL or path)
    - description as string
    - publisher as string
    - year_published as string (or number if perlu)
    - page_count as string (or number)
    - format as string
    - doi as string
