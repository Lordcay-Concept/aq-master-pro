import mongoose from "mongoose";

export interface INotification {
  _id?: string;
  userId: mongoose.Types.ObjectId;
  to: string;
  type: "sms" | "email" | "whatsapp";
  message: string;
  template?: "ticket_generated" | "ticket_called" | "reminder" | "feedback";
  data?: Record<string, any>;
  status: "pending" | "sent" | "failed";
  sentAt?: Date;
  error?: string;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new mongoose.Schema<INotification>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: String, required: true },
    type: { type: String, enum: ["sms", "email", "whatsapp"], required: true },
    message: { type: String, required: true },
    template: { type: String, enum: ["ticket_generated", "ticket_called", "reminder", "feedback"] },
    data: { type: mongoose.Schema.Types.Mixed },
    status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
    sentAt: { type: Date },
    error: { type: String },
    read: { type: Boolean, default: false },
    readAt: { type: Date }
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ status: 1 });
notificationSchema.index({ read: 1 });

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", notificationSchema);