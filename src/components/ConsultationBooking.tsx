'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  MessageSquare,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';

interface ConsultationBookingProps {
  reportData: any | null;
  companyInfo: any | null;
  assessmentScore: number;
  onBack: () => void;
  onSuccess: () => void;
}

export default function ConsultationBooking({ 
  reportData, 
  companyInfo, 
  assessmentScore, 
  onBack, 
  onSuccess 
}: ConsultationBookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: companyInfo?.companyUrl ? new URL(companyInfo.companyUrl).hostname : '',
    industry: companyInfo?.industry || '',
    phone: '',
    jobTitle: '',
    consultationType: 'Strategy',
    preferredDate: undefined as Date | undefined,
    preferredTime: '',
    timezone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const consultationTypes = [
    { value: 'Strategy', label: 'AI Strategy Development', description: 'Develop comprehensive AI transformation strategy' },
    { value: 'Implementation', label: 'Implementation Planning', description: 'Detailed roadmap for AI initiatives' },
    { value: 'ROI Analysis', label: 'ROI & Impact Analysis', description: 'Measure and optimize AI investment returns' },
    { value: 'Custom', label: 'Custom Consultation', description: 'Tailored solution for specific needs' }
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  const timezones = [
    'EST (Eastern Time)',
    'CST (Central Time)',
    'MST (Mountain Time)',
    'PST (Pacific Time)',
    'GMT (Greenwich Mean Time)',
    'CET (Central European Time)',
    'AEST (Australian Eastern Time)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          assessmentScore,
          reportGenerated: true,
          companyUrl: companyInfo?.companyUrl || ''
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting consultation request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Consultation Scheduled!
            </h2>
            <p className="text-slate-600 mb-6">
              Thank you for booking a consultation. Our AI transformation expert will contact you shortly to confirm the appointment details.
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <p>📧 Confirmation email sent to {formData.email}</p>
              <p>📅 We'll contact you within 24 hours</p>
              <p>🎯 Prepare your questions about AI transformation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Report
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Schedule Your AI Consultation
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get personalized guidance from our AI transformation experts to implement your competitive intelligence insights
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Consultation Benefits */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Personalized Strategy</h4>
                      <p className="text-sm text-slate-600">Custom AI roadmap based on your competitive analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Implementation Plan</h4>
                      <p className="text-sm text-slate-600">Step-by-step guidance for AI initiatives</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">ROI Optimization</h4>
                      <p className="text-sm text-slate-600">Maximize returns from AI investments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {companyInfo?.industry && (
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Industry:</span>
                      <Badge variant="secondary">{companyInfo.industry}</Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">AI Readiness:</span>
                    <Badge className={assessmentScore >= 75 ? 'bg-green-100 text-green-800' : assessmentScore >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                      {assessmentScore}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Competitors Analyzed:</span>
                    <span className="text-sm font-medium">{reportData?.competitorAnalysis?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Opportunities:</span>
                    <span className="text-sm font-medium">{reportData?.opportunities?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Book Your Consultation</CardTitle>
                <CardDescription>
                  Fill in your details to schedule a personalized AI strategy session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="jobTitle"
                            placeholder="CEO, CTO, Manager..."
                            className="pl-10"
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Company Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company Name</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input
                            id="company"
                            placeholder="Your Company"
                            className="pl-10"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance & Banking</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail & E-commerce</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="government">Government & Public Sector</SelectItem>
                            <SelectItem value="consulting">Consulting & Professional Services</SelectItem>
                            <SelectItem value="media">Media & Entertainment</SelectItem>
                            <SelectItem value="transportation">Transportation & Logistics</SelectItem>
                            <SelectItem value="energy">Energy & Utilities</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Consultation Details</h3>
                    <div>
                      <Label htmlFor="consultationType">Consultation Type *</Label>
                      <Select value={formData.consultationType} onValueChange={(value) => handleInputChange('consultationType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {consultationTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs text-slate-500">{type.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.preferredDate}
                              onSelect={(date) => handleInputChange('preferredDate', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map(tz => (
                            <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Information</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Textarea
                          id="message"
                          placeholder="Tell us about your specific AI transformation goals, challenges, or questions..."
                          className="pl-10 min-h-[100px]"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting || !formData.name || !formData.email}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Scheduling Consultation...
                      </>
                    ) : (
                      'Schedule Free Consultation'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}