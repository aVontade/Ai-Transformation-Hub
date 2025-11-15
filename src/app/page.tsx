'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, Target, Brain, Zap, Shield, Award, BarChart3, BookOpen } from 'lucide-react';
import AIReadinessAssessment from '@/components/AIReadinessAssessment';
import Dashboard from '@/components/Dashboard';
import LearningPaths from '@/components/LearningPaths';
import AdminDashboard from '@/components/AdminDashboard';

type PageView = 'home' | 'assessment' | 'dashboard' | 'learning' | 'admin';

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('home');

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b-4 border-[#DC0000]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src="/at-logo.svg" 
              alt="AI Transformation Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-slate-900">AI Transformation Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant={currentView === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('home')}
            >
              Home
            </Button>
            <Button 
              variant={currentView === 'assessment' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('assessment')}
            >
              Assessment
            </Button>
            <Button 
              variant={currentView === 'learning' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('learning')}
            >
              Learning Paths
            </Button>
            <Button 
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant={currentView === 'admin' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('admin')}
            >
              Admin
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 text-sm" variant="secondary">
            <Brain className="w-4 h-4 mr-2" />
            AI Transformation Hub
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6 text-center">
            <div>The AI Revolution is Here.</div>
            <div className="text-blue-400">Are You Ready?</div>
          </h1>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Artificial Intelligence isn't just changing how we work—it's fundamentally reshaping entire industries. 
            While 85M jobs face displacement, 97M new opportunities are emerging. The question isn't whether 
            AI will transform your organization, but whether you'll lead the change or be left behind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => setCurrentView('assessment')}
            >
              Take AI Readiness Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => setCurrentView('learning')}>
              Explore Learning Paths
              <BookOpen className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12M</div>
              <p className="text-white">Net new jobs by 2030</p>
              <p className="text-sm text-gray-300 mt-2">97M created vs 85M displaced</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">124%</div>
              <p className="text-white">Average AI skill wage premium</p>
              <p className="text-sm text-gray-300 mt-2">Up to 180% in tech sector</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3X</div>
              <p className="text-white">Productivity gains possible</p>
              <p className="text-sm text-gray-300 mt-2">Through proper AI integration</p>
            </CardContent>
          </Card>
        </div>

        {/* Unexpected Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Unexpected AI Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Steel Manufacturing Revolution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">
                  A traditional steel manufacturer implemented AI-powered predictive maintenance, 
                  reducing downtime by 45% and saving $2.3M annually. Their workforce transitioned 
                  from manual monitoring to AI oversight roles.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Manufacturing</Badge>
                  <Badge variant="secondary">45% Cost Reduction</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Healthcare Diagnostic Breakthrough</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">
                  A regional hospital network deployed AI for radiology diagnostics, achieving 
                  94% accuracy in detecting early-stage cancers that human radiologists missed. 
                  Patient outcomes improved by 32%.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Healthcare</Badge>
                  <Badge variant="secondary">32% Better Outcomes</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Retail Supply Chain Transformation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">
                  A mid-sized retailer used AI for demand forecasting, reducing inventory costs by 38% 
                  while increasing stock availability. Employee satisfaction rose as they shifted from 
                  manual counting to strategic planning.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Retail</Badge>
                  <Badge variant="secondary">38% Cost Savings</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Financial Services Automation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">
                  A community bank automated loan processing with AI, reducing approval time from 5 days 
                  to 2 hours while maintaining compliance. Loan officers transitioned to advisory roles, 
                  increasing customer satisfaction by 28%.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Finance</Badge>
                  <Badge variant="secondary">60X Faster Processing</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-white mb-16">
          <h2 className="text-4xl font-bold mb-6">
            The Risk of Inaction is Greater Than the Risk of Action
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Organizations that embrace AI transformation are seeing 30% competitive advantage gains, 
            while those that wait risk becoming obsolete. The window for strategic advantage is closing— 
            the time to act is now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-slate-100"
              onClick={() => setCurrentView('assessment')}
            >
              <Shield className="mr-2 w-5 h-5" />
              Assess Your AI Readiness
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600" onClick={() => setCurrentView('dashboard')}>
              <BarChart3 className="mr-2 w-5 h-5" />
              View Success Metrics
            </Button>
          </div>
        </div>

        {/* Framework Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            The Learning, Unlearning, Relearning Framework
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Learning</CardTitle>
                <CardDescription>Acquiring new AI-relevant skills</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-white">
                  <li>• AI literacy fundamentals</li>
                  <li>• Human-AI collaboration</li>
                  <li>• Data fluency</li>
                  <li>• Domain-specific applications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-orange-100 rounded-lg w-fit mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle>Unlearning</CardTitle>
                <CardDescription>Releasing obsolete practices</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-white">
                  <li>• Identifying automated tasks</li>
                  <li>• Challenging legacy processes</li>
                  <li>• Value-centric thinking</li>
                  <li>• Overcoming resistance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-green-100 rounded-lg w-fit mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Relearning</CardTitle>
                <CardDescription>Adapting new approaches</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-white">
                  <li>• Human-AI workflow design</li>
                  <li>• Enhanced human skills</li>
                  <li>• Ethical AI application</li>
                  <li>• Continuous improvement</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Your AI Transformation Journey Starts Here
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Take the first step towards AI readiness. Our comprehensive assessment will evaluate your 
            organization's preparedness and provide personalized recommendations for your transformation journey.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => setCurrentView('assessment')}
          >
            Start Your AI Readiness Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {renderNavigation()}
      {currentView === 'home' && renderHome()}
      {currentView === 'assessment' && <AIReadinessAssessment onBack={() => setCurrentView('home')} />}
      {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
      {currentView === 'learning' && <LearningPaths />}
      {currentView === 'admin' && <AdminDashboard />}
    </div>
  );
}