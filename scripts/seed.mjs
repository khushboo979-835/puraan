import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sacredreads';

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    religion: { type: String, required: true },
    language: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    synopsis: { type: String },
    coverImageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    totalChapters: { type: Number, required: true },
    masterPdfKey: { type: String, required: true },
    rating: { type: Number, default: 4.9 },
    versesCount: { type: Number, default: 100 },
    featured: { type: Boolean, default: false },
    authenticitySource: { type: String },
    audioPreviewUrl: { type: String },
  },
  { timestamps: true }
);

const VerseSchema = new mongoose.Schema(
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

const ChapterSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true },
    audioUrl: { type: String, required: true },
    summary: { type: String },
    verses: [VerseSchema],
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    purchasedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    bookmarks: Array,
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);
const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const SEED_BOOKS = [
  {
    title: 'Agni Puran (अग्नि पुराण)',
    slug: 'agni-puran',
    religion: 'Hinduism',
    language: 'Sanskrit & Hindi',
    author: 'Maharshi Ved Vyasa / Lord Agni',
    description: 'The encyclopedic Mahapurana recited by Agni Dev to Sage Vashistha, illuminating cosmology, Vedic science, rituals, medicine, architecture, and the path to ultimate liberation.',
    synopsis: 'Agni Purana is one of the eighteen major Puranas of Hinduism. Categorized as a Rajasika Purana, it was declared directly by Agni (the Fire God) to Sage Vashistha. Across its chapters, it weaves transcendental knowledge with practical Vedic sciences including Ayurveda, Jyotish (astronomy), Dhanurveda (martial strategy), temple iconography, and the divine incarnations of Vishnu.',
    coverImageUrl: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800&auto=format&fit=crop',
    price: 299,
    totalChapters: 383,
    masterPdfKey: 'master-agni-puran.pdf',
    rating: 4.95,
    versesCount: 15400,
    featured: true,
    authenticitySource: 'Preserved from Varanasi Sanskrit Mahavidyalaya Critical Manuscript Archive #VED-782',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'अध्याय १: अग्निपुराण माहात्म्य एवं उपोद्घात (Prologue & Cosmic Inception)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Sages gather at the holy forest of Naimisharanya and request Suta to impart the supreme, nectar-like wisdom imparted by Lord Agni to Sage Vashistha.',
        verses: [
          {
            sentenceId: 'ap-1-1',
            originalScript: 'ॐ नमः परमात्मने वासुदेवाय। यतो वा इमानि भूतानि जायन्ते येन जातानि जीवन्ति यत्प्रयन्त्यभिसंविशन्ति॥',
            hindiTranslation: 'उस सच्चिदानन्दघन परमात्मा वासुदेव को बारंबार नमस्कार है, जिससे यह सम्पूर्ण दृश्य जगत उत्पन्न होता है, जिसके आश्रय से जीवित रहता है और प्रलयकाल में जिसमें विलीन हो जाता है।',
            englishTranslation: 'Om, salutations unto the Supreme Soul Lord Vasudeva, from Whom all beings are manifested, by Whose grace they live, and into Whom they dissolve.',
            transliteration: 'Oṃ namaḥ paramātmane vāsudevāya | yato vā imāni bhūtāni jāyante...',
            startTime: 0.0,
            endTime: 9.5
          },
          {
            sentenceId: 'ap-1-2',
            originalScript: 'ऋषयः ऊचुः - सूत जानासि सर्वाणि पुराणादीनि तत्वतः। वद नः पावनं ज्ञानं यज्ज्ञात्वा मुच्यते नरः॥',
            hindiTranslation: 'शौनक आदि महर्षियों ने कहा—हे परम ज्ञानी सूतजी! आप समस्त इतिहास, वेद और पुराणों के गूढ़ रहस्य को यथार्थ रूप से जानते हैं। कृपा कर हमें वह पवित्रतम ज्ञान प्रदान करें, जिसे जानकर मनुष्य संसार के जन्म-मरण के चक्र से मुक्त हो जाता है।',
            englishTranslation: 'The venerable Sages said: O wise Suta! You are the master of all sacred Puranas and epics. Narrate unto us that transcendent wisdom by which mortals cross the ocean of samsara.',
            transliteration: 'Ṛṣayaḥ ūcuḥ - sūta jānāsi sarvāṇi purāṇādīni tattvataḥ | vada naḥ pāvanaṃ jñānaṃ...',
            startTime: 9.6,
            endTime: 20.8
          },
          {
            sentenceId: 'ap-1-3',
            originalScript: 'सूत उवाच - शृणुध्वं मुनयः सर्वे अग्निप्रोक्तं महाद्भुतम्। यदाह भगवानग्निर्वसिष्ठाय महात्मने॥',
            hindiTranslation: 'सूतजी ने विनम्र भाव से कहा—हे तपोधन मुनियों! आप एकाग्रचित्त होकर उस महाअद्भुत अग्निपुराण का श्रवण करें, जिसे साक्षात् भगवान अग्निदेव ने ब्रह्मर्षि वसिष्ठ के पूछने पर कृपापूर्वक कहा था।',
            englishTranslation: 'Suta replied: Listen with devotion, O revered ascetics, to this most wondrous wisdom revealed directly by the luminous Deity of Fire unto the exalted Sage Vashistha.',
            transliteration: 'Sūta uvāca - śṛṇudhvaṃ munayaḥ sarve agniproktam mahādbhutam...',
            startTime: 20.9,
            endTime: 32.4
          },
          {
            sentenceId: 'ap-1-4',
            originalScript: 'विद्यासारं परं ब्रह्म द्विविधं तन्निबोधत। परा चैवापरा चैव ब्रह्मविद्या हि शौनका॥',
            hindiTranslation: 'हे शौनक! ज्ञानियों ने समस्त विद्याओं का सारभूत दो प्रकार का ज्ञान बताया है—एक परा विद्या (आत्मज्ञान/ब्रह्मज्ञान) और दूसरी अपरा विद्या (वेद-वेदांग व लौकिक विज्ञान)।',
            englishTranslation: 'Know, O Shaunaka, that the supreme repository of all learning is twofold: Para (the eternal transcendental self-realization) and Apara (the empirical and liturgical sciences).',
            transliteration: 'Vidyāsāraṃ paraṃ brahma dvividhaṃ tannibodhata | parā caivāparā caiva...',
            startTime: 32.5,
            endTime: 44.0
          },
          {
            sentenceId: 'ap-1-5',
            originalScript: 'अग्निपुराणमतुलं सर्वकामप्रदायकम्। पठतां शृण्वतां नृणां भुक्तिमुक्तिप्रदायकम्॥',
            hindiTranslation: 'यह अनुपम अग्निपुराण धर्म, अर्थ, काम और मोक्ष—चारों पुरुषार्थों को देने वाला है। श्रद्धापूर्वक इसका पाठ अथवा श्रवण करने वाले साधक को इहलोक में सर्वविध सुख तथा परलोक में अक्षय मोक्ष की प्राप्ति होती है।',
            englishTranslation: 'This matchless Agni Purana fulfills all righteous desires. Those who read and listen with devotion attain prosperous joy in this life and supreme spiritual liberation hereafter.',
            transliteration: 'Agnipurāṇamatulaṃ sarvakāmapradāyakam | paṭhatāṃ śṛṇvatāṃ nṛṇāṃ...',
            startTime: 44.1,
            endTime: 56.2
          },
          {
            sentenceId: 'ap-1-6',
            originalScript: 'य इदं धारयेन्नित्यं प्रातरुत्थाय मानवः। सर्वपापविनिर्मुक्तो विष्णुलोके महीयते॥',
            hindiTranslation: 'जो मनुष्य ब्रह्ममुहूर्त में उठकर नित्य इस पावन ज्ञान का स्मरण एवं चिंतन करता है, वह जन्म-जन्मांतर के समस्त पाप-तापों से मुक्त होकर भगवान श्रीहरि के परम वैकुण्ठ धाम में प्रतिष्ठित होता है।',
            englishTranslation: 'Whosoever awakens at dawn and meditates upon these sacred verses is liberated from all bondages of karma and abides forever in the luminous realm of Vishnu.',
            transliteration: 'Ya idaṃ dhārayennityaṃ prātarutthāya mānavaḥ | sarvapāpavirmukto viṣṇuloke...',
            startTime: 56.3,
            endTime: 68.0
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'अध्याय २: मत्स्यावतार एवं प्रलय कथा (The Matsya Incarnation & The Great Deluge)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'The divine descent of Lord Vishnu as the golden horned Fish (Matsya Avatar) to rescue King Satyavrata, the seeds of life, and the sacred Vedas during the cosmic deluge.',
        verses: [
          {
            sentenceId: 'ap-2-1',
            originalScript: 'अग्निस्वाहा वदाम्यद्य मत्स्याख्यानं पुरातनम्। सत्यव्रतस्य राजर्षेः उद्धारार्थं यथाऽभवत्॥',
            hindiTranslation: 'भगवान अग्निदेव ने कहा—अब मैं आपको भगवान के प्रथम मत्स्यावतार की पुरातन कथा सुनाता हूँ, जो राजर्षि सत्यव्रत तथा वेदों के उद्धार हेतु प्रकट हुए थे।',
            englishTranslation: 'Lord Agni said: Now I shall narrate the primordial descent of Lord Matsya, who manifested to salvage Rajarshi Satyavrata and the eternal Vedic truths.',
            startTime: 0.0,
            endTime: 12.0
          },
          {
            sentenceId: 'ap-2-2',
            originalScript: 'कृतमालाजलस्पर्शे यदा राजा स्थितोऽभवत्। कराञ्जलौ लघुः मत्स्यः प्रादुर्भूतः कृपानिधिः॥',
            hindiTranslation: 'जब राजा सत्यव्रत कृतमाला नदी में जलांजलि दे रहे थे, तब उनकी हथेली में एक अत्यंत छोटा, स्वर्णिम मत्स्य रूप धारण कर कृपानिधान प्रकट हुए।',
            englishTranslation: 'When King Satyavrata offered water libations at the river Kritamala, the compassionate Lord appeared as a tiny golden fish nestled in his palms.',
            startTime: 12.1,
            endTime: 24.5
          }
        ]
      }
    ]
  },
  {
    title: 'Shrimad Bhagavad Gita (श्रीमद्भगवद्गीता)',
    slug: 'bhagavad-gita',
    religion: 'Hinduism',
    language: 'Sanskrit & Hindi',
    author: 'Bhagavan Sri Krishna',
    description: 'The timeless spiritual dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra, revealing Karma Yoga, Bhakti Yoga, and Jnana Yoga.',
    synopsis: 'The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It presents a synthesis of Hindu ideas about dharma, theistic bhakti, and the yogic paths to moksha.',
    coverImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    price: 349,
    totalChapters: 18,
    masterPdfKey: 'master-bhagavad-gita.pdf',
    rating: 4.99,
    versesCount: 700,
    featured: true,
    authenticitySource: 'Bhandarkar Oriental Research Institute (BORI) Critical Text Edition',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'अध्याय १: अर्जुनविषादयोग (The Yoga of Arjuna’s Despair)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
        summary: 'Dhritarashtra questions Sanjaya regarding the battlefield of Kurukshetra as Arjuna is overwhelmed by grief and compassion.',
        verses: [
          {
            sentenceId: 'bg-1-1',
            originalScript: 'धृतराष्ट्र उवाच - धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥',
            hindiTranslation: 'धृतराष्ट्र ने पूछा—हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?',
            englishTranslation: 'Dhritarashtra said: O Sanjaya, assembled on the sacred plain of Kurukshetra, desirous of fighting, what did my sons and the sons of Pandu do?',
            startTime: 0.0,
            endTime: 10.5
          }
        ]
      }
    ]
  },
  {
    title: 'The Holy Quran - Surah Al-Fatiha & Al-Baqarah (القرآن الكريم)',
    slug: 'the-holy-quran',
    religion: 'Islam',
    language: 'Arabic & Urdu / Hindi',
    author: 'Divine Revelation to Prophet Muhammad (PBUH)',
    description: 'The sublime divine revelation providing moral guidance, universal justice, spiritual illumination, and righteous path for humanity.',
    synopsis: 'The Holy Quran is the central religious text of Islam, believed by Muslims to be a revelation from God (Allah). Revered for its unsurpassed literary beauty and profound moral teachings.',
    coverImageUrl: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=800&auto=format&fit=crop',
    price: 399,
    totalChapters: 114,
    masterPdfKey: 'master-holy-quran.pdf',
    rating: 4.98,
    versesCount: 6236,
    featured: true,
    authenticitySource: 'King Fahd Glorious Quran Printing Complex Authorized Uthmani Script',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f795cb.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'سورة الفاتحة (The Opening - अल-फातिहा)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f795cb.mp3',
        summary: 'The Opening Seven Verses of the Quran, praising the Lord of all creation, His boundless mercy, and praying for the straight path.',
        verses: [
          {
            sentenceId: 'q-1-1',
            originalScript: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            hindiTranslation: 'अल्लाह के नाम से, जो अत्यंत कृपाशील और परम दयालु है।',
            englishTranslation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
            startTime: 0.0,
            endTime: 5.5
          },
          {
            sentenceId: 'q-1-2',
            originalScript: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
            hindiTranslation: 'सब प्रशंसा अल्लाह ही के लिए है जो सारे संसार का पालनहार है।',
            englishTranslation: '[All] praise is [due] to Allah, Lord of the worlds.',
            startTime: 5.6,
            endTime: 11.2
          }
        ]
      }
    ]
  },
  {
    title: 'Sri Japji Sahib & Guru Granth Sahib (ਜਪੁਜੀ ਸਾਹਿਬ)',
    slug: 'japji-sahib',
    religion: 'Sikhism',
    language: 'Gurmukhi & Hindi',
    author: 'Sri Guru Nanak Dev Ji',
    description: 'The foundation prayer of Sikh philosophy, proclaiming the Oneness of the Divine (Ik Onkar), truthfulness, divine grace, and cosmic harmony.',
    synopsis: 'Japji Sahib is the opening holy hymn found at the beginning of Sri Guru Granth Sahib Ji, composed by Guru Nanak Dev Ji.',
    coverImageUrl: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=800&auto=format&fit=crop',
    price: 249,
    totalChapters: 38,
    masterPdfKey: 'master-japji-sahib.pdf',
    rating: 4.97,
    versesCount: 38,
    featured: true,
    authenticitySource: 'Shiromani Gurdwara Parbandhak Committee (SGPC) Standard Script',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'ਮੂਲ ਮੰਤਰ ਅਤੇ ਪਉੜੀ ੧ (Mool Mantar & Pauri 1)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'The Primordial Declaration of Universal Oneness.',
        verses: [
          {
            sentenceId: 'js-1-1',
            originalScript: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
            hindiTranslation: 'ईश्वर एक है, उसका नाम सत्य है, वह सृष्टिकर्ता है, निर्भय है, निर्वैर है, जिसका स्वरूप काल से परे है, जो अजन्मा है, स्वयंभू है और गुरु की कृपा से प्राप्त होता है।',
            englishTranslation: 'One Universal Creator God, The Name Is Truth, Creative Being Personified, No Fear, No Hatred, Image Of The Undying, Beyond Birth, Self-Existent, By Guru’s Grace.',
            startTime: 0.0,
            endTime: 14.0
          }
        ]
      }
    ]
  },
  {
    title: 'The Book of Psalms & Gospels (पवित्र भजन संहिता)',
    slug: 'the-holy-bible-psalms',
    religion: 'Christianity',
    language: 'Hebrew / English & Hindi',
    author: 'King David & Prophets',
    description: 'Poetic hymns of praise, faith, consolation, forgiveness, and divine refuge in times of trouble and spiritual devotion.',
    synopsis: 'The Book of Psalms is a collection of ancient devotional lyric songs and prayers expressing the deepest human emotions toward the Almighty Creator.',
    coverImageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop',
    price: 279,
    totalChapters: 150,
    masterPdfKey: 'master-holy-bible.pdf',
    rating: 4.92,
    versesCount: 2461,
    featured: true,
    authenticitySource: 'Ecumenical Standard Biblical Manuscript Archives',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Psalm 23: प्रभु मेरा चरवाहा है (The Lord is My Shepherd)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
        summary: 'David praises the caring stewardship of God guiding him through green pastures and dark valleys.',
        verses: [
          {
            sentenceId: 'ps-23-1',
            originalScript: 'יְהוָה רֹעִי לֹא אֶחְסָר׃ (The LORD is my shepherd; I shall not want.)',
            hindiTranslation: 'यहोवा मेरा चरवाहा है, मुझे कुछ घटी न होगी। वह मुझे हरी-हरी चराइयों में बैठाता है।',
            englishTranslation: 'The LORD is my shepherd; I shall not want. He makes me lie down in green pastures.',
            startTime: 0.0,
            endTime: 10.0
          }
        ]
      }
    ]
  },
  {
    title: 'The Dhammapada (धम्मपद - बुद्ध वाणी)',
    slug: 'dhammapada',
    religion: 'Buddhism',
    language: 'Pali & Hindi',
    author: 'Gautama Buddha',
    description: 'The golden collection of aphorisms spoken by the Buddha on mindfulness, mental mastery, peace, detachment, and supreme enlightenment (Nirvana).',
    synopsis: 'The Dhammapada is a collection of sayings of the Buddha in verse form and one of the most widely read Buddhist scriptures from the Khuddaka Nikaya.',
    coverImageUrl: 'https://images.unsplash.com/photo-1548625361-195feee10fce?q=80&w=800&auto=format&fit=crop',
    price: 249,
    totalChapters: 26,
    masterPdfKey: 'master-dhammapada.pdf',
    rating: 4.96,
    versesCount: 423,
    featured: true,
    authenticitySource: 'Pali Text Society Standard Canonical Edition',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'यमकवग्गो (युगल वर्ग - Yamaka Vagga: The Twin Verses)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'The nature of mind: thoughts precede deeds, and purity of mind brings abiding joy.',
        verses: [
          {
            sentenceId: 'dp-1-1',
            originalScript: 'मनोपुब्बङ्गमा धम्मा मनोसेट्ठा मनोमया। मनसा चे पदुट्ठेन भासति वा करोति वा। ततो नं दुक्खमन्वेति चक्कं व वहतो पदं॥',
            hindiTranslation: 'सभी मानसिक अवस्थाओं का आधार मन ही है, मन ही उनका प्रधान है और वे मन से ही उत्पन्न होती हैं। यदि कोई दूषित मन से बोलता या कर्म करता है, तो दुःख उसका उसी प्रकार पीछा करता है जैसे बैल के पैर के पीछे गाड़ी का पहिया।',
            englishTranslation: 'Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with an impure mind a person speaks or acts, suffering follows him like the wheel that follows the foot of the ox.',
            startTime: 0.0,
            endTime: 14.5
          }
        ]
      }
    ]
  },
  {
    title: 'Tattvartha Sutra (तत्त्वार्थ सूत्र)',
    slug: 'tattvartha-sutra',
    religion: 'Jainism',
    language: 'Sanskrit & Hindi',
    author: 'Acharya Umaswati',
    description: 'The definitive Jain philosophical treatise explaining the nature of reality, non-violence (Ahimsa), karma, right faith, right knowledge, and right conduct.',
    synopsis: 'Tattvartha Sutra is an ancient Jain text written in Sanskrit by Acharya Umaswati.',
    coverImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    price: 249,
    totalChapters: 10,
    masterPdfKey: 'master-tattvartha-sutra.pdf',
    rating: 4.94,
    versesCount: 357,
    featured: false,
    authenticitySource: 'Shrimad Rajchandra Manuscript Archives & Oriental Institute',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'अध्याय १: सम्यग्दर्शन-ज्ञान-चारित्राणि मोक्षमार्गः (The Path to Liberation)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Right Faith, Right Knowledge, and Right Conduct together constitute the singular path to ultimate liberation.',
        verses: [
          {
            sentenceId: 'ts-1-1',
            originalScript: 'सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥',
            hindiTranslation: 'सम्यक् दर्शन (सच्ची श्रद्धा), सम्यक् ज्ञान (यथार्थ ज्ञान) और सम्यक् चारित्र (सदाचरण)—इन तीनों की एकता ही मोक्ष (परम मुक्ति) का मार्ग है।',
            englishTranslation: 'Right Faith, Right Knowledge, and Right Conduct together constitute the true path to Liberation.',
            startTime: 0.0,
            endTime: 9.0
          }
        ]
      }
    ]
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create a demo user if not exists
    const demoEmail = 'seeker@sacredreads.org';
    let user = await User.findOne({ email: demoEmail });
    if (!user) {
      user = await User.create({
        name: 'Devout Seeker',
        email: demoEmail,
        role: 'user',
        purchasedBooks: [],
        bookmarks: []
      });
      console.log('👤 Created demo user:', demoEmail);
    }

    console.log('Clearing existing books and chapters...');
    await Book.deleteMany({});
    await Chapter.deleteMany({});

    for (const bookData of SEED_BOOKS) {
      const { chapters, ...bookFields } = bookData;
      const createdBook = await Book.create(bookFields);
      console.log(`📖 Seeded Book: ${createdBook.title} (${createdBook.religion})`);

      for (const ch of chapters) {
        await Chapter.create({
          bookId: createdBook._id,
          chapterNumber: ch.chapterNumber,
          title: ch.title,
          audioUrl: ch.audioUrl,
          summary: ch.summary,
          verses: ch.verses,
        });
        console.log(`   └── Chapter ${ch.chapterNumber}: ${ch.title} (${ch.verses.length} verses)`);
      }
    }

    console.log('\n🌟 Seeding complete! Database successfully populated with Agni Puran and multi-faith scriptures.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
