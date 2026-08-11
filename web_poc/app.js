/* --------------------------------------------------
 * El Quizz Application Logic — Proof of Concept Web
 * CURATED CORE: State engine, Synthetic AudioContext sfx,
 * dynamic SVG charts, and interactive board flip triggers.
 * -------------------------------------------------- */

// Predefined Tunisian cultural questions database
// Each question has exactly 9 correct answers mapped to Fibonacci weights (1, 2, 3, 5, 8) and 1 wrong answer.
const DEFAULT_QUESTIONS = [
    {
        id: 1,
        translations: {
            ar: { text: "أذكر ولايات تونسية تطل على البحر الأبيض المتوسط (ساحلية)؟" },
            tn: { text: "ولايات تونسية تطل عالبحر؟" },
            fr: { text: "Citez les gouvernorats tunisiens côtiers (bordés par la mer) ?" },
            en: { text: "Name Tunisian coastal governorates (bordering the sea)?" }
        },
        category: "Geography",
        subcategory: "Cities & Borders",
        answers: [
            { translations: { ar: "بنزرت", tn: "بنزرت", fr: "Bizerte", en: "Bizerte" }, is_correct: true, points: 1 },
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunis", en: "Tunis" }, is_correct: true, points: 1 },
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: true, points: 1 },
            { translations: { ar: "سوسة", tn: "سوسة", fr: "Sousse", en: "Sousse" }, is_correct: true, points: 2 },
            { translations: { ar: "المنستير", tn: "المنستير", fr: "Monastir", en: "Monastir" }, is_correct: true, points: 2 },
            { translations: { ar: "المهدية", tn: "المهدية", fr: "Mahdia", en: "Mahdia" }, is_correct: true, points: 2 },
            { translations: { ar: "صفاقس", tn: "صفاقس", fr: "Sfax", en: "Sfax" }, is_correct: true, points: 3 },
            { translations: { ar: "قابيس", tn: "قابيس", fr: "Gabes", en: "Gabes" }, is_correct: true, points: 5 },
            { translations: { ar: "مدنين", tn: "مدنين", fr: "Medenine", en: "Medenine" }, is_correct: true, points: 8 },
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 2,
        translations: {
            ar: { text: "أذكر أكلات أو أطباق تونسية تقليدية مشهورة؟" },
            tn: { text: "أكلات تونسية بنيّنة معروفة؟" },
            fr: { text: "Citez des plats ou spécialités tunisiennes traditionnelles ?" },
            en: { text: "Name famous traditional Tunisian dishes?" }
        },
        category: "Gastronomy",
        subcategory: "Traditional Dishes",
        answers: [
            { translations: { ar: "كسكسي بالعلّوش", tn: "كسكسي بالعلوش", fr: "Couscous à l'agneau", en: "Couscous with lamb" }, is_correct: true, points: 1 },
            { translations: { ar: "كفتاجي", tn: "كفتاجي", fr: "Kafteji", en: "Kafteji" }, is_correct: true, points: 1 },
            { translations: { ar: "لبلابي", tn: "لبلابي", fr: "Lablabi", en: "Lablabi" }, is_correct: true, points: 2 },
            { translations: { ar: "بريك بالبطاطا والطن", tn: "بريك بالبطاطا والتن", fr: "Brik au thon et pomme de terre", en: "Brik with tuna and potato" }, is_correct: true, points: 2 },
            { translations: { ar: "ملوخية تونسية", tn: "ملوخية تونسية", fr: "Mloukhia tunisienne", en: "Tunisian Mloukhia" }, is_correct: true, points: 3 },
            { translations: { ar: "صحن تونسي", tn: "صحن تونسي", fr: "Plat tunisien", en: "Tunisian Salad Plate" }, is_correct: true, points: 3 },
            { translations: { ar: "مرقة بطاطا", tn: "مرقة بطاطا", fr: "Ragoût de pommes de terre", en: "Potato Stew" }, is_correct: true, points: 5 },
            { translations: { ar: "شربة شعير بالقرنيط", tn: "شربة شعير بالقرنيط", fr: "Soupe d'orge au poulpe", en: "Barley soup with octopus" }, is_correct: true, points: 5 },
            { translations: { ar: "مدموجة بالفاكهة", tn: "مدموجة بالفاكهة", fr: "Madmouja aux fruits secs", en: "Madmouja with nuts" }, is_correct: true, points: 8 },
            { translations: { ar: "طاجين مغربي", tn: "طاجين مغربي", fr: "Tajine marocain", en: "Moroccan Tagine" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 3,
        translations: {
            ar: { text: "أذكر معالم أثرية أو تاريخية شهيرة في تونس؟" },
            tn: { text: "معالم تاريخية معروفة في تونس؟" },
            fr: { text: "Citez des monuments ou sites historiques célèbres en Tunisie ?" },
            en: { text: "Name famous historical landmarks in Tunisia?" }
        },
        category: "History",
        subcategory: "Ancient Ruins",
        answers: [
            { translations: { ar: "مسرح الجم الروماني", tn: "قصر الجم", fr: "Amphithéâtre d'El Jem", en: "El Jem Amphitheater" }, is_correct: true, points: 1 },
            { translations: { ar: "جامع الزيتونة المعمور", tn: "جامع الزيتونة", fr: "Mosquée Zitouna", en: "Zitouna Mosque" }, is_correct: true, points: 1 },
            { translations: { ar: "موقع قرطاج الأثري", tn: "آثار قرطاج", fr: "Site archéologique de Carthage", en: "Carthage Archaeological Site" }, is_correct: true, points: 2 },
            { translations: { ar: "جامع عقبة بن نافع بالقيروان", tn: "جامع عقبة في القيروان", fr: "Grande Mosquée de Kairouan", en: "Great Mosque of Kairouan" }, is_correct: true, points: 2 },
            { translations: { ar: "متحف باردو الوطني", tn: "متحف باردو", fr: "Musée national du Bardo", en: "Bardo National Museum" }, is_correct: true, points: 3 },
            { translations: { ar: "دقة الأثرية (طبرقة)", tn: "آثار دقة", fr: "Dougga antique", en: "Dougga Ruins" }, is_correct: true, points: 3 },
            { translations: { ar: "سبيطلة الأثرية", tn: "آثار سبيطلة", fr: "Site archéologique de Sbeitla", en: "Sbeitla Ruins" }, is_correct: true, points: 5 },
            { translations: { ar: "رباط المنستير", tn: "رباط المنستير", fr: "Ribat de Monastir", en: "Ribat of Monastir" }, is_correct: true, points: 5 },
            { translations: { ar: "أوتيك الأثرية", tn: "أوتيك", fr: "Utique antique", en: "Utica Ruins" }, is_correct: true, points: 8 },
            { translations: { ar: "المدائن التاريخية", tn: "المدائن", fr: "Al-Madain", en: "Al-Madain" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 4,
        translations: {
            ar: { text: "أذكر كلمات أو عبارات مميزة في الدارجة التونسية؟" },
            tn: { text: "كلمات تونسية قحّ نكولوها؟" },
            fr: { text: "Citez des mots ou expressions typiques du dialecte tunisien ?" },
            en: { text: "Name typical words or expressions in the Tunisian dialect?" }
        },
        category: "Dialect",
        subcategory: "Slang Vocabulary",
        answers: [
            { translations: { ar: "شكون", tn: "شكون", fr: "Qui", en: "Who" }, is_correct: true, points: 1 },
            { translations: { ar: "برشة", tn: "برشة", fr: "Beaucoup", en: "A lot" }, is_correct: true, points: 1 },
            { translations: { ar: "توّة", tn: "توّة", fr: "Maintenant", en: "Now" }, is_correct: true, points: 1 },
            { translations: { ar: "باهي", tn: "باهي", fr: "D'accord / Bien", en: "Okay / Good" }, is_correct: true, points: 2 },
            { translations: { ar: "عسلامة", tn: "عسلامة", fr: "Bonjour", en: "Hello" }, is_correct: true, points: 2 },
            { translations: { ar: "شبيك", tn: "شبيك", fr: "Qu'as-tu ?", en: "What's wrong with you?" }, is_correct: true, points: 3 },
            { translations: { ar: "سخطة", tn: "سخطة", fr: "Peste (argot)", en: "Scoundrel / Blast" }, is_correct: true, points: 5 },
            { translations: { ar: "قزّول", tn: "قزّول", fr: "Bâton (argot)", en: "Cudgel / Stick" }, is_correct: true, points: 5 },
            { translations: { ar: "فزّاني", tn: "فزّاني", fr: "Fazzani (danse)", en: "Fazzani rhythm" }, is_correct: true, points: 8 },
            { translations: { ar: "واخا", tn: "واخا", fr: "D'accord (marocain)", en: "Okay (Moroccan)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 5,
        translations: {
            ar: { text: "أذكر عادات، تقاليد أو صناعات تقليدية تونسية؟" },
            tn: { text: "عادات وصناعات تقليدية تونسية؟" },
            fr: { text: "Citez des coutumes, traditions ou artisanats tunisiens ?" },
            en: { text: "Name Tunisian customs, traditions or handicrafts?" }
        },
        category: "Traditions",
        subcategory: "Heritage Customs",
        answers: [
            { translations: { ar: "لبس الشاشية الحمراء", tn: "الشاشية", fr: "Porter la Chéchia rouge", en: "Wearing the red Chechia" }, is_correct: true, points: 1 },
            { translations: { ar: "صناعة النحاس المطرّق", tn: "صناعة النحاس", fr: "Artisanat du cuivre martelé", en: "Hammered copper craft" }, is_correct: true, points: 2 },
            { translations: { ar: "تحضير العولة السنوية", tn: "العولة", fr: "Préparation de la Oula annuelle", en: "Preparing the annual Oula food store" }, is_correct: true, points: 2 },
            { translations: { ar: "تقطير ماء الزهر والورد", tn: "تقطير الزهر", fr: "Distillation de l'eau de fleur d'oranger", en: "Flower water distillation" }, is_correct: true, points: 3 },
            { translations: { ar: "صناعة الزربية القيروانية", tn: "الزربية القيروانية", fr: "Tissage de tapis de Kairouan", en: "Kairouan carpet weaving" }, is_correct: true, points: 3 },
            { translations: { ar: "ليلة الحنة للعروسة", tn: "ليلة الحنة", fr: "Nuit du henné pour la mariée", en: "Bridal Henna Night" }, is_correct: true, points: 3 },
            { translations: { ar: "لبس المليلة والجبة", tn: "الجبة والمليلة", fr: "Porter la Jebba ou Melia", en: "Wearing Jebba or Melia" }, is_correct: true, points: 5 },
            { translations: { ar: "صناعة الفخار النابلي", tn: "فخار نابل", fr: "Poterie de Nabeul", en: "Nabeul Pottery" }, is_correct: true, points: 5 },
            { translations: { ar: "خرجة سيدي أبي سعيد الباجي", tn: "خرجة سيدي بوسعيد", fr: "Procession (Kharja) de Sidi Bou Saïd", en: "Sidi Bou Said Kharja procession" }, is_correct: true, points: 8 },
            { translations: { ar: "عجلة الدبكة", tn: "الدبكة", fr: "Danse de la Dabké", en: "Dabke dance" }, is_correct: false, points: 0 }
        ]
    }
];

let QUESTIONS_DB = JSON.parse(localStorage.getItem("QUESTIONS_DB"));
if (!QUESTIONS_DB || QUESTIONS_DB.length === 0 || !QUESTIONS_DB[0].translations) {
    QUESTIONS_DB = DEFAULT_QUESTIONS;
    localStorage.setItem("QUESTIONS_DB", JSON.stringify(QUESTIONS_DB));
}

// Available Tunisian team symbols
const TEAM_ICONS = ["🌶️", "🇹🇳", "🦁", "☕", "🫖", "🏺", "🕌", "🌊", "🌴", "🐎"];

// Translation helpers
function getQuestionText(q, lang) {
    if (q.translations && q.translations[lang]) {
        return q.translations[lang].text;
    }
    return q.text || "";
}

function getAnswerText(ans, lang) {
    if (ans.translations && ans.translations[lang]) {
        return ans.translations[lang];
    }
    return ans.text || "";
}

function mapDatabaseQuestion(dbQ) {
    const qTranslations = {};
    if (dbQ.translations && Array.isArray(dbQ.translations)) {
        dbQ.translations.forEach(tr => {
            qTranslations[tr.language] = { text: tr.text };
        });
    }
    if (!qTranslations.ar) qTranslations.ar = { text: dbQ.text };
    if (!qTranslations.tn) qTranslations.tn = { text: dbQ.text };
    if (!qTranslations.fr) qTranslations.fr = { text: dbQ.text };
    if (!qTranslations.en) qTranslations.en = { text: dbQ.text };

    const mappedAnswers = dbQ.answers.map(ans => {
        const ansTranslations = {};
        if (ans.translations && Array.isArray(ans.translations)) {
            ans.translations.forEach(tr => {
                ansTranslations[tr.language] = tr.text;
            });
        }
        if (!ansTranslations.ar) ansTranslations.ar = ans.text;
        if (!ansTranslations.tn) ansTranslations.tn = ans.text;
        if (!ansTranslations.fr) ansTranslations.fr = ans.text;
        if (!ansTranslations.en) ansTranslations.en = ans.text;

        return {
            translations: ansTranslations,
            is_correct: ans.is_correct,
            points: ans.points
        };
    });

    return {
        id: dbQ.id,
        translations: qTranslations,
        category: dbQ.category,
        subcategory: dbQ.subcategory,
        answers: mappedAnswers
    };
}

const BACKEND_URL = window.location.hostname 
    ? `${window.location.protocol}//${window.location.hostname}:8000` 
    : "http://192.168.1.139:8000";

const WS_URL = window.location.hostname 
    ? `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.hostname}:8000` 
    : "ws://192.168.1.139:8000";

async function loadQuestionsFromDatabase() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/questions/list`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                QUESTIONS_DB = data.map(mapDatabaseQuestion);
                localStorage.setItem("QUESTIONS_DB", JSON.stringify(QUESTIONS_DB));
                setupCategoriesList();
            }
        }
    } catch (err) {
        console.warn("Could not load questions from backend database. Using local cache/fallback.", err);
    }
}

// Synthesized audio effects using Web Audio API
const playSynthSfx = (type) => {
    if (gameState && gameState.soundMuted) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (type === "correct") {
            // Pleasant dual bell chime
            const now = audioCtx.currentTime;
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc1.frequency.setValueAtTime(523.25, now); // C5
            osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.12); // A5
            
            osc2.frequency.setValueAtTime(659.25, now); // E5
            osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.12); // C6
            
            gainNode.gain.setValueAtTime(0.25, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
            
            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.45);
            osc2.stop(now + 0.45);
        } else if (type === "wrong") {
            // Harsh buzzing sound
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.linearRampToValueAtTime(90, now + 0.3);
            
            gainNode.gain.setValueAtTime(0.35, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === "click") {
            // Soft click sound
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.frequency.setValueAtTime(700, now);
            gainNode.gain.setValueAtTime(0.12, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            
            osc.start(now);
            osc.stop(now + 0.08);
        }
    } catch (e) {
        console.warn("Audio Context blocked or not supported by browser", e);
    }
};

/* --------------------------------------------------
 * Game Engine State
 * -------------------------------------------------- */
let dbCategories = [];

let gameConfig = {
    rounds: 2,
    teamsCount: 2,
    roundDuration: 60,
    selectedCategories: [],
    selectedSubcategories: []
};

let teams = [];
let gameState = {
    currentRound: 1,
    currentTeamIndex: 0,
    activeQuestion: null,
    timerVal: 60,
    timerInterval: null,
    wrongGuessesCount: 0,
    guessedAnswerIds: new Set(),
    roundQuestionsUsed: new Set(),
    pointsGainedThisTurn: 0,
    language: "ar",
    soundMuted: false,
    playAndFix: false
};

const UI_TRANSLATIONS = {
    ar: {
        brand_subtitle: "النسخة التونسية الأقوى للأسئلة الثقافية",
        btn_play_home: "العب الآن",
        btn_rules_home: "قواعد اللعبة",
        btn_admin_home: "لوحة التحكم ⚙️",
        lang_label: "لغة اللعبة / Game Language:",
        config_title: "إعدادات اللعبة",
        config_subtitle: "اختر عدد الجولات، الفرق والمحاور الثقافية",
        rounds_label: "عدد الجولات (Rounds)",
        teams_label: "عدد الفرق المتنافسة",
        categories_label: "المحاور الثقافية النشطة (Categories)",
        btn_next_config: "التالي: تخصيص الفرق",
        teams_title: "تخصيص الفرق",
        teams_subtitle: "اختر رمز واسم لكل فريق",
        btn_start_game: "ابدأ اللعبة!",
        round_header: "الجولة",
        turn_subtitle: "حان دوركم الآن للإجابة!",
        btn_start_board: "اضغط لبدء لوحة الإجابات (60 ثانية)",
        board_title: "لوحة الإجابات النشطة",
        score_label: "النقاط المحققة في هذه المحاولة:",
        strikes_label: "الأخطاء (Strikes):",
        btn_end_turn: "عرض النتائج",
        graph_title: "النقاط المكتسبة في هذه الجولة",
        btn_next_turn: "الموالي",
        gameover_title: "الترتيب النهائي",
        gameover_subtitle: "مبروك للفائزين!",
        tbl_rank: "الرتبة",
        tbl_team: "الفريق",
        tbl_points: "النقاط",
        btn_restart: "لعب مجدداً",
        rules_title: "قواعد اللعبة",
        rules_desc: "أهلاً بك في <strong>El Quizz</strong>، النسخة التونسية من اللعبة الشهيرة Family Feud!",
        rules_li1: "اللعبة تعتمد على الإجابة الجماعية بالتناوب بين الفرق.",
        rules_li2: "كل سؤال يحتوي على <strong>9 إجابات صحيحة</strong> متدرجة الصعوبة (من 1 إلى 8 نقاط) و<strong>إجابة واحدة خاطئة</strong> (فخ).",
        rules_li3: "نقاط الإجابات مقسمة حسب متتالية فيبوناتشي:<br>💡 1: سهل | 2: متوسط | 3: صعب | 5: صعب جداً | 8: شبه مستحيل الإيجاد.",
        rules_li4: "عندما يبدأ المؤقت (60 ثانية)، يحاول الفريق إيجاد أكبر عدد ممكن من الإجابات الصحيحة.",
        rules_li5: "<strong>تنبيه!</strong> اختيار الإجابة الخاطئة (الفخ) يسقط مباشرة <strong>5 نقاط</strong> من رصيد الجولة للفريق!",
        rules_li6: "الفريق الذي يجمع أكبر عدد من النقاط في نهاية الجولات يفوز باللقب! 🏆",
        btn_close_rules: "فهمت!",
        default_team_names: ["فريق الهريسة", "فريق الشاشية", "فريق الزيتون", "فريق الفخّار", "فريق الياسمين"],
        team_symbol_lbl: "الرمز",
        team_name_lbl: "اسم الفريق",
        team_fallback: "فريق",
        score_badge_points: "نقطة",
        graph_title_prefix: "ترتيب جولة",
        graph_subtitle: "مقارنة النقاط المكتسبة بين الفرق"
    },
    tn: {
        brand_subtitle: "النسخة التونسية الأقوى للأسئلة الثقافية",
        btn_play_home: "العب توّة",
        btn_rules_home: "قواعد اللعبة",
        btn_admin_home: "لوحة التحكم ⚙️",
        lang_label: "لغة اللعبة / Game Language:",
        config_title: "إعدادات اللعبة",
        config_subtitle: "اختار قداش من جولة، الفرق والمحاور",
        rounds_label: "عدد الجولات (Rounds)",
        teams_label: "عدد الفرق المتنافسة",
        categories_label: "المحاور الثقافية النشطة (Categories)",
        btn_next_config: "تعدى لأسامي الفرق",
        teams_title: "تخصيص الفرق",
        teams_subtitle: "اختار تصويرة واسم لكل فريق",
        btn_start_game: "أبّدا اللعب!",
        round_header: "الجولة",
        turn_subtitle: "دوركم توّة باش تجاوبوا!",
        btn_start_board: "أقرى السؤال وأبّدا (60 ثانية)",
        board_title: "لوحة الإجابات النشطة",
        score_label: "النقاط اللي لميتوهم توّة:",
        strikes_label: "الأغلاط (Strikes):",
        btn_end_turn: "شوف الترتيب",
        graph_title: "النقاط المكتسبة في الجولة هذي",
        btn_next_turn: "الموالي",
        gameover_title: "الترتيب النهائي",
        gameover_subtitle: "مبروك للي ربحوا!",
        tbl_rank: "الرتبة",
        tbl_team: "الفريق",
        tbl_points: "النقاط",
        btn_restart: "عاود العب",
        rules_title: "قواعد اللعبة",
        rules_desc: "أهلاً بك في <strong>El Quizz</strong>، النسخة التونسية من اللعبة الشهيرة Family Feud!",
        rules_li1: "اللعبة تعتمد على الإجابة الجماعية بالتناوب بين الفرق.",
        rules_li2: "كل سؤال يحتوي على <strong>9 إجابات صحيحة</strong> متدرجة الصعوبة (من 1 إلى 8 نقاط) و<strong>إجابة واحدة خاطئة</strong> (فخ).",
        rules_li3: "نقاط الإجابات مقسمة حسب متتالية فيبوناتشي:<br>💡 1: سهل | 2: متوسط | 3: صعب | 5: صعب جداً | 8: شبه مستحيل الإيجاد.",
        rules_li4: "عندما يبدأ المؤقت (60 ثانية)، يحاول الفريق إيجاد أكبر عدد ممكن من الإجابات الصحيحة.",
        rules_li5: "<strong>تنبيه!</strong> اختيار الإجابة الخاطئة (الفخ) يسقط مباشرة <strong>5 نقاط</strong> من رصيد الجولة للفريق!",
        rules_li6: "الفريق الذي يجمع أكبر عدد من النقاط في نهاية الجولات يفوز باللقب! 🏆",
        btn_close_rules: "فهمت!",
        default_team_names: ["فريق الهريسة", "فريق الشاشية", "فريق الزيتون", "فريق الفخّار", "فريق الياسمين"],
        team_symbol_lbl: "الرمز",
        team_name_lbl: "اسم الفريق",
        team_fallback: "فريق",
        score_badge_points: "نقطة",
        graph_title_prefix: "ترتيب الجولة",
        graph_subtitle: "مقارنة النقاط المكتسبة بين الفرق"
    },
    fr: {
        brand_subtitle: "La version tunisienne ultime du quiz culturel",
        btn_play_home: "Jouer maintenant",
        btn_rules_home: "Règles du jeu",
        btn_admin_home: "Admin ⚙️",
        lang_label: "Langue du jeu / Language:",
        config_title: "Configuration",
        config_subtitle: "Choisissez le nombre de rounds, d'équipes et les catégories",
        rounds_label: "Nombre de Rounds",
        teams_label: "Nombre d'Équipes",
        categories_label: "Catégories Actives",
        btn_next_config: "Suivant : Configurer les Équipes",
        teams_title: "Configuration des Équipes",
        teams_subtitle: "Choisissez un symbole et un nom pour chaque équipe",
        btn_start_game: "Commencer le jeu !",
        round_header: "Round",
        turn_subtitle: "C'est votre tour de répondre !",
        btn_start_board: "Démarrer le tableau (60s)",
        board_title: "Tableau de jeu",
        score_label: "Points gagnés ce tour :",
        strikes_label: "Erreurs (Strikes) :",
        btn_end_turn: "Terminer le tour",
        graph_title: "Points gagnés ce round",
        btn_next_turn: "Suivant",
        gameover_title: "Fin du Jeu — Classement Final",
        gameover_subtitle: "Félicitations aux gagnants !",
        tbl_rank: "Rang",
        tbl_team: "Équipe",
        tbl_points: "Points",
        btn_restart: "Rejouer",
        rules_title: "Règles du Jeu",
        rules_desc: "Bienvenue dans <strong>El Quizz</strong>, la version tunisienne du célèbre jeu Family Feud !",
        rules_li1: "Le jeu se joue en équipe et au tour par tour.",
        rules_li2: "Chaque question a <strong>9 bonnes réponses</strong> (de 1 à 8 pts) et <strong>1 mauvaise réponse</strong> (piège).",
        rules_li3: "Les points suivent la suite de Fibonacci :<br>💡 1: Facile | 2: Moyen | 3: Difficile | 5: Très dur | 8: Presque impossible.",
        rules_li4: "Quand le chrono démarre (60s), l'équipe tente de deviner un maximum de bonnes réponses.",
        rules_li5: "<strong>Attention !</strong> Choisir la mauvaise réponse (piège) retire immédiatement <strong>5 points</strong> du tour !",
        rules_li6: "L'équipe avec le plus de points à la fin des rounds gagne la partie ! 🏆",
        btn_close_rules: "Compris !",
        default_team_names: ["Équipe Harissa", "Équipe Chéchia", "Équipe Olive", "Équipe Poterie", "Équipe Jasmin"],
        team_symbol_lbl: "Symbole",
        team_name_lbl: "Nom de l'équipe",
        team_fallback: "Équipe",
        score_badge_points: "points",
        graph_title_prefix: "Classement Round",
        graph_subtitle: "Comparaison des points entre équipes"
    },
    en: {
        brand_subtitle: "The ultimate Tunisian cultural trivia quiz game",
        btn_play_home: "Play Now",
        btn_rules_home: "Rules",
        btn_admin_home: "Admin ⚙️",
        lang_label: "Game Language / Language:",
        config_title: "Game Configuration",
        config_subtitle: "Choose the number of rounds, teams, and categories",
        rounds_label: "Number of Rounds",
        teams_label: "Number of Teams",
        categories_label: "Active Categories",
        btn_next_config: "Next: Customize Teams",
        teams_title: "Customize Teams",
        teams_subtitle: "Select a symbol and a name for each team",
        btn_start_game: "Start Game!",
        round_header: "Round",
        turn_subtitle: "It is your turn to answer!",
        btn_start_board: "Start Answers Board (60s)",
        board_title: "Active Answers Board",
        score_label: "Points gained this turn:",
        strikes_label: "Strikes:",
        btn_end_turn: "End Turn & View Results",
        graph_title: "Points Gained This Round",
        btn_next_turn: "Next",
        gameover_title: "Game Over — Final Standings",
        gameover_subtitle: "Congratulations to the winners!",
        tbl_rank: "Rank",
        tbl_team: "Team",
        tbl_points: "Points",
        btn_restart: "Play Again",
        rules_title: "Game Rules",
        rules_desc: "Welcome to <strong>El Quizz</strong>, the Tunisian version of the famous Family Feud game!",
        rules_li1: "The game is played in teams, alternating turns.",
        rules_li2: "Each question contains <strong>9 correct answers</strong> (1 to 8 pts) and <strong>1 wrong answer</strong> (trap).",
        rules_li3: "Answers follow Fibonacci weights:<br>💡 1: Easy | 2: Medium | 3: Difficult | 5: Extremely Hard | 8: Near Impossible.",
        rules_li4: "Once the 60-second timer starts, the active team guesses correct answers.",
        rules_li5: "<strong>Watch out!</strong> Guessing the wrong answer (trap) deducts <strong>5 points</strong> from the turn's score!",
        rules_li6: "The team with the highest score at the end of the rounds wins the game! 🏆",
        btn_close_rules: "Got it!",
        default_team_names: ["Team Harissa", "Team Chechia", "Team Olive", "Team Pottery", "Team Jasmine"],
        team_symbol_lbl: "Symbol",
        team_name_lbl: "Team Name",
        team_fallback: "Team",
        score_badge_points: "points",
        graph_title_prefix: "Standings of Round",
        graph_subtitle: "Points gained comparison graph"
    }
};

function updateUILanguage(lang) {
    const isRtl = (lang === "ar" || lang === "tn");
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    
    // Set dynamic typography
    document.body.style.fontFamily = isRtl ? "var(--font-ar)" : "var(--font-en)";

    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang][key] !== undefined) {
            elem.innerHTML = UI_TRANSLATIONS[lang][key];
        }
    });

    if (typeof updateBwUILanguage === "function") {
        updateBwUILanguage(lang);
    }
}

// Initialization
document.addEventListener("DOMContentLoaded", async () => {
    const langSelect = document.getElementById("main-lang-select");
    if (langSelect) {
        gameState.language = langSelect.value;
        updateUILanguage(gameState.language);
        langSelect.addEventListener("change", () => {
            gameState.language = langSelect.value;
            updateUILanguage(gameState.language);
            setupCategoriesList(); // Re-render categories in selected language
        });
    }

    // Theme switching support
    const btnTheme = document.getElementById("btn-floating-theme");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        if (btnTheme) btnTheme.textContent = "🌙";
    }
    if (btnTheme) {
        btnTheme.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            btnTheme.textContent = isLight ? "🌙" : "☀️";
            playSynthSfx("click");
        });
    }

    const btnSound = document.getElementById("btn-floating-sound");
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            gameState.soundMuted = !gameState.soundMuted;
            btnSound.textContent = gameState.soundMuted ? "🔇" : "🔊";
            if (!gameState.soundMuted) {
                // Play a brief test chime on unmuting
                try {
                    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    const now = audioCtx.currentTime;
                    const osc = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    osc.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    osc.frequency.setValueAtTime(600, now);
                    gainNode.gain.setValueAtTime(0.08, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                } catch(e) {}
            }
        });
    }

    try {
        const catRes = await fetch(`${BACKEND_URL}/api/categories/list`);
        if (catRes.ok) {
            dbCategories = await catRes.json();
        }
    } catch (e) {
        console.warn("Could not load categories list from backend database.", e);
    }

    setupCategoriesList();
    setupEventBindings();
    loadQuestionsFromDatabase();
    
    // Check local storage persistence
    checkResumeLocalGame();
    const btnResume = document.getElementById("btn-resume-local");
    if (btnResume) {
        btnResume.addEventListener("click", () => {
            playSynthSfx("click");
            resumeLocalGame();
        });
    }
});

const categoryTranslations = {
    "History & Politics": { ar: "التاريخ والسياسة", tn: "تاريخ وسياسة", fr: "Histoire & Politique", en: "History & Politics" },
    "Geography": { ar: "الجغرافيا", tn: "جغرافيا", fr: "Géographie", en: "Geography" },
    "Economy & Business": { ar: "الاقتصاد والأعمال", tn: "اقتصاد وأعمال", fr: "Économie & Affaires", en: "Economy & Business" },
    "Science & Technology": { ar: "العلوم والتكنولوجيا", tn: "علوم وتكنولوجيا", fr: "Science & Technologie", en: "Science & Technology" },
    "Sports": { ar: "الرياضة", tn: "سبور", fr: "Sports", en: "Sports" },
    "Arts": { ar: "الفنون", tn: "فنّ", fr: "Arts", en: "Arts" },
    "Entertainment": { ar: "الترفيه والتسلية", tn: "ترفيه وجوّ", fr: "Divertissement", en: "Entertainment" },
    "Gastronomy": { ar: "المطبخ والطبخ", tn: "ماكلة ومطبخ", fr: "Gastronomie", en: "Gastronomy" },
    "Culture & Lifestyle": { ar: "الثقافة وأسلوب الحياة", tn: "ثقافة وجوّ", fr: "Culture & Style de vie", en: "Culture & Lifestyle" },
    "Religion & Philosophy": { ar: "الأديان والفلسفة", tn: "أديان وفلسفة", fr: "Religion & Philosophie", en: "Religion & Philosophy" }
};

const subcategoryTranslations = {
    // History & Politics
    "Ancient": { ar: "قديم", tn: "قديم", fr: "Ancien", en: "Ancient" },
    "Medieval": { ar: "العصور الوسطى", tn: "العصور الوسطى", fr: "Médiéval", en: "Medieval" },
    "Modern": { ar: "حديث", tn: "حديث", fr: "Moderne", en: "Modern" },
    "Contemporary": { ar: "معاصر", tn: "معاصر", fr: "Contemporain", en: "Contemporary" },
    "Leaders & Governments": { ar: "القادة والحكومات", tn: "قادة وحكومات", fr: "Dirigeants & Gouvernements", en: "Leaders & Governments" },
    "Ancient Ruins": { ar: "المعالم الأثرية", tn: "معالم أثرية", fr: "Ruines Anciennes", en: "Ancient Ruins" },

    // Geography
    "Worldwide": { ar: "عالمي", tn: "عالمي", fr: "Mondial", en: "Worldwide" },
    "Region": { ar: "إقليمي", tn: "إقليمي", fr: "Régional", en: "Region" },
    "Country": { ar: "وطني", tn: "وطني", fr: "Pays / National", en: "Country" },
    "Cities & Borders": { ar: "المدن والحدود", tn: "مدن وحدود", fr: "Villes & Frontières", en: "Cities & Borders" },

    // Economy & Business
    "Industries": { ar: "الصناعات", tn: "صناعات", fr: "Industries", en: "Industries" },
    "Agriculture": { ar: "الفلاحة والزراعة", tn: "فلاحة", fr: "Agriculture", en: "Agriculture" },
    "Tourism": { ar: "السياحة", tn: "سياحة", fr: "Tourisme", en: "Tourism" },
    "Finance": { ar: "المالية والأعمال", tn: "مالية", fr: "Finance", en: "Finance" },
    "Companies": { ar: "الشركات", tn: "شركات", fr: "Entreprises", en: "Companies" },

    // Science & Technology
    "Mathematics": { ar: "الرياضيات", tn: "رياضيات", fr: "Mathématiques", en: "Mathematics" },
    "Natural Sciences": { ar: "العلوم الطبيعية", tn: "علوم طبيعية", fr: "Sciences Naturelles", en: "Natural Sciences" },
    "Medicine": { ar: "الطب", tn: "طب", fr: "Médecine", en: "Medicine" },
    "Computing": { ar: "الإعلامية والكمبيوتر", tn: "إعلامية", fr: "Informatique", en: "Computing" },
    "Engineering": { ar: "الهندسة", tn: "هندسة", fr: "Ingénierie", en: "Engineering" },

    // Sports
    "Football": { ar: "كرة القدم", tn: "كورة", fr: "Football", en: "Football" },
    "Team Sports": { ar: "رياضات جماعية", tn: "سبورات جماعية", fr: "Sports d'équipe", en: "Team Sports" },
    "Individual Sports": { ar: "رياضات فردية", tn: "سبورات فردية", fr: "Sports Individuels", en: "Individual Sports" },
    "Olympics": { ar: "الألعاب الأولمبية", tn: "أولمبياد", fr: "Jeux Olympiques", en: "Olympics" },
    "Records": { ar: "الأرقام القياسية", tn: "أرقام قياسية", fr: "Records", en: "Records" },

    // Arts
    "Literature": { ar: "الأدب", tn: "كتب وأدب", fr: "Littérature", en: "Literature" },
    "Music": { ar: "الموسيقى", tn: "موسيقى", fr: "Musique", en: "Music" },
    "Visual Arts": { ar: "الفنون البصرية", tn: "تصوير ورسم", fr: "Arts Visuels", en: "Visual Arts" },
    "Theatre": { ar: "المسرح", tn: "مسرح", fr: "Théâtre", en: "Theatre" },
    "Architecture": { ar: "الهندسة المعمارية", tn: "معمار", fr: "Architecture", en: "Architecture" },

    // Entertainment
    "Cinema": { ar: "السينما", tn: "سينما", fr: "Cinéma", en: "Cinema" },
    "Television": { ar: "التلفزيون", tn: "تلفزة", fr: "Télévision", en: "Television" },
    "Video Games": { ar: "ألعاب الفيديو", tn: "جيمز", fr: "Jeux Vidéo", en: "Video Games" },
    "anime": { ar: "الأنمي والمانغا", tn: "أنمي", fr: "Anime", en: "anime" },
    "Humor & Internet Culture": { ar: "الضاحك والإنترنت", tn: "ضحك وميمز", fr: "Humour & Culture Web", en: "Humor & Internet Culture" },

    // Gastronomy
    "Dishes": { ar: "الأطباق", tn: "أكلات ودبارة", fr: "Plats", en: "Dishes" },
    "Desserts": { ar: "الحلويات", tn: "حلو", fr: "Desserts", en: "Desserts" },
    "Ingredients": { ar: "المكونات", tn: "مكونات", fr: "Ingrédients", en: "Ingredients" },
    "Drinks": { ar: "المشروبات", tn: "مشروبات", fr: "Boissons", en: "Drinks" },
    "Regional Cuisine": { ar: "الطبخ الجهوي", tn: "ماكلة جهوية", fr: "Cuisine Régionale", en: "Regional Cuisine" },
    "Traditional Dishes": { ar: "أطباق تقليدية", tn: "أطباق تقليدية", fr: "Plats Traditionnels", en: "Traditional Dishes" },

    // Culture & Lifestyle
    "Traditions": { ar: "العادات والتقاليد", tn: "عادات وتقاليد", fr: "Traditions", en: "Traditions" },
    "Languages & Dialects": { ar: "اللغات واللهجات", tn: "لهجات ولغات", fr: "Langues & Dialectes", en: "Languages & Dialects" },
    "Daily Life": { ar: "الحياة اليومية", tn: "حياة يومية", fr: "Vie Quotidienne", en: "Daily Life" },
    "Fashion": { ar: "الموضة والملابس", tn: "لبسة وموضة", fr: "Mode", en: "Fashion" },
    "Social Media & Trends": { ar: "التواصل الاجتماعي", tn: "سوشيال ميديا", fr: "Réseaux Sociaux", en: "Social Media & Trends" },
    "Slang Vocabulary": { ar: "اللهجة والعبارات", tn: "لهجة وعبارات", fr: "Vocabulaire Slang", en: "Slang Vocabulary" },

    // Religion & Philosophy
    "Islam": { ar: "الإسلام", tn: "إسلام", fr: "Islam", en: "Islam" },
    "Philosophy": { ar: "الفلسفة", tn: "فلسفة", fr: "Philosophie", en: "Philosophy" },
    "christianity": { ar: "المسيحية", tn: "مسيحية", fr: "Christianisme", en: "christianity" },
    "judism": { ar: "اليهودية", tn: "يهودية", fr: "Judaïsme", en: "judism" },
    "other religions": { ar: "أديان أخرى", tn: "أديان أخرى", fr: "Autres religions", en: "other religions" },
    "General": { ar: "عام", tn: "عام", fr: "Général", en: "General" }
};

let localShuffledAnswers = [];

function saveLocalGameState() {
    if (gameState.onlineMode) return; // Don't persist online mode in local storage
    const data = {
        gameConfig: gameConfig,
        teams: teams,
        localShuffledAnswers: localShuffledAnswers,
        gameState: {
            language: gameState.language,
            currentRound: gameState.currentRound,
            currentTeamIndex: gameState.currentTeamIndex,
            roundQuestionsUsed: Array.from(gameState.roundQuestionsUsed),
            activeQuestion: gameState.activeQuestion,
            timerVal: gameState.timerVal,
            wrongGuessesCount: gameState.wrongGuessesCount,
            guessedAnswerIds: Array.from(gameState.guessedAnswerIds),
            pointsGainedThisTurn: gameState.pointsGainedThisTurn,
            playAndFix: gameState.playAndFix,
            activeScreen: document.querySelector(".screen.active")?.id || "screen-home"
        }
    };
    localStorage.setItem("EL_QUIZZ_ACTIVE_LOCAL_GAME", JSON.stringify(data));
}

function clearLocalGameState() {
    localStorage.removeItem("EL_QUIZZ_ACTIVE_LOCAL_GAME");
    const resumeContainer = document.getElementById("local-resume-container");
    if (resumeContainer) resumeContainer.style.display = "none";
}

function checkResumeLocalGame() {
    const dataStr = localStorage.getItem("EL_QUIZZ_ACTIVE_LOCAL_GAME");
    const resumeContainer = document.getElementById("local-resume-container");
    if (dataStr && resumeContainer) {
        resumeContainer.style.display = "block";
    } else if (resumeContainer) {
        resumeContainer.style.display = "none";
    }
}

function getTranslatedSubcategory(name, lang) {
    if (!name) return "";
    return (subcategoryTranslations[name] && subcategoryTranslations[name][lang]) ? subcategoryTranslations[name][lang] : name;
}

function extractCategoriesFromDB() {
    const catsMap = {};
    QUESTIONS_DB.forEach(q => {
        if (!catsMap[q.category]) {
            catsMap[q.category] = new Set();
        }
        catsMap[q.category].add(q.subcategory || "General");
    });
    
    return Object.keys(catsMap).map(catName => ({
        name: catName,
        subcategories: Array.from(catsMap[catName]).map(subName => ({ name: subName }))
    }));
}

// Setup Categories Checkboxes
function setupCategoriesList() {
    const listContainer = document.getElementById("categories-list");
    const categoriesToRender = dbCategories.length > 0 ? dbCategories : extractCategoriesFromDB();
    
    listContainer.innerHTML = categoriesToRender.map((cat, idx) => {
        const catLabel = categoryTranslations[cat.name] ? categoryTranslations[cat.name][gameState.language] : cat.name;
        
        const subcatsList = [...cat.subcategories];
        if (!subcatsList.some(s => s.name === "General")) {
            subcatsList.unshift({ name: "General" });
        }
        
        const subcatCheckboxesHtml = subcatsList.map((sub, sIdx) => {
            const subLabel = getTranslatedSubcategory(sub.name, gameState.language);
            return `
                <label class="subcat-checkbox-label" onclick="event.stopPropagation();">
                    <input type="checkbox" class="subcat-checkbox" data-category="${cat.name}" value="${sub.name}" checked>
                    <span>${subLabel}</span>
                </label>
            `;
        }).join("");
        
        return `
            <div class="category-accordion-item" id="cat-accordion-${idx}">
                <div class="category-accordion-header">
                    <label class="category-header-checkbox-label" onclick="event.stopPropagation();">
                        <input type="checkbox" class="parent-category-checkbox" value="${cat.name}" checked>
                        <span class="category-header-title">${catLabel}</span>
                    </label>
                    <span class="accordion-toggle-icon">▼</span>
                </div>
                <div class="category-accordion-body" style="display: none;">
                    <div class="subcategories-grid">
                        ${subcatCheckboxesHtml}
                    </div>
                </div>
            </div>
        `;
    }).join("");
    
    // Bind Accordion toggles and checkbox syncs
    categoriesToRender.forEach((cat, idx) => {
        const itemDiv = document.getElementById(`cat-accordion-${idx}`);
        if (!itemDiv) return;
        const header = itemDiv.querySelector(".category-accordion-header");
        const parentCheckbox = itemDiv.querySelector(".parent-category-checkbox");
        const subCheckboxes = itemDiv.querySelectorAll(".subcat-checkbox");
        
        // Accordion expand/collapse toggle
        header.addEventListener("click", () => {
            itemDiv.classList.toggle("active");
            const body = itemDiv.querySelector(".category-accordion-body");
            if (itemDiv.classList.contains("active")) {
                body.style.display = "block";
            } else {
                body.style.display = "none";
            }
        });
        
        // Sync: parent checkbox checks/unchecks all subcategories
        parentCheckbox.addEventListener("change", () => {
            const isChecked = parentCheckbox.checked;
            subCheckboxes.forEach(scb => {
                scb.checked = isChecked;
            });
        });
        
        // Sync: subcategory checkboxes update parent checkbox
        subCheckboxes.forEach(scb => {
            scb.addEventListener("change", () => {
                const checkedCount = itemDiv.querySelectorAll(".subcat-checkbox:checked").length;
                parentCheckbox.checked = (checkedCount > 0);
            });
        });
    });
}

// Show specific screen wrapper
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
    
    if (screenId.startsWith("screen-bw-")) {
        updateBwUILanguage(gameState.language);
    }
    
    // Toggle floating home button
    const btnHome = document.getElementById("btn-floating-home");
    if (btnHome) {
        if (screenId === "screen-home") {
            btnHome.style.display = "none";
        } else {
            btnHome.style.display = "block";
        }
    }
}

/* --------------------------------------------------
 * Event Bindings & Screen Navigations
 * -------------------------------------------------- */
function setupEventBindings() {
    // Mode Selection Grid Toggles
    const modeTalla3 = document.getElementById("mode-card-talla3");
    const modeBw = document.getElementById("mode-card-bw");
    const actionsTalla3 = document.getElementById("actions-talla3");
    const actionsBw = document.getElementById("actions-bw");

    if (modeTalla3 && modeBw) {
        modeTalla3.addEventListener("click", () => {
            playSynthSfx("click");
            gameState.mode = "talla3";
            modeTalla3.classList.add("active");
            modeBw.classList.remove("active");
            
            // Visual toggle of styles
            modeTalla3.style.boxShadow = "0 4px 15px rgba(253, 224, 71, 0.15)";
            modeTalla3.style.borderColor = "var(--primary)";
            modeTalla3.style.background = "rgba(255,255,255,0.08)";
            modeBw.style.boxShadow = "none";
            modeBw.style.borderColor = "rgba(255,255,255,0.1)";
            modeBw.style.background = "rgba(255,255,255,0.03)";
            
            actionsTalla3.style.display = "flex";
            actionsBw.style.display = "none";
        });

        modeBw.addEventListener("click", () => {
            playSynthSfx("click");
            gameState.mode = "bent_waled";
            modeBw.classList.add("active");
            modeTalla3.classList.remove("active");
            
            // Visual toggle of styles
            modeBw.style.boxShadow = "0 4px 15px rgba(253, 224, 71, 0.15)";
            modeBw.style.borderColor = "var(--primary)";
            modeBw.style.background = "rgba(255,255,255,0.08)";
            modeTalla3.style.boxShadow = "none";
            modeTalla3.style.borderColor = "rgba(255,255,255,0.1)";
            modeTalla3.style.background = "rgba(255,255,255,0.03)";
            
            actionsBw.style.display = "flex";
            actionsTalla3.style.display = "none";
        });
    }

    // Bent Waled Setup navigation & sliders
    const btnPlayBwSolo = document.getElementById("btn-play-bw-solo");
    if (btnPlayBwSolo) {
        btnPlayBwSolo.addEventListener("click", () => {
            playSynthSfx("click");
            initBentWaledSetupScreen();
            showScreen("screen-bw-setup");
        });
    }

    const btnBwSetupBack = document.getElementById("btn-bw-setup-back");
    if (btnBwSetupBack) {
        btnBwSetupBack.addEventListener("click", () => {
            playSynthSfx("click");
            showScreen("screen-home");
        });
    }

    // Play Mode Tabs (Solo vs Pass & Play)
    const tabSolo = document.getElementById("btn-bw-tab-solo");
    const tabPassPlay = document.getElementById("btn-bw-tab-passplay");
    const configSolo = document.getElementById("bw-config-solo");
    const configPassPlay = document.getElementById("bw-config-passplay");

    if (tabSolo && tabPassPlay) {
        tabSolo.addEventListener("click", () => {
            playSynthSfx("click");
            gameState.bwPlayMode = "solo";
            tabSolo.style.background = "var(--primary)";
            tabSolo.style.color = "black";
            tabPassPlay.style.background = "rgba(255,255,255,0.1)";
            tabPassPlay.style.color = "white";
            configSolo.style.display = "block";
            configPassPlay.style.display = "none";
        });

        tabPassPlay.addEventListener("click", () => {
            playSynthSfx("click");
            gameState.bwPlayMode = "passplay";
            tabPassPlay.style.background = "var(--primary)";
            tabPassPlay.style.color = "black";
            tabSolo.style.background = "rgba(255,255,255,0.1)";
            tabSolo.style.color = "white";
            configPassPlay.style.display = "block";
            configSolo.style.display = "none";
            renderBwPlayersListInput();
        });
    }

    // Toggle active class on categories card labels
    document.querySelectorAll(".bw-cat-check").forEach(input => {
        const label = input.closest(".bw-cat-card");
        if (label) {
            label.classList.toggle("active-selected", input.checked);
            input.addEventListener("change", () => {
                label.classList.toggle("active-selected", input.checked);
            });
        }
    });

    // Pass & Play rounds count slider
    const bwRoundsRange = document.getElementById("bw-rounds-count-range");
    const bwRoundsLbl = document.getElementById("bw-rounds-count-lbl");
    if (bwRoundsRange && bwRoundsLbl) {
        bwRoundsRange.addEventListener("input", () => {
            gameState.bwMaxRounds = parseInt(bwRoundsRange.value);
            bwRoundsLbl.textContent = `${gameState.bwMaxRounds} Rounds`;
        });
    }

    // Add Player name input
    const btnBwAddPlayer = document.getElementById("btn-bw-add-player");
    if (btnBwAddPlayer) {
        btnBwAddPlayer.addEventListener("click", () => {
            playSynthSfx("click");
            addBwPlayerInputField();
        });
    }

    const bwDurationRange = document.getElementById("bw-duration-range");
    const bwDurationVal = document.getElementById("bw-duration-val");
    if (bwDurationRange && bwDurationVal) {
        bwDurationRange.addEventListener("input", () => {
            gameState.bwRoundDuration = parseInt(bwDurationRange.value);
            bwDurationVal.textContent = gameState.bwRoundDuration;
        });
    }

    // Start Bent Waled game
    const btnBwStart = document.getElementById("btn-bw-start");
    if (btnBwStart) {
        btnBwStart.addEventListener("click", () => {
            playSynthSfx("click");
            handleBentWaledStartButtonClick();
        });
    }

    // Pass Phone screen ready button click
    const btnBwPassReady = document.getElementById("btn-bw-pass-ready");
    if (btnBwPassReady) {
        btnBwPassReady.addEventListener("click", () => {
            playSynthSfx("click");
            startBentWaledTurnCycleLetter();
        });
    }

    // Submit Bent Waled answers
    const btnBwSubmit = document.getElementById("btn-bw-submit");
    if (btnBwSubmit) {
        btnBwSubmit.addEventListener("click", () => {
            playSynthSfx("click");
            submitBentWaledAnswers();
        });
    }

    // Review Actions / Next Turn
    const btnBwReviewAgain = document.getElementById("btn-bw-review-again");
    if (btnBwReviewAgain) {
        btnBwReviewAgain.addEventListener("click", () => {
            playSynthSfx("click");
            handleBentWaledNextTurnClick();
        });
    }

    const btnBwFinishLobby = document.getElementById("btn-bw-finish-lobby");
    if (btnBwFinishLobby) {
        btnBwFinishLobby.addEventListener("click", () => {
            playSynthSfx("click");
            showScreen("screen-home");
        });
    }

    // Podium Screen restarts
    const btnBwPodiumRestart = document.getElementById("btn-bw-podium-restart");
    if (btnBwPodiumRestart) {
        btnBwPodiumRestart.addEventListener("click", () => {
            playSynthSfx("click");
            initBentWaledSetupScreen();
            showScreen("screen-bw-setup");
        });
    }

    const btnBwPodiumHome = document.getElementById("btn-bw-podium-home");
    if (btnBwPodiumHome) {
        btnBwPodiumHome.addEventListener("click", () => {
            playSynthSfx("click");
            showScreen("screen-home");
        });
    }

    // Floating Home button
    document.getElementById("btn-floating-home").addEventListener("click", () => {
        playSynthSfx("click");
        cancelAnimationFrame(confettiAnimationId);
        const canvas = document.getElementById("confetti-canvas");
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }
        showScreen("screen-home");
    });

    // Rules Modal Controls
    document.getElementById("btn-rules-home").addEventListener("click", () => {
        playSynthSfx("click");
        document.getElementById("modal-rules").classList.add("active");
    });
    
    document.getElementById("btn-close-rules").addEventListener("click", () => {
        playSynthSfx("click");
        document.getElementById("modal-rules").classList.remove("active");
    });

    // Home to Configuration screen (Local Party)
    document.getElementById("btn-play-local").addEventListener("click", () => {
        playSynthSfx("click");
        gameState.onlineMode = false;
        gameState.playAndFix = false;
        showScreen("screen-config");
    });

    // Home to Configuration screen (Play & Fix)
    document.getElementById("btn-play-fix").addEventListener("click", () => {
        playSynthSfx("click");
        gameState.onlineMode = false;
        gameState.playAndFix = true;
        showScreen("screen-config");
    });

    // Home to Online Entry
    document.getElementById("btn-play-online").addEventListener("click", () => {
        playSynthSfx("click");
        showScreen("screen-online-entry");
    });

    // Online Entry back
    document.getElementById("btn-online-entry-back").addEventListener("click", () => {
        playSynthSfx("click");
        showScreen("screen-home");
    });

    // Create / Join Room Bindings
    document.getElementById("btn-create-room").addEventListener("click", () => {
        playSynthSfx("click");
        requestCreateRoom();
    });

    document.getElementById("btn-join-room").addEventListener("click", () => {
        playSynthSfx("click");
        requestJoinRoom();
    });

    // Leave Lobby
    document.getElementById("btn-leave-lobby").addEventListener("click", () => {
        playSynthSfx("click");
        if (onlineSocket) {
            onlineSocket.close();
            onlineSocket = null;
        }
        gameState.onlineMode = false;
        showScreen("screen-home");
    });

    // Start Online Game
    document.getElementById("btn-start-online-game").addEventListener("click", () => {
        playSynthSfx("click");
        const selectedSubcats = [];
        document.querySelectorAll(".online-subcat-checkbox:checked").forEach(cb => {
            const cat = cb.getAttribute("data-category");
            selectedSubcats.push(`${cat}:${cb.value}`);
        });
        
        const rounds = parseInt(document.getElementById("online-rounds").value);
        const teamsCount = parseInt(document.getElementById("online-teams-count").value);
        const hostRole = document.getElementById("online-host-role").value;
        
        onlineSocket.send(JSON.stringify({
            type: "update_config",
            config: {
                rounds: rounds,
                teamsCount: teamsCount,
                selectedSubcategories: selectedSubcats,
                hostRole: hostRole
            }
        }));
        
        setTimeout(() => {
            onlineSocket.send(JSON.stringify({ type: "start_game" }));
        }, 150);
    });

    // Configuration Increments (rounds/teams/timer counters)
    document.querySelectorAll(".btn-counter").forEach(btn => {
        btn.addEventListener("click", (e) => {
            playSynthSfx("click");
            const targetId = btn.dataset.target;
            const element = document.getElementById(targetId);
            let currentVal = parseInt(element.textContent);
            const step = btn.dataset.step ? parseInt(btn.dataset.step) : 1;
            
            if (btn.classList.contains("plus")) {
                if (targetId === "timer-duration") {
                    currentVal = Math.min(120, currentVal + step);
                } else {
                    currentVal = Math.min(5, currentVal + 1);
                }
            } else {
                if (targetId === "timer-duration") {
                    currentVal = Math.max(30, currentVal - step);
                } else {
                    currentVal = Math.max(1, currentVal - 1);
                }
            }
            element.textContent = currentVal;
        });
    });

    // Configuration screen to Team Selection
    document.getElementById("btn-config-next").addEventListener("click", () => {
        playSynthSfx("click");
        
        // Save Config
        gameConfig.rounds = parseInt(document.getElementById("rounds-count").textContent);
        gameConfig.teamsCount = parseInt(document.getElementById("teams-count").textContent);
        gameConfig.roundDuration = parseInt(document.getElementById("timer-duration").textContent);
        
        // Save Categories & Subcategories
        gameConfig.selectedCategories = [];
        gameConfig.selectedSubcategories = [];
        
        document.querySelectorAll(".parent-category-checkbox:checked").forEach(cb => {
            gameConfig.selectedCategories.push(cb.value);
        });

        document.querySelectorAll(".subcat-checkbox:checked").forEach(cb => {
            const catName = cb.getAttribute("data-category");
            const subcatName = cb.value;
            gameConfig.selectedSubcategories.push(`${catName}:${subcatName}`);
        });

        if (gameConfig.selectedSubcategories.length === 0) {
            const errMsg = (gameState.language === "ar" || gameState.language === "tn")
                ? "يرجى اختيار محور فرعي واحد على الأقل للعب!"
                : (gameState.language === "fr" ? "Veuillez sélectionner au moins une sous-catégorie pour jouer !" : "Please select at least one subcategory to play!");
            alert(errMsg);
            return;
        }

        renderTeamsSetup();
        showScreen("screen-teams");
    });

    document.getElementById("btn-config-back").addEventListener("click", () => {
        playSynthSfx("click");
        showScreen("screen-home");
    });

    // Team screen to Start
    document.getElementById("btn-teams-next").addEventListener("click", () => {
        playSynthSfx("click");
        saveTeamsSetup();
        initGameEngine();
    });

    document.getElementById("btn-teams-back").addEventListener("click", () => {
        playSynthSfx("click");
        showScreen("screen-config");
    });

    // Start active round (Triggers 60s timer)
    document.getElementById("btn-start-round").addEventListener("click", () => {
        playSynthSfx("click");
        if (gameState.onlineMode && onlineSocket) {
            onlineSocket.send(JSON.stringify({ type: "start_round" }));
        } else {
            startActiveGameboard();
        }
    });

    // Manually end round or continue to next team
    document.getElementById("btn-round-complete").addEventListener("click", () => {
        playSynthSfx("click");
        if (gameState.onlineMode && onlineSocket) {
            onlineSocket.send(JSON.stringify({ type: "over" }));
        } else {
            endTurnAndDisplayGraph();
        }
    });

    // Next button from points graph screen
    document.getElementById("btn-graph-next").addEventListener("click", () => {
        playSynthSfx("click");
        if (gameState.onlineMode && onlineSocket) {
            onlineSocket.send(JSON.stringify({ type: "continue_from_standings" }));
        } else {
            rotateTurnOrComplete();
        }
    });

    // Restart game
    document.getElementById("btn-restart").addEventListener("click", () => {
        playSynthSfx("click");
        cancelAnimationFrame(confettiAnimationId);
        const canvas = document.getElementById("confetti-canvas");
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (gameState.onlineMode && onlineSocket) {
            onlineSocket.send(JSON.stringify({ type: "restart_game" }));
        } else {
            showScreen("screen-home");
        }
    });

    // Play & Fix Edit Button click
    const btnPlayFixEdit = document.getElementById("btn-play-fix-edit");
    if (btnPlayFixEdit) {
        btnPlayFixEdit.addEventListener("click", () => {
            playSynthSfx("click");
            
            // 1. Pause active timer countdown
            if (gameState.timerInterval) {
                clearInterval(gameState.timerInterval);
                gameState.timerInterval = null;
            }

            const q = gameState.activeQuestion;
            const activeTeam = teams[gameState.currentTeamIndex];

            // Reset tab visibility to Form by default
            document.getElementById("pf-form-editor-view").style.display = "block";
            document.getElementById("pf-json-editor-view").style.display = "none";
            document.getElementById("btn-pf-tab-form").style.background = "var(--primary)";
            document.getElementById("btn-pf-tab-form").style.color = "black";
            document.getElementById("btn-pf-tab-json").style.background = "rgba(255,255,255,0.1)";
            document.getElementById("btn-pf-tab-json").style.color = "white";

            // 2. Populate inputs
            document.getElementById("pf-edit-q-text").value = getQuestionText(q, gameState.language);
            document.getElementById("pf-edit-team-score").value = activeTeam.score;
            document.getElementById("pf-edit-turn-score").value = gameState.pointsGainedThisTurn;

            // 3. Populate answers list
            const answersContainer = document.getElementById("pf-answers-list-container");
            answersContainer.innerHTML = "";

            localShuffledAnswers.forEach((ans, idx) => {
                const ansText = getAnswerText(ans, gameState.language);
                
                const row = document.createElement("div");
                row.style.display = "flex";
                row.style.gap = "10px";
                row.style.alignItems = "center";
                row.style.marginBottom = "8px";
                row.innerHTML = `
                    <span style="width: 25px; font-weight: bold; color: var(--accent-yellow);">${idx + 1}.</span>
                    <input type="text" class="pf-ans-text" data-index="${idx}" value="${ansText.replace(/"/g, '&quot;')}" style="flex: 2; padding: 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: white;">
                    <input type="number" class="pf-ans-points" data-index="${idx}" value="${ans.points}" style="width: 60px; padding: 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: white;">
                    <select class="pf-ans-correctness" data-index="${idx}" style="flex: 1; padding: 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: white; min-width: 90px;">
                        <option value="true" ${ans.is_correct ? 'selected' : ''}>Correct</option>
                        <option value="false" ${!ans.is_correct ? 'selected' : ''}>Wrong (Trap)</option>
                    </select>
                `;
                answersContainer.appendChild(row);
            });

            // 4. Serialize to JSON area
            const currentJson = {
                id: q.id,
                category: q.category,
                subcategory: q.subcategory || "General",
                difficulty: q.difficulty || 2,
                region: q.region || "national",
                translations: q.translations || {
                    ar: q.text,
                    tn: q.text,
                    fr: q.text,
                    en: q.text
                },
                team_score: activeTeam.score,
                turn_score: gameState.pointsGainedThisTurn,
                answers: localShuffledAnswers.map(ans => ({
                    points: ans.points,
                    is_correct: ans.is_correct,
                    translations: ans.translations || {
                        ar: ans.text,
                        tn: ans.text,
                        fr: ans.text,
                        en: ans.text
                    }
                }))
            };
            document.getElementById("pf-edit-json-text").value = JSON.stringify(currentJson, null, 4);

            // 5. Show modal
            document.getElementById("play-fix-modal").style.display = "flex";
        });
    }

    // Form and JSON Tab switcher bindings
    const btnPfTabForm = document.getElementById("btn-pf-tab-form");
    const btnPfTabJson = document.getElementById("btn-pf-tab-json");
    if (btnPfTabForm && btnPfTabJson) {
        btnPfTabForm.addEventListener("click", () => {
            playSynthSfx("click");
            document.getElementById("pf-form-editor-view").style.display = "block";
            document.getElementById("pf-json-editor-view").style.display = "none";
            btnPfTabForm.style.background = "var(--primary)";
            btnPfTabForm.style.color = "black";
            btnPfTabJson.style.background = "rgba(255,255,255,0.1)";
            btnPfTabJson.style.color = "white";
        });

        btnPfTabJson.addEventListener("click", () => {
            playSynthSfx("click");
            document.getElementById("pf-form-editor-view").style.display = "none";
            document.getElementById("pf-json-editor-view").style.display = "block";
            btnPfTabJson.style.background = "var(--primary)";
            btnPfTabJson.style.color = "black";
            btnPfTabForm.style.background = "rgba(255,255,255,0.1)";
            btnPfTabForm.style.color = "white";
        });
    }

    // Copy AI Prompt helper binding
    const btnPfCopyPrompt = document.getElementById("btn-pf-copy-prompt");
    if (btnPfCopyPrompt) {
        btnPfCopyPrompt.addEventListener("click", () => {
            playSynthSfx("click");
            
            // Build categories and subcategories constraints
            let categoryRules = "";
            dbCategories.forEach(cat => {
                const subcatsList = cat.subcategories.map(s => s.name).join(", ");
                categoryRules += `* "${cat.name}": [${subcatsList}]\n`;
            });

            const promptText = `You are a question editor assistant for the "El Quizz" Tunisian cultural game.
Your task is to modify the question JSON data provided below according to user instructions.

CRITICAL SCHEMA CONSTRAINTS:
1. "category" MUST be exactly one of: [${dbCategories.map(c => `"${c.name}"`).join(", ")}]
2. "subcategory" MUST be exactly one of the valid subcategories for the selected category:
${categoryRules}
3. The "answers" array MUST contain exactly 10 answers (9 correct, 1 wrong/trap).
4. The 9 correct answers MUST have points matching Fibonacci weights: [1, 1, 1, 2, 2, 3, 3, 5, 8]. The incorrect/trap answer MUST have points: 0.
5. All texts MUST be appropriate for Tunisian cultural context.
6. Return ONLY the modified JSON object. No explanations, no markdown blocks.

Here is the JSON to modify:
${document.getElementById("pf-edit-json-text").value}`;

            navigator.clipboard.writeText(promptText).then(() => {
                const originalText = btnPfCopyPrompt.innerHTML;
                btnPfCopyPrompt.innerHTML = "Copied! ✓";
                btnPfCopyPrompt.style.borderColor = "#10b981";
                btnPfCopyPrompt.style.color = "#10b981";
                setTimeout(() => {
                    btnPfCopyPrompt.innerHTML = originalText;
                    btnPfCopyPrompt.style.borderColor = "var(--primary)";
                    btnPfCopyPrompt.style.color = "var(--primary)";
                }, 2000);
            }).catch(err => {
                alert("Failed to copy text: " + err);
            });
        });
    }

    // Play & Fix Cancel Button
    const btnPfCancel = document.getElementById("btn-pf-cancel");
    if (btnPfCancel) {
        btnPfCancel.addEventListener("click", () => {
            playSynthSfx("click");
            document.getElementById("play-fix-modal").style.display = "none";
            // Resume countdown
            startTimerCountdown();
        });
    }

    // Play & Fix Save Button
    const btnPfSave = document.getElementById("btn-pf-save");
    if (btnPfSave) {
        btnPfSave.addEventListener("click", () => {
            playSynthSfx("click");
            
            const q = gameState.activeQuestion;
            const activeTeam = teams[gameState.currentTeamIndex];
            const isJsonActive = document.getElementById("pf-json-editor-view").style.display === "block";

            if (isJsonActive) {
                // 1. Direct JSON Save
                const jsonText = document.getElementById("pf-edit-json-text").value.trim();
                let parsed;
                try {
                    parsed = JSON.parse(jsonText);
                } catch (e) {
                    alert("Invalid JSON format! Please check comma placements and key quotes.\nError: " + e.message);
                    return;
                }

                // Simple JSON Schema validations
                if (!parsed.translations || typeof parsed.translations !== "object") {
                    alert("Validation Error: 'translations' object is missing or invalid.");
                    return;
                }
                if (!parsed.answers || !Array.isArray(parsed.answers) || parsed.answers.length !== 10) {
                    alert("Validation Error: 'answers' must be an array of exactly 10 options.");
                    return;
                }

                // Sync basic data
                q.category = parsed.category || q.category;
                q.subcategory = parsed.subcategory || q.subcategory;
                q.difficulty = parsed.difficulty || q.difficulty;
                q.region = parsed.region || q.region;
                q.translations = parsed.translations;

                // Sync main text helper for compatibility
                if (parsed.translations[gameState.language]) {
                    q.text = parsed.translations[gameState.language];
                } else if (parsed.translations.ar) {
                    q.text = parsed.translations.ar;
                }

                // Sync scores
                activeTeam.score = parseInt(parsed.team_score) || 0;
                gameState.pointsGainedThisTurn = parseInt(parsed.turn_score) || 0;
                document.getElementById("round-current-score").textContent = gameState.pointsGainedThisTurn;

                // Sync answers list
                localShuffledAnswers = parsed.answers.map((ans, idx) => {
                    const originalAns = localShuffledAnswers[idx] || {};
                    return {
                        ...originalAns,
                        points: parseInt(ans.points) || 0,
                        is_correct: !!ans.is_correct,
                        translations: ans.translations || { ar: ans.text || "" },
                        text: (ans.translations && ans.translations[gameState.language]) || ans.text || ""
                    };
                });

                q.answers = [...localShuffledAnswers];
            } else {
                // 2. Form Fields Save
                // Save Question Text
                const newQText = document.getElementById("pf-edit-q-text").value.trim();
                if (newQText) {
                    if (typeof q.text === 'string') {
                        q.text = newQText;
                    } else if (q.translations) {
                        q.translations[gameState.language] = newQText;
                    } else {
                        q.text = newQText;
                    }
                }

                // Save Scores
                const newTeamScore = parseInt(document.getElementById("pf-edit-team-score").value) || 0;
                const newTurnScore = parseInt(document.getElementById("pf-edit-turn-score").value) || 0;
                
                activeTeam.score = newTeamScore;
                gameState.pointsGainedThisTurn = newTurnScore;
                document.getElementById("round-current-score").textContent = gameState.pointsGainedThisTurn;

                // Save Answers List
                const answersContainer = document.getElementById("pf-answers-list-container");
                const textInputs = answersContainer.querySelectorAll(".pf-ans-text");
                const pointsInputs = answersContainer.querySelectorAll(".pf-ans-points");
                const correctnessSelects = answersContainer.querySelectorAll(".pf-ans-correctness");

                textInputs.forEach((input) => {
                    const idx = parseInt(input.getAttribute("data-index"));
                    const textVal = input.value.trim();
                    const pointsVal = parseInt(pointsInputs[idx].value) || 0;
                    const isCorrectVal = correctnessSelects[idx].value === "true";

                    const ans = localShuffledAnswers[idx];
                    ans.points = pointsVal;
                    ans.is_correct = isCorrectVal;
                    if (typeof ans.text === 'string') {
                        ans.text = textVal;
                    } else if (ans.translations) {
                        ans.translations[gameState.language] = textVal;
                    } else {
                        ans.text = textVal;
                    }
                });

                q.answers = [...localShuffledAnswers];
            }

            // 4. Update the gameboard cards visually with the new texts and styles!
            const answersGrid = document.getElementById("answers-grid");
            answersGrid.innerHTML = "";

            localShuffledAnswers.forEach((ans, index) => {
                const card = document.createElement("div");
                const isRevealed = gameState.guessedAnswerIds.has(index);
                card.id = `ans-card-${index}`;
                
                const ansText = getAnswerText(ans, gameState.language);
                const trapLabel = (gameState.language === "ar" || gameState.language === "tn") ? "فخ" : (gameState.language === "fr" ? "PIÈGE" : "TRAP");

                if (isRevealed) {
                    if (ans.is_correct) {
                        card.className = "answer-card correct";
                        card.innerHTML = `
                            <div class="answer-details">
                                <span class="answer-text">${ansText}</span>
                                <span class="answer-points-badge">+${ans.points}</span>
                            </div>
                        `;
                    } else {
                        card.className = "answer-card incorrect";
                        card.innerHTML = `
                            <div class="answer-details" style="color: #ffcccc;">
                                <span class="answer-text">${ansText}</span>
                                <span class="answer-points-badge" style="background: rgba(255,0,0,0.25);">-5</span>
                            </div>
                        `;
                    }
                } else {
                    card.className = "answer-card unrevealed";
                    if (ans.is_correct) {
                        card.innerHTML = `
                            <div class="answer-details unrevealed">
                                <span class="answer-text">${ansText}</span>
                                <span class="answer-points-badge">${ans.points}</span>
                            </div>
                        `;
                    } else {
                        card.innerHTML = `
                            <div class="answer-details unrevealed distractor-unrevealed">
                                <span class="answer-text">${ansText}</span>
                                <span class="answer-points-badge" style="color: var(--accent-red)">${trapLabel}</span>
                            </div>
                        `;
                    }
                }
                
                card.addEventListener("click", () => {
                    handleAnswerReveal(card, ans, index);
                });

                answersGrid.appendChild(card);
            });

            // Update main question text displayed on screen in case it changed
            document.getElementById("round-question-text").textContent = getQuestionText(q, gameState.language);

            // Sync modifications back to backend PostgreSQL database if online
            if (q.id) {
                const dbPayload = {
                    category: q.category,
                    subcategory: q.subcategory || null,
                    region: q.region || "Tunisia",
                    difficulty: q.difficulty || 3,
                    generation: q.generation || "All",
                    translations: q.translations || { ar: q.text },
                    answers: localShuffledAnswers.map(ans => ({
                        is_correct: ans.is_correct,
                        points: ans.points,
                        translations: ans.translations || { ar: ans.text }
                    }))
                };
                
                fetch(`${BACKEND_URL}/api/questions/${q.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dbPayload)
                })
                .then(res => {
                    if (res.ok) {
                        console.log(`Successfully updated question ID #${q.id} in backend database.`);
                    } else {
                        console.warn(`Failed to update question ID #${q.id} in database (HTTP status ${res.status}).`);
                    }
                })
                .catch(err => {
                    console.warn("Could not reach backend database to save modifications:", err);
                });
            }

            // 5. Hide modal & resume timer
            document.getElementById("play-fix-modal").style.display = "none";
            saveLocalGameState();
            startTimerCountdown();
        });
    }

    // Question Feedback event listeners
    let selectedRating = null;
    const feedbackButtons = document.querySelectorAll(".feedback-btn");
    feedbackButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            playSynthSfx("click");
            selectedRating = btn.getAttribute("data-rating");
            
            // Highlight selected rating
            feedbackButtons.forEach(b => {
                b.style.transform = "none";
                b.style.background = "none";
            });
            btn.style.transform = "scale(1.3)";
            btn.style.background = "rgba(255,255,255,0.15)";
            btn.style.borderRadius = "50%";

            const commentSection = document.getElementById("comment-input-section");
            const isCommentOpen = commentSection && commentSection.style.display === "block";

            // If comment section is closed, submit rating immediately!
            if (!isCommentOpen) {
                submitFeedbackToServer(selectedRating, "");
            }
        });
    });

    const btnToggleComment = document.getElementById("btn-toggle-comment");
    if (btnToggleComment) {
        btnToggleComment.addEventListener("click", () => {
            playSynthSfx("click");
            const commentSection = document.getElementById("comment-input-section");
            if (commentSection) {
                const isOpen = commentSection.style.display === "block";
                commentSection.style.display = isOpen ? "none" : "block";
            }
        });
    }

    const btnSubmitFeedback = document.getElementById("btn-submit-feedback");
    if (btnSubmitFeedback) {
        btnSubmitFeedback.addEventListener("click", () => {
            playSynthSfx("click");
            const commentText = document.getElementById("feedback-comment-text").value.trim();
            const rating = selectedRating || "meh";
            submitFeedbackToServer(rating, commentText);
        });
    }

    function submitFeedbackToServer(rating, comment) {
        if (!gameState.activeQuestion || !gameState.activeQuestion.id) return;
        const qId = gameState.activeQuestion.id;
        
        const payload = {
            rating: rating,
            comment: comment || null
        };
        
        fetch(`${BACKEND_URL}/api/questions/${qId}/feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(() => {
            document.getElementById("graph-feedback-card").style.display = "none";
            document.getElementById("feedback-thanks-card").style.display = "block";
        })
        .catch(err => {
            console.warn("Failed to submit feedback:", err);
            // Local visual fallback if offline
            document.getElementById("graph-feedback-card").style.display = "none";
            document.getElementById("feedback-thanks-card").style.display = "block";
        });
    }
}

/* --------------------------------------------------
 * Setup Screen Renderers
 * -------------------------------------------------- */
function renderTeamsSetup() {
    const container = document.getElementById("teams-setup-container");
    container.innerHTML = "";
    
    const translation = UI_TRANSLATIONS[gameState.language];
    const defaultTeamNames = translation.default_team_names || ["فريق الهريسة", "فريق الشاشية", "فريق الزيتون", "فريق الفخّار", "فريق الياسمين"];
    const symbolLabel = translation.team_symbol_lbl || "الرمز";
    const nameInputLabel = translation.team_name_lbl || "اسم الفريق";

    for (let i = 0; i < gameConfig.teamsCount; i++) {
        const defaultName = defaultTeamNames[i] || `${nameInputLabel} ${i + 1}`;
        const defaultIcon = TEAM_ICONS[i % TEAM_ICONS.length];

        const card = document.createElement("div");
        card.className = "team-card-setup";
        card.innerHTML = `
            <div class="team-icon-picker">
                <span class="team-input-label">${symbolLabel}</span>
                <div class="picker-trigger" id="picker-trigger-${i}" data-index="${i}">${defaultIcon}</div>
            </div>
            
            <div class="team-name-input-wrapper">
                <span class="team-input-label">${nameInputLabel} ${i + 1}</span>
                <input type="text" id="team-name-${i}" class="team-name-input" value="${defaultName}" maxlength="20">
            </div>
        `;
        container.appendChild(card);

        // Popover Icon picker hook
        const trigger = card.querySelector(`.picker-trigger`);
        trigger.addEventListener("click", (e) => {
            playSynthSfx("click");
            openIconPicker(e, i);
        });
    }
}

// Icon Popover Modal Manager
let activePopover = null;
function openIconPicker(e, teamIndex) {
    if (activePopover) {
        activePopover.remove();
    }

    const popover = document.createElement("div");
    popover.className = "icon-popover";
    popover.innerHTML = TEAM_ICONS.map(icon => `
        <span class="popover-icon">${icon}</span>
    `).join("");

    // Align popover near clicked trigger
    const rect = e.target.getBoundingClientRect();
    popover.style.top = `${window.scrollY + rect.bottom + 8}px`;
    popover.style.left = `${window.scrollX + rect.left}px`;
    document.body.appendChild(popover);
    activePopover = popover;

    // Handle pick
    popover.querySelectorAll(".popover-icon").forEach(item => {
        item.addEventListener("click", () => {
            playSynthSfx("click");
            e.target.textContent = item.textContent;
            popover.remove();
            activePopover = null;
        });
    });

    // Close when clicking outside
    setTimeout(() => {
        window.addEventListener("click", function outerClick(ev) {
            if (activePopover && !popover.contains(ev.target) && ev.target !== e.target) {
                popover.remove();
                activePopover = null;
                window.removeEventListener("click", outerClick);
            }
        });
    }, 100);
}

function saveTeamsSetup() {
    teams = [];
    for (let i = 0; i < gameConfig.teamsCount; i++) {
        const fallbackPrefix = UI_TRANSLATIONS[gameState.language].team_fallback || "Team";
        const name = document.getElementById(`team-name-${i}`).value.trim() || `${fallbackPrefix} ${i + 1}`;
        const icon = document.getElementById(`picker-trigger-${i}`).textContent;
        teams.push({
            name: name,
            icon: icon,
            score: 0,
            roundScoresHistory: [] // points gained per round index
        });
    }
}

/* --------------------------------------------------
 * Game Engine Execution & Loops
 * -------------------------------------------------- */
function initGameEngine() {
    gameState.currentRound = 1;
    gameState.currentTeamIndex = 0;
    gameState.roundQuestionsUsed.clear();
    
    // Set scores to zero
    teams.forEach(t => {
        t.score = 0;
        t.roundScoresHistory = [];
    });

    prepareIntroScreen();
}

// Pre-round turn presenter screen
function prepareIntroScreen() {
    // Stop round timers
    clearInterval(gameState.timerInterval);
    
    const activeTeam = teams[gameState.currentTeamIndex];
    document.getElementById("intro-round-num").textContent = gameState.currentRound;
    document.getElementById("intro-team-icon").textContent = activeTeam.icon;
    document.getElementById("intro-team-name").textContent = activeTeam.name;

    // Pick a question matching configured categories & subcategories
    const availableQuestions = QUESTIONS_DB.filter(q => {
        const subcatKey = `${q.category}:${q.subcategory || "General"}`;
        return gameConfig.selectedSubcategories.includes(subcatKey) && !gameState.roundQuestionsUsed.has(q.id);
    });

    let selectedQ;
    if (availableQuestions.length > 0) {
        selectedQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    } else {
        // Fallback if we ran out of questions
        selectedQ = QUESTIONS_DB[Math.floor(Math.random() * QUESTIONS_DB.length)];
    }

    gameState.activeQuestion = selectedQ;
    gameState.roundQuestionsUsed.add(selectedQ.id);

    const catLabelIntro = categoryTranslations[selectedQ.category] ? categoryTranslations[selectedQ.category][gameState.language] : selectedQ.category;
    const subcatLabelIntro = getTranslatedSubcategory(selectedQ.subcategory, gameState.language);
    document.getElementById("intro-question-category").textContent = `${catLabelIntro} • ${subcatLabelIntro}`;
    document.getElementById("intro-question-text").textContent = getQuestionText(selectedQ, gameState.language);

    showScreen("screen-intro");
}

// Round board trigger
function startActiveGameboard() {
    const activeTeam = teams[gameState.currentTeamIndex];
    const q = gameState.activeQuestion;
    
    gameState.timerVal = gameConfig.roundDuration || 60;
    gameState.wrongGuessesCount = 0;
    gameState.guessedAnswerIds.clear();
    gameState.pointsGainedThisTurn = 0;

    // Setup active details
    document.getElementById("round-active-icon").textContent = activeTeam.icon;
    document.getElementById("round-active-name").textContent = activeTeam.name;
    document.getElementById("round-current-score").textContent = "0";

    const btnPlayFixEdit = document.getElementById("btn-play-fix-edit");
    if (btnPlayFixEdit) {
        btnPlayFixEdit.style.display = gameState.playAndFix ? "inline-block" : "none";
    }

    const catLabelBoard = categoryTranslations[q.category] ? categoryTranslations[q.category][gameState.language] : q.category;
    const subcatLabelBoard = getTranslatedSubcategory(q.subcategory, gameState.language);
    document.getElementById("round-question-category").textContent = `${catLabelBoard} • ${subcatLabelBoard}`;
    document.getElementById("round-question-text").textContent = getQuestionText(q, gameState.language);

    // Draw Answer cards board
    const answersGrid = document.getElementById("answers-grid");
    answersGrid.innerHTML = "";

    // Shuffle options so distractor is placed randomly
    localShuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);

    localShuffledAnswers.forEach((ans, index) => {
        const card = document.createElement("div");
        card.className = "answer-card unrevealed";
        card.id = `ans-card-${index}`;
        
        const ansText = getAnswerText(ans, gameState.language);
        const trapLabel = (gameState.language === "ar" || gameState.language === "tn") ? "فخ" : (gameState.language === "fr" ? "PIÈGE" : "TRAP");

        if (ans.is_correct) {
            card.innerHTML = `
                <div class="answer-details unrevealed">
                    <span class="answer-text">${ansText}</span>
                    <span class="answer-points-badge">${ans.points}</span>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="answer-details unrevealed distractor-unrevealed">
                    <span class="answer-text">${ansText}</span>
                    <span class="answer-points-badge" style="color: var(--accent-red)">${trapLabel}</span>
                </div>
            `;
        }
        
        card.addEventListener("click", () => {
            handleAnswerReveal(card, ans, index);
        });

        answersGrid.appendChild(card);
    });

    // Reset strikes warning indicators
    renderStrikes();

    // Start SVG countdown circle animation
    startTimerCountdown();
    
    // Save local state persistence
    saveLocalGameState();

    showScreen("screen-round");
}

// Reveal logic for clicked answer card (Toggles between revealed and unrevealed)
function handleAnswerReveal(card, ans, index) {
    const ansText = getAnswerText(ans, gameState.language);
    const trapLabel = (gameState.language === "ar" || gameState.language === "tn") ? "فخ" : (gameState.language === "fr" ? "PIÈGE" : "TRAP");

    if (card.classList.contains("correct")) {
        // Toggle OFF correct answer
        card.classList.remove("correct");
        card.classList.add("unrevealed");
        playSynthSfx("click");
        
        gameState.guessedAnswerIds.delete(index);
        gameState.pointsGainedThisTurn = Math.max(0, gameState.pointsGainedThisTurn - ans.points);
        card.innerHTML = `
            <div class="answer-details unrevealed">
                <span class="answer-text">${ansText}</span>
                <span class="answer-points-badge">${ans.points}</span>
            </div>
        `;
        document.getElementById("round-current-score").textContent = gameState.pointsGainedThisTurn;
    } 
    else if (card.classList.contains("incorrect")) {
        // Toggle OFF incorrect answer (refund penalty, decrement strikes)
        card.classList.remove("incorrect");
        card.classList.add("unrevealed");
        playSynthSfx("click");
        
        gameState.wrongGuessesCount = Math.max(0, gameState.wrongGuessesCount - 1);
        gameState.pointsGainedThisTurn += 5; // Refund the -5 points penalty
        
        card.innerHTML = `
            <div class="answer-details unrevealed distractor-unrevealed">
                <span class="answer-text">${ansText}</span>
                <span class="answer-points-badge" style="color: var(--accent-red)">${trapLabel}</span>
            </div>
        `;
        document.getElementById("round-current-score").textContent = gameState.pointsGainedThisTurn;
        renderStrikes();
    }
    else {
        // Toggle ON: Reveal card
        card.classList.remove("unrevealed");
        if (ans.is_correct) {
            card.classList.add("correct");
            playSynthSfx("correct");
            
            gameState.guessedAnswerIds.add(index);
            gameState.pointsGainedThisTurn += ans.points;
            card.innerHTML = `
                <div class="answer-details">
                    <span class="answer-text">${ansText}</span>
                    <span class="answer-points-badge">+${ans.points}</span>
                </div>
            `;
        } else {
            card.classList.add("incorrect");
            playSynthSfx("wrong");
            
            gameState.wrongGuessesCount++;
            gameState.pointsGainedThisTurn = Math.max(0, gameState.pointsGainedThisTurn - 5);
            
            card.innerHTML = `
                <div class="answer-details" style="color: #ffcccc;">
                    <span class="answer-text">${ansText}</span>
                    <span class="answer-points-badge" style="background: rgba(255,0,0,0.25);">-5</span>
                </div>
            `;
            
            const app = document.getElementById("app");
            app.classList.add("shake");
            setTimeout(() => app.classList.remove("shake"), 400);
            
            renderStrikes();
        }
    }
    document.getElementById("round-current-score").textContent = gameState.pointsGainedThisTurn;
    saveLocalGameState();
}

function renderStrikes() {
    const strikesContainer = document.getElementById("strike-container");
    if (!strikesContainer) return;
    strikesContainer.innerHTML = "";
    for (let i = 0; i < gameState.wrongGuessesCount; i++) {
        const strike = document.createElement("span");
        strike.className = "strike-item";
        strike.textContent = "❌";
        strikesContainer.appendChild(strike);
    }
}

function startTimerCountdown() {
    const timerText = document.getElementById("timer-text");
    const timerBar = document.getElementById("timer-bar");
    
    timerText.textContent = gameState.timerVal;
    
    // SVG circular stroke length is 283 (approx. 2 * pi * r, r=45)
    timerBar.style.strokeDashoffset = 0;

    clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
        gameState.timerVal--;
        timerText.textContent = gameState.timerVal;

        // Circular offset decrement
        const maxTimer = gameConfig.roundDuration || 60;
        const offset = 283 - (gameState.timerVal / maxTimer) * 283;
        timerBar.style.strokeDashoffset = offset;

        // Visual warning when timer is running out
        if (gameState.timerVal <= 10) {
            timerText.style.color = "var(--accent-red)";
            timerBar.style.stroke = "var(--accent-red)";
        } else {
            timerText.style.color = "var(--accent-yellow)";
            timerBar.style.stroke = "var(--accent-yellow)";
        }

        if (gameState.timerVal <= 0) {
            clearInterval(gameState.timerInterval);
            playSynthSfx("wrong"); // Warning buzzer chime
            saveLocalGameState();
        }
    }, 1000);
}

function endTurnAndDisplayGraph(skipSave = false) {
    clearInterval(gameState.timerInterval);
    
    // Save round points for active team
    const activeTeam = teams[gameState.currentTeamIndex];
    activeTeam.score += gameState.pointsGainedThisTurn;
    activeTeam.roundScoresHistory.push(gameState.pointsGainedThisTurn);

    document.getElementById("graph-round-num").textContent = gameState.currentRound;
    
    // Draw SVG Standings Chart
    renderSVGPointsChart();

    // Reset feedback card UI states in case the user rates the new question
    const feedbackCard = document.getElementById("graph-feedback-card");
    const thanksCard = document.getElementById("feedback-thanks-card");
    const commentSection = document.getElementById("comment-input-section");
    const commentText = document.getElementById("feedback-comment-text");
    
    if (feedbackCard) feedbackCard.style.display = "block";
    if (thanksCard) thanksCard.style.display = "none";
    if (commentSection) commentSection.style.display = "none";
    if (commentText) commentText.value = "";
    
    // Reset selected emoji highlight
    const feedbackButtons = document.querySelectorAll(".feedback-btn");
    feedbackButtons.forEach(btn => {
        btn.style.transform = "none";
        btn.style.background = "none";
    });

    // Asynchronously submit question gameplay metrics back to PostgreSQL stats tables
    const q = gameState.activeQuestion;
    if (q && q.id) {
        const correctCount = localShuffledAnswers.filter((ans, idx) => gameState.guessedAnswerIds.has(idx) && ans.is_correct).length;
        const answeredIds = localShuffledAnswers.filter((ans, idx) => gameState.guessedAnswerIds.has(idx) && ans.id).map(ans => ans.id);
        
        const payload = {
            correct_guesses: correctCount,
            wrong_guesses: gameState.wrongGuessesCount,
            answered_ids: answeredIds
        };
        
        fetch(`${BACKEND_URL}/api/questions/${q.id}/play-stats`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).catch(err => console.warn("Failed to report gameplay stats:", err));
    }
    
    if (!skipSave) {
        saveLocalGameState();
    }
    
    showScreen("screen-graph");
}

/* --------------------------------------------------
 * SVG Standings Graph
 * -------------------------------------------------- */
function renderSVGPointsChart() {
    const chart = document.getElementById("points-chart");
    chart.innerHTML = ""; // Clear

    // Define linear gradient colors in SVG defs
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="var(--primary)" />
            <stop offset="100%" stop-color="var(--secondary)" />
        </linearGradient>
    `;
    chart.appendChild(defs);

    const margin = { top: 40, right: 30, bottom: 50, left: 50 };
    const width = 400;
    const height = 300;
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    // Draw horizontal grid lines and vertical labels
    const maxScore = Math.max(...teams.map(t => t.score), 10); // scale target
    const gridCount = 4;

    for (let i = 0; i <= gridCount; i++) {
        const val = Math.round((maxScore / gridCount) * i);
        const y = margin.top + chartH - (chartH / gridCount) * i;

        // Grid line
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", margin.left);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width - margin.right);
        line.setAttribute("y2", y);
        line.setAttribute("class", "chart-grid-line");
        chart.appendChild(line);

        // Y-axis label
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", margin.left - 12);
        txt.setAttribute("y", y + 4);
        txt.setAttribute("class", "chart-text");
        txt.setAttribute("style", "text-anchor: end; font-family: var(--font-en); font-weight: 600;");
        txt.textContent = val;
        chart.appendChild(txt);
    }

    // Draw bars for each team
    const barWidth = Math.min(50, chartW / (teams.length * 1.5));
    const gap = (chartW - barWidth * teams.length) / (teams.length + 1);

    teams.forEach((team, idx) => {
        const score = team.score;
        const barH = (score / maxScore) * chartH;
        const x = margin.left + gap + idx * (barWidth + gap);
        const y = margin.top + chartH - barH;

        // Rectangle bar
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        // Start from floor level for transition animation
        rect.setAttribute("y", margin.top + chartH);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", 0);
        rect.setAttribute("class", "chart-bar");
        chart.appendChild(rect);

        // Animate rectangle height and y-coordinate
        setTimeout(() => {
            rect.setAttribute("y", y);
            rect.setAttribute("height", barH);
        }, 100 + idx * 100);

        // Icon + Name under the bar
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", x + barWidth / 2);
        label.setAttribute("y", margin.top + chartH + 20);
        label.setAttribute("class", "chart-text");
        label.textContent = `${team.icon} ${team.name}`;
        chart.appendChild(label);

        // Gained points text above the bar
        const valText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        valText.setAttribute("x", x + barWidth / 2);
        valText.setAttribute("y", y - 10);
        valText.setAttribute("class", "chart-score-text");
        valText.textContent = `+${team.roundScoresHistory[team.roundScoresHistory.length - 1]}`;
        chart.appendChild(valText);
    });
}

/* --------------------------------------------------
 * Rotation & Final Leaderboard
 * -------------------------------------------------- */
function rotateTurnOrComplete() {
    gameState.currentTeamIndex++;
    
    // Check if round finished (all teams have answered)
    if (gameState.currentTeamIndex >= teams.length) {
        gameState.currentTeamIndex = 0;
        gameState.currentRound++;

        // Check if game complete
        if (gameState.currentRound > gameConfig.rounds) {
            clearLocalGameState();
            renderFinalPodium();
            return;
        }
    }

    saveLocalGameState();
    prepareIntroScreen();
}

function renderFinalPodium() {
    const rowsContainer = document.getElementById("podium-rows");
    rowsContainer.innerHTML = "";

    // Sort teams by final score (rankings)
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

    sortedTeams.forEach((team, index) => {
        let rankClass = "";
        let rankMedal = index + 1;
        
        if (index === 0) {
            rankClass = "first-place";
            rankMedal = "🥇";
        } else if (index === 1) {
            rankClass = "second-place";
            rankMedal = "🥈";
        } else if (index === 2) {
            rankClass = "third-place";
            rankMedal = "🥉";
        }

        const row = document.createElement("div");
        row.className = `leaderboard-row ${rankClass}`;
        row.innerHTML = `
            <div class="rank-col">
                <span class="rank-badge">${rankMedal}</span>
            </div>
            <div class="team-info-col">
                <span class="team-avatar-mini">${team.icon}</span>
                <span class="team-name-col">${team.name}</span>
            </div>
            <div class="score-col">${team.score} ${UI_TRANSLATIONS[gameState.language].score_badge_points || "نقطة"}</div>
        `;
        rowsContainer.appendChild(row);
    });

    showScreen("screen-podium");
    startConfetti();
    
    // Play double victory chimes
    playSynthSfx("correct");
    setTimeout(() => {
        playSynthSfx("correct");
    }, 220);
}

let confettiAnimationId = null;
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Resize canvas to container
    canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    
    const colors = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
    const particles = [];
    
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0
        });
    }
    
    cancelAnimationFrame(confettiAnimationId);
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let remaining = false;
        particles.forEach((p) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2.5;
            p.x += Math.sin(p.tiltAngle) * 0.5;
            p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 5;
            
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
            
            if (p.y < canvas.height) {
                remaining = true;
            } else {
                p.x = Math.random() * canvas.width;
                p.y = -20;
                p.tilt = Math.random() * 10 - 5;
                remaining = true;
            }
        });
        
        if (remaining) {
            confettiAnimationId = requestAnimationFrame(draw);
        }
    }
    
    draw();
}

/* --------------------------------------------------
 * Online Showdown System (WebSockets Room Client)
 * -------------------------------------------------- */
let onlineSocket = null;
let onlinePlayerName = "";
let onlineRoomCode = "";
let onlineIsHost = false;
let onlineLobbyData = null;
let onlineGameState = null;
let onlineNextButtonGrayed = false;

async function requestCreateRoom() {
    try {
        const username = document.getElementById("online-username").value.trim();
        if (!username) {
            alert((gameState.language === "ar" || gameState.language === "tn") ? "الرجاء إدخال اسم مستعار!" : "Please enter a nickname!");
            return;
        }
        
        const res = await fetch(`${BACKEND_URL}/api/online/create`, { method: "POST" });
        if (res.ok) {
            const data = await res.json();
            onlinePlayerName = username;
            onlineRoomCode = data.room_code;
            connectToRoomSocket();
        } else {
            alert("Failed to create room on backend.");
        }
    } catch (err) {
        alert("Failed to contact the backend API. Verify it is running.");
    }
}

async function requestJoinRoom() {
    const username = document.getElementById("online-username").value.trim();
    const code = document.getElementById("online-room-code").value.trim().toUpperCase();
    if (!username) {
        alert((gameState.language === "ar" || gameState.language === "tn") ? "الرجاء إدخال اسم مستعار!" : "Please enter a nickname!");
        return;
    }
    if (!code) {
        alert((gameState.language === "ar" || gameState.language === "tn") ? "الرجاء إدخال رمز الغرفة!" : "Please enter a room code!");
        return;
    }
    
    onlinePlayerName = username;
    onlineRoomCode = code;
    connectToRoomSocket();
}

function connectToRoomSocket() {
    if (onlineSocket) {
        onlineSocket.close();
    }
    
    onlineSocket = new WebSocket(`${WS_URL}/ws/online/${onlineRoomCode}/${encodeURIComponent(onlinePlayerName)}`);
    
    onlineSocket.onopen = () => {
        console.log("Connected to room socket:", onlineRoomCode);
    };
    
    onlineSocket.onmessage = handleOnlineMessage;
    
    onlineSocket.onclose = () => {
        console.log("Room socket closed.");
        onlineSocket = null;
        gameState.onlineMode = false;
        showScreen("screen-home");
    };
}

function handleOnlineMessage(e) {
    const msg = JSON.parse(e.data);
    
    if (msg.type === "error") {
        alert("Error: " + msg.message);
        return;
    }
    
    if (msg.type === "lobby_update") {
        onlineLobbyData = msg;
        onlineRoomCode = msg.room_code;
        onlineIsHost = (onlinePlayerName === msg.hostName);
        gameState.onlineMode = true;
        
        document.getElementById("lobby-code-display").textContent = onlineRoomCode;
        renderLobbyPlayers();
        renderLobbyConfigControls();
        showScreen("screen-online-lobby");
    }
    
    else if (msg.type === "game_state_update") {
        onlineGameState = msg;
        gameState.onlineMode = true;
        
        // Match client values with synced state
        teams = msg.teams_list;
        gameState.currentRound = msg.current_round;
        gameState.currentTeamIndex = msg.current_team_index;
        gameState.wrongGuessesCount = msg.wrong_guesses_count;
        gameState.pointsGainedThisTurn = msg.points_gained_this_turn;
        gameState.timerVal = msg.timer_val;
        gameState.activeQuestion = msg.active_question;
        
        if (msg.state === "INTRO") {
            renderOnlineIntroScreen(msg);
        } else if (msg.state === "ROUND") {
            renderOnlineGameboard(msg);
        } else if (msg.state === "TURN_OVER") {
            renderOnlineTurnOverScreen(msg);
        } else if (msg.state === "STANDINGS") {
            renderOnlineStandingsScreen(msg);
        } else if (msg.state === "PODIUM") {
            renderOnlinePodiumScreen(msg);
        }
    }
    
    else if (msg.type === "timer_tick") {
        gameState.timerVal = msg.val;
        const timerText = document.getElementById("timer-text");
        const timerBar = document.getElementById("timer-bar");
        if (timerText) timerText.textContent = msg.val;
        if (timerBar) {
            const offset = 283 - (msg.val / 60) * 283;
            timerBar.style.strokeDashoffset = offset;
            if (msg.val <= 10) {
                timerText.style.color = "var(--accent-red)";
                timerBar.style.stroke = "var(--accent-red)";
            } else {
                timerText.style.color = "var(--accent-yellow)";
                timerBar.style.stroke = "var(--accent-yellow)";
            }
        }
    }
    
    else if (msg.type === "timer_expired") {
        playSynthSfx("wrong");
    }
    
    else if (msg.type === "shake_board") {
        const app = document.getElementById("app");
        if (app) {
            playSynthSfx("wrong");
            app.classList.add("shake");
            setTimeout(() => app.classList.remove("shake"), 400);
        }
    }
}

function renderLobbyPlayers() {
    const container = document.getElementById("lobby-players-container");
    container.innerHTML = "";
    
    if (!onlineLobbyData || !onlineLobbyData.players) return;
    
    onlineLobbyData.players.forEach(p => {
        const card = document.createElement("div");
        card.className = "player-card-lobby";
        
        let roleBadge = "";
        if (p.role === "referee") {
            roleBadge = `<span class="player-lobby-role-badge role-badge-referee">Referee ⚖️</span>`;
        } else if (p.role === "spectator") {
            roleBadge = `<span class="player-lobby-role-badge role-badge-spectator">Spectator 👁️</span>`;
        } else {
            roleBadge = `<span class="player-lobby-role-badge role-badge-player">Team ${p.team_index + 1} 🛡️</span>`;
        }
        
        let selectHtml = "";
        if (onlineIsHost) {
            const maxTeams = parseInt(onlineLobbyData.config.teamsCount);
            let optionsHtml = `
                <option value="referee" ${p.role === 'referee' ? 'selected' : ''}>Referee</option>
                <option value="spectator" ${p.role === 'spectator' ? 'selected' : ''}>Spectator</option>
            `;
            for (let t = 0; t < maxTeams; t++) {
                optionsHtml += `<option value="${t}" ${p.role === 'player' && p.team_index === t ? 'selected' : ''}>Team ${t + 1}</option>`;
            }
            selectHtml = `
                <select class="team-lobby-select" data-name="${p.name}">
                    ${optionsHtml}
                </select>
            `;
        }
        
        card.innerHTML = `
            <div class="player-lobby-name">
                <span>👤</span>
                <strong>${p.name}</strong>
                ${roleBadge}
            </div>
            ${selectHtml}
        `;
        
        if (onlineIsHost) {
            const select = card.querySelector(".team-lobby-select");
            select.addEventListener("change", () => {
                const currentAssignments = {};
                document.querySelectorAll(".team-lobby-select").forEach(sel => {
                    const selName = sel.getAttribute("data-name");
                    currentAssignments[selName] = sel.value;
                });
                
                onlineSocket.send(JSON.stringify({
                    type: "assign_teams",
                    assignments: currentAssignments
                }));
            });
        }
        
        container.appendChild(card);
    });
}

function renderLobbyConfigControls() {
    const hostControls = document.getElementById("host-settings-controls");
    const guestWaiting = document.getElementById("guest-waiting-controls");
    const btnStart = document.getElementById("btn-start-online-game");
    
    if (onlineIsHost) {
        hostControls.style.display = "flex";
        guestWaiting.style.display = "none";
        btnStart.style.display = "inline-block";
        
        document.getElementById("online-rounds").value = onlineLobbyData.config.rounds;
        document.getElementById("online-teams-count").value = onlineLobbyData.config.teamsCount;
        document.getElementById("online-host-role").value = onlineLobbyData.config.hostRole;
        
        renderOnlineCategoriesAccordions();
    } else {
        hostControls.style.display = "none";
        guestWaiting.style.display = "block";
        btnStart.style.display = "none";
    }
}

function renderOnlineCategoriesAccordions() {
    const listContainer = document.getElementById("online-categories-list");
    if (listContainer.children.length > 0) return; // Only draw once
    
    const categoriesToRender = dbCategories.length > 0 ? dbCategories : extractCategoriesFromDB();
    
    listContainer.innerHTML = categoriesToRender.map((cat, idx) => {
        const catLabel = categoryTranslations[cat.name] ? categoryTranslations[cat.name][gameState.language] : cat.name;
        
        const subcatsList = [...cat.subcategories];
        if (!subcatsList.some(s => s.name === "General")) {
            subcatsList.unshift({ name: "General" });
        }
        
        const subcatCheckboxesHtml = subcatsList.map((sub, sIdx) => {
            const subLabel = getTranslatedSubcategory(sub.name, gameState.language);
            return `
                <label style="display: flex; gap: 0.5rem; align-items: center; cursor: pointer; font-size: 0.85rem; padding: 2px 0;">
                    <input type="checkbox" class="online-subcat-checkbox" data-category="${cat.name}" value="${sub.name}" checked>
                    <span>${subLabel}</span>
                </label>
            `;
        }).join("");
        
        return `
            <div style="margin-bottom: 0.75rem;">
                <label style="font-weight: bold; font-size: 0.9rem; color: var(--primary); display: flex; gap: 0.5rem; align-items: center;">
                    <input type="checkbox" class="online-parent-category-checkbox" value="${cat.name}" checked>
                    <span>${catLabel}</span>
                </label>
                <div style="padding-left: 1.25rem; display: flex; flex-direction: column; margin-top: 0.25rem;">
                    ${subcatCheckboxesHtml}
                </div>
            </div>
        `;
    }).join("");

    // Bind checkboxes click listeners
    listContainer.querySelectorAll(".online-subcat-checkbox").forEach(cb => {
        cb.addEventListener("change", sendOnlineLobbyConfig);
    });
    
    listContainer.querySelectorAll(".online-parent-category-checkbox").forEach(parentCb => {
        parentCb.addEventListener("change", (e) => {
            const isChecked = e.target.checked;
            const subCheckboxes = listContainer.querySelectorAll(`.online-subcat-checkbox[data-category="${e.target.value}"]`);
            subCheckboxes.forEach(scb => {
                scb.checked = isChecked;
            });
            sendOnlineLobbyConfig();
        });
    });
}

function sendOnlineLobbyConfig() {
    if (!onlineIsHost || !onlineSocket) return;
    
    const selectedSubcats = [];
    document.querySelectorAll(".online-subcat-checkbox:checked").forEach(cb => {
        const cat = cb.getAttribute("data-category");
        selectedSubcats.push(`${cat}:${cb.value}`);
    });
    
    const rounds = parseInt(document.getElementById("online-rounds").value);
    const teamsCount = parseInt(document.getElementById("online-teams-count").value);
    const hostRole = document.getElementById("online-host-role").value;
    
    onlineSocket.send(JSON.stringify({
        type: "update_config",
        config: {
            rounds: rounds,
            teamsCount: teamsCount,
            selectedSubcategories: selectedSubcats,
            hostRole: hostRole
        }
    }));
}

function renderOnlineIntroScreen(msg) {
    const activeTeam = teams[msg.current_team_index];
    const q = msg.active_question;
    
    document.getElementById("intro-round-num").textContent = msg.current_round;
    document.getElementById("intro-team-icon").textContent = activeTeam.icon;
    document.getElementById("intro-team-name").textContent = activeTeam.name;
    
    const catLabelIntro = categoryTranslations[q.category] ? categoryTranslations[q.category][gameState.language] : q.category;
    const subcatLabelIntro = getTranslatedSubcategory(q.subcategory, gameState.language);
    document.getElementById("intro-question-category").textContent = `${catLabelIntro} • ${subcatLabelIntro}`;
    document.getElementById("intro-question-text").textContent = getQuestionText(q, gameState.language);

    const btnStart = document.getElementById("btn-start-round");
    
    let helper = document.getElementById("intro-waiting-text");
    if (helper) helper.remove();
    
    if (msg.is_validator) {
        btnStart.style.display = "inline-block";
        btnStart.textContent = (gameState.language === "ar" || gameState.language === "tn") ? "اضغط للبدء (60 ثانية)" : "Start Turn (60s)";
    } else {
        btnStart.style.display = "none";
        
        helper = document.createElement("p");
        helper.id = "intro-waiting-text";
        helper.style = "font-weight: bold; color: var(--accent-yellow); margin-top: 1rem;";
        helper.textContent = `Waiting for validator to start the turn...`;
        btnStart.parentNode.appendChild(helper);
    }
    
    showScreen("screen-intro");
}

function renderOnlineGameboard(msg) {
    const activeTeam = teams[msg.current_team_index];
    document.getElementById("round-active-icon").textContent = activeTeam.icon;
    document.getElementById("round-active-name").textContent = activeTeam.name;
    document.getElementById("round-current-score").textContent = msg.points_gained_this_turn;

    const catLabelBoard = categoryTranslations[msg.active_question.category] ? categoryTranslations[msg.active_question.category][gameState.language] : msg.active_question.category;
    const subcatLabelBoard = getTranslatedSubcategory(msg.active_question.subcategory, gameState.language);
    document.getElementById("round-question-category").textContent = `${catLabelBoard} • ${subcatLabelBoard}`;
    document.getElementById("round-question-text").textContent = getQuestionText(msg.active_question, gameState.language);

    const answersGrid = document.getElementById("answers-grid");
    answersGrid.innerHTML = "";

    const trapLabel = (gameState.language === "ar" || gameState.language === "tn") ? "فخ" : (gameState.language === "fr" ? "PIÈGE" : "TRAP");

    msg.answers.forEach((ans, index) => {
        const card = document.createElement("div");
        card.className = "answer-card";
        
        const hasGuessed = msg.guessed_answer_ids.includes(index);
        
        if (msg.is_validator) {
            const ansText = getAnswerText(ans, gameState.language);
            if (ans.is_correct) {
                if (hasGuessed) {
                    card.classList.add("correct");
                    card.innerHTML = `
                        <div class="answer-details">
                            <span class="answer-text">${ansText}</span>
                            <span class="answer-points-badge">+${ans.points}</span>
                        </div>
                    `;
                } else {
                    card.classList.add("correct", "dimmed-referee");
                    card.innerHTML = `
                        <div class="answer-details">
                            <span class="answer-text" style="opacity: 0.6;">${ansText}</span>
                            <span class="answer-points-badge" style="opacity: 0.6;">${ans.points}</span>
                        </div>
                    `;
                }
            } else {
                if (msg.wrong_guesses_count > 0) {
                    card.classList.add("incorrect");
                    card.innerHTML = `
                        <div class="answer-details" style="color: #ffcccc;">
                            <span class="answer-text">${ansText}</span>
                            <span class="answer-points-badge" style="background: rgba(255,0,0,0.25);">-5</span>
                        </div>
                    `;
                } else {
                    card.classList.add("incorrect", "dimmed-referee");
                    card.innerHTML = `
                        <div class="answer-details" style="color: #ffcccc; opacity: 0.6;">
                            <span class="answer-text">${ansText}</span>
                            <span class="answer-points-badge" style="background: rgba(255,0,0,0.1);">${trapLabel}</span>
                        </div>
                    `;
                }
            }
            
            card.addEventListener("click", () => {
                onlineSocket.send(JSON.stringify({
                    type: "reveal_card",
                    index: index
                }));
            });
        } 
        else {
            card.classList.add("spectator-mode");
            if (ans.translations) {
                const ansText = getAnswerText(ans, gameState.language);
                if (ans.is_correct) {
                    card.classList.add("correct");
                    card.innerHTML = `
                        <div class="answer-details">
                            <span class="answer-text">${ansText}</span>
                            <span class="answer-points-badge">+${ans.points}</span>
                        </div>
                    `;
                } else {
                    card.classList.add("incorrect");
                    card.innerHTML = `
                        <div class="answer-details" style="color: #ffcccc;">
                            <span class="answer-text">${ansText}</span>
                            <span class="answer-points-badge" style="background: rgba(255,0,0,0.25);">-5</span>
                        </div>
                    `;
                }
            } else {
                if (hasGuessed) {
                    card.className = "answer-card correct spectator-mode";
                    card.innerHTML = `
                        <div class="answer-details">
                            <span class="answer-text" style="visibility: hidden;">Placeholder</span>
                            <span class="answer-points-badge">+${ans.points}</span>
                        </div>
                    `;
                } else {
                    card.className = "answer-card unrevealed spectator-mode";
                    card.innerHTML = `
                        <div class="answer-details-masked">
                            <div class="masked-circle-badge">${index + 1}</div>
                        </div>
                    `;
                }
            }
        }
        
        answersGrid.appendChild(card);
    });

    const strikesContainer = document.getElementById("strike-container");
    strikesContainer.innerHTML = "";
    for (let i = 0; i < msg.wrong_guesses_count; i++) {
        const strike = document.createElement("span");
        strike.className = "strike-item";
        strike.textContent = "❌";
        strikesContainer.appendChild(strike);
    }

    const btnComplete = document.getElementById("btn-round-complete");
    if (msg.is_validator) {
        btnComplete.style.display = "inline-block";
        btnComplete.textContent = (gameState.language === "ar" || gameState.language === "tn") ? "عرض النتائج ⏹️" : "Complete Turn ⏹️";
    } else {
        btnComplete.style.display = "none";
    }

    showScreen("screen-round");
}

function renderOnlineTurnOverScreen(msg) {
    renderOnlineGameboard(msg);
    
    const btnComplete = document.getElementById("btn-round-complete");
    if (btnComplete) btnComplete.style.display = "none";
    
    let btnNext = document.getElementById("btn-online-next-turn");
    if (!btnNext) {
        btnNext = document.createElement("button");
        btnNext.id = "btn-online-next-turn";
        btnNext.className = "btn btn-primary glow-btn";
        btnNext.style = "margin-top: 15px; padding: 12px 24px;";
        document.querySelector("#screen-round .actions-footer").appendChild(btnNext);
    }
    
    btnNext.textContent = (gameState.language === "ar" || gameState.language === "tn") ? "الموالي ➔" : "Next ➔";
    
    const isHost = (onlinePlayerName === msg.hostName);
    const isVal = msg.is_validator;
    
    if (isHost || isVal) {
        btnNext.style.display = "inline-block";
        
        if (!onlineNextButtonGrayed) {
            onlineNextButtonGrayed = true;
            btnNext.disabled = true;
            btnNext.style.opacity = "0.5";
            btnNext.style.cursor = "not-allowed";
            
            setTimeout(() => {
                btnNext.disabled = false;
                btnNext.style.opacity = "1";
                btnNext.style.cursor = "pointer";
            }, 1000);
        }
        
        btnNext.onclick = () => {
            playSynthSfx("click");
            onlineNextButtonGrayed = false;
            btnNext.remove();
            onlineSocket.send(JSON.stringify({ type: "next_step" }));
        };
    } else {
        btnNext.style.display = "none";
    }
}

function renderOnlineStandingsScreen(msg) {
    document.getElementById("graph-round-num").textContent = msg.current_round - 1;
    
    renderSVGPointsChart();
    
    const btnNext = document.getElementById("btn-graph-next");
    let helper = document.getElementById("graph-waiting-text");
    if (helper) helper.remove();
    
    const isHost = (onlinePlayerName === msg.hostName);
    if (isHost) {
        btnNext.style.display = "inline-block";
        btnNext.onclick = () => {
            playSynthSfx("click");
            onlineSocket.send(JSON.stringify({ type: "continue_from_standings" }));
        };
    } else {
        btnNext.style.display = "none";
        
        helper = document.createElement("p");
        helper.id = "graph-waiting-text";
        helper.style = "font-weight: bold; color: var(--accent-yellow); margin-top: 1rem; text-align: center;";
        helper.textContent = "Waiting for host to proceed...";
        btnNext.parentNode.appendChild(helper);
    }
    
    showScreen("screen-graph");
}

function renderOnlinePodiumScreen(msg) {
    renderFinalPodium();
    
    const btnRestart = document.getElementById("btn-restart");
    let helper = document.getElementById("podium-waiting-text");
    if (helper) helper.remove();
    
    const isHost = (onlinePlayerName === msg.hostName);
    if (isHost) {
        btnRestart.style.display = "inline-block";
        btnRestart.onclick = () => {
            playSynthSfx("click");
            onlineSocket.send(JSON.stringify({ type: "restart_game" }));
        };
    } else {
        btnRestart.style.display = "none";
        
        helper = document.createElement("p");
        helper.id = "podium-waiting-text";
        helper.style = "font-weight: bold; color: var(--accent-yellow); margin-top: 1rem; text-align: center;";
        helper.textContent = "Waiting for host to play again...";
        btnRestart.parentNode.appendChild(helper);
    }
}

function resumeLocalGame() {
    const dataStr = localStorage.getItem("EL_QUIZZ_ACTIVE_LOCAL_GAME");
    if (!dataStr) return;
    const data = JSON.parse(dataStr);
    
    gameConfig = data.gameConfig;
    teams = data.teams;
    localShuffledAnswers = data.localShuffledAnswers || [];
    
    gameState.language = data.gameState.language;
    gameState.currentRound = data.gameState.currentRound;
    gameState.currentTeamIndex = data.gameState.currentTeamIndex;
    gameState.roundQuestionsUsed = new Set(data.gameState.roundQuestionsUsed);
    gameState.activeQuestion = data.gameState.activeQuestion;
    gameState.timerVal = data.gameState.timerVal;
    gameState.wrongGuessesCount = data.gameState.wrongGuessesCount;
    gameState.guessedAnswerIds = new Set(data.gameState.guessedAnswerIds);
    gameState.pointsGainedThisTurn = data.gameState.pointsGainedThisTurn;
    gameState.playAndFix = data.gameState.playAndFix || false;
    
    const langSelect = document.getElementById("main-lang-select");
    if (langSelect) {
        langSelect.value = gameState.language;
        updateUILanguage(gameState.language);
    }
    
    const screenId = data.gameState.activeScreen;
    if (screenId === "screen-round") {
        rebuildActiveLocalGameboard();
    } else if (screenId === "screen-intro") {
        prepareIntroScreen();
    } else if (screenId === "screen-graph") {
        endTurnAndDisplayGraph(true);
    } else if (screenId === "screen-podium") {
        renderFinalPodium();
    } else {
        showScreen(screenId);
    }
}

function rebuildActiveLocalGameboard() {
    const activeTeam = teams[gameState.currentTeamIndex];
    const q = gameState.activeQuestion;
    
    document.getElementById("round-active-icon").textContent = activeTeam.icon;
    document.getElementById("round-active-name").textContent = activeTeam.name;
    document.getElementById("round-current-score").textContent = gameState.pointsGainedThisTurn;

    const btnPlayFixEdit = document.getElementById("btn-play-fix-edit");
    if (btnPlayFixEdit) {
        btnPlayFixEdit.style.display = gameState.playAndFix ? "inline-block" : "none";
    }

    const catLabelBoard = categoryTranslations[q.category] ? categoryTranslations[q.category][gameState.language] : q.category;
    const subcatLabelBoard = getTranslatedSubcategory(q.subcategory, gameState.language);
    document.getElementById("round-question-category").textContent = `${catLabelBoard} • ${subcatLabelBoard}`;
    document.getElementById("round-question-text").textContent = getQuestionText(q, gameState.language);

    const answersGrid = document.getElementById("answers-grid");
    answersGrid.innerHTML = "";

    localShuffledAnswers.forEach((ans, index) => {
        const card = document.createElement("div");
        card.className = "answer-card";
        card.id = `ans-card-${index}`;
        
        const ansText = getAnswerText(ans, gameState.language);
        const trapLabel = (gameState.language === "ar" || gameState.language === "tn") ? "فخ" : (gameState.language === "fr" ? "PIÈGE" : "TRAP");

        const hasGuessed = gameState.guessedAnswerIds.has(index);
        
        if (ans.is_correct) {
            if (hasGuessed) {
                card.classList.add("correct");
                card.innerHTML = `
                    <div class="answer-details">
                        <span class="answer-text">${ansText}</span>
                        <span class="answer-points-badge">+${ans.points}</span>
                    </div>
                `;
            } else {
                card.classList.add("unrevealed");
                card.innerHTML = `
                    <div class="answer-details unrevealed">
                        <span class="answer-text">${ansText}</span>
                        <span class="answer-points-badge">${ans.points}</span>
                    </div>
                `;
            }
        } else {
            // Trap
            if (gameState.wrongGuessesCount > 0) {
                card.classList.add("incorrect");
                card.innerHTML = `
                    <div class="answer-details" style="color: #ffcccc;">
                        <span class="answer-text">${ansText}</span>
                        <span class="answer-points-badge" style="background: rgba(255,0,0,0.25);">-5</span>
                    </div>
                `;
            } else {
                card.classList.add("unrevealed");
                card.innerHTML = `
                    <div class="answer-details unrevealed distractor-unrevealed">
                        <span class="answer-text">${ansText}</span>
                        <span class="answer-points-badge" style="color: var(--accent-red)">${trapLabel}</span>
                    </div>
                `;
            }
        }
        
        card.addEventListener("click", () => {
            handleAnswerReveal(card, ans, index);
        });

        answersGrid.appendChild(card);
    });

    renderStrikes();
    
    // Resume countdown timer if it was running
    if (gameState.timerVal > 0) {
        startTimerCountdown();
    } else {
        const timerText = document.getElementById("timer-text");
        const timerBar = document.getElementById("timer-bar");
        if (timerText) timerText.textContent = "0";
        if (timerBar) timerBar.style.strokeDashoffset = 283;
    }

    showScreen("screen-round");
}

/* --------------------------------------------------
 * Bent Waled (بنت ولد / Girl Boy) v1 Mode Logic
 * -------------------------------------------------- */

// Add Bent Waled properties to default gameState initialization if not present
gameState.mode = "talla3";
gameState.bwPlayMode = "solo"; // "solo" or "passplay"
gameState.bwSelectedCategories = [];
gameState.bwRoundDuration = 60;
gameState.bwActiveLetter = "";
gameState.bwAnswers = {};
gameState.bwScore = 0;
gameState.bwGrading = {};

// Pass & Play Specific properties
gameState.bwPlayers = [];
gameState.bwCurrentPlayerIndex = 0;
gameState.bwCurrentRound = 1;
gameState.bwMaxRounds = 3;

// Solo Specific properties
gameState.bwSoloStreak = 0;
gameState.bwSoloHighScore = 0;

// Arabic/Tunisian and Latin alphabets
const AR_ALPHABET = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];
const EN_ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W"];

function initBentWaledSetupScreen() {
    // Load Solo Stats
    gameState.bwSoloStreak = parseInt(localStorage.getItem("el_quizz_bw_streak") || "0");
    gameState.bwSoloHighScore = parseInt(localStorage.getItem("el_quizz_bw_highscore") || "0");
    
    const streakEl = document.getElementById("bw-solo-streak");
    const hsEl = document.getElementById("bw-solo-highscore");
    if (streakEl) streakEl.textContent = `${gameState.bwSoloStreak} 🔥`;
    if (hsEl) hsEl.textContent = `${gameState.bwSoloHighScore} pts`;

    // Render PlayMode tabs default states
    gameState.bwPlayMode = "solo";
    const tabSolo = document.getElementById("btn-bw-tab-solo");
    const tabPassPlay = document.getElementById("btn-bw-tab-passplay");
    const configSolo = document.getElementById("bw-config-solo");
    const configPassPlay = document.getElementById("bw-config-passplay");

    if (tabSolo && tabPassPlay) {
        tabSolo.style.background = "var(--primary)";
        tabSolo.style.color = "black";
        tabPassPlay.style.background = "rgba(255,255,255,0.1)";
        tabPassPlay.style.color = "white";
        configSolo.style.display = "block";
        configPassPlay.style.display = "none";
    }

    // Default categories checkboxes
    const checks = document.querySelectorAll(".bw-cat-check");
    checks.forEach(c => {
        c.checked = true;
        const label = c.closest(".bw-cat-card");
        if (label) label.classList.add("active-selected");
    });

    // Reset rounds to default 3
    gameState.bwMaxRounds = 3;
    const roundsSlider = document.getElementById("bw-rounds-count-range");
    const roundsLbl = document.getElementById("bw-rounds-count-lbl");
    if (roundsSlider && roundsLbl) {
        roundsSlider.value = 3;
        roundsLbl.textContent = "3 Rounds";
    }

    // Duration default
    gameState.bwRoundDuration = 60;
    const durSlider = document.getElementById("bw-duration-range");
    const durVal = document.getElementById("bw-duration-val");
    if (durSlider && durVal) {
        durSlider.value = 60;
        durVal.textContent = "60";
    }
}

// Pass & Play dynamic inputs builder
let bwPlayerNamesList = ["Ghaith", "Ahmed"];

function renderBwPlayersListInput() {
    const container = document.getElementById("bw-players-list-container");
    if (!container) return;
    container.innerHTML = "";

    bwPlayerNamesList.forEach((name, idx) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.gap = "8px";
        row.style.alignItems = "center";

        row.innerHTML = `
            <input type="text" class="bw-player-name-field" style="flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white;" value="${name}" placeholder="Player ${idx+1}">
            ${bwPlayerNamesList.length > 2 ? `<button type="button" class="btn btn-secondary btn-remove-player" style="padding: 8px 12px; font-weight: bold; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.4); color: #f87171;" data-index="${idx}">✕</button>` : ''}
        `;

        container.appendChild(row);
    });

    // Bind remove button clicks
    container.querySelectorAll(".btn-remove-player").forEach(btn => {
        btn.addEventListener("click", () => {
            playSynthSfx("click");
            const index = parseInt(btn.getAttribute("data-index"));
            bwPlayerNamesList.splice(index, 1);
            renderBwPlayersListInput();
        });
    });

    // Save inputs value to variable on change
    container.querySelectorAll(".bw-player-name-field").forEach((field, idx) => {
        field.addEventListener("change", () => {
            bwPlayerNamesList[idx] = field.value.trim();
        });
    });
}

function addBwPlayerInputField() {
    const count = bwPlayerNamesList.length;
    if (count >= 8) {
        alert("Maximum 8 players allowed!");
        return;
    }
    // Read current inputs before adding
    const fields = document.querySelectorAll(".bw-player-name-field");
    fields.forEach((f, i) => {
        bwPlayerNamesList[i] = f.value.trim();
    });

    bwPlayerNamesList.push(`Player ${count + 1}`);
    renderBwPlayersListInput();
}

function handleBentWaledStartButtonClick() {
    // Gather categories
    const checkBoxes = document.querySelectorAll(".bw-cat-check:checked");
    const selected = [];
    checkBoxes.forEach(cb => selected.push(cb.value));

    if (selected.length === 0) {
        const isAr = (gameState.language === "ar" || gameState.language === "tn");
        alert(isAr ? "الرجاء اختيار محور واحد على الأقل!" : "Please select at least one category!");
        return;
    }

    gameState.bwSelectedCategories = selected;

    if (gameState.bwPlayMode === "solo") {
        // Solo Game Start
        gameState.bwAnswers = {};
        gameState.bwGrading = {};
        gameState.bwScore = 0;
        
        // Go straight to Spinner Screen
        startBentWaledSpinnerPhase();
    } else {
        // Pass & Play Game Start
        // Update names list first from latest input fields
        const fields = document.querySelectorAll(".bw-player-name-field");
        const players = [];
        fields.forEach(f => {
            const val = f.value.trim();
            if (val) players.push(val);
        });

        if (players.length < 2) {
            alert("Please enter names for at least 2 players!");
            return;
        }

        bwPlayerNamesList = players;
        gameState.bwPlayers = players.map(name => ({ name, scores: [] }));
        gameState.bwCurrentPlayerIndex = 0;
        gameState.bwCurrentRound = 1;

        // Transition to Pass Phone Screen
        triggerBentWaledPassPhoneScreen();
    }
}

function triggerBentWaledPassPhoneScreen() {
    const activePlayer = gameState.bwPlayers[gameState.bwCurrentPlayerIndex];
    const trans = BW_TRANSLATIONS[gameState.language] || BW_TRANSLATIONS["en"];

    // Update screen headings
    const promptText = document.getElementById("bw-pass-prompt");
    if (promptText) {
        promptText.innerHTML = (trans.pass_prompt || "Pass the phone to <span id='bw-pass-player-name' style='color: var(--primary);'>{player}</span> 📱")
            .replace("{player}", activePlayer.name);
    }

    const instrText = document.getElementById("bw-pass-instructions");
    if (instrText) {
        instrText.textContent = trans.pass_instructions;
    }

    const readyBtn = document.getElementById("btn-bw-pass-ready");
    if (readyBtn) {
        readyBtn.textContent = trans.btn_ready || "Ready! 🚀";
    }

    showScreen("screen-bw-pass");
}

function startBentWaledTurnCycleLetter() {
    // Show spinner screen
    showScreen("screen-bw-letter");
    document.getElementById("bw-countdown-overlay").style.display = "none";

    const spinnerBadge = document.getElementById("bw-spinning-letter");
    const outerRing = document.querySelector(".spinner-outer-ring");
    
    // Choose alphabet based on active language
    const isArLanguage = (gameState.language === "ar" || gameState.language === "tn");
    const alphabet = isArLanguage ? AR_ALPHABET : EN_ALPHABET;

    // Start cycling fast
    outerRing.classList.add("spinning");
    let speed = 40;
    let index = 0;
    
    function tickCycle() {
        index = (index + 1) % alphabet.length;
        spinnerBadge.textContent = alphabet[index];
        playSynthSfx("click");
    }
    
    let cycleInterval = setInterval(tickCycle, speed);

    // After 2 seconds, begin decelerating
    setTimeout(() => {
        clearInterval(cycleInterval);
        
        // Deceleration ticks simulating physical inertia
        let ticksRemaining = 5;
        let delay = 100;
        
        function tickDecelerate() {
            if (ticksRemaining <= 0) {
                // Land on final letter
                outerRing.classList.remove("spinning");
                gameState.bwActiveLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                spinnerBadge.textContent = gameState.bwActiveLetter;
                playSynthSfx("correct");

                // Trigger celebrate-pulse animation
                spinnerBadge.classList.remove("celebrate-pulse");
                void spinnerBadge.offsetWidth;
                spinnerBadge.classList.add("celebrate-pulse");

                // Start countdown
                startPreGameCountdown();
            } else {
                index = (index + 1) % alphabet.length;
                spinnerBadge.textContent = alphabet[index];
                playSynthSfx("click");
                ticksRemaining--;
                delay += 100;
                setTimeout(tickDecelerate, delay);
            }
        }
        setTimeout(tickDecelerate, delay);
    }, 2000);
}

function startBentWaledSpinnerPhase() {
    // Fallback trigger for solo directly
    startBentWaledTurnCycleLetter();
}

function startPreGameCountdown() {
    const overlay = document.getElementById("bw-countdown-overlay");
    const countNum = document.getElementById("bw-countdown-num");
    overlay.style.display = "block";
    
    let count = 3;
    countNum.textContent = count;
    playBeepTone(440, 0.15); // countdown beep

    let interval = setInterval(() => {
        count--;
        if (count <= 0) {
            clearInterval(interval);
            playBeepTone(880, 0.35); // start beep
            launchBentWaledGameplay();
        } else {
            countNum.textContent = count;
            playBeepTone(440, 0.15);
        }
    }, 1000);
}

function playBeepTone(freq, duration) {
    try {
        if (gameState.soundMuted) return;
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, now);
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.start(now);
        osc.stop(now + duration);
    } catch(e) {}
}

function launchBentWaledGameplay() {
    // Clear answers
    gameState.bwAnswers = {};
    gameState.bwGrading = {};

    // Set active letter
    document.getElementById("bw-active-letter-badge").textContent = gameState.bwActiveLetter;

    // Render headers displaying Player Name + Round Context
    const headerTitle = document.getElementById("bw-gameplay-header-title");
    if (headerTitle) {
        if (gameState.bwPlayMode === "solo") {
            headerTitle.textContent = (gameState.language === "ar" || gameState.language === "tn") 
                ? `طور اللعب الفردي • الحرف النشط` 
                : `Solo Mode • Active Challenge`;
        } else {
            const player = gameState.bwPlayers[gameState.bwCurrentPlayerIndex];
            headerTitle.textContent = `${player.name} • Round ${gameState.bwCurrentRound} / ${gameState.bwMaxRounds}`;
        }
    }

    // Render category inputs
    const inputsGrid = document.getElementById("bw-inputs-grid");
    inputsGrid.innerHTML = "";

    const lang = gameState.language;
    
    gameState.bwSelectedCategories.forEach(catKey => {
        const trans = BW_TRANSLATIONS[lang] || BW_TRANSLATIONS["en"];
        const labelText = trans["cat_" + catKey] || catKey;

        const row = document.createElement("div");
        row.className = "bw-input-row";
        row.innerHTML = `
            <span class="bw-category-lbl">${labelText}</span>
            <input type="text" id="bw-input-${catKey}" class="bw-input-field" placeholder="..." autocomplete="off">
            <span id="bw-badge-${catKey}" class="bw-validation-badge">—</span>
        `;
        
        inputsGrid.appendChild(row);

        // Bind input prefix validation in real-time
        const inputElement = row.querySelector(".bw-input-field");
        const badge = row.querySelector(".bw-validation-badge");

        inputElement.addEventListener("input", () => {
            const val = inputElement.value.trim();
            if (val.length === 0) {
                badge.textContent = "—";
                badge.className = "bw-validation-badge";
                return;
            }

            const matches = validatePrefixLetter(val, gameState.bwActiveLetter);
            if (matches) {
                badge.textContent = "✓";
                badge.className = "bw-validation-badge valid";
            } else {
                badge.textContent = "✗";
                badge.className = "bw-validation-badge invalid";
            }
        });
    });

    // Start timer countdown
    gameState.timerVal = gameState.bwRoundDuration;
    const timerText = document.getElementById("bw-timer-text");
    const timerBar = document.getElementById("bw-timer-bar");

    timerText.textContent = gameState.timerVal;
    timerBar.style.strokeDashoffset = 0;
    timerText.classList.remove("warning-active");

    clearInterval(gameState.timerInterval);
    
    // Set warning colors
    timerText.style.color = "var(--accent-yellow)";
    timerBar.style.stroke = "var(--accent-yellow)";

    gameState.timerInterval = setInterval(() => {
        gameState.timerVal--;
        timerText.textContent = gameState.timerVal;

        const maxTimer = gameState.bwRoundDuration;
        const offset = 283 - (gameState.timerVal / maxTimer) * 283;
        timerBar.style.strokeDashoffset = offset;

        if (gameState.timerVal <= 10) {
            timerText.style.color = "var(--accent-red)";
            timerBar.style.stroke = "var(--accent-red)";
            timerText.classList.add("warning-active");
        }

        if (gameState.timerVal <= 0) {
            clearInterval(gameState.timerInterval);
            playSynthSfx("wrong");
            submitBentWaledAnswers();
        }
    }, 1000);

    showScreen("screen-bw-play");
}

function validatePrefixLetter(word, letter) {
    if (!word || !letter) return false;
    const firstChar = word.trim().charAt(0).toLowerCase();
    const l = letter.toLowerCase();

    // Arabic normalization helper mapping
    const isAr = (gameState.language === "ar" || gameState.language === "tn");
    if (isAr) {
        function normalizeAr(c) {
            if (["أ", "إ", "آ", "ٱ", "ا"].includes(c)) return "ا";
            if (["ة", "ت"].includes(c)) return "ت";
            if (["ى", "ي"].includes(c)) return "ي";
            return c;
        }
        return normalizeAr(firstChar) === normalizeAr(l);
    }
    
    return firstChar === l;
}

function normalizeStringForValidation(text, isArabic) {
    if (!text) return "";
    let t = text.trim().toLowerCase();
    if (isArabic) {
        t = t.replace(/[أإآٱ]/g, 'ا');
        t = t.replace(/ة/g, 'ت');
        t = t.replace(/[ىي]/g, 'ي');
    }
    return t;
}

function normalizeLetterForLookup(letter, lang) {
    if (!letter) return "";
    const isAr = (lang === "ar" || lang === "tn");
    return normalizeStringForValidation(letter, isAr);
}

async function validateAnswerLocally(lang, letter, category, answer) {
    const cleanAnswer = (answer || "").trim();
    if (!cleanAnswer) return false;

    // 1. Prefix check (must start with letter)
    const isPrefixValid = validatePrefixLetter(cleanAnswer, letter);
    if (!isPrefixValid) return false;

    // 2. Load dictionary content
    let wordsList = [];
    const lookupLang = (lang === "tn") ? "ar" : lang;
    const normLetter = normalizeLetterForLookup(letter, lang);

    // A. Check window.BW_CONTENT_BUNDLE first
    if (window.BW_CONTENT_BUNDLE && 
        window.BW_CONTENT_BUNDLE[lookupLang] && 
        window.BW_CONTENT_BUNDLE[lookupLang][normLetter] && 
        window.BW_CONTENT_BUNDLE[lookupLang][normLetter][category]) {
        wordsList = window.BW_CONTENT_BUNDLE[lookupLang][normLetter][category];
    } else {
        // B. Fetch locally
        try {
            const res = await fetch(`./content/bent_waled/${lookupLang}/${normLetter}/${category}.json`);
            if (res.ok) {
                wordsList = await res.json();
            }
        } catch (e) {
            console.warn(`Could not fetch local JSON for ${lookupLang}/${normLetter}/${category}:`, e);
        }
    }

    if (!wordsList || wordsList.length === 0) {
        // Fallback: accept prefix match if local dictionary content is missing
        return true; 
    }

    // 3. Normalize input
    const isArabic = (lang === "ar" || lang === "tn");
    const normInput = normalizeStringForValidation(cleanAnswer, isArabic);

    // 4. Match
    for (const item of wordsList) {
        const normDb = normalizeStringForValidation(item.answer, isArabic);
        if (normInput === normDb) return true;

        const aliases = item.aliases || [];
        for (const alias of aliases) {
            const normAlias = normalizeStringForValidation(alias, isArabic);
            if (normInput === normAlias) return true;
        }
    }

    return false;
}

async function submitBentWaledAnswers() {
    clearInterval(gameState.timerInterval);
    
    // Gather values
    const answersPayload = {};
    for (const catKey of gameState.bwSelectedCategories) {
        const inputEl = document.getElementById(`bw-input-${catKey}`);
        const val = inputEl ? inputEl.value.trim() : "";
        gameState.bwAnswers[catKey] = val;
        answersPayload[catKey] = val;

        // Content-first local validation
        const isApproved = await validateAnswerLocally(
            gameState.language, 
            gameState.bwActiveLetter, 
            catKey, 
            val
        );
        gameState.bwGrading[catKey] = isApproved;
    }

    renderBentWaledReview();

    // Query backend validation as fallback/sync
    try {
        const response = await fetch(`${BACKEND_URL}/api/bw/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                letter: gameState.bwActiveLetter,
                language: gameState.language,
                answers: answersPayload
            })
        });

        if (response.ok) {
            const results = await response.json();
            for (const [catKey, isApproved] of Object.entries(results)) {
                gameState.bwGrading[catKey] = isApproved;
            }
            renderBentWaledReview();
        }
    } catch (e) {
        console.warn("Backend validation offline. Using local validation results.", e);
    }
}

function renderBentWaledReview() {
    const listContainer = document.getElementById("bw-review-list");
    listContainer.innerHTML = "";

    const lang = gameState.language;
    const trans = BW_TRANSLATIONS[lang] || BW_TRANSLATIONS["en"];

    // Update screen sub-header to show player name in pass & play
    const reviewSub = document.querySelector("#screen-bw-review .section-subtitle");
    if (reviewSub) {
        if (gameState.bwPlayMode === "solo") {
            reviewSub.textContent = trans.review_subtitle;
        } else {
            const player = gameState.bwPlayers[gameState.bwCurrentPlayerIndex];
            reviewSub.textContent = (trans.review_subtitle_passplay || "Reviewing answers for: {player} (Round {round})")
                .replace("{player}", player.name)
                .replace("{round}", gameState.bwCurrentRound);
        }
    }

    gameState.bwSelectedCategories.forEach(catKey => {
        const labelText = trans["cat_" + catKey] || catKey;
        const typedVal = gameState.bwAnswers[catKey] || "";
        const isCurrentlyApproved = gameState.bwGrading[catKey];

        const card = document.createElement("div");
        card.className = "bw-review-card";
        
        const displayVal = typedVal ? typedVal : `(${trans.invalid_badge})`;
        const valClass = typedVal ? "bw-review-val" : "bw-review-val empty";

        card.innerHTML = `
            <span class="bw-category-lbl">${labelText}</span>
            <span class="${valClass}">${displayVal}</span>
            <div class="bw-grade-toggle-group">
                <button class="bw-grade-btn approve ${isCurrentlyApproved ? 'active' : ''}" data-cat="${catKey}" data-grade="approve">👍</button>
                <button class="bw-grade-btn reject ${!isCurrentlyApproved ? 'active' : ''}" data-cat="${catKey}" data-grade="reject">👎</button>
            </div>
        `;

        // Bind grading toggle events
        const btnApprove = card.querySelector(".approve");
        const btnReject = card.querySelector(".reject");

        btnApprove.addEventListener("click", () => {
            playSynthSfx("click");
            gameState.bwGrading[catKey] = true;
            btnApprove.classList.add("active");
            btnReject.classList.remove("active");
            tallyBentWaledScore();
        });

        btnReject.addEventListener("click", () => {
            playSynthSfx("click");
            gameState.bwGrading[catKey] = false;
            btnReject.classList.add("active");
            btnApprove.classList.remove("active");
            tallyBentWaledScore();
        });

        listContainer.appendChild(card);
    });

    // Update bottom navigation button text
    const btnNext = document.getElementById("btn-bw-review-again");
    if (btnNext) {
        if (gameState.bwPlayMode === "solo") {
            btnNext.textContent = trans.btn_play_again || "Play Again";
        } else {
            const isLastPlayer = (gameState.bwCurrentPlayerIndex >= gameState.bwPlayers.length - 1);
            const isLastRound = (gameState.bwCurrentRound >= gameState.bwMaxRounds);
            if (isLastPlayer && isLastRound) {
                btnNext.textContent = trans.btn_final_leaderboard || "Final Leaderboard 🏆";
            } else {
                btnNext.textContent = trans.btn_next_player || "Next Player ➡️";
            }
        }
    }

    tallyBentWaledScore();
    showScreen("screen-bw-review");
}

function tallyBentWaledScore() {
    let score = 0;
    gameState.bwSelectedCategories.forEach(catKey => {
        if (gameState.bwGrading[catKey] === true && (gameState.bwAnswers[catKey] || "").trim().length > 0) {
            score += 10;
        }
    });

    gameState.bwScore = score;
    
    // Display points unit based on language
    const lang = gameState.language;
    const trans = BW_TRANSLATIONS[lang] || BW_TRANSLATIONS["en"];
    
    document.getElementById("bw-total-score-badge").innerHTML = `${score} <span style="font-size: 1.2rem;">${trans.points_unit}</span>`;
}

function handleBentWaledNextTurnClick() {
    if (gameState.bwPlayMode === "solo") {
        // Solo mode restart directly
        // Save Solo Streak & Highscore
        const requiredAnswers = Math.ceil(gameState.bwSelectedCategories.length / 2);
        let correctAnswers = 0;
        gameState.bwSelectedCategories.forEach(catKey => {
            if (gameState.bwGrading[catKey] === true && (gameState.bwAnswers[catKey] || "").trim().length > 0) {
                correctAnswers++;
            }
        });

        if (correctAnswers >= requiredAnswers) {
            gameState.bwSoloStreak++;
            playSynthSfx("correct");
        } else {
            gameState.bwSoloStreak = 0;
            playSynthSfx("wrong");
        }

        if (gameState.bwScore > gameState.bwSoloHighScore) {
            gameState.bwSoloHighScore = gameState.bwScore;
        }

        localStorage.setItem("el_quizz_bw_streak", gameState.bwSoloStreak.toString());
        localStorage.setItem("el_quizz_bw_highscore", gameState.bwSoloHighScore.toString());

        // Restart turn (spins another letter)
        startBentWaledRound();
    } else {
        // Pass & Play queue management
        const activePlayer = gameState.bwPlayers[gameState.bwCurrentPlayerIndex];
        activePlayer.scores.push(gameState.bwScore);

        // Advance indices
        gameState.bwCurrentPlayerIndex++;
        if (gameState.bwCurrentPlayerIndex >= gameState.bwPlayers.length) {
            // All players done with current round
            gameState.bwCurrentPlayerIndex = 0;
            gameState.bwCurrentRound++;
        }

        if (gameState.bwCurrentRound > gameState.bwMaxRounds) {
            // Match is fully finished! Render podium!
            triggerBentWaledFinalPodium();
        } else {
            // Continue to next pass screen
            triggerBentWaledPassPhoneScreen();
        }
    }
}

function triggerBentWaledFinalPodium() {
    const lang = gameState.language;
    const trans = BW_TRANSLATIONS[lang] || BW_TRANSLATIONS["en"];

    // Calculate total score for each player
    const standings = gameState.bwPlayers.map(p => {
        const total = p.scores.reduce((a, b) => a + b, 0);
        return { name: p.name, score: total };
    });

    // Sort descending
    standings.sort((a, b) => b.score - a.score);

    // Render podium table
    const tableContainer = document.getElementById("bw-podium-rows");
    if (tableContainer) {
        tableContainer.innerHTML = "";
        standings.forEach((s, idx) => {
            const row = document.createElement("div");
            row.style.display = "grid";
            row.style.gridTemplateColumns = "80px 1fr 100px";
            row.style.padding = "14px 16px";
            row.style.borderRadius = "12px";
            row.style.background = idx === 0 
                ? "rgba(253, 224, 71, 0.15)" // Highlight winner
                : "rgba(255,255,255,0.03)";
            row.style.border = idx === 0
                ? "1px solid var(--primary)"
                : "1px solid rgba(255,255,255,0.05)";
            row.style.textAlign = "center";
            row.style.fontWeight = idx === 0 ? "bold" : "normal";

            // Medal emojis
            const medals = ["🥇", "🥈", "🥉"];
            const rankLabel = medals[idx] || `${idx + 1}`;

            row.innerHTML = `
                <span style="font-size: 1.1rem;">${rankLabel}</span>
                <span style="text-align: right; padding-right: 20px; font-weight: bold; color: ${idx === 0 ? 'var(--primary)' : '#fff'};">${s.name}</span>
                <span style="font-weight: 900; color: ${idx === 0 ? 'var(--primary)' : '#eee'};">${s.score} ${trans.points_unit}</span>
            `;

            tableContainer.appendChild(row);
        });
    }

    showScreen("screen-bw-podium");

    // Confetti blast!
    triggerBwConfettiBlast();
}

let bwConfettiAnimId;
function triggerBwConfettiBlast() {
    const canvas = document.getElementById("bw-confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || 600;

    const colors = ["#FDE047", "#A7F3D0", "#F87171", "#60A5FA", "#E9D5FF"];
    const particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -100 - 10,
            r: Math.random() * 6 + 4,
            d: Math.random() * canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, idx) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.tiltAngle) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle);
            p.tilt = Math.sin(p.tiltAngle - idx/3) * 15;

            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r/2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/2);
            ctx.stroke();
        });

        bwConfettiAnimId = requestAnimationFrame(draw);
    }
    draw();

    // Stop confetti after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(bwConfettiAnimId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

function updateBwUILanguage(lang) {
    const trans = BW_TRANSLATIONS[lang] || BW_TRANSLATIONS["en"];

    // Update Home Screen selector labels
    const tTitle = document.getElementById("lbl-mode-title-talla3");
    const tDesc = document.getElementById("lbl-mode-desc-talla3");
    const bwTitle = document.getElementById("lbl-mode-title-bw");
    const bwDesc = document.getElementById("lbl-mode-desc-bw");

    if (tTitle) tTitle.textContent = trans.mode_title_talla3;
    if (tDesc) tDesc.textContent = trans.mode_desc_talla3;
    if (bwTitle) bwTitle.textContent = trans.mode_title_bw;
    if (bwDesc) bwDesc.textContent = trans.mode_desc_bw;

    // Update Setup labels
    const setupTitle = document.getElementById("bw-setup-title-text");
    if (setupTitle) setupTitle.textContent = trans.setup_title;

    const roundsCountLabel = document.querySelector("#bw-config-passplay label:nth-of-type(1)");
    if (roundsCountLabel) roundsCountLabel.textContent = trans.rounds_count_label || "Rounds Count:";
    const roundsCountSuffix = document.getElementById("bw-rounds-count-lbl");
    if (roundsCountSuffix) roundsCountSuffix.textContent = `${gameState.bwMaxRounds || 3} ${trans.rounds_suffix || 'Rounds'}`;

    const playersListLabel = document.querySelector("#bw-config-passplay label:nth-of-type(2)");
    if (playersListLabel) playersListLabel.textContent = trans.players_list_label || "Players List:";
    const btnAddPlayer = document.getElementById("btn-bw-add-player");
    if (btnAddPlayer) btnAddPlayer.textContent = trans.btn_add_player || "+ Add Player";

    const categoriesHeader = document.querySelector("#screen-bw-setup h3");
    if (categoriesHeader) categoriesHeader.textContent = trans.categories_header || "📋 Active Categories:";

    const labelsInSetup = document.querySelectorAll("#screen-bw-setup label");
    labelsInSetup.forEach(lbl => {
        if (lbl.textContent.includes("Round Duration") || lbl.textContent.includes("مدة الجولة") || lbl.textContent.includes("⏱️")) {
            lbl.innerHTML = `${trans.duration_label || '⏱️ Round Duration:'} <span id="bw-duration-val" style="color: var(--primary);">${gameState.bwRoundDuration || 60}</span>s`;
        }
    });

    const btnBwSetupBack = document.getElementById("btn-bw-setup-back");
    if (btnBwSetupBack) btnBwSetupBack.textContent = trans.btn_back || "Back";
    const btnBwStart = document.getElementById("btn-bw-start");
    if (btnBwStart) btnBwStart.textContent = trans.btn_start || "Start Game";

    // Update Spinner labels
    const spinnerTitle = document.getElementById("bw-spinner-title");
    if (spinnerTitle) spinnerTitle.textContent = trans.spinner_title;
    const spinnerSubtitle = document.getElementById("bw-spinner-subtitle");
    if (spinnerSubtitle) spinnerSubtitle.textContent = trans.spinner_subtitle;
    const countdownPrefix = document.getElementById("bw-countdown-prefix");
    if (countdownPrefix) countdownPrefix.textContent = trans.countdown_prefix;

    // Update active letter gameplay label
    const activeLetterLbl = document.getElementById("lbl-active-letter");
    if (activeLetterLbl) activeLetterLbl.textContent = trans.active_letter_lbl;

    const btnBwSubmit = document.getElementById("btn-bw-submit");
    if (btnBwSubmit) btnBwSubmit.textContent = trans.btn_submit;

    // Update review screen static texts
    const reviewTitle = document.querySelector("#screen-bw-review h2.section-title");
    if (reviewTitle) reviewTitle.textContent = trans.review_title;
    const reviewScoreCardLbl = document.getElementById("lbl-bw-score-card");
    if (reviewScoreCardLbl) reviewScoreCardLbl.textContent = trans.score_label;
    const reviewScoreUnit = document.getElementById("lbl-bw-score-unit");
    if (reviewScoreUnit) reviewScoreUnit.textContent = trans.points_unit;

    const btnBwFinishLobby = document.getElementById("btn-bw-finish-lobby");
    if (btnBwFinishLobby) btnBwFinishLobby.textContent = trans.btn_home;
    const btnBwReviewAgain = document.getElementById("btn-bw-review-again");
    if (btnBwReviewAgain && gameState.bwPlayMode === "solo") {
        btnBwReviewAgain.textContent = trans.btn_play_again;
    }

    // Update podium screen static texts
    const podiumTitle = document.getElementById("bw-podium-title");
    if (podiumTitle) podiumTitle.textContent = trans.podium_title;
    const podiumSubtitle = document.getElementById("bw-podium-subtitle");
    if (podiumSubtitle) podiumSubtitle.textContent = trans.podium_subtitle;
    const lblRank = document.getElementById("lbl-bw-tbl-rank");
    if (lblRank) lblRank.textContent = trans.tbl_rank;
    const lblPlayer = document.getElementById("lbl-bw-tbl-player");
    if (lblPlayer) lblPlayer.textContent = trans.tbl_player;
    const lblScore = document.getElementById("lbl-bw-tbl-score");
    if (lblScore) lblScore.textContent = trans.tbl_score;

    const btnPodiumRestart = document.getElementById("btn-bw-podium-restart");
    if (btnPodiumRestart) btnPodiumRestart.textContent = trans.btn_play_again;
    const btnPodiumHome = document.getElementById("btn-bw-podium-home");
    if (btnPodiumHome) btnPodiumHome.textContent = trans.btn_home;

    // Update categories translation checkbox texts
    const checkboxesSpans = document.querySelectorAll("#bw-categories-container span");
    checkboxesSpans.forEach(span => {
        const key = span.getAttribute("data-i18n");
        if (key && trans[key.replace("bw_cat_", "cat_")]) {
            const labelMapping = {
                boy: "👦", girl: "👧", country: "🇹🇳", animal: "🦁",
                object: "🔑", plant: "🌿", profession: "👨‍⚕️", food: "🍕"
            };
            const coreKey = key.replace("bw_cat_", "");
            const emoji = labelMapping[coreKey] || "";
            span.textContent = `${emoji} ${trans[key.replace("bw_cat_", "cat_")]}`;
        }
    });
}

// Register translations on load
const BW_TRANSLATIONS = {
    ar: {
        mode_title_talla3: "طلّع 9",
        mode_desc_talla3: "أجب بـ 9 إجابات صحيحة وتجنّب الفخ",
        mode_title_bw: "بنت ولد",
        mode_desc_bw: "لعبة الحروف والأسماء المشهورة (فردي / محلي)",
        setup_title: "إعدادات بنت ولد",
        categories_header: "📋 المحاور المفضلة:",
        duration_label: "⏱️ مدة الجولة:",
        btn_back: "رجوع",
        btn_start: "ابدأ اللعبة 🚀",
        active_letter_lbl: "الحرف النشط:",
        btn_submit: "أنهيت! 🏁",
        review_title: "مراجعة الإجابات",
        review_subtitle: "قم بتقييم إجاباتك للحصول على النقاط النهائية",
        review_subtitle_passplay: "تقييم إجابات اللاعب: {player} (الجولة {round})",
        score_label: "رصيد الجولة:",
        points_unit: "نقطة",
        btn_play_again: "إعادة اللعب 🔄",
        btn_home: "القائمة الرئيسية 🏠",
        cat_boy: "ولد",
        cat_girl: "بنت",
        cat_country: "بلاد",
        cat_animal: "حيوان",
        cat_object: "جماد",
        cat_plant: "نبات/غلة",
        cat_profession: "خدمة",
        cat_food: "ماكلة",
        valid_badge: "صحيح",
        invalid_badge: "خاطئ",
        spinner_title: "اختيار الحرف العشوائي",
        spinner_subtitle: "جاري تدوير عجلة الحروف...",
        countdown_prefix: "ستبدأ اللعبة بعد:",
        rounds_count_label: "عدد الجولات:",
        rounds_suffix: "جولات",
        players_list_label: "قائمة اللاعبين:",
        btn_add_player: "+ إضافة لاعب",
        player_word: "اللاعب",
        max_players_alert: "الحد الأقصى هو 8 لاعبين!",
        alert_select_category: "الرجاء اختيار محور واحد على الأقل!",
        alert_min_players: "الرجاء إدخال أسماء لاعبين اثنين على الأقل!",
        pass_prompt: "مرّر الهاتف إلى <span id='bw-pass-player-name' style='color: var(--primary);'>{player}</span> 📱",
        pass_instructions: "لا تنظر إلى الشاشة إلا عندما تستلم الهاتف وتضغط على الزر!",
        btn_ready: "جاهز! 🚀",
        btn_final_leaderboard: "الترتيب النهائي 🏆",
        btn_next_player: "اللاعب التالي ➡️",
        podium_title: "الترتيب النهائي 🏆",
        podium_subtitle: "نتائج مواجهة بنت ولد",
        tbl_rank: "الرتبة",
        tbl_player: "اللاعب",
        tbl_score: "النقاط"
    },
    tn: {
        mode_title_talla3: "اذكر 9",
        mode_desc_talla3: "جاوب بـ 9 إجابات صحيحة وأبعد عالفخ",
        mode_title_bw: "بنت ولد",
        mode_desc_bw: "لعبة الحروف والأسماء المشهورة (فردي / محلي)",
        setup_title: "إعدادات بنت ولد",
        categories_header: "📋 المحاور النشطة:",
        duration_label: "⏱️ وقت اللعب:",
        btn_back: "رجوع",
        btn_start: "ابدأ اللعب توّة 🚀",
        active_letter_lbl: "الحرف النشط:",
        btn_submit: "كمّلت! 🏁",
        review_title: "تقييم الإجابات",
        review_subtitle: "قيّم إجاباتك باش تاخذ النقاط",
        review_subtitle_passplay: "تقييم إجابات اللاعب: {player} (الجولة {round})",
        score_label: "نقاط الجولة:",
        points_unit: "نقطة",
        btn_play_again: "عاود العب 🔄",
        btn_home: "القائمة الرئيسية 🏠",
        cat_boy: "ولد",
        cat_girl: "بنت",
        cat_country: "بلاد",
        cat_animal: "حيوان",
        cat_object: "جماد",
        cat_plant: "نبات/غلة",
        cat_profession: "خدمة",
        cat_food: "ماكلة",
        valid_badge: "صحيح",
        invalid_badge: "غالط",
        spinner_title: "تخمين الحرف العشوائي",
        spinner_subtitle: "قاعدين ندوروا في الحروف...",
        countdown_prefix: "باش تبدا اللعبة بعد:",
        rounds_count_label: "عدد الجولات:",
        rounds_suffix: "جولات",
        players_list_label: "قائمة اللاعبين:",
        btn_add_player: "+ زيد لاعب",
        player_word: "لاعب",
        max_players_alert: "الحد الأقصى هو 8 لاعبين!",
        alert_select_category: "الرجاء اختيار محور واحد على الأقل!",
        alert_min_players: "الرجاء إدخال أسماء لاعبين اثنين على الأقل!",
        pass_prompt: "عدّي التليفون لـ <span id='bw-pass-player-name' style='color: var(--primary);'>{player}</span> 📱",
        pass_instructions: "ما تغزرش للتليفون كان كيف تستلمو وتنزل عالسبّاط!",
        btn_ready: "حاضر! 🚀",
        btn_final_leaderboard: "الترتيب النهائي 🏆",
        btn_next_player: "اللاعب التالي ➡️",
        podium_title: "الترتيب النهائي 🏆",
        podium_subtitle: "نتائج لعبة بنت ولد",
        tbl_rank: "الترتيب",
        tbl_player: "اللاعب",
        tbl_score: "النقاط"
    },
    fr: {
        mode_title_talla3: "Cite 9",
        mode_desc_talla3: "Donnez 9 réponses correctes et évitez le piège",
        mode_title_bw: "Fille Garçon",
        mode_desc_bw: "Le jeu classique du petit baccalauréat (solo / local)",
        setup_title: "Configuration Fille Garçon",
        categories_header: "📋 Catégories actives :",
        duration_label: "⏱️ Durée de la manche :",
        btn_back: "Retour",
        btn_start: "Démarrer 🚀",
        active_letter_lbl: "Lettre active :",
        btn_submit: "Terminé ! 🏁",
        review_title: "Correction des réponses",
        review_subtitle: "Évaluez vos réponses pour cumuler des points",
        review_subtitle_passplay: "Correction des réponses pour : {player} (Manche {round})",
        score_label: "Score de la manche :",
        points_unit: "pts",
        btn_play_again: "Rejouer 🔄",
        btn_home: "Accueil 🏠",
        cat_boy: "Garçon",
        cat_girl: "Fille",
        cat_country: "Pays / Ville",
        cat_animal: "Animal",
        cat_object: "Objet",
        cat_plant: "Plante / Fruit",
        cat_profession: "Métier",
        cat_food: "Plat / Nourriture",
        valid_badge: "Correct",
        invalid_badge: "Incorrect",
        spinner_title: "Sélection de la lettre",
        spinner_subtitle: "Sélection d'une lettre au hasard...",
        countdown_prefix: "Début de la partie dans :",
        rounds_count_label: "Nombre de manches :",
        rounds_suffix: "Manches",
        players_list_label: "Liste des joueurs :",
        btn_add_player: "+ Ajouter un joueur",
        player_word: "Joueur",
        max_players_alert: "Maximum 8 joueurs autorisés !",
        alert_select_category: "Veuillez sélectionner au moins une catégorie !",
        alert_min_players: "Veuillez saisir les noms d'au moins 2 joueurs !",
        pass_prompt: "Passez le téléphone à <span id='bw-pass-player-name' style='color: var(--primary);'>{player}</span> 📱",
        pass_instructions: "Ne regardez pas l'écran avant d'avoir le téléphone en main !",
        btn_ready: "Prêt ! 🚀",
        btn_final_leaderboard: "Classement Final 🏆",
        btn_next_player: "Joueur Suivant ➡️",
        podium_title: "Classement Final 🏆",
        podium_subtitle: "Résultats de la partie Fille Garçon",
        tbl_rank: "Rang",
        tbl_player: "Joueur",
        tbl_score: "Score"
    },
    en: {
        mode_title_talla3: "Name 9",
        mode_desc_talla3: "Give 9 correct answers and avoid the trap",
        mode_title_bw: "Girl Boy",
        mode_desc_bw: "The classic categories word game (solo / local)",
        setup_title: "Girl Boy Settings",
        categories_header: "📋 Active Categories:",
        duration_label: "⏱️ Round Duration:",
        btn_back: "Back",
        btn_start: "Start Game 🚀",
        active_letter_lbl: "Active Letter:",
        btn_submit: "Finished! 🏁",
        review_title: "Self Grading Review",
        review_subtitle: "Approve or reject your answers to calculate score",
        review_subtitle_passplay: "Reviewing answers for: {player} (Round {round})",
        score_label: "Round Score:",
        points_unit: "points",
        btn_play_again: "Play Again 🔄",
        btn_home: "Main Menu 🏠",
        cat_boy: "Boy Name",
        cat_girl: "Girl Name",
        cat_country: "Country / City",
        cat_animal: "Animal",
        cat_object: "Object",
        cat_plant: "Plant / Fruit",
        cat_profession: "Profession",
        cat_food: "Food / Dish",
        valid_badge: "Valid",
        invalid_badge: "Invalid",
        spinner_title: "Letter Roulette Spinner",
        spinner_subtitle: "Choosing a random letter...",
        countdown_prefix: "Game starts in:",
        rounds_count_label: "Rounds Count:",
        rounds_suffix: "Rounds",
        players_list_label: "Players List:",
        btn_add_player: "+ Add Player",
        player_word: "Player",
        max_players_alert: "Maximum 8 players allowed!",
        alert_select_category: "Please select at least one category!",
        alert_min_players: "Please enter names for at least 2 players!",
        pass_prompt: "Pass the phone to <span id='bw-pass-player-name' style='color: var(--primary);'>{player}</span> 📱",
        pass_instructions: "Do not look at the screen until you receive it!",
        btn_ready: "Ready! 🚀",
        btn_final_leaderboard: "Final Leaderboard 🏆",
        btn_next_player: "Next Player ➡️",
        podium_title: "Final Standings 🏆",
        podium_subtitle: "Girl Boy Match Standings",
        tbl_rank: "Rank",
        tbl_player: "Player",
        tbl_score: "Score"
    }
};


