"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar, Clock, CreditCard, Star,
  Filter, Search, Download, Eye,
  CheckCircle, XCircle, AlertCircle,
  ChevronLeft, ChevronRight, ArrowLeft,
  User, Phone, Mail, MapPin, Tag, DollarSign,
  MessageSquare, QrCode, Printer
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
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Appointment {
  _id: string;
  id: string;
  date: string;
  time: string;
  service: string;
  ticketNumber: string;
  status: "completed" | "cancelled" | "pending" | "waiting";
  amount: number;
  rating: number | null;
  feedback?: string;
  createdAt: string;
  startTime: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
  paymentReference?: string;
  queuePosition?: number;
  estimatedWaitTime?: number;
}

export default function CustomerHistoryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Appointment | null>(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    cancelled: 0,
    totalSpent: 0,
    avgRating: 0
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/customer/appointments");
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const appointmentsData = data.appointments || [];
      
      const transformedAppointments = appointmentsData.map((apt: any) => ({
        _id: apt._id,
        id: apt.id || apt._id,
        date: apt.date,
        time: apt.time,
        service: apt.serviceName || apt.service?.name || "Service",
        ticketNumber: apt.ticketNumber,
        status: apt.status === "completed" ? "completed" : 
                apt.status === "cancelled" ? "cancelled" : 
                apt.status === "waiting" ? "waiting" : "pending",
        amount: apt.amountPaid || apt.amount || 0,
        rating: apt.satisfaction || null,
        feedback: apt.feedbackComment || "",
        createdAt: apt.createdAt,
        startTime: apt.startTime,
        customer: apt.customer || null,
        paymentReference: apt.paymentReference,
        queuePosition: apt.queuePosition,
        estimatedWaitTime: apt.estimatedWaitTime
      }));
      
      setAppointments(transformedAppointments);
      
      const completed = transformedAppointments.filter((a: Appointment) => a.status === "completed").length;
      const cancelled = transformedAppointments.filter((a: Appointment) => a.status === "cancelled").length;
      const totalSpent = transformedAppointments.reduce((acc: number, a: Appointment) => 
        acc + (a.status === "completed" ? a.amount : 0), 0);
      
      const ratedAppointments = transformedAppointments.filter((a: Appointment) => a.rating !== null);
      const avgRating = ratedAppointments.length > 0 
        ? Math.round(ratedAppointments.reduce((acc: number, a: Appointment) => acc + (a.rating || 0), 0) / ratedAppointments.length)
        : 0;

      setStats({
        total: transformedAppointments.length,
        completed,
        cancelled,
        totalSpent,
        avgRating
      });
      
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments. Please try again.");
      toast.error("Failed to load appointments");
      setAppointments([]);
      setStats({
        total: 0,
        completed: 0,
        cancelled: 0,
        totalSpent: 0,
        avgRating: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = (appointment: Appointment) => {
    setSelectedTicket(appointment);
    setShowTicketDialog(true);
  };

  const handlePrintTicket = () => {
    window.print();
    toast.info("Sending to printer...");
  };

  const statusColors = {
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    waiting: "bg-blue-100 text-blue-700"
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completed': return "bg-green-100 text-green-700 border-green-200";
      case 'cancelled': return "bg-red-100 text-red-700 border-red-200";
      case 'pending': return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case 'waiting': return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading History</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchAppointments} className="bg-blue-600 text-white">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Appointment History</h1>
            </div>
            <Button variant="outline" size="sm" onClick={fetchAppointments}>
              <Download className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Appointments</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-3xl font-bold text-purple-600">₦{(stats.totalSpent/1000).toFixed(1)}K</p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Average Rating</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}/5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500 opacity-80 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ticket or service..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchAppointments}>
                <Filter className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              {filteredAppointments.length} appointments found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-mono font-medium">{apt.ticketNumber}</TableCell>
                    <TableCell>{apt.service}</TableCell>
                    <TableCell>
                      <div>
                        <div>{apt.date}</div>
                        <div className="text-xs text-gray-500">{apt.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[apt.status]}>
                        {apt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className={apt.amount > 0 ? "font-medium" : "text-gray-500"}>
                      {apt.amount > 0 ? `₦${apt.amount.toLocaleString()}` : "Free"}
                    </TableCell>
                    <TableCell>
                      {apt.rating !== null ? (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (apt.rating as number) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewTicket(apt)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments found</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">Showing {filteredAppointments.length} of {appointments.length} appointments</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Details Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Ticket Details</DialogTitle>
            <DialogDescription>
              Complete information about your appointment
            </DialogDescription>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="space-y-6 py-4">
              {/* Ticket Header */}
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="text-lg px-4 py-2 font-mono">
                    {selectedTicket.ticketNumber}
                  </Badge>
                </div>
                <Badge className={getStatusBadgeClass(selectedTicket.status)}>
                  {selectedTicket.status === "completed" && "✓ Completed"}
                  {selectedTicket.status === "waiting" && "⏳ Waiting"}
                  {selectedTicket.status === "cancelled" && "✗ Cancelled"}
                  {selectedTicket.status === "pending" && "⏰ Pending"}
                </Badge>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-blue-600 mb-1">Service</p>
                  <p className="font-semibold text-lg">{selectedTicket.service}</p>
                  {selectedTicket.estimatedWaitTime && (
                    <p className="text-sm text-gray-600 mt-1">Est. duration: {selectedTicket.estimatedWaitTime} minutes</p>
                  )}
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-purple-600 mb-1">Queue Position</p>
                  <p className="font-semibold text-3xl">#{selectedTicket.queuePosition || "--"}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {selectedTicket.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time</p>
                  <p className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {selectedTicket.time}
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              {selectedTicket.amount > 0 && (
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-green-600 mb-1">Payment</p>
                  <p className="font-semibold text-xl">₦{selectedTicket.amount.toLocaleString()}</p>
                  {selectedTicket.paymentReference && (
                    <p className="text-xs text-gray-500 mt-1">Ref: {selectedTicket.paymentReference}</p>
                  )}
                </div>
              )}

              {/* Customer Information */}
              {selectedTicket.customer && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Customer Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedTicket.customer.name}
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedTicket.customer.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedTicket.customer.phone}
                    </p>
                  </div>
                </div>
              )}

              {/* Feedback */}
              {selectedTicket.rating && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                    Your Rating
                  </h4>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < (selectedTicket.rating || 0) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  {selectedTicket.feedback && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700 italic">
                        "{selectedTicket.feedback}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              <Separator />

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={handlePrintTicket}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={() => setShowTicketDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}