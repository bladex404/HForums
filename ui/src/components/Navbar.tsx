import { UserPlus } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex h-20 w-full items-center justify-around">
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-all duration-300 blur-md scale-110"></div>

        <span className="text-white bg-red-500 p-2 rounded-xl text-3xl font-bold tracking-wider drop-shadow-sm">
          HF
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Button type="button" variant="link">
          <UserPlus className="w-4 h-4 mr-1" />
          Signin
        </Button>
        <Button type="button" variant="link">
          <UserPlus className="w-4 h-4 mr-1" />
          Signup
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
