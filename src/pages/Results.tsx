import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScoreCard } from '@/components/ScoreCard';
import { calculateOverallResults } from '@/utils/scoring';
import { AssessmentResults, Answer } from '@/types/assessment';
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, Download, RotateCcw } from 'lucide-react';

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('assessmentAnswers');
    if (!savedAnswers) {
      navigate('/');
      return;
    }

    try {
      const answers: Answer[] = JSON.parse(savedAnswers);
      const calculatedResults = calculateOverallResults(answers);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error calculating results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Error loading results. Please try again.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'pursue': return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'explore': return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'not-fit': return <XCircle className="w-5 h-5 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'pursue': return 'Strongly Recommended';
      case 'explore': return 'Explore Further';
      case 'not-fit': return 'Consider Alternatives';
      default: return 'Unknown';
    }
  };

  const getRecommendationVariant = (recommendation: string) => {
    switch (recommendation) {
      case 'pursue': return 'default' as const;
      case 'explore': return 'secondary' as const;
      case 'not-fit': return 'outline' as const;
      default: return 'outline' as const;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Your Assessment Results
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Green Supply Chain Management Auditor Career Readiness
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge 
                variant={getRecommendationVariant(results.recommendation)}
                className="px-4 py-2 text-base"
              >
                {getRecommendationIcon(results.recommendation)}
                {getRecommendationText(results.recommendation)}
              </Badge>
              <div className="text-2xl font-bold text-primary">
                {results.overallScore}%
              </div>
            </div>
          </div>

          {/* Overall Score Card */}
          <Card className="mb-8 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Overall Career Readiness Score
                <Badge variant="secondary">{results.confidence}% Confidence</Badge>
              </CardTitle>
              <CardDescription>
                Based on your psychometric profile, technical knowledge, and WISCAR analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-4">
                {results.overallScore}/100
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {results.recommendation === 'pursue' && 
                  "Excellent! You demonstrate strong alignment with Green SCM Auditing careers. Your personality, skills, and interests make you a great candidate for this field."
                }
                {results.recommendation === 'explore' && 
                  "Good potential! You show promise for Green SCM Auditing with some areas for development. Consider targeted learning and skill building."
                }
                {results.recommendation === 'not-fit' && 
                  "While Green SCM Auditing may not be the perfect fit, there are many other environmental careers that might better match your profile and interests."
                }
              </p>
            </CardContent>
          </Card>

          {/* Section Scores */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <ScoreCard
              title="Personality & Interest"
              score={results.psychometricScore.score}
              description={results.psychometricScore.interpretation}
              badgeText={results.psychometricScore.score >= 75 ? "Strong Match" : results.psychometricScore.score >= 50 ? "Good Fit" : "Needs Development"}
              badgeVariant={results.psychometricScore.score >= 75 ? "default" : results.psychometricScore.score >= 50 ? "secondary" : "outline"}
            />
            <ScoreCard
              title="Technical Knowledge"
              score={results.technicalScore.score}
              description={results.technicalScore.interpretation}
              badgeText={results.technicalScore.score >= 75 ? "Ready" : results.technicalScore.score >= 50 ? "Developing" : "Foundational"}
              badgeVariant={results.technicalScore.score >= 75 ? "default" : results.technicalScore.score >= 50 ? "secondary" : "outline"}
            />
            <ScoreCard
              title="WISCAR Analysis"
              score={results.wiscarScore.score}
              description={results.wiscarScore.interpretation}
              badgeText={results.wiscarScore.score >= 75 ? "Aligned" : results.wiscarScore.score >= 50 ? "Potential" : "Misaligned"}
              badgeVariant={results.wiscarScore.score >= 75 ? "default" : results.wiscarScore.score >= 50 ? "secondary" : "outline"}
            />
          </div>

          {/* Recommended Next Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suitable Career Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.careerRoles.map((role, index) => (
                    <div key={index} className="p-3 bg-accent/30 rounded-lg">
                      <h4 className="font-medium text-sm">{role}</h4>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Gaps */}
          {results.skillGaps.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Areas for Development</CardTitle>
                <CardDescription>
                  Key skills to focus on for career advancement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {results.skillGaps.map((skill, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-muted/30">
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Take Assessment Again
            </Button>
            <Button 
              variant="hero"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Detailed Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}