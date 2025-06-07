import prisma from "../lib/prisma";

export class Interaction {
  static async addReview({
    userId,
    bookId,
    review,
    learningReflection,
  }: {
    userId: string;
    bookId: string;
    review: string;
    learningReflection: string;
  }) {
    try {
      const book = await prisma.books.findUnique({ where: { id: bookId } });
      if (!book)
        throw new Error(
          JSON.stringify({
            messaage: "Could n't find the requested book",
            status: 400,
          })
        );

      const newReview = await prisma.review.create({
        data: {
          userId,
          bookId,
          review,
          learningReflection,
        },
      });

      return newReview;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({
          messaage: "Unable to add a review",
          status: 500,
        })
      );
    }
  }

  static async addRating({
    userId,
    bookId,
    rating,
  }: {
    userId: string;
    bookId: string;
    rating: number;
  }) {
    try {
      if (rating < 0 || rating > 5)
        // rating can only be between 0 to 5
        throw new Error(
          JSON.stringify({
            messaage: "Rating must be from 0 to 5",
            status: 400,
          })
        );
      const existing = await prisma.rating.findFirst({
        where: { userId, bookId },
      });

      if (existing) {
        return await prisma.rating.update({
          where: { id: existing.id },
          data: { rating },
        });
      } else {
        return await prisma.rating.create({
          data: {
            userId,
            bookId,
            rating,
          },
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({
          messaage: "Unable to add rating",
          status: 500,
        })
      );
    }
  }
}
