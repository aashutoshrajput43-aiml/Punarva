"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "hinglish";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    hinglish: string;
  };
}

export const translations: Translations = {
  // Brand & Slogans
  brandTitle: {
    en: "Punarva",
    hi: "पुनर्वा",
    hinglish: "Punarva",
  },
  slogan: {
    en: "Transforming surplus into sustenance, and waste into a resource.",
    hi: "अतिरिक्त भोजन को पोषण में, और कचरे को संसाधन में बदलना।",
    hinglish: "Surplus khane ko sustenance mein aur waste ko resource mein badalna.",
  },
  heroTitle1: {
    en: "No food wasted.",
    hi: "कोई भोजन व्यर्थ नहीं।",
    hinglish: "Koi khana waste nahi.",
  },
  heroTitle2: {
    en: "No one left hungry.",
    hi: "कोई भूखा न सोए।",
    hinglish: "Koi bhukha na soye.",
  },
  heroSubtitle: {
    en: "AI-powered surplus food rescue and circular waste management connecting food donors, verified NGOs, volunteer couriers, and recyclers across India.",
    hi: "एआई-संचालित अतिरिक्त भोजन बचाव और चक्रीय अपशिष्ट प्रबंधन जो पूरे भारत में भोजन दाताओं, सत्यापित एनजीओ, स्वयंसेवक कोरियर और रीसाइक्लर्स को जोड़ता है।",
    hinglish: "AI-powered surplus food rescue aur circular waste management jo pure India me food donors, verified NGOs, volunteer couriers aur recyclers ko jodta hai.",
  },

  // Navbar Links
  navHome: {
    en: "Home",
    hi: "होम",
    hinglish: "Home",
  },
  navRadar: {
    en: "Live Radar",
    hi: "लाइव रडार",
    hinglish: "Live Radar",
  },
  navWasteSorter: {
    en: "AI Waste Sorter",
    hi: "एआई कचरा सॉर्टर",
    hinglish: "AI Waste Sorter",
  },
  navFreshness: {
    en: "AI Freshness",
    hi: "एआई ताजगी जांच",
    hinglish: "AI Freshness",
  },
  navCsrCalc: {
    en: "CSR Calculator",
    hi: "सीएसआर कैलकुलेटर",
    hinglish: "CSR Calculator",
  },
  navPitchHub: {
    en: "Pitch Hub",
    hi: "पिच हब",
    hinglish: "Pitch Hub",
  },
  navImpact: {
    en: "Impact",
    hi: "प्रभाव",
    hinglish: "Impact",
  },
  navLeaderboard: {
    en: "Leaderboard",
    hi: "लीडरबोर्ड",
    hinglish: "Leaderboard",
  },
  navFaq: {
    en: "FAQ",
    hi: "अक्सर पूछे जाने वाले सवाल",
    hinglish: "FAQ",
  },
  navAbout: {
    en: "About",
    hi: "हमारे बारे में",
    hinglish: "About Us",
  },
  navLogin: {
    en: "Login",
    hi: "लॉग इन",
    hinglish: "Login",
  },
  navDashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    hinglish: "Dashboard",
  },
  navSignOut: {
    en: "Sign Out",
    hi: "साइन आउट",
    hinglish: "Sign Out",
  },

  // Buttons & CTAs
  donateFood: {
    en: "Donate Food",
    hi: "भोजन दान करें",
    hinglish: "Khana Donate Karein",
  },
  donateSurplusFood: {
    en: "Donate Surplus Food",
    hi: "अतिरिक्त भोजन दान करें",
    hinglish: "Surplus Food Donate Karein",
  },
  volunteer: {
    en: "Volunteer to Rescue",
    hi: "स्वयंसेवक बनें",
    hinglish: "Volunteer Banein",
  },
  volunteerShort: {
    en: "Volunteer",
    hi: "स्वयंसेवक",
    hinglish: "Volunteer",
  },
  liveRadar: {
    en: "GIS Tactical Radar",
    hi: "लाइव रडार मैप",
    hinglish: "Live Telemetry Radar",
  },
  driverApp: {
    en: "Driver App",
    hi: "ड्राइवर ऐप",
    hinglish: "Driver App",
  },
  ngoCenter: {
    en: "NGO Center",
    hi: "एनजीओ केंद्र",
    hinglish: "NGO Center",
  },
  fssaiProtected: {
    en: "100% Protected under FSSAI Good Samaritan Law",
    hi: "FSSAI गुड सेमेरिटन कानून के तहत 100% सुरक्षित",
    hinglish: "FSSAI Good Samaritan Act ke tahet 100% safe",
  },
  fastMode: {
    en: "30-Sec Fast Mode",
    hi: "30-सेकंड फास्ट मोड",
    hinglish: "30-Sec Fast Mode",
  },
  csrCalc: {
    en: "CSR & Tax Calculator",
    hi: "CSR और टैक्स कैलकुलेटर",
    hinglish: "CSR & Tax Savings Calculator",
  },

  // Top Alert Bar
  zeroWasteInitiative: {
    en: "Zero Waste Initiative",
    hi: "शून्य अपशिष्ट पहल",
    hinglish: "Zero Waste Initiative",
  },
  judgePitchHub: {
    en: "Judge Pitch Hub",
    hi: "जज पिच हब",
    hinglish: "Judge Pitch Hub",
  },
  helpline: {
    en: "Helpline",
    hi: "हेल्पलाइन",
    hinglish: "Helpline",
  },

  // Stats / Metrics
  kgRescued: {
    en: "kg Surplus Food Rescued",
    hi: "किलो अतिरिक्त भोजन बचाया गया",
    hinglish: "kg Surplus Food Bachaya Gaya",
  },
  mealsServed: {
    en: "Nutritious Meals Served",
    hi: "पौष्टिक भोजन वितरित किए गए",
    hinglish: "Nutritious Meals Baante Gaye",
  },
  activeVolunteers: {
    en: "Active Courier Volunteers",
    hi: "सक्रिय स्वयंसेवक कोरियर",
    hinglish: "Active Volunteer Couriers",
  },
  co2Prevented: {
    en: "kg CO₂ Landfill Emissions Prevented",
    hi: "किलो CO₂ उत्सर्जन रोका गया",
    hinglish: "kg CO₂ Landfill Emissions Roki Gayi",
  },

  // Donate Food Page
  donateHeaderTitle: {
    en: "Donate Food",
    hi: "भोजन दान करें",
    hinglish: "Khana Donate Karein",
  },
  donateHeaderSub: {
    en: "Have extra food? Let's get it to someone who needs it.",
    hi: "अतिरिक्त भोजन है? आइए इसे किसी जरूरतमंद तक पहुंचाएं।",
    hinglish: "Extra khana hai? Chaliye zarooratmand tak pahunchate hain.",
  },
  logFood30Sec: {
    en: "Log Food in < 30 Seconds",
    hi: "< 30 सेकंड में भोजन दर्ज करें",
    hinglish: "< 30 Seconds mein Food Log karein",
  },
  switchToWizard: {
    en: "Switch to 5-Step Wizard",
    hi: "5-चरणीय विज़ार्ड पर स्विच करें",
    hinglish: "5-Step Wizard pe Switch karein",
  },
  stepAboutYou: {
    en: "About You",
    hi: "आपके बारे में",
    hinglish: "Aapke Baare Mein",
  },
  stepFoodDetails: {
    en: "Food Details",
    hi: "भोजन का विवरण",
    hinglish: "Food Details",
  },
  stepPhotosAi: {
    en: "Photos & AI",
    hi: "तस्वीरें और एआई जांच",
    hinglish: "Photos & AI Check",
  },
  stepLocation: {
    en: "Location",
    hi: "स्थान",
    hinglish: "Location",
  },
  stepReview: {
    en: "Review & Submit",
    hi: "समीक्षा और जमा करें",
    hinglish: "Review & Submit",
  },
  iAmA: {
    en: "I am a",
    hi: "मैं हूँ एक",
    hinglish: "Main hoon ek",
  },
  businessNameLabel: {
    en: "Business / Restaurant Name",
    hi: "व्यवसाय / रेस्तरां का नाम",
    hinglish: "Business / Restaurant ka Naam",
  },
  contactPersonLabel: {
    en: "Contact Person Name",
    hi: "संपर्क व्यक्ति का नाम",
    hinglish: "Contact Person ka Naam",
  },
  phoneLabel: {
    en: "Phone Number",
    hi: "फ़ोन नंबर",
    hinglish: "Phone Number",
  },
  emailLabel: {
    en: "Email Address",
    hi: "ईमेल पता",
    hinglish: "Email Address",
  },
  foodNameLabel: {
    en: "Food Item / Dishes Name",
    hi: "भोजन / व्यंजनों का नाम",
    hinglish: "Food Item / Dishes ka Naam",
  },
  categoryLabel: {
    en: "Category",
    hi: "श्रेणी",
    hinglish: "Category",
  },
  dietaryClassification: {
    en: "Dietary Classification",
    hi: "आहार वर्गीकरण",
    hinglish: "Dietary Type",
  },
  vegetarian: {
    en: "Vegetarian",
    hi: "शाकाहारी",
    hinglish: "Vegetarian (Veg)",
  },
  nonVegetarian: {
    en: "Non-Veg",
    hi: "मांसाहारी",
    hinglish: "Non-Veg",
  },
  storageConditionLabel: {
    en: "Storage Condition",
    hi: "भंडारण की स्थिति",
    hinglish: "Storage Condition",
  },
  approxQuantityLabel: {
    en: "Approx Quantity (kg)",
    hi: "अनुमानित मात्रा (किलो)",
    hinglish: "Approx Quantity (kg)",
  },
  estimatedServingsLabel: {
    en: "Estimated Servings",
    hi: "अनुमानित भोजन संख्या",
    hinglish: "Estimated Servings (Meals)",
  },
  pickupWindowLabel: {
    en: "Pickup Window (From - To)",
    hi: "पिकअप का समय (से - तक)",
    hinglish: "Pickup Window (Kab se - Kab tak)",
  },
  allergensLabel: {
    en: "Allergens",
    hi: "एलर्जी कारक",
    hinglish: "Allergens (Dairy, Nuts, etc.)",
  },
  uploadFoodPhotoTitle: {
    en: "Upload Real Food Photo for AI Safety Check",
    hi: "एआई सुरक्षा जांच के लिए असली भोजन की तस्वीर अपलोड करें",
    hinglish: "AI Safety Check ke liye Real Food Photo Upload karein",
  },
  dropPhotoText: {
    en: "Drag & drop image here, tap to upload, or use camera",
    hi: "यहाँ तस्वीर खींचें और छोड़ें, या कैमरा से लें",
    hinglish: "Yahan image drag & drop karein, browse karein ya camera use karein",
  },
  aiFreshnessTitle: {
    en: "AI Freshness & Safety Verification",
    hi: "एआई ताजगी और सुरक्षा सत्यापन",
    hinglish: "AI Freshness & Safety Verification",
  },
  runAiCheckBtn: {
    en: "Run AI Food Check",
    hi: "एआई भोजन जांच शुरू करें",
    hinglish: "AI Food Check Run Karein",
  },
  reRunAiCheckBtn: {
    en: "Re-Run AI Check",
    hi: "पुनः एआई जांच करें",
    hinglish: "Re-Run AI Check",
  },
  freshnessScoreLabel: {
    en: "Freshness Score",
    hi: "ताजगी स्कोर",
    hinglish: "Freshness Score",
  },
  aiVerdictLabel: {
    en: "AI Verdict",
    hi: "एआई निर्णय",
    hinglish: "AI Verdict",
  },
  expiryPriorityLabel: {
    en: "Expiry Priority",
    hi: "समाप्ति प्राथमिकता",
    hinglish: "Expiry Priority",
  },
  pickupLocationTitle: {
    en: "Pickup Location",
    hi: "पिकअप स्थान",
    hinglish: "Pickup Location",
  },
  useCurrentLocationBtn: {
    en: "Use My Current Location",
    hi: "मेरे वर्तमान स्थान का उपयोग करें",
    hinglish: "Use My GPS Location",
  },
  streetAddressLabel: {
    en: "Full Street Address",
    hi: "पूरा पता",
    hinglish: "Full Street Address",
  },
  landmarkLabel: {
    en: "Nearest Landmark",
    hi: "निकटतम लैंडमार्क",
    hinglish: "Nearest Landmark",
  },
  cityHubLabel: {
    en: "City Hub",
    hi: "शहर हब",
    hinglish: "City Hub",
  },
  fssaiDeclaration: {
    en: "FSSAI & Good Samaritan Hygiene Declaration: I certify that this food was prepared under hygienic conditions, stored at compliant holding temperatures, is wholesome and unadulterated.",
    hi: "FSSAI और गुड सेमेरिटन स्वच्छता घोषणा: मैं प्रमाणित करता/करती हूँ कि यह भोजन स्वच्छ परिस्थितियों में तैयार किया गया है, सही तापमान पर रखा गया है, और स्वास्थ्यवर्धक है।",
    hinglish: "FSSAI & Good Samaritan Declaration: Main certify karta hoon ki khana hygienic conditions me bana hai aur safe temperature pe pack hai.",
  },
  backBtn: {
    en: "Back",
    hi: "पीछे",
    hinglish: "Back",
  },
  continueBtn: {
    en: "Continue",
    hi: "आगे बढ़ें",
    hinglish: "Continue",
  },
  submitDispatchRescueBtn: {
    en: "Submit & Dispatch Rescue",
    hi: "जमा करें और बचाव मिशन भेजें",
    hinglish: "Submit & Dispatch Rescue",
  },
  registeringMatchingText: {
    en: "Registering & AI Matching...",
    hi: "दर्ज हो रहा है और एआई मिलान जारी है...",
    hinglish: "Registering & AI Matching...",
  },

  // Volunteer Surplus Page
  volunteerHeaderTitle: {
    en: "Volunteer Courier Dashboard",
    hi: "स्वयंसेवक कूरियर डैशबोर्ड",
    hinglish: "Volunteer Courier Dashboard",
  },
  volunteerHeaderSubtitle: {
    en: "Real-time surplus pickup notifications, thermal cold-chain checklists, and direct navigation.",
    hi: "रीयल-टाइम अतिरिक्त भोजन पिकअप सूचनाएं, थर्मल कोल्ड-चेन चेकलिस्ट और सीधा नेविगेशन।",
    hinglish: "Real-time surplus pickup alerts, cold-chain thermal checklists aur live GPS navigation.",
  },
  fleetDispatchMode: {
    en: "Fleet Dispatch Mode • Active Courier",
    hi: "बेड़ा प्रेषण मोड • सक्रिय कूरियर",
    hinglish: "Fleet Dispatch Mode • Active Courier",
  },
  openLiveDispatchMap: {
    en: "Open Live Dispatch Map",
    hi: "लाइव डिस्पैच मैप खोलें",
    hinglish: "Live Dispatch Map Kholein",
  },
  completedDrops: {
    en: "Completed Drops",
    hi: "पूर्ण किए गए ड्रॉप",
    hinglish: "Completed Drops",
  },
  karmaPointsEarned: {
    en: "Karma Points Earned",
    hi: "अर्जित कर्म अंक",
    hinglish: "Karma Points Earned",
  },
  mealsDeliveredToShelter: {
    en: "Meals Enabled to Shelters",
    hi: "आश्रय स्थलों तक पहुँचाया गया भोजन",
    hinglish: "Shelters tak pahunchaya gaya Khana",
  },
  activePendingMissions: {
    en: "Active & Pending Rescue Dispatches",
    hi: "सक्रिय और लंबित बचाव मिशन",
    hinglish: "Active & Pending Rescue Dispatches",
  },
  missionsFound: {
    en: "Missions Found",
    hi: "मिशन मिले",
    hinglish: "Missions Found",
  },
  noPendingDispatches: {
    en: "No pending dispatches right now in this zone. System is on standby.",
    hi: "इस क्षेत्र में अभी कोई लंबित मिशन नहीं है। सिस्टम स्टैंडबाय पर है।",
    hinglish: "Abhi is zone me koi pending missions nahi hain. System standby pe hai.",
  },
  donorLocation: {
    en: "Donor Location",
    hi: "दाता का स्थान",
    hinglish: "Donor Location",
  },
  pickupWindow: {
    en: "Pickup Window",
    hi: "पिकअप समय",
    hinglish: "Pickup Window",
  },
  navigateGps: {
    en: "Navigate (GPS)",
    hi: "नेविगेट करें (जीपीएस)",
    hinglish: "Navigate (GPS)",
  },
  markPickedUp: {
    en: "Mark Picked Up",
    hi: "पिकअप दर्ज करें",
    hinglish: "Mark Picked Up",
  },
  confirmDropPin: {
    en: "Confirm Drop with PIN",
    hi: "पिन से ड्रॉप की पुष्टि करें",
    hinglish: "Confirm Drop with PIN",
  },
  viewDetails: {
    en: "Details",
    hi: "विवरण",
    hinglish: "Details",
  },
  coldChainChecklist: {
    en: "Cold-Chain Safety Checklist",
    hi: "कोल्ड-चेन सुरक्षा चेकलिस्ट",
    hinglish: "Cold-Chain Safety Checklist",
  },
  coldChainChecklistDesc: {
    en: "Mandatory FSSAI Good Samaritan courier checks before commencing transport:",
    hi: "परिवहन शुरू करने से पहले अनिवार्य FSSAI गुड सेमेरिटन कूरियर जांच:",
    hinglish: "Transport shuru karne se pehle zaroori FSSAI courier checks:",
  },
  courierHelplineTitle: {
    en: "Courier Support Helpline",
    hi: "कूरियर सहायता हेल्पलाइन",
    hinglish: "Courier Support Helpline",
  },
  courierHelplineDesc: {
    en: "Facing road delays or donor unreachable? Call emergency coordinator:",
    hi: "रास्ते में देरी या दाता से संपर्क नहीं हो रहा? आपातकालीन समन्वयक को कॉल करें:",
    hinglish: "Traffic delay ya donor unreachable hai? Emergency coordinator ko call karein:",
  },

  // Map & GIS Radar Page
  mapTitle: {
    en: "Mission Radar & Surplus Dispatch Map",
    hi: "मिशन रडार और अतिरिक्त भोजन डिस्पैच मैप",
    hinglish: "Mission Radar & Surplus Dispatch Map",
  },
  mapSubtitle: {
    en: "Real-time geospatial command center for monitoring commercial surplus food pickups, volunteer driver telemetry, verified NGO shelters, and hunger relief clusters across India.",
    hi: "भारत भर में वाणिज्यिक अतिरिक्त भोजन पिकअप, स्वयंसेवक ड्राइवर टेलीमेट्री, सत्यापित एनजीओ आश्रयों और भूख राहत समूहों की निगरानी के लिए वास्तविक समय भू-स्थानिक कमांड सेंटर।",
    hinglish: "Pure India me commercial surplus food pickups, volunteer driver tracking, verified NGOs aur hunger relief clusters ka live geospatial command center.",
  },
  locateMe: {
    en: "Locate Me",
    hi: "मेरी लोकेशन",
    hinglish: "Locate Me (GPS)",
  },
  satellite: {
    en: "Satellite",
    hi: "सैटेलाइट",
    hinglish: "Satellite",
  },
  street: {
    en: "Street",
    hi: "सड़क",
    hinglish: "Street Map",
  },
  filterAll: {
    en: "All",
    hi: "सभी",
    hinglish: "All",
  },
  filterVerified: {
    en: "✓ Verified",
    hi: "✓ सत्यापित",
    hinglish: "✓ Verified",
  },
  filterAvailable: {
    en: "AVAILABLE",
    hi: "उपलब्ध",
    hinglish: "AVAILABLE",
  },
  filterInTransit: {
    en: "IN TRANSIT",
    hi: "रास्ते में",
    hinglish: "IN TRANSIT",
  },
  filterDelivered: {
    en: "DELIVERED",
    hi: "पहुँचा दिया",
    hinglish: "DELIVERED",
  },
  searchMapPlaceholder: {
    en: "Search food, donor, city...",
    hi: "भोजन, दाता, शहर खोजें...",
    hinglish: "Khana, donor, city search karein...",
  },
  activeDispatches: {
    en: "Active Dispatches",
    hi: "सक्रिय प्रेषण",
    hinglish: "Active Dispatches",
  },
  trackedVolume: {
    en: "Tracked",
    hi: "ट्रैक किया गया",
    hinglish: "Tracked",
  },
  measureAoi: {
    en: "MEASURE AOI ZONE",
    hi: "क्षेत्रीय दायरा मापें",
    hinglish: "MEASURE AOI ZONE",
  },
  aoiActive: {
    en: "AOI Active (Click Map)",
    hi: "सक्रिय दायरा (मैप पर क्लिक करें)",
    hinglish: "AOI Active (Click Map)",
  },

  // Footer
  footerMission: {
    en: "Punarva is India's dedicated surplus food rescue, cold-chain telemetry, and circular waste segregation network.",
    hi: "पुनर्वा भारत का समर्पित अतिरिक्त भोजन बचाव, कोल्ड-चेन टेलीमेट्री और चक्रीय अपशिष्ट पृथक्करण नेटवर्क है।",
    hinglish: "Punarva India ka dedicated surplus food rescue, cold-chain telemetry aur circular waste management network hai.",
  },
  allRightsReserved: {
    en: "All rights reserved.",
    hi: "सर्वाधिकार सुरक्षित।",
    hinglish: "All rights reserved.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("rescuebite_lang") as Language;
    if (saved && (saved === "en" || saved === "hi" || saved === "hinglish")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("rescuebite_lang", lang);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("rb_language_changed", { detail: lang }));
    }
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
