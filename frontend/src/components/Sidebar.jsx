import React, { useEffect, useState } from "react";
import { useChatStore } from "../ZustandStore/ChatStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../ZustandStore/AuthStore";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="shadow-[rgba(0,0,11,0.1)_2px_2px_2px_0px]">
      <aside className="h-full w-20 lg:w-72 border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="hidden lg:block font-semibold text-xl">
              Contacts
            </span>
          </div>
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label
              className="cursor-pointer flex items-center gap-2"
              aria-label="Show Online Users"
            >
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show Online Users</span>
            </label>
          </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
              aria-label={`Select ${user.username}`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name || "User Avatar"}
                  className="w-12 h-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full ring-2 ring-transparent"></span>
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.username}</div>
                <div
                  className={`text-sm ${
                    onlineUsers.includes(user._id)
                      ? "text-green-500"
                      : "text-zinc-400"
                  }`}
                >
                  {onlineUsers.includes(user._id) ? "online" : "offline"}
                </div>
              </div>
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              {showOnlineOnly ? "No online users" : "No users available"}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
