export interface SeedStatusVideo {
  id: string;
  title: string;
  slug: string;
  faith: 'Hinduism' | 'Islam' | 'Christianity' | 'Sikhism' | 'Buddhism' | 'Jainism';
  moodTag: string;
  videoUrl: string;
  thumbnailUrl: string;
  fileSize: number;
  duration: number;
  downloadsCount: number;
  viewsCount: number;
  likesCount: number;
  isActive: boolean;
  createdAt: string;
}

export const SEED_STATUS_VIDEOS: SeedStatusVideo[] = [
  {
    id: 'status-1',
    title: 'श्री गायत्री महामंत्र एवं सूर्य वंदना (Morning 432Hz Status)',
    slug: 'morning-gayatri-mantra-surya-vandana',
    faith: 'Hinduism',
    moodTag: 'Morning Prayer',
    videoUrl: 'https://cdn.pixabay.com/video/2021/08/13/84931-587428863_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    fileSize: 4820000,
    duration: 30,
    downloadsCount: 1420,
    viewsCount: 5890,
    likesCount: 940,
    isActive: true,
    createdAt: '2026-11-10T06:00:00.000Z',
  },
  {
    id: 'status-2',
    title: 'छठ महापर्व संध्या अर्घ्य एवं सूर्य आराधना स्टेटस',
    slug: 'chhath-puja-sandhya-arghya-status',
    faith: 'Hinduism',
    moodTag: 'Diwali-Chhath',
    videoUrl: 'https://cdn.pixabay.com/video/2020/09/27/51528-466367332_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605367031761-0b5c16388432?q=80&w=600&auto=format&fit=crop',
    fileSize: 6150000,
    duration: 45,
    downloadsCount: 2840,
    viewsCount: 12400,
    likesCount: 1890,
    isActive: true,
    createdAt: '2026-11-06T17:30:00.000Z',
  },
  {
    id: 'status-3',
    title: 'सूरत अर्-रहमान सुरीली तिलावत (Surah Ar-Rahman Peace)',
    slug: 'surah-ar-rahman-peace-status',
    faith: 'Islam',
    moodTag: 'Shanti',
    videoUrl: 'https://cdn.pixabay.com/video/2022/10/05/133758-757758925_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=600&auto=format&fit=crop',
    fileSize: 5200000,
    duration: 35,
    downloadsCount: 1190,
    viewsCount: 4720,
    likesCount: 820,
    isActive: true,
    createdAt: '2026-11-12T12:00:00.000Z',
  },
  {
    id: 'status-4',
    title: 'The Lord is My Shepherd (Psalm 23 Holy Bible Audio)',
    slug: 'psalm-23-the-lord-is-my-shepherd',
    faith: 'Christianity',
    moodTag: 'Morning Prayer',
    videoUrl: 'https://cdn.pixabay.com/video/2022/11/17/139369-772186847_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600&auto=format&fit=crop',
    fileSize: 4400000,
    duration: 32,
    downloadsCount: 950,
    viewsCount: 3840,
    likesCount: 650,
    isActive: true,
    createdAt: '2026-11-13T08:30:00.000Z',
  },
  {
    id: 'status-5',
    title: 'ੴ सति नामु करता पुरखु (Sri Japji Sahib Mool Mantar)',
    slug: 'japji-sahib-mool-mantar-status',
    faith: 'Sikhism',
    moodTag: 'Morning Prayer',
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/16/71239-537449514_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=600&auto=format&fit=crop',
    fileSize: 5900000,
    duration: 38,
    downloadsCount: 1780,
    viewsCount: 7100,
    likesCount: 1320,
    isActive: true,
    createdAt: '2026-11-14T05:00:00.000Z',
  },
  {
    id: 'status-6',
    title: 'धम्मपद बुद्ध वाणी: मन की निर्मलता व शांति (Zen Meditation)',
    slug: 'dhammapada-buddha-mindfulness-status',
    faith: 'Buddhism',
    moodTag: 'Shanti',
    videoUrl: 'https://cdn.pixabay.com/video/2021/08/13/84931-587428863_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    fileSize: 3950000,
    duration: 28,
    downloadsCount: 840,
    viewsCount: 3200,
    likesCount: 590,
    isActive: true,
    createdAt: '2026-11-15T07:15:00.000Z',
  },
  {
    id: 'status-7',
    title: 'णमोकार महामंत्र एवं अहिंसा परमो धर्मः (Jain Navkar)',
    slug: 'navkar-mahamantra-ahimsa-status',
    faith: 'Jainism',
    moodTag: 'Shanti',
    videoUrl: 'https://cdn.pixabay.com/video/2020/09/27/51528-466367332_large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    fileSize: 4100000,
    duration: 30,
    downloadsCount: 920,
    viewsCount: 3910,
    likesCount: 710,
    isActive: true,
    createdAt: '2026-11-16T09:00:00.000Z',
  },
];
