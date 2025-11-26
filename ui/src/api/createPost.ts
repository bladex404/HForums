import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface CreatePostType {
  title: string;
  description: string;
  files: File | null;
}
const createPost = () => {
  const { mutate:postCreate,isPending,isSuccess,isError,error } = useMutation({
    mutationFn: async (formData: CreatePostType) => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
  return {postCreate,isPending,isSuccess,isError,error};
};
export default createPost;
