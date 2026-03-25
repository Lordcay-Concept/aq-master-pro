"use client";

import { useState, useEffect } from "react";
import {
  Settings, Plus, Edit, Trash2, Copy, Clock,
  DollarSign, Users, Tag, Archive, Power,
  TrendingUp, Filter, Search, Download, Eye,
  CheckCircle, XCircle, AlertCircle, BarChart3, RefreshCw
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  priority: "normal" | "high" | "urgent";
  isActive: boolean;
  createdAt: string;
}

interface ServiceStats {
  totalServices: number;
  activeServices: number;
  totalQueues: number;
  avgWaitTime: number;
  revenue: number;
  satisfaction: number;
}

export default function ServiceManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "General Services",
    description: "",
    duration: 30,
    price: 0,
    priority: "normal" as "normal" | "high" | "urgent",
    isActive: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchServices();
        setShowAddDialog(false);
        setFormData({
          name: "",
          category: "General Services",
          description: "",
          duration: 30,
          price: 0,
          priority: "normal",
          isActive: true
        });
        toast.success("Service added successfully");
      } else {
        toast.error("Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    }
  };

  const handleEditService = async () => {
    if (!selectedService) return;
    
    try {
      const response = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: selectedService._id,
          ...formData
        })
      });

      if (response.ok) {
        await fetchServices();
        setShowEditDialog(false);
        toast.success("Service updated successfully");
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;
    
    try {
      const response = await fetch(`/api/admin/services?id=${selectedService._id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        await fetchServices();
        setShowDeleteDialog(false);
        toast.success("Service deleted successfully");
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  const toggleServiceStatus = async (service: Service) => {
  try {
    const response = await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: service._id,
        name: service.name,
        description: service.description,
        duration: service.duration,
        price: service.price,
        category: service.category,
        priority: service.priority,
        isActive: !service.isActive
      })
    });

    if (response.ok) {
      await fetchServices();
      toast.success(`Service ${!service.isActive ? "activated" : "deactivated"}`);
    }
  } catch (error) {
    console.error("Error toggling service status:", error);
    toast.error("Failed to update service status");
  }
};

  const categories = [
    "General Services",
    "Financial Services",
    "Technical Support",
    "Customer Care",
    "Administrative"
  ];

  const stats: ServiceStats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.isActive).length,
    totalQueues: 0,
    avgWaitTime: Math.round(services.reduce((sum, s) => sum + s.duration, 0) / (services.length || 1)),
    revenue: services.reduce((sum, s) => sum + s.price, 0),
    satisfaction: 85
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-500 mt-1">Configure and manage all service types and queue settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchServices}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Services</p>
                <p className="text-2xl font-bold">{stats.totalServices}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Services</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeServices}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Wait Time</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgWaitTime} min</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500 opacity-80" />
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
                <p className="text-sm text-gray-500">In Queue</p>
                <p className="text-2xl font-bold text-orange-600">0</p>
              </div>
              <Users className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Satisfaction</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.satisfaction}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-500 opacity-80" />
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
                placeholder="Search services..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchServices}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Catalog</CardTitle>
          <CardDescription>
            Manage all available services, their configurations, and queue settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      {service.duration} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      {service.price === 0 ? "Free" : `₦${service.price.toLocaleString()}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      service.priority === "urgent" ? "bg-red-100 text-red-700" :
                      service.priority === "high" ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }>
                      {service.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => toggleServiceStatus(service)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedService(service);
                        setFormData({
                          name: service.name,
                          category: service.category,
                          description: service.description,
                          duration: service.duration,
                          price: service.price,
                          priority: service.priority,
                          isActive: service.isActive
                        });
                        setShowEditDialog(true);
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => {
                        setSelectedService(service);
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

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No services found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service type for your queue management system
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Service Name</Label>
              <Input 
                placeholder="e.g., General Consultation"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Describe the service..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input 
                type="number" 
                placeholder="30"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label>Price (₦)</Label>
              <Input 
                type="number" 
                placeholder="5000"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select value={formData.priority} onValueChange={(v: any) => setFormData({...formData, priority: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={handleAddService}>
              Create Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service configuration and settings
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Service Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input 
                type="number" 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label>Price (₦)</Label>
              <Input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select value={formData.priority} onValueChange={(v: any) => setFormData({...formData, priority: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={handleEditService}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the service "{selectedService?.name}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteService}
            >
              Delete Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}