import { useState } from "react";
import { useAuthStore } from "../ZustandStore/AuthStore";
import { Camera, Mail, User } from "lucide-react";


const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" shadow-md border-gray-400 rounded-lg p-4">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your personal information
            </p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-gray-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-gray-700 hover:bg-gray-600 p-2 rounded-full cursor-pointer ${
                  isUpdatingProfile ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 text-center sm:text-left">
              {isUpdatingProfile ? "Uploading..." : "Click to update your photo"}
            </p>
          </div>

          {/* Personal Information Section */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-sm text-gray-600 gap-1 mb-1">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm">
                {authUser?.username}
              </p>
            </div>

            <div>
              <div className="flex items-center text-sm text-gray-600 gap-1 mb-1">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200 text-sm">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="mt-6 bg-gray-100 rounded-md p-4 shadow-sm">
            <h2 className="text-base font-medium text-gray-800 mb-3">
              Account Details
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between py-1">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
