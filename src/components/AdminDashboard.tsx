'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLogin from './AdminLogin';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  Globe,
  Target,
  Clock,
  Mail,
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  XCircle,
  LogOut,
  Shield
} from 'lucide-react';

interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  industry?: string;
  phone?: string;
  jobTitle?: string;
  consultationType: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  message?: string;
  assessmentScore?: number;
  reportGenerated: boolean;
  status: string;
  scheduledAt?: string;
  createdAt: string;
}

interface IndustryAnalytics {
  id: string;
  industry: string;
  totalAssessments: number;
  averageScore: number;
  topCompetitors?: any;
  commonOpportunities?: any;
  commonRisks?: any;
  marketTrends?: any;
  lastUpdated: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [industryAnalytics, setIndustryAnalytics] = useState<IndustryAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin credentials (in production, this should be in environment variables or a secure backend)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  useEffect(() => {
    // Check if user is already authenticated (from session storage)
    const authStatus = sessionStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      fetchData();
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setConsultationRequests([]);
    setIndustryAnalytics([]);
  };

  const fetchData = async () => {
    try {
      // Fetch consultation requests
      const consultationResponse = await fetch('/api/consultation-request');
      const consultationData = await consultationResponse.json();
      setConsultationRequests(consultationData);

      // Fetch industry analytics
      const analyticsResponse = await fetch('/api/industry-analytics');
      const analyticsData = await analyticsResponse.json();
      setIndustryAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'Scheduled': return Calendar;
      case 'Pending': return AlertCircle;
      case 'Cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const stats = {
    totalRequests: consultationRequests.length,
    pendingRequests: consultationRequests.filter(r => r.status === 'Pending').length,
    scheduledToday: consultationRequests.filter(r => 
      r.status === 'Scheduled' && 
      new Date(r.scheduledAt || '').toDateString() === new Date().toDateString()
    ).length,
    completedThisMonth: consultationRequests.filter(r => 
      r.status === 'Completed' && 
      new Date(r.createdAt).getMonth() === new Date().getMonth()
    ).length,
    averageScore: consultationRequests.length > 0 
      ? Math.round(consultationRequests.reduce((sum, r) => sum + (r.assessmentScore || 0), 0) / consultationRequests.length)
      : 0,
    reportGeneratedRate: consultationRequests.length > 0 
      ? Math.round((consultationRequests.filter(r => r.reportGenerated).length / consultationRequests.length) * 100)
      : 0
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-xl text-slate-600">
              Consultation requests and industry analytics overview
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2 border-red-600 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">{stats.totalRequests}</div>
              <p className="text-sm text-slate-600">Total Requests</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">{stats.pendingRequests}</div>
              <p className="text-sm text-slate-600">Pending</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{stats.scheduledToday}</div>
              <p className="text-sm text-slate-600">Scheduled Today</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{stats.completedThisMonth}</div>
              <p className="text-sm text-slate-600">Completed This Month</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{stats.averageScore}%</div>
              <p className="text-sm text-slate-600">Avg Assessment Score</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{stats.reportGeneratedRate}%</div>
              <p className="text-sm text-slate-600">Report Generated Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="consultations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consultations">Consultation Requests</TabsTrigger>
            <TabsTrigger value="analytics">Industry Analytics</TabsTrigger>
          </TabsList>

          {/* Consultation Requests */}
          <TabsContent value="consultations">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Consultation Requests
                </CardTitle>
                <CardDescription>
                  Latest consultation and strategy session requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {consultationRequests.map((request) => {
                    const StatusIcon = getStatusIcon(request.status);
                    return (
                      <div key={request.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-slate-900">{request.name}</h3>
                              <Badge className={getStatusColor(request.status)} variant="outline">
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {request.status}
                              </Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-600">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                {request.email}
                              </div>
                              {request.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {request.phone}
                                </div>
                              )}
                              {request.company && (
                                <div className="flex items-center gap-2">
                                  <Building className="w-3 h-3" />
                                  {request.company}
                                </div>
                              )}
                              {request.industry && (
                                <div className="flex items-center gap-2">
                                  <Globe className="w-3 h-3" />
                                  {request.industry}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            {request.assessmentScore && (
                              <div className={`text-lg font-bold mb-1 ${getScoreColor(request.assessmentScore)}`}>
                                {request.assessmentScore}%
                              </div>
                            )}
                            {request.reportGenerated && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Report Generated
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-slate-900">Type:</span>
                            <p className="text-slate-600">{request.consultationType}</p>
                          </div>
                          <div>
                            <span className="font-medium text-slate-900">Preferred:</span>
                            <p className="text-slate-600">
                              {request.preferredDate ? new Date(request.preferredDate).toLocaleDateString() : 'Not specified'}
                              {request.preferredTime && ` at ${request.preferredTime}`}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-slate-900">Requested:</span>
                            <p className="text-slate-600">{new Date(request.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        {request.message && (
                          <div className="mt-3 p-3 bg-slate-50 rounded text-sm text-slate-600">
                            <span className="font-medium text-slate-900">Message:</span>
                            <p>{request.message}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Industry Analytics */}
          <TabsContent value="analytics">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Industry Performance Analytics
                </CardTitle>
                <CardDescription>
                  Assessment scores and trends by industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {industryAnalytics.map((industry) => (
                    <div key={industry.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900">{industry.industry}</h3>
                          <p className="text-sm text-slate-600">
                            Last updated: {new Date(industry.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(industry.averageScore)}`}>
                            {Math.round(industry.averageScore)}%
                          </div>
                          <p className="text-sm text-slate-600">Avg Score</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">{industry.totalAssessments}</div>
                          <p className="text-sm text-slate-600">Total Assessments</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">
                            {industry.totalAssessments > 0 ? Math.round((industry.averageScore / 100) * industry.totalAssessments) : 0}
                          </div>
                          <p className="text-sm text-slate-600">AI Ready Companies</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded">
                          <div className="text-lg font-bold text-purple-600">
                            {industry.totalAssessments > 0 ? Math.round(industry.averageScore) : 0}%
                          </div>
                          <p className="text-sm text-slate-600">Readiness Rate</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}