import mongoose, { Schema, Document, Model } from 'mongoose';

export type StatusFaithType = 'Hinduism' | 'Islam' | 'Christianity' | 'Sikhism' | 'Buddhism' | 'Jainism';

export interface IStatusVideo extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  faith: StatusFaithType;
  moodTag: string;
  videoUrl: string;
  thumbnailUrl?: string;
  fileSize?: number; // bytes
  duration?: number; // seconds
  downloadsCount: number;
  viewsCount: number;
  likesCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StatusVideoSchema = new Schema<IStatusVideo>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    faith: {
      type: String,
      enum: ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism'],
      required: true,
      index: true,
    },
    moodTag: { type: String, default: 'Devotional', trim: true, index: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    fileSize: { type: Number, default: 0 },
    duration: { type: Number, default: 30 },
    downloadsCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

const StatusVideo: Model<IStatusVideo> =
  mongoose.models.StatusVideo || mongoose.model<IStatusVideo>('StatusVideo', StatusVideoSchema);

export default StatusVideo;
