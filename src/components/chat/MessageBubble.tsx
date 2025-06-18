
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Message } from "./ChatInterface";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay visibility for staggered animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex gap-2 max-w-[80%]",
        isUser && "flex-row-reverse"
      )}>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        
        <div className="flex flex-col">
          <div className={cn(
            "px-4 py-2 rounded-2xl",
            isUser ? 
              "bg-primary text-primary-foreground rounded-tr-none" : 
              "bg-secondary text-secondary-foreground rounded-tl-none"
          )}>
            <p className="text-sm">{message.text}</p>
          </div>
          <span className={cn(
            "text-xs text-muted-foreground mt-1",
            isUser ? "text-right" : "text-left"
          )}>
            {format(message.timestamp, "h:mm a")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
