import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  profilePic?: string;
  email: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    email: { type: String, required: true, unique: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);
userSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject?._id
    delete returnedObject?.__v
  }
})
export default mongoose.model<IUser>("User",userSchema);
