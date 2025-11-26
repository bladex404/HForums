import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getPost = (id:string) =>{
    const {data, isLoading, isError} = useQuery({
        queryKey: ['post',id],
        queryFn: async() => {
            const response = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
            return response.data;
        }
    })
    return {data, isLoading,isError }
}
export default getPost;