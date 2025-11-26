import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import createPost from "@/api/createPost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Textarea } from "./ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { postCreate, isPending, isSuccess, isError, error } = createPost();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = new FormData();
    post.append("title", title);
    post.append("description", description);
    if (files) {
      post.append("postImg", files);
    }
    postCreate(post);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Post created successfully!");
      setTitle("");
      setDescription("");
      setFiles(null);
      queryClient.invalidateQueries(['posts'])

    }

    if (isError) {
      toast.error("Failed to create post. Please try again.");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col items-center w-full h-[200px] border-xl border-white/90 p-3 gap-4"
      >
        <Input
          type="text"
          placeholder="What's happening?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
        />
        <Textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain.."
        />
        <Input
          type="file"
          name="postImg"
          onChange={handleFileChange}
          id="postImg"
        />
        <button disabled={isPending}>
          {isPending ? "Posting..." : "Create"}
        </button>
      </form>
      {/* Toast container only needs to be here once */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default CreatePost;
