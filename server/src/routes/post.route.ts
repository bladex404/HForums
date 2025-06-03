import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createPost, deletePost } from "../controllers/post .controller";

const router = Router();
router.route("/post").post(auth, createPost);
router.route("/delete/:id").post(auth, deletePost);
export default router;
