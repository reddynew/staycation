
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChatInterface from "../components/chat/ChatInterface";
import { MessageCircle } from "lucide-react";
import ChatPage from "./ChatPage";
const Index = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your Next Adventure Awaits
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover and book amazing hotels and thrilling amusement parks all in
            one place. Start your journey today.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/hotel")}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
            >
              Find Hotels
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/parks")}
              className="border-2"
            >
              Explore Parks
            </Button>
          </div>
        </div>
      </main>
      {/* Chat Widget */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out ${isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <ChatInterface onClose={() => setIsChatOpen(false)} />
      </div>

      {/* Chat Button (Fixed & Bigger) */}
      {!isChatOpen && (
        <Button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 z-40 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-600 transition-all duration-300"
        >
          <MessageCircle className="h-10 w-10 text-white" />
        </Button>
      )}
    </div>
  );
};

export default Index;
