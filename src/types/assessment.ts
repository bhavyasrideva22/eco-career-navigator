export interface Question {
  id: string;
  text: string;
  options: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  weight?: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  selectedOption: number;
  timestamp: Date;
}

export interface SectionScore {
  sectionId: string;
  score: number;
  maxScore: number;
  interpretation: string;
  recommendations: string[];
}

export interface AssessmentResults {
  psychometricScore: SectionScore;
  technicalScore: SectionScore;
  wiscarScore: SectionScore;
  overallScore: number;
  confidence: number;
  recommendation: 'pursue' | 'explore' | 'not-fit';
  nextSteps: string[];
  careerRoles: string[];
  skillGaps: string[];
}