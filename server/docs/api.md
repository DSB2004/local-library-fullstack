# Library Portal API Documentation

**Base URL**: [https://local-library-portal.vercel.app/](https://local-library-portal.vercel.app/)

---

### **Overview**

This API allows you to interact with the Local Library Portal for managing user information, books, borrowing, reviews, and ratings. It supports CRUD operations on books, user management, book borrowing, and more.

---

## Authentication

- **Authorization**: All API requests (except for public endpoints like getting books and book details) require an `Authorization` header.
  - Format: `Bearer <token>`
  - The token is issued upon successful login or signup.
  - Make sure to handle expired tokens and invalid credentials appropriately in your client application.

---

## Status Codes:

- **200 OK: Success**: The User Request is Successfully executed.

- **401 Unauthorized**: Token expired.

- **403 Forbidden: Forbidden access**: Token invalid or not given
- **400 Bad Request**: Parameter or Body missing in request
- **500 Internal Server Error**: Server-side issue.

---

## API Documentation

### Get User Info

**GET** `/api/v1/user`

**Authorization**: `Bearer <token>`

**Response:**

```json
{
  "message": "User Details",
  "user": {
    "id": "3ee34f84-7598-46a7-9f25-c40f75a3676a",
    "name": "daman",
    "email": "daman@ex.com",
    "borrows": [
      {
        "id": "0f0603e8-8e55-441c-bd40-b7797e4a35e9",
        "userId": "3ee34f84-7598-46a7-9f25-c40f75a3676a",
        "bookId": "064c8f30-df56-4898-8ba3-cf01bc2a947a",
        "borrowedOn": "2025-06-07T15:51:31.607Z",
        "returnDate": "2025-06-07T15:56:46.853Z"
      },
      {
        "id": "ce1da4c6-3f84-419f-967f-2685a981e68d",
        "userId": "3ee34f84-7598-46a7-9f25-c40f75a3676a",
        "bookId": "064c8f30-df56-4898-8ba3-cf01bc2a947a",
        "borrowedOn": "2025-06-07T15:57:04.905Z",
        "returnDate": "2025-06-07T16:04:44.036Z"
      },
      {
        "id": "d295ec05-f0e0-46c2-a18c-8b58605ec30e",
        "userId": "3ee34f84-7598-46a7-9f25-c40f75a3676a",
        "bookId": "064c8f30-df56-4898-8ba3-cf01bc2a947a",
        "borrowedOn": "2025-06-07T15:56:19.191Z",
        "returnDate": "2025-06-07T15:56:57.917Z"
      }
    ]
  }
}
```

### Get Books

**GET** `/api/v1/books`

**Response:**

```json
{
  "message": "Books found",
  "books": [
    {
      "id": "064c8f30-df56-4898-8ba3-cf01bc2a947a",
      "name": "Sapiens: A Brief History of Humankind",
      "author": "Yuval Noah Harari",
      "genre": "NONFICTION"
    },
    {
      "id": "0f94c203-f0d1-42ee-8802-5cc6003e77eb",
      "name": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "FICTION"
    },
    {
      "id": "1a30d708-ef92-4bd2-b86e-8e61dd46ec51",
      "name": "Pride and Prejudice",
      "author": "Jane Austen",
      "genre": "ROMANCE"
    },
    {
      "id": "35379cdc-d33f-489f-b962-c1f6e48a7043",
      "name": "Sapiens: A Brief History of Humankind",
      "author": "Yuval Noah Harari",
      "genre": "NONFICTION"
    },
    {
      "id": "64af46ad-fd1e-4c70-bc6f-a3bd2c1c4e71",
      "name": "Pride and Prejudice",
      "author": "Jane Austen",
      "genre": "ROMANCE"
    },
    {
      "id": "9565b2b9-bd01-4b22-88a4-cb851bca1012",
      "name": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "genre": "FANTASY"
    },
    {
      "id": "9714398b-4435-4a46-b0c7-239642561577",
      "name": "The Hound of the Baskervilles",
      "author": "Arthur Conan Doyle",
      "genre": "MYSTERY"
    },
    {
      "id": "983f6aa3-2447-4eb8-ad06-577f44b57d03",
      "name": "Steve Jobs",
      "author": "Walter Isaacson",
      "genre": "BIOGRAPHY"
    },
    {
      "id": "b1b44978-33f5-4223-bd43-593d8e81b7d3",
      "name": "Guns, Germs, and Steel",
      "author": "Jared Diamond",
      "genre": "HISTORY"
    },
    {
      "id": "b76f020a-61c6-4553-91d4-fef7009b2bd1",
      "name": "Dune",
      "author": "Frank Herbert",
      "genre": "SCIFI"
    }
  ],
  "page": 1,
  "next": 2,
  "prev": null,
  "total": 16
}
```

### Get Book Details

**GET** `/api/v1/books/bookid`

**Response:**

```json
{
  "message": "Book found",
  "book": {
    "id": "fb868e25-ea50-4872-a9ed-64b075a5ce67",
    "name": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "genre": "FANTASY",
    "averageRating": 4,
    "ratingOutOf": 5,
    "totalRatings": 2,
    "topReviews": [
      {
        "review": "sample review",
        "learningReflection": "123",
        "user": {
          "name": "daman"
        }
      },
      {
        "review": "sample review",
        "learningReflection": "123",
        "user": {
          "name": "daman"
        }
      },
      {
        "review": "sample review",
        "learningReflection": "123",
        "user": {
          "name": "daman"
        }
      }
    ]
  }
}
```

### Login User

**POST** `/auth/v1/login`

**Request Body**

```json
{
  "email": "daman@ex.com",
  "password": "12345678"
}
```

**Response**

```json
{
  "message": "Login Successful",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlZTM0Zjg0LTc1OTgtNDZhNy05ZjI1LWM0MGY3NWEzNjc2YSIsImVtYWlsIjoiZGFtYW5AZXguY29tIiwibmFtZSI6ImRhbWFuIiwiaWF0IjoxNzQ5MzI1MTQ4LCJleHAiOjE3NDk5Mjk5NDh9.UIacZvalZo60QDeLjiYs9vcAVkH2quchyYUb5ydV-dU"
}
```

### Signup User

**POST** `/auth/v1/signup`

**Request Body**

```json
{
  "name": "daman",
  "email": "daman1231123@ex.com",
  "password": "12345678"
}
```

**Response**

```json
{
  "message": "User created Successful",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlYmVkY2JmLWY0OGQtNDJkNC04NGNmLTRkZWU2NDM5OTQ1YSIsImVtYWlsIjoiZGFtYW4xMjMxMTIzQGV4LmNvbSIsIm5hbWUiOiJkYW1hbiIsImlhdCI6MTc0OTMyNTE1NCwiZXhwIjoxNzQ5OTI5OTU0fQ.6-tfbZyr7MTErLswpffllIH8Ee2MGA6SS0G2szKCKYM"
}
```

### Borrow Book

**PUT** `/api/v1/borrow/bookid`

**Authorization**: `Bearer <token>`

**Response**

```json
{
  "message": "Book borrowed"
}
```

### Return Book

**DELETE** `/api/v1/borrow/borrowid`

**Authorization**: `Bearer <token>`

**Response**

```json
{
  "message": "Book returned"
}
```

### Add or Update Rating

**POST** `/api/v1/interaction/rating`

- A user can add rating to a book from 0 to 5
- If user again tries to add rating there previous entry would be updated by new value

**Authorization**: `Bearer <token>`

**Request Body**

```json
{
  "bookId": "fb868e25-ea50-4872-a9ed-64b075a5ce67",
  "rating": 4
}
```

**Response**

```json
{
  "message": "Rating updated"
}
```

### Add Review

**POST** `/api/v1/interaction/review`

- A user can add any no of reviews on a book

**Authorization**: `Bearer <token>`

**Request Body**

```json
{
  "bookId": "fb868e25-ea50-4872-a9ed-64b075a5ce67",
  "review": "sample review",
  "learningReflection": "123"
}
```

**Response**

```json
{
  "message": "Review added"
}
```
