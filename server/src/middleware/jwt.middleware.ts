import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt.util";

const JWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(403).json({ msg: "Authorization token not provided" });
  if (authorization?.split(" ").length !== 2)
    return res.status(403).json({ msg: "Invalid authorization token" });
  const userData = await verifyToken(authorization);
  if (userData === null)
    return res.status(401).json({ msg: "Authorization Token Expired" });

  return next();
};

export default JWTMiddleware;
