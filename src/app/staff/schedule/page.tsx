"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight,
  LayoutDashboard, Ticket, History, UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  counter: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  breaks: {
    start: string;
    end: string;
    type: string;
  }[];
}

export default function StaffSchedulePage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  useEffect(() => {
    fetchSchedule();
  }, [currentWeek]);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(`/api/staff/schedule?week=${currentWeek.toISOString()}`);
      const data = await response.json();
      setSchedule(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setLoading(false);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
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
              <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/staff/dashboard">
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/staff/queue">
                <Button variant="ghost" size="sm">
                  <Ticket className="h-4 w-4 mr-2" />
                  Queue
                </Button>
              </Link>
              <Link href="/staff/history">
                <Button variant="ghost" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Week Navigation */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)))}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Week
              </Button>
              <h2 className="text-lg font-semibold">
                {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)))}
              >
                Next Week
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Grid */}
        <div className="grid grid-cols-7 gap-4">
          {days.map((day) => (
            <Card key={day}>
              <CardHeader className="p-3 text-center border-b">
                <CardTitle className="text-sm">{day}</CardTitle>
                <CardDescription className="text-xs">
                  {new Date(currentWeek.setDate(currentWeek.getDate() + days.indexOf(day))).getDate()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 min-h-[200px]">
                {schedule
                  .filter(s => new Date(s.date).getDay() === days.indexOf(day) + 1)
                  .map((shift) => (
                    <div
                      key={shift.id}
                      className="p-2 mb-2 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="text-xs">
                          Counter {shift.counter}
                        </Badge>
                        <Badge className={
                          shift.status === 'in-progress' ? 'bg-green-100 text-green-700' :
                          shift.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {shift.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {shift.startTime} - {shift.endTime}
                      </div>
                      {shift.breaks.length > 0 && (
                        <div className="mt-1 text-xs text-gray-500">
                          {shift.breaks.length} break(s)
                        </div>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}