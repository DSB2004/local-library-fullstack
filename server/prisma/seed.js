const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.books.createMany({
    data: [
      {
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "FICTION",
      },
      {
        name: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "NONFICTION",
      },
      {
        name: "The Hound of the Baskervilles",
        author: "Arthur Conan Doyle",
        genre: "MYSTERY",
      },
      {
        name: "Dune",
        author: "Frank Herbert",
        genre: "SCIFI",
      },
      {
        name: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "FANTASY",
      },
      {
        name: "Steve Jobs",
        author: "Walter Isaacson",
        genre: "BIOGRAPHY",
      },
      {
        name: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        genre: "HISTORY",
      },
      {
        name: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "ROMANCE",
      },
    ],
  });

  console.log("Seeded books data!");
}

main()
  .catch((e) => {
    console.log("Error while seeding data ", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
