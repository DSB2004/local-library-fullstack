const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.books.createMany({
    data: [
      {
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "FICTION",
        description: "A classic tale of love, wealth, and betrayal set in the roaring twenties."
      },
      {
        name: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "NONFICTION",
        description: "An insightful exploration of human evolution and the forces that shaped civilization."
      },
      {
        name: "The Hound of the Baskervilles",
        author: "Arthur Conan Doyle",
        genre: "MYSTERY",
        description: "Sherlock Holmes investigates a legendary curse that plagues the Baskerville family."
      },
      {
        name: "Dune",
        author: "Frank Herbert",
        genre: "SCIFI",
        description: "A science fiction epic of politics, prophecy, and the battle for control of a desert planet."
      },
      {
        name: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "FANTASY",
        description: "A young wizard begins his magical education and discovers his true legacy."
      },
      {
        name: "Steve Jobs",
        author: "Walter Isaacson",
        genre: "BIOGRAPHY",
        description: "A riveting biography of Apple’s visionary founder and his revolutionary impact on technology."
      },
      {
        name: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        genre: "HISTORY",
        description: "An exploration of how geography and environment influenced the fate of civilizations."
      },
      {
        name: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "ROMANCE",
        description: "A witty romantic novel about societal expectations and finding love in unexpected places."
      },
      {
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "FICTION",
        description: "A profound tale of racial injustice and childhood innocence in the Deep South."
      },
      {
        name: "1984",
        author: "George Orwell",
        genre: "FICTION",
        description: "A chilling dystopian novel about surveillance, truth manipulation, and authoritarianism."
      },
      {
        name: "Atomic Habits",
        author: "James Clear",
        genre: "NONFICTION",
        description: "A guide to building good habits and breaking bad ones through small, consistent changes."
      },
      {
        name: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "FANTASY",
        description: "A reluctant hobbit embarks on an adventurous quest to reclaim a lost dwarf kingdom."
      },
      {
        name: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "MYSTERY",
        description: "A symbologist uncovers a secret society while investigating a murder at the Louvre."
      },
      {
        name: "The Martian",
        author: "Andy Weir",
        genre: "SCIFI",
        description: "An astronaut stranded on Mars must use his ingenuity to survive until rescue."
      },
      {
        name: "Educated",
        author: "Tara Westover",
        genre: "BIOGRAPHY",
        description: "A memoir of a woman who escapes her strict upbringing to pursue education and freedom."
      },
      {
        name: "The Power of Now",
        author: "Eckhart Tolle",
        genre: "NONFICTION",
        description: "A spiritual guide to living in the present and finding peace in the moment."
      },
      {
        name: "Becoming",
        author: "Michelle Obama",
        genre: "BIOGRAPHY",
        description: "A deeply personal memoir by the former First Lady of the United States."
      },
      {
        name: "The Alchemist",
        author: "Paulo Coelho",
        genre: "FICTION",
        description: "A young shepherd follows his dreams in search of treasure and self-discovery."
      },
      {
        name: "Brave New World",
        author: "Aldous Huxley",
        genre: "FICTION",
        description: "A futuristic society driven by technology and conformity challenges individuality."
      },
      {
        name: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "MYSTERY",
        description: "A therapist unravels the mystery behind a woman's silence after she murders her husband."
      },
    ],
  });

  console.log("✅ Seeded 20 books successfully with enum-compliant genres!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding data:", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
