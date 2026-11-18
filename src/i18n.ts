import { Locale, PipelineStage, WorkspaceTab } from './types';

export interface RuleCardItem {
  value: string;
  label: string;
  sub: string;
  accent?: 'orange' | 'emerald' | 'crimson' | 'gold' | 'default';
  hoverBullets: string[];
}

export interface HoverDetailCopy {
  badge: string;
  title: string;
  bullets: string[];
}

export interface HeroSlideCopy {
  kicker: string;
  headline: string;
  subline: string;
  highlightBadge: string;
}

export interface FaqItemCopy {
  q: string;
  a: string;
}

export interface ContactDeskCopy {
  country: string;
  org: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface PartnerSpotlightCopy {
  country: string;
  role: string;
  shortSubtitle: string;
  headquarters: string;
  credentialBadge: string;
  highlights: string[];
}

export interface Translations {
  allianceBrand: string;
  portalTitle: string;
  portalSubtitle: string;
  collaborationPartners: {
    bd: string;
    jp: string;
    vn: string;
  };
  allianceSpotlight: {
    tapHint: string;
    hqLabel: string;
    roleLabel: string;
    verifiedLabel: string;
    bd: PartnerSpotlightCopy;
    jp: PartnerSpotlightCopy;
    vn: PartnerSpotlightCopy;
  };
  topNav: {
    home: string;
    demands: string;
    legal: string;
    faq: string;
    privacy: string;
    contact: string;
  };
  mobileNav: {
    home: string;
    demands: string;
    legal: string;
    contact: string;
  };
  modeSwitch: {
    toAdmin: string;
    toPublic: string;
    overlayOn: string;
    overlayOff: string;
    languageSelectLabel: string;
  };
  heroSlides: [HeroSlideCopy, HeroSlideCopy, HeroSlideCopy];
  hero: {
    quotaPill: string;
    mainRecruiterLabel: string;
    mainRecruiterLocation: string;
    headline: string;
    subline: string;
    applyNow: string;
    whatsappDirect: string;
    checkEligibility: string;
    trackStatus: string;
    prevSlide: string;
    nextSlide: string;
  };
  hoverCards: {
    applyNow: HoverDetailCopy;
    whatsapp: HoverDetailCopy;
    checkEligibility: HoverDetailCopy;
    trackStatus: HoverDetailCopy;
    commandCenter: HoverDetailCopy;
    languageSwitcher: HoverDetailCopy;
    overlayToggle: HoverDetailCopy;
    legalButton: HoverDetailCopy;
    navHome: HoverDetailCopy;
    navDemands: HoverDetailCopy;
    navLegal: HoverDetailCopy;
    navFaq: HoverDetailCopy;
    navPrivacy: HoverDetailCopy;
    navContact: HoverDetailCopy;
  };
  infoModals: {
    faq: {
      title: string;
      subtitle: string;
      items: FaqItemCopy[];
    };
    privacy: {
      title: string;
      subtitle: string;
      summary: string;
      sections: { heading: string; body: string }[];
    };
    contact: {
      title: string;
      subtitle: string;
      desks: ContactDeskCopy[];
    };
  };
  footer: {
    brandTitle: string;
    allianceHeading: string;
    ethicalNotice: string;
    quickLinksHeading: string;
    privacyHeading: string;
    privacySummary: string;
    copyright: string;
    techProviderLabel: string;
    techProviderName: string;
    techProviderCard: {
      badge: string;
      title: string;
      subtitle: string;
      websiteUrl: string;
      features: string[];
    };
  };
  matrix: {
    sectionLabel: string;
    sectionTitle: string;
    legalButton: string;
    cards: RuleCardItem[];
  };
  legalModal: {
    title: string;
    overtimeTitle: string;
    overtimeItems: { rate: string; desc: string }[];
    bmetTitle: string;
    bmetItems: string[];
    liveSearchHeading: string;
    liveSearchSubheading: string;
    liveBtnBmet: string;
    liveBtnVietnam: string;
    liveSearchPlaceholder: string;
    liveSearchBtn: string;
    liveSearching: string;
    liveSourcesLabel: string;
    liveSearchedAtLabel: string;
    liveDisclaimer: string;
    close: string;
  };
  wizard: {
    title: string;
    stepLabels: [string, string, string, string];
    fullName: string;
    phone: string;
    district: string;
    passportNumber: string;
    referralCode: string;
    gender: string;
    female: string;
    male: string;
    age: string;
    heightCm: string;
    weightKg: string;
    bmiLabel: string;
    ftInLabel: string;
    medicalHeader: string;
    medNoInfectious: string;
    medNoHeartNeuro: string;
    medNoHeightFear: string;
    eligibleBadge: string;
    mismatchBadge: string;
    mismatchReasonAge: string;
    mismatchReasonHeight: string;
    mismatchReasonWeight: string;
    mismatchReasonGender: string;
    mismatchReasonMedical: string;
    englishHeader: string;
    engSpeak: string;
    engWrite: string;
    engSafety: string;
    selfIntroLabel: string;
    selfIntroPlaceholder: string;
    docsHeader: string;
    docPassport: string;
    docNid: string;
    docPhoto: string;
    docCert: string;
    attachSample: string;
    nextStep: string;
    prevStep: string;
    submitApp: string;
    passTitle: string;
    passTrackingId: string;
    passNote: string;
    sendWhatsappReceipt: string;
    trackThisId: string;
  };
  tracker: {
    sectionLabel: string;
    title: string;
    placeholder: string;
    searchBtn: string;
    quickSamples: string;
    notFound: string;
    candidateLabel: string;
    corridorLabel: string;
    statusLabel: string;
  };
  nav: Record<WorkspaceTab, string>;
  actions: {
    registerCandidate: string;
    createRequisition: string;
    exportCsv: string;
    advanceStage: string;
    sendWhatsappStatus: string;
    close: string;
    save: string;
    cancel: string;
    resetFilters: string;
  };
  metrics: {
    activeCandidates: string;
    openQuotas: string;
    coeProcessing: string;
    deployedTotal: string;
  };
  corridors: {
    heading: string;
    bangladeshSub: string;
    vietnamSub: string;
    japanSub: string;
  };
  stages: Record<PipelineStage, string>;
  trends: {
    heading: string;
    subheading: string;
    stageDistTitle: string;
    stageDistSub: string;
    monthlyVolTitle: string;
    monthlyVolSub: string;
    applicationsLabel: string;
    clearedLabel: string;
    medicalLabel: string;
    attestationLabel: string;
    smartCardLabel: string;
  };
  partnerSettings: {
    title: string;
    subtitle: string;
    fieldLabel: string;
    saveBtn: string;
    resetBtn: string;
    savedNotice: string;
  };
  labels: {
    searchCandidates: string;
    allCountries: string;
    allStages: string;
    candidateId: string;
    fullName: string;
    origin: string;
    sector: string;
    language: string;
    program: string;
    stage: string;
    prefecture: string;
    employer: string;
    salary: string;
    quota: string;
    deadline: string;
    complianceChecklist: string;
    noResults: string;
    languageLabel: string;
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  bn: {
    allianceBrand: 'SILVER GROUP × HARA INTERNATIONAL × QUYNH AN YARN CO., LTD',
    portalTitle: 'আন্তর্জাতিক জনশক্তি রপ্তানি',
    portalSubtitle: 'সিলভার গ্রুপ × হারা ইন্টারন্যাশনাল × কুইন আন ইয়ার্ন কোং লিমিটেড',
    collaborationPartners: {
      bd: 'SILVER GROUP',
      jp: 'HARA INTERNATIONAL',
      vn: 'QUYNH AN YARN CO., LTD',
    },
    allianceSpotlight: {
      tapHint: 'হোভার বা ট্যাপ করে বিস্তারিত দেখুন',
      hqLabel: 'সদর দপ্তর',
      roleLabel: 'জোটের ভূমিকা',
      verifiedLabel: 'যাচাইকৃত সনদ',
      bd: {
        country: 'বাংলাদেশ',
        role: 'রিক্রুটমেন্ট ও বিএমইটি ডেস্ক',
        shortSubtitle: 'রিক্রুটমেন্ট ও BMET ডেস্ক',
        headquarters: 'ঢাকা',
        credentialBadge: 'BMET অনুমোদিত প্রেরণকারী সংস্থা',
        highlights: [
          'প্রার্থী বাছাই, মেডিকেল ফিটনেস ও ইংরেজি/জাপানি স্ক্রিনিং',
          'BMET স্মার্ট কার্ড, ফিঙ্গারপ্রিন্ট ও প্রি-ডিপার্চার ব্রিফিং',
        ],
      },
      jp: {
        country: 'জাপান',
        role: 'দ্বিপাক্ষিক মান নিয়ন্ত্রণ ও ব্যবস্থাপনা',
        shortSubtitle: 'দ্বিপাক্ষিক মান ও ব্যবস্থাপনা',
        headquarters: 'টোকিও',
        credentialBadge: 'RSK ও তদারকি অনুমোদিত সংস্থা',
        highlights: [
          'আন্তর্জাতিক নিয়োগ মানদণ্ড, COE এবং কর্মপরিবেশ অডিট',
          'ত্রি-দেশীয় নিরাপত্তা ও বেতন স্বচ্ছতা তদারকি',
        ],
      },
      vn: {
        country: 'ভিয়েতনাম',
        role: 'হুং ইয়েন ইয়ার্ন উৎপাদন কেন্দ্র',
        shortSubtitle: 'হুং ইয়েন ইয়ার্ন ফ্যাক্টরি',
        headquarters: 'হুং ইয়েন',
        credentialBadge: 'আ মে গ্রাম, কুইন আন কমিউন প্ল্যান্ট',
        highlights: [
          'সরাসরি নিয়োগকর্তা ও আধুনিক স্পিনিং-ইয়ার্ন উৎপাদন লাইন',
          'শতভাগ ফ্রি ডরমিটরি, শিফট মিল, বিদ্যুৎ ও যাতায়াত বাস',
        ],
      },
    },
    topNav: {
      home: 'হোম',
      demands: 'চাকরির চাহিদা',
      legal: 'আইন ও বিএমইটি',
      faq: 'সাধারণ জিজ্ঞাসা',
      privacy: 'গোপনীয়তা নীতি',
      contact: 'যোগাযোগ',
    },
    mobileNav: {
      home: 'হোম',
      demands: 'চাহিদা',
      legal: 'বিএমইটি',
      contact: 'যোগাযোগ',
    },
    modeSwitch: {
      toAdmin: 'অ্যাডমিন প্যানেল',
      toPublic: 'পাবলিক পোর্টাল',
      overlayOn: 'সাইবার-গ্রিড ওভারলে চালু',
      overlayOff: 'সাইবার-গ্রিড ওভারলে বন্ধ',
      languageSelectLabel: 'পোর্টালের ভাষা পরিবর্তন করুন',
    },
    heroSlides: [
      {
        kicker: 'ভিয়েতনাম হুং ইয়েন ইয়ার্ন ফ্যাক্টরি ডিম্যান্ড',
        headline: 'আধুনিক ইয়ার্ন ও স্পিনিং লাইনে দক্ষ কর্মী নিয়োগ',
        subline: 'মাসিক নিট বেতন $৫০০ USD · ২৪ মাসের চুক্তি · ১০টি মহিলা শূন্যপদ',
        highlightBadge: '$500 USD / MO NET · ১০টি শূন্যপদ',
      },
      {
        kicker: 'নিটওয়্যার ও ফেব্রিক কোয়ালিটি ইন্সপেকশন ডিভিশন',
        headline: 'শতভাগ ফ্রি আবাসন, শিফট মিল, বিদ্যুৎ ও যাতায়াত',
        subline: 'নিট ও টেক্সটাইল উৎপাদনে নিরাপদ কর্মপরিবেশ · পূর্ব অভিজ্ঞতার প্রয়োজন নেই',
        highlightBadge: '100% FREE HOUSING & MEALS',
      },
      {
        kicker: 'আন্তর্জাতিক শিল্প প্রশিক্ষণ ও সরাসরি করিডোর',
        headline: 'বাংলাদেশ, জাপান ও ভিয়েতনামের যৌথ অনুমোদিত নিয়োগ',
        subline: 'BMET স্মার্ট কার্ড, দূতাবাস সত্যায়ন ও সরাসরি ব্যাংক ট্রান্সফার নিশ্চিত',
        highlightBadge: 'BD × JP × VN VERIFIED CORRIDOR',
      },
    ],
    hero: {
      quotaPill: '১০টি শূন্যপদ খোলা • শুরু: ০৫ জানুয়ারি ২০২৭',
      mainRecruiterLabel: 'প্রধান নিয়োগকর্তা · সরাসরি ফ্যাক্টরি',
      mainRecruiterLocation: 'আ মে গ্রাম, কুইন আন কমিউন, হুং ইয়েন, ভিয়েতনাম',
      headline: 'ভিয়েতনাম ও জাপানে বৈধ ও সরাসরি কর্মসংস্থান',
      subline: 'বাংলাদেশ (BMET) · ভিয়েতনাম হাব · জাপান সুপারভাইজিং ডিরেক্ট রিক্রুটমেন্ট',
      applyNow: 'এখনই আবেদন করুন',
      whatsappDirect: 'হোয়াটসঅ্যাপ ডিরেক্ট',
      checkEligibility: 'যোগ্যতা যাচাই',
      trackStatus: 'আবেদন ট্র্যাক করুন',
      prevSlide: 'পূর্ববর্তী স্লাইড',
      nextSlide: 'পরবর্তী স্লাইড',
    },
    hoverCards: {
      applyNow: {
        badge: 'ডিজিটাল আবেদন পোর্টাল',
        title: '৪-ধাপ রিয়েল-টাইম আবেদন উইজার্ড',
        bullets: [
          '৪-ধাপ ডিজিটাল ফর্ম (পরিচিতি, শারীরিক যাচাই, ইংরেজি, ডকুমেন্ট)',
          'স্বয়ংক্রিয় উচ্চতা (১৬০ সেমি) ও ওজন (৫৫ কেজি) BMI যাচাই',
          'সাবমিটের সাথে সাথে তাৎক্ষণিক ট্র্যাকিং আইডি (HH-2026-XXXX) ও QR পাস',
          'অনলাইন আবেদনে কোনো আবেদন ফি নেই (Zero Application Fee)',
        ],
      },
      whatsapp: {
        badge: 'সরাসরি ডেস্ক সাপোর্ট',
        title: 'সিলভার গ্রুপ ঢাকা হোয়াটসঅ্যাপ ডেস্ক',
        bullets: [
          'সরাসরি ঢাকা রিক্রুটমেন্ট ডেস্ক কোঅর্ডিনেটরের সাথে কথা বলুন',
          'পাসপোর্ট, NID ও মেডিকেল কাগজপত্র তাৎক্ষণিক যাচাই সহায়তা',
          'সার্ভিস সময়: সকাল ০৯:০০ – রাত ০৯:০০ (বাংলাদেশ সময়)',
        ],
      },
      checkEligibility: {
        badge: 'তাৎক্ষণিক অটো-ভ্যালিডেটর',
        title: 'ভিয়েতনাম ও জাপান যোগ্যতা যাচাই',
        bullets: [
          'বয়স (২০–৪৫ বছর), উচ্চতা (১৬০+ সেমি) ও ওজন (৫৫+ কেজি) পরীক্ষা',
          'রিয়েল-টাইম BMI ও ফুট/ইঞ্চি ক্যালকুলেশন',
          'মেডিকেল ফিটনেস ও ইংরেজি দক্ষতা প্রি-স্ক্রিনিং',
        ],
      },
      trackStatus: {
        badge: '৭-ধাপ লাইভ ট্র্যাকার',
        title: 'আবেদন ও ভিসা অগ্রগতি ট্র্যাক করুন',
        bullets: [
          'ট্র্যাকিং আইডি (HH-2026-XXXX) বা মোবাইল নম্বর দিয়ে খুঁজুন',
          'আবেদন জমা থেকে মেডিকেল, COE, BMET কার্ড ও ফ্লাইট পর্যন্ত লাইভ ধাপ',
          'সিলভার গ্রুপ ও ভিয়েতনাম ডেস্ক থেকে রিয়েল-টাইম আপডেট',
        ],
      },
      commandCenter: {
        badge: 'ম্যানেজমেন্ট ওয়ার্কস্পেস',
        title: 'ত্রি-দেশীয় কমান্ড সেন্টার (অ্যাডমিন)',
        bullets: [
          'প্রার্থী তালিকা, অটোমেটিক কোটা লক ও পাইপলাইন ধাপ পরিচালনা',
          'COE, দূতাবাস সত্যায়ন ও BMET স্মার্ট কার্ড চেকলিস্ট আপডেট',
          'সিলভার গ্রুপ, হারা ইন্টারন্যাশনাল ও ভিয়েতনাম পার্টনার সিঙ্ক',
        ],
      },
      languageSwitcher: {
        badge: '৪-ভাষা সিস্টেম',
        title: 'পোর্টালের ভাষা নির্বাচন করুন',
        bullets: [
          'বাংলা (ডিফল্ট), 日本語, English এবং Tiếng Việt',
          'সকল ফর্ম, আইনগত তথ্য ও ট্র্যাকার তাৎক্ষণিক অনুবাদ',
          'আপনার পছন্দের ভাষা ব্রাউজারে সংরক্ষিত থাকে',
        ],
      },
      overlayToggle: {
        badge: 'টেলিমেট্রি গ্রিড',
        title: 'ঢাকা–টোকিও–হুং ইয়েন সাইবার গ্রিড',
        bullets: [
          'ব্যাকগ্রাউন্ডে অ্যানিমেটেড ত্রি-দেশীয় কানেকশন গ্রিড চালু/বন্ধ করুন',
          'কম্পিউটার বা মোবাইলে ফোকাস মোডের জন্য যেকোনো সময় ডিম করুন',
        ],
      },
      legalButton: {
        badge: 'আইনি সুরক্ষা সনদ',
        title: 'ভিয়েতনাম শ্রম আইন ও BMET নীতিমালা',
        bullets: [
          'কর্মদিবস (১৫০%), সাপ্তাহিক ছুটি (২০০%) ও সরকারি ছুটি (৩০০%) ওভারটাইম',
          'রাতের শিফট ভাতা (+৩০% অতিরিক্ত) ও বৈধ চুক্তি সুরক্ষা',
          'বাংলাদেশ BMET স্মার্ট কার্ড ও দূতাবাস সত্যায়ন চেকলিস্ট',
        ],
      },
      navHome: {
        badge: 'পাবলিক পোর্টাল',
        title: 'মূল পোর্টাল হোমপেজ',
        bullets: [
          'হিরো স্লাইডার ও বর্তমান রিক্রুটমেন্ট ডিম্যান্ড দেখুন',
          'তাৎক্ষণিক আবেদন, হোয়াটসঅ্যাপ ও ট্র্যাকারে ফিরুন',
        ],
      },
      navDemands: {
        badge: 'সক্রিয় নিয়োগ কোটা',
        title: 'ভিয়েতনাম ও জাপান চাকরির চাহিদাপত্র',
        bullets: [
          'ভিয়েতনাম হুং ইয়েন ইয়ার্ন ফ্যাক্টরি ($৫০০/মাস, ১০ শূন্যপদ)',
          'বেতন, চুক্তির মেয়াদ, ফ্রি থাকা-খাওয়া ও শিফটের পূর্ণ শর্তাবলি',
        ],
      },
      navLegal: {
        badge: 'BMET ও শ্রম আইন',
        title: 'আইনি সুরক্ষা ও ওভারটাইম নীতি',
        bullets: [
          'ভিয়েতনাম শ্রম আইনে নির্ধারিত ওভারটাইম ও নাইট শিফট ভাতা',
          'দূতাবাস সত্যায়িত ডিম্যান্ড লেটার ও BMET ফিঙ্গারপ্রিন্ট প্রক্রিয়া',
        ],
      },
      navFaq: {
        badge: 'প্রার্থীদের সহায়তা',
        title: 'সচরাচর জিজ্ঞাসিত প্রশ্নোত্তর (FAQ)',
        bullets: [
          'বেতন, ওভারটাইম, থাকা-খাওয়া ও মেডিকেল পরীক্ষার বিস্তারিত উত্তর',
          'ভিসা ও BMET স্মার্ট কার্ড প্রক্রিয়াকরণের সময়সীমা জানুন',
        ],
      },
      navPrivacy: {
        badge: 'তথ্য নিরাপত্তা',
        title: 'গোপনীয়তা ও ডকুমেন্ট সুরক্ষা নীতি',
        bullets: [
          'পাসপোর্ট, NID ও মেডিকেল রিপোর্ট এনক্রিপ্টেড ভল্টে সুরক্ষিত',
          'তথ্য শুধুমাত্র বৈধ বিদেশি কর্মসংস্থান যাচাইয়ে ব্যবহৃত হয়',
        ],
      },
      navContact: {
        badge: 'অফিশিয়াল ডেস্ক',
        title: 'ঢাকা, টোকিও ও হুং ইয়েন যোগাযোগ',
        bullets: [
          'সিলভার গ্রুপ, হারা ইন্টারন্যাশনাল ও কুইন আন ইয়ার্ন কোং লিমিটেড',
          'সরাসরি অফিস ঠিকানা, ফোন, হোয়াটসঅ্যাপ ও ইমেইল তথ্য',
        ],
      },
    },
    infoModals: {
      faq: {
        title: 'সাধারণ জিজ্ঞাসা (FAQ)',
        subtitle: 'ভিয়েতনাম ও জাপান নিয়োগ প্রক্রিয়া সম্পর্কিত জরুরি প্রশ্নোত্তর',
        items: [
          {
            q: 'অনলাইনে আবেদন করতে কি কোনো ফি লাগে?',
            a: 'না। এই পোর্টালে অনলাইন আবেদন ও প্রাথমিক যোগ্যতা যাচাই সম্পূর্ণ ফ্রি। সরকারি BMET ক্লিয়ারেন্স, মেডিকেল ও ভিসা স্ট্যাম্পিং সংক্রান্ত নির্ধারিত প্রক্রিয়া কেবল নির্বাচিত প্রার্থীদের সরাসরি জানানো হয়।',
          },
          {
            q: 'ভিয়েতনাম ইয়ার্ন ফ্যাক্টরিতে নিট বেতন কত এবং কীভাবে পরিশোধ হয়?',
            a: 'মাসিক মূল নিট বেতন $৫০০ USD, যা প্রতি মাসে সরাসরি কর্মীর ব্যাংক অ্যাকাউন্টে প্রদান করা হয়। ওভারটাইম করলে ভিয়েতনাম শ্রম আইন অনুযায়ী ১৫০% থেকে ৩০০% অতিরিক্ত ভাতা যোগ হয়।',
          },
          {
            q: 'থাকা, খাওয়া ও যাতায়াতের খরচ কি কর্মীকে দিতে হবে?',
            a: 'না। ফ্যাক্টরি ডরমিটরি আবাসন, বিদ্যুৎ-পানি, শিফট অনুযায়ী খাবার এবং কারখানায় যাতায়াত পরিবহন ১০০% ফ্রি প্রদান করা হয়।',
          },
          {
            q: 'কাজের শিফট এবং সাপ্তাহিক ছুটি কেমন?',
            a: 'প্রতিদিন ১২ ঘণ্টার রোটেশনাল শিফট (শিফট ১: ০৬:০০–১৮:০০ এবং শিফট ২: ১৮:০০–০৬:০০), যা প্রতি ৩ দিন পরপর পরিবর্তিত হয়। রাতের শিফটে +৩০% অতিরিক্ত আইনগত ভাতা প্রযোজ্য।',
          },
          {
            q: 'পূর্ব কাজের অভিজ্ঞতা বা জাপানি ভাষা জানা কি বাধ্যতামূলক?',
            a: 'ভিয়েতনাম ইয়ার্ন ফ্যাক্টরির জন্য পূর্ব অভিজ্ঞতার প্রয়োজন নেই; বেসিক ইংরেজি বলতে ও লিখতে পারলেই আবেদন করা যাবে। জাপান SSW/TITP চাকরির ক্ষেত্রে N4 বা JFT-Basic A2 প্রয়োজন।',
          },
          {
            q: 'বিমান টিকেট কে বহন করবে এবং কখন কাটতে হবে?',
            a: 'ভিসা ইস্যু এবং বাংলাদেশ BMET স্মার্ট কার্ড ক্লিয়ারেন্স সম্পন্ন হওয়ার পর কর্মী নিজ খরচে বিমান টিকেট সংগ্রহ করবেন। আগে কোনো টিকেট কাটার প্রয়োজন নেই।',
          },
        ],
      },
      privacy: {
        title: 'গোপনীয়তা ও ডকুমেন্ট সুরক্ষা নীতি',
        subtitle: 'প্রার্থীর ব্যক্তিগত তথ্য ও ডিজিটাল কাগজপত্রের নিরাপত্তা অঙ্গীকার',
        summary:
          'আপনার পাসপোর্ট স্ক্যান, জাতীয় পরিচয়পত্র (NID), ছবি এবং মেডিকেল ফিটনেস তথ্য নিরাপদ ভল্টে এনক্রিপ্ট করে সংরক্ষণ করা হয় এবং শুধুমাত্র যাচাইকৃত বিদেশি কর্মসংস্থান প্রক্রিয়াকরণের জন্য ব্যবহৃত হয়।',
        sections: [
          {
            heading: '১. তথ্য সংগ্রহ ও ব্যবহার',
            body: 'আবেদনকারীর নাম, ফোন নম্বর, পাসপোর্ট নম্বর, শারীরিক পরিমাপ এবং ডকুমেন্ট কেবল সিলভার গ্রুপ, কুইন আন ইয়ার্ন কোং লিমিটেড ও হারা ইন্টারন্যাশনাল-এর অনুমোদিত নিয়োগ যাচাই ও দূতাবাস/BMET ফাইলিংয়ে ব্যবহৃত হয়।',
          },
          {
            heading: '২. তৃতীয় পক্ষের কাছে বিক্রয় নিষিদ্ধ',
            body: 'কোনো অননুমোদিত দালাল, বিজ্ঞাপন সংস্থা বা তৃতীয় পক্ষের কাছে প্রার্থীর ব্যক্তিগত তথ্য বা ডকুমেন্ট হস্তান্তর বা বিক্রয় করা হয় না।',
          },
          {
            heading: '৩. এনক্রিপশন ও স্থানীয় ভল্ট সিঙ্ক',
            body: 'নেটওয়ার্ক সংযোগ না থাকলেও আবেদন তথ্য ব্রাউজারের নিরাপদ লোকাল ভল্টে সংরক্ষিত থাকে এবং সার্ভারের সাথে এনক্রিপ্টেড চ্যানেলে সিঙ্ক হয়।',
          },
          {
            heading: '৪. তথ্য সংশোধন ও মুছে ফেলার অধিকার',
            body: 'প্রার্থী যেকোনো সময় আমাদের ঢাকা বা অনুমোদিত কোঅর্ডিনেশন ডেস্কে যোগাযোগ করে নিজের আবেদন তথ্য হালনাগাদ বা বাতিল করার অনুরোধ করতে পারবেন।',
          },
        ],
      },
      contact: {
        title: 'অফিশিয়াল যোগাযোগ ও পার্টনার ডেস্ক',
        subtitle: 'বাংলাদেশ, জাপান ও ভিয়েতনামের অনুমোদিত কোঅর্ডিনেশন কেন্দ্র',
        desks: [
          {
            country: 'বাংলাদেশ · ঢাকা হাব',
            org: 'Silver Group — BMET Licensed Sending Hub',
            address: 'গুলশান–বনানী / উত্তরা রিক্রুটমেন্ট কমপ্লেক্স, ঢাকা, বাংলাদেশ',
            phone: '+880 1700-000000 (WhatsApp / Voice)',
            email: 'bd-desk@hr.handsandhead.com',
            hours: 'রবিবার – বৃহস্পতিবার · ০৯:০০ – ২১:০০ BST',
          },
          {
            country: 'ভিয়েতনাম · হুং ইয়েন ও হ্যানয়',
            org: 'Quynh An Yarn Co., Ltd — A Me Village Plant Desk',
            address: 'আ মে গ্রাম, কুইন আন কমিউন, হুং ইয়েন প্রদেশ, ভিয়েতনাম',
            phone: '+84 24-3900-0000',
            email: 'vn-desk@hr.handsandhead.com',
            hours: 'সোমবার – শনিবার · ০৮:৩০ – ১৭:৩০ ICT',
          },
          {
            country: 'জাপান · টোকিও ও ওসাকা',
            org: 'Hara International — Supervising & RSK Organization',
            address: 'চিয়োদা-কু, টোকিও ১০১-০০৪৭, জাপান',
            phone: '+81 3-5000-0000',
            email: 'jp-desk@hr.handsandhead.com',
            hours: 'সোমবার – শুক্রবার · ০৯:০০ – ১৮:০০ JST',
          },
        ],
      },
    },
    footer: {
      brandTitle: 'আন্তর্জাতিক জনশক্তি রপ্তানি',
      allianceHeading: 'সক্রিয় ত্রি-দেশীয় কৌশলগত জোট (লাইভ করিডোর)',
      ethicalNotice:
        'শূন্য-প্রতারণা নৈতিক নিয়োগ ও শতভাগ BMET স্মার্ট কার্ড অনুমোদিত করিডোর। কোনো অননুমোদিত মধ্যস্বত্বভোগীর কাছে আর্থিক লেনদেন করবেন না।',
      quickLinksHeading: 'গুরুত্বপূর্ণ লিংক',
      privacyHeading: 'তথ্য ও ডকুমেন্ট গোপনীয়তা',
      privacySummary:
        'পাসপোর্ট, NID ও মেডিকেল রিপোর্ট এনক্রিপ্টেড অবস্থায় থাকে এবং কেবল অনুমোদিত ভিসা, দূতাবাস সত্যায়ন ও BMET প্রক্রিয়াকরণে ব্যবহৃত হয়।',
      copyright: '© ২০২৬ আন্তর্জাতিক জনশক্তি রপ্তানি · Silver Group × Hara International × Quynh An Yarn Co., Ltd',
      techProviderLabel: 'প্রযুক্তি সরবরাহকারী:',
      techProviderName: 'HANDS & HEAD',
      techProviderCard: {
        badge: 'TECHNOLOGY PROVIDER · কোর প্ল্যাটফর্ম আর্কিটেকচার',
        title: 'HANDS & HEAD',
        subtitle: 'ত্রি-দেশীয় আন্তর্জাতিক জনশক্তি রপ্তানি ও ডিজিটাল সিঙ্ক প্রযুক্তি অংশীদার',
        websiteUrl: 'https://handsandhead.com',
        features: [
          'অফলাইন-রেজিলিয়েন্ট IndexedDB + রিয়েল-টাইম সার্ভার সিঙ্ক ইঞ্জিন',
          '৪-ধাপের স্মার্ট আবেদন উইজার্ড ও ৭-ধাপের লাইভ পাইপলাইন ট্র্যাকার',
          'BMET স্মার্ট কার্ড, COE সত্যায়ন ও কোটা লক অটোমেশন সিস্টেম',
        ],
      },
    },
    matrix: {
      sectionLabel: 'ভিয়েতনাম ইয়ার্ন ফ্যাক্টরি ডিম্যান্ড • HUNG YEN',
      sectionTitle: 'শর্তাবলি ও সুবিধাসমূহ',
      legalButton: 'আইনি সুরক্ষা ও ওভারটাইম নীতিমালা',
      cards: [
        {
          value: '$500 USD / MONTH',
          label: 'নিট মাসিক বেতন',
          sub: 'ব্যাংক ট্রান্সফার · কোনো গোপন কর্তন নেই',
          accent: 'orange',
          hoverBullets: [
            'প্রতি মাসে সরাসরি কর্মীর ব্যাংক অ্যাকাউন্টে $৫০০ USD পরিশোধ',
            'ভিয়েতনাম শ্রম আইনে ওভারটাইম ভাতা ১৫০%–৩০০% আলাদাভাবে যুক্ত হবে',
            'কোনো অবৈধ বা গোপন বেতন কর্তন নেই',
          ],
        },
        {
          value: '24 MONTHS',
          label: 'চাকরির চুক্তি',
          sub: '১ মাস প্রোবেশন পিরিয়ড',
          accent: 'default',
          hoverBullets: [
            'প্রাথমিক অনুমোদিত ইন্ডাস্ট্রিয়াল ওয়ার্ক পারমিট ২ বছর (২৪ মাস)',
            'প্রথম ১ মাস স্ট্যান্ডার্ড প্রোবেশন ও প্রশিক্ষণ সময়কাল',
            'দক্ষতা ও সম্মতির ভিত্তিতে নবায়নযোগ্য কর্মচুক্তি',
          ],
        },
        {
          value: 'FEMALE • 20–45 YRS',
          label: 'লিঙ্গ ও বয়সসীমা',
          sub: 'বৈধ পাসপোর্ট আবশ্যক',
          accent: 'crimson',
          hoverBullets: [
            'হুং ইয়েন ইয়ার্ন ফ্যাক্টরির এই ব্যাচে শুধুমাত্র মহিলা প্রার্থী',
            'বয়সসীমা ২০ থেকে ৪৫ বছরের মধ্যে হতে হবে',
            'পাসপোর্টের মেয়াদ ন্যূনতম ১৮ মাস থাকা উত্তম',
          ],
        },
        {
          value: 'MIN 160 CM / 55 KG',
          label: 'শারীরিক মানদণ্ড',
          sub: 'সুস্থতা ও উচ্চতা যাচাই',
          accent: 'default',
          hoverBullets: [
            'সর্বনিম্ন উচ্চতা ১৬০ সেমি (প্রায় ৫ ফুট ৩ ইঞ্চি)',
            'সর্বনিম্ন ওজন ৫৫ কেজি ও স্বাভাবিক স্বাস্থ্য সূচক',
            'আবেদন ফর্মে রিয়েল-টাইম BMI ও ফিটনেস যাচাই সুবিধা',
          ],
        },
        {
          value: '100% FREE',
          label: 'আবাসন, খাবার ও যাতায়াত',
          sub: 'বিদ্যুৎ, পানি ও শিফট মিল ফ্রি',
          accent: 'emerald',
          hoverBullets: [
            'ফ্যাক্টরি ডরমিটরি বাসস্থান সম্পূর্ণ ফ্রি',
            'বিদ্যুৎ, পানি ও দৈনিক শিফট মিল কোম্পানি বহন করবে',
            'ডরমিটরি থেকে কারখানায় যাতায়াত বাস ১০০% ফ্রি',
          ],
        },
        {
          value: 'ENGLISH SPEAK & WRITE',
          label: 'ইংরেজি বলা ও লেখা',
          sub: 'পূর্ব অভিজ্ঞতার প্রয়োজন নেই',
          accent: 'gold',
          hoverBullets: [
            'বেসিক ইংরেজিতে কথা বলা ও শিফট লগ লেখার সক্ষমতা',
            'কারখানার নিরাপত্তা নির্দেশনা ইংরেজিতে বোঝা আবশ্যক',
            'গার্মেন্টস বা ইয়ার্ন ফ্যাক্টরিতে পূর্ব কাজের অভিজ্ঞতা জরুরি নয়',
          ],
        },
        {
          value: '12-HR ROTATING',
          label: 'শিফট ১ (০৬–১৮) / শিফট ২ (১৮–০৬)',
          sub: 'প্রতি ৩ দিন পর পর শিফট পরিবর্তন',
          accent: 'default',
          hoverBullets: [
            'দিন শিফট: সকাল ০৬:০০ – সন্ধ্যা ১৮:০০',
            'রাত শিফট: সন্ধ্যা ১৮:০০ – সকাল ০৬:০০ (+৩০% রাত ভাতা)',
            'প্রতি ৩ দিন পরপর রোটেশনাল শিফট সমন্বয়',
          ],
        },
        {
          value: 'AIR TICKET: SELF',
          label: 'অনলাইন ভিডিও ইন্টারভিউ',
          sub: 'ভিসা ও BMET পর বিমান টিকেট',
          accent: 'default',
          hoverBullets: [
            'ঢাকা ও ভিয়েতনাম ডেস্কের মাধ্যমে সরাসরি অনলাইন ভিডিও ইন্টারভিউ',
            'ভিসা ও BMET স্মার্ট কার্ড ইস্যুর পর নিজের বিমান টিকেট',
            'সকল ধাপ লাইভ ট্র্যাকারে রিয়েল-টাইমে দেখা যাবে',
          ],
        },
      ],
    },
    legalModal: {
      title: 'ভিয়েতনাম শ্রম আইন ও BMET সুরক্ষা',
      overtimeTitle: 'ভিয়েতনাম শ্রম আইন (ওভারটাইম রেট)',
      overtimeItems: [
        { rate: '150%', desc: 'সাধারণ কর্মদিবসে অতিরিক্ত ঘণ্টা' },
        { rate: '200%', desc: 'সাপ্তাহিক ছুটির দিনে কাজ' },
        { rate: '300%', desc: 'সরকারি ছুটির দিনে কাজ' },
        { rate: '+30%', desc: 'রাতের শিফট ভাতা (22:00–06:00)' },
      ],
      bmetTitle: 'বাংলাদেশ BMET ও দূতাবাস চেকলিস্ট',
      bmetItems: [
        'ভিয়েতনাম দূতাবাস ও পররাষ্ট্র মন্ত্রণালয় সত্যায়িত ডিম্যান্ড লেটার',
        'জাপান/ভিয়েতনাম কর্মসংস্থান চুক্তি যাচাই ও স্বাক্ষর',
        'BMET স্মার্ট কার্ড, ফিঙ্গারপ্রিন্ট ও প্রি-ডিপার্চার ওরিয়েন্টেশন',
        'মেডিকেল ফিটনেস (সংক্রামক, হৃদরোগ ও স্নায়বিক রোগমুক্ত)',
      ],
      liveSearchHeading: 'লাইভ ওয়েব সোর্স আপডেট (Google Search)',
      liveSearchSubheading: 'অফিশিয়াল BMET ও ভিয়েতনাম শ্রম আইন তথ্য সরাসরি খুঁজুন',
      liveBtnBmet: 'BMET সত্যায়ন নীতি',
      liveBtnVietnam: 'ভিয়েতনাম শ্রম আইন আপডেট',
      liveSearchPlaceholder: 'আইনি প্রশ্ন লিখুন (যেমন: BMET স্মার্ট কার্ড ফি, ভিয়েতনাম ওভারটাইম নিয়ম)...',
      liveSearchBtn: 'অনুসন্ধান',
      liveSearching: 'অফিশিয়াল ওয়েব সোর্স যাচাই হচ্ছে...',
      liveSourcesLabel: 'যাচাইকৃত ওয়েব সূত্রসমূহ',
      liveSearchedAtLabel: 'সর্বশেষ আপডেট',
      liveDisclaimer: 'তথ্যসমূহ সরাসরি লাইভ Google Search গ্রাউন্ডিং থেকে সংগৃহীত।',
      close: 'বন্ধ করুন',
    },
    wizard: {
      title: '৪-ধাপ রিয়েল-টাইম আবেদন ফর্ম',
      stepLabels: ['১. পরিচিতি', '২. শারীরিক যাচাই', '৩. ইংরেজি দক্ষতা', '৪. ডকুমেন্ট ও সাবমিট'],
      fullName: 'পূর্ণ নাম (পাসপোর্ট অনুযায়ী)',
      phone: 'মোবাইল / হোয়াটসঅ্যাপ নম্বর',
      district: 'জেলা',
      passportNumber: 'পাসপোর্ট নম্বর',
      referralCode: 'এজেন্ট রেফারেল কোড (ঐচ্ছিক)',
      gender: 'লিঙ্গ',
      female: 'মহিলা (Female)',
      male: 'পুরুষ (Male)',
      age: 'বয়স (বছর)',
      heightCm: 'উচ্চতা (সেমি / CM)',
      weightKg: 'ওজন (কেজি / KG)',
      bmiLabel: 'লাইভ BMI',
      ftInLabel: 'ফুট / ইঞ্চি',
      medicalHeader: 'মেডিকেল ফিটনেস ঘোষণা',
      medNoInfectious: 'কোনো সংক্রামক বা ছোঁয়াচে রোগ নেই',
      medNoHeartNeuro: 'হৃদরোগ বা স্নায়বিক জটিলতা নেই',
      medNoHeightFear: 'উচ্চতা ভীতি বা শিফট কাজের সমস্যা নেই',
      eligibleBadge: '100% ELIGIBLE • যোগ্য',
      mismatchBadge: 'CRITERIA MISMATCH • শর্ত পূরণ হয়নি',
      mismatchReasonAge: 'বয়স ২০ থেকে ৪৫ বছরের মধ্যে হতে হবে',
      mismatchReasonHeight: 'সর্বনিম্ন উচ্চতা ১৬০ সেমি প্রয়োজন',
      mismatchReasonWeight: 'সর্বনিম্ন ওজন ৫৫ কেজি প্রয়োজন',
      mismatchReasonGender: 'এই ভিয়েতনাম ইয়ার্ন ফ্যাক্টরি ডিমান্ড শুধুমাত্র মহিলা প্রার্থীদের জন্য',
      mismatchReasonMedical: 'সবগুলো মেডিকেল ফিটনেস ঘোষণা নিশ্চিত করুন',
      englishHeader: '৩-ট্যাপ ইংরেজি দক্ষতা যাচাই',
      engSpeak: 'বেসিক ইংরেজিতে কথা বলতে পারি',
      engWrite: 'ইংরেজিতে কাজের লগ লিখতে পারি',
      engSafety: 'ফ্যাক্টরি সেফটি নির্দেশনা বুঝতে পারি',
      selfIntroLabel: 'সংক্ষিপ্ত ইংরেজি পরিচিতি (১–২ লাইন)',
      selfIntroPlaceholder: 'I am ready to work 12-hour rotating shifts in Vietnam...',
      docsHeader: 'ডকুমেন্ট আপলোড প্রিভিউ',
      docPassport: 'পাসপোর্ট স্ক্যান',
      docNid: 'জাতীয় পরিচয়পত্র (NID)',
      docPhoto: 'পাসপোর্ট সাইজ ছবি',
      docCert: 'শিক্ষা / প্রশিক্ষণ সনদ',
      attachSample: 'স্যাম্পল ফাইল যুক্ত করুন',
      nextStep: 'পরবর্তী ধাপ',
      prevStep: 'পূর্ববর্তী ধাপ',
      submitApp: 'আবেদন জমা দিন',
      passTitle: 'ডিজিটাল ক্যান্ডিডেট পাস তৈরি হয়েছে',
      passTrackingId: 'ট্র্যাকিং আইডি',
      passNote: 'আপনার আবেদন সরাসরি অ্যাডমিন প্যানেলে যুক্ত হয়েছে।',
      sendWhatsappReceipt: 'হোয়াটসঅ্যাপে রসিদ পাঠান',
      trackThisId: 'লাইভ ট্র্যাকার দেখুন',
    },
    tracker: {
      sectionLabel: 'লাইভ ৭-ধাপ স্ট্যাটাস ট্র্যাকার',
      title: 'আবেদন ট্র্যাক করুন',
      placeholder: 'ট্র্যাকিং আইডি (HH-2026-4102) বা মোবাইল নম্বর লিখুন...',
      searchBtn: 'স্ট্যাটাস দেখুন',
      quickSamples: 'দ্রুত পরীক্ষা:',
      notFound: 'কোনো আবেদন পাওয়া যায়নি। সঠিক ট্র্যাকিং আইডি বা মোবাইল নম্বর দিন।',
      candidateLabel: 'প্রার্থী',
      corridorLabel: 'করিডোর / ফ্যাক্টরি',
      statusLabel: 'বর্তমান ধাপ',
    },
    nav: {
      overview: 'সারসংক্ষেপ',
      candidates: 'প্রার্থী তালিকা',
      jobs: 'চাকরির চাহিদাপত্র',
      compliance: 'COE ও ভিসা',
      partners: 'পার্টনার হাব',
    },
    actions: {
      registerCandidate: 'নতুন প্রার্থী যোগ',
      createRequisition: 'নতুন চাহিদাপত্র',
      exportCsv: 'CSV ডাউনলোড',
      advanceStage: 'পরবর্তী ধাপে নিন',
      sendWhatsappStatus: 'হোয়াটসঅ্যাপে স্ট্যাটাস পাঠান',
      close: 'বন্ধ করুন',
      save: 'সংরক্ষণ করুন',
      cancel: 'বাতিল',
      resetFilters: 'ফিল্টার রিসেট',
    },
    metrics: {
      activeCandidates: 'সক্রিয় প্রার্থী',
      openQuotas: 'খালি কোটা',
      coeProcessing: 'COE ও ভিসা প্রক্রিয়াধীন',
      deployedTotal: 'প্রেরিত কর্মী',
    },
    corridors: {
      heading: 'ত্রি-দেশীয় কমান্ড সেন্টার',
      bangladeshSub: 'সিলভার গ্রুপ — ঢাকা ও চট্টগ্রাম হাব',
      vietnamSub: 'কুইন আন ইয়ার্ন কোং লিমিটেড — হুং ইয়েন ও হ্যানয়',
      japanSub: 'হারা ইন্টারন্যাশনাল — টোকিও, ওসাকা ও নাগোয়া',
    },
    stages: {
      'Application Submitted': '১. আবেদন জমা',
      Screening: '২. প্রাথমিক বাছাই',
      'Online Interview': '৩. অনলাইন ইন্টারভিউ',
      'Medical Fit': '৪. মেডিকেল ফিট',
      'COE / Embassy Attestation': '৫. COE / দূতাবাস সত্যায়ন',
      'BMET Smart Card': '৬. BMET স্মার্ট কার্ড',
      Deployed: '৭. ডিপ্লয়েড',
    },
    trends: {
      heading: 'রিক্রুটমেন্ট ট্রেন্ডস ড্যাশবোর্ড',
      subheading: 'প্রার্থীদের ধাপভিত্তিক বণ্টন এবং মাসিক আবেদন প্রক্রিয়াকরণের হার',
      stageDistTitle: 'ধাপ অনুযায়ী প্রার্থী বণ্টন',
      stageDistSub: 'মেডিকেল, সত্যায়ন (COE) ও BMET স্মার্ট কার্ড ফোকাস',
      monthlyVolTitle: 'মাসিক প্রক্রিয়াকৃত চাকরির আবেদন',
      monthlyVolSub: 'জমাকৃত আবেদন বনাম সম্পন্ন ক্লিয়ারেন্স ট্রেন্ড',
      applicationsLabel: 'প্রাপ্ত আবেদন',
      clearedLabel: 'প্রক্রিয়াকৃত',
      medicalLabel: 'মেডিকেল ফিট',
      attestationLabel: 'সত্যায়ন / COE',
      smartCardLabel: 'স্মার্ট কার্ড',
    },
    partnerSettings: {
      title: 'ভিয়েতনাম ফ্যাক্টরি পার্টনার নাম সেটিংস',
      subtitle: 'পাবলিক হেডার অ্যালায়েন্স বার, পার্টনার কার্ড এবং ডিম্যান্ড শিটে প্রদর্শিত ভিয়েতনাম কোম্পানির নাম পরিবর্তন করুন',
      fieldLabel: 'ভিয়েতনাম পার্টনার কোম্পানির নাম',
      saveBtn: 'নাম সংরক্ষণ করুন',
      resetBtn: 'ডিফল্ট রিসেট',
      savedNotice: 'পার্টনার নাম আপডেট ও সিঙ্ক হয়েছে',
    },
    labels: {
      searchCandidates: 'নাম, ট্র্যাকিং আইডি, ফোন বা ট্রেড লিখুন...',
      allCountries: 'সকল দেশ',
      allStages: 'সকল ধাপ',
      candidateId: 'ট্র্যাকিং আইডি',
      fullName: 'প্রার্থীর নাম',
      origin: 'উৎস কেন্দ্র',
      sector: 'ট্রেড / সেক্টর',
      language: 'দক্ষতা / ভাষা',
      program: 'প্রোগ্রাম',
      stage: 'বর্তমান ধাপ',
      prefecture: 'গন্তব্য',
      employer: 'নিয়োগকর্তা',
      salary: 'মাসিক বেতন',
      quota: 'পূরণ / কোটা',
      deadline: 'শেষ সময়সীমা',
      complianceChecklist: 'ডকুমেন্টেশন ও ভিসা চেকলিস্ট',
      noResults: 'বর্তমান ফিল্টারে কোনো তথ্য পাওয়া যায়নি।',
      languageLabel: 'পোর্টালের ভাষা',
    },
  },
  ja: {
    allianceBrand: 'SILVER GROUP × HARA INTERNATIONAL × QUYNH AN YARN CO., LTD',
    portalTitle: '国際人材送り出しポータル',
    portalSubtitle: 'Silver Group × 原インターナショナル × Quynh An Yarn Co., Ltd',
    collaborationPartners: {
      bd: 'SILVER GROUP',
      jp: 'HARA INTERNATIONAL',
      vn: 'QUYNH AN YARN CO., LTD',
    },
    allianceSpotlight: {
      tapHint: 'ホバーまたはタップで詳細表示',
      hqLabel: '本部所在地',
      roleLabel: 'アライアンス役割',
      verifiedLabel: '認証ステータス',
      bd: {
        country: 'バングラデシュ',
        role: '採用募集・BMET申請デスク',
        shortSubtitle: '採用・BMET申請デスク',
        headquarters: 'ダッカ',
        credentialBadge: 'BMET 公認送出機関ハブ',
        highlights: [
          '候補者募集・身体適性審査・英語／日本語プレチェック',
          'BMETスマートカード発給・指紋登録・出国前講習を統括',
        ],
      },
      jp: {
        country: '日本',
        role: '二国間品質管理・監理統括',
        shortSubtitle: '二国間品質・監理統括',
        headquarters: '東京',
        credentialBadge: '公認監理団体・登録支援機関',
        highlights: [
          '国際雇用コンプライアンス監査・COE申請・企業マッチング',
          '3カ国共通の賃金透明性・労働安全基準を監督',
        ],
      },
      vn: {
        country: 'ベトナム',
        role: 'フンイエン紡績工場・受入拠点',
        shortSubtitle: 'フンイエン紡績工場',
        headquarters: 'フンイエン',
        credentialBadge: 'A Me村 Quynh An社 工場施設',
        highlights: [
          '近代的紡績ライン直接雇用・就労ビザ現地調整',
          '工場隣接寮・光熱費・交代食・送迎バス100%無料提供',
        ],
      },
    },
    topNav: {
      home: 'ホーム',
      demands: '求人案件',
      legal: '労働法・BMET',
      faq: 'よくある質問',
      privacy: '個人情報保護',
      contact: 'お問い合わせ',
    },
    mobileNav: {
      home: 'ホーム',
      demands: '求人',
      legal: '法規',
      contact: '連絡先',
    },
    modeSwitch: {
      toAdmin: '管理センター',
      toPublic: '公開ポータル',
      overlayOn: '背景グリッド表示中',
      overlayOff: '背景グリッド非表示',
      languageSelectLabel: '表示言語を切り替える',
    },
    heroSlides: [
      {
        kicker: 'ベトナム・フンイエン紡績工場 求人案件',
        headline: '最新紡績ラインの技能オペレーター直接募集',
        subline: '手取り月給 $500 USD · 24ヶ月契約 · 女性応募枠 10名募集中',
        highlightBadge: '$500 USD / MO NET · 10名募集',
      },
      {
        kicker: 'ニット・繊維製品 品質検査部門',
        headline: '寮費・光熱費・交代食・送迎バス 100%無料支給',
        subline: '衛生的な空調工場環境 · 未経験者からの応募歓迎',
        highlightBadge: '100% FREE HOUSING & MEALS',
      },
      {
        kicker: '3カ国公的連携・人材育成コリドー',
        headline: 'バングラデシュ × 日本 × ベトナム 公認採用ルート',
        subline: 'BMETスマートカード・大使館認証・銀行直接送金を完全保証',
        highlightBadge: 'BD × JP × VN VERIFIED CORRIDOR',
      },
    ],
    hero: {
      quotaPill: '10名募集中 • 開始予定: 2027年1月5日',
      mainRecruiterLabel: '受入直接採用企業 · 本社工場',
      mainRecruiterLocation: 'ベトナム・フンイエン省 Quynh An 地区 A Me 村',
      headline: 'ベトナム・日本への公的・直接雇用ポータル',
      subline: 'バングラデシュ (BMET) · ベトナム拠点 · 日本監理団体 連携採用',
      applyNow: '今すぐ応募する',
      whatsappDirect: 'WHATSAPP 直接相談',
      checkEligibility: '応募資格を確認',
      trackStatus: '選考状況を確認',
      prevSlide: '前のスライド',
      nextSlide: '次のスライド',
    },
    hoverCards: {
      applyNow: {
        badge: 'オンライン応募',
        title: '4ステップ即時応募ウィザード',
        bullets: [
          '基本情報・身体基準・英語確認・書類提出の4段階フォーム',
          '身長160cm・体重55kg・BMIをリアルタイムで自動判定',
          '送信と同時に追跡ID (HH-2026-XXXX) とQRパスを発行',
          'オンライン応募手数料は完全無料 (Zero Application Fee)',
        ],
      },
      whatsapp: {
        badge: 'ダッカ窓口直通',
        title: 'Silver Group WhatsApp 相談デスク',
        bullets: [
          'ダッカ採用担当コーディネーターへ直接チャット接続',
          'パスポート・NID・健康診断書類の事前確認サポート',
          '対応時間: 毎日 09:00–21:00 (バングラデシュ時間)',
        ],
      },
      checkEligibility: {
        badge: '自動資格チェック',
        title: '採用基準・身体条件の即時確認',
        bullets: [
          '年齢 (20–45歳)・身長 (160cm以上)・体重 (55kg以上) を即判定',
          'BMI数値およびフィート換算を自動表示',
          '感染症・心疾患などの健康申告プレチェック',
        ],
      },
      trackStatus: {
        badge: '7段階ライブ追跡',
        title: '選考・査証・渡航の進捗を確認',
        bullets: [
          '追跡IDまたは登録電話番号でリアルタイム検索',
          '応募受付→面接→健康診断→COE→BMET→配属の7段階表示',
          '各パートナー拠点の更新履歴を即時反映',
        ],
      },
      commandCenter: {
        badge: '管理コンソール',
        title: '3カ国連携コマンドセンター',
        bullets: [
          '全候補者データ・採用枠ロック・選考ステージの一元管理',
          'COE・大使館公証・BMETカード発行チェックリスト管理',
          'Silver Group / 原インターナショナル / ベトナム拠点同期',
        ],
      },
      languageSwitcher: {
        badge: '4言語切替',
        title: 'ポータル表示言語を選択',
        bullets: [
          'বাংলা (デフォルト)・日本語・English・Tiếng Việt',
          '応募フォーム・労働法規定・進捗トラッカーを即時翻訳',
          '選択した言語設定はブラウザに保存されます',
        ],
      },
      overlayToggle: {
        badge: '背景グリッド',
        title: 'ダッカ–東京–フンイエン接続グリッド',
        bullets: [
          '背景のサイバー接続グリッドの表示・非表示を切り替え',
          '閲覧環境に合わせてクリーン表示にも変更可能',
        ],
      },
      legalButton: {
        badge: '法的保護規定',
        title: 'ベトナム労働法・BMET安全基準',
        bullets: [
          '平日150%・週末200%・祝日300%の法定残業割増率を明記',
          '深夜勤務手当 (+30%) および多言語契約書署名',
          'BMETスマートカード・大使館認証手続きの確認',
        ],
      },
      navHome: {
        badge: 'トップページ',
        title: '公開ポータルホームへ移動',
        bullets: [
          '工場フォトスライダーおよび最新求人案内を表示',
          'オンライン応募と進捗トラッカーへ素早くアクセス',
        ],
      },
      navDemands: {
        badge: '最新求人マトリクス',
        title: 'ベトナム・日本募集要項一覧',
        bullets: [
          'ベトナム・フンイエン紡績工場 ($500/月・10名募集)',
          '給与・契約期間・無料寮・シフト勤務条件の詳細',
        ],
      },
      navLegal: {
        badge: 'コンプライアンス',
        title: '労働法・残業割増・BMET規定',
        bullets: [
          'ベトナム労働法に基づく法定割増賃金レート一覧',
          'バングラデシュBMETおよび大使館認証の必須手順',
        ],
      },
      navFaq: {
        badge: '応募者ガイド',
        title: 'よくある質問と回答 (FAQ)',
        bullets: [
          '応募費用無料・給与銀行振込・無料寮食の詳細',
          '面接から渡航・BMET発給までの流れを確認',
        ],
      },
      navPrivacy: {
        badge: 'データ保護方針',
        title: '個人情報・書類セキュリティポリシー',
        bullets: [
          'パスポート・NID・健康診断書を暗号化して厳重管理',
          '公的就労・査証手続き以外の目的には一切使用しません',
        ],
      },
      navContact: {
        badge: '拠点連絡先',
        title: 'ダッカ・東京・フンイエン連絡窓口',
        bullets: [
          'Silver Group・原インターナショナル・Quynh An Yarn Co., Ltd',
          '各拠点の住所・電話番号・メールアドレス・営業時間',
        ],
      },
    },
    infoModals: {
      faq: {
        title: 'よくある質問 (FAQ)',
        subtitle: 'ベトナム・日本直接採用プログラムに関する主なご質問',
        items: [
          {
            q: 'オンライン応募に手数料はかかりますか？',
            a: 'いいえ。本ポータルでの応募登録および資格チェックは完全無料です。BMET登録や健康診断などの公的手続きについても透明性を確保しています。',
          },
          {
            q: '月給$500 USDは手取り額ですか？',
            a: 'はい、基本手取り月給$500 USDが銀行口座へ直接振り込まれます。残業時はベトナム労働法に基づき150%〜300%の割増賃金が加算されます。',
          },
          {
            q: '寮費・光熱費・食事代は自己負担ですか？',
            a: 'いいえ、工場寮・水道光熱費・シフトごとの食事・通勤送迎バスはすべて100%無料で提供されます。',
          },
          {
            q: '勤務シフトと夜勤手当について教えてください。',
            a: '12時間交替勤務（06:00–18:00 / 18:00–06:00）で、3日ごとにシフトが交代します。22:00〜06:00の深夜帯には+30%の法定手当が付きます。',
          },
          {
            q: '工場勤務の経験がなくても応募できますか？',
            a: 'ベトナム紡績工場案件は未経験でも応募可能です。基本的な英語での読み書き・会話ができればエントリーできます。',
          },
          {
            q: '航空券はいつ手配しますか？',
            a: '査証（ビザ）およびBMETスマートカードの承認完了後、渡航確定時に自己負担にて手配いただきます。事前購入は不要です。',
          },
        ],
      },
      privacy: {
        title: '個人情報保護および書類管理ポリシー',
        subtitle: '応募者のパスポート・NID・医療データの厳格な暗号化管理',
        summary:
          '提出されたパスポート、国民ID（NID）、証明写真および健康診断記録は暗号化して保管され、認証済みの海外就労・査証手続きのみに使用されます。',
        sections: [
          {
            heading: '1. 収集データの利用目的',
            body: '氏名、連絡先、身体データ、添付書類は、Silver Group、Quynh An Yarn Co., Ltd、原インターナショナルによる適性審査・大使館公証・BMET手続きのみに利用されます。',
          },
          {
            heading: '2. 第三者提供の禁止',
            body: '無認可の仲介業者やマーケティング業者へ応募者の個人情報を販売・提供することは一切ありません。',
          },
          {
            heading: '3. 暗号化とオフライン保全',
            body: '通信状況が不安定な場合でもブラウザ内のローカル保護領域に一時保存され、安全な通信経路でサーバーと同期されます。',
          },
          {
            heading: '4. 開示・訂正・削除請求',
            body: '応募者はいつでも各拠点窓口へ連絡し、登録データの修正または削除を要請できます。',
          },
        ],
      },
      contact: {
        title: 'お問い合わせ・3カ国パートナー窓口',
        subtitle: 'バングラデシュ・ベトナム・日本の公式調整デスク',
        desks: [
          {
            country: 'バングラデシュ · ダッカ',
            org: 'Silver Group — BMET Licensed Sending Hub',
            address: 'Dhaka Recruitment Complex, Dhaka, Bangladesh',
            phone: '+880 1700-000000',
            email: 'bd-desk@hr.handsandhead.com',
            hours: 'Sun – Thu · 09:00 – 21:00 BST',
          },
          {
            country: 'ベトナム · フンイエン',
            org: 'Quynh An Yarn Co., Ltd — Hung Yen Yarn Plant',
            address: 'A Me Village, Quynh An Commune, Hung Yen Province, Vietnam',
            phone: '+84 24-3900-0000',
            email: 'vn-desk@hr.handsandhead.com',
            hours: 'Mon – Sat · 08:30 – 17:30 ICT',
          },
          {
            country: '日本 · 東京・大阪',
            org: 'Hara International — Supervising & RSK Organization',
            address: 'Chiyoda-ku, Tokyo 101-0047, Japan',
            phone: '+81 3-5000-0000',
            email: 'jp-desk@hr.handsandhead.com',
            hours: 'Mon – Fri · 09:00 – 18:00 JST',
          },
        ],
      },
    },
    footer: {
      brandTitle: '国際人材送り出しポータル',
      allianceHeading: '3カ国公式アライアンス連携ネットワーク (稼働中)',
      ethicalNotice:
        '不正仲介ゼロの倫理的採用およびBMETスマートカード完全準拠ルート。非公式な仲介者への金銭支払いは絶対に行わないでください。',
      quickLinksHeading: 'クイックリンク',
      privacyHeading: '個人情報・書類セキュリティ',
      privacySummary:
        'パスポート・NID・健康診断記録は暗号化され、認定された海外雇用・査証・BMET申請処理にのみ使用されます。',
      copyright: '© 2026 HUMAN RESOURCE EXPORT · Silver Group × Hara International × Quynh An Yarn Co., Ltd',
      techProviderLabel: 'Technology Provider:',
      techProviderName: 'HANDS & HEAD',
      techProviderCard: {
        badge: 'TECHNOLOGY PROVIDER · CORE PLATFORM ENGINE',
        title: 'HANDS & HEAD',
        subtitle: '3カ国間・国際人材送り出し＆リアルタイム選考管理プラットフォーム提供企業',
        websiteUrl: 'https://handsandhead.com',
        features: [
          'オフライン耐性 IndexedDB × リアルタイム・サーバー自動同期基盤',
          '4ステップ適性診断応募ウィザード＆7段階ライブ選考トラッカー',
          'BMETスマートカード・COE公証・採用枠自動ロック管理システム',
        ],
      },
    },
    matrix: {
      sectionLabel: 'ベトナム紡績工場 求人案件 • HUNG YEN',
      sectionTitle: '募集要項・待遇マトリクス',
      legalButton: '労働法・残業割増規定を見る',
      cards: [
        {
          value: '$500 USD / MONTH',
          label: '手取り月給',
          sub: '銀行振込・不正控除なし',
          accent: 'orange',
          hoverBullets: [
            '毎月 $500 USD を本人の銀行口座へ直接送金',
            'ベトナム労働法に基づく150%〜300%の残業手当を別途支給',
            '不透明な天引きや不正控除は一切なし',
          ],
        },
        {
          value: '24 MONTHS',
          label: '雇用契約期間',
          sub: '試用期間1ヶ月含む',
          accent: 'default',
          hoverBullets: [
            '24ヶ月（2年間）の正式な就労許可雇用契約',
            '初月1ヶ月間の現場研修・試用期間を含む',
            '双方合意に基づく契約更新制度あり',
          ],
        },
        {
          value: 'FEMALE • 20–45 YRS',
          label: '性別・年齢制限',
          sub: '有効パスポート必須',
          accent: 'crimson',
          hoverBullets: [
            'フンイエン紡績ライン案件は女性応募者限定',
            '応募時年齢 20歳〜45歳',
            '残存期間18ヶ月以上の有効パスポート推奨',
          ],
        },
        {
          value: 'MIN 160 CM / 55 KG',
          label: '身体基準',
          sub: '身長・体重・健康診断',
          accent: 'default',
          hoverBullets: [
            '最低身長 160cm 以上',
            '最低体重 55kg 以上・健康状態良好',
            'ウィザード上でBMIと身体基準を即時自動判定',
          ],
        },
        {
          value: '100% FREE',
          label: '寮・光熱費・食事・送迎',
          sub: '工場負担 100%無料',
          accent: 'emerald',
          hoverBullets: [
            '清潔な工場隣接ドミトリー寮を無償提供',
            '電気・水道・シフト勤務中の食事を全額支給',
            '寮〜工場間の専用送迎バス 100%無料',
          ],
        },
        {
          value: 'ENGLISH SPEAK & WRITE',
          label: '英語での読み書き会話',
          sub: '未経験者応募可',
          accent: 'gold',
          hoverBullets: [
            '基本的な英語での作業報告・日常会話ができる方',
            '工場安全マニュアルの英語表記を理解できる方',
            '繊維工場での実務経験は不問',
          ],
        },
        {
          value: '12-HR ROTATING',
          label: '交替勤務 (06–18 / 18–06)',
          sub: '3日ごとにシフト交代',
          accent: 'default',
          hoverBullets: [
            'シフト1：06:00〜18:00 / シフト2：18:00〜06:00',
            '3日ごとに昼夜シフトがローテーション',
            '深夜時間帯（22:00–06:00）は+30%割増手当',
          ],
        },
        {
          value: 'AIR TICKET: SELF',
          label: 'オンラインビデオ面接',
          sub: '査証取得後に渡航手配',
          accent: 'default',
          hoverBullets: [
            'ダッカ・ベトナム連携オンラインビデオ面接を実施',
            '査証・BMET発給完了後に航空券を自己手配',
            '7段階トラッカーで全工程をリアルタイム確認',
          ],
        },
      ],
    },
    legalModal: {
      title: 'ベトナム労働法およびBMET保護基準',
      overtimeTitle: 'ベトナム労働法 割増賃金規定',
      overtimeItems: [
        { rate: '150%', desc: '平日残業割増' },
        { rate: '200%', desc: '週末休日労働' },
        { rate: '300%', desc: '祝祭日労働' },
        { rate: '+30%', desc: '深夜勤務手当 (22:00–06:00)' },
      ],
      bmetTitle: 'BMET・大使館認証チェックリスト',
      bmetItems: [
        'ベトナム大使館・外務省による求人票公証',
        '雇用契約書の多言語確認と本人署名',
        'BMETスマートカード発行・指紋登録・出国前講習',
        '指定医療機関での健康診断合格（感染症・心疾患等なし）',
      ],
      liveSearchHeading: '公式Webライブ検索 (Google Search)',
      liveSearchSubheading: '最新のBMET認証規定・ベトナム労働法情報を公的Webソースから検索',
      liveBtnBmet: 'BMET認証ガイドライン',
      liveBtnVietnam: 'ベトナム労働法最新規定',
      liveSearchPlaceholder: '法規や手続きに関する質問を入力...',
      liveSearchBtn: '検索実行',
      liveSearching: '公式Webソースを検索中...',
      liveSourcesLabel: '参照元Webソース',
      liveSearchedAtLabel: '取得日時',
      liveDisclaimer: 'Google Searchグラウンディング経由のリアルタイム公式要約です。',
      close: '閉じる',
    },
    wizard: {
      title: '4ステップ即時応募ウィザード',
      stepLabels: ['1. 基本情報', '2. 身体基準判定', '3. 英語確認', '4. 書類提出'],
      fullName: '氏名（パスポート表記）',
      phone: '携帯 / WhatsApp番号',
      district: '出身地区',
      passportNumber: 'パスポート番号',
      referralCode: '担当者コード（任意）',
      gender: '性別',
      female: '女性 (Female)',
      male: '男性 (Male)',
      age: '年齢',
      heightCm: '身長 (cm)',
      weightKg: '体重 (kg)',
      bmiLabel: '算出 BMI',
      ftInLabel: 'フィート換算',
      medicalHeader: '健康状態確認',
      medNoInfectious: '感染症・伝染性疾患はありません',
      medNoHeartNeuro: '心疾患・神経系疾患はありません',
      medNoHeightFear: '高所恐怖・交替勤務に支障はありません',
      eligibleBadge: '100% ELIGIBLE • 基準適合',
      mismatchBadge: 'CRITERIA MISMATCH • 条件不一致',
      mismatchReasonAge: '年齢は20歳〜45歳である必要があります',
      mismatchReasonHeight: '身長は160cm以上が必要です',
      mismatchReasonWeight: '体重は55kg以上が必要です',
      mismatchReasonGender: '本ベトナム紡績案件は女性限定求人です',
      mismatchReasonMedical: '全ての健康確認項目にチェックが必要です',
      englishHeader: '3タップ英語適性チェック',
      engSpeak: '基本的な英語で会話ができる',
      engWrite: '英語で作業記録を記入できる',
      engSafety: '英語の安全指示を理解できる',
      selfIntroLabel: '英語での自己PR（1〜2文）',
      selfIntroPlaceholder: 'I am ready to work 12-hour rotating shifts in Vietnam...',
      docsHeader: '必要書類アップロード',
      docPassport: 'パスポート写し',
      docNid: '国民IDカード (NID)',
      docPhoto: '証明写真',
      docCert: '学歴・資格証明書',
      attachSample: 'サンプル添付',
      nextStep: '次へ進む',
      prevStep: '戻る',
      submitApp: '応募を送信する',
      passTitle: 'デジタル応募パス発行完了',
      passTrackingId: '追跡ID',
      passNote: 'コマンドセンターの候補者一覧へ即時同期されました。',
      sendWhatsappReceipt: 'WhatsAppで控えを送信',
      trackThisId: 'ライブ追跡を開く',
    },
    tracker: {
      sectionLabel: 'リアルタイム7段階パイプライン追跡',
      title: '応募進捗を確認する',
      placeholder: '追跡ID (HH-2026-4102) または電話番号を入力...',
      searchBtn: '進捗を検索',
      quickSamples: 'サンプルID:',
      notFound: '該当する応募記録が見つかりません。IDまたは番号をご確認ください。',
      candidateLabel: '応募者名',
      corridorLabel: '配属先',
      statusLabel: '現在の段階',
    },
    nav: {
      overview: '概要',
      candidates: '候補者管理',
      jobs: '求人票',
      compliance: 'COE・査証',
      partners: '提携拠点',
    },
    actions: {
      registerCandidate: '候補者を登録',
      createRequisition: '新規求人票',
      exportCsv: 'CSV出力',
      advanceStage: '次の段階へ',
      sendWhatsappStatus: 'WhatsAppで進捗通知',
      close: '閉じる',
      save: '保存する',
      cancel: 'キャンセル',
      resetFilters: '条件をリセット',
    },
    metrics: {
      activeCandidates: '登録候補者数',
      openQuotas: '募集残枠',
      coeProcessing: 'COE・査証申請中',
      deployedTotal: '配属完了人数',
    },
    corridors: {
      heading: '3カ国連携コマンドセンター',
      bangladeshSub: 'Silver Group — ダッカ・チッタゴン拠点',
      vietnamSub: 'Quynh An Yarn Co., Ltd — フンイエン・ハノイ拠点',
      japanSub: '原インターナショナル — 東京・大阪・名古屋',
    },
    stages: {
      'Application Submitted': '1. 応募受付',
      Screening: '2. 書類選考',
      'Online Interview': '3. オンライン面接',
      'Medical Fit': '4. 健康診断適合',
      'COE / Embassy Attestation': '5. COE・大使館認証',
      'BMET Smart Card': '6. BMETカード発給',
      Deployed: '7. 渡航・配属完了',
    },
    trends: {
      heading: '採用トレンドダッシュボード',
      subheading: '選考段階別（健康診断・認証・BMETカード）の分布と月次応募処理件数',
      stageDistTitle: 'ステージ別候補者分布',
      stageDistSub: '健康診断・大使館/COE認証・スマートカード状況',
      monthlyVolTitle: '月別処理済み応募数推移',
      monthlyVolSub: '新規受付と審査完了数の比較トレンド',
      applicationsLabel: '受付件数',
      clearedLabel: '処理完了',
      medicalLabel: '健康診断適合',
      attestationLabel: 'COE・認証中',
      smartCardLabel: 'BMETカード',
    },
    partnerSettings: {
      title: 'ベトナム提携企業名設定',
      subtitle: 'ヘッダー連携バー・拠点カード・求人票に表示されるベトナム工場パートナー名を編集します',
      fieldLabel: 'ベトナム工場パートナー名',
      saveBtn: '名称を保存',
      resetBtn: '初期値に戻す',
      savedNotice: 'パートナー名を更新・同期しました',
    },
    labels: {
      searchCandidates: '氏名、追跡ID、電話番号、職種で検索...',
      allCountries: '全ての国',
      allStages: '全ての段階',
      candidateId: '追跡ID',
      fullName: '候補者名',
      origin: '送出拠点',
      sector: '職種分野',
      language: '語学・資格',
      program: '制度区分',
      stage: '進捗状況',
      prefecture: '配属先',
      employer: '受入企業',
      salary: '基本給',
      quota: '採用 / 定員',
      deadline: '締切日',
      complianceChecklist: '渡航・在留資格チェックリスト',
      noResults: '該当するデータが見つかりません。',
      languageLabel: '表示言語',
    },
  },
  en: {
    allianceBrand: 'SILVER GROUP × HARA INTERNATIONAL × QUYNH AN YARN CO., LTD',
    portalTitle: 'HUMAN RESOURCE EXPORT',
    portalSubtitle: 'Silver Group × Hara International × Quynh An Yarn Co., Ltd',
    collaborationPartners: {
      bd: 'SILVER GROUP',
      jp: 'HARA INTERNATIONAL',
      vn: 'QUYNH AN YARN CO., LTD',
    },
    allianceSpotlight: {
      tapHint: 'Hover or tap partner to inspect credentials',
      hqLabel: 'Headquarters',
      roleLabel: 'Alliance Role',
      verifiedLabel: 'Verified Credential',
      bd: {
        country: 'Bangladesh',
        role: 'Recruitment & BMET Desk',
        shortSubtitle: 'Recruitment & BMET Desk',
        headquarters: 'Dhaka',
        credentialBadge: 'BMET Licensed Sending Hub',
        highlights: [
          'Candidate sourcing, physical & medical verification in Dhaka',
          'BMET Smart Card biometrics, attestation & departure briefing',
        ],
      },
      jp: {
        country: 'Japan',
        role: 'Bilateral Quality & Management',
        shortSubtitle: 'Bilateral Quality & Management',
        headquarters: 'Tokyo',
        credentialBadge: 'Supervising & RSK Accredited',
        highlights: [
          'Tri-national compliance auditing, COE filing & employer governance',
          'Enforces wage transparency & international workplace safety',
        ],
      },
      vn: {
        country: 'Vietnam',
        role: 'Hung Yen Yarn Facility',
        shortSubtitle: 'Hung Yen Yarn Facility',
        headquarters: 'Hung Yen',
        credentialBadge: 'A Me Village · Quynh An Commune Plant',
        highlights: [
          'Direct industrial yarn spinning employer with 24-month work permits',
          '100% free dormitory, shift meals, utilities & shuttle bus transport',
        ],
      },
    },
    topNav: {
      home: 'Home',
      demands: 'Job Demands',
      legal: 'BMET & Legal',
      faq: 'FAQ',
      privacy: 'Privacy Policy',
      contact: 'Contact',
    },
    mobileNav: {
      home: 'Home',
      demands: 'Demands',
      legal: 'Legal',
      contact: 'Contact',
    },
    modeSwitch: {
      toAdmin: 'COMMAND CENTER',
      toPublic: 'PUBLIC PORTAL',
      overlayOn: 'Cyber-Grid Overlay ON',
      overlayOff: 'Cyber-Grid Overlay OFF',
      languageSelectLabel: 'Switch portal language',
    },
    heroSlides: [
      {
        kicker: 'VIETNAM HUNG YEN YARN MANUFACTURING DEMAND',
        headline: 'SKILLED YARN & TEXTILE SPINNING LINE OPERATORS',
        subline: '$500 USD / Month Net Salary · 24-Month Direct Contract · 10 Female Vacancies Open',
        highlightBadge: '$500 USD / MO NET · 10 VACANCIES',
      },
      {
        kicker: 'KNITWEAR & FABRIC QUALITY INSPECTION DIVISION',
        headline: '100% FREE ACCOMMODATION, SHIFT MEALS, UTILITIES & TRANSPORT',
        subline: 'Modern Climate-Controlled Textile Facility · No Prior Factory Experience Needed',
        highlightBadge: '100% FREE HOUSING & MEALS',
      },
      {
        kicker: 'TRI-NATIONAL VOCATIONAL DEPLOYMENT CORRIDOR',
        headline: 'SILVER GROUP × HARA INTERNATIONAL × QUYNH AN YARN CO., LTD',
        subline: 'BMET Smart Card Cleared · Embassy Attested Demand · Direct Bank Payout',
        highlightBadge: 'TRI-NATIONAL VERIFIED CORRIDOR',
      },
    ],
    hero: {
      quotaPill: '10 VACANCIES OPEN • START DATE: 05 JAN 2027',
      mainRecruiterLabel: 'MAIN RECRUITER · DIRECT EMPLOYER',
      mainRecruiterLocation: 'A Me Village, Quynh An Commune, Hung Yen, Vietnam',
      headline: 'DIRECT & LEGAL EMPLOYMENT IN VIETNAM & JAPAN',
      subline: 'Bangladesh (BMET) · Vietnam Hub · Japan Supervising Direct Corridor',
      applyNow: 'APPLY NOW',
      whatsappDirect: 'WHATSAPP DIRECT',
      checkEligibility: 'CHECK ELIGIBILITY',
      trackStatus: 'TRACK STATUS',
      prevSlide: 'Previous slide',
      nextSlide: 'Next slide',
    },
    hoverCards: {
      applyNow: {
        badge: 'DIGITAL APPLICATION',
        title: '4-Step Real-Time Application Wizard',
        bullets: [
          '4-Step Digital Form (Identity, Physical Check, English, Docs)',
          'Automatic Height (160cm) / Weight (55kg) & Live BMI Verification',
          'Instant Tracking ID (HH-2026-XXXX) & Scannable QR Candidate Pass',
          'Zero Online Application Fee · Direct Command Center Sync',
        ],
      },
      whatsapp: {
        badge: 'DIRECT RECRUITMENT DESK',
        title: 'Dhaka Silver Group WhatsApp Desk',
        bullets: [
          'Direct Dhaka Recruitment Desk coordinator connection',
          'Instant Passport, NID & medical document verification support',
          'Service Hours: 09:00–21:00 BST (Bangladesh Standard Time)',
        ],
      },
      checkEligibility: {
        badge: 'AUTO-VALIDATOR',
        title: 'Instant Physical & Medical Eligibility Check',
        bullets: [
          'Checks Age (20–45 yrs), Height (160+ cm) & Weight (55+ kg)',
          'Live BMI & Feet/Inches unit conversion readout',
          'Pre-screens infectious, cardiac, and shift-readiness criteria',
        ],
      },
      trackStatus: {
        badge: '7-STAGE PIPELINE',
        title: 'Live Application & Visa Status Tracker',
        bullets: [
          'Search instantly by Tracking ID (HH-2026-XXXX) or phone number',
          'Follow all 7 stages from Submission to Medical, COE, BMET & Flight',
          'Synced directly with Silver Group and Vietnam coordination desks',
        ],
      },
      commandCenter: {
        badge: 'OPERATIONS WORKSPACE',
        title: 'Tri-National Command Center',
        bullets: [
          'Manage active candidate pipeline, atomic seat locks & job quotas',
          'Update COE, Embassy attestation & BMET Smart Card checklists',
          'Export CSV/JSON audit logs across BD, VN & JP desks',
        ],
      },
      languageSwitcher: {
        badge: '4-LANGUAGE ENGINE',
        title: 'Switch Portal Language',
        bullets: [
          'বাংলা (Default), 日本語, English, and Tiếng Việt',
          'Instant translation across wizard, labor laws & pipeline tracker',
          'Selected language persists locally in your browser',
        ],
      },
      overlayToggle: {
        badge: 'TELEMETRY GRID',
        title: 'Dhaka–Tokyo–Hung Yen Cyber-Grid Overlay',
        bullets: [
          'Toggle the animated tri-national corridor grid in the background',
          'Dim anytime for distraction-free form reading',
        ],
      },
      legalButton: {
        badge: 'LABOR CODE & BMET',
        title: 'Vietnam Labor Law & BMET Protection',
        bullets: [
          '150% weekday, 200% weekend, and 300% holiday overtime rates',
          '+30% mandatory night-shift allowance (22:00–06:00)',
          'Embassy-attested Demand Letter & BMET Smart Card verification',
        ],
      },
      navHome: {
        badge: 'MAIN PORTAL',
        title: 'Return to Portal Home',
        bullets: [
          'View the textile hero slider and active deployment quotas',
          'Quick jump to online application, WhatsApp & live tracker',
        ],
      },
      navDemands: {
        badge: 'OPEN QUOTAS',
        title: 'Active Vietnam & Japan Job Demands',
        bullets: [
          'Vietnam Hung Yen Yarn Plant ($500/mo Net, 10 Female Vacancies)',
          'Full breakdown of salary, housing, shifts & physical rules',
        ],
      },
      navLegal: {
        badge: 'COMPLIANCE',
        title: 'BMET & Vietnam Labor Protection',
        bullets: [
          'Statutory Vietnam Labor Code overtime & night differential rates',
          'Bangladesh BMET Smart Card & Embassy attestation checklist',
        ],
      },
      navFaq: {
        badge: 'APPLICANT HELP',
        title: 'Frequently Asked Questions',
        bullets: [
          'Zero application fee, bank salary payout & free dormitories',
          'Interview, medical, BMET Smart Card & air ticket timeline',
        ],
      },
      navPrivacy: {
        badge: 'DATA PROTECTION',
        title: 'Privacy & Document Security Policy',
        bullets: [
          'Passport, NID & medical records are encrypted and protected',
          'Used strictly for verified overseas employment processing',
        ],
      },
      navContact: {
        badge: 'PARTNER DESKS',
        title: 'Dhaka, Tokyo & Hung Yen Coordination Desks',
        bullets: [
          'Silver Group, Hara International & Quynh An Yarn Co., Ltd',
          'Direct office addresses, WhatsApp, email & operating hours',
        ],
      },
    },
    infoModals: {
      faq: {
        title: 'FREQUENTLY ASKED QUESTIONS (FAQ)',
        subtitle: 'Essential answers for Vietnam & Japan direct recruitment applicants',
        items: [
          {
            q: 'Is there any fee to apply online through this portal?',
            a: 'No. Online registration, physical eligibility verification, and tracking ID issuance on this portal are 100% free. Approved government BMET, medical, and visa steps are communicated transparently only to selected candidates.',
          },
          {
            q: 'Is $500 USD / month net salary paid via bank transfer?',
            a: 'Yes. The $500 USD base net salary is transferred directly to the worker’s bank account with zero hidden deductions. Overtime is paid additionally under Vietnam Labor Code rates (150%–300%).',
          },
          {
            q: 'Are dormitory housing, utilities, meals, and transport included?',
            a: 'Yes. 100% free factory dormitory accommodation, electricity, water, shift meals, and daily factory shuttle transport are provided by the employer.',
          },
          {
            q: 'How do the 12-hour rotating shifts work?',
            a: 'Shift 1 runs 06:00–18:00 and Shift 2 runs 18:00–06:00, rotating every 3 days. Night hours (22:00–06:00) carry an extra +30% statutory night differential.',
          },
          {
            q: 'Is prior textile or factory experience required?',
            a: 'No prior factory experience is required for the Vietnam Yarn Plant demand. Basic ability to speak and write English is sufficient. Japan SSW/TITP roles require JLPT N4 or JFT-Basic A2.',
          },
          {
            q: 'When is the air ticket arranged?',
            a: 'Workers purchase their own air ticket only after formal visa stamping and Bangladesh BMET Smart Card clearance are completed.',
          },
        ],
      },
      privacy: {
        title: 'PRIVACY & DOCUMENT SECURITY POLICY',
        subtitle: 'Strict encryption and protection for candidate identity & medical files',
        summary:
          'Passport scans, National ID (NID), portraits, and medical fitness records are encrypted and used strictly for verified overseas employment processing.',
        sections: [
          {
            heading: '1. Purpose-Limited Processing',
            body: 'Personal details, physical metrics, and identity files are processed exclusively by Silver Group, Quynh An Yarn Co., Ltd, and Hara International for candidate screening, embassy attestation, and BMET clearance.',
          },
          {
            heading: '2. Zero Unauthorized Sharing',
            body: 'Candidate documents and phone numbers are never sold, rented, or disclosed to unauthorized brokers or third-party marketers.',
          },
          {
            heading: '3. Encrypted Vault & Offline Resilience',
            body: 'Submissions are buffered in an encrypted browser vault during offline intervals and synchronized over secure transport to the operations server.',
          },
          {
            heading: '4. Candidate Access & Deletion',
            body: 'Applicants may request updates or deletion of their records at any time by contacting our Dhaka, Hanoi, or Tokyo coordination desks.',
          },
        ],
      },
      contact: {
        title: 'OFFICIAL CONTACT & PARTNER DESKS',
        subtitle: 'Tri-national coordination offices across Bangladesh, Vietnam & Japan',
        desks: [
          {
            country: 'Bangladesh · Dhaka Hub',
            org: 'Silver Group — BMET Licensed Sending Hub',
            address: 'Gulshan–Banani / Uttara Recruitment Complex, Dhaka, Bangladesh',
            phone: '+880 1700-000000 (WhatsApp / Voice)',
            email: 'bd-desk@hr.handsandhead.com',
            hours: 'Sun – Thu · 09:00 – 21:00 BST',
          },
          {
            country: 'Vietnam · Hung Yen & Hanoi',
            org: 'Quynh An Yarn Co., Ltd — Plant Coordination',
            address: 'A Me Village, Quynh An Commune, Hung Yen Province, Vietnam',
            phone: '+84 24-3900-0000',
            email: 'vn-desk@hr.handsandhead.com',
            hours: 'Mon – Sat · 08:30 – 17:30 ICT',
          },
          {
            country: 'Japan · Tokyo & Osaka',
            org: 'Hara International — Supervising & RSK Organization',
            address: 'Chiyoda-ku, Tokyo 101-0047, Japan',
            phone: '+81 3-5000-0000',
            email: 'jp-desk@hr.handsandhead.com',
            hours: 'Mon – Fri · 09:00 – 18:00 JST',
          },
        ],
      },
    },
    footer: {
      brandTitle: 'HUMAN RESOURCE EXPORT',
      allianceHeading: 'TRI-NATIONAL STRATEGIC ALLIANCE (ACTIVE CORRIDOR)',
      ethicalNotice:
        'Zero-fraud ethical recruitment and full BMET Smart Card compliance. Never make payments to unauthorized middlemen outside verified partner desks.',
      quickLinksHeading: 'Quick Links',
      privacyHeading: 'Privacy & Data Security',
      privacySummary:
        'Passport, NID, and medical records are encrypted and used strictly for verified overseas employment, embassy attestation, and BMET processing.',
      copyright: '© 2026 HUMAN RESOURCE EXPORT · Silver Group × Hara International × Quynh An Yarn Co., Ltd',
      techProviderLabel: 'Technology Provider:',
      techProviderName: 'HANDS & HEAD',
      techProviderCard: {
        badge: 'TECHNOLOGY PROVIDER · PLATFORM ARCHITECTURE',
        title: 'HANDS & HEAD',
        subtitle: 'Enterprise Cross-Border Workforce Deployment & Real-Time Sync Engineering',
        websiteUrl: 'https://handsandhead.com',
        features: [
          'Offline-resilient IndexedDB vault paired with live multi-hub sync',
          '4-step automated eligibility wizard & 7-stage BMET pipeline tracker',
          'Embassy attestation audit trail & atomic deployment quota locking',
        ],
      },
    },
    matrix: {
      sectionLabel: 'ACTIVE DEMAND: VIETNAM YARN FACTORY • HUNG YEN',
      sectionTitle: 'RULES & BENEFITS MATRIX',
      legalButton: 'LEGAL & OVERTIME PROTECTION',
      cards: [
        {
          value: '$500 USD / MONTH',
          label: 'Net Salary',
          sub: 'Direct bank payout · Zero hidden cuts',
          accent: 'orange',
          hoverBullets: [
            '$500 USD net base transferred monthly via direct bank deposit',
            '150%–300% Vietnam Labor Code overtime calculated separately',
            'Zero hidden deductions from factory wages',
          ],
        },
        {
          value: '24 MONTHS',
          label: 'Contract Term',
          sub: '1-Month Probation Included',
          accent: 'default',
          hoverBullets: [
            '2-year (24-month) formal industrial work permit contract',
            'Includes 1-month paid onboarding and probation period',
            'Renewable upon mutual employer & employee agreement',
          ],
        },
        {
          value: 'FEMALE • 20–45 YRS',
          label: 'Gender & Age Limit',
          sub: 'Valid Passport Required',
          accent: 'crimson',
          hoverBullets: [
            'Hung Yen yarn spinning line batch accepts Female applicants',
            'Age verified between 20 and 45 years old',
            'Valid machine-readable passport required for filing',
          ],
        },
        {
          value: 'MIN 160 CM / 55 KG',
          label: 'Physical Standard',
          sub: 'Live BMI & Height Verification',
          accent: 'default',
          hoverBullets: [
            'Minimum height 160 cm (~5 ft 3 in) for line ergonomics',
            'Minimum weight 55 kg with clear medical fitness',
            'Auto-verified in Step 2 of the Application Wizard',
          ],
        },
        {
          value: '100% FREE',
          label: 'Housing, Utilities, Meals & Transport',
          sub: 'Covered by Factory',
          accent: 'emerald',
          hoverBullets: [
            '100% free dormitory accommodation near the plant',
            'Free electricity, water, and daily shift meals',
            'Free shuttle bus transport between dorm and factory',
          ],
        },
        {
          value: 'ENGLISH SPEAK & WRITE',
          label: 'Speak & Write English',
          sub: 'No Prior Experience Needed',
          accent: 'gold',
          hoverBullets: [
            'Basic spoken English & written shift-log literacy',
            'Ability to follow English factory safety instructions',
            'No prior textile or spinning machine experience required',
          ],
        },
        {
          value: '12-HR ROTATING',
          label: 'Shift 1 (06–18) / Shift 2 (18–06)',
          sub: 'Rotates every 3 days',
          accent: 'default',
          hoverBullets: [
            'Shift 1: 06:00–18:00 · Shift 2: 18:00–06:00',
            'Shifts rotate cleanly every 3 calendar days',
            '+30% statutory night allowance for 22:00–06:00 hours',
          ],
        },
        {
          value: 'AIR TICKET: SELF',
          label: 'Online Video Interview',
          sub: 'Ticket after Visa & BMET Clear',
          accent: 'default',
          hoverBullets: [
            'Direct video interview coordinated by Silver Group & VN desk',
            'Self-arranged airfare only after Visa & BMET Smart Card issue',
            'Every milestone visible in the 7-stage Live Tracker',
          ],
        },
      ],
    },
    legalModal: {
      title: 'VIETNAM LABOR CODE & BMET PROTECTION',
      overtimeTitle: 'Vietnam Labor Code Overtime Rates',
      overtimeItems: [
        { rate: '150%', desc: 'Regular Weekday Overtime' },
        { rate: '200%', desc: 'Weekly Rest Day / Weekend' },
        { rate: '300%', desc: 'Public Holiday Work' },
        { rate: '+30%', desc: 'Night Shift Differential (22:00–06:00)' },
      ],
      bmetTitle: 'Bangladesh BMET & Embassy Attestation Checklist',
      bmetItems: [
        'Vietnam Embassy & Ministry of Foreign Affairs attested Demand Letter',
        'Verified bilingual employment contract signing before departure',
        'BMET Smart Card issuance, biometric clearance & briefing',
        'Designated medical fitness (zero infectious, cardiac, or neuro risk)',
      ],
      liveSearchHeading: 'LIVE WEB REGULATORY LOOKUP (GOOGLE SEARCH)',
      liveSearchSubheading: 'Query real-time official BMET attestation & Vietnam Labor Code updates',
      liveBtnBmet: 'BMET Attestation Rules',
      liveBtnVietnam: 'Vietnam Labor Code Updates',
      liveSearchPlaceholder: 'Ask about BMET Smart Card clearance, Vietnam overtime limits...',
      liveSearchBtn: 'SEARCH WEB',
      liveSearching: 'Querying live official web sources...',
      liveSourcesLabel: 'Official Web Grounding Sources',
      liveSearchedAtLabel: 'Retrieved',
      liveDisclaimer: 'Grounded in real-time Google Search results from web sources.',
      close: 'CLOSE',
    },
    wizard: {
      title: 'REAL-TIME 4-STEP APPLICATION WIZARD',
      stepLabels: ['01. IDENTITY', '02. PHYSICAL CHECK', '03. ENGLISH CHECK', '04. DOCS & SUBMIT'],
      fullName: 'Full Name (As per Passport)',
      phone: 'Mobile / WhatsApp Number',
      district: 'Home District',
      passportNumber: 'Passport Number',
      referralCode: 'Field Agent Referral Code (Optional)',
      gender: 'Gender',
      female: 'Female',
      male: 'Male',
      age: 'Age (Years)',
      heightCm: 'Height (CM)',
      weightKg: 'Weight (KG)',
      bmiLabel: 'LIVE BMI',
      ftInLabel: 'FT / IN',
      medicalHeader: 'Medical Fitness Declarations',
      medNoInfectious: 'No infectious or communicable diseases',
      medNoHeartNeuro: 'No cardiac or neurological conditions',
      medNoHeightFear: 'No acrophobia or shift-work restrictions',
      eligibleBadge: '100% ELIGIBLE',
      mismatchBadge: 'CRITERIA MISMATCH',
      mismatchReasonAge: 'Age must be between 20 and 45 years',
      mismatchReasonHeight: 'Minimum height of 160 cm is required',
      mismatchReasonWeight: 'Minimum weight of 55 kg is required',
      mismatchReasonGender: 'Vietnam Yarn Factory demand requires Female candidates',
      mismatchReasonMedical: 'All medical fitness declarations must be confirmed',
      englishHeader: '3-Tap English Readiness Check',
      engSpeak: 'I can speak basic workplace English',
      engWrite: 'I can read & write shift logs in English',
      engSafety: 'I understand factory safety instructions in English',
      selfIntroLabel: 'Short English Self-Introduction',
      selfIntroPlaceholder: 'I am ready to work 12-hour rotating shifts in Vietnam...',
      docsHeader: 'Document Upload Previews',
      docPassport: 'Passport Bio Page',
      docNid: 'National ID (NID)',
      docPhoto: 'Passport Photo',
      docCert: 'Education / Trade Certificate',
      attachSample: 'Attach Sample',
      nextStep: 'NEXT STEP',
      prevStep: 'BACK',
      submitApp: 'SUBMIT APPLICATION',
      passTitle: 'DIGITAL CANDIDATE PASS ISSUED',
      passTrackingId: 'TRACKING ID',
      passNote: 'Candidate has been synced directly into the Command Center.',
      sendWhatsappReceipt: 'SEND RECEIPT VIA WHATSAPP',
      trackThisId: 'VIEW IN LIVE TRACKER',
    },
    tracker: {
      sectionLabel: 'LIVE 7-STAGE PIPELINE TRACKER',
      title: 'TRACK APPLICATION STATUS',
      placeholder: 'Enter Tracking ID (HH-2026-4102) or Phone Number...',
      searchBtn: 'TRACK STATUS',
      quickSamples: 'QUICK LOOKUP:',
      notFound: 'No matching application found. Verify your Tracking ID or Phone Number.',
      candidateLabel: 'CANDIDATE',
      corridorLabel: 'DESTINATION / ORDER',
      statusLabel: 'CURRENT STAGE',
    },
    nav: {
      overview: 'Overview',
      candidates: 'Candidates',
      jobs: 'Job Orders',
      compliance: 'COE & Visas',
      partners: 'Partners',
    },
    actions: {
      registerCandidate: 'REGISTER CANDIDATE',
      createRequisition: 'NEW JOB ORDER',
      exportCsv: 'EXPORT CSV',
      advanceStage: 'ADVANCE STAGE',
      sendWhatsappStatus: 'SEND WHATSAPP UPDATE',
      close: 'CLOSE',
      save: 'SAVE RECORD',
      cancel: 'CANCEL',
      resetFilters: 'RESET FILTERS',
    },
    metrics: {
      activeCandidates: 'Active Candidates',
      openQuotas: 'Open Quotas',
      coeProcessing: 'COE & Visa Queue',
      deployedTotal: 'Deployed Workers',
    },
    corridors: {
      heading: 'TRI-NATIONAL COMMAND CENTER',
      bangladeshSub: 'Silver Group — Dhaka & Chattogram Hubs',
      vietnamSub: 'Quynh An Yarn Co., Ltd — Hung Yen & Hanoi Hubs',
      japanSub: 'Hara International — Tokyo, Osaka & Nagoya',
    },
    stages: {
      'Application Submitted': '1. Application Submitted',
      Screening: '2. Screening',
      'Online Interview': '3. Online Interview',
      'Medical Fit': '4. Medical Fit',
      'COE / Embassy Attestation': '5. COE / Embassy Attestation',
      'BMET Smart Card': '6. BMET Smart Card',
      Deployed: '7. Deployed',
    },
    trends: {
      heading: 'RECRUITMENT TRENDS',
      subheading: 'Candidate distribution across Medical, Attestation & Smart Card stages plus monthly application volume',
      stageDistTitle: 'Candidate Distribution by Stage',
      stageDistSub: 'Live focus on Medical Fit, COE Attestation & BMET Smart Card',
      monthlyVolTitle: 'Monthly Processed Applications',
      monthlyVolSub: 'Received vs. cleared dossier throughput across months',
      applicationsLabel: 'Applications',
      clearedLabel: 'Processed / Cleared',
      medicalLabel: 'Medical Fit',
      attestationLabel: 'Attestation / COE',
      smartCardLabel: 'Smart Card',
    },
    partnerSettings: {
      title: 'VIETNAM FACILITY PARTNER SETTINGS',
      subtitle: 'Customize the Vietnam partner company name displayed across the Alliance Bar, Partner Hubs, and Demand headers',
      fieldLabel: 'Vietnam Factory Partner Name',
      saveBtn: 'Save Partner Name',
      resetBtn: 'Reset Default',
      savedNotice: 'Partner name updated & synced across portal',
    },
    labels: {
      searchCandidates: 'Search by name, Tracking ID, phone, or sector...',
      allCountries: 'All Corridors',
      allStages: 'All Stages',
      candidateId: 'Tracking ID',
      fullName: 'Candidate',
      origin: 'Origin Hub',
      sector: 'Trade / Sector',
      language: 'Language / Cert',
      program: 'Program',
      stage: 'Stage',
      prefecture: 'Destination',
      employer: 'Employer',
      salary: 'Monthly Base',
      quota: 'Filled / Quota',
      deadline: 'Target Cutoff',
      complianceChecklist: 'Deployment Compliance Checklist',
      noResults: 'No records match the current filters.',
      languageLabel: 'Portal Language',
    },
  },
  vi: {
    allianceBrand: 'SILVER GROUP × HARA INTERNATIONAL × QUYNH AN YARN CO., LTD',
    portalTitle: 'XUẤT KHẨU NHÂN LỰC QUỐC TẾ',
    portalSubtitle: 'Silver Group × Hara International × Quynh An Yarn Co., Ltd',
    collaborationPartners: {
      bd: 'SILVER GROUP',
      jp: 'HARA INTERNATIONAL',
      vn: 'QUYNH AN YARN CO., LTD',
    },
    allianceSpotlight: {
      tapHint: 'Di chuột hoặc chạm để xem chi tiết đối tác',
      hqLabel: 'Trụ sở chính',
      roleLabel: 'Vai trò liên minh',
      verifiedLabel: 'Chứng nhận xác thực',
      bd: {
        country: 'Bangladesh',
        role: 'Tuyển dụng & Văn phòng BMET',
        shortSubtitle: 'Tuyển dụng & BMET Desk',
        headquarters: 'Dhaka',
        credentialBadge: 'Tổ chức phái cử được BMET cấp phép',
        highlights: [
          'Sàng lọc ứng viên, kiểm tra thể lực và ngoại ngữ tại Dhaka',
          'Cấp thẻ thông minh BMET, sinh trắc học và định hướng trước bay',
        ],
      },
      jp: {
        country: 'Nhật Bản',
        role: 'Quản lý chất lượng & Điều phối song phương',
        shortSubtitle: 'Quản lý chất lượng song phương',
        headquarters: 'Tokyo',
        credentialBadge: 'Nghiệp đoàn giám sát & RSK chuẩn Nhật',
        highlights: [
          'Kiểm soát chất lượng tuyển dụng, hồ sơ COE và an toàn lao động',
          'Giám sát minh bạch tiền lương giữa 3 quốc gia',
        ],
      },
      vn: {
        country: 'Việt Nam',
        role: 'Nhà máy Sợi Hưng Yên',
        shortSubtitle: 'Nhà máy Sợi Hưng Yên',
        headquarters: 'Hưng Yên',
        credentialBadge: 'Thôn A Mễ · Xã Quỳnh An, Hưng Yên',
        highlights: [
          'Nhà máy sản xuất sợi trực tiếp tuyển dụng hợp đồng 24 tháng',
          'Miễn phí 100% ký túc xá, cơm ca, điện nước và xe đưa đón',
        ],
      },
    },
    topNav: {
      home: 'Trang chủ',
      demands: 'Đơn tuyển',
      legal: 'Pháp lý & BMET',
      faq: 'Hỏi đáp',
      privacy: 'Bảo mật',
      contact: 'Liên hệ',
    },
    mobileNav: {
      home: 'Trang chủ',
      demands: 'Đơn tuyển',
      legal: 'Pháp lý',
      contact: 'Liên hệ',
    },
    modeSwitch: {
      toAdmin: 'TRUNG TÂM ĐIỀU HÀNH',
      toPublic: 'CỔNG CÔNG KHAI',
      overlayOn: 'Lưới nền Cyber-Grid BẬT',
      overlayOff: 'Lưới nền Cyber-Grid TẮT',
      languageSelectLabel: 'Chuyển đổi ngôn ngữ cổng',
    },
    heroSlides: [
      {
        kicker: 'ĐƠN TUYỂN NHÀ MÁY SỢI HƯNG YÊN, VIỆT NAM',
        headline: 'TUYỂN DỤNG TRỰC TIẾP VẬN HÀNH DÂY CHUYỀN SỢI & DỆT',
        subline: 'Lương thực nhận $500 USD/tháng · Hợp đồng 24 tháng · Đang mở 10 chỉ tiêu Nữ',
        highlightBadge: '$500 USD / MO NET · 10 CHỈ TIÊU',
      },
      {
        kicker: 'BỘ PHẬN KIỂM TRA CHẤT LƯỢNG DỆT KIM & VẢI',
        headline: 'MIỄN PHÍ 100% KÝ TÚC XÁ, CƠM CA, ĐIỆN NƯỚC & XE ĐƯA ĐÓN',
        subline: 'Môi trường nhà máy hiện đại · Không yêu cầu kinh nghiệm trước đó',
        highlightBadge: '100% FREE HOUSING & MEALS',
      },
      {
        kicker: 'HÀNH LANG ĐÀO TẠO & PHÁI CỬ 3 QUỐC GIA',
        headline: 'SILVER GROUP × HARA INTERNATIONAL × QUYNH AN YARN CO., LTD',
        subline: 'Chứng thực Đại sứ quán & BMET · Chuyển khoản lương minh bạch',
        highlightBadge: 'TRI-NATIONAL VERIFIED CORRIDOR',
      },
    ],
    hero: {
      quotaPill: 'ĐANG MỞ 10 CHỈ TIÊU • KHỞI HÀNH: 05/01/2027',
      mainRecruiterLabel: 'ĐƠN VỊ TUYỂN DỤNG CHÍNH · NHÀ MÁY TRỰC TIẾP',
      mainRecruiterLocation: 'Thôn A Mễ, Xã Quỳnh An, Tỉnh Hưng Yên, Việt Nam',
      headline: 'VIỆC LÀM HỢP PHÁP TRỰC TIẾP TẠI VIỆT NAM & NHẬT BẢN',
      subline: 'Bangladesh (BMET) · Trung tâm Việt Nam · Nghiệp đoàn Nhật Bản',
      applyNow: 'NỘP HỒ SƠ NGAY',
      whatsappDirect: 'WHATSAPP TRỰC TIẾP',
      checkEligibility: 'KIỂM TRA ĐIỀU KIỆN',
      trackStatus: 'TRA CỨU HỒ SƠ',
      prevSlide: 'Slide trước',
      nextSlide: 'Slide tiếp theo',
    },
    hoverCards: {
      applyNow: {
        badge: 'ĐĂNG KÝ TRỰC TUYẾN',
        title: 'Quy trình nộp hồ sơ 4 bước trực tiếp',
        bullets: [
          'Biểu mẫu số 4 bước (Cá nhân, Thể lực, Tiếng Anh, Tài liệu)',
          'Tự động kiểm tra chiều cao (160cm), cân nặng (55kg) & BMI',
          'Cấp ngay mã tra cứu (HH-2026-XXXX) & thẻ QR ứng viên',
          'Miễn phí nộp hồ sơ trực tuyến · Đồng bộ Trung tâm Điều hành',
        ],
      },
      whatsapp: {
        badge: 'HỖ TRỢ TRỰC TIẾP',
        title: 'Bàn tư vấn WhatsApp Silver Group Dhaka',
        bullets: [
          'Kết nối trực tiếp điều phối viên tuyển dụng tại Dhaka',
          'Hỗ trợ kiểm tra hộ chiếu, NID và hồ sơ sức khỏe ngay lập tức',
          'Giờ làm việc: 09:00–21:00 BST hàng ngày',
        ],
      },
      checkEligibility: {
        badge: 'KIỂM TRA TỰ ĐỘNG',
        title: 'Đánh giá tiêu chuẩn thể lực & sức khỏe',
        bullets: [
          'Kiểm tra nhanh tuổi (20–45), chiều cao (160+ cm), cân nặng (55+ kg)',
          'Hiển thị chỉ số BMI và quy đổi Feet/Inch theo thời gian thực',
          'Sàng lọc sức khỏe y tế và khả năng làm việc theo ca',
        ],
      },
      trackStatus: {
        badge: 'THEO DÕI 7 GIAI ĐOẠN',
        title: 'Tra cứu tiến độ hồ sơ & thị thực',
        bullets: [
          'Tìm kiếm nhanh bằng Mã tra cứu (HH-2026-XXXX) hoặc SĐT',
          'Theo dõi đầy đủ 7 bước từ Nộp hồ sơ đến BMET & Xuất cảnh',
          'Đồng bộ trực tiếp với Silver Group và Đối tác Việt Nam',
        ],
      },
      commandCenter: {
        badge: 'TRUNG TÂM QUẢN LÝ',
        title: 'Trung tâm Điều hành 3 Quốc gia',
        bullets: [
          'Quản lý ứng viên, khóa chỉ tiêu tự động & đơn tuyển dụng',
          'Cập nhật danh mục COE, Đại sứ quán & thẻ thông minh BMET',
          'Xuất báo cáo kiểm toán CSV/JSON toàn hệ thống',
        ],
      },
      languageSwitcher: {
        badge: 'ĐA NGÔN NGỮ (4 THỨ TIẾNG)',
        title: 'Chuyển đổi ngôn ngữ cổng thông tin',
        bullets: [
          'বাংলা (Mặc định), 日本語, English và Tiếng Việt',
          'Dịch tức thì toàn bộ biểu mẫu, luật lao động & tra cứu',
          'Tự động lưu ngôn ngữ bạn đã chọn trên trình duyệt',
        ],
      },
      overlayToggle: {
        badge: 'LƯỚI KẾT NỐI',
        title: 'Lưới nền Dhaka–Tokyo–Hưng Yên',
        bullets: [
          'Bật hoặc tắt hiệu ứng lưới kết nối 3 quốc gia ở nền',
          'Giảm độ sáng nền bất cứ lúc nào khi đọc biểu mẫu',
        ],
      },
      legalButton: {
        badge: 'BẢO HỘ LAO ĐỘNG',
        title: 'Bộ luật Lao động Việt Nam & BMET',
        bullets: [
          'Quy định tăng ca ngày thường 150%, cuối tuần 200%, ngày lễ 300%',
          'Phụ cấp làm ca đêm bắt buộc +30% (22:00–06:00)',
          'Danh mục chứng thực Đại sứ quán & thẻ thông minh BMET',
        ],
      },
      navHome: {
        badge: 'CỔNG CÔNG KHAI',
        title: 'Về trang chủ cổng tuyển dụng',
        bullets: [
          'Xem trình chiếu nhà máy dệt sợi và chỉ tiêu đang mở',
          'Truy cập nhanh nộp hồ sơ, WhatsApp và bảng tra cứu',
        ],
      },
      navDemands: {
        badge: 'CHỈ TIÊU ĐANG MỞ',
        title: 'Đơn tuyển dụng Việt Nam & Nhật Bản',
        bullets: [
          'Nhà máy Sợi Hưng Yên, Việt Nam ($500/tháng, 10 chỉ tiêu Nữ)',
          'Chi tiết lương, ký túc xá miễn phí, ca làm việc & điều kiện',
        ],
      },
      navLegal: {
        badge: 'PHÁP LÝ BMET',
        title: 'Luật lao động & bảo hộ BMET',
        bullets: [
          'Mức lương làm thêm giờ theo Bộ luật Lao động Việt Nam',
          'Quy trình cấp thẻ BMET & chứng thực Đại sứ quán',
        ],
      },
      navFaq: {
        badge: 'GIẢI ĐÁP',
        title: 'Câu hỏi thường gặp (FAQ)',
        bullets: [
          'Miễn phí nộp hồ sơ, lương chuyển khoản ngân hàng, bao ăn ở',
          'Quy trình phỏng vấn online, khám sức khỏe & vé máy bay',
        ],
      },
      navPrivacy: {
        badge: 'AN TOÀN DỮ LIỆU',
        title: 'Chính sách bảo mật hồ sơ ứng viên',
        bullets: [
          'Hộ chiếu, NID và hồ sơ y tế được mã hóa an toàn',
          'Chỉ sử dụng cho quy trình xuất khẩu lao động hợp pháp',
        ],
      },
      navContact: {
        badge: 'VĂN PHÒNG ĐẠI DIỆN',
        title: 'Liên hệ Dhaka, Tokyo & Hưng Yên',
        bullets: [
          'Silver Group, Hara International & Quynh An Yarn Co., Ltd',
          'Địa chỉ văn phòng, WhatsApp, email & giờ làm việc',
        ],
      },
    },
    infoModals: {
      faq: {
        title: 'CÂU HỎI THƯỜNG GẶP (FAQ)',
        subtitle: 'Thông tin quan trọng dành cho ứng viên tuyển dụng Việt Nam & Nhật Bản',
        items: [
          {
            q: 'Nộp hồ sơ trực tuyến qua cổng thông tin có mất phí không?',
            a: 'Không. Việc đăng ký trực tuyến, kiểm tra điều kiện thể lực và cấp mã tra cứu là hoàn toàn miễn phí.',
          },
          {
            q: 'Mức lương $500 USD/tháng có được chuyển khoản ngân hàng không?',
            a: 'Có. Lương cơ bản thực nhận $500 USD được chuyển trực tiếp vào tài khoản ngân hàng hàng tháng, không khấu trừ ẩn. Tiền tăng ca tính riêng theo luật Việt Nam (150%–300%).',
          },
          {
            q: 'Ký túc xá, điện nước, cơm ca và xe đưa đón có miễn phí không?',
            a: 'Có. Nhà máy tài trợ 100% ký túc xá, điện nước sinh hoạt, suất ăn theo ca và xe đưa đón công nhân.',
          },
          {
            q: 'Chế độ làm việc 2 ca 12 giờ hoạt động như thế nào?',
            a: 'Ca 1 từ 06:00–18:00 và Ca 2 từ 18:00–06:00, xoay ca mỗi 3 ngày. Giờ làm đêm (22:00–06:00) được hưởng thêm +30% phụ cấp theo luật.',
          },
          {
            q: 'Có yêu cầu kinh nghiệm làm nhà máy trước đó không?',
            a: 'Đơn hàng Nhà máy Sợi Việt Nam không yêu cầu kinh nghiệm trước đó, chỉ cần nghe nói và viết tiếng Anh cơ bản.',
          },
          {
            q: 'Khi nào ứng viên đặt vé máy bay?',
            a: 'Ứng viên tự đặt vé máy bay chỉ sau khi đã có visa hợp lệ và hoàn tất thẻ thông minh BMET.',
          },
        ],
      },
      privacy: {
        title: 'CHÍNH SÁCH BẢO MẬT & AN TOÀN DỮ LIỆU',
        subtitle: 'Cam kết mã hóa và bảo vệ thông tin hộ chiếu, NID và y tế của ứng viên',
        summary:
          'Bản sao hộ chiếu, căn cước công dân (NID), ảnh thẻ và hồ sơ sức khỏe được mã hóa và chỉ sử dụng cho mục đích xử lý tuyển dụng lao động hợp pháp.',
        sections: [
          {
            heading: '1. Phạm vi sử dụng dữ liệu',
            body: 'Thông tin cá nhân, chỉ số thể lực và tài liệu đính kèm chỉ được xử lý bởi Silver Group, Quynh An Yarn Co., Ltd và Hara International cho công tác xét duyệt, chứng thực Đại sứ quán và BMET.',
          },
          {
            heading: '2. Không chia sẻ trái phép',
            body: 'Chúng tôi tuyệt đối không bán hoặc cung cấp dữ liệu ứng viên cho bên môi giới không được ủy quyền hay bên thứ ba.',
          },
          {
            heading: '3. Bảo mật đồng bộ ngoại tuyến',
            body: 'Dữ liệu được lưu trữ an toàn trong kho trình duyệt cục bộ khi mất mạng và đồng bộ qua kênh truyền bảo mật lên máy chủ.',
          },
          {
            heading: '4. Quyền chỉnh sửa & xóa hồ sơ',
            body: 'Ứng viên có thể liên hệ văn phòng điều phối Dhaka, Hà Nội hoặc Tokyo bất cứ lúc nào để yêu cầu cập nhật hoặc xóa thông tin.',
          },
        ],
      },
      contact: {
        title: 'LIÊN HỆ CHÍNH THỨC & ĐỐI TÁC',
        subtitle: 'Văn phòng điều phối 3 quốc gia: Bangladesh, Việt Nam & Nhật Bản',
        desks: [
          {
            country: 'Bangladesh · Dhaka Hub',
            org: 'Silver Group — BMET Licensed Sending Hub',
            address: 'Gulshan–Banani / Uttara Recruitment Complex, Dhaka, Bangladesh',
            phone: '+880 1700-000000',
            email: 'bd-desk@hr.handsandhead.com',
            hours: 'Chủ nhật – Thứ năm · 09:00 – 21:00 BST',
          },
          {
            country: 'Việt Nam · Hưng Yên & Hà Nội',
            org: 'Quynh An Yarn Co., Ltd — Plant Coordination',
            address: 'Thôn A Mễ, Xã Quỳnh An, Tỉnh Hưng Yên, Việt Nam',
            phone: '+84 24-3900-0000',
            email: 'vn-desk@hr.handsandhead.com',
            hours: 'Thứ hai – Thứ bảy · 08:30 – 17:30 ICT',
          },
          {
            country: 'Nhật Bản · Tokyo & Osaka',
            org: 'Hara International — Supervising & RSK Organization',
            address: 'Chiyoda-ku, Tokyo 101-0047, Nhật Bản',
            phone: '+81 3-5000-0000',
            email: 'jp-desk@hr.handsandhead.com',
            hours: 'Thứ hai – Thứ sáu · 09:00 – 18:00 JST',
          },
        ],
      },
    },
    footer: {
      brandTitle: 'XUẤT KHẨU NHÂN LỰC QUỐC TẾ',
      allianceHeading: 'LIÊN MINH CHIẾN LƯỢC 3 QUỐC GIA (ĐANG HOẠT ĐỘNG)',
      ethicalNotice:
        'Tuyển dụng đạo đức minh bạch, không gian lận và tuân thủ đầy đủ thẻ thông minh BMET. Tuyệt đối không giao dịch tài chính qua trung gian trái phép.',
      quickLinksHeading: 'Liên kết nhanh',
      privacyHeading: 'Bảo mật & An toàn dữ liệu',
      privacySummary:
        'Hộ chiếu, NID và hồ sơ y tế được mã hóa và chỉ dùng cho quy trình xin thị thực, chứng thực Đại sứ quán và xử lý BMET.',
      copyright: '© 2026 HUMAN RESOURCE EXPORT · Silver Group × Hara International × Quynh An Yarn Co., Ltd',
      techProviderLabel: 'Technology Provider:',
      techProviderName: 'HANDS & HEAD',
      techProviderCard: {
        badge: 'TECHNOLOGY PROVIDER · NỀN TẢNG CÔNG NGHỆ LÕI',
        title: 'HANDS & HEAD',
        subtitle: 'Đối tác hạ tầng tuyển dụng xuyên biên giới & đồng bộ dữ liệu thời gian thực',
        websiteUrl: 'https://handsandhead.com',
        features: [
          'Kho lưu trữ IndexedDB an toàn kết hợp đồng bộ máy chủ thời gian thực',
          'Quy trình nộp hồ sơ 4 bước tự động & tra cứu tiến độ 7 giai đoạn',
          'Quản lý chứng thực Đại sứ quán, thẻ BMET và khóa chỉ tiêu tự động',
        ],
      },
    },
    matrix: {
      sectionLabel: 'ĐƠN TUYỂN NHÀ MÁY SỢI VIỆT NAM • HƯNG YÊN',
      sectionTitle: 'QUY ĐỊNH & QUYỀN LỢI',
      legalButton: 'LUẬT LAO ĐỘNG & TĂNG CA',
      cards: [
        {
          value: '$500 USD / MONTH',
          label: 'Lương thực nhận',
          sub: 'Chuyển khoản trực tiếp · Minh bạch',
          accent: 'orange',
          hoverBullets: [
            'Lương thực nhận $500 USD chuyển trực tiếp qua ngân hàng mỗi tháng',
            'Tăng ca tính riêng theo Bộ luật Lao động Việt Nam (150%–300%)',
            'Không có khoản khấu trừ ẩn nào từ tiền lương',
          ],
        },
        {
          value: '24 MONTHS',
          label: 'Thời hạn hợp đồng',
          sub: 'Bao gồm 1 tháng thử việc',
          accent: 'default',
          hoverBullets: [
            'Hợp đồng lao động công nghiệp chính thức thời hạn 24 tháng',
            'Bao gồm 1 tháng đào tạo hội nhập và thử việc hưởng lương',
            'Có thể gia hạn hợp đồng theo thỏa thuận hai bên',
          ],
        },
        {
          value: 'FEMALE • 20–45 YRS',
          label: 'Giới tính & Độ tuổi',
          sub: 'Yêu cầu hộ chiếu hợp lệ',
          accent: 'crimson',
          hoverBullets: [
            'Đợt tuyển nhà máy sợi Hưng Yên dành cho ứng viên Nữ',
            'Độ tuổi hợp lệ từ 20 đến 45 tuổi',
            'Yêu cầu hộ chiếu còn hạn sử dụng hợp lệ',
          ],
        },
        {
          value: 'MIN 160 CM / 55 KG',
          label: 'Tiêu chuẩn thể lực',
          sub: 'Đo chiều cao & cân nặng',
          accent: 'default',
          hoverBullets: [
            'Chiều cao tối thiểu 160 cm phù hợp thao tác dây chuyền',
            'Cân nặng tối thiểu 55 kg và sức khỏe tốt',
            'Kiểm tra BMI tự động ngay tại Bước 2 biểu mẫu',
          ],
        },
        {
          value: '100% FREE',
          label: 'Ký túc xá, Điện nước, Cơm ca & Xe đưa đón',
          sub: 'Nhà máy tài trợ 100%',
          accent: 'emerald',
          hoverBullets: [
            'Miễn phí 100% ký túc xá tiêu chuẩn gần nhà máy',
            'Miễn phí điện, nước và các suất cơm ca hàng ngày',
            'Miễn phí xe buýt đưa đón từ ký túc xá đến xưởng',
          ],
        },
        {
          value: 'ENGLISH SPEAK & WRITE',
          label: 'Nghe nói đọc viết Tiếng Anh',
          sub: 'Không yêu cầu kinh nghiệm',
          accent: 'gold',
          hoverBullets: [
            'Giao tiếp tiếng Anh cơ bản và ghi chép nhật ký ca',
            'Đọc hiểu hướng dẫn an toàn lao động bằng tiếng Anh',
            'Không yêu cầu kinh nghiệm dệt sợi trước đó',
          ],
        },
        {
          value: '12-HR ROTATING',
          label: 'Ca 1 (06–18) / Ca 2 (18–06)',
          sub: 'Đổi ca mỗi 3 ngày',
          accent: 'default',
          hoverBullets: [
            'Ca 1: 06:00–18:00 · Ca 2: 18:00–06:00',
            'Lịch xoay ca đều đặn sau mỗi 3 ngày làm việc',
            'Phụ cấp ca đêm +30% từ 22:00–06:00 theo quy định',
          ],
        },
        {
          value: 'AIR TICKET: SELF',
          label: 'Phỏng vấn Video Online',
          sub: 'Tự túc vé bay sau khi có Visa',
          accent: 'default',
          hoverBullets: [
            'Phỏng vấn trực tuyến trực tiếp qua hệ thống Silver Group & VN',
            'Chỉ tự túc vé máy bay sau khi hoàn tất Visa & thẻ BMET',
            'Theo dõi từng mốc tiến độ trên bảng tra cứu 7 giai đoạn',
          ],
        },
      ],
    },
    legalModal: {
      title: 'LUẬT LAO ĐỘNG VIỆT NAM & BẢO HỘ BMET',
      overtimeTitle: 'Mức lương làm thêm theo Bộ luật Lao động VN',
      overtimeItems: [
        { rate: '150%', desc: 'Làm thêm ngày thường' },
        { rate: '200%', desc: 'Làm việc ngày nghỉ hàng tuần' },
        { rate: '300%', desc: 'Làm việc ngày lễ, Tết' },
        { rate: '+30%', desc: 'Phụ cấp làm ca đêm (22:00–06:00)' },
      ],
      bmetTitle: 'Danh mục pháp lý BMET & Đại sứ quán',
      bmetItems: [
        'Thư tuyển dụng được Đại sứ quán Việt Nam & Bộ Ngoại giao chứng thực',
        'Ký hợp đồng lao động song ngữ rõ ràng trước khi xuất cảnh',
        'Cấp thẻ thông minh BMET, lấy dấu vân tay & định hướng bay',
        'Giấy khám sức khỏe đạt chuẩn (không bệnh truyền nhiễm, tim mạch, thần kinh)',
      ],
      liveSearchHeading: 'TRA CỨU PHÁP LÝ TRỰC TUYẾN (GOOGLE SEARCH)',
      liveSearchSubheading: 'Truy vấn hướng dẫn BMET & Bộ luật Lao động Việt Nam từ nguồn web chính thức',
      liveBtnBmet: 'Hướng dẫn chứng thực BMET',
      liveBtnVietnam: 'Cập nhật Bộ luật Lao động VN',
      liveSearchPlaceholder: 'Nhập câu hỏi về BMET, hợp đồng hoặc tăng ca Việt Nam...',
      liveSearchBtn: 'TÌM NGUỒN WEB',
      liveSearching: 'Đang truy vấn nguồn web chính thức...',
      liveSourcesLabel: 'Nguồn web chính thức đã xác thực',
      liveSearchedAtLabel: 'Cập nhật lúc',
      liveDisclaimer: 'Tổng hợp trực tiếp từ Google Search trên các nguồn thông tin chính thống.',
      close: 'ĐÓNG',
    },
    wizard: {
      title: 'CỔNG NỘP HỒ SƠ TRỰC TUYẾN 4 BƯỚC',
      stepLabels: ['01. CÁ NHÂN', '02. THỂ LỰC', '03. TIẾNG ANH', '04. HỒ SƠ & GỬI'],
      fullName: 'Họ và tên (Theo hộ chiếu)',
      phone: 'Số điện thoại / WhatsApp',
      district: 'Tỉnh / Thành phố',
      passportNumber: 'Số hộ chiếu',
      referralCode: 'Mã giới thiệu (Nếu có)',
      gender: 'Giới tính',
      female: 'Nữ (Female)',
      male: 'Nam (Male)',
      age: 'Tuổi',
      heightCm: 'Chiều cao (CM)',
      weightKg: 'Cân nặng (KG)',
      bmiLabel: 'CHỈ SỐ BMI',
      ftInLabel: 'FT / IN',
      medicalHeader: 'Cam kết sức khỏe',
      medNoInfectious: 'Không mắc bệnh truyền nhiễm',
      medNoHeartNeuro: 'Không mắc bệnh tim mạch hoặc thần kinh',
      medNoHeightFear: 'Không sợ độ cao, đáp ứng làm việc theo ca',
      eligibleBadge: '100% ELIGIBLE • ĐỦ ĐIỀU KIỆN',
      mismatchBadge: 'CRITERIA MISMATCH • CHƯA ĐẠT',
      mismatchReasonAge: 'Độ tuổi phải từ 20 đến 45 tuổi',
      mismatchReasonHeight: 'Chiều cao tối thiểu phải đạt 160 cm',
      mismatchReasonWeight: 'Cân nặng tối thiểu phải đạt 55 kg',
      mismatchReasonGender: 'Đơn hàng Nhà máy Sợi Việt Nam chỉ tuyển ứng viên Nữ',
      mismatchReasonMedical: 'Cần xác nhận đầy đủ các tiêu chí sức khỏe',
      englishHeader: 'Kiểm tra nhanh Tiếng Anh (3 chạm)',
      engSpeak: 'Có thể giao tiếp Tiếng Anh cơ bản',
      engWrite: 'Có thể đọc & ghi nhật ký ca bằng Tiếng Anh',
      engSafety: 'Hiểu hướng dẫn an toàn nhà máy bằng Tiếng Anh',
      selfIntroLabel: 'Giới thiệu bản thân ngắn bằng Tiếng Anh',
      selfIntroPlaceholder: 'I am ready to work 12-hour rotating shifts in Vietnam...',
      docsHeader: 'Tải lên tài liệu đính kèm',
      docPassport: 'Trang thông tin hộ chiếu',
      docNid: 'Căn cước công dân (NID)',
      docPhoto: 'Ảnh thẻ hộ chiếu',
      docCert: 'Bằng cấp / Chứng chỉ',
      attachSample: 'Đính kèm mẫu',
      nextStep: 'BƯỚC TIẾP THEO',
      prevStep: 'QUAY LẠI',
      submitApp: 'GỬI HỒ SƠ NGAY',
      passTitle: 'ĐÃ CẤP THẺ ỨNG VIÊN ĐIỆN TỬ',
      passTrackingId: 'MÃ TRA CỨU',
      passNote: 'Hồ sơ đã được đồng bộ trực tiếp vào Trung tâm Điều hành.',
      sendWhatsappReceipt: 'GỬI BIÊN NHẬN QUA WHATSAPP',
      trackThisId: 'XEM TRÊN BẢNG TRA CỨU',
    },
    tracker: {
      sectionLabel: 'THEO DÕI QUY TRÌNH 7 GIAI ĐOẠN TRỰC TIẾP',
      title: 'TRA CỨU TIẾN ĐỘ HỒ SƠ',
      placeholder: 'Nhập mã hồ sơ (HH-2026-4102) hoặc Số điện thoại...',
      searchBtn: 'TRA CỨU',
      quickSamples: 'MÃ MẪU:',
      notFound: 'Không tìm thấy hồ sơ. Vui lòng kiểm tra lại mã hoặc số điện thoại.',
      candidateLabel: 'ỨNG VIÊN',
      corridorLabel: 'ĐỊA ĐIỂM / ĐƠN HÀNG',
      statusLabel: 'GIAI ĐOẠN HIỆN TẠI',
    },
    nav: {
      overview: 'Tổng quan',
      candidates: 'Ứng viên',
      jobs: 'Đơn tuyển dụng',
      compliance: 'COE & Thị thực',
      partners: 'Đối tác',
    },
    actions: {
      registerCandidate: 'THÊM ỨNG VIÊN',
      createRequisition: 'TẠO ĐƠN TUYỂN',
      exportCsv: 'XUẤT CSV',
      advanceStage: 'CHUYỂN GIAI ĐOẠN',
      sendWhatsappStatus: 'GỬI CẬP NHẬT WHATSAPP',
      close: 'ĐÓNG',
      save: 'LƯU HỒ SƠ',
      cancel: 'HỦY',
      resetFilters: 'ĐẶT LẠI BỘ LỌC',
    },
    metrics: {
      activeCandidates: 'Ứng viên hoạt động',
      openQuotas: 'Chỉ tiêu còn trống',
      coeProcessing: 'Hồ sơ COE / Visa',
      deployedTotal: 'Đã xuất cảnh',
    },
    corridors: {
      heading: 'TRUNG TÂM ĐIỀU HÀNH 3 QUỐC GIA',
      bangladeshSub: 'Silver Group — Trung tâm Dhaka & Chattogram',
      vietnamSub: 'Quynh An Yarn Co., Ltd — Hưng Yên & Hà Nội',
      japanSub: 'Hara International — Tokyo, Osaka & Nagoya',
    },
    stages: {
      'Application Submitted': '1. Đã nộp hồ sơ',
      Screening: '2. Sơ tuyển',
      'Online Interview': '3. Phỏng vấn Online',
      'Medical Fit': '4. Đạt sức khỏe',
      'COE / Embassy Attestation': '5. Chứng thực COE / ĐSQ',
      'BMET Smart Card': '6. Thẻ BMET',
      Deployed: '7. Đã xuất cảnh',
    },
    trends: {
      heading: 'XU HƯỚNG TUYỂN DỤNG',
      subheading: 'Phân bổ ứng viên theo giai đoạn (Y tế, Chứng thực, Thẻ BMET) & khối lượng hồ sơ hàng tháng',
      stageDistTitle: 'Phân bổ ứng viên theo giai đoạn',
      stageDistSub: 'Trọng tâm Đạt sức khỏe, Chứng thực COE & Thẻ thông minh BMET',
      monthlyVolTitle: 'Hồ sơ xử lý theo tháng',
      monthlyVolSub: 'So sánh hồ sơ tiếp nhận và hồ sơ đã hoàn tất xử lý',
      applicationsLabel: 'Hồ sơ tiếp nhận',
      clearedLabel: 'Đã xử lý xong',
      medicalLabel: 'Đạt sức khỏe',
      attestationLabel: 'Chứng thực / COE',
      smartCardLabel: 'Thẻ BMET',
    },
    partnerSettings: {
      title: 'CÀI ĐẶT TÊN ĐỐI TÁC NHÀ MÁY VIỆT NAM',
      subtitle: 'Chỉnh sửa tên công ty đối tác Việt Nam hiển thị trên Thanh Liên Minh và hồ sơ đơn tuyển',
      fieldLabel: 'Tên công ty đối tác Việt Nam',
      saveBtn: 'Lưu tên đối tác',
      resetBtn: 'Khôi phục mặc định',
      savedNotice: 'Đã cập nhật & đồng bộ tên đối tác',
    },
    labels: {
      searchCandidates: 'Tìm theo tên, mã hồ sơ, SĐT, ngành nghề...',
      allCountries: 'Tất cả quốc gia',
      allStages: 'Tất cả giai đoạn',
      candidateId: 'Mã hồ sơ',
      fullName: 'Ứng viên',
      origin: 'Trung tâm nguồn',
      sector: 'Ngành nghề',
      language: 'Ngôn ngữ / Chứng chỉ',
      program: 'Chương trình',
      stage: 'Giai đoạn',
      prefecture: 'Điểm đến',
      employer: 'Doanh nghiệp',
      salary: 'Lương cơ bản',
      quota: 'Đã tuyển / Chỉ tiêu',
      deadline: 'Hạn chót',
      complianceChecklist: 'Hồ sơ pháp lý & Xuất cảnh',
      noResults: 'Không tìm thấy dữ liệu phù hợp.',
      languageLabel: 'Ngôn ngữ cổng',
    },
  },
};
