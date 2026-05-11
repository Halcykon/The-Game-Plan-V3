"use strict";
// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;
// ─── ROOT APP ────────────────────────────────────────────────────────────────
// NOTE: Storage uses the `tgp3_` prefix — that's the schema version (currently v3),
// independent of the source-file name (v2). clearIfStale() below wipes legacy keys
// when APP_VERSION changes. If you introduce a new state key, add it to BOTH the
// reset list AND the stale-key list and bump APP_VERSION.
const APP_VERSION = "10";
const LS_KEYS = [
    "tgp3_screen", "tgp3_nav_history", "tgp3_birth", "tgp3_included",
    "tgp3_custom", "tgp3_packed", "tgp3_bag_done",
    "tgp3_dad_name", "tgp3_partner_name", "tgp_tips_swiped"
];
const LEGACY_KEYS = ["tgp_screen", "tgp_birth", "tgp_bag", "tgp2_screen", "tgp2_birth", "tgp2_bag"];
// Storage helper — JSON-aware with try/catch + fallback.
function loadLS(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        if (v == null)
            return fallback;
        return JSON.parse(v);
    }
    catch {
        return fallback;
    }
}
function loadLSString(key, fallback = "") {
    var _a;
    return (_a = localStorage.getItem(key)) !== null && _a !== void 0 ? _a : fallback;
}
function clearIfStale() {
    if (localStorage.getItem("tgp_version") !== APP_VERSION) {
        [...LS_KEYS, ...LEGACY_KEYS].forEach((k) => localStorage.removeItem(k));
        localStorage.setItem("tgp_version", APP_VERSION);
    }
}
clearIfStale();
function App() {
    const [screen, setScreen] = useState(() => {
        const s = loadLSString("tgp3_screen", "home");
        return ["home", "birth", "birth-summary", "bag", "bag-summary"].includes(s) ? s : "home";
    });
    // Navigation history — persisted so refresh mid-flow preserves back semantics.
    const [navHistory, setNavHistory] = useState(() => {
        const h = loadLS("tgp3_nav_history", []);
        return Array.isArray(h) ? h.filter((s) => ["home", "birth", "birth-summary", "bag", "bag-summary"].includes(s)) : [];
    });
    useEffect(() => { localStorage.setItem("tgp3_nav_history", JSON.stringify(navHistory)); }, [navHistory]);
    // Push current screen onto history, then navigate.
    const navigate = (next) => { setNavHistory((h) => [...h, screen]); setScreen(next); };
    // Replace current screen + reset history (used after finish/onboarding flows).
    const navigateReplace = (next, history = []) => { setNavHistory(history); setScreen(next); };
    // Pop history; fall back to a default if empty.
    const goBackNav = (fallback = "home") => {
        setNavHistory((h) => {
            if (h.length === 0) {
                setScreen(fallback);
                return h;
            }
            setScreen(h[h.length - 1]);
            return h.slice(0, -1);
        });
    };
    const resetNav = (to = "home") => { setNavHistory([]); setScreen(to); };
    const [dadName, setDadName] = useState(() => loadLSString("tgp3_dad_name"));
    const [partnerName, setPartnerName] = useState(() => loadLSString("tgp3_partner_name"));
    const showOnboarding = dadName.trim() === "" || partnerName.trim() === "";
    const [bAnswers, setBAnswers] = useState(() => loadLS("tgp3_birth", {}));
    const [bagIncluded, setBagIncluded] = useState(() => loadLS("tgp3_included", null) || buildInitialIncluded());
    const [bagCustom, setBagCustom] = useState(() => loadLS("tgp3_custom", {}));
    const [bagPacked, setBagPacked] = useState(() => loadLS("tgp3_packed", {}));
    const [bagInterviewDone, setBagInterviewDone] = useState(() => localStorage.getItem("tgp3_bag_done") === "1");
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [bagEditCatIdx, setBagEditCatIdx] = useState(0);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showOverflow, setShowOverflow] = useState(false);
    const [replayOnboarding, setReplayOnboarding] = useState(false);
    useEffect(() => { localStorage.setItem("tgp3_screen", screen); }, [screen]);
    useEffect(() => { localStorage.setItem("tgp3_dad_name", dadName); }, [dadName]);
    useEffect(() => { localStorage.setItem("tgp3_partner_name", partnerName); }, [partnerName]);
    useEffect(() => { localStorage.setItem("tgp3_birth", JSON.stringify(bAnswers)); }, [bAnswers]);
    useEffect(() => { localStorage.setItem("tgp3_included", JSON.stringify(bagIncluded)); }, [bagIncluded]);
    useEffect(() => { localStorage.setItem("tgp3_custom", JSON.stringify(bagCustom)); }, [bagCustom]);
    useEffect(() => { localStorage.setItem("tgp3_packed", JSON.stringify(bagPacked)); }, [bagPacked]);
    useEffect(() => { localStorage.setItem("tgp3_bag_done", bagInterviewDone ? "1" : "0"); }, [bagInterviewDone]);
    const handleAnswer = (id, val) => setBAnswers((p) => ({ ...p, [id]: val }));
    const toggleIncluded = (id) => setBagIncluded((p) => ({ ...p, [id]: !p[id] }));
    const addCustom = (catId, item) => {
        setBagCustom((p) => ({ ...p, [catId]: [...(p[catId] || []), item] }));
        setBagIncluded((p) => ({ ...p, [item.id]: true }));
    };
    const removeCustom = (catId, itemId) => {
        setBagCustom((p) => ({ ...p, [catId]: (p[catId] || []).filter((i) => i.id !== itemId) }));
        setBagIncluded((p) => { const n = { ...p }; delete n[itemId]; return n; });
    };
    const togglePacked = (id) => setBagPacked((p) => ({ ...p, [id]: !p[id] }));
    const doReset = () => {
        LS_KEYS.forEach((k) => localStorage.removeItem(k));
        setBAnswers({});
        setBagIncluded(buildInitialIncluded());
        setBagCustom({});
        setBagPacked({});
        setBagInterviewDone(false);
        setEditQuestionId(null);
        setBagEditCatIdx(0);
        setDadName("");
        setPartnerName("");
        resetNav("home");
        setShowResetConfirm(false);
    };
    const goToBagCat = (catIdx) => { setBagEditCatIdx(catIdx); navigate("bag"); };
    const handleOnboardingComplete = (dad, partner) => {
        setDadName(dad);
        setPartnerName(partner);
        setReplayOnboarding(false);
    };
    const doResetBirth = () => {
        localStorage.removeItem("tgp3_birth");
        setBAnswers({});
        setEditQuestionId(null);
    };
    const doResetBag = () => {
        ["tgp3_included", "tgp3_custom", "tgp3_packed", "tgp3_bag_done"].forEach(k => localStorage.removeItem(k));
        setBagIncluded(buildInitialIncluded());
        setBagCustom({});
        setBagPacked({});
        setBagInterviewDone(false);
        setBagEditCatIdx(0);
    };
    const handleSaveNames = (dad, partner) => {
        if (dad)
            setDadName(dad);
        if (partner)
            setPartnerName(partner);
    };
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column", height: "100%", background: "var(--cream)", position: "relative" } },
        React.createElement(StatusBar, null),
        React.createElement("div", { className: "screen-area" },
            screen === "home" &&
                React.createElement(Home, { bAnswers: bAnswers, bagIncluded: bagIncluded, bagCustom: bagCustom, bagPacked: bagPacked, bagInterviewDone: bagInterviewDone, dadName: dadName, partnerName: partnerName, onStart: (t) => navigate(t === "birth" ? "birth" : t === "birth-summary" ? "birth-summary" : t === "bag-summary" ? "bag-summary" : "bag"), onOpenOverflow: () => setShowOverflow(true), onReset: () => setShowResetConfirm(true) }),
            screen === "birth" &&
                React.createElement(BirthInterview, { answers: bAnswers, onAnswer: handleAnswer, onBack: () => goBackNav("home"), onFinish: () => navigateReplace("birth-summary", ["home"]), editQuestionId: editQuestionId, onEditDone: () => { setEditQuestionId(null); goBackNav("birth-summary"); } }),
            screen === "birth-summary" &&
                React.createElement(BirthSummary, { answers: bAnswers, onBack: () => goBackNav("home"), onHome: () => resetNav("home"), onEditQuestion: (id) => { setEditQuestionId(id); navigate("birth"); } }),
            screen === "bag" &&
                React.createElement(BagInterview, { included: bagIncluded, onToggleIncluded: toggleIncluded, customItems: bagCustom, onAddCustom: addCustom, onRemoveCustom: removeCustom, onBack: () => goBackNav("home"), onFinish: () => { setBagInterviewDone(true); navigateReplace("bag-summary", ["home"]); }, initialCatIdx: bagEditCatIdx }),
            screen === "bag-summary" &&
                React.createElement(BagSummary, { included: bagIncluded, customItems: bagCustom, packed: bagPacked, onTogglePacked: togglePacked, onEditCat: goToBagCat, onBack: () => goBackNav("home"), onHome: () => resetNav("home") })),
        React.createElement("div", { className: "home-indicator" },
            React.createElement("div", { className: "home-bar" })),
        (showOnboarding || replayOnboarding) &&
            React.createElement(FirstLaunchModal, { onComplete: handleOnboardingComplete }),
        showOverflow &&
            React.createElement(OverflowMenu, { dadName: dadName, partnerName: partnerName, onSaveNames: handleSaveNames, onReviewOnboarding: () => setReplayOnboarding(true), onResetBirth: doResetBirth, onResetBag: doResetBag, onResetAll: doReset, onClose: () => setShowOverflow(false) }),
        showResetConfirm &&
            React.createElement("div", { className: "confirm-scrim", style: { zIndex: 400 } },
                React.createElement("div", { className: "confirm-sheet" },
                    React.createElement("div", { className: "confirm-title" }, "Start over?"),
                    React.createElement("div", { className: "confirm-body" }, "This will clear all your birth plan answers and bag selections. This cannot be undone."),
                    React.createElement("div", { className: "confirm-btns" },
                        React.createElement("button", { className: "confirm-btn-dest", onClick: doReset, "aria-label": "Confirm reset, clear all data" }, "Yes, start fresh"),
                        React.createElement("button", { className: "confirm-btn-stay", onClick: () => setShowResetConfirm(false), "aria-label": "Cancel reset" }, "Keep my progress"))))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
