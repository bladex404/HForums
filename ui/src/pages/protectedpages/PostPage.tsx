import getPost from "@/api/getPost";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { FaComment } from "react-icons/fa";
import useLike from "@/hooks/useLike";
import { useEffect, useState } from "react";

type ParamType = {
  postId: string;
};
type Props={
  userId:string;
}

const PostPage = (props:Props) => {
  const { postId } = useParams<ParamType>();

  const [liked, setLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>(0);
  console.log("userId",props.userId)
  const likePost = useLike(); // Assuming this is NOT a React hook but a function that returns a Promise

  const { data, isLoading, isError } = getPost(postId?.trim() || "");
  useEffect(() => {
    if (data) {
      setLikesCount(data.likes.length);
if(data.likes.includes(props.userId)){
      console.log(data.likes.includes(props.userId))
      setLiked(true)
    }
    }
    
  }, [data]);
console.log(data)
  const handleLike = async () => {
    if (!postId) return;
    try {
      const { liked, likesCount } = await likePost(postId);
      setLiked(liked);
      setLikesCount(likesCount);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (!postId) {
    return <div className="text-center mt-10 text-red-600">Post ID not found.</div>;
  }

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500">Loading post...</div>;
  }

  if (isError || !data) {
    return <div className="text-center mt-10 text-red-600">Error fetching post.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-md p-6">
        {/* Post Image */}
        {data.postImg && (
          <img
            src={data.postImg}
            alt="Post"
            className="w-full h-[500px] object-cover rounded-md mb-4"
          />
        )}

        {/* Post Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {data.title}
        </h1>

        {/* Post Description */}
        <p className="text-gray-600 text-lg mb-4 text-center">{data.description}</p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-6">
          <Button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              liked ? "bg-red-600" : "bg-red-500"
            } hover:bg-red-700 text-white px-6 py-2 rounded`}
          >
            <Heart className="w-5 h-5" fill={liked ? "white" : "none"} />
            <span>{liked ? "Liked" : "Like"} {likesCount}</span>
          </Button>

          <Button
            onClick={() => {} /* placeholder for openComment */}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            <FaComment className="w-5 h-5" />
            <span>Comment {data.comments.length}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
