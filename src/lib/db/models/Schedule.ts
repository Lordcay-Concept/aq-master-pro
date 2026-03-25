import mongoose from 'mongoose';

export interface ISchedule {
  staffId: mongoose.Types.ObjectId;
  date: Date;
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

const scheduleSchema = new mongoose.Schema<ISchedule>(
  {
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    counter: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    breaks: [{
      start: String,
      end: String,
      type: String
    }]
  },
  { timestamps: true }
);

const Schedule = mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', scheduleSchema);

export default Schedule;