import { Link } from "react-router-dom";
import { useAuthStore } from "../ZustandStore/AuthStore";
import { LogOut, MessagesSquare, User } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="flex items-center mb-3 sm:mb-4 justify-between z-40 px-6 py-2 shadow-md">
      {!authUser ? (
        <div className="flex items-center space-x-2 justify-center w-full text-xl font-extrabold text-gray-800">
          <div className="size-9 rounded-lg bg-blue-100 flex  items-center justify-center">
            <MessagesSquare className="w-7 h-7 text-primary" />
          </div>
          <h1>ChatEase</h1>
        </div>
      ) : (
        <>
          {/* Logo and Home Link */}
          <div className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <Link
              to="/"
              className="hover:text-indigo-600 flex space-x-1 transition-all"
            >
              <div className="size-9 rounded-lg bg-blue-100 flex  items-center justify-center">
                <MessagesSquare className="w-7 h-7 text-primary" />
              </div>
              <h1>ChatEase</h1>
            </Link>
          </div>

          {/* Profile and Logout Section */}
          <div className="flex items-center space-x-6">
            <Link to="/profile" className="flex items-center space-x-2">
              <User className="text-gray-600 hover:text-indigo-600 transition-all" />
              <span className="hidden sm:inline text-gray-600 hover:text-indigo-600 font-medium">
                Profile
              </span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-all focus:outline-none"
            >
              <LogOut />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
