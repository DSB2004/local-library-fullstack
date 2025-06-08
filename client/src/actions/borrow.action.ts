import { BACKEND_API } from "../services/index.service";

export async function BorrowBook(bookId: string) {
  try {
    const response = await BACKEND_API.put(`/api/v1/borrow/${bookId}`);
    return response.data;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}

export async function ReturnBook(bookId: string) {
  try {
    const response = await BACKEND_API.delete(`/api/v1/borrow/${bookId}`);
    return response.data;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}
