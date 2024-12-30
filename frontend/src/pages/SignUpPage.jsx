import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../ZustandStore/AuthStore";
import { Eye, EyeOff, Loader } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) {
      return toast.error("Username is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Email is invalid");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    } else if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      try {
        await signup(formData);
      } catch (error) {
        toast.error(error.message || "An error occurred while signing up");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:h-screen">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto border border-gray-300 rounded-2xl p-4 sm:p-6 bg-white shadow-md">
        <h1 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-4">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Sign up to get started with our platform
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="text-gray-800 text-sm mb-2 block"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-3 py-2 rounded-md outline-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-800 text-sm mb-2 block"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-3 py-2 rounded-md outline-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray-800 text-sm mb-2 block"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-3 py-2 rounded-md outline-blue-500 pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-60  p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <Loader className="w-5 h-5 mx-auto animate-spin" />
              ) : (
                "Create an account"
              )}
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-4 text-center">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
