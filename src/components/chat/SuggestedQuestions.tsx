
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onQuestionClick }: SuggestedQuestionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-3 border-t border-border"
    >
      <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="text-xs px-3 py-1 h-auto whitespace-normal text-left"
              onClick={() => onQuestionClick(question)}
            >
              {question}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestedQuestions;
