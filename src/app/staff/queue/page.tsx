"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Search, Filter, ChevronRight,
  Clock, Users, Phone, Mail, MessageSquare,
  Play, SkipForward, XCircle, CheckCircle,
  AlertCircle, Download, Printer, Eye,
  LayoutDashboard, History, Settings, UserCog,
  RefreshCw
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QueueTicket {
  id: string;
  number: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    email?: string;
  };
  service: {
    id: string;
    name: string;
    duration: number;
  };
  priority: "normal" | "vip" | "elderly" | "urgent";
  createdAt: string;
  estimatedWait: number;
  status: "waiting" | "calling" | "serving" | "completed" | "cancelled";
  counter?: number;
  notes?: string;
  queuePosition: number;
}

export default function StaffQueuePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [queue, setQueue] = useState<QueueTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<QueueTicket | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callingNext, setCallingNext] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: string }>({
    show: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    fetchQueueData();
    const interval = setInterval(fetchQueueData, 10000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  const fetchQueueData = async () => {
    try {
      const response = await fetch("/api/staff/queue");
      const data = await response.json();
      if (Array.isArray(data)) {
        setQueue(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching queue:", error);
      setLoading(false);
    }
  };

  const handleCallNext = async () => {
    setCallingNext(true);
    try {
      const response = await fetch("/api/staff/queue/call-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (data.success) {
        fetchQueueData();
        showNotification(`Called ${data.ticket.number} - ${data.ticket.customer.name}`, "success");
      } else {
        showNotification(data.error || "No tickets in queue", "error");
      }
    } catch (error) {
      console.error("Error calling next:", error);
      showNotification("Failed to call next ticket", "error");
    } finally {
      setCallingNext(false);
    }
  };

  const handleCallTicket = async (ticketId: string) => {
    try {
      const response = await fetch(`/api/staff/queue/call/${ticketId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (data.success) {
        fetchQueueData();
        setShowCallDialog(false);
        showNotification(`Called ticket ${data.ticket.number}`, "success");
      }
    } catch (error) {
      console.error("Error calling ticket:", error);
      showNotification("Failed to call ticket", "error");
    }
  };

  const handleCompleteTicket = async (ticketId: string) => {
    try {
      const response = await fetch(`/api/staff/queue/complete/${ticketId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: selectedTicket?.notes || "" })
      });
      const data = await response.json();
      if (data.success) {
        fetchQueueData();
        setShowDetailsDialog(false);
        showNotification("Ticket completed successfully", "success");
      }
    } catch (error) {
      console.error("Error completing ticket:", error);
      showNotification("Failed to complete ticket", "error");
    }
  };

  const handleSkipTicket = async (ticketId: string) => {
    try {
      const response = await fetch("/api/staff/ticket/skip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId })
      });
      const data = await response.json();
      if (data.success) {
        fetchQueueData();
        setShowDetailsDialog(false);
        showNotification("Ticket skipped successfully", "success");
      }
    } catch (error) {
      console.error("Error skipping ticket:", error);
      showNotification("Failed to skip ticket", "error");
    }
  };

  const handleNoShowTicket = async (ticketId: string) => {
    try {
      const response = await fetch("/api/staff/ticket/no-show", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, reason: "Customer did not show up" })
      });
      const data = await response.json();
      if (data.success) {
        fetchQueueData();
        setShowDetailsDialog(false);
        showNotification("Ticket marked as no-show", "success");
      }
    } catch (error) {
      console.error("Error marking no-show:", error);
      showNotification("Failed to mark no-show", "error");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'vip': return 'bg-purple-100 text-purple-700';
      case 'elderly': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'calling': return 'bg-yellow-100 text-yellow-700';
      case 'serving': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredQueue = queue.filter(ticket => {
    const matchesSearch = ticket.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority;
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <Alert className={`${
            notification.type === 'success' ? 'bg-green-50 border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          } shadow-lg`}>
            <AlertDescription className={`flex items-center ${
              notification.type === 'success' ? 'text-green-700' :
              notification.type === 'error' ? 'text-red-700' :
              'text-blue-700'
            }`}>
              {notification.type === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
              {notification.type === 'error' && <AlertCircle className="h-4 w-4 mr-2" />}
              {notification.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/staff/dashboard">
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/staff/history">
                <Button variant="ghost" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={fetchQueueData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Waiting</p>
                  <p className="text-2xl font-bold">{queue.filter(t => t.status === 'waiting').length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Calling</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {queue.filter(t => t.status === 'calling').length}
                  </p>
                </div>
                <Play className="h-8 w-8 text-yellow-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Serving</p>
                  <p className="text-2xl font-bold text-green-600">
                    {queue.filter(t => t.status === 'serving').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg Wait</p>
                  <p className="text-2xl font-bold">
                    {Math.round(queue.filter(t => t.status === 'waiting')
                      .reduce((acc, t) => acc + (t.estimatedWait || 0), 0) / 
                      (queue.filter(t => t.status === 'waiting').length || 1))} min
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Call Next</p>
                  <Button 
                    onClick={handleCallNext} 
                    disabled={callingNext}
                    className="bg-green-600 hover:bg-green-700 w-full"
                  >
                    {callingNext ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {callingNext ? "Calling..." : "Call Next"}
                  </Button>
                </div>
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
                  placeholder="Search by ticket or customer..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="elderly">Elderly</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="calling">Calling</SelectItem>
                  <SelectItem value="serving">Serving</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Queue Table */}
        <Card>
          <CardHeader>
            <CardTitle>Current Queue</CardTitle>
            <CardDescription>{filteredQueue.length} tickets found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Wait Time</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Counter</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQueue.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {ticket.number}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {ticket.customer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{ticket.customer.name}</span>
                      </div>
                      <p className="text-xs text-gray-500">{ticket.customer.phone}</p>
                    </TableCell>
                    <TableCell>{ticket.service.name}</TableCell>
                    <TableCell>{ticket.service.duration} min</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" />
                        {ticket.estimatedWait} min
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(ticket.createdAt).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.counter || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowDetailsDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {ticket.status === 'waiting' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowCallDialog(true);
                            }}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {ticket.status === 'calling' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                            onClick={() => handleCompleteTicket(ticket.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>
              Complete information about this ticket
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="text-lg px-3 py-1">{selectedTicket.number}</Badge>
                <Badge className={getStatusColor(selectedTicket.status)}>
                  {selectedTicket.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                  <p className="text-lg font-semibold">{selectedTicket.customer.name}</p>
                  <p className="text-sm">{selectedTicket.customer.phone}</p>
                  {selectedTicket.customer.email && (
                    <p className="text-sm">{selectedTicket.customer.email}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Service</h4>
                  <p className="font-semibold">{selectedTicket.service.name}</p>
                  <p className="text-sm">{selectedTicket.service.duration} min duration</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Queue Position</h4>
                  <p className="font-semibold">#{selectedTicket.queuePosition}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estimated Wait</h4>
                  <p className="font-semibold">{selectedTicket.estimatedWait} minutes</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                  <Badge className={getPriorityColor(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Created</h4>
                  <p>{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedTicket.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                  <p className="text-sm bg-gray-50 p-2 rounded">{selectedTicket.notes}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
                {selectedTicket.status === 'waiting' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      onClick={() => handleSkipTicket(selectedTicket.id)}
                    >
                      <SkipForward className="h-4 w-4 mr-2" />
                      Skip
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleNoShowTicket(selectedTicket.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      No Show
                    </Button>
                    <Button onClick={() => {
                      setShowDetailsDialog(false);
                      setShowCallDialog(true);
                    }}>
                      Call Ticket
                    </Button>
                  </>
                )}
                {selectedTicket.status === 'calling' && (
                  <Button onClick={() => handleCompleteTicket(selectedTicket.id)}>
                    Complete Service
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Call Ticket Dialog */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Ticket</DialogTitle>
            <DialogDescription>
              Call the next customer to your counter
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4 py-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  {selectedTicket.number}
                </p>
                <p className="text-lg">{selectedTicket.customer.name}</p>
                <p className="text-sm text-gray-500">{selectedTicket.customer.phone}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Service: {selectedTicket.service.name} ({selectedTicket.service.duration} min)
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCallDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleCallTicket(selectedTicket.id)}>
                  Call Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}