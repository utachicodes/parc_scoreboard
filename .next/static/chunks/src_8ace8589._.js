(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/services/supabaseClient.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "supabase": ()=>supabase
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://ogfickbnvalwkyjzvlal.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable_oplzyU8f_W8H5nT1ezvuFg_GOzun77-");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/tech/scoring/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>TechScoringPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Timer durations in seconds
const DURATIONS = [
    60,
    60,
    30
];
const initialForm = {
    team: "",
    round: "Round 1",
    submitted_by: "",
    // Obj 1
    phosphateRocks: [
        0,
        0,
        0,
        0
    ],
    largePhosphateRock: false,
    overLimit: [
        0,
        0,
        0,
        0
    ],
    robotOversize: false,
    // Obj 2
    sulfuricAcid: [
        0,
        0,
        0,
        0
    ],
    ammonia: [
        0,
        0,
        0,
        0
    ],
    defectiveAcid: [
        0,
        0,
        0,
        0
    ],
    defectiveAmmonia: [
        0,
        0,
        0,
        0
    ],
    mapProduced: 0,
    dapProduced: 0,
    // Obj 3
    correctDeliveries: 0,
    wrongDeliveries: 0
};
function calculateScore(form) {
    if (form.robotOversize) return "Disqualified";
    let score = 0;
    // Obj 1
    for(let i = 0; i < 4; i++){
        score += form.phosphateRocks[i] * 2;
        score -= form.overLimit[i] * 3;
    }
    if (form.largePhosphateRock) score += 5;
    // Obj 2
    for(let i = 0; i < 4; i++){
        score += form.sulfuricAcid[i] * 2;
        score += form.ammonia[i] * 2;
        score -= form.defectiveAcid[i] * 2;
        score -= form.defectiveAmmonia[i] * 2;
    }
    score += form.mapProduced * 3;
    score += form.dapProduced * 4;
    // Obj 3
    score += form.correctDeliveries * 5;
    score -= form.wrongDeliveries * 3;
    return score;
}
function TechScoringPage() {
    var _matchTeams_, _matchTeams_find;
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialForm);
    const [leaderboard, setLeaderboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const score = calculateScore(form);
    const [filterRound, setFilterRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filterSubmitter, setFilterSubmitter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("score");
    const [sortDir, setSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [showSummary, setShowSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [matchTeams, setMatchTeams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editEntry, setEditEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteEntry, setDeleteEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch leaderboard from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TechScoringPage.useEffect": ()=>{
            setLoading(true);
            // Initial fetch
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tech_scores').select('*').order('createdAt', {
                ascending: false
            }).then({
                "TechScoringPage.useEffect": (param)=>{
                    let { data } = param;
                    setLeaderboard(data || []);
                    setLoading(false);
                }
            }["TechScoringPage.useEffect"]);
            // Real-time subscription
            const channel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('tech_scores_changes').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'tech_scores'
            }, {
                "TechScoringPage.useEffect.channel": (payload)=>{
                    // Refetch leaderboard on any change
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tech_scores').select('*').order('createdAt', {
                        ascending: false
                    }).then({
                        "TechScoringPage.useEffect.channel": (param)=>{
                            let { data } = param;
                            return setLeaderboard(data || []);
                        }
                    }["TechScoringPage.useEffect.channel"]);
                }
            }["TechScoringPage.useEffect.channel"]).subscribe();
            return ({
                "TechScoringPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(channel);
                }
            })["TechScoringPage.useEffect"];
        }
    }["TechScoringPage.useEffect"], []);
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
    function handleChange(e) {
        const { name, value, type, dataset } = e.target;
        if (name.startsWith("phosphateRocks") || name.startsWith("overLimit") || name.startsWith("sulfuricAcid") || name.startsWith("ammonia") || name.startsWith("defectiveAcid") || name.startsWith("defectiveAmmonia")) {
            const idx = Number(dataset.idx);
            let v = Number(value);
            // Constraints per field
            if (name === "phosphateRocks") v = clamp(v, 0, 3);
            if (name === "overLimit") v = clamp(v, 0, 7);
            if (name === "sulfuricAcid" || name === "ammonia" || name === "defectiveAcid" || name === "defectiveAmmonia") v = clamp(v, 0, 2);
            setForm((f)=>({
                    ...f,
                    [name]: f[name].map((val, i)=>i === idx ? v : val)
                }));
        } else if (type === "checkbox") {
            setForm((f)=>({
                    ...f,
                    [name]: e.target.checked
                }));
        } else {
            let v = value;
            if (name === "mapProduced" || name === "dapProduced") v = String(clamp(Number(value), 0, 10)); // reasonable max
            if (name === "correctDeliveries") {
                let correct = clamp(Number(value), 0, 4);
                let wrong = Number(form.wrongDeliveries);
                if (correct === 4) wrong = 0;
                else if (correct + wrong > 4) wrong = 4 - correct;
                setForm((f)=>({
                        ...f,
                        correctDeliveries: String(correct),
                        wrongDeliveries: String(wrong)
                    }));
                return;
            }
            if (name === "wrongDeliveries") {
                let wrong = clamp(Number(value), 0, 4);
                let correct = Number(form.correctDeliveries);
                if (correct === 4) wrong = 0;
                else if (correct + wrong > 4) correct = 4 - wrong;
                setForm((f)=>({
                        ...f,
                        correctDeliveries: String(correct),
                        wrongDeliveries: String(wrong)
                    }));
                return;
            }
            setForm((f)=>({
                    ...f,
                    [name]: v
                }));
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await fetch("/api/tech-scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...form,
                score,
                time: new Date().toLocaleTimeString()
            })
        });
        // Find the two most recent teams for this round
        const res = await fetch("/api/tech-scores");
        let all = await res.json();
        // Defensive: if not an array, try .data or fallback to []
        if (!Array.isArray(all)) {
            if (Array.isArray(all.data)) {
                all = all.data;
            } else {
                all = [];
            }
        }
        const recent = all.filter((entry)=>entry.round === form.round).sort((a, b)=>new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 2);
        setMatchTeams(recent);
        setShowSummary(true);
        setForm(initialForm);
    }
    // Unique rounds and submitters for filter dropdowns
    const uniqueRounds = Array.from(new Set(leaderboard.map((e)=>e.round))).filter(Boolean);
    const uniqueSubmitters = Array.from(new Set(leaderboard.map((e)=>e.submitted_by))).filter(Boolean);
    // Filtered and sorted leaderboard
    const filteredLeaderboard = leaderboard.filter((e)=>(!filterRound || e.round === filterRound) && (!filterSubmitter || e.submitted_by === filterSubmitter)).sort((a, b)=>{
        if (sortBy === 'score') {
            const aScore = a.score === 'Disqualified' ? -9999 : Number(a.score);
            const bScore = b.score === 'Disqualified' ? -9999 : Number(b.score);
            return sortDir === 'desc' ? bScore - aScore : aScore - bScore;
        } else {
            return sortDir === 'desc' ? new Date(b.time).getTime() - new Date(a.time).getTime() : new Date(a.time).getTime() - new Date(b.time).getTime();
        }
    });
    // Edit handlers
    function openEdit(entry) {
        setEditEntry(entry);
        setEditForm({
            ...entry
        });
    }
    function closeEdit() {
        setEditEntry(null);
        setEditForm(null);
    }
    async function handleEditSave() {
        if (!editEntry || !editForm) return;
        await fetch('/api/tech-scores', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editEntry.id,
                ...editForm,
                score: calculateScore(editForm)
            })
        });
        closeEdit();
    }
    function handleEditChange(e) {
        const { name, value, type, dataset } = e.target;
        if (!editForm) return;
        if (name.startsWith("phosphateRocks") || name.startsWith("overLimit") || name.startsWith("sulfuricAcid") || name.startsWith("ammonia") || name.startsWith("defectiveAcid") || name.startsWith("defectiveAmmonia")) {
            const idx = Number(dataset.idx);
            setEditForm((f)=>f ? {
                    ...f,
                    [name]: f[name].map((v, i)=>i === idx ? Number(value) : v)
                } : f);
        } else if (type === "checkbox") {
            setEditForm((f)=>f ? {
                    ...f,
                    [name]: e.target.checked
                } : f);
        } else {
            setEditForm((f)=>f ? {
                    ...f,
                    [name]: value
                } : f);
        }
    }
    // Delete handlers
    function openDelete(entry) {
        setDeleteEntry(entry);
    }
    function closeDelete() {
        setDeleteEntry(null);
    }
    async function handleDeleteConfirm() {
        if (!deleteEntry) return;
        await fetch('/api/tech-scores', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: deleteEntry.id
            })
        });
        closeDelete();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto py-12 px-4 text-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6 text-orange-600 text-center",
                children: "TECH League Scoring Form"
            }, void 0, false, {
                fileName: "[project]/src/app/tech/scoring/page.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-lg font-semibold",
                        children: "Instructions:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc ml-6 text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "This form is for scoring the TECH League challenge. Each team uses ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "4 containers"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 82
                                    }, this),
                                    " in the mixing zone, labeled below as Container 1–4."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "For each container, enter the number of phosphate rocks, over-limit rocks, sulfuric acid, ammonia, and defective discs placed."
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Use the checkboxes for special bonuses or penalties (e.g., Large Phosphate Rock, Robot Oversized)."
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "All fields are required for accurate scoring. Hover over any field label for more info."
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tech/scoring/page.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "bg-white rounded-xl shadow-lg p-6 mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-col md:flex-row gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                name: "team",
                                value: form.team,
                                onChange: handleChange,
                                placeholder: "Team Name/Number",
                                className: "border p-2 rounded w-full md:w-1/2",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                name: "round",
                                value: form.round,
                                onChange: handleChange,
                                className: "border p-2 rounded w-full md:w-1/4",
                                required: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Round 1",
                                        children: "Round 1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Round 2",
                                        children: "Round 2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Round 3",
                                        children: "Round 3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Finals",
                                        children: "Finals"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                name: "submitted_by",
                                value: form.submitted_by,
                                onChange: handleChange,
                                placeholder: "Manager Name or Email",
                                className: "border p-2 rounded w-full md:w-1/4",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold mb-2 mt-6 text-orange-500",
                        children: [
                            "Objective 1: Mining & Transport of Phosphate Rocks ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-500",
                                children: "(1 min)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 278,
                                columnNumber: 124
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 text-gray-700",
                        children: [
                            "Extract and transport phosphate rocks to containers in the mixing zone. ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Each container represents a separate mixing zone (A, B, C, D)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 279,
                                columnNumber: 117
                            }, this),
                            ". Max 3 rocks per container. Large rock bonus. Over limit penalty."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 font-medium text-red-600 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "robotOversize",
                                checked: form.robotOversize,
                                onChange: handleChange
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            " Robot Oversized (DQ)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 font-semibold",
                        children: "Phosphate Rocks in Containers (max 3 per):"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1 text-sm text-gray-500",
                        children: [
                            'For each container (Zone A–D), enter the number of phosphate rocks placed (max 3). If more than 3, enter the extra in "Over Limit". ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: 'What is "Over Limit"?',
                                children: "[?]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 284,
                                columnNumber: 185
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 items-center mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    title: "Mixing Zone ".concat(String.fromCharCode(65 + i)),
                                    children: "Container ".concat(i + 1, " (Zone ").concat(String.fromCharCode(65 + i), ")")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this),
                                ":",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    name: "phosphateRocks",
                                    "data-idx": i,
                                    min: 0,
                                    max: 3,
                                    value: form.phosphateRocks[i],
                                    onChange: handleChange,
                                    className: "border p-1 rounded w-16",
                                    title: "Number of phosphate rocks placed in this container (max 3)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    title: "Number of rocks over the 3-per-container limit",
                                    children: "Over Limit:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    name: "overLimit",
                                    "data-idx": i,
                                    min: 0,
                                    max: 7,
                                    value: form.overLimit[i],
                                    onChange: handleChange,
                                    className: "border p-1 rounded w-16",
                                    title: "Number of rocks above the 3-per-container limit (penalty)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 mt-2",
                        title: "Bonus for placing a large phosphate rock",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                name: "largePhosphateRock",
                                checked: form.largePhosphateRock,
                                onChange: handleChange
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this),
                            " Large Phosphate Rock Placed (+5)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold mb-2 mt-6 text-blue-500",
                        children: [
                            "Objective 2: Chemical Processing & Fertilizer Formation ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-500",
                                children: "(1 min)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 298,
                                columnNumber: 127
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 text-gray-700",
                        children: "Add 2 sulfuric acids (S discs) and ammonia (A discs) to each container. Avoid defective discs. Produce MAP/DAP. Defective penalty."
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 font-semibold",
                        children: "Sulfuric Acid, Ammonia, Defective Discs per Container:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1 text-sm text-gray-500",
                        children: [
                            "For each container, enter the number of ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Sulfuric Acid (S)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 301,
                                columnNumber: 93
                            }, this),
                            " and ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Ammonia (A)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 301,
                                columnNumber: 122
                            }, this),
                            " discs placed (max 2 each). Also enter any ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "Defective"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 301,
                                columnNumber: 183
                            }, this),
                            " discs (wrong color/label, max 2 each). ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: "What is a defective disc?",
                                children: "[?]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 301,
                                columnNumber: 239
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 items-center mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    title: "Mixing Zone ".concat(String.fromCharCode(65 + i)),
                                    children: "Container ".concat(i + 1, " (Zone ").concat(String.fromCharCode(65 + i), ")")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, this),
                                ":",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    name: "sulfuricAcid",
                                    "data-idx": i,
                                    min: 0,
                                    max: 2,
                                    value: form.sulfuricAcid[i],
                                    onChange: handleChange,
                                    className: "border p-1 rounded w-16",
                                    title: "Number of sulfuric acid discs placed in this container (max 2)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    name: "ammonia",
                                    "data-idx": i,
                                    min: 0,
                                    max: 2,
                                    value: form.ammonia[i],
                                    onChange: handleChange,
                                    className: "border p-1 rounded w-16",
                                    title: "Number of ammonia discs placed in this container (max 2)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    name: "defectiveAcid",
                                    "data-idx": i,
                                    min: 0,
                                    max: 2,
                                    value: form.defectiveAcid[i],
                                    onChange: handleChange,
                                    className: "border p-1 rounded w-16",
                                    title: "Number of defective sulfuric acid discs in this container (max 2)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    name: "defectiveAmmonia",
                                    "data-idx": i,
                                    min: 0,
                                    max: 2,
                                    value: form.defectiveAmmonia[i],
                                    onChange: handleChange,
                                    className: "border p-1 rounded w-16",
                                    title: "Number of defective ammonia discs in this container (max 2)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col",
                                title: "Number of MAP produced (bonus)",
                                children: [
                                    "MAP Produced (+3 each)",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "mapProduced",
                                        min: 0,
                                        max: 10,
                                        value: form.mapProduced,
                                        onChange: handleChange,
                                        className: "border p-1 rounded",
                                        title: "Number of MAP produced (bonus, min 0)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col",
                                title: "Number of DAP produced (bonus)",
                                children: [
                                    "DAP Produced (+4 each)",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "dapProduced",
                                        min: 0,
                                        max: 10,
                                        value: form.dapProduced,
                                        onChange: handleChange,
                                        className: "border p-1 rounded",
                                        title: "Number of DAP produced (bonus, min 0)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold mb-2 mt-6 text-green-600",
                        children: [
                            "Objective 3: Transport & Ship Fertilizer ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-500",
                                children: "(30 sec)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 323,
                                columnNumber: 113
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 text-gray-700",
                        children: "Move containers to correct shipping zone (MAP, DAP, Unfinished). Correct delivery bonus. Wrong area penalty."
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 font-semibold",
                        children: "Shipping:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1 text-sm text-gray-500",
                        children: [
                            "Enter the number of containers delivered to the correct zone (max 4). If all 4 are correct, wrong deliveries must be 0. The sum of correct and wrong deliveries cannot exceed 4. ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: "What is a correct delivery?",
                                children: "[?]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 326,
                                columnNumber: 230
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col mb-2",
                        title: "Number of containers delivered to the correct zone (bonus)",
                        children: [
                            "Correct Deliveries (+5 each)",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                name: "correctDeliveries",
                                min: 0,
                                max: 4,
                                value: form.correctDeliveries,
                                onChange: handleChange,
                                className: "border p-1 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col mb-2",
                        title: "Number of containers delivered to the wrong zone (penalty)",
                        children: [
                            "Wrong Deliveries (−3 each)",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                name: "wrongDeliveries",
                                min: 0,
                                max: 4,
                                value: form.wrongDeliveries,
                                onChange: handleChange,
                                className: "border p-1 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-orange-600",
                                children: [
                                    "Total Score: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: score === "Disqualified" ? "text-red-600" : "",
                                        children: score
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 335,
                                        columnNumber: 76
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "px-8 py-3 bg-orange-500 text-white text-xl font-bold rounded-lg shadow hover:bg-orange-600 transition",
                                children: "Add to Leaderboard"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tech/scoring/page.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            showSummary && matchTeams.length === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative animate-pop",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowSummary(false),
                            className: "absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-500",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl font-bold text-orange-600 mb-2",
                                    children: "Match Summary"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-semibold text-gray-700 bg-orange-100 px-6 py-3 rounded-lg inline-block",
                                    children: ((_matchTeams_ = matchTeams[0]) === null || _matchTeams_ === void 0 ? void 0 : _matchTeams_.round) || 'Round'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 346,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row gap-8 items-center justify-center",
                            children: matchTeams.map((team, idx)=>{
                                const isWinner = matchTeams.every((t)=>t.score !== 'Disqualified') && Number(team.score) === Math.max(...matchTeams.map((t)=>t.score === 'Disqualified' ? -9999 : Number(t.score)));
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 rounded-xl p-6 shadow-lg border-4 transition-all duration-1000 ".concat(isWinner ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 animate-winner-glow' : 'border-gray-200 bg-gray-50', " ").concat(team.score === 'Disqualified' ? 'bg-red-100 text-red-700 border-red-300' : ''),
                                    style: {
                                        animation: isWinner ? 'winnerGlow 2s ease-in-out infinite alternate, flyIn 1.5s ease-out' : '',
                                        transform: isWinner ? 'scale(1.05)' : 'scale(1)',
                                        boxShadow: isWinner ? '0 0 30px rgba(255, 215, 0, 0.6)' : ''
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold mb-2 flex items-center gap-2",
                                            children: [
                                                team.team,
                                                isWinner && team.score !== 'Disqualified' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-yellow-500 animate-bounce text-3xl",
                                                    children: "🏆"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 25
                                                }, this),
                                                team.score === 'Disqualified' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-red-500 font-bold",
                                                    children: "DQ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 57
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 373,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-lg font-semibold mb-2",
                                            children: [
                                                "Score: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: team.score === 'Disqualified' ? 'text-red-600' : 'text-orange-600',
                                                    children: team.score
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 380,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 text-sm text-gray-500",
                                            children: [
                                                "Submitted by: ",
                                                team.submitted_by
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 383,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bold text-orange-500 mb-1",
                                                    children: "Objective 1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        "Phosphate Rocks: ",
                                                        team.phosphateRocks.join(', '),
                                                        " | Large Rock: ",
                                                        team.largePhosphateRock ? 'Yes' : 'No',
                                                        " | Over Limit: ",
                                                        team.overLimit.join(', ')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bold text-orange-500 mt-2 mb-1",
                                                    children: "Objective 2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        "Sulfuric Acid: ",
                                                        team.sulfuricAcid.join(', '),
                                                        " | Ammonia: ",
                                                        team.ammonia.join(', '),
                                                        " | Defective Acid: ",
                                                        team.defectiveAcid.join(', '),
                                                        " | Defective Ammonia: ",
                                                        team.defectiveAmmonia.join(', ')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 388,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        "MAP: ",
                                                        team.mapProduced,
                                                        " | DAP: ",
                                                        team.dapProduced
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bold text-orange-500 mt-2 mb-1",
                                                    children: "Objective 3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        "Correct Deliveries: ",
                                                        team.correctDeliveries,
                                                        " | Wrong Deliveries: ",
                                                        team.wrongDeliveries
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 384,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, team.id || idx, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 360,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        matchTeams.some((team)=>matchTeams.every((t)=>t.score !== 'Disqualified') && Number(team.score) === Math.max(...matchTeams.map((t)=>t.score === 'Disqualified' ? -9999 : Number(t.score)))) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-yellow-700 animate-pulse",
                                children: [
                                    "🎉 Winner: ",
                                    (_matchTeams_find = matchTeams.find((team)=>matchTeams.every((t)=>t.score !== 'Disqualified') && Number(team.score) === Math.max(...matchTeams.map((t)=>t.score === 'Disqualified' ? -9999 : Number(t.score))))) === null || _matchTeams_find === void 0 ? void 0 : _matchTeams_find.team,
                                    " 🎉"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 404,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 403,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowSummary(false),
                                className: "px-8 py-3 bg-orange-500 text-white text-xl font-bold rounded-lg shadow hover:bg-orange-600 transition",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 414,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 413,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                    lineNumber: 342,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tech/scoring/page.tsx",
                lineNumber: 341,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-lg p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-4 text-orange-600",
                        children: "Leaderboard (Shared)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4 mb-4 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    "Round:",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterRound,
                                        onChange: (e)=>setFilterRound(e.target.value),
                                        className: "border p-1 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "All"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 426,
                                                columnNumber: 15
                                            }, this),
                                            uniqueRounds.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: r,
                                                    children: r
                                                }, r, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 38
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    "Submitter:",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterSubmitter,
                                        onChange: (e)=>setFilterSubmitter(e.target.value),
                                        className: "border p-1 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "All"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 15
                                            }, this),
                                            uniqueSubmitters.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: s,
                                                    children: s
                                                }, s, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 42
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 430,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    "Sort by:",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sortBy,
                                        onChange: (e)=>setSortBy(e.target.value),
                                        className: "border p-1 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "score",
                                                children: "Score"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 440,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "time",
                                                children: "Time"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 441,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSortDir((d)=>d === 'asc' ? 'desc' : 'asc'),
                                className: "px-2 py-1 border rounded bg-orange-100 text-orange-700",
                                children: sortDir === 'asc' ? '↑ Asc' : '↓ Desc'
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 444,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setFilterRound("");
                                    setFilterSubmitter("");
                                },
                                className: "ml-2 px-2 py-1 border rounded bg-gray-100 text-gray-700",
                                children: "Clear Filters"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 447,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 449,
                        columnNumber: 20
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-left border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "bg-orange-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-2",
                                            children: "Team"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 453,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-2",
                                            children: "Score"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-2",
                                            children: "Time"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 455,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-2",
                                            children: "Round"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-2",
                                            children: "Submitter"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 457,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-2",
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 458,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 452,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 451,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: filteredLeaderboard.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: entry.score === "Disqualified" ? "bg-red-100 text-red-700" : idx === 0 ? "bg-yellow-100 font-bold" : "",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-2",
                                                children: entry.team
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 464,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-2",
                                                children: entry.score
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 465,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-2",
                                                children: entry.time
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 466,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-2",
                                                children: entry.round
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-2",
                                                children: entry.submitted_by
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-2 flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openEdit(entry),
                                                        className: "text-blue-500 hover:text-blue-700",
                                                        title: "Edit",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            role: "img",
                                                            "aria-label": "edit",
                                                            children: "✏️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                            lineNumber: 470,
                                                            columnNumber: 120
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openDelete(entry),
                                                        className: "text-red-500 hover:text-red-700",
                                                        title: "Delete",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            role: "img",
                                                            "aria-label": "delete",
                                                            children: "🗑️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                            lineNumber: 471,
                                                            columnNumber: 122
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, entry.id || idx, true, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 463,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                lineNumber: 461,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tech/scoring/page.tsx",
                lineNumber: 419,
                columnNumber: 7
            }, this),
            editEntry && editForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative animate-pop",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeEdit,
                            className: "absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-500",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 483,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold mb-6 text-orange-600",
                            children: "Edit Team Score"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 484,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: (e)=>{
                                e.preventDefault();
                                handleEditSave();
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 flex flex-col md:flex-row gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "team",
                                            value: editForm.team,
                                            onChange: handleEditChange,
                                            placeholder: "Team Name/Number",
                                            className: "border p-2 rounded w-full md:w-1/2",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 488,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "round",
                                            value: editForm.round,
                                            onChange: handleEditChange,
                                            className: "border p-2 rounded w-full md:w-1/4",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Round 1",
                                                    children: "Round 1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 490,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Round 2",
                                                    children: "Round 2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Round 3",
                                                    children: "Round 3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Finals",
                                                    children: "Finals"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 489,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "submitted_by",
                                            value: editForm.submitted_by,
                                            onChange: handleEditChange,
                                            placeholder: "Manager Name or Email",
                                            className: "border p-2 rounded w-full md:w-1/4",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 495,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 487,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 font-semibold",
                                    children: "Phosphate Rocks in Containers (max 3 per):"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 498,
                                    columnNumber: 15
                                }, this),
                                [
                                    0,
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Container ",
                                                    i + 1,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 501,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                name: "phosphateRocks",
                                                "data-idx": i,
                                                min: 0,
                                                max: 3,
                                                value: editForm.phosphateRocks[i],
                                                onChange: handleEditChange,
                                                className: "border p-1 rounded w-16"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 502,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Over Limit:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                name: "overLimit",
                                                "data-idx": i,
                                                min: 0,
                                                max: 7,
                                                value: editForm.overLimit[i],
                                                onChange: handleEditChange,
                                                className: "border p-1 rounded w-16"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 504,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 500,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-2 mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            name: "largePhosphateRock",
                                            checked: editForm.largePhosphateRock,
                                            onChange: handleEditChange
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 508,
                                            columnNumber: 17
                                        }, this),
                                        " Large Phosphate Rock Placed (+5)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 font-semibold mt-4",
                                    children: "Sulfuric Acid, Ammonia, Defective Discs per Container:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 511,
                                    columnNumber: 15
                                }, this),
                                [
                                    0,
                                    1,
                                    2,
                                    3
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Container ",
                                                    i + 1,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                name: "sulfuricAcid",
                                                "data-idx": i,
                                                min: 0,
                                                max: 2,
                                                value: editForm.sulfuricAcid[i],
                                                onChange: handleEditChange,
                                                className: "border p-1 rounded w-16",
                                                placeholder: "S"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 515,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                name: "ammonia",
                                                "data-idx": i,
                                                min: 0,
                                                max: 2,
                                                value: editForm.ammonia[i],
                                                onChange: handleEditChange,
                                                className: "border p-1 rounded w-16",
                                                placeholder: "A"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 516,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                name: "defectiveAcid",
                                                "data-idx": i,
                                                min: 0,
                                                max: 2,
                                                value: editForm.defectiveAcid[i],
                                                onChange: handleEditChange,
                                                className: "border p-1 rounded w-16",
                                                placeholder: "Def S"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 517,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                name: "defectiveAmmonia",
                                                "data-idx": i,
                                                min: 0,
                                                max: 2,
                                                value: editForm.defectiveAmmonia[i],
                                                onChange: handleEditChange,
                                                className: "border p-1 rounded w-16",
                                                placeholder: "Def A"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                lineNumber: 518,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/tech/scoring/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex flex-col",
                                            children: [
                                                "MAP Produced (+3 each)",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    name: "mapProduced",
                                                    min: 0,
                                                    max: 10,
                                                    value: editForm.mapProduced,
                                                    onChange: handleEditChange,
                                                    className: "border p-1 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 522,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex flex-col",
                                            children: [
                                                "DAP Produced (+4 each)",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    name: "dapProduced",
                                                    min: 0,
                                                    max: 10,
                                                    value: editForm.dapProduced,
                                                    onChange: handleEditChange,
                                                    className: "border p-1 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 521,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 font-semibold mt-4",
                                    children: "Shipping:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex flex-col mb-2",
                                    children: [
                                        "Correct Deliveries (+5 each)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "correctDeliveries",
                                            min: 0,
                                            max: 4,
                                            value: editForm.correctDeliveries,
                                            onChange: handleEditChange,
                                            className: "border p-1 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 532,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 531,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex flex-col mb-2",
                                    children: [
                                        "Wrong Deliveries (−3 each)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "wrongDeliveries",
                                            min: 0,
                                            max: 4,
                                            value: editForm.wrongDeliveries,
                                            onChange: handleEditChange,
                                            className: "border p-1 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 535,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex gap-4 justify-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: closeEdit,
                                            className: "px-6 py-2 bg-gray-300 text-gray-700 rounded font-bold",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 538,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "px-8 py-2 bg-orange-500 text-white text-xl font-bold rounded-lg shadow hover:bg-orange-600 transition",
                                            children: "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 537,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 485,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                    lineNumber: 482,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tech/scoring/page.tsx",
                lineNumber: 481,
                columnNumber: 9
            }, this),
            deleteEntry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-pop",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeDelete,
                            className: "absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-500",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 549,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold mb-6 text-red-600",
                            children: "Delete Team Score"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 550,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                "Are you sure you want to delete ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold",
                                    children: deleteEntry.team
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 551,
                                    columnNumber: 67
                                }, this),
                                "'s score for ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold",
                                    children: deleteEntry.round
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 551,
                                    columnNumber: 133
                                }, this),
                                "?"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeDelete,
                                    className: "px-6 py-2 bg-gray-300 text-gray-700 rounded font-bold",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 553,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleDeleteConfirm,
                                    className: "px-8 py-2 bg-red-500 text-white text-xl font-bold rounded-lg shadow hover:bg-red-600 transition",
                                    children: "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                                    lineNumber: 554,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tech/scoring/page.tsx",
                            lineNumber: 552,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tech/scoring/page.tsx",
                    lineNumber: 548,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tech/scoring/page.tsx",
                lineNumber: 547,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/tech/scoring/page.tsx",
        lineNumber: 253,
        columnNumber: 5
    }, this);
}
_s(TechScoringPage, "aWmr4zr98RsROwHCwbeACMWyD/o=");
_c = TechScoringPage;
var _c;
__turbopack_context__.k.register(_c, "TechScoringPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_8ace8589._.js.map