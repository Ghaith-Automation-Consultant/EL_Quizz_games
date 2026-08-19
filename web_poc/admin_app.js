/* --------------------------------------------------
 * El Quizz Admin Portal App Logic — Proof of Concept
 * -------------------------------------------------- */

// Define core defaults
const DEFAULT_QUESTIONS = [
    {
        id: 1,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ولايات تونسية تطل على البحر الأبيض المتوسط (ساحلية)؟" },
            tn: { text: "ولايات تونسية تطل عالبحر؟" },
            fr: { text: "Citez les gouvernorats tunisiens côtiers (bordés par la mer) ?" },
            en: { text: "Name Tunisian coastal governorates (bordering the sea)?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "بنزرت", tn: "بنزرت", fr: "Bizerte", en: "Bizerte" }, is_correct: true, points: 10 },
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunis", en: "Tunis" }, is_correct: true, points: 10 },
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: true, points: 10 },
            { translations: { ar: "سوسة", tn: "سوسة", fr: "Sousse", en: "Sousse" }, is_correct: true, points: 10 },
            { translations: { ar: "المنستير", tn: "المنستير", fr: "Monastir", en: "Monastir" }, is_correct: true, points: 20 },
            { translations: { ar: "المهدية", tn: "المهدية", fr: "Mahdia", en: "Mahdia" }, is_correct: true, points: 20 },
            { translations: { ar: "صفاقس", tn: "صفاقس", fr: "Sfax", en: "Sfax" }, is_correct: true, points: 20 },
            { translations: { ar: "مدنين", tn: "مدنين", fr: "Medenine", en: "Medenine" }, is_correct: true, points: 30 },
            { translations: { ar: "قابيس", tn: "قابيس", fr: "Gabes", en: "Gabes" }, is_correct: true, points: 30 },
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 2,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ولايات تونسية داخلية (لا تطل على البحر)؟" },
            tn: { text: "أعطيني ولايات تونسية داخلية (ما تطلش على البحر)؟" },
            fr: { text: "Citez des gouvernorats tunisiens de l'intérieur (sans accès à la mer) ?" },
            en: { text: "Name inland Tunisian governorates (no access to the sea)?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: true, points: 10 },
            { translations: { ar: "باجة", tn: "باجة", fr: "Béja", en: "Beja" }, is_correct: true, points: 10 },
            { translations: { ar: "جندوبة", tn: "جندوبة", fr: "Jendouba", en: "Jendouba" }, is_correct: true, points: 10 },
            { translations: { ar: "الكاف", tn: "الكاف", fr: "FAC", en: "CAF" }, is_correct: true, points: 20 },
            { translations: { ar: "سليانة", tn: "سليانة", fr: "Siliana", en: "Siliana" }, is_correct: true, points: 20 },
            { translations: { ar: "سيدي بوزيد", tn: "سيدي بوزيد", fr: "Sidi Bouzid", en: "Sidi Bouzid" }, is_correct: true, points: 20 },
            { translations: { ar: "القصرين", tn: "القصرين", fr: "Kasserine", en: "Kasserine" }, is_correct: true, points: 30 },
            { translations: { ar: "توزر", tn: "توزر", fr: "Tozeur", en: "Tozeur" }, is_correct: true, points: 30 },
            { translations: { ar: "قبلي", tn: "قبلي", fr: "tribal", en: "tribal" }, is_correct: true, points: 30 },
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 3,
        is_approved: true,
        translations: {
            ar: { text: "أذكر جزر أو أرخبيلات تابعة للجمهورية التونسية؟" },
            tn: { text: "أعطيني جزاير أو أرخبيلات تابعة للجمهورية التونسية؟" },
            fr: { text: "Citez des îles ou archipels appartenant à la République tunisienne ?" },
            en: { text: "Name islands or archipelagos belonging to the Republic of Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "جربة", tn: "جربة", fr: "Djerba", en: "Djerba" }, is_correct: true, points: 10 },
            { translations: { ar: "قرقنة", tn: "قرقنة", fr: "Kerkennah", en: "Kerkennah" }, is_correct: true, points: 15 },
            { translations: { ar: "جالطة", tn: "جالطة", fr: "Galata", en: "Galata" }, is_correct: true, points: 20 },
            { translations: { ar: "زمبرة", tn: "زمبرة", fr: "Zambara", en: "Zambara" }, is_correct: true, points: 20 },
            { translations: { ar: "زمبرتا", tn: "زمبرتا", fr: "Zimberta", en: "Zimberta" }, is_correct: true, points: 30 },
            { translations: { ar: "قورية", tn: "قورية", fr: "coréen", en: "Korean" }, is_correct: true, points: 35 },
            { translations: { ar: "الديماس", tn: "الديماس", fr: "Dimas", en: "Dimas" }, is_correct: true, points: 40 },
            { translations: { ar: "قناة بنزرت", tn: "قناة بنزرت", fr: "Canal de Bizerte", en: "Bizerte Canal" }, is_correct: true, points: 45 },
            { translations: { ar: "شيكلي", tn: "شيكلي", fr: "Chikli", en: "Chikli" }, is_correct: true, points: 50 },
            { translations: { ar: "قبرص", tn: "قبرص", fr: "Chypre", en: "Cyprus" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 4,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مدن أو قرى سياحية مشهورة في تونس؟" },
            tn: { text: "أعطيني مدن أو قرى سياحية معروفة في تونس؟" },
            fr: { text: "Citez des villes ou villages touristiques célèbres en Tunisie ?" },
            en: { text: "Name famous tourist towns or villages in Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "سيدي بوسعيد", tn: "سيدي بوسعيد", fr: "Sidi Bou Saïd", en: "Sidi Bou Said" }, is_correct: true, points: 10 },
            { translations: { ar: "الحمامات", tn: "الحمامات", fr: "Salles de bains", en: "Bathrooms" }, is_correct: true, points: 10 },
            { translations: { ar: "جربة", tn: "جربة", fr: "Djerba", en: "Djerba" }, is_correct: true, points: 10 },
            { translations: { ar: "طبرقة", tn: "طبرقة", fr: "Tabarka", en: "Tabarka" }, is_correct: true, points: 20 },
            { translations: { ar: "المرسى", tn: "المرسى", fr: "Ancrage", en: "Anchorage" }, is_correct: true, points: 20 },
            { translations: { ar: "قمرت", tn: "قمرت", fr: "Gammarth", en: "Gammarth" }, is_correct: true, points: 20 },
            { translations: { ar: "المهدية", tn: "المهدية", fr: "Mahdia", en: "Mahdia" }, is_correct: true, points: 30 },
            { translations: { ar: "توزر", tn: "توزر", fr: "Tozeur", en: "Tozeur" }, is_correct: true, points: 30 },
            { translations: { ar: "عين دراهم", tn: "عين دراهم", fr: "Aïn Dirham", en: "Ain Dirham" }, is_correct: true, points: 40 },
            { translations: { ar: "الدار البيضاء", tn: "الدار البيضاء", fr: "Casablanca", en: "Casablanca" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 5,
        is_approved: true,
        translations: {
            ar: { text: "أذكر سبخات أو بحيرات أو شطوط مائية في تونس؟" },
            tn: { text: "أعطيني سبخات أو بحيرات أو شطوط ماء في تونس؟" },
            fr: { text: "Citez des sebkhas, lacs ou chotts d'eau en Tunisie ?" },
            en: { text: "Name salt lakes (sebkhas), lakes, or chotts in Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "شط الجريد", tn: "شط الجريد", fr: "Chott El Jérid", en: "Chott El Jerid" }, is_correct: true, points: 10 },
            { translations: { ar: "بحيرة إشكل", tn: "بحيرة إشكل", fr: "Lac Ichkeul", en: "Lake Ichkeul" }, is_correct: true, points: 15 },
            { translations: { ar: "بحيرة تونس", tn: "بحيرة تونس", fr: "Lac Tunisie", en: "Lake Tunisia" }, is_correct: true, points: 20 },
            { translations: { ar: "سبخة السيجومي", tn: "سبخة السيجومي", fr: "Sijoumi sabkha", en: "Sijoumi sabkha" }, is_correct: true, points: 25 },
            { translations: { ar: "سبخة أريانة", tn: "سبخة أريانة", fr: "Marais de l'Ariana", en: "Ariana marsh" }, is_correct: true, points: 30 },
            { translations: { ar: "شط الغرسة", tn: "شط الغرسة", fr: "Extraire l'implant", en: "Extract the implant" }, is_correct: true, points: 35 },
            { translations: { ar: "شط الفجايج", tn: "شط الفجايج", fr: "Chatt Al-Fajajij", en: "Shatt Al-Fajajij" }, is_correct: true, points: 40 },
            { translations: { ar: "سبخة غرة", tn: "سبخة غرة", fr: "Un marais de franges", en: "A marsh of bangs" }, is_correct: true, points: 45 },
            { translations: { ar: "بحيرة بنزرت", tn: "بحيرة بنزرت", fr: "Lac de Bizerte", en: "Lake Bizerte" }, is_correct: true, points: 50 },
            { translations: { ar: "البحر الميت", tn: "البحر الميت", fr: "mer Morte", en: "Dead Sea" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 6,
        is_approved: true,
        translations: {
            ar: { text: "أذكر جبال أو مرتفعات تقع في التراب التونسي؟" },
            tn: { text: "أعطيني جبال أو مرتفعات موجودة في تونس؟" },
            fr: { text: "Citez des montagnes ou hauteurs situées en Tunisie ?" },
            en: { text: "Name mountains or highlands located in Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "جبل الشعانبي", tn: "جبل الشعانبي", fr: "Mont Chaambi", en: "Mount Chaambi" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل زغوان", tn: "جبل زغوان", fr: "Mont Zaghouan", en: "Mount Zaghouan" }, is_correct: true, points: 15 },
            { translations: { ar: "جبل السرج", tn: "جبل السرج", fr: "Support de selle", en: "Saddle mount" }, is_correct: true, points: 20 },
            { translations: { ar: "جبل اشكل", tn: "جبل اشكل", fr: "Mont Ashkel", en: "Mount Ashkel" }, is_correct: true, points: 25 },
            { translations: { ar: "جبل بوقرنين", tn: "جبل بوقرنين", fr: "Mont Bouqarnaïn", en: "Mount Bouqarnain" }, is_correct: true, points: 30 },
            { translations: { ar: "جبل السيف", tn: "جبل السيف", fr: "Montagne de l'épée", en: "Sword Mountain" }, is_correct: true, points: 35 },
            { translations: { ar: "جبل تمزرت", tn: "جبل تمزرت", fr: "Mont Tamzart", en: "Mount Tamzart" }, is_correct: true, points: 40 },
            { translations: { ar: "جبل عرباطة", tn: "جبل عرباطة", fr: "Mont Arbata", en: "Mount Arbata" }, is_correct: true, points: 45 },
            { translations: { ar: "جبل كسرى", tn: "جبل كسرى", fr: "Mont Khosrow", en: "Mount Khosrow" }, is_correct: true, points: 50 },
            { translations: { ar: "جبل إفرست", tn: "جبل إفرست", fr: "Mont Everest", en: "Mount Everest" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 7,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مدن تونسية تابعة لولاية نابل (الوطن القبلي)؟" },
            tn: { text: "أعطيني مدن تابعة لولاية نابل (الوطن القبلي)؟" },
            fr: { text: "Citez des villes du gouvernorat de Nabeul (Cap Bon) ?" },
            en: { text: "Name towns in the Nabeul governorate (Cap Bon)?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: true, points: 10 },
            { translations: { ar: "الحمامات", tn: "الحمامات", fr: "Salles de bains", en: "Bathrooms" }, is_correct: true, points: 10 },
            { translations: { ar: "قليبية", tn: "قليبية", fr: "Kélibia", en: "Kelibia" }, is_correct: true, points: 15 },
            { translations: { ar: "منزل تميم", tn: "منزل تميم", fr: "La maison de Tamim", en: "Tamim's house" }, is_correct: true, points: 20 },
            { translations: { ar: "قرمبالية", tn: "قرمبالية", fr: "Grombalia", en: "Grombalia" }, is_correct: true, points: 25 },
            { translations: { ar: "الهوارية", tn: "الهوارية", fr: "El Haouaria", en: "El Haouaria" }, is_correct: true, points: 30 },
            { translations: { ar: "قربة", tn: "قربة", fr: "bouteille", en: "bottle" }, is_correct: true, points: 35 },
            { translations: { ar: "بني خيار", tn: "بني خيار", fr: "Concombre brun", en: "Brown cucumber" }, is_correct: true, points: 40 },
            { translations: { ar: "suleiman", tn: "suleiman", fr: "suleiman", en: "suleiman" }, is_correct: true, points: 45 },
            { translations: { ar: "طبرقة", tn: "طبرقة", fr: "Tabarka", en: "Tabarka" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 8,
        is_approved: true,
        translations: {
            ar: { text: "أذكر بلديات أو مناطق تابعة لتونس الكبرى؟" },
            tn: { text: "أعطيني بلديات أو مناطق تابعة لتونس الكبرى؟" },
            fr: { text: "Citez des municipalités ou zones du Grand Tunis ?" },
            en: { text: "Name municipalities or areas of Greater Tunis?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "أريانة", tn: "أريانة", fr: "Ariana", en: "Ariana" }, is_correct: true, points: 10 },
            { translations: { ar: "بن عروس", tn: "بن عروس", fr: "Ben Arous", en: "Ben Arous" }, is_correct: true, points: 10 },
            { translations: { ar: "المنزه", tn: "المنزه", fr: "Al-Manzah", en: "Al-Manzah" }, is_correct: true, points: 15 },
            { translations: { ar: "النصر", tn: "النصر", fr: "Victoire", en: "Victory" }, is_correct: true, points: 15 },
            { translations: { ar: "حلق الوادي", tn: "حلق الوادي", fr: "La Goulette", en: "La Goulette" }, is_correct: true, points: 20 },
            { translations: { ar: "المرسى", tn: "المرسى", fr: "Ancrage", en: "Anchorage" }, is_correct: true, points: 20 },
            { translations: { ar: "الكرم", tn: "الكرم", fr: "Générosité", en: "Generosity" }, is_correct: true, points: 25 },
            { translations: { ar: "باردو", tn: "باردو", fr: "Bardo", en: "Bardo" }, is_correct: true, points: 25 },
            { translations: { ar: "رادس", tn: "رادس", fr: "Radès", en: "Rades" }, is_correct: true, points: 30 },
            { translations: { ar: "سوسة", tn: "سوسة", fr: "Sousse", en: "Sousse" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 9,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ولايات تونسية تقع في إقليم الجنوب التونسي؟" },
            tn: { text: "أعطيني ولايات موجودة في الجنوب التونسي؟" },
            fr: { text: "Citez des gouvernorats situés dans le sud de la Tunisie ?" },
            en: { text: "Name governorates located in southern Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "مدنين", tn: "مدنين", fr: "Médenine", en: "Medenine" }, is_correct: true, points: 10 },
            { translations: { ar: "تطاوين", tn: "تطاوين", fr: "Tataouine", en: "Tataouine" }, is_correct: true, points: 10 },
            { translations: { ar: "توزر", tn: "توزر", fr: "Tozeur", en: "Tozeur" }, is_correct: true, points: 15 },
            { translations: { ar: "قبلي", tn: "قبلي", fr: "tribal", en: "tribal" }, is_correct: true, points: 15 },
            { translations: { ar: "قابس", tn: "قابس", fr: "prise", en: "plug" }, is_correct: true, points: 20 },
            { translations: { ar: "قفصة", tn: "قفصة", fr: "Gafsa", en: "Gafsa" }, is_correct: true, points: 20 },
            { translations: { ar: "صفاقس", tn: "صفاقس", fr: "Sfax", en: "Sfax" }, is_correct: true, points: 30 },
            { translations: { ar: "سيدي بوزيد", tn: "سيدي بوزيد", fr: "Sidi Bouzid", en: "Sidi Bouzid" }, is_correct: true, points: 35 },
            { translations: { ar: "القصرين", tn: "القصرين", fr: "Kasserine", en: "Kasserine" }, is_correct: true, points: 40 },
            { translations: { ar: "بنزرت", tn: "بنزرت", fr: "Bizerte", en: "Bizerte" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 10,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أودية أو أنهار تجري في تونس؟" },
            tn: { text: "أعطيني وديان أو أنهار تجري في تونس؟" },
            fr: { text: "Citez des oueds ou rivières qui coulent en Tunisie ?" },
            en: { text: "Name wadis or rivers that flow in Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "وادي مجردة", tn: "وادي مجردة", fr: "vallée abstraite", en: "abstract valley" }, is_correct: true, points: 10 },
            { translations: { ar: "وادي المليان", tn: "وادي المليان", fr: "Wadi Al-Malyan", en: "Wadi Al-Malyan" }, is_correct: true, points: 15 },
            { translations: { ar: "وادي السيجومي", tn: "وادي السيجومي", fr: "Vallée de Segumi", en: "Segumi Valley" }, is_correct: true, points: 20 },
            { translations: { ar: "وادي الرمل", tn: "وادي الرمل", fr: "Vallée de sable", en: "Sand Valley" }, is_correct: true, points: 25 },
            { translations: { ar: "وادي الحطب", tn: "وادي الحطب", fr: "Wadi Al-Hatab", en: "Wadi Al-Hatab" }, is_correct: true, points: 30 },
            { translations: { ar: "وادي زرود", tn: "وادي زرود", fr: "Oued Zarroud", en: "Wadi Zarrud" }, is_correct: true, points: 35 },
            { translations: { ar: "وادي القيروان", tn: "وادي القيروان", fr: "Oued Kairouan", en: "Wadi Kairouan" }, is_correct: true, points: 40 },
            { translations: { ar: "وادي كسير", tn: "وادي كسير", fr: "Oued Kasir", en: "Wadi Kasir" }, is_correct: true, points: 45 },
            { translations: { ar: "وادي تاسة", tn: "وادي تاسة", fr: "Oued Tassa", en: "Wadi Tassa" }, is_correct: true, points: 50 },
            { translations: { ar: "نهر النيل", tn: "نهر النيل", fr: "Fleuve Nil", en: "Nile River" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 11,
        is_approved: true,
        translations: {
            ar: { text: "من هم حكام أو قادة تاريخيون ارتبطوا بقرطاج وتونس القديمة؟" },
            tn: { text: "شكون هوما الحكام أو القادة التاريخيين اللي مرتبطين بقرطاج وتونس القديمة؟" },
            fr: { text: "Qui sont les dirigeants ou chefs historiques liés à Carthage et à la Tunisie antique ?" },
            en: { text: "Who are the historical rulers or leaders associated with Carthage and ancient Tunisia?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "حنبعل", tn: "حنبعل", fr: "Hannibal", en: "Hannibal" }, is_correct: true, points: 10 },
            { translations: { ar: "أميلكار برقا", tn: "أميلكار برقا", fr: "Amilcar Barça", en: "Amilcar Barca" }, is_correct: true, points: 15 },
            { translations: { ar: "عليسة", tn: "عليسة", fr: "Alicia", en: "Alisa" }, is_correct: true, points: 15 },
            { translations: { ar: "ماسينيسا", tn: "ماسينيسا", fr: "Masinissa", en: "Masinissa" }, is_correct: true, points: 20 },
            { translations: { ar: "يوغرطة", tn: "يوغرطة", fr: "Jugurtha", en: "Jugurtha" }, is_correct: true, points: 25 },
            { translations: { ar: "صدربعل", tn: "صدربعل", fr: "Hasdrubal", en: "Hasdrubal" }, is_correct: true, points: 30 },
            { translations: { ar: "سيفاكس", tn: "سيفاكس", fr: "Syphax", en: "Syphax" }, is_correct: true, points: 35 },
            { translations: { ar: "حانون", tn: "حانون", fr: "Hanoun", en: "Hanoun" }, is_correct: true, points: 40 },
            { translations: { ar: "مملكة نـوميديا", tn: "مملكة نـوميديا", fr: "Royaume de Numidie", en: "Kingdom of Numidia" }, is_correct: true, points: 45 },
            { translations: { ar: "الإسكندر الأكبر", tn: "الإسكندر الأكبر", fr: "Alexandre le Grand", en: "Alexander the Great" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 12,
        is_approved: true,
        translations: {
            ar: { text: "أذكر معارك تاريخية خاضتها قرطاج أو تونس عبر العصور؟" },
            tn: { text: "أعطيني معارك تاريخية خاضتها قرطاج أو تونس عبر التاريخ؟" },
            fr: { text: "Citez des batailles historiques menées par Carthage ou la Tunisie à travers l'histoire ?" },
            en: { text: "Name historical battles fought by Carthage or Tunisia throughout history?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "معركة زاما", tn: "معركة زاما", fr: "Bataille de Zama", en: "Battle of Zama" }, is_correct: true, points: 10 },
            { translations: { ar: "معركة كاناي", tn: "معركة كاناي", fr: "Bataille de Cannes", en: "Battle of Cannae" }, is_correct: true, points: 15 },
            { translations: { ar: "معركة ترابيا", tn: "معركة ترابيا", fr: "Bataille de Trabia", en: "Battle of Trabia" }, is_correct: true, points: 20 },
            { translations: { ar: "معركة بحيرة تراسيمين", tn: "معركة بحيرة تراسيمين", fr: "Bataille du lac Trasimène", en: "Battle of Lake Trasimene" }, is_correct: true, points: 25 },
            { translations: { ar: "معركة قرطاج الأثرية", tn: "معركة قرطاج الأثرية", fr: "L'ancienne bataille de Carthage", en: "The ancient battle of Carthage" }, is_correct: true, points: 30 },
            { translations: { ar: "معركة مجردة", tn: "معركة مجردة", fr: "Bataille abstraite", en: "Abstract battle" }, is_correct: true, points: 35 },
            { translations: { ar: "معركة جلولاء", tn: "معركة جلولاء", fr: "Bataille de Jalawla", en: "Battle of Jalawla" }, is_correct: true, points: 40 },
            { translations: { ar: "حصار قرطاج", tn: "حصار قرطاج", fr: "Siège de Carthage", en: "Siege of Carthage" }, is_correct: true, points: 45 },
            { translations: { ar: "معركة وادي التين", tn: "معركة وادي التين", fr: "Bataille de Wadi al-Tin", en: "Battle of Wadi al-Tin" }, is_correct: true, points: 50 },
            { translations: { ar: "معركة Waterloo", tn: "معركة Waterloo", fr: "Bataille de Waterloo", en: "Battle of Waterloo" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 13,
        is_approved: true,
        translations: {
            ar: { text: "أذكر بايات (حكام) من الدولة الحسينية في تونس؟" },
            tn: { text: "أعطيني بايات (حكام) من الدولة الحسينية في تونس؟" },
            fr: { text: "Citez des beys (dirigeants) de la dynastie husseinite en Tunisie ?" },
            en: { text: "Name beys (rulers) of the Husainid dynasty in Tunisia?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "حسين بن علي", tn: "حسين بن علي", fr: "Hussein ben Ali", en: "Hussein bin Ali" }, is_correct: true, points: 10 },
            { translations: { ar: "علي باي", tn: "علي باي", fr: "Alipay", en: "Alipay" }, is_correct: true, points: 15 },
            { translations: { ar: "حمودة باشا", tn: "حمودة باشا", fr: "Hamouda Pacha", en: "Hamouda Pasha" }, is_correct: true, points: 15 },
            { translations: { ar: "أحمد باي الأول", tn: "أحمد باي الأول", fr: "Ahmed Bey Ier", en: "Ahmed Bey I" }, is_correct: true, points: 20 },
            { translations: { ar: "محمد باي", tn: "محمد باي", fr: "Mohamed Bey", en: "Mohamed Bey" }, is_correct: true, points: 25 },
            { translations: { ar: "محمد الصادق باي", tn: "محمد الصادق باي", fr: "Baie Muhammad Al-Sadiq", en: "Muhammad Al-Sadiq Bay" }, is_correct: true, points: 30 },
            { translations: { ar: "علي باي الثالث", tn: "علي باي الثالث", fr: "Ali Bey III", en: "Ali Bey III" }, is_correct: true, points: 35 },
            { translations: { ar: "المنصف باي", tn: "المنصف باي", fr: "Baie d'Al-Mansif", en: "Al-Mansif Bay" }, is_correct: true, points: 40 },
            { translations: { ar: "الأمين باي", tn: "الأمين باي", fr: "Al-Amin Bey", en: "Al-Amin Bey" }, is_correct: true, points: 45 },
            { translations: { ar: "الملك فاروق", tn: "الملك فاروق", fr: "Roi Farouk", en: "King Farouk" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 14,
        is_approved: true,
        translations: {
            ar: { text: "أذكر شخصيات وطنية تونسية ناضلت ضد الاستعمار الفرنسي؟" },
            tn: { text: "أعطيني شخصيات وطنية تونسية ناضلت ضد الاستعمار الفرنسي؟" },
            fr: { text: "Citez des figures nationalistes tunisiennes qui ont lutté contre le colonialisme français ?" },
            en: { text: "Name Tunisian nationalist figures who fought against French colonialism?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "عبد العزيز الثعالبي", tn: "عبد العزيز الثعالبي", fr: "Abdul Aziz Al-Thaalabi", en: "Abdul Aziz Al-Thaalabi" }, is_correct: true, points: 10 },
            { translations: { ar: "الحبيب بورقيبة", tn: "الحبيب بورقيبة", fr: "Habib Bourguiba", en: "Habib Bourguiba" }, is_correct: true, points: 10 },
            { translations: { ar: "فرحات حشاد", tn: "فرحات حشاد", fr: "Farhat Hashad", en: "Farhat Hashad" }, is_correct: true, points: 15 },
            { translations: { ar: "الهادي شاكر", tn: "الهادي شاكر", fr: "Al-Hadi Shaker", en: "Al-Hadi Shaker" }, is_correct: true, points: 20 },
            { translations: { ar: "علي البلهوان", tn: "علي البلهوان", fr: "Ali Al-Balhawan", en: "Ali Al-Balhawan" }, is_correct: true, points: 25 },
            { translations: { ar: "المنجي سليم", tn: "المنجي سليم", fr: "Al-Munji Salim", en: "Al-Munji Salim" }, is_correct: true, points: 30 },
            { translations: { ar: "صالح بن يوسف", tn: "صالح بن يوسف", fr: "Saleh ben Youssef", en: "Saleh bin Youssef" }, is_correct: true, points: 35 },
            { translations: { ar: "محمد الدغباجي", tn: "محمد الدغباجي", fr: "Muhammad Al-Daghbaji", en: "Muhammad Al-Daghbaji" }, is_correct: true, points: 40 },
            { translations: { ar: "الدغباجي", tn: "الدغباجي", fr: "Al-Daghbaji", en: "Al-Daghbaji" }, is_correct: true, points: 45 },
            { translations: { ar: "جمال عبد الناصر", tn: "جمال عبد الناصر", fr: "Gamal Abdel Nasser", en: "Gamal Abdel Nasser" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 15,
        is_approved: true,
        translations: {
            ar: { text: "أذكر دول تاريخية أو سلالات حكمت تونس عبر التاريخ؟" },
            tn: { text: "أعطيني دول أو سلالات حكمت تونس عبر التاريخ؟" },
            fr: { text: "Citez des États ou dynasties historiques ayant gouverné la Tunisie ?" },
            en: { text: "Name historical states or dynasties that ruled Tunisia?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "الفينيقيون", tn: "الفينيقيون", fr: "Phéniciens", en: "Phoenicians" }, is_correct: true, points: 10 },
            { translations: { ar: "الرومان", tn: "الرومان", fr: "Romains", en: "Romans" }, is_correct: true, points: 10 },
            { translations: { ar: "الوندال", tn: "الوندال", fr: "Vandales", en: "Vandals" }, is_correct: true, points: 15 },
            { translations: { ar: "البيزنطيون", tn: "البيزنطيون", fr: "Byzantins", en: "Byzantines" }, is_correct: true, points: 15 },
            { translations: { ar: "الأغالبة", tn: "الأغالبة", fr: "Aghlabides", en: "Aghlabids" }, is_correct: true, points: 20 },
            { translations: { ar: "الفاطميون", tn: "الفاطميون", fr: "Fatimides", en: "Fatimids" }, is_correct: true, points: 20 },
            { translations: { ar: "الصنهاجيون", tn: "الصنهاجيون", fr: "Les Sunhajis", en: "The Sunhajis" }, is_correct: true, points: 25 },
            { translations: { ar: "الحفصيون", tn: "الحفصيون", fr: "Hafsides", en: "Hafsids" }, is_correct: true, points: 25 },
            { translations: { ar: "العثمانيون", tn: "العثمانيون", fr: "Les Ottomans", en: "The Ottomans" }, is_correct: true, points: 30 },
            { translations: { ar: "المغول", tn: "المغول", fr: "Mongols", en: "Mongols" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 16,
        is_approved: true,
        translations: {
            ar: { text: "أذكر وزراء أولون أو رؤساء حكومات في تونس بعد الاستقلال؟" },
            tn: { text: "أعطيني وزراء أولون أو رؤساء حكومة في تونس بعد الاستقلال؟" },
            fr: { text: "Citez des Premiers ministres ou chefs de gouvernement tunisiens après l'indépendance ?" },
            en: { text: "Name Tunisian prime ministers or heads of government after independence?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "الباهي الأدغم", tn: "الباهي الأدغم", fr: "Al-Bahi Al-Adgham", en: "Al-Bahi Al-Adgham" }, is_correct: true, points: 15 },
            { translations: { ar: "الهادي نويرة", tn: "الهادي نويرة", fr: "Al-Hadi Nouira", en: "Al-Hadi Nouira" }, is_correct: true, points: 20 },
            { translations: { ar: "محمد مزالي", tn: "محمد مزالي", fr: "Mohamed Mazali", en: "Mohamed Mazali" }, is_correct: true, points: 20 },
            { translations: { ar: "رشيد صفر", tn: "رشيد صفر", fr: "Rachid Safar", en: "Rashid Safar" }, is_correct: true, points: 25 },
            { translations: { ar: "زين العابدين بن علي", tn: "زين العابدين بن علي", fr: "Zine El Abidine Ben Ali", en: "Zine El Abidine Ben Ali" }, is_correct: true, points: 30 },
            { translations: { ar: "حامد القروي", tn: "حامد القروي", fr: "Hamid Al-Qarawi", en: "Hamid Al-Qarawi" }, is_correct: true, points: 30 },
            { translations: { ar: "محمد الغنوشي", tn: "محمد الغنوشي", fr: "Mohammed Ghannouchi", en: "Muhammad Ghannouchi" }, is_correct: true, points: 35 },
            { translations: { ar: "الباجي قائد السبسي", tn: "الباجي قائد السبسي", fr: "Béji Caïd Essebsi", en: "Beji Caid Essebsi" }, is_correct: true, points: 40 },
            { translations: { ar: "حمادي الجبالي", tn: "حمادي الجبالي", fr: "Hamadi Al-Jabali", en: "Hamadi Al-Jabali" }, is_correct: true, points: 45 },
            { translations: { ar: "أنور السادات", tn: "أنور السادات", fr: "Anouar Sadate", en: "Anwar Sadat" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 17,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مواقع أو مدن تونسية تحتوي على آثار رومانية هامة؟" },
            tn: { text: "أعطيني مواقع أو مدن تونسية فيها آثار رومانية مهمة؟" },
            fr: { text: "Citez des sites ou villes tunisiennes abritant d'importants vestiges romains ?" },
            en: { text: "Name Tunisian sites or towns with important Roman ruins?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "قرطاج", tn: "قرطاج", fr: "Carthage", en: "Carthage" }, is_correct: true, points: 10 },
            { translations: { ar: "الجم", tn: "الجم", fr: "La confiture", en: "The jam" }, is_correct: true, points: 10 },
            { translations: { ar: "دقة", tn: "دقة", fr: "précision", en: "accuracy" }, is_correct: true, points: 15 },
            { translations: { ar: "سبيطلة", tn: "سبيطلة", fr: "Sbeïtla", en: "Sbeitla" }, is_correct: true, points: 15 },
            { translations: { ar: "بولا ريجيا", tn: "بولا ريجيا", fr: "Paula Régia", en: "Paula Regia" }, is_correct: true, points: 20 },
            { translations: { ar: "أوتيك", tn: "أوتيك", fr: "Otique", en: "Otic" }, is_correct: true, points: 25 },
            { translations: { ar: "مكتريس", tn: "مكتريس", fr: "Maktris", en: "Maktris" }, is_correct: true, points: 30 },
            { translations: { ar: "عين طنقة", tn: "عين طنقة", fr: "Aïn Tanga", en: "Ain Tanga" }, is_correct: true, points: 35 },
            { translations: { ar: "شمتو", tn: "شمتو", fr: "Tu t'es réjoui", en: "You gloated" }, is_correct: true, points: 40 },
            { translations: { ar: "البتراء", tn: "البتراء", fr: "Pétra", en: "Petra" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 18,
        is_approved: true,
        translations: {
            ar: { text: "ما هي المهن أو الحرف التقليدية القديمة في أسواق تونس العتيقة؟" },
            tn: { text: "شنية المهن أو الحرف التقليدية القديمة في أسواق تونس العتيقة؟" },
            fr: { text: "Quels sont les métiers ou artisanats traditionnels des souks de la médina de Tunis ?" },
            en: { text: "What are the traditional old crafts or trades found in the souks of Tunis's medina?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "صناعة الشاشية", tn: "صناعة الشاشية", fr: "Industrie des écrans", en: "Screen industry" }, is_correct: true, points: 10 },
            { translations: { ar: "النحاسين", tn: "النحاسين", fr: "Les chaudronniers", en: "The coppersmiths" }, is_correct: true, points: 10 },
            { translations: { ar: "الشواشين", tn: "الشواشين", fr: "Al-Shawashin", en: "Al-Shawashin" }, is_correct: true, points: 15 },
            { translations: { ar: "البردعة", tn: "البردعة", fr: "Barda", en: "Barda" }, is_correct: true, points: 20 },
            { translations: { ar: "البلغة", tn: "البلغة", fr: "Balgha", en: "Balgha" }, is_correct: true, points: 25 },
            { translations: { ar: "الحايك", tn: "الحايك", fr: "Al-Hayek", en: "Al-Hayek" }, is_correct: true, points: 30 },
            { translations: { ar: "الجلد", tn: "الجلد", fr: "Peau", en: "Skin" }, is_correct: true, points: 35 },
            { translations: { ar: "الفخار", tn: "الفخار", fr: "Poterie", en: "Pottery" }, is_correct: true, points: 40 },
            { translations: { ar: "صناعة السجاد", tn: "صناعة السجاد", fr: "Industrie du tapis", en: "Carpet industry" }, is_correct: true, points: 45 },
            { translations: { ar: "برمجة الحاسوب", tn: "برمجة الحاسوب", fr: "Programmation informatique", en: "Computer programming" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 19,
        is_approved: true,
        translations: {
            ar: { text: "أذكر شهداء أو قادة نقابيين تونسيين خُلّدوا في التاريخ؟" },
            tn: { text: "أعطيني شهداء أو قادة نقابيين تونسيين بقاو في التاريخ؟" },
            fr: { text: "Citez des martyrs ou dirigeants syndicaux tunisiens restés dans l'histoire ?" },
            en: { text: "Name Tunisian martyrs or union leaders remembered in history?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "فرحات حشاد", tn: "فرحات حشاد", fr: "Farhat Hashad", en: "Farhat Hashad" }, is_correct: true, points: 10 },
            { translations: { ar: "الحبيب عاشور", tn: "الحبيب عاشور", fr: "Ashour bien-aimé", en: "Beloved Ashour" }, is_correct: true, points: 15 },
            { translations: { ar: "أحمد التليلي", tn: "أحمد التليلي", fr: "Ahmed Al Talili", en: "Ahmed Al-Talili" }, is_correct: true, points: 20 },
            { translations: { ar: "محمد علي الحامي", tn: "محمد علي الحامي", fr: "Mohammed Ali Al-Hami", en: "Muhammad Ali Al-Hami" }, is_correct: true, points: 25 },
            { translations: { ar: "سعيد يوسف", tn: "سعيد يوسف", fr: "Saïd Youssef", en: "Saeed Youssef" }, is_correct: true, points: 30 },
            { translations: { ar: "المنجي عمارة", tn: "المنجي عمارة", fr: "Al-Munji Amara", en: "Al-Munji Amara" }, is_correct: true, points: 35 },
            { translations: { ar: "حسين العباسي", tn: "حسين العباسي", fr: "Hussein Al-Abbasi", en: "Hussein Al-Abbasi" }, is_correct: true, points: 40 },
            { translations: { ar: "سعد الله الجبالي", tn: "سعد الله الجبالي", fr: "Saadallah Al-Jabali", en: "Saadallah Al-Jabali" }, is_correct: true, points: 45 },
            { translations: { ar: "بشير البكوش", tn: "بشير البكوش", fr: "Bashir Al-Bakoush", en: "Bashir Al-Bakoush" }, is_correct: true, points: 50 },
            { translations: { ar: "تشي جيفارا", tn: "تشي جيفارا", fr: "Che Guevara", en: "Che Guevara" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 20,
        is_approved: true,
        translations: {
            ar: { text: "أذكر بنود أو معاهدات تاريخية وقعت في تونس؟" },
            tn: { text: "أعطيني معاهدات تاريخية تمضات في تونس؟" },
            fr: { text: "Citez des traités historiques signés en Tunisie ?" },
            en: { text: "Name historical treaties signed in Tunisia?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "معاهدة باردو", tn: "معاهدة باردو", fr: "Traité du Bardo", en: "Bardo Treaty" }, is_correct: true, points: 10 },
            { translations: { ar: "اتفاقية المرسى", tn: "اتفاقية المرسى", fr: "Accord d'ancrage", en: "Anchorage agreement" }, is_correct: true, points: 15 },
            { translations: { ar: "اتفاقية قرطاج", tn: "اتفاقية قرطاج", fr: "Accord de Carthage", en: "Carthage Agreement" }, is_correct: true, points: 20 },
            { translations: { ar: "عهد الأمان", tn: "عهد الأمان", fr: "L'ère de la sécurité", en: "The era of safety" }, is_correct: true, points: 25 },
            { translations: { ar: "دستور 1861", tn: "دستور 1861", fr: "Constitution de 1861", en: "Constitution of 1861" }, is_correct: true, points: 30 },
            { translations: { ar: "اتفاقيات الحكم الذاتي", tn: "اتفاقيات الحكم الذاتي", fr: "Accords d'autonomie gouvernementale", en: "Self-government agreements" }, is_correct: true, points: 35 },
            { translations: { ar: "معاهدة السلام البونيقية", tn: "معاهدة السلام البونيقية", fr: "Traité de paix punique", en: "Punic peace treaty" }, is_correct: true, points: 40 },
            { translations: { ar: "معاهدة حلق الوادي", tn: "معاهدة حلق الوادي", fr: "Traité de La Goulette", en: "La Goulette Treaty" }, is_correct: true, points: 45 },
            { translations: { ar: "اتفاقية الاستقلال", tn: "اتفاقية الاستقلال", fr: "Accord d'indépendance", en: "Independence Agreement" }, is_correct: true, points: 50 },
            { translations: { ar: "معاهدة Versailles", tn: "معاهدة Versailles", fr: "Traité de Versailles", en: "Treaty of Versailles" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 21,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مكونات أساسية تُستعمل لتحضير طبق 'الكسكسي التونسي'؟" },
            tn: { text: "أعطيني مكونات أساسية تتحط في طبق 'الكسكسي التونسي'؟" },
            fr: { text: "Citez les ingrédients de base utilisés dans le couscous tunisien ?" },
            en: { text: "Name the basic ingredients used to prepare Tunisian couscous?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "السميد", tn: "السميد", fr: "Semoule", en: "Semolina" }, is_correct: true, points: 10 },
            { translations: { ar: "الصلصة", tn: "الصلصة", fr: "La sauce", en: "The sauce" }, is_correct: true, points: 10 },
            { translations: { ar: "الحمص", tn: "الحمص", fr: "Houmous", en: "Hummus" }, is_correct: true, points: 15 },
            { translations: { ar: "البطاطا", tn: "البطاطا", fr: "Pommes de terre", en: "Potatoes" }, is_correct: true, points: 15 },
            { translations: { ar: "القرع", tn: "القرع", fr: "Citrouille", en: "Pumpkin" }, is_correct: true, points: 20 },
            { translations: { ar: "الفلفل الأخضر", tn: "الفلفل الأخضر", fr: "Poivre vert", en: "Green pepper" }, is_correct: true, points: 20 },
            { translations: { ar: "اللحم أو السمك", tn: "اللحم أو السمك", fr: "Viande ou poisson", en: "Meat or fish" }, is_correct: true, points: 25 },
            { translations: { ar: "البصل", tn: "البصل", fr: "Oignons", en: "Onions" }, is_correct: true, points: 25 },
            { translations: { ar: "البهارات التونسية", tn: "البهارات التونسية", fr: "épices tunisiennes", en: "Tunisian spices" }, is_correct: true, points: 30 },
            { translations: { ar: "الأرز الياباني", tn: "الأرز الياباني", fr: "Riz japonais", en: "Japanese rice" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 22,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أنواع مختلفة من الكسكسي المشهورة في تونس؟" },
            tn: { text: "أعطيني أنواع مختلفة من الكسكسي المعروفة في تونس؟" },
            fr: { text: "Citez différents types de couscous connus en Tunisie ?" },
            en: { text: "Name different types of couscous known in Tunisia?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "كسكسي بالعصبان", tn: "كسكسي بالعصبان", fr: "Couscous à l'Asaban", en: "Couscous with Asaban" }, is_correct: true, points: 10 },
            { translations: { ar: "كسكسي بالرأس", tn: "كسكسي بالرأس", fr: "Couscous avec la tête", en: "Couscous with the head" }, is_correct: true, points: 15 },
            { translations: { ar: "كسكسي بالحوت", tn: "كسكسي بالحوت", fr: "Couscous à la baleine", en: "Couscous with whale" }, is_correct: true, points: 15 },
            { translations: { ar: "كسكسي بالعلوش", tn: "كسكسي بالعلوش", fr: "Couscous à l'aloush", en: "Couscous with aloush" }, is_correct: true, points: 20 },
            { translations: { ar: "كسكسي بالدجاج", tn: "كسكسي بالدجاج", fr: "Couscous au poulet", en: "Couscous with chicken" }, is_correct: true, points: 20 },
            { translations: { ar: "المسفوف", tn: "المسفوف", fr: "Al-Masfouf", en: "Al-Masfouf" }, is_correct: true, points: 25 },
            { translations: { ar: "كسكسي البلبولة", tn: "كسكسي البلبولة", fr: "Couscous balboula", en: "Couscous balboula" }, is_correct: true, points: 30 },
            { translations: { ar: "كسكسي بالقديد", tn: "كسكسي بالقديد", fr: "Couscous au fer", en: "Couscous with iron" }, is_correct: true, points: 35 },
            { translations: { ar: "البركوكش", tn: "البركوكش", fr: "Le burkosh", en: "The burkosh" }, is_correct: true, points: 40 },
            { translations: { ar: "السوشي", tn: "السوشي", fr: "Sushis", en: "Sushi" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 23,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أطباق ومأكولات شعبية تونسية سريعة (Street Food)؟" },
            tn: { text: "أعطيني أكلات شعبية تونسية سريعة (Street Food)؟" },
            fr: { text: "Citez des plats de street food populaires en Tunisie ?" },
            en: { text: "Name popular Tunisian street food dishes?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "الفريكاسي", tn: "الفريكاسي", fr: "Fricassée", en: "Fricassee" }, is_correct: true, points: 10 },
            { translations: { ar: "اللبلابي", tn: "اللبلابي", fr: "Lierre", en: "Ivy" }, is_correct: true, points: 10 },
            { translations: { ar: "البريك", tn: "البريك", fr: "La pause", en: "The break" }, is_correct: true, points: 10 },
            { translations: { ar: "الكفتجي", tn: "الكفتجي", fr: "Al-Kafji", en: "Al-Kaftji" }, is_correct: true, points: 15 },
            { translations: { ar: "العجة التونسية", tn: "العجة التونسية", fr: "Omelette tunisienne", en: "Tunisian omelette" }, is_correct: true, points: 20 },
            { translations: { ar: "الخبز الملاوي", tn: "الخبز الملاوي", fr: "Pain malawien", en: "Malawian bread" }, is_correct: true, points: 20 },
            { translations: { ar: "الصحن التونسي", tn: "الصحن التونسي", fr: "Assiette tunisienne", en: "Tunisian plate" }, is_correct: true, points: 25 },
            { translations: { ar: "السندوتش التن", tn: "السندوتش التن", fr: "Le sandwich au thon", en: "The tuna sandwich" }, is_correct: true, points: 25 },
            { translations: { ar: "المطبقة", tn: "المطبقة", fr: "appliqué", en: "applied" }, is_correct: true, points: 30 },
            { translations: { ar: "البيتزا الإيطالية", tn: "البيتزا الإيطالية", fr: "pizza italienne", en: "Italian pizza" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 24,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مكونات أساسية تجدها في سندوتش 'الفريكاسي التونسي' التقليدي؟" },
            tn: { text: "أعطيني مكونات تلقاها في سندويتش 'الفريكاسي' التونسي التقليدي؟" },
            fr: { text: "Citez les ingrédients que l'on trouve dans un fricassé tunisien traditionnel ?" },
            en: { text: "Name the ingredients found in a traditional Tunisian fricassé sandwich?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "التن", tn: "التن", fr: "Le thon", en: "The tuna" }, is_correct: true, points: 10 },
            { translations: { ar: "الهريسة", tn: "الهريسة", fr: "Bouillie", en: "Mush" }, is_correct: true, points: 10 },
            { translations: { ar: "البطاطا المطبوخة", tn: "البطاطا المطبوخة", fr: "Pommes de terre cuites", en: "Cooked potatoes" }, is_correct: true, points: 15 },
            { translations: { ar: "البيض المسلوق", tn: "البيض المسلوق", fr: "Oeufs durs", en: "Boiled eggs" }, is_correct: true, points: 15 },
            { translations: { ar: "الزيتون", tn: "الزيتون", fr: "Olive", en: "Olive" }, is_correct: true, points: 20 },
            { translations: { ar: "العجينة المقلية", tn: "العجينة المقلية", fr: "Pâte frite", en: "Fried dough" }, is_correct: true, points: 25 },
            { translations: { ar: "الخيار المملح", tn: "الخيار المملح", fr: "Concombre salé", en: "Salted cucumber" }, is_correct: true, points: 30 },
            { translations: { ar: "البصل المفروم", tn: "البصل المفروم", fr: "Oignons hachés", en: "Chopped onions" }, is_correct: true, points: 35 },
            { translations: { ar: "المعدنوس", tn: "المعدنوس", fr: "Le serviteur", en: "The minion" }, is_correct: true, points: 40 },
            { translations: { ar: "الشوكولاتة", tn: "الشوكولاتة", fr: "Chocolat", en: "Chocolate" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 25,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مكونات صحن 'اللبلابي التونسي' الكلاسيكي؟" },
            tn: { text: "أعطيني مكونات صحن 'اللبلابي' التونسي الكلاسيكي؟" },
            fr: { text: "Citez les ingrédients d'un lablabi tunisien classique ?" },
            en: { text: "Name the ingredients of a classic Tunisian lablabi?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "الحمص", tn: "الحمص", fr: "Houmous", en: "Hummus" }, is_correct: true, points: 10 },
            { translations: { ar: "الخبز البايت", tn: "الخبز البايت", fr: "Mordre du pain", en: "Bite bread" }, is_correct: true, points: 10 },
            { translations: { ar: "الكمون", tn: "الكمون", fr: "Cumin", en: "Cumin" }, is_correct: true, points: 15 },
            { translations: { ar: "الهريسة", tn: "الهريسة", fr: "Bouillie", en: "Mush" }, is_correct: true, points: 15 },
            { translations: { ar: "الثوم", tn: "الثوم", fr: "Ail", en: "Garlic" }, is_correct: true, points: 20 },
            { translations: { ar: "زيت الزيتون", tn: "زيت الزيتون", fr: "huile d'olive", en: "olive oil" }, is_correct: true, points: 20 },
            { translations: { ar: "التن", tn: "التن", fr: "Le thon", en: "The tuna" }, is_correct: true, points: 25 },
            { translations: { ar: "البيض", tn: "البيض", fr: "Œufs", en: "Eggs" }, is_correct: true, points: 25 },
            { translations: { ar: "الكبار", tn: "الكبار", fr: "Adultes", en: "Adults" }, is_correct: true, points: 30 },
            { translations: { ar: "المعكرونة", tn: "المعكرونة", fr: "Pâtes", en: "Pasta" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 26,
        is_approved: true,
        translations: {
            ar: { text: "أذكر حلويات تونسية تقليدية مشهورة في المطبخ التونسي؟" },
            tn: { text: "أعطيني حلويات تونسية تقليدية معروفة؟" },
            fr: { text: "Citez des pâtisseries tunisiennes traditionnelles connues ?" },
            en: { text: "Name well-known traditional Tunisian sweets?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "المقروض", tn: "المقروض", fr: "prêté", en: "loaned" }, is_correct: true, points: 10 },
            { translations: { ar: "البقلاوة", tn: "البقلاوة", fr: "Baklavas", en: "Baklava" }, is_correct: true, points: 10 },
            { translations: { ar: "غريبة الحمص", tn: "غريبة الحمص", fr: "Houmous Ghariba", en: "Ghariba Hummus" }, is_correct: true, points: 15 },
            { translations: { ar: "كعك الورقة", tn: "كعك الورقة", fr: "Gâteaux en feuilles", en: "Sheet cakes" }, is_correct: true, points: 20 },
            { translations: { ar: "الصمصة", tn: "الصمصة", fr: "La sauce", en: "The sauce" }, is_correct: true, points: 20 },
            { translations: { ar: "زلابية", tn: "زلابية", fr: "boulette", en: "dumpling" }, is_correct: true, points: 25 },
            { translations: { ar: "المخارق", tn: "المخارق", fr: "Percées", en: "Breakthroughs" }, is_correct: true, points: 25 },
            { translations: { ar: "أذن القاضي", tn: "أذن القاضي", fr: "Le juge a autorisé", en: "The judge allowed" }, is_correct: true, points: 30 },
            { translations: { ar: "اليويو", tn: "اليويو", fr: "Yo-yo", en: "Yo-yo" }, is_correct: true, points: 35 },
            { translations: { ar: "الدونات", tn: "الدونات", fr: "Beignets", en: "Donuts" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 27,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أنواع من التمور أو الفواكه الجافة التي تشتهر بها تونس؟" },
            tn: { text: "أعطيني أنواع تمر أو فواكه جافة تشتهر بيهم تونس؟" },
            fr: { text: "Citez des variétés de dattes ou de fruits secs réputés en Tunisie ?" },
            en: { text: "Name varieties of dates or dried fruits Tunisia is known for?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "دقلة النور", tn: "دقلة النور", fr: "Deglet El Nour", en: "Deglet El Nour" }, is_correct: true, points: 10 },
            { translations: { ar: "العليق", tn: "العليق", fr: "Mûres", en: "Blackberries" }, is_correct: true, points: 20 },
            { translations: { ar: "البسر", tn: "البسر", fr: "Bassorah", en: "Basra" }, is_correct: true, points: 20 },
            { translations: { ar: "الفستق الحلبي", tn: "الفستق الحلبي", fr: "Pistaches", en: "Pistachios" }, is_correct: true, points: 25 },
            { translations: { ar: "اللوز التونسي", tn: "اللوز التونسي", fr: "Amandes tunisiennes", en: "Tunisian almonds" }, is_correct: true, points: 25 },
            { translations: { ar: "البوفريوة", tn: "البوفريوة", fr: "Boufrioua", en: "Boufrioua" }, is_correct: true, points: 30 },
            { translations: { ar: "الزبيب", tn: "الزبيب", fr: "Raisins secs", en: "Raisins" }, is_correct: true, points: 35 },
            { translations: { ar: "الصنوبر الحلبي", tn: "الصنوبر الحلبي", fr: "Pin d'Alep", en: "Aleppo pine" }, is_correct: true, points: 40 },
            { translations: { ar: "الجلجلان", tn: "الجلجلان", fr: "Les jingles", en: "The jingles" }, is_correct: true, points: 45 },
            { translations: { ar: "جوز الهند الاستوائي", tn: "جوز الهند الاستوائي", fr: "Noix de coco tropicale", en: "Tropical coconut" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 28,
        is_approved: true,
        translations: {
            ar: { text: "أذكر بهارات أو توابل تُستعمل بكثرة في المطبخ التونسي؟" },
            tn: { text: "أعطيني بهارات تتحط بالزّاف في الماكلة التونسية؟" },
            fr: { text: "Citez des épices largement utilisées dans la cuisine tunisienne ?" },
            en: { text: "Name spices widely used in Tunisian cuisine?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "التيبل والكروية", tn: "التيبل والكروية", fr: "Table et sphérique", en: "Table and spherical" }, is_correct: true, points: 10 },
            { translations: { ar: "الكمون", tn: "الكمون", fr: "Cumin", en: "Cumin" }, is_correct: true, points: 10 },
            { translations: { ar: "الكركم", tn: "الكركم", fr: "Curcuma", en: "Turmeric" }, is_correct: true, points: 15 },
            { translations: { ar: "الفلفل الأكحل", tn: "الفلفل الأكحل", fr: "Poivre noir", en: "Black pepper" }, is_correct: true, points: 15 },
            { translations: { ar: "الفلفل الزينة", tn: "الفلفل الزينة", fr: "Poivrons ornementaux", en: "Ornamental peppers" }, is_correct: true, points: 20 },
            { translations: { ar: "النعناع الشايح", tn: "النعناع الشايح", fr: "Thé à la menthe", en: "Mint tea" }, is_correct: true, points: 20 },
            { translations: { ar: "الزعفران", tn: "الزعفران", fr: "Safran", en: "Saffron" }, is_correct: true, points: 25 },
            { translations: { ar: "القرفة", tn: "القرفة", fr: "Cannelle", en: "Cinnamon" }, is_correct: true, points: 30 },
            { translations: { ar: "البسباس الجاف", tn: "البسباس الجاف", fr: "Bar sec", en: "Dry bass" }, is_correct: true, points: 35 },
            { translations: { ar: "الفانيليا السائلة", tn: "الفانيليا السائلة", fr: "Vanille liquide", en: "Liquid vanilla" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 29,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مشروبات تقليدية تونسية تُقدم في الصيف أو المناسبات؟" },
            tn: { text: "أعطيني مشروبات تقليدية تونسية تتقدم في الصيف أو في المناسبات؟" },
            fr: { text: "Citez des boissons traditionnelles tunisiennes servies en été ou lors d'occasions spéciales ?" },
            en: { text: "Name traditional Tunisian drinks served in summer or on special occasions?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "الشاي باللوز", tn: "الشاي باللوز", fr: "Thé aux amandes", en: "Almond tea" }, is_correct: true, points: 10 },
            { translations: { ar: "اللاقمي", tn: "اللاقمي", fr: "Al-Laqmi", en: "Al-Laqmi" }, is_correct: true, points: 15 },
            { translations: { ar: "عصير الليموناد", tn: "عصير الليموناد", fr: "Jus de limonade", en: "Lemonade juice" }, is_correct: true, points: 15 },
            { translations: { ar: "الروزاطة", tn: "الروزاطة", fr: "Rosacée", en: "Rosacea" }, is_correct: true, points: 20 },
            { translations: { ar: "الشنينة", tn: "الشنينة", fr: "Al-Shanina", en: "Al-Shanina" }, is_correct: true, points: 25 },
            { translations: { ar: "بوظة الفستق", tn: "بوظة الفستق", fr: "Glace à la pistache", en: "Pistachio ice cream" }, is_correct: true, points: 30 },
            { translations: { ar: "شاي بالصنوبر", tn: "شاي بالصنوبر", fr: "Thé de pin", en: "Pine tea" }, is_correct: true, points: 35 },
            { translations: { ar: "القهوة العربي", tn: "القهوة العربي", fr: "Café arabe", en: "Arabic coffee" }, is_correct: true, points: 40 },
            { translations: { ar: "عصير الرمان", tn: "عصير الرمان", fr: "Jus de grenade", en: "Pomegranate juice" }, is_correct: true, points: 45 },
            { translations: { ar: "مشروب الكولا الغازي", tn: "مشروب الكولا الغازي", fr: "Boisson gazeuse au cola", en: "Cola soft drink" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 30,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أنواع من الخبز التقليدي المحضر في البيوت التونسية؟" },
            tn: { text: "أعطيني أنواع خبز تقليدي يتحضر في الدور التونسية؟" },
            fr: { text: "Citez des types de pain traditionnel préparés dans les foyers tunisiens ?" },
            en: { text: "Name types of traditional bread prepared in Tunisian homes?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "خبز طابونة", tn: "خبز طابونة", fr: "Pain tabona", en: "Tabona bread" }, is_correct: true, points: 10 },
            { translations: { ar: "خبز ملاوي", tn: "خبز ملاوي", fr: "Pain du Malawi", en: "Malawi bread" }, is_correct: true, points: 10 },
            { translations: { ar: "خبز السميد", tn: "خبز السميد", fr: "Pain de semoule", en: "Semolina bread" }, is_correct: true, points: 15 },
            { translations: { ar: "خبز مبسس", tn: "خبز مبسس", fr: "Pain MBSS", en: "Mbss bread" }, is_correct: true, points: 20 },
            { translations: { ar: "خبز الدار", tn: "خبز الدار", fr: "Pain maison", en: "Home bread" }, is_correct: true, points: 20 },
            { translations: { ar: "المطبقة", tn: "المطبقة", fr: "appliqué", en: "applied" }, is_correct: true, points: 25 },
            { translations: { ar: "الكسرة التونسية", tn: "الكسرة التونسية", fr: "Kasra tunisienne", en: "Tunisian Kasra" }, is_correct: true, points: 30 },
            { translations: { ar: "خبز الفتات", tn: "خبز الفتات", fr: "Chapelure", en: "Bread crumbs" }, is_correct: true, points: 35 },
            { translations: { ar: "خبز القمح", tn: "خبز القمح", fr: "Pain de blé", en: "Wheat bread" }, is_correct: true, points: 40 },
            { translations: { ar: "الباغيت الفرنسي", tn: "الباغيت الفرنسي", fr: "Baguette française", en: "French baguette" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 31,
        is_approved: true,
        translations: {
            ar: { text: "أذكر كلمات تونسية بالدارجة تُستعمل للترحيب أو السؤال عن الحال؟" },
            tn: { text: "أعطيني كلمات بالدارجة التونسية نقولوها باش نرحبو أو نسألو على الحال؟" },
            fr: { text: "Citez des mots en dialecte tunisien utilisés pour saluer ou demander des nouvelles ?" },
            en: { text: "Name Tunisian dialect words used for greeting or asking how someone is?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "شنحوالك", tn: "شنحوالك", fr: "Comment vas-tu?", en: "How are you?" }, is_correct: true, points: 10 },
            { translations: { ar: "شني أحوالك", tn: "شني أحوالك", fr: "Comment vas-tu?", en: "How are you?" }, is_correct: true, points: 10 },
            { translations: { ar: "شخبارك", tn: "شخبارك", fr: "Quelles sont vos nouvelles ?", en: "What's your news?" }, is_correct: true, points: 15 },
            { translations: { ar: "يا هلا", tn: "يا هلا", fr: "Hourra", en: "Hurray" }, is_correct: true, points: 20 },
            { translations: { ar: "عسلاّمة", tn: "عسلاّمة", fr: "Asalama", en: "Asalama" }, is_correct: true, points: 10 },
            { translations: { ar: "شني الأمور", tn: "شني الأمور", fr: "Que se passe-t-il?", en: "What's going on?" }, is_correct: true, points: 20 },
            { translations: { ar: "لاباس", tn: "لاباس", fr: "décent", en: "decent" }, is_correct: true, points: 15 },
            { translations: { ar: "شحوالك", tn: "شحوالك", fr: "Comment vas-tu?", en: "How are you?" }, is_correct: true, points: 25 },
            { translations: { ar: "شنية أحوال العائلة", tn: "شنية أحوال العائلة", fr: "Quelle est la situation familiale ?", en: "What is the family situation?" }, is_correct: true, points: 30 },
            { translations: { ar: "إزيك يا زول", tn: "إزيك يا زول", fr: "Comment vas-tu, mec ?", en: "How are you, man?" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 32,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أسماء لقطع أثاث أو أدوات منزلية بالدارجة التونسية؟" },
            tn: { text: "أعطيني أسامي بالدارجة لقطع أثاث أو أدوات في الدار؟" },
            fr: { text: "Citez des noms en dialecte tunisien de meubles ou d'objets domestiques ?" },
            en: { text: "Name Tunisian dialect words for furniture or household items?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "المنقالة", tn: "المنقالة", fr: "La civière", en: "The stretcher" }, is_correct: true, points: 10 },
            { translations: { ar: "المحبس", tn: "المحبس", fr: "Le robinet", en: "The stopcock" }, is_correct: true, points: 15 },
            { translations: { ar: "السرير", tn: "السرير", fr: "Lit", en: "Bed" }, is_correct: true, points: 20 },
            { translations: { ar: "الكانابي", tn: "الكانابي", fr: "Canapés", en: "Canapes" }, is_correct: true, points: 20 },
            { translations: { ar: "الكومود", tn: "الكومود", fr: "La commode", en: "The commode" }, is_correct: true, points: 25 },
            { translations: { ar: "المرفع", tn: "المرفع", fr: "L'élévateur", en: "The lifter" }, is_correct: true, points: 30 },
            { translations: { ar: "القصعة", tn: "القصعة", fr: "Le bol", en: "The bowl" }, is_correct: true, points: 30 },
            { translations: { ar: "المقفول", tn: "المقفول", fr: "Fermé", en: "Locked" }, is_correct: true, points: 35 },
            { translations: { ar: "الكسكاس", tn: "الكسكاس", fr: "Couscous", en: "Couscous" }, is_correct: true, points: 40 },
            { translations: { ar: "التلفاز الذكي", tn: "التلفاز الذكي", fr: "Télévision intelligente", en: "Smart TV" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 33,
        is_approved: true,
        translations: {
            ar: { text: "أذكر كلمات بالدارجة التونسية تُطلق على أفراد العائلة أو الأقارب؟" },
            tn: { text: "أعطيني كلمات بالدارجة نقولوها على أفراد العايلة أو القرايب؟" },
            fr: { text: "Citez des mots en dialecte tunisien désignant les membres de la famille ou les proches ?" },
            en: { text: "Name Tunisian dialect words for family members or relatives?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "أمي", tn: "أمي", fr: "Ma mère", en: "My mom" }, is_correct: true, points: 10 },
            { translations: { ar: "بابا", tn: "بابا", fr: "Papa", en: "Daddy" }, is_correct: true, points: 10 },
            { translations: { ar: "خويا", tn: "خويا", fr: "Mon frère", en: "My brother" }, is_correct: true, points: 10 },
            { translations: { ar: "أختي", tn: "أختي", fr: "ma sœur", en: "my sister" }, is_correct: true, points: 10 },
            { translations: { ar: "سيدي", tn: "سيدي", fr: "mon seigneur", en: "my lord" }, is_correct: true, points: 15 },
            { translations: { ar: "للا", tn: "للا", fr: "Non", en: "No" }, is_correct: true, points: 15 },
            { translations: { ar: "حنا", tn: "حنا", fr: "Hanna", en: "Hanna" }, is_correct: true, points: 20 },
            { translations: { ar: "جداتي", tn: "جداتي", fr: "Mes grands-mères", en: "My grandmothers" }, is_correct: true, points: 20 },
            { translations: { ar: "العزوزة", tn: "العزوزة", fr: "Azoza", en: "Azoza" }, is_correct: true, points: 25 },
            { translations: { ar: "ألفريدو", tn: "ألفريدو", fr: "Alfredo", en: "Alfredo" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 34,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ألوان بالعامية التونسية تستعمل في وصف الأشياء؟" },
            tn: { text: "أعطيني ألوان بالدارجة التونسية نستعملوها باش نوصفو الحاجات؟" },
            fr: { text: "Citez des couleurs en dialecte tunisien utilisées pour décrire les objets ?" },
            en: { text: "Name colors in Tunisian dialect used to describe things?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "أزرق", tn: "أزرق", fr: "bleu", en: "blue" }, is_correct: true, points: 10 },
            { translations: { ar: "أحمر", tn: "أحمر", fr: "rouge", en: "red" }, is_correct: true, points: 10 },
            { translations: { ar: "أكحل", tn: "أكحل", fr: "Eye-liner", en: "Eyeliner" }, is_correct: true, points: 10 },
            { translations: { ar: "أبيض", tn: "أبيض", fr: "blanc", en: "white" }, is_correct: true, points: 10 },
            { translations: { ar: "أصفر", tn: "أصفر", fr: "jaune", en: "yellow" }, is_correct: true, points: 10 },
            { translations: { ar: "أخضر", tn: "أخضر", fr: "vert", en: "green" }, is_correct: true, points: 10 },
            { translations: { ar: "أشقر", tn: "أشقر", fr: "blond", en: "blond" }, is_correct: true, points: 20 },
            { translations: { ar: "روز", tn: "روز", fr: "Rose", en: "Rose" }, is_correct: true, points: 20 },
            { translations: { ar: "موف", tn: "موف", fr: "Se déplacer", en: "Move" }, is_correct: true, points: 20 },
            { translations: { ar: "Ultra Violet", tn: "Ultra Violet", fr: "Ultra Violet", en: "Ultra Violet" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 35,
        is_approved: true,
        translations: {
            ar: { text: "أذكر كلمات بالعامية التونسية تُعبر عن مشاعر الغضب أو الانزعاج؟" },
            tn: { text: "أعطيني كلمات بالدارجة نقولوها كي نتغاضبو ولا نتضايقو؟" },
            fr: { text: "Citez des mots en dialecte tunisien exprimant la colère ou l'agacement ?" },
            en: { text: "Name Tunisian dialect words expressing anger or annoyance?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "فادد", tn: "فادد", fr: "Faddad", en: "Faddad" }, is_correct: true, points: 10 },
            { translations: { ar: "قلقان", tn: "قلقان", fr: "Inquiet", en: "Worried" }, is_correct: true, points: 10 },
            { translations: { ar: "مغشّش", tn: "مغشّش", fr: "Frauduleux", en: "Fraudulent" }, is_correct: true, points: 15 },
            { translations: { ar: "متغشش", tn: "متغشش", fr: "Ne triche pas", en: "Don't cheat" }, is_correct: true, points: 15 },
            { translations: { ar: "منرفز", tn: "منرفز", fr: "nerveux", en: "edgy" }, is_correct: true, points: 20 },
            { translations: { ar: "طالعلي الدم", tn: "طالعلي الدم", fr: "Regarde le sang", en: "Look at the blood" }, is_correct: true, points: 25 },
            { translations: { ar: "روحي في خناقي", tn: "روحي في خناقي", fr: "Mon âme est dans ma gorge", en: "My soul is in my throat" }, is_correct: true, points: 30 },
            { translations: { ar: "مستكي", tn: "مستكي", fr: "Mestaki", en: "Mestaki" }, is_correct: true, points: 35 },
            { translations: { ar: "مكبّب", tn: "مكبّب", fr: "Foutu", en: "Mucked up" }, is_correct: true, points: 40 },
            { translations: { ar: "فرحان", tn: "فرحان", fr: "Hilarant", en: "Hilarious" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 36,
        is_approved: true,
        translations: {
            ar: { text: "أذكر كلمات بالعامية التونسية تدل على وسائل النقل والمواصلات؟" },
            tn: { text: "أعطيني كلمات بالدارجة على وسائل النقل؟" },
            fr: { text: "Citez des mots en dialecte tunisien désignant les moyens de transport ?" },
            en: { text: "Name Tunisian dialect words for means of transport?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "الكار", tn: "الكار", fr: "La voiture", en: "The car" }, is_correct: true, points: 10 },
            { translations: { ar: "الكروسة", tn: "الكروسة", fr: "Croissant", en: "Croissant" }, is_correct: true, points: 10 },
            { translations: { ar: "البسكلات", tn: "البسكلات", fr: "Les pois", en: "The peas" }, is_correct: true, points: 15 },
            { translations: { ar: "الموتور", tn: "الموتور", fr: "Le moteur", en: "The motor" }, is_correct: true, points: 15 },
            { translations: { ar: "الترامواى", tn: "الترامواى", fr: "Tramway", en: "Tramway" }, is_correct: true, points: 20 },
            { translations: { ar: "القطار", tn: "القطار", fr: "Le train", en: "The train" }, is_correct: true, points: 20 },
            { translations: { ar: "التاكسي جماعي", tn: "التاكسي جماعي", fr: "Le taxi est collectif", en: "Taxi is collective" }, is_correct: true, points: 25 },
            { translations: { ar: "اللوّاج", tn: "اللوّاج", fr: "Les rapports sexuels", en: "The intercourse" }, is_correct: true, points: 25 },
            { translations: { ar: "بابور", tn: "بابور", fr: "Babur", en: "Babur" }, is_correct: true, points: 30 },
            { translations: { ar: "طائرة F-16", tn: "طائرة F-16", fr: "avion F-16", en: "F-16 plane" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 37,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مفردات بالعامية التونسية تُعبر عن الطقس وحالات الجو؟" },
            tn: { text: "أعطيني كلمات بالدارجة نقولوها على الطقس والجو؟" },
            fr: { text: "Citez des mots en dialecte tunisien pour parler de la météo ?" },
            en: { text: "Name Tunisian dialect words used to talk about the weather?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "سخانة", tn: "سخانة", fr: "Chauffage", en: "Heater" }, is_correct: true, points: 10 },
            { translations: { ar: "البرْد", tn: "البرْد", fr: "Le froid", en: "The cold" }, is_correct: true, points: 10 },
            { translations: { ar: "القرة", tn: "القرة", fr: "Al-Qara", en: "Al-Qara" }, is_correct: true, points: 20 },
            { translations: { ar: "النوّ", tn: "النوّ", fr: "Noé", en: "Noah" }, is_correct: true, points: 20 },
            { translations: { ar: "المطر تصب", tn: "المطر تصب", fr: "La pluie tombe", en: "Rain is pouring" }, is_correct: true, points: 25 },
            { translations: { ar: "عجاج", tn: "عجاج", fr: "Ajaj", en: "Ajaj" }, is_correct: true, points: 25 },
            { translations: { ar: "ريح شرش", tn: "ريح شرش", fr: "Un mauvais vent", en: "A bad wind" }, is_correct: true, points: 30 },
            { translations: { ar: "الشهيلي", tn: "الشهيلي", fr: "Alshahili", en: "Alshahili" }, is_correct: true, points: 35 },
            { translations: { ar: "صقيع", tn: "صقيع", fr: "gel", en: "frost" }, is_correct: true, points: 40 },
            { translations: { ar: "تسونامي", tn: "تسونامي", fr: "tsunami", en: "tsunami" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 38,
        is_approved: true,
        translations: {
            ar: { text: "أذكر كلمات بالعامية التونسية تعني السرعة أو الاستعجال؟" },
            tn: { text: "أعطيني كلمات بالدارجة تعني الزربة أو الاستعجال؟" },
            fr: { text: "Citez des mots en dialecte tunisien qui expriment la rapidité ou l'urgence ?" },
            en: { text: "Name Tunisian dialect words meaning speed or urgency?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "فيسع", tn: "فيسع", fr: "C'est spacieux", en: "It is spacious" }, is_correct: true, points: 10 },
            { translations: { ar: "بالزربة", tn: "بالزربة", fr: "Aux céréales", en: "With cereals" }, is_correct: true, points: 15 },
            { translations: { ar: "أجري", tn: "أجري", fr: "Courir", en: "Run" }, is_correct: true, points: 20 },
            { translations: { ar: "تخطف خطف", tn: "تخطف خطف", fr: "Enlevé kidnappé", en: "Kidnapped kidnapped" }, is_correct: true, points: 25 },
            { translations: { ar: "طيران", tn: "طيران", fr: "compagnie aérienne", en: "airline" }, is_correct: true, points: 30 },
            { translations: { ar: "خف يدك", tn: "خف يدك", fr: "Allégez votre main", en: "Lighten your hand" }, is_correct: true, points: 35 },
            { translations: { ar: "سريع", tn: "سريع", fr: "rapide", en: "fast" }, is_correct: true, points: 40 },
            { translations: { ar: "تزرب", tn: "تزرب", fr: "TSRB", en: "TSRB" }, is_correct: true, points: 45 },
            { translations: { ar: "طير", tn: "طير", fr: "oiseau", en: "bird" }, is_correct: true, points: 50 },
            { translations: { ar: "بالسياسة", tn: "بالسياسة", fr: "Avec la politique", en: "With politics" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 39,
        is_approved: true,
        translations: {
            ar: { text: "أذكر كلمات تونسية دارجة لوصف المال أو العملات النقدية؟" },
            tn: { text: "أعطيني كلمات بالدارجة نقولوها على الفلوس؟" },
            fr: { text: "Citez des mots en dialecte tunisien désignant l'argent ?" },
            en: { text: "Name Tunisian dialect words for money?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "الفلوس", tn: "الفلوس", fr: "Argent", en: "Money" }, is_correct: true, points: 10 },
            { translations: { ar: "الدينار", tn: "الدينار", fr: "Dinar", en: "Dinar" }, is_correct: true, points: 10 },
            { translations: { ar: "الفرنك", tn: "الفرنك", fr: "Le franc", en: "The franc" }, is_correct: true, points: 15 },
            { translations: { ar: "الصوردي", tn: "الصوردي", fr: "Sourd", en: "Sourdi" }, is_correct: true, points: 20 },
            { translations: { ar: "القصة", tn: "القصة", fr: "L'histoire", en: "The story" }, is_correct: true, points: 25 },
            { translations: { ar: "الباكو", tn: "الباكو", fr: "Albaco", en: "Albaco" }, is_correct: true, points: 30 },
            { translations: { ar: "الطرف", tn: "الطرف", fr: "Faire la fête", en: "Party" }, is_correct: true, points: 35 },
            { translations: { ar: "الشيليت", tn: "الشيليت", fr: "Shellite", en: "Shellite" }, is_correct: true, points: 40 },
            { translations: { ar: "المليون", tn: "المليون", fr: "Million", en: "Million" }, is_correct: true, points: 45 },
            { translations: { ar: "الدولار", tn: "الدولار", fr: "Dollar", en: "Dollar" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 40,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مفردات عامية تونسية لوصف الملابس أو الأزياء اليومية؟" },
            tn: { text: "أعطيني كلمات بالدارجة على الحوايج والألبسة؟" },
            fr: { text: "Citez des mots en dialecte tunisien désignant les vêtements ?" },
            en: { text: "Name Tunisian dialect words for clothes?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "السورية", tn: "السورية", fr: "syrien", en: "Syrian" }, is_correct: true, points: 10 },
            { translations: { ar: "المريول", tn: "المريول", fr: "Tablier", en: "Apron" }, is_correct: true, points: 10 },
            { translations: { ar: "الفيستة", tn: "الفيستة", fr: "La fête", en: "The festa" }, is_correct: true, points: 15 },
            { translations: { ar: "الصباط", tn: "الصباط", fr: "Officiers", en: "Officers" }, is_correct: true, points: 15 },
            { translations: { ar: "الشرت", tn: "الشرت", fr: "Partage", en: "Shart" }, is_correct: true, points: 20 },
            { translations: { ar: "القشابية", tn: "القشابية", fr: "Al-Qachabia", en: "Al-Qashabia" }, is_correct: true, points: 25 },
            { translations: { ar: "الكبوط", tn: "الكبوط", fr: "Le capop", en: "The capop" }, is_correct: true, points: 25 },
            { translations: { ar: "المنديل", tn: "المنديل", fr: "Le mouchoir", en: "The handkerchief" }, is_correct: true, points: 30 },
            { translations: { ar: "الشلاكة", tn: "الشلاكة", fr: "Al-Shalaka", en: "Al-Shalaka" }, is_correct: true, points: 35 },
            { translations: { ar: "البيكيني", tn: "البيكيني", fr: "Bikini", en: "Bikini" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 41,
        is_approved: true,
        translations: {
            ar: { text: "أذكر فنانين ومطربين تونسيين كبار في الطرب الشعبي أو الكلاسيكي؟" },
            tn: { text: "أعطيني فنانين ومطربين تونسيين كبار في الطرب الشعبي أو الكلاسيكي؟" },
            fr: { text: "Citez de grands artistes et chanteurs tunisiens de musique populaire ou classique ?" },
            en: { text: "Name major Tunisian artists and singers in popular or classical music?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "علي الرياحي", tn: "علي الرياحي", fr: "Ali Al-Riahi", en: "Ali Al-Riahi" }, is_correct: true, points: 10 },
            { translations: { ar: "الهادي الجويني", tn: "الهادي الجويني", fr: "Al-Hadi Al-Juwayni", en: "Al-Hadi Al-Juwayni" }, is_correct: true, points: 10 },
            { translations: { ar: "صليحة", tn: "صليحة", fr: "Saliha", en: "Saliha" }, is_correct: true, points: 15 },
            { translations: { ar: "نعمة", tn: "نعمة", fr: "bénédiction", en: "blessing" }, is_correct: true, points: 15 },
            { translations: { ar: "علية", tn: "علية", fr: "grenier", en: "attic" }, is_correct: true, points: 20 },
            { translations: { ar: "الهادي حبوبة", tn: "الهادي حبوبة", fr: "Al-Hadi Habouba", en: "Al-Hadi Habouba" }, is_correct: true, points: 25 },
            { translations: { ar: "لطفي بوشناق", tn: "لطفي بوشناق", fr: "Lotfi Bouchnak", en: "Lotfi Bouchnak" }, is_correct: true, points: 20 },
            { translations: { ar: "صابر الرباعي", tn: "صابر الرباعي", fr: "Sabre Al-Rubai", en: "Saber Al-Rubai" }, is_correct: true, points: 25 },
            { translations: { ar: "زياد غرسة", tn: "زياد غرسة", fr: "Ziad Gharsa", en: "Ziad Gharsa" }, is_correct: true, points: 30 },
            { translations: { ar: "عمرو دياب", tn: "عمرو دياب", fr: "Amr Diab", en: "Amr Diab" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 42,
        is_approved: true,
        translations: {
            ar: { text: "أذكر آلات موسيقية تقليدية تُعزف في تونس؟" },
            tn: { text: "أعطيني آلات موسيقية تقليدية يلعبو بيها في تونس؟" },
            fr: { text: "Citez des instruments de musique traditionnels joués en Tunisie ?" },
            en: { text: "Name traditional musical instruments played in Tunisia?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "المزود", tn: "المزود", fr: "fournisseur", en: "supplier" }, is_correct: true, points: 10 },
            { translations: { ar: "الدربوكة", tn: "الدربوكة", fr: "Darbouka", en: "Darbuka" }, is_correct: true, points: 10 },
            { translations: { ar: "العود التونسي", tn: "العود التونسي", fr: "Oud tunisien", en: "Tunisian oud" }, is_correct: true, points: 15 },
            { translations: { ar: "البندير", tn: "البندير", fr: "Al Bandir", en: "Al-Bandir" }, is_correct: true, points: 15 },
            { translations: { ar: "الناي", tn: "الناي", fr: "Flûte", en: "Flute" }, is_correct: true, points: 20 },
            { translations: { ar: "الطار", tn: "الطار", fr: "La mouche", en: "The fly" }, is_correct: true, points: 20 },
            { translations: { ar: "القانون", tn: "القانون", fr: "la loi", en: "the law" }, is_correct: true, points: 25 },
            { translations: { ar: "الكمنجة", tn: "الكمنجة", fr: "Violon", en: "Violin" }, is_correct: true, points: 25 },
            { translations: { ar: "القرقابو", tn: "القرقابو", fr: "Qarqabo", en: "Qarqabo" }, is_correct: true, points: 30 },
            { translations: { ar: "الدرامز الإلكتروني", tn: "الدرامز الإلكتروني", fr: "Batteur électronique", en: "Electronic drummer" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 43,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مسلسلات تونسية كوميدية أو درامية مشهورة تُعرض في رمضان؟" },
            tn: { text: "أعطيني مسلسلات تونسية كوميدية أو دراما معروفة تتعرض في رمضان؟" },
            fr: { text: "Citez des séries tunisiennes comiques ou dramatiques connues diffusées pendant le Ramadan ?" },
            en: { text: "Name well-known Tunisian comedy or drama series aired during Ramadan?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "شوفلي حل", tn: "شوفلي حل", fr: "Trouver une solution", en: "Find out a solution" }, is_correct: true, points: 10 },
            { translations: { ar: "الخطاب على الباب", tn: "الخطاب على الباب", fr: "La lettre est sur la porte", en: "The letter is on the door" }, is_correct: true, points: 10 },
            { translations: { ar: "نسيبتي العزيزة", tn: "نسيبتي العزيزة", fr: "Ma chère belle-sœur", en: "My dear sister-in-law" }, is_correct: true, points: 10 },
            { translations: { ar: "مكتوب", tn: "مكتوب", fr: "écrit", en: "written" }, is_correct: true, points: 15 },
            { translations: { ar: "صيد الريم", tn: "صيد الريم", fr: "Pêche à Réem", en: "Reem fishing" }, is_correct: true, points: 20 },
            { translations: { ar: "أولاد مفيدة", tn: "أولاد مفيدة", fr: "Garçons utiles", en: "Useful boys" }, is_correct: true, points: 20 },
            { translations: { ar: "قمرة سيدي المحروس", tn: "قمرة سيدي المحروس", fr: "Cabane Sidi El Mahrous", en: "Sidi El Mahrous cabin" }, is_correct: true, points: 25 },
            { translations: { ar: "حسابات وعقابات", tn: "حسابات وعقابات", fr: "Comptes et pénalités", en: "Accounts and penalties" }, is_correct: true, points: 25 },
            { translations: { ar: "الفوندو", tn: "الفوندو", fr: "Fondue", en: "Fondue" }, is_correct: true, points: 30 },
            { translations: { ar: "باب الحارة", tn: "باب الحارة", fr: "Bab Al-Hara", en: "Bab Al-Hara" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 44,
        is_approved: true,
        translations: {
            ar: { text: "أذكر شخصيات خيالية أو حقيقية من المسلسل التونسي الشهير 'شوفلي حل'؟" },
            tn: { text: "أعطيني شخصيات من مسلسل 'شوفلي حل'؟" },
            fr: { text: "Citez des personnages de la célèbre série tunisienne « Choufli Hal » ?" },
            en: { text: "Name characters from the famous Tunisian series \"Choufli Hal\"?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "الباجي", tn: "الباجي", fr: "Le buggy", en: "The buggy" }, is_correct: true, points: 10 },
            { translations: { ar: "سليمان الأبيض", tn: "سليمان الأبيض", fr: "Soliman le blanc", en: "Suleiman the white" }, is_correct: true, points: 10 },
            { translations: { ar: "السبوعي", tn: "السبوعي", fr: "L'hebdomadaire", en: "The weekly" }, is_correct: true, points: 10 },
            { translations: { ar: "زينب", tn: "زينب", fr: "Zainab", en: "Zainab" }, is_correct: true, points: 15 },
            { translations: { ar: "دوجة", tn: "دوجة", fr: "Dougga", en: "Dougga" }, is_correct: true, points: 15 },
            { translations: { ar: "فوشيكة", tn: "فوشيكة", fr: "Fushika", en: "Fushika" }, is_correct: true, points: 20 },
            { translations: { ar: "أماني", tn: "أماني", fr: "Mes souhaits", en: "My wishes" }, is_correct: true, points: 20 },
            { translations: { ar: "جميلة", tn: "جميلة", fr: "beau", en: "beautiful" }, is_correct: true, points: 25 },
            { translations: { ar: "شكيب", tn: "شكيب", fr: "Chakib", en: "Shakib" }, is_correct: true, points: 25 },
            { translations: { ar: "معتز", tn: "معتز", fr: "Moataz", en: "Moataz" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 45,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ملابس أو أزياء تقليدية تونسية رجالية أو نسائية؟" },
            tn: { text: "أعطيني حوايج أو أزياء تقليدية تونسية رجالة أو نسوان؟" },
            fr: { text: "Citez des vêtements ou tenues traditionnelles tunisiennes, hommes ou femmes ?" },
            en: { text: "Name traditional Tunisian clothing or attire, for men or women?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "الجبة", tn: "الجبة", fr: "La robe", en: "The robe" }, is_correct: true, points: 10 },
            { translations: { ar: "الشاشية", tn: "الشاشية", fr: "L'écran", en: "The screen" }, is_correct: true, points: 10 },
            { translations: { ar: "البرنوس", tn: "البرنوس", fr: "Albernos", en: "Albernos" }, is_correct: true, points: 15 },
            { translations: { ar: "السفساري", tn: "السفساري", fr: "Al-Safsari", en: "Al-Safsari" }, is_correct: true, points: 15 },
            { translations: { ar: "القشابية", tn: "القشابية", fr: "Al-Qachabia", en: "Al-Qashabia" }, is_correct: true, points: 20 },
            { translations: { ar: "الكدروون", tn: "الكدروون", fr: "Les mauvais", en: "The bad ones" }, is_correct: true, points: 25 },
            { translations: { ar: "الفرملة", tn: "الفرملة", fr: "Freinage", en: "Braking" }, is_correct: true, points: 25 },
            { translations: { ar: "الفوطة والبلوزة", tn: "الفوطة والبلوزة", fr: "La serviette et le chemisier", en: "The towel and the blouse" }, is_correct: true, points: 30 },
            { translations: { ar: "البلغة", tn: "البلغة", fr: "Balgha", en: "Balgha" }, is_correct: true, points: 30 },
            { translations: { ar: "الساري الهندي", tn: "الساري الهندي", fr: "saris indiens", en: "Indian sarees" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 46,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مهرجانات دولية أو محلية تُقام سنوياً في تونس؟" },
            tn: { text: "أعطيني مهرجانات دولية أو محلية تتنظم كل عام في تونس؟" },
            fr: { text: "Citez des festivals internationaux ou locaux organisés chaque année en Tunisie ?" },
            en: { text: "Name international or local festivals held every year in Tunisia?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "أيام قرطاج السينمائية", tn: "أيام قرطاج السينمائية", fr: "Journées du cinéma de Carthage", en: "Carthage Cinema Days" }, is_correct: true, points: 10 },
            { translations: { ar: "مهرجان قرطاج الدولي", tn: "مهرجان قرطاج الدولي", fr: "Festival international de Carthage", en: "Carthage International Festival" }, is_correct: true, points: 10 },
            { translations: { ar: "مهرجان الحمامات الدولي", tn: "مهرجان الحمامات الدولي", fr: "Festival international d'Hammamet", en: "Hammamet International Festival" }, is_correct: true, points: 15 },
            { translations: { ar: "أيام قرطاج المسرحية", tn: "أيام قرطاج المسرحية", fr: "Journées théâtrales de Carthage", en: "Theatrical days of Carthage" }, is_correct: true, points: 15 },
            { translations: { ar: "مهرجان الجم للموسيقى السمفونية", tn: "مهرجان الجم للموسيقى السمفونية", fr: "Festival de musique symphonique d'El Jem", en: "El Jem Symphonic Music Festival" }, is_correct: true, points: 20 },
            { translations: { ar: "مهرجان الصحراء بدوز", tn: "مهرجان الصحراء بدوز", fr: "Fête du Désert à Douz", en: "Desert Festival in Douz" }, is_correct: true, points: 20 },
            { translations: { ar: "مهرجان الواحات بتوزر", tn: "مهرجان الواحات بتوزر", fr: "Festival des Oasis à Tozeur", en: "Oasis Festival in Tozeur" }, is_correct: true, points: 25 },
            { translations: { ar: "مهرجان قفصة الدولي", tn: "مهرجان قفصة الدولي", fr: "Festival international de Gafsa", en: "Gafsa International Festival" }, is_correct: true, points: 30 },
            { translations: { ar: "مهرجان بنزرت الدولي", tn: "مهرجان بنزرت الدولي", fr: "Festival international de Bizerte", en: "Bizerte International Festival" }, is_correct: true, points: 35 },
            { translations: { ar: "مهرجان كلوشيلا", tn: "مهرجان كلوشيلا", fr: "Fête de Claucella", en: "Claucella Festival" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 47,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مخرجين أو منتجين في السينما التونسية؟" },
            tn: { text: "أعطيني مخرجين أو منتجين في السينما التونسية؟" },
            fr: { text: "Citez des réalisateurs ou producteurs du cinéma tunisien ?" },
            en: { text: "Name directors or producers in Tunisian cinema?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "النوري بوزيد", tn: "النوري بوزيد", fr: "Nouri Bouzid", en: "Nouri Bouzid" }, is_correct: true, points: 15 },
            { translations: { ar: "مفيدة التلاتلي", tn: "مفيدة التلاتلي", fr: "Mufida Al-Tlatli", en: "Mufida Al-Tlatli" }, is_correct: true, points: 20 },
            { translations: { ar: "عبد اللطيف كشيش", tn: "عبد اللطيف كشيش", fr: "Abdel Latif Kechiche", en: "Abdel Latif Kechiche" }, is_correct: true, points: 20 },
            { translations: { ar: "كوثر بن هنية", tn: "كوثر بن هنية", fr: "Kawthar ben Haniyeh", en: "Kawthar bin Haniyeh" }, is_correct: true, points: 25 },
            { translations: { ar: "فريد بوغدير", tn: "فريد بوغدير", fr: "Farid Boughedir", en: "Farid Boughedir" }, is_correct: true, points: 25 },
            { translations: { ar: "سلمى بكار", tn: "سلمى بكار", fr: "Salma Bakkar", en: "Salma Bakkar" }, is_correct: true, points: 30 },
            { translations: { ar: "محمد دمق", tn: "محمد دمق", fr: "Mohammed Damak", en: "Muhammad Damak" }, is_correct: true, points: 35 },
            { translations: { ar: "منصف ذويب", tn: "منصف ذويب", fr: "Moncef Dhouib", en: "Moncef Dhouib" }, is_correct: true, points: 40 },
            { translations: { ar: "رضا الباهي", tn: "رضا الباهي", fr: "Réda Al-Bahi", en: "Reda Al-Bahi" }, is_correct: true, points: 45 },
            { translations: { ar: "Steven Spielberg", tn: "Steven Spielberg", fr: "Steven Spielberg", en: "Steven Spielberg" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 48,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مغنين راب تونسيين مشهورين؟" },
            tn: { text: "أعطيني رابورز (مغنين راب) تونسيين معروفين؟" },
            fr: { text: "Citez des rappeurs tunisiens connus ?" },
            en: { text: "Name well-known Tunisian rappers?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "بلطي", tn: "بلطي", fr: "baltique", en: "Baltic" }, is_correct: true, points: 10 },
            { translations: { ar: "علاء", tn: "علاء", fr: "Alaa", en: "Alaa" }, is_correct: true, points: 15 },
            { translations: { ar: "كافون", tn: "كافون", fr: "Kafon", en: "Kafon" }, is_correct: true, points: 15 },
            { translations: { ar: "أرماستا", tn: "أرماستا", fr: "Armasta", en: "Armasta" }, is_correct: true, points: 20 },
            { translations: { ar: "مروان نوردو", tn: "مروان نوردو", fr: "Marwan Nordou", en: "Marwan Nordou" }, is_correct: true, points: 20 },
            { translations: { ar: "سمارا", tn: "سمارا", fr: "Samara", en: "Samara" }, is_correct: true, points: 25 },
            { translations: { ar: "الجنرال", tn: "الجنرال", fr: "Gén.", en: "Gen" }, is_correct: true, points: 30 },
            { translations: { ar: "بلينقز", tn: "بلينقز", fr: "Bling", en: "Blings" }, is_correct: true, points: 35 },
            { translations: { ar: "كلاي بي بي جي", tn: "كلاي بي بي جي", fr: "Argile PPG", en: "Clay PPG" }, is_correct: true, points: 40 },
            { translations: { ar: "Eminem", tn: "Eminem", fr: "Eminem", en: "Eminem" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 49,
        is_approved: true,
        translations: {
            ar: { text: "أذكر روايات أو مؤلفات شهيرة لكتاب تونسيين؟" },
            tn: { text: "أعطيني روايات أو كتب معروفة لكتاب تونسيين؟" },
            fr: { text: "Citez des romans ou œuvres célèbres d'écrivains tunisiens ?" },
            en: { text: "Name famous novels or works by Tunisian writers?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "مقدمة ابن خلدون", tn: "مقدمة ابن خلدون", fr: "Introduction par Ibn Khaldun", en: "Introduction by Ibn Khaldun" }, is_correct: true, points: 10 },
            { translations: { ar: "أغاني الحياة", tn: "أغاني الحياة", fr: "Chansons de la vie", en: "Life songs" }, is_correct: true, points: 15 },
            { translations: { ar: "السد", tn: "السد", fr: "Barrage", en: "Dam" }, is_correct: true, points: 20 },
            { translations: { ar: "حدث أبو هريرة قال", tn: "حدث أبو هريرة قال", fr: "Il a été rapporté qu'Abou Hurairah a dit", en: "It was narrated that Abu Hurairah said" }, is_correct: true, points: 25 },
            { translations: { ar: "المرأة والعمل", tn: "المرأة والعمل", fr: "Les femmes et le travail", en: "Women and work" }, is_correct: true, points: 30 },
            { translations: { ar: "دار الباشا", tn: "دار الباشا", fr: "Dar Al-Pacha", en: "Dar Al-Pasha" }, is_correct: true, points: 35 },
            { translations: { ar: "موت فوضوي", tn: "موت فوضوي", fr: "Mort désordonnée", en: "Messy death" }, is_correct: true, points: 40 },
            { translations: { ar: "برق الليل", tn: "برق الليل", fr: "Eclair nocturne", en: "Night lightning" }, is_correct: true, points: 45 },
            { translations: { ar: "طليان المحروسة", tn: "طليان المحروسة", fr: "Talian Al-Mahrousa", en: "Talian Al-Mahrousa" }, is_correct: true, points: 50 },
            { translations: { ar: "هاري بوتر", tn: "هاري بوتر", fr: "Harry Potter", en: "Harry Potter" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 50,
        is_approved: true,
        translations: {
            ar: { text: "أذكر معالم دينية أو جوامع تاريخية كبرى في تونس؟" },
            tn: { text: "أعطيني جوامع أو معالم دينية تاريخية كبيرة في تونس؟" },
            fr: { text: "Citez de grandes mosquées ou monuments religieux historiques en Tunisie ?" },
            en: { text: "Name major historic mosques or religious landmarks in Tunisia?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "جامع الزيتونة", tn: "جامع الزيتونة", fr: "Mosquée Zaytouna", en: "Zaytouna Mosque" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع عقبة بن نافع", tn: "جامع عقبة بن نافع", fr: "Mosquée Uqba ben Nafi", en: "Uqba bin Nafi Mosque" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع الهوا", tn: "جامع الهوا", fr: "Mosquée de la passion", en: "Mosque of passion" }, is_correct: true, points: 15 },
            { translations: { ar: "جامع القصبة", tn: "جامع القصبة", fr: "Mosquée de la Kasbah", en: "Kasbah Mosque" }, is_correct: true, points: 20 },
            { translations: { ar: "جامع الغفران", tn: "جامع الغفران", fr: "Mosquée Al-Ghufran", en: "Al-Ghufran Mosque" }, is_correct: true, points: 25 },
            { translations: { ar: "مقام أبي زمعة البلوي", tn: "مقام أبي زمعة البلوي", fr: "Le sanctuaire d'Abou Zamaa Al-Balawi", en: "The shrine of Abu Zamaa Al-Balawi" }, is_correct: true, points: 30 },
            { translations: { ar: "جامع سنان باشا", tn: "جامع سنان باشا", fr: "Mosquée Sinan Pacha", en: "Sinan Pasha Mosque" }, is_correct: true, points: 35 },
            { translations: { ar: "مقام سيدي الحاري", tn: "مقام سيدي الحاري", fr: "Maqam Sidi Al-Hari", en: "Maqam Sidi Al-Hari" }, is_correct: true, points: 40 },
            { translations: { ar: "جامع التوفيق", tn: "جامع التوفيق", fr: "Mosquée Al-Tawfiq", en: "Al-Tawfiq Mosque" }, is_correct: true, points: 45 },
            { translations: { ar: "المسجد الأقصى", tn: "المسجد الأقصى", fr: "Mosquée Al-Aqsa", en: "Al-Aqsa Mosque" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 51,
        is_approved: true,
        translations: {
            ar: { text: "أذكر فرق أو جمعيات تلعب في الرابطة التونسية المحترفة الأولى لكرة القدم؟" },
            tn: { text: "أعطيني فرق تلعب في الرابطة المحترفة الأولى لكرة القدم؟" },
            fr: { text: "Citez des équipes qui jouent en Ligue 1 professionnelle tunisienne de football ?" },
            en: { text: "Name teams that play in the Tunisian Professional League 1 (football)?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "الترجي الرياضي", tn: "الترجي الرياضي", fr: "Espérance Sports", en: "Esperance Sports" }, is_correct: true, points: 10 },
            { translations: { ar: "النادي الإفريقي", tn: "النادي الإفريقي", fr: "Club Africain", en: "African Club" }, is_correct: true, points: 10 },
            { translations: { ar: "النجم الساحلي", tn: "النجم الساحلي", fr: "L'étoile côtière", en: "The coastal star" }, is_correct: true, points: 10 },
            { translations: { ar: "النادي الصفاقسي", tn: "النادي الصفاقسي", fr: "Club Sfaxien", en: "Sfaxien Club" }, is_correct: true, points: 10 },
            { translations: { ar: "الملعب التونسي", tn: "الملعب التونسي", fr: "Stade tunisien", en: "Tunisian stadium" }, is_correct: true, points: 15 },
            { translations: { ar: "الاتحاد المنستيري", tn: "الاتحاد المنستيري", fr: "Union de Monastir", en: "Monastir Union" }, is_correct: true, points: 15 },
            { translations: { ar: "النادي البنزرتي", tn: "النادي البنزرتي", fr: "Club Bizertin", en: "Club Bizertin" }, is_correct: true, points: 20 },
            { translations: { ar: "شبيبة القيروان", tn: "شبيبة القيروان", fr: "JS Kairouan", en: "JS Kairouan" }, is_correct: true, points: 25 },
            { translations: { ar: "مستقبل المرسى", tn: "مستقبل المرسى", fr: "L'avenir du port de plaisance", en: "The future of the marina" }, is_correct: true, points: 25 },
            { translations: { ar: "الأهلي المصري", tn: "الأهلي المصري", fr: "Al-Ahly d'Egypte", en: "Al-Ahly of Egypt" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 52,
        is_approved: true,
        translations: {
            ar: { text: "أذكر لاعبين حاليين أو سابقين في المنتخب التونسي لكرة القدم؟" },
            tn: { text: "أعطيني لاعبين في المنتخب التونسي، توة ولا قبل؟" },
            fr: { text: "Citez des joueurs actuels ou anciens de l'équipe nationale tunisienne de football ?" },
            en: { text: "Name current or former players of the Tunisian national football team?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "طارق ذياب", tn: "طارق ذياب", fr: "Tariq Dhiab", en: "Tariq Dhiab" }, is_correct: true, points: 10 },
            { translations: { ar: "شكري الواعر", tn: "شكري الواعر", fr: "Merci beaucoup", en: "Thank you very much" }, is_correct: true, points: 10 },
            { translations: { ar: "راضي الجعايدي", tn: "راضي الجعايدي", fr: "Radi Al-Jaaidi", en: "Radi Al-Jaaidi" }, is_correct: true, points: 15 },
            { translations: { ar: "يوسف المساكني", tn: "يوسف المساكني", fr: "Youssef Al-Maskani", en: "Youssef Al-Maskani" }, is_correct: true, points: 15 },
            { translations: { ar: "وهبي الخزري", tn: "وهبي الخزري", fr: "Wahbi Al-Khazri", en: "Wahbi Al-Khazri" }, is_correct: true, points: 20 },
            { translations: { ar: "حاتم الطرابلسي", tn: "حاتم الطرابلسي", fr: "Hatem Trabelsi", en: "Hatem Trabelsi" }, is_correct: true, points: 20 },
            { translations: { ar: "حمادي العقربي", tn: "حمادي العقربي", fr: "Hammadi Al-Aqrabi", en: "Hammadi Al-Aqrabi" }, is_correct: true, points: 25 },
            { translations: { ar: "زياد التلمساني", tn: "زياد التلمساني", fr: "Ziad Al-Tilmisani", en: "Ziad Al-Tilmisani" }, is_correct: true, points: 30 },
            { translations: { ar: "عيسى العيدوني", tn: "عيسى العيدوني", fr: "Issa Al-Aidouni", en: "Issa Al-Aidouni" }, is_correct: true, points: 30 },
            { translations: { ar: "Lionel Messi", tn: "Lionel Messi", fr: "Lionel Messi", en: "Lionel Messi" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 53,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أبطال أولمبيين تونسيين فازوا بميداليات في الألعاب الأولمبية؟" },
            tn: { text: "أعطيني أبطال تونسيين ربحو ميداليات أولمبية؟" },
            fr: { text: "Citez des champions tunisiens ayant remporté des médailles olympiques ?" },
            en: { text: "Name Tunisian champions who won Olympic medals?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "محمد القمودي", tn: "محمد القمودي", fr: "Mohammed Al-Qammoudi", en: "Muhammad Al-Qammoudi" }, is_correct: true, points: 10 },
            { translations: { ar: "أسامة الملولي", tn: "أسامة الملولي", fr: "Oussama Al-Malouly", en: "Osama Al-Malouly" }, is_correct: true, points: 15 },
            { translations: { ar: "حبيبة الغريبي", tn: "حبيبة الغريبي", fr: "Habiba Al-Gharibi", en: "Habiba Al-Gharibi" }, is_correct: true, points: 15 },
            { translations: { ar: "أنس جابر", tn: "أنس جابر", fr: "Anas Jaber", en: "Anas Jaber" }, is_correct: true, points: 20 },
            { translations: { ar: "أيوب الحفناوي", tn: "أيوب الحفناوي", fr: "Ayoub Al-Hafnawi", en: "Ayoub Al-Hafnawi" }, is_correct: true, points: 20 },
            { translations: { ar: "خليل الجندوبي", tn: "خليل الجندوبي", fr: "Khalil Jendoubi", en: "Khalil Jendoubi" }, is_correct: true, points: 25 },
            { translations: { ar: "مروى العمري", tn: "مروى العمري", fr: "Marwa Al-Omari", en: "Marwa Al-Omari" }, is_correct: true, points: 30 },
            { translations: { ar: "أحمد الحفناوي", tn: "أحمد الحفناوي", fr: "Ahmed Al-Hafnawi", en: "Ahmed Al-Hafnawi" }, is_correct: true, points: 35 },
            { translations: { ar: "وجدي بوعلاق", tn: "وجدي بوعلاق", fr: "Wajdi Boualak", en: "Wajdi Boualak" }, is_correct: true, points: 40 },
            { translations: { ar: "Usain Bolt", tn: "Usain Bolt", fr: "Usain Bolt", en: "Usain Bolt" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 54,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ملاعب كرة قدم كبرى في تونس؟" },
            tn: { text: "أعطيني ملاعب كرة قدم كبيرة في تونس؟" },
            fr: { text: "Citez de grands stades de football en Tunisie ?" },
            en: { text: "Name major football stadiums in Tunisia?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "ملعب حمادي العقربي برادس", tn: "ملعب حمادي العقربي برادس", fr: "Stade Hammadi Al-Aqrabi, Brades", en: "Hammadi Al-Aqrabi Stadium, Brades" }, is_correct: true, points: 10 },
            { translations: { ar: "ملعب المنزه", tn: "ملعب المنزه", fr: "Stade El Menza", en: "El Menza Stadium" }, is_correct: true, points: 10 },
            { translations: { ar: "ملعب الشاذلي زويتن", tn: "ملعب الشاذلي زويتن", fr: "Stade Chedly Zouiten", en: "Chedly Zouiten Stadium" }, is_correct: true, points: 15 },
            { translations: { ar: "ملعب الطيب المهيري بصفاقس", tn: "ملعب الطيب المهيري بصفاقس", fr: "Stade Tayeb Mhiri de Sfax", en: "Tayeb Mhiri Stadium in Sfax" }, is_correct: true, points: 15 },
            { translations: { ar: "ملعب سوسة الأولمبي", tn: "ملعب سوسة الأولمبي", fr: "Stade olympique de Sousse", en: "Sousse Olympic Stadium" }, is_correct: true, points: 20 },
            { translations: { ar: "ملعب مصطفى بن جنات بالمنستير", tn: "ملعب مصطفى بن جنات بالمنستير", fr: "Stade Mustafa Ben Jannat de Monastir", en: "Mustafa Ben Jannat Stadium in Monastir" }, is_correct: true, points: 20 },
            { translations: { ar: "ملعب 15 أكتوبر ببنزرت", tn: "ملعب 15 أكتوبر ببنزرت", fr: "Stade du 15 octobre à Bizerte", en: "October 15 Stadium in Bizerte" }, is_correct: true, points: 25 },
            { translations: { ar: "ملعب قابس", tn: "ملعب قابس", fr: "Stade de Gabès", en: "Gabes Stadium" }, is_correct: true, points: 30 },
            { translations: { ar: "ملعب قفصة الأولمبي", tn: "ملعب قفصة الأولمبي", fr: "Stade olympique de Gafsa", en: "Gafsa Olympic Stadium" }, is_correct: true, points: 35 },
            { translations: { ar: "ملعب Camp Nou", tn: "ملعب Camp Nou", fr: "Stade Camp Nou", en: "Camp Nou stadium" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 55,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مدربين تونسيين أشرفوا على تدريب المنتخب الوطني لكرة القدم؟" },
            tn: { text: "أعطيني مدربين تونسيين دربو المنتخب الوطني لكرة القدم؟" },
            fr: { text: "Citez des entraîneurs tunisiens qui ont dirigé l'équipe nationale de football ?" },
            en: { text: "Name Tunisian coaches who managed the national football team?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "عبد المجيد الشتالي", tn: "عبد المجيد الشتالي", fr: "Abdel Majeed Al-Shatali", en: "Abdel Majeed Al-Shatali" }, is_correct: true, points: 15 },
            { translations: { ar: "فوزي البنزرتي", tn: "فوزي البنزرتي", fr: "Faouzi Benzarti", en: "Faouzi Benzarti" }, is_correct: true, points: 15 },
            { translations: { ar: "نبيل معلول", tn: "نبيل معلول", fr: "Nabil Maaloul", en: "Nabil Maaloul" }, is_correct: true, points: 20 },
            { translations: { ar: "جلال القادري", tn: "جلال القادري", fr: "Jalal Al Qadri", en: "Jalal Al Qadri" }, is_correct: true, points: 25 },
            { translations: { ar: "منذر الكبير", tn: "منذر الكبير", fr: "Munther le Grand", en: "Munther the Great" }, is_correct: true, points: 25 },
            { translations: { ar: "ماهر الكنزاري", tn: "ماهر الكنزاري", fr: "Maher Al-Kanzari", en: "Maher Al-Kanzari" }, is_correct: true, points: 30 },
            { translations: { ar: "خالد بن يحيى", tn: "خالد بن يحيى", fr: "Khaled ben Yahya", en: "Khaled bin Yahya" }, is_correct: true, points: 35 },
            { translations: { ar: "يوسف الزواوي", tn: "يوسف الزواوي", fr: "Youssef Al-Zawawi", en: "Youssef Al-Zawawi" }, is_correct: true, points: 40 },
            { translations: { ar: "مراد العقبي", tn: "مراد العقبي", fr: "Mourad Al-Aqabi", en: "Murad Al-Aqabi" }, is_correct: true, points: 45 },
            { translations: { ar: "Pep Guardiola", tn: "Pep Guardiola", fr: "Pep Guardiola", en: "Pep Guardiola" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 56,
        is_approved: true,
        translations: {
            ar: { text: "أذكر رياضات فردية مشهورة في تونس ويحقق فيها التونسيون ألقاباً؟" },
            tn: { text: "أعطيني رياضات فردية معروفة في تونس يحقق فيها التوانسة ألقاب؟" },
            fr: { text: "Citez des sports individuels populaires en Tunisie où les Tunisiens ont remporté des titres ?" },
            en: { text: "Name popular individual sports in Tunisia where Tunisians have won titles?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "التنس", tn: "التنس", fr: "Tennis", en: "Tennis" }, is_correct: true, points: 10 },
            { translations: { ar: "السباحة", tn: "السباحة", fr: "Natation", en: "Swimming" }, is_correct: true, points: 10 },
            { translations: { ar: "التايكواندو", tn: "التايكواندو", fr: "Taekwondo", en: "Taekwondo" }, is_correct: true, points: 15 },
            { translations: { ar: "المصارعة", tn: "المصارعة", fr: "Lutte", en: "Wrestling" }, is_correct: true, points: 15 },
            { translations: { ar: "الملاكمة", tn: "الملاكمة", fr: "boxe", en: "boxing" }, is_correct: true, points: 20 },
            { translations: { ar: "ألعاب القوى", tn: "ألعاب القوى", fr: "Athlétisme", en: "Athletics" }, is_correct: true, points: 20 },
            { translations: { ar: "رفع الأثقال", tn: "رفع الأثقال", fr: "haltérophilie", en: "weight lifting" }, is_correct: true, points: 25 },
            { translations: { ar: "الجودو", tn: "الجودو", fr: "Judo", en: "Judo" }, is_correct: true, points: 25 },
            { translations: { ar: "الكاراتيه", tn: "الكاراتيه", fr: "Karaté", en: "Karate" }, is_correct: true, points: 30 },
            { translations: { ar: "التزلج على الجليد", tn: "التزلج على الجليد", fr: "Snowboard", en: "Snowboarding" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 57,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أندية كرة يد مشهورة وناجحة في تونس؟" },
            tn: { text: "أعطيني نوادي كرة يد معروفة وناجحة في تونس؟" },
            fr: { text: "Citez des clubs de handball tunisiens connus et performants ?" },
            en: { text: "Name well-known and successful Tunisian handball clubs?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "الترجي الرياضي لكرة اليد", tn: "الترجي الرياضي لكرة اليد", fr: "Espérance Sports Handball", en: "Esperance Sports Handball" }, is_correct: true, points: 10 },
            { translations: { ar: "النادي الإفريقي لكرة اليد", tn: "النادي الإفريقي لكرة اليد", fr: "Club Africain de Handball", en: "African Handball Club" }, is_correct: true, points: 10 },
            { translations: { ar: "النجم الساحلي لكرة اليد", tn: "النجم الساحلي لكرة اليد", fr: "Etoile du Sahel Handball", en: "Etoile du Sahel Handball" }, is_correct: true, points: 15 },
            { translations: { ar: "جمعية الحمامات", tn: "جمعية الحمامات", fr: "Association Hammamet", en: "Hammamet Association" }, is_correct: true, points: 20 },
            { translations: { ar: "مكارم المهدية", tn: "مكارم المهدية", fr: "Makarem Mahdia", en: "Makarem Mahdia" }, is_correct: true, points: 25 },
            { translations: { ar: "سبورتينغ المكنين", tn: "سبورتينغ المكنين", fr: "Sporting El Moknine", en: "Sporting El Moknine" }, is_correct: true, points: 30 },
            { translations: { ar: "النادي الصفاقسي لكرة اليد", tn: "النادي الصفاقسي لكرة اليد", fr: "Club Sfaxien de Handball", en: "Sfaxien Handball Club" }, is_correct: true, points: 35 },
            { translations: { ar: "اتحاد منزل تميم", tn: "اتحاد منزل تميم", fr: "Union de la Maison Tamim", en: "Tamim House Union" }, is_correct: true, points: 40 },
            { translations: { ar: "نادي كرة اليد بجمال", tn: "نادي كرة اليد بجمال", fr: "Club de Handball Jamal", en: "Jamal Handball Club" }, is_correct: true, points: 45 },
            { translations: { ar: "لوس أنجلوس ليكرز", tn: "لوس أنجلوس ليكرز", fr: "Lakers de Los Angeles", en: "Los Angeles Lakers" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 58,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أندية كرة سلة تونسية فازت ببطولات؟" },
            tn: { text: "أعطيني نوادي كرة سلة تونسية ربحو بطولات؟" },
            fr: { text: "Citez des clubs tunisiens de basket-ball ayant remporté des titres ?" },
            en: { text: "Name Tunisian basketball clubs that have won championships?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "الاتحاد المنستيري لكرة السلة", tn: "الاتحاد المنستيري لكرة السلة", fr: "Fédération de Basket de Monastir", en: "Monastir Basketball Federation" }, is_correct: true, points: 10 },
            { translations: { ar: "النجم الرادسي", tn: "النجم الرادسي", fr: "La star de la radio", en: "The radio star" }, is_correct: true, points: 15 },
            { translations: { ar: "النادي الإفريقي لكرة السلة", tn: "النادي الإفريقي لكرة السلة", fr: "Club africain de basket-ball", en: "African Basketball Club" }, is_correct: true, points: 15 },
            { translations: { ar: "الشبيبة القيروانية", tn: "الشبيبة القيروانية", fr: "Jeunesse de Kairouan", en: "Youth of Kairouan" }, is_correct: true, points: 20 },
            { translations: { ar: "الزهراء الرياضية", tn: "الزهراء الرياضية", fr: "Al-Zahraa Sports", en: "Al-Zahraa Sports" }, is_correct: true, points: 25 },
            { translations: { ar: "الترجي الرياضي لكرة السلة", tn: "الترجي الرياضي لكرة السلة", fr: "Espérance Basket", en: "Esperance Basketball" }, is_correct: true, points: 30 },
            { translations: { ar: "نجم حلق الوادي", tn: "نجم حلق الوادي", fr: "Etoile de La Goulette", en: "Star of La Goulette" }, is_correct: true, points: 35 },
            { translations: { ar: "الملعب النابلي", tn: "الملعب النابلي", fr: "Stade Nabeul", en: "Nabeul stadium" }, is_correct: true, points: 40 },
            { translations: { ar: "نادي دالية قرمبالية", tn: "نادي دالية قرمبالية", fr: "Club Dalia Grombalia", en: "Dalia Grombalia Club" }, is_correct: true, points: 45 },
            { translations: { ar: "ريال مدريد", tn: "ريال مدريد", fr: "Real Madrid", en: "real madrid" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 59,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ألقاباً أو كنى تُطلق على الأندية الرياضية التونسية؟" },
            tn: { text: "أعطيني ألقاب أو كنايات يتقالو على النوادي الرياضية التونسية؟" },
            fr: { text: "Citez des surnoms donnés aux clubs sportifs tunisiens ?" },
            en: { text: "Name nicknames given to Tunisian sports clubs?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "المكشخة", tn: "المكشخة", fr: "Al-Makshakha", en: "Al-Makshakha" }, is_correct: true, points: 10 },
            { translations: { ar: "الغاليا", tn: "الغاليا", fr: "Chèrement", en: "Dearly" }, is_correct: true, points: 15 },
            { translations: { ar: "ليتوال", tn: "ليتوال", fr: "L'Étoile", en: "L'Etoile" }, is_correct: true, points: 15 },
            { translations: { ar: "السي اس اس", tn: "السي اس اس", fr: "CSS", en: "CSS" }, is_correct: true, points: 20 },
            { translations: { ar: "البقلاوة", tn: "البقلاوة", fr: "Baklavas", en: "Baklava" }, is_correct: true, points: 20 },
            { translations: { ar: "القناوية", tn: "القناوية", fr: "Canal", en: "Channel" }, is_correct: true, points: 25 },
            { translations: { ar: "القرش البنزرتي", tn: "القرش البنزرتي", fr: "Requin de Bizertin", en: "Bizertin shark" }, is_correct: true, points: 30 },
            { translations: { ar: "السياب", tn: "السياب", fr: "Al-Sayyab", en: "Al-Sayyab" }, is_correct: true, points: 35 },
            { translations: { ar: "أولاد المرسى", tn: "أولاد المرسى", fr: "Fils de Marsa", en: "Sons of Marsa" }, is_correct: true, points: 40 },
            { translations: { ar: "الريدز", tn: "الريدز", fr: "Rouges", en: "Reds" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 60,
        is_approved: true,
        translations: {
            ar: { text: "أذكر لاعبين تونسيين احترفوا في دوريات أوروبية كبرى؟" },
            tn: { text: "أعطيني لاعبين تونسيين لعبو في دوريات أوروبية كبيرة؟" },
            fr: { text: "Citez des joueurs tunisiens ayant évolué dans de grands championnats européens ?" },
            en: { text: "Name Tunisian players who played in major European leagues?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "hatem trabelsi", tn: "hatem trabelsi", fr: "hatem trabelsi", en: "hatem trabelsi" }, is_correct: true, points: 10 },
            { translations: { ar: "wahbi khazri", tn: "wahbi khazri", fr: "wahbi khazri", en: "wahbi khazri" }, is_correct: true, points: 15 },
            { translations: { ar: "aymen abdennour", tn: "aymen abdennour", fr: "aymen abdennour", en: "aymen abdennour" }, is_correct: true, points: 15 },
            { translations: { ar: "anis slimane", tn: "anis slimane", fr: "anis slimane", en: "anis slimane" }, is_correct: true, points: 20 },
            { translations: { ar: "ellyes skhiri", tn: "ellyes skhiri", fr: "ellyes skhiri", en: "ellyes skhiri" }, is_correct: true, points: 20 },
            { translations: { ar: "ali maaloul", tn: "ali maaloul", fr: "ali maaloul", en: "ali maaloul" }, is_correct: true, points: 25 },
            { translations: { ar: "aissa laidouni", tn: "aissa laidouni", fr: "aissa laidouni", en: "aissa laidouni" }, is_correct: true, points: 25 },
            { translations: { ar: "alaeddine yahia", tn: "alaeddine yahia", fr: "alaeddine yahia", en: "alaeddine yahia" }, is_correct: true, points: 30 },
            { translations: { ar: "chaouki ben saada", tn: "chaouki ben saada", fr: "chaouki ben saada", en: "chaouki ben saada" }, is_correct: true, points: 35 },
            { translations: { ar: "Cristiano Ronaldo", tn: "Cristiano Ronaldo", fr: "Cristiano Ronaldo", en: "Cristiano Ronaldo" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 61,
        is_approved: true,
        translations: {
            ar: { text: "أذكر معالم معمارية أو تراثية تقع في المدينة العتيقة بتونس العاصمة؟" },
            tn: { text: "أعطيني معالم موجودة في المدينة العتيقة بتونس العاصمة؟" },
            fr: { text: "Citez des monuments situés dans la médina de Tunis ?" },
            en: { text: "Name landmarks located in the medina of Tunis?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "دار بن عبد الله", tn: "دار بن عبد الله", fr: "Dar bin Abdallah", en: "Dar bin Abdullah" }, is_correct: true, points: 10 },
            { translations: { ar: "تربة الباي", tn: "تربة الباي", fr: "Sol de baie", en: "Bay soil" }, is_correct: true, points: 15 },
            { translations: { ar: "قصر البلدية", tn: "قصر البلدية", fr: "Palais municipal", en: "Municipal Palace" }, is_correct: true, points: 20 },
            { translations: { ar: "سوق العطارين", tn: "سوق العطارين", fr: "Marché Attarin", en: "Attarin Market" }, is_correct: true, points: 20 },
            { translations: { ar: "سوق الشواشين", tn: "سوق الشواشين", fr: "Marché Shawashin", en: "Shawashin Market" }, is_correct: true, points: 25 },
            { translations: { ar: "المدرسة السليمانية", tn: "المدرسة السليمانية", fr: "École de Souleimanieh", en: "Sulaymaniyah School" }, is_correct: true, points: 30 },
            { translations: { ar: "باب البحر", tn: "باب البحر", fr: "Bab Al-Bahr", en: "Bab Al Bahr" }, is_correct: true, points: 30 },
            { translations: { ar: "باب الجديد", tn: "باب الجديد", fr: "Nouvelle porte", en: "New door" }, is_correct: true, points: 35 },
            { translations: { ar: "جامع يوسف داي", tn: "جامع يوسف داي", fr: "Mosquée Youssef Dey", en: "Youssef Dey Mosque" }, is_correct: true, points: 40 },
            { translations: { ar: "ساعة بيغ بن", tn: "ساعة بيغ بن", fr: "Horloge Big Ben", en: "Big Ben clock" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 62,
        is_approved: true,
        translations: {
            ar: { text: "أذكر فواكه أو ثمار موسمية تشتهر تونس بإنتاجها؟" },
            tn: { text: "أعطيني فواكه موسمية تشتهر بيهم تونس؟" },
            fr: { text: "Citez des fruits de saison réputés en Tunisie ?" },
            en: { text: "Name seasonal fruits Tunisia is known for producing?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "البرتقال المالطي", tn: "البرتقال المالطي", fr: "Orange maltaise", en: "Maltese orange" }, is_correct: true, points: 10 },
            { translations: { ar: "الرمان القابسي", tn: "الرمان القابسي", fr: "Grenade Gabsi", en: "Gabsi pomegranate" }, is_correct: true, points: 15 },
            { translations: { ar: "التين الشوكي (الهندي)", tn: "التين الشوكي (الهندي)", fr: "Figue de Barbarie (indienne)", en: "Prickly pear (Indian)" }, is_correct: true, points: 15 },
            { translations: { ar: "دقلة النور", tn: "دقلة النور", fr: "Deglet El Nour", en: "Deglet El Nour" }, is_correct: true, points: 20 },
            { translations: { ar: "الخوخ البري", tn: "الخوخ البري", fr: "Pêches sauvages", en: "Wild peaches" }, is_correct: true, points: 25 },
            { translations: { ar: "المشمش", tn: "المشمش", fr: "Abricot", en: "Apricot" }, is_correct: true, points: 25 },
            { translations: { ar: "التين (الكرموس)", tn: "التين (الكرموس)", fr: "Figues", en: "Figs" }, is_correct: true, points: 30 },
            { translations: { ar: "الزيتون", tn: "الزيتون", fr: "Olive", en: "Olive" }, is_correct: true, points: 30 },
            { translations: { ar: "الليمون", tn: "الليمون", fr: "Citron", en: "Lemon" }, is_correct: true, points: 35 },
            { translations: { ar: "الأناناس", tn: "الأناناس", fr: "Ananas", en: "Pineapple" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 63,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ولايات تونسية تقع في إقليم الوسط الغربي للبلاد؟" },
            tn: { text: "أعطيني ولايات موجودة في الوسط الغربي؟" },
            fr: { text: "Citez des gouvernorats situés dans le centre-ouest du pays ?" },
            en: { text: "Name governorates located in west-central Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "سيدي بوزيد", tn: "سيدي بوزيد", fr: "Sidi Bouzid", en: "Sidi Bouzid" }, is_correct: true, points: 10 },
            { translations: { ar: "القصرين", tn: "القصرين", fr: "Kasserine", en: "Kasserine" }, is_correct: true, points: 10 },
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: true, points: 15 },
            { translations: { ar: "قفصة", tn: "قفصة", fr: "Gafsa", en: "Gafsa" }, is_correct: true, points: 20 },
            { translations: { ar: "سليانة", tn: "سليانة", fr: "Siliana", en: "Siliana" }, is_correct: true, points: 20 },
            { translations: { ar: "الكاف", tn: "الكاف", fr: "FAC", en: "CAF" }, is_correct: true, points: 25 },
            { translations: { ar: "باجة", tn: "باجة", fr: "Béja", en: "Beja" }, is_correct: true, points: 30 },
            { translations: { ar: "جندوبة", tn: "جندوبة", fr: "Jendouba", en: "Jendouba" }, is_correct: true, points: 35 },
            { translations: { ar: "توزر", tn: "توزر", fr: "Tozeur", en: "Tozeur" }, is_correct: true, points: 40 },
            { translations: { ar: "المنستير", tn: "المنستير", fr: "Monastir", en: "Monastir" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 64,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مأكولات أو حلويات تونسية تقليدية تعتمد بشكل أساسي على السميد؟" },
            tn: { text: "أعطيني أكلات أو حلويات تونسية أساسها السميد؟" },
            fr: { text: "Citez des plats ou pâtisseries tunisiennes à base de semoule ?" },
            en: { text: "Name Tunisian dishes or sweets made mainly from semolina?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "الكسكسي", tn: "الكسكسي", fr: "Couscous", en: "Couscous" }, is_correct: true, points: 10 },
            { translations: { ar: "المقروض", tn: "المقروض", fr: "prêté", en: "loaned" }, is_correct: true, points: 15 },
            { translations: { ar: "خبز الطابونة", tn: "خبز الطابونة", fr: "Pain tabona", en: "Tabona bread" }, is_correct: true, points: 20 },
            { translations: { ar: "البسيسة", tn: "البسيسة", fr: "Al-Basisa", en: "Al-Basisa" }, is_correct: true, points: 20 },
            { translations: { ar: "الملاوي", tn: "الملاوي", fr: "Malawi", en: "Malawi" }, is_correct: true, points: 25 },
            { translations: { ar: "الرفيسة", tn: "الرفيسة", fr: "Le Rafisa", en: "The rafisa" }, is_correct: true, points: 30 },
            { translations: { ar: "الكسرة", tn: "الكسرة", fr: "La kasra", en: "The kasra" }, is_correct: true, points: 30 },
            { translations: { ar: "العصيدة", tn: "العصيدة", fr: "Bouillie", en: "Porridge" }, is_correct: true, points: 35 },
            { translations: { ar: "المطبقة", tn: "المطبقة", fr: "appliqué", en: "applied" }, is_correct: true, points: 40 },
            { translations: { ar: "الكاب كيك", tn: "الكاب كيك", fr: "Petits gâteaux", en: "Cupcakes" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 65,
        is_approved: true,
        translations: {
            ar: { text: "أذكر شخصيات نسائية تونسية تاريخية رائدة في مجالات الفن أو السياسة أو الأدب؟" },
            tn: { text: "أعطيني نساء تونسيات رائدات في الفن أو السياسة أو الأدب؟" },
            fr: { text: "Citez des figures féminines tunisiennes pionnières dans l'art, la politique ou la littérature ?" },
            en: { text: "Name pioneering Tunisian women in art, politics, or literature?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "عليسة", tn: "عليسة", fr: "Alicia", en: "Alisa" }, is_correct: true, points: 10 },
            { translations: { ar: "الكاهنة", tn: "الكاهنة", fr: "La prêtresse", en: "The priestess" }, is_correct: true, points: 15 },
            { translations: { ar: "أروى القيروانية", tn: "أروى القيروانية", fr: "Arwa de Kairouaniya", en: "Arwa of Kairouaniya" }, is_correct: true, points: 20 },
            { translations: { ar: "فاطمة الفهرية", tn: "فاطمة الفهرية", fr: "Fatima Al-Fihri", en: "Fatima Al-Fihri" }, is_correct: true, points: 20 },
            { translations: { ar: "راضية الحداد", tn: "راضية الحداد", fr: "Razia Al Haddad", en: "Razia Al Haddad" }, is_correct: true, points: 25 },
            { translations: { ar: "توحيدة بن الشيخ", tn: "توحيدة بن الشيخ", fr: "Tawhida ben Al-Cheikh", en: "Tawhida bin Al-Sheikh" }, is_correct: true, points: 30 },
            { translations: { ar: "شريفة المسعدي", tn: "شريفة المسعدي", fr: "Sharifa Al-Masadi", en: "Sharifa Al-Masadi" }, is_correct: true, points: 35 },
            { translations: { ar: "بشيرة بن مراد", tn: "بشيرة بن مراد", fr: "Bachira ben Mourad", en: "Bashira bin Murad" }, is_correct: true, points: 40 },
            { translations: { ar: "صليحة", tn: "صليحة", fr: "Saliha", en: "Saliha" }, is_correct: true, points: 45 },
            { translations: { ar: "كليوباترا", tn: "كليوباترا", fr: "Cléopâtre", en: "Cleopatra" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 66,
        is_approved: true,
        translations: {
            ar: { text: "أذكر صناعات تقليدية تشتهر بها مدينة القيروان التاريخية؟" },
            tn: { text: "أعطيني صناعات تقليدية تشتهر بيهم القيروان؟" },
            fr: { text: "Citez des artisanats traditionnels dont Kairouan est réputée ?" },
            en: { text: "Name traditional crafts Kairouan is known for?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "صناعة الزربية (السجاد)", tn: "صناعة الزربية (السجاد)", fr: "Industrie du tapis", en: "Carpet industry" }, is_correct: true, points: 10 },
            { translations: { ar: "المقروض", tn: "المقروض", fr: "prêté", en: "loaned" }, is_correct: true, points: 10 },
            { translations: { ar: "النحاس المطروق", tn: "النحاس المطروق", fr: "Cuivre martelé", en: "Hammered copper" }, is_correct: true, points: 15 },
            { translations: { ar: "صناعة الجلود", tn: "صناعة الجلود", fr: "Industrie du cuir", en: "Leather industry" }, is_correct: true, points: 20 },
            { translations: { ar: "تقطير ماء الزهر", tn: "تقطير ماء الزهر", fr: "Distillation de l'eau de rose", en: "Distillation of rose water" }, is_correct: true, points: 25 },
            { translations: { ar: "النقش على الخشب", tn: "النقش على الخشب", fr: "Gravure sur bois", en: "Wood engraving" }, is_correct: true, points: 30 },
            { translations: { ar: "الفخار التقليدي", tn: "الفخار التقليدي", fr: "Poterie traditionnelle", en: "Traditional pottery" }, is_correct: true, points: 35 },
            { translations: { ar: "الملابس الصوفية", tn: "الملابس الصوفية", fr: "Vêtements en laine", en: "Woolen clothes" }, is_correct: true, points: 40 },
            { translations: { ar: "الحلويات التقليدية", tn: "الحلويات التقليدية", fr: "Bonbons traditionnels", en: "Traditional sweets" }, is_correct: true, points: 45 },
            { translations: { ar: "تكرير النفط", tn: "تكرير النفط", fr: "Raffinage du pétrole", en: "Oil refining" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 67,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أسماء أبواب تاريخية للمدينة العتيقة بصفاقس؟" },
            tn: { text: "أعطيني أسامي أبواب تاريخية للمدينة العتيقة بصفاقس؟" },
            fr: { text: "Citez les noms des portes historiques de la médina de Sfax ?" },
            en: { text: "Name the historic gates of the medina of Sfax?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "باب الديوان", tn: "باب الديوان", fr: "Chapitre du Diwan", en: "Chapter of the Diwan" }, is_correct: true, points: 10 },
            { translations: { ar: "باب الجبلي", tn: "باب الجبلي", fr: "Porte de montagne", en: "Mountain door" }, is_correct: true, points: 15 },
            { translations: { ar: "باب القصبة", tn: "باب القصبة", fr: "La porte de la Kasbah", en: "The door of the Kasbah" }, is_correct: true, points: 20 },
            { translations: { ar: "باب الشرق", tn: "باب الشرق", fr: "Porte Est", en: "East Gate" }, is_correct: true, points: 25 },
            { translations: { ar: "باب الغربي", tn: "باب الغربي", fr: "Porte ouest", en: "Western door" }, is_correct: true, points: 30 },
            { translations: { ar: "باب القصر", tn: "باب القصر", fr: "Porte du palais", en: "Palace door" }, is_correct: true, points: 35 },
            { translations: { ar: "باب الخليل", tn: "باب الخليل", fr: "Porte d'Hébron", en: "Hebron Gate" }, is_correct: true, points: 40 },
            { translations: { ar: "باب السياح", tn: "باب السياح", fr: "Porte des touristes", en: "Tourists' door" }, is_correct: true, points: 45 },
            { translations: { ar: "باب الجلولي", tn: "باب الجلولي", fr: "Bab Al-Jalouli", en: "Bab Al-Jalouli" }, is_correct: true, points: 50 },
            { translations: { ar: "باب العامود", tn: "باب العامود", fr: "Porte de Damas", en: "Damascus Gate" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 68,
        is_approved: true,
        translations: {
            ar: { text: "أذكر كلمات تونسية دارجة تُعبر عن التقدير أو الموافقة (مثال: 'حسناً' أو 'جيد')؟" },
            tn: { text: "أعطيني كلمات بالدارجة نقولوها كي نوافقو ولا تعجبنا الحاجة (مثلا: 'باهي' أو 'يعطيك الصحة')؟" },
            fr: { text: "Citez des mots en dialecte tunisien exprimant l'accord ou l'appréciation (ex : « bèhi » ou « ya'tik saha ») ?" },
            en: { text: "Name Tunisian dialect words expressing approval or appreciation (e.g. \"bèhi\" or \"ya'tik saha\")?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "باهي", tn: "باهي", fr: "Bhai", en: "Bhai" }, is_correct: true, points: 10 },
            { translations: { ar: "مريغل", tn: "مريغل", fr: "Mrigl", en: "Mrigl" }, is_correct: true, points: 10 },
            { translations: { ar: "واضح", tn: "واضح", fr: "clair", en: "clear" }, is_correct: true, points: 15 },
            { translations: { ar: "صار هو", tn: "صار هو", fr: "C'est devenu lui", en: "It became him" }, is_correct: true, points: 20 },
            { translations: { ar: "باهي برشا", tn: "باهي برشا", fr: "C'est dommage", en: "It's a shame" }, is_correct: true, points: 15 },
            { translations: { ar: "على راسي", tn: "على راسي", fr: "Sur ma tête", en: "On my head" }, is_correct: true, points: 20 },
            { translations: { ar: "نعمين", tn: "نعمين", fr: "Namin", en: "Namin" }, is_correct: true, points: 25 },
            { translations: { ar: "سافا", tn: "سافا", fr: "Sava", en: "Sava" }, is_correct: true, points: 15 },
            { translations: { ar: "منظم", tn: "منظم", fr: "organisateur", en: "organizer" }, is_correct: true, points: 20 },
            { translations: { ar: "خلاص", tn: "خلاص", fr: "assez", en: "enough" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 69,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أصناف سمك أو غلال بحر تُستعمل بكثرة في المطبخ التونسي؟" },
            tn: { text: "أعطيني أصناف حوت أو غلال بحر تتحط بالزّاف في الماكلة التونسية؟" },
            fr: { text: "Citez des espèces de poissons ou fruits de mer très utilisés dans la cuisine tunisienne ?" },
            en: { text: "Name types of fish or seafood widely used in Tunisian cuisine?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "التن", tn: "التن", fr: "Le thon", en: "The tuna" }, is_correct: true, points: 10 },
            { translations: { ar: "الوراطة", tn: "الوراطة", fr: "Inquiéter", en: "Trouble" }, is_correct: true, points: 15 },
            { translations: { ar: "القاروص", tn: "القاروص", fr: "Bar", en: "Seabass" }, is_correct: true, points: 15 },
            { translations: { ar: "السردينة", tn: "السردينة", fr: "Sardine", en: "Sardine" }, is_correct: true, points: 20 },
            { translations: { ar: "البوري", tn: "البوري", fr: "Mulet", en: "Mullet" }, is_correct: true, points: 25 },
            { translations: { ar: "القرنيط (الأخطبوط)", tn: "القرنيط (الأخطبوط)", fr: "Chou-fleur (pieuvre)", en: "Cauliflower (octopus)" }, is_correct: true, points: 20 },
            { translations: { ar: "السوبيا", tn: "السوبيا", fr: "Sobie", en: "Sobia" }, is_correct: true, points: 25 },
            { translations: { ar: "الجمبري (القيمري)", tn: "الجمبري (القيمري)", fr: "Crevettes (Qaymari)", en: "Shrimp (Qaymari)" }, is_correct: true, points: 30 },
            { translations: { ar: "المرجان", tn: "المرجان", fr: "Corail", en: "Coral" }, is_correct: true, points: 35 },
            { translations: { ar: "سمك السلمون النرويجي", tn: "سمك السلمون النرويجي", fr: "Saumon norvégien", en: "Norwegian salmon" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 70,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ولايات تونسية تقع في الشمال الغربي للبلاد؟" },
            tn: { text: "أعطيني ولايات موجودة في الشمال الغربي؟" },
            fr: { text: "Citez des gouvernorats situés dans le nord-ouest du pays ?" },
            en: { text: "Name governorates located in northwestern Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "باجة", tn: "باجة", fr: "Béja", en: "Beja" }, is_correct: true, points: 10 },
            { translations: { ar: "جندوبة", tn: "جندوبة", fr: "Jendouba", en: "Jendouba" }, is_correct: true, points: 10 },
            { translations: { ar: "الكاف", tn: "الكاف", fr: "FAC", en: "CAF" }, is_correct: true, points: 15 },
            { translations: { ar: "سليانة", tn: "سليانة", fr: "Siliana", en: "Siliana" }, is_correct: true, points: 15 },
            { translations: { ar: "بنزرت", tn: "بنزرت", fr: "Bizerte", en: "Bizerte" }, is_correct: true, points: 20 },
            { translations: { ar: "زغوان", tn: "زغوان", fr: "Zaghouan", en: "Zaghouan" }, is_correct: true, points: 25 },
            { translations: { ar: "القصرين", tn: "القصرين", fr: "Kasserine", en: "Kasserine" }, is_correct: true, points: 30 },
            { translations: { ar: "سيدي بوزيد", tn: "سيدي بوزيد", fr: "Sidi Bouzid", en: "Sidi Bouzid" }, is_correct: true, points: 35 },
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: true, points: 40 },
            { translations: { ar: "تطاوين", tn: "تطاوين", fr: "Tataouine", en: "Tataouine" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 71,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مأكولات أو مقبلات تونسية باردة تُحضر في الصيف؟" },
            tn: { text: "أعطيني أكلات أو مقبلات تونسية باردة تتحضر في الصيف؟" },
            fr: { text: "Citez des plats ou entrées froides tunisiennes préparés en été ?" },
            en: { text: "Name cold Tunisian dishes or starters prepared in summer?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "سلاطة مشوية", tn: "سلاطة مشوية", fr: "Salade grillée", en: "Grilled salad" }, is_correct: true, points: 10 },
            { translations: { ar: "سلاطة تونسية", tn: "سلاطة تونسية", fr: "Salade tunisienne", en: "Tunisian salad" }, is_correct: true, points: 10 },
            { translations: { ar: "صحن تونسي", tn: "صحن تونسي", fr: "Plat tunisien", en: "Tunisian dish" }, is_correct: true, points: 15 },
            { translations: { ar: "سلاطة أمك حورية", tn: "سلاطة أمك حورية", fr: "La salade de ta mère est une sirène", en: "Your mother's salad is a mermaid" }, is_correct: true, points: 20 },
            { translations: { ar: "سلاطة بلانكيت", tn: "سلاطة بلانكيت", fr: "Salade de couverture", en: "Blanket salad" }, is_correct: true, points: 20 },
            { translations: { ar: "سلاطة روز", tn: "سلاطة روز", fr: "Salade de roses", en: "Rose salad" }, is_correct: true, points: 25 },
            { translations: { ar: "سلاطة مقرونة", tn: "سلاطة مقرونة", fr: "Salade jumelée", en: "Paired salad" }, is_correct: true, points: 25 },
            { translations: { ar: "سلاطة خضار", tn: "سلاطة خضار", fr: "Salade de légumes", en: "Vegetable salad" }, is_correct: true, points: 30 },
            { translations: { ar: "سلاطة فجل", tn: "سلاطة فجل", fr: "Salade de radis", en: "Radish salad" }, is_correct: true, points: 35 },
            { translations: { ar: "حساء الشوفان الساخن", tn: "حساء الشوفان الساخن", fr: "Soupe chaude aux flocons d'avoine", en: "Hot oatmeal soup" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 72,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أدوات موسيقية تُستعمل في عزف موسيقى 'المزود' التونسية؟" },
            tn: { text: "أعطيني آلات موسيقية يلعبو بيها في 'المزود' التونسي؟" },
            fr: { text: "Citez des instruments utilisés dans la musique du « mezoued » tunisien ?" },
            en: { text: "Name instruments used in Tunisian \"mezoued\" music?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "المزود (قربة الجلد)", tn: "المزود (قربة الجلد)", fr: "Fournisseur (sac en peau)", en: "Supplier (skin bag)" }, is_correct: true, points: 10 },
            { translations: { ar: "الدربوكة", tn: "الدربوكة", fr: "Darbouka", en: "Darbuka" }, is_correct: true, points: 10 },
            { translations: { ar: "البندير", tn: "البندير", fr: "Al Bandir", en: "Al-Bandir" }, is_correct: true, points: 15 },
            { translations: { ar: "الشكشكة", tn: "الشكشكة", fr: "Shakshaka", en: "Shakshakah" }, is_correct: true, points: 20 },
            { translations: { ar: "الطار", tn: "الطار", fr: "La mouche", en: "The fly" }, is_correct: true, points: 25 },
            { translations: { ar: "النقارات", tn: "النقارات", fr: "Naqarat", en: "Naqarat" }, is_correct: true, points: 30 },
            { translations: { ar: "الدف", tn: "الدف", fr: "Tambourin", en: "Tambourine" }, is_correct: true, points: 35 },
            { translations: { ar: "القرع التونسي", tn: "القرع التونسي", fr: "Citrouille tunisienne", en: "Tunisian pumpkin" }, is_correct: true, points: 40 },
            { translations: { ar: "المصفاق", tn: "المصفاق", fr: "L'aponévrose", en: "The aponeurosis" }, is_correct: true, points: 45 },
            { translations: { ar: "الساكسفون", tn: "الساكسفون", fr: "Saxophone", en: "Saxophone" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 73,
        is_approved: true,
        translations: {
            ar: { text: "أذكر حكام أو ملوك حكموا الدولة الفاطمية انطلاقاً من المهدية وتونس؟" },
            tn: { text: "أعطيني حكام أو ملوك حكمو الدولة الفاطمية من المهدية وتونس؟" },
            fr: { text: "Citez des dirigeants ou califes fatimides ayant régné depuis Mahdia et la Tunisie ?" },
            en: { text: "Name Fatimid rulers or caliphs who ruled from Mahdia and Tunisia?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "عبيد الله المهدي", tn: "عبيد الله المهدي", fr: "Obaidullah Al Mahdi", en: "Obaidullah Al Mahdi" }, is_correct: true, points: 10 },
            { translations: { ar: "القائم بأمر الله", tn: "القائم بأمر الله", fr: "Celui qui agit selon le commandement de Dieu", en: "The one who acts according to God’s command" }, is_correct: true, points: 20 },
            { translations: { ar: "المنصور بالله", tn: "المنصور بالله", fr: "Al-Mansour Billah", en: "Al-Mansour Billah" }, is_correct: true, points: 25 },
            { translations: { ar: "المعز لدين الله", tn: "المعز لدين الله", fr: "Al-Mu'izz est la religion de Dieu", en: "Al-Mu'izz is the religion of God" }, is_correct: true, points: 30 },
            { translations: { ar: "المهدي بالله", tn: "المهدي بالله", fr: "Le Mahdi, par Dieu", en: "The Mahdi, by God" }, is_correct: true, points: 35 },
            { translations: { ar: "سلالة الفاطميين", tn: "سلالة الفاطميين", fr: "Dynastie fatimide", en: "Fatimid dynasty" }, is_correct: true, points: 40 },
            { translations: { ar: "القادة الفاطميون", tn: "القادة الفاطميون", fr: "Dirigeants fatimides", en: "Fatimid leaders" }, is_correct: true, points: 45 },
            { translations: { ar: "الأمراء الفاطميون", tn: "الأمراء الفاطميون", fr: "Princes fatimides", en: "Fatimid princes" }, is_correct: true, points: 45 },
            { translations: { ar: "الخلفاء بالمهدية", tn: "الخلفاء بالمهدية", fr: "Califes à Mahdia", en: "Caliphs in Mahdia" }, is_correct: true, points: 50 },
            { translations: { ar: "هارون الرشيد", tn: "هارون الرشيد", fr: "Haroun Al-Rashid", en: "Haroun Al-Rashid" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 74,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ولايات تونسية تقع في إقليم الوسط الشرقي للبلاد (الساحل التونسي)؟" },
            tn: { text: "أعطيني ولايات موجودة في الوسط الشرقي (الساحل التونسي)؟" },
            fr: { text: "Citez des gouvernorats situés dans le centre-est du pays (le Sahel tunisien) ?" },
            en: { text: "Name governorates located in east-central Tunisia (the Tunisian Sahel)?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "سوسة", tn: "سوسة", fr: "Sousse", en: "Sousse" }, is_correct: true, points: 10 },
            { translations: { ar: "المنستير", tn: "المنستير", fr: "Monastir", en: "Monastir" }, is_correct: true, points: 10 },
            { translations: { ar: "المهدية", tn: "المهدية", fr: "Mahdia", en: "Mahdia" }, is_correct: true, points: 15 },
            { translations: { ar: "صفاقس", tn: "صفاقس", fr: "Sfax", en: "Sfax" }, is_correct: true, points: 20 },
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: true, points: 25 },
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunisie", en: "Tunisia" }, is_correct: true, points: 30 },
            { translations: { ar: "بن عروس", tn: "بن عروس", fr: "Ben Arous", en: "Ben Arous" }, is_correct: true, points: 35 },
            { translations: { ar: "زغوان", tn: "زغوان", fr: "Zaghouan", en: "Zaghouan" }, is_correct: true, points: 40 },
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: true, points: 45 },
            { translations: { ar: "توزر", tn: "توزر", fr: "Tozeur", en: "Tozeur" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 75,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مدن أو قرى شهيرة بإنتاج الفخار التقليدي في تونس؟" },
            tn: { text: "أعطيني مدن أو قرى معروفة بالفخار التقليدي في تونس؟" },
            fr: { text: "Citez des villes ou villages tunisiens réputés pour la poterie traditionnelle ?" },
            en: { text: "Name Tunisian towns or villages known for traditional pottery?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "قلالالة (جربة)", tn: "قلالالة (جربة)", fr: "Guelalala (Djerba)", en: "Guelalala (Djerba)" }, is_correct: true, points: 10 },
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: true, points: 15 },
            { translations: { ar: "سجنان", tn: "سجنان", fr: "Deux prisons", en: "Two prisons" }, is_correct: true, points: 20 },
            { translations: { ar: "طبرقة", tn: "طبرقة", fr: "Tabarka", en: "Tabarka" }, is_correct: true, points: 25 },
            { translations: { ar: "بنزرت", tn: "بنزرت", fr: "Bizerte", en: "Bizerte" }, is_correct: true, points: 30 },
            { translations: { ar: "صفاقس", tn: "صفاقس", fr: "Sfax", en: "Sfax" }, is_correct: true, points: 35 },
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: true, points: 40 },
            { translations: { ar: "جربة", tn: "جربة", fr: "Djerba", en: "Djerba" }, is_correct: true, points: 45 },
            { translations: { ar: "قابس", tn: "قابس", fr: "prise", en: "plug" }, is_correct: true, points: 50 },
            { translations: { ar: "توزر المدينة", tn: "توزر المدينة", fr: "Ville de Tozeur", en: "Tozeur city" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 76,
        is_approved: true,
        translations: {
            ar: { text: "أذكر شخصيات لعبت دوراً في تأسيس أو توطيد جامعة الزيتونة التاريخية؟" },
            tn: { text: "أعطيني شخصيات ساهمت في تأسيس أو توطيد جامعة الزيتونة التاريخية؟" },
            fr: { text: "Citez des personnalités ayant contribué à la fondation ou au rayonnement de la Zitouna ?" },
            en: { text: "Name figures who helped found or strengthen the historic Zitouna University?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "حسان بن النعمان", tn: "حسان بن النعمان", fr: "Hassan ben Al-Numan", en: "Hassan bin Al-Numan" }, is_correct: true, points: 15 },
            { translations: { ar: "عبيد الله بن الحبحاب", tn: "عبيد الله بن الحبحاب", fr: "Ubaid Allah bin Al-Habhab", en: "Ubaid Allah bin Al-Habhab" }, is_correct: true, points: 20 },
            { translations: { ar: "ابن خلدون", tn: "ابن خلدون", fr: "Ibn Khaldoun", en: "Ibn Khaldun" }, is_correct: true, points: 25 },
            { translations: { ar: "الإمام المازري", tn: "الإمام المازري", fr: "Imam Al-Mazari", en: "Imam Al-Mazari" }, is_correct: true, points: 30 },
            { translations: { ar: "سحنون بن سعيد", tn: "سحنون بن سعيد", fr: "Sahnoun ben Saeed", en: "Sahnoun bin Saeed" }, is_correct: true, points: 35 },
            { translations: { ar: "سالم بوحاجب", tn: "سالم بوحاجب", fr: "Salem Bouhajeb", en: "Salem Bouhajeb" }, is_correct: true, points: 40 },
            { translations: { ar: "محمد الطاهر بن عاشور", tn: "محمد الطاهر بن عاشور", fr: "Muhammad Al-Tahir bin Ashour", en: "Muhammad Al-Tahir bin Ashour" }, is_correct: true, points: 45 },
            { translations: { ar: "البشير صفر", tn: "البشير صفر", fr: "Béchir zéro", en: "Bashir zero" }, is_correct: true, points: 45 },
            { translations: { ar: "عبد العزيز الثعالبي", tn: "عبد العزيز الثعالبي", fr: "Abdul Aziz Al-Thaalabi", en: "Abdul Aziz Al-Thaalabi" }, is_correct: true, points: 50 },
            { translations: { ar: "ألبرت أينشتاين", tn: "ألبرت أينشتاين", fr: "Albert Einstein", en: "Albert Einstein" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 77,
        is_approved: true,
        translations: {
            ar: { text: "أذكر شطوط أو بحيرات مالحة تقع في وسط وجنوب تونس؟" },
            tn: { text: "أعطيني شطوط أو بحيرات مالحة في وسط وجنوب تونس؟" },
            fr: { text: "Citez des chotts ou lacs salés situés au centre et au sud de la Tunisie ?" },
            en: { text: "Name chotts or salt lakes located in central and southern Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "شط الجريد", tn: "شط الجريد", fr: "Chott El Jérid", en: "Chott El Jerid" }, is_correct: true, points: 10 },
            { translations: { ar: "شط الغرسة", tn: "شط الغرسة", fr: "Extraire l'implant", en: "Extract the implant" }, is_correct: true, points: 15 },
            { translations: { ar: "شط الفجايج", tn: "شط الفجايج", fr: "Chatt Al-Fajajij", en: "Shatt Al-Fajajij" }, is_correct: true, points: 20 },
            { translations: { ar: "شط بلعاس", tn: "شط بلعاس", fr: "Chatt Belaas", en: "Shatt Belaas" }, is_correct: true, points: 25 },
            { translations: { ar: "سبخة السيجومي", tn: "سبخة السيجومي", fr: "Sijoumi sabkha", en: "Sijoumi sabkha" }, is_correct: true, points: 30 },
            { translations: { ar: "سبخة أريانة", tn: "سبخة أريانة", fr: "Marais de l'Ariana", en: "Ariana marsh" }, is_correct: true, points: 35 },
            { translations: { ar: "بحيرة إشكل", tn: "بحيرة إشكل", fr: "Lac Ichkeul", en: "Lake Ichkeul" }, is_correct: true, points: 40 },
            { translations: { ar: "شط الحامة", tn: "شط الحامة", fr: "Chatt El-Hamma", en: "Shatt El Hamma" }, is_correct: true, points: 45 },
            { translations: { ar: "سبخة الكلبية", tn: "سبخة الكلبية", fr: "Le marais canin", en: "The canine swamp" }, is_correct: true, points: 50 },
            { translations: { ar: "البحيرات الكبرى الأمريكية", tn: "البحيرات الكبرى الأمريكية", fr: "Grands Lacs américains", en: "American Great Lakes" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 78,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أسماء مساجد أو مقامات دينية مشهورة في مدينة القيروان؟" },
            tn: { text: "أعطيني أسامي جوامع أو مقامات دينية معروفة في القيروان؟" },
            fr: { text: "Citez des noms de mosquées ou de mausolées connus à Kairouan ?" },
            en: { text: "Name well-known mosques or shrines in Kairouan?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "جامع عقبة بن نافع", tn: "جامع عقبة بن نافع", fr: "Mosquée Uqba ben Nafi", en: "Uqba bin Nafi Mosque" }, is_correct: true, points: 10 },
            { translations: { ar: "مقام أبي زمعة البلوي", tn: "مقام أبي زمعة البلوي", fr: "Le sanctuaire d'Abou Zamaa Al-Balawi", en: "The shrine of Abu Zamaa Al-Balawi" }, is_correct: true, points: 15 },
            { translations: { ar: "جامع الأبواب الثلاثة", tn: "جامع الأبواب الثلاثة", fr: "Mosquée à trois portes", en: "Three-door mosque" }, is_correct: true, points: 20 },
            { translations: { ar: "فسقية الأغالبة", tn: "فسقية الأغالبة", fr: "Fontaine aghlabide", en: "Aghlabid fountain" }, is_correct: true, points: 25 },
            { translations: { ar: "مقام سيدي عبيد الغرياني", tn: "مقام سيدي عبيد الغرياني", fr: "Le sanctuaire de Sidi Obaid Al-Gharyani", en: "The shrine of Sidi Obaid Al-Gharyani" }, is_correct: true, points: 30 },
            { translations: { ar: "بئر بروطة", tn: "بئر بروطة", fr: "Bir Barouta", en: "Bir Barouta" }, is_correct: true, points: 35 },
            { translations: { ar: "مقام سيدي عمر عبادة", tn: "مقام سيدي عمر عبادة", fr: "Le sanctuaire de Sidi Omar Ibada", en: "The shrine of Sidi Omar Ibada" }, is_correct: true, points: 40 },
            { translations: { ar: "محيط سور المدينة", tn: "محيط سور المدينة", fr: "Autour des remparts de la ville", en: "Surrounding the city wall" }, is_correct: true, points: 45 },
            { translations: { ar: "مسجد الأنصار", tn: "مسجد الأنصار", fr: "Mosquée Al-Ansar", en: "Al-Ansar Mosque" }, is_correct: true, points: 50 },
            { translations: { ar: "المسجد النبوي الشريف", tn: "المسجد النبوي الشريف", fr: "La mosquée du Prophète", en: "The Prophet's Mosque" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 79,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مدن أو بلدات سياحية تقع في جزيرة جربة التونسية؟" },
            tn: { text: "أعطيني مدن أو بلدات سياحية في جزيرة جربة؟" },
            fr: { text: "Citez des villes ou localités touristiques de l'île de Djerba ?" },
            en: { text: "Name touristic towns or localities on the island of Djerba?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "حومة السوق", tn: "حومة السوق", fr: "Houmt Souk", en: "Houmt Souk" }, is_correct: true, points: 10 },
            { translations: { ar: "ميدون", tn: "ميدون", fr: "Midoun", en: "Midoun" }, is_correct: true, points: 15 },
            { translations: { ar: "أجيم", tn: "أجيم", fr: "Agir", en: "Agim" }, is_correct: true, points: 20 },
            { translations: { ar: "قلالة", tn: "قلالة", fr: "Qalala", en: "Qalala" }, is_correct: true, points: 25 },
            { translations: { ar: "الرياض", tn: "الرياض", fr: "Riyad", en: "Riyadh" }, is_correct: true, points: 30 },
            { translations: { ar: "الماي", tn: "الماي", fr: "L'eau", en: "The water" }, is_correct: true, points: 35 },
            { translations: { ar: "صدويكش", tn: "صدويكش", fr: "Qu'est-ce qui ne va pas?", en: "What's wrong with you?" }, is_correct: true, points: 40 },
            { translations: { ar: "سدويكش", tn: "سدويكش", fr: "sdwksh", en: "sdwksh" }, is_correct: true, points: 45 },
            { translations: { ar: "محبوبين", tn: "محبوبين", fr: "Les proches", en: "Loved ones" }, is_correct: true, points: 50 },
            { translations: { ar: "قليبية", tn: "قليبية", fr: "Kélibia", en: "Kelibia" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 80,
        is_approved: true,
        translations: {
            ar: { text: "أذكر شعراء تونسيين كبار خلدوا أسماءهم في الأدب العربي؟" },
            tn: { text: "أعطيني شعراء تونسيين كبار بقات أسامهم في الأدب العربي؟" },
            fr: { text: "Citez de grands poètes tunisiens dont le nom est resté dans la littérature arabe ?" },
            en: { text: "Name major Tunisian poets whose names live on in Arabic literature?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "أبو القاسم الشابي", tn: "أبو القاسم الشابي", fr: "Abou Al-Qasim Al-Shabi", en: "Abu Al-Qasim Al-Shabi" }, is_correct: true, points: 10 },
            { translations: { ar: "منور صمادح", tn: "منور صمادح", fr: "Munawar Samadh", en: "Munawar Samadh" }, is_correct: true, points: 15 },
            { translations: { ar: "جعفر ماجد", tn: "جعفر ماجد", fr: "Jaafar Majid", en: "Jaafar Majid" }, is_correct: true, points: 20 },
            { translations: { ar: "أولاد أحمد", tn: "أولاد أحمد", fr: "Les fils d'Ahmed", en: "Ahmed's sons" }, is_correct: true, points: 25 },
            { translations: { ar: "محمد الصغير أولاد أحمد", tn: "محمد الصغير أولاد أحمد", fr: "Muhammad Al-Saghir, les fils d'Ahmed", en: "Muhammad Al-Saghir, Ahmed’s sons" }, is_correct: true, points: 30 },
            { translations: { ar: "جميلة الماجري", tn: "جميلة الماجري", fr: "Jamila Almajiri", en: "Jamila Almajiri" }, is_correct: true, points: 35 },
            { translations: { ar: "مصطفى خريف", tn: "مصطفى خريف", fr: "Mustafa Kharif", en: "Mustafa Kharif" }, is_correct: true, points: 40 },
            { translations: { ar: "البشير خريف", tn: "البشير خريف", fr: "Al-Bashir, c'est l'automne", en: "Al-Bashir is autumn" }, is_correct: true, points: 45 },
            { translations: { ar: "المنصف المزغني", tn: "المنصف المزغني", fr: "Al-Mansif Al-Mazghani", en: "Al-Mansif Al-Mazghani" }, is_correct: true, points: 50 },
            { translations: { ar: "نزار قباني", tn: "نزار قباني", fr: "Nizar Qabbani", en: "Nizar Qabbani" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 81,
        is_approved: true,
        translations: {
            ar: { text: "أذكر معالم أثرية وقصور صحراوية تقع في ولاية تطاوين؟" },
            tn: { text: "أعطيني معالم أثرية وقصور صحراوية في ولاية تطاوين؟" },
            fr: { text: "Citez des sites archéologiques et ksour du désert dans le gouvernorat de Tataouine ?" },
            en: { text: "Name archaeological sites and desert ksour in the Tataouine governorate?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "قصر أولاد دباب", tn: "قصر أولاد دباب", fr: "Palais Oulad Dabbab", en: "Oulad Dabbab Palace" }, is_correct: true, points: 10 },
            { translations: { ar: "شنني", tn: "شنني", fr: "Fuite-moi", en: "Shun me" }, is_correct: true, points: 15 },
            { translations: { ar: "دويرات", tn: "دويرات", fr: "Douirat", en: "Douirat" }, is_correct: true, points: 20 },
            { translations: { ar: "قصر حدادة", tn: "قصر حدادة", fr: "Palais des Forgerons", en: "Blacksmith Palace" }, is_correct: true, points: 25 },
            { translations: { ar: "قصر عون", tn: "قصر عون", fr: "Palais Aoun", en: "Aoun Palace" }, is_correct: true, points: 30 },
            { translations: { ar: "قرية بني بركة", tn: "قرية بني بركة", fr: "Village de Bani Baraka", en: "Bani Baraka village" }, is_correct: true, points: 35 },
            { translations: { ar: "قصر المرابطين", tn: "قصر المرابطين", fr: "Palais Almoravide", en: "Almoravid Palace" }, is_correct: true, points: 40 },
            { translations: { ar: "قصر الزهراء", tn: "قصر الزهراء", fr: "Palais Al-Zahra", en: "Al-Zahra Palace" }, is_correct: true, points: 45 },
            { translations: { ar: "غمراسن الأثرية", tn: "غمراسن الأثرية", fr: "Musée archéologique de Ghamrasan", en: "Ghamrasan Archaeological Museum" }, is_correct: true, points: 50 },
            { translations: { ar: "تاج محل", tn: "تاج محل", fr: "Taj Mahal", en: "Taj Mahal" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 82,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أنواع من التين (الكرموس) المشهورة في بساتين تونس؟" },
            tn: { text: "أعطيني أنواع كرموس معروفة في جنان تونس؟" },
            fr: { text: "Citez des variétés de figues connues dans les vergers tunisiens ?" },
            en: { text: "Name varieties of figs known in Tunisian orchards?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "كرموس بوحولي", tn: "كرموس بوحولي", fr: "Karmos Bouhouli", en: "Karmos Bouhouli" }, is_correct: true, points: 10 },
            { translations: { ar: "كرموس الباجي", tn: "كرموس الباجي", fr: "Karmos Al-Baji", en: "Karmos Al-Baji" }, is_correct: true, points: 20 },
            { translations: { ar: "كرموس العنقودي", tn: "كرموس العنقودي", fr: "Amas de Chromos", en: "Chromos cluster" }, is_correct: true, points: 25 },
            { translations: { ar: "التين الأسود", tn: "التين الأسود", fr: "Figue noire", en: "Black fig" }, is_correct: true, points: 30 },
            { translations: { ar: "التين الأبيض", tn: "التين الأبيض", fr: "Figue blanche", en: "White fig" }, is_correct: true, points: 35 },
            { translations: { ar: "الخضوري", tn: "الخضوري", fr: "Al-Khadoori", en: "Al-Khadoori" }, is_correct: true, points: 40 },
            { translations: { ar: "البوحولي", tn: "البوحولي", fr: "Al-Buhouli", en: "Al-Buhouli" }, is_correct: true, points: 45 },
            { translations: { ar: "الشتوي", tn: "الشتوي", fr: "Hiver", en: "Winter" }, is_correct: true, points: 45 },
            { translations: { ar: "التين الملوكي", tn: "التين الملوكي", fr: "Figue royale", en: "Royal fig" }, is_correct: true, points: 50 },
            { translations: { ar: "فاكهة التنين", tn: "فاكهة التنين", fr: "Fruit du dragon", en: "Dragon fruit" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 83,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مناطق أو واحات تقع في ولاية توزر التونسية؟" },
            tn: { text: "أعطيني مناطق أو واحات في ولاية توزر؟" },
            fr: { text: "Citez des zones ou oasis du gouvernorat de Tozeur ?" },
            en: { text: "Name areas or oases in the Tozeur governorate?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "توزر الواحة", tn: "توزر الواحة", fr: "Oasis de Tozeur", en: "Tozeur Oasis" }, is_correct: true, points: 10 },
            { translations: { ar: "دقاش", tn: "دقاش", fr: "Daqash", en: "Daqash" }, is_correct: true, points: 15 },
            { translations: { ar: "hama jarid", tn: "hama jarid", fr: "hama jarid", en: "hama jarid" }, is_correct: true, points: 20 },
            { translations: { ar: "temeghza", tn: "temeghza", fr: "temeghza", en: "temeghza" }, is_correct: true, points: 25 },
            { translations: { ar: "chebika", tn: "chebika", fr: "chebika", en: "chebika" }, is_correct: true, points: 30 },
            { translations: { ar: "mides", tn: "mides", fr: "mides", en: "mides" }, is_correct: true, points: 35 },
            { translations: { ar: "بلاد الحضر", tn: "بلاد الحضر", fr: "Pays urbains", en: "Urban countries" }, is_correct: true, points: 40 },
            { translations: { ar: "مطاريح الجريد", tn: "مطاريح الجريد", fr: "Matarih Al-Jarid", en: "Matarih Al-Jarid" }, is_correct: true, points: 45 },
            { translations: { ar: "wahet hazoua", tn: "wahet hazoua", fr: "wahet hazoua", en: "wahet hazoua" }, is_correct: true, points: 50 },
            { translations: { ar: "واحة سيوة", tn: "واحة سيوة", fr: "Oasis de Siwa", en: "Siwa Oasis" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 84,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مفردات بالعامية التونسية تُطلق على أجزاء أو غرف المنزل؟" },
            tn: { text: "أعطيني كلمات بالدارجة على قسمات الدار؟" },
            fr: { text: "Citez des mots en dialecte tunisien désignant les pièces de la maison ?" },
            en: { text: "Name Tunisian dialect words for rooms of a house?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "البيت", tn: "البيت", fr: "la maison", en: "the house" }, is_correct: true, points: 10 },
            { translations: { ar: "الصالون", tn: "الصالون", fr: "Le salon", en: "The salon" }, is_correct: true, points: 10 },
            { translations: { ar: "الكوجينة", tn: "الكوجينة", fr: "La cogina", en: "The cogina" }, is_correct: true, points: 15 },
            { translations: { ar: "البيت البانو", tn: "البيت البانو", fr: "La maison Banô", en: "The Bano House" }, is_correct: true, points: 20 },
            { translations: { ar: "الفراندا", tn: "الفراندا", fr: "La véranda", en: "The veranda" }, is_correct: true, points: 20 },
            { translations: { ar: "وسط الدار", tn: "وسط الدار", fr: "Au milieu de la maison", en: "In the middle of the house" }, is_correct: true, points: 25 },
            { translations: { ar: "السطح", tn: "السطح", fr: "Surface", en: "Surface" }, is_correct: true, points: 25 },
            { translations: { ar: "الدهليز", tn: "الدهليز", fr: "Vestibule", en: "Vestibule" }, is_correct: true, points: 30 },
            { translations: { ar: "السقيفة", tn: "السقيفة", fr: "Hangar", en: "Shed" }, is_correct: true, points: 35 },
            { translations: { ar: "الإيوان", tn: "الإيوان", fr: "L'iwan", en: "The iwan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 85,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أسماء تونسية عامية تُطلق على المأكولات أو المنتجات المصنوعة من الحليب؟" },
            tn: { text: "أعطيني كلمات بالدارجة على أكلات أو منتوجات من الحليب؟" },
            fr: { text: "Citez des mots en dialecte tunisien désignant des aliments ou produits laitiers ?" },
            en: { text: "Name Tunisian dialect words for dairy foods or products?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "الرايب", tn: "الرايب", fr: "L'avis", en: "The opinion" }, is_correct: true, points: 10 },
            { translations: { ar: "اللبن", tn: "اللبن", fr: "Yaourt", en: "Yogurt" }, is_correct: true, points: 10 },
            { translations: { ar: "الزبدة العربي", tn: "الزبدة العربي", fr: "Beurre arabe", en: "Arabic butter" }, is_correct: true, points: 15 },
            { translations: { ar: "الجبن الموزاريلا التونسي", tn: "الجبن الموزاريلا التونسي", fr: "Fromage mozzarella tunisien", en: "Tunisian mozzarella cheese" }, is_correct: true, points: 20 },
            { translations: { ar: "الريكوتا التونسية", tn: "الريكوتا التونسية", fr: "Ricotta tunisienne", en: "Tunisian ricotta" }, is_correct: true, points: 20 },
            { translations: { ar: "الياغورت", tn: "الياغورت", fr: "Yaourt", en: "Yoghurt" }, is_correct: true, points: 15 },
            { translations: { ar: "السمن العربي", tn: "السمن العربي", fr: "ghee arabe", en: "Arabic ghee" }, is_correct: true, points: 25 },
            { translations: { ar: "القشطة العربي", tn: "القشطة العربي", fr: "Crème arabe", en: "Arabic cream" }, is_correct: true, points: 30 },
            { translations: { ar: "الشنينة", tn: "الشنينة", fr: "Al-Shanina", en: "Al-Shanina" }, is_correct: true, points: 35 },
            { translations: { ar: "الجبن السويسري بالفواكه", tn: "الجبن السويسري بالفواكه", fr: "Fromage suisse aux fruits", en: "Swiss cheese with fruits" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 86,
        is_approved: true,
        translations: {
            ar: { text: "أذكر رياضيين تونسيين مثلوا تونس في منافسات الملاكمة وفازوا بألقاب؟" },
            tn: { text: "أعطيني رياضيين تونسيين لعبو بوكس وربحو ألقاب؟" },
            fr: { text: "Citez des sportifs tunisiens ayant pratiqué la boxe et remporté des titres ?" },
            en: { text: "Name Tunisian athletes who competed in boxing and won titles?" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "الهادي السليماني", tn: "الهادي السليماني", fr: "Al-Hadi Soleimani", en: "Al-Hadi Soleimani" }, is_correct: true, points: 15 },
            { translations: { ar: "فتحي الميساوي", tn: "فتحي الميساوي", fr: "Fathi Al-Misawy", en: "Fathi Al-Misawy" }, is_correct: true, points: 20 },
            { translations: { ar: "توفيق البلبولي", tn: "توفيق البلبولي", fr: "Tawfiq Al-Balbouli", en: "Tawfiq Al-Balbouli" }, is_correct: true, points: 25 },
            { translations: { ar: "محمد علي الشريف", tn: "محمد علي الشريف", fr: "Muhammad Ali Al-Sharif", en: "Muhammad Ali Al-Sharif" }, is_correct: true, points: 30 },
            { translations: { ar: "بلحسن البكوش", tn: "بلحسن البكوش", fr: "Belhassan Al-Bakoush", en: "Belhassan Al-Bakoush" }, is_correct: true, points: 35 },
            { translations: { ar: "معز الكافي", tn: "معز الكافي", fr: "Moez Al-Kafi", en: "Moez Al-Kafi" }, is_correct: true, points: 40 },
            { translations: { ar: "كامل العويني", tn: "كامل العويني", fr: "Kamel Al-Awaini", en: "Kamel Al-Awaini" }, is_correct: true, points: 45 },
            { translations: { ar: "عبد الجليل بكار", tn: "عبد الجليل بكار", fr: "Abdul Jalil Bakkar", en: "Abdul Jalil Bakkar" }, is_correct: true, points: 45 },
            { translations: { ar: "بشير التونسي", tn: "بشير التونسي", fr: "Béchir al-Tunissi", en: "Bashir Al-Tunisi" }, is_correct: true, points: 50 },
            { translations: { ar: "Mike Tyson", tn: "Mike Tyson", fr: "Mike Tyson", en: "Mike Tyson" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 87,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مخرجين مسرحيين تونسيين كبار أثروا في المسرح التونسي والعربي؟" },
            tn: { text: "أعطيني مخرجين مسرح تونسيين كبار أثرو في المسرح التونسي والعربي؟" },
            fr: { text: "Citez de grands metteurs en scène tunisiens qui ont marqué le théâtre tunisien et arabe ?" },
            en: { text: "Name major Tunisian theater directors who influenced Tunisian and Arab theater?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "الفاضل الجعايبي", tn: "الفاضل الجعايبي", fr: "Al-Fadil Al-Jaaibi", en: "Al-Fadil Al-Jaaibi" }, is_correct: true, points: 15 },
            { translations: { ar: "توفيق الجبالي", tn: "توفيق الجبالي", fr: "Tawfiq Al-Jabali", en: "Tawfiq Al-Jabali" }, is_correct: true, points: 20 },
            { translations: { ar: "عز الدين قنون", tn: "عز الدين قنون", fr: "Ezzedine Qanoun", en: "Ezzedine Qanoun" }, is_correct: true, points: 25 },
            { translations: { ar: "المنصف السويسي", tn: "المنصف السويسي", fr: "Moncef Souissi", en: "Moncef Souissi" }, is_correct: true, points: 30 },
            { translations: { ar: "رجاء بن عمار", tn: "رجاء بن عمار", fr: "Raja ben Ammar", en: "Raja bin Ammar" }, is_correct: true, points: 30 },
            { translations: { ar: "عبد القادر مقداد", tn: "عبد القادر مقداد", fr: "Abdoul Qader Miqdad", en: "Abdul Qader Miqdad" }, is_correct: true, points: 35 },
            { translations: { ar: "محمد إدريس", tn: "محمد إدريس", fr: "Mohammed Idris", en: "Muhammad Idris" }, is_correct: true, points: 40 },
            { translations: { ar: "الفاضل الجزيري", tn: "الفاضل الجزيري", fr: "Al-Fadil Al-Jaziri", en: "Al-Fadil Al-Jaziri" }, is_correct: true, points: 45 },
            { translations: { ar: "جميل الجودي", tn: "جميل الجودي", fr: "Jamil Al-Judi", en: "Jamil Al-Judi" }, is_correct: true, points: 50 },
            { translations: { ar: "ويليام شكسبير", tn: "ويليام شكسبير", fr: "Guillaume Shakespeare", en: "William Shakespeare" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 88,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أصناف من التين الشوكي (الهندي) المشهورة في أرياف تونس؟" },
            tn: { text: "أعطيني أصناف من الهندي (التين الشوكي) معروفة في أرياف تونس؟" },
            fr: { text: "Citez des variétés de figues de Barbarie connues dans les campagnes tunisiennes ?" },
            en: { text: "Name varieties of prickly pear (cactus fig) known in the Tunisian countryside?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "الهندي الباجي", tn: "الهندي الباجي", fr: "Baji indien", en: "Indian Baji" }, is_correct: true, points: 10 },
            { translations: { ar: "الهندي الوفير", tn: "الهندي الوفير", fr: "Indien à profusion", en: "Indian galore" }, is_correct: true, points: 20 },
            { translations: { ar: "الهندي الأصفر", tn: "الهندي الأصفر", fr: "Indien jaune", en: "Yellow Indian" }, is_correct: true, points: 25 },
            { translations: { ar: "الهندي الأحمر", tn: "الهندي الأحمر", fr: "Indien rouge", en: "Red Indian" }, is_correct: true, points: 30 },
            { translations: { ar: "الهندي الأملس", tn: "الهندي الأملس", fr: "L'Indien lisse", en: "The smooth Indian" }, is_correct: true, points: 35 },
            { translations: { ar: "الهندي القشراوي", tn: "الهندي القشراوي", fr: "Indien d'Al-Qashrawi", en: "Al-Qashrawi Indian" }, is_correct: true, points: 40 },
            { translations: { ar: "العرباوي", tn: "العرباوي", fr: "Al-Arabawy", en: "Al-Arabawy" }, is_correct: true, points: 45 },
            { translations: { ar: "الباجي الملكي", tn: "الباجي الملكي", fr: "Buggy royal", en: "Royal buggy" }, is_correct: true, points: 45 },
            { translations: { ar: "الهندي الشوكاوي", tn: "الهندي الشوكاوي", fr: "Le Shawkawi indien", en: "The Indian Shawkawi" }, is_correct: true, points: 50 },
            { translations: { ar: "الهندي المكسيكي المالح", tn: "الهندي المكسيكي المالح", fr: "Indien mexicain salé", en: "Salty Mexican Indian" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 89,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مناطق أو أحياء تقع في ولاية أريانة بتونس الكبرى؟" },
            tn: { text: "أعطيني مناطق أو أحياء في ولاية أريانة؟" },
            fr: { text: "Citez des zones ou quartiers du gouvernorat de l'Ariana ?" },
            en: { text: "Name areas or neighborhoods in the Ariana governorate?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "أريانة المدينة", tn: "أريانة المدينة", fr: "Ville de l'Ariana", en: "Ariana city" }, is_correct: true, points: 10 },
            { translations: { ar: "المنزه الثامن", tn: "المنزه الثامن", fr: "Al-Manzah 8ème", en: "Al-Manzah 8th" }, is_correct: true, points: 15 },
            { translations: { ar: "حي النصر", tn: "حي النصر", fr: "Quartier Al-Nasr", en: "Al-Nasr neighborhood" }, is_correct: true, points: 15 },
            { translations: { ar: "حي الغزالة", tn: "حي الغزالة", fr: "Quartier d'Al-Ghazala", en: "Al-Ghazala neighborhood" }, is_correct: true, points: 20 },
            { translations: { ar: "رواد", tn: "رواد", fr: "Pionniers", en: "Pioneers" }, is_correct: true, points: 20 },
            { translations: { ar: "شطرانة", tn: "شطرانة", fr: "Shatrana", en: "Shatrana" }, is_correct: true, points: 25 },
            { translations: { ar: "سكرة", tn: "سكرة", fr: "Ivre", en: "Drunken" }, is_correct: true, points: 25 },
            { translations: { ar: "قلعة الأندلس", tn: "قلعة الأندلس", fr: "Château d'Andalousie", en: "Andalusia Castle" }, is_correct: true, points: 30 },
            { translations: { ar: "سيدي ثابت", tn: "سيدي ثابت", fr: "Monsieur Thabet", en: "Sir Thabet" }, is_correct: true, points: 35 },
            { translations: { ar: "حي الرياض بالرياض", tn: "حي الرياض بالرياض", fr: "Quartier de Riyad à Riyad", en: "Riyadh district in Riyadh" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 90,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ولايات تونسية تقع في إقليم الشمال الشرقي للبلاد؟" },
            tn: { text: "أعطيني ولايات موجودة في الشمال الشرقي؟" },
            fr: { text: "Citez des gouvernorats situés dans le nord-est du pays ?" },
            en: { text: "Name governorates located in northeastern Tunisia?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunisie", en: "Tunisia" }, is_correct: true, points: 10 },
            { translations: { ar: "أريانة", tn: "أريانة", fr: "Ariana", en: "Ariana" }, is_correct: true, points: 10 },
            { translations: { ar: "بن عروس", tn: "بن عروس", fr: "Ben Arous", en: "Ben Arous" }, is_correct: true, points: 15 },
            { translations: { ar: "منوبة", tn: "منوبة", fr: "La Manouba", en: "Manouba" }, is_correct: true, points: 15 },
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: true, points: 20 },
            { translations: { ar: "بنزرت", tn: "بنزرت", fr: "Bizerte", en: "Bizerte" }, is_correct: true, points: 20 },
            { translations: { ar: "زغوان", tn: "زغوان", fr: "Zaghouan", en: "Zaghouan" }, is_correct: true, points: 25 },
            { translations: { ar: "باجة", tn: "باجة", fr: "Béja", en: "Beja" }, is_correct: true, points: 30 },
            { translations: { ar: "سليانة", tn: "سليانة", fr: "Siliana", en: "Siliana" }, is_correct: true, points: 35 },
            { translations: { ar: "سيدي بوزيد", tn: "سيدي بوزيد", fr: "Sidi Bouzid", en: "Sidi Bouzid" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 91,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أطباق شوربة أو حساء تقليدي في المطبخ التونسي؟" },
            tn: { text: "أعطيني أطباق شربة تقليدية في الماكلة التونسية؟" },
            fr: { text: "Citez des soupes traditionnelles de la cuisine tunisienne ?" },
            en: { text: "Name traditional soups in Tunisian cuisine?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "شوربة فريك", tn: "شوربة فريك", fr: "Soupe au gruau", en: "Grits soup" }, is_correct: true, points: 10 },
            { translations: { ar: "شوربة لسان عصفور", tn: "شوربة لسان عصفور", fr: "Soupe d'orzo", en: "Orzo soup" }, is_correct: true, points: 15 },
            { translations: { ar: "حساء بالحلالم", tn: "حساء بالحلالم", fr: "Soupe de rêve", en: "Dream soup" }, is_correct: true, points: 20 },
            { translations: { ar: "البرود التونسي", tn: "البرود التونسي", fr: "Rhume tunisien", en: "Tunisian cold" }, is_correct: true, points: 20 },
            { translations: { ar: "حساء الدشيشة", tn: "حساء الدشيشة", fr: "Soupe Dishisha", en: "Dishisha soup" }, is_correct: true, points: 25 },
            { translations: { ar: "حساء الشعير", tn: "حساء الشعير", fr: "Soupe à l'orge", en: "Barley soup" }, is_correct: true, points: 30 },
            { translations: { ar: "حساء البلبولة", tn: "حساء البلبولة", fr: "Soupe Balboula", en: "Balboula soup" }, is_correct: true, points: 35 },
            { translations: { ar: "حساء المحمصة", tn: "حساء المحمصة", fr: "Soupe rôtie", en: "Roaster soup" }, is_correct: true, points: 40 },
            { translations: { ar: "شوربة الحوت", tn: "شوربة الحوت", fr: "Soupe aux baleines", en: "Whale soup" }, is_correct: true, points: 45 },
            { translations: { ar: "حساء البصل الفرنسي", tn: "حساء البصل الفرنسي", fr: "Soupe à l'oignon française", en: "French onion soup" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 92,
        is_approved: true,
        translations: {
            ar: { text: "أذكر طقوس أو عادات شائعة في الأعراس والاحتفالات التقليدية التونسية؟" },
            tn: { text: "أعطيني عادات معروفة في الأعراس والاحتفالات التقليدية التونسية؟" },
            fr: { text: "Citez des coutumes courantes lors des mariages et fêtes traditionnelles tunisiennes ?" },
            en: { text: "Name common customs at traditional Tunisian weddings and celebrations?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "حمام العروسة", tn: "حمام العروسة", fr: "Salle de bain nuptiale", en: "Bridal bathroom" }, is_correct: true, points: 10 },
            { translations: { ar: "ليلة الحناء", tn: "ليلة الحناء", fr: "Soirée henné", en: "Henna night" }, is_correct: true, points: 10 },
            { translations: { ar: "كسوة العريس", tn: "كسوة العريس", fr: "Vêtements du marié", en: "Groom's clothing" }, is_correct: true, points: 15 },
            { translations: { ar: "عقد القران (الكتبان)", tn: "عقد القران (الكتبان)", fr: "Le contrat du Coran (les deux livres)", en: "The Qur’an contract (the two books)" }, is_correct: true, points: 20 },
            { translations: { ar: "الجلوة التونسية", tn: "الجلوة التونسية", fr: "Jalwa tunisienne", en: "Tunisian jalwa" }, is_correct: true, points: 25 },
            { translations: { ar: "البرنوس التونسي", tn: "البرنوس التونسي", fr: "Bronos tunisiens", en: "Tunisian bronos" }, is_correct: true, points: 25 },
            { translations: { ar: "الفرق التونسية (المزود)", tn: "الفرق التونسية (المزود)", fr: "Equipes tunisiennes (fournisseur)", en: "Tunisian teams (supplier)" }, is_correct: true, points: 30 },
            { translations: { ar: "المحفل", tn: "المحفل", fr: "Le forum", en: "The forum" }, is_correct: true, points: 35 },
            { translations: { ar: "تقديم البوخوخة", tn: "تقديم البوخوخة", fr: "Présentation de la pêche", en: "Introducing the peach" }, is_correct: true, points: 40 },
            { translations: { ar: "كسر الصحون اليوناني", tn: "كسر الصحون اليوناني", fr: "Cassez les assiettes grecques", en: "Break the Greek plates" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 93,
        is_approved: true,
        translations: {
            ar: { text: "أذكر ألوان أو تصاميم تشتهر بها الصناعة التقليدية للزربية (السجاد) في القيروان؟" },
            tn: { text: "أعطيني ألوان أو تصاميم تشتهر بيهم الزربية القيروانية؟" },
            fr: { text: "Citez des couleurs ou motifs pour lesquels le tapis de Kairouan est réputé ?" },
            en: { text: "Name colors or designs the Kairouan carpet (zarbia) is known for?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "الزربية العلوشة", tn: "الزربية العلوشة", fr: "Le tapis Alousha", en: "The Alousha carpet" }, is_correct: true, points: 10 },
            { translations: { ar: "الزربية الحرير", tn: "الزربية الحرير", fr: "Tapis en soie", en: "Silk carpet" }, is_correct: true, points: 20 },
            { translations: { ar: "الزربية الصوف", tn: "الزربية الصوف", fr: "Tapis en laine", en: "Wool carpet" }, is_correct: true, points: 15 },
            { translations: { ar: "الرقمة القيروانية", tn: "الرقمة القيروانية", fr: "Numéro kairouanien", en: "Kairouanian number" }, is_correct: true, points: 25 },
            { translations: { ar: "المحرب الكلاسيكي", tn: "المحرب الكلاسيكي", fr: "Guerrier classique", en: "Classic warrior" }, is_correct: true, points: 30 },
            { translations: { ar: "الخطوط الهندسية البربرية", tn: "الخطوط الهندسية البربرية", fr: "Lignes géométriques berbères", en: "Berber geometric lines" }, is_correct: true, points: 35 },
            { translations: { ar: "الزربية المرقوم", tn: "الزربية المرقوم", fr: "Le tapis marqué", en: "The marked carpet" }, is_correct: true, points: 30 },
            { translations: { ar: "الزربية الكليم", tn: "الزربية الكليم", fr: "Le tapis kilim", en: "The kilim carpet" }, is_correct: true, points: 30 },
            { translations: { ar: "التطريز الذهبي", tn: "التطريز الذهبي", fr: "Broderie dorée", en: "Golden embroidery" }, is_correct: true, points: 40 },
            { translations: { ar: "الرسم ثلاثي الأبعاد", tn: "الرسم ثلاثي الأبعاد", fr: "Dessin 3D", en: "3D drawing" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 94,
        is_approved: true,
        translations: {
            ar: { text: "أذكر معارك أو أحداث عسكرية هامة وقعت إبان الحرب العالمية الثانية في تونس؟" },
            tn: { text: "أعطيني معارك أو أحداث عسكرية صرات في الحرب العالمية الثانية في تونس؟" },
            fr: { text: "Citez des batailles ou événements militaires survenus en Tunisie pendant la Seconde Guerre mondiale ?" },
            en: { text: "Name battles or military events that took place in Tunisia during World War II?" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "معركة خط مارث", tn: "معركة خط مارث", fr: "Bataille de la Ligne de Mareth", en: "Battle of the Line of Mareth" }, is_correct: true, points: 15 },
            { translations: { ar: "حملة تونس", tn: "حملة تونس", fr: "Campagne Tunisie", en: "Tunisia campaign" }, is_correct: true, points: 20 },
            { translations: { ar: "معركة القصرين ممر", tn: "معركة القصرين ممر", fr: "Bataille du col de Kasserine", en: "Battle of Kasserine Pass" }, is_correct: true, points: 25 },
            { translations: { ar: "معركة مدنين", tn: "معركة مدنين", fr: "Bataille de Médenine", en: "Battle of Medenine" }, is_correct: true, points: 30 },
            { translations: { ar: "معركة سيدي بوزيد", tn: "معركة سيدي بوزيد", fr: "Bataille de Sidi Bouzid", en: "Battle of Sidi Bouzid" }, is_correct: true, points: 35 },
            { translations: { ar: "حصار بنزرت العالمي", tn: "حصار بنزرت العالمي", fr: "Siège mondial de Bizerte", en: "Global Siege of Bizerte" }, is_correct: true, points: 40 },
            { translations: { ar: "معركة جبل جرف", tn: "معركة جبل جرف", fr: "Bataille de Jabal Jurf", en: "Battle of Jabal Jurf" }, is_correct: true, points: 45 },
            { translations: { ar: "اتفاقية الهدنة بتونس", tn: "اتفاقية الهدنة بتونس", fr: "Accord d'armistice en Tunisie", en: "Armistice Agreement in Tunisia" }, is_correct: true, points: 45 },
            { translations: { ar: "معركة بوقرنين العالمية", tn: "معركة بوقرنين العالمية", fr: "Bataille mondiale de Bu Qarnayn", en: "Bu Qarnayn Global Battle" }, is_correct: true, points: 50 },
            { translations: { ar: "معركة Pearl Harbor", tn: "معركة Pearl Harbor", fr: "Bataille de Pearl Harbor", en: "Battle of Pearl Harbor" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 95,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أسماء مصممي أزياء أو دور أزياء تونسية عالمية؟" },
            tn: { text: "أعطيني مصممي أزياء أو دور أزياء تونسية معروفين عالمياً؟" },
            fr: { text: "Citez des créateurs de mode ou maisons de couture tunisiens connus dans le monde ?" },
            en: { text: "Name Tunisian fashion designers or fashion houses known worldwide?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "عز الدين علية", tn: "عز الدين علية", fr: "Ezzedine Alaïa", en: "Ezzedine Alaia" }, is_correct: true, points: 10 },
            { translations: { ar: "ماكس عزرية", tn: "ماكس عزرية", fr: "Max Azria", en: "Max Azria" }, is_correct: true, points: 15 },
            { translations: { ar: "سفيان بن حليمة", tn: "سفيان بن حليمة", fr: "Soufyane ben Halima", en: "Sufyan bin Halima" }, is_correct: true, points: 20 },
            { translations: { ar: "هادي سليمان", tn: "هادي سليمان", fr: "Hadi Soliman", en: "Hadi Suleiman" }, is_correct: true, points: 25 },
            { translations: { ar: "فارس الشيرازي", tn: "فارس الشيرازي", fr: "Fares Al-Shirazi", en: "Fares Al-Shirazi" }, is_correct: true, points: 30 },
            { translations: { ar: "أنيسة عايد", tn: "أنيسة عايد", fr: "Anisa Ayed", en: "Anisa Ayed" }, is_correct: true, points: 35 },
            { translations: { ar: "دار الكسوة التونسية", tn: "دار الكسوة التونسية", fr: "Maison de bardage tunisienne", en: "Tunisian cladding house" }, is_correct: true, points: 40 },
            { translations: { ar: "مهدي كليبي", tn: "مهدي كليبي", fr: "Mehdi Klébi", en: "Mehdi Klebi" }, is_correct: true, points: 45 },
            { translations: { ar: "ليلى بن خليفة", tn: "ليلى بن خليفة", fr: "Laïla ben Khalifa", en: "Laila bin Khalifa" }, is_correct: true, points: 50 },
            { translations: { ar: "Coco Chanel", tn: "Coco Chanel", fr: "Coco Chanel", en: "Coco Chanel" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 96,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أصناف من الطيور أو الحيوانات البرية المهاجرة التي تتواجد في محمية إشكل التونسية؟" },
            tn: { text: "أعطيني طيور أو حيوانات مهاجرة تلقاها في محمية إشكل التونسية؟" },
            fr: { text: "Citez des oiseaux ou animaux migrateurs que l'on trouve dans le parc national d'Ichkeul ?" },
            en: { text: "Name migratory birds or animals found in Tunisia's Ichkeul nature reserve?" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "الجاموس المائي", tn: "الجاموس المائي", fr: "Buffle d'eau", en: "Water buffalo" }, is_correct: true, points: 10 },
            { translations: { ar: "اللقلق الأبيض", tn: "اللقلق الأبيض", fr: "Cigogne blanche", en: "White stork" }, is_correct: true, points: 15 },
            { translations: { ar: "النحام الوردي (الفلامينغو)", tn: "النحام الوردي (الفلامينغو)", fr: "Flamant rose (flamant rose)", en: "Pink flamingo (flamingo)" }, is_correct: true, points: 15 },
            { translations: { ar: "البط البري", tn: "البط البري", fr: "Sarcelle", en: "Teal" }, is_correct: true, points: 20 },
            { translations: { ar: "الإوز الرمادي", tn: "الإوز الرمادي", fr: "Oies grises", en: "Gray geese" }, is_correct: true, points: 25 },
            { translations: { ar: "الغرة الشائعة", tn: "الغرة الشائعة", fr: "Frange commune", en: "Common bangs" }, is_correct: true, points: 30 },
            { translations: { ar: "النسر الذهبي", tn: "النسر الذهبي", fr: "Aigle royal", en: "Golden eagle" }, is_correct: true, points: 35 },
            { translations: { ar: "الصقر المهاجر", tn: "الصقر المهاجر", fr: "Faucon migrateur", en: "Migratory falcon" }, is_correct: true, points: 40 },
            { translations: { ar: "البجع الأبيض", tn: "البجع الأبيض", fr: "Cygnes blancs", en: "White swans" }, is_correct: true, points: 45 },
            { translations: { ar: "الدب القطبي", tn: "الدب القطبي", fr: "Ours blanc", en: "Polar bear" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 97,
        is_approved: true,
        translations: {
            ar: { text: "أذكر مأكولات تونسية تقليدية يتم إعدادها خصيصاً في عيد الأضحى المبارك؟" },
            tn: { text: "أعطيني أكلات تونسية تتحضر خصيصاً في عيد الأضحى المبارك؟" },
            fr: { text: "Citez des plats tunisiens préparés spécialement pour l'Aïd al-Adha ?" },
            en: { text: "Name Tunisian dishes prepared specifically for Eid al-Adha?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "العصبان", tn: "العصبان", fr: "Le nerf", en: "The nerve" }, is_correct: true, points: 10 },
            { translations: { ar: "المشوي", tn: "المشوي", fr: "Grillé", en: "Grilled" }, is_correct: true, points: 10 },
            { translations: { ar: "القديد", tn: "القديد", fr: "Al-Qadeed", en: "Al-Qadeed" }, is_correct: true, points: 15 },
            { translations: { ar: "القلاية التونسية", tn: "القلاية التونسية", fr: "Poêle tunisienne", en: "Tunisian frying pan" }, is_correct: true, points: 20 },
            { translations: { ar: "المروزية", tn: "المروزية", fr: "Marouzia", en: "Marouzia" }, is_correct: true, points: 25 },
            { translations: { ar: "الرأس المصلّي", tn: "الرأس المصلّي", fr: "La tête en prière", en: "The praying head" }, is_correct: true, points: 30 },
            { translations: { ar: "الكردوش", tn: "الكردوش", fr: "Le kardouch", en: "The kardush" }, is_correct: true, points: 35 },
            { translations: { ar: "السلطة المشوية بالحم", tn: "السلطة المشوية بالحم", fr: "Salade grillée à la viande", en: "Grilled salad with meat" }, is_correct: true, points: 40 },
            { translations: { ar: "الفتات بالعلوش", tn: "الفتات بالعلوش", fr: "Miettes avec Aloush", en: "Crumbs with Aloush" }, is_correct: true, points: 45 },
            { translations: { ar: "الرنجة والفسيخ", tn: "الرنجة والفسيخ", fr: "Hareng et feseekh", en: "Herring and feseekh" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 98,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أسماء تونسية شائعة تُطلق على النباتات العطرية المستعملة في تقطير المياه العطرة؟" },
            tn: { text: "أعطيني أسامي نباتات عطرية يتقطر منها الماء العطر؟" },
            fr: { text: "Citez des noms de plantes aromatiques dont on distille de l'eau parfumée ?" },
            en: { text: "Name aromatic plants used to distill scented water?" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "الزهر (نارنج)", tn: "الزهر (نارنج)", fr: "Fleur d'oranger", en: "Orange blossom" }, is_correct: true, points: 10 },
            { translations: { ar: "الورد العربي", tn: "الورد العربي", fr: "Rose d'Arabie", en: "Arabian rose" }, is_correct: true, points: 15 },
            { translations: { ar: "العطرشية", tn: "العطرشية", fr: "Al-Atrashiya", en: "Al-Atrashiya" }, is_correct: true, points: 15 },
            { translations: { ar: "النسري", tn: "النسري", fr: "Al-Nisri", en: "Al-Nisri" }, is_correct: true, points: 20 },
            { translations: { ar: "الخزامى", tn: "الخزامى", fr: "lavande", en: "lavender" }, is_correct: true, points: 25 },
            { translations: { ar: "الريحان", tn: "الريحان", fr: "Basilic", en: "Basil" }, is_correct: true, points: 30 },
            { translations: { ar: "البابونج", tn: "البابونج", fr: "Camomille", en: "Chamomile" }, is_correct: true, points: 35 },
            { translations: { ar: "النعناع العربي", tn: "النعناع العربي", fr: "menthe arabe", en: "Arabian mint" }, is_correct: true, points: 40 },
            { translations: { ar: "الياسمين التونسي", tn: "الياسمين التونسي", fr: "Jasmin de Tunisie", en: "Tunisian jasmine" }, is_correct: true, points: 45 },
            { translations: { ar: "نبات الصبار الشوكي", tn: "نبات الصبار الشوكي", fr: "Plante de cactus épineux", en: "Spiny cactus plant" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 99,
        is_approved: true,
        translations: {
            ar: { text: "أذكر فنانين وممثلين تونسيين اشتهروا بأدوارهم في المسلسل الكوميدي 'شوفلي حل'؟" },
            tn: { text: "أعطيني فنانين وممثلين اشتهرو بأدوارهم في مسلسل 'شوفلي حل'؟" },
            fr: { text: "Citez des artistes et acteurs connus pour leurs rôles dans la série « Choufli Hal » ?" },
            en: { text: "Name artists and actors known for their roles in the series \"Choufli Hal\"?" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "كمال التواتي", tn: "كمال التواتي", fr: "Kamal Touati", en: "Kamal Touati" }, is_correct: true, points: 10 },
            { translations: { ar: "سفيان الشعري", tn: "سفيان الشعري", fr: "Soufyane Al-Shaari", en: "Sufyan Al-Shaari" }, is_correct: true, points: 10 },
            { translations: { ar: "منى نور الدين", tn: "منى نور الدين", fr: "Mona Nour El-Din", en: "Mona Nour El-Din" }, is_correct: true, points: 10 },
            { translations: { ar: "جميلة الشيحي", tn: "جميلة الشيحي", fr: "Jamila Al Shehhi", en: "Jamila Al Shehhi" }, is_correct: true, points: 15 },
            { translations: { ar: "كوثر الباردي", tn: "كوثر الباردي", fr: "Kawthar Al-Bardi", en: "Kawthar Al-Bardi" }, is_correct: true, points: 15 },
            { translations: { ar: "فيصل بالزين", tn: "فيصل بالزين", fr: "Fayçal Balzein", en: "Faisal Balzein" }, is_correct: true, points: 20 },
            { translations: { ar: "أسماء بن عثمان", tn: "أسماء بن عثمان", fr: "Asma ben Othman", en: "Asma bin Othman" }, is_correct: true, points: 20 },
            { translations: { ar: "توفيق البحري", tn: "توفيق البحري", fr: "Tawfiq Al-Bahri", en: "Tawfiq Al-Bahri" }, is_correct: true, points: 25 },
            { translations: { ar: "آمال البكوش", tn: "آمال البكوش", fr: "Amal Al-Bakoush", en: "Amal Al-Bakoush" }, is_correct: true, points: 30 },
            { translations: { ar: "ياسر العظمة", tn: "ياسر العظمة", fr: "Yasser Al-Azma", en: "Yasser Al-Azma" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 100,
        is_approved: true,
        translations: {
            ar: { text: "أذكر أطباق تونسية تقليدية تعتمد في تحضيرها على السمك الطازج؟" },
            tn: { text: "أعطيني أطباق تونسية تقليدية أساسها الحوت الطري؟" },
            fr: { text: "Citez des plats tunisiens traditionnels à base de poisson frais ?" },
            en: { text: "Name traditional Tunisian dishes made with fresh fish?" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "كسكسي بالحوت", tn: "كسكسي بالحوت", fr: "Couscous à la baleine", en: "Couscous with whale" }, is_correct: true, points: 10 },
            { translations: { ar: "شربة حوت", tn: "شربة حوت", fr: "Soupe aux baleines", en: "Whale soup" }, is_correct: true, points: 15 },
            { translations: { ar: "مسلي حوت", tn: "مسلي حوت", fr: "Baleine amusante", en: "Amusing whale" }, is_correct: true, points: 20 },
            { translations: { ar: "كفتة سردينة", tn: "كفتة سردينة", fr: "Kofta de sardines", en: "Sardine kofta" }, is_correct: true, points: 20 },
            { translations: { ar: "عجة قاروس", tn: "عجة قاروس", fr: "Omelette au bar", en: "Sea bass omelette" }, is_correct: true, points: 25 },
            { translations: { ar: "سمك مشوي على الفحم", tn: "سمك مشوي على الفحم", fr: "Poisson grillé au charbon de bois", en: "Charcoal grilled fish" }, is_correct: true, points: 25 },
            { translations: { ar: "طاجين حوت", tn: "طاجين حوت", fr: "Tajine de baleine", en: "Whale tagine" }, is_correct: true, points: 30 },
            { translations: { ar: "بريكة بالتن", tn: "بريكة بالتن", fr: "Barika Baltin", en: "Barika Baltin" }, is_correct: true, points: 20 },
            { translations: { ar: "مرقة حوت بوري", tn: "مرقة حوت بوري", fr: "Bouillon de mulet de baleine", en: "Whale mullet broth" }, is_correct: true, points: 35 },
            { translations: { ar: "ستيك اللحم البقري", tn: "ستيك اللحم البقري", fr: "Steak de boeuf", en: "Beef steak" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 101,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنميات شهيرة تم عرضها على قناة سبيستون؟" },
            tn: { text: "أنميات معروفة في سبيستون؟" },
            fr: { text: "Citez 9 animes célèbres diffusés sur Spacetoon ?" },
            en: { text: "Name 9 famous anime series shown on Spacetoon?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "المحقق كونان", tn: "كونان", fr: "Détective Conan", en: "Detective Conan" }, is_correct: true, points: 10 },
            { translations: { ar: "القناص", tn: "القناص", fr: "Hunter x Hunter", en: "Hunter x Hunter" }, is_correct: true, points: 10 },
            { translations: { ar: "دراجون بول", tn: "دراجون بول", fr: "Dragon Ball", en: "Dragon Ball" }, is_correct: true, points: 10 },
            { translations: { ar: "ون بيس", tn: "ون بيس", fr: "One Piece", en: "One Piece" }, is_correct: true, points: 10 },
            { translations: { ar: "ناروتو", tn: "ناروتو", fr: "Naruto", en: "Naruto" }, is_correct: true, points: 10 },
            { translations: { ar: "أبطال الديجيتال", tn: "أبطال الديجيتال", fr: "Digimon", en: "Digimon" }, is_correct: true, points: 10 },
            { translations: { ar: "صانع السلام", tn: "صانع السلام", fr: "Peace Maker", en: "Peace Maker" }, is_correct: true, points: 10 },
            { translations: { ar: "سلام دانك", tn: "سلام دانك", fr: "Slam Dunk", en: "Slam Dunk" }, is_correct: true, points: 10 },
            { translations: { ar: "سيف النار", tn: "سيف النار", fr: "Ken le Survivant", en: "Fist of the North Star" }, is_correct: true, points: 10 },
            { translations: { ar: "هجوم العمالقة", tn: "هجوم العمالقة", fr: "L'Attaque des Titans", en: "Attack on Titan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 102,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مسلسلات أو برامج كرتونية كلاسيكية عرضت على سبيستون؟" },
            tn: { text: "كرتون سبيستون القديم والجديد؟" },
            fr: { text: "Citez 9 dessins animés classiques de Spacetoon ?" },
            en: { text: "Name 9 classic cartoons or shows on Spacetoon?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "سابق ولاحق", tn: "سابق ولاحق", fr: "Let's & Go", en: "Let's & Go" }, is_correct: true, points: 10 },
            { translations: { ar: "كابتن ماجد", tn: "كابتن ماجد", fr: "Olive et Tom", en: "Captain Tsubasa" }, is_correct: true, points: 10 },
            { translations: { ar: "هزيم الرعد", tn: "هزيم الرعد", fr: "Thunder Jet", en: "Thunder Jet" }, is_correct: true, points: 10 },
            { translations: { ar: "ريمي", tn: "ريمي", fr: "Rémi", en: "Remy" }, is_correct: true, points: 10 },
            { translations: { ar: "عهد الأصدقاء", tn: "عهد الأصدقاء", fr: "Le Ciel Bleu de Roméo", en: "Romeo's Blue Skies" }, is_correct: true, points: 10 },
            { translations: { ar: "أنا وأخي", tn: "أنا وأخي", fr: "Bébé et Moi", en: "Baby and Me" }, is_correct: true, points: 10 },
            { translations: { ar: "النمر المقنع", tn: "النمر المقنع", fr: "Tiger Mask", en: "Tiger Mask" }, is_correct: true, points: 10 },
            { translations: { ar: "جريندايزر", tn: "جريندايزر", fr: "Goldorak", en: "Grendizer" }, is_correct: true, points: 10 },
            { translations: { ar: "دروب ريمي", tn: "دروب ريمي", fr: "Rémi sans famille", en: "Remy Sans Famille" }, is_correct: true, points: 10 },
            { translations: { ar: "سبونج بوب", tn: "سبونج بوب", fr: "Bob l'éponge", en: "SpongeBob SquarePants" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 103,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كلمات أو عبارات أو كواكب شهيرة مرتبطة بقناة سبيستون؟" },
            tn: { text: "حاجات مربوطة بقناة سبيستون؟" },
            fr: { text: "Citez 9 expressions ou planètes liées à Spacetoon ?" },
            en: { text: "Name 9 phrases or planets related to Spacetoon?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "قناة شباب المستقبل", tn: "قناة شباب المستقبل", fr: "La chaîne des jeunes du futur", en: "The channel of the youth of the future" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب مغامرات", tn: "كوكب مغامرات", fr: "Planète Aventures", en: "Planet Adventures" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب تاريخ", tn: "كوكب تاريخ", fr: "Planète Histoire", en: "Planet History" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب أكشن", tn: "كوكب أكشن", fr: "Planète Action", en: "Planet Action" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب زمردة", tn: "كوكب زمردة", fr: "Planète Zomoroda", en: "Planet Zomoroda" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب رياضة", tn: "كوكب رياضة", fr: "Planète Sport", en: "Planet Sport" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب علوم", tn: "كوكب علوم", fr: "Planète Science", en: "Planet Science" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب كوميديا", tn: "كوكب كوميديا", fr: "Planète Comédie", en: "Planet Comedy" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب بون بون", tn: "كوكب بون بون", fr: "Planète Bon Bon", en: "Planet Bon Bon" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب الأرض", tn: "كوكب الأرض", fr: "La planète Terre", en: "Planet Earth" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 104,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 شخصيات كرتونية من مسلسلات عرضت على كوكب مغامرات في سبيستون؟" },
            tn: { text: "شخصيات كرتونية في كوكب مغامرات؟" },
            fr: { text: "Citez 9 personnages de la planète Aventures de Spacetoon ?" },
            en: { text: "Name 9 cartoon characters from Planet Adventures on Spacetoon?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "عدنان", tn: "عدنان", fr: "Conan (le fils du futur)", en: "Conan (Future Boy)" }, is_correct: true, points: 10 },
            { translations: { ar: "عبسي", tn: "عبسي", fr: "Jimsy", en: "Jimsy" }, is_correct: true, points: 10 },
            { translations: { ar: "سندباد", tn: "سندباد", fr: "Sinbad", en: "Sinbad" }, is_correct: true, points: 10 },
            { translations: { ar: "باباي", tn: "باباي", fr: "Popeye", en: "Popeye" }, is_correct: true, points: 10 },
            { translations: { ar: "روبن هود", tn: "روبن هود", fr: "Robin des Bois", en: "Robin Hood" }, is_correct: true, points: 10 },
            { translations: { ar: "ماوكلي", tn: "ماوكلي", fr: "Mowgli", en: "Mowgli" }, is_correct: true, points: 10 },
            { translations: { ar: "توم سوير", tn: "توم سوير", fr: "Tom Sawyer", en: "Tom Sawyer" }, is_correct: true, points: 10 },
            { translations: { ar: "سلفر", tn: "سلفر", fr: "John Silver", en: "John Silver" }, is_correct: true, points: 10 },
            { translations: { ar: "جونكر", tn: "جونكر", fr: "Astroganger", en: "Astroganger" }, is_correct: true, points: 10 },
            { translations: { ar: "سبايدرمان", tn: "سبايدرمان", fr: "Spider-Man", en: "Spider-Man" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 105,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كلمات وردت في كلمات أغنية شارة بداية مسلسل 'هزيم الرعد'؟" },
            tn: { text: "كلمات غناية هزيم الرعد؟" },
            fr: { text: "Citez 9 mots de la chanson d'ouverture de Thunder Jet ?" },
            en: { text: "Name 9 words from the opening song of Thunder Jet?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "أبرقي", tn: "أبرقي", fr: "Brille", en: "Flash" }, is_correct: true, points: 10 },
            { translations: { ar: "أرعدي", tn: "أرعدي", fr: "Gronde", en: "Thunder" }, is_correct: true, points: 10 },
            { translations: { ar: "أبطالا", tn: "أبطالا", fr: "Héros", en: "Heroes" }, is_correct: true, points: 10 },
            { translations: { ar: "وعدوك", tn: "وعدوك", fr: "T'ont promis", en: "Promised you" }, is_correct: true, points: 10 },
            { translations: { ar: "أنبل", tn: "أنبل", fr: "Le plus noble", en: "Noblest" }, is_correct: true, points: 10 },
            { translations: { ar: "العصف", tn: "العصف", fr: "La tempête / L'orage", en: "The storm" }, is_correct: true, points: 10 },
            { translations: { ar: "الرعد", tn: "الرعد", fr: "Le tonnerre", en: "The thunder" }, is_correct: true, points: 10 },
            { translations: { ar: "يجتاح", tn: "يجتاح", fr: "Balaye", en: "Sweeps" }, is_correct: true, points: 10 },
            { translations: { ar: "الآفاق", tn: "الآفاق", fr: "Les horizons", en: "The horizons" }, is_correct: true, points: 10 },
            { translations: { ar: "العاصفة", tn: "العاصفة", fr: "La tempête", en: "The storm (incorrect)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 106,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كلمات وردت في أغنية شارة بداية مسلسل 'القناص' باللغة العربية؟" },
            tn: { text: "كلمات غناية القناص؟" },
            fr: { text: "Citez 9 mots du générique arabe de Hunter x Hunter ?" },
            en: { text: "Name 9 words from the Arabic Hunter x Hunter opening?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "لمعت", tn: "لمعت", fr: "A brillé", en: "Shined" }, is_correct: true, points: 10 },
            { translations: { ar: "عيناه", tn: "عيناه", fr: "Ses yeux", en: "His eyes" }, is_correct: true, points: 10 },
            { translations: { ar: "العزم", tn: "العزم", fr: "La détermination", en: "Determination" }, is_correct: true, points: 10 },
            { translations: { ar: "انتفضت", tn: "انتفضت", fr: "S'est dressée", en: "Rose up" }, is_correct: true, points: 10 },
            { translations: { ar: "يمناه", tn: "يمناه", fr: "Sa main droite", en: "His right hand" }, is_correct: true, points: 10 },
            { translations: { ar: "هدوء", tn: "هدوء", fr: "Le calme / Silence", en: "Silence" }, is_correct: true, points: 10 },
            { translations: { ar: "الليل", tn: "الليل", fr: "La nuit", en: "The night" }, is_correct: true, points: 10 },
            { translations: { ar: "الصامد", tn: "الصامد", fr: "Le résistant", en: "The steadfast" }, is_correct: true, points: 10 },
            { translations: { ar: "المغامر", tn: "المغامر", fr: "L'aventurier", en: "The adventurer" }, is_correct: true, points: 10 },
            { translations: { ar: "البطل", tn: "البطل", fr: "Le héros", en: "The hero (incorrect)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 107,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 شخصيات من مسلسل المحقق كونان بالأسماء المستعملة في الدبلجة العربية؟" },
            tn: { text: "شخصيات المحقق كونان بالعربي؟" },
            fr: { text: "Citez 9 personnages de Detective Conan en arabe ?" },
            en: { text: "Name 9 Detective Conan characters in Arabic dub?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "كونان إيدوجاوا", tn: "كونان", fr: "Conan Edogawa", en: "Conan Edogawa" }, is_correct: true, points: 10 },
            { translations: { ar: "سينشي كودو", tn: "سينشي", fr: "Shinichi Kudo", en: "Shinichi Kudo" }, is_correct: true, points: 10 },
            { translations: { ar: "ران موري", tn: "ران", fr: "Ran Mouri", en: "Ran Mouri" }, is_correct: true, points: 10 },
            { translations: { ar: "توغو موري", tn: "توغو موري", fr: "Kogoro Mouri", en: "Kogoro Mouri" }, is_correct: true, points: 10 },
            { translations: { ar: "الدكتور أغاسا", tn: "البروفيسور أغاسا", fr: "Professeur Agasa", en: "Dr. Agasa" }, is_correct: true, points: 10 },
            { translations: { ar: "هيبارا", tn: "هيبارا", fr: "Haibara Ai", en: "Ai Haibara" }, is_correct: true, points: 10 },
            { translations: { ar: "ميتسو", tn: "ميتسو", fr: "Mitsuhiko", en: "Mitsuhiko" }, is_correct: true, points: 10 },
            { translations: { ar: "جين", tn: "جين", fr: "Gin", en: "Gin" }, is_correct: true, points: 10 },
            { translations: { ar: "المفتش ميغوري", tn: "المفتش ميغوري", fr: "Inspecteur Megure", en: "Inspector Megure" }, is_correct: true, points: 10 },
            { translations: { ar: "لوفي", tn: "لوفي", fr: "Luffy", en: "Luffy" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 108,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كواكب من كواكب قناة سبيستون العشرة المعروفة؟" },
            tn: { text: "كواكب قناة سبيستون؟" },
            fr: { text: "Citez 9 planètes officielles de Spacetoon ?" },
            en: { text: "Name 9 official Spacetoon planets?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "مغامرات", tn: "مغامرات", fr: "Aventures", en: "Adventures" }, is_correct: true, points: 10 },
            { translations: { ar: "أكشن", tn: "أكشن", fr: "Action", en: "Action" }, is_correct: true, points: 10 },
            { translations: { ar: "رياضة", tn: "رياضة", fr: "Sport", en: "Sport" }, is_correct: true, points: 10 },
            { translations: { ar: "زمردة", tn: "زمردة", fr: "Zomoroda", en: "Zomoroda" }, is_correct: true, points: 10 },
            { translations: { ar: "تاريخ", tn: "تاريخ", fr: "Histoire", en: "History" }, is_correct: true, points: 10 },
            { translations: { ar: "علوم", tn: "علوم", fr: "Sciences", en: "Science" }, is_correct: true, points: 10 },
            { translations: { ar: "أبجد", tn: "أبجد", fr: "Abjad", en: "Abjad" }, is_correct: true, points: 10 },
            { translations: { ar: "بون بون", tn: "بون بون", fr: "Bon Bon", en: "Bon Bon" }, is_correct: true, points: 10 },
            { translations: { ar: "كوميديا", tn: "كوميديا", fr: "Comédie", en: "Comedy" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكب دراما", tn: "كوكب دراما", fr: "Planète Drame", en: "Planet Drama" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 109,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كلمات وردت في شارة بداية مسلسل 'دراجون بول' بالدبلجة العربية؟" },
            tn: { text: "كلمات غناية دراجون بول؟" },
            fr: { text: "Citez 9 mots de la chanson arabe de Dragon Ball ?" },
            en: { text: "Name 9 words from Arabic Dragon Ball theme?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "رأيت", tn: "رأيت", fr: "J'ai vu", en: "I saw" }, is_correct: true, points: 10 },
            { translations: { ar: "الحقيقة", tn: "الحقيقة", fr: "La vérité", en: "The truth" }, is_correct: true, points: 10 },
            { translations: { ar: "البصر", tn: "البصر", fr: "La vue / La vision", en: "Vision" }, is_correct: true, points: 10 },
            { translations: { ar: "رسمت", tn: "رسمت", fr: "J'ai dessiné", en: "I drew" }, is_correct: true, points: 10 },
            { translations: { ar: "الحروف", tn: "الحروف", fr: "Les lettres", en: "The letters" }, is_correct: true, points: 10 },
            { translations: { ar: "بعمق", tn: "بعمق", fr: "Profondément", en: "Deeply" }, is_correct: true, points: 10 },
            { translations: { ar: "الحجر", tn: "الحجر", fr: "La pierre", en: "The stone" }, is_correct: true, points: 10 },
            { translations: { ar: "طاقة", tn: "طاقة", fr: "L'énergie", en: "Energy" }, is_correct: true, points: 10 },
            { translations: { ar: "تهزم", tn: "تهزم", fr: "Vaincue", en: "Defeated" }, is_correct: true, points: 10 },
            { translations: { ar: "السيف", tn: "السيف", fr: "L'épée", en: "The sword (incorrect)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 110,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كلمات وردت في شارة بداية الكرتون الشهير 'ريمي' (مررت بخاطري)؟" },
            tn: { text: "كلمات غناية ريمي؟" },
            fr: { text: "Citez 9 mots de la chanson arabe de Rémi ?" },
            en: { text: "Name 9 words from Arabic Remy theme song?" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "مررت", tn: "مررت", fr: "Tu es passé", en: "Passed by" }, is_correct: true, points: 10 },
            { translations: { ar: "بخاطري", tn: "بخاطري", fr: "Dans mes pensées", en: "My mind / thoughts" }, is_correct: true, points: 10 },
            { translations: { ar: "فكرة", tn: "فكرة", fr: "Une idée", en: "An idea" }, is_correct: true, points: 10 },
            { translations: { ar: "رحلت", tn: "رحلت", fr: "Je suis parti", en: "I departed" }, is_correct: true, points: 10 },
            { translations: { ar: "لظلها", tn: "لظلها", fr: "À son ombre", en: "To its shadow" }, is_correct: true, points: 10 },
            { translations: { ar: "أسرى", tn: "أسرى", fr: "Captifs", en: "Captives" }, is_correct: true, points: 10 },
            { translations: { ar: "أمي", tn: "أمي", fr: "Ma mère", en: "My mother" }, is_correct: true, points: 10 },
            { translations: { ar: "عشت", tn: "عشت", fr: "J'ai vécu", en: "I lived" }, is_correct: true, points: 10 },
            { translations: { ar: "أمان", tn: "أمان", fr: "La sécurité / Paix", en: "Safety" }, is_correct: true, points: 10 },
            { translations: { ar: "أبي", tn: "أبي", fr: "Mon père", en: "My father (incorrect)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 111,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يمكن أن تجدها في كوجينة (مطبخ) تونسية؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في كوجينة تونسية؟" },
            fr: { text: "Citez 9 choses que l'on trouve dans une cuisine tunisienne ?" },
            en: { text: "Name 9 things you can find in a Tunisian kitchen" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "مهراس", tn: "مهراس", fr: "Mehres (mortier)", en: "Mehres (Mortar)" }, is_correct: true, points: 10 },
            { translations: { ar: "طاجين", tn: "طاجين", fr: "Plat à tajine", en: "Tajine dish" }, is_correct: true, points: 10 },
            { translations: { ar: "كسكاس", tn: "كسكاس", fr: "Couscoussier (Keskes)", en: "Couscoussier (Keskes)" }, is_correct: true, points: 10 },
            { translations: { ar: "مغرف", tn: "مغرف", fr: "Cuillère", en: "Spoon (Mghorf)" }, is_correct: true, points: 10 },
            { translations: { ar: "طنجرة", tn: "طنجرة", fr: "Marmite", en: "Pot (Tanjra)" }, is_correct: true, points: 10 },
            { translations: { ar: "كاس", tn: "كاس", fr: "Verre", en: "Glass (Kess)" }, is_correct: true, points: 10 },
            { translations: { ar: "مقفول", tn: "مقفول", fr: "Marmite à vapeur (Mghfool)", en: "Steamer pot (Mghfool)" }, is_correct: true, points: 10 },
            { translations: { ar: "غربال", tn: "غربال", fr: "Tamis (Gharbal)", en: "Sieve (Gharbal)" }, is_correct: true, points: 10 },
            { translations: { ar: "كوكوت", tn: "كوكوت", fr: "Autocuiseur (Cocotte)", en: "Pressure cooker (Cocotte)" }, is_correct: true, points: 10 },
            { translations: { ar: "غسالة شياح", tn: "غسالة شياح", fr: "Sèche-linge", en: "Clothes dryer" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 112,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تأخذها معك إلى الشاطئ؟" },
            tn: { text: "أذكر 9 حاجات تهزها معاك للبحر؟" },
            fr: { text: "Citez 9 choses que vous emportez à la plage ?" },
            en: { text: "Name 9 things you take to the beach" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "شمسية", tn: "شمسية", fr: "Parasol", en: "Parasol (Shamsia)" }, is_correct: true, points: 10 },
            { translations: { ar: "بشكير", tn: "بشكير", fr: "Serviette", en: "Towel (Bashkir)" }, is_correct: true, points: 10 },
            { translations: { ar: "تبريد", tn: "تبريد", fr: "Glacière", en: "Cooler (Glaçière)" }, is_correct: true, points: 10 },
            { translations: { ar: "مايوه", tn: "مايوه", fr: "Maillot de bain", en: "Swimsuit (Mayoh)" }, is_correct: true, points: 10 },
            { translations: { ar: "مرايات شمس", tn: "مرايات شمس", fr: "Lunettes de soleil", en: "Sunglasses" }, is_correct: true, points: 10 },
            { translations: { ar: "بورتفوي", tn: "بورتفوي", fr: "Portefeuille", en: "Wallet (Portefeuille)" }, is_correct: true, points: 10 },
            { translations: { ar: "كتاب", tn: "كتاب", fr: "Livre", en: "Book" }, is_correct: true, points: 10 },
            { translations: { ar: "شلاكة", tn: "شلاكة", fr: "Tongs", en: "Flip-flops (Shlaka)" }, is_correct: true, points: 10 },
            { translations: { ar: "واقي شمس", tn: "واقي شمس", fr: "Crème solaire", en: "Sunscreen" }, is_correct: true, points: 10 },
            { translations: { ar: "معطف شتوي", tn: "معطف شتوي", fr: "Manteau d'hiver", en: "Winter coat" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 113,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تجدها في المقهى التونسي؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في قهوة تونسية؟" },
            fr: { text: "Citez 9 choses que l'on trouve dans un café tunisien ?" },
            en: { text: "Name 9 things found in a Tunisian café" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "شيشة", tn: "شيشة", fr: "Chicha", en: "Shisha" }, is_correct: true, points: 10 },
            { translations: { ar: "قهوة عربي", tn: "قهوة عربي", fr: "Café turc", en: "Turkish Coffee" }, is_correct: true, points: 10 },
            { translations: { ar: "كاس ماء", tn: "كاس ماء", fr: "Verre d'eau", en: "Glass of water" }, is_correct: true, points: 10 },
            { translations: { ar: "طاولة", tn: "طاولة", fr: "Table", en: "Table" }, is_correct: true, points: 10 },
            { translations: { ar: "نادل", tn: "نادل", fr: "Serveur", en: "Waiter (Garsoun)" }, is_correct: true, points: 10 },
            { translations: { ar: "رامي", tn: "رامي", fr: "Jeu de Rami", en: "Rami cards" }, is_correct: true, points: 10 },
            { translations: { ar: "شكبة", tn: "شكبة", fr: "Chakba", en: "Shakba cards" }, is_correct: true, points: 10 },
            { translations: { ar: "تليفزيون", tn: "تليفزيون", fr: "Télévision", en: "Television" }, is_correct: true, points: 10 },
            { translations: { ar: "كابوسان", tn: "كابوسان", fr: "Express Capucin", en: "Capucin coffee" }, is_correct: true, points: 10 },
            { translations: { ar: "بيانو", tn: "بيانو", fr: "Piano", en: "Piano" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 114,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يمكنك شراؤها بـ 10 دنانير تونسية؟" },
            tn: { text: "أذكر 9 حاجات تشريها بـ 10 آلاف؟" },
            fr: { text: "Citez 9 choses que vous pouvez acheter pour 10 dinars ?" },
            en: { text: "Name 9 things you can buy for 10 dinars" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "خبز", tn: "خبز", fr: "Pain", en: "Bread" }, is_correct: true, points: 10 },
            { translations: { ar: "كسكروت طن", tn: "كسكروت طن", fr: "Sandwich thon", en: "Tuna sandwich" }, is_correct: true, points: 10 },
            { translations: { ar: "باكو حليب", tn: "باكو حليب", fr: "Brique de lait", en: "Pack of milk" }, is_correct: true, points: 10 },
            { translations: { ar: "قهوة", tn: "قهوة", fr: "Café", en: "Coffee cup" }, is_correct: true, points: 10 },
            { translations: { ar: "قارورة ماء", tn: "قارورة ماء", fr: "Bouteille d'eau", en: "Water bottle" }, is_correct: true, points: 10 },
            { translations: { ar: "دبوزة قازوز", tn: "دبوزة قازوز", fr: "Bouteille de soda", en: "Soda bottle (Gazouz)" }, is_correct: true, points: 10 },
            { translations: { ar: "حارة عظم", tn: "حارة عظم", fr: "Quatre oeufs", en: "Four eggs" }, is_correct: true, points: 10 },
            { translations: { ar: "علبة طن", tn: "علبة طن", fr: "Boîte de thon", en: "Canned tuna" }, is_correct: true, points: 10 },
            { translations: { ar: "باكو شوكلاطة", tn: "باكو شوكلاطة", fr: "Tablette de chocolat", en: "Chocolate pack" }, is_correct: true, points: 10 },
            { translations: { ar: "تذكرة طيارة", tn: "تذكرة طيارة", fr: "Billet d'avion", en: "Plane ticket" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 115,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مكونات يضعها التوانسة في الكسكروت (السندويش)؟" },
            tn: { text: "أذكر 9 حاجات يحطوها التوانسة في الكسكروت؟" },
            fr: { text: "Citez 9 ingrédients que les tunisiens mettent dans un sandwich ?" },
            en: { text: "Name 9 things Tunisians put in a sandwich" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "هريسة", tn: "هريسة", fr: "Harissa", en: "Harissa" }, is_correct: true, points: 10 },
            { translations: { ar: "طن", tn: "طن", fr: "Thon", en: "Tuna" }, is_correct: true, points: 10 },
            { translations: { ar: "سلاطة مشوية", tn: "سلاطة مشوية", fr: "Salade méchouia", en: "Slata Meshwia" }, is_correct: true, points: 10 },
            { translations: { ar: "بطاطا", tn: "بطاطا", fr: "Frites", en: "Fries (Batata)" }, is_correct: true, points: 10 },
            { translations: { ar: "عظم", tn: "عظم", fr: "Oeuf", en: "Egg" }, is_correct: true, points: 10 },
            { translations: { ar: "مايونيز", tn: "مايونيز", fr: "Mayonnaise", en: "Mayonnaise" }, is_correct: true, points: 10 },
            { translations: { ar: "زيتون", tn: "زيتون", fr: "Olives", en: "Olives" }, is_correct: true, points: 10 },
            { translations: { ar: "جبن", tn: "جبن", fr: "Fromage", en: "Cheese" }, is_correct: true, points: 10 },
            { translations: { ar: "جبن كاري", tn: "جبن كاري", fr: "Fromage carré", en: "Sliced cheese (Kari)" }, is_correct: true, points: 10 },
            { translations: { ar: "عسل", tn: "عسل", fr: "Miel", en: "Honey" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 116,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أوامر أو عبارات تطلبها منك أمك؟" },
            tn: { text: "أذكر 9 حاجات تقولهالك أمك باش تعملها؟" },
            fr: { text: "Citez 9 consignes que votre mère vous donne souvent ?" },
            en: { text: "Name 9 things your mother tells you to do" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "اقرأ قرايتك", tn: "اقرأ قرايتك", fr: "Étudie", en: "Study (Iqra)" }, is_correct: true, points: 10 },
            { translations: { ar: "طفي الضو", tn: "طفي الضو", fr: "Éteins la lumière", en: "Turn off the light" }, is_correct: true, points: 10 },
            { translations: { ar: "سكر الباب", tn: "سكر الباب", fr: "Ferme la porte", en: "Close the door" }, is_correct: true, points: 10 },
            { translations: { ar: "لم بيتك", tn: "لم بيتك", fr: "Range ta chambre", en: "Clean your room" }, is_correct: true, points: 10 },
            { translations: { ar: "اغسل يديك", tn: "اغسل يديك", fr: "Lave tes mains", en: "Wash your hands" }, is_correct: true, points: 10 },
            { translations: { ar: "كول ماكلتك", tn: "كول ماكلتك", fr: "Mange ton repas", en: "Eat your food" }, is_correct: true, points: 10 },
            { translations: { ar: "جيب الخبز", tn: "جيب الخبز", fr: "Apporte du pain", en: "Bring bread" }, is_correct: true, points: 10 },
            { translations: { ar: "نحي الصباط", tn: "نحي الصباط", fr: "Enlève tes chaussures", en: "Take off your shoes" }, is_correct: true, points: 10 },
            { translations: { ar: "ارقد بكري", tn: "ارقد بكري", fr: "Dors tôt", en: "Sleep early" }, is_correct: true, points: 10 },
            { translations: { ar: "العب في الشارع", tn: "العب في الشارع", fr: "Joue dans la rue", en: "Play in the street" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 117,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أعذار شائعة يستعملها الناس للتأخر عن الموعد؟" },
            tn: { text: "أذكر 9 أعذار تع التخلف أو المجي مؤخر؟" },
            fr: { text: "Citez 9 excuses courantes pour justifier un retard ?" },
            en: { text: "Name 9 excuses for being late" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "الكار تعطلت", tn: "الكار تعطلت", fr: "Le bus est tombé en panne", en: "Bus broke down" }, is_correct: true, points: 10 },
            { translations: { ar: "المترو وقف", tn: "المترو وقف", fr: "Le métro s'est arrêté", en: "Metro stopped" }, is_correct: true, points: 10 },
            { translations: { ar: "الزحمة في الطريق", tn: "الزحمة في الطريق", fr: "Embouteillages", en: "Traffic jam" }, is_correct: true, points: 10 },
            { translations: { ar: "الموتور ما حبش يخدم", tn: "الموتور ما حبش يخدم", fr: "La voiture ne démarre pas", en: "Car wouldn't start" }, is_correct: true, points: 10 },
            { translations: { ar: "المطر تصب", tn: "المطر تصب", fr: "Il pleut fort", en: "It rained heavily" }, is_correct: true, points: 10 },
            { translations: { ar: "النوم غلبني", tn: "النوم غلبني", fr: "Panne d'oreiller", en: "Overslept" }, is_correct: true, points: 10 },
            { translations: { ar: "التليفون طفى", tn: "التليفون طفى", fr: "Batterie déchargée", en: "Phone died" }, is_correct: true, points: 10 },
            { translations: { ar: "ضيعت المفاتيح", tn: "ضيعت المفاتيح", fr: "Clés perdues", en: "Lost keys" }, is_correct: true, points: 10 },
            { translations: { ar: "المريض في الدار", tn: "المريض في الدار", fr: "Proche malade", en: "Sick relative" }, is_correct: true, points: 10 },
            { translations: { ar: "كنت نجري", tn: "كنت نجري", fr: "Je courrais", en: "I was running" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 118,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يفعلها الأشخاص عندما يشعرون بالملل؟" },
            tn: { text: "أذكر 9 حاجات يعملوها الناس كي يقلقوا؟" },
            fr: { text: "Citez 9 choses que l'on fait quand on s'ennuie ?" },
            en: { text: "Name 9 things people do when they're bored" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "يقلب في التليفون", tn: "يقلب في التليفون", fr: "Fouiller le téléphone", en: "Scroll on phone" }, is_correct: true, points: 10 },
            { translations: { ar: "يتفرج في التلفزة", tn: "يتفرج في التلفزة", fr: "Regarder la télé", en: "Watch TV" }, is_correct: true, points: 10 },
            { translations: { ar: "يرقد", tn: "يرقد", fr: "Dormir", en: "Sleep" }, is_correct: true, points: 10 },
            { translations: { ar: "ياكل", tn: "ياكل", fr: "Manger", en: "Eat" }, is_correct: true, points: 10 },
            { translations: { ar: "يكلم صاحبه", tn: "يكلم صاحبه", fr: "Appeler un ami", en: "Call a friend" }, is_correct: true, points: 10 },
            { translations: { ar: "يخرج يدور", tn: "يخرج يدور", fr: "Sortir faire un tour", en: "Go out for a walk" }, is_correct: true, points: 10 },
            { translations: { ar: "يسمع غناء", tn: "يسمع غناء", fr: "Écouter de la musique", en: "Listen to music" }, is_correct: true, points: 10 },
            { translations: { ar: "يلعب جيمز", tn: "يلعب جيمز", fr: "Jouer aux jeux vidéo", en: "Play video games" }, is_correct: true, points: 10 },
            { translations: { ar: "ينظف البيت", tn: "ينظف البيت", fr: "Ranger la maison", en: "Clean the house" }, is_correct: true, points: 10 },
            { translations: { ar: "يخدم اوفرتايم", tn: "يخدم اوفرتايم", fr: "Faire des heures supplémentaires", en: "Work overtime" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 119,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء لا يفضل قولها في الموعد الأول؟" },
            tn: { text: "أذكر 9 حاجات ما لازمكش تقولها في أول موعد؟" },
            fr: { text: "Citez 9 choses à ne pas dire lors d'un premier rendez-vous ?" },
            en: { text: "Name 9 things you shouldn't say on a first date" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "نحب شريكتي السابقة", tn: "نحب شريكتي السابقة", fr: "J'aime mon ex", en: "I love my ex" }, is_correct: true, points: 10 },
            { translations: { ar: "قداش تخلص؟", tn: "قداش تخلص؟", fr: "Combien tu gagnes ?", en: "How much do you earn?" }, is_correct: true, points: 10 },
            { translations: { ar: "نحب نجيب 10 صغار", tn: "نحب نجيب 10 صغار", fr: "Je veux 10 enfants", en: "I want 10 kids" }, is_correct: true, points: 10 },
            { translations: { ar: "أمي تتدخل في كل شيء", tn: "أمي تتدخل في كل شيء", fr: "Ma mère gère tout", en: "My mom decides everything" }, is_correct: true, points: 10 },
            { translations: { ar: "ما عنديش فلوس", tn: "ما عنديش فلوس", fr: "Je n'ai pas d'argent", en: "I have no money" }, is_correct: true, points: 10 },
            { translations: { ar: "نكره الخدمة", tn: "نكره الخدمة", fr: "Je déteste le travail", en: "I hate working" }, is_correct: true, points: 10 },
            { translations: { ar: "شكلك تعبان", tn: "شكلك تعبان", fr: "Tu as l'air fatigué", en: "You look tired" }, is_correct: true, points: 10 },
            { translations: { ar: "تحب نتزوجو توا؟", tn: "تحب نتزوجو توا؟", fr: "Veux-tu m'épouser ?", en: "Marry me now?" }, is_correct: true, points: 10 },
            { translations: { ar: "أنا ديما نكذب", tn: "أنا ديما نكذب", fr: "Je mens souvent", en: "I lie a lot" }, is_correct: true, points: 10 },
            { translations: { ar: "الطقس جميل اليوم", tn: "الطقس جميل اليوم", fr: "Il fait beau aujourd'hui", en: "The weather is nice today" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 120,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء توجد في محفظة المدرسة؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في محفظة القراية؟" },
            fr: { text: "Citez 9 choses que l'on trouve dans un cartable ?" },
            en: { text: "Name 9 things found in a school bag" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "كتاب", tn: "كتاب", fr: "Livre", en: "Book" }, is_correct: true, points: 10 },
            { translations: { ar: "كراس", tn: "كراس", fr: "Cahier", en: "Notebook" }, is_correct: true, points: 10 },
            { translations: { ar: "مقلمة", tn: "مقلمة", fr: "Trousse", en: "Pencil case" }, is_correct: true, points: 10 },
            { translations: { ar: "قلم", tn: "قلم", fr: "Stylo", en: "Pen" }, is_correct: true, points: 10 },
            { translations: { ar: "ممحاة", tn: "ممحاة", fr: "Gomme", en: "Eraser" }, is_correct: true, points: 10 },
            { translations: { ar: "مسطرة", tn: "مسطرة", fr: "Règle", en: "Ruler" }, is_correct: true, points: 10 },
            { translations: { ar: "لمجة", tn: "لمجة", fr: "Goûter", en: "Snack (Lamja)" }, is_correct: true, points: 10 },
            { translations: { ar: "قارورة ماء", tn: "قارورة ماء", fr: "Bouteille d'eau", en: "Water bottle" }, is_correct: true, points: 10 },
            { translations: { ar: "كارتيابل", tn: "كارتيابل", fr: "Emploi du temps", en: "School schedule" }, is_correct: true, points: 10 },
            { translations: { ar: "مطرقة", tn: "مطرقة", fr: "Marteau", en: "Hammer" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 121,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تراها في المطار؟" },
            tn: { text: "أذكر 9 حاجات تراها في المطار؟" },
            fr: { text: "Citez 9 choses que l'on voit dans un aéroport ?" },
            en: { text: "Name 9 things you can see at an airport" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "طيارة", tn: "طيارة", fr: "Avion", en: "Airplane" }, is_correct: true, points: 10 },
            { translations: { ar: "باسبور", tn: "باسبور", fr: "Passeport", en: "Passport" }, is_correct: true, points: 10 },
            { translations: { ar: "فاليز", tn: "فاليز", fr: "Valise", en: "Suitcase" }, is_correct: true, points: 10 },
            { translations: { ar: "ديوانة", tn: "ديوانة", fr: "Douane", en: "Customs" }, is_correct: true, points: 10 },
            { translations: { ar: "مسافرين", tn: "مسافرين", fr: "Voyageurs", en: "Passengers" }, is_correct: true, points: 10 },
            { translations: { ar: "بيلوت", tn: "بيلوت", fr: "Pilote", en: "Pilot" }, is_correct: true, points: 10 },
            { translations: { ar: "مضيفة", tn: "مضيفة", fr: "Hôtesse", en: "Flight attendant" }, is_correct: true, points: 10 },
            { translations: { ar: "لوحة الأوقات", tn: "لوحة الأوقات", fr: "Écran des vols", en: "Timetable screen" }, is_correct: true, points: 10 },
            { translations: { ar: "بوابات الصعود", tn: "بوابات الصعود", fr: "Portes d'embarquement", en: "Boarding gates" }, is_correct: true, points: 10 },
            { translations: { ar: "تراكتور", tn: "تراكتور", fr: "Tracteur", en: "Tractor" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 122,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء ترتبط بفصل الصيف؟" },
            tn: { text: "أذكر 9 حاجات مربوطة بالصيف؟" },
            fr: { text: "Citez 9 choses associées à l'été ?" },
            en: { text: "Name 9 things associated with summer" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "بحر", tn: "بحر", fr: "Mer", en: "Sea / Beach" }, is_correct: true, points: 10 },
            { translations: { ar: "شمس", tn: "شمس", fr: "Soleil", en: "Sun" }, is_correct: true, points: 10 },
            { translations: { ar: "خلاعة", tn: "خلاعة", fr: "Vacances / Cabane", en: "Vacation / Cabin" }, is_correct: true, points: 10 },
            { translations: { ar: "بطيخ", tn: "بطيخ", fr: "Pastèque", en: "Watermelon" }, is_correct: true, points: 10 },
            { translations: { ar: "مثلجات", tn: "مثلجات", fr: "Glace", en: "Ice cream" }, is_correct: true, points: 10 },
            { translations: { ar: "عرس", tn: "عرس", fr: "Mariage", en: "Wedding" }, is_correct: true, points: 10 },
            { translations: { ar: "سفر", tn: "سفر", fr: "Voyage", en: "Travel" }, is_correct: true, points: 10 },
            { translations: { ar: "قيلولة", tn: "قيلولة", fr: "Sieste", en: "Nap (Qailoula)" }, is_correct: true, points: 10 },
            { translations: { ar: "سهرية", tn: "سهرية", fr: "Soirées", en: "Night parties" }, is_correct: true, points: 10 },
            { translations: { ar: "ثلج", tn: "ثلج", fr: "Neige", en: "Snow" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 123,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يكون لونها عادة أحمر؟" },
            tn: { text: "أذكر 9 حاجات ديما لونها أحمر؟" },
            fr: { text: "Citez 9 choses qui sont généralement rouges ?" },
            en: { text: "Name 9 things that are usually red" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "طماطم", tn: "طماطم", fr: "Tomate", en: "Tomato" }, is_correct: true, points: 10 },
            { translations: { ar: "دم", tn: "دم", fr: "Sang", en: "Blood" }, is_correct: true, points: 10 },
            { translations: { ar: "تفاح", tn: "تفاح", fr: "Pomme", en: "Apple" }, is_correct: true, points: 10 },
            { translations: { ar: "فلفل", tn: "فلفل", fr: "Piment", en: "Chili pepper" }, is_correct: true, points: 10 },
            { translations: { ar: "هريسة", tn: "هريسة", fr: "Harissa", en: "Harissa" }, is_correct: true, points: 10 },
            { translations: { ar: "وردة حمراء", tn: "وردة حمراء", fr: "Rose rouge", en: "Red Rose" }, is_correct: true, points: 10 },
            { translations: { ar: "علم تونس", tn: "علم تونس", fr: "Drapeau tunisien", en: "Tunisian Flag" }, is_correct: true, points: 10 },
            { translations: { ar: "مطفأة حريق", tn: "مطفأة حريق", fr: "Extincteur", en: "Fire extinguisher" }, is_correct: true, points: 10 },
            { translations: { ar: "شفاه", tn: "شفاه", fr: "Lèvres", en: "Lips" }, is_correct: true, points: 10 },
            { translations: { ar: "خيار", tn: "خيار", fr: "Concombre", en: "Cucumber" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 124,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يمكن العثور عليها في السيارة؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في الكرهبة؟" },
            fr: { text: "Citez 9 choses que l'on trouve dans une voiture ?" },
            en: { text: "Name 9 things that can be found in a car" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "فولا", tn: "فولا", fr: "Volant", en: "Steering wheel (Volant)" }, is_correct: true, points: 10 },
            { translations: { ar: "فرامان", tn: "فرامان", fr: "Frein à main", en: "Handbrake (Frein à main)" }, is_correct: true, points: 10 },
            { translations: { ar: "راديو", tn: "راديو", fr: "Radio", en: "Radio" }, is_correct: true, points: 10 },
            { translations: { ar: "مفاتيح", tn: "مفاتيح", fr: "Clés", en: "Keys" }, is_correct: true, points: 10 },
            { translations: { ar: "عجلة سوكور", tn: "عجلة سوكور", fr: "Roue de secours", en: "Spare tire (Secours)" }, is_correct: true, points: 10 },
            { translations: { ar: "تليفون", tn: "تليفون", fr: "Téléphone", en: "Phone" }, is_correct: true, points: 10 },
            { translations: { ar: "بريكيه", tn: "بريكيه", fr: "Briquet", en: "Lighter" }, is_correct: true, points: 10 },
            { translations: { ar: "مرايا", tn: "مرايا", fr: "Miroir", en: "Mirror" }, is_correct: true, points: 10 },
            { translations: { ar: "أوراق الكرهبة", tn: "أوراق الكرهبة", fr: "Papiers du véhicule", en: "Car documents" }, is_correct: true, points: 10 },
            { translations: { ar: "ثلاجة كبار", tn: "ثلاجة كبار", fr: "Grand réfrigérateur", en: "Big Fridge" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 125,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يفعلها الأشخاص على هواتفهم؟" },
            tn: { text: "أذكر 9 حاجات يعملوها الناس بالتليفون؟" },
            fr: { text: "Citez 9 activités que l'on fait sur son téléphone ?" },
            en: { text: "Name 9 things people do on their phones" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "فيسبوك", tn: "فيسبوك", fr: "Facebook", en: "Facebook" }, is_correct: true, points: 10 },
            { translations: { ar: "تيك توك", tn: "تيك توك", fr: "TikTok", en: "TikTok" }, is_correct: true, points: 10 },
            { translations: { ar: "مكالمة", tn: "مكالمة", fr: "Passer un appel", en: "Make a call" }, is_correct: true, points: 10 },
            { translations: { ar: "ميساج", tn: "ميساج", fr: "Envoyer un message", en: "Send a message" }, is_correct: true, points: 10 },
            { translations: { ar: "تصاور", tn: "تصاور", fr: "Prendre des photos", en: "Take photos" }, is_correct: true, points: 10 },
            { translations: { ar: "ألعاب", tn: "ألعاب", fr: "Jouer aux jeux", en: "Play games" }, is_correct: true, points: 10 },
            { translations: { ar: "راديو", tn: "راديو", fr: "Écouter la radio", en: "Listen to radio" }, is_correct: true, points: 10 },
            { translations: { ar: "يوتيوب", tn: "يوتيوب", fr: "Regarder YouTube", en: "Watch YouTube" }, is_correct: true, points: 10 },
            { translations: { ar: "منبه", tn: "منبه", fr: "Régler l'alarme", en: "Set alarm" }, is_correct: true, points: 10 },
            { translations: { ar: "يطيبو بيه العشاء", tn: "يطيبو بيه العشاء", fr: "Cuire le dîner", en: "Cook dinner" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 126,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تُصدر ضجيجاً؟" },
            tn: { text: "أذكر 9 حاجات تعمل الحس؟" },
            fr: { text: "Citez 9 choses qui font du bruit ?" },
            en: { text: "Name 9 things that make noise" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "كلاكسون", tn: "كلاكسون", fr: "Klaxon", en: "Car horn (Klaxon)" }, is_correct: true, points: 10 },
            { translations: { ar: "طيارة", tn: "طيارة", fr: "Avion", en: "Airplane" }, is_correct: true, points: 10 },
            { translations: { ar: "كلب ينبح", tn: "كلب ينبح", fr: "Chien qui aboie", en: "Dog barking" }, is_correct: true, points: 10 },
            { translations: { ar: "عرس", tn: "عرس", fr: "Mariage", en: "Wedding party" }, is_correct: true, points: 10 },
            { translations: { ar: "شنيور", tn: "شنيور", fr: "Perceuse", en: "Drill (Chignole)" }, is_correct: true, points: 10 },
            { translations: { ar: "رعد", tn: "رعد", fr: "Tonnerre", en: "Thunder" }, is_correct: true, points: 10 },
            { translations: { ar: "بوق", tn: "بوق", fr: "Mégaphone", en: "Horn / Megaphone" }, is_correct: true, points: 10 },
            { translations: { ar: "دراجة نارية", tn: "دراجة نارية", fr: "Moto", en: "Motorcycle" }, is_correct: true, points: 10 },
            { translations: { ar: "بكاء الصغير", tn: "بكاء الصغير", fr: "Bébé qui pleure", en: "Crying baby" }, is_correct: true, points: 10 },
            { translations: { ar: "شمعة", tn: "شمعة", fr: "Bougie", en: "Candle" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 127,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يمكن أن تجدها في حفل زفاف تونسي؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في عرس تونسي؟" },
            fr: { text: "Citez 9 éléments que l'on trouve dans un mariage tunisien ?" },
            en: { text: "Name 9 things you might find in a Tunisian wedding" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "مزود", tn: "مزود", fr: "Groupe Mezoued", en: "Mezoued band" }, is_correct: true, points: 10 },
            { translations: { ar: "داربوكة", tn: "داربوكة", fr: "Darbouka", en: "Darbouka" }, is_correct: true, points: 10 },
            { translations: { ar: "حنة", tn: "حنة", fr: "Henné", en: "Henna" }, is_correct: true, points: 10 },
            { translations: { ar: "قفطان", tn: "قفطان", fr: "Caftan", en: "Kaftan" }, is_correct: true, points: 10 },
            { translations: { ar: "كسكسي", tn: "كسكسي", fr: "Couscous", en: "Couscous" }, is_correct: true, points: 10 },
            { translations: { ar: "ملاوي", tn: "ملاوي", fr: "Mlaoui", en: "Mlaoui" }, is_correct: true, points: 10 },
            { translations: { ar: "بقلاوة", tn: "بقلاوة", fr: "Baklawa", en: "Baklawa" }, is_correct: true, points: 10 },
            { translations: { ar: "فستان عروسة", tn: "فستان عروسة", fr: "Robe de mariée", en: "Wedding dress" }, is_correct: true, points: 10 },
            { translations: { ar: "زغاريد", tn: "زغاريد", fr: "Youyous", en: "Ululations (Zgharits)" }, is_correct: true, points: 10 },
            { translations: { ar: "شجرة الكريسماس", tn: "شجرة الكريسماس", fr: "Sapin de Noël", en: "Christmas tree" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 128,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أسباب شائعة للغياب المرضي عن العمل؟" },
            tn: { text: "أذكر 9 أسباب للغياب المرضي م الخدمة؟" },
            fr: { text: "Citez 9 motifs d'absence pour maladie au travail ?" },
            en: { text: "Name 9 reasons someone might call in sick" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "سخونة", tn: "سخونة", fr: "Fièvre", en: "Fever / Heat" }, is_correct: true, points: 10 },
            { translations: { ar: "وجيعة راس", tn: "وجيعة راس", fr: "Maux de tête", en: "Headache" }, is_correct: true, points: 10 },
            { translations: { ar: "قريب", tn: "قريب", fr: "Grippe", en: "Flu (Grippe)" }, is_correct: true, points: 10 },
            { translations: { ar: "مغص", tn: "مغص", fr: "Maux d'estomac", en: "Stomach ache (Cramps)" }, is_correct: true, points: 10 },
            { translations: { ar: "وجيعة ضرسة", tn: "وجيعة ضرسة", fr: "Maux de dents", en: "Toothache" }, is_correct: true, points: 10 },
            { translations: { ar: "تعب شديد", tn: "تعب شديد", fr: "Fatigue intense", en: "Extreme fatigue" }, is_correct: true, points: 10 },
            { translations: { ar: "حادث", tn: "حادث", fr: "Accident", en: "Accident" }, is_correct: true, points: 10 },
            { translations: { ar: "زيارة طبيب", tn: "زيارة طبيب", fr: "Rendez-vous médical", en: "Doctor visit" }, is_correct: true, points: 10 },
            { translations: { ar: "تسمم غذائي", tn: "تسمم غذائي", fr: "Intoxication alimentaire", en: "Food poisoning" }, is_correct: true, points: 10 },
            { translations: { ar: "ماشي للسينما", tn: "ماشي للسينما", fr: "Aller au cinéma", en: "Going to cinema" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 129,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنشطة يمكنك القيام بها دون إنفاق مال؟" },
            tn: { text: "أذكر 9 حاجات تعملها بلاش فلوس؟" },
            fr: { text: "Citez 9 choses que vous pouvez faire gratuitement ?" },
            en: { text: "Name 9 things you can do without spending money" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "مشية في الطبيعة", tn: "مشية في الطبيعة", fr: "Promenade en nature", en: "Walk in nature" }, is_correct: true, points: 10 },
            { translations: { ar: "نوم", tn: "نوم", fr: "Sommeil / Sieste", en: "Sleep" }, is_correct: true, points: 10 },
            { translations: { ar: "قراءة كتاب", tn: "قراءة كتاب", fr: "Lire un livre", en: "Read a book" }, is_correct: true, points: 10 },
            { translations: { ar: "حديث مع صديق", tn: "حديث مع صديق", fr: "Discuter avec un ami", en: "Talk with a friend" }, is_correct: true, points: 10 },
            { translations: { ar: "جري", tn: "جري", fr: "Courir / Jogging", en: "Jogging" }, is_correct: true, points: 10 },
            { translations: { ar: "سباحة في البحر", tn: "سباحة في البحر", fr: "Nager dans la mer", en: "Swim in the sea" }, is_correct: true, points: 10 },
            { translations: { ar: "تفرج في غروب الشمس", tn: "تفرج في غروب الشمس", fr: "Regarder le coucher du soleil", en: "Watch the sunset" }, is_correct: true, points: 10 },
            { translations: { ar: "رياضة", tn: "رياضة", fr: "Faire du sport", en: "Workout / Sport" }, is_correct: true, points: 10 },
            { translations: { ar: "ضحك", tn: "ضحك", fr: "Rire", en: "Laugh" }, is_correct: true, points: 10 },
            { translations: { ar: "شراء كرهبة", tn: "شراء كرهبة", fr: "Acheter une voiture", en: "Buy a car" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 130,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يفعلها الناس فور الاستيقاظ صباحاً؟" },
            tn: { text: "أذكر 9 حاجات يعملوها الناس كي يقومو الصباح؟" },
            fr: { text: "Citez 9 gestes du matin au réveil ?" },
            en: { text: "Name 9 things people do first thing in the morning" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "يغسل وجهه", tn: "يغسل وجهه", fr: "Se laver le visage", en: "Wash face" }, is_correct: true, points: 10 },
            { translations: { ar: "يفرش سنيه", tn: "يفرش سنيه", fr: "Se brosser les dents", en: "Brush teeth" }, is_correct: true, points: 10 },
            { translations: { ar: "يشرب قهوة", tn: "يشرب قهوة", fr: "Prendre un café", en: "Drink coffee" }, is_correct: true, points: 10 },
            { translations: { ar: "يحل تليفونه", tn: "يحل تليفونه", fr: "Regarder son téléphone", en: "Check phone" }, is_correct: true, points: 10 },
            { translations: { ar: "يلبس حوايجه", tn: "يلبس حوايجه", fr: "S'habiller", en: "Get dressed" }, is_correct: true, points: 10 },
            { translations: { ar: "يصلي", tn: "يصلي", fr: "Prier", en: "Pray" }, is_correct: true, points: 10 },
            { translations: { ar: "يفطر", tn: "يفطر", fr: "Prendre le petit déjeuner", en: "Eat breakfast" }, is_correct: true, points: 10 },
            { translations: { ar: "يحل الشبابك", tn: "يحل الشبابك", fr: "Ouvrir les fenêtres", en: "Open windows" }, is_correct: true, points: 10 },
            { translations: { ar: "يعمل سبورت", tn: "يعمل سبورت", fr: "Faire du sport", en: "Do exercise" }, is_correct: true, points: 10 },
            { translations: { ar: "يرقد", tn: "يرقد", fr: "Se rendormir", en: "Go back to sleep" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 131,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يمكن أن تجدها في الحمام؟" },
            tn: { text: "أذكر 9 حاجات في بيت الراحة / الحمام؟" },
            fr: { text: "Citez 9 objets que l'on trouve dans une salle de bain ?" },
            en: { text: "Name 9 things you find in a bathroom" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "صابون", tn: "صابون", fr: "Savon", en: "Soap" }, is_correct: true, points: 10 },
            { translations: { ar: "شامبو", tn: "شامبو", fr: "Shampooing", en: "Shampoo" }, is_correct: true, points: 10 },
            { translations: { ar: "بشكير", tn: "بشكير", fr: "Serviette", en: "Towel" }, is_correct: true, points: 10 },
            { translations: { ar: "فرشة سنين", tn: "فرشة سنين", fr: "Brosse à dents", en: "Toothbrush" }, is_correct: true, points: 10 },
            { translations: { ar: "معجون سنين", tn: "معجون سنين", fr: "Dentifrice", en: "Toothpaste" }, is_correct: true, points: 10 },
            { translations: { ar: "مرايا", tn: "مرايا", fr: "Miroir", en: "Mirror" }, is_correct: true, points: 10 },
            { translations: { ar: "ماء", tn: "ماء", fr: "Eau", en: "Water" }, is_correct: true, points: 10 },
            { translations: { ar: "سبالة", tn: "سبالة", fr: "Robinet", en: "Faucet" }, is_correct: true, points: 10 },
            { translations: { ar: "بابيي تواليت", tn: "بابيي تواليت", fr: "Papier toilette", en: "Toilet paper" }, is_correct: true, points: 10 },
            { translations: { ar: "تلفزة", tn: "تلفزة", fr: "Télévision", en: "Television" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 132,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مهن شعبية شائعة في تونس؟" },
            tn: { text: "أذكر 9 مهن شعبية يدورو في تونس؟" },
            fr: { text: "Citez 9 métiers populaires en Tunisie ?" },
            en: { text: "Name 9 popular Tunisian professions" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "خضار", tn: "خضار", fr: "Maraîcher / Marchand de légumes", en: "Greengrocer" }, is_correct: true, points: 10 },
            { translations: { ar: "جزار", tn: "جزار", fr: "Boucher", en: "Butcher" }, is_correct: true, points: 10 },
            { translations: { ar: "حلاق", tn: "حلاق", fr: "Coiffeur", en: "Barber" }, is_correct: true, points: 10 },
            { translations: { ar: "تاكسيست", tn: "تاكسيست", fr: "Taximan", en: "Taxi driver" }, is_correct: true, points: 10 },
            { translations: { ar: "دهان", tn: "دهان", fr: "Peintre", en: "Painter" }, is_correct: true, points: 10 },
            { translations: { ar: "بناي", tn: "بناي", fr: "Maçon", en: "Builder / Mason" }, is_correct: true, points: 10 },
            { translations: { ar: "قهواجي", tn: "قهواجي", fr: "Cafetier", en: "Café worker" }, is_correct: true, points: 10 },
            { translations: { ar: "معلم", tn: "معلم", fr: "Enseignant", en: "Teacher" }, is_correct: true, points: 10 },
            { translations: { ar: "خباز", tn: "خباز", fr: "Boulanger", en: "Baker" }, is_correct: true, points: 10 },
            { translations: { ar: "رائد فضاء", tn: "رائد فضاء", fr: "Astronaute", en: "Astronaut" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 133,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنواع غلال (فواكه) تباع في الأسواق التونسية؟" },
            tn: { text: "أذكر 9 أنواع غلال تلقاها في تونس؟" },
            fr: { text: "Citez 9 fruits vendus en Tunisie ?" },
            en: { text: "Name 9 fruits you can buy in Tunisia" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "دلاع", tn: "دلاع", fr: "Pastèque (Dellaâ)", en: "Watermelon (Dellaa)" }, is_correct: true, points: 10 },
            { translations: { ar: "دقلة", tn: "دقلة", fr: "Dattes (Degla)", en: "Dates (Degla)" }, is_correct: true, points: 10 },
            { translations: { ar: "كرموس", tn: "كرموس", fr: "Figues (Karmous)", en: "Figs (Karmous)" }, is_correct: true, points: 10 },
            { translations: { ar: "خوخ", tn: "خوخ", fr: "Pêche", en: "Peach" }, is_correct: true, points: 10 },
            { translations: { ar: "بنان", tn: "بنان", fr: "Banane", en: "Banana" }, is_correct: true, points: 10 },
            { translations: { ar: "تفاح", tn: "تفاح", fr: "Pomme", en: "Apple" }, is_correct: true, points: 10 },
            { translations: { ar: "برتقال", tn: "برتقال", fr: "Orange", en: "Orange" }, is_correct: true, points: 10 },
            { translations: { ar: "قارص", tn: "قارص", fr: "Citron", en: "Lemon (Qars)" }, is_correct: true, points: 10 },
            { translations: { ar: "رمان", tn: "رمان", fr: "Grenade", en: "Pomegranate" }, is_correct: true, points: 10 },
            { translations: { ar: "بطاطا", tn: "بطاطا", fr: "Pomme de terre", en: "Potato" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 134,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنواع خضار تُستعمل في المطبخ التونسي؟" },
            tn: { text: "أذكر 9 خضر نطيبو بيها في تونس؟" },
            fr: { text: "Citez 9 légumes phares de la cuisine tunisienne ?" },
            en: { text: "Name 9 vegetables used in Tunisian cooking" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "طماطم", tn: "طماطم", fr: "Tomate", en: "Tomato" }, is_correct: true, points: 10 },
            { translations: { ar: "فلفل", tn: "فلفل", fr: "Piment", en: "Chili pepper" }, is_correct: true, points: 10 },
            { translations: { ar: "بصل", tn: "بصل", fr: "Oignon", en: "Onion" }, is_correct: true, points: 10 },
            { translations: { ar: "ثوم", tn: "ثوم", fr: "Ail", en: "Garlic" }, is_correct: true, points: 10 },
            { translations: { ar: "بطاطا", tn: "بطاطا", fr: "Pomme de terre", en: "Potato" }, is_correct: true, points: 10 },
            { translations: { ar: "سنارية", tn: "سنارية", fr: "Carotte", en: "Carrot" }, is_correct: true, points: 10 },
            { translations: { ar: "لفت", tn: "لفت", fr: "Navet", en: "Turnip" }, is_correct: true, points: 10 },
            { translations: { ar: "قرع", tn: "قرع", fr: "Citrouille / Potiron", en: "Pumpkin" }, is_correct: true, points: 10 },
            { translations: { ar: "بسباس", tn: "بسباس", fr: "Fenouil", en: "Fennel" }, is_correct: true, points: 10 },
            { translations: { ar: "تفاح", tn: "تفاح", fr: "Pomme", en: "Apple" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 135,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تجدها في غرفة المعيشة؟" },
            tn: { text: "أذكر 9 حاجات في بيت القعاد / الصالة؟" },
            fr: { text: "Citez 9 choses que l'on trouve dans un salon ?" },
            en: { text: "Name 9 things found in a living room" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "تلفزة", tn: "تلفزة", fr: "Télévision", en: "Television" }, is_correct: true, points: 10 },
            { translations: { ar: "كانابي", tn: "كانابي", fr: "Canapé", en: "Sofa / Couch" }, is_correct: true, points: 10 },
            { translations: { ar: "زربية", tn: "زربية", fr: "Tapis", en: "Carpet / Rug" }, is_correct: true, points: 10 },
            { translations: { ar: "طاولة", tn: "طاولة", fr: "Table basse", en: "Coffee table" }, is_correct: true, points: 10 },
            { translations: { ar: "ريدو", tn: "ريدو", fr: "Rideau", en: "Curtain" }, is_correct: true, points: 10 },
            { translations: { ar: "كواسان", tn: "كواسان", fr: "Coussin", en: "Cushion" }, is_correct: true, points: 10 },
            { translations: { ar: "بوف", tn: "بوف", fr: "Pouf", en: "Pouffe" }, is_correct: true, points: 10 },
            { translations: { ar: "لوحة", tn: "لوحة", fr: "Tableau / Peinture", en: "Painting" }, is_correct: true, points: 10 },
            { translations: { ar: "كومود", tn: "كومود", fr: "Commode", en: "Cabinet / Chest" }, is_correct: true, points: 10 },
            { translations: { ar: "دوش", tn: "دوش", fr: "Douche", en: "Shower cabin" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 136,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء أساسية تأخذها معك في السفر؟" },
            tn: { text: "أذكر 9 حاجات تهزها معاك في السفر؟" },
            fr: { text: "Citez 9 objets indispensables pour voyager ?" },
            en: { text: "Name 9 things you take on a trip" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "باسبور", tn: "باسبور", fr: "Passeport", en: "Passport" }, is_correct: true, points: 10 },
            { translations: { ar: "فاليز", tn: "فاليز", fr: "Valise / Bagage", en: "Suitcase" }, is_correct: true, points: 10 },
            { translations: { ar: "فلوس", tn: "فلوس", fr: "Argent", en: "Money" }, is_correct: true, points: 10 },
            { translations: { ar: "شارجور تليفون", tn: "شارجور تليفون", fr: "Chargeur téléphone", en: "Phone charger" }, is_correct: true, points: 10 },
            { translations: { ar: "حوايج", tn: "حوايج", fr: "Vêtements", en: "Clothes" }, is_correct: true, points: 10 },
            { translations: { ar: "صباط", tn: "صباط", fr: "Chaussures", en: "Shoes" }, is_correct: true, points: 10 },
            { translations: { ar: "دوايات", tn: "دوايات", fr: "Médicaments", en: "Medicines" }, is_correct: true, points: 10 },
            { translations: { ar: "مرايات شمس", tn: "مرايات شمس", fr: "Lunettes de soleil", en: "Sunglasses" }, is_correct: true, points: 10 },
            { translations: { ar: "بورتفوي", tn: "بورتفوي", fr: "Portefeuille", en: "Wallet" }, is_correct: true, points: 10 },
            { translations: { ar: "تلفزيون كبير", tn: "تلفزيون كبير", fr: "Grande télé", en: "Big television" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 137,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء ترتبط بفصل الشتاء؟" },
            tn: { text: "أذكر 9 حاجات تفكرنا بالشتوية؟" },
            fr: { text: "Citez 9 choses associées à l'hiver ?" },
            en: { text: "Name 9 things associated with winter" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "مطر", tn: "مطر", fr: "Pluie", en: "Rain" }, is_correct: true, points: 10 },
            { translations: { ar: "رعد", tn: "رعد", fr: "Tonnerre", en: "Thunder" }, is_correct: true, points: 10 },
            { translations: { ar: "كبوط", tn: "كبوط", fr: "Manteau", en: "Coat / Jacket" }, is_correct: true, points: 10 },
            { translations: { ar: "كشكول", tn: "كشكول", fr: "Écharpe (Kachkol)", en: "Scarf (Kashkol)" }, is_correct: true, points: 10 },
            { translations: { ar: "كانون", tn: "كانون", fr: "Kanoun (brasero)", en: "Kanoun firepot" }, is_correct: true, points: 10 },
            { translations: { ar: "شوربة دافية", tn: "شوربة دافية", fr: "Soupe chaude", en: "Warm soup" }, is_correct: true, points: 10 },
            { translations: { ar: "ريح", tn: "ريح", fr: "Vent", en: "Wind" }, is_correct: true, points: 10 },
            { translations: { ar: "مظلة", tn: "مظلة", fr: "Parapluie", en: "Umbrella" }, is_correct: true, points: 10 },
            { translations: { ar: "برق", tn: "برق", fr: "Éclair", en: "Lightning" }, is_correct: true, points: 10 },
            { translations: { ar: "شلاكة صيف", tn: "شلاكة صيف", fr: "Tongs d'été", en: "Summer flip-flops" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 138,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أدوات يستعملها البناي (العامل) في البناء؟" },
            tn: { text: "أذكر 9 أدوات يستعملها البناي؟" },
            fr: { text: "Citez 9 outils de maçon ?" },
            en: { text: "Name 9 tools used by a builder" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "مسطرين", tn: "مسطرين", fr: "Truelle (Mastarain)", en: "Trowel (Mastarain)" }, is_correct: true, points: 10 },
            { translations: { ar: "شاقول", tn: "شاقول", fr: "Fil à plomb (Chaqoul)", en: "Plumb bob (Shaqool)" }, is_correct: true, points: 10 },
            { translations: { ar: "بالة", tn: "بالة", fr: "Pelle (Bala)", en: "Shovel (Bala)" }, is_correct: true, points: 10 },
            { translations: { ar: "برويطة", tn: "برويطة", fr: "Brouette", en: "Wheelbarrow (Brouette)" }, is_correct: true, points: 10 },
            { translations: { ar: "ميزان ماء", tn: "ميزان ماء", fr: "Niveau à bulle", en: "Spirit level" }, is_correct: true, points: 10 },
            { translations: { ar: "مطرقة", tn: "مطرقة", fr: "Marteau", en: "Hammer" }, is_correct: true, points: 10 },
            { translations: { ar: "سطل", tn: "سطل", fr: "Seau", en: "Bucket (Satl)" }, is_correct: true, points: 10 },
            { translations: { ar: "بورتشيني", tn: "بورتشيني", fr: "Burin (Portchini)", en: "Chisel (Portchini)" }, is_correct: true, points: 10 },
            { translations: { ar: "سيزو", tn: "سيزو", fr: "Ciseaux / Pince", en: "Cutter / Scissors" }, is_correct: true, points: 10 },
            { translations: { ar: "إبرة خياطة", tn: "إبرة خياطة", fr: "Aiguille à coudre", en: "Sewing needle" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 139,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنواع من الحوائج (الملابس) اليومية؟" },
            tn: { text: "أذكر 9 حوايج نلبسوها؟" },
            fr: { text: "Citez 9 types de vêtements ?" },
            en: { text: "Name 9 items of clothing" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "سروال", tn: "سروال", fr: "Pantalon", en: "Pants / Trousers" }, is_correct: true, points: 10 },
            { translations: { ar: "سورية", tn: "سورية", fr: "Chemise", en: "Shirt" }, is_correct: true, points: 10 },
            { translations: { ar: "مريول", tn: "مريول", fr: "T-shirt", en: "T-shirt (Meryoul)" }, is_correct: true, points: 10 },
            { translations: { ar: "كبوط", tn: "كبوط", fr: "Manteau / Veste", en: "Coat / Jacket" }, is_correct: true, points: 10 },
            { translations: { ar: "فيستة", tn: "فيستة", fr: "Veste / Blazer", en: "Blazer / Jacket" }, is_correct: true, points: 10 },
            { translations: { ar: "صباط", tn: "صباط", fr: "Chaussures", en: "Shoes" }, is_correct: true, points: 10 },
            { translations: { ar: "سبيدري", tn: "سبيدري", fr: "Baskets (Spadri)", en: "Sneakers (Spadri)" }, is_correct: true, points: 10 },
            { translations: { ar: "شلاكة", tn: "شلاكة", fr: "Tongs", en: "Flip-flops" }, is_correct: true, points: 10 },
            { translations: { ar: "جوارب", tn: "جوارب", fr: "Chaussettes", en: "Socks (Jwareb)" }, is_correct: true, points: 10 },
            { translations: { ar: "مخدة", tn: "مخدة", fr: "Oreiller", en: "Pillow" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 140,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تجدها في قاعة انتظار الطبيب؟" },
            tn: { text: "أذكر 9 حاجات في بيت الانتظار تع الميدسان؟" },
            fr: { text: "Citez 9 choses dans la salle d'attente d'un médecin ?" },
            en: { text: "Name 9 things you find in a doctor's waiting room" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "كراسي", tn: "كراسي", fr: "Chaises", en: "Chairs" }, is_correct: true, points: 10 },
            { translations: { ar: "مجلات", tn: "مجلات", fr: "Magazines", en: "Magazines" }, is_correct: true, points: 10 },
            { translations: { ar: "تليفزيون", tn: "تليفزيون", fr: "Télévision", en: "Television" }, is_correct: true, points: 10 },
            { translations: { ar: "سيكريتيرة", tn: "سيكريتيرة", fr: "Secrétaire", en: "Secretary" }, is_correct: true, points: 10 },
            { translations: { ar: "نباتات زينة", tn: "نباتات زينة", fr: "Plantes vertes", en: "Decorative plants" }, is_correct: true, points: 10 },
            { translations: { ar: "موزع ماء", tn: "موزع ماء", fr: "Distributeur d'eau", en: "Water dispenser" }, is_correct: true, points: 10 },
            { translations: { ar: "لافتة", tn: "لافتة", fr: "Affiche / Signalisation", en: "Sign / Poster" }, is_correct: true, points: 10 },
            { translations: { ar: "ملفات طبية", tn: "ملفات طبية", fr: "Dossiers médicaux", en: "Medical records" }, is_correct: true, points: 10 },
            { translations: { ar: "شارجور", tn: "شارجور", fr: "Chargeur", en: "Phone charger" }, is_correct: true, points: 10 },
            { translations: { ar: "سرير نوم", tn: "سرير نوم", fr: "Lit de chambre", en: "Bed" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 141,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء لونها أخضر؟" },
            tn: { text: "أذكر 9 حاجات لونها أخضر؟" },
            fr: { text: "Citez 9 choses qui sont généralement vertes ?" },
            en: { text: "Name 9 things that are usually green" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "حشيش", tn: "حشيش", fr: "Herbe", en: "Grass" }, is_correct: true, points: 10 },
            { translations: { ar: "شجر", tn: "شجر", fr: "Arbre", en: "Tree" }, is_correct: true, points: 10 },
            { translations: { ar: "نعناع", tn: "نعناع", fr: "Menthe", en: "Mint" }, is_correct: true, points: 10 },
            { translations: { ar: "سلق", tn: "سلق", fr: "Blettes (Salq)", en: "Chard (Salq)" }, is_correct: true, points: 10 },
            { translations: { ar: "فلفل أخضر", tn: "فلفل أخضر", fr: "Piment vert", en: "Green pepper" }, is_correct: true, points: 10 },
            { translations: { ar: "خيار", tn: "خيار", fr: "Concombre", en: "Cucumber" }, is_correct: true, points: 10 },
            { translations: { ar: "جلبانة", tn: "جلبانة", fr: "Petits pois", en: "Peas (Jilbana)" }, is_correct: true, points: 10 },
            { translations: { ar: "معدنوس", tn: "معدنوس", fr: "Persil", en: "Parsley (Madnous)" }, is_correct: true, points: 10 },
            { translations: { ar: "زيتون أخضر", tn: "زيتون أخضر", fr: "Olives vertes", en: "Green olives" }, is_correct: true, points: 10 },
            { translations: { ar: "فحم", tn: "فحم", fr: "Charbon", en: "Coal" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 142,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 تحليات أو حلويات لذيذة؟" },
            tn: { text: "أذكر 9 أنواع حلو وحلويات؟" },
            fr: { text: "Citez 9 desserts ou douceurs sucrées ?" },
            en: { text: "Name 9 sweet treats or desserts" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "بقلاوة", tn: "بقلاوة", fr: "Baklawa", en: "Baklawa" }, is_correct: true, points: 10 },
            { translations: { ar: "كعك ورقة", tn: "كعك ورقة", fr: "Kaak Warka", en: "Kaak Warka" }, is_correct: true, points: 10 },
            { translations: { ar: "دبلة", tn: "دبلة", fr: "Debla", en: "Debla" }, is_correct: true, points: 10 },
            { translations: { ar: "زلابية", tn: "زلابية", fr: "Zlabia", en: "Zlabia" }, is_correct: true, points: 10 },
            { translations: { ar: "محلبية", tn: "محلبية", fr: "Mhalbiya", en: "Mhalbya" }, is_correct: true, points: 10 },
            { translations: { ar: "خبزة هواء", tn: "خبزة هواء", fr: "Khobzet Hwé (Gâteau biscuit)", en: "Khobzet Hwé" }, is_correct: true, points: 10 },
            { translations: { ar: "كريب", tn: "كريب", fr: "Crêpe", en: "Crêpe" }, is_correct: true, points: 10 },
            { translations: { ar: "مثلجات", tn: "مثلجات", fr: "Glace", en: "Ice cream (Glace)" }, is_correct: true, points: 10 },
            { translations: { ar: "تارت", tn: "تارت", fr: "Tarte aux fruits", en: "Fruit tart" }, is_correct: true, points: 10 },
            { translations: { ar: "هريسة حارة", tn: "هريسة حارة", fr: "Harissa piquante", en: "Hot Harissa" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 143,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مواد قابلة للذوبان أو الانصهار بالحرارة؟" },
            tn: { text: "أذكر 9 حاجات تذوب؟" },
            fr: { text: "Citez 9 choses qui fondent ?" },
            en: { text: "Name 9 things that melt" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "ثلج", tn: "ثلج", fr: "Glace / Neige", en: "Ice / Snow" }, is_correct: true, points: 10 },
            { translations: { ar: "زبدة", tn: "زبدة", fr: "Beurre", en: "Butter" }, is_correct: true, points: 10 },
            { translations: { ar: "جبن", tn: "جبن", fr: "Fromage", en: "Cheese" }, is_correct: true, points: 10 },
            { translations: { ar: "شوكلاطة", tn: "شوكلاطة", fr: "Chocolat", en: "Chocolate" }, is_correct: true, points: 10 },
            { translations: { ar: "شمع", tn: "شمع", fr: "Cire", en: "Wax / Candle" }, is_correct: true, points: 10 },
            { translations: { ar: "كلاص", tn: "كلاص", fr: "Glace (dessert)", en: "Ice cream" }, is_correct: true, points: 10 },
            { translations: { ar: "بلاستيك", tn: "بلاستيك", fr: "Plastique", en: "Plastic" }, is_correct: true, points: 10 },
            { translations: { ar: "شحم", tn: "شحم", fr: "Graisse", en: "Fat" }, is_correct: true, points: 10 },
            { translations: { ar: "ملح", tn: "ملح", fr: "Sel", en: "Salt (in water)" }, is_correct: true, points: 10 },
            { translations: { ar: "حجر", tn: "حجر", fr: "Pierre", en: "Stone" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 144,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 فرق كرة قدم تنشط في الدوري التونسي؟" },
            tn: { text: "أذكر 9 جمعيات كورة في تونس؟" },
            fr: { text: "Citez 9 équipes de football tunisiennes ?" },
            en: { text: "Name 9 Tunisian football teams" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "الترجي", tn: "الترجي", fr: "Espérance de Tunis", en: "Esperance (EST)" }, is_correct: true, points: 10 },
            { translations: { ar: "الإفريقي", tn: "الإفريقي", fr: "Club Africain", en: "Club Africain (CA)" }, is_correct: true, points: 10 },
            { translations: { ar: "النجم الساحلي", tn: "النجم الساحلي", fr: "Étoile du Sahel", en: "Etoile du Sahel (ESS)" }, is_correct: true, points: 10 },
            { translations: { ar: "النادي الصفاقسي", tn: "النادي الصفاقسي", fr: "Club Sfaxien", en: "Club Sfaxien (CSS)" }, is_correct: true, points: 10 },
            { translations: { ar: "الملعب التونسي", tn: "الملعب التونسي", fr: "Stade Tunisien", en: "Stade Tunisien (ST)" }, is_correct: true, points: 10 },
            { translations: { ar: "الاتحاد المنستيري", tn: "الاتحاد المنستيري", fr: "US Monastirienne", en: "US Monastir (USM)" }, is_correct: true, points: 10 },
            { translations: { ar: "النادي البنزرتي", tn: "النادي البنزرتي", fr: "Club Athlétique Bizertin", en: "CA Bizertin (CAB)" }, is_correct: true, points: 10 },
            { translations: { ar: "مستقبل المرسى", tn: "مستقبل المرسى", fr: "Avenir de la Marsa", en: "AS Marsa (ASM)" }, is_correct: true, points: 10 },
            { translations: { ar: "الأولمبي الباجي", tn: "الأولمبي الباجي", fr: "Olympique de Béja", en: "Olympique Beja (OB)" }, is_correct: true, points: 10 },
            { translations: { ar: "ريال مدريد", tn: "ريال مدريد", fr: "Real Madrid", en: "Real Madrid" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 145,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كائنات أو أشياء تتحرك بسرعة فائقة؟" },
            tn: { text: "أذكر 9 حاجات تجري فيسع؟" },
            fr: { text: "Citez 9 choses qui sont rapides ?" },
            en: { text: "Name 9 things that are fast" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "طيارة", tn: "طيارة", fr: "Avion", en: "Airplane" }, is_correct: true, points: 10 },
            { translations: { ar: "فهد", tn: "فهد", fr: "Guépard", en: "Cheetah" }, is_correct: true, points: 10 },
            { translations: { ar: "كرهبة سباق", tn: "كرهبة سباق", fr: "Voiture de course", en: "Racing car" }, is_correct: true, points: 10 },
            { translations: { ar: "صاروخ", tn: "صاروخ", fr: "Fusée", en: "Rocket" }, is_correct: true, points: 10 },
            { translations: { ar: "قطار سريع", tn: "قطار سريع", fr: "Train à grande vitesse", en: "Fast train (TGV)" }, is_correct: true, points: 10 },
            { translations: { ar: "ضوء", tn: "ضوء", fr: "Lumière", en: "Light" }, is_correct: true, points: 10 },
            { translations: { ar: "رصاصة", tn: "رصاصة", fr: "Balle", en: "Bullet" }, is_correct: true, points: 10 },
            { translations: { ar: "حصان", tn: "حصان", fr: "Cheval", en: "Horse" }, is_correct: true, points: 10 },
            { translations: { ar: "ريح", tn: "ريح", fr: "Vent", en: "Wind / Storm" }, is_correct: true, points: 10 },
            { translations: { ar: "فكرون", tn: "فكرون", fr: "Tortue", en: "Turtle (Fekroun)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 146,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مهن يرتدي أصحابها زياً رسمياً موحداً؟" },
            tn: { text: "أذكر 9 مهن يلبسو فيها زي رسمي / يونيفورم؟" },
            fr: { text: "Citez 9 professions où l'on porte un uniforme ?" },
            en: { text: "Name 9 jobs that wear a uniform" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "بوليس", tn: "بوليس", fr: "Policier", en: "Police officer" }, is_correct: true, points: 10 },
            { translations: { ar: "عسكري", tn: "عسكري", fr: "Militaire", en: "Soldier / Army" }, is_correct: true, points: 10 },
            { translations: { ar: "طبيب", tn: "طبيب", fr: "Médecin", en: "Doctor" }, is_correct: true, points: 10 },
            { translations: { ar: "بيلوت", tn: "بيلوت", fr: "Pilote d'avion", en: "Pilot" }, is_correct: true, points: 10 },
            { translations: { ar: "مضيفة طيران", tn: "مضيفة طيران", fr: "Hôtesse de l'air", en: "Flight attendant" }, is_correct: true, points: 10 },
            { translations: { ar: "حارس مرمى", tn: "حارس مرمى", fr: "Gardien de but", en: "Goalkeeper" }, is_correct: true, points: 10 },
            { translations: { ar: "حماية مدنية", tn: "حماية مدنية", fr: "Sapeur-pompier", en: "Firefighter" }, is_correct: true, points: 10 },
            { translations: { ar: "طباخ", tn: "طباخ", fr: "Cuisinier", en: "Chef / Cook" }, is_correct: true, points: 10 },
            { translations: { ar: "فرملي", tn: "فرملي", fr: "Infirmier", en: "Nurse" }, is_correct: true, points: 10 },
            { translations: { ar: "كاتب", tn: "كاتب", fr: "Écrivain", en: "Writer" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 147,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يجب ألا تنساها عند الخروج من البيت؟" },
            tn: { text: "أذكر 9 حاجات ما لازمش تنساها كي تخرج من الدار؟" },
            fr: { text: "Citez 9 choses à ne pas oublier en sortant de chez soi ?" },
            en: { text: "Name 9 things you shouldn't forget when leaving home" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "تليفون", tn: "تليفون", fr: "Téléphone", en: "Phone" }, is_correct: true, points: 10 },
            { translations: { ar: "مفاتيح", tn: "مفاتيح", fr: "Clés", en: "Keys" }, is_correct: true, points: 10 },
            { translations: { ar: "بورتفوي", tn: "بورتفوي", fr: "Portefeuille", en: "Wallet" }, is_correct: true, points: 10 },
            { translations: { ar: "فلوس", tn: "فلوس", fr: "Argent", en: "Money" }, is_correct: true, points: 10 },
            { translations: { ar: "كمامة", tn: "كمامة", fr: "Masque", en: "Mask / Face mask" }, is_correct: true, points: 10 },
            { translations: { ar: "مرايات", tn: "مرايات", fr: "Lunettes", en: "Sunglasses / Glasses" }, is_correct: true, points: 10 },
            { translations: { ar: "باسبور", tn: "باسبور", fr: "Passeport / Carte ID", en: "Passport / ID" }, is_correct: true, points: 10 },
            { translations: { ar: "دواء", tn: "دواء", fr: "Médicaments", en: "Medicine" }, is_correct: true, points: 10 },
            { translations: { ar: "شارجور", tn: "شارجور", fr: "Chargeur", en: "Charger" }, is_correct: true, points: 10 },
            { translations: { ar: "كوجينة", tn: "كوجينة", fr: "Cuisine", en: "Kitchen" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 148,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تجدها في الفصل الدراسي (القسم)؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في قسم القراية؟" },
            fr: { text: "Citez 9 choses que l'on trouve dans une classe ?" },
            en: { text: "Name 9 things found in a classroom" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "سبورة", tn: "سبورة", fr: "Tableau", en: "Blackboard" }, is_correct: true, points: 10 },
            { translations: { ar: "طاوله", tn: "طاولة", fr: "Table", en: "Table" }, is_correct: true, points: 10 },
            { translations: { ar: "كرسي", tn: "كرسي", fr: "Chaise", en: "Chair" }, is_correct: true, points: 10 },
            { translations: { ar: "طباشير", tn: "طباشير", fr: "Craie / Feutre", en: "Chalk / Marker" }, is_correct: true, points: 10 },
            { translations: { ar: "كراس", tn: "كراس", fr: "Cahier", en: "Notebook" }, is_correct: true, points: 10 },
            { translations: { ar: "ستيلو", tn: "ستيلو", fr: "Stylo", en: "Pen / Pencil" }, is_correct: true, points: 10 },
            { translations: { ar: "محفظة", tn: "محفظة", fr: "Cartable", en: "Schoolbag" }, is_correct: true, points: 10 },
            { translations: { ar: "مسطرة", tn: "مسطرة", fr: "Règle", en: "Ruler" }, is_correct: true, points: 10 },
            { translations: { ar: "مكتب المعلم", tn: "مكتب المعلم", fr: "Bureau du maître", en: "Teacher desk" }, is_correct: true, points: 10 },
            { translations: { ar: "دوش", tn: "دوش", fr: "Douche", en: "Shower head" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 149,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 حيوانات تعيش في الماء؟" },
            tn: { text: "أذكر 9 حيوانات تعيش في الماء؟" },
            fr: { text: "Citez 9 animaux qui vivent dans l'eau ?" },
            en: { text: "Name 9 animals that live in water" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "حوت", tn: "حوت", fr: "Poisson", en: "Fish" }, is_correct: true, points: 10 },
            { translations: { ar: "دلفين", tn: "دلفين", fr: "Dauphin", en: "Dolphin" }, is_correct: true, points: 10 },
            { translations: { ar: "قرش", tn: "قرش", fr: "Requin", en: "Shark" }, is_correct: true, points: 10 },
            { translations: { ar: "سلحفاة بحرية", tn: "سلحفاة بحرية", fr: "Tortue de mer", en: "Sea turtle" }, is_correct: true, points: 10 },
            { translations: { ar: "أخطبوط", tn: "أخطبوط", fr: "Poulpe / Pieuvre", en: "Octopus" }, is_correct: true, points: 10 },
            { translations: { ar: "قنديل البحر", tn: "قنديل البحر", fr: "Méduse", en: "Jellyfish" }, is_correct: true, points: 10 },
            { translations: { ar: "سرطان البحر", tn: "سرطان البحر", fr: "Crabe", en: "Crab" }, is_correct: true, points: 10 },
            { translations: { ar: "فقمة", tn: "فقمة", fr: "Phoque", en: "Seal" }, is_correct: true, points: 10 },
            { translations: { ar: "سبيدج", tn: "سبيدج", fr: "Calamar", en: "Squid" }, is_correct: true, points: 10 },
            { translations: { ar: "أسد", tn: "أسد", fr: "Lion", en: "Lion" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 150,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء ترتبط بعيد الميلاد؟" },
            tn: { text: "أذكر 9 حاجات مربوطة بعيد الميلاد؟" },
            fr: { text: "Citez 9 choses associées aux anniversaires ?" },
            en: { text: "Name 9 things associated with birthdays" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "خبزة قاتو", tn: "خبزة قاتو", fr: "Gâteau", en: "Cake" }, is_correct: true, points: 10 },
            { translations: { ar: "شمع", tn: "شمع", fr: "Bougies", en: "Candles" }, is_correct: true, points: 10 },
            { translations: { ar: "كادو", tn: "كادو", fr: "Cadeaux", en: "Gifts / Presents" }, is_correct: true, points: 10 },
            { translations: { ar: "سهرية", tn: "سهرية", fr: "Fête", en: "Party" }, is_correct: true, points: 10 },
            { translations: { ar: "غناء", tn: "غناء", fr: "Chansons", en: "Singing" }, is_correct: true, points: 10 },
            { translations: { ar: "بالونات", tn: "بالونات", fr: "Ballons", en: "Balloons" }, is_correct: true, points: 10 },
            { translations: { ar: "عائلة", tn: "عائلة", fr: "Famille", en: "Family" }, is_correct: true, points: 10 },
            { translations: { ar: "صحاب", tn: "صحاب", fr: "Amis", en: "Friends" }, is_correct: true, points: 10 },
            { translations: { ar: "تصاور", tn: "تصاور", fr: "Photos", en: "Photos" }, is_correct: true, points: 10 },
            { translations: { ar: "كفن", tn: "كفن", fr: "Cercueil", en: "Coffin / Shroud" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 151,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 سوائل يمكن للإنسان شربها؟" },
            tn: { text: "أذكر 9 سوائل تنجم تشربها؟" },
            fr: { text: "Citez 9 liquides que l'on peut boire ?" },
            en: { text: "Name 9 liquids you can drink" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "ماء", tn: "ماء", fr: "Eau", en: "Water" }, is_correct: true, points: 10 },
            { translations: { ar: "حليب", tn: "حليب", fr: "Lait", en: "Milk" }, is_correct: true, points: 10 },
            { translations: { ar: "عصير", tn: "عصير", fr: "Jus", en: "Juice" }, is_correct: true, points: 10 },
            { translations: { ar: "قهوة", tn: "قهوة", fr: "Café", en: "Coffee" }, is_correct: true, points: 10 },
            { translations: { ar: "تاي", tn: "تاي", fr: "Thé", en: "Tea" }, is_correct: true, points: 10 },
            { translations: { ar: "كابوسان", tn: "كابوسان", fr: "Capucin", en: "Capucin" }, is_correct: true, points: 10 },
            { translations: { ar: "قازوز", tn: "قازوز", fr: "Soda", en: "Soda / Fizzy drink" }, is_correct: true, points: 10 },
            { translations: { ar: "ليموناضة", tn: "ليموناضة", fr: "Limonade", en: "Lemonade" }, is_correct: true, points: 10 },
            { translations: { ar: "لبن", tn: "لبن", fr: "Laban / Babeurre", en: "Laban" }, is_correct: true, points: 10 },
            { translations: { ar: "زيت كراهب", tn: "زيت كراهب", fr: "Huile moteur", en: "Car engine oil" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 152,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تفعلها عادة قبل النوم؟" },
            tn: { text: "أذكر 9 حاجات تعملها قبل ما ترقد؟" },
            fr: { text: "Citez 9 actions que l'on fait avant de dormir ?" },
            en: { text: "Name 9 things you do before sleeping" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "تغسل سنيك", tn: "تغسل سنيك", fr: "Se brosser les dents", en: "Brush teeth" }, is_correct: true, points: 10 },
            { translations: { ar: "تطفي الضوء", tn: "تطفي الضوء", fr: "Éteindre la lumière", en: "Turn off light" }, is_correct: true, points: 10 },
            { translations: { ar: "تسكر الباب", tn: "تسكر الباب", fr: "Fermer la porte", en: "Lock the door" }, is_correct: true, points: 10 },
            { translations: { ar: "تلبس بيجامة", tn: "تلبس بيجامة", fr: "Mettre son pyjama", en: "Wear pajamas" }, is_correct: true, points: 10 },
            { translations: { ar: "تقرأ كتاب", tn: "تقرأ كتاب", fr: "Lire un livre", en: "Read a book" }, is_correct: true, points: 10 },
            { translations: { ar: "تشوف التليفون", tn: "تشوف التليفون", fr: "Regarder son téléphone", en: "Look at phone" }, is_correct: true, points: 10 },
            { translations: { ar: "تتغطى", tn: "تتغطى", fr: "Se couvrir", en: "Cover yourself" }, is_correct: true, points: 10 },
            { translations: { ar: "تضبط المنبه", tn: "تضبط المنبه", fr: "Régler l'alarme", en: "Set alarm" }, is_correct: true, points: 10 },
            { translations: { ar: "تتوضى", tn: "تتوضى", fr: "Faire ses ablutions", en: "Ablution (Woudou)" }, is_correct: true, points: 10 },
            { translations: { ar: "تمشي للخدمة", tn: "تمشي للخدمة", fr: "Aller au travail", en: "Go to work" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 153,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء تراها عادة في الشارع؟" },
            tn: { text: "أذكر 9 حاجات تراها في الكياس / الشارع؟" },
            fr: { text: "Citez 9 éléments que l'on trouve dans une rue ?" },
            en: { text: "Name 9 things found on a street" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "كراهب", tn: "كراهب", fr: "Voitures", en: "Cars" }, is_correct: true, points: 10 },
            { translations: { ar: "طروطوار", tn: "طروطوار", fr: "Trottoir", en: "Pavement / Sidewalk" }, is_correct: true, points: 10 },
            { translations: { ar: "ضوء بلاك", tn: "ضوء بلاك", fr: "Feu de signalisation", en: "Traffic light" }, is_correct: true, points: 10 },
            { translations: { ar: "بوبيل", tn: "بوبيل", fr: "Poubelle", en: "Trash can" }, is_correct: true, points: 10 },
            { translations: { ar: "بوطو ضوء", tn: "بوطو ضوء", fr: "Poteau électrique", en: "Streetlight pole" }, is_correct: true, points: 10 },
            { translations: { ar: "ناس تدور", tn: "ناس تدور", fr: "Passants", en: "Pedestrians" }, is_correct: true, points: 10 },
            { translations: { ar: "حوانت", tn: "حوانت", fr: "Magasins / Boutiques", en: "Shops" }, is_correct: true, points: 10 },
            { translations: { ar: "شجر", tn: "شجر", fr: "Arbres", en: "Trees" }, is_correct: true, points: 10 },
            { translations: { ar: "بلاكات مرور", tn: "بلاكات مرور", fr: "Panneaux routiers", en: "Traffic signs" }, is_correct: true, points: 10 },
            { translations: { ar: "سرير نوم", tn: "سرير نوم", fr: "Lit de chambre", en: "Sleeping bed" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 154,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء توجد في الحديقة (الجنينة)؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في الجنينة؟" },
            fr: { text: "Citez 9 éléments que l'on trouve dans un jardin ?" },
            en: { text: "Name 9 things you can find in a garden" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "ورد", tn: "ورد", fr: "Fleurs", en: "Flowers" }, is_correct: true, points: 10 },
            { translations: { ar: "شجر", tn: "شجر", fr: "Arbres", en: "Trees" }, is_correct: true, points: 10 },
            { translations: { ar: "حشيش", tn: "حشيش", fr: "Gazon", en: "Grass" }, is_correct: true, points: 10 },
            { translations: { ar: "تراب", tn: "تراب", fr: "Terre / Sol", en: "Soil / Earth" }, is_correct: true, points: 10 },
            { translations: { ar: "ماء", tn: "ماء", fr: "Eau", en: "Water" }, is_correct: true, points: 10 },
            { translations: { ar: "قطوس", tn: "قطوس", fr: "Chat", en: "Cat" }, is_correct: true, points: 10 },
            { translations: { ar: "محبس", tn: "محبس", fr: "Pot de fleurs", en: "Flower pot" }, is_correct: true, points: 10 },
            { translations: { ar: "كرسي جنينة", tn: "كرسي جنينة", fr: "Banc de jardin", en: "Garden bench" }, is_correct: true, points: 10 },
            { translations: { ar: "فراشة", tn: "فراشة", fr: "Papillon", en: "Butterfly" }, is_correct: true, points: 10 },
            { translations: { ar: "غسالة ماعون", tn: "غسالة ماعون", fr: "Lave-vaisselle", en: "Dishwasher" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 155,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء لونها أصفر؟" },
            tn: { text: "أذكر 9 حاجات لونها أصفر؟" },
            fr: { text: "Citez 9 choses qui sont jaunes ?" },
            en: { text: "Name 9 things that are yellow" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "بنان", tn: "بنان", fr: "Banane", en: "Banana" }, is_correct: true, points: 10 },
            { translations: { ar: "قارص", tn: "قارص", fr: "Citron", en: "Lemon" }, is_correct: true, points: 10 },
            { translations: { ar: "شمس", tn: "شمس", fr: "Soleil", en: "Sun" }, is_correct: true, points: 10 },
            { translations: { ar: "ذهب", tn: "ذهب", fr: "Or", en: "Gold" }, is_correct: true, points: 10 },
            { translations: { ar: "صفار البيض", tn: "صفار البيض", fr: "Jaune d'oeuf", en: "Egg yolk" }, is_correct: true, points: 10 },
            { translations: { ar: "تاكسي", tn: "تاكسي", fr: "Taxi", en: "Taxi" }, is_correct: true, points: 10 },
            { translations: { ar: "خردل", tn: "خردل", fr: "Moutarde", en: "Mustard" }, is_correct: true, points: 10 },
            { translations: { ar: "هلال ونجم", tn: "هلال ونجم", fr: "Croissant / Étoile", en: "Crescent / Star" }, is_correct: true, points: 10 },
            { translations: { ar: "رمل الصحراء", tn: "رمل الصحراء", fr: "Sable du désert", en: "Desert sand" }, is_correct: true, points: 10 },
            { translations: { ar: "باذنجان", tn: "باذنجان", fr: "Aubergine", en: "Eggplant" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 156,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء أو أدوات يمكن الكتابة بها؟" },
            tn: { text: "أذكر 9 حاجات تكتب بيها؟" },
            fr: { text: "Citez 9 objets avec lesquels on peut écrire ?" },
            en: { text: "Name 9 things you can write with" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "ستيلو", tn: "ستيلو", fr: "Stylo", en: "Pen" }, is_correct: true, points: 10 },
            { translations: { ar: "قلم رصاص", tn: "قلم رصاص", fr: "Crayon", en: "Pencil" }, is_correct: true, points: 10 },
            { translations: { ar: "طباشير", tn: "طباشير", fr: "Craie", en: "Chalk" }, is_correct: true, points: 10 },
            { translations: { ar: "ريشة", tn: "ريشة", fr: "Plume", en: "Feather / Quill" }, is_correct: true, points: 10 },
            { translations: { ar: "فتر", tn: "فتر", fr: "Feutre", en: "Marker" }, is_correct: true, points: 10 },
            { translations: { ar: "قلم حبر", tn: "قلم حبر", fr: "Stylo plume", en: "Fountain pen" }, is_correct: true, points: 10 },
            { translations: { ar: "لوحة تابلت", tn: "لوحة تابلت", fr: "Stylet", en: "Tablet stylus" }, is_correct: true, points: 10 },
            { translations: { ar: "كيبورد", tn: "كيبورد", fr: "Clavier", en: "Keyboard" }, is_correct: true, points: 10 },
            { translations: { ar: "صبعك عالرمل", tn: "صبعك عالرمل", fr: "Doigt sur sable", en: "Finger (on sand)" }, is_correct: true, points: 10 },
            { translations: { ar: "مسطرة", tn: "مسطرة", fr: "Règle", en: "Ruler" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 157,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 وسائل أو أشياء تسير على عجلات؟" },
            tn: { text: "أذكر 9 حاجات فيها عجلات؟" },
            fr: { text: "Citez 9 choses qui ont des roues ?" },
            en: { text: "Name 9 things that have wheels" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "كرهبة", tn: "كرهبة", fr: "Voiture", en: "Car" }, is_correct: true, points: 10 },
            { translations: { ar: "بسكليت", tn: "بسكليت", fr: "Vélo", en: "Bicycle" }, is_correct: true, points: 10 },
            { translations: { ar: "موتور", tn: "موتور", fr: "Moto", en: "Motorcycle" }, is_correct: true, points: 10 },
            { translations: { ar: "كاميون", tn: "كاميون", fr: "Camion", en: "Truck" }, is_correct: true, points: 10 },
            { translations: { ar: "كران", tn: "كران", fr: "Autobus", en: "Bus (Car)" }, is_correct: true, points: 10 },
            { translations: { ar: "قطار", tn: "قطار", fr: "Train", en: "Train" }, is_correct: true, points: 10 },
            { translations: { ar: "برويطة", tn: "برويطة", fr: "Brouette", en: "Wheelbarrow" }, is_correct: true, points: 10 },
            { translations: { ar: "كرسي متحرك", tn: "كرسي متحرك", fr: "Fauteuil roulant", en: "Wheelchair" }, is_correct: true, points: 10 },
            { translations: { ar: "زلاجة", tn: "زلاجة", fr: "Skateboard", en: "Skateboard / Roller" }, is_correct: true, points: 10 },
            { translations: { ar: "سفينة بحرية", tn: "سفينة بحرية", fr: "Navire de mer", en: "Sea Ship" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 158,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشغال منزلية يومية؟" },
            tn: { text: "أذكر 9 قضيات الدار / أشغال البيت؟" },
            fr: { text: "Citez 9 tâches ménagères courantes ?" },
            en: { text: "Name 9 household chores" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "مسح الغبرة", tn: "مسح الغبرة", fr: "Dépoussiérer", en: "Dusting" }, is_correct: true, points: 10 },
            { translations: { ar: "تسييق", tn: "تسييق", fr: "Laver le sol (Tasiq)", en: "Mopping (Tasiq)" }, is_correct: true, points: 10 },
            { translations: { ar: "غسيل ماعون", tn: "غسيل ماعون", fr: "Faire la vaisselle", en: "Washing dishes" }, is_correct: true, points: 10 },
            { translations: { ar: "غسيل حوايج", tn: "غسيل حوايج", fr: "Laver le linge", en: "Laundry" }, is_correct: true, points: 10 },
            { translations: { ar: "تطييب", tn: "تطييب", fr: "Cuisiner", en: "Cooking" }, is_correct: true, points: 10 },
            { translations: { ar: "لم البيت", tn: "لم البيت", fr: "Ranger la maison", en: "Cleaning rooms" }, is_correct: true, points: 10 },
            { translations: { ar: "تحديد الحوايج", tn: "تحديد الحوايج", fr: "Repasser", en: "Ironing" }, is_correct: true, points: 10 },
            { translations: { ar: "رمي البوبيل", tn: "رمي البوبيل", fr: "Sortir la poubelle", en: "Take out trash" }, is_correct: true, points: 10 },
            { translations: { ar: "تفريش السرير", tn: "تفريش السرير", fr: "Faire le lit", en: "Make the bed" }, is_correct: true, points: 10 },
            { translations: { ar: "نوم", tn: "نوم", fr: "Dormir", en: "Sleeping" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 159,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء أو أدوات يمكن فتحها؟" },
            tn: { text: "أذكر 9 حاجات تتحل؟" },
            fr: { text: "Citez 9 choses que l'on peut ouvrir ?" },
            en: { text: "Name 9 things that can be opened" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "باب", tn: "باب", fr: "Porte", en: "Door" }, is_correct: true, points: 10 },
            { translations: { ar: "شباك", tn: "شباك", fr: "Fenêtre", en: "Window" }, is_correct: true, points: 10 },
            { translations: { ar: "كتاب", tn: "كتاب", fr: "Livre", en: "Book" }, is_correct: true, points: 10 },
            { translations: { ar: "علبة", tn: "علبة", fr: "Boîte / Conserve", en: "Box / Can" }, is_correct: true, points: 10 },
            { translations: { ar: "كادو", tn: "كادو", fr: "Cadeau", en: "Gift / Present" }, is_correct: true, points: 10 },
            { translations: { ar: "تليفون", tn: "تليفون", fr: "Téléphone", en: "Phone" }, is_correct: true, points: 10 },
            { translations: { ar: "عين", tn: "عين", fr: "Œil", en: "Eye" }, is_correct: true, points: 10 },
            { translations: { ar: "بورتفوي", tn: "بورتفوي", fr: "Portefeuille", en: "Wallet" }, is_correct: true, points: 10 },
            { translations: { ar: "كرهبة", tn: "كرهبة", fr: "Voiture", en: "Car" }, is_correct: true, points: 10 },
            { translations: { ar: "حيط", tn: "حيط", fr: "Mur de béton", en: "Concrete Wall" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 160,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء يشتريها الأشخاص عبر الإنترنت؟" },
            tn: { text: "أذكر 9 حاجات يشروها الناس مالموقع / الانترنت؟" },
            fr: { text: "Citez 9 choses que l'on achète en ligne ?" },
            en: { text: "Name 9 things people buy online" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "حوايج", tn: "حوايج", fr: "Vêtements", en: "Clothes" }, is_correct: true, points: 10 },
            { translations: { ar: "صباط", tn: "صباط", fr: "Chaussures", en: "Shoes" }, is_correct: true, points: 10 },
            { translations: { ar: "تليفون", tn: "تليفون", fr: "Téléphone", en: "Phone" }, is_correct: true, points: 10 },
            { translations: { ar: "كتب", tn: "كتب", fr: "Livres", en: "Books" }, is_correct: true, points: 10 },
            { translations: { ar: "ماكلة", tn: "ماكلة", fr: "Nourriture / Repas", en: "Food / Meals" }, is_correct: true, points: 10 },
            { translations: { ar: "تذاكر", tn: "تذاكر", fr: "Billets", en: "Tickets" }, is_correct: true, points: 10 },
            { translations: { ar: "ألعاب", tn: "ألعاب", fr: "Jeux", en: "Games" }, is_correct: true, points: 10 },
            { translations: { ar: "إلكترونيات", tn: "إلكترونيات", fr: "Électronique", en: "Electronics" }, is_correct: true, points: 10 },
            { translations: { ar: "كادووات", tn: "كادووات", fr: "Cadeaux", en: "Gifts" }, is_correct: true, points: 10 },
            { translations: { ar: "شمس", tn: "شمس", fr: "Le soleil", en: "The Sun" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 161,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 شخصيات تاريخية تونسية بارزة؟" },
            tn: { text: "أذكر 9 شخصيات تاريخية تونسية معروفة؟" },
            fr: { text: "Citez 9 figures historiques de la Tunisie ?" },
            en: { text: "Name 9 historical figures of Tunisia" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "الحبيب بورقيبة", tn: "الحبيب بورقيبة", fr: "Habib Bourguiba", en: "Habib Bourguiba" }, is_correct: true, points: 10 },
            { translations: { ar: "حنبعل", tn: "حنبعل", fr: "Hannibal", en: "Hannibal" }, is_correct: true, points: 10 },
            { translations: { ar: "ابن خلدون", tn: "ابن خلدون", fr: "Ibn Khaldoun", en: "Ibn Khaldun" }, is_correct: true, points: 10 },
            { translations: { ar: "خير الدين باشا", tn: "خير الدين باشا", fr: "Khair ed-Din", en: "Kheireddine Pasha" }, is_correct: true, points: 10 },
            { translations: { ar: "عليسة", tn: "عليسة", fr: "Didon (Elissa)", en: "Alyssa (Dido)" }, is_correct: true, points: 10 },
            { translations: { ar: "أبو القاسم الشابي", tn: "أبو القاسم الشابي", fr: "Abou el Kacem Chebbi", en: "Abou el Kacem Chebbi" }, is_correct: true, points: 10 },
            { translations: { ar: "فرحات حشاد", tn: "فرحات حشاد", fr: "Farhat Hached", en: "Farhat Hached" }, is_correct: true, points: 10 },
            { translations: { ar: "حمودة باشا", tn: "حمودة باشا", fr: "Hammouda Pacha", en: "Hammouda Pasha" }, is_correct: true, points: 10 },
            { translations: { ar: "الكاهنة", tn: "الكاهنة", fr: "La Kahena", en: "Kahena" }, is_correct: true, points: 10 },
            { translations: { ar: "المهاتما غاندي", tn: "المهاتما غاندي", fr: "Mahatma Gandhi", en: "Mahatma Gandhi" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 162,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مدن كانت عواصم أو مراكز تاريخية كبرى في تونس؟" },
            tn: { text: "أذكر 9 مدن تاريخية أو عواصم قديمة في تونس؟" },
            fr: { text: "Citez 9 villes ayant été des capitales ou des centres historiques majeurs en Tunisie ?" },
            en: { text: "Name 9 cities that were capitals or major historical centers in Tunisia" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "قرطاج", tn: "قرطاج", fr: "Carthage", en: "Carthage" }, is_correct: true, points: 10 },
            { translations: { ar: "القيروان", tn: "القيروان", fr: "Kairouan", en: "Kairouan" }, is_correct: true, points: 10 },
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunis", en: "Tunis" }, is_correct: true, points: 10 },
            { translations: { ar: "المهدية", tn: "المهدية", fr: "Mahdia", en: "Mahdia" }, is_correct: true, points: 10 },
            { translations: { ar: "المنستير", tn: "المنستير", fr: "Monastir", en: "Monastir" }, is_correct: true, points: 10 },
            { translations: { ar: "سوسة", tn: "سوسة", fr: "Sousse", en: "Sousse" }, is_correct: true, points: 10 },
            { translations: { ar: "باجة", tn: "باجة", fr: "Béja", en: "Beja" }, is_correct: true, points: 10 },
            { translations: { ar: "الكاف", tn: "الكاف", fr: "Le Kef", en: "El Kef" }, is_correct: true, points: 10 },
            { translations: { ar: "صفاقس", tn: "صفاقس", fr: "Sfax", en: "Sfax" }, is_correct: true, points: 10 },
            { translations: { ar: "مراكش", tn: "مراكش", fr: "Marrakech", en: "Marrakesh" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 163,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 حضارات قديمة تركت معالم أثرية في تونس؟" },
            tn: { text: "أذكر 9 حضارات قديمة خلات أثر في تونس؟" },
            fr: { text: "Citez 9 civilisations antiques ayant laissé des ruines en Tunisie ?" },
            en: { text: "Name 9 ancient civilizations that left ruins in Tunisia" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "القرطاجية", tn: "القرطاجية", fr: "Carthaginoise", en: "Carthaginian" }, is_correct: true, points: 10 },
            { translations: { ar: "الرومانية", tn: "الرومانية", fr: "Romaine", en: "Roman" }, is_correct: true, points: 10 },
            { translations: { ar: "الفينيقية", tn: "الفينيقية", fr: "Phénicienne", en: "Phoenician" }, is_correct: true, points: 10 },
            { translations: { ar: "البيزنطية", tn: "البيزنطية", fr: "Byzantine", en: "Byzantine" }, is_correct: true, points: 10 },
            { translations: { ar: "الوندالية", tn: "الوندالية", fr: "Vandale", en: "Vandal" }, is_correct: true, points: 10 },
            { translations: { ar: "العربية الإسلامية", tn: "العربية الإسلامية", fr: "Arabo-musulmane", en: "Arab Islamic" }, is_correct: true, points: 10 },
            { translations: { ar: "الأغلبية", tn: "الأغلبية", fr: "Aghlabide", en: "Aghlabid" }, is_correct: true, points: 10 },
            { translations: { ar: "الفاطمية", tn: "الفاطمية", fr: "Fatimide", en: "Fatimid" }, is_correct: true, points: 10 },
            { translations: { ar: "الحفصية", tn: "الحفصية", fr: "Hafside", en: "Hafsid" }, is_correct: true, points: 10 },
            { translations: { ar: "حضارة المايا", tn: "حضارة المايا", fr: "Maya", en: "Mayan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 164,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء ترتبط بذكرى عيد الاستقلال التونسي؟" },
            tn: { text: "أذكر 9 حاجات مربوطة بعيد الاستقلال في تونس؟" },
            fr: { text: "Citez 9 choses associées à la fête de l'indépendance tunisienne ?" },
            en: { text: "Name 9 things associated with the Tunisian Independence Day" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "علم تونس", tn: "علم تونس", fr: "Drapeau tunisien", en: "Tunisian flag" }, is_correct: true, points: 10 },
            { translations: { ar: "الحبيب بورقيبة", tn: "الحبيب بورقيبة", fr: "Habib Bourguiba", en: "Habib Bourguiba" }, is_correct: true, points: 10 },
            { translations: { ar: "الخطاب الرئاسي", tn: "الخطاب الرئاسي", fr: "Discours présidentiel", en: "Presidential speech" }, is_correct: true, points: 10 },
            { translations: { ar: "عطلة رسمية", tn: "عطلة رسمية", fr: "Jour férié officiel", en: "Official holiday" }, is_correct: true, points: 10 },
            { translations: { ar: "الأناشيد الوطنية", tn: "الأناشيد الوطنية", fr: "Hymne national", en: "National anthems" }, is_correct: true, points: 10 },
            { translations: { ar: "الكشافة", tn: "الكشافة", fr: "Scouts", en: "Scouts" }, is_correct: true, points: 10 },
            { translations: { ar: "عروض عسكرية", tn: "عروض عسكرية", fr: "Défilés militaires", en: "Military parades" }, is_correct: true, points: 10 },
            { translations: { ar: "فرحات حشاد", tn: "فرحات حشاد", fr: "Farhat Hached", en: "Farhat Hached" }, is_correct: true, points: 10 },
            { translations: { ar: "وثيقة الاستقلال", tn: "وثيقة الاستقلال", fr: "Document d'indépendance", en: "Independence document" }, is_correct: true, points: 10 },
            { translations: { ar: "بابا نويل", tn: "بابا نويل", fr: "Père Noël", en: "Santa Claus" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 165,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 جزر تونسية؟" },
            tn: { text: "أذكر 9 جزر تونسية معروفة؟" },
            fr: { text: "Citez 9 îles tunisiennes ?" },
            en: { text: "Name 9 Tunisian islands" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "جربة", tn: "جربة", fr: "Djerba", en: "Djerba" }, is_correct: true, points: 10 },
            { translations: { ar: "قرقنة", tn: "قرقنة", fr: "Kerkennah", en: "Kerkennah" }, is_correct: true, points: 10 },
            { translations: { ar: "جالطة", tn: "جالطة", fr: "Galite", en: "Galite" }, is_correct: true, points: 10 },
            { translations: { ar: "زمبرة", tn: "زمبرة", fr: "Zembra", en: "Zembra" }, is_correct: true, points: 10 },
            { translations: { ar: "زمبرتا", tn: "زمبرتا", fr: "Zembretta", en: "Zembretta" }, is_correct: true, points: 10 },
            { translations: { ar: "قورية", tn: "قورية", fr: "Kuriat", en: "Kuriat" }, is_correct: true, points: 10 },
            { translations: { ar: "الكنائس", tn: "الكنائس", fr: "Kneiss", en: "Kneiss" }, is_correct: true, points: 10 },
            { translations: { ar: "شيكلي", tn: "شيكلي", fr: "Chikli", en: "Djamour (Chikli)" }, is_correct: true, points: 10 },
            { translations: { ar: "الكلاب (الكانة)", tn: "الكانة", fr: "Îles des Chiens (Cani)", en: "Cani" }, is_correct: true, points: 10 },
            { translations: { ar: "صقلية", tn: "صقلية", fr: "Sicile", en: "Sicily" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 166,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 جبال تونسية؟" },
            tn: { text: "أذكر 9 جبال تونسية؟" },
            fr: { text: "Citez 9 montagnes tunisiennes ?" },
            en: { text: "Name 9 Tunisian mountains" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "جبل الشعانبي", tn: "جبل الشعانبي", fr: "Djebel Chambi", en: "Jebel Chambi" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل زغوان", tn: "جبل زغوان", fr: "Djebel Zaghouan", en: "Jebel Zaghouan" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل السرج", tn: "جبل السرج", fr: "Djebel Serj", en: "Jebel Serj" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل الرصاص", tn: "جبل الرصاص", fr: "Djebel Ressas", en: "Jebel Ressas" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل إشكل", tn: "جبل إشكل", fr: "Djebel Ichkeul", en: "Jebel Ichkeul" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل بوقرنين", tn: "جبل بوقرنين", fr: "Djebel Boukornine", en: "Jebel Boukornine" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل وسلات", tn: "جبل وسلات", fr: "Djebel Ousselat", en: "Jebel Ousselat" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل دير", tn: "جبل دير", fr: "Djebel Dyr", en: "Jebel Dyr" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل كسرى", tn: "جبل كسرى", fr: "Djebel Kesra", en: "Jebel Kesra" }, is_correct: true, points: 10 },
            { translations: { ar: "جبل إفرست", tn: "جبل إفرست", fr: "Mont Everest", en: "Mount Everest" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 167,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 حدود، بحار أو خلجان تحيط بالجمهورية التونسية؟" },
            tn: { text: "أذكر 9 حدود، بحار أو خلجان دايرة بتونس؟" },
            fr: { text: "Citez 9 frontières, mers ou golfes entourant la Tunisie ?" },
            en: { text: "Name 9 border countries, seas, or gulfs surrounding Tunisia" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "الجزائر", tn: "الجزائر", fr: "Algérie", en: "Algeria" }, is_correct: true, points: 10 },
            { translations: { ar: "ليبيا", tn: "ليبيا", fr: "Libye", en: "Libya" }, is_correct: true, points: 10 },
            { translations: { ar: "البحر الأبيض المتوسط", tn: "البحر الأبيض المتوسط", fr: "Mer Méditerranée", en: "Mediterranean Sea" }, is_correct: true, points: 10 },
            { translations: { ar: "خليج قابس", tn: "خليج قابس", fr: "Golfe de Gabès", en: "Gulf of Gabes" }, is_correct: true, points: 10 },
            { translations: { ar: "خليج تونس", tn: "خليج تونس", fr: "Golfe de Tunis", en: "Gulf of Tunis" }, is_correct: true, points: 10 },
            { translations: { ar: "خليج الحمامات", tn: "خليج الحمامات", fr: "Golfe de Hammamet", en: "Gulf of Hammamet" }, is_correct: true, points: 10 },
            { translations: { ar: "مضيق صقلية", tn: "مضيق صقلية", fr: "Canal de Sicile", en: "Strait of Sicily" }, is_correct: true, points: 10 },
            { translations: { ar: "القناة الإيطالية", tn: "القناة الإيطالية", fr: "Canal d'Italie", en: "Italian Channel" }, is_correct: true, points: 10 },
            { translations: { ar: "خليج المنستير", tn: "خليج المنستير", fr: "Golfe de Monastir", en: "Gulf of Monastir" }, is_correct: true, points: 10 },
            { translations: { ar: "المحيط الأطلسي", tn: "المحيط الأطلسي", fr: "Océan Atlantique", en: "Atlantic Ocean" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 168,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 واحات أو وجهات صحراوية تونسية؟" },
            tn: { text: "أذكر 9 واحات أو بلايص في صحراء تونس؟" },
            fr: { text: "Citez 9 oasis ou destinations sahariennes en Tunisie ?" },
            en: { text: "Name 9 Tunisian oases or desert destinations" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "توزر", tn: "توزر", fr: "Tozeur", en: "Tozeur" }, is_correct: true, points: 10 },
            { translations: { ar: "نفطة", tn: "نفطة", fr: "Nefta", en: "Nefta" }, is_correct: true, points: 10 },
            { translations: { ar: "دوز", tn: "دوز", fr: "Douz", en: "Douz" }, is_correct: true, points: 10 },
            { translations: { ar: "تمغزة", tn: "تمغزة", fr: "Tamerza", en: "Tamerza" }, is_correct: true, points: 10 },
            { translations: { ar: "الشبيكة", tn: "الشبيكة", fr: "Chebika", en: "Chebika" }, is_correct: true, points: 10 },
            { translations: { ar: "مطماطة", tn: "مطماطة", fr: "Matmata", en: "Matmata" }, is_correct: true, points: 10 },
            { translations: { ar: "عنق الجمل", tn: "عنق الجمل", fr: "Ong Jmel", en: "Ong Jmel" }, is_correct: true, points: 10 },
            { translations: { ar: "الحامة", tn: "الحامة", fr: "El Hamma", en: "El Hamma" }, is_correct: true, points: 10 },
            { translations: { ar: "قبلي", tn: "قبلي", fr: "Kébili", en: "Kebili" }, is_correct: true, points: 10 },
            { translations: { ar: "جزر المالديف", tn: "جزر المالديف", fr: "Maldives", en: "Maldives" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 169,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 شركات كبرى أو مؤسسات عمومية تونسية؟" },
            tn: { text: "أذكر 9 شركات أو مؤسسات وطنية كبار في تونس؟" },
            fr: { text: "Citez 9 grandes entreprises ou institutions publiques tunisiennes ?" },
            en: { text: "Name 9 major Tunisian companies or public enterprises" }
        },
        category: "Economy & Business",
        subcategory: "Companies",
        answers: [
            { translations: { ar: "اتصالات تونس", tn: "اتصالات تونس", fr: "Tunisie Telecom", en: "Tunisie Telecom" }, is_correct: true, points: 10 },
            { translations: { ar: "الخطوط التونسية", tn: "الخطوط التونسية", fr: "Tunisair", en: "Tunisair" }, is_correct: true, points: 10 },
            { translations: { ar: "الشركة التونسية للكهرباء والغاز", tn: "الستيك (STEG)", fr: "STEG", en: "STEG" }, is_correct: true, points: 10 },
            { translations: { ar: "الشركة الوطنية لاستغلال وتوزيع المياه", tn: "الصوناد (SONEDE)", fr: "SONEDE", en: "SONEDE" }, is_correct: true, points: 10 },
            { translations: { ar: "فسفات قفصة", tn: "شركة فسفات قفصة", fr: "Compagnie des Phosphates de Gafsa", en: "CPG (Gafsa Phosphates)" }, is_correct: true, points: 10 },
            { translations: { ar: "أوريدو تونس", tn: "أوريدو", fr: "Ooredoo Tunisie", en: "Ooredoo" }, is_correct: true, points: 10 },
            { translations: { ar: "أورانج تونس", tn: "أورانج", fr: "Orange Tunisie", en: "Orange" }, is_correct: true, points: 10 },
            { translations: { ar: "البريد التونسي", tn: "البوسطة (البريد)", fr: "Poste Tunisienne", en: "La Poste" }, is_correct: true, points: 10 },
            { translations: { ar: "البنك المركزي التونسي", tn: "البنك المركزي", fr: "Banque Centrale de Tunisie", en: "Central Bank" }, is_correct: true, points: 10 },
            { translations: { ar: "مايكروسوفت", tn: "مايكروسوفت", fr: "Microsoft", en: "Microsoft" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 170,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 منتجات رئيسية تقوم تونس بتصديرها؟" },
            tn: { text: "أذكر 9 حاجات تصدرهم تونس لبرا؟" },
            fr: { text: "Citez 9 produits exportés par la Tunisie ?" },
            en: { text: "Name 9 products Tunisia exports" }
        },
        category: "Economy & Business",
        subcategory: "Companies",
        answers: [
            { translations: { ar: "زيت الزيتون", tn: "زيت زيتون", fr: "Huile d'olive", en: "Olive oil" }, is_correct: true, points: 10 },
            { translations: { ar: "التمور (الدقلة)", tn: "الدقلة (التمر)", fr: "Dattes", en: "Dates (Degla)" }, is_correct: true, points: 10 },
            { translations: { ar: "الفسفات", tn: "الفسفات", fr: "Phosphates", en: "Phosphates" }, is_correct: true, points: 10 },
            { translations: { ar: "الأسماك", tn: "الحوت والقريدس", fr: "Poissons / Crustacés", en: "Fish / Seafood" }, is_correct: true, points: 10 },
            { translations: { ar: "القوارص", tn: "القارص والبرتقال", fr: "Agrumes", en: "Citrus fruits" }, is_correct: true, points: 10 },
            { translations: { ar: "الملابس والنسيج", tn: "الحوايج والنسيج", fr: "Textile et habillement", en: "Textile and garments" }, is_correct: true, points: 10 },
            { translations: { ar: "الكابلات الإلكترونية", tn: "كوابل السيارات والكهرباء", fr: "Câbles électriques", en: "Electronic cables" }, is_correct: true, points: 10 },
            { translations: { ar: "الصناعات التقليدية", tn: "الصناعة التقليدية", fr: "Artisanat", en: "Handicrafts" }, is_correct: true, points: 10 },
            { translations: { ar: "الملح", tn: "الملح البحرى", fr: "Sel de mer", en: "Sea salt" }, is_correct: true, points: 10 },
            { translations: { ar: "سيارات فخمة", tn: "كراهب فخمة", fr: "Voitures de luxe", en: "Luxury cars" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 171,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 وجهات سياحية تونسية شهيرة عالمياً؟" },
            tn: { text: "أذكر 9 بلايص سياحية معروفة في تونس؟" },
            fr: { text: "Citez 9 destinations touristiques célèbres en Tunisie ?" },
            en: { text: "Name 9 famous tourist destinations in Tunisia" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "سيدي بوسعيد", tn: "سيدي بوسعيد", fr: "Sidi Bou Saïd", en: "Sidi Bou Said" }, is_correct: true, points: 10 },
            { translations: { ar: "الحمامات", tn: "الحمامات", fr: "Hammamet", en: "Hammamet" }, is_correct: true, points: 10 },
            { translations: { ar: "سوسة", tn: "سوسة", fr: "Sousse", en: "Sousse" }, is_correct: true, points: 10 },
            { translations: { ar: "جربة", tn: "جربة", fr: "Djerba", en: "Djerba" }, is_correct: true, points: 10 },
            { translations: { ar: "طبرقة", tn: "طبرقة", fr: "Tabarka", en: "Tabarka" }, is_correct: true, points: 10 },
            { translations: { ar: "قرطاج", tn: "قرطاج", fr: "Carthage", en: "Carthage" }, is_correct: true, points: 10 },
            { translations: { ar: "الجم", tn: "الجم", fr: "El Jem", en: "El Jem" }, is_correct: true, points: 10 },
            { translations: { ar: "توزر", tn: "توزر", fr: "Tozeur", en: "Tozeur" }, is_correct: true, points: 10 },
            { translations: { ar: "مهدية", tn: "المهدية", fr: "Mahdia", en: "Mahdia" }, is_correct: true, points: 10 },
            { translations: { ar: "برج إيفل", tn: "برج إيفل", fr: "Tour Eiffel", en: "Eiffel Tower" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 172,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أدوات أو منتجات ترتبط بمواسم الحصاد الفلاحي في تونس؟" },
            tn: { text: "أذكر 9 حاجات مربوطة بمواسم الحصاد الفلاحي في تونس؟" },
            fr: { text: "Citez 9 éléments associés aux récoltes agricoles en Tunisie ?" },
            en: { text: "Name 9 items associated with agricultural harvest in Tunisia" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "جرار", tn: "تراكتور", fr: "Tracteur", en: "Tractor" }, is_correct: true, points: 10 },
            { translations: { ar: "زيتون", tn: "زيتون", fr: "Olives", en: "Olives" }, is_correct: true, points: 10 },
            { translations: { ar: "قمح", tn: "قمح", fr: "Blé", en: "Wheat" }, is_correct: true, points: 10 },
            { translations: { ar: "دقلة", tn: "دقلة", fr: "Dattes (Degla)", en: "Dates (Degla)" }, is_correct: true, points: 10 },
            { translations: { ar: "برتقال", tn: "لتشين / برتقال", fr: "Oranges", en: "Oranges" }, is_correct: true, points: 10 },
            { translations: { ar: "قرط", tn: "قرط", fr: "Foin (Qart)", en: "Hay (Qart)" }, is_correct: true, points: 10 },
            { translations: { ar: "صناديق", tn: "صناديق الخشب", fr: "Caisses / Cagettes", en: "Crates / Boxes" }, is_correct: true, points: 10 },
            { translations: { ar: "عمال فلاحيين", tn: "خدامة فلاحية", fr: "Ouvriers agricoles", en: "Farm workers" }, is_correct: true, points: 10 },
            { translations: { ar: "معصرة", tn: "معصرة زيتون", fr: "Moulin à huile / Pressoir", en: "Olive press" }, is_correct: true, points: 10 },
            { translations: { ar: "حوت طازج", tn: "حوت فريشك", fr: "Poisson frais", en: "Fresh fish" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 173,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أجزاء رئيسية في نظام الكمبيوتر؟" },
            tn: { text: "أذكر 9 قطع تركب في البي سي / الكمبيوتر؟" },
            fr: { text: "Citez 9 composants d'un système informatique ?" },
            en: { text: "Name 9 parts of a computer system" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "شاشة", tn: "شاشة", fr: "Écran / Moniteur", en: "Monitor / Screen" }, is_correct: true, points: 10 },
            { translations: { ar: "لوحة مفاتيح", tn: "كيبورد / لوحة مفاتيح", fr: "Clavier", en: "Keyboard" }, is_correct: true, points: 10 },
            { translations: { ar: "فأرة", tn: "سوري / فأرة", fr: "Souris", en: "Mouse" }, is_correct: true, points: 10 },
            { translations: { ar: "وحدة معالجة مركزية", tn: "بروسيسور", fr: "Processeur / CPU", en: "CPU" }, is_correct: true, points: 10 },
            { translations: { ar: "ذاكرة عشوائية", tn: "رام (RAM)", fr: "Mémoire RAM", en: "RAM" }, is_correct: true, points: 10 },
            { translations: { ar: "قرص صلب", tn: "ديسك دير", fr: "Disque dur (Stockage)", en: "Hard Drive (Storage)" }, is_correct: true, points: 10 },
            { translations: { ar: "كارت شاشة", tn: "كارت غرافيك", fr: "Carte graphique", en: "Graphics Card" }, is_correct: true, points: 10 },
            { translations: { ar: "لوحة أم", tn: "كارط مير", fr: "Carte mère", en: "Motherboard" }, is_correct: true, points: 10 },
            { translations: { ar: "كابل طاقة", tn: "بواط داليمونتاسيون", fr: "Alimentation", en: "Power Supply (Boite)" }, is_correct: true, points: 10 },
            { translations: { ar: "مروحة يدوية", tn: "مروحة يدوية", fr: "Éventail", en: "Hand fan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 174,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 تخصصات أو فروع علمية؟" },
            tn: { text: "أذكر 9 تخصصات علمية يقراوهم؟" },
            fr: { text: "Citez 9 disciplines scientifiques ?" },
            en: { text: "Name 9 scientific disciplines" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "الفيزياء", tn: "الفيزياء", fr: "Physique", en: "Physics" }, is_correct: true, points: 10 },
            { translations: { ar: "الكيمياء", tn: "الكيمياء", fr: "Chimie", en: "Chemistry" }, is_correct: true, points: 10 },
            { translations: { ar: "الرياضيات", tn: "المات (الرياضيات)", fr: "Mathématiques", en: "Mathematics" }, is_correct: true, points: 10 },
            { translations: { ar: "علم الأحياء", tn: "البيولوجيا / الأحياء", fr: "Biologie", en: "Biology" }, is_correct: true, points: 10 },
            { translations: { ar: "الفلك", tn: "علم الفلك", fr: "Astronomie", en: "Astronomy" }, is_correct: true, points: 10 },
            { translations: { ar: "الجيولوجيا", tn: "الجيولوجيا", fr: "Géologie", en: "Geology" }, is_correct: true, points: 10 },
            { translations: { ar: "الطب", tn: "الطب", fr: "Médecine", en: "Medicine" }, is_correct: true, points: 10 },
            { translations: { ar: "الهندسة", tn: "الهندسة", fr: "Ingénierie", en: "Engineering" }, is_correct: true, points: 10 },
            { translations: { ar: "علم النفس", tn: "علم النفس", fr: "Psychologie", en: "Psychology" }, is_correct: true, points: 10 },
            { translations: { ar: "التنجيم", tn: "التنجيم والكذب", fr: "Astrologie", en: "Astrology" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 175,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 تخصصات طبية؟" },
            tn: { text: "أذكر 9 تخصصات تع أطباء؟" },
            fr: { text: "Citez 9 spécialités médicales ?" },
            en: { text: "Name 9 medical specialties" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "طب الأطفال", tn: "طب الأطفال", fr: "Pédiatrie", en: "Pediatrics" }, is_correct: true, points: 10 },
            { translations: { ar: "طب القلب", tn: "طب القلب", fr: "Cardiologie", en: "Cardiology" }, is_correct: true, points: 10 },
            { translations: { ar: "طب الأعصاب", tn: "طب الأعصاب", fr: "Neurologie", en: "Neurology" }, is_correct: true, points: 10 },
            { translations: { ar: "الجراحة العامة", tn: "الجراحة العامة", fr: "Chirurgie générale", en: "General Surgery" }, is_correct: true, points: 10 },
            { translations: { ar: "طب العيون", tn: "طب العيون", fr: "Ophtalmologie", en: "Ophthalmology" }, is_correct: true, points: 10 },
            { translations: { ar: "طب العظام", tn: "طب العظام", fr: "Orthopédie", en: "Orthopedics" }, is_correct: true, points: 10 },
            { translations: { ar: "طب الجلدية", tn: "طب الجلدية", fr: "Dermatologie", en: "Dermatology" }, is_correct: true, points: 10 },
            { translations: { ar: "طب النساء والتوليد", tn: "طب النساء", fr: "Gynécologie", en: "Gynecology" }, is_correct: true, points: 10 },
            { translations: { ar: "طب الأسنان", tn: "طب الأسنان", fr: "Dentiste", en: "Dentistry" }, is_correct: true, points: 10 },
            { translations: { ar: "قراءة الكف", tn: "قراءة الكف", fr: "Chiromancie", en: "Palmistry" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 176,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أدوات يستعملها العالم أو الباحث في المختبر؟" },
            tn: { text: "أذكر 9 حاجات يستعملها الباحث في اللابوراطوار؟" },
            fr: { text: "Citez 9 outils utilisés par un chercheur dans un laboratoire ?" },
            en: { text: "Name 9 tools used by a scientist in a laboratory" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "مجهر", tn: "ميكروسكوب", fr: "Microscope", en: "Microscope" }, is_correct: true, points: 10 },
            { translations: { ar: "أنبوب اختبار", tn: "تيوو دي سي (أنبوب)", fr: "Tube à essai", en: "Test tube" }, is_correct: true, points: 10 },
            { translations: { ar: "ميزان دقيق", tn: "ميزان دقيق", fr: "Balance de précision", en: "Precision scale" }, is_correct: true, points: 10 },
            { translations: { ar: "نظارات حماية", tn: "لوينات حماية", fr: "Lunettes de sécurité", en: "Safety goggles" }, is_correct: true, points: 10 },
            { translations: { ar: "قفازات", tn: "لوغون (ليكات)", fr: "Gants", en: "Gloves" }, is_correct: true, points: 10 },
            { translations: { ar: "ماصة", tn: "ماصة", fr: "Pipette", en: "Pipette" }, is_correct: true, points: 10 },
            { translations: { ar: "ميزان حرارة", tn: "ميزان حرارة", fr: "Thermomètre", en: "Thermometer" }, is_correct: true, points: 10 },
            { translations: { ar: "حاسوب", tn: "بي سي / أرديناتور", fr: "Ordinateur", en: "Computer" }, is_correct: true, points: 10 },
            { translations: { ar: "ورقة وقلم", tn: "ورقة وستيلو", fr: "Cahier de notes", en: "Notebook / Pen" }, is_correct: true, points: 10 },
            { translations: { ar: "فأس", tn: "فأس", fr: "Hache", en: "Axe" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 177,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 رياضات معتمدة في الألعاب الأولمبية؟" },
            tn: { text: "أذكر 9 رياضات أولمبية؟" },
            fr: { text: "Citez 9 sports olympiques ?" },
            en: { text: "Name 9 Olympic sports" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "الجري", tn: "الجري والسباقات", fr: "Course / Athlétisme", en: "Running / Athletics" }, is_correct: true, points: 10 },
            { translations: { ar: "السباحة", tn: "السباحة", fr: "Natation", en: "Swimming" }, is_correct: true, points: 10 },
            { translations: { ar: "الجمباز", tn: "الجمباز", fr: "Gymnastique", en: "Gymnastics" }, is_correct: true, points: 10 },
            { translations: { ar: "الملاكمة", tn: "الملاكمة (بوكس)", fr: "Boxe", en: "Boxing" }, is_correct: true, points: 10 },
            { translations: { ar: "الجودو", tn: "الجودو", fr: "Judo", en: "Judo" }, is_correct: true, points: 10 },
            { translations: { ar: "رفع الأثقال", tn: "رفع الأثقال", fr: "Haltérophilie", en: "Weightlifting" }, is_correct: true, points: 10 },
            { translations: { ar: "التنس", tn: "التنس", fr: "Tennis", en: "Tennis" }, is_correct: true, points: 10 },
            { translations: { ar: "كرة السلة", tn: "باسكيت", fr: "Basket-ball", en: "Basketball" }, is_correct: true, points: 10 },
            { translations: { ar: "كرة اليد", tn: "هوند", fr: "Handball", en: "Handball" }, is_correct: true, points: 10 },
            { translations: { ar: "لعبة الشطرنج", tn: "شكوبستان الشطرنج", fr: "Échecs", en: "Chess" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 178,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 رياضيين تونسيين اشتهروا عالمياً؟" },
            tn: { text: "أذكر 9 أبطال رياضيين توانسة معروفين؟" },
            fr: { text: "Citez 9 athlètes tunisiens célèbres ?" },
            en: { text: "Name 9 famous Tunisian athletes" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "أسامة الملولي", tn: "أسامة الملولي", fr: "Oussama Mellouli", en: "Oussama Mellouli" }, is_correct: true, points: 10 },
            { translations: { ar: "أنس جابر", tn: "أنس جابر", fr: "Ons Jabeur", en: "Ons Jabeur" }, is_correct: true, points: 10 },
            { translations: { ar: "خليل الجندوبي", tn: "خليل الجندوبي", fr: "Mohamed Khalil Jendoubi", en: "Mohamed Khalil Jendoubi" }, is_correct: true, points: 10 },
            { translations: { ar: "حبيبة الغريبي", tn: "حبيبة الغريبي", fr: "Habiba Ghribi", en: "Habiba Ghribi" }, is_correct: true, points: 10 },
            { translations: { ar: "محمد القمودي", tn: "محمد القمودي", fr: "Mohammed Gammoudi", en: "Mohammed Gammoudi" }, is_correct: true, points: 10 },
            { translations: { ar: "روعة التليلي", tn: "روعة التليلي", fr: "Raoua Tlili", en: "Raoua Tlili" }, is_correct: true, points: 10 },
            { translations: { ar: "أيوب الحفناوي", tn: "أيوب الحفناوي", fr: "Ahmed Ayoub Hafnaoui", en: "Ahmed Ayoub Hafnaoui" }, is_correct: true, points: 10 },
            { translations: { ar: "راضي الجعايدي", tn: "راضي الجعايدي", fr: "Radhi Jaïdi", en: "Radhi Jaidi" }, is_correct: true, points: 10 },
            { translations: { ar: "طارق ذياب", tn: "طارق ذياب", fr: "Tarak Dhiab", en: "Tarak Dhiab" }, is_correct: true, points: 10 },
            { translations: { ar: "ليونيل ميسي", tn: "ميسي", fr: "Lionel Messi", en: "Lionel Messi" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 179,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشياء توجد في قاعة كمال الأجسام والرياضة (الجم)؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في قاعة السبور؟" },
            fr: { text: "Citez 9 équipements que l'on trouve dans une salle de sport ?" },
            en: { text: "Name 9 items found in a sports gym" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "أثقال", tn: "أثقال / ماتريال", fr: "Haltères / Poids", en: "Dumbbells / Weights" }, is_correct: true, points: 10 },
            { translations: { ar: "جهاز جري", tn: "تابي (تسيير)", fr: "Tapis de course", en: "Treadmill" }, is_correct: true, points: 10 },
            { translations: { ar: "دراجة ثابتة", tn: "بسكليت سبور", fr: "Vélo d'appartement", en: "Stationary bike" }, is_correct: true, points: 10 },
            { translations: { ar: "بساط يوجا", tn: "بساط / كوليت", fr: "Tapis de yoga", en: "Yoga mat" }, is_correct: true, points: 10 },
            { translations: { ar: "حبل قفز", tn: "حبل قفز", fr: "Corde à sauter", en: "Jump rope" }, is_correct: true, points: 10 },
            { translations: { ar: "مرآة كبيرة", tn: "مراية كبار", fr: "Grand miroir", en: "Large mirror" }, is_correct: true, points: 10 },
            { translations: { ar: "منشفة", tn: "بشكير / منشفة", fr: "Serviette", en: "Towel" }, is_correct: true, points: 10 },
            { translations: { ar: "قارورة ماء", tn: "دبوزة ماء", fr: "Bouteille d'eau", en: "Water bottle" }, is_correct: true, points: 10 },
            { translations: { ar: "مدرب", tn: "كوتش", fr: "Entraîneur / Coach", en: "Coach / Trainer" }, is_correct: true, points: 10 },
            { translations: { ar: "سرير نوم", tn: "فرش نوم", fr: "Lit de chambre", en: "Bedroom bed" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 180,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مراكز أو أدوار للاعبين في فريق كرة القدم؟" },
            tn: { text: "أذكر 9 مراكز تع جوارات في ماتش كورة؟" },
            fr: { text: "Citez 9 postes ou rôles dans une équipe de football ?" },
            en: { text: "Name 9 positions or roles in a football team" }
        },
        category: "Sports",
        subcategory: "Football",
        answers: [
            { translations: { ar: "حارس مرمى", tn: "غارديان", fr: "Gardien de but", en: "Goalkeeper" }, is_correct: true, points: 10 },
            { translations: { ar: "مدافع", tn: "ديفونسور", fr: "Défenseur", en: "Defender" }, is_correct: true, points: 10 },
            { translations: { ar: "مهاجم", tn: "أتاكونت", fr: "Attaquant", en: "Striker / Forward" }, is_correct: true, points: 10 },
            { translations: { ar: "وسط ميدان", tn: "ملعب وسط", fr: "Milieu de terrain", en: "Midfielder" }, is_correct: true, points: 10 },
            { translations: { ar: "جناح", tn: "أيليي", fr: "Ailier", en: "Winger" }, is_correct: true, points: 10 },
            { translations: { ar: "ظهير", tn: "ديفونسور دروات / غوش", fr: "Arrière latéral", en: "Full-back" }, is_correct: true, points: 10 },
            { translations: { ar: "كابتن الفريق", tn: "كابتن", fr: "Capitaine", en: "Team captain" }, is_correct: true, points: 10 },
            { translations: { ar: "مدرب", tn: "ونترينور", fr: "Entraîneur", en: "Coach / Manager" }, is_correct: true, points: 10 },
            { translations: { ar: "حكم", tn: "أربيتر", fr: "Arbitre", en: "Referee" }, is_correct: true, points: 10 },
            { translations: { ar: "مشجع", tn: "محب / مشجع", fr: "Supporter", en: "Supporter / Fan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 181,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مغنين أو موسيقيين تونسيين مشهورين؟" },
            tn: { text: "أذكر 9 مغنين توانسة معروفين؟" },
            fr: { text: "Citez 9 chanteurs ou musiciens tunisiens célèbres ?" },
            en: { text: "Name 9 famous Tunisian singers or musicians" }
        },
        category: "Arts",
        subcategory: "Music",
        answers: [
            { translations: { ar: "صابر الرباعي", tn: "صابر الرباعي", fr: "Saber Rebaï", en: "Saber Rebai" }, is_correct: true, points: 10 },
            { translations: { ar: "لطيفة العرفاوي", tn: "لطيفة العرفاوي", fr: "Latifa Arfaoui", en: "Latifa Arfaoui" }, is_correct: true, points: 10 },
            { translations: { ar: "علي الرياحي", tn: "علي الرياحي", fr: "Ali Riahi", en: "Ali Riahi" }, is_correct: true, points: 10 },
            { translations: { ar: "الهادي الجويني", tn: "الهادي الجويني", fr: "Hédi Jouini", en: "Hedi Jouini" }, is_correct: true, points: 10 },
            { translations: { ar: "ذكرى محمد", tn: "ذكرى", fr: "Thekra Mohamed", en: "Warda / Thekra" }, is_correct: true, points: 10 },
            { translations: { ar: "أمينة فاخت", tn: "أمينة فاخت", fr: "Amina Fakhet", en: "Amina Fakhet" }, is_correct: true, points: 10 },
            { translations: { ar: "بلطي", tn: "بلطي", fr: "Balti", en: "Balti" }, is_correct: true, points: 10 },
            { translations: { ar: "لطفي بوشناق", tn: "لطفي بوشناق", fr: "Lotfi Bouchnak", en: "Lotfi Bouchnak" }, is_correct: true, points: 10 },
            { translations: { ar: "أنور براهم", tn: "أنور براهم", fr: "Anouar Brahem", en: "Anouar Brahem" }, is_correct: true, points: 10 },
            { translations: { ar: "بيتهوفن", tn: "بيتهوفن", fr: "Beethoven", en: "Beethoven" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 182,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 آلات موسيقية مستعملة في الموسيقى العربية والتونسية؟" },
            tn: { text: "أذكر 9 آلات موسيقية تعزف في تونس؟" },
            fr: { text: "Citez 9 instruments utilisés dans la musique arabo-tunisienne ?" },
            en: { text: "Name 9 musical instruments used in Arab/Tunisian music" }
        },
        category: "Arts",
        subcategory: "Music",
        answers: [
            { translations: { ar: "عود", tn: "عود", fr: "Oud", en: "Oud" }, is_correct: true, points: 10 },
            { translations: { ar: "قانون", tn: "قانون", fr: "Qanun", en: "Qanun" }, is_correct: true, points: 10 },
            { translations: { ar: "كمنجة", tn: "كمنجة", fr: "Violon (Kamanja)", en: "Violin (Kamanja)" }, is_correct: true, points: 10 },
            { translations: { ar: "داربوكة", tn: "داربوكة", fr: "Darbouka", en: "Darbouka" }, is_correct: true, points: 10 },
            { translations: { ar: "ناي", tn: "ناي", fr: "Nay", en: "Nay" }, is_correct: true, points: 10 },
            { translations: { ar: "طار", tn: "طار", fr: "Tar", en: "Tar" }, is_correct: true, points: 10 },
            { translations: { ar: "مزود", tn: "مزود", fr: "Mezoued", en: "Mezoued" }, is_correct: true, points: 10 },
            { translations: { ar: "بندير", tn: "بندير", fr: "Bendier", en: "Bendier" }, is_correct: true, points: 10 },
            { translations: { ar: "زكرة", tn: "زكرة", fr: "Zokra", en: "Zokra" }, is_correct: true, points: 10 },
            { translations: { ar: "غيتار كهربائي", tn: "كوردا الكتريك", fr: "Guitare électrique", en: "Electric guitar" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 183,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 روايات، مسرحيات أو أعمال ثقافية تونسية مشهورة؟" },
            tn: { text: "أذكر 9 مسرحيات أو كتب تونسية معروفة كبار؟" },
            fr: { text: "Citez 9 romans, pièces ou œuvres culturelles tunisiennes célèbres ?" },
            en: { text: "Name 9 famous Tunisian novels, plays, or cultural works" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "مسرحية الماريشال", tn: "الماريشال (مسرحية)", fr: "Le Maréchal (pièce)", en: "El Marichal play" }, is_correct: true, points: 10 },
            { translations: { ar: "رواية الدقلة في عراجينها", tn: "الدقلة في عراجينها", fr: "Dégla dans ses régimes", en: "El Degla novel" }, is_correct: true, points: 10 },
            { translations: { ar: "ديوان أغاني الحياة", tn: "أغاني الحياة (شعر الشابي)", fr: "Chants de la vie", en: "Aghani el Haya book" }, is_correct: true, points: 10 },
            { translations: { ar: "مسرحية كلام الليل", tn: "كلام الليل", fr: "Kalam el Lil (Tewfik Jbali)", en: "Kalam el Lil play" }, is_correct: true, points: 10 },
            { translations: { ar: "كتاب مقدمة ابن خلدون", tn: "مقدمة ابن خلدون", fr: "La Muqaddima", en: "Muqaddimah (Ibn Khaldun)" }, is_correct: true, points: 10 },
            { translations: { ar: "رواية حدث أبو هريرة قال", tn: "حدث أبو هريرة قال (للمسعدي)", fr: "Ainsi parla Abou Houraïra", en: "Hadith Abou Huraira novel" }, is_correct: true, points: 10 },
            { translations: { ar: "مسرحية يحيى يعيش", tn: "يحيى يعيش", fr: "Yahia Yaïch (Famille active)", en: "Yahya Yaich play" }, is_correct: true, points: 10 },
            { translations: { ar: "فيلم عصفور سطح", tn: "حلفاوين / عصفور سطح", fr: "Halfaouine (l'enfant des terrasses)", en: "Asfour Stah film" }, is_correct: true, points: 10 },
            { translations: { ar: "فيلم صمت القصور", tn: "صمت القصور", fr: "Les Silences du palais", en: "Samt el Qousour film" }, is_correct: true, points: 10 },
            { translations: { ar: "مسرحية هاملت", tn: "هاملت", fr: "Hamlet", en: "Hamlet play" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 184,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 فنون أو هوايات إبداعية؟" },
            tn: { text: "أذكر 9 فنون أو هوايات إبداعية يعملوها؟" },
            fr: { text: "Citez 9 formes d'art ou loisirs créatifs ?" },
            en: { text: "Name 9 art forms or creative hobbies" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "الرسم", tn: "الرسم", fr: "Peinture", en: "Painting" }, is_correct: true, points: 10 },
            { translations: { ar: "النحت", tn: "النحت", fr: "Sculpture", en: "Sculpture" }, is_correct: true, points: 10 },
            { translations: { ar: "التصوير الفوتوغرافي", tn: "التصوير الفوتوغرافي", fr: "Photographie", en: "Photography" }, is_correct: true, points: 10 },
            { translations: { ar: "الرقص", tn: "الرقص", fr: "Danse", en: "Dancing" }, is_correct: true, points: 10 },
            { translations: { ar: "الكتابة الأدبية", tn: "الكتيبة والقصص", fr: "Écriture littéraire", en: "Literature writing" }, is_correct: true, points: 10 },
            { translations: { ar: "العزف", tn: "الموسيقى والعزف", fr: "Musique / Jouer d'un instrument", en: "Instrument playing" }, is_correct: true, points: 10 },
            { translations: { ar: "السينما", tn: "السينما والأفلام", fr: "Cinéma", en: "Cinema / Filmmaking" }, is_correct: true, points: 10 },
            { translations: { ar: "المسرح", tn: "المسرح والتمثيل", fr: "Théâtre", en: "Theatre" }, is_correct: true, points: 10 },
            { translations: { ar: "الخط العربي", tn: "الكتيبة بالخط العربي", fr: "Calligraphie arabe", en: "Arabic Calligraphy" }, is_correct: true, points: 10 },
            { translations: { ar: "النوم", tn: "النوم والقيلولة", fr: "Sommeil / Sieste", en: "Sleeping" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 185,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنواع من البرامج التلفزيونية؟" },
            tn: { text: "أذكر 9 أنواع برامج يجيو في التلفزة؟" },
            fr: { text: "Citez 9 genres d'émissions de télévision ?" },
            en: { text: "Name 9 TV genres" }
        },
        category: "Entertainment",
        subcategory: "Television",
        answers: [
            { translations: { ar: "أخبار", tn: "الأخبار", fr: "Actualités / Journal", en: "News" }, is_correct: true, points: 10 },
            { translations: { ar: "مسلسلات درامية", tn: "مسلسلات دراما", fr: "Séries dramatiques", en: "Drama Series" }, is_correct: true, points: 10 },
            { translations: { ar: "برامج كوميدية", tn: "سيتكومات وكوميديا", fr: "Divertissements comiques", en: "Comedy Shows" }, is_correct: true, points: 10 },
            { translations: { ar: "وثائقي", tn: "وثائقي / تاريخ", fr: "Documentaire", en: "Documentary" }, is_correct: true, points: 10 },
            { translations: { ar: "برامج طبخ", tn: "حصص الطبخ", fr: "Émissions de cuisine", en: "Cooking Shows" }, is_correct: true, points: 10 },
            { translations: { ar: "برامج رياضية", tn: "الأحد الرياضي / برامج سبور", fr: "Émissions de sport", en: "Sports Programs" }, is_correct: true, points: 10 },
            { translations: { ar: "كرتون أطفال", tn: "كرتون ورسوم متحركة", fr: "Dessins animés pour enfants", en: "Kids Cartoons" }, is_correct: true, points: 10 },
            { translations: { ar: "مسابقات", tn: "حصص مسابقات وألعاب", fr: "Jeux télévisés", en: "Game Shows" }, is_correct: true, points: 10 },
            { translations: { ar: "برامج حوارية", tn: "حصص حوارية", fr: "Talk-shows", en: "Talk Shows" }, is_correct: true, points: 10 },
            { translations: { ar: "قراءة الكتب", tn: "قراية الكراس والكتب", fr: "Lecture de livres", en: "Reading books" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 186,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مسلسلات أو سيتكومات تونسية شهيرة؟" },
            tn: { text: "أذكر 9 مسلسلات تونسية شهيرة عديناهم في التلفزة؟" },
            fr: { text: "Citez 9 feuilletons ou sitcoms tunisiens classiques ?" },
            en: { text: "Name 9 classic Tunisian TV series or comedies" }
        },
        category: "Entertainment",
        subcategory: "Television",
        answers: [
            { translations: { ar: "شوفلي حل", tn: "شوفلي حل", fr: "Choufli Hal", en: "Choufli Hal" }, is_correct: true, points: 10 },
            { translations: { ar: "الخطاب على الباب", tn: "الخطاب على الباب", fr: "El Khottab Al Bab", en: "El Khottab Al Bab" }, is_correct: true, points: 10 },
            { translations: { ar: "صيد الريم", tn: "صيد الريم", fr: "Sayd Errim", en: "Sayd Errim" }, is_correct: true, points: 10 },
            { translations: { ar: "نسيبتي العزيزة", tn: "نسيبتي العزيزة", fr: "Nsibti Laaziza", en: "Nsibti Laaziza" }, is_correct: true, points: 10 },
            { translations: { ar: "الدوار", tn: "الدوار", fr: "Ed-Dowar", en: "Ed-Dowar" }, is_correct: true, points: 10 },
            { translations: { ar: "منامة عروسية", tn: "منامة عروسية", fr: "Mnamet Aroussia", en: "Mnamet Aroussia" }, is_correct: true, points: 10 },
            { translations: { ar: "قمرة سيدي المحروس", tn: "قمرة سيدي المحروس", fr: "Gamret Sidi Mahrous", en: "Gamret Sidi Mahrous" }, is_correct: true, points: 10 },
            { translations: { ar: "حسابات وعقابات", tn: "حسابات وعقابات", fr: "Hsabet w Aqabat", en: "Hsabet w Aqabat" }, is_correct: true, points: 10 },
            { translations: { ar: "أولاد مفيدة", tn: "أولاد مفيدة", fr: "Awled Moufida", en: "Awled Moufida" }, is_correct: true, points: 10 },
            { translations: { ar: "مسلسل باب الحارة", tn: "باب الحارة", fr: "Bab Al-Hara", en: "Bab Al-Hara" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 187,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أجهزة أو منصات مستعملة للعب ألعاب الفيديو؟" },
            tn: { text: "أذكر 9 كونسولات تلعب بيهم فيديو جيمز؟" },
            fr: { text: "Citez 9 consoles ou plateformes de jeux vidéo ?" },
            en: { text: "Name 9 video game consoles or platforms" }
        },
        category: "Entertainment",
        subcategory: "Video Games",
        answers: [
            { translations: { ar: "بلايستيشن", tn: "بلاي ستيشن (PS)", fr: "PlayStation", en: "PlayStation" }, is_correct: true, points: 10 },
            { translations: { ar: "إكس بوكس", tn: "إكس بوكس", fr: "Xbox", en: "Xbox" }, is_correct: true, points: 10 },
            { translations: { ar: "نينتندو سويتش", tn: "نينتندو سويتش", fr: "Nintendo Switch", en: "Nintendo Switch" }, is_correct: true, points: 10 },
            { translations: { ar: "حاسوب شخصي", tn: "أرديناتور / بي سي", fr: "PC (Ordinateur)", en: "PC (Computer)" }, is_correct: true, points: 10 },
            { translations: { ar: "هاتف محمول", tn: "تليفون", fr: "Smartphone / Mobile", en: "Mobile Phone" }, is_correct: true, points: 10 },
            { translations: { ar: "أتاري", tn: "أتاري قديمة", fr: "Atari", en: "Atari" }, is_correct: true, points: 10 },
            { translations: { ar: "سيغا", tn: "سيغا", fr: "Sega", en: "Sega" }, is_correct: true, points: 10 },
            { translations: { ar: "جيم بوي", tn: "جيم بوي", fr: "Game Boy", en: "Game Boy" }, is_correct: true, points: 10 },
            { translations: { ar: "بلايستيشن بورتبل", tn: "بي اس بي (PSP)", fr: "PSP", en: "PSP" }, is_correct: true, points: 10 },
            { translations: { ar: "ميكروويف", tn: "ميكروويف (كوجينة)", fr: "Micro-ondes", en: "Microwave" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 188,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مسلسلات أنمي أو كرتون اشتهرت بأغاني شاراتها على سبيستون؟" },
            tn: { text: "أذكر 9 شارات كرتون سبيستون معروفة؟" },
            fr: { text: "Citez 9 génériques cultes de dessins animés de Spacetoon ?" },
            en: { text: "Name 9 famous anime or cartoon opening songs on Spacetoon" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "شارة المحقق كونان", tn: "غناية كونان", fr: "Générique de Détective Conan", en: "Conan Theme" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة القناص", tn: "غناية القناص", fr: "Générique de Hunter x Hunter", en: "Hunter x Hunter" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة هزيم الرعد", tn: "غناية هزيم الرعد", fr: "Générique de Thunder Jet", en: "Thunder Jet" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة ريمي", tn: "غناية ريمي", fr: "Générique de Rémi", en: "Remy" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة عهد الأصدقاء", tn: "غناية عهد الأصدقاء", fr: "Générique de Roméo", en: "Romeo's Skies" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة بابار", tn: "غناية بابار", fr: "Générique de Babar", en: "Babar Theme" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة ماوكلي", tn: "غناية ماوكلي", fr: "Générique de Mowgli", en: "Mowgli Theme" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة أبطال الديجيتال", tn: "غناية أبطال الديجيتال", fr: "Générique de Digimon", en: "Digimon" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة دراجون بول", tn: "غناية دراجون بول", fr: "Générique de Dragon Ball", en: "Dragon Ball" }, is_correct: true, points: 10 },
            { translations: { ar: "شارة الأخبار", tn: "جينغل الأخبار", fr: "Jingle du journal de 20h", en: "News Jingle" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 189,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مكونات أساسية تُستعمل في تحضير الكسكسي التونسي؟" },
            tn: { text: "أذكر 9 حاجات نطيبو بيهم الكسكسي التونسي؟" },
            fr: { text: "Citez 9 ingrédients indispensables pour préparer un couscous tunisien ?" },
            en: { text: "Name 9 ingredients used in Couscous" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "سميد الكسكسي", tn: "سميد الكسكسي", fr: "Semoule de couscous", en: "Couscous semolina" }, is_correct: true, points: 10 },
            { translations: { ar: "خضرة (سفنارية وقرع)", tn: "سفنارية وقرع", fr: "Légumes (Carotte / Potiron)", en: "Vegetables" }, is_correct: true, points: 10 },
            { translations: { ar: "حمص", tn: "حمص", fr: "Pois chiches", en: "Chickpeas" }, is_correct: true, points: 10 },
            { translations: { ar: "لحم أو دجاج", tn: "لحم أو علوش", fr: "Viande ou poulet", en: "Meat / Chicken" }, is_correct: true, points: 10 },
            { translations: { ar: "بصل", tn: "بصل", fr: "Oignon", en: "Onion" }, is_correct: true, points: 10 },
            { translations: { ar: "طماطم معجونة", tn: "طماطم حكك", fr: "Double concentré de tomate", en: "Tomato paste" }, is_correct: true, points: 10 },
            { translations: { ar: "بهارات (تابل وكروية)", tn: "تابل وكروية", fr: "Épices (Tabel & Karouia)", en: "Spices (Tabel)" }, is_correct: true, points: 10 },
            { translations: { ar: "زيت زيتون", tn: "زيت زيتون", fr: "Huile d'olive", en: "Olive oil" }, is_correct: true, points: 10 },
            { translations: { ar: "فلفل", tn: "فلفل أخضر حار", fr: "Piment", en: "Chili pepper" }, is_correct: true, points: 10 },
            { translations: { ar: "موز", tn: "بنان", fr: "Banane", en: "Banana" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 190,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنواع مختلفة من الخبز أو العجين التقليدي التونسي؟" },
            tn: { text: "أذكر 9 أنواع خبز ولا كسرة نطيبوها في تونس؟" },
            fr: { text: "Citez 9 types de pains ou pâtes traditionnels tunisiens ?" },
            en: { text: "Name 9 Tunisian traditional breads or doughs" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "خبز طابونة", tn: "خبز طابونة", fr: "Pain Tabouna", en: "Tabouna bread" }, is_correct: true, points: 10 },
            { translations: { ar: "ملاوي", tn: "ملاوي", fr: "Pain Mlaoui", en: "Mlaoui" }, is_correct: true, points: 10 },
            { translations: { ar: "كسرة", tn: "كسرة", fr: "Pain de semoule (Kesra)", en: "Kesra" }, is_correct: true, points: 10 },
            { translations: { ar: "خبز شعير", tn: "خبز شعير", fr: "Pain d'orge", en: "Barley bread (Chir)" }, is_correct: true, points: 10 },
            { translations: { ar: "خبز سميد", tn: "خبز سميد", fr: "Pain de semoule", en: "Semolina bread" }, is_correct: true, points: 10 },
            { translations: { ar: "ملاوي شواط", tn: "ملاوي شواط", fr: "Mlaoui Chwat", en: "Mlaoui Shwat" }, is_correct: true, points: 10 },
            { translations: { ar: "مطبقة", tn: "مطبقة (خبز شحم)", fr: "Mtabqa (Pain farci au gras)", en: "Mtabqa" }, is_correct: true, points: 10 },
            { translations: { ar: "ملاوي محشية", tn: "ملاوي محشية", fr: "Mlaoui farcie", en: "Stuffed Mlaoui" }, is_correct: true, points: 10 },
            { translations: { ar: "خبز دياري", tn: "خبز كوشة دياري", fr: "Pain maison (Diari)", en: "Homemade bread (Diari)" }, is_correct: true, points: 10 },
            { translations: { ar: "كريب فرنسي", tn: "كريب سوكري", fr: "Crêpe française", en: "French crepe" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 191,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 حلويات أو مكونات تستعمل في صناعة الحلويات التقليدية التونسية؟" },
            tn: { text: "أذكر 9 حلويات تونسية تقليدية ولا قطايع تع حلو؟" },
            fr: { text: "Citez 9 pâtisseries traditionnelles ou ingrédients de gâteaux tunisiens ?" },
            en: { text: "Name 9 Tunisian traditional sweets or pastry ingredients" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "غريبة", tn: "غريبة حمص", fr: "Ghrayba", en: "Ghriba" }, is_correct: true, points: 10 },
            { translations: { ar: "مقروض", tn: "مقروض القيروان", fr: "Makroudh", en: "Makroudh" }, is_correct: true, points: 10 },
            { translations: { ar: "محنشة", tn: "محنشة", fr: "Mhancha", en: "Mhancha" }, is_correct: true, points: 10 },
            { translations: { ar: "صمصة", tn: "صمصة باللوز", fr: "Samsa", en: "Samsa" }, is_correct: true, points: 10 },
            { translations: { ar: "أذن القاضي", tn: "ودنين القاضي", fr: "Oreillettes (Wdhnin el Qadi)", en: "Wdhnin el Qadbi" }, is_correct: true, points: 10 },
            { translations: { ar: "لوز", tn: "لوز مرحي", fr: "Amandes", en: "Almonds" }, is_correct: true, points: 10 },
            { translations: { ar: "جلجلان", tn: "جلجلان", fr: "Sésame (Jeljlan)", en: "Sesame (Jeljlan)" }, is_correct: true, points: 10 },
            { translations: { ar: "ماء زهر", tn: "ماء زهر مقطر", fr: "Eau de fleur d'oranger", en: "Orange blossom water" }, is_correct: true, points: 10 },
            { translations: { ar: "عسل", tn: "عسل أو شحور", fr: "Miel / Sirop", en: "Honey / Syrup" }, is_correct: true, points: 10 },
            { translations: { ar: "ملح بحري", tn: "ملح حرش", fr: "Gros sel marin", en: "Sea salt" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 192,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مشروبات تقليدية أو شعبية في تونس؟" },
            tn: { text: "أذكر 9 مشروبات ولا كيسان نشربوهم في تونس؟" },
            fr: { text: "Citez 9 boissons traditionnelles ou populaires en Tunisie ?" },
            en: { text: "Name 9 traditional drinks in Tunisia" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "تاي أحمر", tn: "تاي أحمر بالنعناع", fr: "Thé rouge", en: "Red tea" }, is_correct: true, points: 10 },
            { translations: { ar: "تاي باللوز", tn: "تاي باللوز", fr: "Thé aux amandes", en: "Tea with almonds" }, is_correct: true, points: 10 },
            { translations: { ar: "قهوة عربي بالزهر", tn: "قهوة عربي بالزهر", fr: "Café turc à la fleur d'oranger", en: "Turkish Coffee with Blossom" }, is_correct: true, points: 10 },
            { translations: { ar: "لاقمي", tn: "لاقمي صحراوي", fr: "Lagmi (Sève de palmier)", en: "Lagmi (Palm sap)" }, is_correct: true, points: 10 },
            { translations: { ar: "رُب", tn: "شراب الرُب", fr: "Rob (Sirop de dattes)", en: "Rob (Date syrup drink)" }, is_correct: true, points: 10 },
            { translations: { ar: "عصير ليموناضة", tn: "عصير ليموناضة", fr: "Citronnade tunisienne", en: "Lemonade" }, is_correct: true, points: 10 },
            { translations: { ar: "لبن", tn: "لبن دياري", fr: "Laban", en: "Laban (Buttermilk)" }, is_correct: true, points: 10 },
            { translations: { ar: "شنكول", tn: "شنكول التمر", fr: "Shankool", en: "Shankool" }, is_correct: true, points: 10 },
            { translations: { ar: "ماء ورد", tn: "ماء ورد مخفف", fr: "Boisson à l'eau de rose", en: "Rose water drink" }, is_correct: true, points: 10 },
            { translations: { ar: "زيت زيتون", tn: "زيت زيتون (كوجينة)", fr: "Huile d'olive (pure)", en: "Olive oil" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 193,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أزياء أو ملابس تقليدية تونسية؟" },
            tn: { text: "أذكر 9 لبسات تقليدية تونسية معروفة؟" },
            fr: { text: "Citez 9 habits traditionnels tunisiens ?" },
            en: { text: "Name 9 traditional Tunisian garments or outfits" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "جبة", tn: "جبة تونسية", fr: "Jebba", en: "Jebba" }, is_correct: true, points: 10 },
            { translations: { ar: "شاشية", tn: "شاشية حمراء", fr: "Chéchia", en: "Chechia" }, is_correct: true, points: 10 },
            { translations: { ar: "برنوس", tn: "برنوس صوف", fr: "Burnous", en: "Burnous" }, is_correct: true, points: 10 },
            { translations: { ar: "سفساري", tn: "سفساري حرير", fr: "Sefseri", en: "Sefseri" }, is_correct: true, points: 10 },
            { translations: { ar: "كعب كدرون", tn: "كدرون", fr: "Kadroun", en: "Kadroun" }, is_correct: true, points: 10 },
            { translations: { ar: "قفطان", tn: "قفطان مطرز", fr: "Caftan", en: "Kaftan" }, is_correct: true, points: 10 },
            { translations: { ar: "مريول فضيلة", tn: "مريول فضيلة", fr: "Meryoul Fadhila", en: "Meryoul Fadhila" }, is_correct: true, points: 10 },
            { translations: { ar: "فرملة", tn: "فرملة مطرزة بالخيط", fr: "Farmla", en: "Farmla" }, is_correct: true, points: 10 },
            { translations: { ar: "دنكري", tn: "دنكري أزرق", fr: "Dengri (Bleu de travail)", en: "Dengri" }, is_correct: true, points: 10 },
            { translations: { ar: "جينز ممزق", tn: "سروال جينز مقطع", fr: "Jean déchiré", en: "Ripped jeans" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 194,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 قطع من جهاز أو أزياء العروس التونسية في حفل زفافها؟" },
            tn: { text: "أذكر 9 حاجات وجهاز تهزهم العروسة التونسية؟" },
            fr: { text: "Citez 9 éléments du trousseau ou des robes de la mariée tunisienne ?" },
            en: { text: "Name 9 items of a Tunisian bride's trousseau/outfits" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "سفساري", tn: "سفساري حرير", fr: "Sefseri", en: "Sefseri" }, is_correct: true, points: 10 },
            { translations: { ar: "قفطان", tn: "قفطان العرس", fr: "Caftan", en: "Kaftan" }, is_correct: true, points: 10 },
            { translations: { ar: "فستان الحنة", tn: "كسوة الحنة", fr: "Robe de Henné", en: "Henna dress" }, is_correct: true, points: 10 },
            { translations: { ar: "طاقية الذهب", tn: "طاقية ذهب", fr: "Takia en or / Couronne", en: "Gold tiara (Takia)" }, is_correct: true, points: 10 },
            { translations: { ar: "رداء حرير", tn: "رداء حرير", fr: "Rida en soie", en: "Silk wrap (Rida)" }, is_correct: true, points: 10 },
            { translations: { ar: "فرملة مطرزة", tn: "فرملة مطرزة بالكنتيل", fr: "Farmla brodée", en: "Embroidered Farmla" }, is_correct: true, points: 10 },
            { translations: { ar: "بلوزة", tn: "بلوزة تونسية", fr: "Blousa", en: "Blousa (Blouse)" }, is_correct: true, points: 10 },
            { translations: { ar: "كونتيل", tn: "كنتيل / سمس", fr: "Fils de Kentil", en: "Gold thread (Kentil)" }, is_correct: true, points: 10 },
            { translations: { ar: "حذاء مطرز", tn: "بلغة مطرزة / بلغة العرس", fr: "Babouches brodées", en: "Embroidered slippers" }, is_correct: true, points: 10 },
            { translations: { ar: "بدلة غوص", tn: "حوايج غطس", fr: "Combinaison de plongée", en: "Diving suit" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 195,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كلمات أو عبارات في اللهجة التونسية تعني جيد أو جميل؟" },
            tn: { text: "أذكر 9 كلمات بالتونسي تعني حاجة باهية ولا مزيانة؟" },
            fr: { text: "Citez 9 mots ou expressions tunisiennes signifiant 'bon' ou 'beau' ?" },
            en: { text: "Name 9 words or expressions in the Tunisian dialect meaning 'good' or 'beautiful'" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "باهي", tn: "باهي", fr: "Bahi", en: "Bahi (Good)" }, is_correct: true, points: 10 },
            { translations: { ar: "تحفون", tn: "تحفون", fr: "Tahfoun", en: "Tahfoun (Nice)" }, is_correct: true, points: 10 },
            { translations: { ar: "مزيان", tn: "مزيان", fr: "Mzyan", en: "Mzyan (Beautiful)" }, is_correct: true, points: 10 },
            { translations: { ar: "بنين", tn: "بنين", fr: "Bnin", en: "Bnin (Tasty)" }, is_correct: true, points: 10 },
            { translations: { ar: "طيارة", tn: "طيارة", fr: "Tayara", en: "Tayara (Awesome)" }, is_correct: true, points: 10 },
            { translations: { ar: "يعطيك الصحة", tn: "يعطيك الصحة", fr: "Yatik es-Saha", en: "Yatik es-Saha" }, is_correct: true, points: 10 },
            { translations: { ar: "يفتق", tn: "يفتق", fr: "Yfataq", en: "Yfataq (Stunning)" }, is_correct: true, points: 10 },
            { translations: { ar: "سمح", tn: "سمح", fr: "Samh", en: "Samh (Pleasant)" }, is_correct: true, points: 10 },
            { translations: { ar: "على محلاه", tn: "على محلاه", fr: "Ala mahleh", en: "Ala mahleh (So sweet)" }, is_correct: true, points: 10 },
            { translations: { ar: "خايب", tn: "خايب", fr: "Khayeb", en: "Khayeb (Bad)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 196,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 كلمات أو عبارات تُستعمل للتعبير عن المفاجأة أو الحماس باللهجة التونسية؟" },
            tn: { text: "أذكر 9 كلمات للتعبير عن المفاجأة ولا التعجب بالتونسي؟" },
            fr: { text: "Citez 9 expressions de surprise ou d'enthousiasme en dialecte tunisien ?" },
            en: { text: "Name 9 words used to express surprise or excitement in Tunisian dialect" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Languages & Dialects",
        answers: [
            { translations: { ar: "واو", tn: "واو", fr: "Wow", en: "Wow" }, is_correct: true, points: 10 },
            { translations: { ar: "يا ولدي", tn: "يا ولدي", fr: "Ya waldi", en: "Ya waldi (My son/bro)" }, is_correct: true, points: 10 },
            { translations: { ar: "ملا وحلة", tn: "ملا وحلة", fr: "Malla wahla", en: "Malla wahla (What a mess)" }, is_correct: true, points: 10 },
            { translations: { ar: "ملا فازة", tn: "ملا فازة", fr: "Malla faza", en: "Malla faza (What a trick)" }, is_correct: true, points: 10 },
            { translations: { ar: "ملا جو", tn: "ملا جو", fr: "Malla jaw", en: "Malla jaw (What a vibe)" }, is_correct: true, points: 10 },
            { translations: { ar: "يعطيك دودة", tn: "يعطيك دودة", fr: "Yatik douda", en: "Yatik douda (friendly shock)" }, is_correct: true, points: 10 },
            { translations: { ar: "يا لطيف", tn: "يا لطيف", fr: "Ya latif", en: "Ya latif" }, is_correct: true, points: 10 },
            { translations: { ar: "غريبة", tn: "غريبة", fr: "Ghariba", en: "Ghariba (Strange)" }, is_correct: true, points: 10 },
            { translations: { ar: "برجولية", tn: "برجولية", fr: "Berjoulya", en: "Berjoulya (Honestly)" }, is_correct: true, points: 10 },
            { translations: { ar: "نعم", tn: "نعم (إجابة)", fr: "Naam", en: "Naam (Yes)" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 197,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 مساجد تاريخية أو معالم دينية بارزة في تونس؟" },
            tn: { text: "أذكر 9 جوامع تاريخية أو معالم دينية في تونس؟" },
            fr: { text: "Citez 9 mosquées historiques ou sites religieux en Tunisie ?" },
            en: { text: "Name 9 historical mosques or religious sites in Tunisia" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "جامع عقبة بن نافع", tn: "جامع عقبة بن نافع", fr: "Grande Mosquée de Kairouan", en: "Uqba Mosque (Kairouan)" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع الزيتونة", tn: "جامع الزيتونة", fr: "Mosquée Ez-Zitouna", en: "Zitouna Mosque (Tunis)" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع بورقيبة", tn: "جامع بورقيبة بالمنستير", fr: "Mosquée Bourguiba", en: "Bourguiba Mosque" }, is_correct: true, points: 10 },
            { translations: { ar: "مقام أبي زمعة البلوي", tn: "سيد الصاحبي (القيروان)", fr: "Mausolée d'Abu Zamaa al-Balawi", en: "Abu Zamaa al-Balawi" }, is_correct: true, points: 10 },
            { translations: { ar: "مقام سيدي بوسعيد", tn: "مقام سيدي بوسعيد الباجي", fr: "Mausolée de Sidi Bou Saïd", en: "Sidi Bou Said mausoleum" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع المهدية الكبير", tn: "جامع المهدية الكبير", fr: "Grande Mosquée de Mahdia", en: "Great Mosque of Mahdia" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع فضلون بجربة", tn: "جامع فضلون", fr: "Mosquée Fadhloun (Djerba)", en: "Fadhloun Mosque" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع سنان باشا", tn: "جامع سنان باشا", fr: "Mosquée Sinan Pacha", en: "Sinan Pasha Mosque" }, is_correct: true, points: 10 },
            { translations: { ar: "جامع صاحب الطابع", tn: "جامع صاحب الطابع", fr: "Mosquée Saheb Ettabaâ", en: "Saheb Ettabaa Mosque" }, is_correct: true, points: 10 },
            { translations: { ar: "المسجد الأزرق", tn: "الجامع الأزرق (تركيا)", fr: "Mosquée bleue", en: "Blue Mosque" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 198,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أشهر هجرية إسلامية؟" },
            tn: { text: "أذكر 9 أشهر هجرية معروفة؟" },
            fr: { text: "Citez 9 mois du calendrier hégirien (islamique) ?" },
            en: { text: "Name 9 Islamic months" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "رمضان", tn: "رمضان", fr: "Ramadan", en: "Ramadan" }, is_correct: true, points: 10 },
            { translations: { ar: "شوال", tn: "شوال", fr: "Shawwal", en: "Shawwal" }, is_correct: true, points: 10 },
            { translations: { ar: "ذو الحجة", tn: "ذو الحجة", fr: "Dhu al-Hijjah", en: "Dhu al-Hijjah" }, is_correct: true, points: 10 },
            { translations: { ar: "ذو القعدة", tn: "ذو القعدة", fr: "Dhu al-Qadah", en: "Dhu al-Qadah" }, is_correct: true, points: 10 },
            { translations: { ar: "محرم", tn: "محرم", fr: "Muharram", en: "Muharram" }, is_correct: true, points: 10 },
            { translations: { ar: "صفر", tn: "صفر", fr: "Safar", en: "Safar" }, is_correct: true, points: 10 },
            { translations: { ar: "ربيع الأول", tn: "ربيع الأول", fr: "Rabi al-Awwal", en: "Rabi al-Awwal" }, is_correct: true, points: 10 },
            { translations: { ar: "رجب", tn: "رجب", fr: "Rajab", en: "Rajab" }, is_correct: true, points: 10 },
            { translations: { ar: "شعبان", tn: "شعبان", fr: "Sha'ban", en: "Sha'ban" }, is_correct: true, points: 10 },
            { translations: { ar: "جانفي", tn: "جانفي / جانوير", fr: "Janvier", en: "January" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 199,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 أنبياء ورسل ذُكرت أسماؤهم في القرآن الكريم؟" },
            tn: { text: "أذكر 9 أنبياء تذكرت أساميهم في القرآن؟" },
            fr: { text: "Citez 9 prophètes mentionnés dans le Coran ?" },
            en: { text: "Name 9 Islamic prophets mentioned in the Quran" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "محمد", tn: "سيدنا محمد", fr: "Mahomet", en: "Muhammad" }, is_correct: true, points: 10 },
            { translations: { ar: "إبراهيم", tn: "سيدنا إبراهيم", fr: "Abraham", en: "Abraham" }, is_correct: true, points: 10 },
            { translations: { ar: "موسى", tn: "سيدنا موسى", fr: "Moïse", en: "Moses" }, is_correct: true, points: 10 },
            { translations: { ar: "عيسى", tn: "سيدنا عيسى", fr: "Jésus", en: "Jesus" }, is_correct: true, points: 10 },
            { translations: { ar: "نوح", tn: "سيدنا نوح", fr: "Noé", en: "Noah" }, is_correct: true, points: 10 },
            { translations: { ar: "يوسف", tn: "سيدنا يوسف", fr: "Joseph", en: "Joseph" }, is_correct: true, points: 10 },
            { translations: { ar: "آدم", tn: "سيدنا آدم", fr: "Adam", en: "Adam" }, is_correct: true, points: 10 },
            { translations: { ar: "سليمان", tn: "سيدنا سليمان", fr: "Salomon", en: "Solomon" }, is_correct: true, points: 10 },
            { translations: { ar: "داوود", tn: "سيدنا داوود", fr: "David", en: "David" }, is_correct: true, points: 10 },
            { translations: { ar: "أرسطو", tn: "أرسطو الفيلسوف", fr: "Aristote", en: "Aristotle" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 200,
        is_approved: true,
        translations: {
            ar: { text: "أذكر 9 فضائل أو أخلاق حميدة حثت عليها الفلسفة والتعاليم الإسلامية؟" },
            tn: { text: "أذكر 9 أخلاق باهية وفضائل في الإسلام؟" },
            fr: { text: "Citez 9 vertus ou valeurs morales dans la philosophie islamique ?" },
            en: { text: "Name 9 virtues or morals in Islamic philosophy" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "الصدق", tn: "الصدق", fr: "Honnêteté / Vérité", en: "Honesty / Truthfulness" }, is_correct: true, points: 10 },
            { translations: { ar: "الأمانة", tn: "الأمانة", fr: "Fidélité / Dépôt", en: "Trustworthiness" }, is_correct: true, points: 10 },
            { translations: { ar: "الكرم", tn: "الكرم", fr: "Générosité", en: "Generosity" }, is_correct: true, points: 10 },
            { translations: { ar: "الصبر", tn: "الصبر", fr: "Patience", en: "Patience" }, is_correct: true, points: 10 },
            { translations: { ar: "التسامح", tn: "التسامح", fr: "Tolérance", en: "Tolerance / Forgiveness" }, is_correct: true, points: 10 },
            { translations: { ar: "العدل", tn: "العدل", fr: "Justice", en: "Justice" }, is_correct: true, points: 10 },
            { translations: { ar: "الرحمة", tn: "الرحمة", fr: "Miséricorde", en: "Mercy / Compassion" }, is_correct: true, points: 10 },
            { translations: { ar: "التواضع", tn: "التواضع", fr: "Humilité", en: "Humility" }, is_correct: true, points: 10 },
            { translations: { ar: "الوفاء بالعهد", tn: "الوفاء بالعهد", fr: "Respect des promesses", en: "Keeping promises" }, is_correct: true, points: 10 },
            { translations: { ar: "الطمع", tn: "الطمع والسرقة", fr: "Cupidité / Avarice", en: "Greed" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 201,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كواكب في سبيستون؟" },
            tn: { text: "أذكر 9 كواكب سبيستون؟" },
            fr: { text: "Citez 9 planètes de Spacetoon ?" },
            en: { text: "Name 9 planets in Spacetoon" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "أكشن", tn: "أكشن", fr: "Action", en: "Action" }, is_correct: true, points: 10 },
            { translations: { ar: "مغامرات", tn: "مغامرات", fr: "Adventures", en: "Adventures" }, is_correct: true, points: 10 },
            { translations: { ar: "رياضة", tn: "رياضة", fr: "Sport", en: "Sport" }, is_correct: true, points: 10 },
            { translations: { ar: "زمردة", tn: "زمردة", fr: "Zomoroda", en: "Zomoroda" }, is_correct: true, points: 20 },
            { translations: { ar: "تاريخ", tn: "تاريخ", fr: "History", en: "History" }, is_correct: true, points: 20 },
            { translations: { ar: "علوم", tn: "علوم", fr: "Science", en: "Science" }, is_correct: true, points: 20 },
            { translations: { ar: "أبجد", tn: "أبجد", fr: "Abjad", en: "Abjad" }, is_correct: true, points: 30 },
            { translations: { ar: "كوميديا", tn: "كوميديا", fr: "Comedy", en: "Comedy" }, is_correct: true, points: 30 },
            { translations: { ar: "بون بونا", tn: "بون بونا", fr: "Bonbona", en: "Bonbona" }, is_correct: true, points: 30 },
            { translations: { ar: "عطارد", tn: "عطارد", fr: "Mercure", en: "Mercury" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 202,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كلمات من أغنية شارة هزيم الرعد؟" },
            tn: { text: "أذكر 9 كلمات من غناية هزيم الرعد؟" },
            fr: { text: "Citez 9 mots de la chanson d'ouverture de Hazim El Ra3d ?" },
            en: { text: "Name 9 words from Hazim El Ra3d opening song" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "هزيم", tn: "هزيم", fr: "Hazim", en: "Hazim" }, is_correct: true, points: 10 },
            { translations: { ar: "الرعد", tn: "الرعد", fr: "El Ra3d", en: "El Ra3d" }, is_correct: true, points: 10 },
            { translations: { ar: "أبرق", tn: "أبرق", fr: "Eclair", en: "Flash" }, is_correct: true, points: 10 },
            { translations: { ar: "أرعد", tn: "أرعد", fr: "Tonnerre", en: "Thunder" }, is_correct: true, points: 20 },
            { translations: { ar: "البطل", tn: "البطل", fr: "Héros", en: "Hero" }, is_correct: true, points: 20 },
            { translations: { ar: "الغضب", tn: "الغضب", fr: "Colère", en: "Anger" }, is_correct: true, points: 20 },
            { translations: { ar: "الساحة", tn: "الساحة", fr: "Arène", en: "Arena" }, is_correct: true, points: 30 },
            { translations: { ar: "الفضاء", tn: "الفضاء", fr: "Espace", en: "Space" }, is_correct: true, points: 30 },
            { translations: { ar: "البركان", tn: "البركان", fr: "Volcan", en: "Volcano" }, is_correct: true, points: 30 },
            { translations: { ar: "البحر", tn: "البحر", fr: "Mer", en: "Sea" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 203,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كلمات من أغنية شارة القناص العربي؟" },
            tn: { text: "أذكر 9 كلمات من غناية القناص؟" },
            fr: { text: "Citez 9 mots de la chanson d'ouverture de Hunter x Hunter (arabe) ?" },
            en: { text: "Name 9 words from Arabic Hunter x Hunter opening song" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "قد لمعت", tn: "قد لمعت", fr: "A brillé", en: "Shined" }, is_correct: true, points: 10 },
            { translations: { ar: "عيناه", tn: "عيناه", fr: "Ses yeux", en: "His eyes" }, is_correct: true, points: 10 },
            { translations: { ar: "بالعزم", tn: "بالعزم", fr: "Détermination", en: "Determination" }, is_correct: true, points: 10 },
            { translations: { ar: "انتفضت", tn: "انتفضت", fr: "S'est levé", en: "Rose" }, is_correct: true, points: 20 },
            { translations: { ar: "يمناه", tn: "يمناه", fr: "Sa main droite", en: "His right hand" }, is_correct: true, points: 20 },
            { translations: { ar: "خوف", tn: "خوف", fr: "Peur", en: "Fear" }, is_correct: true, points: 20 },
            { translations: { ar: "صديقا", tn: "صديقا", fr: "Ami", en: "Friend" }, is_correct: true, points: 30 },
            { translations: { ar: "القناص", tn: "القناص", fr: "Chasseur", en: "Hunter" }, is_correct: true, points: 30 },
            { translations: { ar: "صعب", tn: "صعب", fr: "Difficile", en: "Difficult" }, is_correct: true, points: 30 },
            { translations: { ar: "المستقبل", tn: "المستقبل", fr: "Futur", en: "Future" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 204,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات من مسلسل المحقق كونان؟" },
            tn: { text: "أذكر 9 شخصيات من كونان؟" },
            fr: { text: "Citez 9 personnages de Detective Conan ?" },
            en: { text: "Name 9 characters from Detective Conan" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "كونان", tn: "كونان", fr: "Conan", en: "Conan" }, is_correct: true, points: 10 },
            { translations: { ar: "ران", tn: "ران", fr: "Ran", en: "Ran" }, is_correct: true, points: 10 },
            { translations: { ar: "توغو", tn: "توغو", fr: "Kogoro", en: "Kogoro" }, is_correct: true, points: 10 },
            { translations: { ar: "سينشي", tn: "سينشي", fr: "Shinichi", en: "Shinichi" }, is_correct: true, points: 20 },
            { translations: { ar: "هايبرا", tn: "هايبرا", fr: "Haibara", en: "Haibara" }, is_correct: true, points: 20 },
            { translations: { ar: "أغاسا", tn: "أغاسا", fr: "Agasa", en: "Agasa" }, is_correct: true, points: 20 },
            { translations: { ar: "جينتا", tn: "جينتا", fr: "Genta", en: "Genta" }, is_correct: true, points: 30 },
            { translations: { ar: "ميتسو", tn: "ميتسو", fr: "Mitsuhiko", en: "Mitsuhiko" }, is_correct: true, points: 30 },
            { translations: { ar: "أيومي", tn: "أيومي", fr: "Ayumi", en: "Ayumi" }, is_correct: true, points: 30 },
            { translations: { ar: "ناروتو", tn: "ناروتو", fr: "Naruto", en: "Naruto" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 205,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات من دراغون بول؟" },
            tn: { text: "أذكر 9 شخصيات من دراغون بول؟" },
            fr: { text: "Citez 9 personnages de Dragon Ball ?" },
            en: { text: "Name 9 characters from Dragon Ball" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "غوكو", tn: "غوكو", fr: "Goku", en: "Goku" }, is_correct: true, points: 10 },
            { translations: { ar: "فيجيتا", tn: "فيجيتا", fr: "Vegeta", en: "Vegeta" }, is_correct: true, points: 10 },
            { translations: { ar: "غوهان", tn: "غوهان", fr: "Gohan", en: "Gohan" }, is_correct: true, points: 10 },
            { translations: { ar: "بيكولو", tn: "بيكولو", fr: "Piccolo", en: "Piccolo" }, is_correct: true, points: 20 },
            { translations: { ar: "كريلين", tn: "كريلين", fr: "Krillin", en: "Krillin" }, is_correct: true, points: 20 },
            { translations: { ar: "بولما", tn: "بولما", fr: "Bulma", en: "Bulma" }, is_correct: true, points: 20 },
            { translations: { ar: "فريزا", tn: "فريزا", fr: "Frieza", en: "Frieza" }, is_correct: true, points: 30 },
            { translations: { ar: "سيل", tn: "سيل", fr: "Cell", en: "Cell" }, is_correct: true, points: 30 },
            { translations: { ar: "ماجين بو", tn: "ماجين بو", fr: "Majin Buu", en: "Majin Buu" }, is_correct: true, points: 30 },
            { translations: { ar: "ساسوكي", tn: "ساسوكي", fr: "Sasuke", en: "Sasuke" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 206,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كلمات من شارة ريمي؟" },
            tn: { text: "أذكر 9 كلمات من غناية ريمي؟" },
            fr: { text: "Citez 9 mots de la chanson d'ouverture de Remi ?" },
            en: { text: "Name 9 words from Remi opening song" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "أمي", tn: "أمي", fr: "Mère", en: "Mother" }, is_correct: true, points: 10 },
            { translations: { ar: "أنت الأمان", tn: "أنت الأمان", fr: "Sécurité", en: "Security" }, is_correct: true, points: 10 },
            { translations: { ar: "حبي", tn: "حبي", fr: "Mon amour", en: "My love" }, is_correct: true, points: 10 },
            { translations: { ar: "يرعاك", tn: "يرعاك", fr: "Te protège", en: "Protects you" }, is_correct: true, points: 20 },
            { translations: { ar: "الزمان", tn: "الزمان", fr: "Le temps", en: "Time" }, is_correct: true, points: 20 },
            { translations: { ar: "خطاي", tn: "خطاي", fr: "Mes pas", en: "My steps" }, is_correct: true, points: 20 },
            { translations: { ar: "دربي", tn: "دربي", fr: "Mon chemin", en: "My path" }, is_correct: true, points: 30 },
            { translations: { ar: "حنان", tn: "حنان", fr: "Tendresse", en: "Tenderness" }, is_correct: true, points: 30 },
            { translations: { ar: "القلب", tn: "القلب", fr: "Le coeur", en: "The heart" }, is_correct: true, points: 30 },
            { translations: { ar: "المستشفى", tn: "المستشفى", fr: "Hôpital", en: "Hospital" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 207,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كلمات من شارة أبطال الديجيتال؟" },
            tn: { text: "أذكر 9 كلمات من غناية أبطال الديجيتال؟" },
            fr: { text: "Citez 9 mots de la chanson d'ouverture de Digimon (arabe) ?" },
            en: { text: "Name 9 words from Digimon opening song" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "أبطال", tn: "أبطال", fr: "Héros", en: "Heroes" }, is_correct: true, points: 10 },
            { translations: { ar: "الديجيتال", tn: "الديجيتال", fr: "Digital", en: "Digital" }, is_correct: true, points: 10 },
            { translations: { ar: "نادينا", tn: "نادينا", fr: "Nous appelle", en: "Calls us" }, is_correct: true, points: 10 },
            { translations: { ar: "عالم", tn: "عالم", fr: "Monde", en: "World" }, is_correct: true, points: 20 },
            { translations: { ar: "الغموض", tn: "الغموض", fr: "Mystère", en: "Mystery" }, is_correct: true, points: 20 },
            { translations: { ar: "خطواتنا", tn: "خطواتنا", fr: "Nos pas", en: "Our steps" }, is_correct: true, points: 20 },
            { translations: { ar: "الأمل", tn: "الأمل", fr: "Espoir", en: "Hope" }, is_correct: true, points: 30 },
            { translations: { ar: "شجاع", tn: "شجاع", fr: "Courageux", en: "Courageous" }, is_correct: true, points: 30 },
            { translations: { ar: "المرسى", tn: "المرسى", fr: "Port", en: "Port" }, is_correct: true, points: 30 },
            { translations: { ar: "السراب", tn: "السراب", fr: "Mirage", en: "Mirage" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 208,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات من مسلسل عهد الأصدقاء؟" },
            tn: { text: "أذكر 9 شخصيات من عهد الأصدقاء؟" },
            fr: { text: "Citez 9 personnages de Romeo's Blue Skies ?" },
            en: { text: "Name 9 characters from Romeo's Blue Skies" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "روميو", tn: "روميو", fr: "Romeo", en: "Romeo" }, is_correct: true, points: 10 },
            { translations: { ar: "ألفريدو", tn: "ألفريدو", fr: "Alfredo", en: "Alfredo" }, is_correct: true, points: 10 },
            { translations: { ar: "بيانكا", tn: "بيانكا", fr: "Bianca", en: "Bianca" }, is_correct: true, points: 10 },
            { translations: { ar: "آنجي", tn: "آنجي", fr: "Ange", en: "Ange" }, is_correct: true, points: 20 },
            { translations: { ar: "نيكيتا", tn: "نيكيتا", fr: "Nikita", en: "Nikita" }, is_correct: true, points: 20 },
            { translations: { ar: "جوفاني", tn: "جوفاني", fr: "Giovanni", en: "Giovanni" }, is_correct: true, points: 20 },
            { translations: { ar: "دانتي", tn: "دانتي", fr: "Dante", en: "Dante" }, is_correct: true, points: 30 },
            { translations: { ar: "ليني", tn: "ليني", fr: "Lenni", en: "Lenni" }, is_correct: true, points: 30 },
            { translations: { ar: "روسي", tn: "روسي", fr: "Rossi", en: "Rossi" }, is_correct: true, points: 30 },
            { translations: { ar: "كابتن ماجد", tn: "كابتن ماجد", fr: "Olivier", en: "Captain Tsubasa" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 209,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات من مسلسل مغامرات الرنة بابار؟" },
            tn: { text: "أذكر 9 شخصيات من بابار الفيل؟" },
            fr: { text: "Citez 9 personnages de Babar ?" },
            en: { text: "Name 9 characters from Babar" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "بابار", tn: "بابار", fr: "Babar", en: "Babar" }, is_correct: true, points: 10 },
            { translations: { ar: "سيلست", tn: "سيلست", fr: "Celeste", en: "Celeste" }, is_correct: true, points: 10 },
            { translations: { ar: "آرثر", tn: "آرثر", fr: "Arthur", en: "Arthur" }, is_correct: true, points: 10 },
            { translations: { ar: "بوم", tn: "بوم", fr: "Pom", en: "Pom" }, is_correct: true, points: 20 },
            { translations: { ar: "فلور", tn: "فلور", fr: "Flore", en: "Flore" }, is_correct: true, points: 20 },
            { translations: { ar: "ألكسندر", tn: "ألكسندر", fr: "Alexandre", en: "Alexandre" }, is_correct: true, points: 20 },
            { translations: { ar: "إيزابيل", tn: "إيزابيل", fr: "Isabelle", en: "Isabelle" }, is_correct: true, points: 30 },
            { translations: { ar: "كورنليوس", tn: "كورنليوس", fr: "Cornelius", en: "Cornelius" }, is_correct: true, points: 30 },
            { translations: { ar: "زفير", tn: "زفير", fr: "Zephir", en: "Zephir" }, is_correct: true, points: 30 },
            { translations: { ar: "سندباد", tn: "سندباد", fr: "Sinbad", en: "Sinbad" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 210,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مسلسلات من كوكب مغامرات؟" },
            tn: { text: "أذكر 9 مسلسلات من مغامرات سبيستون؟" },
            fr: { text: "Citez 9 animes de la planète Aventures de Spacetoon ?" },
            en: { text: "Name 9 shows from Spacetoon Planet Adventures" }
        },
        category: "Entertainment",
        subcategory: "anime",
        answers: [
            { translations: { ar: "سندباد", tn: "سندباد", fr: "Sinbad", en: "Sinbad" }, is_correct: true, points: 10 },
            { translations: { ar: "باتمان", tn: "باتمان", fr: "Batman", en: "Batman" }, is_correct: true, points: 10 },
            { translations: { ar: "المحقق كونان", tn: "كونان", fr: "Détective Conan", en: "Detective Conan" }, is_correct: true, points: 10 },
            { translations: { ar: "داي الشجاع", tn: "داي", fr: "Fly", en: "Dragon Quest" }, is_correct: true, points: 20 },
            { translations: { ar: "أجنحة كاندام", tn: "كاندام", fr: "Gundam Wing", en: "Gundam Wing" }, is_correct: true, points: 20 },
            { translations: { ar: "عهد الأصدقاء", tn: "عهد الأصدقاء", fr: "Romeo", en: "Romeo's Blue Skies" }, is_correct: true, points: 20 },
            { translations: { ar: "جزيرة الكنز", tn: "جزيرة الكنز", fr: "Ile au trésor", en: "Treasure Island" }, is_correct: true, points: 30 },
            { translations: { ar: "بابار", tn: "بابار الفيل", fr: "Babar", en: "Babar" }, is_correct: true, points: 30 },
            { translations: { ar: "ريمي", tn: "ريمي", fr: "Remi", en: "Remi" }, is_correct: true, points: 30 },
            { translations: { ar: "سوبر شوتر", tn: "سوبر شوتر", fr: "Super Shooter", en: "Super Shooter" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 211,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنواع من الخبز التقليدي التونسي؟" },
            tn: { text: "أذكر 9 أنواع خبز تونسي تقليدي؟" },
            fr: { text: "Citez 9 types de pain traditionnel tunisien ?" },
            en: { text: "Name 9 types of traditional Tunisian bread" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "طابونة", tn: "خبز طابونة", fr: "Pain Tabouna", en: "Tabouna bread" }, is_correct: true, points: 10 },
            { translations: { ar: "ملاوي", tn: "خبز ملاوي", fr: "Pain Mlaoui", en: "Mlaoui bread" }, is_correct: true, points: 10 },
            { translations: { ar: "كسرة", tn: "خبز كسرة", fr: "Pain Kesra", en: "Kesra bread" }, is_correct: true, points: 10 },
            { translations: { ar: "خبز ديار", tn: "خبز ديار", fr: "Pain de maison", en: "Home bread" }, is_correct: true, points: 20 },
            { translations: { ar: "مبسس", tn: "خبز مبسس", fr: "Pain Mbesses", en: "Mbesses bread" }, is_correct: true, points: 20 },
            { translations: { ar: "مطاليع", tn: "مطاليع", fr: "Pain Mtaliah", en: "Mtaliah bread" }, is_correct: true, points: 20 },
            { translations: { ar: "بشمات", tn: "بشمات", fr: "Bchmat (biscotte)", en: "Bchmat (rusk)" }, is_correct: true, points: 30 },
            { translations: { ar: "خبز قمح", tn: "خبز قمح", fr: "Pain complet de blé", en: "Whole wheat bread" }, is_correct: true, points: 30 },
            { translations: { ar: "خبز شعير", tn: "خبز شعير", fr: "Pain d'orge", en: "Barley bread" }, is_correct: true, points: 30 },
            { translations: { ar: "باغيت فرنسي", tn: "باغيت فرنسي", fr: "Baguette française", en: "French baguette" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 212,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنواع من الحلويات التونسية التقليدية؟" },
            tn: { text: "أذكر 9 أنواع حلو عربي تونسي؟" },
            fr: { text: "Citez 9 types de pâtisseries traditionnelles tunisiennes ?" },
            en: { text: "Name 9 traditional Tunisian sweets/pastries" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "بقلاوة", tn: "بقلاوة", fr: "Baklawa", en: "Baklawa" }, is_correct: true, points: 10 },
            { translations: { ar: "مقروض", tn: "مقروض", fr: "Makroudh", en: "Makroudh" }, is_correct: true, points: 10 },
            { translations: { ar: "غريبة", tn: "غريبة", fr: "Ghraiba", en: "Ghraiba" }, is_correct: true, points: 10 },
            { translations: { ar: "بمبالوني", tn: "بمبالوني", fr: "Bambalouni", en: "Bambalouni" }, is_correct: true, points: 20 },
            { translations: { ar: "يويو", tn: "يويو", fr: "Yo-yo", en: "Yo-yo" }, is_correct: true, points: 20 },
            { translations: { ar: "سامسة", tn: "سامسة", fr: "Samsa", en: "Samsa" }, is_correct: true, points: 20 },
            { translations: { ar: "زلابية", tn: "زلابية", fr: "Zlabia", en: "Zlabia" }, is_correct: true, points: 30 },
            { translations: { ar: "مخارق", tn: "مخارق", fr: "Mkharek", en: "Mkharek" }, is_correct: true, points: 30 },
            { translations: { ar: "ودنين القاضي", tn: "ودنين القاضي", fr: "Oreilles du juge", en: "Oreilles du juge" }, is_correct: true, points: 30 },
            { translations: { ar: "كرواسون", tn: "كرواسون", fr: "Croissant", en: "Croissant" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 213,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مكونات تُستخدم في إعداد الهريسة التونسية؟" },
            tn: { text: "أذكر 9 مكونات للهريسة التونسية؟" },
            fr: { text: "Citez 9 ingrédients utilisés dans la harissa tunisienne ?" },
            en: { text: "Name 9 ingredients used in Tunisian Harissa" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "فلفل أحمر شايح", tn: "فلفل شايح", fr: "Piment rouge séché", en: "Dried red chili" }, is_correct: true, points: 10 },
            { translations: { ar: "ثوم", tn: "ثوم", fr: "Ail", en: "Garlic" }, is_correct: true, points: 10 },
            { translations: { ar: "تابل", tn: "تابل", fr: "Coriandre", en: "Coriander" }, is_correct: true, points: 10 },
            { translations: { ar: "كروية", tn: "كروية", fr: "Carvi", en: "Caraway" }, is_correct: true, points: 20 },
            { translations: { ar: "زيت زيتون", tn: "زيت زيتون", fr: "Huile d'olive", en: "Olive oil" }, is_correct: true, points: 20 },
            { translations: { ar: "ملح", tn: "ملح", fr: "Sel", en: "Salt" }, is_correct: true, points: 20 },
            { translations: { ar: "كمون", tn: "كمون", fr: "Cumin", en: "Cumin" }, is_correct: true, points: 30 },
            { translations: { ar: "قارص", tn: "قارص", fr: "Citron", en: "Lemon juice" }, is_correct: true, points: 30 },
            { translations: { ar: "طماطم معجونة", tn: "طماطم معجونة", fr: "Double concentré de tomate", en: "Tomato paste" }, is_correct: true, points: 30 },
            { translations: { ar: "سكر", tn: "سكر", fr: "Sucre", en: "Sucre" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 214,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنواع من الأسماك الشائعة في الأسواق التونسية؟" },
            tn: { text: "أذكر 9 حوت تلقاه في المارشي في تونس؟" },
            fr: { text: "Citez 9 espèces de poissons courantes dans les marchés tunisiens ?" },
            en: { text: "Name 9 fish species common in Tunisian markets" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "وراطة", tn: "وراطة", fr: "Dorade", en: "Dorade" }, is_correct: true, points: 10 },
            { translations: { ar: "قاروص", tn: "قاروص", fr: "Loup de mer (Bar)", en: "Sea bass" }, is_correct: true, points: 10 },
            { translations: { ar: "تريليا", tn: "تريليا", fr: "Rouget", en: "Red mullet" }, is_correct: true, points: 10 },
            { translations: { ar: "سردينة", tn: "سردينة", fr: "Sardine", en: "Sardine" }, is_correct: true, points: 20 },
            { translations: { ar: "سكومري", tn: "سكومري", fr: "Maquereau", en: "Mackerel" }, is_correct: true, points: 20 },
            { translations: { ar: "نزلي", tn: "نزلي", fr: "Merlan", en: "Whiting" }, is_correct: true, points: 20 },
            { translations: { ar: "منستيري", tn: "منستيري", fr: "Sole", en: "Sole" }, is_correct: true, points: 30 },
            { translations: { ar: "سبار", tn: "سبار", fr: "Sparaillon", en: "Sparus" }, is_correct: true, points: 30 },
            { translations: { ar: "سوبيا", tn: "سوبيا", fr: "Seiche", en: "Cuttlefish" }, is_correct: true, points: 30 },
            { translations: { ar: "سمك القرش", tn: "سمك القرش", fr: "Requin", en: "Shark" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 215,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 خضروات توجد في الكسكسي التونسي؟" },
            tn: { text: "أذكر 9 خضرة يحطوها في الكسكسي التونسي؟" },
            fr: { text: "Citez 9 légumes présents dans le couscous tunisien ?" },
            en: { text: "Name 9 vegetables found in Tunisian Couscous" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "قرع أحمر", tn: "قرع أحمر", fr: "Citrouille (potiron)", en: "Pumpkin" }, is_correct: true, points: 10 },
            { translations: { ar: "سفنارية", tn: "سفنارية", fr: "Carotte", en: "Carrot" }, is_correct: true, points: 10 },
            { translations: { ar: "بطاطا", tn: "بطاطا", fr: "Pomme de terre", en: "Potato" }, is_correct: true, points: 10 },
            { translations: { ar: "قرع أخضر", tn: "قرع أخضر", fr: "Courgette", en: "Zucchini" }, is_correct: true, points: 20 },
            { translations: { ar: "حمص", tn: "حمص", fr: "Pois chiche", en: "Chickpeas" }, is_correct: true, points: 20 },
            { translations: { ar: "كرنب", tn: "كرنب", fr: "Chou", en: "Cabbage" }, is_correct: true, points: 20 },
            { translations: { ar: "لفت", tn: "لفت", fr: "Navet", en: "Turnip" }, is_correct: true, points: 30 },
            { translations: { ar: "بصل", tn: "بصل", fr: "Oignon", en: "Onion" }, is_correct: true, points: 30 },
            { translations: { ar: "فلفل أخضر", tn: "فلفل أخضر", fr: "Piment vert", en: "Green pepper" }, is_correct: true, points: 30 },
            { translations: { ar: "أفوكادو", tn: "أفوكادو", fr: "Avocat", en: "Avocado" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 216,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أكلات شارع (أكلات خفيفة) مشهورة في تونس؟" },
            tn: { text: "أذكر 9 أكلات شارع خفيفة في تونس؟" },
            fr: { text: "Citez 9 plats de street food populaires en Tunisie ?" },
            en: { text: "Name 9 street foods in Tunisia" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "فريكاسي", tn: "فريكاسي", fr: "Fricassé", en: "Fricasse" }, is_correct: true, points: 10 },
            { translations: { ar: "لبلابي", tn: "لبلابي", fr: "Lablebi", en: "Lablebi" }, is_correct: true, points: 10 },
            { translations: { ar: "بريك", tn: "بريك", fr: "Brik", en: "Brik" }, is_correct: true, points: 10 },
            { translations: { ar: "شباتي", tn: "شباتي", fr: "Chapati", en: "Chapati" }, is_correct: true, points: 20 },
            { translations: { ar: "ملاوي بالجبن", tn: "ملاوي", fr: "Mlaoui", en: "Mlaoui" }, is_correct: true, points: 20 },
            { translations: { ar: "كفتجي", tn: "كفتجي", fr: "Kafteji", en: "Kafteji" }, is_correct: true, points: 20 },
            { translations: { ar: "كسكروت طن", tn: "كسكروت طن", fr: "Sandwich thon", en: "Tuna sandwich" }, is_correct: true, points: 30 },
            { translations: { ar: "خبز طابونة بالهريسة", tn: "طابونة بالهريسة", fr: "Tabouna harissa", en: "Tabouna with harissa" }, is_correct: true, points: 30 },
            { translations: { ar: "بمبالوني", tn: "بمبالوني", fr: "Bambalouni", en: "Bambalouni" }, is_correct: true, points: 30 },
            { translations: { ar: "سوشي", tn: "سوشي", fr: "Sushi", en: "Sushi" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 217,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنواع بهارات وتوابل تونسية؟" },
            tn: { text: "أذكر 9 فواحات تونسية؟" },
            fr: { text: "Citez 9 types d'épices tunisiennes ?" },
            en: { text: "Name 9 spices in Tunisian spice shops" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "تابل", tn: "تابل", fr: "Coriandre", en: "Tabil (coriander)" }, is_correct: true, points: 10 },
            { translations: { ar: "كروية", tn: "كروية", fr: "Carvi", en: "Caraway" }, is_correct: true, points: 10 },
            { translations: { ar: "كركم", tn: "كركم", fr: "Curcuma", en: "Turmeric" }, is_correct: true, points: 10 },
            { translations: { ar: "فلفل زينة", tn: "فلفل زينة", fr: "Piment doux (Paprika)", en: "Sweet paprika" }, is_correct: true, points: 20 },
            { translations: { ar: "كمون", tn: "كمون", fr: "Cumin", en: "Cumin" }, is_correct: true, points: 20 },
            { translations: { ar: "زنجبيل", tn: "سكنجبير", fr: "Gingembre", en: "Ginger" }, is_correct: true, points: 20 },
            { translations: { ar: "إكليل الجبل", tn: "كليل", fr: "Romarin", en: "Rosemary" }, is_correct: true, points: 30 },
            { translations: { ar: "زعتر", tn: "زعتر", fr: "Thym", en: "Thyme" }, is_correct: true, points: 30 },
            { translations: { ar: "شوش ورد", tn: "شوش ورد", fr: "Boutons de rose", en: "Rosebuds" }, is_correct: true, points: 30 },
            { translations: { ar: "فانيليا", tn: "فانيليا", fr: "Vanille", en: "Vanilla" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 218,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنواع سلطات مشهورة في تونس؟" },
            tn: { text: "أذكر 9 سلطات تونسية؟" },
            fr: { text: "Citez 9 salades célèbres en Tunisie ?" },
            en: { text: "Name 9 popular salads in Tunisia" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "سلطة تونسية", tn: "سلطة تونسية", fr: "Salade tunisienne", en: "Tunisian salad" }, is_correct: true, points: 10 },
            { translations: { ar: "سلطة مشوية", tn: "سلطة مشوية", fr: "Salade méchouia", en: "Mechouia salad" }, is_correct: true, points: 10 },
            { translations: { ar: "سلطة أمك حورية", tn: "أمك حورية", fr: "Salade Oumek Houria", en: "Oumek Houria salad" }, is_correct: true, points: 10 },
            { translations: { ar: "سلطة قرنيط", tn: "سلطة قرنيط", fr: "Salade de poulpe", en: "Octopus salad" }, is_correct: true, points: 20 },
            { translations: { ar: "سلطة روز", tn: "سلطة روز", fr: "Salade de riz", en: "Rice salad" }, is_correct: true, points: 20 },
            { translations: { ar: "سلطة روسية", tn: "سلطة روسية", fr: "Salade russe", en: "Russian salad" }, is_correct: true, points: 20 },
            { translations: { ar: "سلطة سيزر", tn: "سلطة سيزر", fr: "Salade César", en: "Caesar salad" }, is_correct: true, points: 30 },
            { translations: { ar: "سلطة خيزو (جزر)", tn: "سلطة سنارية", fr: "Salade de carottes", en: "Carrot salad" }, is_correct: true, points: 30 },
            { translations: { ar: "سلطة بسباس", tn: "سلطة بسباس", fr: "Salade de fenouil", en: "Fennel salad" }, is_correct: true, points: 30 },
            { translations: { ar: "سلطة الكينوا", tn: "سلطة كينوا", fr: "Salade de quinoa", en: "Quinoa salad" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 219,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 فواكه تزرع وتنتج في تونس؟" },
            tn: { text: "أذكر 9 غلال تنتج في تونس؟" },
            fr: { text: "Citez 9 fruits cultivés et produits en Tunisie ?" },
            en: { text: "Name 9 fruits grown and harvested in Tunisia" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "دقلة نور", tn: "دقلة", fr: "Dattes Deglet Nour", en: "Deglet Nour dates" }, is_correct: true, points: 10 },
            { translations: { ar: "رمان", tn: "رمان", fr: "Grenade", en: "Pomegranate" }, is_correct: true, points: 10 },
            { translations: { ar: "كرموس", tn: "كرموس", fr: "Figue", en: "Fig" }, is_correct: true, points: 10 },
            { translations: { ar: "هندي", tn: "هندي", fr: "Figue de barbarie", en: "Prickly pear" }, is_correct: true, points: 20 },
            { translations: { ar: "برتقال", tn: "برتقال (بردقان)", fr: "Orange", en: "Orange" }, is_correct: true, points: 20 },
            { translations: { ar: "ليمون", tn: "ليمون (قارص)", fr: "Citron", en: "Lemon" }, is_correct: true, points: 20 },
            { translations: { ar: "دلاع", tn: "دلاع", fr: "Pastèque", en: "Watermelon" }, is_correct: true, points: 30 },
            { translations: { ar: "بطيخ", tn: "بطيخ", fr: "Melon", en: "Melon" }, is_correct: true, points: 30 },
            { translations: { ar: "عنب", tn: "عنب", fr: "Raisin", en: "Grape" }, is_correct: true, points: 30 },
            { translations: { ar: "أناناس", tn: "أناناس", fr: "Ananas", en: "Pineapple" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 220,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أطعمة أو مشروبات توجد في فطور الصباح التونسي؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في فطور الصباح التونسي؟" },
            fr: { text: "Citez 9 aliments ou boissons du petit-déjeuner tunisien ?" },
            en: { text: "Name 9 items in a Tunisian breakfast" }
        },
        category: "Gastronomy",
        subcategory: "Dishes",
        answers: [
            { translations: { ar: "زيت زيتونة", tn: "زيت زيتونة", fr: "Huile d'olive", en: "Olive oil" }, is_correct: true, points: 10 },
            { translations: { ar: "عسل", tn: "عسل", fr: "Miel", en: "Honey" }, is_correct: true, points: 10 },
            { translations: { ar: "شامية", tn: "شامية", fr: "Chamia (halva)", en: "Chamia (Halva)" }, is_correct: true, points: 10 },
            { translations: { ar: "زبدة", tn: "زبدة", fr: "Beurre", en: "Butter" }, is_correct: true, points: 20 },
            { translations: { ar: "بسيسة", tn: "بسيسة", fr: "Bsissa", en: "Bsissa" }, is_correct: true, points: 20 },
            { translations: { ar: "عظم", tn: "عظم", fr: "Oeuf", en: "Egg" }, is_correct: true, points: 20 },
            { translations: { ar: "خبز", tn: "خبز", fr: "Pain", en: "Bread" }, is_correct: true, points: 30 },
            { translations: { ar: "حليب", tn: "حليب", fr: "Lait", en: "Milk" }, is_correct: true, points: 30 },
            { translations: { ar: "قهوة", tn: "قهوة", fr: "Café", en: "Coffee" }, is_correct: true, points: 30 },
            { translations: { ar: "بيتزا", tn: "بيتزا", fr: "Pizza", en: "Pizza" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 221,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مدن تونسية تبدأ بحرف الميم؟" },
            tn: { text: "أذكر 9 مدن تونسية تبدأ بحرف الميم؟" },
            fr: { text: "Citez 9 villes tunisiennes commençant par la lettre M ?" },
            en: { text: "Name 9 Tunisian cities starting with the letter M" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "المنستير", tn: "المنستير", fr: "Monastir", en: "Monastir" }, is_correct: true, points: 10 },
            { translations: { ar: "المهدية", tn: "المهدية", fr: "Mahdia", en: "Mahdia" }, is_correct: true, points: 10 },
            { translations: { ar: "مدنين", tn: "مدنين", fr: "Medenine", en: "Medenine" }, is_correct: true, points: 10 },
            { translations: { ar: "ماطر", tn: "ماطر", fr: "Mateur", en: "Mateur" }, is_correct: true, points: 20 },
            { translations: { ar: "منزل بورقيبة", tn: "منزل بورقيبة", fr: "Menzel Bourguiba", en: "Menzel Bourguiba" }, is_correct: true, points: 20 },
            { translations: { ar: "منزل تميم", tn: "منزل تميم", fr: "Menzel Temime", en: "Menzel Temime" }, is_correct: true, points: 20 },
            { translations: { ar: "المحرس", tn: "المحرس", fr: "Mahres", en: "Mahres" }, is_correct: true, points: 30 },
            { translations: { ar: "ميدون", tn: "ميدون", fr: "Midoun", en: "Midoun" }, is_correct: true, points: 30 },
            { translations: { ar: "مجاز الباب", tn: "مجاز الباب", fr: "Medjez el-Bab", en: "Medjez el-Bab" }, is_correct: true, points: 30 },
            { translations: { ar: "نابل", tn: "نابل", fr: "Nabeul", en: "Nabeul" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 222,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 جزر أو أرخبيلات تونسية؟" },
            tn: { text: "أذكر 9 جزر في تونس؟" },
            fr: { text: "Citez 9 îles ou archipels tunisiens ?" },
            en: { text: "Name 9 Tunisian islands or archipelagos" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "جربة", tn: "جربة", fr: "Djerba", en: "Djerba" }, is_correct: true, points: 10 },
            { translations: { ar: "قرقنة", tn: "قرقنة", fr: "Kerkennah", en: "Kerkennah" }, is_correct: true, points: 10 },
            { translations: { ar: "جالطة", tn: "جالطة", fr: "Galite", en: "Galite" }, is_correct: true, points: 10 },
            { translations: { ar: "قورية", tn: "قورية", fr: "Kuriat", en: "Kuriat" }, is_correct: true, points: 20 },
            { translations: { ar: "زمبرة", tn: "زمبرة", fr: "Zembra", en: "Zembra" }, is_correct: true, points: 20 },
            { translations: { ar: "زمبرتا", tn: "زمبرتا", fr: "Zembretta", en: "Zembretta" }, is_correct: true, points: 20 },
            { translations: { ar: "الديماس", tn: "الديماس", fr: "Diass (Dimas)", en: "Dimas" }, is_correct: true, points: 30 },
            { translations: { ar: "أرخبيل الكنائس", tn: "جزر الكنائس", fr: "Kneiss", en: "Kneiss" }, is_correct: true, points: 30 },
            { translations: { ar: "جزيرة قسطيل", tn: "جزيرة قسطيل", fr: "Kastil", en: "Kastil" }, is_correct: true, points: 30 },
            { translations: { ar: "صقلية", tn: "صقلية", fr: "Sicile", en: "Sicily" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 223,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 جبال تونسية؟" },
            tn: { text: "أذكر 9 جبال في تونس؟" },
            fr: { text: "Citez 9 montagnes tunisiennes ?" },
            en: { text: "Name 9 mountains in Tunisia" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "الشعانبي", tn: "جبل الشعانبي", fr: "Chaambi", en: "Chaambi" }, is_correct: true, points: 10 },
            { translations: { ar: "زغوان", tn: "جبل زغوان", fr: "Zaghouan", en: "Zaghouan" }, is_correct: true, points: 10 },
            { translations: { ar: "إشكل", tn: "جبل إشكل", fr: "Ichkeul", en: "Ichkeul" }, is_correct: true, points: 10 },
            { translations: { ar: "الرصاص", tn: "جبل الرصاص", fr: "Ressas", en: "Ressas" }, is_correct: true, points: 20 },
            { translations: { ar: "بوقرنين", tn: "جبل بوقرنين", fr: "Boukornine", en: "Boukornine" }, is_correct: true, points: 20 },
            { translations: { ar: "سمامة", tn: "جبل سمامة", fr: "Semmama", en: "Semmama" }, is_correct: true, points: 20 },
            { translations: { ar: "سلوم", tn: "جبل سلوم", fr: "Selloum", en: "Selloum" }, is_correct: true, points: 30 },
            { translations: { ar: "السرج", tn: "جبل السرج", fr: "Serj", en: "Serj" }, is_correct: true, points: 30 },
            { translations: { ar: "غرة", tn: "جبل غرة", fr: "Gorra", en: "Gorra" }, is_correct: true, points: 30 },
            { translations: { ar: "جبل إفرست", tn: "جبل إفرست", fr: "Everest", en: "Everest" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 224,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شطوط أو بحيرات مالحة في شمال إفريقيا؟" },
            tn: { text: "أذكر 9 شطوط أو سبخات في شمال إفريقيا؟" },
            fr: { text: "Citez 9 chotts ou sebkhas d'Afrique du Nord ?" },
            en: { text: "Name 9 chotts or salt lakes in North Africa" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "شط الجريد", tn: "شط الجريد", fr: "Chott el-Djerid", en: "Chott el Djerid" }, is_correct: true, points: 10 },
            { translations: { ar: "شط الغرسة", tn: "شط الغرسة", fr: "Chott el-Gharsa", en: "Chott el Gharsa" }, is_correct: true, points: 10 },
            { translations: { ar: "شط الفجاج", tn: "شط الفجاج", fr: "Chott el-Fejaj", en: "Chott el Fejaj" }, is_correct: true, points: 10 },
            { translations: { ar: "شط ملغير", tn: "شط ملغير", fr: "Chott Melrhir", en: "Chott Melrhir" }, is_correct: true, points: 20 },
            { translations: { ar: "شط الحضنة", tn: "شط الحضنة", fr: "Chott el-Hodna", en: "Chott el Hodna" }, is_correct: true, points: 20 },
            { translations: { ar: "شط الشرقي", tn: "شط الشرقي", fr: "Chott el-Chergui", en: "Chott el Chergui" }, is_correct: true, points: 20 },
            { translations: { ar: "سبخة الملح", tn: "سبخة الملح", fr: "Sebkhet el Melah", en: "Sabkhat el Melah" }, is_correct: true, points: 30 },
            { translations: { ar: "سبخة أريانة", tn: "سبخة أريانة", fr: "Sebkhet Ariana", en: "Sabkhat Ariana" }, is_correct: true, points: 30 },
            { translations: { ar: "سبخة السيجومي", tn: "سبخة السيجومي", fr: "Sebkhet Sejoumi", en: "Sabkhat Sejoumi" }, is_correct: true, points: 30 },
            { translations: { ar: "البحر الميت", tn: "البحر الميت", fr: "Mer Morte", en: "Dead Sea" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 225,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أودية أو مجاري مائية في تونس؟" },
            tn: { text: "أذكر 9 وديان في تونس؟" },
            fr: { text: "Citez 9 oueds ou rivières en Tunisie ?" },
            en: { text: "Name 9 valleys or rivers in Tunisia" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "وادي مجردة", tn: "وادي مجردة", fr: "Oued Medjerda", en: "Medjerda River" }, is_correct: true, points: 10 },
            { translations: { ar: "وادي مليان", tn: "وادي مليان", fr: "Oued Miliane", en: "Miliane River" }, is_correct: true, points: 10 },
            { translations: { ar: "وادي زرود", tn: "وادي زرود", fr: "Oued Zeroud", en: "Zeroud River" }, is_correct: true, points: 10 },
            { translations: { ar: "وادي مرق الليل", tn: "وادي مرق الليل", fr: "Oued Merguellil", en: "Merguellil River" }, is_correct: true, points: 20 },
            { translations: { ar: "وادي بربرة", tn: "وادي بربرة", fr: "Oued Barbara", en: "Barbara River" }, is_correct: true, points: 20 },
            { translations: { ar: "وادي كساب", tn: "وادي كساب", fr: "Oued Kessab", en: "Kessab River" }, is_correct: true, points: 20 },
            { translations: { ar: "وادي ملاق", tn: "وادي ملاق", fr: "Oued Mellègue", en: "Mellègue River" }, is_correct: true, points: 30 },
            { translations: { ar: "وادي الحامة", tn: "وادي الحامة", fr: "Oued Hamma", en: "Hamma River" }, is_correct: true, points: 30 },
            { translations: { ar: "وادي جومين", tn: "وادي جومين", fr: "Oued Joumine", en: "Joumine River" }, is_correct: true, points: 30 },
            { translations: { ar: "نهر النيل", tn: "نهر النيل", fr: "Nil", en: "Nile" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 226,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 عواصم لدول أوروبية؟" },
            tn: { text: "أذكر 9 عواصم أوروبية؟" },
            fr: { text: "Citez 9 capitales européennes ?" },
            en: { text: "Name 9 European capital cities" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "باريس", tn: "باريس", fr: "Paris", en: "Paris" }, is_correct: true, points: 10 },
            { translations: { ar: "لندن", tn: "لندن", fr: "Londres", en: "London" }, is_correct: true, points: 10 },
            { translations: { ar: "روما", tn: "روما", fr: "Rome", en: "Rome" }, is_correct: true, points: 10 },
            { translations: { ar: "برلين", tn: "برلين", fr: "Berlin", en: "Berlin" }, is_correct: true, points: 20 },
            { translations: { ar: "مدريد", tn: "مدريد", fr: "Madrid", en: "Madrid" }, is_correct: true, points: 20 },
            { translations: { ar: "لشبونة", tn: "لشبونة", fr: "Lisbonne", en: "Lisbon" }, is_correct: true, points: 20 },
            { translations: { ar: "فيينا", tn: "فيينا", fr: "Vienne", en: "Vienna" }, is_correct: true, points: 30 },
            { translations: { ar: "بروكسل", tn: "بروكسل", fr: "Bruxelles", en: "Brussels" }, is_correct: true, points: 30 },
            { translations: { ar: "أمستردام", tn: "أمستردام", fr: "Amsterdam", en: "Amsterdam" }, is_correct: true, points: 30 },
            { translations: { ar: "نيويورك", tn: "نيويورك", fr: "New York", en: "New York" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 227,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 دول عربية تقع في قارة آسيا؟" },
            tn: { text: "أذكر 9 دول عربية في آسيا؟" },
            fr: { text: "Citez 9 pays arabes situés en Asie ?" },
            en: { text: "Name 9 Arab countries located in Asia" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "السعودية", tn: "السعودية", fr: "Arabie Saoudite", en: "Saudi Arabia" }, is_correct: true, points: 10 },
            { translations: { ar: "الإمارات", tn: "الإمارات", fr: "Emirats Arabes Unis", en: "UAE" }, is_correct: true, points: 10 },
            { translations: { ar: "قطر", tn: "قطر", fr: "Qatar", en: "Qatar" }, is_correct: true, points: 10 },
            { translations: { ar: "الكويت", tn: "الكويت", fr: "Koweït", en: "Kuwait" }, is_correct: true, points: 20 },
            { translations: { ar: "البحرين", tn: "البحرين", fr: "Bahreïn", en: "Bahrain" }, is_correct: true, points: 20 },
            { translations: { ar: "عمان", tn: "عمان", fr: "Oman", en: "Oman" }, is_correct: true, points: 20 },
            { translations: { ar: "اليمن", tn: "اليمن", fr: "Yémen", en: "Yemen" }, is_correct: true, points: 30 },
            { translations: { ar: "الأردن", tn: "الأردن", fr: "Jordanie", en: "Jordan" }, is_correct: true, points: 30 },
            { translations: { ar: "لبنان", tn: "لبنان", fr: "Liban", en: "Lebanon" }, is_correct: true, points: 30 },
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunisie", en: "Tunisia" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 228,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 دول تطل على البحر الأبيض المتوسط؟" },
            tn: { text: "أذكر 9 بلدان تطل عالبحر الأبيض المتوسط؟" },
            fr: { text: "Citez 9 pays bordant la mer Méditerranée ?" },
            en: { text: "Name 9 countries bordering the Mediterranean Sea" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunisie", en: "Tunisia" }, is_correct: true, points: 10 },
            { translations: { ar: "الجزائر", tn: "الجزائر", fr: "Algérie", en: "Algeria" }, is_correct: true, points: 10 },
            { translations: { ar: "المغرب", tn: "المغرب", fr: "Maroc", en: "Morocco" }, is_correct: true, points: 10 },
            { translations: { ar: "إسبانيا", tn: "إسبانيا", fr: "Espagne", en: "Spain" }, is_correct: true, points: 20 },
            { translations: { ar: "فرنسا", tn: "فرنسا", fr: "France", en: "France" }, is_correct: true, points: 20 },
            { translations: { ar: "إيطاليا", tn: "إيطاليا", fr: "Italie", en: "Italy" }, is_correct: true, points: 20 },
            { translations: { ar: "اليونان", tn: "اليونان", fr: "Grèce", en: "Greece" }, is_correct: true, points: 30 },
            { translations: { ar: "تركيا", tn: "تركيا", fr: "Turquie", en: "Turkey" }, is_correct: true, points: 30 },
            { translations: { ar: "مصر", tn: "مصر", fr: "Egypte", en: "Egypt" }, is_correct: true, points: 30 },
            { translations: { ar: "ألمانيا", tn: "ألمانيا", fr: "Allemagne", en: "Germany" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 229,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 عواصم لدول إفريقية؟" },
            tn: { text: "أذكر 9 عواصم في إفريقيا؟" },
            fr: { text: "Citez 9 capitales africaines ?" },
            en: { text: "Name 9 African capital cities" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "تونس", tn: "تونس", fr: "Tunis", en: "Tunis" }, is_correct: true, points: 10 },
            { translations: { ar: "القاهرة", tn: "القاهرة", fr: "Le Caire", en: "Cairo" }, is_correct: true, points: 10 },
            { translations: { ar: "الرباط", tn: "الرباط", fr: "Rabat", en: "Rabat" }, is_correct: true, points: 10 },
            { translations: { ar: "الجزائر", tn: "الجزائر", fr: "Alger", en: "Algiers" }, is_correct: true, points: 20 },
            { translations: { ar: "طرابلس", tn: "طرابلس", fr: "Tripoli", en: "Tripoli" }, is_correct: true, points: 20 },
            { translations: { ar: "داكار", tn: "داكار", fr: "Dakar", en: "Dakar" }, is_correct: true, points: 20 },
            { translations: { ar: "نيروبي", tn: "نيروبي", fr: "Nairobi", en: "Nairobi" }, is_correct: true, points: 30 },
            { translations: { ar: "أبوجا", tn: "أبوجا", fr: "Abuja", en: "Abuja" }, is_correct: true, points: 30 },
            { translations: { ar: "أديس أبابا", tn: "أديس أبابا", fr: "Addis-Abeba", en: "Addis Ababa" }, is_correct: true, points: 30 },
            { translations: { ar: "دبي", tn: "دبي", fr: "Dubaï", en: "Dubai" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 230,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 من أكبر دول العالم مساحة؟" },
            tn: { text: "أذكر 9 من أكبر البلدان في العالم في المساحة؟" },
            fr: { text: "Citez 9 des plus grands pays du monde par superficie ?" },
            en: { text: "Name 9 largest countries in the world by area" }
        },
        category: "Geography",
        subcategory: "Country",
        answers: [
            { translations: { ar: "روسيا", tn: "روسيا", fr: "Russie", en: "Russia" }, is_correct: true, points: 10 },
            { translations: { ar: "كندا", tn: "كندا", fr: "Canada", en: "Canada" }, is_correct: true, points: 10 },
            { translations: { ar: "الصين", tn: "الصين", fr: "Chine", en: "China" }, is_correct: true, points: 10 },
            { translations: { ar: "الولايات المتحدة", tn: "أمريكا", fr: "Etats-Unis", en: "USA" }, is_correct: true, points: 20 },
            { translations: { ar: "البرازيل", tn: "البرازيل", fr: "Brésil", en: "Brazil" }, is_correct: true, points: 20 },
            { translations: { ar: "أستراليا", tn: "أستراليا", fr: "Australie", en: "Australia" }, is_correct: true, points: 20 },
            { translations: { ar: "الهند", tn: "الهند", fr: "Inde", en: "India" }, is_correct: true, points: 30 },
            { translations: { ar: "الأرجنتين", tn: "الأرجنتين", fr: "Argentine", en: "Argentina" }, is_correct: true, points: 30 },
            { translations: { ar: "كازاخستان", tn: "كازاخستان", fr: "Kazakhstan", en: "Kazakhstan" }, is_correct: true, points: 30 },
            { translations: { ar: "البحرين", tn: "البحرين", fr: "Bahreïn", en: "Bahrain" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 231,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 بايات من الدولة الحسينية في تونس؟" },
            tn: { text: "أذكر 9 بايات حسينيين حكموا تونس؟" },
            fr: { text: "Citez 9 beys de la dynastie husseinite en Tunisie ?" },
            en: { text: "Name 9 Tunisian Beys of the Husainid Dynasty" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "حسين بن علي", tn: "حسين بن علي", fr: "Hussein Ier Bey", en: "Hussein bin Ali" }, is_correct: true, points: 10 },
            { translations: { ar: "علي باي", tn: "علي باي", fr: "Ali II Bey", en: "Ali Bey" }, is_correct: true, points: 10 },
            { translations: { ar: "حمودة باشا", tn: "حمودة باشا", fr: "Hammouda Pacha", en: "Hammouda Pasha" }, is_correct: true, points: 10 },
            { translations: { ar: "أحمد باي", tn: "أحمد باي", fr: "Ahmed Ier Bey", en: "Ahmed Bey" }, is_correct: true, points: 20 },
            { translations: { ar: "محمد الصادق باي", tn: "الصادق باي", fr: "Sadok Bey", en: "Sadok Bey" }, is_correct: true, points: 20 },
            { translations: { ar: "محمد الناصر باي", tn: "الناصر باي", fr: "Naceur Bey", en: "Naceur Bey" }, is_correct: true, points: 20 },
            { translations: { ar: "المنصف باي", tn: "المنصف باي", fr: "Moncef Bey", en: "Moncef Bey" }, is_correct: true, points: 30 },
            { translations: { ar: "الأمين باي", tn: "الأمين باي", fr: "Lamine Bey", en: "Lamine Bey" }, is_correct: true, points: 30 },
            { translations: { ar: "مصطفى باي", tn: "مصطفى باي", fr: "Mustapha Bey", en: "Mustapha Bey" }, is_correct: true, points: 30 },
            { translations: { ar: "خير الدين باشا", tn: "خير الدين باشا", fr: "Kheireddine Pacha", en: "Kheireddine Pasha" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 232,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مواقع أو معالم أثرية في تونس؟" },
            tn: { text: "أذكر 9 بلايص أثرية تاريخية في تونس؟" },
            fr: { text: "Citez 9 sites archéologiques en Tunisie ?" },
            en: { text: "Name 9 archeological sites in Tunisia" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "قرطاج", tn: "قرطاج", fr: "Carthage", en: "Carthage" }, is_correct: true, points: 10 },
            { translations: { ar: "الجم", tn: "قصر الجم", fr: "El Jem", en: "El Jem" }, is_correct: true, points: 10 },
            { translations: { ar: "دقة", tn: "دقة", fr: "Dougga", en: "Dougga" }, is_correct: true, points: 10 },
            { translations: { ar: "بولا ريجيا", tn: "بولا ريجيا", fr: "Bulla Regia", en: "Bulla Regia" }, is_correct: true, points: 20 },
            { translations: { ar: "سبيطلة", tn: "سبيطلة", fr: "Sbeitla", en: "Sbeitla" }, is_correct: true, points: 20 },
            { translations: { ar: "كركوان", tn: "كركوان", fr: "Kerkouane", en: "Kerkouane" }, is_correct: true, points: 20 },
            { translations: { ar: "أوتيك", tn: "أوتيك", fr: "Utique", en: "Utique" }, is_correct: true, points: 30 },
            { translations: { ar: "أودنة", tn: "أودنة", fr: "Uthina", en: "Uthina" }, is_correct: true, points: 30 },
            { translations: { ar: "حيدرة", tn: "حيدرة", fr: "Haidra", en: "Haidra" }, is_correct: true, points: 30 },
            { translations: { ar: "الأهرامات", tn: "الأهرامات", fr: "Pyramides", en: "Pyramids" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 233,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 حضارات تاريخية حكمت أو استوطنت تونس؟" },
            tn: { text: "أذكر 9 حضارات حكمت تونس؟" },
            fr: { text: "Citez 9 civilisations historiques ayant régné en Tunisie ?" },
            en: { text: "Name 9 historical civilizations that ruled Tunisia" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "القرطاجيون", tn: "القرطاجيين", fr: "Carthaginois (Phéniciens)", en: "Carthaginians" }, is_correct: true, points: 10 },
            { translations: { ar: "الرومان", tn: "الرومان", fr: "Romains", en: "Romans" }, is_correct: true, points: 10 },
            { translations: { ar: "الوندال", tn: "الوندال", fr: "Vandales", en: "Vandals" }, is_correct: true, points: 10 },
            { translations: { ar: "البيزنطيون", tn: "البيزنطيين", fr: "Byzantins", en: "Byzantines" }, is_correct: true, points: 20 },
            { translations: { ar: "الأمويون", tn: "الأمويين", fr: "Omeyyades", en: "Umayyads" }, is_correct: true, points: 20 },
            { translations: { ar: "الأغالبة", tn: "الأغالبة", fr: "Aghlabides", en: "Aghlabids" }, is_correct: true, points: 20 },
            { translations: { ar: "الفاطميون", tn: "الفاطميين", fr: "Fatimides", en: "Fatimides" }, is_correct: true, points: 30 },
            { translations: { ar: "الحفصيون", tn: "الحفصيين", fr: "Hafsides", en: "Hafsids" }, is_correct: true, points: 30 },
            { translations: { ar: "العثمانيون", tn: "العثمانيين", fr: "Ottomans", en: "Ottomans" }, is_correct: true, points: 30 },
            { translations: { ar: "الفايكنغ", tn: "الفايكنغ", fr: "Vikings", en: "Vikings" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 234,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات من تاريخ قرطاج القديم؟" },
            tn: { text: "أذكر 9 شخصيات من تاريخ قرطاج؟" },
            fr: { text: "Citez 9 figures historiques de la Carthage antique ?" },
            en: { text: "Name 9 historical figures of ancient Carthage" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "حنبعل", tn: "حنبعل", fr: "Hannibal Barca", en: "Hannibal Barca" }, is_correct: true, points: 10 },
            { translations: { ar: "حملقار", tn: "حملقار", fr: "Hamilcar Barca", en: "Hamilcar Barca" }, is_correct: true, points: 10 },
            { translations: { ar: "صدر بعل", tn: "صدر بعل", fr: "Hasdrubal", en: "Hasdrubal" }, is_correct: true, points: 10 },
            { translations: { ar: "عليسة", tn: "عليسة (ديلو)", fr: "Didon (Elissa)", en: "Dido (Elissa)" }, is_correct: true, points: 20 },
            { translations: { ar: "ماجو", tn: "ماجو", fr: "Magon", en: "Mago" }, is_correct: true, points: 20 },
            { translations: { ar: "صفنبعل", tn: "صفنبعل", fr: "Sophonisbe", en: "Sophonisba" }, is_correct: true, points: 20 },
            { translations: { ar: "ماسينيسا", tn: "ماسينيسا", fr: "Masinissa", en: "Masinissa" }, is_correct: true, points: 30 },
            { translations: { ar: "يوغرطة", tn: "يوغرطة", fr: "Jugurtha", en: "Jugurtha" }, is_correct: true, points: 30 },
            { translations: { ar: "تيرينس", tn: "تيرينس", fr: "Terence", en: "Terence" }, is_correct: true, points: 30 },
            { translations: { ar: "يوليوس قيصر", tn: "يوليوس قيصر", fr: "Jules César", en: "Julius Caesar" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 235,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 رؤساء للولايات المتحدة الأمريكية؟" },
            tn: { text: "أذكر 9 رؤساء لأمريكا؟" },
            fr: { text: "Citez 9 présidents des États-Unis ?" },
            en: { text: "Name 9 presidents of the USA" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "جورج واشنطن", tn: "جورج واشنطن", fr: "George Washington", en: "George Washington" }, is_correct: true, points: 10 },
            { translations: { ar: "أبراهام لينكولن", tn: "أبراهام لينكولن", fr: "Abraham Lincoln", en: "Abraham Lincoln" }, is_correct: true, points: 10 },
            { translations: { ar: "فرانكلين روزفلت", tn: "روزفلت", fr: "Franklin D. Roosevelt", en: "Franklin D. Roosevelt" }, is_correct: true, points: 10 },
            { translations: { ar: "جون كينيدي", tn: "كينيدي", fr: "John F. Kennedy", en: "John F. Kennedy" }, is_correct: true, points: 20 },
            { translations: { ar: "ريتشارد نيكسون", tn: "نيكسون", fr: "Richard Nixon", en: "Richard Nixon" }, is_correct: true, points: 20 },
            { translations: { ar: "رونالد ريغان", tn: "ريغان", fr: "Ronald Reagan", en: "Ronald Reagan" }, is_correct: true, points: 20 },
            { translations: { ar: "بيل كلينتون", tn: "كلينتون", fr: "Bill Clinton", en: "Bill Clinton" }, is_correct: true, points: 30 },
            { translations: { ar: "باراك أوباما", tn: "أوباما", fr: "Barack Obama", en: "Barack Obama" }, is_correct: true, points: 30 },
            { translations: { ar: "دونالد ترامب", tn: "ترامب", fr: "Donald Trump", en: "Donald Trump" }, is_correct: true, points: 30 },
            { translations: { ar: "توني بلير", tn: "توني بلير", fr: "Tony Blair", en: "Tony Blair" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 236,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات أو منظمات حازت على جائزة نوبل للسلام؟" },
            tn: { text: "أذكر 9 خذاو جائزة نوبل للسلام؟" },
            fr: { text: "Citez 9 lauréats du prix Nobel de la paix ?" },
            en: { text: "Name 9 Nobel Peace Prize laureates" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "نيلسون مانديلا", tn: "مانديلا", fr: "Nelson Mandela", en: "Nelson Mandela" }, is_correct: true, points: 10 },
            { translations: { ar: "مارتن لوثر كينغ", tn: "مارتن لوثر", fr: "Martin Luther King Jr.", en: "Martin Luther King Jr." }, is_correct: true, points: 10 },
            { translations: { ar: "الأم تريزا", tn: "الأم تريزا", fr: "Mère Teresa", en: "Mother Teresa" }, is_correct: true, points: 10 },
            { translations: { ar: "ياسر عرفات", tn: "ياسر عرفات", fr: "Yasser Arafat", en: "Yasser Arafat" }, is_correct: true, points: 20 },
            { translations: { ar: "باراك أوباما", tn: "أوباما", fr: "Barack Obama", en: "Barack Obama" }, is_correct: true, points: 20 },
            { translations: { ar: "ملالا يوسفزي", tn: "ملالا", fr: "Malala Yousafzai", en: "Malala Yousafzai" }, is_correct: true, points: 20 },
            { translations: { ar: "كوفي أنان", tn: "كوفي أنان", fr: "Kofi Annan", en: "Kofi Annan" }, is_correct: true, points: 30 },
            { translations: { ar: "الرباعي الراعي للحوار التونسي", tn: "الرباعي التونسي", fr: "Quartet tunisien", en: "Tunisian National Dialogue Quartet" }, is_correct: true, points: 30 },
            { translations: { ar: "ألبرت شوايتزر", tn: "شوايتزر", fr: "Albert Schweitzer", en: "Albert Schweitzer" }, is_correct: true, points: 30 },
            { translations: { ar: "أدولف هتلر", tn: "هتلر", fr: "Adolf Hitler", en: "Adolf Hitler" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 237,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 إمبراطوريات تاريخية كبرى؟" },
            tn: { text: "أذكر 9 إمبراطوريات كبار في التاريخ؟" },
            fr: { text: "Citez 9 grands empires de l'histoire ?" },
            en: { text: "Name 9 empires in world history" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "الإمبراطورية الرومانية", tn: "الإمبراطورية الرومانية", fr: "Empire romain", en: "Roman Empire" }, is_correct: true, points: 10 },
            { translations: { ar: "الدولة العثمانية", tn: "الخلافة العثمانية", fr: "Empire ottoman", en: "Ottoman Empire" }, is_correct: true, points: 10 },
            { translations: { ar: "الإمبراطورية البيزنطية", tn: "الإمبراطورية البيزنطية", fr: "Empire byzantin", en: "Byzantine Empire" }, is_correct: true, points: 10 },
            { translations: { ar: "الإمبراطورية البريطانية", tn: "الإمبراطورية البريطانية", fr: "Empire britannique", en: "British Empire" }, is_correct: true, points: 20 },
            { translations: { ar: "إمبراطورية المغول", tn: "المغول", fr: "Empire mongol", en: "Mongol Empire" }, is_correct: true, points: 20 },
            { translations: { ar: "الإمبراطورية الفارسية", tn: "الفرس", fr: "Empire perse", en: "Persian Empire" }, is_correct: true, points: 20 },
            { translations: { ar: "الإمبراطورية الفرنسية", tn: "الإمبراطورية الفرنسية", fr: "Empire français", en: "French Empire" }, is_correct: true, points: 30 },
            { translations: { ar: "الإمبراطورية الروسية", tn: "الإمبراطورية الروسية", fr: "Empire russe", en: "Russian Empire" }, is_correct: true, points: 30 },
            { translations: { ar: "الإمبراطورية الإسبانية", tn: "الإمبراطورية الإسبانية", fr: "Empire espagnol", en: "Spanish Empire" }, is_correct: true, points: 30 },
            { translations: { ar: "جمهورية تونس", tn: "جمهورية تونس", fr: "République tunisienne", en: "Tunisian Republic" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 238,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أحداث أو معاهدات تاريخية بارزة في تونس؟" },
            tn: { text: "أذكر 9 أحداث أو معاهدات تاريخية في تونس؟" },
            fr: { text: "Citez 9 événements ou traités marquants de l'histoire tunisienne ?" },
            en: { text: "Name 9 major events or treaties in Tunisian history" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "معاهدة باردو", tn: "معاهدة باردو", fr: "Traité du Bardo", en: "Bardo Treaty" }, is_correct: true, points: 10 },
            { translations: { ar: "اتفاقية المرسى", tn: "اتفاقية المرسى", fr: "Convention de La Marsa", en: "La Marsa Convention" }, is_correct: true, points: 10 },
            { translations: { ar: "الاستقلال 1956", tn: "الاستقلال", fr: "Indépendance (1956)", en: "Independence" }, is_correct: true, points: 10 },
            { translations: { ar: "إعلان الجمهورية 1957", tn: "إعلان الجمهورية", fr: "Proclamation de la république", en: "Proclamation of Republic" }, is_correct: true, points: 20 },
            { translations: { ar: "جلاء بنزرت 1963", tn: "جلاء بنزرت", fr: "Évacuation de Bizerte", en: "Evacuation of Bizerte" }, is_correct: true, points: 20 },
            { translations: { ar: "أحداث الخبز 1984", tn: "أحداث الخبز", fr: "Émeutes du pain", en: "Bread Riots" }, is_correct: true, points: 20 },
            { translations: { ar: "انتصاب الحماية 1881", tn: "الاحتلال الفرنساوي", fr: "Protectorat français", en: "French Protectorate" }, is_correct: true, points: 30 },
            { translations: { ar: "ثورة 2011", tn: "الثورة التونسية", fr: "Révolution tunisienne", en: "2011 Revolution" }, is_correct: true, points: 30 },
            { translations: { ar: "تأسيس قرطاج 814 ق.م", tn: "تأسيس قرطاج", fr: "Fondation de Carthage", en: "Carthage Foundation" }, is_correct: true, points: 30 },
            { translations: { ar: "سقوط جدار برلين", tn: "سقوط جدار برلين", fr: "Chute du mur de Berlin", en: "Fall of Berlin Wall" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 239,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات من قادة الحركة الوطنية والاستقلال في تونس؟" },
            tn: { text: "أذكر 9 مناضلين متاع الاستقلال في تونس؟" },
            fr: { text: "Citez 9 figures de proue du mouvement national et de l'indépendance tunisienne ?" },
            en: { text: "Name 9 signers or key figures of Tunisian independence" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "الحبيب بورقيبة", tn: "بورقيبة", fr: "Habib Bourguiba", en: "Habib Bourguiba" }, is_correct: true, points: 10 },
            { translations: { ar: "صلاح بن يوسف", tn: "صلاح بن يوسف", fr: "Salah Ben Youssef", en: "Salah Ben Youssef" }, is_correct: true, points: 10 },
            { translations: { ar: "المنجي سليم", tn: "المنجي سليم", fr: "Mongi Slim", en: "Mongi Slim" }, is_correct: true, points: 10 },
            { translations: { ar: "الباهي الأدغم", tn: "الباهي الأدغم", fr: "Bahi Ladgham", en: "Bahi Ladgham" }, is_correct: true, points: 20 },
            { translations: { ar: "علي البلهوان", tn: "علي البلهوان", fr: "Ali Belhouane", en: "Ali Belhouane" }, is_correct: true, points: 20 },
            { translations: { ar: "فرحات حشاد", tn: "فرحات حشاد", fr: "Farhat Hached", en: "Farhat Hached" }, is_correct: true, points: 20 },
            { translations: { ar: "محمود الماطري", tn: "محمود الماطري", fr: "Mahmoud El Materi", en: "Mahmoud El Materi" }, is_correct: true, points: 30 },
            { translations: { ar: "الحبيب عاشور", tn: "الحبيب عاشور", fr: "Habib Achour", en: "Habib Achour" }, is_correct: true, points: 30 },
            { translations: { ar: "الهادي نويرة", tn: "الهادي نويرة", fr: "Hedi Nouira", en: "Hedi Nouira" }, is_correct: true, points: 30 },
            { translations: { ar: "جمال عبد الناصر", tn: "جمال عبد الناصر", fr: "Gamal Abdel Nasser", en: "Gamal Abdel Nasser" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 240,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 وثائق أو إعلانات تاريخية شهيرة؟" },
            tn: { text: "أذكر 9 وثائق تاريخية أو دساتير معروفة في العالم؟" },
            fr: { text: "Citez 9 documents ou déclarations historiques célèbres ?" },
            en: { text: "Name 9 famous historical documents or declarations" }
        },
        category: "History & Politics",
        subcategory: "Modern",
        answers: [
            { translations: { ar: "الماغنا كارتا", tn: "الماغنا كارتا", fr: "Magna Carta", en: "Magna Carta" }, is_correct: true, points: 10 },
            { translations: { ar: "إعلان الاستقلال الأمريكي", tn: "إعلان الاستقلال الأمريكي", fr: "Déclaration d'indépendance des États-Unis", en: "US Declaration of Independence" }, is_correct: true, points: 10 },
            { translations: { ar: "إعلان حقوق الإنسان والمواطن", tn: "إعلان حقوق الإنسان الفرنسي", fr: "Déclaration des droits de l'homme (1789)", en: "Declaration of the Rights of Man" }, is_correct: true, points: 10 },
            { translations: { ar: "الإعلان العالمي لحقوق الإنسان", tn: "الإعلان العالمي لحقوق الإنسان", fr: "Déclaration universelle des droits de l'homme", en: "Universal Declaration of Human Rights" }, is_correct: true, points: 20 },
            { translations: { ar: "عهد الأمان 1857", tn: "عهد الأمان", fr: "Ahd El Aman", en: "Ahd el Aman" }, is_correct: true, points: 20 },
            { translations: { ar: "الدستور التونسي 1861", tn: "دستور 1861", fr: "Constitution tunisienne de 1861", en: "Tunisian Constitution of 1861" }, is_correct: true, points: 20 },
            { translations: { ar: "معاهدة فرساي", tn: "معاهدة فرساي", fr: "Traité de Versailles", en: "Treaty of Versailles" }, is_correct: true, points: 30 },
            { translations: { ar: "البيان الشيوعي", tn: "البيان الشيوعي", fr: "Manifeste du Parti communiste", en: "Communist Manifesto" }, is_correct: true, points: 30 },
            { translations: { ar: "وثيقة المدينة", tn: "دستور المدينة المنورة", fr: "Constitution de Médine", en: "Constitution of Medina" }, is_correct: true, points: 30 },
            { translations: { ar: "عقد كراء شقة", tn: "كونترا كراء", fr: "Contrat de bail", en: "Rental agreement" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 241,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أندية كرة قدم تونسية تلعب في الرابطة الأولى؟" },
            tn: { text: "أذكر 9 جمعيات كورة في الرابطة التونسية الأولى؟" },
            fr: { text: "Citez 9 clubs de football tunisiens de Ligue 1 ?" },
            en: { text: "Name 9 Tunisian football clubs in League 1" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "الترجي التونسي", tn: "الترجي", fr: "Espérance de Tunis", en: "Esperance de Tunis" }, is_correct: true, points: 10 },
            { translations: { ar: "النادي الإفريقي", tn: "الكلوب", fr: "Club Africain", en: "Club Africain" }, is_correct: true, points: 10 },
            { translations: { ar: "النجم الساحلي", tn: "ليتوال", fr: "Étoile du Sahel", en: "Etoile du Sahel" }, is_correct: true, points: 10 },
            { translations: { ar: "النادي الصفاقسي", tn: "السي اس اس", fr: "CSS Sfaxien", en: "CSS Sfaxien" }, is_correct: true, points: 20 },
            { translations: { ar: "الملعب التونسي", tn: "البقلاوة", fr: "Stade Tunisien", en: "Stade Tunisien" }, is_correct: true, points: 20 },
            { translations: { ar: "النادي البنزرتي", tn: "السي آبي", fr: "Club Bizertin", en: "Club Bizertin" }, is_correct: true, points: 20 },
            { translations: { ar: "شبيبة القيروان", tn: "الجي اس كا", fr: "JS Kairouan", en: "JS Kairouan" }, is_correct: true, points: 30 },
            { translations: { ar: "مستقبل المرسى", tn: "المرسى", fr: "AS Marsa", en: "AS Marsa" }, is_correct: true, points: 30 },
            { translations: { ar: "الاتحاد المنستيري", tn: "المنستير", fr: "US Monastir", en: "US Monastir" }, is_correct: true, points: 30 },
            { translations: { ar: "ريال مدريد", tn: "ريال مدريد", fr: "Real Madrid", en: "Real Madrid" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 242,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 ملاعب كرة قدم في تونس؟" },
            tn: { text: "أذكر 9 ستادات كورة في تونس؟" },
            fr: { text: "Citez 9 stades de football en Tunisie ?" },
            en: { text: "Name 9 football stadiums in Tunisia" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "ملعب رادس", tn: "ستاد رادس", fr: "Stade de Rades", en: "Rades Stadium" }, is_correct: true, points: 10 },
            { translations: { ar: "ملعب المنزه", tn: "ستاد المنزه", fr: "Stade d'El Menzah", en: "El Menzah Stadium" }, is_correct: true, points: 10 },
            { translations: { ar: "ملعب الطيب المهيري", tn: "المهيري في صفاقس", fr: "Stade Taieb Mhiri", en: "Taieb Mhiri Sfax" }, is_correct: true, points: 10 },
            { translations: { ar: "ملعب سوسة الأولمبي", tn: "ستاد سوسة الأولمبي", fr: "Stade olympique de Sousse", en: "Sousse Olympic Stadium" }, is_correct: true, points: 20 },
            { translations: { ar: "ملعب مصطفى بن جنات", tn: "بن جنات في المنستير", fr: "Stade Mustapha Ben Jannet", en: "Mustapha Ben Jannet Monastir" }, is_correct: true, points: 20 },
            { translations: { ar: "ملعب الشاذلي زويتن", tn: "ستاد زويتن", fr: "Stade Chedly Zouiten", en: "Chedly Zouiten Tunis" }, is_correct: true, points: 20 },
            { translations: { ar: "ملعب 15 أكتوبر", tn: "ستاد 15 أكتوبر ببنزرت", fr: "Stade du 15-Octobre", en: "15 October Bizerte" }, is_correct: true, points: 30 },
            { translations: { ar: "ملعب حمدة العواني", tn: "ستاد حمدة العواني بالقيروان", fr: "Stade Hamda Laouani", en: "Hamda Laouani Kairouan" }, is_correct: true, points: 30 },
            { translations: { ar: "ملعب باجة", tn: "ستاد باجة (بوجمعة الكميتي)", fr: "Stade Boujemaa Kmiti Beja", en: "Boujemaa Kmiti Beja" }, is_correct: true, points: 30 },
            { translations: { ar: "كامب نو", tn: "كامب نو", fr: "Camp Nou", en: "Camp Nou" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 243,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 لاعبين تونسيين احترفوا في أوروبا؟" },
            tn: { text: "أذكر 9 ملاعبية توانسة احترفوا البرا في أوروبا؟" },
            fr: { text: "Citez 9 footballeurs tunisiens ayant joué en Europe ?" },
            en: { text: "Name 9 Tunisian players who played in Europe" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "وهبي خزري", tn: "وهبي خزري", fr: "Wahbi Khazri", en: "Wahbi Khazri" }, is_correct: true, points: 10 },
            { translations: { ar: "أيمن عبد النور", tn: "أبيدور", fr: "Aymen Abdennour", en: "Aymen Abdennour" }, is_correct: true, points: 10 },
            { translations: { ar: "ياسين الشيخاوي", tn: "الشيخاوي", fr: "Yassine Chikhaoui", en: "Yassine Chikhaoui" }, is_correct: true, points: 10 },
            { translations: { ar: "حاتم الطرابلسي", tn: "حاتم الطرابلسي", fr: "Hatem Trabelsi", en: "Hatem Trabelsi" }, is_correct: true, points: 20 },
            { translations: { ar: "أنيس البدري", tn: "أنيس البدري", fr: "Anice Badri", en: "Anice Badri" }, is_correct: true, points: 20 },
            { translations: { ar: "علي معلول", tn: "علي معلول", fr: "Ali Maaloul", en: "Ali Maaloul" }, is_correct: true, points: 20 },
            { translations: { ar: "إلياس السخيري", tn: "السخيري", fr: "Ellyes Skhiri", en: "Ellyes Skhiri" }, is_correct: true, points: 30 },
            { translations: { ar: "حنبعل المجبري", tn: "حنبعل المجبري", fr: "Hannibal Mejbri", en: "Hannibal Mejbri" }, is_correct: true, points: 30 },
            { translations: { ar: "نعيم السليتي", tn: "نعيم السليتي", fr: "Naim Sliti", en: "Naim Sliti" }, is_correct: true, points: 30 },
            { translations: { ar: "زين الدين زيدان", tn: "زين الدين زيدان", fr: "Zinedine Zidane", en: "Zinedine Zidane" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 244,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 رياضات أولمبية؟" },
            tn: { text: "أذكر 9 رياضات أولمبية؟" },
            fr: { text: "Citez 9 sports olympiques ?" },
            en: { text: "Name 9 Olympic sports" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "ألعاب القوى", tn: "ألعاب قوى", fr: "Athlétisme", en: "Athletics" }, is_correct: true, points: 10 },
            { translations: { ar: "السباحة", tn: "عوم (سباحة)", fr: "Natation", en: "Swimming" }, is_correct: true, points: 10 },
            { translations: { ar: "الجمباز", tn: "جمباز", fr: "Gymnastique", en: "Gymnastics" }, is_correct: true, points: 10 },
            { translations: { ar: "كرة القدم", tn: "كورة قدم", fr: "Football", en: "Football" }, is_correct: true, points: 20 },
            { translations: { ar: "كرة السلة", tn: "كورة سلة", fr: "Basketball", en: "Basketball" }, is_correct: true, points: 20 },
            { translations: { ar: "التنس", tn: "تنس", fr: "Tennis", en: "Tennis" }, is_correct: true, points: 20 },
            { translations: { ar: "الملاكمة", tn: "بوكس (ملاكمة)", fr: "Boxe", en: "Boxing" }, is_correct: true, points: 30 },
            { translations: { ar: "الدراجات", tn: "بسكليتات", fr: "Cyclisme", en: "Cycling" }, is_correct: true, points: 30 },
            { translations: { ar: "الجودو", tn: "جودو", fr: "Judo", en: "Judo" }, is_correct: true, points: 30 },
            { translations: { ar: "سباق الحمام", tn: "حمام طاير", fr: "Course de pigeons", en: "Pigeon racing" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 245,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 متوجين تونسيين بميداليات أولمبية؟" },
            tn: { text: "أذكر 9 توانسة خذاو ميداليات أولمبية؟" },
            fr: { text: "Citez 9 médaillés olympiques tunisiens ?" },
            en: { text: "Name 9 famous Tunisian Olympic medalists" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "محمد القمودي", tn: "محمد القمودي", fr: "Mohammed Gammoudi", en: "Mohammed Gammoudi" }, is_correct: true, points: 10 },
            { translations: { ar: "أسامة الملولي", tn: "الملولي", fr: "Oussama Mellouli", en: "Oussama Mellouli" }, is_correct: true, points: 10 },
            { translations: { ar: "حبيبة الغريبي", tn: "حبيبة الغريبي", fr: "Habiba Ghribi", en: "Habiba Ghribi" }, is_correct: true, points: 10 },
            { translations: { ar: "أحمد أيوب الحفناوي", tn: "الحفناوي", fr: "Ahmed Hafnaoui", en: "Ahmed Ayoub Hafnaoui" }, is_correct: true, points: 20 },
            { translations: { ar: "محمد خليل الجندوبي", tn: "الجندوبي", fr: "Mohamed Khalil Jendoubi", en: "Mohamed Khalil Jendoubi" }, is_correct: true, points: 20 },
            { translations: { ar: "فريال عبد العزيز", tn: "فريال عبد العزيز", fr: "Feryal Abdelaziz", en: "Feryal Abdelaziz" }, is_correct: true, points: 20 },
            { translations: { ar: "روعة التليلي", tn: "روعة التليلي", fr: "Raoua Tlili", en: "Raoua Tlili" }, is_correct: true, points: 30 },
            { translations: { ar: "وليد كتيلة", tn: "وليد كتيلة", fr: "Walid Ktila", en: "Walid Ktila" }, is_correct: true, points: 30 },
            { translations: { ar: "ياسين الغربي", tn: "ياسين الغربي", fr: "Yassine Gharbi", en: "Yassine Gharbi" }, is_correct: true, points: 30 },
            { translations: { ar: "يوسين بولت", tn: "يوسين بولت", fr: "Usain Bolt", en: "Usain Bolt" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 246,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مراكز للاعبين في ملعب كرة القدم؟" },
            tn: { text: "أذكر 9 بلايص كورة في التشكيلة؟" },
            fr: { text: "Citez 9 postes de joueurs sur un terrain de football ?" },
            en: { text: "Name 9 positions in a football team" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "حارس مرمى", tn: "كول (حارس)", fr: "Gardien de but", en: "Goalkeeper" }, is_correct: true, points: 10 },
            { translations: { ar: "مدافع محوري", tn: "آكسيال (مدافع محوري)", fr: "Défenseur central", en: "Center Back" }, is_correct: true, points: 10 },
            { translations: { ar: "ظهير أيسر", tn: "ظهير أيسر (دوش)", fr: "Arrière gauche", en: "Left Back" }, is_correct: true, points: 10 },
            { translations: { ar: "ظهير أيمن", tn: "ظهير أيمن (دروا)", fr: "Arrière droit", en: "Right Back" }, is_correct: true, points: 20 },
            { translations: { ar: "وسط دفاعي", tn: "بيفو (وسط دفاعي)", fr: "Milieu défensif", en: "Defensive Midfielder" }, is_correct: true, points: 20 },
            { translations: { ar: "وسط محوري", tn: "ريلايير (وسط محوري)", fr: "Milieu central", en: "Central Midfielder" }, is_correct: true, points: 20 },
            { translations: { ar: "صانع ألعاب", tn: "صانع ألعاب (ديس)", fr: "Milieu offensif", en: "Attacking Midfielder" }, is_correct: true, points: 30 },
            { translations: { ar: "جناح أيسر", tn: "جناح أيسر", fr: "Ailier gauche", en: "Left Winger" }, is_correct: true, points: 30 },
            { translations: { ar: "مهاجم صريح", tn: "رأس حربة (أوفون)", fr: "Avant-centre (Buteur)", en: "Striker" }, is_correct: true, points: 30 },
            { translations: { ar: "حكم الساحة", tn: "الحكم", fr: "Arbitre", en: "Referee" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 247,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 من أشهر لاعبي كرة القدم في العالم تاريخياً؟" },
            tn: { text: "أذكر 9 ملاعبية كورة معروفين في العالم؟" },
            fr: { text: "Citez 9 des joueurs de football les plus célèbres de l'histoire ?" },
            en: { text: "Name 9 world-famous football players" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "ليونيل ميسي", tn: "ميسي", fr: "Lionel Messi", en: "Lionel Messi" }, is_correct: true, points: 10 },
            { translations: { ar: "كريستيانو رونالدو", tn: "رونالدو", fr: "Cristiano Ronaldo", en: "Cristiano Ronaldo" }, is_correct: true, points: 10 },
            { translations: { ar: "بيليه", tn: "بيليه", fr: "Pele", en: "Pele" }, is_correct: true, points: 10 },
            { translations: { ar: "دييغو مارادونا", tn: "مارادونا", fr: "Diego Maradona", en: "Diego Maradona" }, is_correct: true, points: 20 },
            { translations: { ar: "زين الدين زيدان", tn: "زيدان", fr: "Zinedine Zidane", en: "Zinedine Zidane" }, is_correct: true, points: 20 },
            { translations: { ar: "رونالدينيو", tn: "رونالدينيو", fr: "Ronaldinho", en: "Ronaldinho" }, is_correct: true, points: 20 },
            { translations: { ar: "يوهان كرويف", tn: "كرويف", fr: "Johan Cruyff", en: "Johan Cruyff" }, is_correct: true, points: 30 },
            { translations: { ar: "رونالدو الظاهرة", tn: "رونالدو البرازيلي", fr: "Ronaldo Nazario", en: "Ronaldo Nazario" }, is_correct: true, points: 30 },
            { translations: { ar: "فرانز بيكنباور", tn: "بيكنباور", fr: "Franz Beckenbauer", en: "Franz Beckenbauer" }, is_correct: true, points: 30 },
            { translations: { ar: "مايكل جوردان", tn: "مايكل جوردان", fr: "Michael Jordan", en: "Michael Jordan" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 248,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أندية كرة قدم تلعب في الدوري الإنجليزي الممتاز؟" },
            tn: { text: "أذكر 9 جمعيات تلعب في البريميرليغ الإنجليزي؟" },
            fr: { text: "Citez 9 clubs de football de la Premier League anglaise ?" },
            en: { text: "Name 9 football clubs in the English Premier League" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "مانشستر يونايتد", tn: "مانشستر يونايتد", fr: "Manchester United", en: "Manchester United" }, is_correct: true, points: 10 },
            { translations: { ar: "مانشستر سيتي", tn: "مانشستر سيتي", fr: "Manchester City", en: "Manchester City" }, is_correct: true, points: 10 },
            { translations: { ar: "ليفربول", tn: "ليفربول", fr: "Liverpool", en: "Liverpool" }, is_correct: true, points: 10 },
            { translations: { ar: "أرسنال", tn: "أرسنال", fr: "Arsenal", en: "Arsenal" }, is_correct: true, points: 20 },
            { translations: { ar: "تشيلسي", tn: "تشيلسي", fr: "Chelsea", en: "Chelsea" }, is_correct: true, points: 20 },
            { translations: { ar: "توتنهام هوتسبير", tn: "توتنهام", fr: "Tottenham Hotspur", en: "Tottenham Hotspur" }, is_correct: true, points: 20 },
            { translations: { ar: "أستون فيلا", tn: "أستون فيلا", fr: "Aston Villa", en: "Aston Villa" }, is_correct: true, points: 30 },
            { translations: { ar: "نيوكاسل يونايتد", tn: "نيوكاسل", fr: "Newcastle United", en: "Newcastle United" }, is_correct: true, points: 30 },
            { translations: { ar: "إيفرتون", tn: "إيفرتون", fr: "Everton", en: "Everton" }, is_correct: true, points: 30 },
            { translations: { ar: "باريس سان جيرمان", tn: "بي اس جي", fr: "PSG", en: "PSG" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 249,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 رياضات تُستخدم فيها المضرب؟" },
            tn: { text: "أذكر 9 رياضات يستعملوا فيها راكيت (مضرب)؟" },
            fr: { text: "Citez 9 sports de raquette ?" },
            en: { text: "Name 9 sports that use a racket" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "التنس", tn: "تنس", fr: "Tennis", en: "Tennis" }, is_correct: true, points: 10 },
            { translations: { ar: "الريشة الطائرة", tn: "بادمنتون", fr: "Badminton", en: "Badminton" }, is_correct: true, points: 10 },
            { translations: { ar: "الاسكواش", tn: "اسكواش", fr: "Squash", en: "Squash" }, is_correct: true, points: 10 },
            { translations: { ar: "تنس الطاولة", tn: "بينغ بونغ (تنس طاولة)", fr: "Tennis de table", en: "Table Tennis" }, is_correct: true, points: 20 },
            { translations: { ar: "البادل", tn: "بادل", fr: "Padel", en: "Padel" }, is_correct: true, points: 20 },
            { translations: { ar: "الراكيتبول", tn: "راكيتبول", fr: "Racquetball", en: "Racquetball" }, is_correct: true, points: 20 },
            { translations: { ar: "كرة السرعة", tn: "كورة سرعة", fr: "Speed-ball", en: "Speed-ball" }, is_correct: true, points: 30 },
            { translations: { ar: "التنس الحقيقي", tn: "ريال تنس", fr: "Real Tennis", en: "Real Tennis" }, is_correct: true, points: 30 },
            { translations: { ar: "البيكلبول", tn: "بيكلبول", fr: "Pickleball", en: "Pickleball" }, is_correct: true, points: 30 },
            { translations: { ar: "كرة السلة", tn: "كورة سلة", fr: "Basketball", en: "Basketball" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 250,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 من كبريات التظاهرات الرياضية العالمية؟" },
            tn: { text: "أذكر 9 إيفينمونات سبورتيف كبار في العالم؟" },
            fr: { text: "Citez 9 événements sportifs mondiaux majeurs ?" },
            en: { text: "Name 9 major global sporting events" }
        },
        category: "Sports",
        subcategory: "Team Sports",
        answers: [
            { translations: { ar: "كأس العالم لكرة القدم", tn: "كأس العالم", fr: "Coupe du monde de la FIFA", en: "FIFA World Cup" }, is_correct: true, points: 10 },
            { translations: { ar: "الألعاب الأولمبية", tn: "الأولمبياد", fr: "Jeux Olympiques", en: "Olympic Games" }, is_correct: true, points: 10 },
            { translations: { ar: "دوري أبطال أوروبا", tn: "التشامبيونزليغ", fr: "Ligue des champions de l'UEFA", en: "UEFA Champions League" }, is_correct: true, points: 10 },
            { translations: { ar: "بطولة ويمبلدون للتنس", tn: "ويمبلدون", fr: "Wimbledon", en: "Wimbledon" }, is_correct: true, points: 20 },
            { translations: { ar: "طواف فرنسا للدراجات", tn: "تور دو فرانس", fr: "Tour de France", en: "Tour de France" }, is_correct: true, points: 20 },
            { translations: { ar: "سباق الفورمولا 1", tn: "فورمولا 1", fr: "Grand Prix de Formule 1", en: "Formula 1 Grand Prix" }, is_correct: true, points: 20 },
            { translations: { ar: "السوبر بول", tn: "السوبر بول", fr: "Super Bowl", en: "Super Bowl" }, is_correct: true, points: 30 },
            { translations: { ar: "نهائيات دوري كرة السلة الأمريكي", tn: "نهائيات NBA", fr: "Finales NBA", en: "NBA Finals" }, is_correct: true, points: 30 },
            { translations: { ar: "كأس العالم للرغبي", tn: "كأس العالم للرغبي", fr: "Coupe du monde de rugby", en: "Rugby World Cup" }, is_correct: true, points: 30 },
            { translations: { ar: "معرض السيارات الدولي", tn: "معرض كراهب", fr: "Salon de l'auto", en: "Auto Show" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 251,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 ملابس تقليدية تونسية؟" },
            tn: { text: "أذكر 9 حوايج تونسية تقليدية لبسة؟" },
            fr: { text: "Citez 9 vêtements traditionnels tunisiens ?" },
            en: { text: "Name 9 traditional Tunisian clothes" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "جبة", tn: "جبة", fr: "Jebba", en: "Jebba" }, is_correct: true, points: 10 },
            { translations: { ar: "برنوس", tn: "برنوس", fr: "Barnous", en: "Barnous" }, is_correct: true, points: 10 },
            { translations: { ar: "سفساري", tn: "سفساري", fr: "Sefseri", en: "Sefseri" }, is_correct: true, points: 10 },
            { translations: { ar: "شاشية", tn: "شاشية", fr: "Chechia", en: "Chechia" }, is_correct: true, points: 20 },
            { translations: { ar: "فوطة وبلوزة", tn: "فوطة وبلوزة", fr: "Fouta et Blouza", en: "Fouta and Blouza" }, is_correct: true, points: 20 },
            { translations: { ar: "كدرون", tn: "كدرون", fr: "Kadroun", en: "Kadroun" }, is_correct: true, points: 20 },
            { translations: { ar: "كسوة", tn: "كسوة تونسية", fr: "Keswa", en: "Keswa" }, is_correct: true, points: 30 },
            { translations: { ar: "مريول فضيلة", tn: "مريول فضيلة", fr: "Maryoul Fadhila", en: "Maryoul Fadhila" }, is_correct: true, points: 30 },
            { translations: { ar: "دنقري", tn: "دنقري (بستة زرقاء)", fr: "Dengri", en: "Dengri" }, is_correct: true, points: 30 },
            { translations: { ar: "كيمونو ياباني", tn: "كيمونو ياباني", fr: "Kimono japonais", en: "Japanese kimono" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 252,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 آلات موسيقية تُستخدم في الموسيقى التونسية؟" },
            tn: { text: "أذكر 9 آلات موسيقية تستعمل في الموزيكا في تونس؟" },
            fr: { text: "Citez 9 instruments utilisés dans la musique tunisienne ?" },
            en: { text: "Name 9 traditional musical instruments in Tunisia" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "عود", tn: "عود", fr: "Oud", en: "Oud" }, is_correct: true, points: 10 },
            { translations: { ar: "دربوكة", tn: "دربوكة", fr: "Darbouka", en: "Darbouka" }, is_correct: true, points: 10 },
            { translations: { ar: "مزود", tn: "مزود", fr: "Mezoued", en: "Mezoued" }, is_correct: true, points: 10 },
            { translations: { ar: "ناي", tn: "ناي", fr: "Nay", en: "Nay" }, is_correct: true, points: 20 },
            { translations: { ar: "قانون", tn: "قانون", fr: "Qanun", en: "Qanun" }, is_correct: true, points: 20 },
            { translations: { ar: "طار", tn: "طار (طار طبل)", fr: "Tar", en: "Tar" }, is_correct: true, points: 20 },
            { translations: { ar: "بندير", tn: "بندير", fr: "Bendir", en: "Bendir" }, is_correct: true, points: 30 },
            { translations: { ar: "قصبة", tn: "قصبة", fr: "Gasba", en: "Gasba" }, is_correct: true, points: 30 },
            { translations: { ar: "زكرة", tn: "زكرة", fr: "Zokra", en: "Zokra" }, is_correct: true, points: 30 },
            { translations: { ar: "غيتار كهربائي", tn: "غيتار كهربائي", fr: "Guitare électrique", en: "Electric guitar" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 253,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 صناعات تقليدية أو هدايا تذكارية مشهورة في تونس؟" },
            tn: { text: "أذكر 9 صناعات تقليدية تونسية؟" },
            fr: { text: "Citez 9 artisanats ou souvenirs traditionnels tunisiens ?" },
            en: { text: "Name 9 traditional Tunisian crafts or souvenirs" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "زربية ومرقوم", tn: "زربية ومرقوم", fr: "Tapis et Margoum", en: "Carpets and Margoum" }, is_correct: true, points: 10 },
            { translations: { ar: "فخار وخزف", tn: "فخار نابلي", fr: "Poterie et céramique", en: "Pottery and ceramics" }, is_correct: true, points: 10 },
            { translations: { ar: "نقش على النحاس", tn: "نحاس منقوش", fr: "Gravure sur cuivre", en: "Copper engraving" }, is_correct: true, points: 10 },
            { translations: { ar: "صناعة خشب الزيتون", tn: "حاجات خشب زيتون", fr: "Objets en bois d'olivier", en: "Olive wood items" }, is_correct: true, points: 20 },
            { translations: { ar: "تقطير الزهور والورد", tn: "تقطير الورد", fr: "Distillation d'essences", en: "Flower distillation" }, is_correct: true, points: 20 },
            { translations: { ar: "بلغة وشلاكة جلد", tn: "بلغة", fr: "Babouches (Balgha)", en: "Balgha leather slippers" }, is_correct: true, points: 20 },
            { translations: { ar: "شاشية", tn: "شاشية عربي", fr: "Chechias", en: "Chechias" }, is_correct: true, points: 30 },
            { translations: { ar: "فسيفساء", tn: "فسيفساء", fr: "Mosaïques", en: "Mosaics" }, is_correct: true, points: 30 },
            { translations: { ar: "فضة ومصوغ تقليدي", tn: "فضة ومصوغ", fr: "Bijoux traditionnels en argent", en: "Traditional silver jewelry" }, is_correct: true, points: 30 },
            { translations: { ar: "ساعات ذكية", tn: "منڨالة سمارت", fr: "Montres connectées", en: "Smart watches" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 254,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أسواق تقليدية في المدينة العتيقة بتونس؟" },
            tn: { text: "أذكر 9 أسواق في بلاد العربي تونس؟" },
            fr: { text: "Citez 9 souks de la Médina de Tunis ?" },
            en: { text: "Name 9 souks of the Tunis Medina" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "سوق العطارين", tn: "سوق العطارين", fr: "Souk El Attarine", en: "Souk el Attarine" }, is_correct: true, points: 10 },
            { translations: { ar: "سوق البركة", tn: "سوق البركة", fr: "Souk El Birka", en: "Souk el Birka" }, is_correct: true, points: 10 },
            { translations: { ar: "سوق الترك", tn: "سوق الترك", fr: "Souk El Trok", en: "Souk el Trok" }, is_correct: true, points: 10 },
            { translations: { ar: "سوق السكاجين", tn: "سوق السكاجين", fr: "Souk El Sekajine", en: "Souk el Sekajine" }, is_correct: true, points: 20 },
            { translations: { ar: "سوق البلاط", tn: "سوق البلاط", fr: "Souk El Blat", en: "Souk el Blat" }, is_correct: true, points: 20 },
            { translations: { ar: "سوق القماش", tn: "سوق القماش", fr: "Souk El Kmach", en: "Souk el Kmach" }, is_correct: true, points: 20 },
            { translations: { ar: "سوق الشواشين", tn: "سوق الشواشين", fr: "Souk El Chaouachine", en: "Souk el Chaouachine" }, is_correct: true, points: 30 },
            { translations: { ar: "سوق النساء", tn: "سوق النساء", fr: "Souk El Nissa", en: "Souk el Nissa" }, is_correct: true, points: 30 },
            { translations: { ar: "سوق اللفة", tn: "سوق اللفة", fr: "Souk El Lecha", en: "Souk el Lecha" }, is_correct: true, points: 30 },
            { translations: { ar: "سوق السيارات المستعملة", tn: "سوق الكراهب الكبار", fr: "Marché aux voitures", en: "Car market" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 255,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أشياء أو مراسم توجد في العرس التونسي؟" },
            tn: { text: "أذكر 9 حاجات في عرس تونسي؟" },
            fr: { text: "Citez 9 éléments ou étapes d'un mariage tunisien ?" },
            en: { text: "Name 9 things found in a Tunisian traditional wedding" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "الوطية", tn: "الوطية", fr: "Outia", en: "Outia" }, is_correct: true, points: 10 },
            { translations: { ar: "الحنة", tn: "الحنة", fr: "Henné", en: "Henna" }, is_correct: true, points: 10 },
            { translations: { ar: "الجبة", tn: "الجبة للعروس", fr: "Jebba (marié)", en: "Jebba" }, is_correct: true, points: 10 },
            { translations: { ar: "الكسوة", tn: "الكسوة", fr: "Keswa (mariée)", en: "Keswa" }, is_correct: true, points: 20 },
            { translations: { ar: "الدربوكة", tn: "الدربوكة", fr: "Darbouka", en: "Darbouka" }, is_correct: true, points: 20 },
            { translations: { ar: "البقلاوة", tn: "البقلاوة لتوزيعها", fr: "Baklawa", en: "Baklawa" }, is_correct: true, points: 20 },
            { translations: { ar: "المزود", tn: "المزود", fr: "Mezoued", en: "Mezoued" }, is_correct: true, points: 30 },
            { translations: { ar: "الكسكسي", tn: "كسكسي العرس", fr: "Couscous de fête", en: "Couscous" }, is_correct: true, points: 30 },
            { translations: { ar: "الجلوة", tn: "الجلوة", fr: "Jelloua", en: "Jelloua" }, is_correct: true, points: 30 },
            { translations: { ar: "السوشي", tn: "سوشي", fr: "Sushi", en: "Sushi" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 256,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 ألعاب شعبية أو تقليدية تونسية؟" },
            tn: { text: "أذكر 9 ألعاب شعبية تقليدية في تونس؟" },
            fr: { text: "Citez 9 jeux populaires ou traditionnels en Tunisie ?" },
            en: { text: "Name 9 traditional games in Tunisia" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "الخربقة", tn: "الخربقة", fr: "El-Kharbga", en: "El-Kharbga" }, is_correct: true, points: 10 },
            { translations: { ar: "السيق", tn: "السيق", fr: "Sig", en: "Sig" }, is_correct: true, points: 10 },
            { translations: { ar: "شيش بيش", tn: "شيش بيش (نرد)", fr: "Shesh-Besh", en: "Shesh-Besh" }, is_correct: true, points: 10 },
            { translations: { ar: "الدومينو", tn: "دومينو", fr: "Domino", en: "Domino" }, is_correct: true, points: 20 },
            { translations: { ar: "الدامة", tn: "دامة", fr: "Dama", en: "Dama" }, is_correct: true, points: 20 },
            { translations: { ar: "الشكبة", tn: "شكبة", fr: "Chak-Bak", en: "Chak-Bak" }, is_correct: true, points: 20 },
            { translations: { ar: "الغميضة", tn: "غميضة (شيشا بيشا)", fr: "Chicha-Bicha (colin-maillard)", en: "Chicha-Bicha" }, is_correct: true, points: 30 },
            { translations: { ar: "كرة الحفّات", tn: "كورة حفّات", fr: "Kora", en: "Kora" }, is_correct: true, points: 30 },
            { translations: { ar: "الربيع", tn: "لعبة الربيع", fr: "Jeu du printemps", en: "Spring game" }, is_correct: true, points: 30 },
            { translations: { ar: "بلايستيشن", tn: "بلاي ستيشن", fr: "PlayStation", en: "PlayStation" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 257,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 عادات أو أنشطة تمارسها العائلات التونسية يوم الأحد؟" },
            tn: { text: "أذكر 9 حاجات يعملوهم العائلات التونسية نهار الأحد؟" },
            fr: { text: "Citez 9 habitudes ou activités dominicales des familles tunisiennes ?" },
            en: { text: "Name 9 habits of Tunisian families on Sundays" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "أكل الكسكسي", tn: "ماكلة الكسكسي بالخضرة", fr: "Manger du couscous", en: "Eating Couscous" }, is_correct: true, points: 10 },
            { translations: { ar: "الذهاب للحمام", tn: "مشية للحمام التونسي", fr: "Aller au hammam", en: "Going to the Hammam" }, is_correct: true, points: 10 },
            { translations: { ar: "زيارة الأقارب", tn: "صلة الرحم والزيارات", fr: "Visiter la famille", en: "Visiting family" }, is_correct: true, points: 10 },
            { translations: { ar: "شراء البمبالوني", tn: "شريان البمبالوني سخون", fr: "Acheter du bambalouni", en: "Buying Bambalouni" }, is_correct: true, points: 20 },
            { translations: { ar: "شرب تاي باللوز", tn: "كاس تاي منعنع باللوز", fr: "Boire du thé à la menthe", en: "Drinking Mint tea" }, is_correct: true, points: 20 },
            { translations: { ar: "جولة في سيدي بوسعيد", tn: "مشية لسيدي بوسعيد", fr: "Se promener à Sidi Bou Said", en: "Walking in Sidi Bou Said" }, is_correct: true, points: 20 },
            { translations: { ar: "مشاهدة برنامج الأحد الرياضي", tn: "الفرج على الأحد الرياضي", fr: "Regarder l'émission Dimanche Sport", en: "Watching Sunday sports show" }, is_correct: true, points: 30 },
            { translations: { ar: "الذهاب للسوق الأسبوعي", tn: "قضية من المارشي عالحسبة", fr: "Aller au marché hebdomadaire", en: "Going to the weekly market" }, is_correct: true, points: 30 },
            { translations: { ar: "النوم المتأخر", tn: "النوم والراحة للقايلة", fr: "Faire la grasse matinée", en: "Sleeping late" }, is_correct: true, points: 30 },
            { translations: { ar: "الذهاب للعمل بنسق كامل", tn: "الخدمة والعمل الكامل", fr: "Aller travailler", en: "Going to work" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 258,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أشياء أو أدوات تجدها في الحمام التقليدي التونسي؟" },
            tn: { text: "أذكر 9 حاجات تهزها وإلا تلقاها في الحمام العربي التونسي؟" },
            fr: { text: "Citez 9 objets du hammam traditionnel tunisien ?" },
            en: { text: "Name 9 items found in a traditional Hammam" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "كاسة", tn: "كاسة حك", fr: "Gant de kassa (gommage)", en: "Kassa glove" }, is_correct: true, points: 10 },
            { translations: { ar: "طفل", tn: "طفل طين للشعر", fr: "Argile (Tfal)", en: "Tfal clay" }, is_correct: true, points: 10 },
            { translations: { ar: "صابون أخضر", tn: "صابون أخضر (تونسي)", fr: "Savon vert traditionnel", en: "Olive soap" }, is_correct: true, points: 10 },
            { translations: { ar: "سطل", tn: "سطل الحمام", fr: "Seau d'eau", en: "Water bucket" }, is_correct: true, points: 20 },
            { translations: { ar: "محك جلدي", tn: "محك", fr: "Haleb (récipient)", en: "Haleb" }, is_correct: true, points: 20 },
            { translations: { ar: "بقيلة", tn: "بقيلة", fr: "Bqila", en: "Bqila" }, is_correct: true, points: 20 },
            { translations: { ar: "باشكير", tn: "بشكير (منشفة)", fr: "Serviette (Bashkir)", en: "Towels" }, is_correct: true, points: 30 },
            { translations: { ar: "سفساري", tn: "سفساري حمام", fr: "Sefseri de hammam", en: "Sefseri" }, is_correct: true, points: 30 },
            { translations: { ar: "شلاكة حمام", tn: "شلاكة لوح", fr: "Sabots de bois/tongs", en: "Wood slippers" }, is_correct: true, points: 30 },
            { translations: { ar: "مجفف شعر كهربائي", tn: "سيشوار شعر", fr: "Sèche-cheveux", en: "Hairdryer" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 259,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 عبارات تحية أو ترحيب بالعامية التونسية؟" },
            tn: { text: "أذكر 9 عبارات تحية وإلا ترحيب تونسية بالدارجة؟" },
            fr: { text: "Citez 9 expressions populaires de salutation ou vœux en Tunisie ?" },
            en: { text: "Name 9 popular Tunisian expressions of greeting or well-wishing" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "ع السلامة", tn: "ع السلامة", fr: "Aslama (bonjour)", en: "Aslama" }, is_correct: true, points: 10 },
            { translations: { ar: "بالخير", tn: "على خير (تصبح على خير)", fr: "Belkhir", en: "Belkhir" }, is_correct: true, points: 10 },
            { translations: { ar: "نهارك زين", tn: "نهارك زين", fr: "Nharik Zin (bonne journée)", en: "Nharik Zin" }, is_correct: true, points: 10 },
            { translations: { ar: "إن شاء الله مبروك", tn: "إن شاء الله مبروك", fr: "Enshallah Mabrouk", en: "Enshallah Mabrouk" }, is_correct: true, points: 20 },
            { translations: { ar: "يعطيك الصحة", tn: "يعطيك الصحة", fr: "Yaatik el Sahha", en: "Yaatik el Sahha" }, is_correct: true, points: 20 },
            { translations: { ar: "ربي يفضلك", tn: "ربي يفضلك", fr: "Rabbi Yfadlik", en: "Rabbi Yfadlik" }, is_correct: true, points: 20 },
            { translations: { ar: "بسم الله", tn: "بسم الله", fr: "Bismillah", en: "Bismillah" }, is_correct: true, points: 30 },
            { translations: { ar: "الحمد لله", tn: "الحمد لله", fr: "Hamdullah", en: "Hamdullah" }, is_correct: true, points: 30 },
            { translations: { ar: "بسلامة", tn: "بسلامة (إلى اللقاء)", fr: "Beslama (au revoir)", en: "Beslama" }, is_correct: true, points: 30 },
            { translations: { ar: "هاو آر يو بالإنجليزية", tn: "هاو آر يو", fr: "How are you", en: "How are you" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 260,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أشياء توجد في بيت القعاد (غرفة الجلوس) التونسية؟" },
            tn: { text: "أذكر 9 حاجات في بيت القعاد التونسية التقليدية؟" },
            fr: { text: "Citez 9 objets que l'on trouve dans un salon traditionnel tunisien ?" },
            en: { text: "Name 9 items in a Tunisian traditional living room" }
        },
        category: "Culture & Lifestyle",
        subcategory: "Traditions",
        answers: [
            { translations: { ar: "سداري", tn: "سداري صالون", fr: "Sedari (canapé)", en: "Sedari sofa" }, is_correct: true, points: 10 },
            { translations: { ar: "زربية مرقوم", tn: "زربية مرقوم", fr: "Margoum rug", en: "Margoum rug" }, is_correct: true, points: 10 },
            { translations: { ar: "مخاد", tn: "مخاد", fr: "Coussins", en: "Cushions" }, is_correct: true, points: 10 },
            { translations: { ar: "طاولة تاي", tn: "طاولة تاي", fr: "Table à thé", en: "Tea table" }, is_correct: true, points: 20 },
            { translations: { ar: "تلفزة", tn: "تلفزة", fr: "Téléviseur", en: "TV" }, is_correct: true, points: 20 },
            { translations: { ar: "كليم", tn: "كليم حائط", fr: "Klim rug", en: "Klim rug" }, is_correct: true, points: 20 },
            { translations: { ar: "مائدة نحاس", tn: "طاولة نحاس منقوشة", fr: "Plateau de cuivre gravé", en: "Copper plate" }, is_correct: true, points: 30 },
            { translations: { ar: "ريدوات", tn: "ريدوات (ستائر)", fr: "Rideaux", en: "Curtains" }, is_correct: true, points: 30 },
            { translations: { ar: "صور الجدود", tn: "تصاور الجدود", fr: "Photos des ancêtres", en: "Photos of grandparents" }, is_correct: true, points: 30 },
            { translations: { ar: "مدفأة حطب أمريكية", tn: "شوميني حطب أمريكية", fr: "Cheminée à bois américaine", en: "Fireplace" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 261,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 ممثلين تونسيين بارزين؟" },
            tn: { text: "أذكر 9 ممثلين توانسة معروفين؟" },
            fr: { text: "Citez 9 acteurs tunisiens célèbres ?" },
            en: { text: "Name 9 famous Tunisian actors" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "لطفي العبدلي", tn: "لطفي العبدلي", fr: "Lotfi Abdelli", en: "Lotfi Abdelli" }, is_correct: true, points: 10 },
            { translations: { ar: "كمال التواتي", tn: "كمال التواتي", fr: "Kamel Touati", en: "Kamel Touati" }, is_correct: true, points: 10 },
            { translations: { ar: "جعفر القاسمي", tn: "جعفر القاسمي", fr: "Jaafar Guesmi", en: "Jaafar Guesmi" }, is_correct: true, points: 10 },
            { translations: { ar: "منى نور الدين", tn: "منى نور الدين", fr: "Mouna Noureddine", en: "Mouna Noureddine" }, is_correct: true, points: 20 },
            { translations: { ar: "فتحي الهداوي", tn: "فتحي الهداوي", fr: "Fethi Haddaoui", en: "Fethi Haddaoui" }, is_correct: true, points: 20 },
            { translations: { ar: "هشام رستم", tn: "هشام رستم", fr: "Hichem Rostom", en: "Hichem Rostom" }, is_correct: true, points: 20 },
            { translations: { ar: "نضال السعدي", tn: "نضال السعدي", fr: "Nidhal Saadi", en: "Nidhal Saadi" }, is_correct: true, points: 30 },
            { translations: { ar: "ياسين بن قمرة", tn: "ياسين بن قمرة", fr: "Yassine Ben Gamra", en: "Yassine Ben Gamra" }, is_correct: true, points: 30 },
            { translations: { ar: "ظافر العابدين", tn: "ظافر العابدين", fr: "Dhafer L'Abidine", en: "Dhafer L'Abidine" }, is_correct: true, points: 30 },
            { translations: { ar: "عادل إمام", tn: "عادل إمام", fr: "Adel Imam", en: "Adel Imam" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 262,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أفلام سينمائية تونسية؟" },
            tn: { text: "أذكر 9 أفلام تونسية؟" },
            fr: { text: "Citez 9 films tunisiens ?" },
            en: { text: "Name 9 Tunisian movies" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "دشرة", tn: "دشرة", fr: "Dachra", en: "Dachra" }, is_correct: true, points: 10 },
            { translations: { ar: "عصفور سطح", tn: "حلفاوين (عصفور السطح)", fr: "Halfaouine", en: "Halfaouine" }, is_correct: true, points: 10 },
            { translations: { ar: "صمت القصور", tn: "صمت القصور", fr: "Les Silences du palais", en: "Silences of the Palace" }, is_correct: true, points: 10 },
            { translations: { ar: "بورتو فارينا", tn: "بورتو فارينا", fr: "Porto Farina", en: "Porto Farina" }, is_correct: true, points: 20 },
            { translations: { ar: "نورا تحلم", tn: "نورا تحلم", fr: "Noura rêve", en: "Noura's Dream" }, is_correct: true, points: 20 },
            { translations: { ar: "بيك نعيش", tn: "بيك نعيش", fr: "Un fils", en: "A Son" }, is_correct: true, points: 20 },
            { translations: { ar: "بستاردو", tn: "بستاردو", fr: "Bastardo", en: "Bastardo" }, is_correct: true, points: 30 },
            { translations: { ar: "همس الرمال", tn: "همس الرمال", fr: "Le murmure des sables", en: "Whispering Sands" }, is_correct: true, points: 30 },
            { translations: { ar: "الجايدة", tn: "الجايدة", fr: "El Jaida", en: "El Jaida" }, is_correct: true, points: 30 },
            { translations: { ar: "فيلم تيتانيك", tn: "تيتانيك", fr: "Titanic", en: "Titanic" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 263,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مسلسلات تلفزية تونسية؟" },
            tn: { text: "أذكر 9 مسلسلات تونسية؟" },
            fr: { text: "Citez 9 séries télévisées tunisiennes ?" },
            en: { text: "Name 9 Tunisian TV series" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "نسيبتي العزيزة", tn: "نسيبتي العزيزة", fr: "Nsibti Laaziza", en: "Nsibti Laaziza" }, is_correct: true, points: 10 },
            { translations: { ar: "مكتوب", tn: "مكتوب", fr: "Maktoub", en: "Maktoub" }, is_correct: true, points: 10 },
            { translations: { ar: "شوفلي حل", tn: "شوفلي حل", fr: "Choufli Hal", en: "Choufli Hal" }, is_correct: true, points: 10 },
            { translations: { ar: "أولاد مفيدة", tn: "أولاد مفيدة", fr: "Awled Moufida", en: "Awled Moufida" }, is_correct: true, points: 20 },
            { translations: { ar: "حرقة", tn: "حرقة", fr: "Harga", en: "Harga" }, is_correct: true, points: 20 },
            { translations: { ar: "صيد الريم", tn: "صيد الريم", fr: "Sayd El Rim", en: "Sayd el Rim" }, is_correct: true, points: 20 },
            { translations: { ar: "غمرة سيدي محرص", tn: "سيدي محرز (ڨمرة)", fr: "Gamret Sidi Mahrez", en: "Gamret Sidi Mahrez" }, is_correct: true, points: 30 },
            { translations: { ar: "نوبة", tn: "نوبة", fr: "Nouba", en: "Nouba" }, is_correct: true, points: 30 },
            { translations: { ar: "كان يا ما كانش", tn: "كان يا ما كانش", fr: "Ken Ya Makenech", en: "Ken Ya Makenech" }, is_correct: true, points: 30 },
            { translations: { ar: "باب الحارة", tn: "باب الحارة", fr: "Bab Al-Hara", en: "Bab Al-Hara" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 264,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مغنين أو موسيقيين تونسيين معروفين؟" },
            tn: { text: "أذكر 9 فنانين أو مغنين توانسة؟" },
            fr: { text: "Citez 9 chanteurs ou musiciens tunisiens ?" },
            en: { text: "Name 9 Tunisian singers/musicians" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "الهادي الجويني", tn: "الهادي الجويني", fr: "Hedi Jouini", en: "Hedi Jouini" }, is_correct: true, points: 10 },
            { translations: { ar: "علي الرياحي", tn: "علي الرياحي", fr: "Ali Riahi", en: "Ali Riahi" }, is_correct: true, points: 10 },
            { translations: { ar: "صالحة", tn: "صالحة", fr: "Saliha", en: "Saliha" }, is_correct: true, points: 10 },
            { translations: { ar: "بلتي", tn: "بلتي", fr: "Balti", en: "Balti" }, is_correct: true, points: 20 },
            { translations: { ar: "صابر الرباعي", tn: "صابر الرباعي", fr: "Saber Rebai", en: "Saber Rebai" }, is_correct: true, points: 20 },
            { translations: { ar: "لطيفة العرفاوي", tn: "لطيفة", fr: "Latifa Arfaoui", en: "Latifa" }, is_correct: true, points: 20 },
            { translations: { ar: "آمال المثلوثي", tn: "آمال المثلوثي", fr: "Emel Mathlouthi", en: "Emel Mathlouthi" }, is_correct: true, points: 30 },
            { translations: { ar: "أمينة فاخت", tn: "أمينة فاخت", fr: "Amina Fakhet", en: "Amina Fakhet" }, is_correct: true, points: 30 },
            { translations: { ar: "لطفي بوشناق", tn: "بوشناق", fr: "Lotfi Bouchnak", en: "Lotfi Bouchnak" }, is_correct: true, points: 30 },
            { translations: { ar: "عمرو دياب", tn: "عمرو دياب", fr: "Amr Diab", en: "Amr Diab" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 265,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 قنوات كرتون للأطفال تبث باللغة العربية؟" },
            tn: { text: "أذكر 9 قنوات كرتون متاع صغار بالعربي؟" },
            fr: { text: "Citez 9 chaînes de dessins animés arabes pour enfants ?" },
            en: { text: "Name 9 cartoon networks or channels in Arabic" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "سبيستون", tn: "سبيستون", fr: "Spacetoon", en: "Spacetoon" }, is_correct: true, points: 10 },
            { translations: { ar: "إم بي سي 3", tn: "MBC 3", fr: "MBC 3", en: "MBC 3" }, is_correct: true, points: 10 },
            { translations: { ar: "قناة ماجد", tn: "قناة ماجد للأطفال", fr: "Majid Kids", en: "Majid Kids" }, is_correct: true, points: 10 },
            { translations: { ar: "كرتون نتورك بالعربية", tn: "CN بالعربية", fr: "Cartoon Network Arabic", en: "Cartoon Network Arabic" }, is_correct: true, points: 20 },
            { translations: { ar: "سبيس باور", tn: "سبيس باور", fr: "Space Power", en: "Space Power" }, is_correct: true, points: 20 },
            { translations: { ar: "الجزيرة للأطفال", tn: "الجزيرة للأطفال", fr: "Al Jazeera Children", en: "Al Jazeera Children" }, is_correct: true, points: 20 },
            { translations: { ar: "طيور الجنة", tn: "طيور الجنة", fr: "Toyor Al Janah", en: "Toyor Al Janah" }, is_correct: true, points: 30 },
            { translations: { ar: "كراميش", tn: "كراميش", fr: "Karameesh", en: "Karameesh" }, is_correct: true, points: 30 },
            { translations: { ar: "براعم", tn: "براعم", fr: "Baraem", en: "Baraem" }, is_correct: true, points: 30 },
            { translations: { ar: "سي إن إن العربية", tn: "CNN العربية", fr: "CNN Arabic", en: "CNN Arabic" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 266,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 من أشهر أنواع وتصنيفات الأفلام؟" },
            tn: { text: "أذكر 9 أنواع وأصناف أفلام؟" },
            fr: { text: "Citez 9 genres de films les plus célèbres ?" },
            en: { text: "Name 9 famous movie genres" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "أكشن", tn: "أكشن (حركة)", fr: "Action", en: "Action" }, is_correct: true, points: 10 },
            { translations: { ar: "كوميدي", tn: "كوميدي (ضحك)", fr: "Comédie", en: "Comedy" }, is_correct: true, points: 10 },
            { translations: { ar: "دراما", tn: "دراما", fr: "Drame", en: "Drama" }, is_correct: true, points: 10 },
            { translations: { ar: "رعب", tn: "رعب (خوف)", fr: "Horreur", en: "Horror" }, is_correct: true, points: 20 },
            { translations: { ar: "خيال علمي", tn: "خيال علمي", fr: "Science-fiction", en: "Sci-Fi" }, is_correct: true, points: 20 },
            { translations: { ar: "رومانسي", tn: "رومانسي", fr: "Romance", en: "Romance" }, is_correct: true, points: 20 },
            { translations: { ar: "وثائقي", tn: "وثائقي (حقائق)", fr: "Documentaire", en: "Documentary" }, is_correct: true, points: 30 },
            { translations: { ar: "إثارة", tn: "إثارة (تشويق)", fr: "Thriller", en: "Thriller" }, is_correct: true, points: 30 },
            { translations: { ar: "رسوم متحركة", tn: "أنيمشين (كرتون)", fr: "Animation", en: "Animation" }, is_correct: true, points: 30 },
            { translations: { ar: "فيسبوك", tn: "فيسبوك", fr: "Facebook", en: "Facebook" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 267,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أشياء أو أدوات تجدها في قاعة السينما؟" },
            tn: { text: "أذكر 9 حاجات تلقاها في قاعة السينما؟" },
            fr: { text: "Citez 9 choses ou objets que l'on trouve dans une salle de cinéma ?" },
            en: { text: "Name 9 things you can find in a movie theater" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "شاشة عرض ضخمة", tn: "الكرون (شاشة)", fr: "Écran géant", en: "Giant screen" }, is_correct: true, points: 10 },
            { translations: { ar: "بروجيكتور", tn: "ماكينة البروجيكتور", fr: "Projecteur", en: "Projecteur" }, is_correct: true, points: 10 },
            { translations: { ar: "بوشار (بوب كورن)", tn: "بوب كورن (بوشار)", fr: "Pop-corn", en: "Popcorn" }, is_correct: true, points: 10 },
            { translations: { ar: "كراسي مريحة", tn: "كراسي صالة عرض", fr: "Sièges (fauteuils)", en: "Seats" }, is_correct: true, points: 20 },
            { translations: { ar: "تذاكر الدخول", tn: "تذاكر (تساكر)", fr: "Tickets (billets)", en: "Tickets" }, is_correct: true, points: 20 },
            { translations: { ar: "مكبرات صوت دبلبي", tn: "مكبرات الصوت", fr: "Haut-parleurs", en: "Speakers" }, is_correct: true, points: 20 },
            { translations: { ar: "مشروبات غازية", tn: "كوكا ومشروبات", fr: "Boissons (sodas)", en: "Soda" }, is_correct: true, points: 30 },
            { translations: { ar: "نظارات ثلاثية الأبعاد", tn: "مرايات 3D", fr: "Lunettes 3D", en: "3D Glasses" }, is_correct: true, points: 30 },
            { translations: { ar: "أفيش الفيلم", tn: "بورتري الفيلم (معلقات)", fr: "Affiches de film", en: "Movie posters" }, is_correct: true, points: 30 },
            { translations: { ar: "سرير نوم", tn: "فرش نوم", fr: "Lit de couchage", en: "Sleeping bed" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 268,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 آلات موسيقية توجد في الأوركسترا السمفونية؟" },
            tn: { text: "أذكر 9 آلات موسيقية في فرقة السمفونية؟" },
            fr: { text: "Citez 9 instruments d'un orchestre symphonique ?" },
            en: { text: "Name 9 instruments in a Western symphony orchestra" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "كمان", tn: "كمان (فايلون)", fr: "Violon", en: "Violin" }, is_correct: true, points: 10 },
            { translations: { ar: "فيولا", tn: "فيولا", fr: "Alto", en: "Viola" }, is_correct: true, points: 10 },
            { translations: { ar: "تشيلو", tn: "تشيلو (فيلونسيل)", fr: "Violoncelle", en: "Cello" }, is_correct: true, points: 10 },
            { translations: { ar: "كونتراباس", tn: "كونتراباس", fr: "Contrebasse", en: "Double Bass" }, is_correct: true, points: 20 },
            { translations: { ar: "فلوت", tn: "فلوت", fr: "Flûte", en: "Flute" }, is_correct: true, points: 20 },
            { translations: { ar: "أوبوا", tn: "أوبوا", fr: "Hautbois", en: "Oboe" }, is_correct: true, points: 20 },
            { translations: { ar: "كلارينيت", tn: "كلارينيت", fr: "Clarinette", en: "Clarinet" }, is_correct: true, points: 30 },
            { translations: { ar: "باصون", tn: "باصون", fr: "Basson", en: "Bassoon" }, is_correct: true, points: 30 },
            { translations: { ar: "ترومبيت", tn: "ترومبيت", fr: "Trompette", en: "Trumpet" }, is_correct: true, points: 30 },
            { translations: { ar: "طبلة شعبية", tn: "دربوكة شعبية", fr: "Darbouka", en: "Darbouka" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 269,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 شخصيات من التراث الشعبي أو الفولكلور العربي الشهير؟" },
            tn: { text: "أذكر 9 شخصيات تاريخية خيالية في الفلكلور والتراث العربي؟" },
            fr: { text: "Citez 9 personnages célèbres du folklore ou des contes arabes ?" },
            en: { text: "Name 9 characters from Arabic folklore and tales" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "جحا", tn: "جحا", fr: "Juha (Djeha)", en: "Juha" }, is_correct: true, points: 10 },
            { translations: { ar: "علاء الدين", tn: "علاء الدين", fr: "Aladdin", en: "Aladdin" }, is_correct: true, points: 10 },
            { translations: { ar: "السندباد", tn: "سندباد بحري", fr: "Sinbad le marin", en: "Sinbad" }, is_correct: true, points: 10 },
            { translations: { ar: "شهرزاد", tn: "شهرزاد", fr: "Scheherazade", en: "Shahrazad" }, is_correct: true, points: 20 },
            { translations: { ar: "علي بابا", tn: "علي بابا", fr: "Ali Baba", en: "Ali Baba" }, is_correct: true, points: 20 },
            { translations: { ar: "عنترة بن شداد", tn: "عنترة بن شداد", fr: "Antar", en: "Antarah" }, is_correct: true, points: 20 },
            { translations: { ar: "قيس وليلى", tn: "قيس وليلى", fr: "Majnoun Leila", en: "Layla and Majnun" }, is_correct: true, points: 30 },
            { translations: { ar: "الغول", tn: "الغول (الغولة)", fr: "La Ghoule", en: "Ghoula" }, is_correct: true, points: 30 },
            { translations: { ar: "زرقاء اليمامة", tn: "زرقاء اليمامة", fr: "Zarqa al-Yamama", en: "Zarqa al-Yamama" }, is_correct: true, points: 30 },
            { translations: { ar: "باتمان", tn: "باتمان", fr: "Batman", en: "Batman" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 270,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مسرحيات موسيقية عالمية شهيرة؟" },
            tn: { text: "أذكر 9 مسرحيات غنائية ميوزيكال معروفة؟" },
            fr: { text: "Citez 9 comédies musicales célèbres de Broadway ?" },
            en: { text: "Name 9 famous Broadway musicals" }
        },
        category: "Entertainment",
        subcategory: "Country",
        answers: [
            { translations: { ar: "الأسد الملك", tn: "الأسد الملك", fr: "Le Roi Lion", en: "The Lion King" }, is_correct: true, points: 10 },
            { translations: { ar: "شبح الأوبرا", tn: "شبح الأوبرا", fr: "Le Fantôme de l'Opéra", en: "The Phantom of the Opera" }, is_correct: true, points: 10 },
            { translations: { ar: "شرير", tn: "ويكيد (شرير)", fr: "Wicked", en: "Wicked" }, is_correct: true, points: 10 },
            { translations: { ar: "البؤساء", tn: "البؤساء غنائية", fr: "Les Misérables", en: "Les Miserables" }, is_correct: true, points: 20 },
            { translations: { ar: "القطط", tn: "كاتس (القطط)", fr: "Cats", en: "Cats" }, is_correct: true, points: 20 },
            { translations: { ar: "شيكاغو", tn: "شيكاغو", fr: "Chicago", en: "Chicago" }, is_correct: true, points: 20 },
            { translations: { ar: "هاميلتون", tn: "هاميلتون", fr: "Hamilton", en: "Hamilton" }, is_correct: true, points: 30 },
            { translations: { ar: "ماما ميا", tn: "ماما ميا", fr: "Mamma Mia!", en: "Mamma Mia!" }, is_correct: true, points: 30 },
            { translations: { ar: "علاء الدين الموسيقية", tn: "علاء الدين ميوزيكال", fr: "Aladdin", en: "Aladdin (Musical)" }, is_correct: true, points: 30 },
            { translations: { ar: "فيس بوك المسرحية", tn: "مسرحية فيسبوك", fr: "Facebook", en: "Facebook" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 271,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كواكب في مجموعتنا الشمسية؟" },
            tn: { text: "أذكر 9 كواكب في المجموعة الشمسية؟" },
            fr: { text: "Citez 9 planètes (ou corps célestes assimilés) du système solaire ?" },
            en: { text: "Name 9 planets or dwarf planets in our solar system" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "عطارد", tn: "عطارد", fr: "Mercure", en: "Mercury" }, is_correct: true, points: 10 },
            { translations: { ar: "الزهرة", tn: "الزهرة", fr: "Vénus", en: "Venus" }, is_correct: true, points: 10 },
            { translations: { ar: "الأرض", tn: "الأرض", fr: "Terre", en: "Earth" }, is_correct: true, points: 10 },
            { translations: { ar: "المريخ", tn: "المريخ", fr: "Mars", en: "Mars" }, is_correct: true, points: 20 },
            { translations: { ar: "المشتري", tn: "المشتري", fr: "Jupiter", en: "Jupiter" }, is_correct: true, points: 20 },
            { translations: { ar: "زحل", tn: "زحل", fr: "Saturne", en: "Saturn" }, is_correct: true, points: 20 },
            { translations: { ar: "أورانوس", tn: "أورانوس", fr: "Uranus", en: "Uranus" }, is_correct: true, points: 30 },
            { translations: { ar: "نبتون", tn: "نبتون", fr: "Neptune", en: "Neptune" }, is_correct: true, points: 30 },
            { translations: { ar: "بلوتو", tn: "بلوتو", fr: "Pluton", en: "Pluto" }, is_correct: true, points: 30 },
            { translations: { ar: "الشمس", tn: "الشمس", fr: "Soleil", en: "Sun" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 272,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أعضاء رئيسية في جسم الإنسان؟" },
            tn: { text: "أذكر 9 أعضاء داخلية في بدن الإنسان؟" },
            fr: { text: "Citez 9 organes du corps humain ?" },
            en: { text: "Name 9 organs in the human body" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "القلب", tn: "القلب", fr: "Cœur", en: "Heart" }, is_correct: true, points: 10 },
            { translations: { ar: "الدماغ", tn: "المخ (الدماغ)", fr: "Cerveau", en: "Brain" }, is_correct: true, points: 10 },
            { translations: { ar: "الرئتين", tn: "الرئتين", fr: "Poumons", en: "Lungs" }, is_correct: true, points: 10 },
            { translations: { ar: "الكبد", tn: "المرارة والكبش (الكبد)", fr: "Foie", en: "Liver" }, is_correct: true, points: 20 },
            { translations: { ar: "الكلى", tn: "الكلاوي (الكلى)", fr: "Reins", en: "Kidneys" }, is_correct: true, points: 20 },
            { translations: { ar: "المعدة", tn: "المعدة", fr: "Estomac", en: "Stomach" }, is_correct: true, points: 20 },
            { translations: { ar: "الأمعاء", tn: "المصارن (الأمعاء)", fr: "Intestins", en: "Intestines" }, is_correct: true, points: 30 },
            { translations: { ar: "الجلد", tn: "الجلدة", fr: "Peau", en: "Skin" }, is_correct: true, points: 30 },
            { translations: { ar: "البنكرياس", tn: "البنكرياس", fr: "Pancréas", en: "Pancreas" }, is_correct: true, points: 30 },
            { translations: { ar: "الشعر", tn: "الشعر", fr: "Cheveux", en: "Hair" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 273,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 عناصر كيميائية؟" },
            tn: { text: "أذكر 9 عناصر كيميائية من جدول مندليف؟" },
            fr: { text: "Citez 9 éléments chimiques ?" },
            en: { text: "Name 9 chemical elements" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "الهيدروجين", tn: "الهيدروجين", fr: "Hydrogène", en: "Hydrogen" }, is_correct: true, points: 10 },
            { translations: { ar: "الهيليوم", tn: "الهيليوم", fr: "Hélium", en: "Helium" }, is_correct: true, points: 10 },
            { translations: { ar: "الكربون", tn: "الكربون", fr: "Carbone", en: "Carbon" }, is_correct: true, points: 10 },
            { translations: { ar: "النيتروجين", tn: "الآزوت (النيتروجين)", fr: "Azote (Nitrogène)", en: "Nitrogen" }, is_correct: true, points: 20 },
            { translations: { ar: "الأكسجين", tn: "الأكسجين", fr: "Oxygène", en: "Oxygen" }, is_correct: true, points: 20 },
            { translations: { ar: "الحديد", tn: "الحديد", fr: "Fer", en: "Iron" }, is_correct: true, points: 20 },
            { translations: { ar: "الذهب", tn: "الذهب", fr: "Or", en: "Gold" }, is_correct: true, points: 30 },
            { translations: { ar: "الفضة", tn: "الفضة", fr: "Argent", en: "Silver" }, is_correct: true, points: 30 },
            { translations: { ar: "النحاس", tn: "النحاس", fr: "Cuivre", en: "Copper" }, is_correct: true, points: 30 },
            { translations: { ar: "الخشب", tn: "اللوح (الخشب)", fr: "Bois", en: "Wood" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 274,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 تخصصات وفروع علمية؟" },
            tn: { text: "أذكر 9 فروع وتخصصات علمية؟" },
            fr: { text: "Citez 9 branches ou disciplines scientifiques ?" },
            en: { text: "Name 9 branches of science" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "الفيزياء", tn: "الفيزياء", fr: "Physique", en: "Physics" }, is_correct: true, points: 10 },
            { translations: { ar: "الكيمياء", tn: "الكيمياء", fr: "Chimie", en: "Chemistry" }, is_correct: true, points: 10 },
            { translations: { ar: "الأحياء", tn: "البيولوجيا (الأحياء)", fr: "Biologie", en: "Biology" }, is_correct: true, points: 10 },
            { translations: { ar: "الفلك", tn: "علم الفلك", fr: "Astronomie", en: "Astronomy" }, is_correct: true, points: 20 },
            { translations: { ar: "الجيولوجيا", tn: "الجيولوجيا", fr: "Géologie", en: "Geology" }, is_correct: true, points: 20 },
            { translations: { ar: "الرياضيات", tn: "الرياضيات", fr: "Mathématiques", en: "Mathematics" }, is_correct: true, points: 20 },
            { translations: { ar: "علم النفس", tn: "البسيكولوجيا (علم النفس)", fr: "Psychologie", en: "Psychology" }, is_correct: true, points: 30 },
            { translations: { ar: "علم الحيوان", tn: "علم الحيوان", fr: "Zoologie", en: "Zoology" }, is_correct: true, points: 30 },
            { translations: { ar: "علم النبات", tn: "علم النبات", fr: "Botanique", en: "Botany" }, is_correct: true, points: 30 },
            { translations: { ar: "الأبراج", tn: "علم الأبراج", fr: "Astrologie (Horoscope)", en: "Astrology" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 275,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 وحدات قياس علمية؟" },
            tn: { text: "أذكر 9 وحدات قياس معروفة؟" },
            fr: { text: "Citez 9 unités de mesure scientifiques ?" },
            en: { text: "Name 9 scientific units of measurement" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "المتر", tn: "المتر", fr: "Mètre", en: "Meter" }, is_correct: true, points: 10 },
            { translations: { ar: "الكيلوغرام", tn: "الكيلو (الكيلوغرام)", fr: "Kilogramme", en: "Kilogram" }, is_correct: true, points: 10 },
            { translations: { ar: "الثانية", tn: "الثانية", fr: "Seconde", en: "Second" }, is_correct: true, points: 10 },
            { translations: { ar: "الأمبير", tn: "الأمبير", fr: "Ampère", en: "Ampere" }, is_correct: true, points: 20 },
            { translations: { ar: "الكلفن", tn: "الكلفن", fr: "Kelvin", en: "Kelvin" }, is_correct: true, points: 20 },
            { translations: { ar: "اللتر", tn: "اللتر", fr: "Litre", en: "Liter" }, is_correct: true, points: 20 },
            { translations: { ar: "الدرجة المئوية", tn: "السيلسيوز", fr: "Degré Celsius", en: "Celsius degree" }, is_correct: true, points: 30 },
            { translations: { ar: "الفولت", tn: "الفولت", fr: "Volt", en: "Volt" }, is_correct: true, points: 30 },
            { translations: { ar: "الواط", tn: "الواط", fr: "Watt", en: "Watt" }, is_correct: true, points: 30 },
            { translations: { ar: "الخطوة", tn: "خطوة قدم", fr: "Pas", en: "Step" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 276,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كوكبات نجمية؟" },
            tn: { text: "أذكر 9 كوكبات نجمية في السماء؟" },
            fr: { text: "Citez 9 constellations d'étoiles ?" },
            en: { text: "Name 9 star constellations" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "الدب الأكبر", tn: "الدب الأكبر", fr: "Grande Ourse", en: "Ursa Major" }, is_correct: true, points: 10 },
            { translations: { ar: "الدب الأصغر", tn: "الدب الأصغر", fr: "Petite Ourse", en: "Ursa Minor" }, is_correct: true, points: 10 },
            { translations: { ar: "الجبار", tn: "الجبار (أوريون)", fr: "Orion", en: "Orion" }, is_correct: true, points: 10 },
            { translations: { ar: "ذات الكرسي", tn: "ذات الكرسي", fr: "Cassiopée", en: "Cassiopeia" }, is_correct: true, points: 20 },
            { translations: { ar: "الثور", tn: "برج الثور كوكبة", fr: "Taurus", en: "Taurus" }, is_correct: true, points: 20 },
            { translations: { ar: "الأسد", tn: "برج الأسد كوكبة", fr: "Lion (Leo)", en: "Leo" }, is_correct: true, points: 20 },
            { translations: { ar: "الفرس الأعظم", tn: "الفرس الأعظم", fr: "Pégase", en: "Pegasus" }, is_correct: true, points: 30 },
            { translations: { ar: "المرأة المسلسلة", tn: "أندرومايدا", fr: "Andromède", en: "Andromeda" }, is_correct: true, points: 30 },
            { translations: { ar: "العقرب", tn: "برج العقرب كوكبة", fr: "Scorpion", en: "Scorpius" }, is_correct: true, points: 30 },
            { translations: { ar: "القمر", tn: "القمر", fr: "Lune", en: "Moon" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 277,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 علماء عالميين بارزين في التاريخ؟" },
            tn: { text: "أذكر 9 علماء كبار معروفين في تاريخ العلوم؟" },
            fr: { text: "Citez 9 scientifiques mondiaux célèbres ?" },
            en: { text: "Name 9 famous global scientists in history" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "ألبرت أينشتاين", tn: "أينشتاين", fr: "Albert Einstein", en: "Albert Einstein" }, is_correct: true, points: 10 },
            { translations: { ar: "إسحاق نيوتن", tn: "نيوتن", fr: "Isaac Newton", en: "Isaac Newton" }, is_correct: true, points: 10 },
            { translations: { ar: "ماري كوري", tn: "ماري كوري", fr: "Marie Curie", en: "Marie Curie" }, is_correct: true, points: 10 },
            { translations: { ar: "تشارلز داروين", tn: "داروين", fr: "Charles Darwin", en: "Charles Darwin" }, is_correct: true, points: 20 },
            { translations: { ar: "غاليليو غاليلي", tn: "غاليليو", fr: "Galileo Galilei", en: "Galileo Galilei" }, is_correct: true, points: 20 },
            { translations: { ar: "نيكولا تسلا", tn: "تسلا", fr: "Nikola Tesla", en: "Nikola Tesla" }, is_correct: true, points: 20 },
            { translations: { ar: "لويس باستور", tn: "باستور", fr: "Louis Pasteur", en: "Louis Pasteur" }, is_correct: true, points: 30 },
            { translations: { ar: "توماس إديسون", tn: "إديسون", fr: "Thomas Edison", en: "Thomas Edison" }, is_correct: true, points: 30 },
            { translations: { ar: "ستيفن هاوكينغ", tn: "هاوكينغ", fr: "Stephen Hawking", en: "Stephen Hawking" }, is_correct: true, points: 30 },
            { translations: { ar: "مارك زوكربيرغ", tn: "مارك زوكربيرغ", fr: "Mark Zuckerberg", en: "Mark Zuckerberg" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 278,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مفاصل رئيسية في جسم الإنسان؟" },
            tn: { text: "أذكر 9 مفاصل في بدن الإنسان؟" },
            fr: { text: "Citez 9 articulations principales du corps humain ?" },
            en: { text: "Name 9 major joints in the human body" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "الكتف", tn: "الكتف", fr: "Épaule", en: "Shoulder" }, is_correct: true, points: 10 },
            { translations: { ar: "المرفق", tn: "المرفق (الكوع)", fr: "Coude", en: "Elbow" }, is_correct: true, points: 10 },
            { translations: { ar: "المعصم", tn: "المعصم (المرفق)", fr: "Poignet", en: "Wrist" }, is_correct: true, points: 10 },
            { translations: { ar: "الفخذ", tn: "الفخذ", fr: "Hanche", en: "Hip" }, is_correct: true, points: 20 },
            { translations: { ar: "الركبة", tn: "الركبة", fr: "Genou", en: "Knee" }, is_correct: true, points: 20 },
            { translations: { ar: "الكاحل", tn: "الكاحل", fr: "Cheville", en: "Ankle" }, is_correct: true, points: 20 },
            { translations: { ar: "الرقبة", tn: "الرقبة", fr: "Cou (cervicale)", en: "Neck" }, is_correct: true, points: 30 },
            { translations: { ar: "العمود الفقري", tn: "العمود الفقري", fr: "Colonne vertébrale", en: "Spine" }, is_correct: true, points: 30 },
            { translations: { ar: "مفاصل الأصابع", tn: "مفاصل الصوابع", fr: "Phalanges", en: "Knuckles" }, is_correct: true, points: 30 },
            { translations: { ar: "الظفر", tn: "الظفر", fr: "Ongle", en: "Nail" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 279,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 حالات أو بنيات للمادة؟" },
            tn: { text: "أذكر 9 حالات للمادة في الفيزياء؟" },
            fr: { text: "Citez 9 états ou structures de la matière ?" },
            en: { text: "Name 9 states or structures of matter" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "الصلبة", tn: "الحالة الصلبة", fr: "Solide", en: "Solid" }, is_correct: true, points: 10 },
            { translations: { ar: "السائلة", tn: "الحالة السائلة", fr: "Liquide", en: "Liquid" }, is_correct: true, points: 10 },
            { translations: { ar: "الغازية", tn: "الحالة الغازية", fr: "Gaz", en: "Gas" }, is_correct: true, points: 10 },
            { translations: { ar: "البلازما", tn: "البلازما", fr: "Plasma", en: "Plasma" }, is_correct: true, points: 20 },
            { translations: { ar: "تكاثف بوز-أينشتاين", tn: "تكاثف بوز", fr: "Condensat de Bose-Einstein", en: "Bose-Einstein Condensate" }, is_correct: true, points: 20 },
            { translations: { ar: "البلورية", tn: "البنية البلورية", fr: "Cristallin", en: "Crystalline" }, is_correct: true, points: 20 },
            { translations: { ar: "غير البلورية", tn: "الأمورف (غير متبلور)", fr: "Amorphe", en: "Amorphous" }, is_correct: true, points: 30 },
            { translations: { ar: "المائع فوق الحرج", tn: "مائع فوق الحرج", fr: "Fluide supercritique", en: "Supercritical Fluid" }, is_correct: true, points: 30 },
            { translations: { ar: "المادة المتكسرة", tn: "مادة متكسرة", fr: "Matière dégénérée", en: "Degenerate Matter" }, is_correct: true, points: 30 },
            { translations: { ar: "الفراغ", tn: "الفراغ", fr: "Vide", en: "Vacuum" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 280,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنواع من السحب في علم الأرصاد الجوية؟" },
            tn: { text: "أذكر 9 أنواع سحاب في علم الطقس؟" },
            fr: { text: "Citez 9 types de nuages en météorologie ?" },
            en: { text: "Name 9 types of clouds in meteorology" }
        },
        category: "Science & Technology",
        subcategory: "Natural Sciences",
        answers: [
            { translations: { ar: "الركام", tn: "سحاب الركام", fr: "Cumulus", en: "Cumulus" }, is_correct: true, points: 10 },
            { translations: { ar: "الطباق", tn: "سحاب الطباق", fr: "Stratus", en: "Stratus" }, is_correct: true, points: 10 },
            { translations: { ar: "السمحاق", tn: "سحاب السمحاق", fr: "Cirrus", en: "Cirrus" }, is_correct: true, points: 10 },
            { translations: { ar: "المزن الركامي", tn: "المزن الركامي", fr: "Cumulonimbus", en: "Cumulonimbus" }, is_correct: true, points: 20 },
            { translations: { ar: "الركام المتوسط", tn: "الركام المتوسط", fr: "Altocumulus", en: "Altocumulus" }, is_correct: true, points: 20 },
            { translations: { ar: "الطباق المتوسط", tn: "الطباق المتوسط", fr: "Altostratus", en: "Altostratus" }, is_correct: true, points: 20 },
            { translations: { ar: "السمحاق الركامي", tn: "السمحاق الركامي", fr: "Cirrocumulus", en: "Cirrocumulus" }, is_correct: true, points: 30 },
            { translations: { ar: "السمحاق الطباقي", tn: "السمحاق الطباقي", fr: "Cirrostratus", en: "Cirrostratus" }, is_correct: true, points: 30 },
            { translations: { ar: "الطباق الركامي", tn: "الطباق الركامي", fr: "Stratocumulus", en: "Stratocumulus" }, is_correct: true, points: 30 },
            { translations: { ar: "الضباب الصحراوي", tn: "عجاج صحراوي", fr: "Brouillard de sable", en: "Sand fog" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 281,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 لغات برمجة للحاسوب؟" },
            tn: { text: "أذكر 9 لغات برمجة؟" },
            fr: { text: "Citez 9 langages de programmation informatique ?" },
            en: { text: "Name 9 computer programming languages" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "بايثون", tn: "بايثون", fr: "Python", en: "Python" }, is_correct: true, points: 10 },
            { translations: { ar: "جافا سكريبت", tn: "جافا سكريبت", fr: "JavaScript", en: "JavaScript" }, is_correct: true, points: 10 },
            { translations: { ar: "جافا", tn: "جافا", fr: "Java", en: "Java" }, is_correct: true, points: 10 },
            { translations: { ar: "سي++", tn: "سي بلاس بلاس", fr: "C++", en: "C++" }, is_correct: true, points: 20 },
            { translations: { ar: "سي شارب", tn: "سي شارب", fr: "C#", en: "C#" }, is_correct: true, points: 20 },
            { translations: { ar: "روبي", tn: "روبي", fr: "Ruby", en: "Ruby" }, is_correct: true, points: 20 },
            { translations: { ar: "غو", tn: "غو (غولانغ)", fr: "Go", en: "Go" }, is_correct: true, points: 30 },
            { translations: { ar: "سويفت", tn: "سويفت للآيفون", fr: "Swift", en: "Swift" }, is_correct: true, points: 30 },
            { translations: { ar: "بي إتش بي", tn: "بي إتش بي", fr: "PHP", en: "PHP" }, is_correct: true, points: 30 },
            { translations: { ar: "إتش تي إم إل", tn: "إتش تي إم إل (ليست لغة برمجة)", fr: "HTML (non-programmation)", en: "HTML" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 282,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 منصات تواصل اجتماعي؟" },
            tn: { text: "أذكر 9 مواقع تواصل اجتماعي سوشيال ميديا؟" },
            fr: { text: "Citez 9 plateformes de réseaux sociaux ?" },
            en: { text: "Name 9 social media platforms" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "فيسبوك", tn: "فيسبوك", fr: "Facebook", en: "Facebook" }, is_correct: true, points: 10 },
            { translations: { ar: "إنستغرام", tn: "أنستغرام", fr: "Instagram", en: "Instagram" }, is_correct: true, points: 10 },
            { translations: { ar: "تويتر (إكس)", tn: "تويتر (إكس)", fr: "Twitter (X)", en: "Twitter (X)" }, is_correct: true, points: 10 },
            { translations: { ar: "تيك توك", tn: "تيك توك", fr: "TikTok", en: "TikTok" }, is_correct: true, points: 20 },
            { translations: { ar: "لينكد إن", tn: "لينكد إن", fr: "LinkedIn", en: "LinkedIn" }, is_correct: true, points: 20 },
            { translations: { ar: "يوتيوب", tn: "يوتيوب", fr: "YouTube", en: "YouTube" }, is_correct: true, points: 20 },
            { translations: { ar: "بينتيريست", tn: "بينتيريست", fr: "Pinterest", en: "Pinterest" }, is_correct: true, points: 30 },
            { translations: { ar: "سناب شات", tn: "سناب شات", fr: "Snapchat", en: "Snapchat" }, is_correct: true, points: 30 },
            { translations: { ar: "ريديت", tn: "ريديت", fr: "Reddit", en: "Reddit" }, is_correct: true, points: 30 },
            { translations: { ar: "جوجل مابس", tn: "جي بي اس (خرائط)", fr: "Google Maps", en: "Google Maps" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 283,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 علامات تجارية للهواتف المحمولة؟" },
            tn: { text: "أذكر 9 ماركات تلفونات موبايل؟" },
            fr: { text: "Citez 9 marques de téléphones mobiles ?" },
            en: { text: "Name 9 mobile phone brands" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "آبل", tn: "آبل (آيفون)", fr: "Apple", en: "Apple" }, is_correct: true, points: 10 },
            { translations: { ar: "سامسونج", tn: "سامسونج", fr: "Samsung", en: "Samsung" }, is_correct: true, points: 10 },
            { translations: { ar: "شاومي", tn: "شاومي", fr: "Xiaomi", en: "Xiaomi" }, is_correct: true, points: 10 },
            { translations: { ar: "هواوي", tn: "هواوي", fr: "Huawei", en: "Huawei" }, is_correct: true, points: 20 },
            { translations: { ar: "أوبو", tn: "أوبو", fr: "Oppo", en: "Oppo" }, is_correct: true, points: 20 },
            { translations: { ar: "فيفو", tn: "فيفو", fr: "Vivo", en: "Vivo" }, is_correct: true, points: 20 },
            { translations: { ar: "وان بلس", tn: "وان بلس", fr: "OnePlus", en: "OnePlus" }, is_correct: true, points: 30 },
            { translations: { ar: "نوكيا", tn: "نوكيا", fr: "Nokia", en: "Nokia" }, is_correct: true, points: 30 },
            { translations: { ar: "موتورولا", tn: "موتورولا", fr: "Motorola", en: "Motorola" }, is_correct: true, points: 30 },
            { translations: { ar: "توشيبا للغسالات", tn: "توشيبا", fr: "Toshiba", en: "Toshiba" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 284,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 متصفحات إنترنت شهيرة؟" },
            tn: { text: "أذكر 9 متصفحات نافيغاتور متع أنترنت؟" },
            fr: { text: "Citez 9 navigateurs web célèbres ?" },
            en: { text: "Name 9 internet web browsers" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "جوجل كروم", tn: "كروم", fr: "Google Chrome", en: "Google Chrome" }, is_correct: true, points: 10 },
            { translations: { ar: "سفاري", tn: "سفاري للماك", fr: "Safari", en: "Safari" }, is_correct: true, points: 10 },
            { translations: { ar: "موزيلا فايرفوكس", tn: "فايرفوكس", fr: "Mozilla Firefox", en: "Mozilla Firefox" }, is_correct: true, points: 10 },
            { translations: { ar: "مايكروسوفت إيدج", tn: "إيدج (إكسبلورر)", fr: "Microsoft Edge", en: "Microsoft Edge" }, is_correct: true, points: 20 },
            { translations: { ar: "أوبرا", tn: "أوبرا", fr: "Opera", en: "Opera" }, is_correct: true, points: 20 },
            { translations: { ar: "بريف", tn: "بريف", fr: "Brave", en: "Brave" }, is_correct: true, points: 20 },
            { translations: { ar: "متصفح تور", tn: "تور", fr: "Tor Browser", en: "Tor Browser" }, is_correct: true, points: 30 },
            { translations: { ar: "فيفالدي", tn: "فيفالدي", fr: "Vivaldi", en: "Vivaldi" }, is_correct: true, points: 30 },
            { translations: { ar: "يو سي براوزر", tn: "يو سي براوزر", fr: "UC Browser", en: "UC Browser" }, is_correct: true, points: 30 },
            { translations: { ar: "سكايب", tn: "سكايب", fr: "Skype", en: "Skype" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 285,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 محركات بحث على الإنترنت؟" },
            tn: { text: "أذكر 9 محركات بحث عالأنترنت؟" },
            fr: { text: "Citez 9 moteurs de recherche sur Internet ?" },
            en: { text: "Name 9 search engines" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "جوجل", tn: "جوجل", fr: "Google", en: "Google" }, is_correct: true, points: 10 },
            { translations: { ar: "بينج", tn: "بينج", fr: "Bing", en: "Bing" }, is_correct: true, points: 10 },
            { translations: { ar: "ياهو", tn: "ياهو", fr: "Yahoo", en: "Yahoo" }, is_correct: true, points: 10 },
            { translations: { ar: "داك داك غو", tn: "داك داك غو", fr: "DuckDuckGo", en: "DuckDuckGo" }, is_correct: true, points: 20 },
            { translations: { ar: "بايدو", tn: "بايدو للصين", fr: "Baidu", en: "Baidu" }, is_correct: true, points: 20 },
            { translations: { ar: "ياندكس", tn: "ياندكس للروس", fr: "Yandex", en: "Yandex" }, is_correct: true, points: 20 },
            { translations: { ar: "آسك دوت كوم", tn: "آسك", fr: "Ask.com", en: "Ask.com" }, is_correct: true, points: 30 },
            { translations: { ar: "أي أو إل", tn: "AOL بحث", fr: "AOL Search", en: "AOL Search" }, is_correct: true, points: 30 },
            { translations: { ar: "نافير", tn: "نافير كوريا", fr: "Naver", en: "Naver" }, is_correct: true, points: 30 },
            { translations: { ar: "واتساب", tn: "واتساب", fr: "WhatsApp", en: "WhatsApp" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 286,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مكونات مادية (عتاد) داخلية للحاسوب؟" },
            tn: { text: "أذكر 9 مكونات هاردوير في البي سي حاسوب؟" },
            fr: { text: "Citez 9 composants matériels (hardware) d'un ordinateur ?" },
            en: { text: "Name 9 parts of computer hardware" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "المعالج", tn: "البروسيسور (المعالج)", fr: "Processeur (CPU)", en: "CPU (Processor)" }, is_correct: true, points: 10 },
            { translations: { ar: "اللوحة الأم", tn: "اللوحة الأم (كارت مير)", fr: "Carte mère", en: "Motherboard" }, is_correct: true, points: 10 },
            { translations: { ar: "ذاكرة الوصول العشوائي", tn: "الرام (RAM)", fr: "Mémoire RAM", en: "RAM" }, is_correct: true, points: 10 },
            { translations: { ar: "القرص الصلب", tn: "الديسك دور (HDD/SSD)", fr: "Disque dur (HDD/SSD)", en: "Hard Drive (HDD/SSD)" }, is_correct: true, points: 20 },
            { translations: { ar: "بطاقة الرسوميات", tn: "الكارت غرافيك (GPU)", fr: "Carte graphique (GPU)", en: "Graphics Card (GPU)" }, is_correct: true, points: 20 },
            { translations: { ar: "مزود الطاقة", tn: "بوات داليمونتاسيون", fr: "Bloc d'alimentation", en: "Power Supply Unit" }, is_correct: true, points: 20 },
            { translations: { ar: "صندوق الحاسوب", tn: "الكاز (البوات)", fr: "Boîtier d'ordinateur", en: "Computer Case" }, is_correct: true, points: 30 },
            { translations: { ar: "الشاشة", tn: "الشاشة (الكرون)", fr: "Moniteur (Écran)", en: "Monitor" }, is_correct: true, points: 30 },
            { translations: { ar: "لوحة المفاتيح", tn: "كلافييه (لوحة المفاتيح)", fr: "Clavier", en: "Keyboard" }, is_correct: true, points: 30 },
            { translations: { ar: "حزمة أوفيس", tn: "الوورد والأوفيس", fr: "Microsoft Office", en: "Microsoft Office" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 287,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنظمة إدارة قواعد البيانات؟" },
            tn: { text: "أذكر 9 أنظمة قواعد بيانات داتابيز؟" },
            fr: { text: "Citez 9 systèmes de gestion de bases de données (SGBD) ?" },
            en: { text: "Name 9 database management systems (DBMS)" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "ماي إس كيو إل", tn: "MySQL", fr: "MySQL", en: "MySQL" }, is_correct: true, points: 10 },
            { translations: { ar: "بوستغريس", tn: "PostgreSQL", fr: "PostgreSQL", en: "PostgreSQL" }, is_correct: true, points: 10 },
            { translations: { ar: "مونغو دي بي", tn: "MongoDB", fr: "MongoDB", en: "MongoDB" }, is_correct: true, points: 10 },
            { translations: { ar: "إس كيو لايت", tn: "SQLite", fr: "SQLite", en: "SQLite" }, is_correct: true, points: 20 },
            { translations: { ar: "أوراكل", tn: "Oracle", fr: "Oracle Database", en: "Oracle Database" }, is_correct: true, points: 20 },
            { translations: { ar: "إس كيو إل سيرفر", tn: "SQL Server", fr: "Microsoft SQL Server", en: "SQL Server" }, is_correct: true, points: 20 },
            { translations: { ar: "ريديس", tn: "Redis كاش", fr: "Redis", en: "Redis" }, is_correct: true, points: 30 },
            { translations: { ar: "كاساندرا", tn: "Cassandra", fr: "Cassandra", en: "Cassandra" }, is_correct: true, points: 30 },
            { translations: { ar: "ماريا دي بي", tn: "MariaDB", fr: "MariaDB", en: "MariaDB" }, is_correct: true, points: 30 },
            { translations: { ar: "جافا لغة البرمجة", tn: "جافا", fr: "Java", en: "Java" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 288,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 من كبريات شركات التكنولوجيا في العالم؟" },
            tn: { text: "أذكر 9 شركات تكنولوجيا عملاقة في العالم؟" },
            fr: { text: "Citez 9 grandes entreprises technologiques mondiales ?" },
            en: { text: "Name 9 tech giants in the world" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "مايكروسوفت", tn: "مايكروسوفت", fr: "Microsoft", en: "Microsoft" }, is_correct: true, points: 10 },
            { translations: { ar: "آبل", tn: "أبل", fr: "Apple", en: "Apple" }, is_correct: true, points: 10 },
            { translations: { ar: "جوجل", tn: "جوجل", fr: "Google (Alphabet)", en: "Google (Alphabet)" }, is_correct: true, points: 10 },
            { translations: { ar: "أمازون", tn: "أمازون", fr: "Amazon", en: "Amazon" }, is_correct: true, points: 20 },
            { translations: { ar: "ميتا", tn: "ميتا (فيسبوك)", fr: "Meta", en: "Meta" }, is_correct: true, points: 20 },
            { translations: { ar: "إنفيديا", tn: "أنفيديا كروت شاشة", fr: "Nvidia", en: "Nvidia" }, is_correct: true, points: 20 },
            { translations: { ar: "تسلا", tn: "تسلا تكنولوجيا", fr: "Tesla", en: "Tesla" }, is_correct: true, points: 30 },
            { translations: { ar: "نتفليكس", tn: "نتفليكس", fr: "Netflix", en: "Netflix" }, is_correct: true, points: 30 },
            { translations: { ar: "أدوبي", tn: "أدوبي فوتوشوب", fr: "Adobe", en: "Adobe" }, is_correct: true, points: 30 },
            { translations: { ar: "ماكدونالدز", tn: "ماكدونالدز", fr: "McDonald's", en: "McDonald's" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 289,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 امتدادات أو لواحق لملفات الكمبيوتر؟" },
            tn: { text: "أذكر 9 لواحق إكستنسيون لملفات الحاسوب؟" },
            fr: { text: "Citez 9 extensions de fichiers informatiques ?" },
            en: { text: "Name 9 file extensions on computer systems" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "pdf", tn: "pdf", fr: "pdf", en: "pdf" }, is_correct: true, points: 10 },
            { translations: { ar: "docx", tn: "docx (وورد)", fr: "docx", en: "docx" }, is_correct: true, points: 10 },
            { translations: { ar: "xlsx", tn: "xlsx (إكسل)", fr: "xlsx", en: "xlsx" }, is_correct: true, points: 10 },
            { translations: { ar: "txt", tn: "txt", fr: "txt", en: "txt" }, is_correct: true, points: 20 },
            { translations: { ar: "html", tn: "html", fr: "html", en: "html" }, is_correct: true, points: 20 },
            { translations: { ar: "css", tn: "css", fr: "css", en: "css" }, is_correct: true, points: 20 },
            { translations: { ar: "js", tn: "js (جافاسكريبت)", fr: "js", en: "js" }, is_correct: true, points: 30 },
            { translations: { ar: "png", tn: "png (صورة)", fr: "png", en: "png" }, is_correct: true, points: 30 },
            { translations: { ar: "mp3", tn: "mp3 (صوت)", fr: "mp3", en: "mp3" }, is_correct: true, points: 30 },
            { translations: { ar: "usb", tn: "usb (مفتاح فلاش)", fr: "usb", en: "usb" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 290,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 أنظمة تشغيل للحواسيب أو الهواتف؟" },
            tn: { text: "أذكر 9 أنظمة تشغيل سيستيم دفلوبري؟" },
            fr: { text: "Citez 9 systèmes d'exploitation pour ordinateurs ou téléphones ?" },
            en: { text: "Name 9 operating systems" }
        },
        category: "Science & Technology",
        subcategory: "Computing",
        answers: [
            { translations: { ar: "ويندوز", tn: "ويندوز", fr: "Windows", en: "Windows" }, is_correct: true, points: 10 },
            { translations: { ar: "ماك أو إس", tn: "ماك", fr: "macOS", en: "macOS" }, is_correct: true, points: 10 },
            { translations: { ar: "لينكس", tn: "لينكس", fr: "Linux", en: "Linux" }, is_correct: true, points: 10 },
            { translations: { ar: "أندرويد", tn: "أندرويد تلفون", fr: "Android", en: "Android" }, is_correct: true, points: 20 },
            { translations: { ar: "آي أو إس", tn: "آي أو إس آيفون", fr: "iOS", en: "iOS" }, is_correct: true, points: 20 },
            { translations: { ar: "أوبونتو", tn: "أوبونتو لينكس", fr: "Ubuntu", en: "Ubuntu" }, is_correct: true, points: 20 },
            { translations: { ar: "دبيان", tn: "دبيان لينكس", fr: "Debian", en: "Debian" }, is_correct: true, points: 30 },
            { translations: { ar: "ريد هات", tn: "ريد هات سيرفر", fr: "Red Hat", en: "Red Hat" }, is_correct: true, points: 30 },
            { translations: { ar: "كروم أو إس", tn: "كروم أو إس للكروم بوك", fr: "ChromeOS", en: "ChromeOS" }, is_correct: true, points: 30 },
            { translations: { ar: "أوفيس مايكروسوفت", tn: "أوفيس", fr: "Office", en: "Office" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 291,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 كتاب أو شعراء تونسيين بارزين؟" },
            tn: { text: "أذكر 9 كتاب أو شعراء توانسة معروفين؟" },
            fr: { text: "Citez 9 écrivains ou poètes tunisiens célèbres ?" },
            en: { text: "Name 9 famous Tunisian writers or poets" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "أبو القاسم الشابي", tn: "الشابي", fr: "Aboul-Qacem Echebbi", en: "Aboul-Qacem Echebbi" }, is_correct: true, points: 10 },
            { translations: { ar: "منصف غشام", tn: "منصف غشام", fr: "Moncef Ghachem", en: "Moncef Ghachem" }, is_correct: true, points: 10 },
            { translations: { ar: "ألبير ممي", tn: "ألبير ممي", fr: "Albert Memmi", en: "Albert Memmi" }, is_correct: true, points: 10 },
            { translations: { ar: "محمود المسعدي", tn: "محمود المسعدي", fr: "Mahmoud Messadi", en: "Mahmoud Messadi" }, is_correct: true, points: 20 },
            { translations: { ar: "علي الدوعاجي", tn: "علي الدوعاجي", fr: "Ali Douaji", en: "Ali Douaji" }, is_correct: true, points: 20 },
            { translations: { ar: "البشير خريف", tn: "البشير خريف", fr: "Bashir Khraief", en: "Bashir Khraief" }, is_correct: true, points: 20 },
            { translations: { ar: "هادي البوراوي", tn: "هادي البوراوي", fr: "Hedi Bouraoui", en: "Hedi Bouraoui" }, is_correct: true, points: 30 },
            { translations: { ar: "يوسف رزوقة", tn: "يوسف رزوقة", fr: "Youssef Rzouga", en: "Youssef Rzouga" }, is_correct: true, points: 30 },
            { translations: { ar: "أولاد أحمد", tn: "الصغير أولاد أحمد", fr: "Ouled Ahmed", en: "Ouled Ahmed" }, is_correct: true, points: 30 },
            { translations: { ar: "نجيب محفوظ", tn: "نجيب محفوظ", fr: "Naguib Mahfouz", en: "Naguib Mahfouz" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 292,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 ألوان؟" },
            tn: { text: "أذكر 9 ألوان؟" },
            fr: { text: "Citez 9 couleurs ?" },
            en: { text: "Name 9 colors" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "أحمر", tn: "أحمر", fr: "Rouge", en: "Red" }, is_correct: true, points: 10 },
            { translations: { ar: "أزرق", tn: "أزرق", fr: "Bleu", en: "Blue" }, is_correct: true, points: 10 },
            { translations: { ar: "أخضر", tn: "أخضر", fr: "Vert", en: "Green" }, is_correct: true, points: 10 },
            { translations: { ar: "أصفر", tn: "أصفر", fr: "Jaune", en: "Yellow" }, is_correct: true, points: 20 },
            { translations: { ar: "برتقالي", tn: "برتقالي (أورانج)", fr: "Orange", en: "Orange" }, is_correct: true, points: 20 },
            { translations: { ar: "بنفسجي", tn: "بنفسجي (موف)", fr: "Violet (Pourpre)", en: "Purple" }, is_correct: true, points: 20 },
            { translations: { ar: "أسود", tn: "أسود", fr: "Noir", en: "Black" }, is_correct: true, points: 30 },
            { translations: { ar: "أبيض", tn: "أبيض", fr: "Blanc", en: "White" }, is_correct: true, points: 30 },
            { translations: { ar: "وردي", tn: "وردي (غوز)", fr: "Rose", en: "Pink" }, is_correct: true, points: 30 },
            { translations: { ar: "شفاف", tn: "شفاف", fr: "Transparent", en: "Transparent" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 293,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 علامات أو نوتات موسيقية؟" },
            tn: { text: "أذكر 9 نوتات موزيكا؟" },
            fr: { text: "Citez 9 notes ou signes musicaux ?" },
            en: { text: "Name 9 musical notes or accidentals" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "دو", tn: "دو", fr: "Do", en: "Do" }, is_correct: true, points: 10 },
            { translations: { ar: "ري", tn: "ري", fr: "Re", en: "Re" }, is_correct: true, points: 10 },
            { translations: { ar: "مي", tn: "مي", fr: "Mi", en: "Mi" }, is_correct: true, points: 10 },
            { translations: { ar: "فا", tn: "فا", fr: "Fa", en: "Fa" }, is_correct: true, points: 20 },
            { translations: { ar: "صول", tn: "صول", fr: "Sol", en: "Sol" }, is_correct: true, points: 20 },
            { translations: { ar: "لا", tn: "لا", fr: "La", en: "La" }, is_correct: true, points: 20 },
            { translations: { ar: "سي", tn: "سي", fr: "Si", en: "Si" }, is_correct: true, points: 30 },
            { translations: { ar: "دييز", tn: "دييز (علامة رفع)", fr: "Dièse", en: "Sharp" }, is_correct: true, points: 30 },
            { translations: { ar: "بيمول", tn: "بيمول (علامة خفض)", fr: "Bémol", en: "Flat" }, is_correct: true, points: 30 },
            { translations: { ar: "مترونوم", tn: "مترونوم", fr: "Métronome", en: "Metronome" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 294,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 رسامين تاريخيين مشهورين في العالم؟" },
            tn: { text: "أذكر 9 رسامين وفنانين تشكيليين معروفين في التاريخ؟" },
            fr: { text: "Citez 9 peintres célèbres de l'histoire ?" },
            en: { text: "Name 9 famous historical painters in world history" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "ليوناردو دا فينشي", tn: "دا فينشي", fr: "Léonard de Vinci", en: "Leonardo da Vinci" }, is_correct: true, points: 10 },
            { translations: { ar: "فينسنت فان غوخ", tn: "فان غوخ", fr: "Vincent van Gogh", en: "Vincent van Gogh" }, is_correct: true, points: 10 },
            { translations: { ar: "بابلو بيكاسو", tn: "بيكاسو", fr: "Pablo Picasso", en: "Pablo Picasso" }, is_correct: true, points: 10 },
            { translations: { ar: "كلود مونيه", tn: "مونيه", fr: "Claude Monet", en: "Claude Monet" }, is_correct: true, points: 20 },
            { translations: { ar: "مايكل أنجلو", tn: "مايكل أنجلو", fr: "Michel-Ange", en: "Michelangelo" }, is_correct: true, points: 20 },
            { translations: { ar: "سلفادور دالي", tn: "سلفادور دالي", fr: "Salvador Dalí", en: "Salvador Dali" }, is_correct: true, points: 20 },
            { translations: { ar: "رامبرانت", tn: "رامبرانت", fr: "Rembrandt", en: "Rembrandt" }, is_correct: true, points: 30 },
            { translations: { ar: "فريدا كاهلو", tn: "فريدا كاهلو", fr: "Frida Kahlo", en: "Frida Kahlo" }, is_correct: true, points: 30 },
            { translations: { ar: "غوستاف كليمت", tn: "كليمت", fr: "Gustav Klimt", en: "Gustav Klimt" }, is_correct: true, points: 30 },
            { translations: { ar: "ألبرت أينشتاين", tn: "أينشتاين", fr: "Albert Einstein", en: "Albert Einstein" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 295,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مدارس وحركات فنية؟" },
            tn: { text: "أذكر 9 مدارس وتوجهات فنية؟" },
            fr: { text: "Citez 9 mouvements artistiques ?" },
            en: { text: "Name 9 art movements in history" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "النهضة", tn: "عصر النهضة الفني", fr: "Renaissance", en: "Renaissance" }, is_correct: true, points: 10 },
            { translations: { ar: "الانطباعية", tn: "الانطباعية", fr: "Impressionnisme", en: "Impressionism" }, is_correct: true, points: 10 },
            { translations: { ar: "التكعيبية", tn: "التكعيبية بيكاسو", fr: "Cubisme", en: "Cubism" }, is_correct: true, points: 10 },
            { translations: { ar: "السريالية", tn: "السريالية دالي", fr: "Surréalisme", en: "Surrealism" }, is_correct: true, points: 20 },
            { translations: { ar: "الباروك", tn: "الباروك", fr: "Baroque", en: "Baroque" }, is_correct: true, points: 20 },
            { translations: { ar: "التعبيرية", tn: "التعبيرية", fr: "Expressionnisme", en: "Expressionism" }, is_correct: true, points: 20 },
            { translations: { ar: "الفن التجريدي", tn: "تجريدي", fr: "Art abstrait", en: "Abstract Art" }, is_correct: true, points: 30 },
            { translations: { ar: "البوب آرت", tn: "بوب آرت", fr: "Pop Art", en: "Pop Art" }, is_correct: true, points: 30 },
            { translations: { ar: "الدادائية", tn: "الدادائية", fr: "Dadaïsme", en: "Dadaism" }, is_correct: true, points: 30 },
            { translations: { ar: "الاشتراكية", tn: "الاشتراكية سياسة", fr: "Socialisme", en: "Socialism" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 296,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 محسنات بديعية أو صور بلاغية في الأدب؟" },
            tn: { text: "أذكر 9 صور بلاغية ومحسنات في اللغة والأدب؟" },
            fr: { text: "Citez 9 figures de style en littérature ?" },
            en: { text: "Name 9 figures of speech in literature" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "الاستعارة", tn: "الاستعارة", fr: "Métaphore", en: "Metaphor" }, is_correct: true, points: 10 },
            { translations: { ar: "التشبيه", tn: "التشبيه", fr: "Comparaison (Similé)", en: "Simile" }, is_correct: true, points: 10 },
            { translations: { ar: "التشخيص", tn: "التشخيص (أنسنة)", fr: "Personnification", en: "Personnification" }, is_correct: true, points: 10 },
            { translations: { ar: "المبالغة", tn: "المبالغة", fr: "Hyperbole", en: "Hyperbole" }, is_correct: true, points: 20 },
            { translations: { ar: "الجناس", tn: "الجناس", fr: "Allitération (Assonance)", en: "Alliteration" }, is_correct: true, points: 20 },
            { translations: { ar: "محاكاة الصوت", tn: "محاكاة الأصوات", fr: "Onomatopée", en: "Onomatopoeia" }, is_correct: true, points: 20 },
            { translations: { ar: "السخرية", tn: "السخرية (التهكم)", fr: "Ironie", en: "Irony" }, is_correct: true, points: 30 },
            { translations: { ar: "المقابلة", tn: "المقابلة (الطباق)", fr: "Oxymore (Antithèse)", en: "Oxymoron" }, is_correct: true, points: 30 },
            { translations: { ar: "التورية", tn: "التورية", fr: "Calembour (Jeu de mots)", en: "Pun" }, is_correct: true, points: 30 },
            { translations: { ar: "القواعد والجرامار", tn: "الجرامير والقواعد", fr: "Grammaire", en: "Grammar" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 297,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 مكتبات تاريخية أو عالمية شهيرة؟" },
            tn: { text: "أذكر 9 مكتبات كبار معروفين في تونس وإلا العالم؟" },
            fr: { text: "Citez 9 bibliothèques célèbres dans le monde ?" },
            en: { text: "Name 9 famous libraries in the world" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "مكتبة الكونغرس", tn: "مكتبة الكونغرس الأمريكي", fr: "Bibliothèque du Congrès", en: "Library of Congress" }, is_correct: true, points: 10 },
            { translations: { ar: "المكتبة البريطانية", tn: "المكتبة البريطانية", fr: "British Library", en: "British Library" }, is_correct: true, points: 10 },
            { translations: { ar: "المكتبة الوطنية الفرنسية", tn: "مكتبة فرنسا الوطنية", fr: "Bibliothèque nationale de France", en: "National Library of France" }, is_correct: true, points: 10 },
            { translations: { ar: "مكتبة الإسكندرية", tn: "مكتبة الإسكندرية", fr: "Bibliotheca Alexandrina", en: "Bibliotheca Alexandrina" }, is_correct: true, points: 20 },
            { translations: { ar: "مكتبة الفاتيكان", tn: "مكتبة الفاتيكان", fr: "Bibliothèque du Vatican", en: "Vatican Library" }, is_correct: true, points: 20 },
            { translations: { ar: "مكتبة القرويين", tn: "مكتبة القرويين بالمغرب", fr: "Bibliothèque d'Al-Qarawiyyin", en: "Al-Qarawiyyin Library" }, is_correct: true, points: 20 },
            { translations: { ar: "المكتبة الخلدونية", tn: "الخلدونية بتونس", fr: "Khaldounia", en: "Khaldounia Library" }, is_correct: true, points: 30 },
            { translations: { ar: "المكتبة الوطنية التونسية", tn: "دار الكتب الوطنية بتونس", fr: "Bibliothèque nationale de Tunisie", en: "National Library of Tunisia" }, is_correct: true, points: 30 },
            { translations: { ar: "مكتبة هارفارد", tn: "مكتبة جامعة هارفارد", fr: "Bibliothèque de Harvard", en: "Harvard Library" }, is_correct: true, points: 30 },
            { translations: { ar: "دار البريد التونسي", tn: "بوسطة تونس", fr: "Poste tunisienne", en: "Tunisian Post office" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 298,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 تصنيفات وأنواع للكتب؟" },
            tn: { text: "أذكر 9 أصناف كتب؟" },
            fr: { text: "Citez 9 genres de livres ?" },
            en: { text: "Name 9 genres of books" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "خيال", tn: "خيال وروايات", fr: "Fiction", en: "Fiction" }, is_correct: true, points: 10 },
            { translations: { ar: "غير خيالي", tn: "غير خيالي (علمي/تاريخي)", fr: "Non-Fiction", en: "Non-Fiction" }, is_correct: true, points: 10 },
            { translations: { ar: "سيرة ذاتية", tn: "سيرة ذاتية (تاريخ شخصي)", fr: "Biographie", en: "Biography" }, is_correct: true, points: 10 },
            { translations: { ar: "غموض", tn: "غموض وبوليسي", fr: "Mystère", en: "Mystery" }, is_correct: true, points: 20 },
            { translations: { ar: "فانتازيا", tn: "فانتازيا وخيال علمي", fr: "Fantasy", en: "Fantasy" }, is_correct: true, points: 20 },
            { translations: { ar: "شعر", tn: "دواوين شعر", fr: "Poésie", en: "Poetry" }, is_correct: true, points: 20 },
            { translations: { ar: "تاريخ", tn: "كتب تاريخية", fr: "Histoire", en: "History" }, is_correct: true, points: 30 },
            { translations: { ar: "تنمية بشرية", tn: "تنمية بشرية (مساعدة ذاتية)", fr: "Développement personnel", en: "Self-Help" }, is_correct: true, points: 30 },
            { translations: { ar: "أطفال", tn: "قصص صغار", fr: "Livre pour enfants", en: "Children's books" }, is_correct: true, points: 30 },
            { translations: { ar: "دفتر شيكات بنكي", tn: "دفتر شيكات", fr: "Chéquier", en: "Cheque book" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 299,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 فروع وأنواع للفنون البصرية؟" },
            tn: { text: "أذكر 9 أنواع فنون بصرية؟" },
            fr: { text: "Citez 9 types d'arts visuels ?" },
            en: { text: "Name 9 types of visual arts" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "الرسم بالفرشاة", tn: "تصوير ورسم بالفرشة", fr: "Peinture", en: "Painting" }, is_correct: true, points: 10 },
            { translations: { ar: "النحت", tn: "نحت تماثيل", fr: "Sculpture", en: "Sculpture" }, is_correct: true, points: 10 },
            { translations: { ar: "الرسم بالقلم", tn: "رسم بالقلم", fr: "Dessin", en: "Drawing" }, is_correct: true, points: 10 },
            { translations: { ar: "التصوير الفوتوغرافي", tn: "تصوير فوتوغرافي", fr: "Photographie", en: "Photography" }, is_correct: true, points: 20 },
            { translations: { ar: "الهندسة المعمارية", tn: "بناء وهندسة معمارية", fr: "Architecture", en: "Architecture" }, is_correct: true, points: 20 },
            { translations: { ar: "الطباعة الفنية", tn: "الطباعة الفنية", fr: "Gravure d'art (Estampe)", en: "Printmaking" }, is_correct: true, points: 20 },
            { translations: { ar: "الخط العربي", tn: "خط عربي ورسم حروف", fr: "Calligraphie", en: "Calligraphy" }, is_correct: true, points: 30 },
            { translations: { ar: "الخزف", tn: "فن الخزف والطين", fr: "Céramique d'art", en: "Ceramics" }, is_correct: true, points: 30 },
            { translations: { ar: "الفسيفساء", tn: "موزاييك (فسيفساء)", fr: "Mosaïque", en: "Mosaic" }, is_correct: true, points: 30 },
            { translations: { ar: "صناعة الحديد والصلب", tn: "صناعة الحديد للشانتي", fr: "Sidérurgie (Métallurgie)", en: "Steel industry" }, is_correct: false, points: 0 }
        ]
    },
    {
        id: 300,
        is_approved: false,
        translations: {
            ar: { text: "أذكر 9 معالم هندسية أو معمارية عالمية شهيرة؟" },
            tn: { text: "أذكر 9 معالم معمارية معروفة في العالم؟" },
            fr: { text: "Citez 9 monuments architecturaux célèbres dans le monde ?" },
            en: { text: "Name 9 famous architectural structures or monuments" }
        },
        category: "Arts",
        subcategory: "Visual Arts",
        answers: [
            { translations: { ar: "برج إيفل", tn: "برج إيفل", fr: "Tour Eiffel", en: "Eiffel Tower" }, is_correct: true, points: 10 },
            { translations: { ar: "سور الصين العظيم", tn: "سور الصين العظيم", fr: "Grande Muraille de Chine", en: "Great Wall of China" }, is_correct: true, points: 10 },
            { translations: { ar: "أهرامات الجيزة", tn: "أهرامات مصر", fr: "Pyramides de Gizeh", en: "Pyramids of Giza" }, is_correct: true, points: 10 },
            { translations: { ar: "الكولوسيوم", tn: "كولوسيوم روما", fr: "Colisée de Rome", en: "Colosseum" }, is_correct: true, points: 20 },
            { translations: { ar: "تاج محل", tn: "تاج محل الهند", fr: "Taj Mahal", en: "Taj Mahal" }, is_correct: true, points: 20 },
            { translations: { ar: "تمثال الحرية", tn: "تمثال الحرية", fr: "Statue de la Liberté", en: "Statue of Liberty" }, is_correct: true, points: 20 },
            { translations: { ar: "دار أوبرا سيدني", tn: "أوبرا سيدني", fr: "Opéra de Sydney", en: "Sydney Opera House" }, is_correct: true, points: 30 },
            { translations: { ar: "برج خليفة", tn: "برج خليفة بدبي", fr: "Burj Khalifa", en: "Burj Khalifa" }, is_correct: true, points: 30 },
            { translations: { ar: "ساعة بيغ بن", tn: "منڨالة بيغ بن بلندن", fr: "Big Ben", en: "Big Ben" }, is_correct: true, points: 30 },
            { translations: { ar: "محطة حافلات النقل", tn: "محطة الكيران", fr: "Station de bus", en: "Bus station" }, is_correct: false, points: 0 }
        ]
    }
];

const isLocalhost = window.location.hostname === "localhost" || 
                    window.location.hostname === "127.0.0.1" || 
                    window.location.hostname.startsWith("192.168.");

const BACKEND_URL = isLocalhost
    ? `${window.location.protocol}//${window.location.hostname}:8000` 
    : "https://elquizzgames-production.up.railway.app";

// Local state
let questions = [];
let generatedQuestion = null;
let currentSortColumn = "id";
let currentSortDir = "asc";

function mapDatabaseQuestion(dbQ) {
    const qTranslations = {};
    const availableLangs = [];
    if (dbQ.translations && Array.isArray(dbQ.translations)) {
        dbQ.translations.forEach(tr => {
            qTranslations[tr.language] = { text: tr.text };
            if (tr.text && tr.text.trim()) {
                availableLangs.push(tr.language);
            }
        });
    }
    const textFallback = dbQ.text || "";
    if (availableLangs.length === 0 && textFallback) {
        availableLangs.push("ar");
    }
    if (!qTranslations.ar) qTranslations.ar = { text: textFallback };
    if (!qTranslations.tn) qTranslations.tn = { text: textFallback };
    if (!qTranslations.fr) qTranslations.fr = { text: textFallback };
    if (!qTranslations.en) qTranslations.en = { text: textFallback };

    const mappedAnswers = dbQ.answers.map(ans => {
        const ansTranslations = {};
        if (ans.translations && Array.isArray(ans.translations)) {
            ans.translations.forEach(tr => {
                ansTranslations[tr.language] = tr.text;
            });
        }
        const ansTextFallback = ans.text || "";
        if (!ansTranslations.ar) ansTranslations.ar = ansTextFallback;
        if (!ansTranslations.tn) ansTranslations.tn = ansTextFallback;
        if (!ansTranslations.fr) ansTranslations.fr = ansTextFallback;
        if (!ansTranslations.en) ansTranslations.en = ansTextFallback;

        return {
            text: ansTextFallback,
            translations: ansTranslations,
            is_correct: ans.is_correct,
            points: ans.points
        };
    });

    return {
        id: dbQ.id,
        text: textFallback,
        translations: qTranslations,
        available_languages: availableLangs,
        category: dbQ.category,
        subcategory: dbQ.subcategory,
        answers: mappedAnswers,
        is_flagged: dbQ.is_flagged || false,
        is_approved: dbQ.is_approved !== false
    };
}

let dbCategories = [];

function findClosestSubcategory(catName, generatedSubcat) {
    if (!generatedSubcat) return "";
    
    const matchedCategory = dbCategories.find(c => c.name === catName);
    if (!matchedCategory) return "";
    
    const subcats = matchedCategory.subcategories.map(s => s.name);
    const genLower = generatedSubcat.toLowerCase().trim();
    
    // 1. Check exact match (case-insensitive)
    const exactMatch = subcats.find(s => s.toLowerCase() === genLower);
    if (exactMatch) return exactMatch;
    
    // 2. Check if the generated subcat contains or is contained by any existing subcat
    const partialMatch = subcats.find(s => {
        const sLower = s.toLowerCase();
        return genLower.includes(sLower) || sLower.includes(genLower);
    });
    if (partialMatch) return partialMatch;
    
    return "";
}

function generateRandomPoints() {
    const rand = Math.random();
    if (rand < 0.15) {
        // Hard Mix: contains exactly one 8
        return [1, 1, 1, 2, 2, 3, 3, 5, 8];
    } else if (rand < 0.55) {
        // Easy Mix: mostly 1s and 2s
        const options = [
            [1, 1, 1, 1, 1, 2, 2, 3, 5],
            [1, 1, 1, 1, 2, 2, 2, 3, 5],
            [1, 1, 1, 1, 1, 2, 3, 3, 5]
        ];
        return options[Math.floor(Math.random() * options.length)];
    } else {
        // Balanced Mix: balanced 1, 2, 3, 5
        const options = [
            [1, 1, 1, 2, 2, 2, 3, 3, 5],
            [1, 1, 2, 2, 2, 3, 3, 3, 5],
            [1, 1, 1, 2, 2, 3, 3, 5, 5]
        ];
        return options[Math.floor(Math.random() * options.length)];
    }
}

function populateSubcategoriesForCategory(catName, selectElement, currentSubcatValue) {
    if (!selectElement) return;
    
    const closestSubcat = findClosestSubcategory(catName, currentSubcatValue);
    const matchedCategory = dbCategories.find(c => c.name === catName);
    const subcats = matchedCategory ? matchedCategory.subcategories.map(s => s.name).sort() : [];
    
    let optionsHtml = `<option value="">-- Select Subcategory --</option>`;
    subcats.forEach(sub => {
        optionsHtml += `<option value="${sub}" ${sub === closestSubcat ? 'selected' : ''}>${sub}</option>`;
    });
    
    const isCustom = currentSubcatValue && !closestSubcat;
    optionsHtml += `<option value="__NEW__" ${isCustom ? 'selected' : ''}>Other (Create New)...</option>`;
    
    selectElement.innerHTML = optionsHtml;
}

// Initialize
async function init() {
    // Sync theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    // Load from localStorage fallback
    const saved = localStorage.getItem("QUESTIONS_DB");
    if (saved) {
        questions = JSON.parse(saved);
    } else {
        questions = DEFAULT_QUESTIONS;
        localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
    }
    
    // Query dynamically from database
    try {
        const res = await fetch(`${BACKEND_URL}/api/questions/list`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                questions = data.map(mapDatabaseQuestion);
                localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
                renderVisualizations();
                renderCrudTable();
            }
        }
    } catch (e) {
        console.warn("Could not load dynamic questions from backend database. Using cached fallback.", e);
    }

    // Query categories from database
    try {
        const catRes = await fetch(`${BACKEND_URL}/api/categories/list`);
        if (catRes.ok) {
            dbCategories = await catRes.json();
            
            const manCat = document.getElementById("man-category");
            const manSub = document.getElementById("man-subcategory-select");
            if (manCat && manSub) {
                populateSubcategoriesForCategory(manCat.value, manSub, "");
            }
        }
    } catch (e) {
        console.warn("Could not load categories list from backend database.", e);
    }

    // Set up tabs switching
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(n => n.classList.remove("active"));
            item.classList.add("active");

            const tabId = item.getAttribute("data-tab");
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            document.getElementById(tabId).classList.add("active");
            
            const activeMode = document.getElementById("admin-mode-select")?.value || "talla3";
            if (tabId === "tab-dashboard") {
                if (activeMode === "bent_waled") {
                    loadBwStats();
                } else {
                    renderVisualizations();
                }
            } else if (tabId === "tab-analytics") {
                loadAnalyticsDashboard();
            } else if (tabId === "tab-crud") {
                if (activeMode === "bent_waled") {
                    loadBwWordsTable();
                } else {
                    renderCrudTable();
                }
            } else if (tabId === "tab-universes") {
                loadUniversesAdmin();
            }
        });
    });

    // Bind CRUD search/filter triggers
    const crudSearch = document.getElementById("crud-search");
    const crudFilterCat = document.getElementById("crud-filter-category");
    const crudPrevLang = document.getElementById("crud-preview-lang");
    const crudFilterFlagged = document.getElementById("crud-filter-flagged");
    const crudFilterApproved = document.getElementById("crud-filter-approved");
    if (crudSearch) crudSearch.addEventListener("input", renderCrudTable);
    if (crudFilterCat) crudFilterCat.addEventListener("change", renderCrudTable);
    if (crudPrevLang) crudPrevLang.addEventListener("change", renderCrudTable);
    if (crudFilterFlagged) crudFilterFlagged.addEventListener("change", renderCrudTable);
    if (crudFilterApproved) crudFilterApproved.addEventListener("change", renderCrudTable);

    // Bind sortable headers
    const sortableHeaders = document.querySelectorAll(".sortable-header");
    sortableHeaders.forEach(th => {
        th.addEventListener("click", () => {
            const col = th.getAttribute("data-sort");
            if (currentSortColumn === col) {
                currentSortDir = currentSortDir === "asc" ? "desc" : "asc";
            } else {
                currentSortColumn = col;
                currentSortDir = "asc";
            }
            // Update sort arrows visually
            sortableHeaders.forEach(header => {
                const icon = header.querySelector(".sort-icon");
                const hCol = header.getAttribute("data-sort");
                if (hCol === currentSortColumn) {
                    icon.textContent = currentSortDir === "asc" ? "▲" : "▼";
                    icon.style.opacity = "1";
                } else {
                    icon.textContent = "↕";
                    icon.style.opacity = "0.5";
                }
            });
            renderCrudTable();
        });
    });

    // Bind Edit Question form submit
    const formEdit = document.getElementById("form-edit-question");
    if (formEdit) formEdit.addEventListener("submit", handleEditSubmit);

    // Bind Edit Question close & cancel actions
    const closeEdit = document.getElementById("close-edit-modal");
    if (closeEdit) {
        closeEdit.addEventListener("click", () => {
            document.getElementById("modal-edit-question").style.display = "none";
        });
    }
    const cancelEdit = document.getElementById("btn-edit-cancel");
    if (cancelEdit) {
        cancelEdit.addEventListener("click", () => {
            document.getElementById("modal-edit-question").style.display = "none";
        });
    }

    // Bind Edit Question delete action
    const deleteEdit = document.getElementById("btn-edit-delete");
    if (deleteEdit) deleteEdit.addEventListener("click", handleEditDelete);

    // Bind Edit Modal category selection watch
    const editCatSelect = document.getElementById("edit-q-category");
    const editSubSelect = document.getElementById("edit-q-subcategory-select");
    const editSubNewGroup = document.querySelector(".edit-subcategory-new-group");
    const editSubNewInput = document.getElementById("edit-q-subcategory-new");

    if (editCatSelect && editSubSelect) {
        editCatSelect.addEventListener("change", () => {
            populateSubcategoriesForCategory(editCatSelect.value, editSubSelect, "");
            editSubNewGroup.style.display = "none";
            editSubNewInput.removeAttribute("required");
        });
        
        editSubSelect.addEventListener("change", () => {
            if (editSubSelect.value === "__NEW__") {
                editSubNewGroup.style.display = "block";
                editSubNewInput.setAttribute("required", "true");
            } else {
                editSubNewGroup.style.display = "none";
                editSubNewInput.removeAttribute("required");
            }
        });
    }

    // Form manual submission
    const formManual = document.getElementById("form-manual-question");
    formManual.addEventListener("submit", handleManualSubmit);

    // Watch manual category selection to update subcategories
    const manCategorySelect = document.getElementById("man-category");
    const manSubcatSelect = document.getElementById("man-subcategory-select");
    const manSubcatNewGroup = document.getElementById("man-subcategory-new-group");
    
    if (manCategorySelect && manSubcatSelect) {
        manCategorySelect.addEventListener("change", () => {
            populateSubcategoriesForCategory(manCategorySelect.value, manSubcatSelect, "");
            manSubcatSelect.dispatchEvent(new Event("change"));
        });
    }

    // Watch manual subcategory dropdown selection
    if (manSubcatSelect && manSubcatNewGroup) {
        manSubcatSelect.addEventListener("change", () => {
            if (manSubcatSelect.value === "__NEW__") {
                manSubcatNewGroup.style.display = "block";
                document.getElementById("man-subcategory-new").setAttribute("required", "true");
            } else {
                manSubcatNewGroup.style.display = "none";
                document.getElementById("man-subcategory-new").removeAttribute("required");
            }
        });
    }

    // AI Generation click
    const btnGenAI = document.getElementById("btn-generate-ai");
    btnGenAI.addEventListener("click", handleAIGenerate);

    // AI Save click
    const btnSaveAI = document.getElementById("btn-save-ai-question");
    btnSaveAI.addEventListener("click", handleAISave);

    const btnDiscardAI = document.getElementById("btn-discard-ai");
    btnDiscardAI.addEventListener("click", () => {
        document.getElementById("ai-output-preview").style.display = "none";
        generatedQuestionsBatch = [];
    });

    // JSON Import Actions
    const btnImportJson = document.getElementById("btn-import-json");
    if (btnImportJson) {
        btnImportJson.addEventListener("click", handleJSONImport);
    }
    const btnClearJson = document.getElementById("btn-clear-json");
    if (btnClearJson) {
        btnClearJson.addEventListener("click", () => {
            document.getElementById("json-import-textarea").value = "";
            document.getElementById("json-import-status").style.display = "none";
        });
    }

    // JSON Import Prompt configuration change listeners
    const importPromptCat = document.getElementById("import-prompt-category");
    const importPromptSub = document.getElementById("import-prompt-subcategory");
    const importPromptCount = document.getElementById("import-prompt-count");
    if (importPromptCat) {
        importPromptCat.addEventListener("change", () => {
            populateImportPromptSubcategories();
            updateVariablePrompt();
        });
    }
    if (importPromptSub) {
        importPromptSub.addEventListener("change", updateVariablePrompt);
    }
    if (importPromptCount) {
        importPromptCount.addEventListener("change", updateVariablePrompt);
    }

    // Mode selection trigger
    const modeSelect = document.getElementById("admin-mode-select");
    if (modeSelect) {
        modeSelect.addEventListener("change", (e) => {
            switchAdminMode(e.target.value);
        });
    }

    // Bind Bent Waled filters
    const crudBwSearch = document.getElementById("crud-bw-search");
    const crudBwFilterCat = document.getElementById("crud-bw-filter-category");
    const crudBwFilterLet = document.getElementById("crud-bw-filter-letter");
    const crudBwFilterLang = document.getElementById("crud-bw-filter-lang");

    if (crudBwSearch) crudBwSearch.addEventListener("input", () => { bwCurrentPage = 0; loadBwWordsTable(); });
    if (crudBwFilterCat) crudBwFilterCat.addEventListener("change", () => { bwCurrentPage = 0; loadBwWordsTable(); });
    if (crudBwFilterLet) crudBwFilterLet.addEventListener("input", () => { bwCurrentPage = 0; loadBwWordsTable(); });
    if (crudBwFilterLang) crudBwFilterLang.addEventListener("change", () => { bwCurrentPage = 0; loadBwWordsTable(); });

    const btnBwExport = document.getElementById("btn-bw-export");
    if (btnBwExport) {
        btnBwExport.addEventListener("click", async () => {
            try {
                btnBwExport.disabled = true;
                btnBwExport.textContent = "Exporting... ⏳";
                const res = await fetch(`${BACKEND_URL}/api/bw/export`, { method: "POST" });
                if (res.ok) {
                    const data = await res.json();
                    alert(`🎉 Successfully exported ${data.exported_categories_count} files and compiled offline JS bundle!`);
                } else {
                    throw new Error("Export failed");
                }
            } catch (err) {
                console.error(err);
                alert("❌ Failed to export dictionary. Check that backend server is running and folder permissions are correct.");
            } finally {
                btnBwExport.disabled = false;
                btnBwExport.textContent = "Export to Disk 💾";
            }
        });
    }

    // Pagination buttons
    const btnBwPrev = document.getElementById("btn-bw-prev-page");
    const btnBwNext = document.getElementById("btn-bw-next-page");
    if (btnBwPrev) btnBwPrev.addEventListener("click", () => {
        if (bwCurrentPage > 0) {
            bwCurrentPage--;
            loadBwWordsTable();
        }
    });
    if (btnBwNext) btnBwNext.addEventListener("click", () => {
        if ((bwCurrentPage + 1) * bwPageSize < bwTotalWords) {
            bwCurrentPage++;
            loadBwWordsTable();
        }
    });

    // Form manual submission for words
    const formBwManual = document.getElementById("form-manual-bw-word");
    if (formBwManual) formBwManual.addEventListener("submit", handleBwManualSubmit);

    // Edit Word Modal actions
    const closeEditWord = document.getElementById("close-edit-word-modal");
    if (closeEditWord) {
        closeEditWord.addEventListener("click", () => {
            document.getElementById("modal-edit-word").style.display = "none";
        });
    }
    const cancelEditWord = document.getElementById("btn-edit-word-cancel");
    if (cancelEditWord) {
        cancelEditWord.addEventListener("click", () => {
            document.getElementById("modal-edit-word").style.display = "none";
        });
    }
    const deleteEditWord = document.getElementById("btn-edit-word-delete");
    if (deleteEditWord) deleteEditWord.addEventListener("click", handleEditWordDelete);

    const formEditWord = document.getElementById("form-edit-word");
    if (formEditWord) formEditWord.addEventListener("submit", handleEditWordSubmit);

    // AI word generator triggers
    const btnGenAiBw = document.getElementById("btn-generate-ai-bw");
    if (btnGenAiBw) btnGenAiBw.addEventListener("click", handleBwAIGenerate);

    const btnSaveAiBw = document.getElementById("btn-save-ai-bw");
    if (btnSaveAiBw) btnSaveAiBw.addEventListener("click", handleBwAISave);

    const btnDiscardAiBw = document.getElementById("btn-discard-ai-bw");
    if (btnDiscardAiBw) btnDiscardAiBw.addEventListener("click", () => {
        document.getElementById("ai-output-preview-bw").style.display = "none";
        generatedBwWords = [];
    });

    // Load visuals initially based on default mode selection
    const initialMode = modeSelect ? modeSelect.value : "talla3";
    switchAdminMode(initialMode);
    populateSubcategoryDropdowns();
    initUniversesAdminBindings();
}

// Render visualizations & cards
function renderVisualizations() {
    document.getElementById("stat-total-q").textContent = questions.length;
    const flaggedQuestions = questions.filter(q => q.is_flagged);
    document.getElementById("stat-flagged-q").textContent = flaggedQuestions.length;

    const flaggedTableBody = document.getElementById("flagged-questions-table-body");
    const flaggedCountLabel = document.getElementById("lbl-flagged-count");
    if (flaggedTableBody) {
        flaggedTableBody.innerHTML = "";
        flaggedCountLabel.textContent = `${flaggedQuestions.length} pending`;
        if (flaggedQuestions.length === 0) {
            flaggedTableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; opacity: 0.6; padding: 2rem;">No flagged questions. Good job!</td>
                </tr>
            `;
        } else {
            flaggedQuestions.forEach(q => {
                const previewText = q.translations.ar ? q.translations.ar.text : q.text;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${q.id}</td>
                    <td>${q.category}</td>
                    <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${previewText || ''}">
                        ${previewText || ''}
                    </td>
                    <td style="text-align: center;">
                        <button class="btn btn-secondary" onclick="openEditQuestionModal(${q.id})" style="padding: 2px 8px; font-size: 0.75rem; margin: 0;">Edit ✏️</button>
                    </td>
                `;
                flaggedTableBody.appendChild(row);
            });
        }
    }

    // Categories aggregate
    const categoriesMap = {};
    const subcategoriesMap = {};

    questions.forEach(q => {
        categoriesMap[q.category] = (categoriesMap[q.category] || 0) + 1;
        
        const subKey = `${q.category} > ${q.subcategory}`;
        subcategoriesMap[subKey] = {
            category: q.category,
            subcategory: q.subcategory,
            count: (subcategoriesMap[subKey]?.count || 0) + 1
        };
    });

    const categoryKeys = Object.keys(categoriesMap);
    document.getElementById("stat-total-cats").textContent = categoryKeys.length;
    document.getElementById("stat-total-subcats").textContent = Object.keys(subcategoriesMap).length;

    // Draw SVG Chart
    drawCategoryChart(categoriesMap);

    // Populate Subcategories Table
    const tableBody = document.getElementById("subcat-stats-rows");
    tableBody.innerHTML = "";

    const sortedSubcats = Object.values(subcategoriesMap).sort((a, b) => b.count - a.count);
    sortedSubcats.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.subcategory}</td>
            <td><strong style="color: #7c3aed; font-family: 'Outfit'; font-size: 1.15rem;">${item.count}</strong></td>
        `;
        tableBody.appendChild(row);
    });
}

// Draw dynamic category SVG chart
function drawCategoryChart(categoriesData) {
    const svg = document.getElementById("cat-distribution-svg");
    svg.innerHTML = ""; // clear previous
    
    const keys = Object.keys(categoriesData);
    if (keys.length === 0) return;

    const values = Object.values(categoriesData);
    const maxVal = Math.max(...values, 1);
    
    // Gradient definitions
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7c3aed" />
            <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
        <filter id="glow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#7c3aed" flood-opacity="0.35"/>
        </filter>
    `;
    svg.appendChild(defs);

    const chartWidth = 600;
    const chartHeight = 320;
    const paddingLeft = 50;
    const paddingRight = 20;
    const paddingTop = 30;
    const paddingBottom = 110; // Extra room for rotated labels
    
    const graphWidth = chartWidth - paddingLeft - paddingRight;
    const graphHeight = chartHeight - paddingTop - paddingBottom;
    
    const barWidth = Math.min(35, graphWidth / keys.length - 12);
    const gap = (graphWidth - (barWidth * keys.length)) / (keys.length + 1);

    // Draw bars
    keys.forEach((key, idx) => {
        const val = categoriesData[key];
        const height = (val / maxVal) * graphHeight;
        const x = paddingLeft + gap + idx * (barWidth + gap);
        const y = chartHeight - paddingBottom - height;

        // Bar rect
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", height);
        rect.setAttribute("class", "bar-rect");
        rect.setAttribute("filter", "url(#glow)");
        svg.appendChild(rect);

        // Value text
        const textVal = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textVal.setAttribute("x", x + barWidth/2);
        textVal.setAttribute("y", y - 6);
        textVal.setAttribute("text-anchor", "middle");
        textVal.setAttribute("class", "bar-val");
        textVal.textContent = val;
        svg.appendChild(textVal);

        // Label text (rotated to prevent overlapping)
        const textLbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textLbl.setAttribute("x", x + barWidth/2 - 4);
        textLbl.setAttribute("y", chartHeight - paddingBottom + 12);
        textLbl.setAttribute("text-anchor", "end");
        textLbl.setAttribute("class", "bar-text");
        textLbl.setAttribute("transform", `rotate(-35, ${x + barWidth/2 - 4}, ${chartHeight - paddingBottom + 12})`);
        textLbl.textContent = key;
        svg.appendChild(textLbl);
    });

    // Draw X Axis Baseline
    const xAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxisLine.setAttribute("x1", paddingLeft);
    xAxisLine.setAttribute("y1", chartHeight - paddingBottom);
    xAxisLine.setAttribute("x2", chartWidth - paddingRight);
    xAxisLine.setAttribute("y2", chartHeight - paddingBottom);
    xAxisLine.setAttribute("stroke", "rgba(255, 255, 255, 0.08)");
    svg.appendChild(xAxisLine);
}

// Handle Manual Form Submission
async function handleManualSubmit(e) {
    e.preventDefault();

    const text = document.getElementById("man-question-text").value.trim();
    const category = document.getElementById("man-category").value;
    
    const subcatSelectVal = document.getElementById("man-subcategory-select").value;
    let subcategory = subcatSelectVal;
    if (subcatSelectVal === "__NEW__") {
        subcategory = document.getElementById("man-subcategory-new").value.trim();
    }
    
    // Assemble answers
    const answers = [];
    for (let i = 0; i < 9; i++) {
        const valText = document.getElementById(`man-ans-correct-${i}`).value.trim();
        const valPts = parseInt(document.getElementById(`man-ans-pts-${i}`).value);
        answers.push({
            text: valText,
            is_correct: true,
            points: valPts
        });
    }

    const wrongText = document.getElementById("man-ans-wrong").value.trim();
    answers.push({
        text: wrongText,
        is_correct: false,
        points: 0
    });

    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    const newQ = {
        id: newId,
        text: text,
        category: category,
        subcategory: subcategory,
        answers: answers
    };

    const payload = {
        text: text,
        category: category,
        subcategory: subcategory || null,
        region: "Tunisia",
        language: "ar", // manual entries baseline to Arabic
        difficulty: 3,
        generation: "All",
        answers: answers.map(ans => ({
            text: ans.text,
            is_correct: ans.is_correct,
            points: ans.points
        }))
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api/questions/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            const savedQ = await response.json();
            const mappedQ = mapDatabaseQuestion(savedQ);
            questions.push(mappedQ);
            localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
            alert("🎉 Question saved successfully to database!");
        } else {
            throw new Error(`API returned ${response.status}`);
        }
    } catch (err) {
        console.error("Failed to save to database backend. Saving locally to localStorage only.", err);
        questions.push(newQ);
        localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
        alert("🎉 Question saved locally (fallback)!");
    }

    document.getElementById("form-manual-question").reset();
    document.getElementById("man-subcategory-new-group").style.display = "none";
    
    renderCrudTable();
    renderVisualizations();
    
    // Switch to Dashboard
    document.querySelector("[data-tab='tab-dashboard']").click();
}

let generatedQuestionsBatch = [];

async function handleAIGenerate() {
    const promptValue = document.getElementById("ai-prompt").value;
    
    // Get checked languages
    const selectedLangs = Array.from(document.querySelectorAll('input[name="ai-lang-checkbox"]:checked')).map(cb => cb.value);
    if (selectedLangs.length === 0) {
        alert("Please select at least one target language!");
        return;
    }
    
    const batchCount = parseInt(document.getElementById("ai-count").value);
    
    let geminiKey = localStorage.getItem("GEMINI_API_KEY") || "";
    if (!geminiKey) {
        const inputKey = prompt("Please enter your Gemini API Key to use AI generation (will be saved in browser):");
        if (inputKey) {
            geminiKey = inputKey.trim();
            localStorage.setItem("GEMINI_API_KEY", geminiKey);
        } else {
            return;
        }
    }
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`;

    const loadingSpinner = document.getElementById("ai-loading");
    const previewCard = document.getElementById("ai-output-preview");
    
    loadingSpinner.style.display = "flex";
    previewCard.style.display = "none";
    generatedQuestionsBatch = [];

    const langNames = {
        ar: "Arabic (Standard Tunisian Style)",
        tn: "Tunisian Arabic dialect (Derja in Arabic script)",
        fr: "French",
        en: "English"
    };
    const targetLangsStr = selectedLangs.map(l => `${l} (${langNames[l]})`).join(", ");

    // Generate a random points distribution for this session's schema example
    const pointsDistribution = generateRandomPoints();
    const correctAnswersSchemaParts = pointsDistribution.map((p, idx) => {
        return `        {
          "points": ${p},
          "translations": { ${selectedLangs.map(l => `"${l}": "Answer ${idx+1}"`).join(", ")} }
        }`;
    }).join(",\n");

    const systemPrompt = `You are a professional trivia content designer for the Tunisian mobile game "El Quizz".
Your task is to generate exactly ${batchCount} trivia questions based on the topic provided by the user.

For EACH question, you MUST translate the question text, correct answers list, and wrong answer into ALL the following requested languages: ${targetLangsStr}.

RULES:
1. The question must ask the player to list things/answers (e.g. "Name coastal Tunisian cities?").
2. Choose a category from these 10 official categories: "History & Politics", "Geography", "Economy & Business", "Science & Technology", "Sports", "Arts", "Entertainment", "Gastronomy", "Culture & Lifestyle", "Religion & Philosophy".
3. Return the response strictly as a single JSON object. Do NOT include any comments (like // or /*) inside the JSON response itself.
4. Each question must contain exactly 9 correct answers. Correct answer points must match one of the following Fibonacci rules (ordered from easiest/lowest to hardest/highest):
   - Mostly use distributions WITHOUT any 8-point answers (e.g. four '1's, two '2's, two '3's, one '5').
   - Rarely (about 15% of the time) include a single '8' point answer for near-impossible options.
   - Do NOT always use the same points pattern. Mix them up using 1, 2, 3, 5, and (rarely) 8 points.
5. Do NOT include any markdown code block wrap tags like \`\`\`json or \`\`\` in the output, just clean raw JSON string.

Strict JSON format to follow:
{
  "questions": [
    {
      "category": "Main Category",
      "subcategory": "Subcategory name (in English)",
      "translations": {
        ${selectedLangs.map(l => `"${l}": "Question text in ${langNames[l]}"`).join(",\n        ")}
      },
      "correct_answers": [
${correctAnswersSchemaParts}
      ],
      "wrong_answer": {
        "translations": {
          ${selectedLangs.map(l => `"${l}": "Wrong trap answer"`).join(",\n          ")}
        }
      }
    }
  ]
}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUser requested topic: ${promptValue}`
                    }]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API returned HTTP ${response.status}`);
        }

        const data = await response.json();
        let rawText = data.candidates[0].content.parts[0].text.trim();
        
        // Robust cleanup of markdown wrappers if present
        if (rawText.startsWith("```json")) {
            rawText = rawText.substring(7);
        } else if (rawText.startsWith("```")) {
            rawText = rawText.substring(3);
        }
        if (rawText.endsWith("```")) {
            rawText = rawText.substring(0, rawText.length - 3);
        }
        rawText = rawText.trim();
        
        const parsed = JSON.parse(rawText);

        if (!parsed.questions || !Array.isArray(parsed.questions)) {
            throw new Error("Invalid response format. Missing 'questions' array.");
        }

        generatedQuestionsBatch = parsed.questions;
        renderAIPendingBatch(selectedLangs);

        loadingSpinner.style.display = "none";
        previewCard.style.display = "block";
    } catch (err) {
        loadingSpinner.style.display = "none";
        alert(`❌ Generation failed: ${err.message}. Please check your API key or try again later.`);
        console.error(err);
    }
}

function renderAIPendingBatch(selectedLangs) {
    const container = document.getElementById("ai-preview-cards-container");
    container.innerHTML = "";

    const subcats = [...new Set(questions.map(q => q.subcategory).filter(Boolean))].sort();

    const officialNamesMap = {
        "Geography": "Geography",
        "History": "History & Politics",
        "History & Politics": "History & Politics",
        "Food": "Gastronomy",
        "Gastronomy": "Gastronomy",
        "Slang": "Culture & Lifestyle",
        "Culture": "Culture & Lifestyle",
        "Culture & Lifestyle": "Culture & Lifestyle",
        "Art": "Arts",
        "Arts": "Arts",
        "Sports": "Sports",
        "Science": "Science & Technology",
        "Technology": "Science & Technology",
        "Science & Technology": "Science & Technology",
        "Entertainment": "Entertainment",
        "Economy": "Economy & Business",
        "Business": "Economy & Business",
        "Economy & Business": "Economy & Business",
        "Religion": "Religion & Philosophy",
        "Philosophy": "Religion & Philosophy",
        "Religion & Philosophy": "Religion & Philosophy"
    };

    generatedQuestionsBatch.forEach((q, qIdx) => {
        const mappedCategory = officialNamesMap[q.category] || "Geography";
        
        let qTextsHtml = "";
        selectedLangs.forEach(lang => {
            const qVal = q.translations ? (q.translations[lang] || "") : (q.text || "");
            qTextsHtml += `
                <div class="form-group" style="margin-top: 0.5rem;">
                    <label>Question Text (${lang.toUpperCase()})</label>
                    <input type="text" class="prev-question-text-input" data-lang="${lang}" value="${qVal}" required>
                </div>
            `;
        });

        let correctAnswersHtml = "";
        q.correct_answers.forEach((ans, ansIdx) => {
            let ansLangsHtml = "";
            selectedLangs.forEach(lang => {
                const valText = ans.translations ? (ans.translations[lang] || "") : (ans.text || "");
                ansLangsHtml += `
                    <input type="text" class="prev-correct-ans-input" data-ans-idx="${ansIdx}" data-lang="${lang}" value="${valText}" placeholder="Answer ${ansIdx+1} (${lang.toUpperCase()})" required style="margin-bottom: 0.25rem;">
                `;
            });

            correctAnswersHtml += `
                <div class="ans-input-row" style="align-items: stretch; flex-direction: column; gap: 0.5rem; padding: 0.75rem 1rem; background: rgba(0,0,0,0.25); border: 1px solid var(--panel-border); border-radius: 12px; margin-bottom: 0.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                        <span class="ans-row-num">${ansIdx + 1}</span>
                        <select class="prev-correct-ans-pts" data-ans-idx="${ansIdx}" style="width: auto; background: rgba(0,0,0,0.4); color: var(--text-secondary); border: 1px solid var(--panel-border); border-radius: 6px; padding: 0.25rem 0.5rem;">
                            <option value="1" ${ans.points == 1 ? 'selected' : ''}>1</option>
                            <option value="2" ${ans.points == 2 ? 'selected' : ''}>2</option>
                            <option value="3" ${ans.points == 3 ? 'selected' : ''}>3</option>
                            <option value="5" ${ans.points == 5 ? 'selected' : ''}>5</option>
                            <option value="8" ${ans.points == 8 ? 'selected' : ''}>8</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        ${ansLangsHtml}
                    </div>
                </div>
            `;
        });

        let wrongAnswersHtml = "";
        selectedLangs.forEach(lang => {
            const wrongVal = q.wrong_answer.translations ? (q.wrong_answer.translations[lang] || "") : (q.wrong_answer || "");
            wrongAnswersHtml += `
                <div class="form-group" style="margin-top: 0.5rem;">
                    <label>Trap Answer (${lang.toUpperCase()})</label>
                    <input type="text" class="prev-wrong-input input-wrong" data-lang="${lang}" value="${wrongVal}" required>
                </div>
            `;
        });

        const card = document.createElement("div");
        card.className = "batch-question-card";
        card.style = "border-bottom: 2px solid var(--panel-border); padding-bottom: 2rem; margin-bottom: 2.5rem;";
        card.innerHTML = `
            <h4 style="margin-bottom: 1.5rem; color: var(--secondary-color); font-size: 1.2rem; font-weight: 800;">Question #${qIdx + 1}</h4>
            
            ${qTextsHtml}

            <div class="form-row-grid-three" style="margin-top: 1rem;">
                <div class="form-group">
                    <label>Main Category</label>
                    <select class="prev-category-select" required>
                        <option value="History & Politics" ${mappedCategory === 'History & Politics' ? 'selected' : ''}>History & Politics</option>
                        <option value="Geography" ${mappedCategory === 'Geography' ? 'selected' : ''}>Geography</option>
                        <option value="Economy & Business" ${mappedCategory === 'Economy & Business' ? 'selected' : ''}>Economy & Business</option>
                        <option value="Science & Technology" ${mappedCategory === 'Science & Technology' ? 'selected' : ''}>Science & Technology</option>
                        <option value="Sports" ${mappedCategory === 'Sports' ? 'selected' : ''}>Sports</option>
                        <option value="Arts" ${mappedCategory === 'Arts' ? 'selected' : ''}>Arts</option>
                        <option value="Entertainment" ${mappedCategory === 'Entertainment' ? 'selected' : ''}>Entertainment</option>
                        <option value="Gastronomy" ${mappedCategory === 'Gastronomy' ? 'selected' : ''}>Gastronomy</option>
                        <option value="Culture & Lifestyle" ${mappedCategory === 'Culture & Lifestyle' ? 'selected' : ''}>Culture & Lifestyle</option>
                        <option value="Religion & Philosophy" ${mappedCategory === 'Religion & Philosophy' ? 'selected' : ''}>Religion & Philosophy</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Subcategory</label>
                    <select class="prev-subcategory-select" required></select>
                </div>
                <div class="form-group">
                    <label>Difficulty</label>
                    <select class="prev-difficulty-select">
                        <option value="1">1 (Easy)</option>
                        <option value="2">2 (Medium)</option>
                        <option value="3" selected>3 (Difficult)</option>
                        <option value="4">4 (Extremely Hard)</option>
                        <option value="5">5 (Near Impossible)</option>
                    </select>
                </div>
            </div>

            <div class="form-row-grid prev-subcategory-new-group" style="display: none; margin-top: 0.5rem;">
                <div class="form-group">
                    <label>New Subcategory Name</label>
                    <input type="text" class="prev-subcategory-new-input" placeholder="Type new subcategory name" value="">
                </div>
            </div>

            <div class="preview-grid" style="margin-top: 1.5rem;">
                <div class="correct-answers-preview">
                    <h5>Correct Answers (Fibonacci Points)</h5>
                    <div class="preview-inputs-grid">
                        ${correctAnswersHtml}
                    </div>
                </div>
                <div class="wrong-answers-preview">
                    ${wrongAnswersHtml}
                </div>
            </div>
        `;
        container.appendChild(card);

        // Bind dynamic dropdowns and toggles
        const catSelect = card.querySelector(".prev-category-select");
        const subSelect = card.querySelector(".prev-subcategory-select");
        const cardNewGroup = card.querySelector(".prev-subcategory-new-group");
        const cardNewInput = card.querySelector(".prev-subcategory-new-input");

        // Initial populate
        populateSubcategoriesForCategory(mappedCategory, subSelect, q.subcategory);
        
        // Handle input preset value for custom subcat
        const closestSubcat = findClosestSubcategory(mappedCategory, q.subcategory);
        if (q.subcategory && !closestSubcat) {
            cardNewInput.value = q.subcategory;
        }

        const handleToggle = () => {
            if (subSelect.value === "__NEW__") {
                cardNewGroup.style.display = "block";
                cardNewInput.setAttribute("required", "true");
            } else {
                cardNewGroup.style.display = "none";
                cardNewInput.removeAttribute("required");
            }
        };

        subSelect.addEventListener("change", handleToggle);
        handleToggle();

        catSelect.addEventListener("change", () => {
            populateSubcategoriesForCategory(catSelect.value, subSelect, "");
            handleToggle();
        });
    });
}

// Save AI Generated Question
async function handleAISave() {
    if (generatedQuestionsBatch.length === 0) return;

    const selectedLangs = Array.from(document.querySelectorAll('input[name="ai-lang-checkbox"]:checked')).map(cb => cb.value);
    const cards = document.querySelectorAll(".batch-question-card");
    
    let savedCount = 0;
    let fallbackCount = 0;
    
    for (let idx = 0; idx < cards.length; idx++) {
        const card = cards[idx];
        
        // Grab texts
        const qTranslations = {};
        card.querySelectorAll(".prev-question-text-input").forEach(input => {
            const lang = input.getAttribute("data-lang");
            qTranslations[lang] = input.value.trim();
        });
        
        const category = card.querySelector(".prev-category-select").value;
        
        const subcatSelectVal = card.querySelector(".prev-subcategory-select").value;
        let subcategory = subcatSelectVal;
        if (subcatSelectVal === "__NEW__") {
            subcategory = card.querySelector(".prev-subcategory-new-input").value.trim();
        }

        const difficulty = parseInt(card.querySelector(".prev-difficulty-select").value);

        // Answers
        const mappedAnswers = [];
        for (let i = 0; i < 9; i++) {
            const pts = parseInt(card.querySelector(`.prev-correct-ans-pts[data-ans-idx="${i}"]`).value);
            
            const ansTranslations = {};
            card.querySelectorAll(`.prev-correct-ans-input[data-ans-idx="${i}"]`).forEach(input => {
                const lang = input.getAttribute("data-lang");
                ansTranslations[lang] = input.value.trim();
            });

            mappedAnswers.push({
                is_correct: true,
                points: pts,
                translations: ansTranslations
            });
        }

        // Wrong/trap answer
        const wrongTranslations = {};
        card.querySelectorAll(".prev-wrong-input").forEach(input => {
            const lang = input.getAttribute("data-lang");
            wrongTranslations[lang] = input.value.trim();
        });

        mappedAnswers.push({
            is_correct: false,
            points: 0,
            translations: wrongTranslations
        });

        const payload = {
            category: category,
            subcategory: subcategory || null,
            region: "Tunisia",
            difficulty: difficulty,
            generation: "All",
            translations: qTranslations,
            answers: mappedAnswers
        };

        let backendSaved = false;
        try {
            const response = await fetch(`${BACKEND_URL}/api/questions/create_multilang`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const savedQ = await response.json();
                const mappedQ = mapDatabaseQuestion(savedQ);
                questions.push(mappedQ);
                savedCount++;
                backendSaved = true;
            } else {
                throw new Error(`API returned ${response.status}`);
            }
        } catch (err) {
            console.error(`Failed to save question index ${idx} to database. Falling back to local storage.`, err);
        }

        if (!backendSaved) {
            // Local fallback logic
            const firstLang = Object.keys(qTranslations)[0] || "ar";
            const localFallbackQ = {
                id: Date.now() + idx, // Unique temporary ID
                text: qTranslations.ar || qTranslations[firstLang] || "",
                translations: Object.keys(qTranslations).reduce((acc, l) => {
                    acc[l] = { text: qTranslations[l] };
                    return acc;
                }, {}),
                available_languages: Object.keys(qTranslations),
                category: category,
                subcategory: subcategory || null,
                answers: mappedAnswers.map(ans => {
                    const ansFirstLang = Object.keys(ans.translations)[0] || "ar";
                    return {
                        text: ans.translations.ar || ans.translations[ansFirstLang] || "",
                        translations: ans.translations,
                        is_correct: ans.is_correct,
                        points: ans.points
                    };
                })
            };
            questions.push(localFallbackQ);
            fallbackCount++;
        }
    }

    // Update Cache
    localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
    
    if (fallbackCount > 0) {
        alert(`🎉 Saved ${savedCount} questions to database, and ${fallbackCount} locally (fallback due to offline/error).`);
    } else {
        alert(`🎉 Successfully saved ${savedCount} questions to database!`);
    }
    
    renderVisualizations();
    renderCrudTable();
    populateSubcategoryDropdowns();

    document.getElementById("ai-output-preview").style.display = "none";
    generatedQuestionsBatch = [];

    // Switch to Dashboard
    document.querySelector("[data-tab='tab-dashboard']").click();
}

// Render the CRUD view table
function renderCrudTable() {
    const tableBody = document.getElementById("crud-table-body");
    if (!tableBody) return;

    const searchTerm = document.getElementById("crud-search").value.toLowerCase().trim();
    const catFilter = document.getElementById("crud-filter-category").value;
    const previewLang = document.getElementById("crud-preview-lang").value;
    const flaggedFilter = document.getElementById("crud-filter-flagged").value;
    const approvedFilter = document.getElementById("crud-filter-approved").value;

    const filtered = questions.filter(q => {
        // 1.5 Flagged filter
        if (flaggedFilter === "flagged" && !q.is_flagged) {
            return false;
        } else if (flaggedFilter === "unflagged" && q.is_flagged) {
            return false;
        }

        // 1.6 Approved filter
        if (approvedFilter === "approved" && !q.is_approved) {
            return false;
        } else if (approvedFilter === "unapproved" && q.is_approved) {
            return false;
        }

        // 1. Category filter
        if (catFilter === "TO_DO") {
            const hasCat = q.category && q.category.trim() !== "";
            const hasSubcat = q.subcategory && q.subcategory.trim() !== "";
            if (hasCat && hasSubcat) return false;
        } else if (catFilter && q.category !== catFilter) {
            return false;
        }
        
        // 2. Search term
        if (searchTerm) {
            const matchId = String(q.id).includes(searchTerm);
            const matchCat = q.category.toLowerCase().includes(searchTerm);
            const matchSub = (q.subcategory || "").toLowerCase().includes(searchTerm);
            
            // Search all question translation texts
            let matchText = false;
            for (const lang in q.translations) {
                if (q.translations[lang] && q.translations[lang].text.toLowerCase().includes(searchTerm)) {
                    matchText = true;
                    break;
                }
            }
            
            // Search all answer translation texts
            let matchAns = false;
            for (const ans of q.answers) {
                for (const lang in ans.translations) {
                    if (ans.translations[lang] && ans.translations[lang].toLowerCase().includes(searchTerm)) {
                        matchAns = true;
                        break;
                    }
                }
            }
            
            if (!matchId && !matchCat && !matchSub && !matchText && !matchAns) return false;
        }
        
        return true;
    });

    // Apply sorting to the filtered list
    filtered.sort((a, b) => {
        let valA, valB;
        if (currentSortColumn === "id") {
            valA = a.id;
            valB = b.id;
        } else if (currentSortColumn === "category") {
            valA = a.category || "";
            valB = b.category || "";
        } else if (currentSortColumn === "subcategory") {
            valA = a.subcategory || "";
            valB = b.subcategory || "";
        } else if (currentSortColumn === "answers") {
            valA = a.answers ? a.answers.length : 0;
            valB = b.answers ? b.answers.length : 0;
        } else if (currentSortColumn === "text") {
            valA = (a.translations[previewLang] ? a.translations[previewLang].text : a.text) || "";
            valB = (b.translations[previewLang] ? b.translations[previewLang].text : b.text) || "";
        } else {
            valA = a.id;
            valB = b.id;
        }

        if (typeof valA === "string") {
            return currentSortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
            return currentSortDir === "asc" ? valA - valB : valB - valA;
        }
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="padding: 2rem; text-align: center; opacity: 0.6;">No questions match the current filters.</td>
            </tr>
        `;
        return;
    }

    let rowsHtml = "";
    filtered.forEach(q => {
        const arAvail = q.available_languages && q.available_languages.includes("ar");
        const tnAvail = q.available_languages && q.available_languages.includes("tn");
        const frAvail = q.available_languages && q.available_languages.includes("fr");
        const enAvail = q.available_languages && q.available_languages.includes("en");

        let previewText = q.translations[previewLang] ? q.translations[previewLang].text : q.text;
        if (q.is_flagged) {
            previewText = `🚩 <span style="color: #ff5252; font-weight: bold;">[FLAGGED]</span> ${previewText}`;
        }

        rowsHtml += `
            <tr style="border-bottom: 1px solid var(--panel-border);">
                <td style="padding: 12px 16px; font-weight: 700; color: var(--accent-color);">${q.id}</td>
                <td style="padding: 12px 16px; font-weight: 600;">${q.category}</td>
                <td style="padding: 12px 16px; opacity: 0.85;">${q.subcategory || '<span style="opacity: 0.5;">—</span>'}</td>
                <td style="padding: 12px 16px; text-align: center; font-weight: bold; color: var(--secondary-color);">${q.answers.length}</td>
                <td style="padding: 12px 16px; text-align: center;">
                    <span class="badge-lang ${arAvail ? 'available' : 'missing'}">${arAvail ? 'AR' : '—'}</span>
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                    <span class="badge-lang ${tnAvail ? 'available' : 'missing'}">${tnAvail ? 'TN' : '—'}</span>
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                    <span class="badge-lang ${frAvail ? 'available' : 'missing'}">${frAvail ? 'FR' : '—'}</span>
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                    <span class="badge-lang ${enAvail ? 'available' : 'missing'}">${enAvail ? 'EN' : '—'}</span>
                </td>
                <td style="padding: 12px 16px; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${previewText || ''}">
                    ${previewText || ''}
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                    <input type="checkbox" class="toggle-active-checkbox" data-id="${q.id}" ${q.is_approved ? 'checked' : ''} style="transform: scale(1.3); cursor: pointer; accent-color: var(--accent-color);">
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                    <button class="btn btn-secondary" onclick="openEditQuestionModal(${q.id})" style="padding: 4px 10px; font-size: 0.8rem; margin: 0;">Edit ✏️</button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = rowsHtml;

    // Bind active toggle checkbox listeners
    tableBody.querySelectorAll(".toggle-active-checkbox").forEach(chk => {
        chk.addEventListener("change", async (e) => {
            const qId = parseInt(chk.getAttribute("data-id"));
            const nextApprovedState = chk.checked;
            
            // Update local state
            const questionInDb = questions.find(item => item.id === qId);
            if (questionInDb) {
                questionInDb.is_approved = nextApprovedState;
                localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
            }
            
            try {
                const res = await fetch(`${BACKEND_URL}/api/questions/${qId}/approve?is_approved=${nextApprovedState}`, {
                    method: "POST"
                });
                if (!res.ok) {
                    console.error("Failed to update question approval state on backend");
                    // Revert UI on failure
                    chk.checked = !nextApprovedState;
                    if (questionInDb) {
                        questionInDb.is_approved = !nextApprovedState;
                        localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
                    }
                } else {
                    renderVisualizations();
                }
            } catch (err) {
                console.error("Error updating question approval state:", err);
                chk.checked = !nextApprovedState;
                if (questionInDb) {
                    questionInDb.is_approved = !nextApprovedState;
                    localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
                }
            }
        });
    });
}

// Open Edit Question Modal
async function openEditQuestionModal(qId) {
    const q = questions.find(item => item.id === qId);
    if (!q) return;

    document.getElementById("edit-q-id").value = q.id;
    document.getElementById("edit-q-flagged").checked = q.is_flagged || false;
    document.getElementById("edit-q-text-ar").value = q.translations.ar ? q.translations.ar.text : q.text;
    document.getElementById("edit-q-text-tn").value = q.translations.tn ? q.translations.tn.text : "";
    document.getElementById("edit-q-text-fr").value = q.translations.fr ? q.translations.fr.text : "";
    document.getElementById("edit-q-text-en").value = q.translations.en ? q.translations.en.text : "";

    // Set Category & Subcategory select options
    const categorySelect = document.getElementById("edit-q-category");
    categorySelect.value = q.category;

    const subSelect = document.getElementById("edit-q-subcategory-select");
    populateSubcategoriesForCategory(q.category, subSelect, q.subcategory);

    const subInputGroup = document.querySelector(".edit-subcategory-new-group");
    const subNewInput = document.getElementById("edit-q-subcategory-new");
    subNewInput.value = "";
    subInputGroup.style.display = "none";

    // Set Difficulty
    document.getElementById("edit-q-difficulty").value = q.difficulty || "3";

    // Dynamic Correct Answers Container
    const correctContainer = document.getElementById("edit-correct-answers-container");
    const correctAnswers = q.answers.filter(ans => ans.is_correct);
    let correctAnswersHtml = "";

    for (let i = 0; i < 9; i++) {
        const ans = correctAnswers[i] || { text: "", points: 1, translations: { ar: "", tn: "", fr: "", en: "" } };
        correctAnswersHtml += `
            <div style="border: 1px solid var(--panel-border); padding: 1rem; border-radius: 8px; background: rgba(255, 255, 255, 0.01);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <strong style="color: var(--text-secondary); font-size: 0.85rem;">Correct Answer #${i + 1}</strong>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 0.75rem; opacity: 0.8;">Points:</span>
                        <select class="edit-ans-pts" id="edit-ans-pts-${i}" style="padding: 4px; font-size: 0.8rem; width: 60px;">
                            <option value="1" ${ans.points === 1 ? 'selected' : ''}>1</option>
                            <option value="2" ${ans.points === 2 ? 'selected' : ''}>2</option>
                            <option value="3" ${ans.points === 3 ? 'selected' : ''}>3</option>
                            <option value="5" ${ans.points === 5 ? 'selected' : ''}>5</option>
                            <option value="8" ${ans.points === 8 ? 'selected' : ''}>8</option>
                        </select>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem;">
                    <div>
                        <input type="text" class="edit-ans-text-ar" id="edit-ans-text-ar-${i}" placeholder="Arabic (AR)" required style="padding: 6px; font-size: 0.85rem;" value="${ans.translations.ar || ans.text || ''}">
                    </div>
                    <div>
                        <input type="text" class="edit-ans-text-tn" id="edit-ans-text-tn-${i}" placeholder="Tunisian (TN)" style="padding: 6px; font-size: 0.85rem;" value="${ans.translations.tn || ''}">
                    </div>
                    <div>
                        <input type="text" class="edit-ans-text-fr" id="edit-ans-text-fr-${i}" placeholder="French (FR)" style="padding: 6px; font-size: 0.85rem;" value="${ans.translations.fr || ''}">
                    </div>
                    <div>
                        <input type="text" class="edit-ans-text-en" id="edit-ans-text-en-${i}" placeholder="English (EN)" style="padding: 6px; font-size: 0.85rem;" value="${ans.translations.en || ''}">
                    </div>
                </div>
            </div>
        `;
    }
    correctContainer.innerHTML = correctAnswersHtml;

    // Wrong Trap Answer Section
    const wrongContainer = document.getElementById("edit-trap-answers-container");
    const wrongAns = q.answers.find(ans => !ans.is_correct) || { text: "", translations: { ar: "", tn: "", fr: "", en: "" } };
    wrongContainer.innerHTML = `
        <div style="border: 1px solid rgba(239, 68, 68, 0.2); padding: 1rem; border-radius: 8px; background: rgba(239, 68, 68, 0.02); width: 100%;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem;">
                <div>
                    <input type="text" id="edit-ans-wrong-ar" placeholder="Arabic (AR)" required style="padding: 6px; font-size: 0.85rem;" value="${wrongAns.translations.ar || wrongAns.text || ''}">
                </div>
                <div>
                    <input type="text" id="edit-ans-wrong-tn" placeholder="Tunisian (TN)" style="padding: 6px; font-size: 0.85rem;" value="${wrongAns.translations.tn || ''}">
                </div>
                <div>
                    <input type="text" id="edit-ans-wrong-fr" placeholder="French (FR)" style="padding: 6px; font-size: 0.85rem;" value="${wrongAns.translations.fr || ''}">
                </div>
                <div>
                    <input type="text" id="edit-ans-wrong-en" placeholder="English (EN)" style="padding: 6px; font-size: 0.85rem;" value="${wrongAns.translations.en || ''}">
                </div>
            </div>
        </div>
    `;

    // Display modal
    document.getElementById("modal-edit-question").style.display = "flex";
}

// Edit Question Form Submit
async function handleEditSubmit(event) {
    event.preventDefault();
    const qId = parseInt(document.getElementById("edit-q-id").value);
    
    const category = document.getElementById("edit-q-category").value;
    const subcatSelect = document.getElementById("edit-q-subcategory-select").value;
    const subcatNew = document.getElementById("edit-q-subcategory-new").value.trim();
    const subcategory = subcatSelect === "__NEW__" ? subcatNew : subcatSelect;
    const difficulty = parseInt(document.getElementById("edit-q-difficulty").value);

    // Build translations dictionary
    const translations = {};
    const textAr = document.getElementById("edit-q-text-ar").value.trim();
    const textTn = document.getElementById("edit-q-text-tn").value.trim();
    const textFr = document.getElementById("edit-q-text-fr").value.trim();
    const textEn = document.getElementById("edit-q-text-en").value.trim();
    
    if (textAr) translations.ar = textAr;
    if (textTn) translations.tn = textTn;
    if (textFr) translations.fr = textFr;
    if (textEn) translations.en = textEn;

    // Collect answers
    const answers = [];
    for (let i = 0; i < 9; i++) {
        const pts = parseInt(document.getElementById(`edit-ans-pts-${i}`).value);
        const ansTranslations = {};
        const ansAr = document.getElementById(`edit-ans-text-ar-${i}`).value.trim();
        const ansTn = document.getElementById(`edit-ans-text-tn-${i}`).value.trim();
        const ansFr = document.getElementById(`edit-ans-text-fr-${i}`).value.trim();
        const ansEn = document.getElementById(`edit-ans-text-en-${i}`).value.trim();

        if (ansAr) ansTranslations.ar = ansAr;
        if (ansTn) ansTranslations.tn = ansTn;
        if (ansFr) ansTranslations.fr = ansFr;
        if (ansEn) ansTranslations.en = ansEn;

        answers.push({
            is_correct: true,
            points: pts,
            translations: ansTranslations
        });
    }

    // Add wrong answer
    const wrongTranslations = {};
    const wrongAr = document.getElementById("edit-ans-wrong-ar").value.trim();
    const wrongTn = document.getElementById("edit-ans-wrong-tn").value.trim();
    const wrongFr = document.getElementById("edit-ans-wrong-fr").value.trim();
    const wrongEn = document.getElementById("edit-ans-wrong-en").value.trim();

    if (wrongAr) wrongTranslations.ar = wrongAr;
    if (wrongTn) wrongTranslations.tn = wrongTn;
    if (wrongFr) wrongTranslations.fr = wrongFr;
    if (wrongEn) wrongTranslations.en = wrongEn;

    answers.push({
        is_correct: false,
        points: 0,
        translations: wrongTranslations
    });

    const payload = {
        category: category,
        subcategory: subcategory || null,
        region: "Tunisia",
        difficulty: difficulty,
        generation: "Manual",
        translations: translations,
        answers: answers,
        is_flagged: document.getElementById("edit-q-flagged").checked
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api/questions/${qId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            const updatedDbQ = await response.json();
            const mapped = mapDatabaseQuestion(updatedDbQ);
            
            // Update local questions list
            const index = questions.findIndex(item => item.id === qId);
            if (index !== -1) {
                questions[index] = mapped;
            }
            localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));
            
            alert("🎉 Question updated successfully in database!");
            document.getElementById("modal-edit-question").style.display = "none";
            renderCrudTable();
            renderVisualizations();
        } else {
            throw new Error(`API returned HTTP ${response.status}`);
        }
    } catch (e) {
        console.error("Failed to update question in database.", e);
        alert("❌ Failed to save updates to the database backend.");
    }
}

// Edit Question Form Delete
async function handleEditDelete() {
    const qId = parseInt(document.getElementById("edit-q-id").value);
    if (!qId) return;

    if (!confirm(`⚠️ Are you sure you want to permanently delete question ID #${qId}?`)) {
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/questions/${qId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            // Remove from local list
            questions = questions.filter(item => item.id !== qId);
            localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));

            alert("🗑️ Question deleted successfully!");
            document.getElementById("modal-edit-question").style.display = "none";
            renderCrudTable();
            renderVisualizations();
        } else {
            throw new Error(`API returned HTTP ${response.status}`);
        }
    } catch (e) {
        console.error("Failed to delete question.", e);
        alert("❌ Failed to delete the question from the database backend.");
    }
}

// Copy prompt template helper
function copyPromptTemplate(mode) {
    const textEl = mode === 'bw' 
        ? document.getElementById("prompt-template-text-bw")
        : document.getElementById("prompt-template-text");
    if (!textEl) return;
    textEl.select();
    textEl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textEl.value)
        .then(() => alert("📋 Chatbot prompt copied to clipboard!"))
        .catch(err => console.error("Could not copy prompt text: ", err));
}

// Handle importing questions from pasted JSON
async function handleJSONImport() {
    const textarea = document.getElementById("json-import-textarea");
    const statusContainer = document.getElementById("json-import-status");
    const logRowsContainer = document.getElementById("json-import-log-rows");
    const logBadge = document.getElementById("import-log-badge");

    if (!textarea || !statusContainer || !logRowsContainer || !logBadge) return;

    const rawVal = textarea.value.trim();
    if (!rawVal) {
        alert("Please paste a JSON array first!");
        return;
    }

    statusContainer.style.display = "block";
    logRowsContainer.innerHTML = "";
    logBadge.textContent = "Parsing...";
    logBadge.style.background = "var(--primary-color)";

    const log = (msg, type = "info") => {
        const color = type === "error" ? "var(--danger-color)" : type === "success" ? "var(--accent-color)" : type === "warning" ? "#fbbf24" : "var(--text-secondary)";
        const row = document.createElement("div");
        row.style.color = color;
        row.style.marginBottom = "0.25rem";
        row.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        logRowsContainer.appendChild(row);
        logRowsContainer.scrollTop = logRowsContainer.scrollHeight;
    };

    let parsedArray = null;
    try {
        parsedArray = JSON.parse(rawVal);
    } catch (err) {
        log(`Parsing error: Invalid JSON syntax. Check quotes, commas, brackets. ${err.message}`, "error");
        logBadge.textContent = "Failed";
        logBadge.style.background = "var(--danger-color)";
        return;
    }

    if (!Array.isArray(parsedArray)) {
        log("Validation error: JSON root must be an array of questions. e.g. [ { ... }, { ... } ]", "error");
        logBadge.textContent = "Failed";
        logBadge.style.background = "var(--danger-color)";
        return;
    }

    if (activeAdminMode === "bent_waled") {
        await handleBwJSONImport(parsedArray, log, logBadge);
        return;
    }

    if (parsedArray.length === 0) {
        log("Validation warning: The pasted JSON array is empty.", "warning");
        logBadge.textContent = "Finished (Empty)";
        logBadge.style.background = "var(--secondary-color)";
        return;
    }

    log(`Found ${parsedArray.length} question(s) in JSON. Validating and importing...`, "info");

    let savedCount = 0;
    let fallbackCount = 0;
    let errorCount = 0;

    for (let idx = 0; idx < parsedArray.length; idx++) {
        const item = parsedArray[idx];
        const qNum = idx + 1;

        // Validation checks
        if (!item.category) {
            log(`Q#${qNum} Error: Missing "category". Skipping.`, "error");
            errorCount++;
            continue;
        }

        if (!item.translations || typeof item.translations !== "object") {
            log(`Q#${qNum} Error: Missing or invalid "translations" object. Skipping.`, "error");
            errorCount++;
            continue;
        }

        if (!item.answers || !Array.isArray(item.answers)) {
            log(`Q#${qNum} Error: Missing "answers" array. Skipping.`, "error");
            errorCount++;
            continue;
        }

        // Clean values
        const category = item.category.trim();
        const subcategory = item.subcategory ? item.subcategory.trim() : null;
        const difficulty = item.difficulty ? parseInt(item.difficulty) : 3;
        const region = item.region || "Tunisia";
        const generation = item.generation || "All";

        const qTranslations = {};
        for (const lang in item.translations) {
            qTranslations[lang] = item.translations[lang].trim();
        }

        const mappedAnswers = [];
        let hasWrong = false;
        let correctCount = 0;

        for (const ans of item.answers) {
            const ansTranslations = {};
            if (ans.translations && typeof ans.translations === "object") {
                for (const l in ans.translations) {
                    ansTranslations[l] = ans.translations[l].trim();
                }
            } else if (ans.text) {
                // Fallback to text string mapping
                ansTranslations.ar = ans.text.trim();
                ansTranslations.tn = ans.text.trim();
                ansTranslations.fr = ans.text.trim();
                ansTranslations.en = ans.text.trim();
            }

            const isCorrect = !!ans.is_correct;
            const points = isCorrect ? (parseInt(ans.points) || 1) : 0;

            if (!isCorrect) {
                hasWrong = true;
            } else {
                correctCount++;
            }

            mappedAnswers.push({
                is_correct: isCorrect,
                points: points,
                translations: ansTranslations
            });
        }

        // Warning/adjust correctness structure
        if (correctCount !== 9) {
            log(`Q#${qNum} Warning: Should contain exactly 9 correct answers. Found: ${correctCount}.`, "warning");
        }
        if (!hasWrong) {
            log(`Q#${qNum} Warning: Missing incorrect trap answer. Adding a default wrong option.`, "warning");
            mappedAnswers.push({
                is_correct: false,
                points: 0,
                translations: { ar: "خيار خاطئ", tn: "خيار خاطئ", fr: "Faux choix", en: "Wrong option" }
            });
        }

        const payload = {
            category: category,
            subcategory: subcategory,
            region: region,
            difficulty: difficulty,
            generation: generation,
            translations: qTranslations,
            answers: mappedAnswers
        };

        log(`Q#${qNum}: Saving...`, "info");

        let backendSaved = false;
        try {
            const response = await fetch(`${BACKEND_URL}/api/questions/create_multilang`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const savedQ = await response.json();
                const mappedQ = mapDatabaseQuestion(savedQ);
                questions.push(mappedQ);
                savedCount++;
                backendSaved = true;
                log(`Q#${qNum} Success: Saved to remote database!`, "success");
            } else {
                throw new Error(`HTTP Status ${response.status}`);
            }
        } catch (dbErr) {
            log(`Q#${qNum}: Backend save failed (${dbErr.message}). Falling back to local cache...`, "info");
        }

        if (!backendSaved) {
            // Local fallback logic
            const firstLang = Object.keys(qTranslations)[0] || "ar";
            const localFallbackQ = {
                id: Date.now() + idx + Math.random(), // Unique temp ID
                text: qTranslations.ar || qTranslations[firstLang] || "",
                translations: Object.keys(qTranslations).reduce((acc, l) => {
                    acc[l] = { text: qTranslations[l] };
                    return acc;
                }, {}),
                available_languages: Object.keys(qTranslations),
                category: category,
                subcategory: subcategory,
                answers: mappedAnswers.map(ans => {
                    const ansFirstLang = Object.keys(ans.translations)[0] || "ar";
                    return {
                        text: ans.translations.ar || ans.translations[ansFirstLang] || "",
                        translations: ans.translations,
                        is_correct: ans.is_correct,
                        points: ans.points
                    };
                })
            };
            questions.push(localFallbackQ);
            fallbackCount++;
            log(`Q#${qNum} Success: Saved locally!`, "success");
        }
    }

    // Save questions cache
    localStorage.setItem("QUESTIONS_DB", JSON.stringify(questions));

    // Refresh views
    renderVisualizations();
    renderCrudTable();
    populateSubcategoryDropdowns();

    // Summarize finished state
    logBadge.textContent = "Finished";
    logBadge.style.background = "var(--accent-color)";
    log(`Import complete! Summary: ${savedCount} saved to database, ${fallbackCount} saved locally, ${errorCount} error(s).`, "success");

    alert(`🎉 Import Complete!\n- Database: ${savedCount}\n- Local Fallback: ${fallbackCount}\n- Skipped: ${errorCount}`);
}

function populateImportPromptSubcategories() {
    const catName = document.getElementById("import-prompt-category").value;
    const subSelect = document.getElementById("import-prompt-subcategory");
    if (!subSelect) return;
    
    if (!catName) {
        subSelect.innerHTML = `<option value="">-- All Subcategories --</option>`;
        return;
    }
    
    const matchedCategory = dbCategories.find(c => c.name === catName);
    const subcats = matchedCategory ? matchedCategory.subcategories.map(s => s.name).sort() : [];
    
    let optionsHtml = `<option value="">-- All Subcategories --</option>`;
    subcats.forEach(sub => {
        optionsHtml += `<option value="${sub}">${sub}</option>`;
    });
    subSelect.innerHTML = optionsHtml;
}

function updateVariablePrompt() {
    const catVal = document.getElementById("import-prompt-category").value;
    const subVal = document.getElementById("import-prompt-subcategory").value;
    const countVal = document.getElementById("import-prompt-count").value;
    const promptArea = document.getElementById("prompt-template-text");
    if (!promptArea) return;
    
    let topicPhrase = "Tunisian cultural heritage, history, or geography";
    if (catVal && subVal) {
        topicPhrase = `the specific subcategory "${subVal}" under the category "${catVal}" (relating to Tunisia)`;
    } else if (catVal) {
        topicPhrase = `the general category "${catVal}" (relating to Tunisia)`;
    }
    
    let catComment = "";
    if (catVal) {
        catComment = `  "category": "${catVal}", // Locked to user selection\n`;
    } else {
        catComment = `  "category": "Geography", // Choose one of: "History & Politics", "Geography", "Economy & Business", "Science & Technology", "Sports", "Arts", "Entertainment", "Gastronomy", "Culture & Lifestyle", "Religion & Philosophy"\n`;
    }
    
    let subcatComment = "";
    if (subVal) {
        subcatComment = `  "subcategory": "${subVal}", // Locked to user selection\n`;
    } else if (catVal) {
        // List subcategories of this category in comment
        const matchedCategory = dbCategories.find(c => c.name === catVal);
        const subcats = matchedCategory ? matchedCategory.subcategories.map(s => s.name).sort() : [];
        subcatComment = `  "subcategory": "Subcategory name", // Choose strictly from: ${JSON.stringify(subcats)}\n`;
    } else {
        subcatComment = `  "subcategory": "Cities & Borders", // Subcategory name in English\n`;
    }
    
    const promptText = `Act as a professional trivia content designer for the Tunisian mobile game "El Quizz".
Generate exactly ${countVal} trivia questions about ${topicPhrase}.
Return the response strictly as a single raw JSON array. DO NOT wrap it in markdown code block tags like \`\`\`json, and do not write any additional introductory or explanatory text.
Each question in the array must follow this exact format:
{
${catComment}${subcatComment}  "region": "Tunisia",
  "difficulty": 3, // 1 (Easy) to 5 (Near Impossible)
  "generation": "All",
  "translations": {
    "ar": "ما هي بعض الولايات التونسية الساحلية؟",
    "tn": "شنومة بعض الولايات التونسية الساحلية؟",
    "fr": "Quels sont des gouvernorats côtiers tunisiens?",
    "en": "What are some coastal Tunisian governorates?"
  },
  "answers": [
    // Must contain exactly 9 correct answers (is_correct: true) and 1 wrong/trap answer (is_correct: false, points: 0)
    // Points must use Fibonacci values: 1, 2, 3, 5, 8. Keep 8 points very rare!
    {
      "is_correct": true,
      "points": 1,
      "translations": {
        "ar": "بنزرت",
        "tn": "بنزرت",
        "fr": "Bizerte",
        "en": "Bizerte"
      }
    },
    // ... repeat for 9 correct answers ...
    {
      "is_correct": false,
      "points": 0,
      "translations": {
        "ar": "القيروان",
        "tn": "القيروان",
        "fr": "Kairouan",
        "en": "Kairouan"
      }
    }
  ]
}

STRICT OFFICIAL CATEGORY AND SUBCATEGORY SELECTION LIST (Choose ONLY from these):
- "History & Politics": ["Ancient", "Medieval", "Modern", "Contemporary", "Leaders & Governments"]
- "Geography": ["Worldwide", "Region", "Country"]
- "Economy & Business": ["Industries", "Agriculture", "Tourism", "Finance", "Companies"]
- "Science & Technology": ["Mathematics", "Natural Sciences", "Medicine", "Computing", "Engineering"]
- "Sports": ["Football", "Team Sports", "Individual Sports", "Olympics", "Records"]
- "Arts": ["Literature", "Music", "Visual Arts", "Theatre", "Architecture"]
- "Entertainment": ["Cinema", "Television", "Video Games", "anime", "Humor & Internet Culture"]
- "Gastronomy": ["Dishes", "Desserts", "Ingredients", "Drinks", "Regional Cuisine"]
- "Culture & Lifestyle": ["Traditions", "Languages & Dialects", "Daily Life", "Fashion", "Social Media & Trends"]
- "Religion & Philosophy": ["Islam", "Philosophy", "christianity", "judism", "other religions"]`;

    promptArea.value = promptText;
}

// Assign to window for inline onclick handlers
// Assign to window for inline onclick handlers
window.openEditQuestionModal = openEditQuestionModal;
window.copyPromptTemplate = copyPromptTemplate;
window.populateImportPromptSubcategories = populateImportPromptSubcategories;
window.updateVariablePrompt = updateVariablePrompt;

// ==========================================
// BENT WALED ADMIN FEATURES
// ==========================================

let activeAdminMode = "talla3";
let bwWords = [];
let bwTotalWords = 0;
let bwCurrentPage = 0;
const bwPageSize = 25;
let generatedBwWords = [];

// Switch Active Admin Mode
function switchAdminMode(mode) {
    activeAdminMode = mode;
    console.log("Switched active game mode in Admin Panel to:", mode);

    const lblDashTitle = document.getElementById("lbl-dash-title");
    const lblDashSubtitle = document.getElementById("lbl-dash-subtitle");
    const lblAddManualTitle = document.getElementById("lbl-add-manual-title");
    const lblAddManualSubtitle = document.getElementById("lbl-add-manual-subtitle");
    const lblAddAiTitle = document.getElementById("lbl-add-ai-title");
    const lblAddAiSubtitle = document.getElementById("lbl-add-ai-subtitle");
    const lblImportTitle = document.getElementById("lbl-import-title");
    const lblImportSubtitle = document.getElementById("lbl-import-subtitle");

    if (mode === "talla3") {
        if (lblDashTitle) lblDashTitle.textContent = "Questions Dashboard";
        if (lblDashSubtitle) lblDashSubtitle.textContent = "Statistics and distribution of questions per category";
        if (lblAddManualTitle) lblAddManualTitle.textContent = "Add Question Manually";
        if (lblAddManualSubtitle) lblAddManualSubtitle.textContent = "Enter question metadata, text, and Fibonacci answer weights";
        if (lblAddAiTitle) lblAddAiTitle.textContent = "AI Question Generator ✨";
        if (lblAddAiSubtitle) lblAddAiSubtitle.textContent = "Use Gemini to generate a batch of cultural questions with 9 answers and 1 trap";
        if (lblImportTitle) lblImportTitle.textContent = "Import Questions from JSON 📥";
        if (lblImportSubtitle) lblImportSubtitle.textContent = "Import a list of questions with multi-language translations and custom points in bulk.";

        document.getElementById("dashboard-talla3-view").style.display = "block";
        document.getElementById("dashboard-bw-view").style.display = "none";

        document.getElementById("crud-talla3-header").style.display = "flex";
        document.getElementById("crud-talla3-filters").style.display = "block";
        document.getElementById("crud-table-talla3").style.display = "table";
        document.getElementById("crud-bw-header").style.display = "none";
        document.getElementById("crud-bw-filters").style.display = "none";
        document.getElementById("crud-table-bw").style.display = "none";
        document.getElementById("crud-bw-pagination").style.display = "none";

        document.getElementById("form-manual-question").style.display = "block";
        document.getElementById("form-manual-bw-word").style.display = "none";

        document.getElementById("ai-gen-talla3-view").style.display = "block";
        document.getElementById("ai-gen-bw-view").style.display = "none";
        document.getElementById("ai-output-preview").style.display = "none";
        document.getElementById("ai-output-preview-bw").style.display = "none";

        document.getElementById("import-talla3-view").style.display = "block";
        document.getElementById("import-bw-view").style.display = "none";
        
        document.getElementById("lbl-paste-json-title").textContent = "📋 Paste Question JSON Array";
        document.getElementById("btn-import-json").textContent = "Validate & Import Questions";

        renderVisualizations();
        renderCrudTable();
    } else {
        if (lblDashTitle) lblDashTitle.textContent = "Bent Waled Dashboard";
        if (lblDashSubtitle) lblDashSubtitle.textContent = "Dictionary words database status and category overview";
        if (lblAddManualTitle) lblAddManualTitle.textContent = "Add Word to Dictionary";
        if (lblAddManualSubtitle) lblAddManualSubtitle.textContent = "Insert accepted words into the Bent Waled dictionary matching categories/letters";
        if (lblAddAiTitle) lblAddAiTitle.textContent = "AI Dictionary Word Generator ✨";
        if (lblAddAiSubtitle) lblAddAiSubtitle.textContent = "Use Gemini to build vocabulary lists for categories and letters in bulk";
        if (lblImportTitle) lblImportTitle.textContent = "Import Words from JSON 📥";
        if (lblImportSubtitle) lblImportSubtitle.textContent = "Import a batch dictionary list of categories/words in bulk.";

        document.getElementById("dashboard-talla3-view").style.display = "none";
        document.getElementById("dashboard-bw-view").style.display = "block";

        document.getElementById("crud-talla3-header").style.display = "none";
        document.getElementById("crud-talla3-filters").style.display = "none";
        document.getElementById("crud-table-talla3").style.display = "none";
        document.getElementById("crud-bw-header").style.display = "flex";
        document.getElementById("crud-bw-filters").style.display = "block";
        document.getElementById("crud-table-bw").style.display = "table";
        document.getElementById("crud-bw-pagination").style.display = "flex";

        document.getElementById("form-manual-question").style.display = "none";
        document.getElementById("form-manual-bw-word").style.display = "block";

        document.getElementById("ai-gen-talla3-view").style.display = "none";
        document.getElementById("ai-gen-bw-view").style.display = "block";
        document.getElementById("ai-output-preview").style.display = "none";
        document.getElementById("ai-output-preview-bw").style.display = "none";

        document.getElementById("import-talla3-view").style.display = "none";
        document.getElementById("import-bw-view").style.display = "block";

        document.getElementById("lbl-paste-json-title").textContent = "📋 Paste Dictionary Word JSON Array";
        document.getElementById("btn-import-json").textContent = "Validate & Import Words";

        loadBwStats();
        loadBwWordsTable();
    }
}

// Load stats for Bent Waled
async function loadBwStats() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/bw/stats`);
        if (!res.ok) throw new Error("Failed to load BW stats");
        const stats = await res.json();

        document.getElementById("stat-bw-total-words").textContent = stats.total_answers;
        document.getElementById("stat-bw-approved-words").textContent = stats.approved;
        document.getElementById("stat-bw-pending-words").textContent = stats.pending;

        // Render categories chart
        drawBwCategoryChart(stats.categories || {});

        // Populate languages table
        const langBody = document.getElementById("bw-lang-stats-rows");
        langBody.innerHTML = "";
        const langNames = {
            "ar": "Standard Arabic",
            "tn": "Tunisian Dialect (Derja)",
            "fr": "French",
            "en": "English"
        };
        for (const [langCode, count] of Object.entries(stats.languages || {})) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><strong>${langCode.toUpperCase()}</strong></td>
                <td>${langNames[langCode] || langCode}</td>
                <td><strong style="color: #10b981; font-family: 'Outfit'; font-size: 1.15rem;">${count}</strong></td>
            `;
            langBody.appendChild(row);
        }
    } catch (err) {
        console.error("Failed loading Bent Waled statistics:", err);
    }
}

// Draw Bent Waled categories SVG distribution chart
function drawBwCategoryChart(categoriesData) {
    const svg = document.getElementById("bw-cat-distribution-svg");
    if (!svg) return;
    svg.innerHTML = ""; // clear previous

    const keys = Object.keys(categoriesData);
    if (keys.length === 0) return;

    const values = Object.values(categoriesData);
    const maxVal = Math.max(...values, 1);
    
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <linearGradient id="bw-bar-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#059669" />
        </linearGradient>
        <filter id="bw-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#10b981" flood-opacity="0.35"/>
        </filter>
    `;
    svg.appendChild(defs);

    const chartWidth = 600;
    const chartHeight = 320;
    const paddingLeft = 50;
    const paddingRight = 20;
    const paddingTop = 30;
    const paddingBottom = 110;
    
    const graphWidth = chartWidth - paddingLeft - paddingRight;
    const graphHeight = chartHeight - paddingTop - paddingBottom;
    
    const barWidth = Math.min(35, graphWidth / keys.length - 12);
    const gap = (graphWidth - (barWidth * keys.length)) / (keys.length + 1);

    keys.forEach((key, idx) => {
        const val = categoriesData[key];
        const height = (val / maxVal) * graphHeight;
        const x = paddingLeft + gap + idx * (barWidth + gap);
        const y = chartHeight - paddingBottom - height;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", "url(#bw-bar-gradient)");
        rect.setAttribute("rx", "4");
        rect.setAttribute("filter", "url(#bw-glow)");
        svg.appendChild(rect);

        const textVal = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textVal.setAttribute("x", x + barWidth/2);
        textVal.setAttribute("y", y - 6);
        textVal.setAttribute("text-anchor", "middle");
        textVal.setAttribute("fill", "var(--text-primary)");
        textVal.setAttribute("font-size", "0.85rem");
        textVal.textContent = val;
        svg.appendChild(textVal);

        const textLbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textLbl.setAttribute("x", x + barWidth/2 - 4);
        textLbl.setAttribute("y", chartHeight - paddingBottom + 12);
        textLbl.setAttribute("text-anchor", "end");
        textLbl.setAttribute("fill", "var(--text-secondary)");
        textLbl.setAttribute("font-size", "0.8rem");
        textLbl.setAttribute("transform", `rotate(-45, ${x + barWidth/2}, ${chartHeight - paddingBottom + 12})`);
        textLbl.textContent = key.toUpperCase();
        svg.appendChild(textLbl);
    });
}

// Load Bent Waled paginated dictionary table
async function loadBwWordsTable() {
    const tableBody = document.getElementById("crud-bw-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = `<tr><td colspan="9" style="padding: 2rem; text-align: center; opacity: 0.6;">Loading words dictionary...</td></tr>`;

    // Extract filters
    const search = document.getElementById("crud-bw-search")?.value.trim() || "";
    const category = document.getElementById("crud-bw-filter-category")?.value || "";
    const letter = document.getElementById("crud-bw-filter-letter")?.value.trim() || "";
    const lang = document.getElementById("crud-bw-filter-lang")?.value || "";

    const params = new URLSearchParams();
    if (search) params.append("query", search);
    if (category) params.append("category", category);
    if (letter) params.append("letter", letter);
    if (lang) params.append("language", lang);

    params.append("skip", (bwCurrentPage * bwPageSize).toString());
    params.append("limit", bwPageSize.toString());

    try {
        const res = await fetch(`${BACKEND_URL}/api/bw/words?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load dictionary list");
        const data = await res.json();

        bwTotalWords = data.total;
        bwWords = data.words;

        // Render table
        tableBody.innerHTML = "";
        if (bwWords.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="padding: 2rem; text-align: center; opacity: 0.6;">No words found matching filters.</td></tr>`;
            document.getElementById("crud-bw-pag-info").textContent = "Showing 0-0 of 0";
            return;
        }

        bwWords.forEach(w => {
            const row = document.createElement("tr");
            row.style.borderBottom = "1px solid var(--panel-border)";
            const aliasesText = (w.aliases && w.aliases.length > 0) ? w.aliases.join(", ") : "-";
            row.innerHTML = `
                <td style="padding: 12px 16px; color: var(--text-secondary); font-family: monospace;">#${w.id}</td>
                <td style="padding: 12px 16px; color: var(--text-secondary); font-family: monospace;">${w.entity_id}</td>
                <td style="padding: 12px 16px; font-weight: bold; text-transform: uppercase;">${w.category}</td>
                <td style="padding: 12px 16px; text-align: center; color: var(--accent-color); font-weight: bold; font-size: 1.1rem;">${w.letter}</td>
                <td style="padding: 12px 16px; font-size: 1rem; color: var(--text-primary); font-weight: 500;">${w.answer}</td>
                <td style="padding: 12px 16px; color: var(--text-secondary); font-style: italic;">${aliasesText}</td>
                <td style="padding: 12px 16px; text-align: center;">
                    <span style="padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; background: rgba(59,130,246,0.15); color: #3b82f6;">
                        ${w.language.toUpperCase()}
                    </span>
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                    <span style="padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; background: ${w.status === 'approved' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; color: ${w.status === 'approved' ? '#10b981' : '#ef4444'};">
                        ${w.status === 'approved' ? 'Approved' : 'Pending'}
                    </span>
                </td>
                <td style="padding: 12px 16px; text-align: center;">
                    <button class="btn btn-secondary" onclick="openEditWordModal(${w.id})" style="padding: 4px 8px; font-size: 0.8rem; margin: 0;">Edit 📝</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Pagination info
        const start = bwCurrentPage * bwPageSize + 1;
        const end = Math.min(start + bwWords.length - 1, bwTotalWords);
        document.getElementById("crud-bw-pag-info").textContent = `Showing ${start}-${end} of ${bwTotalWords}`;
    } catch (err) {
        console.error("Failed loading Bent Waled table rows:", err);
    }
}

// Add word manually submit
async function handleBwManualSubmit(e) {
    e.preventDefault();
    const wordInput = document.getElementById("man-bw-word");
    const entityInput = document.getElementById("man-bw-entity-id");
    const aliasesInput = document.getElementById("man-bw-aliases");
    const categorySelect = document.getElementById("man-bw-category");
    const letterInput = document.getElementById("man-bw-letter");
    const langSelect = document.getElementById("man-bw-lang");
    const approvedCheck = document.getElementById("man-bw-approved");

    const aliasesList = aliasesInput.value.split(",")
        .map(a => a.trim())
        .filter(a => a.length > 0);

    const payload = {
        answer: wordInput.value.trim(),
        entity_id: entityInput.value.trim() || null,
        aliases: aliasesList,
        category: categorySelect.value,
        letter: letterInput.value.trim(),
        language: langSelect.value,
        status: approvedCheck.checked ? "approved" : "pending"
    };

    try {
        const res = await fetch(`${BACKEND_URL}/api/bw/words`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("🎉 Word saved successfully to dictionary!");
            wordInput.value = "";
            entityInput.value = "";
            aliasesInput.value = "";
            bwCurrentPage = 0;
            loadBwWordsTable();
            loadBwStats();
        } else {
            throw new Error("Failed to save word");
        }
    } catch (err) {
        console.error(err);
        alert("❌ Failed to save the word to the database.");
    }
}

// Open Edit Word Modal
async function openEditWordModal(wordId) {
    const word = bwWords.find(w => w.id === wordId);
    if (!word) return;

    document.getElementById("edit-word-id").value = word.id;
    document.getElementById("edit-word-text").value = word.answer;
    document.getElementById("edit-word-entity-id").value = word.entity_id || "";
    document.getElementById("edit-word-aliases").value = (word.aliases || []).join(", ");
    document.getElementById("edit-word-category").value = word.category;
    document.getElementById("edit-word-letter").value = word.letter;
    document.getElementById("edit-word-lang").value = word.language;
    document.getElementById("edit-word-approved").checked = (word.status === "approved");

    document.getElementById("modal-edit-word").style.display = "flex";
}

// Save edited word submit
async function handleEditWordSubmit(e) {
    e.preventDefault();
    const wordId = parseInt(document.getElementById("edit-word-id").value);
    if (!wordId) return;

    const aliasesList = document.getElementById("edit-word-aliases").value.split(",")
        .map(a => a.trim())
        .filter(a => a.length > 0);

    const payload = {
        answer: document.getElementById("edit-word-text").value.trim(),
        entity_id: document.getElementById("edit-word-entity-id").value.trim() || null,
        aliases: aliasesList,
        category: document.getElementById("edit-word-category").value,
        letter: document.getElementById("edit-word-letter").value.trim(),
        language: document.getElementById("edit-word-lang").value,
        status: document.getElementById("edit-word-approved").checked ? "approved" : "pending"
    };

    try {
        const res = await fetch(`${BACKEND_URL}/api/bw/words/${wordId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("🎉 Word updated successfully!");
            document.getElementById("modal-edit-word").style.display = "none";
            loadBwWordsTable();
            loadBwStats();
        } else {
            throw new Error("Failed to update word");
        }
    } catch (err) {
        console.error(err);
        alert("❌ Failed to save changes to backend database.");
    }
}

// Delete word
async function handleEditWordDelete() {
    const wordId = parseInt(document.getElementById("edit-word-id").value);
    if (!wordId) return;

    if (!confirm(`⚠️ Are you sure you want to delete this word from the dictionary?`)) {
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/api/bw/words/${wordId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            alert("🗑️ Word deleted successfully!");
            document.getElementById("modal-edit-word").style.display = "none";
            loadBwWordsTable();
            loadBwStats();
        } else {
            throw new Error("Failed to delete word");
        }
    } catch (err) {
        console.error(err);
        alert("❌ Failed to delete the word from the database.");
    }
}

// AI Word Generation
async function handleBwAIGenerate() {
    const promptInput = document.getElementById("ai-bw-prompt");
    const categorySelect = document.getElementById("ai-bw-category-select");
    const letterInput = document.getElementById("ai-bw-letter-input");
    const langSelect = document.getElementById("ai-bw-lang-select");
    const countSelect = document.getElementById("ai-bw-count");

    const category = categorySelect.value;
    const letter = letterInput.value.trim().toUpperCase();
    const lang = langSelect.value;
    const count = parseInt(countSelect.value);

    const promptText = `Act as an expert dictionary vocabulary builder.
Generate exactly ${count} valid and correct unique words or names in language "${lang}" for the category "${category}" that start strictly with the letter "${letter}".
Prompt details: "${promptInput.value}".
Return the response strictly as a raw JSON array. DO NOT wrap in markdown code block tags like \`\`\`json, and write no intro text.
Each item in the array must follow this format:
{
  "category": "${category}",
  "letter": "${letter}",
  "word": "Generated Word Here",
  "language": "${lang}"
}`;

    const loadingSpinner = document.getElementById("ai-loading");
    const loadingText = document.getElementById("ai-loading-text");
    const previewContainer = document.getElementById("ai-output-preview-bw");

    if (loadingSpinner && loadingText) {
        loadingText.textContent = "Connecting to Gemini to generate dictionary vocabulary list...";
        loadingSpinner.style.display = "flex";
    }
    previewContainer.style.display = "none";

    try {
        const response = await fetch(`${BACKEND_URL}/api/questions/ai-generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: promptText,
                model_name: "gemini-1.5-pro"
            })
        });

        if (!response.ok) throw new Error(`API returned HTTP ${response.status}`);
        const data = await response.json();

        let generated = [];
        try {
            const cleanText = data.text.replace(/```json/g, "").replace(/```/g, "").trim();
            generated = JSON.parse(cleanText);
        } catch (parseErr) {
            console.error("AI output parse error:", parseErr, data.text);
            alert("❌ Failed to parse AI generated output. Try generating again.");
            return;
        }

        generatedBwWords = generated.map((item, idx) => ({
            id: idx + 1,
            category: item.category || category,
            letter: item.letter || letter,
            word: item.word || "",
            language: item.language || lang,
            selected: true
        }));

        const tbody = document.getElementById("ai-bw-preview-rows");
        tbody.innerHTML = "";
        generatedBwWords.forEach(w => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" checked onchange="toggleBwAiSelect(${w.id}, this.checked)"></td>
                <td><input type="text" value="${w.category}" oninput="updateBwAiField(${w.id}, 'category', this.value)" style="width:100%; padding:4px; background:transparent; border:none; color:white;"></td>
                <td><input type="text" value="${w.letter}" oninput="updateBwAiField(${w.id}, 'letter', this.value)" style="width:100%; text-align:center; padding:4px; background:transparent; border:none; color:white;"></td>
                <td><input type="text" value="${w.word}" oninput="updateBwAiField(${w.id}, 'word', this.value)" style="width:100%; padding:4px; background:transparent; border:none; color:white;"></td>
                <td><input type="text" value="${w.language}" oninput="updateBwAiField(${w.id}, 'language', this.value)" style="width:100%; text-align:center; padding:4px; background:transparent; border:none; color:white;"></td>
            `;
            tbody.appendChild(row);
        });

        previewContainer.style.display = "block";
    } catch (err) {
        console.error("AI word generation failed:", err);
        alert("❌ Failed to generate vocabulary words via Gemini API.");
    } finally {
        if (loadingSpinner) loadingSpinner.style.display = "none";
    }
}

function toggleBwAiSelect(id, isChecked) {
    const item = generatedBwWords.find(w => w.id === id);
    if (item) item.selected = isChecked;
}

function updateBwAiField(id, field, value) {
    const item = generatedBwWords.find(w => w.id === id);
    if (item) item[field] = value;
}

// Bulk save selected AI words
async function handleBwAISave() {
    const selected = generatedBwWords.filter(w => w.selected && w.word.trim());
    if (selected.length === 0) {
        alert("No words selected to save!");
        return;
    }

    let saved = 0;
    for (const item of selected) {
        try {
            const res = await fetch(`${BACKEND_URL}/api/bw/words`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category: item.category,
                    letter: item.letter,
                    word: item.word,
                    language: item.language,
                    is_approved: true
                })
            });
            if (res.ok) saved++;
        } catch (err) {
            console.error("Failed saving bulk word:", err);
        }
    }

    alert(`🎉 Successfully saved ${saved} word(s) to dictionary!`);
    document.getElementById("ai-output-preview-bw").style.display = "none";
    loadBwWordsTable();
    loadBwStats();
}

// JSON Dictionary Words import handler
async function handleBwJSONImport(parsedArray, log, logBadge) {
    log(`Found ${parsedArray.length} word(s) in dictionary JSON. Importing...`, "info");
    let savedCount = 0;
    let errorCount = 0;

    for (let idx = 0; idx < parsedArray.length; idx++) {
        const item = parsedArray[idx];
        if (!item.word || !item.category || !item.letter || !item.language) {
            log(`Row #${idx + 1} skipped: Missing word, category, letter, or language fields.`, "warning");
            errorCount++;
            continue;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/bw/words`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category: item.category.trim().toLowerCase(),
                    letter: item.letter.trim(),
                    word: item.word.trim(),
                    language: item.language.trim().toLowerCase(),
                    is_approved: true
                })
            });
            if (res.ok) {
                savedCount++;
            } else {
                throw new Error("HTTP " + res.status);
            }
        } catch (err) {
            log(`Row #${idx + 1} ("${item.word}") failed to save: ${err.message}`, "error");
            errorCount++;
        }
    }

    log(`Import finished: Saved ${savedCount} word(s) to dictionary, errors/skipped: ${errorCount}`, "success");
    logBadge.textContent = "Finished";
    logBadge.style.background = "var(--accent-color)";

    loadBwWordsTable();
    loadBwStats();
}

window.openEditWordModal = openEditWordModal;
window.toggleBwAiSelect = toggleBwAiSelect;
window.updateBwAiField = updateBwAiField;
window.switchAdminMode = switchAdminMode;

function populateSubcategoryDropdowns() {
    const manCat = document.getElementById("man-category");
    const manSub = document.getElementById("man-subcategory-select");
    if (manCat && manSub) {
        populateSubcategoriesForCategory(manCat.value, manSub, "");
    }
    const editCat = document.getElementById("edit-question-category");
    const editSub = document.getElementById("edit-question-subcategory");
    if (editCat && editSub) {
        populateSubcategoriesForCategory(editCat.value, editSub, "");
    }
    if (typeof populateImportPromptSubcategories === "function") {
        populateImportPromptSubcategories();
    }
}

async function loadAnalyticsDashboard() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/analytics/stats`);
        if (!res.ok) return;
        const data = await res.json();
        
        // Summary Cards
        document.getElementById("stat-total-hits").textContent = data.total_actions || 0;
        document.getElementById("stat-active-sessions").textContent = data.unique_sessions || 0;
        
        const talla3Count = data.mode_counts.talla3_9 || 0;
        const bwCount = data.mode_counts.bent_waled || 0;
        const totalGames = talla3Count + bwCount;
        document.getElementById("stat-games-played-total").textContent = totalGames;
        
        // Game Mode Shares
        document.getElementById("lbl-mode-talla3-count").textContent = `${talla3Count} games`;
        document.getElementById("lbl-mode-bw-count").textContent = `${bwCount} games`;
        
        const talla3Percent = totalGames > 0 ? Math.round((talla3Count / totalGames) * 100) : 0;
        const bwPercent = totalGames > 0 ? Math.round((bwCount / totalGames) * 100) : 0;
        
        document.getElementById("bar-mode-talla3").style.width = `${talla3Percent}%`;
        document.getElementById("bar-mode-bw").style.width = `${bwPercent}%`;
        
        // Top Countries
        const countryBody = document.getElementById("analytics-country-rows");
        if (countryBody) {
            countryBody.innerHTML = "";
            if (data.region_stats && data.region_stats.length > 0) {
                data.region_stats.forEach(c => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td style="font-weight: bold; color: #fff;">🌍 ${c.country}</td>
                        <td>${c.count} hits</td>
                    `;
                    countryBody.appendChild(row);
                });
            } else {
                countryBody.innerHTML = `<tr><td colspan="2" style="text-align: center; opacity: 0.5;">No geolocation data tracked yet</td></tr>`;
            }
        }
        
        // Render Histograms
        renderHistogram("duration-histogram-bars", data.duration_histogram, "var(--primary)");
        renderHistogram("score-histogram-bars", data.score_histogram, "#6366f1");
        
    } catch (e) {
        console.error("Failed to load analytics dashboard", e);
    }
}

function renderHistogram(containerId, histogramData, colorClass = "var(--primary)") {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    
    const values = Object.values(histogramData);
    const keys = Object.keys(histogramData);
    const maxVal = Math.max(...values, 1); // avoid division by zero
    
    keys.forEach(key => {
        const val = histogramData[key];
        const heightPercent = Math.round((val / maxVal) * 80); // max 80% height to leave room for label
        
        const barWrapper = document.createElement("div");
        barWrapper.style.display = "flex";
        barWrapper.style.flexDirection = "column";
        barWrapper.style.alignItems = "center";
        barWrapper.style.flex = "1";
        barWrapper.style.height = "100%";
        barWrapper.style.justifyContent = "flex-end";
        
        barWrapper.innerHTML = `
            <span style="font-size: 0.8rem; font-weight: bold; margin-bottom: 5px; color: #fff; transition: all 0.3s ease;">${val}</span>
            <div style="width: 24px; height: ${heightPercent}%; background: ${colorClass}; border-radius: 4px 4px 0 0; min-height: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.25); transition: height 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);"></div>
            <span style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 8px; font-weight: 600; text-align: center; white-space: nowrap;">${key}</span>
        `;
        
        container.appendChild(barWrapper);
    });
}

let adminUniverses = [];
let adminSelectedUniverseId = null;
let adminAllDbQuestions = [];

async function loadUniversesAdmin() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/universes`);
        if (response.ok) {
            adminUniverses = await response.json();
            renderAdminUniversesList();
            // Automatically select first universe if none is selected
            if (adminUniverses.length > 0 && !adminSelectedUniverseId) {
                selectAdminUniverse(adminUniverses[0].id);
            }
        }
    } catch (err) {
        console.error("Error loading universes in admin panel", err);
    }
}

function renderAdminUniversesList() {
    const listContainer = document.getElementById("admin-universes-list");
    if (!listContainer) return;

    if (adminUniverses.length === 0) {
        listContainer.innerHTML = `<div style="text-align: center; color: #888; font-style: italic; padding: 10px;">No universes created.</div>`;
        return;
    }

    listContainer.innerHTML = adminUniverses.map(univ => {
        const isActive = adminSelectedUniverseId === univ.id;
        return `
            <div class="universe-item" data-id="${univ.id}" style="padding: 10px; background: ${isActive ? 'rgba(78, 159, 61, 0.15)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${isActive ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)'}; border-radius: 8px; cursor: pointer; transition: all 0.2s; margin-bottom: 8px;">
                <span style="font-weight: bold; color: ${isActive ? 'var(--accent-color)' : '#fff'}; font-size: 0.9rem; display: block;">${univ.name}</span>
                ${univ.description ? `<span style="font-size: 0.72rem; color: #999; display: block; margin-top: 2px;">${univ.description}</span>` : ''}
            </div>
        `;
    }).join("");

    const items = listContainer.querySelectorAll(".universe-item");
    items.forEach(item => {
        item.addEventListener("click", () => {
            const uId = parseInt(item.getAttribute("data-id"));
            selectAdminUniverse(uId);
        });
    });
}

async function selectAdminUniverse(universeId) {
    adminSelectedUniverseId = universeId;
    renderAdminUniversesList();

    const univ = adminUniverses.find(u => u.id === universeId);
    if (!univ) return;

    document.getElementById("admin-selected-universe-title").textContent = `Universe: ${univ.name} 🌌`;
    document.getElementById("admin-selected-universe-desc").textContent = univ.description || "No description provided.";
    document.getElementById("admin-universe-questions-panel").style.display = "block";

    await Promise.all([
        loadUniverseQuestions(universeId),
        loadAvailableQuestionsForUniverse(universeId)
    ]);
}

async function loadUniverseQuestions(universeId) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/universes/${universeId}/questions`);
        if (response.ok) {
            const linkedQuestions = await response.json();
            renderUniverseQuestionsTable(linkedQuestions);
        }
    } catch (err) {
        console.error("Error fetching universe questions", err);
    }
}

function renderUniverseQuestionsTable(questions) {
    const tbody = document.getElementById("admin-universe-questions-table-body");
    if (!tbody) return;

    if (questions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #888; padding: 15px; font-style: italic;">No questions linked to this universe yet. Link an existing question below!</td></tr>`;
        return;
    }

    tbody.innerHTML = questions.map(q => {
        let qText = q.text;
        if (q.translations && q.translations.length > 0) {
            const arTr = q.translations.find(t => t.language === "ar") || q.translations[0];
            qText = arTr.text;
        }

        return `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 10px; color: var(--accent-color); font-weight: bold;">${q.id}</td>
                <td style="padding: 10px; font-weight: 600;">${q.category}</td>
                <td style="padding: 10px; font-size: 0.85rem; max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${qText}</td>
                <td style="padding: 10px; text-align: center;">
                    <button class="btn btn-secondary" onclick="unlinkQuestionFromUniverse(${adminSelectedUniverseId}, ${q.id})" style="padding: 4px 8px; margin: 0; font-size: 0.72rem; background: rgba(217,32,39,0.15); border: 1px solid #d92027; color: #d92027; border-radius: 4px; cursor: pointer;">Unlink ❌</button>
                </td>
            </tr>
        `;
    }).join("");
}

async function loadAvailableQuestionsForUniverse(universeId) {
    try {
        if (adminAllDbQuestions.length === 0) {
            const response = await fetch(`${BACKEND_URL}/api/questions/list`);
            if (response.ok) {
                adminAllDbQuestions = await response.json();
            }
        }

        const linkedRes = await fetch(`${BACKEND_URL}/api/universes/${universeId}/questions`);
        let linkedIds = [];
        if (linkedRes.ok) {
            const linked = await linkedRes.json();
            linkedIds = linked.map(l => l.id);
        }

        const available = adminAllDbQuestions.filter(q => !linkedIds.includes(q.id));

        const select = document.getElementById("admin-universe-available-questions-select");
        if (!select) return;

        if (available.length === 0) {
            select.innerHTML = `<option value="">-- No questions available to link --</option>`;
            return;
        }

        select.innerHTML = available.map(q => {
            let qText = q.text;
            if (q.translations && q.translations.length > 0) {
                const arTr = q.translations.find(t => t.language === "ar") || q.translations[0];
                qText = arTr.text;
            }
            if (qText.length > 60) qText = qText.substring(0, 57) + "...";
            return `<option value="${q.id}">[ID: ${q.id}] (${q.category}) ${qText}</option>`;
        }).join("");

    } catch (err) {
        console.error("Error loading available questions", err);
    }
}

window.unlinkQuestionFromUniverse = async function(universeId, questionId) {
    if (!confirm(`Are you sure you want to remove question ID ${questionId} from this universe?`)) return;

    try {
        const response = await fetch(`${BACKEND_URL}/api/universes/${universeId}/questions/${questionId}`, {
            method: "DELETE"
        });
        if (response.status === 204 || response.ok) {
            await selectAdminUniverse(universeId);
        } else {
            alert("Failed to unlink question.");
        }
    } catch (err) {
        console.error("Error unlinking question", err);
    }
};

function initUniversesAdminBindings() {
    const triggerBtn = document.getElementById("btn-admin-create-universe-trigger");
    const box = document.getElementById("admin-universe-creation-box");
    const cancelBtn = document.getElementById("btn-admin-cancel-universe");
    const submitBtn = document.getElementById("btn-admin-submit-universe");
    const addQBtn = document.getElementById("btn-admin-add-question-to-universe");

    if (triggerBtn && box) {
        triggerBtn.addEventListener("click", () => {
            box.style.display = "block";
        });
    }

    if (cancelBtn && box) {
        cancelBtn.addEventListener("click", () => {
            box.style.display = "none";
            document.getElementById("admin-universe-name-input").value = "";
            document.getElementById("admin-universe-desc-input").value = "";
        });
    }

    if (submitBtn && box) {
        submitBtn.addEventListener("click", async () => {
            const nameVal = document.getElementById("admin-universe-name-input").value.trim();
            const descVal = document.getElementById("admin-universe-desc-input").value.trim();

            if (!nameVal) {
                alert("Please enter a universe name!");
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/api/universes`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: nameVal, description: descVal })
                });

                if (response.ok) {
                    box.style.display = "none";
                    document.getElementById("admin-universe-name-input").value = "";
                    document.getElementById("admin-universe-desc-input").value = "";
                    await loadUniversesAdmin();
                } else {
                    const err = await response.json();
                    alert("Failed to create universe: " + (err.detail || "Error"));
                }
            } catch (err) {
                console.error("Error creating universe", err);
            }
        });
    }

    if (addQBtn) {
        addQBtn.addEventListener("click", async () => {
            const select = document.getElementById("admin-universe-available-questions-select");
            const qIdVal = select ? select.value : null;

            if (!qIdVal || !adminSelectedUniverseId) {
                alert("Please select a valid question to link!");
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/api/universes/${adminSelectedUniverseId}/questions/${qIdVal}`, {
                    method: "POST"
                });

                if (response.ok) {
                    await selectAdminUniverse(adminSelectedUniverseId);
                } else {
                    alert("Failed to link question.");
                }
            } catch (err) {
                console.error("Error linking question", err);
            }
        });
    }
}

// Fire initialization on load
window.addEventListener("DOMContentLoaded", init);

