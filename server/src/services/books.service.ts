import prisma from "../lib/prisma";
export class Books {
  static async getBooks({
    name,
    genre,
    rating,
    author,
    page = 1,
    limit = 10,
  }: {
    name?: string;
    genre?: string;
    rating?: number;
    author?: string;
    page?: number;
    limit?: number;
  }) {
    try {
      const filters: any = {};

      if (name && name !== "undefined") {
        filters.name = { contains: name, lte: "insensitive" };
      }

      if (genre && genre !== "undefined") {
        filters.genre = genre.toUpperCase();
      }

      if (author && author !== "undefined") {
        filters.author = { contains: author, lte: "insensitive" };
      }

      if (rating && !isNaN(rating)) {
        filters.rating = { gte: rating };
      }

      const total = await prisma.books.count({ where: filters });

      const totalPages = Math.ceil(total / limit);

      const books = await prisma.books.findMany({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
      });

      const next = page < totalPages ? page + 1 : null;
      const prev = page > 1 ? page - 1 : null;

      return {
        books,
        page,
        next,
        prev,
        total,
      };
    } catch (error: any) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({ message: "Unable to fetch books", status: 500 })
      );
    }
  }

  static async getBookDetails({ bookId }: { bookId: string }) {
    console.log(bookId);
    try {
      const book = await prisma.books.findUnique({
        where: { id: bookId },
      });

      if (!book)
        throw new Error(
          JSON.stringify({ message: "Book not found", status: 400 })
        );

      const ratings = await prisma.rating.findMany({
        where: { bookId },
        select: { rating: true },
      });

      const totalRatings = ratings.length;
      const avgRating =
        totalRatings > 0
          ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) /
            totalRatings
          : null;

      const topReviews = await prisma.review.findMany({
        where: { bookId },
        orderBy: { createdOn: "desc" },
        take: 5,
        select: {
          review: true,
          learningReflection: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return {
        ...book,
        averageRating: avgRating ? parseFloat(avgRating.toFixed(2)) : null,
        ratingOutOf: 5,
        totalRatings,
        topReviews,
      };
    } catch (error: any) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({ message: "Unable to fetch book details", status: 500 })
      );
    }
  }
}
