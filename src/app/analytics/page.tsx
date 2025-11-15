'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Users, BarChart3, Clock, Target, Brain, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AnalyticsData {
  totalAssessments: number;
  averageScore: number;
  completionRate: number;
  timeToComplete: number;
  industryBreakdown: { [key: string]: number };
  scoreDistribution: { [key: string]: number };
  monthlyTrends: { month: string; assessments: number; avgScore: number }[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalAssessments: 1247,
    averageScore: 67.3,
    completionRate: 78.5,
    timeToComplete: 12.5,
    industryBreakdown: {
      'Technology': 423,
      'Healthcare': 312,
      'Finance': 267,
      'Manufacturing': 189,
      'Retail': 156
    },
    scoreDistribution: {
      'AI Leader (75%+)': 234,
      'AI Ready (50-74%)': 567,
      'AI Emerging (25-49%)': 312,
      'AI Novice (<25%)': 134
    },
    monthlyTrends: [
      { month: 'Jan', assessments: 145, avgScore: 68.2 },
      { month: 'Feb', assessments: 167, avgScore: 69.1 },
      { month: 'Mar', assessments: 189, avgScore: 71.3 },
      { month: 'Apr', assessments: 156, avgScore: 66.8 },
      { month: 'May', assessments: 198, avgScore: 70.5 },
      { month: 'Jun', assessments: 212, avgScore: 67.9 }
    ]
  });

  const handleBack = () => {
    router.push('/');
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" onClick={handleBack} className="text-white hover:text-blue-400 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Analytics
            </h1>
            <p className="text-xl text-white">
              Track AI transformation progress and insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-600 text-white">
              <TrendingUp className="mr-2 w-4 h-4" />
              Export Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="mr-2 w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-blue-600 font-medium">+12% this month</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {analyticsData.totalAssessments}
              </div>
              <p className="text-sm text-white">Total Assessments</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-green-600 font-medium">+5.2% increase</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {analyticsData.averageScore}%
              </div>
              <p className="text-sm text-white">Average Score</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-purple-600 font-medium">Above target</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {analyticsData.completionRate}%
              </div>
              <p className="text-sm text-white">Completion Rate</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-orange-600 font-medium">-8% faster</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {analyticsData.timeToComplete}m
              </div>
              <p className="text-sm text-white">Avg. Time to Complete</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Industry Breakdown */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Assessments by Industry
              </CardTitle>
              <CardDescription>
                Distribution across key sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analyticsData.industryBreakdown).map(([industry, count]) => (
                  <div key={industry} className="flex items-center justify-between">
                    <span className="text-sm text-white">{industry}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${(count / Math.max(...Object.values(analyticsData.industryBreakdown))) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-white ml-2">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Score Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Score Distribution
              </CardTitle>
              <CardDescription>
                AI readiness levels across all assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analyticsData.scoreDistribution).map(([level, count]) => (
                  <div key={level} className="flex items-center justify-between">
                    <span className="text-sm text-white">{level}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full`} 
                          style={{ 
                            width: `${(count / Object.values(analyticsData.scoreDistribution).reduce((a, b) => a + b, 0)) * 100}%`,
                            backgroundColor: level.includes('Leader') ? '#10b981' : 
                                           level.includes('Ready') ? '#3b82f6' : 
                                           level.includes('Emerging') ? '#eab308' : '#ef4444'
                          }}
                        />
                      </div>
                      <span className="text-sm text-white ml-2">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Assessment Trends
            </CardTitle>
            <CardDescription>
              Assessment volume and average scores over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.monthlyTrends.map((trend, index) => (
                <div key={trend.month} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white w-16">{trend.month}</span>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-400">Assessments:</div>
                      <span className="text-sm text-white">{trend.assessments}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-slate-400">Avg Score:</div>
                    <span className={`text-sm font-medium ${getScoreColor(trend.avgScore)}`}>
                      {trend.avgScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}