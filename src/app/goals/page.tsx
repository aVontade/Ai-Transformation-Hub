'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Target, Plus, Calendar, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'assessment' | 'learning' | 'implementation' | 'roi';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed' | 'not-started';
  priority: 'high' | 'medium' | 'low';
}

export default function GoalsPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete AI Readiness Assessment',
      description: 'Assess entire organization across all AI readiness dimensions',
      category: 'assessment',
      targetValue: 100,
      currentValue: 68,
      unit: '%',
      deadline: '2024-02-15',
      status: 'on-track',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Train 50 Employees in AI Fundamentals',
      description: 'Complete basic AI literacy training for half the team',
      category: 'learning',
      targetValue: 50,
      currentValue: 32,
      unit: 'employees',
      deadline: '2024-03-31',
      status: 'on-track',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Launch First AI Pilot Project',
      description: 'Implement AI solution in customer service department',
      category: 'implementation',
      targetValue: 1,
      currentValue: 0,
      unit: 'project',
      deadline: '2024-04-30',
      status: 'at-risk',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Achieve 25% ROI Increase',
      description: 'Measure business impact from AI initiatives',
      category: 'roi',
      targetValue: 25,
      currentValue: 12,
      unit: '%',
      deadline: '2024-06-30',
      status: 'at-risk',
      priority: 'medium'
    }
  ]);

  const handleBack = () => {
    router.push('/');
  };

  const handleAddGoal = () => {
    console.log('Add new goal');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'not-started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'assessment': return Target;
      case 'learning': return TrendingUp;
      case 'implementation': return CheckCircle;
      case 'roi': return Calendar;
      default: return Target;
    }
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
              AI Transformation Goals
            </h1>
            <p className="text-xl text-white">
              Track and manage your strategic objectives
            </p>
          </div>
          <Button onClick={handleAddGoal} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const IconComponent = getCategoryIcon(goal.category);
            const progressPercentage = (goal.currentValue / goal.targetValue) * 100;
            
            return (
              <Card key={goal.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(goal.status)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{goal.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-slate-700 text-white text-xs" variant="secondary">
                            {goal.category.toUpperCase()}
                          </Badge>
                          <Badge className={getPriorityColor(goal.priority)} variant="secondary">
                            {goal.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(goal.status)} variant="secondary">
                        {goal.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-slate-300">
                    {goal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">Progress</span>
                        <span className="text-white font-medium">
                          {goal.currentValue} / {goal.targetValue} {goal.unit}
                        </span>
                      </div>
                      <Progress 
                        value={progressPercentage} 
                        className="h-3"
                      />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Deadline</span>
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="w-3 h-3" />
                          {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Time Left</span>
                        <div className="flex items-center gap-2 text-white">
                          <Clock className="w-3 h-3" />
                          {Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {goals.length}
              </div>
              <p className="text-sm text-slate-300">Total Goals</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {goals.filter(g => g.status === 'completed').length}
              </div>
              <p className="text-sm text-slate-300">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {goals.filter(g => g.status === 'on-track').length}
              </div>
              <p className="text-sm text-slate-300">On Track</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {goals.filter(g => g.status === 'at-risk').length}
              </div>
              <p className="text-sm text-slate-300">At Risk</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}