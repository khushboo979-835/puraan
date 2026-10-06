export interface VerseItem {
  sentenceId: string;
  originalScript: string;
  hindiTranslation: string;
  englishTranslation: string;
  transliteration?: string;
  startTime: number;
  endTime: number;
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
