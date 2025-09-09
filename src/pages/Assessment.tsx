import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/QuestionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { assessmentSections } from '@/data/assessmentData';
import { Answer } from '@/types/assessment';

export default function Assessment() {
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const allQuestions = assessmentSections.flatMap(section => section.questions);
  const totalQuestions = allQuestions.length;
  const currentQuestionNumber = currentSectionIndex * assessmentSections[0].questions.length + currentQuestionIndex + 1;
  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    // Save current answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: parseInt(currentAnswer),
      timestamp: new Date()
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), newAnswer];
    setAnswers(updatedAnswers);

    // Move to next question
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
      setCurrentAnswer('');
    } else {
      // Assessment complete - navigate to results
      localStorage.setItem('assessmentAnswers', JSON.stringify(updatedAnswers));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(assessmentSections[currentSectionIndex - 1].questions.length - 1);
    }
    
    // Load previous answer if exists
    const prevQuestion = currentQuestionIndex > 0 
      ? currentSection.questions[currentQuestionIndex - 1]
      : assessmentSections[currentSectionIndex - 1]?.questions[assessmentSections[currentSectionIndex - 1].questions.length - 1];
    
    if (prevQuestion) {
      const prevAnswer = answers.find(a => a.questionId === prevQuestion.id);
      setCurrentAnswer(prevAnswer?.selectedOption.toString() || '');
    }
  };

  const isFirst = currentSectionIndex === 0 && currentQuestionIndex === 0;
  const isLast = currentSectionIndex === assessmentSections.length - 1 && 
                currentQuestionIndex === currentSection.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Green SCM Auditor Assessment
            </h1>
            <p className="text-muted-foreground">
              Section: {currentSection.title}
            </p>
          </div>

          {/* Progress */}
          <ProgressBar 
            currentStep={currentQuestionNumber} 
            totalSteps={totalQuestions}
            className="mb-8"
          />

          {/* Question */}
          <QuestionCard
            question={currentQuestion.text}
            options={currentQuestion.options}
            selectedAnswer={currentAnswer}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={isFirst}
            isLast={isLast}
            questionNumber={currentQuestionNumber}
            totalQuestions={totalQuestions}
          />
        </div>
      </div>
    </div>
  );
}