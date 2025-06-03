// Main App Component
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import useAuth from "./hooks/useAuth";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/protected";
import HomePage from "./pages/protectedpages/HomePage";
import LandingPage from "./pages/publicpages/LandingPage";
const App = () => {
  const { data: user, isLoading } = useAuth();
  if (isLoading) {
    return <div> ...Loading</div>;
  }
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
