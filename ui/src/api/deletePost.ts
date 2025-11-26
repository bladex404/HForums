import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const deletePost = (id:string) =>{
    const {data, isLoading, isError} = useQuery({
        queryFn: async() => {
            const response = await axios.get(`http://localhost:3000/api/v1/posts/delete/:${id}`);
            return response.data;
        },
        queryKey: ['post', id]
    })
    return {data, isLoading,isError }
}
export default deletePost;