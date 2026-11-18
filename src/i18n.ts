import { Locale, PipelineStage, WorkspaceTab } from './types';

export interface RuleCardItem {
  value: string;
  label: string;
  sub: string;
  accent?: 'orange' | 'emerald' | 'crimson' | 'gold' | 'default';
}

export interface Translations {
  allianceBrand: string;
  portalTitle: string;
  portalSubtitle: string;
  modeSwitch: {
    toAdmin: string;
    toPublic: string;
    overlayOn: string;
    overlayOff: string;
  };
  hero: {
    quotaPill: string;
    headline: string;
    subline: string;
    applyNow: string;
    whatsappDirect: string;
    checkEligibility: string;
    trackStatus: string;
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
    allianceBrand: 'SILVER GROUP (BD) × HARA INTERNATIONAL (JP) × VIETNAM PARTNER',
    portalTitle: 'HANDS & HEAD HR',
    portalSubtitle: 'সিলভার গ্রুপ (বাংলাদেশ) × হারা ইন্টারন্যাশনাল (জাপান) × ভিয়েতনাম পার্টনার',
    modeSwitch: {
      toAdmin: 'অ্যাডমিন প্যানেল',
      toPublic: 'পাবলিক পোর্টাল',
      overlayOn: 'OVERLAY: ON',
      overlayOff: 'OVERLAY: OFF',
    },
    hero: {
      quotaPill: '১০টি শূন্যপদ খোলা • শুরু: ০৫ জানুয়ারি ২০২৭',
      headline: 'ভিয়েতনাম ও জাপানে বৈধ ও সরাসরি কর্মসংস্থান',
      subline: 'বাংলাদেশ (BMET) · ভিয়েতনাম হাব · জাপান সুপারভাইজিং ডিরেক্ট রিক্রুটমেন্ট',
      applyNow: 'এখনই আবেদন করুন',
      whatsappDirect: 'হোয়াটসঅ্যাপ ডিরেক্ট',
      checkEligibility: 'যোগ্যতা যাচাই',
      trackStatus: 'আবেদন ট্র্যাক করুন',
    },
    matrix: {
      sectionLabel: 'ভিয়েতনাম ইয়ার্ন ফ্যাক্টরি ডিম্যান্ড • HUNG YEN',
      sectionTitle: 'শর্তাবলি ও সুবিধাসমূহ',
      legalButton: 'আইনি সুরক্ষা ও ওভারটাইম নীতিমালা',
      cards: [
        { value: '$500 USD / MONTH', label: 'নিট মাসিক বেতন', sub: 'ব্যাংক ট্রান্সফার · কোনো গোপন কর্তন নেই', accent: 'orange' },
        { value: '24 MONTHS', label: 'চাকরির চুক্তি', sub: '১ মাস প্রোবেশন পিরিয়ড', accent: 'default' },
        { value: 'FEMALE • 20–45 YRS', label: 'লিঙ্গ ও বয়সসীমা', sub: 'বৈধ পাসপোর্ট আবশ্যক', accent: 'crimson' },
        { value: 'MIN 160 CM / 55 KG', label: 'শারীরিক মানদণ্ড', sub: 'সুস্থতা ও উচ্চতা যাচাই', accent: 'default' },
        { value: '100% FREE', label: 'আবাসন, খাবার ও যাতায়াত', sub: 'বিদ্যুৎ, পানি ও শিফট মিল ফ্রি', accent: 'emerald' },
        { value: 'ENGLISH SPEAK & WRITE', label: 'ইংরেজি বলা ও লেখা', sub: 'পূর্ব অভিজ্ঞতার প্রয়োজন নেই', accent: 'gold' },
        { value: '12-HR ROTATING', label: 'শিফট ১ (০৬–১৮) / শিফট ২ (১৮–০৬)', sub: 'প্রতি ৩ দিন পর পর শিফট পরিবর্তন', accent: 'default' },
        { value: 'AIR TICKET: SELF', label: 'অনলাইন ভিডিও ইন্টারভিউ', sub: 'ভিসা ও BMET পর বিমান টিকেট', accent: 'default' },
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
      vietnamSub: 'ভিয়েতনাম পার্টনার — হ্যানয় ও হুং ইয়েন',
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
    allianceBrand: 'SILVER GROUP (BD) × HARA INTERNATIONAL (JP) × VIETNAM PARTNER',
    portalTitle: 'HANDS & HEAD HR',
    portalSubtitle: 'Silver Group (BD) × 原インターナショナル (JP) × Vietnam Partner',
    modeSwitch: {
      toAdmin: 'COMMAND CENTER',
      toPublic: '公開ポータル',
      overlayOn: 'OVERLAY: ON',
      overlayOff: 'OVERLAY: OFF',
    },
    hero: {
      quotaPill: '10名募集中 • 開始予定: 2027年1月5日',
      headline: 'ベトナム・日本への公的・直接雇用ポータル',
      subline: 'バングラデシュ (BMET) · ベトナム拠点 · 日本監理団体 連携採用',
      applyNow: '今すぐ応募する',
      whatsappDirect: 'WHATSAPP 直接相談',
      checkEligibility: '応募資格を確認',
      trackStatus: '選考状況を確認',
    },
    matrix: {
      sectionLabel: 'ベトナム紡績工場 求人案件 • HUNG YEN',
      sectionTitle: '募集要項・待遇マトリクス',
      legalButton: '労働法・残業割増規定を見る',
      cards: [
        { value: '$500 USD / MONTH', label: '手取り月給', sub: '銀行振込・不正控除なし', accent: 'orange' },
        { value: '24 MONTHS', label: '雇用契約期間', sub: '試用期間1ヶ月含む', accent: 'default' },
        { value: 'FEMALE • 20–45 YRS', label: '性別・年齢制限', sub: '有効パスポート必須', accent: 'crimson' },
        { value: 'MIN 160 CM / 55 KG', label: '身体基準', sub: '身長・体重・健康診断', accent: 'default' },
        { value: '100% FREE', label: '寮・光熱費・食事・送迎', sub: '工場負担 100%無料', accent: 'emerald' },
        { value: 'ENGLISH SPEAK & WRITE', label: '英語での読み書き会話', sub: '未経験者応募可', accent: 'gold' },
        { value: '12-HR ROTATING', label: '交替勤務 (06–18 / 18–06)', sub: '3日ごとにシフト交代', accent: 'default' },
        { value: 'AIR TICKET: SELF', label: 'オンラインビデオ面接', sub: '査証取得後に渡航手配', accent: 'default' },
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
      vietnamSub: 'Vietnam Partner — ハノイ・フンイエン拠点',
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
    allianceBrand: 'SILVER GROUP (BD) × HARA INTERNATIONAL (JP) × VIETNAM PARTNER',
    portalTitle: 'HANDS & HEAD HR',
    portalSubtitle: 'Silver Group (Bangladesh) × Hara International (Japan) × Vietnam Partner',
    modeSwitch: {
      toAdmin: 'COMMAND CENTER',
      toPublic: 'PUBLIC PORTAL',
      overlayOn: 'OVERLAY: ON',
      overlayOff: 'OVERLAY: OFF',
    },
    hero: {
      quotaPill: '10 VACANCIES OPEN • START DATE: 05 JAN 2027',
      headline: 'DIRECT & LEGAL EMPLOYMENT IN VIETNAM & JAPAN',
      subline: 'Bangladesh (BMET) · Vietnam Hub · Japan Supervising Direct Corridor',
      applyNow: 'APPLY NOW',
      whatsappDirect: 'WHATSAPP DIRECT',
      checkEligibility: 'CHECK ELIGIBILITY',
      trackStatus: 'TRACK STATUS',
    },
    matrix: {
      sectionLabel: 'ACTIVE DEMAND: VIETNAM YARN FACTORY • HUNG YEN',
      sectionTitle: 'RULES & BENEFITS MATRIX',
      legalButton: 'LEGAL & OVERTIME PROTECTION',
      cards: [
        { value: '$500 USD / MONTH', label: 'Net Salary', sub: 'Direct bank payout · Zero hidden cuts', accent: 'orange' },
        { value: '24 MONTHS', label: 'Contract Term', sub: '1-Month Probation Included', accent: 'default' },
        { value: 'FEMALE • 20–45 YRS', label: 'Gender & Age Limit', sub: 'Valid Passport Required', accent: 'crimson' },
        { value: 'MIN 160 CM / 55 KG', label: 'Physical Standard', sub: 'Live BMI & Height Verification', accent: 'default' },
        { value: '100% FREE', label: 'Housing, Utilities, Meals & Transport', sub: 'Covered by Factory', accent: 'emerald' },
        { value: 'ENGLISH SPEAK & WRITE', label: 'Speak & Write English', sub: 'No Prior Experience Needed', accent: 'gold' },
        { value: '12-HR ROTATING', label: 'Shift 1 (06–18) / Shift 2 (18–06)', sub: 'Rotates every 3 days', accent: 'default' },
        { value: 'AIR TICKET: SELF', label: 'Online Video Interview', sub: 'Ticket after Visa & BMET Clear', accent: 'default' },
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
      vietnamSub: 'Vietnam Partner — Hanoi & Hung Yen Hubs',
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
    allianceBrand: 'SILVER GROUP (BD) × HARA INTERNATIONAL (JP) × VIETNAM PARTNER',
    portalTitle: 'HANDS & HEAD HR',
    portalSubtitle: 'Silver Group (Bangladesh) × Hara International (Nhật Bản) × Đối tác Việt Nam',
    modeSwitch: {
      toAdmin: 'TRUNG TÂM ĐIỀU HÀNH',
      toPublic: 'CỔNG CÔNG KHAI',
      overlayOn: 'OVERLAY: ON',
      overlayOff: 'OVERLAY: OFF',
    },
    hero: {
      quotaPill: 'ĐANG MỞ 10 CHỈ TIÊU • KHỞI HÀNH: 05/01/2027',
      headline: 'VIỆC LÀM HỢP PHÁP TRỰC TIẾP TẠI VIỆT NAM & NHẬT BẢN',
      subline: 'Bangladesh (BMET) · Trung tâm Việt Nam · Nghiệp đoàn Nhật Bản',
      applyNow: 'NỘP HỒ SƠ NGAY',
      whatsappDirect: 'WHATSAPP TRỰC TIẾP',
      checkEligibility: 'KIỂM TRA ĐIỀU KIỆN',
      trackStatus: 'TRA CỨU HỒ SƠ',
    },
    matrix: {
      sectionLabel: 'ĐƠN TUYỂN NHÀ MÁY SỢI VIỆT NAM • HƯNG YÊN',
      sectionTitle: 'QUY ĐỊNH & QUYỀN LỢI',
      legalButton: 'LUẬT LAO ĐỘNG & TĂNG CA',
      cards: [
        { value: '$500 USD / MONTH', label: 'Lương thực nhận', sub: 'Chuyển khoản trực tiếp · Minh bạch', accent: 'orange' },
        { value: '24 MONTHS', label: 'Thời hạn hợp đồng', sub: 'Bao gồm 1 tháng thử việc', accent: 'default' },
        { value: 'FEMALE • 20–45 YRS', label: 'Giới tính & Độ tuổi', sub: 'Yêu cầu hộ chiếu hợp lệ', accent: 'crimson' },
        { value: 'MIN 160 CM / 55 KG', label: 'Tiêu chuẩn thể lực', sub: 'Đo chiều cao & cân nặng', accent: 'default' },
        { value: '100% FREE', label: 'Ký túc xá, Điện nước, Cơm ca & Xe đưa đón', sub: 'Nhà máy tài trợ 100%', accent: 'emerald' },
        { value: 'ENGLISH SPEAK & WRITE', label: 'Nghe nói đọc viết Tiếng Anh', sub: 'Không yêu cầu kinh nghiệm', accent: 'gold' },
        { value: '12-HR ROTATING', label: 'Ca 1 (06–18) / Ca 2 (18–06)', sub: 'Đổi ca mỗi 3 ngày', accent: 'default' },
        { value: 'AIR TICKET: SELF', label: 'Phỏng vấn Video Online', sub: 'Tự túc vé bay sau khi có Visa', accent: 'default' },
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
      vietnamSub: 'Đối tác Việt Nam — Hà Nội & Hưng Yên',
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
