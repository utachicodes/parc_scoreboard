module.exports = {

"[project]/.next-internal/server/app/api/tech-scores/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/src/services/localStorage.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "localStorage": ()=>localStorage
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
// Local file paths for storing data
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
const STARS_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, 'stars_scores.json');
const TECH_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, 'tech_scores.json');
// Ensure data directory exists
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DATA_DIR)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(DATA_DIR, {
        recursive: true
    });
}
// Initialize empty files if they don't exist
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(STARS_FILE)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(STARS_FILE, JSON.stringify([], null, 2));
}
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(TECH_FILE)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(TECH_FILE, JSON.stringify([], null, 2));
}
class LocalStorageService {
    readFile(filePath) {
        try {
            const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading ${filePath}:`, error);
            return [];
        }
    }
    writeFile(filePath, data) {
        try {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(`Error writing ${filePath}:`, error);
        }
    }
    // Stars Scores
    async getStarsScores() {
        return this.readFile(STARS_FILE);
    }
    async addStarsScore(score) {
        const scores = this.readFile(STARS_FILE);
        const newScore = {
            ...score,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        scores.unshift(newScore); // Add to beginning
        this.writeFile(STARS_FILE, scores);
        return newScore;
    }
    async updateStarsScore(id, updates) {
        const scores = this.readFile(STARS_FILE);
        const index = scores.findIndex((s)=>s.id === id);
        if (index === -1) return null;
        scores[index] = {
            ...scores[index],
            ...updates
        };
        this.writeFile(STARS_FILE, scores);
        return scores[index];
    }
    async deleteStarsScore(id) {
        const scores = this.readFile(STARS_FILE);
        const filtered = scores.filter((s)=>s.id !== id);
        if (filtered.length === scores.length) return false;
        this.writeFile(STARS_FILE, filtered);
        return true;
    }
    // Tech Scores
    async getTechScores() {
        return this.readFile(TECH_FILE);
    }
    async addTechScore(score) {
        const scores = this.readFile(TECH_FILE);
        const newScore = {
            ...score,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        scores.unshift(newScore); // Add to beginning
        this.writeFile(TECH_FILE, scores);
        return newScore;
    }
    async updateTechScore(id, updates) {
        const scores = this.readFile(TECH_FILE);
        const index = scores.findIndex((s)=>s.id === id);
        if (index === -1) return null;
        scores[index] = {
            ...scores[index],
            ...updates
        };
        this.writeFile(TECH_FILE, scores);
        return scores[index];
    }
    async deleteTechScore(id) {
        const scores = this.readFile(TECH_FILE);
        const filtered = scores.filter((s)=>s.id !== id);
        if (filtered.length === scores.length) return false;
        this.writeFile(TECH_FILE, filtered);
        return true;
    }
}
const localStorage = new LocalStorageService();
}),
"[project]/src/app/api/tech-scores/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DELETE": ()=>DELETE,
    "GET": ()=>GET,
    "PATCH": ()=>PATCH,
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$localStorage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/localStorage.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$localStorage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localStorage"].getTechScores();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err instanceof Error ? err.message : 'Unknown error',
            details: 'GET /api/tech-scores failed'
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$localStorage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localStorage"].addTechScore(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err instanceof Error ? err.message : 'Unknown error',
            details: 'POST /api/tech-scores failed'
        }, {
            status: 500
        });
    }
}
async function PATCH(req) {
    try {
        const { id, ...fields } = await req.json();
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$localStorage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localStorage"].updateTechScore(id, fields);
        if (!data) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Score not found'
        }, {
            status: 404
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err instanceof Error ? err.message : 'Unknown error',
            details: 'PATCH /api/tech-scores failed'
        }, {
            status: 500
        });
    }
}
async function DELETE(req) {
    try {
        const { id } = await req.json();
        const success = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$localStorage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localStorage"].deleteTechScore(id);
        if (!success) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Score not found'
        }, {
            status: 404
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err instanceof Error ? err.message : 'Unknown error',
            details: 'DELETE /api/tech-scores failed'
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__0209b956._.js.map