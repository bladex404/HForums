import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
import userRouter from "./routes/user.route";
app.use("/api/v1/users", userRouter);

export default app;
