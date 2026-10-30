'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  BookOpen,
  Download,
  X,
  ChevronRight,
  Award,
  Info,
  CheckCircle2,
  Sun,
  HeartHandshake
} from 'lucide-react';

export default function DiwaliChhathBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'diwali' | 'chhath' | 'offer'>('diwali');

  if (isDismissed) {
    return (
      <aside
        aria-label="Diwali and Chhath Puja Festive Offer"
        className="bg-gradient-to-r from-[#1A0A02] via-[#341403] to-[#1A0A02] border-b border-amber-500/50 py-2 px-4 text-center shadow-md relative z-50"
      >
        <button
          onClick={() => setIsDismissed(false)}
          className="text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-100 inline-flex items-center gap-2 transition cursor-pointer"
        >
          <span className="text-base">🪔</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
          <span>
            शुभ दीपावली एवं छठ महापर्व: सम्पूर्ण धर्म ग्रंथ पाठ व पंडित जी वैदिक श्लोक ऑडियो निःशुल्क (ऑफर देखें ↗)
          </span>
          <span className="text-base">☀️</span>
        </button>
      </aside>
    );
  }

  return (
    <>
      {/* ── EXPANDED AUSPICIOUS DIWALI & CHHATH PUJA FESTIVE BANNER ── */}
      <aside
        aria-label="Diwali and Chhath Puja Festive Offer"
        className="relative z-50 bg-gradient-to-r from-[#160802] via-[#2F1203] to-[#160802] border-b-2 border-amber-400/60 text-stone-100 shadow-[0_10px_35px_rgba(47,18,3,0.85)] transition-all"
      >
        {/* Subtle warm festive radiance overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-orange-500/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left: Glowing Diya & Surya Deity Crest + Festive Information */}
            <div className="flex items-center space-x-3.5 sm:space-x-5 w-full lg:w-auto">
              {/* Divine Festive Icon Frame (Clay Diya & Radiant Surya) */}
              <div className="relative flex-shrink-0 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.65)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.9)] group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full rounded-[14px] overflow-hidden bg-gradient-to-b from-[#2A0E02] to-[#120501] flex flex-col items-center justify-center relative p-1 text-center">
                    {/* Glowing Diya & Sun Icon */}
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse">
                        🪔
                      </span>
                      <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
                        ☀️
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-amber-300 tracking-wider uppercase mt-0.5 leading-none">
                      दीपोत्सव • छठ
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Auspicious Shubh Swastik / Om Badge */}
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-stone-950 font-black text-xs flex items-center justify-center border border-stone-950 shadow-md">
                  卐
                </div>
              </div>

              {/* Text Information */}
              <div className="flex flex-col min-w-0">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> दीपावली एवं छठ महापर्व विशेष
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/90 text-amber-300 border border-amber-500/40">
                    100% निःशुल्क सम्पूर्ण ग्रंथ पाठ
                  </span>
                  <span className="text-[11px] font-semibold text-amber-300/90 hidden sm:inline">
                    • पंडित जी वैदिक श्लोक ऑडियो सहित
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-base sm:text-xl font-heading font-black text-[#FEF3C7] tracking-tight leading-tight flex items-center gap-1.5">
                  <span>दीपावली एवं छठ महापर्व पावन उत्सव ज्ञानधर्म पर लाइव</span>
                  <span className="text-amber-400 text-xs hidden md:inline">
                    ॥ ॐ श्रीं महालक्ष्म्यै नमः • ॐ सूर्याय नमः ॥
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-[13px] text-stone-300/90 font-sans mt-0.5 line-clamp-1 sm:line-clamp-none">
                  श्री दुर्गा सप्तशती • भगवद्गीता • आदित्य हृदय स्तोत्र • छठ व्रत कथा व लक्ष्मी पूजन विधि • पंडित जी लयबद्ध पाठ
                </p>
              </div>
            </div>

            {/* Right: High-Impact Action Buttons */}
            <div className="flex items-center flex-wrap justify-center sm:justify-end gap-2.5 flex-shrink-0 w-full lg:w-auto pt-1 lg:pt-0 border-t border-amber-500/20 lg:border-t-0">
              {/* Start Sacred Reading CTA */}
              <Link
                href="/library"
                className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-black shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 transition flex items-center space-x-1.5 border border-amber-300 cursor-pointer"
              >
                <span>🪔 पावन पाठ शुरू करें</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>

              {/* Vidhi & Significance Modal Trigger */}
              <button
                onClick={() => setModalOpen(true)}
                className="py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl bg-[#2A0E04] hover:bg-[#3D1406] text-amber-200 hover:text-white text-xs sm:text-sm font-bold border border-amber-500/40 transition flex items-center space-x-1.5 shadow-sm cursor-pointer"
                title="दीपावली लक्ष्मी पूजन एवं छठ पूजा अर्घ्य विधि जानें"
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>☀️ छठ व दिवाली पूजन विधि</span>
              </button>

              {/* Minimize button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-black/40 border border-stone-800/80 transition cursor-pointer ml-0.5"
                aria-label="Minimize banner"
                title="बैनर छोटा करें"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── DIWALI & CHHATH PUJA VIDHI, KATHA & OFFER MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#170802] border-2 border-amber-500/50 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-stone-100 shadow-[0_25px_80px_rgba(0,0,0,0.98)] max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2A0F04] text-stone-300 hover:text-white border border-amber-500/30 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md flex-shrink-0 bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-3xl">
                🪔
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/70 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                  पावन दीपोत्सव एवं सूर्य षष्ठी व्रत विधान
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#FEF3C7] mt-1">
                  दीपावली लक्ष्मी पूजन एवं छठ महापर्व अर्घ्य विधि
                </h3>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-2 border-b border-stone-800 pb-3 mb-4">
              <button
                onClick={() => setActiveTab('diwali')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'diwali'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-[#220B03] text-stone-300 hover:text-amber-200'
                }`}
              >
                <span>🪔 दीपावली लक्ष्मी-गणेश पूजन</span>
              </button>
              <button
                onClick={() => setActiveTab('chhath')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'chhath'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-[#220B03] text-stone-300 hover:text-amber-200'
                }`}
              >
                <span>☀️ छठ महापर्व ४-दिवसीय विधान</span>
              </button>
              <button
                onClick={() => setActiveTab('offer')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'offer'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-[#220B03] text-stone-300 hover:text-amber-200'
                }`}
              >
                <span>🎁 महापर्व विशेष उपहार</span>
              </button>
            </div>

            {/* Tab 1: Diwali Lakshmi Pujan */}
            {activeTab === 'diwali' && (
              <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300 leading-relaxed animate-in fade-in">
                <div className="p-4 rounded-2xl bg-[#280E04] border border-amber-500/30 text-amber-100">
                  <p className="font-serif italic text-sm">
                    <strong>॥ ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्मांक दारिद्र्य नाशय प्रचुर धन देहि देहि क्लीं ह्रीं श्रीं ॐ ॥</strong>
                    <br />
                    दीपावली का पावन महापर्व अंधकार पर प्रकाश, अज्ञान पर ज्ञान और अधर्म पर धर्म की विजय का प्रतीक है। इस रात्रि महालक्ष्मी व विघ्नहर्ता श्री गणेश का विशेष पूजन जीवन में सुख, शांति, बुद्धि और अखंड समृद्धि प्रदान करता है।
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-amber-300 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> सरल दीपावली पूजन विधि:
                  </h4>
                  <ul className="space-y-2.5 text-stone-300 text-xs sm:text-[13px]">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
                      <span><strong>चौकी स्थापना:</strong> उत्तर या पूर्व दिशा में लाल/पीला वस्त्र बिछाकर मां लक्ष्मी, श्री गणेश व कुबेर जी की प्रतिमा स्थापित करें।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
                      <span><strong>पंचामृत व षोडशोपचार:</strong> जल, रोली, अक्षत, कमलगट्टा, खील-बताशे और मिष्ठान्न अर्पित करें। शुद्ध घी का चौमुखी दीपक प्रज्वलित करें।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
                      <span><strong>श्री सूक्तम् एवं कनकधारा स्तोत्र:</strong> ज्ञानधर्म पर उपलब्ध पंडित जी के शुद्ध श्लोक उच्चारण के साथ श्री सूक्तम् का पाठ व श्रवण करें।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span>
                      <span><strong>दीपदान एवं महाआरती:</strong> घर के प्रत्येक कोने, द्वार व मंदिर में दीप प्रज्वलित कर मां लक्ष्मी की पावन आरती करें।</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Chhath Puja */}
            {activeTab === 'chhath' && (
              <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300 leading-relaxed animate-in fade-in">
                <div className="p-4 rounded-2xl bg-[#280E04] border border-amber-500/30 text-amber-100">
                  <p className="font-serif italic text-sm">
                    <strong>॥ ॐ एहि सूर्य सहस्त्रांशो तेजोराशे जगत्पते। अनुकम्पय मां भक्त्या गृहाणार्घ्यं दिवाकर॥</strong>
                    <br />
                    छठ महापर्व प्रत्यक्ष देव भगवान सूर्य और प्रकृति की अधिष्ठात्री षष्ठी देवी (छठी मईया) का सबसे पावन, सात्विक एवं कठिन चार दिवसीय अनुष्ठान है। यह परिवार की सुख-समृद्धि, संतान-दीर्घायु और आरोग्य की प्राप्ति कराता है।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#200B03] border border-amber-500/20">
                    <span className="font-bold text-amber-300 block text-sm">दिवस १: नहाय-खाय (Nahay-Khay)</span>
                    <p className="text-stone-300 text-[11px] mt-1.5 leading-relaxed">
                      पवित्र नदी या जल से स्नान, गृह शुद्धि और पूर्ण सात्विकता के साथ चने की दाल, कद्दू (घिया) की सब्जी व अरवा चावल का प्रसाद ग्रहण किया जाता है।
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#200B03] border border-amber-500/20">
                    <span className="font-bold text-amber-300 block text-sm">दिवस २: खरना (Kharna)</span>
                    <p className="text-stone-300 text-[11px] mt-1.5 leading-relaxed">
                      दिनभर निर्जला उपवास। संध्याकाल में मिट्टी के चूल्हे पर गुड़ व आम की लकड़ी से खीर (रसिआ) और घी लगी रोटी का भोग लगाकर व्रती प्रसाद ग्रहण करते हैं। इसके बाद ३६ घंटे का निर्जला व्रत आरंभ होता है।
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#200B03] border border-amber-500/20">
                    <span className="font-bold text-amber-300 block text-sm">दिवस ३: संध्या अर्घ्य (Sandhya Arghya)</span>
                    <p className="text-stone-300 text-[11px] mt-1.5 leading-relaxed">
                      बांस के सूप में ठेकुआ, मौसमी फल, गन्ना लेकर घाट पर जल में खड़े होकर अस्ताचलगामी (डूबते हुए) भगवान सूर्य को प्रथम अर्घ्य अर्पित किया जाता है।
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#200B03] border border-amber-500/20">
                    <span className="font-bold text-amber-300 block text-sm">दिवस ४: उषा अर्घ्य व पारण (Usha Arghya & Paran)</span>
                    <p className="text-stone-300 text-[11px] mt-1.5 leading-relaxed">
                      अरुणोदय (उगते हुए सूर्य) को दूसरा अर्घ्य अर्पित कर मंगल-कामना की जाती है। तत्पश्चात व्रती कच्चे दूध व प्रसाद से पारण कर इस महान व्रत को पूर्ण करते हैं।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Festive Offer */}
            {activeTab === 'offer' && (
              <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300 leading-relaxed animate-in fade-in">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#381404] via-[#481B06] to-[#381404] border-2 border-amber-400 text-amber-100 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎁</span>
                    <h4 className="font-heading font-black text-amber-300 text-base">
                      ज्ञानधर्म महापर्व विशेष उपहार (Universal Festive Blessing)
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    दीपावली एवं छठ महापर्व के इस दिव्य अवसर पर ज्ञानधर्म के सभी पवित्र ग्रंथ — श्रीमद्भगवद्गीता, श्री दुर्गा सप्तशती, आदित्य हृदय स्तोत्र, अग्नि पुराण तथा सभी विश्व धर्मों की संहिताएं — सम्पूर्ण अध्याय, लाइन-बाय-लाइन पंडित जी वैदिक ऑडियो के साथ <strong>100% निःशुल्क</strong> उपलब्ध कराई जा रही हैं।
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-amber-300 text-sm">
                    ✨ महापर्व के दौरान उपलब्ध निःशुल्क सुविधाएं:
                  </h4>
                  <ul className="space-y-2 text-stone-300 text-xs sm:text-[13px]">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✔</span>
                      <span>पंडित जी की शांत व स्पष्ट लयबद्ध वैदिक श्लोक ध्वनि (0.68x Slow Pandit Cadence)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✔</span>
                      <span>४३२ हर्ट्ज़ दिव्य ॐ एवं तानपूरा बैकग्राउंड ध्वनि (432Hz Ambient Resonance)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✔</span>
                      <span>गीता प्रेस गोरखपुर प्रमाणित मूल पांडुलिपि एवं शब्दशः हिंदी-अंग्रेजी भावार्थ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-400">✔</span>
                      <span>छठ व्रत कथा, सूर्य अष्टकम, श्री सूक्तम् एवं महालक्ष्मी कवच पूर्ण रूप से अनलॉक</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bottom Footer Actions */}
            <div className="pt-4 mt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-stone-400">
                ज्ञानधर्म परिवार की ओर से आपको एवं आपके परिवार को <strong>शुभ दीपावली एवं छठ महापर्व</strong> की हार्दिक शुभकामनाएं!
              </span>
              <div className="flex gap-2">
                <Link
                  href="/reader/bhagavad-gita/1"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-black transition flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <span>🪔 अभी पावन पाठ करें</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
