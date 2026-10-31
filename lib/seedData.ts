export interface VerseItem {
  sentenceId: string;
  originalScript: string;
  hindiTranslation: string;
  englishTranslation: string;
  transliteration?: string;
  startTime: number;
  endTime: number;
  aiInsight?: {
    symbolism: string;
    lifeLesson: string;
    mantraBenefit: string;
  };
}

export interface SeedBook {
  title: string;
  slug: string;
  religion: 'Hinduism' | 'Islam' | 'Christianity' | 'Sikhism' | 'Buddhism' | 'Jainism';
  language: string;
  author: string;
  description: string;
  synopsis: string;
  coverImageUrl: string;
  price: number;
  totalChapters: number;
  masterPdfKey: string;
  rating: number;
  versesCount: number;
  featured: boolean;
  authenticitySource: string;
  audioPreviewUrl: string;
  originalPdfUrl?: string;
  chapters: {
    chapterNumber: number;
    title: string;
    audioUrl: string;
    summary: string;
    verses: VerseItem[];
  }[];
}

export const SEED_BOOKS: SeedBook[] = [
  {
    title: 'Shrimad Bhagavad Gita (श्रीमद्भगवद्गीता)',
    slug: 'bhagavad-gita',
    religion: 'Hinduism',
    language: 'Sanskrit & Hindi',
    author: 'Bhagavan Sri Krishna / Maharshi Ved Vyasa',
    description: 'The supreme spiritual dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra, revealing Karma Yoga, Bhakti Yoga, and Jnana Yoga.',
    synopsis: 'The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It presents a synthesis of Hindu ideas about dharma, theistic bhakti, and the yogic paths to moksha.',
    coverImageUrl: '/covers/bhagavad-gita.svg',
    price: 49,
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
            transliteration: 'dhṛtarāṣṭra uvāca - dharmakṣetre kurukṣetre samavetā yuyutsavaḥ...',
            startTime: 0.0,
            endTime: 10.5
          },
          {
            sentenceId: 'bg-1-2',
            originalScript: 'सञ्जय उवाच - दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा। आचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥',
            hindiTranslation: 'संजय ने कहा—उस समय राजा दुर्योधन ने व्यूहरचनायुक्त पाण्डवों की सेना को देखकर द्रोणाचार्य के पास जाकर यह वचन कहा।',
            englishTranslation: 'Sanjaya said: Having seen the army of the Pandavas drawn up in battle array, King Duryodhana approached his teacher Drona and spoke these words.',
            transliteration: 'sañjaya uvāca - dṛṣṭvā tu pāṇḍavānīkaṃ vyūḍhaṃ duryodhanastadā...',
            startTime: 10.6,
            endTime: 21.0
          },
          {
            sentenceId: 'bg-1-3',
            originalScript: 'पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्। व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता॥',
            hindiTranslation: 'हे आचार्य! आपके बुद्धिमान शिष्य द्रुपदपुत्र (धृष्टद्युम्न) द्वारा व्यूहाकार खड़ी की गई पाण्डुपुत्रों की इस विशाल सेना को देखिए।',
            englishTranslation: 'Behold, O master, this mighty army of the sons of Pandu, arrayed by the son of Drupada, your talented pupil.',
            transliteration: 'paśyaitāṃ pāṇḍuputrāṇāmācārya mahatīṃ camūm...',
            startTime: 21.1,
            endTime: 32.5
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'अध्याय २: सांख्ययोग (The Yoga of Pure Knowledge & Karma)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
        summary: 'Lord Krishna reveals the eternal, indestructible nature of the Soul (Atman) and the divine art of Nishkama Karma Yoga.',
        verses: [
          {
            sentenceId: 'bg-2-1',
            originalScript: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
            hindiTranslation: 'तेरा केवल कर्म करने में ही अधिकार है, उसके फलों में कभी नहीं। इसलिए तू कर्मफल का हेतु मत बन और न ही तेरी अकर्म में आसक्ति हो।',
            englishTranslation: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results.',
            transliteration: 'karmaṇyevādhikāraste mā phaleṣu kadācana...',
            startTime: 0.0,
            endTime: 12.0
          },
          {
            sentenceId: 'bg-2-2',
            originalScript: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः। न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥',
            hindiTranslation: 'इस आत्मा को न शस्त्र काट सकते हैं, न आग जला सकती है, न जल गीला कर सकता है और न वायु सुखा सकती है। यह अमर और शाश्वत है।',
            englishTranslation: 'Weapons cannot cut the soul, fire cannot burn it, water cannot wet it, nor can the wind dry it. It is eternal and immortal.',
            transliteration: 'nainaṃ chindanti śastrāṇi nainaṃ dahati pāvakaḥ...',
            startTime: 12.1,
            endTime: 24.0
          }
        ]
      }
    ]
  },
  {
    title: 'The Holy Quran (القرآن الكريم)',
    slug: 'the-holy-quran',
    religion: 'Islam',
    language: 'Arabic & Hindi / English',
    author: 'Divine Revelation to Prophet Muhammad (PBUH)',
    description: 'The sublime divine revelation providing universal moral guidance, righteous path, mercy, and peace for humanity.',
    synopsis: 'The Holy Quran is the central religious text of Islam, believed by Muslims to be a revelation from God (Allah). Revered for its unsurpassed literary beauty and profound moral teachings.',
    coverImageUrl: '/covers/holy-quran.svg',
    price: 49,
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
        title: 'سورة الفاتحة (Surah Al-Fatiha - The Opening)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f795cb.mp3',
        summary: 'The Opening Seven Verses of the Quran, praising the Lord of all creation, His boundless mercy, and praying for the straight path.',
        verses: [
          {
            sentenceId: 'q-1-1',
            originalScript: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            hindiTranslation: 'अल्लाह के नाम से, जो अत्यंत कृपाशील और परम दयालु है।',
            englishTranslation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
            transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
            startTime: 0.0,
            endTime: 5.5
          },
          {
            sentenceId: 'q-1-2',
            originalScript: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
            hindiTranslation: 'सब प्रशंसा अल्लाह ही के लिए है जो सारे संसार का पालनहार है।',
            englishTranslation: '[All] praise is [due] to Allah, Lord of the worlds.',
            transliteration: 'Al-ḥamdu lillāhi Rabbil-ʻālamīn',
            startTime: 5.6,
            endTime: 11.2
          },
          {
            sentenceId: 'q-1-3',
            originalScript: 'الرَّحْمَٰنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ',
            hindiTranslation: 'बड़ा दयालु, अति कृपालु, न्याय के दिन का स्वामी।',
            englishTranslation: 'The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense.',
            transliteration: 'Ar-Raḥmānir-Raḥīm | Māliki yawmid-dīn',
            startTime: 11.3,
            endTime: 18.0
          },
          {
            sentenceId: 'q-1-4',
            originalScript: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
            hindiTranslation: 'हमें सीधे मार्ग पर चला, उन लोगों के मार्ग पर जिन पर तूने कृपा की।',
            englishTranslation: 'Guide us to the straight path - The path of those upon whom You have bestowed favor.',
            transliteration: 'Ihdinaṣ-ṣirāṭal-mustaqīm...',
            startTime: 18.1,
            endTime: 28.0
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'سورة البقرة - آية الكرسي (Ayat Al-Kursi)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f795cb.mp3',
        summary: 'The Throne Verse - The supreme declaration of God’s eternal existence, power, and sovereign grace.',
        verses: [
          {
            sentenceId: 'q-2-1',
            originalScript: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
            hindiTranslation: 'अल्लाह, जिसके सिवा कोई सच्चा पूज्य नहीं, वह सदा जीवित और सबका थामने वाला है। उसे न तो ऊंघ आती है और न नींद।',
            englishTranslation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.',
            transliteration: 'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm...',
            startTime: 0.0,
            endTime: 14.0
          }
        ]
      }
    ]
  },
  {
    title: 'The Holy Bible (पवित्र बाइबिल - Psalms & Gospels)',
    slug: 'the-holy-bible-psalms',
    religion: 'Christianity',
    language: 'Hebrew / English & Hindi',
    author: 'King David & Prophets',
    description: 'Poetic lyric songs and teachings of faith, love, solace, and spiritual sanctuary.',
    synopsis: 'The Holy Bible is the sacred scripture of Christianity. The Book of Psalms expresses human gratitude, deep devotion, and refuge in the Almighty.',
    coverImageUrl: '/covers/holy-bible.svg',
    price: 49,
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
          },
          {
            sentenceId: 'ps-23-2',
            originalScript: 'גַּם כִּי־אֵלֵךְ בְּגֵיא צַלְמָוֶת לֹא־אִירָא רָע (Though I walk through the valley of the shadow of death, I will fear no evil)',
            hindiTranslation: 'चाहे मैं घोर अंधकार से भरी घाटी से होकर चलूं, तो भी किसी बुराई से न डरूंगा; क्योंकि तू मेरे साथ रहता है।',
            englishTranslation: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
            startTime: 10.1,
            endTime: 22.0
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'Gospel of John: प्रारंभ में वचन था (In the Beginning was the Word)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
        summary: 'The eternal divine Word that brings light and life unto all humankind.',
        verses: [
          {
            sentenceId: 'jn-1-1',
            originalScript: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
            hindiTranslation: 'आदि में वचन था, और वचन परमेश्वर के साथ था, और वचन ही परमेश्वर था।',
            englishTranslation: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
            startTime: 0.0,
            endTime: 11.0
          }
        ]
      }
    ]
  },
  {
    title: 'Sri Guru Granth Sahib & Japji Sahib (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ)',
    slug: 'japji-sahib',
    religion: 'Sikhism',
    language: 'Gurmukhi & Hindi',
    author: 'Sri Guru Nanak Dev Ji',
    description: 'The foundation prayer of Sikh philosophy, proclaiming Universal Oneness (Ik Onkar), divine grace, and cosmic harmony.',
    synopsis: 'Japji Sahib is the opening holy hymn found at the beginning of Sri Guru Granth Sahib Ji, composed by Guru Nanak Dev Ji.',
    coverImageUrl: '/covers/guru-granth-sahib.svg',
    price: 49,
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
        summary: 'The Primordial Declaration of Universal Oneness and the path of abiding by Divine Will.',
        verses: [
          {
            sentenceId: 'js-1-1',
            originalScript: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
            hindiTranslation: 'ईश्वर एक है, उसका नाम सत्य है, वह सृष्टिकर्ता है, निर्भय है, निर्वैर है, जिसका स्वरूप काल से परे है, जो अजन्मा है, स्वयंभू है और गुरु की कृपा से प्राप्त होता है।',
            englishTranslation: 'One Universal Creator God, The Name Is Truth, Creative Being Personified, No Fear, No Hatred, Image Of The Undying, Beyond Birth, Self-Existent, By Guru’s Grace.',
            transliteration: 'Ik Oaṅkār Sat Nām Kartā Purakh Nirbhau Nirvair Akāl Mūrat Ajūnī Saibhaṅ Gur Prasād',
            startTime: 0.0,
            endTime: 14.0
          },
          {
            sentenceId: 'js-1-2',
            originalScript: '॥ ਜਪੁ ॥ ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥ ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥੧॥',
            hindiTranslation: 'जप: वह परमात्मा सृष्टि के आरम्भ में सत्य था, युगों के आरम्भ में सत्य था, वर्तमान में भी सत्य है और हे नानक! भविष्य में भी सदैव सत्य ही रहेगा।',
            englishTranslation: 'Chant: True in the Primal Beginning, True through all ages, True even here and now, O Nanak, Forever and ever True.',
            transliteration: 'Jap | Ād Sach Jugād Sach | Hai Bhī Sach Nānak Hosī Bhī Sach',
            startTime: 14.1,
            endTime: 26.5
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'ਪਉੜੀ ੨: ਹੁਕਮੀ ਹੋਵਨਿ ਆਕਾਰ (Pauri 2 - The Divine Command)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'All forms and creation are sustained by the supreme Divine Will (Hukam).',
        verses: [
          {
            sentenceId: 'js-2-1',
            originalScript: 'ਹੁਕਮੀ ਹੋਵਨਿ ਆਕਾਰ ਹੁਕਮੁ ਨ ਕਹਿਆ ਜਾਈ ॥ ਹੁਕਮੀ ਹੋਵਨਿ ਜੀਅ ਹੁਕਮਿ ਮਿਲੈ ਵਡਿਆਈ ॥',
            hindiTranslation: 'परमात्मा के हुकम (आज्ञा) से ही सब आकार बनते हैं, उसका हुकम कहा नहीं जा सकता। हुकम से ही सब जीव उत्पन्न होते हैं और बड़प्पन पाते हैं।',
            englishTranslation: 'By His Command, all forms are created; His Command cannot be described. By His Command, souls come into being.',
            startTime: 0.0,
            endTime: 15.0
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
    description: 'The golden collection of aphorisms spoken by the Buddha on mindfulness, peace, compassion, and supreme Nirvana.',
    synopsis: 'The Dhammapada is a collection of sayings of the Buddha in verse form and one of the most widely read Buddhist scriptures from the Khuddaka Nikaya.',
    coverImageUrl: '/covers/dhammapada.svg',
    price: 49,
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
        summary: 'The nature of mind: thoughts precede deeds, and purity of mind brings abiding peace.',
        verses: [
          {
            sentenceId: 'dp-1-1',
            originalScript: 'मनोपुब्बङ्गमा धम्मा मनोसेट्ठा मनोमया। मनसा चे पदुट्ठेन भासति वा करोति वा। ततो नं दुक्खमन्वेति चक्कं व वहतो पदं॥',
            hindiTranslation: 'सभी मानसिक अवस्थाओं का आधार मन ही है, मन ही उनका प्रधान है और वे मन से ही उत्पन्न होती हैं। यदि कोई दूषित मन से बोलता या कर्म करता है, तो दुःख उसका उसी प्रकार पीछा करता है जैसे बैल के पैर के पीछे गाड़ी का पहिया।',
            englishTranslation: 'Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with an impure mind a person speaks or acts, suffering follows him like the wheel that follows the foot of the ox.',
            transliteration: 'Manopubbaṅgamā dhammā manoseṭṭhā manomayā...',
            startTime: 0.0,
            endTime: 14.5
          },
          {
            sentenceId: 'dp-1-2',
            originalScript: 'न हि वेरेन वेरानि सम्मन्तीध कुदाचनं। अवेरेन च सम्मन्ति एस धम्मो सनन्तनो॥',
            hindiTranslation: 'इस संसार में बैर से बैर कभी शांत नहीं होता; केवल निर्वैर (प्रेम व करुणा) से ही बैर शांत होता है—यही सनातन धर्म (शाश्वत नियम) है।',
            englishTranslation: 'Hatred does not cease by hatred at any time; hatred ceases only by love. This is an unalterable eternal law.',
            transliteration: 'Na hi verena verāni sammantīdha kudācanaṃ...',
            startTime: 14.6,
            endTime: 28.0
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'अप्पमादवग्गो (अप्रमाद वर्ग - Appamada Vagga: Mindfulness)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Mindfulness is the path to the Deathless; heedlessness is the path of death.',
        verses: [
          {
            sentenceId: 'dp-2-1',
            originalScript: 'अप्पमादो अमतपदं पमादो मच्चुनो पदं। अप्पमत्ता न मीयन्ति ये पमत्ता यथा मता॥',
            hindiTranslation: 'अप्रमाद (जागरूकता/सावधानी) अमरता का मार्ग है और प्रमाद (लापरवाही) मृत्यु का मार्ग है। जो जागरूक हैं वे कभी नहीं मरते, जो लापरवाह हैं वे मृत समान हैं।',
            englishTranslation: 'Mindfulness is the path to the Deathless; heedlessness is the path of death. The mindful do not die, but the heedless are already like the dead.',
            startTime: 0.0,
            endTime: 14.0
          }
        ]
      }
    ]
  },
  {
    title: 'Kalpa Sutra & Tattvartha Sutra (कल्प सूत्र एवं तत्त्वार्थ सूत्र)',
    slug: 'tattvartha-sutra',
    religion: 'Jainism',
    language: 'Sanskrit & Hindi',
    author: 'Acharya Umaswati / Bhadrabahu',
    description: 'The definitive Jain philosophical treatise explaining non-violence (Ahimsa), right faith, right knowledge, and right conduct.',
    synopsis: 'Tattvartha Sutra is an ancient Jain text written in Sanskrit by Acharya Umaswati. It is accepted as authoritative by both Digambara and Svetambara traditions.',
    coverImageUrl: '/covers/kalpa-sutra.svg',
    price: 49,
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
            transliteration: 'Samyag-darśana-jñāna-cāritrāṇi mokṣamārgaḥ',
            startTime: 0.0,
            endTime: 9.0
          },
          {
            sentenceId: 'ts-1-2',
            originalScript: 'तत्त्वार्थश्रद्धानं सम्यग्दर्शनम्॥ तन्निसर्गादधिगमाद्वा॥',
            hindiTranslation: 'जीवादि सात तत्त्वों का यथार्थ श्रद्धान करना ही सम्यग्दर्शन है। यह दर्शन स्वभाव से अथवा गुरु के उपदेश से उत्पन्न होता है।',
            englishTranslation: 'Belief in substances (tattvas) ascertained as they are is right faith. It is born either naturally by intuition or through learning.',
            transliteration: 'Tattvārtha-śraddhānaṃ samyagdarśanam | tannisargādadhigamādvā',
            startTime: 9.1,
            endTime: 20.0
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'अध्याय २: जीव तत्त्व एवं अहिंसा (Soul & Ahimsa Principle)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'The non-violent essence of all living souls and mutual interdependence of all life.',
        verses: [
          {
            sentenceId: 'ts-2-1',
            originalScript: 'परस्परोपग्रहो जीवानाम्॥',
            hindiTranslation: 'सभी जीव एक-दूसरे के उपकार और कल्याण के लिए हैं। परस्पर सहयोग और अहिंसा ही जीवन का मूल आधार है।',
            englishTranslation: 'Souls render service to one another. Mutual interdependence and non-violence is the fundamental nature of life.',
            startTime: 0.0,
            endTime: 10.0
          }
        ]
      }
    ]
  },
  {
    title: 'Agni Puran (अग्नि पुराण)',
    slug: 'agni-puran',
    religion: 'Hinduism',
    language: 'Sanskrit & Hindi',
    author: 'Maharshi Ved Vyasa / Lord Agni',
    description: 'The encyclopedic Mahapurana recited by Agni Dev to Sage Vashistha, illuminating cosmology, Vedic science, rituals, and ultimate liberation.',
    synopsis: 'Agni Purana is one of the eighteen major Puranas of Hinduism. Categorized as a Rajasika Purana, it was declared directly by Agni (the Fire God) to Sage Vashistha.',
    coverImageUrl: '/covers/agni-puran.svg',
    price: 49,
    totalChapters: 383,
    masterPdfKey: 'master-agni-puran.pdf',
    rating: 4.95,
    versesCount: 15400,
    featured: true,
    authenticitySource: 'Varanasi Sanskrit Mahavidyalaya Critical Manuscript Archive',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    chapters: [
      {
        chapterNumber: 1,
        title: 'अध्याय १: अग्निपुराण माहात्म्य एवं उपोद्घात (Prologue & Cosmic Inception)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Sages gather at the holy forest of Naimisharanya and request Suta to impart the supreme wisdom imparted by Lord Agni.',
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
            hindiTranslation: 'शौनक आदि महर्षियों ने कहा—हे परम ज्ञानी सूतजी! आप समस्त इतिहास, वेद और पुराणों के गूढ़ रहस्य को यथार्थ रूप से जानते हैं। कृपा कर हमें वह पवित्रतम ज्ञान प्रदान करें।',
            englishTranslation: 'The venerable Sages said: O wise Suta! You are the master of all sacred Puranas and epics. Narrate unto us that transcendent wisdom by which mortals cross the ocean of samsara.',
            transliteration: 'Ṛṣayaḥ ūcuḥ - sūta jānāsi sarvāṇi purāṇādīni tattvataḥ...',
            startTime: 9.6,
            endTime: 20.8
          }
        ]
      }
    ]
  },
  {
    title: 'Shri Durga Saptashati (श्री दुर्गा सप्तशती - चंडी पाठ)',
    slug: 'durga-saptashati',
    religion: 'Hinduism',
    language: 'Sanskrit & Hindi / English',
    author: 'Maharshi Markandeya (Markandeya Purana) / Geeta Press Gorakhpur',
    description: 'The supreme 700-verse Shakta scripture from Markandeya Purana celebrating Maa Durga’s victory over demonic forces, featuring Mahakali, Mahalakshmi, and Mahasaraswati Charitras with audio-synced recitation.',
    synopsis: 'श्री दुर्गा सप्तशती (चंडी पाठ अथवा देवी माहात्म्य) सनातन धर्म का सर्वाधिक जागृत, सिद्ध एवं फलदायी ग्रंथ है। मार्कण्डेय पुराण के 13 अध्यायों में संकलित यह 700 श्लोकों का दिव्य संग्रह जीवन के सभी संकटों, भय, और रोगों का निवारण कर धर्म, अर्थ, काम और मोक्ष प्रदान करता है। गीता प्रेस गोरखपुर कोड 118 के प्रामाणिक पाठ पर आधारित।',
    coverImageUrl: '/covers/durga-saptashati.svg',
    price: 0,
    totalChapters: 13,
    masterPdfKey: 'master-durga-saptashati.pdf',
    rating: 4.99,
    versesCount: 700,
    featured: true,
    authenticitySource: 'Geeta Press Gorakhpur (Code 118) & Markandeya Purana Manuscript Edition',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    originalPdfUrl: 'https://archive.org/download/durga-saptashati-geetapress/Durga_Saptashati.pdf',
    chapters: [
      {
        chapterNumber: 1,
        title: 'प्रथम अध्याय: मधुकैटभवध (The Slaying of Madhu & Kaitabha - Mahakali Avatara)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Sage Medha enlightens King Suratha and Samadhi Vaishya on Mahamaya. Lord Brahma offers hymns to Yoga Nidra Devi to awaken Lord Vishnu and vanquish demons Madhu and Kaitabha.',
        verses: [
          {
            sentenceId: 'ds-1-1',
            originalScript: 'ॐ नमश्चण्डिकायै॥ ॐ ऐं मार्कण्डेय उवाच - सावर्णिः सूर्यतनयो यो मनुः कथ्यतेऽष्टमः। निशामय तदुत्पत्तिं विस्तराद् गदतो मम॥',
            hindiTranslation: 'भगवती चण्डिका को नमस्कार है। महर्षि मार्कण्डेय बोले—सूर्य के पुत्र सावर्णि, जो आठवें मनु कहे जाते हैं, उनकी उत्पत्ति की कथा मैं विस्तार से कहता हूँ, सुनिए।',
            englishTranslation: 'Salutations to the Supreme Goddess Chandika. Sage Markandeya said: Hear from me in detail the story of the birth of Savarni, the son of the Sun, who is reckoned as the eighth Manu.',
            transliteration: 'Oṃ namaścaṇḍikāyai || Oṃ aiṃ mārkaṇḍeya uvāca - sāvarṇiḥ sūryatanayo yo manuḥ kathyate’ṣṭamaḥ...',
            startTime: 0.0,
            endTime: 12.0,
            aiInsight: {
              symbolism: 'सूर्य का पुत्र सावर्णि ज्ञान का प्रतीक है। मार्कण्डेय मुनि का उपदेश चित्त को सांसारिक मोह से जगाकर पराचेतना की ओर ले जाता है।',
              lifeLesson: 'जब जीवन में सब कुछ लुट जाए (जैसे राजा सुरथ का राज्य और समाधि वैश्य का धन), तब भी आत्मज्ञान और श्रद्धा से नया अभ्युदय संभव है।',
              mantraBenefit: 'इस श्लोक से पाठ आरम्भ करने पर देवी चण्डिका की अमोघ कृपा प्राप्त होती है और मन में एकाग्रता स्थापित होती है।'
            }
          },
          {
            sentenceId: 'ds-1-2',
            originalScript: 'महामाया हरेश्चैषा तया संमोह्यते जगत्। ज्ञानिनामपि चेतांसि देवी भगवती हि सा। बलादाकृष्य मोहाय महामाया प्रयच्छति॥',
            hindiTranslation: 'वे भगवती महामाया भगवान विष्णु की योगनिद्रा रूपिणी शक्ति हैं, जिनसे यह संपूर्ण जगत मोहित हो रहा है। वे देवी ज्ञानियों के भी चित्त को बलपूर्वक खींचकर मोह में डाल देती हैं।',
            englishTranslation: 'She is Mahamaya, the divine power of Lord Hari, by whom this entire cosmos is held in delusion. She forcibly draws away even the minds of the wise into worldly illusion.',
            transliteration: 'mahāmāyā hareścaiṣā tayā saṃmohyate jagat | jñānināmapi cetāṃsi devī bhagavatī hi sā | balādākṛṣya mohāya mahāmāyā prayacchati ||',
            startTime: 12.1,
            endTime: 24.5,
            aiInsight: {
              symbolism: 'महामाया कोई नकारात्मक माया नहीं, अपितु सृष्टि को चलाने वाली त्रिगुणात्मिका शक्ति है। यह चेतना का आवरण भी है और मुक्तिदाता द्वार भी।',
              lifeLesson: 'अहंकार न करें कि हम अत्यंत ज्ञानी हैं; वासना और मोह किसी को भी विचलित कर सकते हैं। केवल समर्पण ही रक्षा करता है।',
              mantraBenefit: 'माया के बंधनों, मानसिक तनाव और अनिद्रा (Depression/Insomnia) से मुक्ति के लिए इस श्लोक का स्मरण अचूक औषधि है।'
            }
          },
          {
            sentenceId: 'ds-1-3',
            originalScript: 'त्वं स्वाहा त्वं स्वधा त्वं हि वषट्कारः स्वरात्मिका। सुधा त्वमक्षरे नित्ये त्रिधा मात्रात्मिका स्थिता॥',
            hindiTranslation: 'हे देवि! आप ही स्वाहा (यज्ञ आहुति), आप ही स्वधा (पितृ तृप्ति), आप ही वषट्कार और स्वरूपा हैं। आप ही अमृत, अविनाशी प्रणव अक्षर और अ, उ, म तीन मात्राओं के रूप में स्थित हैं।',
            englishTranslation: 'Thou art Svaha (oblation to gods), Thou art Svadha (oblation to ancestors), Thou art Vashatkara and the soul of sound. Thou art nectar, eternal syllable Om, abiding in the three sacred moras.',
            transliteration: 'tvaṃ svāhā tvaṃ svadhā tvaṃ hi vaṣaṭkāraḥ svarātmikā | sudhā tvamakṣare nitye tridhā mātrātmikā sthitā ||',
            startTime: 24.6,
            endTime: 38.0,
            aiInsight: {
              symbolism: 'ब्रह्माजी की यह स्तुति ओंकार (नादब्रह्म) और यज्ञीय शक्तियों का महामंत्र है। देवी समस्त ब्रह्मांडीय ध्वनि और प्राण की अधिष्ठात्री हैं।',
              lifeLesson: 'वाणी और विचारों में पवित्रता रखें; जो हम जगत को आहुति के रूप में देते हैं, वही अमृत बनकर हमारे पास लौटता है।',
              mantraBenefit: 'सरस्वती कृपा, मंत्र सिद्धि तथा आध्यात्मिक वाणी सिद्धि के लिए इस ब्रह्मस्तुति का पाठ परम कल्याणकारी है।'
            }
          }
        ]
      },
      {
        chapterNumber: 2,
        title: 'द्वितीय अध्याय: महिषासुरसैन्यवध एवं देवी प्रादुर्भाव (Manifestation of Maa Durga & Defeat of Asura Forces)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'The gods, oppressed by Mahishasura, appeal to Shiva and Vishnu. The collective divine light (Tejas) of all deities manifests as the multi-armed Goddess Durga, equipped with celestial weapons.',
        verses: [
          {
            sentenceId: 'ds-2-1',
            originalScript: 'अतुलं तत्र तत्तेजः सर्वदेवशरीरजम्। एकस्थं तदभून्नारी व्याप्तलोकत्रयं त्विषा॥',
            hindiTranslation: 'समस्त देवताओं के शरीरों से निकला हुआ वह अतुलनीय तेज एक होकर एक दिव्य नारी के रूप में परिणत हुआ, जिसने अपने प्रकाश से तीनों लोकों को व्याप्त कर लिया।',
            englishTranslation: 'The incomparable effulgence issuing forth from the bodies of all the gods coalesced into a single feminine form, illuminating all the three worlds with its brilliance.',
            transliteration: 'atulaṃ tatra tattejaḥ sarvadevaśarīrajam | ekasthaṃ tadabhūnnārī vyāptalokatrayaṃ tviṣā ||',
            startTime: 0.0,
            endTime: 12.0,
            aiInsight: {
              symbolism: 'जब संपूर्ण शुभ शक्तियों (सद्गुणों) का तेज संगठित होता है, तभी दुर्धर्ष आसुरी वृत्तियों का संहार करने वाली पराशक्ति का उदय होता है।',
              lifeLesson: 'एकता में अनंत शक्ति है। जीवन के बड़े संकटों से निपटने के लिए आंतरिक संकल्प और सभी शक्तियों को एकाग्र करना आवश्यक है।',
              mantraBenefit: 'आत्मविश्वास, तेजस्विता और भयमुक्ति के लिए यह देवी प्रादुर्भाव श्लोक अत्यंत प्रभावशाली है।'
            }
          },
          {
            sentenceId: 'ds-2-2',
            originalScript: 'शम्भुना दत्तं शूलं विष्णोश्चक्रं तथाऽग्निना शक्तिः। मारुतेन चापं तूर्णौ चेन्द्रेण कुलिशं घण्टा च॥',
            hindiTranslation: 'भगवान शिव ने अपने त्रिशूल से त्रिशूल, विष्णुजी ने चक्र, अग्निदेव ने शक्ति, वायु ने धनुष-बाण और इंद्र ने वज्र तथा ऐरावत की दिव्य घण्टा प्रदान की।',
            englishTranslation: 'Lord Shiva bestowed a trident from His trident, Vishnu His discus, Agni a flaming lance, Vayu a bow and quivers of arrows, and Indra His thunderbolt and bell.',
            transliteration: 'śambhunā dattaṃ śūlaṃ viṣṇoścakraṃ tathā’gninā śaktiḥ...',
            startTime: 12.1,
            endTime: 25.0,
            aiInsight: {
              symbolism: 'देवी के अस्त्र केवल भौतिक शस्त्र नहीं, अपितु विवेक (त्रिशूल), कालचक्र (विष्णु चक्र), और आत्मबल (वज्र) के प्रतीक हैं।',
              lifeLesson: 'अपने स्वभाव के सद्गुणों को अस्त्र बनाएं—सत्य, धैर्य, और निष्काम कर्म से किसी भी विपत्ति को जीता जा सकता है।',
              mantraBenefit: 'शत्रु बाधा निवारण और नकारात्मक शक्तियों से सुरक्षा कवच प्राप्त होता है।'
            }
          }
        ]
      },
      {
        chapterNumber: 3,
        title: 'तृतीय अध्याय: महिषासुर वध (The Slaying of Mahishasura - Mahishasuramardini)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Maa Durga engages in epic combat with the shape-shifting demon Mahishasura, drinks the divine amrita, laughs cosmic laughter, and pierces the demon with Her trident, liberating the cosmos.',
        verses: [
          {
            sentenceId: 'ds-3-1',
            originalScript: 'गर्ज गर्ज क्षणं मूढ मधु यावत्पिबाम्यहम्। मया त्वयि हतेऽत्रैव गर्जिष्यन्त्याशु देवताः॥',
            hindiTranslation: 'देवी ने कहा—रे मूढ़! जब तक मैं यह दिव्य मधु पीती हूँ, तब तक तू क्षण भर गर्जना कर ले। मेरे द्वारा तेरा वध हो जाने पर यहाँ देवता शीघ्र ही गर्जना करेंगे।',
            englishTranslation: 'The Goddess proclaimed: Roar, roar, O fool, for a moment while I drink this divine wine! As soon as thou art slain by Me, the gods shall roar with victorious joy!',
            transliteration: 'garja garja kṣaṇaṃ mūḍha madhu yāvatpibāmyaham | mayā tvayi hate’traiva garjiṣyantyāśu devatāḥ ||',
            startTime: 0.0,
            endTime: 13.0,
            aiInsight: {
              symbolism: 'महिषासुर तमोगुणी प्रमाद, काम और अहंकार का प्रतीक है। देवी का मधु पीना ब्रह्मानंद रस और आत्मिक शांति का द्योतक है।',
              lifeLesson: 'अधर्म और अहंकार कितना भी शक्तिशाली प्रतीत हो, उसका अंत निश्चित है। सत्य और धर्म की विजय कभी नहीं रुकती।',
              mantraBenefit: 'असाध्य रोगों, कोर्ट-कचहरी संकट और भय से रक्षा के लिए महिषासुरमर्दिनी के इस वचन का पाठ सिंह के समान निर्भय बनाता है।'
            }
          },
          {
            sentenceId: 'ds-3-2',
            originalScript: 'एवमुक्त्वा समुत्पत्य सारूढा तं महासुरम्। पादेनाक्रम्य कण्ठे च शूलेनैनमपादयत्॥ शिरश्चिच्छेद खड्गेन पतितोऽसौ महासुरः॥',
            hindiTranslation: 'ऐसा कहकर देवी उछलीं और उस महासुर पर चढ़ गईं। फिर अपने चरण से उसे दबाकर कंठ में त्रिशूल से प्रहार किया और खड्ग से उसका मस्तक काट डाला। वह महासुर धरती पर गिर पड़ा।',
            englishTranslation: 'Having spoken thus, the Goddess sprang into the air, ascended upon the mighty demon, pressed him with Her foot, pierced his neck with Her trident, and severed his head with Her sword.',
            transliteration: 'evamuktvā samutpatya sārūḍhā taṃ mahāsuram | pādenākramya kaṇṭhe ca śūlenainamapādayat...',
            startTime: 13.1,
            endTime: 27.0,
            aiInsight: {
              symbolism: 'महिषासुर के शीश का कटना बुद्धि के अहंकार का विनाश है। चरणस्पर्श से तमोगुण का दलन और जीव को मोक्ष की प्राप्ति होती है।',
              lifeLesson: 'क्रोध और पाशविक प्रवृत्तियों को तुरंत विवेक की खड्ग से समाप्त करें, उन्हें मन में पनपने न दें।',
              mantraBenefit: 'सर्व मनोकामना पूर्ति एवं जीवन में विजय प्राप्त करने के लिए यह श्लोक अत्यंत मंगलकारी है।'
            }
          }
        ]
      },
      {
        chapterNumber: 4,
        title: 'चतुर्थ अध्याय: शक्रादि स्तुति (Celestial Hymn of Indra & The Devas)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Indra and the heavenly gods bow before Jagadamba, offering the world-renowned hymn celebrating Her as intelligence, compassion, wealth, and destroyer of distress.',
        verses: [
          {
            sentenceId: 'ds-4-1',
            originalScript: 'दुर्गे स्मृता हरसि भीतिमशेषजन्तोः स्वस्थैः स्मृता मतिमतीव शुभां ददासि। दारिद्र्यदुःखभयहारिणि का त्वदन्या सर्वोपकारकरणाय सदार्द्रचित्ता॥',
            hindiTranslation: 'हे दुर्गे! आपका स्मरण करने पर आप समस्त प्राणियों का भय हर लेती हैं और स्वस्थ (शांत) पुरुषों द्वारा स्मरण करने पर उन्हें परम कल्याणमयी बुद्धि प्रदान करती हैं। दरिद्रता, दुःख और भय को हरने वाली आपके सिवा और कौन है, जिसका चित्त सर्वदा सबका उपकार करने के लिए दयार्द्र रहता है?',
            englishTranslation: 'O Durga! Remembered by the distressed, Thou dispel fear from every creature; remembered by those in peace, Thou bestow upon them an exceedingly pure intellect. O Dispeller of poverty, sorrow, and fear, who else is there whose heart is ever compassionate toward all?',
            transliteration: 'durge smṛtā harasi bhītimaśeṣajantoḥ svasthaiḥ smṛtā matimatīva śubhāṃ dadāsi | dāridryaduḥkhabhayahāriṇi kā tvadanyā sarvopakārakaraṇāya sadārdracittā ||',
            startTime: 0.0,
            endTime: 16.5,
            aiInsight: {
              symbolism: 'यह दुर्गा सप्तशती का सर्वाधिक प्रसिद्ध और फलदायी महामंत्र श्लोक है। देवी माँ को परम करुणामयी माता के रूप में प्रस्तुत करता है।',
              lifeLesson: 'सच्ची करुणा वही है जो बिना किसी भेदभाव के सभी की सहायता करे। विपत्ति में धैर्य रखें और माँ की असीम अनुकंपा पर विश्वास करें।',
              mantraBenefit: 'दारिद्र्य नाश, कर्ज मुक्ति, मानसिक संताप निवारण और सद्बुद्धि की प्राप्ति के लिए यह श्लोक अचूक कल्पवृक्ष है।'
            }
          }
        ]
      },
      {
        chapterNumber: 5,
        title: 'पञ्चम अध्याय: देवी सूक्तम् (या देवी सर्वभूतेषु - Aparajita Stuti)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Oppressed by Shumbha and Nishumbha, the gods sing the Aparajita Stuti at the Himalayas, worshiping the Goddess who resides in all living beings as Consciousness, Mother, Wisdom, and Peace.',
        verses: [
          {
            sentenceId: 'ds-5-1',
            originalScript: 'नमो देव्यै महादेव्यै शिवायै सततं नमः। नमः प्रकृत्यै भद्रायै नियताः प्रणताः स्म ताम्॥',
            hindiTranslation: 'देवी को नमस्कार है, महादेवी को नमस्कार है, कल्याणकारिणी शिवा को निरंतर नमस्कार है। मूल प्रकृति और मंगलमयी भगवती को बारंबार प्रणाम है।',
            englishTranslation: 'Salutations to the Goddess, salutations to the Great Goddess, perpetual salutations to Shiva, the Auspicious. Salutations to Primordial Nature, the Gracious; devotedly we bow down to Her.',
            transliteration: 'namo devyai mahādevyai śivāyai satataṃ namaḥ | namaḥ prakṛtyai bhadrāyai niyatāḥ praṇatāḥ sma tām ||',
            startTime: 0.0,
            endTime: 12.0,
            aiInsight: {
              symbolism: 'देवी ही जड़ और चेतन संपूर्ण प्रकृति हैं। शिव और शक्ति अभिन्न हैं—कल्याणकारी शिवत्व की अभिव्यक्ति ही शिवा हैं।',
              lifeLesson: 'प्रकृति के प्रति कृतज्ञता और आदर का भाव रखें। जीवन में विनम्रता ही सर्वोच्च शांति का आधार है।',
              mantraBenefit: 'नित्य प्रातः इस श्लोक का स्मरण समस्त अमंगलों को दूर कर जीवन में शुभता और स्वास्थ्य प्रदान करता है।'
            }
          },
          {
            sentenceId: 'ds-5-2',
            originalScript: 'या देवी सर्वभूतेषु मातृरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
            hindiTranslation: 'जो देवी समस्त प्राणियों में माता के रूप में स्थित हैं, उनको नमस्कार, उनको नमस्कार, उनको बारंबार नमस्कार है।',
            englishTranslation: 'To that Goddess who abides in all beings in the form of the Universal Mother, salutations to Her, salutations to Her, salutations to Her again and again.',
            transliteration: 'yā devī sarvabhūteṣu mātṛrūpeṇa saṃsthitā | namastasyai namastasyai namastasyai namo namaḥ ||',
            startTime: 12.1,
            endTime: 23.5,
            aiInsight: {
              symbolism: 'मातृभाव सृष्टि का सर्वोच्च पवित्र भाव है। देवी केवल मंदिरों में नहीं, हर जीव के भीतर प्रेम, पोषण और रक्षा की भावना बनकर उपस्थित हैं।',
              lifeLesson: 'मातृशक्ति का सम्मान करें। समाज में प्रत्येक नारी में साक्षात जगदम्बा के स्वरूप का दर्शन करें।',
              mantraBenefit: 'संतान सुख, पारिवारिक कलह का निवारण और हृदय में अगाध शांति व प्रेम की अनुभूति होती है।'
            }
          },
          {
            sentenceId: 'ds-5-3',
            originalScript: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
            hindiTranslation: 'जो देवी समस्त प्राणियों में शक्ति (ऊर्जा एवं सामर्थ्य) के रूप में स्थित हैं, उनको नमस्कार, उनको नमस्कार, उनको बारंबार नमस्कार है।',
            englishTranslation: 'To that Goddess who abides in all beings in the form of Divine Power and Energy, salutations to Her, salutations to Her, salutations to Her again and again.',
            transliteration: 'yā devī sarvabhūteṣu śaktirūpeṇa saṃsthitā | namastasyai namastasyai namastasyai namo namaḥ ||',
            startTime: 23.6,
            endTime: 35.0,
            aiInsight: {
              symbolism: 'ब्रह्मांड की हर गति, श्वास, और विचार शक्ति का ही विलास है। शक्ति के बिना शिव भी क्रियाहीन हैं।',
              lifeLesson: 'अपनी आंतरिक क्षमता और ऊर्जा को पहचानें। आलस्य और निराशा को त्यागकर रचनात्मक शक्ति को जाग्रत करें।',
              mantraBenefit: 'शारीरिक व मानसिक दुर्बलता का नाश होकर असीम आत्मबल और कर्मशक्ति की प्राप्ति होती है।'
            }
          }
        ]
      },
      {
        chapterNumber: 6,
        title: 'षष्ठ अध्याय: धूम्रलोचन वध (The Slaying of Dhumralochana)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Shumbha sends Dhumralochana to capture the Goddess. With a singular sacred roar of "Humkara", the Divine Mother incinerates Dhumralochana to ashes and Her lion annihilates his army.',
        verses: [
          {
            sentenceId: 'ds-6-1',
            originalScript: 'इत्युक्तः सोऽभ्यधावत्तामसुरो धूम्रलोचनः। हुंकारेणैव तं भस्म सा चकाराम्बिका ततः॥',
            hindiTranslation: 'यह सुनकर असुर धूम्रलोचन देवी की ओर दौड़ा। तब जगदम्बा अम्बिका ने केवल "हुंकार" (हुं शब्द के उच्चारण) मात्र से ही उसे भस्म कर दिया।',
            englishTranslation: 'Thus addressed, the demon Dhumralochana rushed forward towards the Goddess. Thereupon Ambika, merely with Her fiery "Hum" utterance, reduced him instantly to ashes.',
            transliteration: 'ityuktaḥ so’bhyadhāvattāmasuro dhūmralocanaḥ | huṃkāreṇaiva taṃ bhasma sā cakārāmbikā tataḥ ||',
            startTime: 0.0,
            endTime: 12.0,
            aiInsight: {
              symbolism: 'धूम्रलोचन (धुंधली दृष्टि) अज्ञान और भ्रांति का प्रतीक है। देवी का "हुंकार" ओंकार के उस बीजमंत्र की अग्नि है जो अविद्या को क्षण मात्र में भस्म कर देती है।',
              lifeLesson: 'अहंकारी और उद्दंड लोगों से व्यर्थ विवाद करने की आवश्यकता नहीं; सत्य और विवेक की एक दृढ़ ध्वनि ही अज्ञान को मिटा देती है।',
              mantraBenefit: 'बुरी नजर, ईर्ष्या, तांत्रिक दोष और भ्रमित विचारों से तात्कालिक सुरक्षा प्राप्त होती है।'
            }
          }
        ]
      },
      {
        chapterNumber: 7,
        title: 'सप्तम अध्याय: चण्ड और मुण्ड वध - माँ चामुण्डा प्रादुर्भाव (Manifestation of Chamunda Devi)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'From the forehead of Goddess Ambika emerges the fierce, cosmic warrior Goddess Kali, who slays the demons Chanda and Munda and earns the renowned title of Chamunda.',
        verses: [
          {
            sentenceId: 'ds-7-1',
            originalScript: 'ततः कोपं चकारातीव चण्डिकेत्याह सङ्गरम्। ललाटफलकात्तस्या भ्रुकुटीकुटिलात्ततः। निष्क्रान्ता चासिहस्ता च काली करालवदना॥',
            hindiTranslation: 'तब चण्डिका ने भीषण क्रोध किया। उनकी भृकुटि टेढ़ी हो गई और उनके ललाट फलक से खड्गधारिणी, विकराल मुख वाली काली प्रकट हुईं।',
            englishTranslation: 'Then Chandika was filled with immense wrath. From Her furrowed brow issued forth the dark-visaged Kali, holding a scimitar, fierce of countenance.',
            transliteration: 'tataḥ kopaṃ cakārātīva caṇḍiketyāha saṅgaram | lalāṭaphalakāttasyā bhrukuṭīkuṭilāttataḥ | niṣkrāntā cāsihastā ca kālī karālavadanā ||',
            startTime: 0.0,
            endTime: 14.0,
            aiInsight: {
              symbolism: 'काली काल (समय) और संहार की परम शक्ति हैं। चण्ड (प्रचण्ड द्वेष) और मुण्ड (मूर्ख हठ) का वध केवल गहन आत्म-जागरण से ही संभव है।',
              lifeLesson: 'अन्याय और शोषण के विरुद्ध समय पर दृढता और साहस दिखाना आवश्यक है। आंतरिक बुराइयों के प्रति कोई समझौता न करें।',
              mantraBenefit: 'अकाल मृत्यु भय, नकारात्मक शक्तियों और शत्रुओं के भय से पूर्ण मुक्ति मिलती है।'
            }
          }
        ]
      },
      {
        chapterNumber: 8,
        title: 'अष्टम अध्याय: रक्तबीज वध (The Slaying of Demon Raktabija)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'The Matrikas (Brahmani, Maheshwari, Kaumari, Vaishnavi, Varahi, Narasimhi, Aindri) manifest. As Raktabija’s blood drops spawn thousands of demons, Kali drinks every droplet, destroying Raktabija forever.',
        verses: [
          {
            sentenceId: 'ds-8-1',
            originalScript: 'यावन्तः पतितास्तस्य शरीराद्रक्तबिन्दवः। तावन्तः पुरुषा जातास्तद्वीर्यबलविक्रमाः॥ चामुण्डा तान् पपौ रक्तान् विनिपात्य महासुरम्॥',
            hindiTranslation: 'रक्तबीज के शरीर से जितनी रक्त की बूंदें धरती पर गिरती थीं, उतने ही उसके समान बलशाली असुर उत्पन्न हो जाते थे। तब चामुण्डा ने उसका सारा रक्त पी लिया और उस महासुर का अंत कर दिया।',
            englishTranslation: 'As many drops of blood fell from Raktabija’s body, so many identical demons arose. Chamunda drank up all the falling blood, thereby annihilating the demon completely.',
            transliteration: 'yāvantaḥ patitāstasya śarīrādraktabindavaḥ | tāvantaḥ puruṣā jātāstadvīryabalavikramāḥ...',
            startTime: 0.0,
            endTime: 14.0,
            aiInsight: {
              symbolism: 'रक्तबीज हमारे मन की अनियंत्रित वासनाएं और विचार हैं—एक विचार मिटाते ही दस नए उत्पन्न होते हैं। चामुण्डा चेतना की वह अखंड सजगता है जो विचार को जड़ से समाप्त करती है।',
              lifeLesson: 'बुरी आदतों और व्यसनों को थोड़ा-थोड़ा छोड़ने के बजाय उनकी जड़ (उत्पत्ति बिंदु) पर प्रहार करना चाहिए।',
              mantraBenefit: 'रक्तविकार, असाध्य शारीरिक पीड़ा और मानसिक विकारों (OCD/अनियंत्रित चिंताओं) से मुक्ति मिलती है।'
            }
          }
        ]
      },
      {
        chapterNumber: 9,
        title: 'नवम अध्याय: निशुम्भ वध (The Slaying of Demon Nishumbha)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Nishumbha attacks with furious vengeance. Devi Chandika pierces his heart with Her spear, and when another warrior emerges from his chest, She severs his head with Her sword.',
        verses: [
          {
            sentenceId: 'ds-9-1',
            originalScript: 'ततो देव्यभिसम्पत्य शूलेनोरसि ताडितः। पातोद्भवेन शूलेन निष्क्रान्तं च पुमान् जघान॥',
            hindiTranslation: 'तब देवी ने लपककर त्रिशूल से निशुम्भ की छाती पर प्रहार किया। छाती विदीर्ण होने पर जो पुरुष निकला, उसे भी देवी ने खड्ग से काट डाला।',
            englishTranslation: 'Then the Goddess rushed forward and pierced Nishumbha in the chest with Her trident. Slaying the warrior that emerged from his heart, She destroyed him completely.',
            transliteration: 'tato devyabhisampatya śūlenorasi tāḍitaḥ...',
            startTime: 0.0,
            endTime: 12.0,
            aiInsight: {
              symbolism: 'निशुम्भ ममता और संकीर्ण आसक्ति का प्रतीक है। हृदय पर प्रहार का अर्थ है आसक्ति के केंद्र को ज्ञान द्वारा विदीर्ण करना।',
              lifeLesson: 'मोह और आसक्ति मनुष्य को कमजोर बनाते हैं। निष्काम भाव से अपने कर्तव्य का पालन करें।',
              mantraBenefit: 'हृदय रोग, पारिवारिक कलह और भावनात्मक संताप से शांति प्राप्त होती है।'
            }
          }
        ]
      },
      {
        chapterNumber: 10,
        title: 'दशम अध्याय: शुम्भ वध (The Slaying of Demon Shumbha)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Shumbha mocks the Goddess for fighting with the help of other Shaktis. The Mother absorbs all the Matrikas into Her single divine being, declaring She is One and Alone, and slays Shumbha.',
        verses: [
          {
            sentenceId: 'ds-10-1',
            originalScript: 'एकैवाहं जगत्यत्र द्वितीया का ममापरा। पश्यैता दुष्ट मय्येव विशन्त्यो मद्विभूतयः॥ ततः सर्वाः समस्तास्ता देव्यो विशन्त्यमन्दिकायाम्॥',
            hindiTranslation: 'देवी ने कहा—रे दुष्ट! मैं इस संसार में अकेली ही हूँ, मेरे अतिरिक्त दूसरी कौन है? देख, ये सब मेरी ही विभूतियाँ (शक्तियाँ) हैं जो अब मुझमें ही समा रही हैं।',
            englishTranslation: 'The Goddess proclaimed: I alone exist in this universe; who else is there beside Me? Behold, O wicked one, all these are My own divine manifestations now re-entering My Being!',
            transliteration: 'ekaivāhaṃ jagatyatra dvitīyā kā mamāparā | paśyaitā duṣṭa mayyeva viśantyo madvibhūtayaḥ ||',
            startTime: 0.0,
            endTime: 14.5,
            aiInsight: {
              symbolism: 'यह अद्वैत वेदांत और शाक्त दर्शन का चरम सत्य है। संपूर्ण ब्रह्मांड में केवल एक ही चैतन्य सत्ता (सच्चिदानंद पराशक्ति) विद्यमान है।',
              lifeLesson: 'अहंकार (शुम्भ) को लगता है कि वह दूसरों से श्रेष्ठ और अलग है। आत्मज्ञान से ही इस भेद-बुद्धि का अंत होता है।',
              mantraBenefit: 'अहंकार शमन, आत्मज्ञान की जागृति और अद्वैत शांति की प्राप्ति होती है।'
            }
          }
        ]
      },
      {
        chapterNumber: 11,
        title: 'एकादश अध्याय: नारायणी स्तुति (Narayani Stuti - The Supreme Universal Hymn)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'The Devas chant the glorious Narayani Stuti praising Jagadamba as the refuge of the helpless and granter of all wishes. The Goddess grants the boon of protecting the universe in times of crisis.',
        verses: [
          {
            sentenceId: 'ds-11-1',
            originalScript: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
            hindiTranslation: 'समस्त मंगलों की मंगल, कल्याणकारिणी, सब मनोरथों को सिद्ध करने वाली, शरणागतवत्सला, तीन नेत्रों वाली और गौरवर्णा हे नारायणी! आपको नमस्कार है।',
            englishTranslation: 'O Narayani! Thou who art the auspiciousness in all that is auspicious, the fulfiller of all desires, the giver of refuge, the three-eyed Gauri, salutations unto Thee!',
            transliteration: 'sarvamaṅgalamāṅgalye śive sarvārthasādhike | śaraṇye tryambake gauri nārāyaṇi namo’stu te ||',
            startTime: 0.0,
            endTime: 13.0,
            aiInsight: {
              symbolism: 'यह सनातन धर्म का सर्वाधिक प्रभावशाली सर्व-मंगल मंत्र है। यह शक्ति, शिवत्व और वैष्णवी कृपा का समन्वय है।',
              lifeLesson: 'जीवन में सदैव शुभ संकल्प रखें। जब हम ईश्वर की शरण में जाते हैं, तो हमारे सभी सत्कार्य स्वतः सिद्ध होते हैं।',
              mantraBenefit: 'विवाह बाधा, गृह-क्लेश, दरिद्रता निवारण और सर्व कार्य सिद्धि के लिए इस मंत्र का 108 बार नित्य जप कल्पतरु समान है।'
            }
          },
          {
            sentenceId: 'ds-11-2',
            originalScript: 'शरणागतदीनार्तपरित्राणपरायणे। सर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥',
            hindiTranslation: 'शरण में आए हुए दीनों और पीड़ितों की रक्षा में तत्पर रहने वाली तथा सब की पीड़ा हरने वाली हे नारायणी देवि! आपको बारंबार नमस्कार है।',
            englishTranslation: 'O Goddess Narayani, who art ever intent on saving the poor and distressed who take refuge in Thee, O Reliever of all suffering, salutations unto Thee!',
            transliteration: 'śaraṇāgatadīnārtaparitrāṇaparāyaṇe | sarvasyārtihare devi nārāyaṇi namo’stu te ||',
            startTime: 13.1,
            endTime: 25.0,
            aiInsight: {
              symbolism: 'दीन और आर्त (कष्ट में पड़े) जीव के लिए भगवान का आश्रय ही अंतिम संबल है। देवी का हृदय शरणागत के लिए सदैव द्रवित रहता है।',
              lifeLesson: 'पीड़ितों और असहायों की सेवा ही ईश्वर की सच्ची पूजा है। करुणा ही धर्म का मूल है।',
              mantraBenefit: 'गंभीर संकट, दुर्घटना और भय की स्थिति में इस श्लोक का स्मरण तत्काल सुरक्षा कवच प्रदान करता है।'
            }
          },
          {
            sentenceId: 'ds-11-3',
            originalScript: 'रोगानशेषानपहंसि तुष्टा रुष्टा तु कामान् सकलानभीष्टान्। त्वामाश्रितानां न विपन्नराणां त्वामाश्रिता ह्याश्रयतां प्रयान्ति॥',
            hindiTranslation: 'हे देवि! आप प्रसन्न होने पर सब रोगों को नष्ट कर देती हैं और कुपित होने पर सम्पूर्ण मनोवांछित कामनाओं का नाश कर देती हैं। जो मनुष्य आपकी शरण में जा चुके हैं, उन पर कोई विपत्ति नहीं आती; आपकी शरण में गए हुए मनुष्य स्वयं दूसरों को शरण देने योग्य बन जाते हैं।',
            englishTranslation: 'When pleased, Thou destroyest all afflictions, but when enraged, Thou frustratest all desires. No calamity befalls those who have taken refuge in Thee; indeed, those who shelter in Thee become shelters for others.',
            transliteration: 'rogānaśeṣānapahaṃsi tuṣṭā ruṣṭā tu kāmān sakalānabhīṣṭān | tvāmāśritānāṃ na vipannarāṇāṃ tvāmāśritā hyāśrayatāṃ prayānti ||',
            startTime: 25.1,
            endTime: 39.0,
            aiInsight: {
              symbolism: 'रोग केवल शारीरिक नहीं, अविद्या और वासना रूपी मानसिक व्याधियां भी हैं। भगवती की प्रसन्नता संपूर्ण आरोग्य (काया और मन) प्रदान करती है।',
              lifeLesson: 'सच्चा साधक केवल अपनी रक्षा नहीं करता, बल्कि इतना सक्षम बन जाता है कि वह समाज के अन्य दीन-दुखियों का सहारा बन सके।',
              mantraBenefit: 'कठिन रोगों, असाध्य बीमारियों के निवारण और दीर्घायु की प्राप्ति के लिए यह श्लोक महाऔषधि तुल्य है।'
            }
          }
        ]
      },
      {
        chapterNumber: 12,
        title: 'द्वादश अध्याय: देवी चरित्रों की फलश्रुति (Divine Fruits & Merits of Durga Saptashati Path)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'Maa Durga proclaims the spiritual and material rewards of reciting the Saptashati, especially during the autumn and spring Navratri festivals, promising Her eternal presence and protection.',
        verses: [
          {
            sentenceId: 'ds-12-1',
            originalScript: 'शरत्काले महापूजा क्रियते या च वार्षिकी। तस्यां ममैतन्माहात्म्यं श्रुत्वा भक्तिसमन्वितः। सर्वाबाधाविनिर्मुक्तो धनधान्यसुतान्वितः। मनुष्यो मत्प्रसादेन भविष्यति न संशयः॥',
            hindiTranslation: 'देवी बोलीं—शरद ऋतु में जो मेरी वार्षिक महापूजा (शारदीय नवरात्रि) की जाती है, उसमें जो मनुष्य भक्तिपूर्वक मेरे इस माहात्म्य को सुनेगा या पढ़ेगा, वह मेरी कृपा से सब बाधाओं से मुक्त होकर धन, धान्य और संतान से संपन्न होगा; इसमें संशय नहीं है।',
            englishTranslation: 'The Goddess declared: In the autumn season when My annual worship is performed, whoever listens to or recites this Glory of Mine with devotion shall be liberated from all obstacles and blessed with wealth, food, and progeny by My grace, without any doubt.',
            transliteration: 'śaratkāle mahāpūjā kriyate yā ca vārṣikī | tasyāṃ mamaitanmāhātmyaṃ śrutvā bhaktisamanvitaḥ | sarvābādhāvinirmukto dhanadhānyasutānvitaḥ | manuṣyo matprasādena bhaviṣyati na saṃśayaḥ ||',
            startTime: 0.0,
            endTime: 16.0,
            aiInsight: {
              symbolism: 'नवरात्रि में ब्रह्मांड की सुप्त शक्तियां जाग्रत होती हैं। इस समय दुर्गा सप्तशती का पाठ चेतना के सभी द्वारों को आलोकित करता है।',
              lifeLesson: 'भक्ति और नियमपूर्वक किया गया अनुष्ठान जीवन में स्थिरता और समृद्धि लाता है।',
              mantraBenefit: 'नवरात्रि काल में इस श्लोक का स्मरण सर्व प्रकार की बाधाओं को नष्ट कर धन, धान्य और वंश वृद्धि का वरदान देता है।'
            }
          }
        ]
      },
      {
        chapterNumber: 13,
        title: 'त्रयोदश अध्याय: सुरथ और वैश्य को देवी का वरदान (Grace Bestowed on King Suratha & Samadhi)',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        summary: 'King Suratha and Samadhi Vaishya perform austere penance on the river bank. Pleased with their devotion, the Goddess grants King Suratha his kingdom back and future rebirth as the 8th Manu Savarni, and bestows supreme liberating Brahma-Jnana on Samadhi.',
        verses: [
          {
            sentenceId: 'ds-13-1',
            originalScript: 'एवं देव्या वरं लब्ध्वा सुरथः क्षत्रियर्षभः। सूर्याज्जन्म समासाद्य सावर्णिर्भविता मनुः॥ वैश्यश्च लब्धवान् ज्ञानं मोक्षाय परमात्मनः॥',
            hindiTranslation: 'इस प्रकार देवी से मनोवांछित वर पाकर क्षत्रिय श्रेष्ठ सुरथ सूर्य से जन्म लेकर सावर्णि मनु होंगे और वैश्य समाधि ने परमात्मा के मोक्ष प्रदान करने वाले परम ज्ञान को प्राप्त किया।',
            englishTranslation: 'Having thus received the boon from the Goddess, the king Suratha will obtain birth from the Sun and become the Manu Savarni; and the merchant Samadhi attained the supreme liberating divine Knowledge of the Self.',
            transliteration: 'evaṃ devyā varaṃ labdhvā surathaḥ kṣatriyarṣabhaḥ | sūryājjanma samāsādya sāvarṇirbhavitā manuḥ | vaiśyaśca labdhavān jñānaṃ mokṣāya paramātmanaḥ ||',
            startTime: 0.0,
            endTime: 15.0,
            aiInsight: {
              symbolism: 'सप्तशती का यह समापन संदेश है—सांसारिक कर्तव्य करने वालों को राज्य (सफलता) और मुमुक्षु को मोक्ष (आत्मज्ञान)। देवी दोनों की इच्छा पूर्ण करती हैं।',
              lifeLesson: 'अपने लक्ष्य के प्रति ईमानदार रहें। भौतिक समृद्धि और आत्मिक मुक्ति दोनों भगवती के अनुग्रह से संभव हैं।',
              mantraBenefit: 'संपूर्ण दुर्गा सप्तशती पाठ का पूर्ण फल, मोक्ष, और जीवन के सभी लक्ष्यों की सिद्धि होती है।'
            }
          }
        ]
      }
    ]
  }
];

export const DAILY_VERSE = {
  religion: 'Hinduism',
  bookTitle: 'Shrimad Bhagavad Gita',
  bookSlug: 'bhagavad-gita',
  chapterNumber: 2,
  sentenceId: 'bg-2-1',
  originalScript: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
  hindiTranslation: 'तेरा केवल कर्म करने में ही अधिकार है, उसके फलों में कभी नहीं। इसलिए तू कर्मफल का हेतु मत बन और न ही तेरी अकर्म में आसक्ति हो।',
  englishTranslation: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.',
  audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  date: 'Daily Inspiration'
};
