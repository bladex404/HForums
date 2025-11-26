import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import useAuth from "./hooks/useAuth";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/protected";
import HomePage from "./pages/protectedpages/HomePage";
import LandingPage from "./pages/publicpages/LandingPage";
import AuthProtected from "./routes/auths";
import PostPage from "./pages/protectedpages/PostPage";
const App = () => {
  const { data: user, isLoading } = useAuth();
  console.log(user);
  if (isLoading) {
    return <div> ...Loading</div>;
  }
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            <AuthProtected isAuthenticated={!!user}>
              <Signup />
            </AuthProtected>
          }
        />
        <Route
          path="/login"
          element={
            <AuthProtected isAuthenticated={!!user}>
              <Signin />
            </AuthProtected>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/posts"
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="posts/:postId"
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <PostPage userId={user?.user?.id} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
