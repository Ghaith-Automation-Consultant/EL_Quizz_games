import os
import sys

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import database
import models

def seed_100_general_culture():
    print("Connecting to database...")
    db = database.SessionLocal()
    try:
        # Load official categories from database to map IDs
        print("Fetching categories and subcategories...")
        categories = db.query(models.Category).all()
        subcategories = db.query(models.Subcategory).all()
        
        category_map = {cat.name: cat.id for cat in categories}
        
        # Subcategory mapping by category_id and subcategory name
        subcat_map = {}
        for sub in subcategories:
            subcat_map[(sub.category_id, sub.name)] = sub.id
            
        print(f"Loaded {len(category_map)} categories and {len(subcat_map)} subcategories.")

        # List of 100 General Culture Questions (10 for each of the 10 categories)
        raw_questions = [
            # ==================== 1. History & Politics ====================
            {
                "category": "History & Politics",
                "subcategory": "Ancient",
                "difficulty": 2,
                "text_ar": "أذكر 9 إمبراطوريات أو حضارات قديمة حكمت حوض البحر الأبيض المتوسط؟",
                "text_tn": "طلّع 9 إمبراطوريات ولا حضارات قديمة حكمت حوض البحر الأبيض المتوسط؟",
                "text_fr": "Citez 9 empires ou civilisations antiques ayant régné sur le bassin méditerranéen ?",
                "text_en": "Name 9 ancient empires or civilizations that ruled the Mediterranean basin?",
                "correct": [
                    {"ar": "الرومانية", "tn": "الرومانية", "fr": "Romain", "en": "Roman"},
                    {"ar": "الفينيقية", "tn": "الفينيقية", "fr": "Phénicien", "en": "Phoenician"},
                    {"ar": "القرطاجية", "tn": "القرطاجية", "fr": "Carthaginois", "en": "Carthaginian"},
                    {"ar": "البيزنطية", "tn": "البيزنطية", "fr": "Byzantin", "en": "Byzantine"},
                    {"ar": "العثمانية", "tn": "العثمانية", "fr": "Ottoman", "en": "Ottoman"},
                    {"ar": "اليونانية القديمة", "tn": "اليونانية القديمة", "fr": "Grec ancien", "en": "Ancient Greek"},
                    {"ar": "المصرية القديمة", "tn": "المصرية القديمة", "fr": "Égyptien antique", "en": "Ancient Egyptian"},
                    {"ar": "الفارسية", "tn": "الفارسية", "fr": "Perse", "en": "Persian"},
                    {"ar": "العباسية", "tn": "العباسية", "fr": "Abbasside", "en": "Abbasid"}
                ],
                "wrong": {"ar": "الإنكا", "tn": "الإنكا", "fr": "Inca", "en": "Incan"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Leaders & Governments",
                "difficulty": 3,
                "text_ar": "أذكر 9 قادة أو ملوك حكموا تونس عبر مختلف العصور التاريخية؟",
                "text_tn": "طلّع 9 قادة ولا ملوك حكموا تونس على مر العصور التاريخية؟",
                "text_fr": "Citez 9 dirigeants ou rois ayant gouverné la Tunisie à travers l'histoire ?",
                "text_en": "Name 9 leaders or kings who ruled Tunisia throughout history?",
                "correct": [
                    {"ar": "الحبيب بورقيبة", "tn": "الحبيب بورقيبة", "fr": "Habib Bourguiba", "en": "Habib Bourguiba"},
                    {"ar": "زين العابدين بن علي", "tn": "زين العابدين بن علي", "fr": "Zine El Abidine Ben Ali", "en": "Zine El Abidine Ben Ali"},
                    {"ar": "حنبعل", "tn": "حنبعل", "fr": "Hannibal", "en": "Hannibal"},
                    {"ar": "ماسينيسا", "tn": "ماسينيسا", "fr": "Massinissa", "en": "Massinissa"},
                    {"ar": "عليسة (ديديو)", "tn": "عليسة", "fr": "Dido (Elissa)", "en": "Dido (Elissa)"},
                    {"ar": "عثمان داي", "tn": "عثمان داي", "fr": "Othman Dey", "en": "Othman Dey"},
                    {"ar": "حمودة باشا", "tn": "حمودة باشا", "fr": "Hammouda Pacha", "en": "Hammouda Pacha"},
                    {"ar": "أبو زكريا الحفصي", "tn": "أبو زكريا الحفصي", "fr": "Abu Zakariya al-Hafsi", "en": "Abu Zakariya al-Hafsi"},
                    {"ar": "الباجي قائد السبسي", "tn": "الباجي قائد السبسي", "fr": "Beji Caid Essebsi", "en": "Beji Caid Essebsi"}
                ],
                "wrong": {"ar": "يوليوس قيصر", "tn": "يوليوس قيصر", "fr": "Jules César", "en": "Julius Caesar"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Leaders & Governments",
                "difficulty": 1,
                "text_ar": "أذكر 9 دول شاركت في تأسيس منظمة الأمم المتحدة عام 1945؟",
                "text_tn": "طلّع 9 دول شاركت في تأسيس منظمة الأمم المتحدة عام 1945؟",
                "text_fr": "Citez 9 pays fondateurs de l'Organisation des Nations Unies (ONU) en 1945 ?",
                "text_en": "Name 9 founding countries of the United Nations (UN) in 1945?",
                "correct": [
                    {"ar": "الولايات المتحدة", "tn": "الولايات المتحدة", "fr": "États-Unis", "en": "United States"},
                    {"ar": "المملكة المتحدة", "tn": "المملكة المتحدة", "fr": "Royaume-Uni", "en": "United Kingdom"},
                    {"ar": "الاتحاد السوفيتي", "tn": "الاتحاد السوفيتي", "fr": "Union Soviétique", "en": "Soviet Union"},
                    {"ar": "الصين", "tn": "الصين", "fr": "Chine", "en": "China"},
                    {"ar": "فرنسا", "tn": "فرنسا", "fr": "France", "en": "France"},
                    {"ar": "مصر", "tn": "مصر", "fr": "Égypte", "en": "Egypt"},
                    {"ar": "كندا", "tn": "كندا", "fr": "Canada", "en": "Canada"},
                    {"ar": "البرازيل", "tn": "البرازيل", "fr": "Brésil", "en": "Brazil"},
                    {"ar": "الهند", "tn": "الهند", "fr": "Inde", "en": "India"}
                ],
                "wrong": {"ar": "ألمانيا", "tn": "ألمانيا", "fr": "Allemagne", "en": "Germany"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Ancient",
                "difficulty": 2,
                "text_ar": "أذكر 9 فراعنة من حكام مصر القديمة؟",
                "text_tn": "طلّع 9 فراعنة من حكام مصر القديمة؟",
                "text_fr": "Citez 9 pharaons célèbres de l'Égypte antique ?",
                "text_en": "Name 9 famous pharaohs of Ancient Egypt?",
                "correct": [
                    {"ar": "توت عنخ آمون", "tn": "توت عنخ آمون", "fr": "Toutânkhamon", "en": "Tutankhamun"},
                    {"ar": "رمسيس الثاني", "tn": "رمسيس الثاني", "fr": "Ramsès II", "en": "Ramses II"},
                    {"ar": "كليوباترا السابعة", "tn": "كليوباترا السابعة", "fr": "Cléopâtre VII", "en": "Cleopatra VII"},
                    {"ar": "حتشبسوت", "tn": "حتشبسوت", "fr": "Hatchepsout", "en": "Hatshepsut"},
                    {"ar": "خوفو", "tn": "خوفو", "fr": "Khéops", "en": "Khufu"},
                    {"ar": "أخناتون", "tn": "أخناتون", "fr": "Akhenaton", "en": "Akhenaten"},
                    {"ar": "نفرتيتي", "tn": "نفرتيتي", "fr": "Néfertiti", "en": "Nefertiti"},
                    {"ar": "تحتمس الثالث", "tn": "تحتمس الثالث", "fr": "Thoutmôsis III", "en": "Thutmose III"},
                    {"ar": "سيتي الأول", "tn": "سيتي الأول", "fr": "Séthi Ier", "en": "Seti I"}
                ],
                "wrong": {"ar": "نبوخذ نصر", "tn": "نبوخذ نصر", "fr": "Nabuchodonosor", "en": "Nebuchadnezzar"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Medieval",
                "difficulty": 2,
                "text_ar": "أذكر 9 خلفاء مسلمين من العصر الراشدي أو الأموي أو العباسي؟",
                "text_tn": "طلّع 9 خلفاء مسلمين من العصر الراشدي ولا الأموي ولا العباسي؟",
                "text_fr": "Citez 9 califes musulmans célèbres des époques rashidoune, omeyyade ou abbasside ?",
                "text_en": "Name 9 famous Islamic caliphs from the Rashidun, Umayyad, or Abbasid eras?",
                "correct": [
                    {"ar": "أبو بكر الصديق", "tn": "أبو بكر الصديق", "fr": "Abu Bakr", "en": "Abu Bakr"},
                    {"ar": "عمر بن الخطاب", "tn": "عمر بن الخطاب", "fr": "Umar ibn al-Khattab", "en": "Umar ibn al-Khattab"},
                    {"ar": "عثمان بن عفان", "tn": "عثمان بن عفان", "fr": "Uthman ibn Affan", "en": "Uthman ibn Affan"},
                    {"ar": "علي بن أبي طالب", "tn": "علي بن أبي طالب", "fr": "Ali ibn Abi Talib", "en": "Ali ibn Abi Talib"},
                    {"ar": "معاوية بن أبي سفيان", "tn": "معاوية بن أبي سفيان", "fr": "Muawiya I", "en": "Muawiya I"},
                    {"ar": "عمر بن عبد العزيز", "tn": "عمر بن عبد العزيز", "fr": "Umar II", "en": "Umar II"},
                    {"ar": "هارون الرشيد", "tn": "هارون الرشيد", "fr": "Haroun al-Rachid", "en": "Harun al-Rashid"},
                    {"ar": "أبو جعفر المنصور", "tn": "أبو جعفر المنصور", "fr": "Abu Ja'far al-Mansur", "en": "Abu Ja'far al-Mansur"},
                    {"ar": "المأمون", "tn": "المأمون", "fr": "Al-Ma'mun", "en": "Al-Ma'mun"}
                ],
                "wrong": {"ar": "صلاح الدين الأيوبي", "tn": "صلاح الدين الأيوبي", "fr": "Saladin", "en": "Saladin"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Modern",
                "difficulty": 2,
                "text_ar": "أذكر 9 شخصيات تاريخية ارتبط اسمها بالثورة الفرنسية؟",
                "text_tn": "طلّع 9 شخصيات تاريخية ارتبط اسمها بالثورة الفرنسية؟",
                "text_fr": "Citez 9 figures historiques majeures de la Révolution française ?",
                "text_en": "Name 9 major historical figures associated with the French Revolution?",
                "correct": [
                    {"ar": "ماكسيميليان روبسبيير", "tn": "ماكسيميليان روبسبيير", "fr": "Maximilien Robespierre", "en": "Maximilien Robespierre"},
                    {"ar": "الملك لويس السادس عشر", "tn": "الملك لويس السادس عشر", "fr": "Louis XVI", "en": "King Louis XVI"},
                    {"ar": "ماري أنطوانيت", "tn": "ماري أنطوانيت", "fr": "Marie-Antoinette", "en": "Marie Antoinette"},
                    {"ar": "جان بول مارا", "tn": "جان بول مارا", "fr": "Jean-Paul Marat", "en": "Jean-Paul Marat"},
                    {"ar": "جورج دانتون", "tn": "جورج دانتون", "fr": "Georges Danton", "en": "Georges Danton"},
                    {"ar": "نابوديون بونابرت", "tn": "نابليون بونابرت", "fr": "Napoléon Bonaparte", "en": "Napoleon Bonaparte"},
                    {"ar": "ماركيز دي لافاييت", "tn": "ماركيز دي لافاييت", "fr": "Marquis de Lafayette", "en": "Marquis de Lafayette"},
                    {"ar": "أوليمب دي غوج", "tn": "أوليمب دي غوج", "fr": "Olympe de Gouges", "en": "Olympe de Gouges"},
                    {"ar": "توماس بين", "tn": "توماس بين", "fr": "Thomas Paine", "en": "Thomas Paine"}
                ],
                "wrong": {"ar": "تشارلز ديغول", "tn": "تشارلز ديغول", "fr": "Charles de Gaulle", "en": "Charles de Gaulle"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Contemporary",
                "difficulty": 2,
                "text_ar": "أذكر 9 قادة سياسيين أو عسكريين بارزين في الحرب العالمية الثانية؟",
                "text_tn": "طلّع 9 قادة سياسيين ولا عسكريين بارزين في الحرب العالمية الثانية؟",
                "text_fr": "Citez 9 dirigeants politiques ou militaires majeurs de la Seconde Guerre mondiale ?",
                "text_en": "Name 9 key political or military leaders in World War II?",
                "correct": [
                    {"ar": "ونستون تشرشل", "tn": "ونستون تشرشل", "fr": "Winston Churchill", "en": "Winston Churchill"},
                    {"ar": "فرانكلين روزفلت", "tn": "فرانكلين روزفلت", "fr": "Franklin D. Roosevelt", "en": "Franklin D. Roosevelt"},
                    {"ar": "جوزيف ستالين", "tn": "جوزيف ستالين", "fr": "Joseph Staline", "en": "Joseph Stalin"},
                    {"ar": "تشارلز ديغول", "tn": "تشارلز ديغول", "fr": "Charles de Gaulle", "en": "Charles de Gaulle"},
                    {"ar": "هاري ترومان", "tn": "هاري ترومان", "fr": "Harry S. Truman", "en": "Harry Truman"},
                    {"ar": "دوايت أيزنهاور", "tn": "دوايت أيزنهاور", "fr": "Dwight D. Eisenhower", "en": "Dwight Eisenhower"},
                    {"ar": "بينيتو موسوليني", "tn": "بينيتو موسوليني", "fr": "Benito Mussolini", "en": "Benito Mussolini"},
                    {"ar": "أدولف هتلر", "tn": "أدولف هتلر", "fr": "Adolf Hitler", "en": "Adolf Hitler"},
                    {"ar": "الإمبراطور هيروهيتو", "tn": "الإمبراطور هيروهيتو", "fr": "Hirohito", "en": "Hirohito"}
                ],
                "wrong": {"ar": "جون كينيدي", "tn": "جون كينيدي", "fr": "John F. Kennedy", "en": "John F. Kennedy"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Contemporary",
                "difficulty": 2,
                "text_ar": "أذكر 9 دول نالت استقلالها في القرن العشرين؟",
                "text_tn": "طلّع 9 دول خذات استقلالها في القرن العشرين؟",
                "text_fr": "Citez 9 pays ayant obtenu leur indépendance au cours du XXe siècle ?",
                "text_en": "Name 9 countries that gained their independence in the 20th century?",
                "correct": [
                    {"ar": "تونس", "tn": "تونس", "fr": "Tunisie", "en": "Tunisia"},
                    {"ar": "الجزائر", "tn": "الجزائر", "fr": "Algérie", "en": "Algeria"},
                    {"ar": "المغرب", "tn": "المغرب", "fr": "Maroc", "en": "Morocco"},
                    {"ar": "الهند", "tn": "الهند", "fr": "Inde", "en": "India"},
                    {"ar": "فيتنام", "tn": "فيتنام", "fr": "Viêt Nam", "en": "Vietnam"},
                    {"ar": "مصر", "tn": "مصر", "fr": "Égypte", "en": "Egypt"},
                    {"ar": "كينيا", "tn": "كينيا", "fr": "Kenya", "en": "Kenya"},
                    {"ar": "إندونيسيا", "tn": "إندونيسيا", "fr": "Indonésie", "en": "Indonesia"},
                    {"ar": "السنغال", "tn": "السنغال", "fr": "Sénégal", "en": "Senegal"}
                ],
                "wrong": {"ar": "السويد", "tn": "السويد", "fr": "Suède", "en": "Sweden"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Modern",
                "difficulty": 3,
                "text_ar": "أذكر 9 بايات حكموا تونس في العهد الحسيني؟",
                "text_tn": "طلّع 9 بايات حكموا تونس في العهد الحسيني؟",
                "text_fr": "Citez 9 beys ayant régné sur la Tunisie sous la dynastie husseinite ?",
                "text_en": "Name 9 Beys who ruled Tunisia during the Husainid dynasty?",
                "correct": [
                    {"ar": "حسين بن علي", "tn": "حسين بن علي", "fr": "Hussein Ier Bey", "en": "Hussein I Bey"},
                    {"ar": "علي باي الثاني", "tn": "علي باي الثاني", "fr": "Ali II Bey", "en": "Ali II Bey"},
                    {"ar": "حمودة باشا باي", "tn": "حمودة باشا", "fr": "Hammouda Pacha", "en": "Hammouda Pacha"},
                    {"ar": "أحمد باي الأول", "tn": "أحمد باي الأول", "fr": "Ahmed Ier Bey", "en": "Ahmed I Bey"},
                    {"ar": "محمد الصادق باي", "tn": "محمد الصادق باي", "fr": "Sadok Bey", "en": "Sadok Bey"},
                    {"ar": "علي باي الثالث", "tn": "علي باي الثالث", "fr": "Ali III Bey", "en": "Ali III Bey"},
                    {"ar": "محمد الهادي باي", "tn": "محمد الهادي باي", "fr": "Hédi Bey", "en": "Hedi Bey"},
                    {"ar": "محمد المنصف باي", "tn": "المنصف باي", "fr": "Moncef Bey", "en": "Moncef Bey"},
                    {"ar": "محمد الأمين باي", "tn": "الأمين باي", "fr": "Lamine Bey", "en": "Lamine Bey"}
                ],
                "wrong": {"ar": "خير الدين باشا", "tn": "خير الدين باشا", "fr": "Khérédine Pacha", "en": "Hayreddin Pasha"}
            },
            {
                "category": "History & Politics",
                "subcategory": "Ancient",
                "difficulty": 2,
                "text_ar": "أذكر 9 حضارات قديمة نشأت في منطقة الشرق الأوسط وإفريقيا؟",
                "text_tn": "طلّع 9 حضارات قديمة نشأت في منطقة الشرق الأوسط وإفريقيا؟",
                "text_fr": "Citez 9 civilisations antiques nées au Moyen-Orient et en Afrique ?",
                "text_en": "Name 9 ancient civilizations of the Middle East and Africa?",
                "correct": [
                    {"ar": "السومرية", "tn": "السومرية", "fr": "Sumériens", "en": "Sumerian"},
                    {"ar": "البابلية", "tn": "البابلية", "fr": "Babyloniens", "en": "Babylonian"},
                    {"ar": "الآشورية", "tn": "الآشورية", "fr": "Assyriens", "en": "Assyrian"},
                    {"ar": "المصرية القديمة", "tn": "المصرية القديمة", "fr": "Égyptiens", "en": "Ancient Egyptian"},
                    {"ar": "الفينيقية", "tn": "الفينيقية", "fr": "Phéniciens", "en": "Phoenician"},
                    {"ar": "القرطاجية", "tn": "القرطاجية", "fr": "Carthaginois", "en": "Carthaginian"},
                    {"ar": "النبطية", "tn": "النبطية", "fr": "Nabatéens", "en": "Nabataean"},
                    {"ar": "حضارة كوش", "tn": "حضارة كوش", "fr": "Royaume de Koush", "en": "Kingdom of Kush"},
                    {"ar": "حضارة سبأ", "tn": "حضارة سبأ", "fr": "Royaume de Saba", "en": "Sabaean"}
                ],
                "wrong": {"ar": "حضارة المايا", "tn": "حضارة المايا", "fr": "Maya", "en": "Mayan"}
            },

            # ==================== 2. Geography ====================
            {
                "category": "Geography",
                "subcategory": "Country",
                "difficulty": 1,
                "text_ar": "أذكر 9 عواصم لدول تقع في قارة أوروبا؟",
                "text_tn": "طلّع 9 عواصم متع بلدان في أوروبا؟",
                "text_fr": "Citez 9 capitales de pays situés en Europe ?",
                "text_en": "Name 9 capitals of European countries?",
                "correct": [
                    {"ar": "باريس", "tn": "باريس", "fr": "Paris", "en": "Paris"},
                    {"ar": "لندن", "tn": "لندن", "fr": "Londres", "en": "London"},
                    {"ar": "مدريد", "tn": "مدريد", "fr": "Madrid", "en": "Madrid"},
                    {"ar": "روما", "tn": "روما", "fr": "Rome", "en": "Rome"},
                    {"ar": "برلين", "tn": "برلين", "fr": "Berlin", "en": "Berlin"},
                    {"ar": "بروكسل", "tn": "بروكسل", "fr": "Bruxelles", "en": "Brussels"},
                    {"ar": "فيينا", "tn": "فيينا", "fr": "Vienne", "en": "Vienna"},
                    {"ar": "أثينا", "tn": "أثينا", "fr": "Athènes", "en": "Athens"},
                    {"ar": "لشبونة", "tn": "لشبونة", "fr": "Lisbonne", "en": "Lisbon"}
                ],
                "wrong": {"ar": "طوكيو", "tn": "طوكيو", "fr": "Tokyo", "en": "Tokyo"}
            },
            {
                "category": "Geography",
                "subcategory": "Country",
                "difficulty": 1,
                "text_ar": "أذكر 9 عواصم لدول تقع في قارة آسيا؟",
                "text_tn": "طلّع 9 عواصم متع بلدان في آسيا؟",
                "text_fr": "Citez 9 capitales de pays situés en Asie ?",
                "text_en": "Name 9 capitals of Asian countries?",
                "correct": [
                    {"ar": "طوكيو", "tn": "طوكيو", "fr": "Tokyo", "en": "Tokyo"},
                    {"ar": "بكين", "tn": "بكين", "fr": "Pékin", "en": "Beijing"},
                    {"ar": "سيول", "tn": "سيول", "fr": "Séoul", "en": "Seoul"},
                    {"ar": "نيودلهي", "tn": "نيودلهي", "fr": "New Delhi", "en": "New Delhi"},
                    {"ar": "جاكرتا", "tn": "جاكرتا", "fr": "Jakarta", "en": "Jakarta"},
                    {"ar": "الرياض", "tn": "الرياض", "fr": "Riyad", "en": "Riyadh"},
                    {"ar": "بانكوك", "tn": "بانكوك", "fr": "Bangkok", "en": "Bangkok"},
                    {"ar": "بغداد", "tn": "بغداد", "fr": "Bagdad", "en": "Baghdad"},
                    {"ar": "مسقط", "tn": "مسقط", "fr": "Mascate", "en": "Muscat"}
                ],
                "wrong": {"ar": "نيروبي", "tn": "نيروبي", "fr": "Nairobi", "en": "Nairobi"}
            },
            {
                "category": "Geography",
                "subcategory": "Worldwide",
                "difficulty": 2,
                "text_ar": "أذكر 9 أنهار رئيسية في العالم؟",
                "text_tn": "طلّع 9 أنهار كبار ومعروفين في العالم؟",
                "text_fr": "Citez 9 fleuves majeurs dans le monde ?",
                "text_en": "Name 9 major rivers in the world?",
                "correct": [
                    {"ar": "نهر النيل", "tn": "نهر النيل", "fr": "Nil", "en": "Nile"},
                    {"ar": "نهر الأمازون", "tn": "نهر الأمازون", "fr": "Amazone", "en": "Amazon"},
                    {"ar": "نهر الميسيسيبي", "tn": "نهر الميسيسيبي", "fr": "Mississippi", "en": "Mississippi"},
                    {"ar": "نهر يانغتسي", "tn": "نهر يانغتسي", "fr": "Yangtsé", "en": "Yangtze"},
                    {"ar": "نهر الدانوب", "tn": "نهر الدانوب", "fr": "Danube", "en": "Danube"},
                    {"ar": "نهر الغانج", "tn": "نهر الغانج", "fr": "Gange", "en": "Ganges"},
                    {"ar": "نهر الميكونغ", "tn": "نهر الميكونغ", "fr": "Mékong", "en": "Mekong"},
                    {"ar": "نهر الفولغا", "tn": "نهر الفولغا", "fr": "Volga", "en": "Volga"},
                    {"ar": "نهر دجلة", "tn": "نهر دجلة", "fr": "Tigre", "en": "Tigris"}
                ],
                "wrong": {"ar": "البحر الميت", "tn": "البحر الميت", "fr": "Mer Morte", "en": "Dead Sea"}
            },
            {
                "category": "Geography",
                "subcategory": "Worldwide",
                "difficulty": 2,
                "text_ar": "أذكر 9 صحاري كبرى موجودة في العالم؟",
                "text_tn": "طلّع 9 صحاري كبار ومعروفين في العالم؟",
                "text_fr": "Citez 9 grands déserts du monde ?",
                "text_en": "Name 9 major deserts in the world?",
                "correct": [
                    {"ar": "الصحراء الكبرى", "tn": "الصحراء الكبرى", "fr": "Désert du Sahara", "en": "Sahara Desert"},
                    {"ar": "صحراء غوبي", "tn": "صحراء غوبي", "fr": "Désert de Gobi", "en": "Gobi Desert"},
                    {"ar": "صحراء كلاهاري", "tn": "صحراء كلاهاري", "fr": "Désert du Kalahari", "en": "Kalahari Desert"},
                    {"ar": "صحراء أتاكاما", "tn": "صحراء أتاكاما", "fr": "Désert d'Atacama", "en": "Atacama Desert"},
                    {"ar": "الصحراء العربية", "tn": "الصحراء العربية", "fr": "Désert d'Arabie", "en": "Arabian Desert"},
                    {"ar": "صحراء موهافي", "tn": "صحراء موهافي", "fr": "Désert de Mojave", "en": "Mojave Desert"},
                    {"ar": "صحراء ناميب", "tn": "صحراء ناميب", "fr": "Désert de Namib", "en": "Namib Desert"},
                    {"ar": "صحراء فيكتوريا الكبرى", "tn": "صحراء فيكتوريا الكبرى", "fr": "Grand Désert de Victoria", "en": "Great Victoria Desert"},
                    {"ar": "صحراء باتاغونيا", "tn": "صحراء باتاغونيا", "fr": "Désert de Patagonie", "en": "Patagonian Desert"}
                ],
                "wrong": {"ar": "غابات الأمازون", "tn": "غابات الأمازون", "fr": "Forêt Amazonienne", "en": "Amazon Rainforest"}
            },
            {
                "category": "Geography",
                "subcategory": "Region",
                "difficulty": 2,
                "text_ar": "أذكر 9 جزر كبرى تقع في البحر الأبيض المتوسط؟",
                "text_tn": "طلّع 9 جزر كبار يقعوا في البحر الأبيض المتوسط؟",
                "text_fr": "Citez 9 grandes îles situées en mer Méditerranée ?",
                "text_en": "Name 9 major islands in the Mediterranean Sea?",
                "correct": [
                    {"ar": "صقلية", "tn": "صقلية", "fr": "Sicile", "en": "Sicily"},
                    {"ar": "سردينيا", "tn": "سردينيا", "fr": "Sardaigne", "en": "Sardinia"},
                    {"ar": "قبرص", "tn": "قبرص", "fr": "Chypre", "en": "Cyprus"},
                    {"ar": "كورسيكا", "tn": "كورسيكا", "fr": "Corse", "en": "Corsica"},
                    {"ar": "كريت", "tn": "كريت", "fr": "Crète", "en": "Crete"},
                    {"ar": "جربة", "tn": "جربة", "fr": "Djerba", "en": "Djerba"},
                    {"ar": "مايوركا", "tn": "مايوركا", "fr": "Majorque", "en": "Mallorca"},
                    {"ar": "رودس", "tn": "رودس", "fr": "Rhodes", "en": "Rhodes"},
                    {"ar": "مالطا", "tn": "مالطا", "fr": "Malte", "en": "Malta"}
                ],
                "wrong": {"ar": "مدغشقر", "tn": "مدغشقر", "fr": "Madagascar", "en": "Madagascar"}
            },
            {
                "category": "Geography",
                "subcategory": "Worldwide",
                "difficulty": 3,
                "text_ar": "أذكر 9 دول حبيسة (ليس لها أي منفذ على البحر)؟",
                "text_tn": "طلّع 9 دول حبيسة (ما عندها حتى بحر)؟",
                "text_fr": "Citez 9 pays enclavés (sans aucun accès à la mer) ?",
                "text_en": "Name 9 landlocked countries (with no access to the sea)?",
                "correct": [
                    {"ar": "سويسرا", "tn": "سويسرا", "fr": "Suisse", "en": "Switzerland"},
                    {"ar": "النمسا", "tn": "النمسا", "fr": "Autriche", "en": "Austria"},
                    {"ar": "بوليفيا", "tn": "بوليفيا", "fr": "Bolivie", "en": "Bolivia"},
                    {"ar": "أديوبيا", "tn": "أثيوبيا", "fr": "Éthiopie", "en": "Ethiopia"},
                    {"ar": "منغوليا", "tn": "منغوليا", "fr": "Mongolie", "en": "Mongolia"},
                    {"ar": "نيبال", "tn": "نيبال", "fr": "Népal", "en": "Nepal"},
                    {"ar": "أوزبكستان", "tn": "أوزبكستان", "fr": "Ouzbékistan", "en": "Uzbekistan"},
                    {"ar": "باراغواي", "tn": "باراغواي", "fr": "Paraguay", "en": "Paraguay"},
                    {"ar": "تشاد", "tn": "تشاد", "fr": "Tchad", "en": "Chad"}
                ],
                "wrong": {"ar": "إيطاليا", "tn": "إيطاليا", "fr": "Italie", "en": "Italy"}
            },
            {
                "category": "Geography",
                "subcategory": "Region",
                "difficulty": 1,
                "text_ar": "أذكر 9 دول تقع بالكامل في القارة الإفريقية؟",
                "text_tn": "طلّع 9 دول تقع بالكامل في إفريقيا؟",
                "text_fr": "Citez 9 pays situés entièrement sur le continent africain ?",
                "text_en": "Name 9 countries located entirely in Africa?",
                "correct": [
                    {"ar": "تونس", "tn": "تونس", "fr": "Tunisie", "en": "Tunisia"},
                    {"ar": "الجزائر", "tn": "الجزائر", "fr": "Algérie", "en": "Algeria"},
                    {"ar": "نيجيريا", "tn": "نيجيريا", "fr": "Nigéria", "en": "Nigeria"},
                    {"ar": "كينيا", "tn": "كينيا", "fr": "Kenya", "en": "Kenya"},
                    {"ar": "السنغال", "tn": "السنغال", "fr": "Sénégal", "en": "Senegal"},
                    {"ar": "غانا", "tn": "غانا", "fr": "Ghana", "en": "Ghana"},
                    {"ar": "الكاميرون", "tn": "الكاميرون", "fr": "Cameroun", "en": "Cameroon"},
                    {"ar": "جنوب إفريقيا", "tn": "جنوب إفريقيا", "fr": "Afrique du Sud", "en": "South Africa"},
                    {"ar": "أنغولا", "tn": "أنغولا", "fr": "Angola", "en": "Angola"}
                ],
                "wrong": {"ar": "فرنسا", "tn": "فرنسا", "fr": "France", "en": "France"}
            },
            {
                "category": "Geography",
                "subcategory": "Worldwide",
                "difficulty": 3,
                "text_ar": "أذكر 9 براكين نشطة أو شهيرة في العالم؟",
                "text_tn": "طلّع 9 براكين نشطة ولا مشهورة في العالم؟",
                "text_fr": "Citez 9 volcans actifs ou célèbres dans le monde ?",
                "text_en": "Name 9 active or famous volcanoes in the world?",
                "correct": [
                    {"ar": "بركان فيزوف", "tn": "بركان فيزوف", "fr": "Vésuve", "en": "Vesuvius"},
                    {"ar": "بركان إتنا", "tn": "بركان إتنا", "fr": "Etna", "en": "Etna"},
                    {"ar": "بركان فوجي", "tn": "بركان فوجي", "fr": "Mont Fuji", "en": "Mount Fuji"},
                    {"ar": "بركان كراكاتوا", "tn": "بركان كراكاتوا", "fr": "Krakatoa", "en": "Krakatoa"},
                    {"ar": "بركان كليمنجارو", "tn": "كليمنجارو", "fr": "Kilimandjaro", "en": "Kilimanjaro"},
                    {"ar": "بركان سترومبولي", "tn": "بركان سترومبولي", "fr": "Stromboli", "en": "Stromboli"},
                    {"ar": "بركان ماونا لوا", "tn": "ماونا لوا", "fr": "Mauna Loa", "en": "Mauna Loa"},
                    {"ar": "بركان بوبوكاتيبيتل", "tn": "بوبوكاتيبيتل", "fr": "Popocatépetl", "en": "Popocatepetl"},
                    {"ar": "بركان جبل سانت هيلين", "tn": "سانت هيلين", "fr": "Mont Saint Helens", "en": "Mount St. Helens"}
                ],
                "wrong": {"ar": "جبل إفرست", "tn": "جبل إفرست", "fr": "Mont Everest", "en": "Mount Everest"}
            },
            {
                "category": "Geography",
                "subcategory": "Worldwide",
                "difficulty": 3,
                "text_ar": "أذكر 9 بحيرات كبرى أو مسطحات مائية عذبة في العالم؟",
                "text_tn": "طلّع 9 بحيرات كبار ولا مسطحات مائية عذبة معروفين في العالم؟",
                "text_fr": "Citez 9 grands lacs ou plans d'eau douce dans le monde ?",
                "text_en": "Name 9 major lakes or freshwater bodies in the world?",
                "correct": [
                    {"ar": "بحيرة سوبيريور", "tn": "بحيرة سوبيريور", "fr": "Lac Supérieur", "en": "Lake Superior"},
                    {"ar": "بحيرة فيكتوريا", "tn": "بحيرة فيكتوريا", "fr": "Lac Victoria", "en": "Lake Victoria"},
                    {"ar": "بحيرة هورون", "tn": "بحيرة هورون", "fr": "Lac Huron", "en": "Lake Huron"},
                    {"ar": "بحيرة ميشيغان", "tn": "بحيرة ميشيغان", "fr": "Lac Michigan", "en": "Lake Michigan"},
                    {"ar": "بحيرة تنجانيقا", "tn": "تنجانيقا", "fr": "Lac Tanganyika", "en": "Lake Tanganyika"},
                    {"ar": "بحيرة بايكال", "tn": "بحيرة بايكال", "fr": "Lac Baïkal", "en": "Lake Baikal"},
                    {"ar": "بحيرة إيري", "tn": "بحيرة إيري", "fr": "Lac Érié", "en": "Lake Erie"},
                    {"ar": "بحيرة أونتاريو", "tn": "بحيرة أونتاريو", "fr": "Lac Ontario", "en": "Lake Ontario"},
                    {"ar": "بحيرة لادوغا", "tn": "لادوغا", "fr": "Lac Ladoga", "en": "Lake Ladoga"}
                ],
                "wrong": {"ar": "البحر الأحمر", "tn": "البحر الأحمر", "fr": "Mer Rouge", "en": "Red Sea"}
            },
            {
                "category": "Geography",
                "subcategory": "Worldwide",
                "difficulty": 2,
                "text_ar": "أذكر 9 قمم جبلية أو سلاسل جبال شهيرة في العالم؟",
                "text_tn": "طلّع 9 قمم جبلية ولا سلاسل جبال معروفين في العالم؟",
                "text_fr": "Citez 9 sommets ou chaînes de montagnes célèbres dans le monde ?",
                "text_en": "Name 9 famous mountain peaks or ranges in the world?",
                "correct": [
                    {"ar": "إفرست", "tn": "إفرست", "fr": "Everest", "en": "Everest"},
                    {"ar": "جبال الأنديز", "tn": "جبال الأنديز", "fr": "Cordillère des Andes", "en": "Andes"},
                    {"ar": "جبال الألب", "tn": "جبال الألب", "fr": "Alpes", "en": "Alps"},
                    {"ar": "جبل كليمنجارو", "tn": "كليمنجارو", "fr": "Kilimandjaro", "en": "Kilimanjaro"},
                    {"ar": "جبل مون بلان", "tn": "مون بلان", "fr": "Mont Blanc", "en": "Mont Blanc"},
                    {"ar": "جبال الهيمالايا", "tn": "جبال الهيمالايا", "fr": "Himalaya", "en": "Himalayas"},
                    {"ar": "جبال الروكي", "tn": "جبال الروكي", "fr": "Montagnes Rocheuses", "en": "Rocky Mountains"},
                    {"ar": "جبال الأطلس", "tn": "جبال الأطلس", "fr": "Atlas", "en": "Atlas Mountains"},
                    {"ar": "جبل كي 2", "tn": "جبل كي 2", "fr": "K2", "en": "K2"}
                ],
                "wrong": {"ar": "جراند كانيون", "tn": "جراند كانيون", "fr": "Grand Canyon", "en": "Grand Canyon"}
            },

            # ==================== 3. Economy & Business ====================
            {
                "category": "Economy & Business",
                "subcategory": "Finance",
                "difficulty": 1,
                "text_ar": "أذكر 9 عملات رسمية تستعملها دول مختلفة في العالم؟",
                "text_tn": "طلّع 9 عملات رسمية مستعملة في العالم؟",
                "text_fr": "Citez 9 devises officielles utilisées dans le monde ?",
                "text_en": "Name 9 official currencies used around the world?",
                "correct": [
                    {"ar": "الدولار الأمريكي", "tn": "الدولار", "fr": "Dollar américain", "en": "US Dollar"},
                    {"ar": "اليورو", "tn": "اليورو", "fr": "Euro", "en": "Euro"},
                    {"ar": "الجنيه الإسترليني", "tn": "الجنيه الاسترليني", "fr": "Livre sterling", "en": "British Pound"},
                    {"ar": "الين الياباني", "tn": "الين الياباني", "fr": "Yen japonais", "en": "Japanese Yen"},
                    {"ar": "الدينار التونسي", "tn": "الدينار التونسي", "fr": "Dinar tunisien", "en": "Tunisian Dinar"},
                    {"ar": "الفرنك السويسري", "tn": "الفرنك السويسري", "fr": "Franc suisse", "en": "Swiss Franc"},
                    {"ar": "الدولار الكندي", "tn": "الدولار الكندي", "fr": "Dollar canadien", "en": "Canadian Dollar"},
                    {"ar": "اليوان الصيني", "tn": "اليوان الصيني", "fr": "Yuan chinois", "en": "Chinese Yuan"},
                    {"ar": "الروبل الروسي", "tn": "الروبل الروسي", "fr": "Rouble russe", "en": "Russian Ruble"}
                ],
                "wrong": {"ar": "البيتكوين", "tn": "البيتكوين", "fr": "Bitcoin", "en": "Bitcoin"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Companies",
                "difficulty": 1,
                "text_ar": "أذكر 9 شركات تكنولوجيا عملاقة في العالم؟",
                "text_tn": "طلّع 9 شركات تكنولوجيا كبار ومعروفين في العالم؟",
                "text_fr": "Citez 9 géants de la technologie dans le monde ?",
                "text_en": "Name 9 global tech giant companies?",
                "correct": [
                    {"ar": "آبل", "tn": "آبل", "fr": "Apple", "en": "Apple"},
                    {"ar": "مايكروسوفت", "tn": "مايكروسوفت", "fr": "Microsoft", "en": "Microsoft"},
                    {"ar": "غوغل", "tn": "غوغل", "fr": "Google", "en": "Google"},
                    {"ar": "أمازون", "tn": "أمازون", "fr": "Amazon", "en": "Amazon"},
                    {"ar": "ميتا", "tn": "ميتا (فيسبوك)", "fr": "Meta", "en": "Meta"},
                    {"ar": "سامسونغ", "tn": "سامسونغ", "fr": "Samsung", "en": "Samsung"},
                    {"ar": "تسلا", "tn": "تسلا", "fr": "Tesla", "en": "Tesla"},
                    {"ar": "إنفيديا", "tn": "إنفيديا", "fr": "Nvidia", "en": "Nvidia"},
                    {"ar": "سوني", "tn": "سوني", "fr": "Sony", "en": "Sony"}
                ],
                "wrong": {"ar": "نايكي", "tn": "نايكي", "fr": "Nike", "en": "Nike"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Finance",
                "difficulty": 2,
                "text_ar": "أذكر 9 عملات رقمية مشفرة متداولة عالمياً؟",
                "text_tn": "طلّع 9 عملات رقمية (كريبتو) متداولة في العالم؟",
                "text_fr": "Citez 9 crypto-monnaies majeures négociées dans le monde ?",
                "text_en": "Name 9 major cryptocurrencies traded globally?",
                "correct": [
                    {"ar": "بيتكوين", "tn": "بيتكوين", "fr": "Bitcoin", "en": "Bitcoin"},
                    {"ar": "إيثيريوم", "tn": "إيثيريوم", "fr": "Ethereum", "en": "Ethereum"},
                    {"ar": "ريبل", "tn": "ريبل", "fr": "Ripple", "en": "Ripple (XRP)"},
                    {"ar": "سولانا", "tn": "سولانا", "fr": "Solana", "en": "Solana"},
                    {"ar": "كاردانو", "tn": "كاردانو", "fr": "Cardano", "en": "Cardano"},
                    {"ar": "دوجكوين", "tn": "دوجكوين", "fr": "Dogecoin", "en": "Dogecoin"},
                    {"ar": "بولكادوت", "tn": "بولكادوت", "fr": "Polkadot", "en": "Polkadot"},
                    {"ar": "لايتكوين", "tn": "لايتكوين", "fr": "Litecoin", "en": "Litecoin"},
                    {"ar": "تيزر", "tn": "تيزر", "fr": "Tether", "en": "Tether"}
                ],
                "wrong": {"ar": "فيزا", "tn": "فيزا", "fr": "Visa", "en": "Visa"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Companies",
                "difficulty": 2,
                "text_ar": "أذكر 9 شركات أو علامات تجارية عالمية لتصنيع السيارات؟",
                "text_tn": "طلّع 9 شركات ولا ماركات كراهب عالمية؟",
                "text_fr": "Citez 9 grands constructeurs automobiles mondiaux ?",
                "text_en": "Name 9 global car manufacturers?",
                "correct": [
                    {"ar": "تويوتا", "tn": "تويوتا", "fr": "Toyota", "en": "Toyota"},
                    {"ar": "فولكس فاجن", "tn": "فولكس فاجن", "fr": "Volkswagen", "en": "Volkswagen"},
                    {"ar": "فورد", "tn": "فورد", "fr": "Ford", "en": "Ford"},
                    {"ar": "مرسيدس بنز", "tn": "مرسيدس", "fr": "Mercedes-Benz", "en": "Mercedes-Benz"},
                    {"ar": "بي إم دبليو", "tn": "بي إم دبليو", "fr": "BMW", "en": "BMW"},
                    {"ar": "هوندا", "tn": "هوندا", "fr": "Honda", "en": "Honda"},
                    {"ar": "هيونداي", "tn": "هيونداي", "fr": "Hyundai", "en": "Hyundai"},
                    {"ar": "نيسان", "tn": "نيسان", "fr": "Nissan", "en": "Nissan"},
                    {"ar": "رينو", "tn": "رينو", "fr": "Renault", "en": "Renault"}
                ],
                "wrong": {"ar": "بوينغ", "tn": "بوينغ", "fr": "Boeing", "en": "Boeing"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Finance",
                "difficulty": 2,
                "text_ar": "أذكر 9 بورصات أو أسواق مالية كبرى في العالم؟",
                "text_tn": "طلّع 9 بورصات ولا أسواق مالية كبار ومعروفين في العالم؟",
                "text_fr": "Citez 9 grandes bourses ou marchés financiers dans le monde ?",
                "text_en": "Name 9 major stock exchanges in the world?",
                "correct": [
                    {"ar": "بورصة نيويورك", "tn": "بورصة نيويورك", "fr": "Bourse de New York (NYSE)", "en": "New York Stock Exchange"},
                    {"ar": "بورصة ناسداك", "tn": "ناسداك", "fr": "Nasdaq", "en": "Nasdaq"},
                    {"ar": "بورصة طوكيو", "tn": "بورصة طوكيو", "fr": "Bourse de Tokyo", "en": "Tokyo Stock Exchange"},
                    {"ar": "بورصة لندن", "tn": "بورصة لندن", "fr": "Bourse de Londres", "en": "London Stock Exchange"},
                    {"ar": "بورصة شانغهاي", "tn": "بورصة شانغهاي", "fr": "Bourse de Shanghai", "en": "Shanghai Stock Exchange"},
                    {"ar": "بورصة هونغ كونغ", "tn": "بورصة هونغ كونغ", "fr": "Bourse de Hong Kong", "en": "Hong Kong Stock Exchange"},
                    {"ar": "بورصة يورونكست", "tn": "يورونكست", "fr": "Euronext", "en": "Euronext"},
                    {"ar": "بورصة فرانكفورت", "tn": "بورصة فرانكفورت", "fr": "Bourse de Francfort", "en": "Frankfurt Stock Exchange"},
                    {"ar": "بورصة تونس", "tn": "بورصة تونس", "fr": "Bourse de Tunis", "en": "Tunis Stock Exchange"}
                ],
                "wrong": {"ar": "البنك الدولي", "tn": "البنك الدولي", "fr": "Banque Mondiale", "en": "World Bank"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Tourism",
                "difficulty": 2,
                "text_ar": "أذكر 9 شركات طيران عالمية شهيرة؟",
                "text_tn": "طلّع 9 شركات طيران عالمية معروفين؟",
                "text_fr": "Citez 9 compagnies aériennes célèbres dans le monde ?",
                "text_en": "Name 9 famous global airlines?",
                "correct": [
                    {"ar": "طيران الإمارات", "tn": "طيران الإمارات", "fr": "Emirates", "en": "Emirates"},
                    {"ar": "الخطوط التونسية", "tn": "تونيسار", "fr": "Tunisair", "en": "Tunisair"},
                    {"ar": "الخطوط الجوية القطرية", "tn": "القطرية", "fr": "Qatar Airways", "en": "Qatar Airways"},
                    {"ar": "الخطوط الجوية الفرنسية", "tn": "اير فرانس", "fr": "Air France", "en": "Air France"},
                    {"ar": "لوفتهانزا", "tn": "لوفتهانزا", "fr": "Lufthansa", "en": "Lufthansa"},
                    {"ar": "الخطوط البريطانية", "tn": "البريطانية", "fr": "British Airways", "en": "British Airways"},
                    {"ar": "طيران سنغافورة", "tn": "طيران سنغافورة", "fr": "Singapore Airlines", "en": "Singapore Airlines"},
                    {"ar": "الخطوط الجوية التركية", "tn": "التركية", "fr": "Turkish Airlines", "en": "Turkish Airlines"},
                    {"ar": "دلتا إيرلاينز", "tn": "دلتا", "fr": "Delta Air Lines", "en": "Delta Air Lines"}
                ],
                "wrong": {"ar": "إيرباص", "tn": "إيرباص", "fr": "Airbus", "en": "Airbus"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Finance",
                "difficulty": 3,
                "text_ar": "أذكر 9 علماء اقتصاد أو مفكرين اقتصاديين مشهورين تاريخياً؟",
                "text_tn": "طلّع 9 علماء ولا مفكرين اقتصاديين معروفين في التاريخ؟",
                "text_fr": "Citez 9 économistes ou penseurs économiques célèbres ?",
                "text_en": "Name 9 famous economists or economic thinkers?",
                "correct": [
                    {"ar": "آدم سميث", "tn": "آدم سميث", "fr": "Adam Smith", "en": "Adam Smith"},
                    {"ar": "كارل ماركس", "tn": "كارل ماركس", "fr": "Karl Marx", "en": "Karl Marx"},
                    {"ar": "جون ماينارد كينز", "tn": "جون كينز", "fr": "John Maynard Keynes", "en": "John Maynard Keynes"},
                    {"ar": "ميلتون فريدمان", "tn": "ميلتون فريدمان", "fr": "Milton Friedman", "en": "Milton Friedman"},
                    {"ar": "توماس مالتوس", "tn": "توماس مالتوس", "fr": "Thomas Malthus", "en": "Thomas Malthus"},
                    {"ar": "ديفيد ريكاردو", "tn": "ديفيد ريكاردو", "fr": "David Ricardo", "en": "David Ricardo"},
                    {"ar": "ابن خلدون", "tn": "ابن خلدون", "fr": "Ibn Khaldoun", "en": "Ibn Khaldun"},
                    {"ar": "جوزيف شومبيتر", "tn": "شومبيتر", "fr": "Joseph Schumpeter", "en": "Joseph Schumpeter"},
                    {"ar": "توماس بيكيتي", "tn": "بيكيتي", "fr": "Thomas Piketty", "en": "Thomas Piketty"}
                ],
                "wrong": {"ar": "تشارلز داروين", "tn": "تشارلز داروين", "fr": "Charles Darwin", "en": "Charles Darwin"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Companies",
                "difficulty": 2,
                "text_ar": "أذكر 9 علامات تجارية عالمية كبرى للأزياء والملابس؟",
                "text_tn": "طلّع 9 ماركات حوايج ولا أزياء كبار ومعروفين في العالم؟",
                "text_fr": "Citez 9 grandes marques mondiales de mode ou de vêtements ?",
                "text_en": "Name 9 major global fashion or clothing brands?",
                "correct": [
                    {"ar": "زارا", "tn": "زارا", "fr": "Zara", "en": "Zara"},
                    {"ar": "إتش أند إم", "tn": "إتش أند إم", "fr": "H&M", "en": "H&M"},
                    {"ar": "نايكي", "tn": "نايكي", "fr": "Nike", "en": "Nike"},
                    {"ar": "أديداس", "tn": "أديداس", "fr": "Adidas", "en": "Adidas"},
                    {"ar": "شانيل", "tn": "شانيل", "fr": "Chanel", "en": "Chanel"},
                    {"ar": "غوتشي", "tn": "غوتشي", "fr": "Gucci", "en": "Gucci"},
                    {"ar": "لوي فيتون", "tn": "لوي فيتون", "fr": "Louis Vuitton", "en": "Louis Vuitton"},
                    {"ar": "برادا", "tn": "برادا", "fr": "Prada", "en": "Prada"},
                    {"ar": "رالف لورين", "tn": "رالف لورين", "fr": "Ralph Lauren", "en": "Ralph Lauren"}
                ],
                "wrong": {"ar": "رولكس", "tn": "رولكس", "fr": "Rolex", "en": "Rolex"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Industries",
                "difficulty": 2,
                "text_ar": "أذكر 9 دول كبرى منتجة أو مصدرة للنفط في العالم؟",
                "text_tn": "طلّع 9 دول كبار ينتجوا ولا يصدروا في البترول في العالم؟",
                "text_fr": "Citez 9 grands pays producteurs ou exportateurs de pétrole ?",
                "text_en": "Name 9 major oil producing or exporting countries?",
                "correct": [
                    {"ar": "السعودية", "tn": "السعودية", "fr": "Arabie Saoudite", "en": "Saudi Arabia"},
                    {"ar": "الولايات المتحدة", "tn": "الولايات المتحدة", "fr": "États-Unis", "en": "United States"},
                    {"ar": "روسيا", "tn": "روسيا", "fr": "Russie", "en": "Russia"},
                    {"ar": "العراق", "tn": "العراق", "fr": "Irak", "en": "Iraq"},
                    {"ar": "الإمارات", "tn": "الإمارات", "fr": "Émirats Arabes Unis", "en": "United Arab Emirates"},
                    {"ar": "الكويت", "tn": "الكويت", "fr": "Koweït", "en": "Kuwait"},
                    {"ar": "إيران", "tn": "إيران", "fr": "Iran", "en": "Iran"},
                    {"ar": "فنزويلا", "tn": "فنزويلا", "fr": "Venezuela", "en": "Venezuela"},
                    {"ar": "نيجيريا", "tn": "نيجيريا", "fr": "Nigéria", "en": "Nigeria"}
                ],
                "wrong": {"ar": "اليابان", "tn": "اليابان", "fr": "Japon", "en": "Japan"}
            },
            {
                "category": "Economy & Business",
                "subcategory": "Finance",
                "difficulty": 2,
                "text_ar": "أذكر 9 مؤشرات مالية أو بورصات اقتصادية عالمية شهيرة؟",
                "text_tn": "طلّع 9 مؤشرات مالية ولا مؤشرات بورصة معروفين في الاقتصاد؟",
                "text_fr": "Citez 9 indices financiers ou boursiers célèbres ?",
                "text_en": "Name 9 famous financial or stock market indexes?",
                "correct": [
                    {"ar": "داو جونز", "tn": "داو جونز", "fr": "Dow Jones", "en": "Dow Jones"},
                    {"ar": "إس أند بي 500", "tn": "إس أند بي 500", "fr": "S&P 500", "en": "S&P 500"},
                    {"ar": "ناسداك المركب", "tn": "ناسداك", "fr": "Nasdaq Composite", "en": "Nasdaq Composite"},
                    {"ar": "كاك 40", "tn": "كاك 40", "fr": "CAC 40", "en": "CAC 40"},
                    {"ar": "فوتسي 100", "tn": "فوتسي 100", "fr": "FTSE 100", "en": "FTSE 100"},
                    {"ar": "نيكي 225", "tn": "نيكي 225", "fr": "Nikkei 225", "en": "Nikkei 225"},
                    {"ar": "داكس", "tn": "داكس", "fr": "DAX", "en": "DAX"},
                    {"ar": "هانغ سينغ", "tn": "هانغ سينغ", "fr": "Hang Seng", "en": "Hang Seng"},
                    {"ar": "توناندكس", "tn": "توناندكس", "fr": "Tunindex", "en": "Tunindex"}
                ],
                "wrong": {"ar": "اليورو", "tn": "اليورو", "fr": "Euro", "en": "Euro"}
            },

            # ==================== 4. Science & Technology ====================
            {
                "category": "Science & Technology",
                "subcategory": "Natural Sciences",
                "difficulty": 1,
                "text_ar": "أذكر 9 عناصر كيميائية من الجدول الدوري؟",
                "text_tn": "طلّع 9 عناصر كيميائية من الجدول الدوري؟",
                "text_fr": "Citez 9 éléments chimiques du tableau périodique ?",
                "text_en": "Name 9 chemical elements from the periodic table?",
                "correct": [
                    {"ar": "الهيدروجين", "tn": "الهيدروجين", "fr": "Hydrogène", "en": "Hydrogen"},
                    {"ar": "الأكسجين", "tn": "الأكسجين", "fr": "Oxygène", "en": "Oxygen"},
                    {"ar": "الكربون", "tn": "الكربون", "fr": "Carbone", "en": "Carbon"},
                    {"ar": "النيتروجين", "tn": "النيتروجين", "fr": "Azote", "en": "Nitrogen"},
                    {"ar": "الحديد", "tn": "الحديد", "fr": "Fer", "en": "Iron"},
                    {"ar": "الذهب", "tn": "الذهب", "fr": "Or", "en": "Gold"},
                    {"ar": "الفضة", "tn": "الفضة", "fr": "Argent", "en": "Silver"},
                    {"ar": "النحاس", "tn": "النحاس", "fr": "Cuivre", "en": "Copper"},
                    {"ar": "الهيليوم", "tn": "الهيليوم", "fr": "Hélium", "en": "Helium"}
                ],
                "wrong": {"ar": "الماء", "tn": "الماء", "fr": "Eau", "en": "Water"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Medicine",
                "difficulty": 1,
                "text_ar": "أذكر 9 أعضاء رئيسية في جسم الإنسان؟",
                "text_tn": "طلّع 9 أعضاء رئيسية في بدن الإنسان؟",
                "text_fr": "Citez 9 organes majeurs du corps humain ?",
                "text_en": "Name 9 major organs of the human body?",
                "correct": [
                    {"ar": "القلب", "tn": "القلب", "fr": "Cœur", "en": "Heart"},
                    {"ar": "الدماغ", "tn": "الدماغ", "fr": "Cerveau", "en": "Brain"},
                    {"ar": "الرئتان", "tn": "الرئتين", "fr": "Poumons", "en": "Lungs"},
                    {"ar": "الكبد", "tn": "الكبدة", "fr": "Foie", "en": "Liver"},
                    {"ar": "المعدة", "tn": "المعدة", "fr": "Estomac", "en": "Stomach"},
                    {"ar": "الكليتان", "tn": "الكلية", "fr": "Reins", "en": "Kidneys"},
                    {"ar": "البنكرياس", "tn": "البنكرياس", "fr": "Pancréas", "en": "Pancreas"},
                    {"ar": "الأمعاء", "tn": "المصارن", "fr": "Intestins", "en": "Intestines"},
                    {"ar": "الجلد", "tn": "الجلدة", "fr": "Peau", "en": "Skin"}
                ],
                "wrong": {"ar": "الشعر", "tn": "الشعر", "fr": "Cheveux", "en": "Hair"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Computing",
                "difficulty": 1,
                "text_ar": "أذكر 9 لغات برمجة تستعمل في تطوير البرمجيات؟",
                "text_tn": "طلّع 9 لغات برمجة يستعملوهم في الديفلوبمون؟",
                "text_fr": "Citez 9 langages de programmation utilisés dans le logiciel ?",
                "text_en": "Name 9 programming languages used in software development?",
                "correct": [
                    {"ar": "بايثون", "tn": "بايثون", "fr": "Python", "en": "Python"},
                    {"ar": "جافا سكريبت", "tn": "جافا سكريبت", "fr": "JavaScript", "en": "JavaScript"},
                    {"ar": "جافا", "tn": "جافا", "fr": "Java", "en": "Java"},
                    {"ar": "سي بلس بلس", "tn": "سي بلس بلس", "fr": "C++", "en": "C++"},
                    {"ar": "سي شارب", "tn": "سي شارب", "fr": "C#", "en": "C#"},
                    {"ar": "روبي", "tn": "روبي", "fr": "Ruby", "en": "Ruby"},
                    {"ar": "بي إتش بي", "tn": "بي إتش بي", "fr": "PHP", "en": "PHP"},
                    {"ar": "سويفت", "tn": "سويفت", "fr": "Swift", "en": "Swift"},
                    {"ar": "غو", "tn": "غو", "fr": "Go", "en": "Go"}
                ],
                "wrong": {"ar": "إتش تي إم إل", "tn": "إتش تي إم إل", "fr": "HTML", "en": "HTML"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Engineering",
                "difficulty": 1,
                "text_ar": "أذكر 9 مصادر أو أشكال للطاقة المتجددة والنظيفة؟",
                "text_tn": "طلّع 9 مصادر ولا أنواع متع طاقة متجددة ونظيفة؟",
                "text_fr": "Citez 9 sources ou formes d'énergie renouvelable et propre ?",
                "text_en": "Name 9 renewable or clean energy sources?",
                "correct": [
                    {"ar": "الطاقة الشمسية", "tn": "الطاقة الشمسية", "fr": "Énergie solaire", "en": "Solar Energy"},
                    {"ar": "طاقة الرياح", "tn": "طاقة الرياح (الهوائية)", "fr": "Énergie éolienne", "en": "Wind Energy"},
                    {"ar": "الطاقة المائية", "tn": "الطاقة المائية", "fr": "Énergie hydraulique", "en": "Hydroelectric Energy"},
                    {"ar": "الطاقة الجوفية", "tn": "الحرارة الجوفية", "fr": "Énergie géothermique", "en": "Geothermal Energy"},
                    {"ar": "طاقة الكتلة الحيوية", "tn": "الكتلة الحيوية", "fr": "Biomasse", "en": "Biomass Energy"},
                    {"ar": "طاقة المد والجزر", "tn": "المد والجزر", "fr": "Énergie marémotrice", "en": "Tidal Energy"},
                    {"ar": "طاقة الأمواج", "tn": "طاقة الأمواج", "fr": "Énergie houlomotrice", "en": "Wave Energy"},
                    {"ar": "طاقة الهيدروجين الأخضر", "tn": "الهيدروجين الأخضر", "fr": "Hydrogène vert", "en": "Green Hydrogen"},
                    {"ar": "الطاقة الحرارية للمحيطات", "tn": "طاقة المحيطات", "fr": "Énergie thermique des mers", "en": "Ocean Thermal Energy"}
                ],
                "wrong": {"ar": "طاقة الفحم الحجري", "tn": "الفحم الحجري", "fr": "Charbon", "en": "Coal Energy"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Computing",
                "difficulty": 1,
                "text_ar": "أذكر 9 متصفحات ويب تستخدم لتصفح الإنترنت؟",
                "text_tn": "طلّع 9 متصفحات ويب (نافيغاتور) تستعملهم باش تدخل للانترنيت؟",
                "text_fr": "Citez 9 navigateurs web utilisés pour surfer sur Internet ?",
                "text_en": "Name 9 web browsers used to surf the internet?",
                "correct": [
                    {"ar": "غوغل كروم", "tn": "كروم", "fr": "Google Chrome", "en": "Google Chrome"},
                    {"ar": "موزيلا فايرفوكس", "tn": "فايرفوكس", "fr": "Mozilla Firefox", "en": "Mozilla Firefox"},
                    {"ar": "سافاري", "tn": "سافاري", "fr": "Safari", "en": "Safari"},
                    {"ar": "مايكروسوفت إيدج", "tn": "إيدج", "fr": "Microsoft Edge", "en": "Microsoft Edge"},
                    {"ar": "أوبرا", "tn": "أوبرا", "fr": "Opera", "en": "Opera"},
                    {"ar": "برايف", "tn": "برايف", "fr": "Brave", "en": "Brave"},
                    {"ar": "إنترنت إكسبلورر", "tn": "انترنت اكسبلورر", "fr": "Internet Explorer", "en": "Internet Explorer"},
                    {"ar": "فيفالدي", "tn": "فيفالدي", "fr": "Vivaldi", "en": "Vivaldi"},
                    {"ar": "يو سي براوزر", "tn": "يو سي براوزر", "fr": "UC Browser", "en": "UC Browser"}
                ],
                "wrong": {"ar": "ويندوز", "tn": "ويندوز", "fr": "Windows", "en": "Windows"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Natural Sciences",
                "difficulty": 2,
                "text_ar": "أذكر 9 علماء حازوا على جائزة نوبل في الفيزياء أو الكيمياء؟",
                "text_tn": "طلّع 9 علماء خذاو جائزة نوبل في الفيزياء ولا الكيمياء؟",
                "text_fr": "Citez 9 scientifiques lauréats du prix Nobel de physique ou de chimie ?",
                "text_en": "Name 9 scientists who won the Nobel Prize in Physics or Chemistry?",
                "correct": [
                    {"ar": "ألبرت أينشتاين", "tn": "أينشتاين", "fr": "Albert Einstein", "en": "Albert Einstein"},
                    {"ar": "ماري كوري", "tn": "ماري كوري", "fr": "Marie Curie", "en": "Marie Curie"},
                    {"ar": "نيلز بور", "tn": "نيلز بور", "fr": "Niels Bohr", "en": "Niels Bohr"},
                    {"ar": "أحمد زويل", "tn": "أحمد زويل", "fr": "Ahmed Zewail", "en": "Ahmed Zewail"},
                    {"ar": "ماكس بلانك", "tn": "ماكس بلانك", "fr": "Max Planck", "en": "Max Planck"},
                    {"ar": "إرنست رذرفورد", "tn": "رذرفورد", "fr": "Ernest Rutherford", "en": "Ernest Rutherford"},
                    {"ar": "ريتشارد فاينمان", "tn": "فاينمان", "fr": "Richard Feynman", "en": "Richard Feynman"},
                    {"ar": "فريدريك سانغر", "tn": "سانغر", "fr": "Frederick Sanger", "en": "Frederick Sanger"},
                    {"ar": "لينوس باولنغ", "tn": "لينوس باولنغ", "fr": "Linus Pauling", "en": "Linus Pauling"}
                ],
                "wrong": {"ar": "ستيف جوبز", "tn": "ستيف جوبز", "fr": "Steve Jobs", "en": "Steve Jobs"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Natural Sciences",
                "difficulty": 2,
                "text_ar": "أذكر 9 أجرام سماوية أو كواكب وأقمار في مجموعتنا الشمسية؟",
                "text_tn": "طلّع 9 أجرام سماوية ولا كواكب وأقمار في المجموعة الشمسية؟",
                "text_fr": "Citez 9 corps célestes, planètes ou lunes de notre système solaire ?",
                "text_en": "Name 9 celestial bodies, planets, or moons in our solar system?",
                "correct": [
                    {"ar": "الأرض", "tn": "الأرض", "fr": "Terre", "en": "Earth"},
                    {"ar": "المريخ", "tn": "المريخ", "fr": "Mars", "en": "Mars"},
                    {"ar": "المشتري", "tn": "المشتري", "fr": "Jupiter", "en": "Jupiter"},
                    {"ar": "زحل", "tn": "زحل", "fr": "Saturne", "en": "Saturn"},
                    {"ar": "الزهرة", "tn": "الزهرة", "fr": "Vénus", "en": "Venus"},
                    {"ar": "عطارد", "tn": "عطارد", "fr": "Mercure", "en": "Mercury"},
                    {"ar": "أورانوس", "tn": "أورانوس", "fr": "Uranus", "en": "Uranus"},
                    {"ar": "نبتون", "tn": "نبتون", "fr": "Neptune", "en": "Neptune"},
                    {"ar": "القمر", "tn": "القمر", "fr": "Lune", "en": "Moon"}
                ],
                "wrong": {"ar": "أندروميدا", "tn": "أندروميدا", "fr": "Andromède", "en": "Andromeda"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Computing",
                "difficulty": 1,
                "text_ar": "أذكر 9 مكونات أو قطع داخلية لجهاز الحاسوب؟",
                "text_tn": "طلّع 9 قطع ولا مكونات داخلية للكمبيوتر؟",
                "text_fr": "Citez 9 composants internes d'un ordinateur ?",
                "text_en": "Name 9 internal computer hardware components?",
                "correct": [
                    {"ar": "المعالج (CPU)", "tn": "البروسيسور", "fr": "Processeur (CPU)", "en": "Processor (CPU)"},
                    {"ar": "الذاكرة العشوائية (RAM)", "tn": "الرام", "fr": "Mémoire vive (RAM)", "en": "RAM"},
                    {"ar": "اللوحة الأم (Motherboard)", "tn": "الكارت مير", "fr": "Carte mère", "en": "Motherboard"},
                    {"ar": "بطاقة الرسوميات (GPU)", "tn": "الكارت غرافيك", "fr": "Carte graphique (GPU)", "en": "Graphics Card (GPU)"},
                    {"ar": "القرص الصلب (HDD/SSD)", "tn": "الديسك دير", "fr": "Disque dur (HDD/SSD)", "en": "Hard Drive (HDD/SSD)"},
                    {"ar": "مزود الطاقة (PSU)", "tn": "البوات داليمونتاسيون", "fr": "Alimentation (PSU)", "en": "Power Supply (PSU)"},
                    {"ar": "نظام التبريد (Cooling)", "tn": "الفنتيلاتور", "fr": "Refroidissement", "en": "Cooling System"},
                    {"ar": "بطاقة الصوت (Sound Card)", "tn": "الكارت سون", "fr": "Carte son", "en": "Sound Card"},
                    {"ar": "بطاقة الشبكة (NIC)", "tn": "الكارت ريزو", "fr": "Carte réseau", "en": "Network Card"}
                ],
                "wrong": {"ar": "الشاشة", "tn": "الشاشة", "fr": "Écran", "en": "Monitor"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Engineering",
                "difficulty": 2,
                "text_ar": "أذكر 9 مخترعين غيرت اختراعاتهم مجرى البشرية؟",
                "text_tn": "طلّع 9 مخترعين الاختراعات متاعهم بدلت تاريخ البشرية؟",
                "text_fr": "Citez 9 inventeurs célèbres dont les créations ont changé l'humanité ?",
                "text_en": "Name 9 famous inventors who changed the world?",
                "correct": [
                    {"ar": "توماس أديسون", "tn": "أديسون", "fr": "Thomas Edison", "en": "Thomas Edison"},
                    {"ar": "نيكولا تسلا", "tn": "تسلا", "fr": "Nikola Tesla", "en": "Nikola Tesla"},
                    {"ar": "ألكسندر غراهام بيل", "tn": "غراهام بيل", "fr": "Alexander Graham Bell", "en": "Alexander Graham Bell"},
                    {"ar": "الأخوان رايت", "tn": "الأخوان رايت", "fr": "Frères Wright", "en": "Wright Brothers"},
                    {"ar": "يوهان غوتنبرغ", "tn": "غوتنبرغ", "fr": "Johannes Gutenberg", "en": "Johannes Gutenberg"},
                    {"ar": "تيم بيرنرز لي", "tn": "تيم بيرنرز لي", "fr": "Tim Berners-Lee", "en": "Tim Berners-Lee"},
                    {"ar": "كارل بنز", "tn": "كارل بنز", "fr": "Karl Benz", "en": "Karl Benz"},
                    {"ar": "لويس باستور", "tn": "باستور", "fr": "Louis Pasteur", "en": "Louis Pasteur"},
                    {"ar": "غولييلمو ماركوني", "tn": "ماركوني", "fr": "Guglielmo Marconi", "en": "Guglielmo Marconi"}
                ],
                "wrong": {"ar": "إسحاق نيوتن", "tn": "نيوتن", "fr": "Isaac Newton", "en": "Isaac Newton"}
            },
            {
                "category": "Science & Technology",
                "subcategory": "Mathematics",
                "difficulty": 2,
                "text_ar": "أذكر 9 فروع للرياضيات أو مفاهيم وثوابت رياضية شهيرة؟",
                "text_tn": "طلّع 9 فروع متع رياضيات ولا مفاهيم وثوابت رياضية معروفين؟",
                "text_fr": "Citez 9 branches ou constantes mathématiques célèbres ?",
                "text_en": "Name 9 branches or constants of mathematics?",
                "correct": [
                    {"ar": "الجبر", "tn": "الجبر", "fr": "Algèbre", "en": "Algebra"},
                    {"ar": "الهندسة", "tn": "الهندسة", "fr": "Géométrie", "en": "Geometry"},
                    {"ar": "حساب المثلثات", "tn": "حساب المثلثات", "fr": "Trigonométrie", "en": "Trigonometry"},
                    {"ar": "التفاضل والتكامل", "tn": "التفاضل والتكامل", "fr": "Calcul", "en": "Calculus"},
                    {"ar": "الإحصاء والترجيح", "tn": "الإحصاء", "fr": "Statistiques", "en": "Statistics"},
                    {"ar": "الثابت ط (Pi)", "tn": "الـ Pi (3.14)", "fr": "Pi", "en": "Pi"},
                    {"ar": "النسبة الذهبية", "tn": "النسبة الذهبية", "fr": "Nombre d'or", "en": "Golden Ratio"},
                    {"ar": "نظرية الأعداد", "tn": "الأعداد", "fr": "Théorie des nombres", "en": "Number Theory"},
                    {"ar": "الاحتمالات", "tn": "الاحتمالات", "fr": "Probabilités", "en": "Probability"}
                ],
                "wrong": {"ar": "الفيزياء النواة", "tn": "الفيزياء", "fr": "Physique", "en": "Physics"}
            },

            # ==================== 5. Sports ====================
            {
                "category": "Sports",
                "subcategory": "Football",
                "difficulty": 1,
                "text_ar": "أذكر 9 أندية كرة قدم لعبت في الدوري الإسباني الممتاز (La Liga)؟",
                "text_tn": "طلّع 9 جمعيات كورة لعبت في الليغا الإسبانية؟",
                "text_fr": "Citez 9 clubs de football ayant joué en Liga espagnole ?",
                "text_en": "Name 9 football clubs that played in Spanish La Liga?",
                "correct": [
                    {"ar": "ريال مدريد", "tn": "ريال مدريد", "fr": "Real Madrid", "en": "Real Madrid"},
                    {"ar": "برشلونة", "tn": "برشلونة", "fr": "Barcelone", "en": "Barcelona"},
                    {"ar": "أتلتيكو مدريد", "tn": "أتلتيكو مدريد", "fr": "Atlético Madrid", "en": "Atletico Madrid"},
                    {"ar": "إشبيلية", "tn": "إشبيلية", "fr": "Séville FC", "en": "Sevilla FC"},
                    {"ar": "فالنسيا", "tn": "فالنسيا", "fr": "Valence CF", "en": "Valencia CF"},
                    {"ar": "أتلتيك بيلباو", "tn": "أتلتيك بيلباو", "fr": "Athletic Bilbao", "en": "Athletic Bilbao"},
                    {"ar": "ريال سوسيداد", "tn": "ريال سوسيداد", "fr": "Real Sociedad", "en": "Real Sociedad"},
                    {"ar": "فياريال", "tn": "فياريال", "fr": "Villarreal CF", "en": "Villarreal CF"},
                    {"ar": "ريال بيتيس", "tn": "ريال بيتيس", "fr": "Real Betis", "en": "Real Betis"}
                ],
                "wrong": {"ar": "يوفنتوس", "tn": "يوفنتوس", "fr": "Juventus", "en": "Juventus"}
            },
            {
                "category": "Sports",
                "subcategory": "Olympics",
                "difficulty": 1,
                "text_ar": "أذكر 9 ألعاب أو رياضات مدرجة في الألعاب الأولمبية الصيفية؟",
                "text_tn": "طلّع 9 رياضات موجودين في الألعاب الأولمبية الصيفية؟",
                "text_fr": "Citez 9 sports figurant aux Jeux Olympiques d'été ?",
                "text_en": "Name 9 sports featured in the Summer Olympic Games?",
                "correct": [
                    {"ar": "ألعاب القوى", "tn": "ألعاب القوى (الجري)", "fr": "Athlétisme", "en": "Athletics"},
                    {"ar": "السباحة", "tn": "السباحة", "fr": "Natation", "en": "Swimming"},
                    {"ar": "الجمباز", "tn": "الجمباز", "fr": "Gymnastique", "en": "Gymnastics"},
                    {"ar": "الملاكمة", "tn": "البوكس", "fr": "Boxe", "en": "Boxing"},
                    {"ar": "الجودو", "tn": "الجودو", "fr": "Judo", "en": "Judo"},
                    {"ar": "كرة السلة", "tn": "الباسكيت", "fr": "Basket-ball", "en": "Basketball"},
                    {"ar": "كرة اليد", "tn": "الهوند", "fr": "Handball", "en": "Handball"},
                    {"ar": "رفع الأثقال", "tn": "رفع الأثقال", "fr": "Haltérophilie", "en": "Weightlifting"},
                    {"ar": "كرة الطاولة", "tn": "بينغ بونغ", "fr": "Tennis de table", "en": "Table Tennis"}
                ],
                "wrong": {"ar": "التزلج على الجليد", "tn": "التزلج", "fr": "Ski sur neige", "en": "Snow Skiing"}
            },
            {
                "category": "Sports",
                "subcategory": "Individual Sports",
                "difficulty": 2,
                "text_ar": "أذكر 9 لاعبي كرة مضرب (تنس) فازوا ببطولات الغراند سلام؟",
                "text_tn": "طلّع 9 ملاعبية تنس فازوا ببطولات الغراند سلام الكبار؟",
                "text_fr": "Citez 9 joueurs de tennis ayant remporté un tournoi du Grand Chelem ?",
                "text_en": "Name 9 tennis players who won Grand Slam singles titles?",
                "correct": [
                    {"ar": "روجيه فيدرر", "tn": "فيدرر", "fr": "Roger Federer", "en": "Roger Federer"},
                    {"ar": "رافائيل نادال", "tn": "نادال", "fr": "Rafael Nadal", "en": "Rafael Nadal"},
                    {"ar": "نوفاك دجوكوفيتش", "tn": "دجوكوفيتش", "fr": "Novak Djokovic", "en": "Novak Djokovic"},
                    {"ar": "سيرينا ويليامز", "tn": "سيرينا ويليامز", "fr": "Serena Williams", "en": "Serena Williams"},
                    {"ar": "شتيفي غراف", "tn": "شتيفي غراف", "fr": "Steffi Graf", "en": "Steffi Graf"},
                    {"ar": "بيت سامبراس", "tn": "بيت سامبراس", "fr": "Pete Sampras", "en": "Pete Sampras"},
                    {"ar": "أندريه أغاسي", "tn": "أغاسي", "fr": "Andre Agassi", "en": "Andre Agassi"},
                    {"ar": "بيورن بورغ", "tn": "بيورن بورغ", "fr": "Björn Borg", "en": "Bjorn Borg"},
                    {"ar": "ماريا شارابوفا", "tn": "ماريا شارابوفا", "fr": "Maria Sharapova", "en": "Maria Sharapova"}
                ],
                "wrong": {"ar": "ليونيل ميسي", "tn": "ميسي", "fr": "Lionel Messi", "en": "Lionel Messi"}
            },
            {
                "category": "Sports",
                "subcategory": "Records",
                "difficulty": 2,
                "text_ar": "أذكر 9 دول استضافت بطولة كأس العالم لكرة القدم للرجال؟",
                "text_tn": "طلّع 9 دول استضافت كاس العالم لكورة القدم للرجال؟",
                "text_fr": "Citez 9 pays ayant accueilli la Coupe du Monde de football masculin ?",
                "text_en": "Name 9 countries that hosted the FIFA Men's World Cup?",
                "correct": [
                    {"ar": "البرازيل", "tn": "البرازيل", "fr": "Brésil", "en": "Brazil"},
                    {"ar": "ألمانيا", "tn": "ألمانيا", "fr": "Allemagne", "en": "Germany"},
                    {"ar": "إيطاليا", "tn": "إيطاليا", "fr": "Italie", "en": "Italy"},
                    {"ar": "فرنسا", "tn": "فرنسا", "fr": "France", "en": "France"},
                    {"ar": "المكسيك", "tn": "المكسيك", "fr": "Mexique", "en": "Mexico"},
                    {"ar": "الولايات المتحدة", "tn": "أمريكا", "fr": "États-Unis", "en": "United States"},
                    {"ar": "قطر", "tn": "قطر", "fr": "Qatar", "en": "Qatar"},
                    {"ar": "جنوب إفريقيا", "tn": "جنوب إفريقيا", "fr": "Afrique du Sud", "en": "South Africa"},
                    {"ar": "اليابان", "tn": "اليابان", "fr": "Japon", "en": "Japan"}
                ],
                "wrong": {"ar": "تونس", "tn": "تونس", "fr": "Tunisie", "en": "Tunisia"}
            },
            {
                "category": "Sports",
                "subcategory": "Individual Sports",
                "difficulty": 2,
                "text_ar": "أذكر 9 سائقين فازوا ببطولة العالم للفورمولا 1؟",
                "text_tn": "طلّع 9 سائقين فازوا ببطولة العالم للفورمولا 1؟",
                "text_fr": "Citez 9 pilotes champions du monde de Formule 1 ?",
                "text_en": "Name 9 Formula 1 World Championship drivers?",
                "correct": [
                    {"ar": "مايكل شوماخر", "tn": "شوماخر", "fr": "Michael Schumacher", "en": "Michael Schumacher"},
                    {"ar": "لويس هاملتون", "tn": "هاملتون", "fr": "Lewis Hamilton", "en": "Lewis Hamilton"},
                    {"ar": "أيرتون سينا", "tn": "سينا", "fr": "Ayrton Senna", "en": "Ayrton Senna"},
                    {"ar": "سباستيان فيتيل", "tn": "فيتيل", "fr": "Sebastian Vettel", "en": "Sebastian Vettel"},
                    {"ar": "فرناندو ألونسو", "tn": "ألونسو", "fr": "Fernando Alonso", "en": "Fernando Alonso"},
                    {"ar": "ماكس فرستابن", "tn": "فرستابن", "fr": "Max Verstappen", "en": "Max Verstappen"},
                    {"ar": "ألان بروست", "tn": "بروست", "fr": "Alain Prost", "en": "Alain Prost"},
                    {"ar": "نيكي لاودا", "tn": "لاودا", "fr": "Niki Lauda", "en": "Niki Lauda"},
                    {"ar": "ميكا هاكينن", "tn": "هاكينن", "fr": "Mika Häkkinen", "en": "Mika Hakkinen"}
                ],
                "wrong": {"ar": "فالنتينو روسي", "tn": "روسي", "fr": "Valentino Rossi", "en": "Valentino Rossi"}
            },
            {
                "category": "Sports",
                "subcategory": "Records",
                "difficulty": 1,
                "text_ar": "أذكر 9 من أساطير كرة القدم العالمية المعتزلين؟",
                "text_tn": "طلّع 9 من أساطير كرة القدم العالمية المعتزلين؟",
                "text_fr": "Citez 9 légendes du football mondial aujourd'hui retraitées ?",
                "text_en": "Name 9 retired global football legends?",
                "correct": [
                    {"ar": "بيليه", "tn": "بيليه", "fr": "Pelé", "en": "Pele"},
                    {"ar": "دييغو مارادونا", "tn": "مارادونا", "fr": "Diego Maradona", "en": "Diego Maradona"},
                    {"ar": "زين الدين زيدان", "tn": "زيدان", "fr": "Zinedine Zidane", "en": "Zinedine Zidane"},
                    {"ar": "رونالدو البرازيلي", "tn": "رونالدو البرازيلي", "fr": "Ronaldo", "en": "Ronaldo Nazario"},
                    {"ar": "رونالدينيو", "tn": "رونالدينيو", "fr": "Ronaldinho", "en": "Ronaldinho"},
                    {"ar": "يوهان كرويف", "tn": "كرويف", "fr": "Johan Cruyff", "en": "Johan Cruyff"},
                    {"ar": "فرانز بيكنباور", "tn": "بيكنباور", "fr": "Franz Beckenbauer", "en": "Franz Beckenbauer"},
                    {"ar": "ميشيل بلاتيني", "tn": "بلاتيني", "fr": "Michel Platini", "en": "Michel Platini"},
                    {"ar": "روبرتو باجيو", "tn": "باجيو", "fr": "Roberto Baggio", "en": "Roberto Baggio"}
                ],
                "wrong": {"ar": "كيليان مبابي", "tn": "مبابي", "fr": "Kylian Mbappé", "en": "Kylian Mbappe"}
            },
            {
                "category": "Sports",
                "subcategory": "Team Sports",
                "difficulty": 2,
                "text_ar": "أذكر 9 فرق تلعب في الدوري الأمريكي للمحترفين لكرة السلة (NBA)؟",
                "text_tn": "طلّع 9 فرق تلعب في الـ NBA لكرة السلة الأمريكية؟",
                "text_fr": "Citez 9 franchises jouant en NBA (basket-ball américain) ?",
                "text_en": "Name 9 teams playing in the American NBA?",
                "correct": [
                    {"ar": "لوس أنجلوس ليكرز", "tn": "ليكرز", "fr": "Los Angeles Lakers", "en": "Los Angeles Lakers"},
                    {"ar": "شيكاغو بولز", "tn": "شيكاغو بولز", "fr": "Chicago Bulls", "en": "Chicago Bulls"},
                    {"ar": "غولدن ستيت واريورز", "tn": "واريورز", "fr": "Golden State Warriors", "en": "Golden State Warriors"},
                    {"ar": "بوسطن سيلتكس", "tn": "سيلتكس", "fr": "Boston Celtics", "en": "Boston Celtics"},
                    {"ar": "ميامي هيت", "tn": "ميامي هيت", "fr": "Miami Heat", "en": "Miami Heat"},
                    {"ar": "بروكلين نتس", "tn": "بروكلين نتس", "fr": "Brooklyn Nets", "en": "Brooklyn Nets"},
                    {"ar": "ميلووكي باكس", "tn": "ميلووكي باكس", "fr": "Milwaukee Bucks", "en": "Milwaukee Bucks"},
                    {"ar": "تكساس سبيرز", "tn": "سان أنطونيو سبيرز", "fr": "San Antonio Spurs", "en": "San Antonio Spurs"},
                    {"ar": "نيويورك نيكس", "tn": "نيويورك نيكس", "fr": "New York Knicks", "en": "New York Knicks"}
                ],
                "wrong": {"ar": "ريال مدريد سلة", "tn": "ريال مدريد", "fr": "Real Madrid Basket", "en": "Real Madrid Basket"}
            },
            {
                "category": "Sports",
                "subcategory": "Football",
                "difficulty": 2,
                "text_ar": "أذكر 9 أندية فازت بلقب دوري أبطال أوروبا لكرة القدم؟",
                "text_tn": "طلّع 9 جمعيات فازت بدوري أبطال أوروبا (الشانبيونزليغ)؟",
                "text_fr": "Citez 9 clubs de football ayant remporté la Ligue des Champions de l'UEFA ?",
                "text_en": "Name 9 clubs that won the UEFA Champions League?",
                "correct": [
                    {"ar": "ريال مدريد", "tn": "ريال مدريد", "fr": "Real Madrid", "en": "Real Madrid"},
                    {"ar": "ميلان", "tn": "ميلان", "fr": "AC Milan", "en": "AC Milan"},
                    {"ar": "ليفربول", "tn": "ليفربول", "fr": "Liverpool FC", "en": "Liverpool FC"},
                    {"ar": "بايرن ميونخ", "tn": "بايرن ميونخ", "fr": "Bayern Munich", "en": "Bayern Munich"},
                    {"ar": "برشلونة", "tn": "برشلونة", "fr": "FC Barcelone", "en": "FC Barcelona"},
                    {"ar": "مانشستر يونايتد", "tn": "مانشستر يونايتد", "fr": "Manchester United", "en": "Manchester United"},
                    {"ar": "أياكس أمستردام", "tn": "أياكس", "fr": "Ajax Amsterdam", "en": "Ajax Amsterdam"},
                    {"ar": "إنتر ميلان", "tn": "إنتر ميلان", "fr": "Inter Milan", "en": "Inter Milan"},
                    {"ar": "تشيلسي", "tn": "تشيلسي", "fr": "Chelsea FC", "en": "Chelsea FC"}
                ],
                "wrong": {"ar": "باريس سان جيرمان", "tn": "باريس", "fr": "Paris Saint-Germain", "en": "Paris Saint-Germain"}
            },
            {
                "category": "Sports",
                "subcategory": "Individual Sports",
                "difficulty": 1,
                "text_ar": "أذكر 9 رياضات تمارس بشكل فردي دون فريق؟",
                "text_tn": "طلّع 9 رياضات فردية تلعبهم وحدك بلا فريق؟",
                "text_fr": "Citez 9 sports individuels se pratiquant sans équipe ?",
                "text_en": "Name 9 individual sports that do not require a team?",
                "correct": [
                    {"ar": "التنس (كرة المضرب)", "tn": "تنس", "fr": "Tennis", "en": "Tennis"},
                    {"ar": "الملاكمة", "tn": "بوكس", "fr": "Boxe", "en": "Boxing"},
                    {"ar": "الغولف", "tn": "غولف", "fr": "Golf", "en": "Golf"},
                    {"ar": "الجري (ألعاب القوى)", "tn": "الجري", "fr": "Course à pied", "en": "Running"},
                    {"ar": "السباحة الفردية", "tn": "سباحة", "fr": "Natation", "en": "Swimming"},
                    {"ar": "الكاراتيه", "tn": "كاراتيه", "fr": "Karaté", "en": "Karate"},
                    {"ar": "الرماية", "tn": "رماية", "fr": "Tir à l'arc", "en": "Archery"},
                    {"ar": "التزلج على الجليد", "tn": "تزلج", "fr": "Patinage", "en": "Ice Skating"},
                    {"ar": "ركوب الدراجات الفردي", "tn": "بسكليت", "fr": "Cyclisme", "en": "Cycling"}
                ],
                "wrong": {"ar": "كرة الماء", "tn": "كرة الماء", "fr": "Water-polo", "en": "Water Polo"}
            },
            {
                "category": "Sports",
                "subcategory": "Football",
                "difficulty": 2,
                "text_ar": "أذكر 9 أندية كرة قدم عربية مشهورة في إفريقيا أو آسيا؟",
                "text_tn": "طلّع 9 جمعيات كورة عربية معروفين في إفريقيا ولا آسيا؟",
                "text_fr": "Citez 9 clubs de football arabes célèbres en Afrique ou en Asie ?",
                "text_en": "Name 9 famous Arab football clubs in Africa or Asia?",
                "correct": [
                    {"ar": "الترجي الرياضي التونسي", "tn": "الترجي", "fr": "Espérance de Tunis", "en": "Esperance de Tunis"},
                    {"ar": "الأهلي المصري", "tn": "الأهلي", "fr": "Al Ahly SC", "en": "Al Ahly SC"},
                    {"ar": "الهلال السعودي", "tn": "الهلال", "fr": "Al-Hilal SFC", "en": "Al-Hilal SFC"},
                    {"ar": "الوداد البيضاوي", "tn": "الوداد", "fr": "Wydad Casablanca", "en": "Wydad Casablanca"},
                    {"ar": "النادي الإفريقي", "tn": "الكلوب", "fr": "Club Africain", "en": "Club Africain"},
                    {"ar": "النجم الساحلي", "tn": "لتوال", "fr": "Étoile du Sahel", "en": "Etoile du Sahel"},
                    {"ar": "الرجاء البيضاوي", "tn": "الرجاء", "fr": "Raja Casablanca", "en": "Raja Casablanca"},
                    {"ar": "الاتحاد السعودي", "tn": "الاتحاد", "fr": "Al-Ittihad", "en": "Al-Ittihad"},
                    {"ar": "الزمالك المصري", "tn": "الزمالك", "fr": "Zamalek SC", "en": "Zamalek SC"}
                ],
                "wrong": {"ar": "أياكس أمستردام", "tn": "أياكس", "fr": "Ajax Amsterdam", "en": "Ajax Amsterdam"}
            },

            # ==================== 6. Arts ====================
            {
                "category": "Arts",
                "subcategory": "Visual Arts",
                "difficulty": 2,
                "text_ar": "أذكر 9 فنانين أو رسامين من عصر النهضة الأوروبي؟",
                "text_tn": "طلّع 9 فنانين ولا رسامين من عصر النهضة الأوروبي؟",
                "text_fr": "Citez 9 artistes ou peintres célèbres de la Renaissance ?",
                "text_en": "Name 9 famous Renaissance artists or painters?",
                "correct": [
                    {"ar": "ليوناردو دا فينشي", "tn": "دا فينشي", "fr": "Léonard de Vinci", "en": "Leonardo da Vinci"},
                    {"ar": "مايكل أنجلو", "tn": "مايكل أنجلو", "fr": "Michel-Ange", "en": "Michelangelo"},
                    {"ar": "رافائيل", "tn": "رافائيل", "fr": "Raphaël", "en": "Raphael"},
                    {"ar": "دوناتيلو", "tn": "دوناتيلو", "fr": "Donatello", "en": "Donatello"},
                    {"ar": "ساندرو بوتيتشيلي", "tn": "بوتيتشيلي", "fr": "Sandro Botticelli", "en": "Sandro Botticelli"},
                    {"ar": "تيتيان", "tn": "تيتيان", "fr": "Titien", "en": "Titian"},
                    {"ar": "ألبرخت دورور", "tn": "دورور", "fr": "Albrecht Dürer", "en": "Albrecht Durer"},
                    {"ar": "جيوتو", "tn": "جيوتو", "fr": "Giotto", "en": "Giotto"},
                    {"ar": "فيليبو برونليسكي", "tn": "برونليسكي", "fr": "Filippo Brunelleschi", "en": "Filippo Brunelleschi"}
                ],
                "wrong": {"ar": "بابلو بيكاسو", "tn": "بيكاسو", "fr": "Pablo Picasso", "en": "Pablo Picasso"}
            },
            {
                "category": "Arts",
                "subcategory": "Visual Arts",
                "difficulty": 2,
                "text_ar": "أذكر 9 لوحات فنية أو رسومات عالمية شهيرة؟",
                "text_tn": "طلّع 9 لوحات فنية ولا رسومات عالمية معروفين؟",
                "text_fr": "Citez 9 tableaux ou œuvres d'art célèbres dans le monde ?",
                "text_en": "Name 9 world-famous paintings or artworks?",
                "correct": [
                    {"ar": "الموناليزا", "tn": "الموناليزا", "fr": "La Joconde", "en": "Mona Lisa"},
                    {"ar": "العشاء الأخير", "tn": "العشاء الأخير", "fr": "La Cène", "en": "The Last Supper"},
                    {"ar": "ليلة النجوم", "tn": "ليلة النجوم", "fr": "La Nuit étoilée", "en": "The Starry Night"},
                    {"ar": "الصرخة", "tn": "الصرخة", "fr": "Le Cri", "en": "The Scream"},
                    {"ar": "غرنيكا", "tn": "غرنيكا", "fr": "Guernica", "en": "Guernica"},
                    {"ar": "الفتاة ذات القرط اللؤلؤي", "tn": "الفتاة ذات القرط اللؤلؤي", "fr": "La Jeune Fille à la perle", "en": "Girl with a Pearl Earring"},
                    {"ar": "ولادة فينوس", "tn": "ولادة فينوس", "fr": "La Naissance de Vénus", "en": "The Birth of Venus"},
                    {"ar": "القبلة", "tn": "القبلة", "fr": "Le Baiser", "en": "The Kiss"},
                    {"ar": "خلق آدم", "tn": "خلق آدم", "fr": "La Création d'Adam", "en": "The Creation of Adam"}
                ],
                "wrong": {"ar": "تمثال الحرية", "tn": "تمثال الحرية", "fr": "Statue de la Liberté", "en": "Statue of Liberty"}
            },
            {
                "category": "Arts",
                "subcategory": "Music",
                "difficulty": 1,
                "text_ar": "أذكر 9 آلات موسيقية تستخدم في العزف؟",
                "text_tn": "طلّع 9 آلات موسيقية يستعملوهم في العزف؟",
                "text_fr": "Citez 9 instruments de musique utilisés pour jouer ?",
                "text_en": "Name 9 musical instruments used to play music?",
                "correct": [
                    {"ar": "البيانو", "tn": "بيانو", "fr": "Piano", "en": "Piano"},
                    {"ar": "الغيتار", "tn": "كيتار", "fr": "Guitare", "en": "Guitar"},
                    {"ar": "الكمان", "tn": "كمان (كمنجة)", "fr": "Violon", "en": "Violin"},
                    {"ar": "العود", "tn": "عود", "fr": "Oud", "en": "Oud"},
                    {"ar": "الدرامز (الطبول)", "tn": "باتري", "fr": "Batterie", "en": "Drums"},
                    {"ar": "الناي", "tn": "ناي", "fr": "Flûte", "en": "Flute (Nay)"},
                    {"ar": "القانون", "tn": "قانون", "fr": "Qanoun", "en": "Kanun"},
                    {"ar": "الترومبيت", "tn": "ترومبيت", "fr": "Trompette", "en": "Trumpet"},
                    {"ar": "الهارب (القيثارة)", "tn": "هارب", "fr": "Harpe", "en": "Harp"}
                ],
                "wrong": {"ar": "الميكروفون", "tn": "ميكرو", "fr": "Microphone", "en": "Microphone"}
            },
            {
                "category": "Arts",
                "subcategory": "Music",
                "difficulty": 2,
                "text_ar": "أذكر 9 ملحنين كلاسيكيين مشهورين في تاريخ الموسيقى؟",
                "text_tn": "طلّع 9 ملحنين كلاسيكيين معروفين في تاريخ الموسيقى؟",
                "text_fr": "Citez 9 compositeurs classiques célèbres de l'histoire de la musique ?",
                "text_en": "Name 9 famous classical composers in music history?",
                "correct": [
                    {"ar": "لودفيج فان بيتهوفن", "tn": "بيتهوفن", "fr": "Beethoven", "en": "Ludwig van Beethoven"},
                    {"ar": "فولفغانغ أماديوس موزارت", "tn": "موزارت", "fr": "Mozart", "en": "Wolfgang Amadeus Mozart"},
                    {"ar": "يوهان سيباستيان باخ", "tn": "باخ", "fr": "Bach", "en": "Johann Sebastian Bach"},
                    {"ar": "فريدريك شوبان", "tn": "شوبان", "fr": "Chopin", "en": "Frédéric Chopin"},
                    {"ar": "بيوتر إليتش تشايكوفسكي", "tn": "تشايكوفسكي", "fr": "Tchaïkovski", "en": "Pyotr Ilyich Tchaikovsky"},
                    {"ar": "أنطونيو فيفالدي", "tn": "فيفالدي", "fr": "Vivaldi", "en": "Antonio Vivaldi"},
                    {"ar": "فرانز شوبرت", "tn": "شوبرت", "fr": "Schubert", "en": "Franz Schubert"},
                    {"ar": "جوزيبي فيردي", "tn": "فيردي", "fr": "Verdi", "en": "Giuseppe Verdi"},
                    {"ar": "يوهانس برامز", "tn": "برامز", "fr": "Brahms", "en": "Johannes Brahms"}
                ],
                "wrong": {"ar": "إلفيس بريسلي", "tn": "إلفيس بريسلي", "fr": "Elvis Presley", "en": "Elvis Presley"}
            },
            {
                "category": "Arts",
                "subcategory": "Literature",
                "difficulty": 2,
                "text_ar": "أذكر 9 شعراء عرب بارزين من مختلف العصور؟",
                "text_tn": "طلّع 9 شعراء عرب معروفين في التاريخ؟",
                "text_fr": "Citez 9 poètes arabes célèbres de différentes époques ?",
                "text_en": "Name 9 famous Arab poets of different eras?",
                "correct": [
                    {"ar": "المتنبي", "tn": "المتنبي", "fr": "Al-Mutanabbi", "en": "Al-Mutanabbi"},
                    {"ar": "امرؤ القيس", "tn": "امرؤ القيس", "fr": "Imru' al-Qais", "en": "Imru' al-Qais"},
                    {"ar": "أبو القاسم الشابي", "tn": "أبو القاسم الشابي", "fr": "Abou el Kacem Chebbi", "en": "Aboul-Qacem Echebbi"},
                    {"ar": "أحمد شوقي", "tn": "أحمد شوقي", "fr": "Ahmed Chawqi", "en": "Ahmed Shawqi"},
                    {"ar": "محمود درويش", "tn": "محمود درويش", "fr": "Mahmoud Darwich", "en": "Mahmoud Darwish"},
                    {"ar": "نزار قباني", "tn": "نزار قباني", "fr": "Nizar Kabbani", "en": "Nizar Qabbani"},
                    {"ar": "عنترة بن شداد", "tn": "عنترة بن شداد", "fr": "Antarah ibn Shaddad", "en": "Antarah ibn Shaddad"},
                    {"ar": "أبو نواس", "tn": "أبو نواس", "fr": "Abu Nuwas", "en": "Abu Nuwas"},
                    {"ar": "حافظ إبراهيم", "tn": "حافظ إبراهيم", "fr": "Hafez Ibrahim", "en": "Hafez Ibrahim"}
                ],
                "wrong": {"ar": "نجيب محفوظ", "tn": "نجيب محفوظ", "fr": "Naguib Mahfouz", "en": "Naguib Mahfouz"}
            },
            {
                "category": "Arts",
                "subcategory": "Literature",
                "difficulty": 3,
                "text_ar": "أذكر 9 أدباء أو كتاب فازوا بجائزة نوبل في الأدب؟",
                "text_tn": "طلّع 9 أدباء ولا كتاب فازوا بجائزة نوبل في الأدب؟",
                "text_fr": "Citez 9 écrivains lauréats du prix Nobel de littérature ?",
                "text_en": "Name 9 writers who won the Nobel Prize in Literature?",
                "correct": [
                    {"ar": "نجيب محفوظ", "tn": "نجيب محفوظ", "fr": "Naguib Mahfouz", "en": "Naguib Mahfouz"},
                    {"ar": "غابرييل غارسيا ماركيز", "tn": "ماركيز", "fr": "Gabriel García Márquez", "en": "Gabriel Garcia Marquez"},
                    {"ar": "ألبير كامو", "tn": "ألبير كامو", "fr": "Albert Camus", "en": "Albert Camus"},
                    {"ar": "إرنست همنغواي", "tn": "همنغواي", "fr": "Ernest Hemingway", "en": "Ernest Hemingway"},
                    {"ar": "جان بول سارتر", "tn": "سارتر", "fr": "Jean-Paul Sartre", "en": "Jean-Paul Sartre"},
                    {"ar": "جورج برنارد شو", "tn": "برنارد شو", "fr": "George Bernard Shaw", "en": "George Bernard Shaw"},
                    {"ar": "ألكسندر سولجنيتسين", "tn": "سولجنيتسين", "fr": "Alexandre Soljenitsyne", "en": "Aleksandr Solzhenitsyn"},
                    {"ar": "بابلو نيرودا", "tn": "بابلو نيرودا", "fr": "Pablo Neruda", "en": "Pablo Neruda"},
                    {"ar": "تونى موريسون", "tn": "توني موريسون", "fr": "Toni Morrison", "en": "Toni Morrison"}
                ],
                "wrong": {"ar": "ستيفن كينغ", "tn": "ستيفن كينغ", "fr": "Stephen King", "en": "Stephen King"}
            },
            {
                "category": "Arts",
                "subcategory": "Architecture",
                "difficulty": 2,
                "text_ar": "أذكر 9 معالم معمارية أو عجائب هندسية مشهورة في العالم؟",
                "text_tn": "طلّع 9 معالم معمارية ولا عجائب هندسية معروفين في العالم؟",
                "text_fr": "Citez 9 monuments ou merveilles architecturales célèbres dans le monde ?",
                "text_en": "Name 9 famous architectural landmarks or wonders in the world?",
                "correct": [
                    {"ar": "برج إيفل", "tn": "برج إيفل", "fr": "Tour Eiffel", "en": "Eiffel Tower"},
                    {"ar": "تاج محل", "tn": "تاج محل", "fr": "Taj Mahal", "en": "Taj Mahal"},
                    {"ar": "سور الصين العظيم", "tn": "سور الصين العظيم", "fr": "Grande Muraille de Chine", "en": "Great Wall of China"},
                    {"ar": "الكولوسيوم", "tn": "الكولوسيوم", "fr": "Colisée", "en": "Colosseum"},
                    {"ar": "تمثال الحرية", "tn": "تمثال الحرية", "fr": "Statue de la Liberté", "en": "Statue of Liberty"},
                    {"ar": "برج بيزا المائل", "tn": "برج بيزا", "fr": "Tour de Pise", "en": "Leaning Tower of Pisa"},
                    {"ar": "أهرامات الجيزة", "tn": "المنقالة", "fr": "Pyramides de Gizeh", "en": "Giza Pyramids"},
                    {"ar": "ماتشو بيتشو", "tn": "ماتشو بيتشو", "fr": "Machu Picchu", "en": "Machu Picchu"},
                    {"ar": "برج خليفة", "tn": "برج خليفة", "fr": "Burj Khalifa", "en": "Burj Khalifa"}
                ],
                "wrong": {"ar": "جبل إفرست", "tn": "إفرست", "fr": "Mont Everest", "en": "Mount Everest"}
            },
            {
                "category": "Arts",
                "subcategory": "Literature",
                "difficulty": 2,
                "text_ar": "أذكر 9 أنواع أو أشكال من الفنون الأدبية والكتابية؟",
                "text_tn": "طلّع 9 أنواع متع فنون أدبية ولا كتابية؟",
                "text_fr": "Citez 9 genres ou formes littéraires et écrites ?",
                "text_en": "Name 9 literary genres or written art forms?",
                "correct": [
                    {"ar": "الرواية", "tn": "الرواية", "fr": "Roman", "en": "Novel"},
                    {"ar": "الشعر", "tn": "الشعر", "fr": "Poésie", "en": "Poetry"},
                    {"ar": "القصة القصيرة", "tn": "القصة", "fr": "Nouvelle", "en": "Short Story"},
                    {"ar": "المسرحية", "tn": "المسرحية", "fr": "Théâtre", "en": "Play / Drama"},
                    {"ar": "المقالة", "tn": "المقال", "fr": "Essai", "en": "Essay"},
                    {"ar": "السيرة الذاتية", "tn": "السيرة الذاتية", "fr": "Autobiographie", "en": "Autobiography"},
                    {"ar": "الخاطرة", "tn": "الخاطرة", "fr": "Pensée", "en": "Reflective Piece"},
                    {"ar": "الرواية المصورة (الكوميكس)", "tn": "الكوميكس", "fr": "Bande dessinée", "en": "Graphic Novel"},
                    {"ar": "الملحمة", "tn": "الملحمة", "fr": "Épopée", "en": "Epic"}
                ],
                "wrong": {"ar": "النحت", "tn": "النحت", "fr": "Sculpture", "en": "Sculpture"}
            },
            {
                "category": "Arts",
                "subcategory": "Music",
                "difficulty": 2,
                "text_ar": "أذكر 9 مغنين أو مطربين عرب من زمن الفن الجميل؟",
                "text_tn": "طلّع 9 مغنين ولا مطربين عرب كبار متع بكري؟",
                "text_fr": "Citez 9 chanteurs arabes classiques de l'âge d'or ?",
                "text_en": "Name 9 classic Arab singers of the golden era?",
                "correct": [
                    {"ar": "أم كلثوم", "tn": "أم كلثوم", "fr": "Oum Kalthoum", "en": "Umm Kulthum"},
                    {"ar": "عبد الحليم حافظ", "tn": "عبد الحليم", "fr": "Abdel Halim Hafez", "en": "Abdel Halim Hafez"},
                    {"ar": "فيروز", "tn": "فيروز", "fr": "Fairuz", "en": "Fairuz"},
                    {"ar": "فريد الأطرش", "tn": "فريد الأطرش", "fr": "Farid El Atrache", "en": "Farid El Atrash"},
                    {"ar": "محمد عبد الوهاب", "tn": "محمد عبد الوهاب", "fr": "Mohamed Abdel Wahab", "en": "Mohammed Abdel Wahab"},
                    {"ar": "وديع الصافي", "tn": "وديع الصافي", "fr": "Wadih El Safi", "en": "Wadih El Safi"},
                    {"ar": "صباح فخري", "tn": "صباح فخري", "fr": "Sabah Fakhri", "en": "Sabah Fakhri"},
                    {"ar": "وردة الجزائرية", "tn": "وردة", "fr": "Warda Al-Djazairia", "en": "Warda Al-Djazairia"},
                    {"ar": "أسمهان", "tn": "أسمهان", "fr": "Asmahan", "en": "Asmahan"}
                ],
                "wrong": {"ar": "عمرو دياب", "tn": "عمرو دياب", "fr": "Amr Diab", "en": "Amr Diab"}
            },
            {
                "category": "Arts",
                "subcategory": "Literature",
                "difficulty": 2,
                "text_ar": "أذكر 9 روايات عالمية كلاسيكية شهيرة؟",
                "text_tn": "طلّع 9 روايات عالمية كلاسيكية معروفين؟",
                "text_fr": "Citez 9 romans classiques célèbres dans le monde ?",
                "text_en": "Name 9 famous classical novels in the world?",
                "correct": [
                    {"ar": "بؤساء", "tn": "البؤساء", "fr": "Les Misérables", "en": "Les Miserables"},
                    {"ar": "روميو وجولييت", "tn": "روميو وجولييت", "fr": "Roméo et Juliette", "en": "Romeo and Juliet"}, # Play, let's keep to novels: War and Peace
                    {"ar": "الحرب والسلم", "tn": "الحرب والسلم", "fr": "Guerre et Paix", "en": "War and Peace"},
                    {"ar": "مئة عام من العزلة", "tn": "مئة عام من العزلة", "fr": "Cent ans de solitude", "en": "One Hundred Years of Solitude"},
                    {"ar": "الجريمة والعقاب", "tn": "الجريمة والعقاب", "fr": "Crime et Châtiment", "en": "Crime and Punishment"},
                    {"ar": "أولاد حارتنا", "tn": "أولاد حارتنا", "fr": "Les Enfants de notre quartier", "en": "Children of Gebelawi"},
                    {"ar": "دون كيخوته", "tn": "دون كيخوته", "fr": "Don Quichotte", "en": "Don Quixote"},
                    {"ar": "غريت غاتسبي (غاتسبي العظيم)", "tn": "غاتسبي العظيم", "fr": "Gatsby le Magnifique", "en": "The Great Gatsby"},
                    {"ar": "الأمير الصغير", "tn": "الأمير الصغير", "fr": "Le Petit Prince", "en": "The Little Prince"},
                    {"ar": "فرانكنشتاين", "tn": "فرانكنشتاين", "fr": "Frankenstein", "en": "Frankenstein"}
                ],
                "wrong": {"ar": "هاري بوتر", "tn": "هاري بوتر", "fr": "Harry Potter", "en": "Harry Potter"}
            },

            # ==================== 7. Entertainment ====================
            {
                "category": "Entertainment",
                "subcategory": "Cinema",
                "difficulty": 2,
                "text_ar": "أذكر 9 أفلام حققت أعلى إيرادات في تاريخ السينما العالمية؟",
                "text_tn": "طلّع 9 أفلام جابوا أكثر فلوس (إيرادات) في تاريخ السينما؟",
                "text_fr": "Citez 9 des films les plus rentables de l'histoire du cinéma ?",
                "text_en": "Name 9 of the highest-grossing movies in cinema history?",
                "correct": [
                    {"ar": "أفاتار", "tn": "أفاتار", "fr": "Avatar", "en": "Avatar"},
                    {"ar": "المنتقمون: نهاية اللعبة", "tn": "أفنجرز اند جيم", "fr": "Avengers: Endgame", "en": "Avengers: Endgame"},
                    {"ar": "تايتانيك", "tn": "تايتانيك", "fr": "Titanic", "en": "Titanic"},
                    {"ar": "حرب النجوم: القوة تنهض", "tn": "ستار وورز", "fr": "Star Wars: Le Réveil de la Force", "en": "Star Wars: The Force Awakens"},
                    {"ar": "المنتقمون: الحرب اللانهائية", "tn": "أفنجرز انفينيتي وور", "fr": "Avengers: Infinity War", "en": "Avengers: Infinity War"},
                    {"ar": "الرجل العنكبوت: لا طريق للوطن", "tn": "سبايدرمان", "fr": "Spider-Man: No Way Home", "en": "Spider-Man: No Way Home"},
                    {"ar": "العالم الجوراسي", "tn": "جواراسيك وورلد", "fr": "Jurassic World", "en": "Jurassic World"},
                    {"ar": "الأسد الملك (2019)", "tn": "ذا ليون كينغ", "fr": "Le Roi Lion (2019)", "en": "The Lion King (2019)"},
                    {"ar": "المنتقمون", "tn": "أفنجرز", "fr": "The Avengers", "en": "The Avengers"}
                ],
                "wrong": {"ar": "البرتقالة المرة", "tn": "البرتقالة المرة", "fr": "L'Orange amère", "en": "The Bitter Orange"}
            },
            {
                "category": "Entertainment",
                "subcategory": "Video Games",
                "difficulty": 1,
                "text_ar": "أذكر 9 سلاسل أو ألعاب فيديو مشهورة عالمياً؟",
                "text_tn": "طلّع 9 ألعاب فيديو ولا سلاسل معروفين في العالم؟",
                "text_fr": "Citez 9 franchises de jeux vidéo célèbres dans le monde ?",
                "text_en": "Name 9 famous video game franchises?",
                "correct": [
                    {"ar": "غراند ثفت أوتو (GTA)", "tn": "جي تي أي (GTA)", "fr": "Grand Theft Auto (GTA)", "en": "Grand Theft Auto"},
                    {"ar": "سوبر ماريو", "tn": "ماريو", "fr": "Super Mario", "en": "Super Mario"},
                    {"ar": "فيفا / إي أيه سبورتس إف سي", "tn": "فيفا (FIFA)", "fr": "FIFA / EA Sports FC", "en": "FIFA / EA FC"},
                    {"ar": "ماينكرافت", "tn": "ماينكرافت", "fr": "Minecraft", "en": "Minecraft"},
                    {"ar": "كول أوف ديوتي", "tn": "كول أوف ديوتي (COD)", "fr": "Call of Duty", "en": "Call of Duty"},
                    {"ar": "أساسنز كريد", "tn": "أساسنز كريد", "fr": "Assassin's Creed", "en": "Assassin's Creed"},
                    {"ar": "أسطورة زيلدا", "tn": "زيلدا", "fr": "The Legend of Zelda", "en": "The Legend of Zelda"},
                    {"ar": "بوكيمون", "tn": "بوكيمون", "fr": "Pokémon", "en": "Pokemon"},
                    {"ar": "فورتنايت", "tn": "فورتنايت", "fr": "Fortnite", "en": "Fortnite"}
                ],
                "wrong": {"ar": "نتفليكس", "tn": "نتفليكس", "fr": "Netflix", "en": "Netflix"}
            },
            {
                "category": "Entertainment",
                "subcategory": "Television",
                "difficulty": 1,
                "text_ar": "أذكر 9 مسلسلات كرتون أو أنمي تم عرضها على قناة سبيستون؟",
                "text_tn": "طلّع 9 كرتونات ولا أنمي تعداو على قناة سبيستون؟",
                "text_fr": "Citez 9 dessins animés ou animés diffusés sur la chaîne Spacetoon ?",
                "text_en": "Name 9 cartoons or anime broadcasted on Spacetoon channel?",
                "correct": [
                    {"ar": "المحقق كونان", "tn": "كونان", "fr": "Détective Conan", "en": "Detective Conan"},
                    {"ar": "دراغون بول", "tn": "دراغون بول", "fr": "Dragon Ball", "en": "Dragon Ball"},
                    {"ar": "أبطال الديجيتال", "tn": "أبطال الديجيتال", "fr": "Digimon", "en": "Digimon"},
                    {"ar": "القناص", "tn": "القناص", "fr": "Hunter x Hunter", "en": "Hunter x Hunter"},
                    {"ar": "سوبر سونيك سبينر", "tn": "سوبر سونيك سبينر", "fr": "Super Sonic Spinner", "en": "Super Sonic Spinner"},
                    {"ar": "سابق ولاحق", "tn": "سابق ولاحق", "fr": "Bakusō Kyōdai Let's & Go!!", "en": "Let's & Go"},
                    {"ar": "النمر المقنع", "tn": "النمر المقنع", "fr": "Tiger Mask", "en": "Tiger Mask"},
                    {"ar": "دروب ريمي", "tn": "ريمي", "fr": "Rémi sans famille", "en": "Remi"},
                    {"ar": "صقور الأرض", "tn": "صقور الأرض", "fr": "Sangokushi", "en": "Romance of the Three Kingdoms"}
                ],
                "wrong": {"ar": "لعبة العروش", "tn": "لعبة العروش", "fr": "Game of Thrones", "en": "Game of Thrones"}
            },
            {
                "category": "Entertainment",
                "subcategory": "Television",
                "difficulty": 1,
                "text_ar": "أذكر 9 منصات بث رقمي شهيرة للموسيقى أو الفيديو؟",
                "text_tn": "طلّع 9 منصات بث (ستريمينغ) متع موسيقى ولا أفلام معروفين؟",
                "text_fr": "Citez 9 plateformes de streaming vidéo ou musical célèbres ?",
                "text_en": "Name 9 popular video or music streaming platforms?",
                "correct": [
                    {"ar": "نتفليكس", "tn": "نتفليكس", "fr": "Netflix", "en": "Netflix"},
                    {"ar": "يوتيوب", "tn": "يوتيوب", "fr": "YouTube", "en": "YouTube"},
                    {"ar": "سبوتيفاي", "tn": "سبوتيفاي", "fr": "Spotify", "en": "Spotify"},
                    {"ar": "أمازون برايم فيديو", "tn": "برايم فيديو", "fr": "Amazon Prime Video", "en": "Amazon Prime Video"},
                    {"ar": "ديزني بلس", "tn": "ديزني بلس", "fr": "Disney+", "en": "Disney+"},
                    {"ar": "شاهد", "tn": "شاهد", "fr": "Shahid", "en": "Shahid"},
                    {"ar": "أنغامي", "tn": "أنغامي", "fr": "Anghami", "en": "Anghami"},
                    {"ar": "آبل ميوزك", "tn": "آبل ميوزك", "fr": "Apple Music", "en": "Apple Music"},
                    {"ar": "ديزر", "tn": "ديزر", "fr": "Deezer", "en": "Deezer"}
                ],
                "wrong": {"ar": "فيسبوك", "tn": "فيسبوك", "fr": "Facebook", "en": "Facebook"}
            },
            {
                "category": "Entertainment",
                "subcategory": "Cinema",
                "difficulty": 2,
                "text_ar": "أذكر 9 ممثلين حازوا على جائزة الأوسكار لأفضل ممثل؟",
                "text_tn": "طلّع 9 ممثلين خذاو جائزة الأوسكار لأفضل ممثل رئيسي؟",
                "text_fr": "Citez 9 acteurs ayant remporté l'Oscar du meilleur acteur ?",
                "text_en": "Name 9 actors who won the Academy Award for Best Actor?",
                "correct": [
                    {"ar": "ليوناردو دي كابريو", "tn": "دي كابريو", "fr": "Leonardo DiCaprio", "en": "Leonardo DiCaprio"},
                    {"ar": "توم هانكس", "tn": "توم هانكس", "fr": "Tom Hanks", "en": "Tom Hanks"},
                    {"ar": "خواكين فينيكس", "tn": "خواكين فينيكس", "fr": "Joaquin Phoenix", "en": "Joaquin Phoenix"},
                    {"ar": "ويل سميث", "tn": "ويل سميث", "fr": "Will Smith", "en": "Will Smith"},
                    {"ar": "رامي مالك", "tn": "رامي مالك", "fr": "Rami Malek", "en": "Rami Malek"},
                    {"ar": "روبرت دي نيرو", "tn": "دي نيرو", "fr": "Robert De Niro", "en": "Robert De Niro"},
                    {"ar": "أنتوني هوبكنز", "tn": "أنتوني هوبكنز", "fr": "Anthony Hopkins", "en": "Anthony Hopkins"},
                    {"ar": "دنزل واشنطن", "tn": "دنزل واشنطن", "fr": "Denzel Washington", "en": "Denzel Washington"},
                    {"ar": "آل باتشينو", "tn": "آل باتشينو", "fr": "Al Pacino", "en": "Al Pacino"}
                ],
                "wrong": {"ar": "كيانو ريفز", "tn": "كيانو ريفز", "fr": "Keanu Reeves", "en": "Keanu Reeves"}
            },
            {
                "category": "Entertainment",
                "subcategory": "Humor & Internet Culture",
                "difficulty": 1,
                "text_ar": "أذكر 9 ألعاب لوحية أو ألعاب ورقية تقليدية شهيرة؟",
                "text_tn": "طلّع 9 ألعاب لوحية ولا ألعاب كارتة تقليدية معروفين؟",
                "text_fr": "Citez 9 jeux de société ou jeux de cartes traditionnels célèbres ?",
                "text_en": "Name 9 popular board or traditional card games?",
                "correct": [
                    {"ar": "المونوبولي", "tn": "مونوبولي", "fr": "Monopoly", "en": "Monopoly"},
                    {"ar": "الشطرنج", "tn": "شطرنج", "fr": "Échecs", "en": "Chess"},
                    {"ar": "الدومينو", "tn": "دومينو", "fr": "Domino", "en": "Dominoes"},
                    {"ar": "لعبة الورق (الشكبة)", "tn": "الشكبة", "fr": "Chkobba", "en": "Chkobba"},
                    {"ar": "لعبة الورق (رامي)", "tn": "رامي", "fr": "Rami", "en": "Rummy"},
                    {"ar": "الطاولة (النرد)", "tn": "شيش بيش", "fr": "Backgammon", "en": "Backgammon"},
                    {"ar": "لعبة أونو (UNO)", "tn": "أونو (UNO)", "fr": "Uno", "en": "Uno"},
                    {"ar": "اللودو", "tn": "لودو", "fr": "Ludo", "en": "Ludo"},
                    {"ar": "خربقة", "tn": "خربقة", "fr": "Kharbga", "en": "Kharbga"}
                ],
                "wrong": {"ar": "بايسكل", "tn": "بايسكل", "fr": "Bicyclette", "en": "Bicycle"}
            },
            {
                "category": "Entertainment",
                "subcategory": "Cinema",
                "difficulty": 1,
                "text_ar": "أذكر 9 أفلام رسوم متحركة (أنيميشن) شهيرة من إنتاج ديزني أو بيكسار؟",
                "text_tn": "طلّع 9 أفلام كرتون كبار معروفين متع ديزني ولا بيكسار؟",
                "text_fr": "Citez 9 films d'animation célèbres de Disney ou Pixar ?",
                "text_en": "Name 9 famous Disney or Pixar animated movies?",
                "correct": [
                    {"ar": "الأسد الملك", "tn": "ذا ليون كينغ", "fr": "Le Roi Lion", "en": "The Lion King"},
                    {"ar": "حكاية لعبة (Toy Story)", "tn": "توي ستوري", "fr": "Toy Story", "en": "Toy Story"},
                    {"ar": "البحث عن نيمو", "tn": "البحث عن نيمو", "fr": "Le Monde de Nemo", "en": "Finding Nemo"},
                    {"ar": "شركة المرعبين المحدودة", "tn": "شركة المرعبين", "fr": "Monstres et Cie", "en": "Monsters, Inc."},
                    {"ar": "علاء الدين", "tn": "علاء الدين", "fr": "Aladdin", "en": "Aladdin"},
                    {"ar": "ملكة الثلج (Frozen)", "tn": "فروزن", "fr": "La Reine des neiges", "en": "Frozen"},
                    {"ar": "خلطة بيطة بالصلصة (Ratatouille)", "tn": "راتاتوي", "fr": "Ratatouille", "en": "Ratatouille"},
                    {"ar": "خارقون (The Incredibles)", "tn": "ذا إنكريدبلز", "fr": "Les Indestructibles", "en": "The Incredibles"},
                    {"ar": "سيارات (Cars)", "tn": "كارز", "fr": "Cars", "en": "Cars"}
                ],
                "wrong": {"ar": "شريك", "tn": "شريك", "fr": "Shrek", "en": "Shrek"} # DreamWorks
            },
            {
                "category": "Entertainment",
                "subcategory": "Television",
                "difficulty": 2,
                "text_ar": "أذكر 9 مسلسلات تلفزيونية كوميدية أمريكية أو عالمية شهيرة؟",
                "text_tn": "طلّع 9 مسلسلات كوميدية تلفزيونية أمريكية ولا عالمية معروفين؟",
                "text_fr": "Citez 9 séries télévisées comiques (sitcoms) américaines ou mondiales célèbres ?",
                "text_en": "Name 9 famous TV sitcoms or comedy series?",
                "correct": [
                    {"ar": "فريندز (Friends)", "tn": "فريندز (Friends)", "fr": "Friends", "en": "Friends"},
                    {"ar": "المكتب (The Office)", "tn": "ذا أوفيس", "fr": "The Office", "en": "The Office"},
                    {"ar": "نظرية الانفجار العظيم", "tn": "ذا بيغ بانغ ثيوري", "fr": "The Big Bang Theory", "en": "The Big Bang Theory"},
                    {"ar": "كيف قابلت أمكما", "tn": "كيف قابلت أمكما", "fr": "How I Met Your Mother", "en": "How I Met Your Mother"},
                    {"ar": "عائلة سمبسون", "tn": "ذا سمبسونز", "fr": "Les Simpson", "en": "The Simpsons"},
                    {"ar": "بروكلين ناين-ناين", "tn": "بروكلين ناين-ناين", "fr": "Brooklyn Nine-Nine", "en": "Brooklyn Nine-Nine"},
                    {"ar": "مستر بين", "tn": "مستر بين", "fr": "Mr. Bean", "en": "Mr. Bean"},
                    {"ar": "شوفلي حل", "tn": "شوفلي حل", "fr": "Choufli Hal", "en": "Choufli Hal"},
                    {"ar": "عائلة فيلادلفيا (سوبرانو)", "tn": "عائلة سوبيرانو", "fr": "Modern Family", "en": "Modern Family"} # modern family
                ],
                "wrong": {"ar": "البريكنغ باد", "tn": "بريكنغ باد", "fr": "Breaking Bad", "en": "Breaking Bad"} # Drama
            },
            {
                "category": "Entertainment",
                "subcategory": "anime",
                "difficulty": 2,
                "text_ar": "أذكر 9 ستوديوهات أنمي يابانية أو مخرجين يابانيين مشهورين؟",
                "text_tn": "طلّع 9 ستوديوهات أنمي ولا مخرجين أنمي يابانيين معروفين؟",
                "text_fr": "Citez 9 studios d'animation ou réalisateurs d'animés japonais célèbres ?",
                "text_en": "Name 9 famous anime studios or Japanese directors?",
                "correct": [
                    {"ar": "استوديو غيبلي", "tn": "استوديو غيبلي", "fr": "Studio Ghibli", "en": "Studio Ghibli"},
                    {"ar": "هاياو ميازاكي", "tn": "ميازاكي", "fr": "Hayao Miyazaki", "en": "Hayao Miyazaki"},
                    {"ar": "استوديو توي أنيميشن", "tn": "توي أنيميشن", "fr": "Toei Animation", "en": "Toei Animation"},
                    {"ar": "استوديو مادهاوس", "tn": "مادهاوس", "fr": "Madhouse", "en": "Madhouse"},
                    {"ar": "ساتوشي كون", "tn": "ساتوشي كون", "fr": "Satoshi Kon", "en": "Satoshi Kon"},
                    {"ar": "استوديو مابا", "tn": "مابا", "fr": "MAPPA", "en": "MAPPA"},
                    {"ar": "ماكوتو شينكاي", "tn": "ماكوتو شينكاي", "fr": "Makoto Shinkai", "en": "Makoto Shinkai"},
                    {"ar": "استوديو بونز", "tn": "بونز", "fr": "Bones", "en": "Studio Bones"},
                    {"ar": "أكيرة تورياما", "tn": "تورياما", "fr": "Akira Toriyama", "en": "Akira Toriyama"}
                ],
                "wrong": {"ar": "والت ديزني", "tn": "ديزني", "fr": "Walt Disney", "en": "Walt Disney"}
            },
            {
                "category": "Entertainment",
                "subcategory": "Humor & Internet Culture",
                "difficulty": 1,
                "text_ar": "أذكر 9 تطبيقات أو منصات للتواصل الاجتماعي تستعمل عالمياً؟",
                "text_tn": "طلّع 9 تطبيقات ولا منصات تواصل اجتماعي مستعملين؟",
                "text_fr": "Citez 9 applications ou réseaux sociaux utilisés dans le monde ?",
                "text_en": "Name 9 globally used social media platforms or apps?",
                "correct": [
                    {"ar": "فيسبوك", "tn": "فيسبوك", "fr": "Facebook", "en": "Facebook"},
                    {"ar": "إنستغرام", "tn": "إنستغرام", "fr": "Instagram", "en": "Instagram"},
                    {"ar": "تيك توك", "tn": "تيك توك", "fr": "TikTok", "en": "TikTok"},
                    {"ar": "واتساب", "tn": "واتساب", "fr": "WhatsApp", "en": "WhatsApp"},
                    {"ar": "إكس (تويتر)", "tn": "تويتر", "fr": "X (Twitter)", "en": "X (Twitter)"},
                    {"ar": "سناب شات", "tn": "سناب شات", "fr": "Snapchat", "en": "Snapchat"},
                    {"ar": "تلغرام", "tn": "تلغرام", "fr": "Telegram", "en": "Telegram"},
                    {"ar": "لينكد إن", "tn": "لينكد إن", "fr": "LinkedIn", "en": "LinkedIn"},
                    {"ar": "بينتيريست", "tn": "بينتيريست", "fr": "Pinterest", "en": "Pinterest"}
                ],
                "wrong": {"ar": "غوغل كروم", "tn": "كروم", "fr": "Google Chrome", "en": "Google Chrome"}
            },

            # ==================== 8. Gastronomy ====================
            {
                "category": "Gastronomy",
                "subcategory": "Ingredients",
                "difficulty": 1,
                "text_ar": "أذكر 9 أنواع من البهارات والتوابل المستعملة في الطبخ؟",
                "text_tn": "طلّع 9 أنواع تفاح ولا فاحات مستعملين في الطبخ؟",
                "text_fr": "Citez 9 épices ou herbes utilisées en cuisine ?",
                "text_en": "Name 9 spices or herbs used in cooking?",
                "correct": [
                    {"ar": "الفلفل الأسود", "tn": "فلفل أكحل", "fr": "Poivre noir", "en": "Black Pepper"},
                    {"ar": "الكمون", "tn": "كمون", "fr": "Cumin", "en": "Cumin"},
                    {"ar": "الكركم", "tn": "كركم", "fr": "Curcuma", "en": "Turmeric"},
                    {"ar": "القرفة", "tn": "قرفة", "fr": "Cannelle", "en": "Cinnamon"},
                    {"ar": "الزنجبيل", "tn": "زنجبيل", "fr": "Gingembre", "en": "Ginger"},
                    {"ar": "الملح", "tn": "ملح", "fr": "Sel", "en": "Salt"}, # Not technically spice but common, let's use: الزعفران
                    {"ar": "الزعفران", "tn": "زعفران", "fr": "Safran", "en": "Saffron"},
                    {"ar": "الفلفل الأحمر (التابل)", "tn": "فلفل أحمر", "fr": "Paprika", "en": "Paprika"},
                    {"ar": "الهيل", "tn": "هيل", "fr": "Cardamome", "en": "Cardamom"},
                    {"ar": "الكزبرة (التابل التونسي)", "tn": "تابل وكروية", "fr": "Coriandre", "en": "Coriander"}
                ],
                "wrong": {"ar": "السكر", "tn": "سكر", "fr": "Sucre", "en": "Sugar"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Dishes",
                "difficulty": 2,
                "text_ar": "أذكر 9 أنواع مختلفة من المعكرونة الإيطالية (الباستا)؟",
                "text_tn": "طلّع 9 أنواع مختلفة متع مقرونة إيطالية (باستا)؟",
                "text_fr": "Citez 9 types différents de pâtes italiennes (pasta) ?",
                "text_en": "Name 9 different types of Italian pasta?",
                "correct": [
                    {"ar": "سباغيتي", "tn": "سباغيتي", "fr": "Spaghetti", "en": "Spaghetti"},
                    {"ar": "بيني", "tn": "بيني (مقرونة فلوت)", "fr": "Penne", "en": "Penne"},
                    {"ar": "لازانيا", "tn": "لازانيا", "fr": "Lasagne", "en": "Lasagna"},
                    {"ar": "فيتوتشيني", "tn": "فيتوتشيني", "fr": "Fettuccine", "en": "Fettuccine"},
                    {"ar": "ماكاروني", "tn": "مقرونة فِل", "fr": "Macaroni", "en": "Macaroni"},
                    {"ar": "رافيولي", "tn": "رافيولي", "fr": "Ravioli", "en": "Ravioli"},
                    {"ar": "فوسيلي", "tn": "فوسيلي (مقرونة لولبية)", "fr": "Fusilli", "en": "Fusilli"},
                    {"ar": "فارفالي", "tn": "فارفالي (فراشة)", "fr": "Farfalle", "en": "Farfalle"},
                    {"ar": "تاغلياتيلي", "tn": "تاغلياتيلي", "fr": "Tagliatelle", "en": "Tagliatelle"}
                ],
                "wrong": {"ar": "الكسكسي", "tn": "الكسكسي", "fr": "Couscous", "en": "Couscous"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Ingredients",
                "difficulty": 1,
                "text_ar": "أذكر 9 أنواع من الفواكه الحمضية؟",
                "text_tn": "طلّع 9 أنواع غلة قارصة (حمضيات)؟",
                "text_fr": "Citez 9 types d'agrumes ?",
                "text_en": "Name 9 types of citrus fruits?",
                "correct": [
                    {"ar": "البرتقال", "tn": "برتقال (شين)", "fr": "Orange", "en": "Orange"},
                    {"ar": "الليمون", "tn": "قارص", "fr": "Citron", "en": "Lemon"},
                    {"ar": "الليمون الحامض (اللايم)", "tn": "لايم", "fr": "Lime", "en": "Lime"},
                    {"ar": "الماندرين (اليوسفي)", "tn": "مندرينا", "fr": "Mandarine", "en": "Mandarin"},
                    {"ar": "الليمون الهندي (الريب فروت)", "tn": "بومبلوموس", "fr": "Pamplemousse", "en": "Grapefruit"},
                    {"ar": "الكليمنتين", "tn": "كليمنتين", "fr": "Clémentine", "en": "Clementine"},
                    {"ar": "الكمكوات (البرتقال الذهبي)", "tn": "كمكوات", "fr": "Kumquat", "en": "Kumquat"},
                    {"ar": "الأترج", "tn": "أترج", "fr": "Cédrat", "en": "Citron fruit"},
                    {"ar": "البرغموت", "tn": "برغموت", "fr": "Bergamote", "en": "Bergamot"}
                ],
                "wrong": {"ar": "الموز", "tn": "موز (بنان)", "fr": "Banane", "en": "Banana"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Ingredients",
                "difficulty": 2,
                "text_ar": "أذكر 9 أنواع من الأجبان المشهورة عالمياً؟",
                "text_tn": "طلّع 9 أنواع متع جبن معروفين في العالم؟",
                "text_fr": "Citez 9 types de fromages célèbres dans le monde ?",
                "text_en": "Name 9 famous cheese varieties in the world?",
                "correct": [
                    {"ar": "موزاريلا", "tn": "موزاريلا", "fr": "Mozzarella", "en": "Mozzarella"},
                    {"ar": "بارميزان", "tn": "بارميزان", "fr": "Parmesan", "en": "Parmesan"},
                    {"ar": "تشيدر", "tn": "تشيدر", "fr": "Cheddar", "en": "Cheddar"},
                    {"ar": "غودا", "tn": "غودا", "fr": "Gouda", "en": "Gouda"},
                    {"ar": "كامامبير", "tn": "كامامبير", "fr": "Camembert", "en": "Camembert"},
                    {"ar": "روكفور (الجبن الأزرق)", "tn": "روكفور", "fr": "Roquefort", "en": "Roquefort"},
                    {"ar": "فيتا", "tn": "فيتا", "fr": "Feta", "en": "Feta"},
                    {"ar": "إيمنتال", "tn": "إيمنتال", "fr": "Emmental", "en": "Emmental"},
                    {"ar": "ريكوتا", "tn": "ريكوتا", "fr": "Ricotta", "en": "Ricotta"}
                ],
                "wrong": {"ar": "التوفو", "tn": "التوفو", "fr": "Tofu", "en": "Tofu"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Drinks",
                "difficulty": 1,
                "text_ar": "أذكر 9 أنواع من مشروبات القهوة الساخنة أو الباردة؟",
                "text_tn": "طلّع 9 أنواع قهوة سخونة ولا باردة؟",
                "text_fr": "Citez 9 types de boissons à base de café (chaudes ou froides) ?",
                "text_en": "Name 9 types of hot or cold coffee drinks?",
                "correct": [
                    {"ar": "إسبريسو", "tn": "إكسبريس", "fr": "Espresso", "en": "Espresso"},
                    {"ar": "كابوتشينو", "tn": "كابوتشينو", "fr": "Cappuccino", "en": "Cappuccino"},
                    {"ar": "لاتيه", "tn": "لاتيه", "fr": "Café au lait (Latte)", "en": "Latte"},
                    {"ar": "أمريكانو", "tn": "أمريكانو", "fr": "Americano", "en": "Americano"},
                    {"ar": "ماكياتو", "tn": "ماكياتو", "fr": "Macchiato", "en": "Macchiato"},
                    {"ar": "قهوة تركية", "tn": "قهوة عربي", "fr": "Café turc", "en": "Turkish Coffee"},
                    {"ar": "موكا", "tn": "موكا", "fr": "Caffè Mocha", "en": "Mocha"},
                    {"ar": "قهوة مثلجة", "tn": "قهوة مثلجة", "fr": "Café glacé", "en": "Iced Coffee"},
                    {"ar": "فلات وايت", "tn": "فلات وايت", "fr": "Flat White", "en": "Flat White"}
                ],
                "wrong": {"ar": "شاي بالياسمين", "tn": "تاي", "fr": "Thé au jasmin", "en": "Jasmine Tea"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Dishes",
                "difficulty": 1,
                "text_ar": "أذكر 9 أطباق أو وجبات رئيسية من المطبخ التونسي التقليدي؟",
                "text_tn": "طلّع 9 أكلات ولا وجبات رئيسية تونسية زمنية؟",
                "text_fr": "Citez 9 plats traditionnels majeurs de la cuisine tunisienne ?",
                "text_en": "Name 9 traditional main dishes of Tunisian cuisine?",
                "correct": [
                    {"ar": "الكسكسي", "tn": "كسكسي", "fr": "Couscous", "en": "Couscous"},
                    {"ar": "الملوخية التونسية", "tn": "ملوخية", "fr": "Mloukhia", "en": "Mloukhia"},
                    {"ar": "الكفتاجي", "tn": "كفتاجي", "fr": "Kleftaji (Keftaji)", "en": "Keftaji"},
                    {"ar": "العجة بالمرقاز", "tn": "عجة بالمرقاز", "fr": "Ojja au merguez", "en": "Ojja with Merguez"},
                    {"ar": "المرقة حلوة", "tn": "مرقة حلوة", "fr": "Marqa Hloua", "en": "Sweet stew"},
                    {"ar": "المشلوش", "tn": "مشلوش", "fr": "Mchloch", "en": "Mchloch"}, # let's use: اللبلابي
                    {"ar": "اللبلابي", "tn": "لبلابي", "fr": "Lablabi", "en": "Lablabi"},
                    {"ar": "البريك", "tn": "بريك", "fr": "Brik", "en": "Brik"},
                    {"ar": "المصلي (دجاج أو لحم)", "tn": "مصلي", "fr": "Mosli", "en": "Mosli"},
                    {"ar": "الرشتة التونسية", "tn": "رشتة", "fr": "Rechta", "en": "Rechta"}
                ],
                "wrong": {"ar": "السوشي", "tn": "سوشي", "fr": "Sushi", "en": "Sushi"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Ingredients",
                "difficulty": 2,
                "text_ar": "أذكر 9 طرق مختلفة لطهي وإعداد الطعام؟",
                "text_tn": "طلّع 9 طرق مختلفة يستعملوها باش يطيبوا الماكلة؟",
                "text_fr": "Citez 9 modes ou techniques de cuisson des aliments ?",
                "text_en": "Name 9 different cooking methods or techniques?",
                "correct": [
                    {"ar": "السلق", "tn": "تغلية (سلق)", "fr": "Ébullition (Bouillir)", "en": "Boiling"},
                    {"ar": "القلي", "tn": "قليان", "fr": "Friture (Frire)", "en": "Frying"},
                    {"ar": "الشواء", "tn": "شويان", "fr": "Grillage (Griller)", "en": "Grilling"},
                    {"ar": "الخبز (في الفرن)", "tn": "تطيب في الكوشة", "fr": "Cuisson au four (Cuire)", "en": "Baking"},
                    {"ar": "الطهي على البخار", "tn": "تفوير (بخار)", "fr": "Cuisson vapeur", "en": "Steaming"},
                    {"ar": "التحميص", "tn": "تحميص", "fr": "Torréfaction (Rôtir)", "en": "Roasting"},
                    {"ar": "التدميس (الطهي البطيء)", "tn": "تجمير", "fr": "Mijotage", "en": "Simmering / Stewing"},
                    {"ar": "التشويح (سوتيه)", "tn": "سوتيه", "fr": "Sauter", "en": "Sauteing"},
                    {"ar": "التدخين", "tn": "تدخين الماكلة", "fr": "Fumage", "en": "Smoking"}
                ],
                "wrong": {"ar": "التجميد", "tn": "تجميد", "fr": "Congélation", "en": "Freezing"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Desserts",
                "difficulty": 1,
                "text_ar": "أذكر 9 حلويات شرقية أو غربية مشهورة عالمياً؟",
                "text_tn": "طلّع 9 أنواع حلو شرقي ولا غربي معروفين؟",
                "text_fr": "Citez 9 desserts orientaux ou occidentaux célèbres ?",
                "text_en": "Name 9 famous Eastern or Western desserts?",
                "correct": [
                    {"ar": "البقلاوة", "tn": "بقلاوة", "fr": "Baklava", "en": "Baklava"},
                    {"ar": "الكنافة", "tn": "كنافة", "fr": "Knafeh", "en": "Knafeh"},
                    {"ar": "تارت التفاح", "tn": "تارت التفاح", "fr": "Tarte aux pommes", "en": "Apple Pie"},
                    {"ar": "التشيز كيك", "tn": "تشيز كيك", "fr": "Cheesecake", "en": "Cheesecake"},
                    {"ar": "الكرواسون", "tn": "كرواسون", "fr": "Croissant", "en": "Croissant"},
                    {"ar": "التيراميسو", "tn": "تيراميسو", "fr": "Tiramisu", "en": "Tiramisu"},
                    {"ar": "المكرون الفرنسي", "tn": "مكرون", "fr": "Macaron", "en": "Macaron"},
                    {"ar": "البسبوسة", "tn": "بسبوسة (هريسة حلوة)", "fr": "Basboussa", "en": "Basbousa"},
                    {"ar": "الميل فوي", "tn": "ميل فوي", "fr": "Mille-feuille", "en": "Mille-feuille"}
                ],
                "wrong": {"ar": "البيتزا", "tn": "بيتزا", "fr": "Pizza", "en": "Pizza"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Ingredients",
                "difficulty": 2,
                "text_ar": "أذكر 9 أنواع من الزيوت النباتية أو الحيوانية المستعملة في الطبخ؟",
                "text_tn": "طلّع 9 أنواع زيت يستعملوهم في تطييب الماكلة؟",
                "text_fr": "Citez 9 types d'huiles comestibles utilisées en cuisine ?",
                "text_en": "Name 9 types of edible oils used in cooking?",
                "correct": [
                    {"ar": "زيت الزيتون", "tn": "زيت زيتونة", "fr": "Huile d'olive", "en": "Olive Oil"},
                    {"ar": "زيت ذرة", "tn": "زيت قطنية", "fr": "Huile de maïs", "en": "Corn Oil"},
                    {"ar": "زيت عباد الشمس", "tn": "زيت عباد الشمس", "fr": "Huile de tournesol", "en": "Sunflower Oil"},
                    {"ar": "زيت جوز الهند", "tn": "زيت نواد كوكو", "fr": "Huile de coco", "en": "Coconut Oil"},
                    {"ar": "زيت السمسم", "tn": "زيت جلجلان", "fr": "Huile de sésame", "en": "Sesame Oil"},
                    {"ar": "زيت الصويا", "tn": "زيت الصويا", "fr": "Huile de soja", "en": "Soybean Oil"},
                    {"ar": "زيت الفول السوداني", "tn": "زيت كاكاوية", "fr": "Huile d'arachide", "en": "Peanut Oil"},
                    {"ar": "زيت النخيل", "tn": "زيت النخيل", "fr": "Huile de palme", "en": "Palm Oil"},
                    {"ar": "زيت الكانولا", "tn": "زيت كانولا", "fr": "Huile de canola", "en": "Canola Oil"}
                ],
                "wrong": {"ar": "زيت المحركات", "tn": "زيت كراهب", "fr": "Huile moteur", "en": "Motor Oil"}
            },
            {
                "category": "Gastronomy",
                "subcategory": "Dishes",
                "difficulty": 1,
                "text_ar": "أذكر 9 سلاسل مطاعم وجبات سريعة عالمية؟",
                "text_tn": "طلّع 9 سلاسل مطاعم متع فاست فود عالميين معروفين؟",
                "text_fr": "Citez 9 grandes chaînes mondiales de restauration rapide ?",
                "text_en": "Name 9 global fast food chains?",
                "correct": [
                    {"ar": "ماكدونالدز", "tn": "ماكدونالدز", "fr": "McDonald's", "en": "McDonald's"},
                    {"ar": "برجر كنج", "tn": "برجر كنج", "fr": "Burger King", "en": "Burger King"},
                    {"ar": "كنتاكي (KFC)", "tn": "كنتاكي", "fr": "KFC", "en": "KFC"},
                    {"ar": "بيتزا هت", "tn": "بيتزا هت", "fr": "Pizza Hut", "en": "Pizza Hut"},
                    {"ar": "ستاربكس", "tn": "ستاربكس", "fr": "Starbucks", "en": "Starbucks"},
                    {"ar": "سندويشات سابواي", "tn": "سابواي", "fr": "Subway", "en": "Subway"},
                    {"ar": "دومينوز بيتزا", "tn": "دومينوز", "fr": "Domino's Pizza", "en": "Domino's"},
                    {"ar": "تاكو بيل", "tn": "تاكو بيل", "fr": "Taco Bell", "en": "Taco Bell"},
                    {"ar": "بابا جونز", "tn": "بابا جونز", "fr": "Papa John's", "en": "Papa John's"}
                ],
                "wrong": {"ar": "كارفور", "tn": "كارفور", "fr": "Carrefour", "en": "Carrefour"}
            },

            # ==================== 9. Culture & Lifestyle ====================
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Languages & Dialects",
                "difficulty": 1,
                "text_ar": "أذكر 9 لغات رسمية يتحدث بها ملايين البشر في العالم؟",
                "text_tn": "طلّع 9 لغات رسمية يتكلموا بيها ملاين العباد في العالم؟",
                "text_fr": "Citez 9 langues officielles parlées par des millions de personnes ?",
                "text_en": "Name 9 major official languages spoken by millions worldwide?",
                "correct": [
                    {"ar": "العربية", "tn": "العربية", "fr": "Arabe", "en": "Arabic"},
                    {"ar": "الإنجليزية", "tn": "الإنجليزية", "fr": "Anglais", "en": "English"},
                    {"ar": "الإسبانية", "tn": "الإسبانية", "fr": "Espagnol", "en": "Spanish"},
                    {"ar": "الفرنسية", "tn": "الفرنسية", "fr": "Français", "en": "French"},
                    {"ar": "الصينية (الماندرين)", "tn": "الشينوية", "fr": "Chinois", "en": "Chinese"},
                    {"ar": "الروسية", "tn": "الروسية", "fr": "Russe", "en": "Russian"},
                    {"ar": "الألمانية", "tn": "الألمانية", "fr": "Allemand", "en": "German"},
                    {"ar": "البرتغالية", "tn": "البرتغالية", "fr": "Portugais", "en": "Portuguese"},
                    {"ar": "الهندية", "tn": "الهندية", "fr": "Hindi", "en": "Hindi"}
                ],
                "wrong": {"ar": "الهيروغليفية", "tn": "كتيبة الفراعنة", "fr": "Hiéroglyphes", "en": "Hieroglyphics"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Languages & Dialects",
                "difficulty": 2,
                "text_ar": "أذكر 9 كلمات أو عبارات بالدارجة التونسية تعبر عن الفرح أو الغضب أو المشاعر؟",
                "text_tn": "طلّع 9 كلمات بالدارجة التونسية نعبروا بيهم على مشاعرنا؟",
                "text_fr": "Citez 9 mots ou expressions du dialecte tunisien exprimant des émotions ?",
                "text_en": "Name 9 Tunisian dialect words or expressions expressing emotions?",
                "correct": [
                    {"ar": "يا فرحتي (فرحة)", "tn": "مصح رقعتو", "fr": "Quel toupet", "en": "What a nerve"}, # let's use standard Tunisian feeling words:
                    {"ar": "فرحان", "tn": "فرحان", "fr": "Heureux", "en": "Happy"},
                    {"ar": "متغشش", "tn": "متغشش", "fr": "En colère / Fâché", "en": "Angry"},
                    {"ar": "فادد", "tn": "فادد", "fr": "Ennuyé / Lassé", "en": "Bored"},
                    {"ar": "خايف", "tn": "خايف", "fr": "Peur", "en": "Scared"},
                    {"ar": "مفجوع", "tn": "مفجوع", "fr": "Effrayé", "en": "Terrified"},
                    {"ar": "حاشم", "tn": "حاشم", "fr": "Timide / Timide", "en": "Shy"},
                    {"ar": "حزين", "tn": "مهموم", "fr": "Triste", "en": "Sad"},
                    {"ar": "مستغرب", "tn": "مستغرب", "fr": "Surpris", "en": "Surprised"},
                    {"ar": "ملهوف", "tn": "ملهوف", "fr": "Impatient", "en": "Eager / Greedy"}
                ],
                "wrong": {"ar": "الكرسي", "tn": "كرسي", "fr": "Chaise", "en": "Chair"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Traditions",
                "difficulty": 2,
                "text_ar": "أذكر 9 أنواع من اللباس التونسي التقليدي للنساء أو الرجال؟",
                "text_tn": "طلّع 9 لبسات تونسية تقليدية متع رجال ولا نساء؟",
                "text_fr": "Citez 9 types de vêtements tunisiens traditionnels pour hommes ou femmes ?",
                "text_en": "Name 9 types of traditional Tunisian costumes for men or women?",
                "correct": [
                    {"ar": "الجبة التونسية", "tn": "جبة", "fr": "Jebba", "en": "Jebba"},
                    {"ar": "السفساري", "tn": "سفساري", "fr": "Sefseri", "en": "Sefseri"},
                    {"ar": "الشاشية", "tn": "شاشية", "fr": "Chechia", "en": "Chechia"},
                    {"ar": "البرنوس", "tn": "برنوس", "fr": "Burnous", "en": "Burnous"},
                    {"ar": "الكدrun (الكدرون)", "tn": "كدرون", "fr": "Kadroun", "en": "Kadroun"},
                    {"ar": "الفوطة والبلوزة", "tn": "فوطة وبلوزة", "fr": "Fouta et Blouza", "en": "Fouta & Blouza"},
                    {"ar": "الحايك التونسي", "tn": "حايك", "fr": "Hayek", "en": "Hayek"},
                    {"ar": "الملية التونسية", "tn": "ملية", "fr": "Melwya (Mellila)", "en": "Melia"},
                    {"ar": "الدنقري", "tn": "دنقري", "fr": "Dengri", "en": "Dengri"}
                ],
                "wrong": {"ar": "البدلة الرسمية (الكرافات)", "tn": "كرافات", "fr": "Costume cravate", "en": "Suit and Tie"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Fashion",
                "difficulty": 2,
                "text_ar": "أذكر 9 مدن مشهورة بكونها عواصم للموضة أو التسوق في العالم؟",
                "text_tn": "طلّع 9 مدن معروفين في العالم كعواصم للموضة واللبس؟",
                "text_fr": "Citez 9 villes célèbres comme capitales mondiales de la mode ?",
                "text_en": "Name 9 cities famous as global fashion capitals?",
                "correct": [
                    {"ar": "باريس", "tn": "باريس", "fr": "Paris", "en": "Paris"},
                    {"ar": "ميلانو", "tn": "ميلانو", "fr": "Milan", "en": "Milan"},
                    {"ar": "نيويورك", "tn": "نيويورك", "fr": "New York", "en": "New York"},
                    {"ar": "لندن", "tn": "لندن", "fr": "Londres", "en": "London"},
                    {"ar": "طوكيو", "tn": "طوكيو", "fr": "Tokyo", "en": "Tokyo"},
                    {"ar": "로스앤جلس", "tn": "لوس أنجلوس", "fr": "Los Angeles", "en": "Los Angeles"},
                    {"ar": "روما", "tn": "روما", "fr": "Rome", "en": "Rome"},
                    {"ar": "برلين", "tn": "برلين", "fr": "Berlin", "en": "Berlin"},
                    {"ar": "دبي", "tn": "دبي", "fr": "Dubaï", "en": "Dubai"}
                ],
                "wrong": {"ar": "القيروان", "tn": "القيروان", "fr": "Kairouan", "en": "Kairouan"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Traditions",
                "difficulty": 2,
                "text_ar": "أذكر 9 عادات أو طقوس تقام في الأعراس والمناسبات التونسية؟",
                "text_tn": "طلّع 9 عادات ولا طقوس نعملوهم في العرس التونسي؟",
                "text_fr": "Citez 9 coutumes ou rituels pratiqués lors des mariages tunisiens ?",
                "text_en": "Name 9 customs or rituals practiced in Tunisian weddings?",
                "correct": [
                    {"ar": "ليلة الحناء", "tn": "الحنة", "fr": "Nuit du henné", "en": "Hanna Night"},
                    {"ar": "حمام العروسة", "tn": "حمام العروسة", "fr": "Hammam de la mariée", "en": "Bridal Hammam"},
                    {"ar": "ليلة الوطية", "tn": "الوطية", "fr": "Outia", "en": "Outia Night"},
                    {"ar": "كسوة العريس", "tn": "الكسوة", "fr": "Kiswa du marié", "en": "Kiswa Ceremony"},
                    {"ar": "قصان التورتة (الكعك)", "tn": "قصان الكاتو", "fr": "Découpe du gâteau", "en": "Cake Cutting"},
                    {"ar": "الجلوة التونسية", "tn": "الجلوة", "fr": "Jelwa", "en": "Jelwa"},
                    {"ar": "تصديرة العروسة", "tn": "التصديرة", "fr": "Tasdira", "en": "Tasdira"},
                    {"ar": "عقد القران (الصداق)", "tn": "الصداق", "fr": "Signature du contrat (Sdaq)", "en": "Sdaq Contract"},
                    {"ar": "حلاقة العريس (البربر)", "tn": "حلاقة العريس", "fr": "Rasage du marié", "en": "Groom Shaving"}
                ],
                "wrong": {"ar": "رمي الطماطم", "tn": "رمي الطماطم", "fr": "La Tomatina", "en": "La Tomatina"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Social Media & Trends",
                "difficulty": 2,
                "text_ar": "أذكر 9 من الأبراج الفلكية الغربية المعروفة؟",
                "text_tn": "طلّع 9 أبراج فلكية معروفين؟",
                "text_fr": "Citez 9 signes du zodiaque occidental ?",
                "text_en": "Name 9 Western zodiac signs?",
                "correct": [
                    {"ar": "الحمل", "tn": "برج الحمل", "fr": "Bélier", "en": "Aries"},
                    {"ar": "الثور", "tn": "برج الثور", "fr": "Taureau", "en": "Taurus"},
                    {"ar": "الجوزاء", "tn": "برج الجوزاء", "fr": "Gémeaux", "en": "Gemini"},
                    {"ar": "السرطان", "tn": "برج السرطان", "fr": "Cancer", "en": "Cancer"},
                    {"ar": "الأسد", "tn": "برج الأسد", "fr": "Lion", "en": "Leo"},
                    {"ar": "العذراء", "tn": "برج العذراء", "fr": "Vierge", "en": "Virgo"},
                    {"ar": "الميزان", "tn": "برج الميزان", "fr": "Balance", "en": "Libra"},
                    {"ar": "العقرب", "tn": "برج العقرب", "fr": "Scorpion", "en": "Scorpion"},
                    {"ar": "القوس", "tn": "برج القوس", "fr": "Sagittaire", "en": "Sagittarius"}
                ],
                "wrong": {"ar": "برج إيفل", "tn": "برج ايفل", "fr": "Tour Eiffel", "en": "Eiffel Tower"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Fashion",
                "difficulty": 2,
                "text_ar": "أذكر 9 علامات تجارية عالمية للأزياء والسلع الفاخرة؟",
                "text_tn": "طلّع 9 ماركات متع لوكس (أزياء وسلع فاخرة) في العالم؟",
                "text_fr": "Citez 9 marques mondiales de mode ou de biens de luxe ?",
                "text_en": "Name 9 global luxury fashion or goods brands?",
                "correct": [
                    {"ar": "رولكس", "tn": "رولكس", "fr": "Rolex", "en": "Rolex"},
                    {"ar": "إيرميس", "tn": "إيرميس", "fr": "Hermès", "en": "Hermes"},
                    {"ar": "لوي فيتون", "tn": "لوي فيتون", "fr": "Louis Vuitton", "en": "Louis Vuitton"},
                    {"ar": "شانيل", "tn": "شانيل", "fr": "Chanel", "en": "Chanel"},
                    {"ar": "غوتشي", "tn": "غوتشي", "fr": "Gucci", "en": "Gucci"},
                    {"ar": "ديور", "tn": "ديور", "fr": "Dior", "en": "Dior"},
                    {"ar": "كارتييه", "tn": "كارتييه", "fr": "Cartier", "en": "Cartier"},
                    {"ar": "برادا", "tn": "برادا", "fr": "Prada", "en": "Prada"},
                    {"ar": "فرزاتشي", "tn": "فرزاتشي", "fr": "Versace", "en": "Versace"}
                ],
                "wrong": {"ar": "شياومي", "tn": "شياومي", "fr": "Xiaomi", "en": "Xiaomi"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Fashion",
                "difficulty": 3,
                "text_ar": "أذكر 9 أنواع من الأحجار الكريمة أو المعادن الثمينة؟",
                "text_tn": "طلّع 9 أنواع متع أحجار كريمة ولا معادن ثمينة؟",
                "text_fr": "Citez 9 types de pierres précieuses ou métaux précieux ?",
                "text_en": "Name 9 types of gemstones or precious metals?",
                "correct": [
                    {"ar": "الماس", "tn": "الماس", "fr": "Diamant", "en": "Diamond"},
                    {"ar": "الذهب", "tn": "الذهب", "fr": "Or", "en": "Gold"},
                    {"ar": "الفضة", "tn": "الفضة", "fr": "Argent", "en": "Silver"},
                    {"ar": "الياقوت الأحمر", "tn": "ياقوت", "fr": "Rubis", "en": "Ruby"},
                    {"ar": "الزمرد", "tn": "زمرد", "fr": "Émeraude", "en": "Emerald"},
                    {"ar": "الياقوت الأزرق (السافير)", "tn": "سافير", "fr": "Saphir", "en": "Sapphire"},
                    {"ar": "البلاتين", "tn": "بلاتين", "fr": "Platine", "en": "Platinum"},
                    {"ar": "اللؤلؤ", "tn": "لؤلؤ (جوهر)", "fr": "Perle", "en": "Pearl"},
                    {"ar": "الفيروز", "tn": "فيروز", "fr": "Turquoise", "en": "Turquoise"}
                ],
                "wrong": {"ar": "الغرانيت", "tn": "غرانيت", "fr": "Granite", "en": "Granite"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Daily Life",
                "difficulty": 2,
                "text_ar": "أذكر 9 أنواع أو أساليب من الرقص المشهور عالمياً؟",
                "text_tn": "طلّع 9 أنواع متع رقص معروفين في العالم؟",
                "text_fr": "Citez 9 styles ou genres de danse célèbres dans le monde ?",
                "text_en": "Name 9 popular dance styles in the world?",
                "correct": [
                    {"ar": "الباليه", "tn": "باليه", "fr": "Ballet", "en": "Ballet"},
                    {"ar": "السالسا", "tn": "سالسا", "fr": "Salsa", "en": "Salsa"},
                    {"ar": "الهيب هوب", "tn": "هيب هوب", "fr": "Hip-hop", "en": "Hip Hop"},
                    {"ar": "التانغو", "tn": "تانغو", "fr": "Tango", "en": "Tango"},
                    {"ar": "الرقص الشرقي", "tn": "رقص عربي (شرقي)", "fr": "Danse du ventre", "en": "Belly Dance"},
                    {"ar": "الفلامنكو", "tn": "فلامنكو", "fr": "Flamenco", "en": "Flamenco"},
                    {"ar": "رقص الجاز", "tn": "جاز", "fr": "Jazz", "en": "Jazz Dance"},
                    {"ar": "البريك دانس", "tn": "بريك دانس", "fr": "Breakdance", "en": "Breakdancing"},
                    {"ar": "الفالس", "tn": "فالس", "fr": "Valse", "en": "Waltz"}
                ],
                "wrong": {"ar": "الكراتيه", "tn": "كراتيه", "fr": "Karaté", "en": "Karate"}
            },
            {
                "category": "Culture & Lifestyle",
                "subcategory": "Traditions",
                "difficulty": 1,
                "text_ar": "أذكر 9 أعياد وطنية أو رسمية يتم فيها تعطيل العمل في تونس؟",
                "text_tn": "طلّع 9 أعياد وطنية ولا رسمية ترتاح فيهم الخدمة في تونس؟",
                "text_fr": "Citez 9 jours fériés ou fêtes nationales chômés en Tunisie ?",
                "text_en": "Name 9 official public holidays or national days in Tunisia?",
                "correct": [
                    {"ar": "عيد الاستقلال (20 مارس)", "tn": "عيد الاستقلال", "fr": "Fête de l'Indépendance", "en": "Independence Day"},
                    {"ar": "عيد الشغل (1 ماي)", "tn": "عيد الشغل", "fr": "Fête du Travail", "en": "Labor Day"},
                    {"ar": "عيد الجمهورية (25 جويلية)", "tn": "عيد الجمهورية", "fr": "Fête de la République", "en": "Republic Day"},
                    {"ar": "عيد المرأة (13 أوت)", "tn": "عيد المرأة", "fr": "Fête de la Femme", "en": "Women's Day"},
                    {"ar": "عيد الثورة (17 ديسمبر)", "tn": "عيد الثورة", "fr": "Fête de la Révolution", "en": "Revolution Day"},
                    {"ar": "عيد الفطر", "tn": "عيد الفطر (العيد الصغير)", "fr": "Aïd el-Fitr", "en": "Eid al-Fitr"},
                    {"ar": "عيد الأضحى", "tn": "عيد الإضحى (العيد الكبير)", "fr": "Aïd el-Adha", "en": "Eid al-Adha"},
                    {"ar": "رأس السنة الهجرية", "tn": "رأس السنة الهجرية", "fr": "Nouvel an de l'Hégire", "en": "Islamic New Year"},
                    {"ar": "المولد النبوي الشريف", "tn": "المولد", "fr": "Mouled", "en": "Mawlid"}
                ],
                "wrong": {"ar": "عيد الهالوين", "tn": "هالوين", "fr": "Halloween", "en": "Halloween"}
            },

            # ==================== 10. Religion & Philosophy ====================
            {
                "category": "Religion & Philosophy",
                "subcategory": "Philosophy",
                "difficulty": 2,
                "text_ar": "أذكر 9 فلاسفة كبار من اليونان القديمة؟",
                "text_tn": "طلّع 9 فلاسفة كبار من اليونان القديمة؟",
                "text_fr": "Citez 9 grands philosophes de la Grèce antique ?",
                "text_en": "Name 9 famous ancient Greek philosophers?",
                "correct": [
                    {"ar": "سقراط", "tn": "سقراط", "fr": "Socrate", "en": "Socrates"},
                    {"ar": "أفلاطون", "tn": "أفلاطون", "fr": "Platon", "en": "Plato"},
                    {"ar": "أرسطو", "tn": "أرسطو", "fr": "Aristote", "en": "Aristotle"},
                    {"ar": "فيثاغورس", "tn": "فيثاغورس", "fr": "Pythagore", "en": "Pythagoras"},
                    {"ar": "ديموقريطس", "tn": "ديموقريطس", "fr": "Démocrite", "en": "Democritus"},
                    {"ar": "أبيقور", "tn": "أبيقور", "fr": "Épicure", "en": "Epicurus"},
                    {"ar": "ديوجين", "tn": "ديوجين", "fr": "Diogène", "en": "Diogenes"},
                    {"ar": "زينون الرواقي", "tn": "زينون", "fr": "Zénon de Kition", "en": "Zeno of Citium"},
                    {"ar": "هيرقليطس", "tn": "هيرقليطس", "fr": "Héraclite", "en": "Heraclitus"}
                ],
                "wrong": {"ar": "كارل ماركس", "tn": "ماركس", "fr": "Karl Marx", "en": "Karl Marx"}
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "Islam",
                "difficulty": 2,
                "text_ar": "أذكر 9 مذاهب أو مدارس فقهية وفكرية في التاريخ الإسلامي؟",
                "text_tn": "طلّع 9 مذاهب ولا مدارس فكرية فقهية معروفين في الإسلام؟",
                "text_fr": "Citez 9 écoles de jurisprudence ou courants de pensée en Islam ?",
                "text_en": "Name 9 major schools of jurisprudence or thought in Islam?",
                "correct": [
                    {"ar": "المذهب المالكي", "tn": "المالكي", "fr": "Maddhab Malékite", "en": "Maliki School"},
                    {"ar": "المذهب الحنفي", "tn": "الحنفي", "fr": "Maddhab Hanafite", "en": "Hanafi School"},
                    {"ar": "المذهب الشافعي", "tn": "الشافعي", "fr": "Maddhab Chaféite", "en": "Shafi'i School"},
                    {"ar": "المذهب الحنبلي", "tn": "الحنبلي", "fr": "Maddhab Hanbalite", "en": "Hanbali School"},
                    {"ar": "المذهب الجعفري (الشيعي)", "tn": "الجعفري", "fr": "Ja'farisme", "en": "Ja'fari School"},
                    {"ar": "المذهب الإباضي", "tn": "الإباضي", "fr": "Ibadisme", "en": "Ibadi School"},
                    {"ar": "المذهب الظاهري", "tn": "الظاهري", "fr": "Zahirisme", "en": "Zahiri School"},
                    {"ar": "مدرسة المعتزلة", "tn": "المعتزلة", "fr": "Mu'tazilisme", "en": "Mu'tazila School"},
                    {"ar": "المدرسة الأشعرية", "tn": "الأشعرية", "fr": "Ash'arisme", "en": "Ash'ari School"}
                ],
                "wrong": {"ar": "العلمانية", "tn": "العلمانية", "fr": "Laïcité", "en": "Secularism"}
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "Philosophy",
                "difficulty": 2,
                "text_ar": "أذكر 9 فضائل أخلاقية كبرى ركزت عليها الفلسفة والديانات؟",
                "text_tn": "طلّع 9 فضائل أخلاقية كبرى ركزت عليها الفلسفة والديانات؟",
                "text_fr": "Citez 9 vertus morales majeures valorisées par la philosophie ou la religion ?",
                "text_en": "Name 9 major moral virtues in philosophy and religions?",
                "correct": [
                    {"ar": "الصدق", "tn": "الصدق", "fr": "Honnêteté", "en": "Honesty / Truthfulness"},
                    {"ar": "العدالة", "tn": "العدل", "fr": "Justice", "en": "Justice"},
                    {"ar": "الشجاعة", "tn": "الشجاعة", "fr": "Courage", "en": "Courage"},
                    {"ar": "الحكمة", "tn": "الحكمة", "fr": "Sagesse", "en": "Wisdom"},
                    {"ar": "التواضع", "tn": "التواضع", "fr": "Humilité", "en": "Humility"},
                    {"ar": "الكرم (السخاء)", "tn": "الكرم", "fr": "Générosité", "en": "Generosity"},
                    {"ar": "الصبر", "tn": "الصبر", "fr": "Patience", "en": "Patience"},
                    {"ar": "الرحمة", "tn": "الرحمة", "fr": "Compassion / Miséricorde", "en": "Compassion / Mercy"},
                    {"ar": "الأمانة", "tn": "الأمانة", "fr": "Intégrité / Loyauté", "en": "Loyalty / Trustworthiness"}
                ],
                "wrong": {"ar": "الأنانية", "tn": "الأنانية", "fr": "Égoïsme", "en": "Egoism / Selfishness"}
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "Islam",
                "difficulty": 1,
                "text_ar": "أذكر 9 أنبياء أو رسل ذكروا في القرآن الكريم والأديان السماوية؟",
                "text_tn": "طلّع 9 أنبياء ولا رسل تذكروا في القرآن والأديان؟",
                "text_fr": "Citez 9 prophètes mentionnés dans le Coran et les religions abrahamiques ?",
                "text_en": "Name 9 prophets mentioned in the Quran and Abrahamic religions?",
                "correct": [
                    {"ar": "محمد ﷺ", "tn": "محمد ﷺ", "fr": "Mahomet", "en": "Muhammad"},
                    {"ar": "إبراهيم عليه السلام", "tn": "إبراهيم", "fr": "Abraham", "en": "Abraham"},
                    {"ar": "موسى عليه السلام", "tn": "موسى", "fr": "Moïse", "en": "Moses"},
                    {"ar": "عيسى عليه السلام (المسيح)", "tn": "عيسى", "fr": "Jésus", "en": "Jesus"},
                    {"ar": "نوح عليه السلام", "tn": "نوح", "fr": "Noé", "en": "Noah"},
                    {"ar": "آدم عليه السلام", "tn": "آدم", "fr": "Adam", "en": "Adam"},
                    {"ar": "يوسف عليه السلام", "tn": "يوسف", "fr": "Joseph", "en": "Joseph"},
                    {"ar": "سليمان عليه السلام", "tn": "سليمان", "fr": "Salomon", "en": "Solomon"},
                    {"ar": "داود عليه السلام", "tn": "داود", "fr": "David", "en": "David"}
                ],
                "wrong": {"ar": "لقمان الحكيم", "tn": "لقمان", "fr": "Luqman", "en": "Luqman"} # Wise man but not generally classed as major prophet in same list
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "Philosophy",
                "difficulty": 2,
                "text_ar": "أذكر 9 فروع أو مباحث فلسفية رئيسية؟",
                "text_tn": "طلّع 9 فروع ولا مباحث رئيسية في الفلسفة؟",
                "text_fr": "Citez 9 branches ou disciplines majeures de la philosophie ?",
                "text_en": "Name 9 major branches or fields of philosophy?",
                "correct": [
                    {"ar": "الأخلاق (إيتيقا)", "tn": "الأخلاق", "fr": "Éthique", "en": "Ethics"},
                    {"ar": "الميتافيزيقا (ما وراء الطبيعة)", "tn": "الميتافيزيقا", "fr": "Métaphysique", "en": "Metaphysics"},
                    {"ar": "الإبستمولوجيا (نظرية المعرفة)", "tn": "نظرية المعرفة", "fr": "Épistémologie", "en": "Epistemology"},
                    {"ar": "المنطق", "tn": "المنطق", "fr": "Logique", "en": "Logic"},
                    {"ar": "علم الجمال (أستيتيقا)", "tn": "علم الجمال", "fr": "Esthétique", "en": "Aesthetics"},
                    {"ar": "الفلسفة السياسية", "tn": "الفلسفة السياسية", "fr": "Philosophie politique", "en": "Political Philosophy"},
                    {"ar": "فلسفة العقل", "tn": "فلسفة العقل", "fr": "Philosophie de l'esprit", "en": "Philosophy of Mind"},
                    {"ar": "فلسفة العلوم", "tn": "فلسفة العلوم", "fr": "Philosophie des sciences", "en": "Philosophy of Science"},
                    {"ar": "الوجودية", "tn": "الوجودية", "fr": "Existentialisme", "en": "Existentialism"}
                ],
                "wrong": {"ar": "علم النفس الإكلينيكي", "tn": "علم النفس", "fr": "Psychologie", "en": "Psychology"}
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "other religions",
                "difficulty": 2,
                "text_ar": "أذكر 9 أديان أو عقائد روحية متبعة في أرجاء العالم؟",
                "text_tn": "طلّع 9 ديانات ولا عقائد روحية متبعة في العالم؟",
                "text_fr": "Citez 9 religions ou croyances spirituelles suivies dans le monde ?",
                "text_en": "Name 9 major world religions or spiritual beliefs?",
                "correct": [
                    {"ar": "الإسلام", "tn": "الإسلام", "fr": "Islam", "en": "Islam"},
                    {"ar": "المسيحية", "tn": "المسيحية", "fr": "Christianisme", "en": "Christianity"},
                    {"ar": "اليهودية", "tn": "اليهودية", "fr": "Judaïsme", "en": "Judaism"},
                    {"ar": "الهندوسية", "tn": "الهندوسية", "fr": "Hindouisme", "en": "Hinduism"},
                    {"ar": "البوذية", "tn": "البوذية", "fr": "Bouddhisme", "en": "Buddhism"},
                    {"ar": "السيخية", "tn": "السيخية", "fr": "Sikhisme", "en": "Sikhism"},
                    {"ar": "السينتو (الشنتوية)", "tn": "الشنتوية", "fr": "Shintoïsme", "en": "Shinto"},
                    {"ar": "الطاوية", "tn": "الطاوية", "fr": "Taoïsme", "en": "Taoism"},
                    {"ar": "الزرادشتية", "tn": "الزرادشتية", "fr": "Zoroastrisme", "en": "Zoroastrianism"}
                ],
                "wrong": {"ar": "الرأسمالية", "tn": "الرأسمالية", "fr": "Capitalisme", "en": "Capitalism"}
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "Islam",
                "difficulty": 2,
                "text_ar": "أذكر 9 علماء مسلمين بارزين في الفقه أو التفسير أو الحديث؟",
                "text_tn": "طلّع 9 علماء مسلمين معروفين في الفقه ولا التفسير ولا الحديث؟",
                "text_fr": "Citez 9 érudits musulmans célèbres en jurisprudence, exégèse ou hadith ?",
                "text_en": "Name 9 famous Islamic scholars of Fiqh, Tafsir, or Hadith?",
                "correct": [
                    {"ar": "الإمام البخاري", "tn": "البخاري", "fr": "Al-Boukhari", "en": "Al-Bukhari"},
                    {"ar": "الإمام مسلم", "tn": "الإمام مسلم", "fr": "L'imam Muslim", "en": "Imam Muslim"},
                    {"ar": "الإمام الشافعي", "tn": "الشافعي", "fr": "Al-Chafi'i", "en": "Al-Shafi'i"},
                    {"ar": "الإمام مالك بن أنس", "tn": "الإمام مالك", "fr": "Malik ibn Anas", "en": "Malik ibn Anas"},
                    {"ar": "ابن كثير", "tn": "ابن كثير", "fr": "Ibn Kathir", "en": "Ibn Kathir"},
                    {"ar": "الإمام الغزالي", "tn": "الغزالي", "fr": "Al-Ghazali", "en": "Al-Ghazali"},
                    {"ar": "الإمام الطبري", "tn": "الطبري", "fr": "Al-Tabari", "en": "Al-Tabari"},
                    {"ar": "الإمام أبو حنيفة", "tn": "أبو حنيفة", "fr": "Abou Hanîfa", "en": "Abu Hanifa"},
                    {"ar": "الإمام أحمد بن حنبل", "tn": "أحمد بن حنبل", "fr": "Ahmad ibn Hanbal", "en": "Ahmad ibn Hanbal"}
                ],
                "wrong": {"ar": "ابن سينا", "tn": "ابن سينا", "fr": "Avicenne", "en": "Avicenna"} # Medical scholar / Philosopher first
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "Philosophy",
                "difficulty": 2,
                "text_ar": "أذكر 9 فلاسفة بارزين من العصر الحديث أو المعاصر؟",
                "text_tn": "طلّع 9 فلاسفة معروفين في العصر الحديث ولا المعاصر؟",
                "text_fr": "Citez 9 philosophes célèbres de l'époque moderne ou contemporaine ?",
                "text_en": "Name 9 famous modern or contemporary philosophers?",
                "correct": [
                    {"ar": "رينيه ديكارت", "tn": "ديكارت", "fr": "René Descartes", "en": "Rene Descartes"},
                    {"ar": "إيمانويل كانت", "tn": "كانت", "fr": "Emmanuel Kant", "en": "Immanuel Kant"},
                    {"ar": "فريدريك نيتشه", "tn": "نيتشه", "fr": "Friedrich Nietzsche", "en": "Friedrich Nietzsche"},
                    {"ar": "جان جاك روسو", "tn": "روسو", "fr": "Jean-Jacques Rousseau", "en": "Jean-Jacques Rousseau"},
                    {"ar": "جون لوك", "tn": "جون لوك", "fr": "John Locke", "en": "John Locke"},
                    {"ar": "باروخ سبينوزا", "tn": "سبينوزا", "fr": "Baruch Spinoza", "en": "Baruch Spinoza"},
                    {"ar": "توماس هوبز", "tn": "هوبز", "fr": "Thomas Hobbes", "en": "Thomas Hobbes"},
                    {"ar": "جان بول سارتر", "tn": "سارتر", "fr": "Jean-Paul Sartre", "en": "Jean-Paul Sartre"},
                    {"ar": "ميشيل فوكو", "tn": "فوكو", "fr": "Michel Foucault", "en": "Michel Foucault"}
                ],
                "wrong": {"ar": "ألبيرت أينشتاين", "tn": "أينشتاين", "fr": "Albert Einstein", "en": "Albert Einstein"}
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "Philosophy",
                "difficulty": 3,
                "text_ar": "أذكر 9 طرق أو مدارس صوفية مشهورة في العالم الإسلامي؟",
                "text_tn": "طلّع 9 طرق ولا مدارس صوفية معروفين في العالم الإسلامي؟",
                "text_fr": "Citez 9 confréries ou ordres soufis célèbres dans le monde islamique ?",
                "text_en": "Name 9 famous Sufi orders in the Islamic world?",
                "correct": [
                    {"ar": "الطريقة القادرية", "tn": "القادرية", "fr": "Qadiriyya", "en": "Qadiriyya"},
                    {"ar": "الطريقة الشاذلية", "tn": "الشاذلية", "fr": "Shadhiliyya", "en": "Shadhiliyya"},
                    {"ar": "الطريقة التيجانية", "tn": "التيجانية", "fr": "Tijaniyyah", "en": "Tijaniyyah"},
                    {"ar": "الطريقة النقشبندية", "tn": "النقشبندية", "fr": "Naqshbandiyya", "en": "Naqshbandiyya"},
                    {"ar": "الطريقة المولوية", "tn": "المولوية", "fr": "Mevlevi", "en": "Mevlevi"},
                    {"ar": "الطريقة الرفاعية", "tn": "الرفاعية", "fr": "Rifa'iyya", "en": "Rifa'iyya"},
                    {"ar": "الطريقة البدوية", "tn": "البدوية", "fr": "Badawiyyah", "en": "Badawiyyah"},
                    {"ar": "الطريقة الدسوقية", "tn": "الدسوقية", "fr": "Desouqiyyah", "en": "Desouqiyyah"},
                    {"ar": "الطريقة السنوسية", "tn": "السنوسية", "fr": "Sanoussi", "en": "Senussi"}
                ],
                "wrong": {"ar": "الوهابية", "tn": "الوهابية", "fr": "Wahhabisme", "en": "Wahhabism"}
            },
            {
                "category": "Religion & Philosophy",
                "subcategory": "other religions",
                "difficulty": 2,
                "text_ar": "أذكر 9 مدن تعتبر مقدسة أو ذات أهمية دينية كبرى لبلدان أو أديان مختلفة؟",
                "text_tn": "طلّع 9 مدن مقدسة ولا ذات أهمية دينية كبرى في العالم؟",
                "text_fr": "Citez 9 villes considérées comme saintes ou de grande importance religieuse ?",
                "text_en": "Name 9 cities considered holy or of major religious significance?",
                "correct": [
                    {"ar": "مكة المكرمة", "tn": "مكة", "fr": "La Mecque", "en": "Mecca"},
                    {"ar": "المدينة المنورة", "tn": "المدينة", "fr": "Médine", "en": "Medina"},
                    {"ar": "القدس الشريف", "tn": "القدس", "fr": "Jérusalem", "en": "Jerusalem"},
                    {"ar": "الفاتيكان (روما)", "tn": "الفاتيكان", "fr": "Vatican", "en": "Vatican City"},
                    {"ar": "بنارس (فاراناسي)", "tn": "فاراناسي", "fr": "Varanasi", "en": "Varanasi"},
                    {"ar": "القيروان", "tn": "القيروان", "fr": "Kairouan", "en": "Kairouan"},
                    {"ar": "النجف الأشرف", "tn": "النجف", "fr": "Nadjaf", "en": "Najaf"},
                    {"ar": "بيت لحم", "tn": "بيت لحم", "fr": "Bethléem", "en": "Bethlehem"},
                    {"ar": "لاسة (التبت)", "tn": "لاسة", "fr": "Lhassa", "en": "Lhasa"}
                ],
                "wrong": {"ar": "نيويورك", "tn": "نيويورك", "fr": "New York", "en": "New York"}
            }
        ]

        print(f"Prepared {len(raw_questions)} high-quality general culture questions.")
        
        # Insert questions
        inserted_count = 0
        fibonacci_mapping = [1, 1, 1, 2, 2, 3, 3, 5, 5]
        
        for rq in raw_questions:
            # Map category name
            cat_name = rq["category"]
            subcat_name = rq["subcategory"]
            
            cat_id = category_map.get(cat_name)
            if not cat_id:
                print(f"Skipping question, category '{cat_name}' not found.")
                continue
                
            subcat_id = subcat_map.get((cat_id, subcat_name))
            if not subcat_id:
                # Fallback to first subcategory found for this category
                fallback_subcats = [s for (cid, s), sid in subcat_map.items() if cid == cat_id]
                if fallback_subcats:
                    subcat_id = subcat_map[(cat_id, fallback_subcats[0])]
                else:
                    print(f"Skipping question, no subcategories found for category '{cat_name}'.")
                    continue
            
            # Create Question object
            q = models.Question(
                category_id=cat_id,
                subcategory_id=subcat_id,
                region="Worldwide",
                difficulty=rq["difficulty"],
                generation="All",
                is_approved=True
            )
            db.add(q)
            db.commit()
            db.refresh(q)
            
            # Create QuestionText translations
            qt_ar = models.QuestionText(id=q.id, language="ar", text=rq["text_ar"])
            qt_tn = models.QuestionText(id=q.id, language="tn", text=rq["text_tn"])
            qt_fr = models.QuestionText(id=q.id, language="fr", text=rq["text_fr"])
            qt_en = models.QuestionText(id=q.id, language="en", text=rq["text_en"])
            
            db.add(qt_ar)
            db.add(qt_tn)
            db.add(qt_fr)
            db.add(qt_en)
            
            # Insert correct answers
            for index, correct_opt in enumerate(rq["correct"]):
                pts = fibonacci_mapping[index] if index < len(fibonacci_mapping) else 1
                ans = models.Answer(
                    question_id=q.id,
                    is_correct=True,
                    points=pts
                )
                db.add(ans)
                db.commit()
                db.refresh(ans)
                
                # Insert AnswerText translations
                at_ar = models.AnswerText(id=ans.id, language="ar", text=correct_opt["ar"])
                at_tn = models.AnswerText(id=ans.id, language="tn", text=correct_opt["tn"])
                at_fr = models.AnswerText(id=ans.id, language="fr", text=correct_opt["fr"])
                at_en = models.AnswerText(id=ans.id, language="en", text=correct_opt["en"])
                
                db.add(at_ar)
                db.add(at_tn)
                db.add(at_fr)
                db.add(at_en)
                
            # Insert wrong answer (trap)
            wrong_opt = rq["wrong"]
            ans_wrong = models.Answer(
                question_id=q.id,
                is_correct=False,
                points=0
            )
            db.add(ans_wrong)
            db.commit()
            db.refresh(ans_wrong)
            
            at_w_ar = models.AnswerText(id=ans_wrong.id, language="ar", text=wrong_opt["ar"])
            at_w_tn = models.AnswerText(id=ans_wrong.id, language="tn", text=wrong_opt["tn"])
            at_w_fr = models.AnswerText(id=ans_wrong.id, language="fr", text=wrong_opt["fr"])
            at_w_en = models.AnswerText(id=ans_wrong.id, language="en", text=wrong_opt["en"])
            
            db.add(at_w_ar)
            db.add(at_w_tn)
            db.add(at_w_fr)
            db.add(at_w_en)
            
            inserted_count += 1
            
        db.commit()
        print(f"Successfully seeded {inserted_count} new Name 9 questions to the database!")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_100_general_culture()
