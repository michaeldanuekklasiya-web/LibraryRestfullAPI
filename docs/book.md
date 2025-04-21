# API for Library Digital / Perpustakaan
A Digital Library is a platform or system that provides access to a collection of library materials in digital form, allowing users to access, search, and read various types of resources without the need to visit a physical library.

## Endpoint
https://localhost:3000/api/v1

### Upload Books
- URL
    - /books
- Method
    - POST
- Headers
    - `Authorization`: `Bearer <token>`
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
```Response
{
    "error": false,
    "message": "Data added successfully",
    "data": {
        "id": 2,
        "title": "Cybersecurity in the Modern Era: Protecting Digital Assets",
        "author": "Mark Johnson",
        "date": "2024-01-04T17:00:00.000Z",
        "category": "Journal",
        "image": "images/cybersecurity-modern.jpg",
        "description": "An in-depth analysis of cybersecurity threats and defense mechanisms, with a focus on modern digital infrastructures.",
        "publisher": "SecureWorld Press",
        "year_published": 2024,
        "page_count": 520,
        "format": "Hardcover",
        "doi": "10.4455/cybersec.2024.66778899"
    }
}
```

### Get Data All Books
- URL
    - /books
- Method
    - GET
- Headers
    - `Authorization`: `Bearer <token>`
```Response
{
    "error": false,
    "message": "Data retrieved successfully"
    "data": [
        {
            "id": 1,
            "title": "Cybersecurity in the Modern Era: Protecting Digital Assets",
            "author": "Mark Johnson",
            "date": "2024-01-04T17:00:00.000Z",
            "category": "Journal",
            "image": "images/cybersecurity-modern.jpg",
            "description": "An in-depth analysis of cybersecurity threats and defense mechanisms, with a focus on modern digital infrastructures.",
            "publisher": "SecureWorld Press",
            "year_published": 2024,
            "page_count": 520,
            "format": "Hardcover",
            "doi": "10.4455/cybersec.2024.66778899"
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

### Get Detail Book
- URL
    - /books/{id}
- Method
    - GET
- Headers
    - `Authorization`: `Bearer <token>`
```Response
{
    "error": false,
    "message": "Data retrieved successfully"
    "data": {
        "id": 1,
        "title": "Cybersecurity in the Modern Era: Protecting Digital Assets",
        "author": "Mark Johnson",
        "date": "2024-01-04T17:00:00.000Z",
        "category": "Journal",
        "image": "images/cybersecurity-modern.jpg",
        "description": "An in-depth analysis of cybersecurity threats and defense mechanisms, with a focus on modern digital infrastructures.",
        "publisher": "SecureWorld Press",
        "year_published": 2024,
        "page_count": 520,
        "format": "Hardcover",
        "doi": "10.4455/cybersec.2024.66778899"
    }
}
```

### Update Book
- URL
    - /books/{id}
- Method
    - PUT
- Headers
    - `Authorization`: `Bearer <token>`
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
```Response
{
    "error": false,
    "message": "Data updated successfully",
    "data": {
        "id": 7,
        "title": "Advanced JavaScript and Modern Web Development",
        "author": "Johnathan Doe",
        "date": "2024-02-09T17:00:00.000Z",
        "category": "Web Development",
        "image": "images/advanced-js.jpg",
        "description": "An in-depth exploration of modern JavaScript features and web development frameworks, focusing on performance optimization and scalability.",
        "publisher": "Tech Innovate Publishing",
        "year_published": 2024,
        "page_count": 520,
        "format": "Hardcover",
        "doi": "10.1205/webdev.2024.00000"
    }
}
```

### Delete Book
- URL
    - /books/{id}
- Method
    - DELETE
- Headers
    - `Authorization`: `Bearer <token>`
```Response
{
    "error": false,
    "message": "Data deleted successfully",
    "data": {
        "id": 7,
        "title": "Advanced JavaScript and Modern Web Development",
        "author": "Johnathan Doe",
        "date": "2024-02-09T17:00:00.000Z",
        "category": "Web Development",
        "image": "images/advanced-js.jpg",
        "description": "An in-depth exploration of modern JavaScript features and web development frameworks, focusing on performance optimization and scalability.",
        "publisher": "Tech Innovate Publishing",
        "year_published": 2024,
        "page_count": 520,
        "format": "Hardcover",
        "doi": "10.1205/webdev.2024.00000"
    }
}
```

### Search & Filter Books
- URL
    - /books?title=The&category=Journal
- Method
    - GET
- Headers
    - `Authorization`: `Bearer <token>`
- Parameters
    - title : The
    - author: Mark
    - category : Journal
    - year : 2024
    - limit : 8
```Response
{
    "status": false,
    "message": "Data retrieved successfully"
    "data": [
        {
            "id": 1,
            "title": "Cybersecurity in the Modern Era: Protecting Digital Assets",
            "author": "Mark Johnson",
            "date": "2024-01-04T17:00:00.000Z",
            "category": "Journal",
            "image": "images/cybersecurity-modern.jpg",
            "description": "An in-depth analysis of cybersecurity threats and defense mechanisms, with a focus on modern digital infrastructures.",
            "publisher": "SecureWorld Press",
            "year_published": 2024,
            "page_count": 520,
            "format": "Hardcover",
            "doi": "10.4455/cybersec.2024.66778899"
        }
    ],
    "pagination": {
        "total_record": 2,
        "page": 1,
        "limit": 8,
        "total_pages": 1
    }
}
```