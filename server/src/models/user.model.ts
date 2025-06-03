import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; // <-- explicitly define _id type here
  username: string;
  password: string;
  profilePic?: string;
  email: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
}

const UserModel = new Schema<IUser>(
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

export default mongoose.model<IUser>("User", UserModel);
