# SacredReads • All-Religion Digital Sacred Bookstore & Synced Audio Reader

**SacredReads** is a full-stack digital sanctuary for authentic scriptures across **Hinduism, Islam, Christianity, Sikhism, Buddhism, and Jainism**. It features real-time karaoke sentence highlighting synced to audio recitation, ambient background soundscapes (temple bells, flute, tanpura, rain), granular DRM access control, and dynamic personalized PDF watermarking using `pdf-lib`.

---

## 🌟 Core Business Model & DRM Architecture

1. **Freemium Scripture Access:**
   - **Chapter 1** of every sacred book is **100% Free** for all users with interactive karaoke-style audio highlighting and ambient sounds.
   - **Chapter 2 onwards** is locked behind a one-time digital purchase (UPI, Cards, NetBanking via Razorpay).
2. **Instant DRM Grant & Webhook:**
   - Upon payment capture, the book ID is added to the user's `purchasedBooks` array, unlocking lifetime access to all chapters and watermarked PDF downloads.
3. **Zero-Lag Architecture:**
   - Instead of streaming heavy scanned PDFs, books are served chapter-by-chapter via lightweight micro-JSON with sub-second sentence audio timestamps (`startTime`, `endTime`).
4. **Dynamic DRM PDF Watermarking:**
   - Downloaded PDFs are generated with `pdf-lib`, applying a clear footer watermark to every page with the user's email, order ID, and `"Licensed Digital Copy"`.

---

## 📂 Project Structure

```
puran/
├── app/
│   ├── api/
│   │   ├── admin/upload/route.ts          # Scripture metadata & timestamp ingestion
│   │   ├── auth/login/route.ts            # Seeker authentication & JWT signing
│   │   ├── auth/me/route.ts               # Session verification & DRM state
│   │   ├── bookmarks/route.ts             # Auto-saving reading progress
│   │   ├── books/route.ts                 # Catalog & search endpoint
│   │   ├── books/[slug]/route.ts          # Book details & chapter index
│   │   ├── checkout/create-order/route.ts # Razorpay order creation
│   │   ├── checkout/verify/route.ts       # Signature verification & DRM unlock
│   │   ├── checkout/demo-unlock/route.ts  # 1-Click test checkout simulation
│   │   ├── download/[bookId]/route.ts     # Dynamic DRM PDF watermarking engine
│   │   ├── reader/[slug]/[chapterNumber]/route.ts # DRM protected chapter streamer
│   │   └── seed/route.ts                  # Database seeder API endpoint
│   ├── book/[slug]/page.tsx               # Book overview, synopsis & chapter list
│   ├── catalog/page.tsx                   # Multi-religion catalog & search
│   ├── my-shelf/page.tsx                  # User library, progress & PDF downloads
│   ├── reader/[slug]/[chapterNumber]/page.tsx # Interactive Reader Studio
│   ├── admin/upload/page.tsx              # Admin manuscript ingestion studio
│   ├── globals.css                        # Devotional styling & typography
│   ├── layout.tsx                         # RootLayout with AuthProvider & Navbar
│   └── page.tsx                           # Serene devotional home page
├── components/
│   ├── AmbientSoundscape.tsx              # Temple bells, flute, tanpura sound player
│   ├── Footer.tsx                         # 6 religions banner & DRM notice
│   ├── InteractiveReader.tsx              # Synced HTML5 audio karaoke reader
│   ├── Navbar.tsx                         # Header with session, shelf & seed tools
│   └── UnlockCheckoutModal.tsx            # Razorpay & 1-click test checkout modal
├── context/
│   └── AuthContext.tsx                    # Global authentication & DRM state
├── lib/
│   ├── auth.ts                            # JWT verification & password hashing
│   ├── dataService.ts                     # MongoDB data service & fallback layer
│   ├── db.ts                              # Cached Mongoose connection manager
│   ├── pdfWatermark.ts                    # pdf-lib dynamic watermark stamp engine
│   └── seedData.ts                        # Multi-faith scriptures & Agni Puran data
├── models/
│   ├── Book.ts                            # Book Mongoose schema
│   ├── Chapter.ts                         # Chapter & Verses Mongoose schema
│   ├── Order.ts                           # Order transaction Mongoose schema
│   ├── User.ts                            # User & Bookmarks Mongoose schema
│   └── index.ts                           # Model exports
├── scripts/
│   └── seed.mjs                           # Standalone database seed script
└── package.json
```

---

## 📜 Complete Mongoose Schemas

### 1. User Schema (`models/User.ts`)
```typescript
const BookmarkSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  chapterNumber: { type: Number, required: true },
  sentenceId: { type: String, required: true },
  audioTimestamp: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  purchasedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  bookmarks: [BookmarkSchema],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });
```

### 2. Book Schema (`models/Book.ts`)
```typescript
const BookSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  religion: {
    type: String,
    required: true,
    enum: ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism'],
    index: true,
  },
  language: { type: String, required: true, default: 'Sanskrit & Hindi' },
  author: { type: String, required: true },
  description: { type: String, required: true },
  synopsis: { type: String },
  coverImageUrl: { type: String, required: true },
  price: { type: Number, required: true, default: 299 },
  totalChapters: { type: Number, required: true, default: 1 },
  masterPdfKey: { type: String, required: true },
  rating: { type: Number, default: 4.9 },
  versesCount: { type: Number, default: 100 },
  featured: { type: Boolean, default: false },
  authenticitySource: { type: String },
  audioPreviewUrl: { type: String },
}, { timestamps: true });
```

### 3. Chapter Schema (`models/Chapter.ts`)
```typescript
const VerseSchema = new Schema({
  sentenceId: { type: String, required: true },
  originalScript: { type: String, required: true },
  hindiTranslation: { type: String, required: true },
  englishTranslation: { type: String },
  transliteration: { type: String },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
});

const ChapterSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
  chapterNumber: { type: Number, required: true, index: true },
  title: { type: String, required: true },
  audioUrl: { type: String, required: true },
  summary: { type: String },
  verses: [VerseSchema],
}, { timestamps: true });
```

### 4. Order Schema (`models/Order.ts`)
```typescript
const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  razorpayOrderId: { type: String, required: true, unique: true, index: true },
  razorpayPaymentId: { type: String },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  receipt: { type: String },
}, { timestamps: true });
```

---

## 🎛️ Interactive Reader Studio Features

- **Persistent Bottom Audio Bar**: Play/pause, seek slider, speed multiplier (0.75x to 2x), 5s rewind/forward.
- **Real-Time Karaoke Highlighting**: Active verse glows with an amber background and smoothly auto-scrolls into the center of the viewport.
- **Click-to-Jump**: Clicking any verse immediately jumps audio playback to that verse's start timestamp.
- **Devotional Soundscape**: Toggle soft temple bells (घंटी), bansuri flute (बांसुरी), tanpura drone, or mountain rain with independent volume control.
- **Auto-Sync & Bookmarking**: Automatically persists last recited verse and audio timestamp to MongoDB and localStorage.

---

## 🚀 Getting Started

### 1. Environment Variables (`.env.local`)
```env
MONGODB_URI=mongodb://localhost:27017/sacredreads
JWT_SECRET=sacred_reads_super_secret_jwt_key_2026_devotional_drm
RAZORPAY_KEY_ID=rzp_test_sacredreads123
RAZORPAY_KEY_SECRET=sacredreads_secret_key_mock_456
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Seeding Scriptures
Run the seed script or click the **"Seed DB"** button in the navigation header:
```bash
npm run seed
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to begin reading.
