import { useState } from "react";
import ChatInterface from "../components/chat/ChatInterface";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative">
      {/* Chat Widget (Fixed Positioning) */}
      <div
        className={`fixed bottom-8 right-8 z-[1000] transition-transform duration-300 ${
          isChatOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[350px] h-[500px] bg-white shadow-lg rounded-lg border border-gray-300">
          <ChatInterface onClose={() => setIsChatOpen(false)} />
        </div>
      </div>

      {/* Chat Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 z-[1001] h-16 w-16 flex items-center justify-center rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300"
        >
          <MessageCircle className="h-10 w-10 text-white" />
        </Button>
      )}
    </div>
  );
};

export default Index;
