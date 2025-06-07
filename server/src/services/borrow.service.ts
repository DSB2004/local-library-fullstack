import prisma from "../lib/prisma";
export class Borrow {
  static async borrowBook({
    userId,
    bookId,
  }: {
    userId: string;
    bookId: string;
  }) {
    try {
      const bookDetails = await prisma.books.findUnique({
        where: { id: bookId },
      });

      if (!bookDetails) {
        throw new Error(
          JSON.stringify({
            message: "Couldn't find the requested book",
            status: 400,
          })
        );
      }

      const alreadyBorrowed = await prisma.borrow.findMany({
        where: { userId, returnDate: null},
        select: {
          book: true,
          bookId: true,
        },
      });

      if (alreadyBorrowed.length >= 3) {
        throw new Error(
          JSON.stringify({
            message: "Can borrow up to 3 books only",
            status: 400,
          })
        );
      }

      const genresTaken = alreadyBorrowed.map((entry) => entry.book.genre);
      if (genresTaken.includes(bookDetails.genre)) {
        throw new Error(
          JSON.stringify({
            message: "Can't borrow multiple books of the same genre",
            status: 400,
          })
        );
      }

      const isAlreadyBorrowed = alreadyBorrowed.some(
        (entry) => entry.bookId === bookId
      );
      if (isAlreadyBorrowed) {
        throw new Error(
          JSON.stringify({
            message: "Book already borrowed and not yet returned",
            status: 400,
          })
        );
      }

      const borrowRecord = await prisma.borrow.create({
        data: {
          userId,
          bookId,
          borrowedOn: new Date(),
        },
      });

      return borrowRecord;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({
          message: "Unable to borrow book",
          status: 500,
        })
      );
    }
  }

  static async returnBook({ borrowId }: { userId: string; borrowId: string }) {
    try {
      const returned = await prisma.borrow.update({
        where: { id: borrowId },
        data: { returnDate: new Date() },
      });
      return returned;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({
          messaage: "Unable to return book",
          status: 400,
        })
      );
    }
  }
}
