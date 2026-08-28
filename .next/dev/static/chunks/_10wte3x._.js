(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/providers/ClientProviders.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientProviders",
    ()=>ClientProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function ClientProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/components/providers/ClientProviders.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/providers/ClientProviders.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = ClientProviders;
var _c;
__turbopack_context__.k.register(_c, "ClientProviders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ToastProvider({ children }) {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[toast]": (message, type = 'info')=>{
            const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
            setToasts({
                "ToastProvider.useCallback[toast]": (prev)=>[
                        ...prev,
                        {
                            id,
                            message,
                            type
                        }
                    ]
            }["ToastProvider.useCallback[toast]"]);
            setTimeout({
                "ToastProvider.useCallback[toast]": ()=>{
                    setToasts({
                        "ToastProvider.useCallback[toast]": (prev)=>prev.filter({
                                "ToastProvider.useCallback[toast]": (t)=>t.id !== id
                            }["ToastProvider.useCallback[toast]"])
                    }["ToastProvider.useCallback[toast]"]);
                }
            }["ToastProvider.useCallback[toast]"], 4000);
        }
    }["ToastProvider.useCallback[toast]"], []);
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            toast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full",
                children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all text-sm', t.type === 'success' && 'bg-[#151A18]/95 border-[#3FAF72]/40 text-[#52C585]', t.type === 'error' && 'bg-[#151A18]/95 border-red-500/40 text-red-300', t.type === 'info' && 'bg-[#151A18]/95 border-[#272D2A] text-[#F5F3EF]'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    t.type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-4 h-4 text-[#3FAF72] shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Toast.tsx",
                                        lineNumber: 52,
                                        columnNumber: 40
                                    }, this),
                                    t.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-4 h-4 text-red-400 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Toast.tsx",
                                        lineNumber: 53,
                                        columnNumber: 38
                                    }, this),
                                    t.type === 'info' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                        className: "w-4 h-4 text-[#D99A52] shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Toast.tsx",
                                        lineNumber: 54,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: t.message
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/Toast.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/Toast.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>removeToast(t.id),
                                className: "text-[#A8AAA5] hover:text-[#F5F3EF] p-1 cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/Toast.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/Toast.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(ToastProvider, "OPZKGrTNnwp+klP+pH502F/rcGc=");
_c = ToastProvider;
function useToast() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
_s1(useToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/firebase-applet-config.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "projectId": "saisa-motors",
    "appId": "1:580628464970:web:6e993e3fdc839a9f92edb3",
    "apiKey": "AIzaSyCC7eKCRaHRYBrMj46_wpbFifVag4HL55s",
    "authDomain": "saisa-motors.firebaseapp.com",
    "firestoreDatabaseId": "ai-studio-moyo-af7f00be-46d4-4a75-a9dd-502cbe7b1b7c",
    "storageBucket": "saisa-motors.firebasestorage.app",
    "messagingSenderId": "580628464970",
    "measurementId": "",
    "oAuthClientId": "580628464970-dnav8te2g5k03fhivvhl0jop5niij1n3.apps.googleusercontent.com",
    "recaptchaSiteKey": ""
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$__as__onAuthStateChanged$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-CvXU3_1x.js [app-client] (ecmascript) <export _ as onAuthStateChanged>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__af__as__signInWithEmailAndPassword$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-CvXU3_1x.js [app-client] (ecmascript) <export af as signInWithEmailAndPassword>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__x__as__createUserWithEmailAndPassword$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-CvXU3_1x.js [app-client] (ecmascript) <export x as createUserWithEmailAndPassword>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ak__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-CvXU3_1x.js [app-client] (ecmascript) <export ak as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a9__as__sendPasswordResetEmail$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-CvXU3_1x.js [app-client] (ecmascript) <export a9 as sendPasswordResetEmail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export v as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/kenyanProfiles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEYS = {
    CURRENT_USER: 'jambodate_current_user',
    ALL_PROFILES: 'jambodate_all_profiles',
    LIKES: 'jambodate_likes',
    PASSES: 'jambodate_passes',
    MATCHES: 'jambodate_matches',
    MESSAGES: 'jambodate_messages',
    REPORTS: 'jambodate_reports',
    BLOCKS: 'jambodate_blocks',
    VERIFICATIONS: 'jambodate_verifications',
    PREFERENCES: 'jambodate_preferences',
    USER_ACCOUNT: 'jambodate_user_account'
};
function AuthProvider({ children }) {
    _s();
    const [firebaseUser, setFirebaseUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userAccount, setUserAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userPreferences, setUserPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [authError, setAuthError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Social & Matching state
    const [allProfiles, setAllProfiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_KENYAN_PROFILES"]);
    const [likes, setLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'user_amina'
    ]);
    const [passes, setPasses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [reports, setReports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [verificationRequests, setVerificationRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentMatchCelebration, setCurrentMatchCelebration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Test connection to Firestore on initialization
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            async function testConnection() {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocFromServer"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'test', 'connection'));
                } catch (error) {
                    if (error instanceof Error && error.message.includes('the client is offline')) {
                        console.error('Please check your Firebase configuration.');
                    }
                }
            }
            testConnection();
        }
    }["AuthProvider.useEffect"], []);
    // Hydrate initial mock/community data and state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            try {
                const storedProfiles = localStorage.getItem(STORAGE_KEYS.ALL_PROFILES);
                if (storedProfiles) {
                    setAllProfiles(JSON.parse(storedProfiles));
                } else {
                    setAllProfiles(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_KENYAN_PROFILES"]);
                }
                const storedLikes = localStorage.getItem(STORAGE_KEYS.LIKES);
                if (storedLikes) setLikes(JSON.parse(storedLikes));
                const storedPasses = localStorage.getItem(STORAGE_KEYS.PASSES);
                if (storedPasses) setPasses(JSON.parse(storedPasses));
                const storedMatches = localStorage.getItem(STORAGE_KEYS.MATCHES);
                const storedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
                if (storedMatches && storedMessages) {
                    setMatches(JSON.parse(storedMatches));
                    setMessages(JSON.parse(storedMessages));
                } else {
                    const initialMatchId = 'match_james_wangari';
                    const initialMatch = {
                        id: initialMatchId,
                        users: [
                            'user_current',
                            'user_wangari'
                        ],
                        lastMessage: 'Karibu JamboDate! Would love to hear about your Karura trails.',
                        lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
                        lastMessageSenderId: 'user_wangari',
                        createdAt: new Date(Date.now() - 86400000).toISOString(),
                        unreadCountByUser: {
                            user_current: 1
                        }
                    };
                    const initialMsgs = [
                        {
                            id: 'msg_1',
                            matchId: initialMatchId,
                            senderId: 'user_current',
                            recipientId: 'user_wangari',
                            text: 'Habari Wangari! Loved your note on Chemex brews. Have you tried the washed beans from Nyeri?',
                            createdAt: new Date(Date.now() - 7200000).toISOString(),
                            isRead: true
                        },
                        {
                            id: 'msg_2',
                            matchId: initialMatchId,
                            senderId: 'user_wangari',
                            recipientId: 'user_current',
                            text: 'Habari James! Yes! The SL-28 lot from Othaya is exceptional. What are your favorite trails at Karura?',
                            createdAt: new Date(Date.now() - 3600000).toISOString(),
                            isRead: false
                        }
                    ];
                    setMatches([
                        initialMatch
                    ]);
                    setMessages({
                        [initialMatchId]: initialMsgs
                    });
                }
                const storedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
                if (storedReports) setReports(JSON.parse(storedReports));
                const storedBlocks = localStorage.getItem(STORAGE_KEYS.BLOCKS);
                if (storedBlocks) setBlocks(JSON.parse(storedBlocks));
                const storedVerifications = localStorage.getItem(STORAGE_KEYS.VERIFICATIONS);
                if (storedVerifications) setVerificationRequests(JSON.parse(storedVerifications));
            } catch (e) {
                console.error('Error hydrating social state', e);
            }
        }
    }["AuthProvider.useEffect"], []);
    // Listen to Firebase Auth state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            let unsubscribeProfile = null;
            let unsubscribePrefs = null;
            const unsubscribeAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$__as__onAuthStateChanged$3e$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], {
                "AuthProvider.useEffect.unsubscribeAuth": async (user)=>{
                    setFirebaseUser(user);
                    if (user) {
                        try {
                            // 1. Fetch or listen to Firestore profile: /profiles/{uid}
                            const profileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'profiles', user.uid);
                            unsubscribeProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(profileRef, {
                                "AuthProvider.useEffect.unsubscribeAuth": (snapshot)=>{
                                    if (snapshot.exists()) {
                                        const data = snapshot.data();
                                        setCurrentUser(data);
                                        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data));
                                    } else {
                                        // If profile document hasn't been created yet, fall back to locally stored or new placeholder
                                        const localUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
                                        if (localUser) {
                                            try {
                                                const parsed = JSON.parse(localUser);
                                                if (parsed.uid === user.uid || parsed.id === user.uid) {
                                                    setCurrentUser(parsed);
                                                }
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }
                                    }
                                }
                            }["AuthProvider.useEffect.unsubscribeAuth"], {
                                "AuthProvider.useEffect.unsubscribeAuth": (error)=>{
                                    console.warn('Profile snapshot error:', error);
                                }
                            }["AuthProvider.useEffect.unsubscribeAuth"]);
                            // 2. Fetch or listen to User Preferences: /preferences/{uid}
                            const prefsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'preferences', user.uid);
                            unsubscribePrefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(prefsRef, {
                                "AuthProvider.useEffect.unsubscribeAuth": (snapshot)=>{
                                    if (snapshot.exists()) {
                                        setUserPreferences(snapshot.data());
                                    }
                                }
                            }["AuthProvider.useEffect.unsubscribeAuth"], {
                                "AuthProvider.useEffect.unsubscribeAuth": (error)=>{
                                    console.warn('Preferences snapshot error:', error);
                                }
                            }["AuthProvider.useEffect.unsubscribeAuth"]);
                            // 3. Fetch private user doc: /users/{uid}
                            try {
                                const userSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', user.uid));
                                if (userSnap.exists()) {
                                    setUserAccount(userSnap.data());
                                }
                            } catch (err) {
                                console.warn('Users collection read error:', err);
                            }
                        } catch (err) {
                            console.error('Error attaching user listeners:', err);
                        } finally{
                            setIsLoading(false);
                        }
                    } else {
                        // No Firebase user authenticated
                        // Check if there is a demo user active in localStorage
                        const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
                        if (storedUser) {
                            try {
                                const parsed = JSON.parse(storedUser);
                                // If it's a demo account (e.g. user_current, user_wangari), keep it active for testing
                                if (parsed.id?.startsWith('user_')) {
                                    setCurrentUser(parsed);
                                } else {
                                    setCurrentUser(null);
                                }
                            } catch  {
                                setCurrentUser(null);
                            }
                        } else {
                            // Default to James Mugambi for initial preview if no user exists
                            setCurrentUser(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_CURRENT_USER"]);
                            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_CURRENT_USER"]));
                        }
                        setIsLoading(false);
                    }
                }
            }["AuthProvider.useEffect.unsubscribeAuth"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    unsubscribeAuth();
                    if (unsubscribeProfile) unsubscribeProfile();
                    if (unsubscribePrefs) unsubscribePrefs();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    // Save social state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (!isLoading) {
                localStorage.setItem(STORAGE_KEYS.ALL_PROFILES, JSON.stringify(allProfiles));
                localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
                localStorage.setItem(STORAGE_KEYS.PASSES, JSON.stringify(passes));
                localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
                localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
                localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
                localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify(blocks));
                localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verificationRequests));
            }
        }
    }["AuthProvider.useEffect"], [
        allProfiles,
        likes,
        passes,
        matches,
        messages,
        reports,
        blocks,
        verificationRequests,
        isLoading
    ]);
    // Profile completion calculation
    const profileCompletion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateProfileCompletion"])(currentUser, userPreferences);
    // 1. Registration with Email, Password & Kenyan Verification
    const registerWithEmail = async (data)=>{
        setAuthError(null);
        // Strict 18+ enforcement
        if (!data.birthDate || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAdult"])(data.birthDate)) {
            const errorMsg = 'JamboDate is strictly for adults aged 18 and older. Underage profiles are not permitted.';
            setAuthError(errorMsg);
            throw new Error(errorMsg);
        }
        if (!data.firstName.trim() || !data.email.trim() || !data.password) {
            const errorMsg = 'Please complete all required registration fields.';
            setAuthError(errorMsg);
            throw new Error(errorMsg);
        }
        try {
            // 1. Create Firebase Auth user
            const credential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__x__as__createUserWithEmailAndPassword$3e$__["createUserWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], data.email.trim(), data.password);
            const uid = credential.user.uid;
            const calculatedAge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAge"])(data.birthDate);
            // 2. Create private user document in `users/{uid}` (PII isolation)
            const privateUserRecord = {
                uid,
                email: data.email.trim().toLowerCase(),
                firstName: data.firstName.trim(),
                birthDate: data.birthDate,
                gender: data.gender,
                county: data.county,
                phone: data.phone || '',
                agreedToTerms: true,
                agreedToPrivacy: true,
                agreedToGuidelines: true,
                onboardingCompleted: false,
                createdAt: new Date().toISOString()
            };
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', uid), privateUserRecord);
            } catch (err) {
                console.error('Error saving users record:', err);
            }
            // 3. Create initial public profile in `profiles/{uid}`
            const initialProfile = {
                id: uid,
                uid,
                name: data.firstName.trim(),
                age: calculatedAge,
                birthDate: data.birthDate,
                gender: data.gender,
                location: data.county,
                relationshipIntention: 'Serious relationship',
                bio: '',
                occupation: '',
                education: '',
                languages: [
                    'English',
                    'Swahili'
                ],
                interests: [],
                lifestyle: {},
                photos: [],
                verificationStatus: 'unverified',
                subscriptionTier: 'free',
                completionPercentage: 25,
                onboardingCompleted: false,
                isOnline: true,
                lastActive: 'Just now',
                createdAt: new Date().toISOString()
            };
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'profiles', uid), initialProfile);
            } catch (err) {
                console.error('Error saving profile record:', err);
            }
            // 4. Create default matching preferences in `preferences/{uid}`
            const initialPrefs = {
                uid,
                ageRange: [
                    Math.max(18, calculatedAge - 5),
                    calculatedAge + 7
                ],
                genderPreference: data.gender === 'Man' ? [
                    'Woman'
                ] : [
                    'Man'
                ],
                preferredLocation: data.county,
                relationshipIntentions: [
                    'Serious relationship',
                    'Marriage'
                ],
                verifiedOnly: false,
                updatedAt: new Date().toISOString()
            };
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'preferences', uid), initialPrefs);
            } catch (err) {
                console.error('Error saving preferences record:', err);
            }
            // Set local state
            setCurrentUser(initialProfile);
            setUserAccount(privateUserRecord);
            setUserPreferences(initialPrefs);
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(initialProfile));
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Registration failed';
            setAuthError(message);
            throw err;
        }
    };
    // 2. Email / Password Login
    const loginWithEmail = async (email, password)=>{
        setAuthError(null);
        // Fast-path demo users for instantaneous local testing if demo credentials provided
        if (password === 'demo' || !password || email.includes('demo') || email.includes('example.com')) {
            if (email.toLowerCase().includes('wangari')) {
                const wangari = allProfiles.find((p)=>p.id === 'user_wangari') || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_KENYAN_PROFILES"][0];
                setCurrentUser(wangari);
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(wangari));
                return true;
            }
            if (email.toLowerCase().includes('brian')) {
                const brian = allProfiles.find((p)=>p.id === 'user_brian') || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_KENYAN_PROFILES"][1];
                setCurrentUser(brian);
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(brian));
                return true;
            }
            if (email.toLowerCase().includes('james')) {
                setCurrentUser(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_CURRENT_USER"]);
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_CURRENT_USER"]));
                return true;
            }
        }
        try {
            const pwd = password || 'password123';
            const cred = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__af__as__signInWithEmailAndPassword$3e$__["signInWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], email.trim(), pwd);
            const uid = cred.user.uid;
            // Fetch profile
            try {
                const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'profiles', uid));
                if (snap.exists()) {
                    const profile = snap.data();
                    setCurrentUser(profile);
                    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
                }
            } catch (err) {
                console.warn('Error reading profile doc:', err);
            }
            return true;
        } catch (err) {
            // If user doesn't exist in Firebase yet but email is a demo user, let them in
            if (email.toLowerCase().includes('james') || email.toLowerCase().includes('wangari')) {
                const profile = email.toLowerCase().includes('wangari') ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_KENYAN_PROFILES"][0] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_CURRENT_USER"];
                setCurrentUser(profile);
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
                return true;
            }
            const message = err instanceof Error ? err.message : 'Login failed';
            setAuthError(message);
            throw err;
        }
    };
    // 3. Password Reset
    const sendPasswordReset = async (email)=>{
        if (!email.trim()) {
            throw new Error('Please enter your email address to reset password.');
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a9__as__sendPasswordResetEmail$3e$__["sendPasswordResetEmail"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], email.trim());
    };
    // 4. Logout
    const logout = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ak__as__signOut$3e$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
        } catch (e) {
            console.warn('SignOut error:', e);
        }
        setCurrentUser(null);
        setUserAccount(null);
        setUserPreferences(null);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    };
    // 5. Switch Demo Account (Testing helper)
    const switchUser = (profileId)=>{
        if (profileId === 'user_current') {
            setCurrentUser(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_CURRENT_USER"]);
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$kenyanProfiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_CURRENT_USER"]));
            return;
        }
        const found = allProfiles.find((p)=>p.id === profileId);
        if (found) {
            setCurrentUser(found);
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(found));
        }
    };
    // 6. Update Profile
    const updateProfile = async (data)=>{
        if (!currentUser) return;
        const updated = {
            ...currentUser,
            ...data,
            updatedAt: new Date().toISOString()
        };
        setCurrentUser(updated);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
        setAllProfiles((prev)=>prev.map((p)=>p.id === updated.id ? updated : p));
        if (firebaseUser?.uid && (currentUser.uid === firebaseUser.uid || currentUser.id === firebaseUser.uid)) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'profiles', firebaseUser.uid), data, {
                    merge: true
                });
            } catch (error) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleFirestoreError"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationType"].UPDATE, `profiles/${firebaseUser.uid}`);
            }
        }
    };
    // 7. Update Preferences
    const updatePreferences = async (data)=>{
        const updated = {
            ageRange: data.ageRange || userPreferences?.ageRange || [
                21,
                35
            ],
            genderPreference: data.genderPreference || userPreferences?.genderPreference || [
                'Woman'
            ],
            preferredLocation: data.preferredLocation || userPreferences?.preferredLocation || 'Any',
            relationshipIntentions: data.relationshipIntentions || userPreferences?.relationshipIntentions || [
                'Serious relationship'
            ],
            verifiedOnly: data.verifiedOnly ?? userPreferences?.verifiedOnly ?? false,
            updatedAt: new Date().toISOString()
        };
        setUserPreferences(updated);
        if (firebaseUser?.uid) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'preferences', firebaseUser.uid), updated, {
                    merge: true
                });
            } catch (error) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleFirestoreError"])(error, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OperationType"].UPDATE, `preferences/${firebaseUser.uid}`);
            }
        }
    };
    // 8. Photo Upload with Firebase Storage
    const uploadPhoto = async (file, index)=>{
        const uid = firebaseUser?.uid || currentUser?.uid || 'user_demo';
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const storagePath = `users/${uid}/photos/${timestamp}_${cleanName}`;
        try {
            // 1. Try Firebase Storage upload
            const storageReference = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"], storagePath);
            const uploadResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadBytes"])(storageReference, file);
            const downloadUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDownloadURL"])(uploadResult.ref);
            // 2. Create photo document in `photos` collection
            if (firebaseUser?.uid) {
                const photoDocId = `photo_${timestamp}_${Math.random().toString(36).slice(2, 6)}`;
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'photos', photoDocId), {
                        id: photoDocId,
                        userId: uid,
                        url: downloadUrl,
                        storagePath,
                        orderIndex: index,
                        isPrimary: index === 0,
                        createdAt: new Date().toISOString()
                    });
                } catch (err) {
                    console.warn('Error writing photo document:', err);
                }
            }
            return downloadUrl;
        } catch (storageError) {
            console.warn('Firebase Storage upload notice, using optimized client fallback:', storageError);
            // Fallback to high-quality compressed Data URL so user is never blocked
            return new Promise((resolve, reject)=>{
                const reader = new FileReader();
                reader.onload = ()=>{
                    const resultUrl = reader.result;
                    resolve(resultUrl);
                };
                reader.onerror = (e)=>reject(e);
                reader.readAsDataURL(file);
            });
        }
    };
    // 9. Complete Onboarding
    const completeOnboarding = async (profileData, prefsData)=>{
        if (!currentUser) return;
        const completion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateProfileCompletion"])({
            ...currentUser,
            ...profileData
        }, prefsData ? {
            ...userPreferences,
            ...prefsData
        } : userPreferences);
        const mergedProfile = {
            ...currentUser,
            ...profileData,
            onboardingCompleted: true,
            completionPercentage: completion.percentage,
            updatedAt: new Date().toISOString()
        };
        setCurrentUser(mergedProfile);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mergedProfile));
        setAllProfiles((prev)=>prev.map((p)=>p.id === mergedProfile.id ? mergedProfile : p));
        const uid = firebaseUser?.uid || (currentUser.id.startsWith('user_') ? null : currentUser.id);
        if (uid) {
            try {
                // Save to profiles
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'profiles', uid), {
                    ...profileData,
                    onboardingCompleted: true,
                    completionPercentage: completion.percentage,
                    updatedAt: new Date().toISOString()
                }, {
                    merge: true
                });
                // Update users table onboarding status
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', uid), {
                    onboardingCompleted: true,
                    updatedAt: new Date().toISOString()
                });
                // Save preferences
                if (prefsData) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'preferences', uid), {
                        ...prefsData,
                        updatedAt: new Date().toISOString()
                    }, {
                        merge: true
                    });
                }
            } catch (err) {
                console.error('Error updating onboarding in Firestore:', err);
            }
        }
    };
    // Social / Discovery actions
    const clearMatchCelebration = ()=>setCurrentMatchCelebration(null);
    const likeProfile = async (targetProfileId)=>{
        if (!currentUser) return {
            isMatch: false
        };
        if (!likes.includes(targetProfileId)) {
            setLikes((prev)=>[
                    ...prev,
                    targetProfileId
                ]);
        }
        const targetProfile = allProfiles.find((p)=>p.id === targetProfileId);
        const isMutualCandidate = [
            'user_wangari',
            'user_brian',
            'user_sharon',
            'user_faith',
            'user_kevin'
        ].includes(targetProfileId);
        if (isMutualCandidate && targetProfile) {
            const matchId = `match_${currentUser.id}_${targetProfile.id}`;
            const alreadyMatched = matches.some((m)=>m.users.includes(currentUser.id) && m.users.includes(targetProfile.id));
            if (!alreadyMatched) {
                const newMatch = {
                    id: matchId,
                    users: [
                        currentUser.id,
                        targetProfile.id
                    ],
                    lastMessage: `You matched with ${targetProfile.name}! Say habari.`,
                    lastMessageAt: new Date().toISOString(),
                    lastMessageSenderId: targetProfile.id,
                    createdAt: new Date().toISOString(),
                    unreadCountByUser: {
                        [currentUser.id]: 0
                    }
                };
                setMatches((prev)=>[
                        newMatch,
                        ...prev
                    ]);
                setMessages((prev)=>({
                        ...prev,
                        [matchId]: [
                            {
                                id: `msg_welcome_${Date.now()}`,
                                matchId,
                                senderId: targetProfile.id,
                                recipientId: currentUser.id,
                                text: `Habari! It's so lovely to connect with you. How is your day going?`,
                                createdAt: new Date().toISOString(),
                                isRead: false
                            }
                        ]
                    }));
                setCurrentMatchCelebration(targetProfile);
                return {
                    isMatch: true,
                    matchedProfile: targetProfile
                };
            }
        }
        return {
            isMatch: false
        };
    };
    const passProfile = (targetProfileId)=>{
        if (!passes.includes(targetProfileId)) {
            setPasses((prev)=>[
                    ...prev,
                    targetProfileId
                ]);
        }
    };
    const sendMessage = (matchId, text)=>{
        if (!currentUser || !text.trim()) return;
        const match = matches.find((m)=>m.id === matchId);
        if (!match) return;
        const recipientId = match.users.find((u)=>u !== currentUser.id) || '';
        const newMsg = {
            id: `msg_${Date.now()}`,
            matchId,
            senderId: currentUser.id,
            recipientId,
            text: text.trim(),
            createdAt: new Date().toISOString(),
            isRead: false
        };
        setMessages((prev)=>({
                ...prev,
                [matchId]: [
                    ...prev[matchId] || [],
                    newMsg
                ]
            }));
        setMatches((prev)=>prev.map((m)=>m.id === matchId ? {
                    ...m,
                    lastMessage: text.trim(),
                    lastMessageAt: new Date().toISOString(),
                    lastMessageSenderId: currentUser.id
                } : m));
        // Friendly realistic automated simulated response for demo accounts
        setTimeout(()=>{
            const recipientProfile = allProfiles.find((p)=>p.id === recipientId);
            if (recipientProfile) {
                const sampleReplies = [
                    `Asante! That's really thoughtful. I completely agree with your perspective.`,
                    `Haha, definitely! Traffic on Waiyaki Way was crazy today though, hope yours was better!`,
                    `That sounds wonderful. Have you lived in Nairobi long?`,
                    `I love that. Quality time and mutual respect are everything.`,
                    `Would love to hear more over coffee sometime this weekend!`
                ];
                const randomReply = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
                const autoMsg = {
                    id: `msg_reply_${Date.now()}`,
                    matchId,
                    senderId: recipientId,
                    recipientId: currentUser.id,
                    text: randomReply,
                    createdAt: new Date().toISOString(),
                    isRead: false
                };
                setMessages((prev)=>({
                        ...prev,
                        [matchId]: [
                            ...prev[matchId] || [],
                            autoMsg
                        ]
                    }));
                setMatches((prev)=>prev.map((m)=>m.id === matchId ? {
                            ...m,
                            lastMessage: randomReply,
                            lastMessageAt: new Date().toISOString(),
                            lastMessageSenderId: recipientId,
                            unreadCountByUser: {
                                ...m.unreadCountByUser,
                                [currentUser.id]: (m.unreadCountByUser?.[currentUser.id] || 0) + 1
                            }
                        } : m));
            }
        }, 2200);
    };
    const blockUser = (targetProfileId)=>{
        if (!blocks.includes(targetProfileId)) {
            setBlocks((prev)=>[
                    ...prev,
                    targetProfileId
                ]);
        }
        setMatches((prev)=>prev.filter((m)=>!m.users.includes(targetProfileId)));
    };
    const reportUser = (targetProfileId, reason, details)=>{
        if (!currentUser) return;
        const targetProfile = allProfiles.find((p)=>p.id === targetProfileId);
        const newReport = {
            id: `rep_${Date.now()}`,
            reporterId: currentUser.id,
            reporterName: currentUser.name,
            reportedUserId: targetProfileId,
            reportedUserName: targetProfile ? targetProfile.name : 'Unknown User',
            reason,
            details,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        setReports((prev)=>[
                newReport,
                ...prev
            ]);
        blockUser(targetProfileId);
    };
    const unmatchUser = (matchId)=>{
        setMatches((prev)=>prev.filter((m)=>m.id !== matchId));
    };
    const requestVerification = (selfieUrl, idDocumentUrl)=>{
        if (!currentUser) return;
        const newReq = {
            id: `ver_req_${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            userPhoto: currentUser.photos[0] || '',
            selfieUrl,
            idDocumentUrl,
            submittedAt: new Date().toISOString(),
            status: 'pending'
        };
        setVerificationRequests((prev)=>[
                newReq,
                ...prev
            ]);
        updateProfile({
            verificationStatus: 'pending'
        });
    };
    const adminApproveVerification = (requestId)=>{
        const req = verificationRequests.find((r)=>r.id === requestId);
        if (!req) return;
        setVerificationRequests((prev)=>prev.map((r)=>r.id === requestId ? {
                    ...r,
                    status: 'verified'
                } : r));
        setAllProfiles((prev)=>prev.map((p)=>p.id === req.userId ? {
                    ...p,
                    verificationStatus: 'verified'
                } : p));
        if (currentUser && currentUser.id === req.userId) {
            setCurrentUser((prev)=>prev ? {
                    ...prev,
                    verificationStatus: 'verified'
                } : null);
        }
    };
    const adminRejectVerification = (requestId)=>{
        const req = verificationRequests.find((r)=>r.id === requestId);
        if (!req) return;
        setVerificationRequests((prev)=>prev.map((r)=>r.id === requestId ? {
                    ...r,
                    status: 'rejected'
                } : r));
        setAllProfiles((prev)=>prev.map((p)=>p.id === req.userId ? {
                    ...p,
                    verificationStatus: 'rejected'
                } : p));
    };
    const adminToggleSuspend = (userId)=>{
        setAllProfiles((prev)=>prev.map((p)=>p.id === userId ? {
                    ...p,
                    isSuspended: !p.isSuspended
                } : p));
    };
    const adminToggleBan = (userId)=>{
        setAllProfiles((prev)=>prev.map((p)=>p.id === userId ? {
                    ...p,
                    isBanned: !p.isBanned
                } : p));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            currentUser,
            firebaseUser,
            userAccount,
            userPreferences,
            profileCompletion,
            isLoading,
            authError,
            allProfiles,
            likes,
            passes,
            matches,
            messages,
            reports,
            blocks,
            verificationRequests,
            currentMatchCelebration,
            clearMatchCelebration,
            registerWithEmail,
            loginWithEmail,
            sendPasswordReset,
            logout,
            switchUser,
            updateProfile,
            updatePreferences,
            completeOnboarding,
            uploadPhoto,
            likeProfile,
            passProfile,
            sendMessage,
            blockUser,
            reportUser,
            unmatchUser,
            requestVerification,
            adminApproveVerification,
            adminRejectVerification,
            adminToggleSuspend,
            adminToggleBan
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/context/AuthContext.tsx",
        lineNumber: 911,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "MbjhH+0UOR7bOtxtWsx8qEEPKZU=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/kenyanProfiles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_CURRENT_USER",
    ()=>DEMO_CURRENT_USER,
    "INITIAL_KENYAN_PROFILES",
    ()=>INITIAL_KENYAN_PROFILES,
    "KENYAN_COUNTIES_CITIES",
    ()=>KENYAN_COUNTIES_CITIES,
    "KENYAN_LANGUAGES",
    ()=>KENYAN_LANGUAGES,
    "RELATIONSHIP_INTENTIONS",
    ()=>RELATIONSHIP_INTENTIONS,
    "SAMPLE_INTERESTS",
    ()=>SAMPLE_INTERESTS
]);
const INITIAL_KENYAN_PROFILES = [
    {
        id: 'user_wangari',
        uid: 'user_wangari',
        name: 'Wangari Kamau',
        age: 28,
        birthDate: '1998-04-14',
        gender: 'Woman',
        location: 'Nairobi (Kilimani / Kileleshwa)',
        relationshipIntention: 'Serious relationship',
        bio: 'Fintech product lead by day, weekend hiker in Karura Forest. Looking for someone grounded, ambitious, and quick with thoughtful conversation over a good Chemex brew.',
        occupation: 'Senior Product Manager at Pesalink',
        education: 'BSc Computer Science, University of Nairobi',
        languages: [
            'English',
            'Swahili',
            'Kikuyu'
        ],
        interests: [
            'Karura Trail Running',
            'African Literature',
            'Coffee Brewing',
            'Acoustic Soul',
            'Pottery'
        ],
        lifestyle: {
            drinking: 'Socially',
            smoking: 'Non-smoker',
            workout: 'Active daily',
            kids: 'Want someday',
            religion: 'Christian'
        },
        photos: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'verified',
        subscriptionTier: 'gold',
        isOnline: true,
        lastActive: 'Just now',
        compatibility: 94,
        createdAt: '2026-01-15T08:00:00.000Z'
    },
    {
        id: 'user_brian',
        uid: 'user_brian',
        name: 'Brian Otieno',
        age: 31,
        birthDate: '1995-09-20',
        gender: 'Man',
        location: 'Nairobi (Westlands)',
        relationshipIntention: 'Marriage',
        bio: 'Architect working on sustainable urban spaces. Passionate about Kenyan heritage, jazz at the Alchemist, and road trips down to Amboseli. Seeking a partner to build a meaningful future together.',
        occupation: 'Architectural Director',
        education: 'M.Arch, JKUAT',
        languages: [
            'English',
            'Swahili',
            'Luo'
        ],
        interests: [
            'Sustainable Architecture',
            'Jazz & Benga',
            'Road Trips',
            'Culinary Arts',
            'Cycling'
        ],
        lifestyle: {
            drinking: 'Socially',
            smoking: 'Non-smoker',
            workout: 'Often',
            kids: 'Want someday',
            religion: 'Christian'
        },
        photos: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'verified',
        subscriptionTier: 'plus',
        isOnline: true,
        lastActive: '5m ago',
        compatibility: 89,
        createdAt: '2026-02-01T10:00:00.000Z'
    },
    {
        id: 'user_amina',
        uid: 'user_amina',
        name: 'Amina Hassan',
        age: 26,
        birthDate: '2000-02-18',
        gender: 'Woman',
        location: 'Mombasa (Nyali)',
        relationshipIntention: 'Dating',
        bio: 'Marine conservation biologist studying coral restoration along the Swahili coast. Sunrise paddle-boarder, biryani connoisseur, and collector of vintage records.',
        occupation: 'Marine Ecologist at KMFRI',
        education: 'MSc Marine Sciences, Pwani University',
        languages: [
            'English',
            'Swahili',
            'Arabic'
        ],
        interests: [
            'Scuba Diving',
            'Swahili Cuisine',
            'Coastal Ecology',
            'Photography',
            'Vinyl Records'
        ],
        lifestyle: {
            drinking: 'Never',
            smoking: 'Non-smoker',
            workout: 'Active daily',
            kids: 'Want someday',
            religion: 'Muslim'
        },
        photos: [
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'verified',
        subscriptionTier: 'free',
        isOnline: false,
        lastActive: '1h ago',
        compatibility: 86,
        createdAt: '2026-02-10T12:00:00.000Z'
    },
    {
        id: 'user_kevin',
        uid: 'user_kevin',
        name: 'Kevin Mutua',
        age: 33,
        birthDate: '1993-06-11',
        gender: 'Man',
        location: 'Nairobi (Karen / Langata)',
        relationshipIntention: 'Marriage',
        bio: 'Agri-tech founder working with smallholder farmers across Rift Valley. Values integrity, quiet evenings by a fireplace, deep conversations, and laughter.',
        occupation: 'Founder & CEO, ShambaConnect',
        education: 'BSc Agribusiness & MBA, Strathmore University',
        languages: [
            'English',
            'Swahili',
            'Kamba'
        ],
        interests: [
            'Agri-innovation',
            'Trail Hiking',
            'Chess',
            'Kenyan History',
            'Farmer Markets'
        ],
        lifestyle: {
            drinking: 'Socially',
            smoking: 'Non-smoker',
            workout: 'Often',
            kids: 'Want someday',
            religion: 'Christian'
        },
        photos: [
            'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'verified',
        subscriptionTier: 'gold',
        isOnline: true,
        lastActive: 'Just now',
        compatibility: 91,
        createdAt: '2026-01-20T14:30:00.000Z'
    },
    {
        id: 'user_sharon',
        uid: 'user_sharon',
        name: 'Sharon Chebet',
        age: 29,
        birthDate: '1997-11-03',
        gender: 'Woman',
        location: 'Eldoret',
        relationshipIntention: 'Serious relationship',
        bio: 'Pediatric doctor with a heart for children healthcare in Western Kenya. Marathon enthusiast, book club organizer, and amateur baker. Looking for a partner who values family and shared faith.',
        occupation: 'Pediatrician, Moi Teaching & Referral Hospital',
        education: 'MBChB Medicine, Moi University',
        languages: [
            'English',
            'Swahili',
            'Kalenjin'
        ],
        interests: [
            'Distance Running',
            'Baking Sourdough',
            'Book Clubs',
            'Medical Missions',
            'Gardening'
        ],
        lifestyle: {
            drinking: 'Never',
            smoking: 'Non-smoker',
            workout: 'Active daily',
            kids: 'Want someday',
            religion: 'Christian'
        },
        photos: [
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'verified',
        subscriptionTier: 'plus',
        isOnline: false,
        lastActive: '3h ago',
        compatibility: 88,
        createdAt: '2026-02-05T09:15:00.000Z'
    },
    {
        id: 'user_dennis',
        uid: 'user_dennis',
        name: 'Dennis Kipchoge',
        age: 30,
        birthDate: '1996-03-25',
        gender: 'Man',
        location: 'Nakuru (Milimani / Town)',
        relationshipIntention: 'Serious relationship',
        bio: 'Renewable energy engineer focusing on geothermal power in Olkaria. Nature lover, amateur landscape photographer, and weekend camper around Lake Elementaita.',
        occupation: 'Geothermal Systems Engineer',
        education: 'BSc Electrical Engineering, Egerton University',
        languages: [
            'English',
            'Swahili',
            'Kalenjin'
        ],
        interests: [
            'Landscape Photography',
            'Camping',
            'Clean Energy',
            'Barbecue Nights',
            'Acoustic Guitar'
        ],
        lifestyle: {
            drinking: 'Socially',
            smoking: 'Non-smoker',
            workout: 'Often',
            kids: 'Want someday',
            religion: 'Christian'
        },
        photos: [
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'verified',
        subscriptionTier: 'free',
        isOnline: true,
        lastActive: '12m ago',
        compatibility: 83,
        createdAt: '2026-02-12T16:45:00.000Z'
    },
    {
        id: 'user_faith',
        uid: 'user_faith',
        name: 'Faith Achieng',
        age: 27,
        birthDate: '1999-07-19',
        gender: 'Woman',
        location: 'Kisumu (Milimani)',
        relationshipIntention: 'Marriage',
        bio: 'Attorney practicing civil litigation and human rights advocacy. Lake Victoria sunset admirer, board game strategist, and firm believer in emotional maturity and reciprocity.',
        occupation: 'Advocate of the High Court of Kenya',
        education: 'LL.B, University of Nairobi / Kenya School of Law',
        languages: [
            'English',
            'Swahili',
            'Luo',
            'French'
        ],
        interests: [
            'Human Rights Law',
            'Lake Victoria Sailing',
            'Catan & Chess',
            'French Cinema',
            'Live Band Music'
        ],
        lifestyle: {
            drinking: 'Socially',
            smoking: 'Non-smoker',
            workout: 'Sometimes',
            kids: 'Want someday',
            religion: 'Christian'
        },
        photos: [
            'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'verified',
        subscriptionTier: 'plus',
        isOnline: true,
        lastActive: 'Just now',
        compatibility: 92,
        createdAt: '2026-01-28T11:20:00.000Z'
    },
    {
        id: 'user_david',
        uid: 'user_david',
        name: 'David Mwangi',
        age: 32,
        birthDate: '1994-01-30',
        gender: 'Man',
        location: 'Nairobi (CBD / Parklands)',
        relationshipIntention: 'Serious relationship',
        bio: 'Financial risk consultant by day, aspiring safari rally enthusiast by weekend. Looking for an authentic connection where we can celebrate each other’s wins and support each other through life’s hurdles.',
        occupation: 'Senior Risk Consultant at PwC Kenya',
        education: 'BSc Actuarial Science, Strathmore University',
        languages: [
            'English',
            'Swahili',
            'Kikuyu'
        ],
        interests: [
            'Motorsports',
            'Squash',
            'Financial Literacy',
            'Nyama Choma Grilling',
            'Podcasts'
        ],
        lifestyle: {
            drinking: 'Socially',
            smoking: 'Non-smoker',
            workout: 'Often',
            kids: 'Want someday',
            religion: 'Christian'
        },
        photos: [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
        ],
        verificationStatus: 'pending',
        subscriptionTier: 'free',
        isOnline: false,
        lastActive: '4h ago',
        compatibility: 85,
        createdAt: '2026-02-14T08:10:00.000Z'
    }
];
const DEMO_CURRENT_USER = {
    id: 'user_current',
    uid: 'user_current',
    name: 'James Mugambi',
    age: 29,
    birthDate: '1997-03-12',
    gender: 'Man',
    location: 'Nairobi (Kilimani / Kileleshwa)',
    relationshipIntention: 'Serious relationship',
    bio: 'Software engineer building technology for East Africa. Enjoys road biking in Ngong Hills, specialty Kenyan coffee, and good literature. Looking for someone genuine to share meaningful moments with.',
    occupation: 'Lead Software Engineer',
    education: 'BSc Software Engineering, Strathmore University',
    languages: [
        'English',
        'Swahili',
        'Meru'
    ],
    interests: [
        'Cycling',
        'Specialty Coffee',
        'Technology',
        'Hiking',
        'African History'
    ],
    lifestyle: {
        drinking: 'Socially',
        smoking: 'Non-smoker',
        workout: 'Active daily',
        kids: 'Want someday',
        religion: 'Christian'
    },
    photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'verified',
    subscriptionTier: 'plus',
    isOnline: true,
    lastActive: 'Just now',
    isAdmin: true,
    createdAt: '2026-01-01T00:00:00.000Z'
};
const KENYAN_COUNTIES_CITIES = [
    'Nairobi (Kilimani / Kileleshwa)',
    'Nairobi (Westlands)',
    'Nairobi (Karen / Langata)',
    'Nairobi (CBD / Parklands)',
    'Nairobi (Roysambu / Thika Road)',
    'Mombasa (Nyali)',
    'Mombasa (Old Town / Island)',
    'Kisumu (Milimani)',
    'Nakuru (Milimani / Town)',
    'Eldoret',
    'Machakos',
    'Naivasha',
    'Other'
];
const RELATIONSHIP_INTENTIONS = [
    'Marriage',
    'Serious relationship',
    'Dating',
    'Friendship'
];
const KENYAN_LANGUAGES = [
    'English',
    'Swahili',
    'Kikuyu',
    'Luo',
    'Luhya',
    'Kalenjin',
    'Kamba',
    'Kisii',
    'Meru',
    'Mijikenda',
    'Somali'
];
const SAMPLE_INTERESTS = [
    'Karura Trail Running',
    'Specialty Coffee',
    'Sustainable Architecture',
    'African Literature',
    'Live Benga & Jazz',
    'Hiking & Mount Kenya',
    'Cycling Ngong Hills',
    'Diani Beach & Coast',
    'Art Galleries & Theatre',
    'Nyama Choma Grilling',
    'Fintech & Innovation',
    'Photography'
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OperationType",
    ()=>OperationType,
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "firebaseApp",
    ()=>firebaseApp,
    "getFirebaseApp",
    ()=>getFirebaseApp,
    "getFirebaseAuth",
    ()=>getFirebaseAuth,
    "getFirebaseDb",
    ()=>getFirebaseDb,
    "getFirebaseStorage",
    ()=>getFirebaseStorage,
    "handleFirestoreError",
    ()=>handleFirestoreError,
    "isFirebaseConfigured",
    ()=>isFirebaseConfigured,
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-CvXU3_1x.js [app-client] (ecmascript) <export D as getAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aV__as__getFirestore$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aV as getFirestore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/firebase-applet-config.json.[json].cjs [app-client] (ecmascript)");
;
;
;
;
;
let app;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length > 0) {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])()[0];
} else {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(__TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
}
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aV__as__getFirestore$3e$__["getFirestore"])(app, __TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].firestoreDatabaseId);
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$CvXU3_1x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__getAuth$3e$__["getAuth"])(app);
const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStorage"])(app);
const firebaseApp = app;
var OperationType = /*#__PURE__*/ function(OperationType) {
    OperationType["CREATE"] = "create";
    OperationType["UPDATE"] = "update";
    OperationType["DELETE"] = "delete";
    OperationType["LIST"] = "list";
    OperationType["GET"] = "get";
    OperationType["WRITE"] = "write";
    return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
    const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        authInfo: {
            userId: auth?.currentUser?.uid,
            email: auth?.currentUser?.email,
            emailVerified: auth?.currentUser?.emailVerified,
            isAnonymous: auth?.currentUser?.isAnonymous
        },
        operationType,
        path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
}
function isFirebaseConfigured() {
    return Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].projectId && __TURBOPACK__imported__module__$5b$project$5d2f$firebase$2d$applet$2d$config$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].apiKey);
}
function getFirebaseApp() {
    return app;
}
function getFirebaseAuth() {
    return auth;
}
function getFirebaseDb() {
    return db;
}
function getFirebaseStorage() {
    return storage;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateAge",
    ()=>calculateAge,
    "calculateProfileCompletion",
    ()=>calculateProfileCompletion,
    "cn",
    ()=>cn,
    "formatTimeAgo",
    ()=>formatTimeAgo,
    "formatTimestamp",
    ()=>formatTimestamp,
    "isAdult",
    ()=>isAdult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function calculateAge(birthDateString) {
    if (!birthDateString) return 24;
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
        age--;
    }
    return age >= 0 ? age : 24;
}
function formatTimestamp(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-KE', {
        month: 'short',
        day: 'numeric'
    });
}
const formatTimeAgo = formatTimestamp;
function isAdult(birthDateString) {
    if (!birthDateString) return false;
    return calculateAge(birthDateString) >= 18;
}
function calculateProfileCompletion(profile, preferences) {
    if (!profile) {
        return {
            percentage: 0,
            completedCount: 0,
            totalCriteria: 10,
            missingFields: [
                'Basic details',
                'Photos',
                'Intention',
                'About you',
                'Lifestyle',
                'Preferences'
            ]
        };
    }
    const missing = [];
    let score = 0;
    // 1. Basic Info (Name, DOB 18+, Gender, Location) - 15 points
    if (profile.name?.trim() && profile.birthDate && profile.gender && profile.location) {
        score += 15;
    } else {
        missing.push('Basic identity & location');
    }
    // 2. Relationship Intention - 10 points
    if (profile.relationshipIntention?.trim()) {
        score += 10;
    } else {
        missing.push('Relationship intention');
    }
    // 3. Bio - 15 points
    if (profile.bio && profile.bio.trim().length >= 20) {
        score += 15;
    } else {
        missing.push('Personal bio (min 20 characters)');
    }
    // 4. Career & Education - 10 points
    if (profile.occupation?.trim() && profile.education?.trim()) {
        score += 10;
    } else if (profile.occupation?.trim() || profile.education?.trim()) {
        score += 5;
        missing.push('Occupation or education');
    } else {
        missing.push('Occupation and education');
    }
    // 5. Languages & Interests - 10 points
    const hasLanguages = profile.languages && profile.languages.length > 0;
    const hasInterests = profile.interests && profile.interests.length >= 2;
    if (hasLanguages && hasInterests) {
        score += 10;
    } else {
        missing.push('Languages and at least 2 interests');
    }
    // 6. Lifestyle Habits - 15 points
    const lifestyle = profile.lifestyle || {};
    let lifestyleCount = 0;
    if (lifestyle.children || lifestyle.wantChildren) lifestyleCount++;
    if (lifestyle.smoking) lifestyleCount++;
    if (lifestyle.drinking) lifestyleCount++;
    if (lifestyle.religion) lifestyleCount++;
    if (lifestyle.relationshipStatus) lifestyleCount++;
    if (lifestyleCount >= 4) {
        score += 15;
    } else if (lifestyleCount >= 2) {
        score += 10;
        missing.push('Complete all lifestyle answers');
    } else {
        missing.push('Lifestyle habits & family goals');
    }
    // 7. Dating Preferences - 10 points
    if (preferences?.genderPreference?.length || preferences?.relationshipIntentions?.length || preferences?.ageRange) {
        score += 10;
    } else {
        missing.push('Dating preferences');
    }
    // 8. Photos - 15 points
    const photoCount = profile.photos?.length || 0;
    if (photoCount >= 3) {
        score += 15;
    } else if (photoCount >= 1) {
        score += 10;
        missing.push('Add more photos (3+ recommended)');
    } else {
        missing.push('Upload profile photos');
    }
    const percentage = Math.min(100, Math.max(0, score));
    return {
        percentage,
        completedCount: Math.round(percentage / 100 * 8),
        totalCriteria: 8,
        missingFields: missing
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_10wte3x._.js.map