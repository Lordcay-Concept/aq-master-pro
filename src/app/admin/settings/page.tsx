"use client";

import { useState, useEffect } from "react";
import {
  Settings, Bell, Mail, Phone, MessageSquare, Globe,
  Shield, Lock, Eye, EyeOff, Database, Cloud,
  Clock, Calendar, Users, CreditCard, FileText,
  Save, RefreshCw, CheckCircle, XCircle,
  Moon, Sun, Monitor, Smartphone, Tablet, Laptop,
  Wifi, WifiOff, Zap, Battery, BatteryCharging,
  HardDrive, Cpu, Activity, Server, Code, Key,
  Twitter, Facebook, Instagram, Linkedin, Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

 type SettingsSection = keyof SettingsData;

// Types 
interface SettingsData {
  general: any;
  queue: any;
  notifications: any;
  payments: any;
  security: any;
  integrations: any;
  appearance: any;
  backup: any;
  advanced: any;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showIntegrationKeys, setShowIntegrationKeys] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    general: {},
    queue: {},
    notifications: {},
    payments: {},
    security: {},
    integrations: {},
    appearance: {},
    backup: {},
    advanced: {}
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };


const updateSettings = <K extends SettingsSection>(
  section: K,
  field: string,
  value: any
) => {
  setSettings(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-500 mt-1">Configure and customize your queue management system</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={fetchSettings}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 lg:grid-cols-9 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* ==================== GENERAL SETTINGS ==================== */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic system configuration and business information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input 
                    value={settings.general?.businessName || ""}
                    onChange={(e) => updateSettings("general", "businessName", e.target.value)}
                    placeholder="Enter business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Email</Label>
                  <Input 
                    type="email"
                    value={settings.general?.businessEmail || ""}
                    onChange={(e) => updateSettings("general", "businessEmail", e.target.value)}
                    placeholder="admin@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Phone</Label>
                  <Input 
                    value={settings.general?.businessPhone || ""}
                    onChange={(e) => updateSettings("general", "businessPhone", e.target.value)}
                    placeholder="+234 123 456 7890"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input 
                    value={settings.general?.address || ""}
                    onChange={(e) => updateSettings("general", "address", e.target.value)}
                    placeholder="Business address"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <Input 
                    value={settings.general?.website || ""}
                    onChange={(e) => updateSettings("general", "website", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input 
                    value={settings.general?.logoUrl || ""}
                    onChange={(e) => updateSettings("general", "logoUrl", e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select 
                    value={settings.general?.timezone || "Africa/Lagos"} 
                    onValueChange={(v) => updateSettings("general", "timezone", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                      <SelectItem value="Africa/Cairo">Africa/Cairo (EET)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select 
                    value={settings.general?.dateFormat || "DD/MM/YYYY"} 
                    onValueChange={(v) => updateSettings("general", "dateFormat", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <Select 
                    value={settings.general?.timeFormat || "24h"} 
                    onValueChange={(v) => updateSettings("general", "timeFormat", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24-hour format</SelectItem>
                      <SelectItem value="12h">12-hour format</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select 
                    value={settings.general?.language || "en"} 
                    onValueChange={(v) => updateSettings("general", "language", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select 
                    value={settings.general?.currency || "NGN"} 
                    onValueChange={(v) => updateSettings("general", "currency", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">₦ (Nigerian Naira)</SelectItem>
                      <SelectItem value="USD">$ (US Dollar)</SelectItem>
                      <SelectItem value="EUR">€ (Euro)</SelectItem>
                      <SelectItem value="GBP">£ (British Pound)</SelectItem>
                      <SelectItem value="KES">KSh (Kenyan Shilling)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Business Hours</Label>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <Card key={day} className="text-center">
                      <CardHeader className="p-2">
                        <CardTitle className="text-xs">{day}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-2 pt-0">
                        <div className="space-y-1">
                          <Input 
                            type="time" 
                            placeholder="09:00"
                            className="h-8 text-xs"
                            value={settings.general?.[`${day.toLowerCase()}Start`] || "09:00"}
                            onChange={(e) => updateSettings("general", `${day.toLowerCase()}Start`, e.target.value)}
                          />
                          <Input 
                            type="time" 
                            placeholder="17:00"
                            className="h-8 text-xs"
                            value={settings.general?.[`${day.toLowerCase()}End`] || "17:00"}
                            onChange={(e) => updateSettings("general", `${day.toLowerCase()}End`, e.target.value)}
                          />
                          <Switch 
                            className="scale-75"
                            checked={settings.general?.[`${day.toLowerCase()}Enabled`] !== false}
                            onCheckedChange={(v) => updateSettings("general", `${day.toLowerCase()}Enabled`, v)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== QUEUE SETTINGS ==================== */}
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Queue Configuration</CardTitle>
              <CardDescription>
                Customize how queues operate and manage customer flow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Maximum Queue Length</Label>
                  <div className="flex items-center space-x-4">
                    <Slider 
                      value={[settings.queue?.maxQueueLength || 50]} 
                      onValueChange={(v) => updateSettings("queue", "maxQueueLength", v[0])}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="font-medium w-12">{settings.queue?.maxQueueLength || 50}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Default Wait Time (minutes)</Label>
                  <div className="flex items-center space-x-4">
                    <Slider 
                      value={[settings.queue?.defaultWaitTime || 15]} 
                      onValueChange={(v) => updateSettings("queue", "defaultWaitTime", v[0])}
                      max={60}
                      step={5}
                      className="flex-1"
                    />
                    <span className="font-medium w-12">{settings.queue?.defaultWaitTime || 15}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Maximum No-Show Attempts</Label>
                  <Input 
                    type="number"
                    value={settings.queue?.maxNoShowAttempts || 3}
                    onChange={(e) => updateSettings("queue", "maxNoShowAttempts", parseInt(e.target.value) || 0)}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-2">
                  <Label>No-Show Timeout (minutes)</Label>
                  <Input 
                    type="number"
                    value={settings.queue?.noShowTimeout || 10}
                    onChange={(e) => updateSettings("queue", "noShowTimeout", parseInt(e.target.value) || 0)}
                    placeholder="10"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Priority Queuing</Label>
                    <p className="text-sm text-gray-500">Enable priority-based queue management</p>
                  </div>
                  <Switch 
                    checked={settings.queue?.priorityEnabled || false}
                    onCheckedChange={(v) => updateSettings("queue", "priorityEnabled", v)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">VIP Queue</Label>
                    <p className="text-sm text-gray-500">Dedicated queue for VIP customers</p>
                  </div>
                  <Switch 
                    checked={settings.queue?.vipQueueEnabled || false}
                    onCheckedChange={(v) => updateSettings("queue", "vipQueueEnabled", v)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Elderly Priority</Label>
                    <p className="text-sm text-gray-500">Automatic priority for elderly customers</p>
                  </div>
                  <Switch 
                    checked={settings.queue?.elderlyPriority || false}
                    onCheckedChange={(v) => updateSettings("queue", "elderlyPriority", v)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Appointment Overlap</Label>
                    <p className="text-sm text-gray-500">Allow overlapping appointments</p>
                  </div>
                  <Switch 
                    checked={settings.queue?.appointmentOverlap || false}
                    onCheckedChange={(v) => updateSettings("queue", "appointmentOverlap", v)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto-Call Next</Label>
                    <p className="text-sm text-gray-500">Automatically call next customer when counter free</p>
                  </div>
                  <Switch 
                    checked={settings.queue?.autoCallNext || false}
                    onCheckedChange={(v) => updateSettings("queue", "autoCallNext", v)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Buffer Time (minutes)</Label>
                    <p className="text-sm text-gray-500">Time between appointments for cleanup</p>
                  </div>
                  <div className="w-32">
                    <Input 
                      type="number"
                      value={settings.queue?.bufferTime || 5}
                      onChange={(e) => updateSettings("queue", "bufferTime", parseInt(e.target.value) || 0)}
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== NOTIFICATION SETTINGS ==================== */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how customers receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* SMS Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Send queue updates via SMS</p>
                  </div>
                  <Switch 
                    checked={settings.notifications?.smsEnabled || false}
                    onCheckedChange={(v) => updateSettings("notifications", "smsEnabled", v)}
                  />
                </div>
                {settings.notifications?.smsEnabled && (
                  <div className="ml-8 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>SMS Provider</Label>
                      <Select 
                        value={settings.notifications?.smsProvider || "twilio"} 
                        onValueChange={(v) => updateSettings("notifications", "smsProvider", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="twilio">Twilio</SelectItem>
                          <SelectItem value="africastalking">Africa's Talking</SelectItem>
                          <SelectItem value="termii">Termii</SelectItem>
                          <SelectItem value="bulksms">Bulk SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Sender ID</Label>
                      <Input 
                        value={settings.notifications?.smsSenderId || "AQMaster"}
                        onChange={(e) => updateSettings("notifications", "smsSenderId", e.target.value)}
                        placeholder="AQMaster"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>API Key / Account SID</Label>
                      <Input 
                        type="password"
                        value={settings.notifications?.smsApiKey || ""}
                        onChange={(e) => updateSettings("notifications", "smsApiKey", e.target.value)}
                        placeholder="Enter API key"
                      />
                    </div>
                  </div>
                )}

                <Separator />

                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send updates via email</p>
                  </div>
                  <Switch 
                    checked={settings.notifications?.emailEnabled || false}
                    onCheckedChange={(v) => updateSettings("notifications", "emailEnabled", v)}
                  />
                </div>
                {settings.notifications?.emailEnabled && (
                  <div className="ml-8 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Provider</Label>
                      <Select 
                        value={settings.notifications?.emailProvider || "sendgrid"} 
                        onValueChange={(v) => updateSettings("notifications", "emailProvider", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sendgrid">SendGrid</SelectItem>
                          <SelectItem value="aws">AWS SES</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="postmark">Postmark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Sender Email</Label>
                      <Input 
                        type="email"
                        value={settings.notifications?.emailSender || "noreply@aqmaster.com"}
                        onChange={(e) => updateSettings("notifications", "emailSender", e.target.value)}
                        placeholder="noreply@example.com"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>API Key</Label>
                      <Input 
                        type="password"
                        value={settings.notifications?.emailApiKey || ""}
                        onChange={(e) => updateSettings("notifications", "emailApiKey", e.target.value)}
                        placeholder="Enter API key"
                      />
                    </div>
                  </div>
                )}

                <Separator />

                {/* WhatsApp Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">WhatsApp Notifications</Label>
                    <p className="text-sm text-gray-500">Send messages via WhatsApp Business</p>
                  </div>
                  <Switch 
                    checked={settings.notifications?.whatsappEnabled || false}
                    onCheckedChange={(v) => updateSettings("notifications", "whatsappEnabled", v)}
                  />
                </div>
                {settings.notifications?.whatsappEnabled && (
                  <div className="ml-8 space-y-4">
                    <div className="space-y-2">
                      <Label>WhatsApp Business ID</Label>
                      <Input 
                        value={settings.notifications?.whatsappBusinessId || ""}
                        onChange={(e) => updateSettings("notifications", "whatsappBusinessId", e.target.value)}
                        placeholder="Enter WhatsApp Business ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Access Token</Label>
                      <Input 
                        type="password"
                        value={settings.notifications?.whatsappToken || ""}
                        onChange={(e) => updateSettings("notifications", "whatsappToken", e.target.value)}
                        placeholder="Enter access token"
                      />
                    </div>
                  </div>
                )}

                <Separator />

                {/* Reminder Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Browser push notifications</p>
                    </div>
                    <Switch 
                      checked={settings.notifications?.pushNotifications || false}
                      onCheckedChange={(v) => updateSettings("notifications", "pushNotifications", v)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Appointment Reminders</Label>
                      <p className="text-sm text-gray-500">Send reminders before appointments</p>
                    </div>
                    <Switch 
                      checked={settings.notifications?.appointmentReminders || false}
                      onCheckedChange={(v) => updateSettings("notifications", "appointmentReminders", v)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Queue Updates</Label>
                      <p className="text-sm text-gray-500">Notify when queue position changes</p>
                    </div>
                    <Switch 
                      checked={settings.notifications?.queueUpdates || false}
                      onCheckedChange={(v) => updateSettings("notifications", "queueUpdates", v)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Send promotional emails to customers</p>
                    </div>
                    <Switch 
                      checked={settings.notifications?.marketingEmails || false}
                      onCheckedChange={(v) => updateSettings("notifications", "marketingEmails", v)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Reminder Timing (minutes before)</Label>
                    <Select 
                      value={settings.notifications?.reminderTiming?.toString() || "30"} 
                      onValueChange={(v) => updateSettings("notifications", "reminderTiming", parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="1440">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== PAYMENT SETTINGS ==================== */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
              <CardDescription>
                Set up payment gateways and transaction rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Paystack */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Paystack</Label>
                    <p className="text-sm text-gray-500">Accept payments via Paystack</p>
                  </div>
                  <Switch 
                    checked={settings.payments?.paystackEnabled || false}
                    onCheckedChange={(v) => updateSettings("payments", "paystackEnabled", v)}
                  />
                </div>
                {settings.payments?.paystackEnabled && (
                  <div className="ml-8 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Public Key</Label>
                        <Input 
                          value={settings.payments?.paystackPublicKey || ""} 
                          type={showApiKey ? "text" : "password"}
                          onChange={(e) => updateSettings("payments", "paystackPublicKey", e.target.value)}
                          placeholder="pk_live_..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Secret Key</Label>
                        <div className="relative">
                          <Input 
                            value={settings.payments?.paystackSecretKey || ""} 
                            type={showApiKey ? "text" : "password"}
                            onChange={(e) => updateSettings("payments", "paystackSecretKey", e.target.value)}
                            placeholder="sk_live_..."
                          />
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Flutterwave */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Flutterwave</Label>
                    <p className="text-sm text-gray-500">Accept payments via Flutterwave</p>
                  </div>
                  <Switch 
                    checked={settings.payments?.flutterwaveEnabled || false}
                    onCheckedChange={(v) => updateSettings("payments", "flutterwaveEnabled", v)}
                  />
                </div>
                {settings.payments?.flutterwaveEnabled && (
                  <div className="ml-8 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Public Key</Label>
                      <Input 
                        type="password"
                        value={settings.payments?.flutterwavePublicKey || ""}
                        onChange={(e) => updateSettings("payments", "flutterwavePublicKey", e.target.value)}
                        placeholder="FLWPUBK_..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secret Key</Label>
                      <Input 
                        type="password"
                        value={settings.payments?.flutterwaveSecretKey || ""}
                        onChange={(e) => updateSettings("payments", "flutterwaveSecretKey", e.target.value)}
                        placeholder="FLWSECK_..."
                      />
                    </div>
                  </div>
                )}

                <Separator />

                {/* Stripe */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Stripe</Label>
                    <p className="text-sm text-gray-500">Accept credit card payments</p>
                  </div>
                  <Switch 
                    checked={settings.payments?.stripeEnabled || false}
                    onCheckedChange={(v) => updateSettings("payments", "stripeEnabled", v)}
                  />
                </div>
                {settings.payments?.stripeEnabled && (
                  <div className="ml-8 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Publishable Key</Label>
                      <Input 
                        type="password"
                        value={settings.payments?.stripePublishableKey || ""}
                        onChange={(e) => updateSettings("payments", "stripePublishableKey", e.target.value)}
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secret Key</Label>
                      <Input 
                        type="password"
                        value={settings.payments?.stripeSecretKey || ""}
                        onChange={(e) => updateSettings("payments", "stripeSecretKey", e.target.value)}
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Transaction Fee (%)</Label>
                    <Input 
                      type="number"
                      value={settings.payments?.transactionFee || 1.5}
                      onChange={(e) => updateSettings("payments", "transactionFee", parseFloat(e.target.value) || 0)}
                      placeholder="1.5"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Settlement Delay (hours)</Label>
                    <Input 
                      type="number"
                      value={settings.payments?.settlementDelay || 24}
                      onChange={(e) => updateSettings("payments", "settlementDelay", parseInt(e.target.value) || 0)}
                      placeholder="24"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax Rate (%)</Label>
                    <Input 
                      type="number"
                      value={settings.payments?.taxRate || 7.5}
                      onChange={(e) => updateSettings("payments", "taxRate", parseFloat(e.target.value) || 0)}
                      placeholder="7.5"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Refund Policy (days)</Label>
                    <Input 
                      type="number"
                      value={settings.payments?.refundPolicy || 7}
                      onChange={(e) => updateSettings("payments", "refundPolicy", parseInt(e.target.value) || 0)}
                      placeholder="7"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto Receipts</Label>
                    <p className="text-sm text-gray-500">Send automatic receipts after payment</p>
                  </div>
                  <Switch 
                    checked={settings.payments?.autoReceipts || false}
                    onCheckedChange={(v) => updateSettings("payments", "autoReceipts", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Deposit Required</Label>
                    <p className="text-sm text-gray-500">Require deposit for appointments</p>
                  </div>
                  <Switch 
                    checked={settings.payments?.depositRequired || false}
                    onCheckedChange={(v) => updateSettings("payments", "depositRequired", v)}
                  />
                </div>

                {settings.payments?.depositRequired && (
                  <div className="ml-8 space-y-2">
                    <Label>Deposit Percentage (%)</Label>
                    <Input 
                      type="number"
                      value={settings.payments?.depositPercentage || 50}
                      onChange={(e) => updateSettings("payments", "depositPercentage", parseInt(e.target.value) || 0)}
                      placeholder="50"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== SECURITY SETTINGS ==================== */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security & Compliance</CardTitle>
              <CardDescription>
                Configure security settings and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <Switch 
                    checked={settings.security?.twoFactorAuth || false}
                    onCheckedChange={(v) => updateSettings("security", "twoFactorAuth", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">IP Whitelisting</Label>
                    <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch 
                    checked={settings.security?.ipWhitelisting || false}
                    onCheckedChange={(v) => updateSettings("security", "ipWhitelisting", v)}
                  />
                </div>

                {settings.security?.ipWhitelisting && (
                  <div className="ml-8 space-y-2">
                    <Label>Allowed IP Addresses</Label>
                    <Textarea 
                      placeholder="Enter IP addresses, one per line&#10;192.168.1.1&#10;10.0.0.1"
                      value={settings.security?.allowedIps || ""}
                      onChange={(e) => updateSettings("security", "allowedIps", e.target.value)}
                      rows={3}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input 
                      type="number"
                      value={settings.security?.sessionTimeout || 30}
                      onChange={(e) => updateSettings("security", "sessionTimeout", parseInt(e.target.value) || 0)}
                      placeholder="30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password Expiry (days)</Label>
                    <Input 
                      type="number"
                      value={settings.security?.passwordExpiry || 90}
                      onChange={(e) => updateSettings("security", "passwordExpiry", parseInt(e.target.value) || 0)}
                      placeholder="90"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Login Attempts</Label>
                    <Input 
                      type="number"
                      value={settings.security?.maxLoginAttempts || 5}
                      onChange={(e) => updateSettings("security", "maxLoginAttempts", parseInt(e.target.value) || 0)}
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Lockout Duration (minutes)</Label>
                    <Input 
                      type="number"
                      value={settings.security?.lockoutDuration || 30}
                      onChange={(e) => updateSettings("security", "lockoutDuration", parseInt(e.target.value) || 0)}
                      placeholder="30"
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">SSL Enforcement</Label>
                    <p className="text-sm text-gray-500">Force HTTPS connections</p>
                  </div>
                  <Switch 
                    checked={settings.security?.sslEnabled || false}
                    onCheckedChange={(v) => updateSettings("security", "sslEnabled", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Audit Logs</Label>
                    <p className="text-sm text-gray-500">Track all system activities</p>
                  </div>
                  <Switch 
                    checked={settings.security?.auditLogs || false}
                    onCheckedChange={(v) => updateSettings("security", "auditLogs", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Data Encryption</Label>
                    <p className="text-sm text-gray-500">Encrypt sensitive data at rest</p>
                  </div>
                  <Switch 
                    checked={settings.security?.dataEncryption || false}
                    onCheckedChange={(v) => updateSettings("security", "dataEncryption", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">GDPR Compliance</Label>
                    <p className="text-sm text-gray-500">Enable GDPR data protection features</p>
                  </div>
                  <Switch 
                    checked={settings.security?.gdprCompliance || false}
                    onCheckedChange={(v) => updateSettings("security", "gdprCompliance", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">HIPAA Compliance</Label>
                    <p className="text-sm text-gray-500">Enable HIPAA-compliant features</p>
                  </div>
                  <Switch 
                    checked={settings.security?.hipaaCompliance || false}
                    onCheckedChange={(v) => updateSettings("security", "hipaaCompliance", v)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== INTEGRATIONS SETTINGS ==================== */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>
                Connect with external services and APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar Integrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Google Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Sync appointments</span>
                      <Switch 
                        checked={settings.integrations?.googleCalendar || false}
                        onCheckedChange={(v) => updateSettings("integrations", "googleCalendar", v)}
                      />
                    </div>
                    {settings.integrations?.googleCalendar && (
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Connect Google Account
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Outlook Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Sync appointments</span>
                      <Switch 
                        checked={settings.integrations?.outlookCalendar || false}
                        onCheckedChange={(v) => updateSettings("integrations", "outlookCalendar", v)}
                      />
                    </div>
                    {settings.integrations?.outlookCalendar && (
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Connect Outlook Account
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Zoom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Virtual meetings</span>
                      <Switch 
                        checked={settings.integrations?.zoomEnabled || false}
                        onCheckedChange={(v) => updateSettings("integrations", "zoomEnabled", v)}
                      />
                    </div>
                    {settings.integrations?.zoomEnabled && (
                      <div className="space-y-2 mt-2">
                        <Input placeholder="Account ID" />
                        <Input placeholder="Client ID" type="password" />
                        <Input placeholder="Client Secret" type="password" />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Slack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Team notifications</span>
                      <Switch 
                        checked={settings.integrations?.slackEnabled || false}
                        onCheckedChange={(v) => updateSettings("integrations", "slackEnabled", v)}
                      />
                    </div>
                    {settings.integrations?.slackEnabled && (
                      <div className="space-y-2 mt-2">
                        <Input placeholder="Webhook URL" type="url" />
                        <Input placeholder="Channel #queue-updates" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Webhooks */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Webhooks</Label>
                    <p className="text-sm text-gray-500">Real-time event notifications</p>
                  </div>
                  <Switch 
                    checked={settings.integrations?.webhookEnabled || false}
                    onCheckedChange={(v) => updateSettings("integrations", "webhookEnabled", v)}
                  />
                </div>
                {settings.integrations?.webhookEnabled && (
                  <div className="ml-8 space-y-4">
                    <div className="space-y-2">
                      <Label>Webhook URL</Label>
                      <Input 
                        type="url"
                        value={settings.integrations?.webhookUrl || ""}
                        onChange={(e) => updateSettings("integrations", "webhookUrl", e.target.value)}
                        placeholder="https://your-server.com/webhook"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secret Key</Label>
                      <Input 
                        type="password"
                        value={settings.integrations?.webhookSecret || ""}
                        onChange={(e) => updateSettings("integrations", "webhookSecret", e.target.value)}
                        placeholder="Secret key for signing requests"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Events to Send</Label>
                      <div className="flex flex-wrap gap-2">
                        {['appointment.created', 'appointment.completed', 'payment.success', 'queue.update'].map(event => (
                          <Badge key={event} variant="outline" className="cursor-pointer hover:bg-gray-100">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* API Configuration */}
              <div className="space-y-4">
                <Label>API Configuration</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>API Version</Label>
                    <Select 
                      value={settings.integrations?.apiVersion || "v2"} 
                      onValueChange={(v) => updateSettings("integrations", "apiVersion", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v1">v1 (Legacy)</SelectItem>
                        <SelectItem value="v2">v2 (Current)</SelectItem>
                        <SelectItem value="v3">v3 (Beta)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Rate Limit (requests/min)</Label>
                    <Input 
                      type="number"
                      value={settings.integrations?.apiRateLimit || 1000}
                      onChange={(e) => updateSettings("integrations", "apiRateLimit", parseInt(e.target.value) || 0)}
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="relative">
                    <Input 
                      value={settings.integrations?.apiKey || ""} 
                      type="password"
                      onChange={(e) => updateSettings("integrations", "apiKey", e.target.value)}
                      placeholder="Enter API key"
                    />
                    <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>API Secret</Label>
                  <div className="relative">
                    <Input 
                      value={settings.integrations?.apiSecret || ""} 
                      type="password"
                      onChange={(e) => updateSettings("integrations", "apiSecret", e.target.value)}
                      placeholder="Enter API secret"
                    />
                    <button
                      type="button"
                      onClick={() => setShowIntegrationKeys(!showIntegrationKeys)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showIntegrationKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== APPEARANCE SETTINGS ==================== */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance & Branding</CardTitle>
              <CardDescription>
                Customize the look and feel of your system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select 
                      value={settings.appearance?.theme || "system"} 
                      onValueChange={(v) => updateSettings("appearance", "theme", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input 
                        value={settings.appearance?.primaryColor || "#3b82f6"}
                        onChange={(e) => updateSettings("appearance", "primaryColor", e.target.value)}
                        placeholder="#3b82f6"
                      />
                      <div 
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: settings.appearance?.primaryColor || "#3b82f6" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input 
                        value={settings.appearance?.secondaryColor || "#8b5cf6"}
                        onChange={(e) => updateSettings("appearance", "secondaryColor", e.target.value)}
                        placeholder="#8b5cf6"
                      />
                      <div 
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: settings.appearance?.secondaryColor || "#8b5cf6" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex space-x-2">
                      <Input 
                        value={settings.appearance?.accentColor || "#10b981"}
                        onChange={(e) => updateSettings("appearance", "accentColor", e.target.value)}
                        placeholder="#10b981"
                      />
                      <div 
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: settings.appearance?.accentColor || "#10b981" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload logo</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                    {settings.appearance?.logo && (
                      <p className="text-xs text-gray-500 mt-1">Current: {settings.appearance.logo}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload favicon</p>
                        <p className="text-xs text-gray-400">ICO, PNG up to 1MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Animations</Label>
                    <p className="text-sm text-gray-500">Enable UI animations and transitions</p>
                  </div>
                  <Switch 
                    checked={settings.appearance?.animations !== false}
                    onCheckedChange={(v) => updateSettings("appearance", "animations", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Compact Mode</Label>
                    <p className="text-sm text-gray-500">Denser interface for power users</p>
                  </div>
                  <Switch 
                    checked={settings.appearance?.compactMode || false}
                    onCheckedChange={(v) => updateSettings("appearance", "compactMode", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Dark Mode Default</Label>
                    <p className="text-sm text-gray-500">Set default theme for new users</p>
                  </div>
                  <Select 
                    value={settings.appearance?.darkMode || "system"} 
                    onValueChange={(v) => updateSettings("appearance", "darkMode", v)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Custom CSS</Label>
                    <p className="text-sm text-gray-500">Add custom CSS styles</p>
                  </div>
                  <Switch 
                    checked={settings.appearance?.customCss || false}
                    onCheckedChange={(v) => updateSettings("appearance", "customCss", v)}
                  />
                </div>

                {settings.appearance?.customCss && (
                  <div className="ml-8 space-y-2">
                    <Label>Custom CSS</Label>
                    <Textarea 
                      placeholder="/* Add your custom styles here */&#10;.custom-class {&#10;  /* styles */&#10;}"
                      value={settings.appearance?.cssCode || ""}
                      onChange={(e) => updateSettings("appearance", "cssCode", e.target.value)}
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== BACKUP SETTINGS ==================== */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>
                Manage system backups and data recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      <Badge>Latest</Badge>
                    </div>
                    <p className="text-sm font-medium">Daily Backup</p>
                    <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400">Size: 24.3 MB</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Restore
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Database className="h-5 w-5 text-green-600" />
                      <Badge variant="outline">Weekly</Badge>
                    </div>
                    <p className="text-sm font-medium">Weekly Backup</p>
                    <p className="text-xs text-gray-500">Mar 16, 2026</p>
                    <p className="text-xs text-gray-400">Size: 156.7 MB</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Restore
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Database className="h-5 w-5 text-purple-600" />
                      <Badge variant="outline">Monthly</Badge>
                    </div>
                    <p className="text-sm font-medium">Monthly Backup</p>
                    <p className="text-xs text-gray-500">Mar 1, 2026</p>
                    <p className="text-xs text-gray-400">Size: 892.1 MB</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Restore
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Backup Frequency</Label>
                    <Select 
                      value={settings.backup?.frequency || "daily"} 
                      onValueChange={(v) => updateSettings("backup", "frequency", v)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Retention Period (days)</Label>
                    <Input 
                      type="number" 
                      value={settings.backup?.retentionPeriod || 90} 
                      className="w-32"
                      onChange={(e) => updateSettings("backup", "retentionPeriod", parseInt(e.target.value) || 0)}
                      placeholder="90"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Backup Location</Label>
                  <Select 
                    value={settings.backup?.location || "local"} 
                    onValueChange={(v) => updateSettings("backup", "location", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="aws">AWS S3</SelectItem>
                      <SelectItem value="google">Google Cloud Storage</SelectItem>
                      <SelectItem value="dropbox">Dropbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Cloud className="h-4 w-4 mr-2" />
                  Create Backup Now
                </Button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Last Backup Status</p>
                      <p className="text-xs text-yellow-700">Successfully backed up {new Date().toLocaleString()}</p>
                      <p className="text-xs text-yellow-600 mt-1">Next scheduled backup: {new Date(Date.now() + 86400000).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== ADVANCED SETTINGS ==================== */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                System-level configuration and developer options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Temporarily disable system access for maintenance</p>
                  </div>
                  <Switch 
                    checked={settings.advanced?.maintenanceMode || false}
                    onCheckedChange={(v) => updateSettings("advanced", "maintenanceMode", v)}
                  />
                </div>

                {settings.advanced?.maintenanceMode && (
                  <div className="ml-8 space-y-2">
                    <Label>Maintenance Message</Label>
                    <Textarea 
                      placeholder="System is currently under maintenance. Please check back later."
                      value={settings.advanced?.maintenanceMessage || ""}
                      onChange={(e) => updateSettings("advanced", "maintenanceMessage", e.target.value)}
                      rows={2}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Debug Mode</Label>
                    <p className="text-sm text-gray-500">Enable detailed error logging and debugging</p>
                  </div>
                  <Switch 
                    checked={settings.advanced?.debugMode || false}
                    onCheckedChange={(v) => updateSettings("advanced", "debugMode", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Performance Mode</Label>
                    <p className="text-sm text-gray-500">Optimize for high traffic and faster response times</p>
                  </div>
                  <Switch 
                    checked={settings.advanced?.performanceMode || false}
                    onCheckedChange={(v) => updateSettings("advanced", "performanceMode", v)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Caching Enabled</Label>
                    <p className="text-sm text-gray-500">Enable Redis/Memcached for faster data retrieval</p>
                  </div>
                  <Switch 
                    checked={settings.advanced?.cachingEnabled || false}
                    onCheckedChange={(v) => updateSettings("advanced", "cachingEnabled", v)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>System Logs</Label>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm h-48 overflow-auto">
                  <p>[2026-03-23 09:00:15] INFO: System started</p>
                  <p>[2026-03-23 08:45:22] INFO: Queue service initialized</p>
                  <p>[2026-03-23 08:30:10] INFO: Database connected</p>
                  <p>[2026-03-23 08:15:05] INFO: Payment gateway configured</p>
                  <p>[2026-03-23 08:00:00] INFO: Daily backup completed</p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm">
                    Download Logs
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Clear Logs
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>System Information</Label>
                <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500">Version:</div>
                  <div>v1.0.0</div>
                  <div className="text-gray-500">Last Updated:</div>
                  <div>Mar 23, 2026</div>
                  <div className="text-gray-500">Environment:</div>
                  <div>Production</div>
                  <div className="text-gray-500">Database:</div>
                  <div>MongoDB Atlas</div>
                  <div className="text-gray-500">Node Version:</div>
                  <div>v22.20.0</div>
                  <div className="text-gray-500">Uptime:</div>
                  <div>14 days, 6 hours</div>
                  <div className="text-gray-500">Memory Usage:</div>
                  <div>245 MB / 512 MB</div>
                </div>
              </div>

              <Separator />

              <div className="flex space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Database className="h-4 w-4 mr-2" />
                      Reset System
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently reset all system settings
                        to default values and clear all cached data. All custom configurations will be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600">Yes, reset system</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600">
                      <Database className="h-4 w-4 mr-2" />
                      Clear Cache
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear System Cache?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will clear all cached data including queue states, user sessions, and temporary files.
                        This may temporarily affect system performance while caches rebuild.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Clear Cache</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper import
import { AlertCircle, ImageIcon } from "lucide-react";