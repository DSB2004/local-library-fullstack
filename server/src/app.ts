import express from "express";
import cors from "cors";
import BookRouter from "./routes/book.routes";
import UserRouter from "./routes/user.routes";
import InteractionRouter from "./routes/interaction.routes";
import BorrowRouter from "./routes/borrow.routes";
import AuthRouter from "./routes/auth.routes";
import LoggerMiddleware from "./middleware/logger.middleware";
import JWTMiddleware from "./middleware/jwt.middleware";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(LoggerMiddleware);
app.use("/auth/v1/", AuthRouter);
app.use("/api/v1/books", BookRouter);
app.use("/api/v1/borrow", JWTMiddleware, BorrowRouter);
app.use("/api/v1/interaction", JWTMiddleware, InteractionRouter);
app.use("/api/v1/user", JWTMiddleware, UserRouter);
export default app;
