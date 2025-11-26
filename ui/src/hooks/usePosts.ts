import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const usePost = () =>{
    const {data,isLoading,isError} = useQuery({
        queryKey: ['posts'],
        queryFn: async() =>{
            const response = await axios.get('http://localhost:3000/api/v1/posts/');
            return response.data.posts;
        }
    })
    console.log(data)
    return(
        {data,isLoading,isError}
    )
}
export default usePost;