import mongoose from 'mongoose';

export interface ITransaction {
  _id?: string;
  userId: mongoose.Types.ObjectId;
  appointmentId?: mongoose.Types.ObjectId;
  
  // Payment details
  amount: number; 
  currency: string;
  
  // Paystack fields
  reference: string;
  accessCode?: string;
  authorizationUrl?: string;
  
  // Status tracking
  status: 'pending' | 'processing' | 'success' | 'failed' | 'refunded';
  
  // Timelines
  initiatedAt: Date;
  paidAt?: Date;
  completedAt?: Date;
  
  // Webhook data
  webhookPayload?: any;
  webhookReceivedAt?: Date;
  
  // Retry logic
  retryCount: number;
  idempotencyKey: string;
  
  // Notifications
  emailSent: boolean;
  smsSent: boolean;
  notifiedAt?: Date;
  
  // Metadata
  metadata: {
    serviceId: string;
    serviceName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    problemDescription?: string;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    
    amount: { type: Number, required: true },
    currency: { type: String, default: 'NGN' },
    
    reference: { type: String, required: true, unique: true },
    accessCode: { type: String },
    authorizationUrl: { type: String },
    
    status: {
      type: String,
      enum: ['pending', 'processing', 'success', 'failed', 'refunded'],
      default: 'pending'
    },
    
    initiatedAt: { type: Date, default: Date.now },
    paidAt: { type: Date },
    completedAt: { type: Date },
    
    webhookPayload: { type: mongoose.Schema.Types.Mixed },
    webhookReceivedAt: { type: Date },
    
    retryCount: { type: Number, default: 0 },
    idempotencyKey: { type: String, required: true, unique: true },
    
    emailSent: { type: Boolean, default: false },
    smsSent: { type: Boolean, default: false },
    notifiedAt: { type: Date },
    
    metadata: {
      serviceId: { type: String, required: true },
      serviceName: { type: String, required: true },
      customerName: { type: String, required: true },
      customerEmail: { type: String, required: true },
      customerPhone: { type: String, required: true },
      problemDescription: { type: String }
    }
  },
  { timestamps: true }
);

transactionSchema.index({ reference: 1 });
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ idempotencyKey: 1 });

const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;