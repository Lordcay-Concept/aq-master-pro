"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Mail, Phone, Bell, Shield,
  Moon, Sun, Globe, Lock, Eye,
  EyeOff, Save, ArrowLeft, CheckCircle,
  User, Clock, Calendar, Languages, AlertCircle, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

// Types
interface NotificationSettings {
  sms: boolean;
  email: boolean;
  whatsapp: boolean;
  queueUpdates: boolean;
  appointmentReminders: boolean;
  marketingEmails: boolean;
  promotionalSms: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  language: string;
  timezone: string;
  avatar?: string;
}

interface PreferencesData {
  darkMode: boolean;
  compactView: boolean;
  currency: string;
  dateFormat: string;
}

// ThemeToggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center space-x-3">
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-blue-600" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
        <div>
          <p className="font-medium dark:text-white">Dark Mode</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Switch between light and dark theme
          </p>
        </div>
      </div>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}

export default function CustomerSettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Profile settings
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    language: "en",
    timezone: "Africa/Lagos"
  });

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    sms: false,
    email: false,
    whatsapp: false,
    queueUpdates: false,
    appointmentReminders: false,
    marketingEmails: false,
    promotionalSms: false
  });

  // Security settings
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    loginAlerts: false,
    sessionTimeout: 30
  });

  // Preferences settings
  const [preferences, setPreferences] = useState<PreferencesData>({
    darkMode: false,
    compactView: false,
    currency: "NGN",
    dateFormat: "DD/MM/YYYY"
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/customer/settings");
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        if (response.status === 404) {
          setProfile({
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            phone: "",
            language: "en",
            timezone: "Africa/Lagos"
          });
          setLoading(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setProfile(data.profile || {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        language: "en",
        timezone: "Africa/Lagos"
      });
      
      setNotifications(data.notifications || {
        sms: false,
        email: false,
        whatsapp: false,
        queueUpdates: false,
        appointmentReminders: false,
        marketingEmails: false,
        promotionalSms: false
      });
      
      setSecurity(data.security || {
        twoFactorAuth: false,
        loginAlerts: false,
        sessionTimeout: 30
      });

      setPreferences(data.preferences || {
        darkMode: false,
        compactView: false,
        currency: "NGN",
        dateFormat: "DD/MM/YYYY"
      });
      
    } catch (error) {
      console.error("Error fetching settings:", error);
      setError("Failed to load settings");
      toast.error("Failed to load settings");
      setProfile({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        language: "en",
        timezone: "Africa/Lagos"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/customer/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          profile, 
          notifications, 
          security,
          preferences 
        })
      });
      
      if (response.ok) {
        setSaveSuccess(true);
        toast.success("Settings saved successfully");
        setTimeout(() => setSaveSuccess(false), 3000);
        if (profile.name !== session?.user?.name) {
          await update({ name: profile.name });
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    try {
      const response = await fetch("/api/customer/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        })
      });
      
      if (response.ok) {
        setSaveSuccess(true);
        toast.success("Password changed successfully");
        setTimeout(() => setSaveSuccess(false), 3000);
        (e.target as HTMLFormElement).reset();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Loading your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Account Settings
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105 transition-all"
              onClick={handleSaveProfile}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Success Message */}
        {saveSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200 animate-in slide-in-from-top">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Header Card */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-28 w-28 border-4 border-white/50 shadow-2xl">
                <AvatarFallback className="bg-white/20 text-white text-4xl">
                  {profile.name?.split(' ').map(n => n[0]).join('') || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{profile.name || "Customer"}</h2>
                <p className="text-blue-100 mb-1">{profile.email}</p>
                <p className="text-blue-100 mb-4">{profile.phone || "No phone added"}</p>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-200" />
                    <span className="text-sm text-blue-100">Member since {new Date().getFullYear()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-200" />
                    <span className="text-sm text-blue-100">Last updated today</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl">
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl">
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl">
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-2xl">
                  <User className="h-6 w-6 mr-2 text-blue-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      placeholder="Your full name"
                      className="h-12 border-2 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      placeholder="your@email.com"
                      className="h-12 border-2 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      placeholder="+234 801 234 5678"
                      className="h-12 border-2 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-medium">Language</Label>
                    <Select 
                      value={profile.language} 
                      onValueChange={(v) => setProfile({...profile, language: v})}
                    >
                      <SelectTrigger className="h-12 border-2">
                        <Languages className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="yo">Yorùbá</SelectItem>
                        <SelectItem value="ig">Igbo</SelectItem>
                        <SelectItem value="ha">Hausa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-sm font-medium">Timezone</Label>
                  <Select 
                    value={profile.timezone} 
                    onValueChange={(v) => setProfile({...profile, timezone: v})}
                  >
                    <SelectTrigger className="h-12 border-2">
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-2xl">
                  <Bell className="h-6 w-6 mr-2 text-blue-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive updates</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                {/* Channels */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via SMS</p>
                      </div>
                      <Switch 
                        checked={notifications.sms}
                        onCheckedChange={(v) => setNotifications({...notifications, sms: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={(v) => setNotifications({...notifications, email: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">WhatsApp Updates</p>
                        <p className="text-sm text-gray-500">Receive updates on WhatsApp</p>
                      </div>
                      <Switch 
                        checked={notifications.whatsapp}
                        onCheckedChange={(v) => setNotifications({...notifications, whatsapp: v})}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">Queue Updates</p>
                        <p className="text-sm text-gray-500">Get notified about your queue position</p>
                      </div>
                      <Switch 
                        checked={notifications.queueUpdates}
                        onCheckedChange={(v) => setNotifications({...notifications, queueUpdates: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">Appointment Reminders</p>
                        <p className="text-sm text-gray-500">Receive reminders before appointments</p>
                      </div>
                      <Switch 
                        checked={notifications.appointmentReminders}
                        onCheckedChange={(v) => setNotifications({...notifications, appointmentReminders: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-500">Receive promotional emails</p>
                      </div>
                      <Switch 
                        checked={notifications.marketingEmails}
                        onCheckedChange={(v) => setNotifications({...notifications, marketingEmails: v})}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium">Promotional SMS</p>
                        <p className="text-sm text-gray-500">Receive promotional SMS</p>
                      </div>
                      <Switch 
                        checked={notifications.promotionalSms}
                        onCheckedChange={(v) => setNotifications({...notifications, promotionalSms: v})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="border-0 shadow-xl">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="h-6 w-6 mr-2 text-blue-600" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Switch 
                      checked={security.twoFactorAuth}
                      onCheckedChange={(v) => setSecurity({...security, twoFactorAuth: v})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium">Login Alerts</p>
                      <p className="text-sm text-gray-500">Get notified of new logins</p>
                    </div>
                    <Switch 
                      checked={security.loginAlerts}
                      onCheckedChange={(v) => setSecurity({...security, loginAlerts: v})}
                    />
                  </div>
                  <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                    <Label className="text-sm font-medium">Session Timeout</Label>
                    <Select 
                      value={security.sessionTimeout.toString()} 
                      onValueChange={(v) => setSecurity({...security, sessionTimeout: parseInt(v)})}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <Clock className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center text-xl">
                    <Lock className="h-5 w-5 mr-2 text-blue-600" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          required
                          placeholder="Enter current password"
                          className="h-12 pr-10 border-2 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          required
                          placeholder="Enter new password"
                          className="h-12 pr-10 border-2 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          placeholder="Confirm new password"
                          className="h-12 pr-10 border-2 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105 transition-all h-12 px-8"
                    >
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center text-2xl">
                  <Settings className="h-6 w-6 mr-2 text-blue-600" />
                  Appearance & Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dark Mode Toggle */}
                <ThemeToggle />

                {/* Compact View */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div>
                    <p className="font-medium dark:text-white">Compact View</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Show more content with compact layout</p>
                  </div>
                  <Switch 
                    checked={preferences.compactView}
                    onCheckedChange={(v) => setPreferences({...preferences, compactView: v})}
                  />
                </div>

                {/* Currency Display */}
                <div className="space-y-2">
                  <Label>Currency Display</Label>
                  <Select 
                    value={preferences.currency} 
                    onValueChange={(v) => setPreferences({...preferences, currency: v})}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">₦ (Nigerian Naira)</SelectItem>
                      <SelectItem value="USD">$ (US Dollar)</SelectItem>
                      <SelectItem value="EUR">€ (Euro)</SelectItem>
                      <SelectItem value="GBP">£ (British Pound)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Format */}
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select 
                    value={preferences.dateFormat} 
                    onValueChange={(v) => setPreferences({...preferences, dateFormat: v})}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Save Button for Mobile */}
        <div className="mt-8 flex justify-center md:hidden">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105 transition-all px-8 py-6 text-lg w-full"
            onClick={handleSaveProfile}
            disabled={saving}
          >
            <Save className="h-5 w-5 mr-2" />
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}