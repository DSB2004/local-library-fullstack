export interface BorrowType {
  id: string;
  userId: string;
  bookId: string;
  borrowedOn: string;
  returnDate: string;
}
export interface UserType {
  id: string;
  name: string;
  email: string;
  borrows: BorrowType[];
}

export interface GetUserResponseType {
  message: string;
  user: UserType;
}
