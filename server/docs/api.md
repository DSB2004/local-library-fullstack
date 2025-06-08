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
      "id": "2233ee1e-4d94-495d-a44a-33fca38b0686",
      "name": "The Hound of the Baskervilles",
      "author": "Arthur Conan Doyle",
      "description": "Sherlock Holmes investigates a legendary curse that plagues the Baskerville family.",
      "genre": "MYSTERY",
      "ratings": [
        {
          "rating": 5,
          "user": {
            "name": "Damanjeet Singh",
            "email": "damanjeetsingh434@gmail.com"
          }
        }
      ],
      "avgRating": 5,
      "stats": {
        "borrowCount": 9,
        "reviewCount": 9,
        "ratingCount": 1
      }
    },
    {
      "id": "3b576eeb-6e11-42a7-8dc8-4129e80605a0",
      "name": "Steve Jobs",
      "author": "Walter Isaacson",
      "description": "A riveting biography of Apple’s visionary founder and his revolutionary impact on technology.",
      "genre": "BIOGRAPHY",
      "ratings": [
        {
          "rating": 5,
          "user": {
            "name": "Damanjeet Singh",
            "email": "damanjeetsingh434@gmail.com"
          }
        }
      ],
      "avgRating": 5,
      "stats": {
        "borrowCount": 7,
        "reviewCount": 3,
        "ratingCount": 1
      }
    },
    {
      "id": "3c73ac86-42aa-4340-9c22-9e54a8c3e66c",
      "name": "The Alchemist",
      "author": "Paulo Coelho",
      "description": "A young shepherd follows his dreams in search of treasure and self-discovery.",
      "genre": "FICTION",
      "ratings": [
        {
          "rating": 3,
          "user": {
            "name": "Damanjeet Singh",
            "email": "damanjeetsingh434@gmail.com"
          }
        }
      ],
      "avgRating": 3,
      "stats": {
        "borrowCount": 2,
        "reviewCount": 1,
        "ratingCount": 1
      }
    },
    {
      "id": "5710ef1f-6d0a-4d4b-8023-aacb31f291a5",
      "name": "Pride and Prejudice",
      "author": "Jane Austen",
      "description": "A witty romantic novel about societal expectations and finding love in unexpected places.",
      "genre": "ROMANCE",
      "ratings": [],
      "avgRating": 0,
      "stats": {
        "borrowCount": 3,
        "reviewCount": 0,
        "ratingCount": 0
      }
    },
    {
      "id": "58e73709-6efb-49ea-a2ce-be5553048ac2",
      "name": "Sapiens: A Brief History of Humankind",
      "author": "Yuval Noah Harari",
      "description": "An insightful exploration of human evolution and the forces that shaped civilization.",
      "genre": "NONFICTION",
      "ratings": [],
      "avgRating": 0,
      "stats": {
        "borrowCount": 2,
        "reviewCount": 0,
        "ratingCount": 0
      }
    },
    {
      "id": "5a92f39d-fc73-4bfc-b631-b8e9bd48ba6c",
      "name": "The Power of Now",
      "author": "Eckhart Tolle",
      "description": "A spiritual guide to living in the present and finding peace in the moment.",
      "genre": "NONFICTION",
      "ratings": [],
      "avgRating": 0,
      "stats": {
        "borrowCount": 1,
        "reviewCount": 0,
        "ratingCount": 0
      }
    },
    {
      "id": "5f553714-8673-4f6f-9035-bc435ac0f005",
      "name": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "description": "A reluctant hobbit embarks on an adventurous quest to reclaim a lost dwarf kingdom.",
      "genre": "FANTASY",
      "ratings": [],
      "avgRating": 0,
      "stats": {
        "borrowCount": 0,
        "reviewCount": 0,
        "ratingCount": 0
      }
    },
    {
      "id": "6a073720-820b-478f-b403-4cf633b19be2",
      "name": "The Silent Patient",
      "author": "Alex Michaelides",
      "description": "A therapist unravels the mystery behind a woman's silence after she murders her husband.",
      "genre": "MYSTERY",
      "ratings": [],
      "avgRating": 0,
      "stats": {
        "borrowCount": 0,
        "reviewCount": 0,
        "ratingCount": 0
      }
    },
    {
      "id": "6c181df1-f51c-47d5-8ea6-cd2f8c4a1f84",
      "name": "Guns, Germs, and Steel",
      "author": "Jared Diamond",
      "description": "An exploration of how geography and environment influenced the fate of civilizations.",
      "genre": "HISTORY",
      "ratings": [],
      "avgRating": 0,
      "stats": {
        "borrowCount": 0,
        "reviewCount": 0,
        "ratingCount": 0
      }
    },
    {
      "id": "718328d0-4bb4-466a-aba1-ef079accca3d",
      "name": "Brave New World",
      "author": "Aldous Huxley",
      "description": "A futuristic society driven by technology and conformity challenges individuality.",
      "genre": "FICTION",
      "ratings": [],
      "avgRating": 0,
      "stats": {
        "borrowCount": 0,
        "reviewCount": 0,
        "ratingCount": 0
      }
    }
  ],
  "page": 1,
  "next": 2,
  "prev": null,
  "total": 20
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
