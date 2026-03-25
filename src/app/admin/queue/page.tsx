"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Clock, Monitor, Bell, Settings, RefreshCw,
  Play, Pause, SkipForward, UserCheck, UserX,
  TrendingUp, BarChart3, Download, Filter, Search,
  Eye, Edit, MoreVertical, CheckCircle, XCircle,
  AlertCircle, Calendar, MapPin, Phone, Mail,
  ArrowUp, ArrowDown, Activity, Zap, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

// Types
interface QueueStats {
  totalWaiting: number;
  totalServing: number;
  avgWaitTime: number;
  longestWait: number;
  completedToday: number;
  satisfaction: number;
}

interface Counter {
  id: number;
  name: string;
  status: "active" | "busy" | "idle" | "break";
  currentTicket: string;
  waitingCount: number;
  staff: string;
  efficiency: number;
  avatar: string;
}

interface WaitingCustomer {
  id: string;
  ticket: string;
  customer: string;
  service: string;
  waitTime: number;
  priority: "normal" | "vip" | "elderly" | "urgent";
  counter: number | null;
}

interface ServiceStat {
  service: string;
  count: number;
  avgTime: number;
  satisfaction: number;
}

export default function QueueMonitorPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedCounter, setSelectedCounter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Data states
  const [queueData, setQueueData] = useState<QueueStats>({
    totalWaiting: 0,
    totalServing: 0,
    avgWaitTime: 0,
    longestWait: 0,
    completedToday: 0,
    satisfaction: 0
  });

  const [counters, setCounters] = useState<Counter[]>([]);
  const [waitingQueue, setWaitingQueue] = useState<WaitingCustomer[]>([]);
  const [serviceStats, setServiceStats] = useState<ServiceStat[]>([]);

  useEffect(() => {
    fetchQueueData();
    
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchQueueData, 10000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const fetchQueueData = async () => {
    try {
      const response = await fetch("/api/admin/queue");
      const data = await response.json();
      
      setQueueData(data.stats);
      setCounters(data.counters);
      setWaitingQueue(data.waitingQueue);
      setServiceStats(data.serviceStats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching queue data:", error);
      toast.error("Failed to load queue data");
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-orange-500';
      case 'idle': return 'bg-gray-400';
      case 'break': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'urgent': return <Badge className="bg-red-100 text-red-700">Urgent</Badge>;
      case 'vip': return <Badge className="bg-purple-100 text-purple-700">VIP</Badge>;
      case 'elderly': return <Badge className="bg-blue-100 text-blue-700">Elderly</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-700">Normal</Badge>;
    }
  };

  const filteredCounters = selectedCounter === "all" 
    ? counters 
    : counters.filter(c => c.status === selectedCounter);

  const filteredQueue = waitingQueue.filter(q => 
    q.ticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.customer.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Queue Monitor</h1>
          <p className="text-gray-500 mt-1">Real-time queue status and management dashboard</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-refresh" 
              checked={autoRefresh} 
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh">Auto-refresh</Label>
          </div>
          <Button variant="outline" onClick={fetchQueueData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Waiting</p>
                <p className="text-2xl font-bold text-orange-600">{queueData.totalWaiting}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Serving</p>
                <p className="text-2xl font-bold text-green-600">{queueData.totalServing}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Avg. Wait</p>
                <p className="text-2xl font-bold text-blue-600">{queueData.avgWaitTime} min</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Longest Wait</p>
                <p className="text-2xl font-bold text-red-600">{queueData.longestWait} min</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-purple-600">{queueData.completedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Satisfaction</p>
                <p className="text-2xl font-bold text-green-600">{queueData.satisfaction}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Counters Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Service Counters</CardTitle>
              <CardDescription>Real-time status of all service points</CardDescription>
            </div>
            <Select value={selectedCounter} onValueChange={setSelectedCounter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counters</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="break">On Break</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCounters.map((counter) => (
              <motion.div
                key={counter.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -2 }}
                className={`relative overflow-hidden rounded-lg border ${
                  counter.status === 'active' ? 'border-green-200 bg-green-50' :
                  counter.status === 'busy' ? 'border-orange-200 bg-orange-50' :
                  counter.status === 'idle' ? 'border-gray-200 bg-gray-50' :
                  'border-yellow-200 bg-yellow-50'
                } p-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(counter.status)}`} />
                    <div>
                      <h3 className="font-semibold">{counter.name}</h3>
                      <p className="text-xs text-gray-500 capitalize">{counter.status}</p>
                    </div>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                      {counter.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Serving:</span>
                    <span className="font-mono font-semibold">{counter.currentTicket}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Waiting:</span>
                    <span>{counter.waitingCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Efficiency:</span>
                    <span className={counter.efficiency > 90 ? 'text-green-600' : 'text-orange-600'}>
                      {counter.efficiency}%
                    </span>
                  </div>
                </div>

                <Progress value={counter.efficiency} className="mt-2 h-1" />

                <div className="mt-3 flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="live">Live Queue</TabsTrigger>
          <TabsTrigger value="waiting">Waiting List</TabsTrigger>
          <TabsTrigger value="service">Service Stats</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Live Queue Tab */}
        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Queue Status</CardTitle>
              <CardDescription>Currently waiting customers by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceStats.map((stat) => (
                  <div key={stat.service} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{stat.service}</span>
                      <span className="font-medium">{stat.count} waiting</span>
                    </div>
                    <Progress value={(stat.count / 10) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Waiting List Tab */}
        <TabsContent value="waiting">
          <Card>
            <CardHeader>
              <CardTitle>Waiting List</CardTitle>
              <CardDescription>All customers currently in queue</CardDescription>
              <div className="flex items-center space-x-2 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by ticket or name..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={fetchQueueData}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQueue.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono font-medium">{item.ticket}</TableCell>
                      <TableCell>{item.customer}</TableCell>
                      <TableCell>{item.service}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          {item.waitTime} min
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <SkipForward className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredQueue.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No customers waiting</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Stats Tab */}
        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Service Point Statistics</CardTitle>
              <CardDescription>Performance metrics by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {serviceStats.map((stat) => (
                  <div key={stat.service} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{stat.service}</p>
                        <p className="text-sm text-gray-500">{stat.count} waiting</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{stat.avgTime} min avg</p>
                        <p className="text-xs text-gray-500">Satisfaction: {stat.satisfaction}%</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Service Speed</span>
                          <span className="font-medium">{Math.round(60/stat.avgTime * 10)}%</span>
                        </div>
                        <Progress value={Math.round(60/stat.avgTime * 10)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Satisfaction</span>
                          <span className="font-medium">{stat.satisfaction}%</span>
                        </div>
                        <Progress value={stat.satisfaction} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Queue History</CardTitle>
              <CardDescription>Completed transactions and wait times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-500 text-center py-8">History data coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}