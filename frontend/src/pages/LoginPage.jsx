import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../ZustandStore/AuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
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
        await login(formData);
      } catch (error) {
        toast.error(error.message || "An error occurred while logging in");
      }
    }
  };

  if (isLoggingIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center font-[sans-serif]  sm:h-screen px-4 sm:pt-9  sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-6   sm:p-8 bg-white shadow-md">
        <h1 className="text-2xl sm:text-2xl font-bold text-center text-gray-800 mb-3">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Log in to continue to your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
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
                type="text"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm sm:text-base px-4 py-3 rounded-md outline-blue-500"
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
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm sm:text-base px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-blue-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>
          </div>

          <div className="!mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm sm:text-base tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 size={20} className="text-white animate-spin" />
              ) : (
                "Log In"
              )}
            </button>
          </div>
          <p className="text-gray-800 text-sm sm:text-base mt-4 text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
