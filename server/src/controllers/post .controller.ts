import Post from "../models/post.model";
import { PostSchema } from "../schemas/post.schema";
import { Request, Response } from "express";
const createPost = async (req: Request, res: Response) => {
  const result = PostSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.format() });
  }
  try {
    const post = new Post(result.data);
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
};
const deletePost = async (req: Request, res: Response) => {
  const _id = req.params.id;
  console.log(_id);
  const post = await Post.findById(_id);
  if (post) {
    await Post.deleteOne({ _id });
    res.status(200).json({
      msg: "Post deleted Successfully",
    });
  } else {
    res.status(400).json({
      msg: "Post not available",
    });
  }
};

export { createPost, deletePost };
