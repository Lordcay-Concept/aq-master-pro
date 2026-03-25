import mongoose from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'customer' | 'staff' | 'admin';
  isApproved: boolean;
  emailVerified?: Date;
  image?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  
  // Staff-specific fields
  department?: string;
  joinDate?: string;
  performance?: number;
  customersServed?: number;
  avgTime?: string;
  satisfaction?: number;
  
  // Loyalty & Stats fields
  tier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points?: number;
  totalVisits?: number;
  totalSpent?: number;
  nextTier?: string;
  pointsToNext?: number;
  
  // Notification preferences
  language?: string;
  timezone?: string;
  notifications?: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
    queueUpdates: boolean;
    appointmentReminders: boolean;
    marketingEmails: boolean;
    promotionalSms: boolean;
  };
  twoFactorAuth?: boolean;
  loginAlerts?: boolean;
  sessionTimeout?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    phone: { type: String },
    role: { 
      type: String, 
      enum: ['customer', 'staff', 'admin'],
      default: 'customer'
    },
    isApproved: { 
      type: Boolean, 
      default: function(this: any) {
        return this.role !== 'staff';
      }
    },
    emailVerified: { type: Date },
    image: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    
    // Staff-specific fields
    department: { type: String },
    joinDate: { type: String },
    performance: { type: Number, default: 0 },
    customersServed: { type: Number, default: 0 },
    avgTime: { type: String, default: "0 min" },
    satisfaction: { type: Number, default: 0 },

    // Loyalty & Stats fields
    tier: { type: String, enum: ["Bronze", "Silver", "Gold", "Platinum"], default: "Bronze" },
    points: { type: Number, default: 0 },
    totalVisits: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    nextTier: { type: String, default: "Silver" },
    pointsToNext: { type: Number, default: 500 },
    
    // Preferences
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'Africa/Lagos' },
    notifications: {
      sms: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false },
      queueUpdates: { type: Boolean, default: true },
      appointmentReminders: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false },
      promotionalSms: { type: Boolean, default: false }
    },
    twoFactorAuth: { type: Boolean, default: false },
    loginAlerts: { type: Boolean, default: true },
    sessionTimeout: { type: Number, default: 30 }
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
    return ret;
  }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;