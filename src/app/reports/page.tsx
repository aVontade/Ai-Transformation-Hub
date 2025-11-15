'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Calendar, TrendingUp, BarChart3, Eye, FileText, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Report {
  id: string;
  title: string;
  type: 'assessment' | 'competitive-intelligence' | 'learning-progress' | 'roi-analysis';
  generatedAt: string;
  score?: number;
  industry?: string;
  status: 'completed' | 'generating' | 'failed';
  downloadUrl?: string;
}

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/get-reports');
      if (response.ok) {
        const reportsData = await response.json();
        
        setReports(reportsData);
        console.log('Fetched reports from database:', reportsData.length);
      } else {
        console.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'assessment': return BarChart3;
      case 'competitive-intelligence': return TrendingUp;
      case 'learning-progress': return FileText;
      case 'roi-analysis': return Eye;
      default: return FileText;
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'assessment': return 'bg-blue-100 text-blue-800';
      case 'competitive-intelligence': return 'bg-green-100 text-green-800';
      case 'learning-progress': return 'bg-purple-100 text-purple-800';
      case 'roi-analysis': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'generating': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleDownload = (report: Report) => {
    console.log(`Downloading report: ${report.title}`);
    // In a real app, this would trigger file download
    alert(`Downloading ${report.title}...`);
  };

  const handleBack = () => {
    router.push('/');
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
              Reports
            </h1>
            <p className="text-xl text-white">
              Download and manage your AI transformation reports
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-600 text-white">
              <Filter className="mr-2 w-4 h-4" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="mr-2 w-4 h-4" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600">Loading reports...</p>
          </div>
        )}

        {/* Reports Grid */}
        {!loading && reports.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => {
              const IconComponent = getReportIcon(report.type);
              return (
                <Card key={report.id} className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getReportTypeColor(report.type)}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">{report.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getReportTypeColor(report.type)} variant="secondary">
                              {report.type.replace('-', ' ').toUpperCase()}
                            </Badge>
                            {report.score && (
                              <Badge className="bg-slate-700 text-white" variant="outline">
                                Score: {report.score}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-300 mb-4">
                      Generated: {new Date(report.generatedAt).toLocaleDateString()} at {new Date(report.generatedAt).toLocaleTimeString()}
                      {report.industry && (
                        <span className="block mt-1">Industry: {report.industry}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">
                        {report.type === 'assessment' && 'Complete AI readiness evaluation with scoring breakdown'}
                        {report.type === 'competitive-intelligence' && 'Industry analysis with competitor insights and market opportunities'}
                        {report.type === 'learning-progress' && 'Learning pathway completion and skill development tracking'}
                        {report.type === 'roi-analysis' && 'Business impact analysis with ROI calculations and projections'}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleDownload(report)}
                          disabled={report.status !== 'completed'}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <Button 
                          onClick={() => router.push('/consultation')}
                          variant="outline"
                          className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Calendar className="w-4 h-4" />
                          Request Consultation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && reports.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Reports Available</h3>
            <p className="text-slate-400 mb-6">
              Complete an AI readiness assessment to generate your first report.
            </p>
            <Button onClick={() => router.push('/assessment')} className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="mr-2 w-4 h-4" />
              Take Assessment
            </Button>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {reports.filter(r => r.type === 'assessment').length}
              </div>
              <p className="text-sm text-slate-300">Assessment Reports</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {reports.filter(r => r.type === 'competitive-intelligence').length}
              </div>
              <p className="text-sm text-slate-300">Intelligence Reports</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {reports.filter(r => r.type === 'learning-progress').length}
              </div>
              <p className="text-sm text-slate-300">Learning Reports</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {reports.filter(r => r.type === 'roi-analysis').length}
              </div>
              <p className="text-sm text-slate-300">ROI Analysis</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}