'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Brain,
  Zap,
  Award,
  Clock,
  CheckCircle,
  Play,
  ArrowRight,
  Shield,
  DollarSign,
  Activity,
  Calendar,
  BookOpen,
  Eye,
  Settings
} from 'lucide-react';

interface DashboardStats {
  overallReadiness: number;
  completedPaths: number;
  inProgressPaths: number;
  totalHoursLearned: number;
  roiImprovement: number;
  skillGrowth: number;
  teamReadiness: number;
  productivityGain: number;
}

interface RecentActivity {
  id: string;
  type: 'assessment' | 'learning' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
}

const mockStats: DashboardStats = {
  overallReadiness: 68,
  completedPaths: 3,
  inProgressPaths: 2,
  totalHoursLearned: 47,
  roiImprovement: 23,
  skillGrowth: 45,
  teamReadiness: 72,
  productivityGain: 18
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'assessment',
    title: 'AI Readiness Assessment Completed',
    description: 'Achieved 68% overall readiness score',
    timestamp: '2 hours ago',
    icon: Target
  },
  {
    id: '2',
    type: 'learning',
    title: 'Module Completed: AI-Powered Customer Intelligence',
    description: 'CEO Strategic AI Leadership path',
    timestamp: '1 day ago',
    icon: Brain
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement Unlocked: AI Fundamentals',
    description: 'Completed first learning pathway',
    timestamp: '3 days ago',
    icon: Award
  },
  {
    id: '4',
    type: 'learning',
    title: 'Started: AI-Driven Revenue Generation',
    description: 'New CEO-focused learning path',
    timestamp: '1 week ago',
    icon: Play
  }
];

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps = {}) {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(mockRecentActivity);

  const handleViewReports = () => {
    console.log("View Reports clicked");
    // Navigate to reports page or show reports modal
    router.push('/reports');
  };

  const handleNewAssessment = () => {
    console.log("New Assessment clicked");
    if (onNavigate) {
      onNavigate('assessment');
    } else {
      window.location.href = '/';
    }
  };

  const handleQuickAction = (action: string) => {
    console.log(`${action} clicked`);
    switch (action) {
      case 'assessment':
        if (onNavigate) {
          onNavigate('assessment');
        } else {
          window.location.href = '/';
        }
        break;
      case 'learning':
        if (onNavigate) {
          onNavigate('learning');
        } else {
          window.location.href = '/';
        }
        break;
      case 'analytics':
        router.push('/analytics');
        break;
      case 'invite':
        router.push('/team');
        break;
      case 'goals':
        router.push('/goals');
        break;
      default:
        break;
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getReadinessLabel = (score: number) => {
    if (score >= 75) return 'AI Ready';
    if (score >= 50) return 'Developing';
    return 'Basic';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment': return Target;
      case 'learning': return Brain;
      case 'achievement': return Award;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assessment': return 'bg-blue-100 text-blue-600';
      case 'learning': return 'bg-green-100 text-green-600';
      case 'achievement': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              AI Transformation Dashboard
            </h1>
            <p className="text-xl text-white">
              Track your AI transformation progress and impact
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleViewReports}>
              <BarChart3 className="mr-2 w-4 h-4" />
              View Reports
            </Button>
            <Button onClick={handleNewAssessment}>
              <Target className="mr-2 w-4 h-4" />
              New Assessment
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className={getReadinessColor(stats.overallReadiness)} variant="outline">
                  {getReadinessLabel(stats.overallReadiness)}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.overallReadiness}%
              </div>
              <p className="text-sm text-white">AI Readiness Score</p>
              <Progress value={stats.overallReadiness} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.completedPaths}
              </div>
              <p className="text-sm text-white">Completed Paths</p>
              <div className="text-xs text-gray-300 mt-2">
                {stats.inProgressPaths} in progress
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-purple-600 font-medium">+12 this week</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.totalHoursLearned}
              </div>
              <p className="text-sm text-white">Hours Learned</p>
              <div className="text-xs text-gray-300 mt-2">
                Lifetime learning investment
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-orange-600 font-medium">+5% this month</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.roiImprovement}%
              </div>
              <p className="text-sm text-white">ROI Improvement</p>
              <div className="text-xs text-gray-300 mt-2">
                Measured business impact
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <Card className="md:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{activity.title}</div>
                        <div className="text-sm text-slate-600">{activity.description}</div>
                        <div className="text-xs text-slate-500 mt-1">{activity.timestamp}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Continue your AI transformation journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('assessment')}>
                <Target className="mr-2 w-4 h-4" />
                Take New Assessment
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('learning')}>
                <Brain className="mr-2 w-4 h-4" />
                Browse Learning Paths
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('analytics')}>
                <BarChart3 className="mr-2 w-4 h-4" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('invite')}>
                <Users className="mr-2 w-4 h-4" />
                Invite Team Members
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('goals')}>
                <Shield className="mr-2 w-4 h-4" />
                Update Goals
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Transformation Progress</CardTitle>
              <CardDescription>
                Your journey across key AI readiness dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white">Strategy & Leadership</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white">Skills & Talent</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white">Data & Infrastructure</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white">Culture & Adoption</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Business Impact</CardTitle>
              <CardDescription>
                Measured improvements from AI initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    +{stats.productivityGain}%
                  </div>
                  <p className="text-sm text-slate-600">Productivity</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    +{stats.skillGrowth}%
                  </div>
                  <p className="text-sm text-slate-600">Skill Growth</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {stats.teamReadiness}%
                  </div>
                  <p className="text-sm text-slate-600">Team Readiness</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    +{stats.roiImprovement}%
                  </div>
                  <p className="text-sm text-slate-600">ROI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}