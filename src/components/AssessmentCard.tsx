import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Target } from "lucide-react";

interface AssessmentCardProps {
  title: string;
  description: string;
  duration: string;
  questions: number;
  icon: React.ReactNode;
  isCompleted?: boolean;
}

export function AssessmentCard({ 
  title, 
  description, 
  duration, 
  questions, 
  icon, 
  isCompleted = false 
}: AssessmentCardProps) {
  return (
    <Card className="relative overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-lg">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            {questions} questions
          </div>
        </div>
      </CardContent>
    </Card>
  );
}