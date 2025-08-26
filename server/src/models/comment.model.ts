import { model, Schema } from "mongoose";
interface CommentType {
  userId: String;
  content: String;
  postId: String;
}
const commentSchema = new Schema<CommentType>({
  userId: String,
  content: String,
  postId: String,
});
commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});
const Comment = model("Comment", commentSchema);
export default Comment;

