import { Router } from "express";
import { auth } from "../middlewares/auth";
import { register, signin, signout } from "../controllers/user.controller";
const router = Router();
router.route("/register").post(register);
router.route("/login").post(signin);
router.route("/logout").post(auth, signout);
export default router;
