import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const createToken = async (
  payload: any,
  expireTime: any
): Promise<string> => {
  if (!payload) throw new Error("Payload is required");
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: expireTime, algorithm: "HS256" },
      //@ts-ignore
      (err, token) => {
        if (err) {
          reject(new Error("Error signing token"));
        } else {
          resolve(token!);
        }
      }
    );
  });
};
export const verifyToken = async (_token: string): Promise<any | null> => {
  try {
    let token = _token.split(" ");
    if (!token || token.length !== 2) return null;
    const decoded = jwt.verify(token[1], JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};
