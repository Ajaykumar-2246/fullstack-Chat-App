import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { useAuthStore } from "./ZustandStore/AuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-30 animate-spin" />
      </div>
    );
  return (
    <div className="h-screen bg-white" >
      <Navbar />
      <Routes>
        <Route
          path="/"
          Component={authUser ? HomePage : () => <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          Component={!authUser ? SignUpPage : () => <Navigate to="/" />}
        />
        <Route
          path="/login"
          Component={!authUser ? LoginPage : () => <Navigate to="/" />}
        />
        <Route
          path="/profile"
          Component={authUser ? ProfilePage : () => <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
