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
"[project]/src/components/PublicScoreboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>PublicScoreboard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const LEAGUES = [
    {
        key: 'Tech',
        label: 'Tech League'
    },
    {
        key: 'Stars',
        label: 'Stars League'
    }
];
function PublicScoreboard() {
    _s();
    const [scores, setScores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedLeague, setSelectedLeague] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Tech');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PublicScoreboard.useEffect": ()=>{
            setLoading(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tech_scores').select('*').then({
                "PublicScoreboard.useEffect": (param)=>{
                    let { data: tech } = param;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('stars_scores').select('*').then({
                        "PublicScoreboard.useEffect": (param)=>{
                            let { data: stars } = param;
                            const all = [
                                ...(tech || []).map({
                                    "PublicScoreboard.useEffect": (s)=>({
                                            ...s,
                                            league: 'Tech'
                                        })
                                }["PublicScoreboard.useEffect"]),
                                ...(stars || []).map({
                                    "PublicScoreboard.useEffect": (s)=>({
                                            ...s,
                                            league: 'Stars'
                                        })
                                }["PublicScoreboard.useEffect"])
                            ];
                            setScores(all);
                            setLoading(false);
                        }
                    }["PublicScoreboard.useEffect"]);
                }
            }["PublicScoreboard.useEffect"]);
            // Real-time subscription
            const techChannel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('tech_scores_changes').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'tech_scores'
            }, {
                "PublicScoreboard.useEffect.techChannel": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tech_scores').select('*').then({
                        "PublicScoreboard.useEffect.techChannel": (param)=>{
                            let { data: tech } = param;
                            setScores({
                                "PublicScoreboard.useEffect.techChannel": (prev)=>{
                                    const stars = prev.filter({
                                        "PublicScoreboard.useEffect.techChannel.stars": (s)=>s.league === 'Stars'
                                    }["PublicScoreboard.useEffect.techChannel.stars"]);
                                    return [
                                        ...(tech || []).map({
                                            "PublicScoreboard.useEffect.techChannel": (s)=>({
                                                    ...s,
                                                    league: 'Tech'
                                                })
                                        }["PublicScoreboard.useEffect.techChannel"]),
                                        ...stars
                                    ];
                                }
                            }["PublicScoreboard.useEffect.techChannel"]);
                        }
                    }["PublicScoreboard.useEffect.techChannel"]);
                }
            }["PublicScoreboard.useEffect.techChannel"]).subscribe();
            const starsChannel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('stars_scores_changes').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'stars_scores'
            }, {
                "PublicScoreboard.useEffect.starsChannel": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('stars_scores').select('*').then({
                        "PublicScoreboard.useEffect.starsChannel": (param)=>{
                            let { data: stars } = param;
                            setScores({
                                "PublicScoreboard.useEffect.starsChannel": (prev)=>{
                                    const tech = prev.filter({
                                        "PublicScoreboard.useEffect.starsChannel.tech": (s)=>s.league === 'Tech'
                                    }["PublicScoreboard.useEffect.starsChannel.tech"]);
                                    return [
                                        ...tech,
                                        ...(stars || []).map({
                                            "PublicScoreboard.useEffect.starsChannel": (s)=>({
                                                    ...s,
                                                    league: 'Stars'
                                                })
                                        }["PublicScoreboard.useEffect.starsChannel"])
                                    ];
                                }
                            }["PublicScoreboard.useEffect.starsChannel"]);
                        }
                    }["PublicScoreboard.useEffect.starsChannel"]);
                }
            }["PublicScoreboard.useEffect.starsChannel"]).subscribe();
            return ({
                "PublicScoreboard.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(techChannel);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(starsChannel);
                }
            })["PublicScoreboard.useEffect"];
        }
    }["PublicScoreboard.useEffect"], []);
    // Group scores by round, sort each group by score descending
    const leagueScores = scores.filter((s)=>s.league === selectedLeague);
    const rounds = Array.from(new Set(leagueScores.map((s)=>s.round).filter(Boolean)));
    const scoresByRound = rounds.map((round)=>{
        const entries = leagueScores.filter((s)=>s.round === round).sort((a, b)=>{
            const aScore = a.score === 'Disqualified' ? -9999 : Number(a.score);
            const bScore = b.score === 'Disqualified' ? -9999 : Number(b.score);
            return bScore - aScore;
        });
        return {
            round,
            entries
        };
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full flex flex-col items-center justify-start bg-slate-50 relative overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/parc-just_logo.png",
                alt: "PARC Logo",
                className: "h-32 w-auto mt-8 mb-4 drop-shadow-2xl animate-rumble",
                style: {
                    filter: 'drop-shadow(0 0 40px #ff8800)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/PublicScoreboard.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900 tracking-tight",
                children: "Scoreboard"
            }, void 0, false, {
                fileName: "[project]/src/components/PublicScoreboard.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-6 mb-8",
                children: LEAGUES.map((league)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedLeague(league.key),
                        className: "px-6 py-2 rounded-lg font-semibold text-base border transition-all duration-200 ".concat(selectedLeague === league.key ? 'border-orange-500 text-orange-500 bg-white shadow' : 'border-gray-200 text-gray-700 bg-gray-100 hover:border-orange-300 hover:text-orange-500'),
                        children: league.label
                    }, league.key, false, {
                        fileName: "[project]/src/components/PublicScoreboard.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/PublicScoreboard.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl mx-auto space-y-12",
                children: scoresByRound.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 text-gray-400",
                    children: "No entries found"
                }, void 0, false, {
                    fileName: "[project]/src/components/PublicScoreboard.tsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, this) : scoresByRound.map((param)=>{
                    let { round, entries } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-lg p-6 border-t-8 border-orange-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-orange-600 mb-4 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block w-6 h-6 bg-orange-400 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PublicScoreboard.tsx",
                                        lineNumber: 126,
                                        columnNumber: 17
                                    }, this),
                                    round
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PublicScoreboard.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 px-2 text-gray-500 font-semibold",
                                                        children: "Rank"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 px-2 text-gray-500 font-semibold",
                                                        children: "Team"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                        lineNumber: 134,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 px-2 text-gray-500 font-semibold",
                                                        children: "Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                lineNumber: 132,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PublicScoreboard.tsx",
                                            lineNumber: 131,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: entries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 3,
                                                    className: "text-center py-8 text-gray-400",
                                                    children: "No teams in this round"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                lineNumber: 140,
                                                columnNumber: 23
                                            }, this) : entries.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-gray-100 ".concat(idx === 0 ? 'bg-yellow-50' : ''),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-2 font-bold ".concat(idx === 0 ? 'text-yellow-600' : 'text-gray-800'),
                                                            children: idx === 0 ? '🏆' : idx + 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-2 text-gray-900 font-medium",
                                                            children: entry.team
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2 px-2 font-bold ".concat(idx === 0 ? 'text-yellow-600' : 'text-gray-900'),
                                                            children: entry.score
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, entry.id, true, {
                                                    fileName: "[project]/src/components/PublicScoreboard.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PublicScoreboard.tsx",
                                            lineNumber: 138,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PublicScoreboard.tsx",
                                    lineNumber: 130,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/PublicScoreboard.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this)
                        ]
                    }, round, true, {
                        fileName: "[project]/src/components/PublicScoreboard.tsx",
                        lineNumber: 124,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/PublicScoreboard.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PublicScoreboard.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(PublicScoreboard, "eXKb5PhH7U7OipiW2GoJhghpfI8=");
_c = PublicScoreboard;
var _c;
__turbopack_context__.k.register(_c, "PublicScoreboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_a44d3aae._.js.map