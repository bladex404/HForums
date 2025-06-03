import { model, Schema, Types } from "mongoose";
import { PostType } from "../schemas/post.schema";
const postSchema = new Schema<PostType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postImg: {
    type: String,
    default: "",
  },
  likes: [
    {
      type: Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
  comments: [
    {
      type: Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
});
const Post = model("Post", postSchema);
export default Post;
