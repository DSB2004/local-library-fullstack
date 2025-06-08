# Library Portal - Setup Guide

A full-featured **Library Portal Server** to manage books, users, borrowing, reviews, and ratings.

---

## Overview

This server provides RESTful API endpoints for:

- User authentication (Signup, Login)
- Managing books (list, detail, pagination)
- Borrowing and returning books
- Adding and updating ratings
- Posting reviews and ratings

It is built with:

- **Node.js + Express**
- **MySQL** (via Prisma ORM)
- **Docker** for local containerization
- **JWT** for authentication

---

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)

### Clone the repository

```bash
git clone https://github.com/DSB2004/local_library_portal.git
cd local-library-portal/server
```

### Start MySQL with Docker

```bash
docker run --name library_mysql_db \
  -e MYSQL_ROOT_PASSWORD=12345678 \
  -e MYSQL_DATABASE=library \
  -p 3306:3306 \
  -d mysql

```

### Setting Up Env

- Create a .env file in the root of the project.

- Use the .env.example file provided in the repository as a reference.

```bash
# .env
DATABASE_URL="mysql://root:12345678@localhost:3306/library"
JWT_SECRET="m@9X!fZ$3vLq#2eG7tB^NpWkZsHrQxUa"

```

### Running Server Locally

#### Choose a runtime environment for typescript **bun** ,**yarn** or **npm**

#### Install dependencies:

```bash
# npm
npm install

# bun
bun i

# yarn
yarn install

```

#### Settings up Prisma Client:

```bash
# npm
npm prisma generate

# bun
bun prisma generate

# yarn
yarn prisma generate

```

#### Start the development server:

```bash
# npm
npm run dev

# bun
bun run dev

# yarn
yarn dev
```

#### To build and run:

```bash
# npm
npm run build

# bun
bun run build

# yarn
yarn build
```

---

## Deployment

The server is currently deployed on **Vercel** with the database hosted on **TiDB Cloud**, a distributed SQL database built for scalability and performance.

### Current Deployment Details

- **Platform**: Vercel (serverless functions)

- **Database**: TiDB Cloud (MySQL-compatible)

- **API Base URL**: https://local-library-portal.vercel.app/

### Notes on Deployment

- All environment variables used in development must also be set in the Vercel project settings under Environment Variables.

- Make sure your **DATABASE_URL** points to your TiDB instance and is accessible from Vercel (you may need to allow IP access or use a public endpoint).

- Use the build script (e.g. tsc) to transpile TypeScript before deployment.

- Avoid uploading .env files or secrets to version control.
