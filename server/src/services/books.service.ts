import prisma from "../lib/prisma";
export class Books {
  static async getBooks({
    name,
    genre,
    ratings,
    author,
    page = 1,
    limit = 10,
  }: {
    name?: string;
    genre?: string;
    ratings?: number;
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

      if (ratings && !isNaN(ratings)) {
        filters.ratings = {
          some: {
            rating: {
              gte: ratings,
            },
          },
        };
      }

      const total = await prisma.books.count({ where: filters });

      const totalPages = Math.ceil(total / limit);
      const books = await prisma.books.findMany({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          _count: {
            select: {
              borrows: true,
              reviews: true,
              ratings: true,
            },
          },
          ratings: {
            select: {
              rating: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
      const formattedBooks = books.map((book) => {
        const { _count, ratings, ...bookRest } = book;
        const avgRating =
          ratings && ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating.rating, 0) /
              ratings.length
            : 0;
        return {
          ...bookRest,
          ratings,
          avgRating,
          stats: {
            borrowCount: _count.borrows,
            reviewCount: _count.reviews,
            ratingCount: _count.ratings,
          },
        };
      });

      const next = page < totalPages ? page + 1 : null;
      const prev = page > 1 ? page - 1 : null;

      return {
        books: formattedBooks,
        page,
        next,
        prev,
        total,
      };
    } catch (error: any) {
      console.log("[ERROR HAPPENDED]", error.message);
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
        select: { rating: true, user: { select: { name: true, email: true } } },
      });

      const totalRatings = ratings.length;
      const totalBorrow = await prisma.borrow.count({ where: { book } });
      const totalReview = await prisma.review.count({ where: { book } });

      const avgRating =
        totalRatings > 0
          ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0) /
            totalRatings
          : 0;

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
              email: true,
            },
          },
        },
      });

      return {
        ...book,
        totalBorrow,
        totalRatings,
        totalReview,
        averageRating: avgRating ? parseFloat(avgRating.toFixed(2)) : 0,
        ratingOutOf: 5,
        ratings,
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
