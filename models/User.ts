import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBookmark {
  bookId: mongoose.Types.ObjectId;
  chapterNumber: number;
  sentenceId: string;
  audioTimestamp: number;
  updatedAt: Date;
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  purchasedBooks: mongoose.Types.ObjectId[];
  bookmarks: IBookmark[];
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    chapterNumber: { type: Number, required: true },
    sentenceId: { type: String, required: true },
    audioTimestamp: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: false },
    purchasedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    bookmarks: [BookmarkSchema],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite in dev hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
