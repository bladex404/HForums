import { model, Schema, Types } from "mongoose";
interface PostType extends Document{
  id:string;
  title: string;
  description:string;
  postImg: string;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
}
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
      ref: "Comment",
    },
  ],
},{
  timestamps:true
});
postSchema.set('toJSON', {
  transform(document,returnedObject) {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Post = model("Post", postSchema);
export default Post;
