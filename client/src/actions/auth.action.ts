import { BACKEND_API } from "../services/index.service";

export async function Login(email: string, password: string) {
  try {
    const response = await BACKEND_API.post("/auth/v1/login", {
      email,
      password,
    });
    return response.data;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}

export async function Signup(name: string, email: string, password: string) {
  try {
    const response = await BACKEND_API.post("/auth/v1/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (err: any) {
    const message = err.response.data.message;
    throw new Error(message);
  }
}
