"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Clock, Ticket, CheckCircle, XCircle,
  Play, Pause, SkipForward, ChevronRight, Search,
  MessageSquare, Phone, Mail, AlertCircle,
  BarChart3, Calendar, Filter, Download,
  Star, TrendingUp, Award, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Types
interface StaffInfo {
  id: string;
  name: string;
  counter: number;
  department: string;
  online: boolean;
  todayStats: {
    served: number;
    avgTime: number;
    satisfaction: number;
    breaks: number;
  };
}

interface Ticket {
  id: string;
  number: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  service: string;
  priority: "normal" | "vip" | "elderly" | "urgent";
  waitTime: number;
  estimatedStart: string;
  notes?: string;
}

interface CompletedTicket {
  id: string;
  ticket: string;
  customer: string;
  time: string;
  duration: number;
  satisfaction?: number;
}

interface PerformanceMetrics {
  dailyGoal: number;
  speed: number;
  rank: number;
  totalStaff: number;
}

export default function StaffDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [queue, setQueue] = useState<Ticket[]>([]);
  const [completedToday, setCompletedToday] = useState<CompletedTicket[]>([]);
  const [staffInfo, setStaffInfo] = useState<StaffInfo | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    dailyGoal: 0,
    speed: 0,
    rank: 0,
    totalStaff: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showBreakDialog, setShowBreakDialog] = useState(false);
  const [breakMinutes, setBreakMinutes] = useState<number>(15);
  const [breakReason, setBreakReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "staff") {
      router.push("/unauthorized");
    } else {
      fetchDashboardData();
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setLoading(false);
    }
  };

  const handleTakeBreak = async () => {
    try {
      const response = await fetch("/api/staff/break/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration: breakMinutes, reason: breakReason })
      });
      const data = await response.json();
      if (data.success) {
        setOnline(false);
        setShowBreakDialog(false);
      }
    } catch (error) {
      console.error("Error starting break:", error);
    }
  };

  const handleEndBreak = async () => {
    try {
      const response = await fetch("/api/staff/break/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (data.success) {
        setOnline(true);
      }
    } catch (error) {
      console.error("Error ending break:", error);
    }
  };

  const handleStatusToggle = async () => {
    if (online) {
      setShowBreakDialog(true);
    } else {
      await handleEndBreak();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'vip': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'elderly': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredQueue = queue.filter(ticket =>
    ticket.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {staffInfo?.name?.split(' ')[0] || "Staff"}!
          </h1>
          <p className="text-gray-500 mt-1">Here's your performance overview for today</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="border-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-2">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Today Served</p>
                <p className="text-3xl font-bold">{staffInfo?.todayStats.served || 0}</p>
                <p className="text-xs text-blue-200 mt-1">Updated just now</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Avg. Time</p>
                <p className="text-3xl font-bold">{staffInfo?.todayStats.avgTime || 0} min</p>
                <p className="text-xs text-green-200 mt-1">Current average</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">In Queue</p>
                <p className="text-3xl font-bold">{queue.length}</p>
                <p className="text-xs text-orange-200 mt-1">{queue.filter(t => t.priority === 'urgent').length} urgent</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Ticket className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Satisfaction</p>
                <p className="text-3xl font-bold">{staffInfo?.todayStats.satisfaction || 0}%</p>
                <p className="text-xs text-purple-200 mt-1">Based on {completedToday.filter(c => c.satisfaction).length} ratings</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Active Ticket & Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Ticket */}
          <Card className={`border-2 ${activeTicket ? 'border-blue-200' : 'border-gray-200'} shadow-xl`}>
            <CardHeader className={`bg-gradient-to-r ${activeTicket ? 'from-blue-50 to-purple-50' : 'from-gray-50 to-gray-100'}`}>
              <CardTitle className="flex items-center">
                {activeTicket ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2" />
                    Currently Serving
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2" />
                    Ready for Next Customer
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {activeTicket ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Ticket Number</p>
                      <p className="text-5xl font-bold text-blue-600">{activeTicket.number}</p>
                    </div>
                    <Badge className={`text-lg px-4 py-2 ${getPriorityColor(activeTicket.priority)}`}>
                      {activeTicket.priority}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Customer</p>
                      <p className="font-semibold text-lg">{activeTicket.customer.name}</p>
                      <p className="text-sm text-gray-600">{activeTicket.customer.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Service</p>
                      <p className="font-semibold">{activeTicket.service}</p>
                      <p className="text-sm text-gray-600">Wait: {activeTicket.waitTime} min</p>
                    </div>
                  </div>

                  {activeTicket.notes && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-700">
                        <AlertCircle className="h-4 w-4 inline mr-2" />
                        {activeTicket.notes}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Complete Service</DialogTitle>
                          <DialogDescription>
                            Add service notes and customer satisfaction rating
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Service Notes</Label>
                            <Textarea placeholder="Enter service notes..." rows={4} />
                          </div>
                          <div className="space-y-2">
                            <Label>Customer Satisfaction</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Rate satisfaction" />
                              </SelectTrigger>
                              <SelectContent>
                                {[5,4,3,2,1].map(r => (
                                  <SelectItem key={r} value={r.toString()}>
                                    {r} {r === 1 ? 'Star' : 'Stars'}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-green-600 hover:bg-green-700">Complete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" onClick={() => {/* Handle skip */}}>
                      <SkipForward className="h-4 w-4 mr-2" />
                      Skip
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-2 text-red-600" />
                          No Show
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mark as No Show</DialogTitle>
                          <DialogDescription>
                            This customer did not respond when called
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Reason (optional)</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="not-responding">Not responding</SelectItem>
                                <SelectItem value="left-premises">Left premises</SelectItem>
                                <SelectItem value="wrong-number">Wrong number</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive">Confirm No Show</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Active Ticket</h3>
                  <p className="text-gray-500 mb-6">Ready to serve the next customer</p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600" 
                    disabled={queue.length === 0}
                    onClick={() => {
                      if (queue.length > 0) {
                        setActiveTicket(queue[0]);
                        setQueue(queue.slice(1));
                      }
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Call Next Customer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Queue List */}
          <Card className="shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Waiting Queue</CardTitle>
                <p className="text-sm text-gray-500">{queue.length} customers waiting</p>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by ticket or name..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredQueue.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-all"
                    onClick={() => !activeTicket && setActiveTicket(ticket)}
                  >
                    <div className="flex items-center space-x-4">
                      <Badge className={`font-mono ${getPriorityColor(ticket.priority)}`}>
                        {ticket.number}
                      </Badge>
                      <div>
                        <p className="font-medium">{ticket.customer.name}</p>
                        <p className="text-sm text-gray-500">{ticket.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">{ticket.waitTime} min</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}

                {filteredQueue.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No customers in queue</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Performance Chart */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Goal</span>
                  <span className="font-medium">{staffInfo?.todayStats.served || 0}/{metrics.dailyGoal || 50}</span>
                </div>
                <Progress value={((staffInfo?.todayStats.served || 0) / (metrics.dailyGoal || 50)) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Satisfaction</span>
                  <span className="font-medium">{staffInfo?.todayStats.satisfaction || 0}%</span>
                </div>
                <Progress 
                  value={staffInfo?.todayStats.satisfaction || 0} 
                  className="h-2 bg-green-100" 
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Speed</span>
                  <span className="font-medium">{metrics.speed || 0}%</span>
                </div>
                <Progress 
                  value={metrics.speed || 0} 
                  className="h-2 bg-blue-100" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Completed Today */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedToday.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.ticket}</p>
                      <p className="text-xs text-gray-500">{item.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{item.time}</p>
                      <p className="text-xs text-gray-500">{item.duration} min</p>
                    </div>
                  </div>
                ))}
                
                {completedToday.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No completed tickets today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8 opacity-80" />
                <Award className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-3xl font-bold mb-1">Performance Rank</p>
              <p className="text-indigo-100 text-sm">Your current standing</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-sm">
                  <span>Rank</span>
                  <span className="font-bold">#{metrics.rank || 0} of {metrics.totalStaff || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Break Dialog */}
      <Dialog open={showBreakDialog} onOpenChange={setShowBreakDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Take a Break</DialogTitle>
            <DialogDescription>
              Let your supervisor know you're taking a break
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Break Duration</Label>
              <Select 
                value={breakMinutes.toString()} 
                onValueChange={(v) => setBreakMinutes(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Reason (optional)</Label>
              <Textarea
                placeholder="e.g., Lunch, restroom, etc."
                value={breakReason}
                onChange={(e) => setBreakReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBreakDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleTakeBreak}>
              Start Break
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}