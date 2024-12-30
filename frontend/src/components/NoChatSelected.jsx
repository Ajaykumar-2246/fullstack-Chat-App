import { MessagesSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen  p-8 sm:p-16">
      <div className="max-w-lg text-center space-y-8">
        
        {/* Icon Display */}
        <div className="flex animate-bounce justify-center mb-6">
          <div
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center
             justify-center  shadow-lg"
          >
            <MessagesSquare className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold">Welcome to ChatEase</h2>
        <p className="">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
