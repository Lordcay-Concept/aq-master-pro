"use client";

import { useState, useEffect } from "react";
import {
  DollarSign, CreditCard, TrendingUp, TrendingDown,
  Calendar, Download, Filter, Search, Eye,
  CheckCircle, XCircle, AlertCircle, Clock,
  ArrowUp, ArrowDown, MoreVertical, FileText,
  Printer, Mail, RefreshCw, BarChart3, PieChart
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

// Types
interface PaymentStats {
  totalRevenue: number;
  revenueGrowth: number;
  transactions: number;
  transactionGrowth: number;
  averageValue: number;
  avgGrowth: number;
  pendingPayments: number;
  pendingGrowth: number;
  successfulRate: number;
  refundRate: number;
}

interface Transaction {
  id: string;
  ticket: string;
  customer: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed" | "refunded" | "free";
  date: string;
  time: string;
}

interface PaymentMethod {
  method: string;
  count: number;
  amount: number;
  percentage: number;
}

interface DailyRevenue {
  day: string;
  amount: number;
}

export default function PaymentsPage() {
  const [dateRange, setDateRange] = useState("30days");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    revenueGrowth: 12.5,
    transactions: 0,
    transactionGrowth: 8.3,
    averageValue: 0,
    avgGrowth: 5.2,
    pendingPayments: 0,
    pendingGrowth: -2.1,
    successfulRate: 0,
    refundRate: 0.5
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);

  useEffect(() => {
    fetchPaymentsData();
    const interval = setInterval(fetchPaymentsData, 30000);
    return () => clearInterval(interval);
  }, [dateRange]);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/payments?range=${dateRange}`);
      const data = await response.json();
      
      setStats(data.stats);
      setTransactions(data.transactions);
      setPaymentMethods(data.paymentMethods);
      setDailyRevenue(data.dailyRevenue);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setLoading(false);
    }
  };

  const statusColors = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-purple-100 text-purple-700",
    free: "bg-blue-100 text-blue-700"
  };

  const filteredTransactions = transactions.filter(t => 
    t.ticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.customer.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 mt-1">Manage transactions, refunds, and payment analytics</p>
        </div>
        <div className="flex space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchPaymentsData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold">₦{(stats.totalRevenue/1000).toFixed(0)}K</p>
                <p className="text-sm flex items-center mt-1 text-green-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {stats.revenueGrowth}% vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="text-3xl font-bold">{stats.transactions.toLocaleString()}</p>
                <p className="text-sm flex items-center mt-1 text-green-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {stats.transactionGrowth}% vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Value</p>
                <p className="text-3xl font-bold">₦{Math.round(stats.averageValue)}</p>
                <p className="text-sm flex items-center mt-1 text-green-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {stats.avgGrowth}% vs last period
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-3xl font-bold">{Math.round(stats.successfulRate)}%</p>
                <p className="text-sm flex items-center mt-1 text-gray-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Refund rate: {stats.refundRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Daily revenue for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-2">
              {dailyRevenue.map((day, i) => {
                const maxAmount = Math.max(...dailyRevenue.map(d => d.amount), 1);
                const heightPercent = (day.amount / maxAmount) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg"
                      style={{ height: `${Math.max(heightPercent, 5)}px`, minHeight: '20px' }}
                    />
                    <div className="text-xs mt-2 text-gray-600">{day.day}</div>
                    <div className="text-xs font-semibold">₦{(day.amount/1000).toFixed(0)}K</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Breakdown by transaction volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.method} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{method.method}</span>
                    <span className="font-medium">{method.percentage}%</span>
                  </div>
                  <Progress value={method.percentage} className="h-2" />
                  <p className="text-xs text-gray-500">{method.count.toLocaleString()} transactions</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>View and manage all payment transactions</CardDescription>
          <div className="flex items-center space-x-2 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by ticket or customer..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={fetchPaymentsData}>
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
                <TableHead>Date & Time</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono font-medium">{tx.ticket}</TableCell>
                  <TableCell>{tx.customer}</TableCell>
                  <TableCell>
                    <div>
                      <div>{tx.date}</div>
                      <div className="text-xs text-gray-500">{tx.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>{tx.method}</TableCell>
                  <TableCell className={tx.amount > 0 ? "font-medium" : "text-gray-500"}>
                    {tx.amount > 0 ? `₦${tx.amount.toLocaleString()}` : "Free"}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[tx.status]}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}