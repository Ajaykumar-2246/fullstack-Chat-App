import React from "react";
import { useChatStore } from "../ZustandStore/ChatStore";
import Sidebar from "../components/Sidebar"; 
import NoChatSelected from "../components/NoChatSelected"; 
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore(); 

  return (
    <div className="h-screen ">
      <div className="flex items-center  justify-center pt-3 px-2  ">
        <div className=" rounded-lg shadow-2xl w-full max-w-7xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-xl  ">
            <Sidebar />
            
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
