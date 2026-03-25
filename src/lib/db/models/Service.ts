import mongoose from 'mongoose';

export interface IService {
  _id?: string;
  name: string;
  description: string;
  duration: number; 
  price: number; 
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, 
    price: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);

export default Service;