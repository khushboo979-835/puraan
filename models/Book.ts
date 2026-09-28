import mongoose, { Schema, Document, Model } from 'mongoose';

export type ReligionType = 'Hinduism' | 'Islam' | 'Christianity' | 'Sikhism' | 'Buddhism' | 'Jainism';

export interface IBook extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  religion: ReligionType;
  language: string;
  author: string;
  description: string;
  synopsis?: string;
  coverImageUrl: string;
  price: number;
  totalChapters: number;
  masterPdfKey: string;
  rating?: number;
  versesCount?: number;
  featured?: boolean;
  authenticitySource?: string;
  audioPreviewUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    religion: {
      type: String,
      required: true,
      enum: ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism'],
      index: true,
    },
    language: { type: String, required: true, default: 'Sanskrit & Hindi' },
    author: { type: String, required: true, default: 'Ancient Sage / Divine Revelation' },
    description: { type: String, required: true },
    synopsis: { type: String },
    coverImageUrl: { type: String, required: true },
    price: { type: Number, required: true, default: 299 },
    totalChapters: { type: Number, required: true, default: 1 },
    masterPdfKey: { type: String, required: true, default: 'master-agni-puran.pdf' },
    rating: { type: Number, default: 4.9 },
    versesCount: { type: Number, default: 100 },
    featured: { type: Boolean, default: false },
    authenticitySource: { type: String, default: 'Verified Critical Edition / Manuscript Preservation Archives' },
    audioPreviewUrl: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;
