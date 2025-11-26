import useLogout from "@/hooks/useLogout"
import { Button } from "./ui/button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const Logout = () => {
    const { mutate:logout, isPending, isSuccess, error } = useLogout();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    useEffect(() => {
        if (isPending) {
            toast.loading("Logging out user", { toastId: "logout" }); // toastId prevents duplicates
        }
    }, [isPending]);

    useEffect(() => {
        if (isSuccess) {
            toast.update("logout", { 
                render: "User logged out successfully", 
                type: "success", 
                isLoading: false, 
                autoClose: 3000 
            });
            queryClient.invalidateQueries(['user'])
            window.location.reload();
            navigate("/posts");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (error) {
            toast.error("Logout failed");
        }
    }, [error]);

    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <Button onClick={handleLogout} disabled={isPending}>
                {isPending ? "Logging out" : "Logout"}
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default Logout;
