import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { UserType } from "../types/types";
const ST = process.env.SECRET_KEY;
declare global {
  namespace Express {
    interface Request {
      user?: UserType;
      token?: JwtPayload;
    }
  }
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
    if (!token) {
      res.status(401).send("Token not found");
    }
    const decoded = jwt.verify(token, ST as string) as JwtPayload;
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(401).send("User not found");
      return;
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
    return;
  }
};
