import mongoose from 'mongoose';

export interface IQueue {
  _id?: string;
  serviceId: mongoose.Types.ObjectId;
  serviceName: string;
  currentNumber: string;
  waitingCount: number;
  averageWaitTime: number; 
  isActive: boolean;
  lastUpdated: Date;
  counters: {
    counterId: number;
    counterName: string;
    servingTicket?: string;
    isActive: boolean;
    staffId?: mongoose.Types.ObjectId;
  }[];
}

const queueSchema = new mongoose.Schema<IQueue>(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceName: { type: String, required: true },
    currentNumber: { type: String },
    waitingCount: { type: Number, default: 0 },
    averageWaitTime: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now },
    counters: [{
      counterId: { type: Number, required: true },
      counterName: { type: String, required: true },
      servingTicket: { type: String },
      isActive: { type: Boolean, default: true },
      staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
  },
  { timestamps: true }
);

const Queue = mongoose.models.Queue || mongoose.model<IQueue>('Queue', queueSchema);

export default Queue;