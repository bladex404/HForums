import jwt from "jsonwebtoken";
import { Response } from "express";
const ST = process.env.SECRET_KEY;
export const generateJwtAndSetCookie = async (
  userId: string,
  res: Response
) => {
  const token = jwt.sign({ userId }, ST as string, {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    maxAge: 15 * 24 * 3600 * 1000,
  });
  return token;
};
