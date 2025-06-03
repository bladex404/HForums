import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}
const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
