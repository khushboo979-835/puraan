import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVerse {
  sentenceId: string;
  originalScript: string;
  hindiTranslation: string;
  englishTranslation?: string;
  transliteration?: string;
  startTime: number;
  endTime: number;
}

export interface IChapter extends Document {
  _id: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  chapterNumber: number;
  title: string;
  audioUrl: string;
  summary?: string;
  verses: IVerse[];
  createdAt: Date;
  updatedAt: Date;
}

const VerseSchema = new Schema<IVerse>(
  {
    sentenceId: { type: String, required: true },
    originalScript: { type: String, required: true },
    hindiTranslation: { type: String, required: true },
    englishTranslation: { type: String },
    transliteration: { type: String },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
  },
  { _id: false }
);

const ChapterSchema = new Schema<IChapter>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
    chapterNumber: { type: Number, required: true, index: true },
    title: { type: String, required: true },
    audioUrl: { type: String, required: true },
    summary: { type: String },
    verses: [VerseSchema],
  },
  {
    timestamps: true,
  }
);

// Compound index to guarantee uniqueness of chapter per book
ChapterSchema.index({ bookId: 1, chapterNumber: 1 }, { unique: true });

const Chapter: Model<IChapter> = mongoose.models.Chapter || mongoose.model<IChapter>('Chapter', ChapterSchema);

export default Chapter;
