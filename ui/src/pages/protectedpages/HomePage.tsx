import CreatePost from "@/components/CreatePost";
import usePost from "@/hooks/usePosts";
import type { PostType } from "@/types/post";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import Logout from "@/components/Logout";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [createPostDialog, setCreatePostDialog] = useState(false);
  const { data, isLoading, isError } = usePost();
  console.log("home data", data, isLoading, isError);

  if (isError) {
    return <div className="text-center text-red-500 mt-10">Error fetching data</div>;
  }
  if (isLoading){
    return <div>fetching posts...</div>
  }
  return(
    <div className="min-h-screen w-full flex justify-center pt-5 p-4">
      <ul className="w-full max-w-2xl flex flex-col gap-4">

      <Logout/>
        <Button className="flex border-1 round-3xl p-2 max-w-max font-bold items-center text-xl" onClick={(prev) => setCreatePostDialog(!!prev)}>
          Create<MdAdd/>
        </Button>
      {createPostDialog ? <CreatePost/> : <></>}
        {data.map((post: PostType) => (
          <Link to={`${post.id.trim()}`} 
            key={post.id}
          >
          <li
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div>
              <h1 className="text-lg font-bold text-black">{post.title}</h1>
              <p className="text-md text-black">{post.description}</p>
              {
                post.postImg.length > 0?
                <img className="w-full rounded-xl" src={post.postImg} height={100} width={100} alt="" />
                : <></>
              }
            </div>
            <div className="flex flex-row items-center justify-between mt-4 text-blacktext-sm">
              <h3 className="flex gap-1 items-center">
                <CiHeart />
                {post.likes.length}
              </h3>
              <h3 className="flex gap-1 items-center">
                <FaRegCommentAlt />
                {post.comments.length}
              </h3>
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  )
};

export default HomePage;
