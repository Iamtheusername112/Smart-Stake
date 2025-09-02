'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SimpleAuth from '@/components/SimpleAuth';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target,
  Mail,
  MousePointer,
  BarChart3,
  PieChart,
  ExternalLink,
  Eye,
  MousePointerClick,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Award,
  Clock
} from 'lucide-react';

export default function EnhancedDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'traffic', label: 'Traffic', icon: Globe },
    { id: 'conversions', label: 'Conversions', icon: Target },
    { id: 'email', label: 'Email', icon: Mail }
  ];

  return (
    <SimpleAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartStake Revenue Dashboard</h1>
          <p className="text-gray-600">Track your lead generation and revenue performance</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="mb-2"
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalLeads || 0}</div>
              <p className="text-xs text-muted-foreground">
                +{analytics?.leadsThisWeek || 0} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.conversionRate || 0}%</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.conversionsThisWeek || 0} conversions this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics?.totalRevenue || 0}</div>
              <p className="text-xs text-muted-foreground">
                +${analytics?.revenueThisWeek || 0} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Lead Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics?.avgLeadValue || 0}</div>
              <p className="text-xs text-muted-foreground">
                Per lead generated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.leadSources?.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium">{source.source}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {source.count} leads ({source.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.recentLeads?.slice(0, 5).map((lead, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{lead.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Score: {lead.leadScore}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Casino Landing</span>
                    <span className="text-sm text-green-600">$2,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sports Landing</span>
                    <span className="text-sm text-green-600">$1,890</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Main Landing</span>
                    <span className="text-sm text-green-600">$1,230</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commission Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bet365</span>
                    <span className="text-sm text-blue-600">$1,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">William Hill</span>
                    <span className="text-sm text-blue-600">$980</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ladbrokes</span>
                    <span className="text-sm text-blue-600">$750</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'traffic' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Organic</span>
                    </div>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Paid Ads</span>
                    </div>
                    <span className="text-sm text-muted-foreground">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Social</span>
                    </div>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Mobile</span>
                    </div>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Desktop</span>
                    </div>
                    <span className="text-sm text-muted-foreground">35%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Landing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Main Page</span>
                    <span className="text-sm text-muted-foreground">1,250</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Casino</span>
                    <span className="text-sm text-muted-foreground">890</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sports</span>
                    <span className="text-sm text-muted-foreground">650</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'conversions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Visitors</span>
                    <span className="text-sm text-muted-foreground">10,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Form Views</span>
                    <span className="text-sm text-muted-foreground">3,500 (35%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Form Submissions</span>
                    <span className="text-sm text-muted-foreground">1,200 (12%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Verified Leads</span>
                    <span className="text-sm text-muted-foreground">980 (9.8%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Quality Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">High Quality (80-100)</span>
                    <span className="text-sm text-green-600">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Medium Quality (50-79)</span>
                    <span className="text-sm text-yellow-600">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Low Quality (0-49)</span>
                    <span className="text-sm text-red-600">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Welcome Series</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">85% Open Rate</div>
                      <div className="text-xs text-muted-foreground">1,200 sent</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bonus Reminder</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">72% Open Rate</div>
                      <div className="text-xs text-muted-foreground">980 sent</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Re-engagement</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">45% Open Rate</div>
                      <div className="text-xs text-muted-foreground">650 sent</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Total Opens</span>
                    <span className="text-sm text-muted-foreground">2,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <MousePointerClick className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Total Clicks</span>
                    <span className="text-sm text-muted-foreground">890</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <ExternalLink className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Click Rate</span>
                    <span className="text-sm text-muted-foreground">36.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={fetchAnalytics}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Refresh Analytics
          </Button>
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Email Campaigns
          </Button>
          <Button variant="outline">
            <MousePointer className="w-4 h-4 mr-2" />
            Traffic Sources
          </Button>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Affiliate Links
          </Button>
        </div>
        </div>
      </div>
    </SimpleAuth>
  );
}
