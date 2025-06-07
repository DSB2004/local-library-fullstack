import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

//  will return user data encoded in jwt token
export const createToken = async (
  payload: any,
  expireTime: string
): Promise<string> => {
  if (!payload) throw new Error("Payload is required");
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expireTime)
    .setIssuedAt()
    .sign(JWT_SECRET);
};

//  to verify if token is still valid
export const verifyToken = async (_token: string): Promise<any | null> => {
  try {
    let token = _token.split(" ");
    if (!token || token.length !== 2) return null;
    const { payload } = await jwtVerify(token[1], JWT_SECRET);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};
