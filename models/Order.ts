import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  userEmail: string;
  customerName?: string;
  bookId?: mongoose.Types.ObjectId;
  scriptureSlug: string;
  amount: number;
  currency: string;
  utrNumber?: string;
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'created';
  receipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false, index: true },
    userEmail: { type: String, required: true, index: true, lowercase: true, trim: true },
    customerName: { type: String, default: 'Devout Seeker' },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: false, index: true },
    scriptureSlug: { type: String, required: true, index: true },
    amount: { type: Number, required: true, default: 49 },
    currency: { type: String, default: 'INR' },
    utrNumber: { type: String, index: true, sparse: true, trim: true },
    paymentMethod: { type: String, default: 'PhonePe UPI QR' },
    razorpayOrderId: { type: String, sparse: true },
    razorpayPaymentId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'paid', 'created'],
      default: 'approved',
      index: true,
    },
    receipt: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
