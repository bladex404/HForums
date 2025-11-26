import { UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-20 w-full  items-center justify-around">
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-all duration-300 blur-md scale-110"></div>

        <span className="text-black p-6 rounded-xl text-2xl font-bold tracking-wider drop-shadow-sm">
          HForums
        </span>
      </div>

      <div className="flex items-center gap-5 space-x-2">
        <Button onClick={() => navigate("/login")} type="button" variant="link">
          <UserPlus className="w-4 h-4 mr-1" />
          Signin
        </Button>
        <Button
          onClick={() => navigate("/register")}
          type="button"
          variant="link"
        >
          <UserPlus className="w-4 h-4 mr-1" />
          Signup
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
