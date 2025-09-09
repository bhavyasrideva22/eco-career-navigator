import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer: string;
  onAnswerChange: (value: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  options,
  selectedAnswer,
  onAnswerChange,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <CardTitle className="text-xl leading-relaxed">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer text-sm leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={isFirst}
          >
            Previous
          </Button>
          <Button 
            onClick={onNext}
            disabled={!selectedAnswer}
            variant={isLast ? "hero" : "default"}
          >
            {isLast ? "Complete Assessment" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}