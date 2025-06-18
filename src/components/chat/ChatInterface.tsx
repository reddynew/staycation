
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "./MessageBubble";
import SuggestedQuestions from "./SuggestedQuestions";
import { cn } from "@/lib/utils";

// Types
export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

// Mock predefined questions (later will come from backend)
const PREDEFINED_QUESTIONS = [
  "What services do you offer?",
  "How can I get started?",
  "What are your pricing plans?",
  "Do you offer support?",
];

// Mock responses (later will be replaced with actual backend/LLM responses)
const BOT_RESPONSES: Record<string, string> = {
  "What services do you offer?": "We offer a wide range of services including web development, mobile app development, and AI integration.",
  "How can I get started?": "You can get started by signing up for an account and then following our simple onboarding process.",
  "What are your pricing plans?": "We have several pricing plans starting from $9.99/month for basic features up to $49.99/month for enterprise solutions.",
  "Do you offer support?": "Yes, we offer 24/7 customer support via chat and email. Our team is always ready to help you!",
};

const getDefaultResponse = (query: string) => {
  return `I've received your question about "${query}". In the future, this will be processed by your custom LLM, but for now I'm providing this default response.`;
};

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      const botResponse = BOT_RESPONSES[inputValue.trim()] || getDefaultResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    
    // Focus and trigger send after a short delay
    setTimeout(() => {
      inputRef.current?.focus();
      handleSend();
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-background rounded-lg shadow-lg border border-border w-80 sm:w-96 max-h-[600px] flex flex-col overflow-hidden"
    >
      {/* Chat Header */}
      <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-medium">Chat Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-primary-foreground/20 text-primary-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/50 w-24"
          >
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Typing...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <SuggestedQuestions 
          questions={PREDEFINED_QUESTIONS} 
          onQuestionClick={handleQuestionClick} 
        />
      )}

      {/* Input Area */}
      <div className="border-t border-border p-3">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            size="icon"
            className={cn(
              "shrink-0",
              !inputValue.trim() && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;
