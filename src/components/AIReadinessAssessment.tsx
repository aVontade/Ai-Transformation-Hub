'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Brain, TrendingUp, Globe, Target, Shield, Zap } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  text: string;
  options: string[];
}

interface CompanyInfo {
  industry: string;
  companyUrl: string;
  country: string;
}

const questions: Question[] = [
  {
    id: 'q1',
    category: 'Strategy & Leadership',
    text: 'Does your organization have a formal AI strategy in place?',
    options: ['No formal strategy', 'In development', 'Partially implemented', 'Fully implemented and integrated']
  },
  {
    id: 'q2',
    category: 'Strategy & Leadership',
    text: 'How would you rate your leadership\'s understanding of AI capabilities and implications?',
    options: ['Very limited understanding', 'Basic awareness', 'Good understanding', 'Expert level understanding']
  },
  {
    id: 'q3',
    category: 'Strategy & Leadership',
    text: 'Is AI transformation included in your organization\'s strategic priorities?',
    options: ['Not considered', 'Discussed occasionally', 'Part of strategic discussions', 'Core strategic priority']
  },
  {
    id: 'q4',
    category: 'Skills & Talent',
    text: 'How would you rate your current workforce\'s AI literacy?',
    options: ['Very low literacy', 'Basic awareness', 'Intermediate skills', 'Advanced AI competency']
  },
  {
    id: 'q5',
    category: 'Skills & Talent',
    text: 'Does your organization have dedicated AI talent or teams?',
    options: ['No dedicated AI talent', 'Few individuals with AI skills', 'Small AI team', 'Multiple dedicated AI teams']
  },
  {
    id: 'q6',
    category: 'Data & Infrastructure',
    text: 'How mature is your data infrastructure for AI applications?',
    options: ['No dedicated infrastructure', 'Basic data storage', 'Structured data systems', 'Advanced AI-ready infrastructure']
  },
  {
    id: 'q7',
    category: 'Data & Infrastructure',
    text: 'What is the quality and accessibility of your data for AI training?',
    options: ['Poor data quality', 'Limited data access', 'Good data quality', 'Excellent data infrastructure']
  },
  {
    id: 'q8',
    category: 'Culture & Adoption',
    text: 'How would you describe your organization\'s attitude toward AI adoption?',
    options: ['Resistant to change', 'Cautiously interested', 'Open to adoption', 'Proactively embracing AI']
  },
  {
    id: 'q9',
    category: 'Culture & Adoption',
    text: 'What is the level of employee engagement with AI initiatives?',
    options: ['Very low engagement', 'Limited engagement', 'Good engagement', 'High engagement and enthusiasm']
  },
  {
    id: 'q10',
    category: 'Culture & Adoption',
    text: 'How would you rate the collaboration between business and technical teams on AI initiatives?',
    options: ['Poor collaboration', 'Limited collaboration', 'Good collaboration', 'Excellent cross-functional collaboration']
  }
];

const categories = [
  'Strategy & Leadership',
  'Skills & Talent', 
  'Data & Infrastructure',
  'Culture & Adoption'
];

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Strategy & Leadership': <Target className="w-5 h-5" />,
  'Skills & Talent': <Globe className="w-5 h-5" />,
  'Data & Infrastructure': <Brain className="w-5 h-5" />,
  'Culture & Adoption': <Zap className="w-5 h-5" />
};

const categoryColors: { [key: string]: string } = {
  'Strategy & Leadership': 'text-blue-600 bg-blue-50 border-blue-200',
  'Skills & Talent': 'text-green-600 bg-green-50 border-green-200',
  'Data & Infrastructure': 'text-purple-600 bg-purple-50 border-purple-200',
  'Culture & Adoption': 'text-orange-600 bg-orange-50 border-orange-200'
};

export default function AIReadinessAssessment({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState<'company' | 'assessment' | 'results'>('company');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    industry: '',
    companyUrl: '',
    country: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [showReport, setShowReport] = useState(false);
  const [showBookingCard, setShowBookingCard] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    preferredDate: '',
    consultationType: 'strategy'
  });

  const allQuestions = questions;

  const handleCompanyInfoSubmit = () => {
    if (companyInfo.industry && companyInfo.companyUrl && companyInfo.country) {
      setCurrentStep('assessment');
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = (category: string): number => {
    const categoryQuestions = allQuestions.filter(q => q.category === category);
    const categoryAnswers = categoryQuestions.map(q => answers[q.id]);
    
    if (categoryAnswers.length === 0) return 0;
    
    const totalScore = categoryAnswers.reduce((sum, answer) => {
      const score = answer === 'No formal strategy' || answer === 'Very limited understanding' || answer === 'Not considered' ? 0 :
                   answer === 'In development' || answer === 'Basic awareness' || answer === 'Discussed occasionally' ? 25 :
                   answer === 'Partially implemented' || answer === 'Good understanding' || answer === 'Part of strategic discussions' ? 50 :
                   answer === 'Fully implemented and integrated' || answer === 'Expert level understanding' || answer === 'Core strategic priority' ? 75 :
                   answer === 'No dedicated AI talent' || answer === 'Very low literacy' || answer === 'Poor data quality' || answer === 'Resistant to change' ? 0 :
                   answer === 'Few individuals with AI skills' || answer === 'Basic awareness' || answer === 'Limited data access' || answer === 'Cautiously interested' ? 25 :
                   answer === 'Small AI team' || answer === 'Intermediate skills' || answer === 'Good data quality' || answer === 'Open to adoption' ? 50 :
                   answer === 'Multiple dedicated AI teams' || answer === 'Advanced AI competency' || answer === 'Excellent data infrastructure' || answer === 'Proactively embracing AI' ? 75 :
                   answer === 'Very low engagement' || answer === 'Poor collaboration' ? 0 :
                   answer === 'Limited engagement' || answer === 'Limited collaboration' ? 25 :
                   answer === 'Good engagement' || answer === 'Good collaboration' ? 50 :
                   answer === 'High engagement and enthusiasm' || answer === 'Excellent cross-functional collaboration' ? 75 : 100;
      return sum + score;
    }, 0);
    
    return Math.round(totalScore / categoryQuestions.length);
  };

  const calculateOverallScore = (): number => {
    const categoryScores = categories.map(cat => calculateScore(cat));
    return Math.round(categoryScores.reduce((sum, score) => sum + score, 0) / categories.length);
  };

  const getReadinessLevel = (score: number): { level: string; color: string; description: string } => {
    if (score >= 75) return {
      level: 'AI Leader',
      color: 'text-green-600 bg-green-50 border-green-200',
      description: 'Your organization is well-positioned for AI transformation with strong foundations and clear strategy.'
    };
    if (score >= 50) return {
      level: 'AI Ready',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Your organization has good AI readiness with room for improvement in specific areas.'
    };
    if (score >= 25) return {
      level: 'AI Emerging',
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      description: 'Your organization is beginning its AI journey and needs focused development.'
    };
    return {
      level: 'AI Novice',
      color: 'text-red-600 bg-red-50 border-red-200',
      description: 'Your organization needs significant investment in AI capabilities and strategy.'
    };
  };

  const calculateResults = async () => {
    setIsSubmitting(true);
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowResults(true);
    setIsSubmitting(false);
  };

  const handleDownloadReport = () => {
    // Create a formatted text report
    const reportContent = `
AI TRANSFORMATION COMPETITIVE INTELLIGENCE REPORT
================================================

COMPANY INFORMATION
-----------------
Industry: ${companyInfo?.industry || 'N/A'}
Country: ${companyInfo?.country || 'N/A'}
Website: ${companyInfo?.companyUrl || 'N/A'}
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
------------------
Overall AI Readiness Score: ${calculateOverallScore()}%
Risk Level: ${calculateOverallScore() >= 75 ? 'Low' : calculateOverallScore() >= 50 ? 'Medium' : 'High'}

Market Size: ${reportData?.executiveSummary?.marketSize || '$500B by 2025'}
Growth Projection: ${reportData?.executiveSummary?.growthProjection || '35% CAGR through 2030'}
Global Trends: ${reportData?.executiveSummary?.globalTrends || 'Global AI adoption accelerating across all industries'}

COMPETITIVE LANDSCAPE ANALYSIS
------------------------------
${reportData?.competitorAnalysis?.map((competitor: any, index: number) => `
Competitor ${index + 1}: ${competitor.name}
Region: ${competitor.region}
AI Maturity: ${competitor.aiMaturity} (${competitor.aiMaturityScore}%)
Threat Level: ${competitor.threatLevel}
Key Initiatives: ${competitor.initiatives?.join(', ')}
`).join('')}

TOP AI ADOPTERS IN ${companyInfo?.industry?.toUpperCase() || 'INDUSTRY'}
---------------------------------------------------
${reportData?.industryLeaders?.map((leader: any, index: number) => `
${index + 1}. ${leader.name}
   AI Investment: ${leader.aiInvestment}
   ROI Increase: ${leader.roiIncrease}
   Efficiency Gain: ${leader.efficiencyGain}
   Market Cap Impact: ${leader.marketCapImpact}
   Key Initiatives: ${leader.initiatives?.join(', ')}
`).join('')}

MARKET OPPORTUNITIES
--------------------
${reportData?.opportunities?.map((opportunity: any, index: number) => `
${index + 1}. ${opportunity.title}
   Description: ${opportunity.description}
   Impact: ${opportunity.impact}
   Timeline: ${opportunity.timeline}
   Required Investment: ${opportunity.investment}
`).join('')}

STRATEGIC RECOMMENDATIONS
-------------------------
${reportData?.recommendations?.map((rec: any, index: number) => `
${index + 1}. ${rec.title}
   Description: ${rec.description}
   Priority: ${rec.priority}
   Expected ROI: ${rec.expectedRoi}
   Implementation Timeline: ${rec.timeline}
`).join('')}

NEXT STEPS
-----------
1. Schedule executive strategy session
2. Allocate budget for AI initiatives
3. Form cross-functional AI task force
4. Begin pilot projects in high-impact areas
5. Establish AI governance framework

For detailed implementation guidance, contact our AI transformation consultants.
`;

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Competitive-Intelligence-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleBookingSubmit = async () => {
    console.log("Booking appointment submitted");
    
    if (!bookingData.name || !bookingData.email || !bookingData.preferredDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/consultation-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          company: companyInfo.industry,
          industry: companyInfo.industry,
          consultationType: bookingData.consultationType,
          preferredDate: bookingData.preferredDate,
          preferredTime: "Not specified",
          timezone: "Not specified",
          message: "Booking from AI Readiness Assessment results",
          assessmentScore: calculateOverallScore(),
          reportGenerated: true,
          companyUrl: companyInfo.companyUrl
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Consultation request created:", result);
        setShowBookingCard(false);
        
        // Show success message
        alert(`Consultation request submitted successfully! We'll contact you at ${bookingData.email} to confirm your appointment.`);
        
        // Reset form
        setBookingData({
          name: '',
          email: '',
          preferredDate: '',
          consultationType: 'strategy'
        });
      } else {
        alert("Failed to submit consultation request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const generateDetailedReport = async () => {
    console.log("=== generateDetailedReport called ===");
    console.log("Current isGeneratingReport state:", isGeneratingReport);
    setIsGeneratingReport(true);
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyInfo,
          assessmentAnswers: answers,
          overallScore: calculateOverallScore(),
          categoryScores: {
            "Strategy & Leadership": calculateScore("Strategy & Leadership"),
            "Skills & Talent": calculateScore("Skills & Talent"),
            "Data & Infrastructure": calculateScore("Data & Infrastructure"),
            "Culture & Adoption": calculateScore("Culture & Adoption")
          }
        }),
      });
      
      if (response.ok) {
        const reportData = await response.json();
        console.log("Report generated and saved successfully");
        setReportData(reportData);
        setShowReport(true);
        
        console.log("Setting isGeneratingReport to false");
        setIsGeneratingReport(false);
        
        // Add fallback mechanism in case state gets stuck
        setTimeout(() => {
          if (isGeneratingReport) {
            console.log("Fallback: Forcefully setting isGeneratingReport to false");
            setIsGeneratingReport(false);
          }
        }, 5000);
      } else {
        console.error("Failed to generate report");
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      console.log("Setting isGeneratingReport to false");
      setIsGeneratingReport(false);
    }
  };

  const getRecommendations = (category: string, score: number): string[] => {
    const recommendations: { [key: string]: { [key: string]: string[] } } = {
      'Strategy & Leadership': {
        low: [
          'Develop a formal AI strategy aligned with business objectives',
          'Educate leadership team on AI capabilities and implications',
          'Establish AI governance framework and ethical guidelines',
          'Allocate dedicated budget for AI initiatives'
        ],
        medium: [
          'Refine AI strategy with specific implementation roadmap',
          'Create cross-functional AI steering committee',
          'Develop AI investment portfolio with clear ROI metrics',
          'Establish partnerships with AI vendors and experts'
        ],
        high: [
          'Scale successful AI pilots across the organization',
          'Establish AI innovation lab for continuous experimentation',
          'Develop AI-powered business model innovations',
          'Create thought leadership in AI industry'
        ]
      },
      'Skills & Talent': {
        low: [
          'Assess current workforce AI skills and identify gaps',
          'Implement basic AI literacy training for all employees',
          'Hire AI specialists or consultants to kickstart initiatives',
          'Create AI career development paths'
        ],
        medium: [
          'Develop role-specific AI training programs',
          'Establish AI talent recruitment and retention strategy',
          'Create internal AI communities of practice',
          'Implement AI certification programs'
        ],
        high: [
          'Build AI Center of Excellence',
          'Develop advanced AI upskilling programs',
          'Create AI mentorship and knowledge sharing programs',
          'Establish partnerships with academic institutions'
        ]
      },
      'Data & Infrastructure': {
        low: [
          'Assess current data infrastructure and identify gaps',
          'Implement basic data governance and quality frameworks',
          'Migrate to cloud platforms for AI scalability',
          'Establish basic cybersecurity measures for AI systems'
        ],
        medium: [
          'Develop enterprise-wide data architecture for AI',
          'Implement advanced data analytics and visualization tools',
          'Build AI-ready infrastructure with MLOps capabilities',
          'Establish comprehensive AI security and privacy framework'
        ],
        high: [
          'Implement real-time data processing and analytics',
          'Develop edge AI capabilities for IoT applications',
          'Build advanced AI model management and deployment systems',
          'Create AI-powered data insights and automation'
        ]
      },
      'Culture & Adoption': {
        low: [
          'Communicate AI vision and benefits across organization',
          'Address employee concerns about AI impact on jobs',
          'Create AI success stories and share early wins',
          'Establish change management process for AI transformation'
        ],
        medium: [
          'Develop AI innovation programs and hackathons',
          'Create cross-functional AI collaboration teams',
          'Implement AI experimentation sandboxes',
          'Establish AI recognition and reward programs'
        ],
        high: [
          'Build culture of continuous AI innovation',
          'Establish AI-powered decision-making processes',
          'Create AI ethics and responsible AI practices',
          'Develop industry partnerships for AI collaboration'
        ]
      }
    };

    const level = score < 33 ? 'low' : score < 66 ? 'medium' : 'high';
    return recommendations[category]?.[level] || [];
  };

  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const currentQuestionData = allQuestions[currentQuestion];

  if (currentStep === 'company') {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" onClick={onBack} className="text-white hover:text-blue-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>

            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  AI Readiness Assessment
                </CardTitle>
                <CardDescription className="text-lg text-slate-300">
                  Get your competitive intelligence report with industry benchmarking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-sm font-medium text-slate-300">
                      Industry *
                    </Label>
                    <select
                      id="industry"
                      value={companyInfo.industry}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full h-11 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" className="text-slate-400">Select your industry</option>
                      <optgroup label="Enterprise">
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance & Banking</option>
                        <option value="technology">Technology</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="retail">Retail & E-commerce</option>
                        <option value="education">Education</option>
                        <option value="government">Government</option>
                        <option value="energy">Energy & Utilities</option>
                        <option value="transportation">Transportation & Logistics</option>
                      </optgroup>
                      <optgroup label="SMME (Small, Medium & Micro Enterprises)">
                        <option value="smme-healthcare">SMME - Healthcare</option>
                        <option value="smme-finance">SMME - Finance & Banking</option>
                        <option value="smme-technology">SMME - Technology</option>
                        <option value="smme-manufacturing">SMME - Manufacturing</option>
                        <option value="smme-retail">SMME - Retail & E-commerce</option>
                        <option value="smme-education">SMME - Education</option>
                        <option value="smme-professional-services">SMME - Professional Services</option>
                        <option value="smme-hospitality">SMME - Hospitality & Tourism</option>
                        <option value="smme-construction">SMME - Construction</option>
                        <option value="smme-agriculture">SMME - Agriculture</option>
                      </optgroup>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium text-slate-300">
                      Country *
                    </Label>
                    <select
                      id="country"
                      value={companyInfo.country}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full h-11 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" className="text-slate-400">Select your country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                      <option value="Italy">Italy</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Norway">Norway</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Finland">Finland</option>
                      <option value="Australia">Australia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Argentina">Argentina</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="company-url" className="text-sm font-medium text-slate-300">
                      Company Website URL *
                    </Label>
                    <Input
                      id="company-url"
                      placeholder="https://yourcompany.com"
                      value={companyInfo.companyUrl}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, companyUrl: e.target.value }))}
                      className="h-11 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                </div>
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-300 mb-2">What happens next?</h3>
                  <ul className="space-y-1 text-sm text-blue-200">
                    <li>• 10-question AI readiness assessment</li>
                    <li>• Regional market analysis for your country</li>
                    <li>• Competitive intelligence analysis with local competitors</li>
                    <li>• Country-specific market size and growth projections</li>
                    <li>• Personalized transformation roadmap</li>
                    <li>• Implementation recommendations with ROI projections</li>
                  </ul>
                </div>
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={handleCompanyInfoSubmit}
                    disabled={!companyInfo.industry || !companyInfo.companyUrl || !companyInfo.country}
                    className="px-8 py-3 text-base font-medium h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const overallScore = calculateOverallScore();
    const readiness = getReadinessLevel(overallScore);

    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <Button variant="ghost" onClick={() => setCurrentStep('company')} className="text-white hover:text-blue-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="text-sm text-slate-300">
                Assessment completed for {companyInfo.industry} industry in {companyInfo.country}
              </div>
            </div>

            <div className="space-y-6">
              {/* Overall Score Card */}
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold text-white mb-2">
                    Your AI Readiness Score
                  </CardTitle>
                  <div className="flex justify-center items-center gap-4">
                    <div className="text-6xl font-bold text-blue-400">{overallScore}%</div>
                    <div className={`px-4 py-2 rounded-full border ${readiness.color}`}>
                      <span className="font-semibold">{readiness.level}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
                    {readiness.description}
                  </p>
                </CardHeader>
              </Card>

              {/* Category Scores */}
              <div className="grid md:grid-cols-2 gap-6">
                {categories.map(category => {
                  const score = calculateScore(category);
                  const recommendations = getRecommendations(category, score);
                  
                  return (
                    <Card key={category} className="bg-slate-800 border-slate-700 text-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-white">
                          <div className={`p-2 rounded-lg border ${categoryColors[category]}`}>
                            {categoryIcons[category]}
                          </div>
                          {category}
                        </CardTitle>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-300">Score</span>
                            <span className="text-2xl font-bold text-white">{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="font-medium text-slate-300">Key Recommendations:</h4>
                          <ul className="space-y-2">
                            {recommendations.slice(0, 3).map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                                <div className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0">✓</div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Detailed Report Section */}
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Competitive Intelligence Report</CardTitle>
                  <CardDescription className="text-slate-300">
                    Get comprehensive industry analysis, competitor insights, and strategic recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showReport ? (
                    <div className="text-center">
                      <Button 
                        onClick={generateDetailedReport}
                        disabled={isGeneratingReport}
                        className="px-8 py-3 text-base font-medium h-12 bg-blue-600 hover:bg-blue-700"
                      >
                        {isGeneratingReport ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Generating Competitive Intelligence...
                          </>
                        ) : (
                          <>
                            Generate Competitive Intelligence Report
                            <TrendingUp className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      {isGeneratingReport && (
                        <p className="text-sm text-slate-300 mt-2">
                          Analyzing industry trends and competitive landscape... This may take a few moments.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-green-900/50 border border-green-700 rounded-lg p-4">
                        <h3 className="font-semibold text-green-300 mb-2">
                          Competitive Intelligence Report Generated!
                        </h3>
                        <p className="text-green-200 mb-3">
                          Your comprehensive competitive intelligence report for the {companyInfo.industry} industry in {companyInfo.country} is ready. 
                          Analysis includes {reportData.competitorAnalysis?.length || 2} key competitors in {companyInfo.country}, 
                          {reportData.opportunities?.length || 3} market opportunities, and 
                          {reportData.recommendations?.length || 3} strategic recommendations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                          <div className="bg-green-800/30 p-3 rounded">
                            <div className="text-lg font-bold text-green-300">
                              {reportData.executiveSummary?.regionalMarketSize || reportData.executiveSummary?.marketSize || '$500B by 2025'}
                            </div>
                            <p className="text-xs text-green-200">{companyInfo.country} Market Size</p>
                          </div>
                          <div className="bg-green-800/30 p-3 rounded">
                            <div className="text-lg font-bold text-green-300">
                              {reportData.executiveSummary?.regionalGrowthRate || reportData.executiveSummary?.growthProjection || '35% CAGR'}
                            </div>
                            <p className="text-xs text-green-200">Regional Growth Rate</p>
                          </div>
                          <div className="bg-green-800/30 p-3 rounded">
                            <div className="text-lg font-bold text-green-300">
                              {reportData.competitorAnalysis?.filter((c: any) => c.threatLevel === 'High').length || 1} High
                            </div>
                            <p className="text-xs text-green-200">Threat Competitors in {companyInfo.country}</p>
                          </div>
                        </div>
                      </div>
                      
                      {reportData && (
                        <div className="space-y-6">
                          {/* Executive Summary */}
                          <div className="bg-slate-700 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                              <Globe className="w-5 h-5 text-blue-400" />
                              Executive Summary
                            </h3>
                            <div className="grid md:grid-cols-4 gap-4 mb-4">
                              <div className="bg-blue-900/30 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-blue-400 mb-1">
                                  {reportData.executiveSummary?.regionalMarketSize || reportData.executiveSummary?.marketSize || '$500B by 2025'}
                                </div>
                                <p className="text-sm text-slate-300">{companyInfo.country} Market Size</p>
                              </div>
                              <div className="bg-green-900/30 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-green-400 mb-1">
                                  {reportData.executiveSummary?.regionalGrowthRate || reportData.executiveSummary?.growthProjection || '35% CAGR'}
                                </div>
                                <p className="text-sm text-slate-300">Regional Growth Rate</p>
                              </div>
                              <div className="bg-purple-900/30 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-purple-400 mb-1">
                                  {reportData.overallScore || overallScore}%
                                </div>
                                <p className="text-sm text-slate-300">Your AI Readiness</p>
                              </div>
                              <div className="bg-orange-900/30 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-orange-400 mb-1">
                                  {reportData.competitorAnalysis?.length || 2}
                                </div>
                                <p className="text-sm text-slate-300">Competitors in {companyInfo.country}</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="text-slate-300">
                                <h4 className="font-medium text-white mb-2">Regional Market Analysis ({companyInfo.country}):</h4>
                                <p className="text-sm leading-relaxed">
                                  {reportData.executiveSummary?.globalTrends || `The ${companyInfo.industry} sector in ${companyInfo.country} is experiencing rapid AI transformation.`}
                                  {' '}Market opportunity: {reportData.executiveSummary?.regionalMarketSize || reportData.executiveSummary?.marketSize || '$500B by 2027'}.
                                  {' '}Your organization's AI readiness score of {reportData.overallScore || overallScore}% 
                                  {overallScore >= 75 ? ' positions you as an AI leader' : 
                                   overallScore >= 50 ? ' indicates strong potential for growth' : 
                                   ' suggests immediate action is required'} to remain competitive in the {companyInfo.country} market.
                                </p>
                              </div>
                              <div className="text-slate-300">
                                <h4 className="font-medium text-white mb-2">Competitive Position:</h4>
                                <p className="text-sm leading-relaxed">
                                  {reportData.competitorAnalysis?.filter((c: any) => c.threatLevel === 'High').length || 1} high-threat competitors 
                                  are actively investing in AI initiatives. 
                                  {overallScore >= 70 ? ' Your strong AI capabilities provide competitive advantage.' :
                                   overallScore >= 50 ? ' Accelerating AI adoption will help you gain market share.' :
                                   ' Urgent investment in AI capabilities is needed to avoid market displacement.'}
                                </p>
                              </div>
                              <div className="text-slate-300">
                                <h4 className="font-medium text-white mb-2">Strategic Imperative:</h4>
                                <p className="text-sm leading-relaxed">
                                  {reportData.executiveSummary?.urgency || 'AI adoption is critical for maintaining competitive advantage in your industry.'}
                                  {' '}Organizations that act now can capture {reportData.executiveSummary?.growthProjection || '35% annual growth'} opportunities,
                                  while delayed adoption risks permanent competitive disadvantage.
                                </p>
                                <p className="text-xs text-slate-400 mt-2">
                                  📚 See detailed sources and references in the full report below
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Industry Leaders Analysis */}
                          <div className="bg-slate-700 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-green-400" />
                              Top AI Adopters in {companyInfo.industry} Industry ({companyInfo.country})
                            </h3>
                            <div className="space-y-4">
                              {reportData.industryLeaders?.map((leader: any, index: number) => (
                                <div key={index} className="border border-slate-600 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold text-lg text-white">{leader.name}</h4>
                                        <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded">
                                          #{index + 1} Industry Leader
                                        </span>
                                      </div>
                                      <div className="grid md:grid-cols-3 gap-4 mb-3">
                                        <div className="bg-slate-600/50 p-3 rounded">
                                          <div className="text-lg font-bold text-blue-400">
                                            {leader.aiInvestment || '$2.5B'}
                                          </div>
                                          <p className="text-xs text-slate-300">AI Investment</p>
                                        </div>
                                        <div className="bg-slate-600/50 p-3 rounded">
                                          <div className="text-lg font-bold text-green-400">
                                            {leader.roiIncrease || '42%'}
                                          </div>
                                          <p className="text-xs text-slate-300">ROI Increase</p>
                                        </div>
                                        <div className="bg-slate-600/50 p-3 rounded">
                                          <div className="text-lg font-bold text-purple-400">
                                            {leader.efficiencyGain || '35%'}
                                          </div>
                                          <p className="text-xs text-slate-300">Efficiency Gain</p>
                                        </div>
                                      </div>
                                      <div className="text-slate-300 text-sm">
                                        <h5 className="font-medium text-white mb-1">Key AI Initiatives:</h5>
                                        <div className="flex flex-wrap gap-2">
                                          {leader.initiatives?.map((initiative: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded">
                                              {initiative}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right ml-4">
                                      <div className="text-sm text-slate-400 mb-1">Market Cap Impact</div>
                                      <div className="text-2xl font-bold text-green-400">
                                        +{leader.marketCapImpact || '28%'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Competitor Analysis */}
                          <div className="bg-slate-700 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                              <Target className="w-5 h-5 text-orange-400" />
                              {companyInfo.country} Competitive Landscape Analysis
                            </h3>
                            <div className="space-y-4">
                              {reportData.competitorAnalysis?.map((competitor: any, index: number) => (
                                <div key={index} className="border border-slate-600 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold text-lg text-white">{competitor.name}</h4>
                                        <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded">
                                          {competitor.region}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded ${
                                          competitor.aiMaturityScore >= 80 ? 'bg-green-900/50 text-green-300' :
                                          competitor.aiMaturityScore >= 60 ? 'bg-yellow-900/50 text-yellow-300' :
                                          'bg-red-900/50 text-red-300'
                                        }`}>
                                          AI Maturity: {competitor.aiMaturity}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-2 mb-3">
                                        {competitor.initiatives?.map((initiative: string, i: number) => (
                                          <span key={i} className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded">
                                            {initiative}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="text-right ml-4">
                                      <div className="text-sm text-slate-400 mb-1">Threat Level</div>
                                      <span className={`px-3 py-1 text-sm rounded ${
                                        competitor.threatLevel === 'High' ? 'bg-red-900/50 text-red-300' :
                                        competitor.threatLevel === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' :
                                        'bg-green-900/50 text-green-300'
                                      }`}>
                                        {competitor.threatLevel}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Opportunities */}
                          <div className="bg-slate-700 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-green-400" />
                              Market Opportunities
                            </h3>
                            <div className="space-y-3">
                              {reportData.opportunities?.map((opportunity: any, index: number) => (
                                <div key={index} className="border border-slate-600 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-white">{opportunity.title}</h4>
                                    <span className={`px-2 py-1 text-xs rounded ${
                                      opportunity.impact === 'High' ? 'bg-green-900/50 text-green-300' :
                                      opportunity.impact === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' :
                                      'bg-slate-600 text-slate-300'
                                    }`}>
                                      {opportunity.impact} Impact
                                    </span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-2">{opportunity.description}</p>
                                  <div className="flex gap-4 text-xs text-slate-400">
                                    <span>Timeline: {opportunity.timeline}</span>
                                    <span>Investment: {opportunity.investment}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Strategic Recommendations */}
                          <div className="bg-slate-700 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                              <Shield className="w-5 h-5 text-purple-400" />
                              Strategic Recommendations
                            </h3>
                            <div className="space-y-3">
                              {reportData.recommendations?.map((rec: any, index: number) => (
                                <div key={index} className="border border-slate-600 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-white">{rec.title}</h4>
                                    <span className={`px-2 py-1 text-xs rounded ${
                                      rec.priority === 'High' ? 'bg-red-900/50 text-red-300' :
                                      rec.priority === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' :
                                      'bg-green-900/50 text-green-300'
                                    }`}>
                                      {rec.priority} Priority
                                    </span>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-2">{rec.description}</p>
                                  <div className="flex gap-4 text-xs text-slate-400">
                                    <span>Expected ROI: {rec.expectedRoi}</span>
                                    <span>Timeline: {rec.timeline}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Download Button */}
                          <div className="flex justify-center pt-4">
                            <Button 
                              onClick={handleDownloadReport}
                              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 flex items-center gap-2 mr-3"
                            >
                              <ArrowRight className="w-4 h-4" />
                              Download Full Report
                            </Button>
                            <Button 
                              onClick={() => setShowBookingCard(true)}
                              className="px-8 py-3 bg-green-600 hover:bg-green-700 flex items-center gap-2"
                            >
                              <Target className="w-4 h-4" />
                              Book Consultation
                            </Button>
                          </div>

                          {/* Booking Appointment Card */}
                          {showBookingCard && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                              <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-md w-full">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="text-xl font-semibold text-white">Book AI Consultation</h3>
                                  <Button 
                                    variant="ghost" 
                                    onClick={() => setShowBookingCard(false)}
                                    className="text-slate-400 hover:text-white"
                                  >
                                    ×
                                  </Button>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-sm font-medium text-slate-300">Your Name</Label>
                                    <Input 
                                      placeholder="Enter your full name"
                                      value={bookingData.name}
                                      onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                                      className="bg-slate-700 border-slate-600 text-white"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-slate-300">Email</Label>
                                    <Input 
                                      type="email"
                                      placeholder="your.email@company.com"
                                      value={bookingData.email}
                                      onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                                      className="bg-slate-700 border-slate-600 text-white"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-slate-300">Preferred Date</Label>
                                    <Input 
                                      type="date"
                                      value={bookingData.preferredDate}
                                      onChange={(e) => setBookingData(prev => ({ ...prev, preferredDate: e.target.value }))}
                                      className="bg-slate-700 border-slate-600 text-white"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-slate-300">Consultation Type</Label>
                                    <select 
                                      value={bookingData.consultationType}
                                      onChange={(e) => setBookingData(prev => ({ ...prev, consultationType: e.target.value }))}
                                      className="w-full h-10 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                                    >
                                      <option value="strategy">AI Strategy Session</option>
                                      <option value="implementation">Implementation Planning</option>
                                      <option value="roi">ROI Analysis</option>
                                      <option value="team">Team Training</option>
                                    </select>
                                  </div>
                                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                                    <h4 className="font-medium text-blue-300 mb-2">What to Expect:</h4>
                                    <ul className="text-sm text-blue-200 space-y-1">
                                      <li>• 45-minute personalized consultation</li>
                                      <li>• Review of your competitive intelligence report</li>
                                      <li>• Custom AI transformation roadmap</li>
                                      <li>• Implementation timeline and budget planning</li>
                                    </ul>
                                  </div>
                                  <div className="flex gap-3">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => setShowBookingCard(false)}
                                      className="flex-1 border-slate-600 text-white"
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      onClick={handleBookingSubmit}
                                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    >
                                      Book Appointment
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setCurrentStep('company')} className="text-white hover:text-blue-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          {/* Progress Bar */}
          <Card className="mb-6 bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-slate-300">
                    Question {currentQuestion + 1} of {allQuestions.length}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full border text-sm font-medium ${categoryColors[currentQuestionData.category]}`}>
                  {categoryIcons[currentQuestionData.category]}
                  <span className="ml-1">{currentQuestionData.category}</span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>{Math.round(progress)}% Complete</span>
                <span>{allQuestions.length - currentQuestion - 1} questions remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-white leading-relaxed">
                {currentQuestionData.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={answers[currentQuestionData.id] || ''}
                onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
                className="space-y-3"
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-slate-300">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border-slate-600 text-white hover:bg-slate-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestionData.id] || isSubmitting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                'Calculating Results...'
              ) : currentQuestion === allQuestions.length - 1 ? (
                'View Results'
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}