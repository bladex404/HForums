import User from "../models/user.model";
import { UserType } from "../schemas/user.schema";
import { Request, Response } from "express";
import { generateHash } from "../utils/hashPassword";
import { generateJwtAndSetCookie } from "../utils/generateJwt";
import bcrypt from "bcrypt";
import {
  LoginSchema,
  RegisterSchema,
  UserSchema,
} from "../schemas/user.schema";
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    let data = RegisterSchema.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({ error: data.error.format() });
      return;
    }
    const { username, email, password } = data.data;
    console.log(username, password);
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists. Sign in instead." });
      return;
    }
    const hPassword = await generateHash(password);
    const userData = {
      ...data.data,
      password: hPassword,
    };
    const user = await User.create(userData);
    console.log(user);
    res.status(201).json({
      msg: "User Created Successfully",
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};
const signin = async (req: Request, res: Response): Promise<void> => {
  const result = LoginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.format() });
    return;
  }
  const { username, password } = result.data;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ msg: "User not found" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ msg: "Invalid credentials" });
    return;
  }
  const id = user._id.toString();
  generateJwtAndSetCookie(id, res);

  res.status(200).json({ msg: "Login Successfully", id });
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
const getMe = async (req: Request, res: Response) => {
  try {
    const authUser = req.user;
    let id;
    if (authUser) {
      id = authUser._id;
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(401).json({
        msg: "Unauthorized Access: User not found.",
      });
      return;
    }
    res.status(200).json({
      msg: "Authenticated User Present",
      user,
    });
  } catch (error) {
    console.error("Error in getMe:", error); // Log the error for debugging
    res.status(500).json({
      msg: "Internal Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
export { register, signin, signout, getMe };
