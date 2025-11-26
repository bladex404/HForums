// hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await axios.get("http://localhost:3000/api/v1/users/logout", {
                withCredentials: true,
            });
            return res.data;
        },
    });
};

export default useLogout;
