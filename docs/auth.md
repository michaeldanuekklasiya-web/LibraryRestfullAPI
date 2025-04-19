# API for Library Digital / Perpustakaan
A Digital Library is a platform or system that provides access to a collection of library materials in digital form, allowing users to access, search, and read various types of resources without the need to visit a physical library.

## Endpoint
https://localhost:3000/api/v1/user

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
        user: {
          id: 1,
          name: Mark Johnson,
          email: markjohnson@gmail.com
        },
        "accessToken": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ik51ciBBemlzIFNhcHV0cmEiLCJpYXQiOjE3NDUwNTg4NzgsImV4cCI6MTc0NTA2MjQ3OH0.TAd_ClWUIfVjTw88DrwBLhZ-dGBWoCkUmbpBojfXmbI,
        "refreshToken": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6Ik1hcmsgSm9obnNvbiIsImVtYWlsIjoibWFya2pvaG5zb25AZ21haWwuY29tIiwiaWF0IjoxNzQ1MTE3OTIzLCJleHAiOjE3NDU3MjI3MjN9.R3xntuUQ9-_Ko1E0TLUC0A4w9YhyOxXCWfpsLZbN0xs
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
    "message": "User logout successfully",
    "data": {
        user: {
          id: 1,
          name: Mark Johnson,
          email: markjohnson@gmail.com
        } 
    }
}
```