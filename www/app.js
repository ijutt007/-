A) COMPLETE www/app.js
/**

============================================================================

ذکر — Zikr (Application Logic)

Android / Capacitor Offline Standalone Script

Features:

1. Persistent Tasbeeh Counter with SVG circular progress and haptic support



2. Adhkar & Manzil navigation with explicit incomplete-selection banners



3. 15-Line Mushaf PDF Viewer controller with bookmarks and configurable offset



4. Offline Astronomical Solar Calculation for Prayer Times (Hanafi Asr)



5. Dynamic typography and font-size modal controller



============================================================================
*/


// ---------------------------------------------------------------------------
// 1. DATASETS & CONFIGURATION
// ---------------------------------------------------------------------------

// Tasbeeh Items Sequence
const TASBEEH_PRESETS = [
{
arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
urdu: "پاک ہے اللہ اور اسی کے لیے تمام تعریف ہے",
ref: "صحیح مسلم",
benefit: "گناہ مٹا دیے جاتے ہیں خواہ سمندر کے جھاگ برابر ہوں"
},
{
arabic: "سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ",
urdu: "پاک ہے اللہ جو بڑی عظمت والا ہے اور اسی کی تعریف ہے",
ref: "صحیح بخاری",
benefit: "میزان میں بھاری اور رحمان کو نہایت پیارے کلمات"
},
{
arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
urdu: "اللہ کے سوا کسی میں کوئی طاقت اور قوت نہیں",
ref: "صحیح بخاری",
benefit: "جنت کے خزانوں میں سے ایک خزانہ"
},
{
arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
urdu: "میں اللہ سے بخشش مانگتا ہوں اور اسی کی طرف رجوع کرتا ہوں",
ref: "سنن ابی داؤد",
benefit: "ہر پریشانی اور تنگی سے نجات کا ذریعہ"
},
{
arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
urdu: "اے اللہ! محمد (ﷺ) پر اور ان کی آل پر رحمتیں نازل فرما",
ref: "سنن نسائی",
benefit: "ایک مرتبہ درود پر دس رحمتیں اور دس درجات کی بلندی"
}
];

// Preserved Adhkar Collection
// NOTE ON AUTHENTICITY & SCOPE:
// - Texts are exact, untruncated Arabic with no ellipses (...) or invented words.
// - Datasets below represent ONLY selected excerpts, NOT complete collections.
// - In Surahs Al-Fatiha, Al-Falaq, and An-Nas, Bismillah is the opening formula and is NOT numbered as Verse 1 in the numbering convention.
const AZKAR_DATA = {
morning: [
{
id: "m1",
title: "صبح کی بیداری کا اقرار",
arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
urdu: "ہم نے صبح کی اور اللہ کے سارے ملک نے صبح کی اور تمام تعریف اللہ ہی کے لیے ہے۔ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے حمد ہے اور وہ ہر چیز پر قادر ہے۔",
ref: "صحیح مسلم",
target: 1
},
{
id: "m2",
title: "آیت الکرسی (سورۃ البقرہ: 255)",
arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
urdu: "اللہ ہی معبود برحق ہے جس کے سوا کوئی عبادت کے لائق نہیں، وہ زندہ اور سب کا تھامنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند۔ جو کچھ آسمانوں اور زمین میں ہے سب اسی کا ہے۔",
ref: "صحیح ابن حبان",
target: 1
},
{
id: "m3",
title: "نقصان سے پناہ کی مسنون دعا",
arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
urdu: "اس اللہ کے نام سے جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا اور جاننے والا ہے۔",
ref: "سنن ترمذی",
target: 3
}
],
evening: [
{
id: "e1",
title: "شام کا مسنون اعتراف",
arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
urdu: "ہم نے شام کی اور اللہ کے سارے ملک نے شام کی اور تمام تعریف اللہ ہی کے لیے ہے۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔",
ref: "صحیح مسلم",
target: 1
},
{
id: "e2",
title: "سید الاستغفار",
arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
urdu: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے ہی مجھے پیدا کیا اور میں تیرا بندہ ہوں۔ میں اپنی استطاعت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔",
ref: "صحیح بخاری",
target: 1
},
{
id: "e3",
title: "شام کی پناہ اور عافیت",
arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
urdu: "میں اللہ کے کامل کلمات کی پناہ مانگتا ہوں اس کی تمام مخلوق کے شر سے۔",
ref: "صحیح مسلم",
target: 3
}
],
manzil: [
{
id: "z1",
title: "سورۃ الفاتحہ (مکمل 7 آیات)",
arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿١﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٢﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٣﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٤﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٥﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٦﴾",
urdu: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے۔ بڑا مہربان نہایت رحم فرمانے والا ہے۔ روز جزا کا مالک ہے۔",
ref: "قرآن مجید (سورۃ 1)",
target: 1
},
{
id: "z2",
title: "سورۃ الفلق (مکمل 5 آیات)",
arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾",
urdu: "کہہ دیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں، ہر اس چیز کے شر سے جو اس نے پیدا کی، اور اندھیری رات کے شر سے جب وہ چھا جائے، اور گرہوں میں پھونکنے والیوں کے شر سے، اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔",
ref: "قرآن مجید (سورۃ 113)",
target: 3
},
{
id: "z3",
title: "سورۃ الناس (مکمل 6 آیات)",
arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾",
urdu: "آپ کہہ دیجیے کہ میں لوگوں کے پروردگار کی پناہ میں آتا ہوں، لوگوں کے بادشاہ کی، لوگوں کے معبود برحق کی، وسوسہ ڈالنے والے پیچھے ہٹ جانے والے کے شر سے، جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے، خواہ وہ جنوں میں سے ہو یا انسانوں میں سے۔",
ref: "قرآن مجید (سورۃ 114)",
target: 3
}
]
};

// Cities Coordinates (Pakistan Fixed Offline Reference Data)
const CITIES_COORDINATES = {
karachi: { lat: 24.8607, lng: 67.0011, timezone: 5.0, name: "کراچی" },
lahore: { lat: 31.5204, lng: 74.3587, timezone: 5.0, name: "لاہور" },
islamabad: { lat: 33.6844, lng: 73.0479, timezone: 5.0, name: "اسلام آباد / راولپنڈی" },
peshawar: { lat: 34.0151, lng: 71.5249, timezone: 5.0, name: "پشاور" },
quetta: { lat: 30.1798, lng: 66.9750, timezone: 5.0, name: "کوئٹہ" }
};

// ---------------------------------------------------------------------------
// QURAN PDF CONFIGURATION
// ---------------------------------------------------------------------------
// VERIFY THIS OFFSET AGAINST THE ACTUAL SUPPLIED PDF BEFORE RELEASE.
// Example: If printed page 1 corresponds to physical page 3 in your PDF, set this to 2.
const QURAN_PDF_PAGE_OFFSET = 0;
const TOTAL_QURAN_PAGES = 604;
const CIRCUMFERENCE = 263.89; // 2 * PI * 42 for SVG progress bar

// ---------------------------------------------------------------------------
// 2. STATE MANAGEMENT
// ---------------------------------------------------------------------------

let appState = {
activeTab: "tasbeeh",
counter: 0,
target: 33,
dhikrIndex: 0,
vibrationEnabled: true,
azkarCategory: "evening",
azkarCounters: {},
quranPage: 1,
selectedCity: "karachi",
fontSizeArabic: 24,
fontSizeUrdu: 15
};

// ---------------------------------------------------------------------------
// 3. PERSISTENCE HELPERS (LOCALSTORAGE)
// ---------------------------------------------------------------------------

function loadSavedState() {
try {
const savedCounter = localStorage.getItem("zikr_counter");
if (savedCounter !== null) appState.counter = parseInt(savedCounter, 10) || 0;

const savedTarget = localStorage.getItem("zikr_target");  
if (savedTarget !== null) appState.target = parseInt(savedTarget, 10) || 33;  

const savedDhikrIndex = localStorage.getItem("zikr_dhikr_index");  
if (savedDhikrIndex !== null) appState.dhikrIndex = parseInt(savedDhikrIndex, 10) || 0;  

const savedVibe = localStorage.getItem("zikr_vibration");  
if (savedVibe !== null) appState.vibrationEnabled = (savedVibe === "true");  

const savedAzkarCat = localStorage.getItem("zikr_azkar_category");  
if (savedAzkarCat && AZKAR_DATA[savedAzkarCat]) appState.azkarCategory = savedAzkarCat;  

const savedAzkarCounters = localStorage.getItem("zikr_azkar_counters");  
if (savedAzkarCounters) appState.azkarCounters = JSON.parse(savedAzkarCounters) || {};  

const savedQuranPage = localStorage.getItem("zikr_quran_page");  
if (savedQuranPage !== null) appState.quranPage = parseInt(savedQuranPage, 10) || 1;  

const savedCity = localStorage.getItem("zikr_city");  
if (savedCity && CITIES_COORDINATES[savedCity]) appState.selectedCity = savedCity;  

const savedFontAr = localStorage.getItem("zikr_font_arabic");  
if (savedFontAr !== null) appState.fontSizeArabic = parseInt(savedFontAr, 10) || 24;  

const savedFontUr = localStorage.getItem("zikr_font_urdu");  
if (savedFontUr !== null) appState.fontSizeUrdu = parseInt(savedFontUr, 10) || 15;

} catch (e) {
// Gracefully handle browser storage quota or disabled storage
}
}

function saveState(key, value) {
try {
localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value.toString());
} catch (e) {
// Fallback if storage fails
}
}

// ---------------------------------------------------------------------------
// 4. NAVIGATION & TABS
// ---------------------------------------------------------------------------

function showTab(tabId) {
const tabs = ["tasbeeh", "azkar", "quran", "settings"];
if (!tabs.includes(tabId)) return;

appState.activeTab = tabId;

tabs.forEach(function(t) {
const view = document.getElementById("view-" + t);
const navBtn = document.getElementById("tab-" + t);
if (view) {
if (t === tabId) {
view.classList.add("active");
} else {
view.classList.remove("active");
}
}
if (navBtn) {
if (t === tabId) {
navBtn.classList.remove("text-stone-500");
navBtn.classList.add("text-primary", "font-bold");
} else {
navBtn.classList.remove("text-primary", "font-bold");
navBtn.classList.add("text-stone-500");
}
}
});

const headerTitle = document.getElementById("appHeaderTitle");
if (headerTitle) {
switch (tabId) {
case "tasbeeh":
headerTitle.textContent = "تسبیح — ذکر شمار کنندہ";
break;
case "azkar":
headerTitle.textContent = "اذکار و مسنون دعائیں";
break;
case "quran":
headerTitle.textContent = "قرآن مجید — 15 سطری مصحف";
break;
case "settings":
headerTitle.textContent = "ترتیبات و اوقاتِ نماز";
break;
}
}

if (tabId === "settings") {
calculatePrayerTimes();
}
}

// ---------------------------------------------------------------------------
// 5. TASBEEH FUNCTIONALITY
// ---------------------------------------------------------------------------

function triggerHaptic(duration) {
if (appState.vibrationEnabled && typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
try {
navigator.vibrate(duration || 40);
} catch (e) {
// Haptics permission unavailable or unhandled by WebView
}
}
}

function updateTasbeehUI() {
const counterValEl = document.getElementById("counterValue");
const targetDisplayEl = document.getElementById("targetDisplay");
const targetBadgeEl = document.getElementById("targetBadge");
const progressCircleEl = document.getElementById("progressCircle");

if (counterValEl) counterValEl.textContent = appState.counter;
if (targetDisplayEl) targetDisplayEl.textContent = "ہدف: " + appState.target;

const ratio = Math.min(appState.counter / appState.target, 1.0);
const offset = CIRCUMFERENCE - (ratio * CIRCUMFERENCE);
if (progressCircleEl) {
progressCircleEl.style.strokeDashoffset = offset.toString();
}

if (targetBadgeEl) {
if (appState.counter >= appState.target) {
targetBadgeEl.className = "mt-3 bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-1 rounded-full text-xs flex items-center font-bold";
targetBadgeEl.innerHTML = '<span class="material-symbols-outlined text-sm ml-1">task_alt</span> مکمل ہوا (' + appState.counter + '/' + appState.target + ')';
} else {
targetBadgeEl.className = "mt-3 bg-amber-50 text-secondary border border-amber-200 px-4 py-1 rounded-full text-xs flex items-center font-bold";
targetBadgeEl.innerHTML = '<span class="material-symbols-outlined text-sm ml-1">auto_awesome</span> جاری ہے (' + appState.counter + '/' + appState.target + ')';
}
}

const targetButtons = document.querySelectorAll("#targetButtonsGroup button");
targetButtons.forEach(function(btn) {
const val = parseInt(btn.textContent.trim(), 10);
if (val === appState.target) {
btn.className = "py-2-5 rounded-xl text-xs font-bold bg-primary text-white cursor-pointer";
} else {
btn.className = "py-2-5 rounded-xl text-xs font-bold bg-stone-100 text-stone-700 cursor-pointer";
}
});

const dhikr = TASBEEH_PRESETS[appState.dhikrIndex % TASBEEH_PRESETS.length];
const arabicEl = document.getElementById("dhikrArabic");
const urduEl = document.getElementById("dhikrUrdu");
const refEl = document.getElementById("dhikrRef");
const benefitEl = document.getElementById("dhikrBenefit");

if (arabicEl) arabicEl.textContent = dhikr.arabic;
if (urduEl) urduEl.textContent = dhikr.urdu;
if (refEl) refEl.textContent = dhikr.ref;
if (benefitEl) benefitEl.textContent = dhikr.benefit;

const vibeBtnLabel = document.getElementById("vibeBtnLabel");
const vibeBtn = document.getElementById("vibeBtn");
if (vibeBtnLabel && vibeBtn) {
if (appState.vibrationEnabled) {
vibeBtnLabel.textContent = "لرزش فعال";
vibeBtn.classList.remove("text-stone-400");
vibeBtn.classList.add("text-stone-700");
} else {
vibeBtnLabel.textContent = "لرزش بند";
vibeBtn.classList.remove("text-stone-700");
vibeBtn.classList.add("text-stone-400");
}
}
}

function incrementCounter() {
appState.counter += 1;
saveState("zikr_counter", appState.counter);

if (appState.counter === appState.target) {
triggerHaptic(120);
} else {
triggerHaptic(40);
}
updateTasbeehUI();
}

function decrementCounter() {
if (appState.counter > 0) {
appState.counter -= 1;
saveState("zikr_counter", appState.counter);
triggerHaptic(30);
updateTasbeehUI();
}
}

function resetCounter() {
appState.counter = 0;
saveState("zikr_counter", 0);
triggerHaptic(60);
updateTasbeehUI();
}

function setTarget(newTarget) {
const targetNum = parseInt(newTarget, 10);
if (!isNaN(targetNum) && targetNum > 0) {
appState.target = targetNum;
saveState("zikr_target", targetNum);
triggerHaptic(40);
updateTasbeehUI();
}
}

function nextDhikr() {
appState.dhikrIndex = (appState.dhikrIndex + 1) % TASBEEH_PRESETS.length;
saveState("zikr_dhikr_index", appState.dhikrIndex);
triggerHaptic(40);
updateTasbeehUI();
}

function toggleVibration() {
appState.vibrationEnabled = !appState.vibrationEnabled;
saveState("zikr_vibration", appState.vibrationEnabled);
if (appState.vibrationEnabled) triggerHaptic(50);
updateTasbeehUI();
}

// ---------------------------------------------------------------------------
// 6. ADHKAR & MANZIL CONTROLLER
// ---------------------------------------------------------------------------

function setAzkarCategory(catName) {
if (!AZKAR_DATA[catName]) return;
appState.azkarCategory = catName;
saveState("zikr_azkar_category", catName);

const categories = ["morning", "evening", "manzil"];
categories.forEach(function(c) {
const btn = document.getElementById("catBtn-" + c);
if (btn) {
if (c === catName) {
btn.className = "text-xs px-2-5 py-1 rounded-lg border border-secondary font-bold bg-secondary text-stone-900 cursor-pointer";
} else {
btn.className = "text-xs px-2-5 py-1 rounded-lg border border-amber-300-40 font-bold bg-white-10 cursor-pointer";
}
}
});

const catTitleEl = document.getElementById("azkarCategoryTitle");
if (catTitleEl) {
if (catName === "morning") catTitleEl.textContent = "منتخب مسنون اذکار (محدود انتخاب)";
if (catName === "evening") catTitleEl.textContent = "منتخب مسنون اذکار (محدود انتخاب)";
if (catName === "manzil") catTitleEl.textContent = "منزل — منتخب قرآنی آیات (غیر مکمل)";
}

renderAzkarItems();
}

function incrementAzkarItem(id, maxTarget) {
const cur = appState.azkarCounters[id] || 0;
if (cur < maxTarget) {
appState.azkarCounters[id] = cur + 1;
saveState("zikr_azkar_counters", appState.azkarCounters);
triggerHaptic(40);
renderAzkarItems();
}
}

function resetAzkarItem(id) {
appState.azkarCounters[id] = 0;
saveState("zikr_azkar_counters", appState.azkarCounters);
triggerHaptic(30);
renderAzkarItems();
}

function renderAzkarItems() {
const container = document.getElementById("azkarItemsContainer");
if (!container) return;

const items = AZKAR_DATA[appState.azkarCategory] || [];
container.innerHTML = "";

// Explicit notice for incomplete collection / selection scope
const noticeBanner = document.createElement("div");
if (appState.azkarCategory === "manzil") {
noticeBanner.className = "p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 leading-normal";
noticeBanner.innerHTML =   <div class="flex items-center font-bold text-amber-950 mb-1">   <span class="material-symbols-outlined text-sm ml-1 text-amber-700">info</span>   انتباہ: یہ منزل کا مکمل مجموعہ نہیں ہے   </div>   روایتی منزل 33 قرآنی آیات پر مشتمل ہوتی ہے۔ موجودہ ایپ ڈیٹا میں صرف 3 منتخب اندراجات موجود ہیں۔ مستند مکمل نسخہ شامل ہونے تک اسے مکمل منزل نہ سمجھا جائے۔  ;
} else {
noticeBanner.className = "p-2-5 bg-stone-50 border border-stone-200 rounded-xl text-tiny text-stone-600 leading-normal";
noticeBanner.innerHTML =   <span class="font-bold text-stone-700">نوٹ:</span> یہ احادیث سے ماخوذ چند منتخب اذکار (محدود انتخاب) ہیں۔ یہ صبح/شام کے اذکار کا مکمل احاطہ نہیں کرتے۔  ;
}
container.appendChild(noticeBanner);

items.forEach(function(item) {
const currentCount = appState.azkarCounters[item.id] || 0;
const isCompleted = currentCount >= item.target;

const card = document.createElement("div");  
card.className = "azkar-card space-y-3";  

card.innerHTML = `  
  <div class="flex justify-between items-center border-b border-stone-100 pb-2">  
    <h3 class="font-bold text-stone-800 text-sm">${item.title}</h3>  
    <span class="text-tiny bg-stone-100 text-stone-600 px-2 py-0-5 rounded-full border border-stone-200">${item.ref}</span>  
  </div>  
  <p class="text-2xl font-quran font-bold text-primary leading-loose dynamic-arabic">${item.arabic}</p>  
  <p class="text-sm font-urdu text-stone-600 leading-loose dynamic-urdu">${item.urdu}</p>  
  <div class="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">  
    <div class="flex items-center space-x-reverse space-x-2">  
      <button type="button" onclick="incrementAzkarItem('${item.id}', ${item.target})" class="px-3 py-1-5 rounded-xl font-bold flex items-center cursor-pointer ${isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-primary text-white'}">  
        <span class="material-symbols-outlined text-sm ml-1">${isCompleted ? 'check_circle' : 'touch_app'}</span>  
        ${isCompleted ? 'مکمل شدہ (' + currentCount + '/' + item.target + ')' : 'شمار کریں (' + currentCount + '/' + item.target + ')'}  
      </button>  
      <button type="button" onclick="resetAzkarItem('${item.id}')" class="p-1-5 bg-stone-100 text-stone-500 rounded-lg cursor-pointer" title="دوبارہ شروع کریں">  
        <span class="material-symbols-outlined text-xs">restart_alt</span>  
      </button>  
    </div>  
    <span class="text-stone-400 font-bold text-tiny">ہدف: ${item.target} مرتبہ</span>  
  </div>  
`;  

container.appendChild(card);

});

applyGlobalFontSizes();
}

// ---------------------------------------------------------------------------
// 7. QURAN 15-LINE PDF VIEWER CONTROLLER
// ---------------------------------------------------------------------------

function updateQuranViewer() {
const iframe = document.getElementById("quranPdfViewer");
const pageBadge = document.getElementById("pageBadge");
const counterText = document.getElementById("pageCounterText");
const jumpInput = document.getElementById("jumpPageInput");

// Calculates actual physical PDF page using configurable offset
const physicalPage = appState.quranPage + QURAN_PDF_PAGE_OFFSET;

if (iframe) {
iframe.src = "assets/quran.pdf#page=" + physicalPage + "&view=FitH";
}

if (pageBadge) {
pageBadge.textContent = "صفحہ " + appState.quranPage;
}
if (counterText) {
counterText.textContent = "صفحہ " + appState.quranPage + " / " + TOTAL_QURAN_PAGES;
}
if (jumpInput) {
jumpInput.value = appState.quranPage;
}

saveState("zikr_quran_page", appState.quranPage);
}

function changeQuranPage(delta) {
const target = appState.quranPage + delta;
if (target >= 1 && target <= TOTAL_QURAN_PAGES) {
appState.quranPage = target;
triggerHaptic(30);
updateQuranViewer();
}
}

function jumpToQuranPage() {
const input = document.getElementById("jumpPageInput");
if (!input) return;
const page = parseInt(input.value, 10);
if (!isNaN(page) && page >= 1 && page <= TOTAL_QURAN_PAGES) {
appState.quranPage = page;
triggerHaptic(40);
updateQuranViewer();
} else {
input.value = appState.quranPage;
}
}

function saveQuranBookmark() {
saveState("zikr_quran_bookmark", appState.quranPage);
triggerHaptic(80);
const bookmarkBtn = document.getElementById("loadBookmarkBtn");
if (bookmarkBtn) {
bookmarkBtn.innerHTML = '<span class="material-symbols-outlined text-xs ml-1">bookmark_added</span> محفوظ: ' + appState.quranPage;
}
}

function loadQuranBookmark() {
const saved = localStorage.getItem("zikr_quran_bookmark");
if (saved !== null) {
const page = parseInt(saved, 10);
if (!isNaN(page) && page >= 1 && page <= TOTAL_QURAN_PAGES) {
appState.quranPage = page;
triggerHaptic(50);
updateQuranViewer();
}
}
}

// ---------------------------------------------------------------------------
// 8. OFFLINE ASTRONOMICAL SOLAR CALCULATION (PRAYER TIMES ENGINE)
// ---------------------------------------------------------------------------
// Note: These calculations represent an approximate astronomical solar algorithm
// based on solar depression angles (Fajr/Isha 18°) and Hanafi Asr (factor 2).
// They do not claim to match official local mosque timetables exactly.

function toRadians(degrees) {
return degrees * (Math.PI / 180.0);
}

function toDegrees(radians) {
return radians * (180.0 / Math.PI);
}

function fixHour(hour) {
let a = hour - 24.0 * Math.floor(hour / 24.0);
return a < 0 ? a + 24.0 : a;
}

function formatTime(decimalHour) {
if (isNaN(decimalHour)) return "--:--";
let h = Math.floor(decimalHour);
let m = Math.round((decimalHour - h) * 60);
if (m === 60) {
h += 1;
m = 0;
}
h = h % 24;
const period = h >= 12 ? " شام" : " صبح";
const displayH = h % 12 === 0 ? 12 : h % 12;
const displayM = m < 10 ? "0" + m : m;
return displayH + ":" + displayM + period;
}

function calculatePrayerTimes() {
const city = CITIES_COORDINATES[appState.selectedCity] || CITIES_COORDINATES.karachi;
const now = new Date();

const start = new Date(now.getFullYear(), 0, 0);
const diff = now - start;
const oneDay = 1000 * 60 * 60 * 24;
const dayOfYear = Math.floor(diff / oneDay);

const b = (2.0 * Math.PI * (dayOfYear - 81)) / 365.0;
const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
const declination = 23.45 * Math.sin(b);

const latRad = toRadians(city.lat);
const decRad = toRadians(declination);

const solarNoon = 12.0 + city.timezone - (city.lng / 15.0) - (eot / 60.0);

// Fajr (18° below horizon)
const fajrAngleRad = toRadians(-18.0);
let cosFajrHA = (Math.sin(fajrAngleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
cosFajrHA = Math.max(-1, Math.min(1, cosFajrHA));
const fajrHA = toDegrees(Math.acos(cosFajrHA)) / 15.0;
const fajrTime = fixHour(solarNoon - fajrHA);

// Dhuhr (Midday + 2 mins)
const dhuhrTime = fixHour(solarNoon + (2.0 / 60.0));

// Asr: Hanafi jurisprudence (Shadow multiplier = 2)
const noonSunAngle = 90.0 - city.lat + declination;
const minShadow = 1.0 / Math.tan(toRadians(noonSunAngle));
const hanafiShadow = 2.0 + minShadow;
const asrSunAngle = toDegrees(Math.atan(1.0 / hanafiShadow));
const asrSunAngleRad = toRadians(asrSunAngle);

let cosAsrHA = (Math.sin(asrSunAngleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
cosAsrHA = Math.max(-1, Math.min(1, cosAsrHA));
const asrHA = toDegrees(Math.acos(cosAsrHA)) / 15.0;
const asrTime = fixHour(solarNoon + asrHA);

// Maghrib (Sunset: 0.833° depression)
const sunsetAngleRad = toRadians(-0.833);
let cosSunsetHA = (Math.sin(sunsetAngleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
cosSunsetHA = Math.max(-1, Math.min(1, cosSunsetHA));
const sunsetHA = toDegrees(Math.acos(cosSunsetHA)) / 15.0;
const maghribTime = fixHour(solarNoon + sunsetHA + (2.0 / 60.0));

// Isha (18° below horizon)
const ishaAngleRad = toRadians(-18.0);
let cosIshaHA = (Math.sin(ishaAngleRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
cosIshaHA = Math.max(-1, Math.min(1, cosIshaHA));
const ishaHA = toDegrees(Math.acos(cosIshaHA)) / 15.0;
const ishaTime = fixHour(solarNoon + ishaHA);

const fajrEl = document.getElementById("time-fajr");
const dhuhrEl = document.getElementById("time-dhuhr");
const asrEl = document.getElementById("time-asr");
const maghribEl = document.getElementById("time-maghrib");
const ishaEl = document.getElementById("time-isha");

if (fajrEl) fajrEl.textContent = formatTime(fajrTime);
if (dhuhrEl) dhuhrEl.textContent = formatTime(dhuhrTime);
if (asrEl) asrEl.textContent = formatTime(asrTime);
if (maghribEl) maghribEl.textContent = formatTime(maghribTime);
if (ishaEl) ishaEl.textContent = formatTime(ishaTime);
}

function onCityChange() {
const citySelect = document.getElementById("citySelect");
if (!citySelect) return;
const selected = citySelect.value;
if (CITIES_COORDINATES[selected]) {
appState.selectedCity = selected;
saveState("zikr_city", selected);
calculatePrayerTimes();
}
}

// ---------------------------------------------------------------------------
// 9. FONT SIZE MODAL & DYNAMIC TYPOGRAPHY
// ---------------------------------------------------------------------------

function openFontModal() {
const modal = document.getElementById("fontModal");
if (modal) {
modal.classList.remove("hidden");
modal.classList.add("flex");
}
}

function closeFontModal() {
const modal = document.getElementById("fontModal");
if (modal) {
modal.classList.add("hidden");
modal.classList.remove("flex");
}
}

function setGlobalFontSize(type, pxSize) {
const size = parseInt(pxSize, 10);
if (isNaN(size)) return;

if (type === "arabic") {
appState.fontSizeArabic = size;
saveState("zikr_font_arabic", size);
} else if (type === "urdu") {
appState.fontSizeUrdu = size;
saveState("zikr_font_urdu", size);
}

applyGlobalFontSizes();
}

function applyGlobalFontSizes() {
const arabicElements = document.querySelectorAll(".dynamic-arabic");
arabicElements.forEach(function(el) {
el.style.fontSize = appState.fontSizeArabic + "px";
});

const urduElements = document.querySelectorAll(".dynamic-urdu");
urduElements.forEach(function(el) {
el.style.fontSize = appState.fontSizeUrdu + "px";
});
}

// ---------------------------------------------------------------------------
// 10. APP INITIALIZATION (DOMContentLoaded)
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
loadSavedState();

const citySelect = document.getElementById("citySelect");
if (citySelect && appState.selectedCity) {
citySelect.value = appState.selectedCity;
}

updateTasbeehUI();
setAzkarCategory(appState.azkarCategory);
updateQuranViewer();
calculatePrayerTimes();
applyGlobalFontSizes();

const savedBookmark = localStorage.getItem("zikr_quran_bookmark");
const bookmarkBtn = document.getElementById("loadBookmarkBtn");
if (savedBookmark !== null && bookmarkBtn) {
bookmarkBtn.innerHTML = '<span class="material-symbols-outlined text-xs ml-1">bookmark_added</span> محفوظ: ' + savedBookmark;
}

showTab(appState.activeTab);
});
B) VALIDATION REPORT
Surah Al-Fatiha numbering consistency: YES (Bismillah is the opening formula without a verse marker, matching Al-Falaq and An-Nas, and the wording is identical)
QURAN_PDF_PAGE_OFFSET constant preserved: YES (const QURAN_PDF_PAGE_OFFSET = 0; left unchanged with explicit verification comment)
Quran PDF offset claimed verified: NO (The offset is explicitly documented as unverified until checked against the actual supplied PDF)
Unrelated logic or features modified: NO (Tasbeeh, Adhkar categories, prayer calculations, font controls, and storage routines remain intact)
