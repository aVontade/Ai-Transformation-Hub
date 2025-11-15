'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Users, 
  Target, 
  BookOpen, 
  Play, 
  CheckCircle, 
  TrendingUp,
  Brain,
  Zap,
  Award,
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  role: string;
  industry?: string;
  difficulty: string;
  duration: number;
  modules: any[];
  outcomes?: any[];
  twoWeekPlan?: {
    week1: {
      focus: string;
      weeklyGoal: string;
      days: {
        day: number;
        title: string;
        activities: string[];
        duration: string;
        deliverable: string;
      }[];
    };
    week2: {
      focus: string;
      weeklyGoal: string;
      days: {
        day: number;
        title: string;
        activities: string[];
        duration: string;
        deliverable: string;
      }[];
    };
  };
}

interface LearningProgress {
  id: string;
  pathId: string;
  status: string;
  completionRate: number;
  timeSpent: number;
  lastAccessedAt: string;
  completedAt?: string;
  path: LearningPath;
}

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'CEO Strategic AI Leadership',
    description: 'Master strategic AI positioning and competitive intelligence for executive leadership',
    role: 'CEO',
    difficulty: 'Advanced',
    duration: 24,
    modules: [
      { title: 'Competitive Intelligence & AI Market Mapping', duration: 8 },
      { title: 'AI-First Business Model Innovation', duration: 8 },
      { title: 'Strategic AI Investment Portfolio', duration: 8 }
    ],
    outcomes: [
      'Develop comprehensive AI strategy',
      'Identify competitive advantages',
      'Build AI investment roadmap'
    ],
    twoWeekPlan: {
      week1: {
        focus: 'Strategic Foundation & Market Intelligence',
        weeklyGoal: 'Understand AI landscape and competitive positioning',
        days: [
          {
            day: 1,
            title: 'AI Market Landscape Analysis',
            activities: [
              'Review global AI adoption trends and statistics',
              'Analyze industry-specific AI use cases',
              'Identify key AI technology providers and platforms'
            ],
            duration: '2-3 hours',
            deliverable: 'AI market landscape report for your industry'
          },
          {
            day: 2,
            title: 'Competitive Intelligence Gathering',
            activities: [
              'Research competitor AI initiatives and investments',
              'Map competitor AI maturity levels',
              'Identify competitive threats and opportunities'
            ],
            duration: '2-3 hours',
            deliverable: 'Competitive AI intelligence matrix'
          },
          {
            day: 3,
            title: 'Strategic AI Vision Development',
            activities: [
              'Define organizational AI vision and mission',
              'Align AI strategy with business objectives',
              'Identify strategic AI priorities'
            ],
            duration: '2-3 hours',
            deliverable: 'Draft AI vision statement'
          },
          {
            day: 4,
            title: 'AI Business Model Innovation',
            activities: [
              'Explore AI-enabled business model transformations',
              'Identify revenue opportunities through AI',
              'Design AI-first value propositions'
            ],
            duration: '2-3 hours',
            deliverable: 'AI business model canvas'
          },
          {
            day: 5,
            title: 'Week 1 Integration & Planning',
            activities: [
              'Synthesize week 1 learnings',
              'Present findings to leadership team',
              'Develop preliminary AI roadmap'
            ],
            duration: '2-3 hours',
            deliverable: 'Week 1 executive summary and action plan'
          }
        ]
      },
      week2: {
        focus: 'Implementation Strategy & Investment Planning',
        weeklyGoal: 'Create actionable AI transformation roadmap',
        days: [
          {
            day: 6,
            title: 'AI Investment Portfolio Design',
            activities: [
              'Prioritize AI initiatives by ROI and strategic value',
              'Allocate budget across AI projects',
              'Define success metrics and KPIs'
            ],
            duration: '2-3 hours',
            deliverable: 'AI investment portfolio with budget allocation'
          },
          {
            day: 7,
            title: 'Organizational Readiness Assessment',
            activities: [
              'Evaluate current AI capabilities and gaps',
              'Assess talent and infrastructure needs',
              'Identify change management requirements'
            ],
            duration: '2-3 hours',
            deliverable: 'Organizational readiness scorecard'
          },
          {
            day: 8,
            title: 'AI Governance Framework',
            activities: [
              'Establish AI ethics and governance principles',
              'Define decision-making structures',
              'Create risk management protocols'
            ],
            duration: '2-3 hours',
            deliverable: 'AI governance framework document'
          },
          {
            day: 9,
            title: 'Stakeholder Engagement Strategy',
            activities: [
              'Develop board and investor communication plan',
              'Create employee engagement strategy',
              'Plan customer communication approach'
            ],
            duration: '2-3 hours',
            deliverable: 'Stakeholder engagement roadmap'
          },
          {
            day: 10,
            title: 'Final Strategy Presentation',
            activities: [
              'Compile comprehensive AI transformation strategy',
              'Prepare executive presentation',
              'Define next 90-day action plan'
            ],
            duration: '3-4 hours',
            deliverable: 'Complete AI transformation strategy deck'
          }
        ]
      }
    }
  },
  {
    id: '2',
    title: 'AI-Driven Revenue Generation',
    description: 'Leverage AI for customer intelligence and revenue optimization strategies',
    role: 'CEO',
    difficulty: 'Advanced',
    duration: 26,
    modules: [
      { title: 'AI-Powered Customer Intelligence', duration: 10 },
      { title: 'Revenue Optimization Through AI', duration: 8 },
      { title: 'Innovation Pipeline Management', duration: 8 }
    ],
    outcomes: [
      'Increase revenue through AI insights',
      'Optimize customer experience',
      'Build innovation pipeline'
    ],
    twoWeekPlan: {
      week1: {
        focus: 'Customer Intelligence & Data Foundation',
        weeklyGoal: 'Build AI-powered customer insights capability',
        days: [
          {
            day: 1,
            title: 'Customer Data Audit',
            activities: [
              'Map all customer data sources and touchpoints',
              'Assess data quality and completeness',
              'Identify data integration opportunities'
            ],
            duration: '2-3 hours',
            deliverable: 'Customer data inventory and quality assessment'
          },
          {
            day: 2,
            title: 'AI Customer Segmentation',
            activities: [
              'Learn advanced segmentation techniques',
              'Apply ML clustering algorithms',
              'Create predictive customer personas'
            ],
            duration: '2-3 hours',
            deliverable: 'AI-powered customer segmentation model'
          },
          {
            day: 3,
            title: 'Customer Lifetime Value Prediction',
            activities: [
              'Build CLV prediction models',
              'Identify high-value customer characteristics',
              'Develop retention strategies'
            ],
            duration: '2-3 hours',
            deliverable: 'CLV prediction framework'
          },
          {
            day: 4,
            title: 'Personalization Strategy',
            activities: [
              'Design AI-driven personalization engine',
              'Map customer journey touchpoints',
              'Create dynamic content strategies'
            ],
            duration: '2-3 hours',
            deliverable: 'Personalization strategy blueprint'
          },
          {
            day: 5,
            title: 'Customer Intelligence Dashboard',
            activities: [
              'Design executive customer intelligence dashboard',
              'Define key customer metrics',
              'Set up real-time monitoring'
            ],
            duration: '2-3 hours',
            deliverable: 'Customer intelligence dashboard prototype'
          }
        ]
      },
      week2: {
        focus: 'Revenue Optimization & Growth Strategies',
        weeklyGoal: 'Implement AI-driven revenue growth initiatives',
        days: [
          {
            day: 6,
            title: 'Pricing Optimization with AI',
            activities: [
              'Analyze pricing elasticity and patterns',
              'Implement dynamic pricing strategies',
              'Test AI-powered pricing models'
            ],
            duration: '2-3 hours',
            deliverable: 'Dynamic pricing strategy framework'
          },
          {
            day: 7,
            title: 'Churn Prediction & Prevention',
            activities: [
              'Build churn prediction models',
              'Identify early warning indicators',
              'Design intervention strategies'
            ],
            duration: '2-3 hours',
            deliverable: 'Churn prevention playbook'
          },
          {
            day: 8,
            title: 'Cross-sell & Upsell AI',
            activities: [
              'Develop recommendation engines',
              'Identify cross-sell opportunities',
              'Create automated upsell campaigns'
            ],
            duration: '2-3 hours',
            deliverable: 'AI-powered sales acceleration plan'
          },
          {
            day: 9,
            title: 'Revenue Forecasting',
            activities: [
              'Build AI revenue prediction models',
              'Scenario planning with AI',
              'Create revenue optimization roadmap'
            ],
            duration: '2-3 hours',
            deliverable: 'AI-powered revenue forecast model'
          },
          {
            day: 10,
            title: 'Growth Strategy Presentation',
            activities: [
              'Compile revenue growth strategy',
              'Calculate ROI projections',
              'Present to leadership team'
            ],
            duration: '3-4 hours',
            deliverable: 'AI revenue growth strategy presentation'
          }
        ]
      }
    }
  },
  {
    id: '3',
    title: 'AI Fundamentals for Managers',
    description: 'Essential AI knowledge for effective team leadership and decision-making',
    role: 'Manager',
    difficulty: 'Beginner',
    duration: 16,
    modules: [
      { title: 'AI Literacy Basics', duration: 4 },
      { title: 'Managing AI-Enhanced Teams', duration: 6 },
      { title: 'AI Project Management', duration: 6 }
    ],
    outcomes: [
      'Lead AI-powered teams effectively',
      'Make informed AI decisions',
      'Drive successful AI projects'
    ],
    twoWeekPlan: {
      week1: {
        focus: 'AI Fundamentals & Team Leadership',
        weeklyGoal: 'Build foundational AI knowledge and leadership skills',
        days: [
          {
            day: 1,
            title: 'Introduction to AI & Machine Learning',
            activities: [
              'Understand AI, ML, and deep learning basics',
              'Learn key AI terminology and concepts',
              'Explore real-world AI applications'
            ],
            duration: '1-2 hours',
            deliverable: 'AI concepts glossary for your team'
          },
          {
            day: 2,
            title: 'AI Tools & Platforms Overview',
            activities: [
              'Survey popular AI tools and platforms',
              'Hands-on with ChatGPT, Copilot, and other tools',
              'Identify tools relevant to your department'
            ],
            duration: '1-2 hours',
            deliverable: 'AI tools evaluation matrix'
          },
          {
            day: 3,
            title: 'Managing AI-Enhanced Workflows',
            activities: [
              'Map current team workflows',
              'Identify AI automation opportunities',
              'Design human-AI collaboration models'
            ],
            duration: '1-2 hours',
            deliverable: 'AI-enhanced workflow diagram'
          },
          {
            day: 4,
            title: 'Building AI-Ready Teams',
            activities: [
              'Assess team AI skills and gaps',
              'Create AI upskilling plan',
              'Address team concerns about AI'
            ],
            duration: '1-2 hours',
            deliverable: 'Team AI readiness assessment'
          },
          {
            day: 5,
            title: 'AI Ethics & Responsible Use',
            activities: [
              'Learn AI ethics principles',
              'Understand bias and fairness issues',
              'Create team AI usage guidelines'
            ],
            duration: '1-2 hours',
            deliverable: 'Team AI ethics guidelines document'
          }
        ]
      },
      week2: {
        focus: 'AI Project Management & Implementation',
        weeklyGoal: 'Launch and manage AI initiatives successfully',
        days: [
          {
            day: 6,
            title: 'AI Project Planning',
            activities: [
              'Define AI project scope and objectives',
              'Identify success metrics and KPIs',
              'Create project timeline and milestones'
            ],
            duration: '1-2 hours',
            deliverable: 'AI project charter'
          },
          {
            day: 7,
            title: 'Data Requirements & Quality',
            activities: [
              'Understand data needs for AI projects',
              'Assess data quality and availability',
              'Plan data collection and preparation'
            ],
            duration: '1-2 hours',
            deliverable: 'Data requirements document'
          },
          {
            day: 8,
            title: 'Vendor Selection & Partnerships',
            activities: [
              'Evaluate AI vendors and solutions',
              'Understand build vs. buy decisions',
              'Negotiate AI partnerships'
            ],
            duration: '1-2 hours',
            deliverable: 'Vendor evaluation scorecard'
          },
          {
            day: 9,
            title: 'Change Management for AI',
            activities: [
              'Plan AI adoption communication strategy',
              'Address resistance and concerns',
              'Create training and support plans'
            ],
            duration: '1-2 hours',
            deliverable: 'AI change management plan'
          },
          {
            day: 10,
            title: 'AI Pilot Project Launch',
            activities: [
              'Select first AI pilot project',
              'Assemble project team',
              'Present pilot plan to stakeholders'
            ],
            duration: '2-3 hours',
            deliverable: 'AI pilot project proposal'
          }
        ]
      }
    }
  },
  {
    id: '4',
    title: 'Practical AI for Employees',
    description: 'Hands-on AI skills for everyday work productivity and collaboration',
    role: 'Employee',
    difficulty: 'Beginner',
    duration: 12,
    modules: [
      { title: 'AI Tools for Daily Work', duration: 4 },
      { title: 'Human-AI Collaboration', duration: 4 },
      { title: 'Data Skills for AI', duration: 4 }
    ],
    outcomes: [
      'Use AI tools effectively',
      'Collaborate with AI systems',
      'Improve data literacy'
    ],
    twoWeekPlan: {
      week1: {
        focus: 'AI Tools Mastery & Productivity',
        weeklyGoal: 'Master essential AI tools for daily work',
        days: [
          {
            day: 1,
            title: 'AI Writing Assistants',
            activities: [
              'Learn to use ChatGPT, Claude, or Gemini',
              'Master prompt engineering basics',
              'Practice writing emails, reports, and documents'
            ],
            duration: '1 hour',
            deliverable: 'Collection of effective prompts for your role'
          },
          {
            day: 2,
            title: 'AI for Research & Analysis',
            activities: [
              'Use AI for information gathering',
              'Summarize long documents with AI',
              'Fact-check and verify AI outputs'
            ],
            duration: '1 hour',
            deliverable: 'Research summary using AI tools'
          },
          {
            day: 3,
            title: 'AI Productivity Tools',
            activities: [
              'Explore AI calendar and task management',
              'Use AI for meeting notes and summaries',
              'Automate repetitive tasks with AI'
            ],
            duration: '1 hour',
            deliverable: 'Personal AI productivity toolkit'
          },
          {
            day: 4,
            title: 'AI for Creative Work',
            activities: [
              'Generate images with DALL-E or Midjourney',
              'Create presentations with AI assistance',
              'Design graphics and visuals'
            ],
            duration: '1 hour',
            deliverable: 'AI-assisted creative project'
          },
          {
            day: 5,
            title: 'AI Communication Tools',
            activities: [
              'Use AI for translation and localization',
              'Improve communication with AI suggestions',
              'Practice professional writing with AI'
            ],
            duration: '1 hour',
            deliverable: 'Multilingual communication samples'
          }
        ]
      },
      week2: {
        focus: 'Data Skills & Advanced Applications',
        weeklyGoal: 'Develop data literacy and advanced AI skills',
        days: [
          {
            day: 6,
            title: 'Data Basics for AI',
            activities: [
              'Understand data types and structures',
              'Learn data cleaning and preparation',
              'Practice working with spreadsheets and databases'
            ],
            duration: '1 hour',
            deliverable: 'Clean and organized dataset'
          },
          {
            day: 7,
            title: 'AI-Powered Data Analysis',
            activities: [
              'Use AI for data visualization',
              'Generate insights from data with AI',
              'Create charts and dashboards'
            ],
            duration: '1 hour',
            deliverable: 'Data analysis report with visualizations'
          },
          {
            day: 8,
            title: 'Collaborative AI Workflows',
            activities: [
              'Integrate AI into team workflows',
              'Share AI tools and best practices',
              'Collaborate on AI-enhanced projects'
            ],
            duration: '1 hour',
            deliverable: 'Team AI collaboration guide'
          },
          {
            day: 9,
            title: 'AI Ethics & Best Practices',
            activities: [
              'Understand AI limitations and biases',
              'Learn responsible AI usage',
              'Protect privacy and data security'
            ],
            duration: '1 hour',
            deliverable: 'Personal AI ethics checklist'
          },
          {
            day: 10,
            title: 'Personal AI Action Plan',
            activities: [
              'Identify AI opportunities in your role',
              'Create personal AI learning roadmap',
              'Set goals for AI skill development'
            ],
            duration: '1-2 hours',
            deliverable: '90-day personal AI development plan'
          }
        ]
      }
    }
  },
  {
    id: '5',
    title: 'Healthcare AI Transformation',
    description: 'Specialized AI applications for healthcare professionals and organizations',
    role: 'Manager',
    industry: 'Healthcare',
    difficulty: 'Intermediate',
    duration: 20,
    modules: [
      { title: 'AI in Medical Diagnostics', duration: 8 },
      { title: 'Healthcare Data Analytics', duration: 6 },
      { title: 'AI Ethics in Healthcare', duration: 6 }
    ],
    outcomes: [
      'Implement AI in clinical settings',
      'Analyze healthcare data effectively',
      'Ensure ethical AI practices'
    ],
    twoWeekPlan: {
      week1: {
        focus: 'Clinical AI Applications & Diagnostics',
        weeklyGoal: 'Understand AI applications in clinical practice',
        days: [
          {
            day: 1,
            title: 'AI in Medical Imaging',
            activities: [
              'Learn AI radiology and pathology applications',
              'Understand computer vision for diagnostics',
              'Review FDA-approved AI medical devices'
            ],
            duration: '2 hours',
            deliverable: 'AI medical imaging use case analysis'
          },
          {
            day: 2,
            title: 'Predictive Healthcare Analytics',
            activities: [
              'Explore patient risk stratification models',
              'Learn disease prediction algorithms',
              'Study early warning systems'
            ],
            duration: '2 hours',
            deliverable: 'Predictive analytics implementation plan'
          },
          {
            day: 3,
            title: 'AI-Powered Clinical Decision Support',
            activities: [
              'Evaluate clinical decision support systems',
              'Understand treatment recommendation engines',
              'Review evidence-based AI tools'
            ],
            duration: '2 hours',
            deliverable: 'CDSS evaluation framework'
          },
          {
            day: 4,
            title: 'Healthcare Data Integration',
            activities: [
              'Map EHR and health information systems',
              'Learn data interoperability standards (FHIR, HL7)',
              'Plan data integration strategy'
            ],
            duration: '2 hours',
            deliverable: 'Healthcare data integration roadmap'
          },
          {
            day: 5,
            title: 'Patient Outcomes & Quality Metrics',
            activities: [
              'Define AI-driven quality metrics',
              'Measure patient outcome improvements',
              'Create performance dashboards'
            ],
            duration: '2 hours',
            deliverable: 'AI healthcare metrics dashboard design'
          }
        ]
      },
      week2: {
        focus: 'Ethics, Compliance & Implementation',
        weeklyGoal: 'Ensure ethical and compliant AI deployment',
        days: [
          {
            day: 6,
            title: 'Healthcare AI Ethics & Bias',
            activities: [
              'Understand algorithmic bias in healthcare',
              'Learn fairness and equity principles',
              'Address health disparities with AI'
            ],
            duration: '2 hours',
            deliverable: 'Healthcare AI ethics framework'
          },
          {
            day: 7,
            title: 'HIPAA & AI Compliance',
            activities: [
              'Review HIPAA requirements for AI',
              'Ensure data privacy and security',
              'Plan compliance audits'
            ],
            duration: '2 hours',
            deliverable: 'AI compliance checklist'
          },
          {
            day: 8,
            title: 'Clinical Validation & Testing',
            activities: [
              'Design AI clinical validation studies',
              'Understand regulatory approval processes',
              'Plan pilot implementations'
            ],
            duration: '2 hours',
            deliverable: 'Clinical validation protocol'
          },
          {
            day: 9,
            title: 'Clinician Training & Adoption',
            activities: [
              'Develop clinician AI training programs',
              'Address resistance and concerns',
              'Create change management strategy'
            ],
            duration: '2 hours',
            deliverable: 'Clinician AI adoption plan'
          },
          {
            day: 10,
            title: 'Healthcare AI Strategy Presentation',
            activities: [
              'Compile comprehensive AI implementation plan',
              'Calculate ROI and patient impact',
              'Present to healthcare leadership'
            ],
            duration: '2-3 hours',
            deliverable: 'Healthcare AI transformation strategy'
          }
        ]
      }
    }
  },
  {
    id: '6',
    title: 'Financial Services AI Innovation',
    description: 'AI applications for banking, investment, and financial technology',
    role: 'Manager',
    industry: 'Finance',
    difficulty: 'Intermediate',
    duration: 18,
    modules: [
      { title: 'AI in Risk Assessment', duration: 6 },
      { title: 'Algorithmic Trading Basics', duration: 6 },
      { title: 'Fraud Detection with AI', duration: 6 }
    ],
    outcomes: [
      'Implement AI risk models',
      'Understand algorithmic trading',
      'Build fraud detection systems'
    ],
    twoWeekPlan: {
      week1: {
        focus: 'Risk Management & Credit Analytics',
        weeklyGoal: 'Master AI applications in financial risk',
        days: [
          {
            day: 1,
            title: 'AI Credit Scoring Models',
            activities: [
              'Learn ML-based credit risk assessment',
              'Understand alternative data sources',
              'Build predictive credit models'
            ],
            duration: '2 hours',
            deliverable: 'AI credit scoring framework'
          },
          {
            day: 2,
            title: 'Portfolio Risk Analytics',
            activities: [
              'Apply AI to portfolio optimization',
              'Learn risk prediction models',
              'Implement stress testing with AI'
            ],
            duration: '2 hours',
            deliverable: 'AI portfolio risk assessment model'
          },
          {
            day: 3,
            title: 'Fraud Detection Systems',
            activities: [
              'Design anomaly detection algorithms',
              'Build real-time fraud monitoring',
              'Reduce false positives with ML'
            ],
            duration: '2 hours',
            deliverable: 'Fraud detection system architecture'
          },
          {
            day: 4,
            title: 'Anti-Money Laundering (AML) AI',
            activities: [
              'Implement AI for transaction monitoring',
              'Detect suspicious patterns',
              'Automate AML compliance'
            ],
            duration: '2 hours',
            deliverable: 'AI-powered AML framework'
          },
          {
            day: 5,
            title: 'Regulatory Compliance & Reporting',
            activities: [
              'Understand AI regulatory requirements',
              'Automate compliance reporting',
              'Ensure model explainability'
            ],
            duration: '2 hours',
            deliverable: 'AI compliance and reporting plan'
          }
        ]
      },
      week2: {
        focus: 'Trading, Customer Experience & Innovation',
        weeklyGoal: 'Implement AI for trading and customer services',
        days: [
          {
            day: 6,
            title: 'Algorithmic Trading Fundamentals',
            activities: [
              'Learn quantitative trading strategies',
              'Understand market prediction models',
              'Explore high-frequency trading AI'
            ],
            duration: '2 hours',
            deliverable: 'Algorithmic trading strategy overview'
          },
          {
            day: 7,
            title: 'AI-Powered Robo-Advisors',
            activities: [
              'Design automated investment platforms',
              'Build personalized portfolio recommendations',
              'Implement rebalancing algorithms'
            ],
            duration: '2 hours',
            deliverable: 'Robo-advisor service blueprint'
          },
          {
            day: 8,
            title: 'Customer Service Automation',
            activities: [
              'Implement AI chatbots for banking',
              'Automate customer inquiries',
              'Personalize financial advice with AI'
            ],
            duration: '2 hours',
            deliverable: 'AI customer service implementation plan'
          },
          {
            day: 9,
            title: 'Predictive Analytics for Banking',
            activities: [
              'Forecast customer churn',
              'Predict loan defaults',
              'Optimize marketing campaigns with AI'
            ],
            duration: '2 hours',
            deliverable: 'Predictive banking analytics dashboard'
          },
          {
            day: 10,
            title: 'FinTech AI Strategy',
            activities: [
              'Develop comprehensive AI strategy',
              'Calculate ROI and business impact',
              'Present to financial leadership'
            ],
            duration: '2-3 hours',
            deliverable: 'Financial services AI transformation plan'
          }
        ]
      }
    }
  }
];

const mockProgress: LearningProgress[] = [
  {
    id: '1',
    pathId: '1',
    status: 'In Progress',
    completionRate: 35,
    timeSpent: 540,
    lastAccessedAt: '2024-01-15T10:30:00Z',
    path: mockLearningPaths[0]
  },
  {
    id: '2',
    pathId: '3',
    status: 'Completed',
    completionRate: 100,
    timeSpent: 960,
    lastAccessedAt: '2024-01-10T14:20:00Z',
    completedAt: '2024-01-10T14:20:00Z',
    path: mockLearningPaths[2]
  }
];

export default function LearningPathsPage() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [paths, setPaths] = useState<LearningPath[]>(mockLearningPaths);
  const [progress, setProgress] = useState<LearningProgress[]>(mockProgress);
  const [expandedPlans, setExpandedPlans] = useState<{ [key: string]: boolean }>({});

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'In Progress': return <Play className="w-4 h-4 text-blue-600" />;
      default: return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const togglePlan = (pathId: string) => {
    setExpandedPlans(prev => ({
      ...prev,
      [pathId]: !prev[pathId]
    }));
  };

  const filteredPaths = paths.filter(path => {
    const roleMatch = selectedRole === 'all' || path.role === selectedRole;
    const difficultyMatch = selectedDifficulty === 'all' || path.difficulty === selectedDifficulty;
    return roleMatch && difficultyMatch;
  });

  const enrolledPaths = progress.map(p => p.path);
  const availablePaths = filteredPaths.filter(path => 
    !enrolledPaths.find(enrolled => enrolled.id === path.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="outline" className="mb-4" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Personalized Learning Pathways
            </h1>
            <p className="text-xl text-slate-600">
              Tailored AI learning journeys based on your role and industry
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">
                {progress.filter(p => p.status === 'Completed').length}
              </div>
              <p className="text-slate-600">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {progress.filter(p => p.status === 'In Progress').length}
              </div>
              <p className="text-slate-600">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-600 mb-2">
                {Math.round(progress.reduce((acc, p) => acc + p.completionRate, 0) / progress.length)}%
              </div>
              <p className="text-slate-600">Avg Completion</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-600 mb-2">
                {formatDuration(progress.reduce((acc, p) => acc + p.timeSpent, 0))}
              </div>
              <p className="text-slate-600">Time Invested</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enrolled">My Learning Paths</TabsTrigger>
            <TabsTrigger value="available">Available Paths</TabsTrigger>
          </TabsList>

          {/* Enrolled Learning Paths */}
          <TabsContent value="enrolled" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Your Learning Journey
              </h2>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-slate-300 rounded-lg"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="CEO">CEO</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6">
              {progress.map((item) => (
                <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{item.path.title}</CardTitle>
                          <Badge className={getDifficultyColor(item.path.difficulty)}>
                            {item.path.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(item.status)}
                            <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <CardDescription className="text-base">
                          {item.path.description}
                        </CardDescription>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-2 text-slate-600 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{item.path.duration} hours</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{item.path.role}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">{item.completionRate}%</span>
                        </div>
                        <Progress value={item.completionRate} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          Time spent: {formatDuration(item.timeSpent)}
                        </div>
                        <Button size="sm">
                          {item.status === 'Completed' ? 'Review' : 'Continue Learning'}
                          <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                        </Button>
                      </div>

                      {item.path.twoWeekPlan && (
                        <div className="border-t pt-4 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full"
                            onClick={() => togglePlan(item.path.id)}
                          >
                            <Calendar className="mr-2 w-4 h-4" />
                            {expandedPlans[item.path.id] ? 'Hide' : 'View'} 2-Week Learning Plan
                            {expandedPlans[item.path.id] ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
                          </Button>

                          {expandedPlans[item.path.id] && (
                            <div className="space-y-4 mt-4 max-h-96 overflow-y-auto">
                              {/* Week 1 */}
                              <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 mb-1">Week 1: {item.path.twoWeekPlan.week1.focus}</h4>
                                <p className="text-sm text-blue-700 mb-3">{item.path.twoWeekPlan.week1.weeklyGoal}</p>
                                <div className="space-y-2">
                                  {item.path.twoWeekPlan.week1.days.map((day) => (
                                    <div key={day.day} className="bg-white rounded p-3 text-sm">
                                      <div className="font-medium text-slate-900 mb-1">Day {day.day}: {day.title}</div>
                                      <div className="text-xs text-slate-600 mb-2">
                                        <span className="font-medium">Duration:</span> {day.duration}
                                      </div>
                                      <div className="text-xs text-slate-700 mb-2">
                                        <span className="font-medium">Activities:</span>
                                        <ul className="list-disc list-inside mt-1 space-y-1">
                                          {day.activities.map((activity, idx) => (
                                            <li key={idx}>{activity}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                                        <span className="font-medium">Deliverable:</span> {day.deliverable}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Week 2 */}
                              <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-semibold text-green-900 mb-1">Week 2: {item.path.twoWeekPlan.week2.focus}</h4>
                                <p className="text-sm text-green-700 mb-3">{item.path.twoWeekPlan.week2.weeklyGoal}</p>
                                <div className="space-y-2">
                                  {item.path.twoWeekPlan.week2.days.map((day) => (
                                    <div key={day.day} className="bg-white rounded p-3 text-sm">
                                      <div className="font-medium text-slate-900 mb-1">Day {day.day}: {day.title}</div>
                                      <div className="text-xs text-slate-600 mb-2">
                                        <span className="font-medium">Duration:</span> {day.duration}
                                      </div>
                                      <div className="text-xs text-slate-700 mb-2">
                                        <span className="font-medium">Activities:</span>
                                        <ul className="list-disc list-inside mt-1 space-y-1">
                                          {day.activities.map((activity, idx) => (
                                            <li key={idx}>{activity}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                                        <span className="font-medium">Deliverable:</span> {day.deliverable}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Available Learning Paths */}
          <TabsContent value="available" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Explore Learning Paths
              </h2>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-slate-300 rounded-lg"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="CEO">CEO</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
                <select 
                  className="px-3 py-2 border border-slate-300 rounded-lg"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {availablePaths.map((path) => (
                <Card key={path.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{path.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{path.duration} hours</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-slate-700">Key Modules:</div>
                        <div className="space-y-1">
                          {path.modules.slice(0, 3).map((module, index) => (
                            <div key={index} className="text-sm text-slate-600 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {module.title}
                            </div>
                          ))}
                        </div>
                      </div>

                      {path.twoWeekPlan && (
                        <div className="border-t pt-4">
                          <Button 
                            variant="outline" 
                            className="w-full mb-3"
                            onClick={() => togglePlan(path.id)}
                          >
                            <Calendar className="mr-2 w-4 h-4" />
                            {expandedPlans[path.id] ? 'Hide' : 'View'} 2-Week Learning Plan
                            {expandedPlans[path.id] ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
                          </Button>

                          {expandedPlans[path.id] && (
                            <div className="space-y-4 mt-4 max-h-96 overflow-y-auto">
                              {/* Week 1 */}
                              <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 mb-1">Week 1: {path.twoWeekPlan.week1.focus}</h4>
                                <p className="text-sm text-blue-700 mb-3">{path.twoWeekPlan.week1.weeklyGoal}</p>
                                <div className="space-y-2">
                                  {path.twoWeekPlan.week1.days.map((day) => (
                                    <div key={day.day} className="bg-white rounded p-2 text-xs">
                                      <div className="font-medium text-slate-900">Day {day.day}: {day.title}</div>
                                      <div className="text-slate-600 mt-1">{day.duration} • {day.deliverable}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Week 2 */}
                              <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-semibold text-green-900 mb-1">Week 2: {path.twoWeekPlan.week2.focus}</h4>
                                <p className="text-sm text-green-700 mb-3">{path.twoWeekPlan.week2.weeklyGoal}</p>
                                <div className="space-y-2">
                                  {path.twoWeekPlan.week2.days.map((day) => (
                                    <div key={day.day} className="bg-white rounded p-2 text-xs">
                                      <div className="font-medium text-slate-900">Day {day.day}: {day.title}</div>
                                      <div className="text-slate-600 mt-1">{day.duration} • {day.deliverable}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <Button className="w-full">
                        <BookOpen className="mr-2 w-4 h-4" />
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}