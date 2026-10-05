import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SacredReads | All-Religion Digital Sacred Scripture Bookstore & Audio Reader',
  description:
    'Experience holy scriptures across Hinduism, Islam, Christianity, Sikhism, Buddhism, and Jainism with interactive synchronized audio recitation and DRM-protected watermarked PDF downloads.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛕</text></svg>',
  },
  keywords: [
    'Agni Puran',
    'Bhagavad Gita',
    'Quran',
    'Japji Sahib',
    'Dhammapada',
    'Psalms',
    'Tattvartha Sutra',
    'Sacred Audio Reader',
    'Digital Scripture',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Load Razorpay Checkout Script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="bg-[#0b0d13] text-[#f3ede2] min-h-screen flex flex-col selection:bg-amber-500 selection:text-stone-950">
        <AuthProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
