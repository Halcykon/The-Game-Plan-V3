"use strict";
// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;
// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
function StatusBar() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const tick = () => {
            const now = new Date(), h = now.getHours(), m = now.getMinutes();
            setTime(`${h === 0 ? 12 : h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")}`);
        };
        tick();
        const t = setInterval(tick, 10000);
        return () => clearInterval(t);
    }, []);
    return (React.createElement("div", { className: "status-bar" },
        React.createElement("span", { className: "status-time" }, time),
        React.createElement("div", { className: "dynamic-island" }),
        React.createElement("div", { className: "status-icons" },
            React.createElement("svg", { width: "17", height: "12", viewBox: "0 0 17 12" },
                React.createElement("rect", { x: "0", y: "3", width: "3", height: "9", rx: "1", fill: "#1c2b1e" }),
                React.createElement("rect", { x: "4.5", y: "2", width: "3", height: "10", rx: "1", fill: "#1c2b1e" }),
                React.createElement("rect", { x: "9", y: "0", width: "3", height: "12", rx: "1", fill: "#1c2b1e" }),
                React.createElement("rect", { x: "13.5", y: "0", width: "3", height: "12", rx: "1", fill: "#1c2b1e", opacity: "0.3" })),
            React.createElement("svg", { width: "25", height: "12", viewBox: "0 0 25 12" },
                React.createElement("rect", { x: "0.5", y: "0.5", width: "21", height: "11", rx: "3.5", stroke: "#1c2b1e", strokeOpacity: "0.35" }),
                React.createElement("rect", { x: "2", y: "2", width: "16", height: "8", rx: "2", fill: "#1c2b1e" }),
                React.createElement("path", { d: "M23 4v4a2 2 0 000-4z", fill: "#1c2b1e", fillOpacity: "0.4" })))));
}
function PRing({ pct, color }) {
    const r = 15, c = 20, circ = 2 * Math.PI * r;
    return (React.createElement("svg", { width: "40", height: "40", viewBox: "0 0 40 40" },
        React.createElement("circle", { cx: c, cy: c, r: r, fill: "none", stroke: color, strokeWidth: "3", opacity: "0.18" }),
        React.createElement("circle", { cx: c, cy: c, r: r, fill: "none", stroke: color, strokeWidth: "3", strokeDasharray: circ, strokeDashoffset: circ * (1 - pct), strokeLinecap: "round", style: { transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 0.5s ease" } })));
}
const Chk = ({ color = "white" }) => React.createElement("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none" },
    React.createElement("path", { d: "M1 4L3.5 6.5L9 1", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
const BkIcon = ({ on }) => React.createElement("svg", { width: "13", height: "16", viewBox: "0 0 13 16", fill: "none" },
    React.createElement("path", { d: "M1 1h11v14l-5.5-3.5L1 15V1z", fill: on ? "var(--amber)" : "none", stroke: on ? "var(--amber)" : "oklch(75% 0.04 75)", strokeWidth: "1.8", strokeLinejoin: "round" }));
const BackArrow = () => React.createElement("svg", { width: "8", height: "13", viewBox: "0 0 8 13", fill: "none" },
    React.createElement("path", { d: "M7 1L1 6.5L7 12", stroke: "#1c2b1e", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
function getAns(answers, id) { return answers[id] || { selected: [], custom: "", flagged: false }; }
// ─── PRO TIPS COMPONENT ──────────────────────────────────────────────────────
const TIP_CATEGORY_COLORS = {
    "Advocate": { bg: "oklch(93% 0.05 155)", text: "var(--sage)" },
    "Take Initiative": { bg: "oklch(93% 0.04 220)", text: "oklch(42% 0.1 220)" },
    "Feeding": { bg: "oklch(93% 0.05 50)", text: "var(--terra)" },
    "Food": { bg: "oklch(95% 0.06 75)", text: "oklch(48% 0.12 75)" },
    "Comfort": { bg: "oklch(92% 0.04 310)", text: "oklch(44% 0.1 310)" },
    "Don't Take It Personally": { bg: "oklch(93% 0.04 0)", text: "oklch(44% 0.1 10)" },
    "Sleep": { bg: "oklch(92% 0.04 240)", text: "oklch(42% 0.1 240)" },
    "Video": { bg: "oklch(92% 0.04 280)", text: "oklch(42% 0.1 280)" },
    "Paperwork": { bg: "oklch(93% 0.03 75)", text: "oklch(48% 0.08 75)" },
    "Apps": { bg: "var(--sage-bg)", text: "var(--sage)" },
    "Communications": { bg: "oklch(93% 0.04 200)", text: "oklch(42% 0.1 200)" },
    "Logistics": { bg: "var(--terra-bg)", text: "var(--terra)" },
    "Delivery": { bg: "oklch(92% 0.05 155)", text: "var(--sage)" }
};
function ProTips() {
    const randomStart = useRef(Math.floor(Math.random() * PRO_TIPS.length));
    const [idx, setIdx] = useState(randomStart.current);
    const [animClass, setAnimClass] = useState("");
    const [animKey, setAnimKey] = useState(0);
    const touchStartX = useRef(null);
    // Show swipe hint on first visit, hide after first navigation
    const [showSwipeHint, setShowSwipeHint] = useState(() => !localStorage.getItem("tgp_tips_swiped"));
    const navigate = (dir) => {
        if (showSwipeHint) {
            setShowSwipeHint(false);
            localStorage.setItem("tgp_tips_swiped", "1");
        }
        setAnimClass(dir === 1 ? "tip-exit-left" : "tip-exit-right");
        setTimeout(() => {
            setIdx((i) => (i + dir + PRO_TIPS.length) % PRO_TIPS.length);
            setAnimClass(dir === 1 ? "tip-enter-right" : "tip-enter-left");
            setAnimKey((k) => k + 1);
            setTimeout(() => setAnimClass(""), 10);
        }, 150);
    };
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null)
            return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40)
            navigate(dx < 0 ? 1 : -1);
        touchStartX.current = null;
    };
    const tip = PRO_TIPS[idx];
    const colors = TIP_CATEGORY_COLORS[tip.category] || { bg: "var(--sage-bg)", text: "var(--sage)" };
    return (React.createElement("div", { style: { padding: "0 20px 28px" } },
        React.createElement("div", { className: "sec-lbl", style: { marginBottom: 10 } }, "Pro Tips"),
        React.createElement("div", { style: { background: "white", borderRadius: 20, boxShadow: "0 2px 14px rgba(28,43,30,0.09)", overflow: "hidden", userSelect: "none" }, onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd },
            React.createElement("div", { key: animKey, style: {
                    padding: "18px 18px 14px",
                    animation: animClass.includes("enter") ? `tipSlideIn 0.22s ease forwards` : animClass.includes("exit") ? `tipSlideOut 0.15s ease forwards` : "none",
                    "--tip-from": animClass === "tip-enter-right" ? "36px" : "-36px",
                    "--tip-to": animClass === "tip-exit-left" ? "-36px" : "36px"
                } },
                React.createElement("div", { style: { display: "inline-flex", background: colors.bg, color: colors.text, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: 7, padding: "3px 9px", marginBottom: 10 } }, tip.category),
                React.createElement("div", { style: { fontSize: 13, color: "var(--navy)", lineHeight: 1.65, minHeight: 52 } }, tip.category === "Advocate" && tip.tip.startsWith("Use BRAIN") ?
                    React.createElement(React.Fragment, null,
                        React.createElement("span", null, "Use BRAIN when the care team proposes something:"),
                        React.createElement("div", { style: { marginTop: 8, display: "flex", flexDirection: "column", gap: 4 } }, [
                            ["B", "enefits", "how could this help?"],
                            ["R", "isks", "what could go wrong?"],
                            ["A", "lternatives", "are there other options?"],
                            ["I", "ntuition", "what does she feel?"],
                            ["N", "othing", "what happens if we wait?"]
                        ].
                            map(([letter, rest, desc]) => React.createElement("div", { key: letter, style: { display: "flex", gap: 6, alignItems: "baseline" } },
                            React.createElement("span", { style: { fontWeight: 700, color: "var(--sage)", fontFamily: "Lora, serif", fontSize: 14, flexShrink: 0 } }, letter),
                            React.createElement("span", null,
                                React.createElement("span", { style: { fontWeight: 600 } }, rest),
                                " \u2014 ",
                                desc)))),
                        React.createElement("div", { style: { marginTop: 8, color: "var(--mid)", fontSize: 12 } }, "Then ask for a few minutes alone to decide.")) :
                    tip.tip)),
            showSwipeHint &&
                React.createElement("div", { style: { display: "flex", justifyContent: "center", padding: "0 0 8px", animation: "fadeIn 0.4s ease 0.8s both" } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, background: "oklch(94% 0.015 75)", borderRadius: 20, padding: "4px 10px" } },
                        React.createElement("svg", { width: "14", height: "10", viewBox: "0 0 14 10", fill: "none" },
                            React.createElement("path", { d: "M9 1l4 4-4 4M5 1L1 5l4 4", stroke: "var(--soft)", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })),
                        React.createElement("span", { style: { fontSize: 10, color: "var(--soft)", fontWeight: 500 } }, "Swipe to browse 21 tips"))),
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px 14px", borderTop: "1px solid var(--line)" } },
                React.createElement("button", { onClick: () => navigate(-1), style: { width: 32, height: 32, border: "none", background: "oklch(94% 0.015 75)", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } },
                    React.createElement("svg", { width: "7", height: "12", viewBox: "0 0 7 12", fill: "none" },
                        React.createElement("path", { d: "M6 1L1 6l5 5", stroke: "var(--mid)", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }))),
                React.createElement("span", { style: { fontSize: 11, color: "var(--soft)", fontWeight: 500 } },
                    idx + 1,
                    " / ",
                    PRO_TIPS.length),
                React.createElement("button", { onClick: () => navigate(1), style: { width: 32, height: 32, border: "none", background: "oklch(94% 0.015 75)", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } },
                    React.createElement("svg", { width: "7", height: "12", viewBox: "0 0 7 12", fill: "none" },
                        React.createElement("path", { d: "M1 1l5 5-5 5", stroke: "var(--mid)", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })))))));
}
// ─── INFO SHEET (drag-to-dismiss) ────────────────────────────────────────────
function InfoSheet({ infoKey, onClose }) {
    const info = MEDICAL_INFO[infoKey];
    const sheetRef = useRef(null);
    const dragState = useRef({ active: false, startY: 0, currentY: 0 });
    const [dragOffset, setDragOffset] = useState(0);
    const [dismissing, setDismissing] = useState(false);
    if (!info)
        return null;
    const DISMISS_THRESHOLD = 80;
    const onDragStart = (clientY) => {
        dragState.current = { active: true, startY: clientY, currentY: clientY };
    };
    const onDragMove = (clientY) => {
        if (!dragState.current.active)
            return;
        const delta = Math.max(0, clientY - dragState.current.startY);
        dragState.current.currentY = clientY;
        setDragOffset(delta);
    };
    const onDragEnd = () => {
        if (!dragState.current.active)
            return;
        dragState.current.active = false;
        if (dragOffset >= DISMISS_THRESHOLD) {
            setDismissing(true);
            setTimeout(onClose, 220);
        }
        else {
            setDragOffset(0);
        }
    };
    const handlePointerDown = (e) => { e.currentTarget.setPointerCapture(e.pointerId); onDragStart(e.clientY); };
    const handlePointerMove = (e) => { if (dragState.current.active)
        onDragMove(e.clientY); };
    const handlePointerUp = () => onDragEnd();
    const handleTouchStart = (e) => onDragStart(e.touches[0].clientY);
    const handleTouchMove = (e) => onDragMove(e.touches[0].clientY);
    const handleTouchEnd = () => onDragEnd();
    const sheetStyle = {
        transform: dismissing ? `translateY(100%)` : `translateY(${dragOffset}px)`,
        transition: dragState.current.active && !dismissing ? "none" : "transform 0.22s cubic-bezier(0.32,0.72,0,1)",
        opacity: dismissing ? 0 : Math.max(0, 1 - dragOffset / 300)
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "info-scrim", style: { opacity: Math.max(0, 1 - dragOffset / 200) }, onClick: onClose }),
        React.createElement("div", { className: "info-sheet", ref: sheetRef, style: sheetStyle },
            React.createElement("div", { className: "info-sheet-handle", onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, style: { paddingBottom: 0 } },
                React.createElement("div", { className: "info-sheet-drag" })),
            React.createElement("div", { className: "info-sheet-header" },
                React.createElement("div", null,
                    React.createElement("div", { className: "info-sheet-eyebrow" }, "Learn more"),
                    React.createElement("div", { className: "info-sheet-title" }, info.name)),
                React.createElement("button", { className: "info-sheet-close", onClick: onClose, "aria-label": "Close" },
                    React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "var(--mid)", strokeWidth: "2.5", strokeLinecap: "round" },
                        React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                        React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })))),
            React.createElement("div", { className: "info-sheet-divider" }),
            React.createElement("div", { className: "info-sheet-body" },
                React.createElement("div", { style: { height: 4 } }),
                React.createElement("div", { className: "info-block" },
                    React.createElement("div", { className: "info-block-lbl" }, "What it is"),
                    React.createElement("div", { className: "info-block-txt" }, info.what)),
                React.createElement("div", { className: "info-block" },
                    React.createElement("div", { className: "info-block-lbl" }, "Why some choose it"),
                    React.createElement("div", { className: "info-block-txt" }, info.why_yes)),
                React.createElement("div", { className: "info-block" },
                    React.createElement("div", { className: "info-block-lbl" }, "Why some decline"),
                    React.createElement("div", { className: "info-block-txt" }, info.why_no)),
                React.createElement("div", { className: "info-block" },
                    React.createElement("div", { className: "info-block-lbl" }, "Timing"),
                    React.createElement("div", { className: "info-block-txt" }, info.time)),
                React.createElement("div", { style: { height: 32 } })))));
}
// ─── OPTION BUTTON ───────────────────────────────────────────────────────────
function OptBtn({ label, sub, selected, onToggle, inputType, infoKey, onInfo }) {
    const isSquare = inputType === "multi";
    return (React.createElement("button", { className: `opt ${selected ? "sel" : ""}`, onClick: () => onToggle(label) },
        React.createElement("div", { className: isSquare ? "ocheck-sq" : "ocheck" }, selected && React.createElement(Chk, null)),
        React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { className: "olbl" }, label),
            sub && React.createElement("div", { className: "osub" }, sub)),
        infoKey &&
            React.createElement("button", { className: "opt-info-btn", onClick: (e) => { e.stopPropagation(); onInfo(infoKey); }, title: "Learn more" },
                React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none" },
                    React.createElement("circle", { cx: "8", cy: "8", r: "7.25", stroke: "currentColor", strokeWidth: "1.5" }),
                    React.createElement("path", { d: "M8 7v5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }),
                    React.createElement("circle", { cx: "8", cy: "4.5", r: "0.85", fill: "currentColor" })))));
}
// ─── BRANCH SUB-QUESTION ─────────────────────────────────────────────────────
function BranchCard({ branch, branchAns, onBranchAnswer, onInfo }) {
    const toggle = (label) => {
        const sel = branchAns.selected || [];
        const next = branch.type === "single" ?
            sel.includes(label) ? [] : [label] :
            sel.includes(label) ? sel.filter((x) => x !== label) : [...sel, label];
        onBranchAnswer({ ...branchAns, selected: next });
    };
    const isRound = branch.type === "single";
    return (React.createElement("div", { className: "branch-card" },
        React.createElement("div", { className: "branch-tag" }, "\u21B3 Follow-up"),
        React.createElement("div", { className: "branch-q" }, branch.question),
        React.createElement("div", { className: "branch-ctx" }, branch.context),
        branch.type === "multi" && React.createElement("div", { style: { fontSize: 10, color: "var(--soft)", fontStyle: "italic", marginBottom: 8 } }, "Select all that apply"),
        branch.options.map((opt, i) => {
            const sel = (branchAns.selected || []).includes(opt.label);
            return (React.createElement("button", { key: i, className: `branch-opt ${sel ? "sel" : ""}`, onClick: () => toggle(opt.label) },
                React.createElement("div", { className: "branch-ocheck", style: { borderRadius: isRound ? "50%" : "5px" } }, sel && React.createElement(Chk, { size: 8 })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { className: "olbl", style: { fontSize: 12 } }, opt.label),
                    opt.sub && React.createElement("div", { className: "osub" }, opt.sub)),
                opt.infoKey &&
                    React.createElement("button", { className: "opt-info-btn", style: { width: 24, height: 24, borderRadius: 8 }, onClick: (e) => { e.stopPropagation(); onInfo(opt.infoKey); }, title: "Learn more" },
                        React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "none" },
                            React.createElement("circle", { cx: "8", cy: "8", r: "7.25", stroke: "currentColor", strokeWidth: "1.5" }),
                            React.createElement("path", { d: "M8 7v5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }),
                            React.createElement("circle", { cx: "8", cy: "4.5", r: "0.85", fill: "currentColor" })))));
        })));
}
Object.assign(window, { StatusBar, PRing, Chk, BkIcon, BackArrow, getAns, ProTips, TIP_CATEGORY_COLORS, InfoSheet, OptBtn, BranchCard });
