import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/getMe",
        { withCredentials: true }
      );
      if (response) {
        return response.data;
      }
      return new Error("Failed auth");
    },
    retry: false,
  });
};
export default useAuth;
