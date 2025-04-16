# RESTful API for Library App
This is a RESTful API built for the Library Management System at Kampus Gratis. It provides essential features to manage books, categories, and user authentication.

## Feature
- CRUD for books (Create, Read, Update, Delete)
- User authentication (Register & Login)
- Book category management
- Search functionality (by title or author)
- Book image upload
- Request validation middleware
- User roles (Admin and Regular User)
- Book filter (by year or category)
- Book collection (bookmark)
- Book download (redirect to gDrive)

## Folder Structure
```
LibraryRestfullAPI/ 
│ 
├── docs/ 
│ └── library.md 
|
├── src/ 
│ ├── config/ 
│ ├── controllers/ 
│ ├── middlewares/ 
│ ├── models/ 
│ ├── routes/ 
│ ├── services/ 
│ ├── utils/ 
│ └── index.js 
│ 
├── .gitignore 
├── package-lock.json 
├── package.json 
└── README
```

## Tech Stack
|Package|Description|
|----|-----|
| express | Web framework for Node.js |
| nodemon | Auto-restarts server during changes |
| dotenv | Loads environment variables |
| cors | Enables Cross-Origin Resource Sharing |
| body-parser | Parses incoming request bodies |
| bcrypt / bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| pg           | PostgreSQL client for Node.js                |
| pg-hstore    | Serializes and deserializes JSON for Sequelize with PostgreSQL |
| sequelize    | Promise-based Node.js ORM for SQL databases  |

## Installation
1. `git clone https://github.com/michaeldanuekklasiya-web/LibraryRestfullAPI.git`
2. `cd LibraryRestfullAPI/`
3. `npm install`
4. `cp .env.example .env`

> Update your environment variables inside .env
npm run dev

## API Endpoints

| Method | Endpoint | Description |
|--------|----------| ------------|
| POST | /api/v1/books | Create a new book |
| GET | /api/v1/books | Get all books |
| GET | /api/v1/books/:id | Get book by ID |
| PUT | /api/v1/books/:id | Update book information |
| DELETE | /api/v1/books/:id | Delete a book |
| GET | /api/v1/books?title=The | Search Books |
| POST | /api/v1/collections | Book Collection ( Bookmarks ) |
| GET | /api/v1/collections | Get Book Collection |
| DELETE | /api/v1/collections/:id | Delete book Collection  by id|
