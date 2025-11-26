import User from "../models/user.model";
import { Request, RequestHandler, Response, Router } from "express";
import { generateHash } from "../utils/hashPassword";
import { generateJwtAndSetCookie } from "../utils/generateJwt";
import bcrypt from "bcrypt";
import middleware, { CustomRequest } from "../middlewares/middleware";
const userRouter = Router();
userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists. Sign in instead." });
      return;
    }
    const hPassword = await generateHash(password);
    const userData = {
      username,
      email,
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
});
userRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ msg: "User not found" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ msg: "Invalid credentials" });
  }
  const id = user.id;
  const token = await generateJwtAndSetCookie(id, res);
  console.log(token);
  res.cookie('token', token,{
    maxAge: 24*3600*1000,
    httpOnly: true,
    sameSite:'strict' ,
    secure: false
  })
  res.status(200).json({ msg: "Login Successfully", id, username, token });
});
userRouter.get(
  "/getMe",
  middleware.auth as RequestHandler,
  async (req: Request, res: Response) => {
    try {
      const authUser = (req as CustomRequest).user;
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
  },
);
userRouter.post(
  "/changepass",
  middleware.auth as RequestHandler,
  async (req: Request, res: Response) => {
    const { oldPass, newPass } = req.body;
    const user = (req as CustomRequest).user;
    const oldHash = await generateHash(oldPass);
    if (oldHash === user.password) {
      const newHash = await generateHash(newPass);
      user.password = newHash;
      await user.save();
      res.status(201).send({ msg: "Password Changed Successfully" });
      return;
    } else {
      res.status(404).send({ msg: "unauthorized access" });
    }
  },
);
userRouter.post(
  "/follow/:id",
  middleware.auth as RequestHandler,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // user to follow/unfollow
      const userId = (req as CustomRequest).user.id; // logged-in user

      if (userId === id) {
        res.status(400).json({ msg: "You cannot follow yourself" });
        return;
      }

      const targetUser = await User.findById(id);
      if (!targetUser) {
        res.status(404).json({ msg: "User not found" });
        return;
      }

      const isFollowing = targetUser.followers.includes(userId);

      if (isFollowing) {
        await User.findByIdAndUpdate(id, { $pull: { followers: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { following: id } });
        res.status(200).json({ msg: "Unfollowed successfully" });
        return;
      } else {
        await User.findByIdAndUpdate(id, { $addToSet: { followers: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { following: id } });
        res.status(200).json({ msg: "Followed successfully" });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

userRouter.get("/logout", middleware.auth as RequestHandler, async(req:Request,res:Response) =>{
  res.clearCookie('token');
  res.status(200).send("logout successfull");
  res.end();
})

export default userRouter;
