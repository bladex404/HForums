import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../configs/cloudinaryConfig";
import fs from 'fs'
cloudinary.config(cloudinaryConfig);
export default async function generateCloudinaryUrl(filepath: string) {
  let url;


  await cloudinary.uploader
    .upload(filepath)
    .then((result) => {
      url = result.secure_url
    });
   fs.unlinkSync(filepath) ;
    return url;
}
