import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentCard } from '@/components/AssessmentCard';
import { Badge } from '@/components/ui/badge';
import { assessmentSections } from '@/data/assessmentData';
import { 
  Leaf, 
  Target, 
  Brain, 
  BookOpen, 
  CheckCircle2, 
  Clock,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    // Clear any previous results
    localStorage.removeItem('assessmentAnswers');
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Leaf className="w-4 h-4 mr-2" />
              Career Assessment Tool
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Are You Ready for a Career in
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent block mt-2">
              Green Supply Chain Auditing?
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your suitability, readiness, and alignment for a career in Green Supply Chain Management Auditing — 
            a field focused on ensuring businesses minimize environmental impact throughout their supply chains.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>25 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-5 h-5" />
              <span>15 questions</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-5 h-5" />
              <span>Detailed insights</span>
            </div>
          </div>
          
          <Button 
            size="xl" 
            variant="hero"
            onClick={handleStartAssessment}
            className="text-lg px-12 py-6"
          >
            Start Assessment
          </Button>
        </div>
      </section>

      {/* What is Green SCM Auditing */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What is Green Supply Chain Auditing?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A specialized field that combines sustainability expertise with supply chain management to ensure 
              environmental compliance and minimize ecological impact across business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Core Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Sustainability compliance and monitoring</li>
                  <li>• Life cycle assessment (LCA) analysis</li>
                  <li>• Carbon footprint accounting</li>
                  <li>• Waste reduction and circular economy</li>
                  <li>• Ethical sourcing verification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-success" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Green Supply Chain Auditor</li>
                  <li>• Environmental Compliance Officer</li>
                  <li>• Sustainability Analyst</li>
                  <li>• ESG Reporting Specialist</li>
                  <li>• Sustainable Procurement Consultant</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Assessment Overview
            </h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive assessment evaluates three key areas to determine your career readiness
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <AssessmentCard
              title={assessmentSections[0].title}
              description={assessmentSections[0].description}
              duration={assessmentSections[0].duration}
              questions={assessmentSections[0].questions.length}
              icon={<Brain className="w-5 h-5 text-primary" />}
            />
            <AssessmentCard
              title={assessmentSections[1].title}
              description={assessmentSections[1].description}
              duration={assessmentSections[1].duration}
              questions={assessmentSections[1].questions.length}
              icon={<BookOpen className="w-5 h-5 text-primary" />}
            />
            <AssessmentCard
              title={assessmentSections[2].title}
              description={assessmentSections[2].description}
              duration={assessmentSections[2].duration}
              questions={assessmentSections[2].questions.length}
              icon={<TrendingUp className="w-5 h-5 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* Key Traits */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Traits of Successful Professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              Key characteristics that lead to success in Green SCM Auditing careers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { trait: "Analytical Mindset", description: "Strong problem-solving and data analysis skills" },
              { trait: "Attention to Detail", description: "Precise and thorough in documentation and compliance" },
              { trait: "Ethical Judgment", description: "Commitment to sustainability and responsible practices" },
              { trait: "Systems Thinking", description: "Understanding complex supply chain relationships" },
              { trait: "Sustainability Passion", description: "Genuine interest in environmental protection" },
              { trait: "Communication Skills", description: "Ability to work with diverse stakeholders" }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{item.trait}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Discover Your Career Potential?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take our comprehensive assessment to get personalized insights into your readiness 
            for a career in Green Supply Chain Management Auditing.
          </p>
          <Button 
            size="xl" 
            variant="hero"
            onClick={handleStartAssessment}
            className="text-lg px-12 py-6"
          >
            Begin Your Assessment Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
