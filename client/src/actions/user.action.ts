import { BACKEND_API } from "../services/index.service";
import { type GetUserResponseType } from "../types/user";
export async function GetUserInfo() {
  try {
    if (localStorage.getItem("AccessToken") === null) return null;
    const response = await BACKEND_API.get("/api/v1/user");
    return response.data as GetUserResponseType;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}
