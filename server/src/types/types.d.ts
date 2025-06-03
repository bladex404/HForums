import { ObjectId } from "mongoose";
export interface UserType {
  username: string;
  password: string;
  profilePic: string;
  email: string;
  followers: ObjectId[];
  following: ObjectId[];
}
export interface PostType {
  title: string;
  description: string;
  postImg: string;
}
