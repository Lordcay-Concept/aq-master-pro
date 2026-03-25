"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, UserPlus, UserCheck, UserX, Clock,
  Mail, Phone, Calendar, Award, TrendingUp,
  Filter, Download, MoreVertical, Search,
  CheckCircle, XCircle, AlertCircle, Shield,
  BarChart3, Star, Edit, Trash2, Eye, RefreshCw
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
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "sonner";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Types
interface StaffMember {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "pending" | "on-leave";
  joinDate: string;
  createdAt: string;
  performance?: number;
  customersServed?: number;
  avgTime?: string;
  satisfaction?: number;
  experience?: string;
  qualifications?: string[];
  appliedDate?: string;
}

interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  pendingApprovals: number;
  onLeave: number;
  averagePerformance: number;
  totalCustomersServed: number;
}

export default function StaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [pendingStaff, setPendingStaff] = useState<StaffMember[]>([]);
  const [activeStaff, setActiveStaff] = useState<StaffMember[]>([]);
  const [stats, setStats] = useState<StaffStats>({
    totalStaff: 0,
    activeStaff: 0,
    pendingApprovals: 0,
    onLeave: 0,
    averagePerformance: 0,
    totalCustomersServed: 0
  });

  const departments = [
    "All Departments",
    "Customer Service",
    "Operations",
    "IT Support",
    "Management",
    "Technical Support"
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchStaffMembers(),
        fetchStaffStats()
      ]);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      toast.error("Failed to load staff data");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const response = await fetch("/api/admin/staff");
      if (!response.ok) throw new Error("Failed to fetch staff");
      const data = await response.json();
      
      const pending = data.filter((staff: StaffMember) => staff.status === "pending");
      const active = data.filter((staff: StaffMember) => staff.status === "active");
      const inactive = data.filter((staff: StaffMember) => staff.status === "inactive");
      const onLeave = data.filter((staff: StaffMember) => staff.status === "on-leave");
      
      setPendingStaff(pending);
      setActiveStaff(active);
      
      setStats(prev => ({
        ...prev,
        totalStaff: data.length,
        activeStaff: active.length,
        pendingApprovals: pending.length,
        onLeave: onLeave.length
      }));
      
    } catch (error) {
      console.error("Error fetching staff:", error);
      setPendingStaff([]);
      setActiveStaff([]);
    }
  };

  const fetchStaffStats = async () => {
    try {
      const response = await fetch("/api/admin/staff/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats({
        totalStaff: data.totalStaff || 0,
        activeStaff: data.activeStaff || 0,
        pendingApprovals: data.pendingApprovals || 0,
        onLeave: data.onLeave || 0,
        averagePerformance: data.averagePerformance || 0,
        totalCustomersServed: data.totalCustomersServed || 0
      });
    } catch (error) {
      console.error("Error fetching staff stats:", error);
    }
  };

  const handleApprove = async (staffId: string) => {
    try {
      const response = await fetch(`/api/admin/staff/approve/${staffId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to approve staff");
      }

      await fetchAllData();
      toast.success("Staff approved successfully");
      setShowApproveDialog(false);
      
    } catch (error) {
      console.error("Error approving staff:", error);
      toast.error(error instanceof Error ? error.message : "Failed to approve staff");
    }
  };

  const handleReject = async (staffId: string) => {
    try {
      const response = await fetch(`/api/admin/staff/reject/${staffId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to reject staff");
      }

      await fetchAllData();
      toast.success("Staff rejected successfully");
      setShowRejectDialog(false);
      
    } catch (error) {
      console.error("Error rejecting staff:", error);
      toast.error(error instanceof Error ? error.message : "Failed to reject staff");
    }
  };

  const handleViewStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setShowViewDialog(true);
  };

  const handleEditStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setShowEditDialog(true);
  };

  const handleDeleteStaff = async (staffId: string) => {
    try {
      const response = await fetch(`/api/admin/staff/${staffId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete staff");
      }

      await fetchAllData();
      toast.success("Staff member removed successfully");
      setShowDeleteDialog(false);
      
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete staff");
    }
  };

  const handleUpdateStaff = async (updatedData: Partial<StaffMember>) => {
    if (!selectedStaff) return;
    
    try {
      const response = await fetch(`/api/admin/staff/${selectedStaff._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update staff");
      }

      await fetchAllData();
      toast.success("Staff information updated successfully");
      setShowEditDialog(false);
      
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update staff");
    }
  };

  const filteredPending = pendingStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === "all" || staff.department?.toLowerCase() === selectedDepartment.toLowerCase();
    return matchesSearch && matchesDept;
  });

  const filteredActive = activeStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === "all" || staff.department?.toLowerCase() === selectedDepartment.toLowerCase();
    return matchesSearch && matchesDept;
  });

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
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-500 mt-1">Manage staff accounts, approvals, and performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchAllData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Staff</p>
                <p className="text-2xl font-bold">{stats.totalStaff}</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.activeStaff}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-2xl font-bold text-gray-600">{stats.onLeave}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <p className="text-2xl font-bold text-purple-600">{stats.averagePerformance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Customers</p>
                <p className="text-2xl font-bold">{(stats.totalCustomersServed / 1000).toFixed(1)}K</p>
              </div>
              <Users className="h-8 w-8 text-indigo-500 opacity-80" />
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
                placeholder="Search staff by name or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="customer service">Customer Service</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="it support">IT Support</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="technical support">Technical Support</SelectItem>
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

      {/* Tabs for Pending/Active Staff */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending Approvals
            {pendingStaff.length > 0 && (
              <Badge className="ml-2 bg-orange-500 text-white">{pendingStaff.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="active">Active Staff ({activeStaff.length})</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
        </TabsList>

        {/* Pending Approvals Tab */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Staff Approval Queue</CardTitle>
              <CardDescription>
                Review and approve staff account requests. {pendingStaff.length} pending approval.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPending.map((staff, index) => (
                  <motion.div
                    key={staff._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{staff.name}</h3>
                          <p className="text-sm text-gray-500">{staff.role} • {staff.department || "Not Assigned"}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 mr-1" />
                              {staff.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-1" />
                              {staff.phone || "N/A"}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              Applied: {new Date(staff.appliedDate || staff.createdAt).toLocaleDateString()}
                            </div>
                            {staff.experience && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Award className="h-4 w-4 mr-1" />
                                {staff.experience} experience
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewStaff(staff)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setShowApproveDialog(true);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setShowRejectDialog(true);
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredPending.length === 0 && (
                  <div className="text-center py-12">
                    <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No pending approvals</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Staff Tab */}
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Staff Members</CardTitle>
              <CardDescription>
                Manage your team members and view their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Customers Served</TableHead>
                    <TableHead>Avg. Time</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActive.map((staff) => (
                    <TableRow key={staff._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-gray-500">{staff.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.department || "Not Assigned"}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={staff.performance || 0} className="w-16 h-2" />
                          <span className="text-sm font-medium">{staff.performance || 0}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.customersServed?.toLocaleString() || 0}</TableCell>
                      <TableCell>{staff.avgTime || "0 min"}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{staff.satisfaction || 0}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewStaff(staff)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditStaff(staff)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setSelectedStaff(staff);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredActive.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No active staff members found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analytics Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance Analytics</CardTitle>
              <CardDescription>
                Detailed performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold">Performance Distribution</h3>
                <div className="space-y-2">
                  {activeStaff
                    .sort((a, b) => (b.performance || 0) - (a.performance || 0))
                    .map((staff, i) => (
                      <div key={staff._id} className="flex items-center space-x-4">
                        <span className="text-sm w-32 truncate">{staff.name}</span>
                        <Progress value={staff.performance || 0} className="flex-1 h-2" />
                        <span className="text-sm font-medium w-12">{staff.performance || 0}%</span>
                        {i === 0 && <Award className="h-4 w-4 text-yellow-500" />}
                      </div>
                    ))}
                </div>
                
                {activeStaff.length === 0 && (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No performance data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Staff Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Staff Details</DialogTitle>
            <DialogDescription>
              Complete information about this staff member
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                    {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedStaff.name}</h3>
                  <p className="text-gray-500">{selectedStaff.role}</p>
                  <Badge className={selectedStaff.status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                    {selectedStaff.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <p className="text-sm font-medium">{selectedStaff.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-sm font-medium">{selectedStaff.phone || "N/A"}</p>
                </div>
                <div>
                  <Label>Department</Label>
                  <p className="text-sm font-medium">{selectedStaff.department || "Not Assigned"}</p>
                </div>
                <div>
                  <Label>Join Date</Label>
                  <p className="text-sm font-medium">{new Date(selectedStaff.joinDate || selectedStaff.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedStaff.performance || 0}%</p>
                    <p className="text-xs text-gray-500">Performance</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedStaff.customersServed || 0}</p>
                    <p className="text-xs text-gray-500">Customers</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{selectedStaff.satisfaction || 0}%</p>
                    <p className="text-xs text-gray-500">Satisfaction</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>
              Update staff information and performance metrics
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateStaff({
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                role: formData.get("role") as string,
                department: formData.get("department") as string,
                performance: parseInt(formData.get("performance") as string) || 0,
                customersServed: parseInt(formData.get("customersServed") as string) || 0,
                avgTime: formData.get("avgTime") as string,
                satisfaction: parseInt(formData.get("satisfaction") as string) || 0,
              });
            }} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={selectedStaff.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={selectedStaff.email} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={selectedStaff.phone || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" defaultValue={selectedStaff.role} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select name="department" defaultValue={selectedStaff.department || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer Service">Customer Service</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="IT Support">IT Support</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Technical Support">Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performance">Performance (%)</Label>
                  <Input id="performance" name="performance" type="number" defaultValue={selectedStaff.performance} min="0" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customersServed">Customers Served</Label>
                  <Input id="customersServed" name="customersServed" type="number" defaultValue={selectedStaff.customersServed} min="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avgTime">Avg. Time</Label>
                  <Input id="avgTime" name="avgTime" defaultValue={selectedStaff.avgTime || ""} placeholder="e.g., 4.2 min" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve {selectedStaff?.name} as a staff member?
              They will gain access to the staff dashboard and queue management.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-700"
              onClick={() => selectedStaff && handleApprove(selectedStaff._id)}
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Staff Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject {selectedStaff?.name}'s application?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => selectedStaff && handleReject(selectedStaff._id)}
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-bold">{selectedStaff?.name}'s</span> account
              and remove all associated data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => selectedStaff && handleDeleteStaff(selectedStaff._id)}
            >
              Delete Staff
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster richColors position="top-right" />
    </div>
  );
}