export interface BookType {
  id: string;
  name: string;
  author: string;
  description: string;
  genre: string;
  ratings: RatingType[];
  avgRating: number;
  stats: {
    borrowCount: number;
    reviewCount: number;
    ratingCount: number;
  };
}

export interface RatingType {
  rating: number;
  user: {
    name: string;
    email: string;
  };
}
export interface ReviewType {
  user: {
    name: string;
    email: string;
  };
  review: string;
  learningReflection: string;
}

export interface GetBooksResponse {
  message: "Books found";
  books: BookType[];
  page: number;
  next: number | null;
  prev: number | null;
  total: number;
}

export interface GetBookResponse {
  id: string;
  name: string;
  author: string;
  description: string;
  totalBorrow: number;
  totalRatings: number;
  totalReview: number;
  averageRating: number;
  ratingOutOf: number;
  ratings: RatingType[];
  topReviews: ReviewType[];
  genre: string;
}
