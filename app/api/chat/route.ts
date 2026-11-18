import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SCRIPTURE_KNOWLEDGE_BASE: Array<{
  keywords: string[];
  scriptureRef: string;
  originalText: string;
  reply: string;
}> = [
  {
    keywords: ['2.47', 'कर्मण्येवाधिकारस्ते', 'karmanye', 'karma', 'nishkama', 'कर्म'],
    scriptureRef: 'श्रीमद्भगवद्गीता (अध्याय २, श्लोक ४७)',
    originalText: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    reply: `सादर प्रणाम। भगवान श्रीकृष्ण अर्जुन को निष्काम कर्मयोग का परम रहस्य समझाते हुए कहते हैं:
"तुम्हारा अधिकार केवल कर्म करने में है, उसके फल में कभी नहीं। इसलिए कर्म के फल की आसक्ति से मुक्त होकर कर्तव्य का पालन करो, और कर्म न करने (आलस्य अथवा प्रमाद) में भी तुम्हारी आसक्ति न हो।"

📌 आध्यात्मिक व व्यावहारिक शिक्षा:
१. जब आप परीक्षा, व्यापार अथवा जीवन में परिणाम की अत्यधिक चिंता करते हैं, तो मानसिक ऊर्जा बिखर जाती है।
२. अपना १००% सर्वश्रेष्ठ प्रयास वर्तमान कर्म में समर्पित करें। परिणाम स्वतः ईश्वर की व्यवस्था अनुसार शुभ एवं मंगलकारी होगा।`,
  },
  {
    keywords: ['कवच', 'सप्तशती', 'चंडी', 'durga', 'chandi', 'saptashati', 'देवी'],
    scriptureRef: 'श्री दुर्गा सप्तशती (देवी कवचम् - मार्कण्डेय पुराण)',
    originalText: 'ॐ यद्गुह्यं परमं लोके सर्वरक्षाकरं नृणाम्।\nयन्न कस्यचिदाख्यातं तन्मे ब्रूहि पितामह॥',
    reply: `सादर प्रणाम। श्री दुर्गा सप्तशती का 'देवी कवच' भगवान ब्रह्मा द्वारा महर्षि मार्कण्डेय को प्रदान किया गया परम कल्याणकारी एवं अभेद्य रक्षा-स्तोत्र है।

📌 माहात्म्य व स्वरूप:
१. इसमें माँ भगवती के नौ पावन स्वरूपों (शैलपुत्री, ब्रह्मचारिणी, चन्द्रघण्टा, कूष्माण्डा, स्कन्दमाता, कात्यायनी, कालरात्रि, महागौरी एवं सिद्धिदात्री) का ध्यान किया गया है।
२. दसों दिशाओं और शरीर के प्रत्येक अंग, प्राण, बुद्धि व संतान की रक्षा के लिए माँ के विभिन्न नामों का स्मरण किया जाता है।

📌 साधना विधि:
प्रातःकाल स्नानादि से पवित्र होकर, पूर्व अथवा उत्तर दिशा में मुख करके, शांत चित्त से इसका पाठ करें। यह समस्त प्रकार के भय, व्याधि, और नकारात्मक ऊर्जा का शमन कर जीवन में आत्मबल और दिव्यता प्रदान करता है।`,
  },
  {
    keywords: ['fatiha', 'फातिहा', 'फ़ातिहा', 'quran', 'कुरआन', 'क़ुरआन', 'surah', 'सूरत'],
    scriptureRef: 'पवित्र अल-क़ुरआन (सूरत अल-फ़ातिहा १:१-७)',
    originalText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ लِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ',
    reply: `सलाम व सादर अभिवादन। सूरह अल-फ़ातिहा पवित्र क़ुरआन की प्रथम और सर्वाधिक पूजनीय सूरत है, जिसे 'उम्मुल किताब' (ग्रंथ की जननी) भी कहा जाता है।

📌 सरल भावार्थ:
"अल्लाह के नाम से, जो अत्यंत दयालु और कृपावान है। समस्त प्रशंसा केवल अल्लाह के लिए है, जो सम्पूर्ण ब्रह्मांड का पालनकर्ता है। जो दयावान और परम कृपालु है। न्याय के दिन का स्वामी है।"

📌 संदेश व आध्यात्मिक प्रकाश:
यह सूरत हर मनुष्य को अहंकार त्यागकर सर्वशक्तिमान से सीधा मार्गदर्शन ('एहदिनास्-सिरातल-मुस्तकीम' - सत्य व सदाचार का सरल मार्ग) मांगने की प्रेरणा देती है।`,
  },
  {
    keywords: ['जपजी', 'japji', 'mool mantar', 'मूल मंतर', 'onkar', 'ੴ', 'sikh'],
    scriptureRef: 'श्री गुरु ग्रंथ साहिब (जपजी साहिब - श्री गुरु नानक देव जी)',
    originalText: 'ੴ सति नामु करता पुरखु निरभउ निरवैरु अकाल मूरति अजूनी सैभं गुर प्रसादि ॥',
    reply: `वाहेगुरु जी का ख़ालसा, वाहेगुरु जी की फ़तह। श्री जपजी साहिब का मूल मंतर सिख धर्म और सम्पूर्ण मानवता के लिए एकात्मता का सर्वोच्च मंत्र है।

📌 शब्दार्थ व रहस्य:
• ੴ (इक ओंकार): परमात्मा केवल एक है, जो सर्वव्यापी है।
• सति नामु: उसका नाम ही शाश्वत सत्य है।
• करता पुरखु: वही सम्पूर्ण सृष्टि का निर्माता है।
• निरभउ - निरवैरु: वह किसी से भयभीत नहीं और उसका किसी से कोई वैर नहीं है।
• अकाल मूरति - अजूनी: वह काल से परे, अमर और जन्म-मरण से मुक्त है।
• सैभं - गुर प्रसादि: वह स्वयंभू (स्वतः प्रकाशित) है और केवल सच्चे गुरु की कृपा से अनुभूत होता है।

📌 जीवन सूत्र:
जब मनुष्य उस एक ईश्वर को पहचान लेता है, तो मन के सारे द्वेष और भय सदा के लिए समाप्त हो जाते हैं।`,
  },
  {
    keywords: ['धम्मपद', 'dhammapada', 'बुद्ध', 'buddha', 'anger', 'क्रोध', 'शांति', 'peace'],
    scriptureRef: 'धम्मपद (यमकवग्गो - पालि बुद्ध वाणी)',
    originalText: 'न हि वेरेन वेरानि सम्मन्तीध कुदाचनं।\nअवेरेन च सम्मन्ति एस धम्मो सनन्तनो॥',
    reply: `नमो बुद्धाय। तथागत गौतम बुद्ध का यह पावन सूत्र धम्मपद के प्रथम वर्ग का अमृत वचन है:

📌 पालि श्लोक का अर्थ:
"इस संसार में कभी भी वैर (क्रोध, प्रतिशोध) से वैर शांत नहीं होता। केवल प्रेम, क्षमा और मैत्री (अवेर) से ही वैर शांत होता है—यही सनातन और शाश्वत सत्य है।"

📌 व्यावहारिक ध्यान सूत्र:
क्रोध को पकड़कर रखना वैसा ही है जैसे जलता हुआ अंगारा किसी और पर फेंकने के लिए अपने हाथ में उठाना; उससे पहले स्वयं का हाथ जलता है। जब भी भीतर अशांति या क्रोध आए, अपनी श्वास पर ध्यान केंद्रित करें और मौन धारण करें।`,
  },
  {
    keywords: ['अहिंसा', 'jain', 'जैन', 'tattvartha', 'तत्त्वार्थ', 'navkar', 'णमोकार'],
    scriptureRef: 'तत्त्वार्थ सूत्र (आचार्य उमास्वामी - जैन दर्शन)',
    originalText: 'परस्परोपग्रहो जीवानाम्॥ अहिंसा परमो धर्मः॥',
    reply: `जय जिनेंद्र। आचार्य उमास्वामी विरचित 'तत्त्वार्थ सूत्र' जैन तत्वज्ञान का सर्वश्रेष्ठ प्रमाण ग्रंथ है।

📌 मूल सूत्र का अर्थ:
"परस्परोपग्रहो जीवानाम्" — सम्पूर्ण चराचर जगत में सभी आत्माएं और प्राणी एक-दूसरे के उपकार, सहयोग और जीवन रक्षा के लिए स्थित हैं।

📌 त्रि-रत्न मार्ग:
१. सम्यक् दर्शन (सच्ची श्रद्धा)
२. सम्यक् ज्ञान (यथार्थ समझ)
३. सम्यक् चारित्र (मन, वचन और कर्म से अहिंसक पवित्र आचरण)
अहिंसा केवल शारीरिक हिंसा न करना ही नहीं, अपितु किसी के प्रति मन में भी दुर्भावना न लाना है।`,
  },
  {
    keywords: ['bible', 'बाइबिल', 'psalm', 'येशु', 'jesus', 'प्रेम', 'love'],
    scriptureRef: 'पवित्र बाइबिल (भजन संहिता २३ / १ कुरिन्थियों १३)',
    originalText: 'The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures.',
    reply: `ईश्वर की कृपा और शांति आपके साथ हो। पवित्र धर्मशास्त्र बाइबिल का मूल संदेश प्रेम, क्षमा और ईश्वर पर अटूट विश्वास है।

📌 भजन संहिता २३ का पावन वचन:
"यहोवा मेरा चरवाहा है; मुझे कोई घटी न होगी। वह मुझे हरी-हरी चराइयों में बैठाता है, और शांत जल के किनारे ले चलता है। वह मेरे जी में जी ले आता है।"

📌 संदेश:
संसार की कठिन परिस्थितियों और अंधकारमय घाटियों में भी प्रभु की कृपा और उनका वचन एक दीपक की भांति हमारे पथ को आलोकित करता है। विश्वास, आशा और प्रेम में सबसे बड़ा प्रेम है।`,
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message = '', history = [] } = body;

    const query = message.trim();
    if (!query) {
      return NextResponse.json(
        { error: 'प्रश्न का होना अनिवार्य है।' },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // 1. If Gemini API is configured, use Gemini 1.5 Flash via REST
    if (geminiKey) {
      try {
        const systemPrompt = `You are "Gyan AI Sahayak 🪔" (ज्ञान AI सहायक), an authentic, highly revered multi-faith spiritual scholar, Vedic pandit, and scripture scholar for GyanDharam (gyandharam.com).
Your tone is respectful, serene, pure, and enlightened (using respectful Hindi like 'सादर प्रणाम', 'प्रभु कृपा', 'कल्याणमस्तु').
Support scriptures across Hinduism (Bhagavad Gita, Durga Saptashati, Puranas, Vedas), Islam (Holy Quran, Hadith), Christianity (Holy Bible, Psalms), Sikhism (Sri Guru Granth Sahib, Japji Sahib), Buddhism (Dhammapada), and Jainism (Tattvartha Sutra, Kalpa Sutra).
When explaining:
1. Provide the exact scripture name, chapter/adhyay, and verse/shloka/aayat number.
2. Quote the original Sanskrit/Arabic/Gurmukhi/Pali verse in accurate Devanagari or Arabic.
3. Provide line-by-line Pada-ched (word breakdown) and clear, easy-to-understand Hindi Bhavarth.
4. Give a practical life lesson (व्यावहारिक जीवन संदेश) for modern seekers.
Keep the answer authoritative, uplifting, concise, and structured.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }],
                },
              ],
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 1000,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              success: true,
              reply: generatedText,
              scriptureRef: 'ज्ञान AI वैदिक एवं सर्वधर्म शोध (Gemini Scholar)',
              source: 'gemini',
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini chat error, proceeding to fallback:', geminiErr);
      }
    }

    // 2. If Groq API is configured, use Groq Llama 3 via REST
    if (groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content:
                  'You are Gyan AI Sahayak, a reverent multi-faith Vedic scholar. Reply in pure respectful Hindi with exact scripture citations, original verses, and simple life lessons.',
              },
              { role: 'user', content: query },
            ],
            temperature: 0.4,
            max_tokens: 1000,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const generatedText = groqData?.choices?.[0]?.message?.content;
          if (generatedText) {
            return NextResponse.json({
              success: true,
              reply: generatedText,
              scriptureRef: 'ज्ञान AI सर्वधर्म शोध (Groq Llama 3)',
              source: 'groq',
            });
          }
        }
      } catch (groqErr) {
        console.warn('Groq chat error, proceeding to fallback:', groqErr);
      }
    }

    // 3. Intelligent Built-in Multi-Faith Knowledge Fallback (Guarantees 100% uptime & zero crashes)
    const lowerQuery = query.toLowerCase();
    const matched = SCRIPTURE_KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((kw) => lowerQuery.includes(kw.toLowerCase()))
    );

    if (matched) {
      return NextResponse.json({
        success: true,
        reply: matched.reply,
        scriptureRef: matched.scriptureRef,
        originalText: matched.originalText,
        source: 'knowledge-base',
      });
    }

    // General reverent scholar response
    return NextResponse.json({
      success: true,
      scriptureRef: 'ज्ञानधर्म सर्वधर्म संगम (Universal Wisdom Sanctuary)',
      originalText: 'ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय॥\n(बृहदारण्यक उपनिषद् १.३.२८)',
      reply: `सादर प्रणाम। आपके प्रश्न: "${query}" के विषय में समस्त धर्मग्रंथों का एक स्वर में यह उपदेश है कि:

१. अंतःकरण की शुद्धि: सत्य भाषण, प्राणीमात्र पर दया और परोपकार ही धर्म का वास्तविक मूल है।
२. सम्यक् दृष्टि: चाहे श्रीमद्भगवद्गीता हो, श्री दुर्गा सप्तशती, पवित्र क़ुरआन, धम्मपद, पवित्र बाइबिल अथवा श्री गुरु ग्रंथ साहिब—सभी का एक ही लक्ष्य मनुष्य को अज्ञान के अंधकार से सत्य के प्रकाश की ओर ले जाना है।

आप किसी विशेष ग्रंथ के अध्याय, श्लोक, मंत्र, आयत अथवा साधना विधि के बारे में भी विस्तार से पूछ सकते हैं।`,
      source: 'knowledge-base-general',
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'मार्गदर्शन प्राप्त करने में बाधा आई। कृपया पुनः प्रयास करें।',
      },
      { status: 500 }
    );
  }
}
