import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
const ST = process.env.SECRET_KEY;
export interface CustomRequest extends Request {
  user: IUser;
  token: string;
}

const auth= async (req:Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
    if (!token) {
      return res.status(401).send("Token not found");
    }
    const decoded = jwt.verify(token, ST as string) as JwtPayload;
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).send("User not found");
    }
    (req as CustomRequest).token = token;
    (req as CustomRequest).user = user;
    next();
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const infoLog = (...params: any) => {
  console.log(params);
};
const errorLog = (...params: any) => {
  console.error(params);
};
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  infoLog("METHOD: ", req.method);
  infoLog("PATH: ", req.path);
  infoLog("Body: ", req.body);
  infoLog("---");
  next();
};
export default { auth, infoLog, errorLog, requestLogger };
