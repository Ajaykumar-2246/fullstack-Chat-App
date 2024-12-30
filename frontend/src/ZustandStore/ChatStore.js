import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

// Base URL for API
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "/api";
axios.defaults.withCredentials = true;

// Zustand store
export const useChatStore = create((set, get) => ({
  // Initial state
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Fetch users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/messages/users`);
      set({ users: res.data });
    } catch (error) {
      console.error(
        "Failed to fetch users:",
        error.response?.data?.message || "Unknown error"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for a selected user
  getMsg: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Listen to new messages
  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) {
        return;
      }
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });
  },

  // Unsubscribe from messages
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // Set the selected user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
