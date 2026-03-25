import mongoose from "mongoose";

export interface ISettings {
  _id?: string;
  // General Settings
  general: {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    address: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    language: string;
    currency: string;
  };
  
  // Queue Settings
  queue: {
    maxQueueLength: number;
    defaultWaitTime: number;
    priorityEnabled: boolean;
    vipQueueEnabled: boolean;
    elderlyPriority: boolean;
    appointmentOverlap: boolean;
    bufferTime: number;
    autoCallNext: boolean;
    maxNoShowAttempts: number;
    noShowTimeout: number;
  };
  
  // Notification Settings
  notifications: {
    smsEnabled: boolean;
    smsProvider: string;
    smsSenderId: string;
    emailEnabled: boolean;
    emailProvider: string;
    emailSender: string;
    whatsappEnabled: boolean;
    whatsappBusinessId: string;
    pushNotifications: boolean;
    reminderTiming: number;
    appointmentReminders: boolean;
    queueUpdates: boolean;
    marketingEmails: boolean;
  };
  
  // Payment Settings
  payments: {
    paystackEnabled: boolean;
    paystackPublicKey: string;
    paystackSecretKey: string;
    flutterwaveEnabled: boolean;
    stripeEnabled: boolean;
    currency: string;
    transactionFee: number;
    settlementDelay: number;
    autoReceipts: boolean;
    refundPolicy: number;
    taxRate: number;
    depositRequired: boolean;
    depositPercentage: number;
  };
  
  // Security Settings
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    maxLoginAttempts: number;
    ipWhitelisting: boolean;
    sslEnabled: boolean;
    auditLogs: boolean;
    dataEncryption: boolean;
    gdprCompliance: boolean;
    hipaaCompliance: boolean;
    backupFrequency: string;
    retentionPeriod: number;
  };
  
  // Integration Settings
  integrations: {
    googleCalendar: boolean;
    outlookCalendar: boolean;
    zoomEnabled: boolean;
    slackEnabled: boolean;
    webhookEnabled: boolean;
    webhookUrl: string;
    apiVersion: string;
    apiRateLimit: number;
    apiKey: string;
    apiSecret: string;
  };
  
  // Appearance Settings
  appearance: {
    theme: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    favicon: string;
    customCss: boolean;
    compactMode: boolean;
    animations: boolean;
    darkMode: string;
  };
  
  updatedAt: Date;
  updatedBy: string;
}

const settingsSchema = new mongoose.Schema<ISettings>(
  {
    general: {
      businessName: { type: String, default: "A&Q Master Pro" },
      businessEmail: { type: String, default: "admin@aqmaster.com" },
      businessPhone: { type: String, default: "+234 800 000 0000" },
      address: { type: String, default: "" },
      timezone: { type: String, default: "Africa/Lagos" },
      dateFormat: { type: String, default: "DD/MM/YYYY" },
      timeFormat: { type: String, default: "24h" },
      language: { type: String, default: "en" },
      currency: { type: String, default: "NGN" },
    },
    queue: {
      maxQueueLength: { type: Number, default: 50 },
      defaultWaitTime: { type: Number, default: 15 },
      priorityEnabled: { type: Boolean, default: true },
      vipQueueEnabled: { type: Boolean, default: true },
      elderlyPriority: { type: Boolean, default: true },
      appointmentOverlap: { type: Boolean, default: false },
      bufferTime: { type: Number, default: 5 },
      autoCallNext: { type: Boolean, default: true },
      maxNoShowAttempts: { type: Number, default: 3 },
      noShowTimeout: { type: Number, default: 10 },
    },
    notifications: {
      smsEnabled: { type: Boolean, default: true },
      smsProvider: { type: String, default: "twilio" },
      smsSenderId: { type: String, default: "AQMaster" },
      emailEnabled: { type: Boolean, default: true },
      emailProvider: { type: String, default: "sendgrid" },
      emailSender: { type: String, default: "noreply@aqmaster.com" },
      whatsappEnabled: { type: Boolean, default: false },
      whatsappBusinessId: { type: String, default: "" },
      pushNotifications: { type: Boolean, default: true },
      reminderTiming: { type: Number, default: 30 },
      appointmentReminders: { type: Boolean, default: true },
      queueUpdates: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false },
    },
    payments: {
      paystackEnabled: { type: Boolean, default: false },
      paystackPublicKey: { type: String, default: "" },
      paystackSecretKey: { type: String, default: "" },
      flutterwaveEnabled: { type: Boolean, default: false },
      stripeEnabled: { type: Boolean, default: false },
      currency: { type: String, default: "NGN" },
      transactionFee: { type: Number, default: 1.5 },
      settlementDelay: { type: Number, default: 24 },
      autoReceipts: { type: Boolean, default: true },
      refundPolicy: { type: Number, default: 7 },
      taxRate: { type: Number, default: 7.5 },
      depositRequired: { type: Boolean, default: false },
      depositPercentage: { type: Number, default: 50 },
    },
    security: {
      twoFactorAuth: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 30 },
      passwordExpiry: { type: Number, default: 90 },
      maxLoginAttempts: { type: Number, default: 5 },
      ipWhitelisting: { type: Boolean, default: false },
      sslEnabled: { type: Boolean, default: true },
      auditLogs: { type: Boolean, default: true },
      dataEncryption: { type: Boolean, default: true },
      gdprCompliance: { type: Boolean, default: true },
      hipaaCompliance: { type: Boolean, default: false },
      backupFrequency: { type: String, default: "daily" },
      retentionPeriod: { type: Number, default: 90 },
    },
    integrations: {
      googleCalendar: { type: Boolean, default: false },
      outlookCalendar: { type: Boolean, default: false },
      zoomEnabled: { type: Boolean, default: false },
      slackEnabled: { type: Boolean, default: false },
      webhookEnabled: { type: Boolean, default: false },
      webhookUrl: { type: String, default: "" },
      apiVersion: { type: String, default: "v2" },
      apiRateLimit: { type: Number, default: 1000 },
      apiKey: { type: String, default: "" },
      apiSecret: { type: String, default: "" },
    },
    appearance: {
      theme: { type: String, default: "system" },
      primaryColor: { type: String, default: "#3b82f6" },
      secondaryColor: { type: String, default: "#8b5cf6" },
      logo: { type: String, default: "" },
      favicon: { type: String, default: "" },
      customCss: { type: Boolean, default: false },
      compactMode: { type: Boolean, default: false },
      animations: { type: Boolean, default: true },
      darkMode: { type: String, default: "system" },
    },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", settingsSchema);