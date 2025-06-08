import { BACKEND_API } from "../services/index.service";
export async function AddOrUpdateRating(bookId: string, rating: string) {
  try {
    const response = await BACKEND_API.post("/api/v1/interaction/rating", {
      bookId,
      rating,
    });

    return response.data;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}

export async function AddReview(
  bookId: string,
  review: string,
  learningReflection: string
) {
  try {
    const response = await BACKEND_API.post("/api/v1/interaction/review", {
      bookId,
      review,
      learningReflection,
    });
    return response.data;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}
