'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Plus, Mail, Search, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  aiReadiness: number;
  lastActive: string;
  status: 'active' | 'pending' | 'inactive';
}

export default function TeamPage() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'AI Strategy Lead',
      department: 'Innovation',
      aiReadiness: 78,
      lastActive: '2 hours ago',
      status: 'active'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      role: 'Data Scientist',
      department: 'Analytics',
      aiReadiness: 85,
      lastActive: '1 day ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@company.com',
      role: 'ML Engineer',
      department: 'Technology',
      aiReadiness: 72,
      lastActive: '3 days ago',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleBack = () => {
    router.push('/');
  };

  const handleInvite = () => {
    setShowInviteForm(true);
  };

  const getReadinessColor = (score: number) => {
    if (score >= 75) return 'bg-green-100 text-green-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Team Management
            </h1>
            <p className="text-xl text-white">
              Invite and manage your AI transformation team
            </p>
          </div>
          <Button onClick={handleInvite} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 w-4 h-4" />
            Invite Team Member
          </Button>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{member.name}</CardTitle>
                      <CardDescription className="text-slate-300">{member.role}</CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-slate-700 text-white text-xs" variant="secondary">
                          {member.department}
                        </Badge>
                        <Badge className={getReadinessColor(member.aiReadiness)} variant="secondary">
                          AI Ready: {member.aiReadiness}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(member.status)} variant="secondary">
                      {member.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Users className="w-3 h-3" />
                    Last active: {member.lastActive}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Team Members Found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by inviting team members to join your AI transformation journey'}
            </p>
            {!searchTerm && (
              <Button onClick={handleInvite} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 w-4 h-4" />
                Invite First Member
              </Button>
            )}
          </div>
        )}

        {/* Team Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {teamMembers.length}
              </div>
              <p className="text-sm text-slate-300">Total Members</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {teamMembers.filter(m => m.status === 'active').length}
              </div>
              <p className="text-sm text-slate-300">Active Now</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {Math.round(teamMembers.reduce((sum, m) => sum + m.aiReadiness, 0) / teamMembers.length)}%
              </div>
              <p className="text-sm text-slate-300">Avg AI Readiness</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {teamMembers.filter(m => m.aiReadiness >= 75).length}
              </div>
              <p className="text-sm text-slate-300">AI Leaders</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}