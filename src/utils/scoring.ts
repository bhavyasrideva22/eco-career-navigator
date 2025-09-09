import { Answer, AssessmentResults, SectionScore } from '@/types/assessment';
import { assessmentSections, careerRoles, skillGaps } from '@/data/assessmentData';

export function calculateSectionScore(answers: Answer[], sectionId: string): SectionScore {
  const section = assessmentSections.find(s => s.id === sectionId);
  if (!section) {
    throw new Error(`Section ${sectionId} not found`);
  }

  const sectionAnswers = answers.filter(a => 
    section.questions.some(q => q.id === a.questionId)
  );

  let totalScore = 0;
  const maxScore = section.questions.length * 3; // Assuming 0-3 scoring per question

  sectionAnswers.forEach(answer => {
    // Higher option index = better score for most questions
    totalScore += answer.selectedOption;
  });

  const normalizedScore = Math.round((totalScore / maxScore) * 100);

  return {
    sectionId,
    score: normalizedScore,
    maxScore: 100,
    interpretation: getInterpretation(normalizedScore, sectionId),
    recommendations: getRecommendations(normalizedScore, sectionId)
  };
}

function getInterpretation(score: number, sectionId: string): string {
  const interpretations = {
    psychometric: {
      high: "You demonstrate strong personality alignment with Green SCM Auditing roles. Your analytical mindset and attention to detail are well-suited for this field.",
      medium: "You show good potential for Green SCM Auditing with some areas for development in analytical approaches and detail orientation.",
      low: "Your personality profile suggests you might find more satisfaction in other environmental roles that emphasize creativity or people management."
    },
    technical: {
      high: "You have solid foundational knowledge and technical aptitude for Green SCM Auditing. You're ready to start applying these skills professionally.",
      medium: "You demonstrate good technical understanding with some knowledge gaps. Focused learning in specific areas will prepare you well for this field.",
      low: "You would benefit from foundational education in environmental science, auditing principles, and sustainability frameworks before pursuing this career."
    },
    wiscar: {
      high: "Excellent alignment across all WISCAR dimensions. You have the will, interest, skills, cognitive readiness, learning ability, and career alignment for success in this field.",
      medium: "Good overall alignment with some areas for development. Focus on strengthening your weaker WISCAR dimensions through targeted development.",
      low: "Some misalignment in key areas. Consider whether this career path truly matches your interests, goals, and current capabilities."
    }
  };

  const level = score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low';
  return interpretations[sectionId as keyof typeof interpretations][level];
}

function getRecommendations(score: number, sectionId: string): string[] {
  const recommendations = {
    psychometric: {
      high: [
        "Continue developing your analytical and systematic thinking skills",
        "Seek opportunities to work with detailed compliance frameworks",
        "Build experience in stakeholder communication and reporting"
      ],
      medium: [
        "Practice structured problem-solving approaches",
        "Develop stronger attention to detail through relevant projects",
        "Work on building patience for detailed documentation and analysis"
      ],
      low: [
        "Consider exploring other environmental careers that match your personality better",
        "If still interested, focus on developing systematic thinking skills",
        "Explore team-based roles where you can leverage your strengths"
      ]
    },
    technical: {
      high: [
        "Begin practical application through internships or projects",
        "Pursue advanced certifications in LCA and environmental auditing",
        "Start building experience with industry-standard tools and software"
      ],
      medium: [
        "Take foundational courses in Life Cycle Assessment and ISO 14001",
        "Practice with free tools like OpenLCA to build technical skills",
        "Join professional organizations like ISEA or similar groups"
      ],
      low: [
        "Start with basic environmental science and sustainability courses",
        "Build foundational knowledge in business operations and compliance",
        "Consider starting in a more general environmental role to build experience"
      ]
    },
    wiscar: {
      high: [
        "Begin networking with professionals in Green SCM and sustainability",
        "Seek mentorship from experienced environmental auditors",
        "Start building your professional portfolio with relevant projects"
      ],
      medium: [
        "Identify and address your specific WISCAR development areas",
        "Seek feedback on your current skills and create a development plan",
        "Build experience in your stronger areas while improving weaker ones"
      ],
      low: [
        "Reassess whether this career path aligns with your true interests and goals",
        "Consider alternative environmental careers that better match your profile",
        "If committed, create a comprehensive development plan to address gaps"
      ]
    }
  };

  const level = score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low';
  return recommendations[sectionId as keyof typeof recommendations][level];
}

export function calculateOverallResults(answers: Answer[]): AssessmentResults {
  const psychometricScore = calculateSectionScore(answers, 'psychometric');
  const technicalScore = calculateSectionScore(answers, 'technical');
  const wiscarScore = calculateSectionScore(answers, 'wiscar');

  // Weighted average: 40% psychometric, 30% technical, 30% WISCAR
  const overallScore = Math.round(
    (psychometricScore.score * 0.4) + 
    (technicalScore.score * 0.3) + 
    (wiscarScore.score * 0.3)
  );

  const confidence = calculateConfidence(psychometricScore.score, technicalScore.score, wiscarScore.score);
  const recommendation = getRecommendation(overallScore, confidence);

  return {
    psychometricScore,
    technicalScore,
    wiscarScore,
    overallScore,
    confidence,
    recommendation,
    nextSteps: getNextSteps(recommendation, overallScore),
    careerRoles: getSuggestedRoles(overallScore),
    skillGaps: getIdentifiedSkillGaps(technicalScore.score)
  };
}

function calculateConfidence(psychometric: number, technical: number, wiscar: number): number {
  // Higher confidence when scores are consistent and high
  const variance = Math.sqrt(
    ((psychometric - 67) ** 2 + (technical - 67) ** 2 + (wiscar - 67) ** 2) / 3
  );
  const averageScore = (psychometric + technical + wiscar) / 3;
  
  // Lower variance and higher average = higher confidence
  return Math.round(Math.max(0, Math.min(100, averageScore - variance * 2)));
}

function getRecommendation(overallScore: number, confidence: number): 'pursue' | 'explore' | 'not-fit' {
  if (overallScore >= 70 && confidence >= 60) return 'pursue';
  if (overallScore >= 50 || confidence >= 40) return 'explore';
  return 'not-fit';
}

function getNextSteps(recommendation: 'pursue' | 'explore' | 'not-fit', score: number): string[] {
  switch (recommendation) {
    case 'pursue':
      return [
        'Start with ISO 14001 Environmental Management Systems certification',
        'Enroll in a Life Cycle Assessment (LCA) training program',
        'Join professional organizations like ISEA or similar groups',
        'Seek internships or entry-level positions in environmental consulting',
        'Build experience with ESG reporting frameworks'
      ];
    case 'explore':
      return [
        'Take introductory courses in environmental sustainability',
        'Attend webinars and workshops on Green Supply Chain Management',
        'Shadow professionals working in environmental auditing',
        'Complete online assessments for related career paths',
        'Build foundational knowledge in your weaker assessment areas'
      ];
    case 'not-fit':
      return [
        'Consider alternative environmental careers that better match your profile',
        'Explore roles in environmental data analysis or sustainability consulting',
        'Reassess your career goals and interests',
        'Consider developing stronger analytical or technical skills if still interested',
        'Speak with career counselors about environmental career alternatives'
      ];
  }
}

function getSuggestedRoles(score: number): string[] {
  const allRoles = careerRoles.map(role => role.title);
  
  if (score >= 80) return allRoles;
  if (score >= 60) return allRoles.slice(0, 3);
  return allRoles.slice(0, 2);
}

function getIdentifiedSkillGaps(technicalScore: number): string[] {
  const gaps = skillGaps.map(gap => gap.skill);
  
  if (technicalScore >= 80) return gaps.slice(0, 2);
  if (technicalScore >= 60) return gaps.slice(0, 3);
  return gaps;
}