import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies or credentials to be sent
  })
);
app.use(cookieParser());
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
export default app;
