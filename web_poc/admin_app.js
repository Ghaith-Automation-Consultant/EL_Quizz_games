/* --------------------------------------------------
 * El Quizz Admin Portal App Logic — Proof of Concept
 * -------------------------------------------------- */

// Define core defaults
const DEFAULT_QUESTIONS = [
    {
        id: 1,
        text: "أذكر ولايات تونسية تطل على البحر الأبيض المتوسط (ساحلية)؟",
        category: "Geography",
        subcategory: "Cities & Borders",
        answers: [
            { text: "بنزرت", is_correct: true, points: 1 },
            { text: "تونس", is_correct: true, points: 1 },
            { text: "نابل", is_correct: true, points: 1 },
            { text: "سوسة", is_correct: true, points: 2 },
            { text: "المنستير", is_correct: true, points: 2 },
            { text: "المهدية", is_correct: true, points: 2 },
            { text: "صفاقس", is_correct: true, points: 3 },
            { text: "قابيس", is_correct: true, points: 5 },
            { text: "مدنين", is_correct: true, points: 8 },
            { text: "القيروان", is_correct: false, points: 0 }
        ]
    },
    {
        id: 2,
        text: "أذكر أكلات أو أطباق تونسية تقليدية مشهورة؟",
        category: "Gastronomy",
        subcategory: "Traditional Dishes",
        answers: [
            { text: "كسكسي بالعلّوش", is_correct: true, points: 1 },
            { text: "كفتاجي", is_correct: true, points: 1 },
            { text: "لبلابي", is_correct: true, points: 2 },
            { text: "بريك بالبطاطا والطن", is_correct: true, points: 2 },
            { text: "ملوخية تونسية", is_correct: true, points: 3 },
            { text: "صحن تونسي", is_correct: true, points: 3 },
            { text: "مرقة بطاطا", is_correct: true, points: 5 },
            { text: "شربة شعير بالقرنيط", is_correct: true, points: 5 },
            { text: "مدموجة بالفاكهة", is_correct: true, points: 8 },
            { text: "طاجين مغربي", is_correct: false, points: 0 }
        ]
    },
    {
        id: 3,
        text: "أذكر معالم أثرية أو تاريخية شهيرة في تونس؟",
        category: "History",
        subcategory: "Ancient Ruins",
        answers: [
            { text: "مسرح الجم الروماني", is_correct: true, points: 1 },
            { text: "جامع الزيتونة المعمور", is_correct: true, points: 1 },
            { text: "موقع قرطاج الأثري", is_correct: true, points: 2 },
            { text: "جامع عقبة بن نافع بالقيروان", is_correct: true, points: 2 },
            { text: "متحف باردو الوطني", is_correct: true, points: 3 },
            { text: "دقة الأثرية (طبرقة)", is_correct: true, points: 3 },
            { text: "سبيطلة الأثرية", is_correct: true, points: 5 },
            { text: "رباط المنستير", is_correct: true, points: 5 },
            { text: "أوتيك الأثرية", is_correct: true, points: 8 },
            { text: "المدائن التاريخية", is_correct: false, points: 0 }
        ]
    },
    {
        id: 4,
        text: "أذكر كلمات أو عبارات مميزة في الدارجة التونسية؟",
        category: "Dialect",
        subcategory: "Slang Vocabulary",
        answers: [
            { text: "شكون", is_correct: true, points: 1 },
            { text: "برشة", is_correct: true, points: 1 },
            { text: "توّة", is_correct: true, points: 1 },
            { text: "باهي", is_correct: true, points: 2 },
            { text: "عسلامة", is_correct: true, points: 2 },
            { text: "شبيك", is_correct: true, points: 3 },
            { text: "سخطة", is_correct: true, points: 5 },
            { text: "قزّول", is_correct: true, points: 5 },
            { text: "فزّاني", is_correct: true, points: 8 },
            { text: "واخا", is_correct: false, points: 0 }
        ]
    },
    {
        id: 5,
        text: "أذكر عادات، تقاليد أو صناعات تقليدية تونسية؟",
        category: "Traditions",
        subcategory: "Heritage Customs",
        answers: [
            { text: "لبس الشاشية الحمراء", is_correct: true, points: 1 },
            { text: "صناعة النحاس المطرّق", is_correct: true, points: 2 },
            { text: "تحضير العولة السنوية", is_correct: true, points: 2 },
            { text: "تقطير ماء الزهر والورد", is_correct: true, points: 3 },
            { text: "صناعة الزربية القيروانية", is_correct: true, points: 3 },
            { text: "ليلة الحنة للعروسة", is_correct: true, points: 3 },
            { text: "لبس المليلة والجبة", is_correct: true, points: 5 },
            { text: "صناعة الفخار النابلي", is_correct: true, points: 5 },
            { text: "خرجة سيدي أبي سعيد الباجي", is_correct: true, points: 8 },
            { text: "عجلة الدبكة", is_correct: false, points: 0 }
        ]
    }
];

const BACKEND_URL = window.location.hostname 
    ? `${window.location.protocol}//${window.location.hostname}:8000` 
    : "http://192.168.1.139:8000";

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
        answers: mappedAnswers
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
            } else if (tabId === "tab-crud") {
                if (activeMode === "bent_waled") {
                    loadBwWordsTable();
                } else {
                    renderCrudTable();
                }
            }
        });
    });

    // Bind CRUD search/filter triggers
    const crudSearch = document.getElementById("crud-search");
    const crudFilterCat = document.getElementById("crud-filter-category");
    const crudPrevLang = document.getElementById("crud-preview-lang");
    if (crudSearch) crudSearch.addEventListener("input", renderCrudTable);
    if (crudFilterCat) crudFilterCat.addEventListener("change", renderCrudTable);
    if (crudPrevLang) crudPrevLang.addEventListener("change", renderCrudTable);

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
}

// Render visualizations & cards
function renderVisualizations() {
    document.getElementById("stat-total-q").textContent = questions.length;

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

    const filtered = questions.filter(q => {
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

        const previewText = q.translations[previewLang] ? q.translations[previewLang].text : q.text;

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
                    <button class="btn btn-secondary" onclick="openEditQuestionModal(${q.id})" style="padding: 4px 10px; font-size: 0.8rem; margin: 0;">Edit ✏️</button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = rowsHtml;
}

// Open Edit Question Modal
async function openEditQuestionModal(qId) {
    const q = questions.find(item => item.id === qId);
    if (!q) return;

    document.getElementById("edit-q-id").value = q.id;
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
        answers: answers
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

// Fire initialization on load
window.addEventListener("DOMContentLoaded", init);

