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
```Response
{
    "status_code": 201,
    "message": "Data Added Successfully",
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
```Response
{
    "status_code": 200,
    "message": "Get All Data Book",
    "data": {
        "command": "SELECT",
        "rowCount": 3,
        "rows": [
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
            },
            {
                "id": 3,
                "title": "Blockchain Technology: A Comprehensive Guide",
                "author": "David Smith",
                "date": "2023-09-14T17:00:00.000Z",
                "category": "Journal",
                "image": "images/blockchain-guide.jpg",
                "description": "A thorough guide to understanding blockchain technology and its applications across industries.",
                "publisher": "Blockchain Press",
                "year_published": 2023,
                "page_count": 600,
                "format": "Hardcover",
                "doi": "10.1234/blockchain.guide.2023.33445566"
            },
            {
                "id": 4,
                "title": "Deep Learning for Computer Vision",
                "author": "Emily Taylor",
                "date": "2024-02-17T17:00:00.000Z",
                "category": "Article",
                "image": "images/deep-learning-vision.jpg",
                "description": "An article discussing deep learning techniques and their use in computer vision applications.",
                "publisher": "AI Publications",
                "year_published": 2024,
                "page_count": 280,
                "format": "Paperback",
                "doi": "10.3345/deep-learning.2024.55667788"
            }
        ]
    }
}
```

### Get Detail Books
- URL
    - /books/id
- Method
    - GET
```Response
{
    "status_code": 200,
    "message": "Data ditemukan",
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

### Update Books/id
- URL
    - /books/id
- Method
    - GET
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
    "status_code": 200,
    "message": "Data Updated Successfully",
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
