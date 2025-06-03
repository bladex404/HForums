import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  getMe,
  register,
  signin,
  signout,
} from "../controllers/user.controller";
const router = Router();
router.route("/register").post(register);
router.route("/login").post(signin);
router.route("/logout").post(auth, signout);
router.route("/getMe").get(auth, getMe);
export default router;
