import axios from "axios"

const useLike = () =>{
    const likePost = async(postId: string) =>{
        const response = await axios.get(`http://localhost:3000/api/v1/posts/like/${postId}`,
            {
                withCredentials: true
            }
        );
        const data = response.data;
        return data;
    }
    return likePost;
}
export default useLike;