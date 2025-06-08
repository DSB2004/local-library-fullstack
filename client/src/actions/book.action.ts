import { BACKEND_API } from "../services/index.service";
import { type GetBooksResponse } from "../types/books";
export async function GetBooks(params: any) {
  try {
    const response = await BACKEND_API.get("/api/v1/books", { params });
    return response.data as GetBooksResponse;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}

export async function GetBook(id: string) {
  try {
    const response = await BACKEND_API.get("/api/v1/books/" + id);
    return response.data;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}
