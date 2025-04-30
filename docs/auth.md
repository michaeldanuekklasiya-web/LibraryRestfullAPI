# API for Library Digital / Perpustakaan
A Digital Library is a platform or system that provides access to a collection of library materials in digital form, allowing users to access, search, and read various types of resources without the need to visit a physical library.

## Endpoint
https://localhost:3000/api/v1/auth

### Register
- URL
  - /register
- Method
    - POST
- Request Body
    - name
    - email
    - password
- Response
```Response
{
    "error": false,
    "message": "User created successfully",
    "data": {
        user: {
          id: 1,
          name: Mark Johnson,
          email: markjohnson@gmail.com
        }
    }
}
```

### Login
- URL
    - /login
- Method
    - POST
- Request Body
    - email
    - password
- Response
```Response
{
    "error": false,
    "message": "User login successfully",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiNDE5NmQzMTMtMzEzYi00YjMyLWFjYWItZDA0YWVhOTRjMThiIiwiaWF0IjoxNzQ1ODMyODQ2LCJleHAiOjE3NDY0Mzc2NDZ9.yRgTJ1Es9QhTmphnY3o49TokwBJrCXhPyFXjQWg188o"
    }
}
```


### Logout
- URL
    - /logout
- Method
    - POST
- Headers
    - Authorization: Bearer `<token>`
- Response

```Response
{
    "error": false,
    "message": "User logout successfully"
}
```