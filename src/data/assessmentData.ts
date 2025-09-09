import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Personality & Interest Assessment',
    description: 'Evaluate your personality traits and interests alignment with Green SCM Auditing',
    duration: '10 mins',
    questions: [
      {
        id: 'psych_1',
        text: 'When working on a complex project, you prefer to:',
        options: [
          'Break it down into systematic, detailed steps',
          'Focus on the big picture and delegate details',
          'Work collaboratively with team input',
          'Improvise and adapt as you go'
        ],
        category: 'psychometric',
        subcategory: 'big5'
      },
      {
        id: 'psych_2',
        text: 'You find most satisfaction in work that:',
        options: [
          'Has clear environmental impact and purpose',
          'Provides financial stability and growth',
          'Offers variety and new challenges',
          'Allows for creative problem-solving'
        ],
        category: 'psychometric',
        subcategory: 'motivation'
      },
      {
        id: 'psych_3',
        text: 'When reviewing detailed regulations or compliance documents, you:',
        options: [
          'Enjoy finding patterns and ensuring accuracy',
          'Find it tedious but understand its importance',
          'Prefer to focus on implementation rather than documentation',
          'Would rather have someone else handle the details'
        ],
        category: 'psychometric',
        subcategory: 'holland'
      },
      {
        id: 'psych_4',
        text: 'In a team setting, you typically:',
        options: [
          'Take on analytical and research roles',
          'Lead discussions and coordinate activities',
          'Focus on practical implementation',
          'Provide creative insights and alternatives'
        ],
        category: 'psychometric',
        subcategory: 'big5'
      },
      {
        id: 'psych_5',
        text: 'Your approach to learning about sustainability practices is:',
        options: [
          'Study frameworks, standards, and best practices systematically',
          'Learn through hands-on projects and real applications',
          'Attend workshops and learn from expert practitioners',
          'Research cutting-edge innovations and emerging trends'
        ],
        category: 'psychometric',
        subcategory: 'learning_style'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Knowledge & Aptitude',
    description: 'Test your current knowledge and aptitude for technical aspects of Green SCM',
    duration: '10 mins',
    questions: [
      {
        id: 'tech_1',
        text: 'Life Cycle Assessment (LCA) primarily evaluates:',
        options: [
          'Environmental impacts of a product throughout its entire life cycle',
          'Financial costs associated with product development',
          'Market demand and consumer preferences',
          'Manufacturing efficiency and quality control'
        ],
        category: 'technical',
        subcategory: 'domain_knowledge'
      },
      {
        id: 'tech_2',
        text: 'The primary greenhouse gases tracked in carbon footprint calculations include:',
        options: [
          'CO2, CH4, N2O, and fluorinated gases',
          'Only carbon dioxide (CO2)',
          'CO2, oxygen, and nitrogen',
          'All atmospheric gases'
        ],
        category: 'technical',
        subcategory: 'domain_knowledge'
      },
      {
        id: 'tech_3',
        text: 'ISO 14001 is a standard that focuses on:',
        options: [
          'Environmental management systems',
          'Quality management systems',
          'Information security management',
          'Financial reporting standards'
        ],
        category: 'technical',
        subcategory: 'domain_knowledge'
      },
      {
        id: 'tech_4',
        text: 'In a supply chain audit, you discover a supplier is not reporting their water usage accurately. Your first step should be:',
        options: [
          'Document the finding and request detailed water usage data',
          'Immediately recommend terminating the supplier relationship',
          'Ignore the issue if other metrics are satisfactory',
          'Report the supplier to regulatory authorities'
        ],
        category: 'technical',
        subcategory: 'problem_solving'
      },
      {
        id: 'tech_5',
        text: 'The circular economy model primarily aims to:',
        options: [
          'Eliminate waste through reuse, repair, and recycling',
          'Increase production efficiency and speed',
          'Reduce labor costs in manufacturing',
          'Expand global market reach'
        ],
        category: 'technical',
        subcategory: 'domain_knowledge'
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework Analysis',
    description: 'Assess your Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment',
    duration: '5 mins',
    questions: [
      {
        id: 'wiscar_1',
        text: 'How committed are you to pursuing a career in environmental sustainability, even if it requires significant learning and adaptation?',
        options: [
          'Extremely committed - it aligns with my core values and long-term goals',
          'Very committed - I see it as both meaningful and practical',
          'Moderately committed - I\'m interested but want to explore options',
          'Somewhat committed - I\'m still evaluating different career paths'
        ],
        category: 'wiscar',
        subcategory: 'will'
      },
      {
        id: 'wiscar_2',
        text: 'How do you typically respond to feedback about your work performance?',
        options: [
          'I actively seek feedback and use it to improve my approach',
          'I appreciate feedback and try to implement suggestions',
          'I accept feedback but sometimes find it difficult to change',
          'I prefer to work independently and trust my own judgment'
        ],
        category: 'wiscar',
        subcategory: 'ability_to_learn'
      },
      {
        id: 'wiscar_3',
        text: 'When facing a complex problem with multiple variables, you:',
        options: [
          'Break it down systematically and analyze each component',
          'Look for patterns based on similar problems you\'ve solved',
          'Consult with experts and gather multiple perspectives',
          'Trust your intuition and take action based on experience'
        ],
        category: 'wiscar',
        subcategory: 'cognitive'
      },
      {
        id: 'wiscar_4',
        text: 'Your current skills that would be most valuable in Green SCM Auditing include:',
        options: [
          'Analytical thinking, attention to detail, and data analysis',
          'Project management and stakeholder communication',
          'Regulatory knowledge and compliance experience',
          'Technical writing and documentation skills'
        ],
        category: 'wiscar',
        subcategory: 'skill'
      },
      {
        id: 'wiscar_5',
        text: 'How well do your personal career goals align with the typical responsibilities of a Green SCM Auditor?',
        options: [
          'Very well - I want to work directly on environmental compliance and sustainability',
          'Quite well - I\'m interested in analytical roles with environmental impact',
          'Moderately well - I see it as a stepping stone to other green careers',
          'Not sure - I\'m still exploring what specific roles appeal to me'
        ],
        category: 'wiscar',
        subcategory: 'real_world_alignment'
      }
    ]
  }
];

export const careerRoles = [
  {
    title: 'Green Supply Chain Auditor',
    description: 'Audits supply chains for sustainability compliance',
    skills: ['Auditing', 'ESG', 'Logistics', 'Compliance']
  },
  {
    title: 'Sustainability Analyst',
    description: 'Uses data to recommend green optimizations',
    skills: ['Data Analysis', 'LCA Tools', 'Reporting', 'Statistics']
  },
  {
    title: 'ESG Compliance Officer',
    description: 'Ensures corporate governance aligns with green standards',
    skills: ['Legal Compliance', 'ISO Frameworks', 'Risk Management']
  },
  {
    title: 'Carbon Footprint Consultant',
    description: 'Measures and reduces emissions in business operations',
    skills: ['Carbon Accounting', 'GHG Protocol', 'Consulting']
  },
  {
    title: 'Environmental Compliance Officer',
    description: 'Ensures adherence to environmental regulations',
    skills: ['Regulatory Knowledge', 'Documentation', 'Monitoring']
  }
];

export const skillGaps = [
  {
    skill: 'Life Cycle Assessment (LCA)',
    resources: ['Coursera LCA Course', 'OpenLCA Tutorial', 'SimaPro Training'],
    importance: 'high'
  },
  {
    skill: 'ISO 14001 Environmental Management',
    resources: ['IRCA Training', 'ISO.org Resources', 'EdX Courses'],
    importance: 'high'
  },
  {
    skill: 'ESG Reporting Frameworks',
    resources: ['GRI Academy', 'SASB Standards', 'CDP Training'],
    importance: 'medium'
  },
  {
    skill: 'Carbon Accounting',
    resources: ['GHG Protocol', 'Carbon Trust Training', 'EPA Guidelines'],
    importance: 'high'
  },
  {
    skill: 'Supply Chain Analytics',
    resources: ['Excel Advanced', 'Power BI', 'Tableau Training'],
    importance: 'medium'
  }
];