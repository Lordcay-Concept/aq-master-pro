"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, Clock, Calendar, TrendingUp, ArrowUp,
  ArrowDown, Activity, UserCheck, UserX, DollarSign,
  Download, Filter, MoreVertical, CheckCircle, XCircle,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Types
interface DashboardStats {
  totalCustomers: number;
  customerGrowth: number;
  activeQueues: number;
  queueChange: number;
  avgWaitTime: number;
  waitTimeChange: number;
  staffOnline: number;
  staffChange: number;
  todayAppointments: number;
  appointmentChange: number;
  completedToday: number;
  completedChange: number;
  revenue: number;
  revenueGrowth: number;
  satisfaction: number;
  satisfactionChange: number;
}

interface RecentActivity {
  id: string;
  type: "staff_approved" | "queue_alert" | "appointment" | "payment" | "staff_offline";
  description: string;
  time: string;
  status: "approved" | "warning" | "completed" | "success" | "offline";
}

interface QueueStatus {
  counter: number;
  currentTicket: string;
  waitingCount: number;
  status: "active" | "busy" | "idle";
  efficiency: number;
}

interface PendingApproval {
  id: string;
  name: string;
  email: string;
  role: string;
  appliedAt: string;
}

interface StaffPerformance {
  id: string;
  name: string;
  initials: string;
  counter: number;
  customersServed: number;
  avgTime: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    customerGrowth: 0,
    activeQueues: 0,
    queueChange: 0,
    avgWaitTime: 0,
    waitTimeChange: 0,
    staffOnline: 0,
    staffChange: 0,
    todayAppointments: 0,
    appointmentChange: 0,
    completedToday: 0,
    completedChange: 0,
    revenue: 0,
    revenueGrowth: 0,
    satisfaction: 0,
    satisfactionChange: 0
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [queueStatus, setQueueStatus] = useState<QueueStatus[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const [staffPerformance, setStaffPerformance] = useState<StaffPerformance[]>([]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin");
      const data = await response.json();
      
      setStats(data.stats);
      setRecentActivities(data.recentActivities);
      setQueueStatus(data.queueStatus);
      setPendingApprovals(data.pendingApprovals);
      setStaffPerformance(data.staffPerformance);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={fetchDashboardData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +{stats.customerGrowth}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Avg. Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgWaitTime} min</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowDown className="h-3 w-3 mr-1" />
                {Math.abs(stats.waitTimeChange)} min from yesterday
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{(stats.revenue / 1000).toFixed(1)}K</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +{stats.revenueGrowth}% from yesterday
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.satisfaction}%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +{stats.satisfactionChange}% this week
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Queue Status</CardTitle>
            <CardDescription>Real-time monitoring of all service counters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {queueStatus.map((counter) => (
                <div key={counter.counter} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      counter.status === 'active' ? 'bg-green-500' :
                      counter.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <span className="font-medium">Counter {counter.counter}</span>
                      <div className="text-sm text-gray-500">
                        Serving: {counter.currentTicket} • Waiting: {counter.waitingCount}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{counter.efficiency}%</div>
                      <div className="text-xs text-gray-500">Efficiency</div>
                    </div>
                    <Progress value={counter.efficiency} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  {activity.status === 'approved' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {activity.status === 'warning' && <Clock className="h-5 w-5 text-orange-500" />}
                  {activity.status === 'completed' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                  {activity.status === 'success' && <DollarSign className="h-5 w-5 text-green-500" />}
                  {activity.status === 'offline' && <XCircle className="h-5 w-5 text-red-500" />}
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Today's productivity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffPerformance.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {staff.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{staff.name}</p>
                      <p className="text-xs text-gray-500">Counter {staff.counter}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{staff.customersServed} customers</p>
                    <p className="text-xs text-green-600">Avg: {staff.avgTime} min</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Staff accounts awaiting verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{applicant.name}</p>
                    <p className="text-sm text-gray-500">{applicant.email}</p>
                    <p className="text-xs text-gray-400">{applicant.role} • {applicant.appliedAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-blue-600">
              View All Pending Approvals
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}