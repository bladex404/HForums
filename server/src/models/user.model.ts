import { model, Schema } from "mongoose";
import { UserType } from "../types/userType";
const userSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
export default User;
