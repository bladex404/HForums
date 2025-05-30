import User from "../models/user.model.js";
import { UserType } from "../types/userType.js";
import { Request, Response } from "express";
import { generateHash } from "../utils/hashPassword.js";
import { generateJwtAndSetCookie } from "../utils/generateJwt.js";
import bcrypt from "bcrypt";
interface CustomRequest extends Request {
  user: UserType;
}
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({ msg: "All fields are required" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists. Sign in instead." });
    }
    const hPassword = await generateHash(password);
    const user = await User.create({ username, email, password: hPassword });
    res.status(201).json({
      msg: "User Created Successfully",
      username: user.username,
      email: user.email,
    });
  } catch {}
};
const signin = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "All fields are required" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ msg: "User not found" });
    return;
  }
  const id = user._id.toString();
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    generateJwtAndSetCookie(user._id.toString(), res);
    res.status(200).send({
      msg: "Login Successfully",
      id,
    });
  }
};
const signout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict", // Same SameSite setting as during login
      secure: process.env.NODE_ENV === "production", // Ensure secure is set based on environment
    });
    res.status(200).json({ msg: "Logged out successfully" }); // Respond with a success message
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" }); // Handle any errors
  }
};
export { register, signin, signout };
