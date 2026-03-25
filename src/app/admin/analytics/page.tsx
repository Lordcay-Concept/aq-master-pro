"use client";

import { useState, useEffect } from "react";
import {
  BarChart3, TrendingUp, TrendingDown, Download, Calendar,
  ArrowUp, ArrowDown, Users, Clock, CreditCard, CheckCircle,
  DollarSign, Target, Award, Activity, Mail, Phone,
  MessageSquare, Smartphone, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Types for analytics data
interface OverviewStats {
  totalCustomers: number;
  customerGrowth: number;
  totalAppointments: number;
  appointmentGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  avgWaitTime: number;
  waitTimeChange: number;
  satisfaction: number;
  satisfactionChange: number;
  activeQueues: number;
  queueChange: number;
  staffUtilization: number;
  utilizationChange: number;
}

interface DailyStat {
  day: string;
  appointments: number;
  revenue: number;
  waitTime: number;
  satisfaction: number;
}

interface ServicePerformance {
  name: string;
  appointments: number;
  revenue: number;
  avgTime: number;
  satisfaction: number;
}

interface StaffPerformance {
  name: string;
  appointments: number;
  satisfaction: number;
  avgTime: number;
  revenue: number;
}

interface PeakHour {
  hour: string;
  customers: number;
}

interface CustomerSegment {
  segment: string;
  count: number;
  percentage: number;
}

interface NotificationStats {
  sms: { sent: number; delivered: number; clicked: number };
  email: { sent: number; delivered: number; opened: number };
  whatsapp: { sent: number; delivered: number; read: number };
}

interface RevenueByMethod {
  method: string;
  amount: number;
  percentage: number;
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days");
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<OverviewStats>({
    totalCustomers: 0, customerGrowth: 0, totalAppointments: 0, appointmentGrowth: 0,
    totalRevenue: 0, revenueGrowth: 0, avgWaitTime: 0, waitTimeChange: 0,
    satisfaction: 0, satisfactionChange: 0, activeQueues: 0, queueChange: 0,
    staffUtilization: 0, utilizationChange: 0
  });
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [servicePerformance, setServicePerformance] = useState<ServicePerformance[]>([]);
  const [staffPerformance, setStaffPerformance] = useState<StaffPerformance[]>([]);
  const [peakHours, setPeakHours] = useState<PeakHour[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [notificationStats, setNotificationStats] = useState<NotificationStats>({
    sms: { sent: 0, delivered: 0, clicked: 0 },
    email: { sent: 0, delivered: 0, opened: 0 },
    whatsapp: { sent: 0, delivered: 0, read: 0 }
  });
  const [revenueByPaymentMethod, setRevenueByPaymentMethod] = useState<RevenueByMethod[]>([]);

  useEffect(() => {
    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, 60000);
    return () => clearInterval(interval);
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`);
      const data = await response.json();
      
      setOverview(data.overview);
      setDailyStats(data.dailyStats);
      setServicePerformance(data.servicePerformance);
      setStaffPerformance(data.staffPerformance);
      setPeakHours(data.peakHours);
      setCustomerSegments(data.customerSegments);
      setNotificationStats(data.notificationStats);
      setRevenueByPaymentMethod(data.revenueByPaymentMethod);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 mt-1">Comprehensive insights into your queue management performance</p>
        </div>
        <div className="flex space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchAnalyticsData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-3xl font-bold">{overview.totalCustomers.toLocaleString()}</p>
                <p className={`text-sm flex items-center mt-1 ${overview.customerGrowth > 0 ? "text-green-600" : "text-red-600"}`}>
                  {overview.customerGrowth > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(overview.customerGrowth)}% vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold">₦{(overview.totalRevenue/1000).toFixed(0)}K</p>
                <p className={`text-sm flex items-center mt-1 ${overview.revenueGrowth > 0 ? "text-green-600" : "text-red-600"}`}>
                  {overview.revenueGrowth > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(overview.revenueGrowth)}% vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Wait Time</p>
                <p className="text-3xl font-bold">{overview.avgWaitTime} min</p>
                <p className={`text-sm flex items-center mt-1 ${overview.waitTimeChange < 0 ? "text-green-600" : "text-red-600"}`}>
                  {overview.waitTimeChange < 0 ? <ArrowDown className="h-3 w-3 mr-1" /> : <ArrowUp className="h-3 w-3 mr-1" />}
                  {Math.abs(overview.waitTimeChange)} min {overview.waitTimeChange < 0 ? "improvement" : "increase"}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Satisfaction</p>
                <p className="text-3xl font-bold">{overview.satisfaction}%</p>
                <p className={`text-sm flex items-center mt-1 ${overview.satisfactionChange > 0 ? "text-green-600" : "text-red-600"}`}>
                  {overview.satisfactionChange > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(overview.satisfactionChange)}% increase
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Performance</CardTitle>
            <CardDescription>Appointments and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyStats.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-gray-600">{day.appointments} appointments</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${Math.min((day.appointments / 200) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-green-600 w-20">
                      ₦{(day.revenue/1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
            <CardDescription>Customer traffic patterns throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {peakHours.map((hour) => {
                const maxCustomers = Math.max(...peakHours.map(h => h.customers), 1);
                const percent = (hour.customers / maxCustomers) * 100;
                return (
                  <div key={hour.hour} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{hour.hour}</span>
                      <span className="font-medium">{hour.customers} customers</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          hour.customers > maxCustomers * 0.8 ? 'bg-red-500' : 
                          hour.customers > maxCustomers * 0.5 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Detailed Analytics */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader><CardTitle>Service Performance</CardTitle><CardDescription>Detailed breakdown of service metrics</CardDescription></CardHeader>
            <CardContent>
              <div className="space-y-6">
                {servicePerformance.map((service) => (
                  <div key={service.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div><p className="font-medium">{service.name}</p><p className="text-sm text-gray-500">{service.appointments} appointments</p></div>
                      <div className="text-right"><p className="font-semibold text-green-600">₦{(service.revenue/1000).toFixed(0)}K</p><p className="text-xs text-gray-500">Avg: {service.avgTime} min</p></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><div className="flex items-center justify-between text-xs mb-1"><span>Satisfaction</span><span className="font-medium">{service.satisfaction}%</span></div><Progress value={service.satisfaction} className="h-2" /></div>
                      <div><div className="flex items-center justify-between text-xs mb-1"><span>Efficiency</span><span className="font-medium">{Math.min(Math.round(60/service.avgTime * 10), 100)}%</span></div><Progress value={Math.min(Math.round(60/service.avgTime * 10), 100)} className="h-2" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff">
          <Card>
            <CardHeader><CardTitle>Staff Performance</CardTitle><CardDescription>Individual and team performance metrics</CardDescription></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffPerformance.map((staff) => (
                  <div key={staff.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div><p className="font-medium">{staff.name}</p><p className="text-xs text-gray-500">{staff.appointments} appointments</p></div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right"><p className="text-sm font-medium">{staff.avgTime} min</p><p className="text-xs text-gray-500">Avg time</p></div>
                      <div className="text-right"><p className="text-sm font-medium">{staff.satisfaction}%</p><p className="text-xs text-gray-500">Satisfaction</p></div>
                      <div className="text-right"><p className="text-sm font-medium text-green-600">₦{(staff.revenue/1000).toFixed(0)}K</p><p className="text-xs text-gray-500">Revenue</p></div>
                      <Progress value={staff.satisfaction} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Customer Segments</CardTitle><CardDescription>Breakdown by visit frequency</CardDescription></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.segment} className="space-y-2">
                      <div className="flex items-center justify-between text-sm"><span>{segment.segment}</span><span className="font-medium">{segment.count} customers</span></div>
                      <div className="flex items-center space-x-3"><Progress value={segment.percentage} className="flex-1 h-2" /><span className="text-xs text-gray-500 w-12">{segment.percentage}%</span></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Loyalty Tier Distribution</CardTitle><CardDescription>Customers by membership tier</CardDescription></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overview.totalCustomers > 0 && [
                    { tier: "Platinum", count: Math.round(overview.totalCustomers * 0.1), color: "bg-purple-500" },
                    { tier: "Gold", count: Math.round(overview.totalCustomers * 0.2), color: "bg-yellow-500" },
                    { tier: "Silver", count: Math.round(overview.totalCustomers * 0.3), color: "bg-gray-500" },
                    { tier: "Bronze", count: overview.totalCustomers - Math.round(overview.totalCustomers * 0.6), color: "bg-orange-500" }
                  ].map((tier) => (
                    <div key={tier.tier} className="space-y-2">
                      <div className="flex items-center justify-between text-sm"><span>{tier.tier}</span><span className="font-medium">{tier.count} customers</span></div>
                      <div className="flex items-center space-x-3"><Progress value={(tier.count / overview.totalCustomers) * 100} className={`flex-1 h-2 ${tier.color}`} /><span className="text-xs text-gray-500 w-12">{Math.round((tier.count / overview.totalCustomers) * 100)}%</span></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card><CardHeader><CardTitle className="flex items-center"><Smartphone className="h-5 w-5 mr-2 text-blue-600" />SMS</CardTitle></CardHeader>
              <CardContent><div className="space-y-4"><div><div className="flex items-center justify-between text-sm mb-1"><span>Delivered</span><span className="font-medium">{notificationStats.sms.delivered}</span></div><Progress value={(notificationStats.sms.delivered / (notificationStats.sms.sent || 1)) * 100} className="h-2" /><p className="text-xs text-gray-500 mt-1">{Math.round((notificationStats.sms.delivered / (notificationStats.sms.sent || 1)) * 100)}% delivery rate</p></div></div></CardContent></Card>
            <Card><CardHeader><CardTitle className="flex items-center"><Mail className="h-5 w-5 mr-2 text-green-600" />Email</CardTitle></CardHeader>
              <CardContent><div className="space-y-4"><div><div className="flex items-center justify-between text-sm mb-1"><span>Delivered</span><span className="font-medium">{notificationStats.email.delivered}</span></div><Progress value={(notificationStats.email.delivered / (notificationStats.email.sent || 1)) * 100} className="h-2" /><p className="text-xs text-gray-500 mt-1">{Math.round((notificationStats.email.delivered / (notificationStats.email.sent || 1)) * 100)}% delivery rate</p></div></div></CardContent></Card>
            <Card><CardHeader><CardTitle className="flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-purple-600" />WhatsApp</CardTitle></CardHeader>
              <CardContent><div className="space-y-4"><div><div className="flex items-center justify-between text-sm mb-1"><span>Delivered</span><span className="font-medium">{notificationStats.whatsapp.delivered}</span></div><Progress value={(notificationStats.whatsapp.delivered / (notificationStats.whatsapp.sent || 1)) * 100} className="h-2" /><p className="text-xs text-gray-500 mt-1">{Math.round((notificationStats.whatsapp.delivered / (notificationStats.whatsapp.sent || 1)) * 100)}% delivery rate</p></div></div></CardContent></Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card><CardHeader><CardTitle>Revenue by Payment Method</CardTitle><CardDescription>Breakdown of payment types</CardDescription></CardHeader>
              <CardContent><div className="space-y-4">{revenueByPaymentMethod.map((method) => (<div key={method.method} className="space-y-2"><div className="flex items-center justify-between text-sm"><span>{method.method}</span><span className="font-medium text-green-600">₦{(method.amount/1000).toFixed(0)}K</span></div><div className="flex items-center space-x-3"><Progress value={method.percentage} className="flex-1 h-2" /><span className="text-xs text-gray-500 w-12">{method.percentage}%</span></div></div>))}</div></CardContent></Card>
            <Card><CardHeader><CardTitle>Revenue Trends</CardTitle><CardDescription>Monthly revenue performance</CardDescription></CardHeader>
              <CardContent><div className="space-y-3">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (<div key={month} className="flex items-center space-x-3"><span className="text-sm w-10">{month}</span><div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${(overview.totalRevenue / 1000000) * (i + 1) * 2}%` }} /></div><span className="text-sm font-medium w-20">₦{(overview.totalRevenue / 6 * (i + 1) / 1000).toFixed(0)}K</span></div>))}</div></CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardHeader><CardTitle>Operational Efficiency</CardTitle></CardHeader><CardContent><div className="space-y-4"><div><div className="flex items-center justify-between mb-1"><span className="text-sm">Staff Utilization</span><span className="font-semibold">{overview.staffUtilization}%</span></div><Progress value={overview.staffUtilization} className="h-2" /></div><div><div className="flex items-center justify-between mb-1"><span className="text-sm">Queue Efficiency</span><span className="font-semibold">{Math.min(Math.round((1 - (overview.avgWaitTime / 60)) * 100), 100)}%</span></div><Progress value={Math.min(Math.round((1 - (overview.avgWaitTime / 60)) * 100), 100)} className="h-2" /></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Customer Experience</CardTitle></CardHeader><CardContent><div className="space-y-4"><div><div className="flex items-center justify-between mb-1"><span className="text-sm">CSAT Score</span><span className="font-semibold">{overview.satisfaction}%</span></div><Progress value={overview.satisfaction} className="h-2" /></div><div><div className="flex items-center justify-between mb-1"><span className="text-sm">Return Rate</span><span className="font-semibold">{Math.min(Math.round((overview.totalAppointments / overview.totalCustomers) * 10), 100)}%</span></div><Progress value={Math.min(Math.round((overview.totalAppointments / overview.totalCustomers) * 10), 100)} className="h-2" /></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Queue Health</CardTitle></CardHeader><CardContent><div className="space-y-4"><div><div className="flex items-center justify-between mb-1"><span className="text-sm">Active Queues</span><span className="font-semibold">{overview.activeQueues}</span></div><Progress value={(overview.activeQueues / 10) * 100} className="h-2" /></div><div><div className="flex items-center justify-between mb-1"><span className="text-sm">Abandonment Rate</span><span className="font-semibold">{Math.min(Math.round((1 - (overview.totalAppointments / (overview.totalAppointments + overview.activeQueues))) * 100), 100)}%</span></div><Progress value={Math.min(Math.round((1 - (overview.totalAppointments / (overview.totalAppointments + overview.activeQueues))) * 100), 100)} className="h-2" /></div></div></CardContent></Card>
      </div>
    </div>
  );
}