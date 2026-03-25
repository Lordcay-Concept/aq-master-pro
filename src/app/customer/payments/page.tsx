"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard, Download, Eye, ArrowLeft,
  CheckCircle, XCircle, Clock, Filter,
  Search, Calendar, DollarSign, AlertCircle
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
import { toast } from "sonner";

interface Payment {
  _id: string;
  id: string;
  date: string;
  time: string;
  service: string;
  ticketNumber: string;
  amount: number;
  method: "Card" | "Bank Transfer" | "Cash" | "Mobile Money";
  status: "completed" | "pending" | "failed" | "refunded";
  reference: string;
}

export default function CustomerPaymentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalTransactions: 0,
    successful: 0,
    pending: 0
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/customer/payments");
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const paymentsData = data.payments || [];
      
      const transformedPayments = paymentsData.map((payment: any) => ({
        _id: payment._id,
        id: payment.id || payment._id,
        date: payment.date,
        time: payment.time,
        service: payment.serviceName || payment.service || "Service",
        ticketNumber: payment.ticketNumber,
        amount: payment.amount || 0,
        method: payment.paymentMethod === "card" ? "Card" : 
                payment.paymentMethod === "bank_transfer" ? "Bank Transfer" :
                payment.paymentMethod === "mobile_money" ? "Mobile Money" : "Card",
        status: payment.status === "success" ? "completed" : 
                payment.status === "pending" ? "pending" :
                payment.status === "failed" ? "failed" : "refunded",
        reference: payment.reference || payment.paymentReference || ""
      }));
      
      setPayments(transformedPayments);
      
      setStats({
        totalSpent: transformedPayments.reduce((acc: number, p: Payment) => 
          acc + (p.status === "completed" ? p.amount : 0), 0),
        totalTransactions: transformedPayments.length,
        successful: transformedPayments.filter((p: Payment) => p.status === "completed").length,
        pending: transformedPayments.filter((p: Payment) => p.status === "pending").length
      });
      
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Failed to load payment history");
      toast.error("Failed to load payment history");
      setPayments([]);
      setStats({
        totalSpent: 0,
        totalTransactions: 0,
        successful: 0,
        pending: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-purple-100 text-purple-700"
  };

  const methodIcons = {
    "Card": "💳",
    "Bank Transfer": "🏦",
    "Cash": "💵",
    "Mobile Money": "📱"
  };

  const filteredPayments = payments.filter(p => 
    p.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Payments</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchPayments} className="bg-blue-600 text-white">
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
              <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
            </div>
            <Button variant="outline" size="sm" onClick={fetchPayments}>
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
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-3xl font-bold text-green-600">₦{(stats.totalSpent/1000).toFixed(1)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Transactions</p>
                  <p className="text-3xl font-bold">{stats.totalTransactions}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Successful</p>
                  <p className="text-3xl font-bold text-green-600">{stats.successful}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500 opacity-80" />
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
                  placeholder="Search by ticket or reference..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchPayments}>
                <Filter className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Transactions</CardTitle>
            <CardDescription>
              {filteredPayments.length} transactions found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div>{payment.date}</div>
                        <div className="text-xs text-gray-500">{payment.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{payment.ticketNumber}</TableCell>
                    <TableCell>{payment.service}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{methodIcons[payment.method]}</span>
                        <span className="text-sm">{payment.method}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ₦{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[payment.status]}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No payment transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}