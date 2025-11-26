import Post from "../models/post.model";
import { Request, RequestHandler, Response } from "express";
import { Router } from "express";
import middleware, { CustomRequest } from "../middlewares/middleware";
import Comment from "../models/comment.model";
import multer from "multer";
import generateCloudinaryUrl from "../utils/generateCloudiaryUrl";
const postRouter = Router();
const storage = multer.diskStorage({
  destination: function(req:Request, file, cb){
    cb(null, './static')
  },
  filename: function(req:Request, file,cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    return cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})
const upload = multer({
  storage: storage
});
postRouter.post(
  "/",
  upload.single("postImg"),
  middleware.auth as RequestHandler,
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
      const file = req.file;
      let postPic;
      if (file){
       postPic =await generateCloudinaryUrl(file.path);
      } else{
        postPic="";
      }
      const post = new Post({ title, description, postImg:postPic });
      await post.save();
      res.status(201).json({
        msg: "Post created successfully",
        post,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
);
postRouter.delete(
  "/:id",
  middleware.auth as RequestHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const post = await Post.findById(id);
    console.log(post);
    if (post) {
      const ress = await Post.findByIdAndDelete(id);
      res.status(200).json({
        ress,
        msg: "Post deleted Successfully",
      });
    } else {
      res.status(400).json({
        msg: "Post not available",
      });
    }
  },
);
postRouter.get("/", async (req: Request, res: Response) => {
  const posts = await Post.find({}).populate("comments").sort({
    "createdAt": -1
  });
  if (posts) {
    res.send({ posts });
  } else {
    res.send({ error: "Posts not found" });
  }
});
postRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate({
    path: "comments",
    select: "-password",
  });
  if (!post) {
    res.send({ error: "post not found" });
    return;
  }
  res.status(200).json(post);
});
postRouter.get(
  "/like/:id",
  middleware.auth as RequestHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as CustomRequest).user.id;
    console.log(userId, id);
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.json({
      liked: !hasLiked,
      likesCount: post.likes.length,
      post,
    });
  },
);
postRouter.post(
  "/comment/:id",
  middleware.auth as RequestHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = (req as CustomRequest).user;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);
      return;
    }
    const { content } = req.body;
    const userId = user.id;
    if (content == "") {
      res.send({ error: "Comment can't be empty" });
      return;
    }
    const comment = new Comment({
      userId,
      content,
      postId: post.id,
    });
    comment.save();
    post.comments.push(comment.id);
    post.save();
    const returnPost = await Post.findById(id).populate("comments");
    res.status(201).json(returnPost);
  },
);
export default postRouter;
