"use client";

import { useState, useEffect } from "react";
import {
  Users, UserPlus, UserCheck, UserX, Mail, Phone,
  Calendar, Clock, Award, Star, TrendingUp, Filter,
  Search, Download, Eye, Edit, Trash2, MessageSquare,
  CreditCard, MapPin, Briefcase, Shield, AlertCircle,
  CheckCircle, XCircle, BarChart3, PieChart, Heart,
  Gift, Bell, Settings, MoreVertical, ChevronLeft, ChevronRight,
  Activity, RefreshCw
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
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

// Types
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  status: "active" | "inactive" | "blocked";
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  joinDate: string;
  preferredService: string;
  satisfaction: number;
  location: string;
  occupation: string;
  birthday: string;
  notifications: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  notes: string;
  currentQueueStatus?: {
    hasActiveTicket: boolean;
    ticketNumber?: string;
    service?: string;
    queuePosition?: number;
    estimatedWait?: number;
    status?: string;
  };
}

interface CustomerStats {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
  waitingNow: number;
  beingServed: number;
  totalVisits: number;
  totalRevenue: number;
  avgSatisfaction: number;
  newThisMonth: number;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedQueueStatus, setSelectedQueueStatus] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    total: 0,
    active: 0,
    inactive: 0,
    blocked: 0,
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    waitingNow: 0,
    beingServed: 0,
    totalVisits: 0,
    totalRevenue: 0,
    avgSatisfaction: 0,
    newThisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
    const interval = setInterval(fetchCustomers, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/customers");
      const data = await response.json();
      
      if (response.ok) {
        setCustomers(data.customers || []);
        setStats(data.stats || {
          total: 0,
          active: 0,
          inactive: 0,
          blocked: 0,
          platinum: 0,
          gold: 0,
          silver: 0,
          bronze: 0,
          waitingNow: 0,
          beingServed: 0,
          totalVisits: 0,
          totalRevenue: 0,
          avgSatisfaction: 0,
          newThisMonth: 0
        });
      } else {
        setError(data.error || "Failed to fetch customers");
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const tierColors = {
    platinum: "bg-purple-100 text-purple-700 border-purple-200",
    gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
    silver: "bg-gray-100 text-gray-700 border-gray-200",
    bronze: "bg-orange-100 text-orange-700 border-orange-200"
  };

  const statusColors = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    blocked: "bg-red-100 text-red-700"
  };

  const queueStatusColors = {
    waiting: "bg-blue-100 text-blue-700",
    calling: "bg-yellow-100 text-yellow-700",
    serving: "bg-green-100 text-green-700"
  };

  const getQueueStatusBadge = (customer: Customer) => {
    if (!customer.currentQueueStatus?.hasActiveTicket) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-500">No Active Ticket</Badge>;
    }
    const status = customer.currentQueueStatus.status || "waiting";
    return (
      <Badge className={queueStatusColors[status as keyof typeof queueStatusColors]}>
        {status === "waiting" && "⏳ Waiting"}
        {status === "calling" && "📢 Calling"}
        {status === "serving" && "🛎️ Being Served"}
      </Badge>
    );
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus;
    const matchesTier = selectedTier === "all" || customer.tier === selectedTier;
    const matchesQueueStatus = selectedQueueStatus === "all" || 
      (selectedQueueStatus === "active" && customer.currentQueueStatus?.hasActiveTicket) ||
      (selectedQueueStatus === "inactive" && !customer.currentQueueStatus?.hasActiveTicket);
    return matchesSearch && matchesStatus && matchesTier && matchesQueueStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Customers</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchCustomers} className="bg-blue-600 text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers Management</h1>
          <p className="text-gray-500 mt-1">Manage customer profiles, preferences, and engagement</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          onClick={() => setShowAddDialog(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Waiting Now</p>
                <p className="text-2xl font-bold text-blue-600">{stats.waitingNow}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Being Served</p>
                <p className="text-2xl font-bold text-green-600">{stats.beingServed}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Platinum</p>
                <p className="text-2xl font-bold text-purple-600">{stats.platinum}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Gold</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.gold}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Silver</p>
                <p className="text-2xl font-bold text-gray-600">{stats.silver}</p>
              </div>
              <Award className="h-8 w-8 text-gray-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Bronze</p>
                <p className="text-2xl font-bold text-orange-600">{stats.bronze}</p>
              </div>
              <Award className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Visits</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalVisits}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₦{(stats.totalRevenue/1000).toFixed(0)}K</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New This Month</p>
                <p className="text-2xl font-bold text-purple-600">{stats.newThisMonth}</p>
              </div>
              <UserPlus className="h-8 w-8 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedQueueStatus} onValueChange={setSelectedQueueStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Queue Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">With Active Ticket</SelectItem>
                <SelectItem value="inactive">No Active Ticket</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchCustomers}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Queue Status</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Satisfaction</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {customer.avatar || customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={tierColors[customer.tier]}>
                      {customer.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[customer.status]}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getQueueStatusBadge(customer)}
                      {customer.currentQueueStatus?.hasActiveTicket && (
                        <p className="text-xs text-gray-500">
                          {customer.currentQueueStatus.ticketNumber}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalVisits}</TableCell>
                  <TableCell>₦{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={customer.satisfaction} className="w-16 h-2" />
                      <span className="text-sm">{customer.satisfaction}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedCustomer(customer);
                        setShowDetailsDialog(true);
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedCustomer(customer);
                        setShowEditDialog(true);
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => {
                        setSelectedCustomer(customer);
                        setShowDeleteDialog(true);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Showing {filteredCustomers.length} of {customers.length} customers</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>
              Complete customer information and history
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                      {selectedCustomer.avatar || selectedCustomer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                    <p className="text-gray-500">Customer since {new Date(selectedCustomer.joinDate).getFullYear()}</p>
                    <div className="flex space-x-2 mt-2">
                      <Badge className={tierColors[selectedCustomer.tier]}>
                        {selectedCustomer.tier}
                      </Badge>
                      <Badge className={statusColors[selectedCustomer.status]}>
                        {selectedCustomer.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Create Appointment
                  </Button>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedCustomer.totalVisits}</p>
                    <p className="text-xs text-gray-500">Total Visits</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">₦{(selectedCustomer.totalSpent/1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500">Total Spent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{selectedCustomer.satisfaction}%</p>
                    <p className="text-xs text-gray-500">Satisfaction</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">0</p>
                    <p className="text-xs text-gray-500">This Month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCustomer.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCustomer.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCustomer.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedCustomer.occupation}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Birthday: {selectedCustomer.birthday}
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Preferences & Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Notification Preferences</p>
                      <div className="flex space-x-2">
                        {selectedCustomer.notifications.sms && (
                          <Badge variant="outline" className="bg-green-50">📱 SMS</Badge>
                        )}
                        {selectedCustomer.notifications.email && (
                          <Badge variant="outline" className="bg-blue-50">📧 Email</Badge>
                        )}
                        {selectedCustomer.notifications.whatsapp && (
                          <Badge variant="outline" className="bg-green-50">💬 WhatsApp</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Preferred Service</p>
                      <Badge variant="outline" className="bg-purple-50">
                        {selectedCustomer.preferredService}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className="text-sm">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{selectedCustomer.notes}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">No recent activity to display</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Create a new customer profile in the system
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+234 801 234 5678" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Lagos" />
            </div>
            <div className="space-y-2">
              <Label>Occupation</Label>
              <Input placeholder="Business Owner" />
            </div>
            <div className="space-y-2">
              <Label>Birthday</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Tier</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes about customer..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Create Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update customer information and preferences
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={selectedCustomer.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={selectedCustomer.email} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue={selectedCustomer.phone} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input defaultValue={selectedCustomer.location} />
              </div>
              <div className="space-y-2">
                <Label>Occupation</Label>
                <Input defaultValue={selectedCustomer.occupation} />
              </div>
              <div className="space-y-2">
                <Label>Birthday</Label>
                <Input type="date" defaultValue={selectedCustomer.birthday} />
              </div>
              <div className="space-y-2">
                <Label>Tier</Label>
                <Select defaultValue={selectedCustomer.tier}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={selectedCustomer.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Notes</Label>
                <Textarea defaultValue={selectedCustomer.notes} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedCustomer?.name}'s account? 
              This action cannot be undone. All customer data and history will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                // Handle delete
                setShowDeleteDialog(false);
              }}
            >
              Delete Customer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Customer Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Analytics</CardTitle>
          <CardDescription>
            Insights into customer behavior and segmentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier Distribution */}
            <div>
              <h3 className="font-semibold mb-4">Customer Tier Distribution</h3>
              <div className="space-y-3">
                {[
                  { tier: "Platinum", count: stats.platinum, color: "bg-purple-500" },
                  { tier: "Gold", count: stats.gold, color: "bg-yellow-500" },
                  { tier: "Silver", count: stats.silver, color: "bg-gray-500" },
                  { tier: "Bronze", count: stats.bronze, color: "bg-orange-500" }
                ].map((item) => (
                  <div key={item.tier} className="flex items-center justify-between">
                    <span className="text-sm">{item.tier}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">{item.count}</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color}`}
                          style={{ width: `${stats.total > 0 ? (item.count / stats.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Customers */}
            <div>
              <h3 className="font-semibold mb-4">Top Customers by Value</h3>
              <div className="space-y-3">
                {customers
                  .sort((a, b) => b.totalSpent - a.totalSpent)
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div key={customer.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                        <span className="text-sm font-medium">{customer.name}</span>
                      </div>
                      <span className="text-sm text-green-600 font-semibold">
                        ₦{(customer.totalSpent/1000).toFixed(0)}K
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Visit Frequency */}
            <div>
              <h3 className="font-semibold mb-4">Visit Frequency</h3>
              <div className="space-y-3">
                {customers
                  .sort((a, b) => b.totalVisits - a.totalVisits)
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div key={customer.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                        <span className="text-sm font-medium">{customer.name}</span>
                      </div>
                      <span className="text-sm text-blue-600 font-semibold">
                        {customer.totalVisits} visits
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}