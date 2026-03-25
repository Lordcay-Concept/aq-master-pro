"use client";

import { useState, useEffect } from "react";
import {
  Calendar, Clock, Users, CheckCircle, XCircle,
  AlertCircle, Filter, Search, Download, Eye,
  Edit, Trash2, Plus, ChevronLeft, ChevronRight,
  Mail, Phone, User, Tag, DollarSign, FileText,
  BarChart3, TrendingUp, CalendarDays, CalendarCheck,
  CalendarX, Clock3, Bell, MessageSquare, RefreshCw
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
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

// Types
interface Appointment {
  id: string;
  ticketNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  service: {
    id: string;
    name: string;
    type: string;
  };
  date: string;
  time: string;
  duration: number;
  status: "confirmed" | "waiting" | "completed" | "cancelled" | "pending";
  payment: "paid" | "pending" | "unpaid" | "refunded" | "free";
  amount: number;
  notes?: string;
  createdAt: string;
  notifications: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
}

interface AppointmentStats {
  total: number;
  today: number;
  confirmed: number;
  waiting: number;
  completed: number;
  cancelled: number;
  revenue: number;
  noShow: number;
  satisfaction: number;
}

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedService, setSelectedService] = useState("all");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<AppointmentStats>({
    total: 0,
    today: 0,
    confirmed: 0,
    waiting: 0,
    completed: 0,
    cancelled: 0,
    revenue: 0,
    noShow: 0,
    satisfaction: 0
  });
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/appointments");
      const data = await response.json();
      
      setAppointments(data.appointments);
      setStats(data.stats);
      setCurrentPage(1); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    const matchesService = selectedService === "all" || app.service.name === selectedService;
    const matchesDate = selectedDate === "all" || 
                       (selectedDate === "today" && app.date === new Date().toISOString().split('T')[0]) ||
                       (selectedDate === "tomorrow" && app.date === new Date(Date.now() + 86400000).toISOString().split('T')[0]) ||
                       (selectedDate === "week" && app.date >= new Date().toISOString().split('T')[0]);
    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const statusColors = {
    confirmed: "bg-green-100 text-green-700 border-green-200",
    waiting: "bg-orange-100 text-orange-700 border-orange-200",
    completed: "bg-blue-100 text-blue-700 border-blue-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200"
  };

  const paymentStatusColors = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    unpaid: "bg-gray-100 text-gray-700",
    refunded: "bg-purple-100 text-purple-700",
    free: "bg-blue-100 text-blue-700"
  };

  const handleReschedule = (id: string, newDate: string, newTime: string) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, date: newDate, time: newTime, status: "confirmed" } : a
    ));
    setShowRescheduleDialog(false);
  };

  const handleCancel = (id: string) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: "cancelled" } : a
    ));
    setShowCancelDialog(false);
  };

  const handleSendReminder = (id: string) => {
    console.log("Sending reminder for appointment:", id);
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
          <h1 className="text-3xl font-bold text-gray-900">Appointments Management</h1>
          <p className="text-gray-500 mt-1">Manage all appointments, scheduling, and customer bookings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchAppointments}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
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
              <Calendar className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today</p>
                <p className="text-2xl font-bold text-orange-600">{stats.today}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CalendarCheck className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Waiting</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.waiting}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
              <CalendarX className="h-8 w-8 text-red-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-green-600">₦{(stats.revenue/1000).toFixed(1)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Satisfaction</p>
                <p className="text-2xl font-bold text-purple-600">{stats.satisfaction}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500 opacity-80" />
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
                placeholder="Search by ticket, customer, email..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {Array.from(new Set(appointments.map(a => a.service.name))).map(service => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment List</CardTitle>
          <CardDescription>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAppointments.length)} of {filteredAppointments.length} appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Notifications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono font-bold">
                      {appointment.ticketNumber}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {appointment.customer.avatar || appointment.customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.customer.name}</p>
                        <p className="text-xs text-gray-500">{appointment.customer.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.service.name}</p>
                      <p className="text-xs text-gray-500">{appointment.duration} min</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-xs text-gray-500">{appointment.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[appointment.status]}>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={paymentStatusColors[appointment.payment]}>
                      {appointment.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {appointment.amount > 0 ? `₦${appointment.amount.toLocaleString()}` : "Free"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {appointment.notifications.sms && (
                        <Badge variant="outline" className="bg-green-50">📱</Badge>
                      )}
                      {appointment.notifications.email && (
                        <Badge variant="outline" className="bg-blue-50">📧</Badge>
                      )}
                      {appointment.notifications.whatsapp && (
                        <Badge variant="outline" className="bg-green-50">💬</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowDetailsDialog(true);
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleSendReminder(appointment.id)}>
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowRescheduleDialog(true);
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowCancelDialog(true);
                      }}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {currentAppointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}

          {/* Pagination */}
          {filteredAppointments.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredAppointments.length)} of {filteredAppointments.length} appointments
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {getPageNumbers().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={currentPage === page ? "bg-blue-600 text-white" : ""}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Complete information about this appointment
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge className={statusColors[selectedAppointment.status]}>
                  {selectedAppointment.status}
                </Badge>
                <Badge variant="outline" className="font-mono text-lg">
                  {selectedAppointment.ticketNumber}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {selectedAppointment.customer.avatar || selectedAppointment.customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedAppointment.customer.name}</p>
                        <p className="text-sm text-gray-500">Customer ID: {selectedAppointment.customer.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedAppointment.customer.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedAppointment.customer.phone}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Date: {selectedAppointment.date}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Time: {selectedAppointment.time} ({selectedAppointment.duration} min)
                    </div>
                    <div className="flex items-center text-sm">
                      <Tag className="h-4 w-4 mr-2 text-gray-400" />
                      Service: {selectedAppointment.service.name}
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      Amount: {selectedAppointment.amount > 0 ? `₦${selectedAppointment.amount.toLocaleString()}` : "Free"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className="text-sm">Notes & Special Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{selectedAppointment.notes || "No notes provided"}</p>
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className="text-sm">Appointment Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        <div>
                          <p className="text-sm font-medium">Created</p>
                          <p className="text-xs text-gray-500">{new Date(selectedAppointment.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Close</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time for this appointment
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>New Date</Label>
                <Input type="date" min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="space-y-2">
                <Label>New Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="09:30">09:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="10:30">10:30 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="12:30">12:30 PM</SelectItem>
                    <SelectItem value="13:00">01:00 PM</SelectItem>
                    <SelectItem value="13:30">01:30 PM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="14:30">02:30 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="15:30">03:30 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reason for rescheduling (optional)</Label>
                <Textarea placeholder="Provide reason..." />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleDialog(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment for {selectedAppointment?.customer?.name}?
              {selectedAppointment?.payment === "paid" && " A refund will be processed automatically."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-2">
            <Label>Reason for cancellation</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer requested</SelectItem>
                <SelectItem value="no-show">No-show</SelectItem>
                <SelectItem value="emergency">Emergency/Closure</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => selectedAppointment && handleCancel(selectedAppointment.id)}
            >
              Yes, Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Appointment Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Analytics</CardTitle>
          <CardDescription>
            Trends and patterns in appointment scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <div>
              <h3 className="font-semibold mb-4">Status Distribution</h3>
              <div className="space-y-3">
                {Object.entries({
                  confirmed: stats.confirmed,
                  waiting: stats.waiting,
                  completed: stats.completed,
                  cancelled: stats.cancelled
                }).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{status}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">{count}</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            status === 'confirmed' ? 'bg-green-500' :
                            status === 'waiting' ? 'bg-orange-500' :
                            status === 'completed' ? 'bg-blue-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Trends */}
            <div>
              <h3 className="font-semibold mb-4">Weekly Appointment Trends</h3>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                  const dayCount = appointments.filter(app => {
                    const appDate = new Date(app.date);
                    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    return dayNames[appDate.getDay()] === day;
                  }).length;
                  return (
                    <Card key={day} className="text-center">
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm">{day}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <p className="text-2xl font-bold text-blue-600">{dayCount}</p>
                        <p className="text-xs text-gray-500">appointments</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Popular Time Slots */}
            <div className="col-span-2">
              <h3 className="font-semibold mb-4">Popular Time Slots</h3>
              <div className="grid grid-cols-4 gap-4">
                {['09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00'].map(slot => {
                  const slotCount = appointments.filter(app => {
                    const hour = parseInt(app.time.split(':')[0]);
                    if (slot === '09:00-11:00') return hour >= 9 && hour < 11;
                    if (slot === '11:00-13:00') return hour >= 11 && hour < 13;
                    if (slot === '13:00-15:00') return hour >= 13 && hour < 15;
                    if (slot === '15:00-17:00') return hour >= 15 && hour < 17;
                    return false;
                  }).length;
                  const total = appointments.filter(a => {
                    const h = parseInt(a.time.split(':')[0]);
                    return h >= 9 && h < 17;
                  }).length;
                  const percentage = total > 0 ? (slotCount / total) * 100 : 0;
                  return (
                    <Card key={slot}>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm font-medium">{slot}</p>
                        <p className="text-2xl font-bold text-purple-600">{slotCount}</p>
                        <p className="text-xs text-gray-500">{Math.round(percentage)}% of appointments</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}