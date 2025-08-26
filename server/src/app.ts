import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./controllers/user.controller";
import postRouter from "./controllers/post .controller";
import chatRouter from "./controllers/conversation.controller";
import middleware from "./middlewares/middleware";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies or credentials to be sent
  }),
);
app.use(cookieParser());

app.use(middleware.requestLogger);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/chats", chatRouter);

export default app;
