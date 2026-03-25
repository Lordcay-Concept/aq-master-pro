import mongoose from 'mongoose';

export interface IAppointment {
  _id?: string;
  customer: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  serviceName: string;
  ticketNumber: string;
  problemDescription?: string;
  notificationPhone: string;
  startTime: Date;
  endTime: Date;
  status: 'waiting' | 'calling' | 'serving' | 'completed' | 'cancelled' | 'no-show';
  priority: 'normal' | 'vip' | 'elderly' | 'emergency';
  queuePosition?: number;
  estimatedWaitTime?: number; 
  
  paymentStatus: 'free' | 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: 'card' | 'bank_transfer' | 'cash' | 'mobile_money';  
  paymentReference?: string;
  amountPaid?: number;
  paidAt?: Date;
  
  servedBy?: mongoose.Types.ObjectId;
  serviceNote?: string;
  startedAt?: Date;
  completedAt?: Date;

  qrCode?: string;              
  qrCodeGeneratedAt?: Date; 
  
  notificationSent: boolean;
  notifiedAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceName: { type: String, required: true },
    ticketNumber: { type: String, required: true, unique: true },
    problemDescription: { type: String },
    notificationPhone: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['waiting', 'calling', 'serving', 'completed', 'cancelled', 'no-show'],
      default: 'waiting'
    },
    priority: { 
      type: String, 
      enum: ['normal', 'vip', 'elderly', 'emergency'],
      default: 'normal'
    },
    queuePosition: { type: Number },
    estimatedWaitTime: { type: Number },
    
    paymentStatus: { 
      type: String, 
      enum: ['free', 'pending', 'paid', 'failed', 'refunded'],
      default: 'free'
    },
    paymentMethod: { 
      type: String,
      enum: ['card', 'bank_transfer', 'cash', 'mobile_money']
    },
    paymentReference: { type: String },
    amountPaid: { type: Number },
    paidAt: { type: Date },
    
    servedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceNote: { type: String },
    startedAt: { type: Date },
    completedAt: { type: Date },

    qrCode: { type: String },
    qrCodeGeneratedAt: { type: Date },
    
    notificationSent: { type: Boolean, default: false },
    notifiedAt: { type: Date },
  },
  { timestamps: true }
);

appointmentSchema.index({ status: 1, createdAt: 1 });
appointmentSchema.index({ ticketNumber: 1 });
appointmentSchema.index({ customer: 1, createdAt: -1 });
appointmentSchema.index({ 'paymentStatus': 1 });

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;