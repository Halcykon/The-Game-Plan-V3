"use strict";
// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;
// ─── FIRST LAUNCH MODAL ──────────────────────────────────────────────────────
function SymbolHandsInline({ size = 72 }) {
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 80 80", fill: "none" },
        React.createElement("circle", { cx: "40", cy: "40", r: "38", fill: "oklch(88% 0.07 155)" }),
        React.createElement("path", { d: "M14 42c0-2 1.5-4 4-4h4l2-8c.5-2 2-3 3.5-2.5s2 2.2 1.5 3.5L27 36h3l2-9c.4-2 2-3.2 3.5-2.7s2.2 2.2 1.7 3.7L35 36h2l1-6c.4-2 2-3 3.5-2.5s2 2.2 1.5 3.5L42 36h1.5l.5-4c.3-1.8 1.8-3 3.2-2.6 1.5.5 2 2 1.6 3.5L47 42c0 5-3 9-7 10.5L34 54c-4 1.5-8 0-10-3L14 42z", fill: "oklch(52% 0.09 155)", opacity: "0.8" }),
        React.createElement("path", { d: "M40 31c0-3 2.5-5 5-5s5 2.5 5 5c0 5-5 9-10 12-5-3-10-7-10-12 0-2.5 2.5-5 5-5 2 0 3.5 1 5 3z", fill: "oklch(68% 0.14 75)" })));
}
function SymbolShieldInline({ size = 80 }) {
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 80 80", fill: "none" },
        React.createElement("circle", { cx: "40", cy: "40", r: "38", fill: "oklch(93% 0.04 50)" }),
        React.createElement("path", { d: "M40 16l-18 8v12c0 11 8 21 18 24 10-3 18-13 18-24V24L40 16z", fill: "oklch(93% 0.06 155)", stroke: "oklch(52% 0.09 155)", strokeWidth: "1.5" }),
        React.createElement("path", { d: "M33 40l5 5 9-9", stroke: "oklch(52% 0.09 155)", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" })));
}
function FirstLaunchModal({ onComplete }) {
    const [step, setStep] = useState(0); // 0=names, 1=insight, 2=interviews, 3=commit
    const [dadName, setDadName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const canContinue = dadName.trim().length > 0 && partnerName.trim().length > 0;
    const partnerDisplay = partnerName.trim() || 'her';
    const partnerPossessive = partnerName.trim() ? `${partnerName.trim()}'s` : 'her';
    const partnerSubject = partnerName.trim() || 'she';
    const TOTAL_CONTENT = 3;
    const progressPct = step === 0 ? 0 : step / TOTAL_CONTENT * 100;
    const dots = Array.from({ length: TOTAL_CONTENT });
    return (React.createElement("div", { className: "modal-overlay" },
        React.createElement("div", { style: { height: 54 } }),
        React.createElement("div", { className: "modal-progress" },
            React.createElement("div", { className: "modal-progress-fill", style: { width: `${progressPct}%` } })),
        step === 0 &&
            React.createElement("div", { className: "modal-step", key: "m0" },
                React.createElement("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px 16px', textAlign: 'center', overflowY: 'auto', scrollbarWidth: 'none' } },
                    React.createElement("div", { className: "modal-float", style: { marginBottom: 22 } },
                        React.createElement(SymbolHandsInline, { size: 72 })),
                    React.createElement("div", { className: "modal-headline-names", style: { marginBottom: 10 } },
                        "The best gift you can give her is knowing ",
                        React.createElement("em", null, "exactly"),
                        " what she wants."),
                    React.createElement("div", { style: { fontSize: 13, color: 'var(--mid)', lineHeight: 1.6, marginBottom: 28, textWrap: 'pretty' } },
                        "Welcome to The Game Plan.",
                        React.createElement("br", null),
                        "Who's preparing together?"),
                    React.createElement("div", { style: { width: '100%', display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' } },
                        React.createElement("div", null,
                            React.createElement("div", { className: "modal-field-lbl" }, "Your name"),
                            React.createElement("input", { className: "modal-name-input", type: "text", placeholder: "e.g. Marcus", value: dadName, onChange: (e) => setDadName(e.target.value) })),
                        React.createElement("div", null,
                            React.createElement("div", { className: "modal-field-lbl" }, "Your partner's name"),
                            React.createElement("input", { className: "modal-name-input partner", type: "text", placeholder: "e.g. Sofia", value: partnerName, onChange: (e) => setPartnerName(e.target.value) })))),
                React.createElement("div", { className: "modal-nav" },
                    React.createElement("button", { className: "modal-nav-primary", style: { opacity: canContinue ? 1 : 0.35, cursor: canContinue ? 'pointer' : 'default' }, onClick: () => canContinue && setStep(1) },
                        "Let's go, ",
                        canContinue ? dadName.trim() : 'dad',
                        " \u2192"))),
        step === 1 &&
            React.createElement("div", { className: "modal-step", key: "m1" },
                React.createElement("div", { className: "modal-step-bg-sage" },
                    React.createElement("div", { className: "modal-float", style: { marginBottom: 22 } },
                        React.createElement(SymbolHandsInline, { size: 72 })),
                    React.createElement("div", { className: "modal-step-lbl" }, "Step 1 of 3"),
                    React.createElement("div", { className: "modal-headline" },
                        "The gift ",
                        partnerName.trim() ? partnerName.trim() : 'she',
                        React.createElement("br", null),
                        "can't ask for herself")),
                React.createElement("div", { className: "modal-body-wrap" },
                    React.createElement("div", { className: "modal-insight" },
                        "When labor begins, ",
                        React.createElement("strong", null, partnerDisplay),
                        " will be entirely focused on getting through it. She can't advocate for herself in that moment \u2014 but ",
                        React.createElement("strong", null, "you can"),
                        " be ready to do it for her.",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "This isn't about being a bystander. It's about being ",
                        React.createElement("strong", null, "prepared"),
                        " so you can speak up, stay calm, and be exactly what she needs.")),
                React.createElement("div", { className: "modal-dot-row" }, dots.map((_, i) => React.createElement("div", { key: i, className: `modal-dot ${i === 0 ? 'on' : ''}` }))),
                React.createElement("div", { className: "modal-nav", style: { paddingTop: 0 } },
                    React.createElement("button", { className: "modal-nav-ghost", onClick: () => setStep(0) }, "\u2190"),
                    React.createElement("button", { className: "modal-nav-primary", onClick: () => setStep(2) }, "Continue \u2192"))),
        step === 2 &&
            React.createElement("div", { className: "modal-step", key: "m2" },
                React.createElement("div", { className: "modal-step-bg-terra" },
                    React.createElement("div", { className: "modal-step-lbl-terra" }, "Step 2 of 3"),
                    React.createElement("div", { className: "modal-headline" },
                        "Two interviews.",
                        React.createElement("br", null),
                        "One solid game plan."),
                    React.createElement("div", { className: "modal-sub" }, "Do these together before the due date \u2014 15\u201320 minutes total.")),
                React.createElement("div", { className: "modal-int-cards" },
                    React.createElement("div", { className: "modal-int-card" },
                        React.createElement("div", { className: "modal-int-num", style: { background: 'oklch(94% 0.04 155)', color: 'oklch(42% 0.09 155)' } }, "1"),
                        React.createElement("div", null,
                            React.createElement("div", { className: "modal-int-name" }, "Birth Plan"),
                            React.createElement("div", { className: "modal-int-desc" },
                                "Walk through ",
                                partnerPossessive,
                                " preferences \u2014 who's in the room, pain management, interventions. You'll know her answers cold."))),
                    React.createElement("div", { className: "modal-int-card" },
                        React.createElement("div", { className: "modal-int-num", style: { background: 'oklch(93% 0.04 50)', color: 'oklch(44% 0.1 50)' } }, "2"),
                        React.createElement("div", null,
                            React.createElement("div", { className: "modal-int-name" }, "Labor Bag"),
                            React.createElement("div", { className: "modal-int-desc" }, "Build the packing list together, sorted by stage. When the moment comes, you know exactly where everything is.")))),
                React.createElement("div", { className: "modal-dot-row" }, dots.map((_, i) => React.createElement("div", { key: i, className: `modal-dot ${i === 1 ? 'on' : ''}` }))),
                React.createElement("div", { className: "modal-nav", style: { paddingTop: 0 } },
                    React.createElement("button", { className: "modal-nav-ghost", onClick: () => setStep(1) }, "\u2190"),
                    React.createElement("button", { className: "modal-nav-primary", onClick: () => setStep(3) }, "Continue \u2192"))),
        step === 3 &&
            React.createElement("div", { className: "modal-step", key: "m3" },
                React.createElement("div", { className: "modal-commit-wrap" },
                    React.createElement("div", { className: "modal-float", style: { marginBottom: 24 } },
                        React.createElement(SymbolShieldInline, { size: 80 })),
                    React.createElement("div", { className: "modal-step-lbl" }, "Step 3 of 3"),
                    React.createElement("div", { className: "modal-commit-headline" },
                        "This is how you",
                        React.createElement("br", null),
                        "show up for ",
                        React.createElement("em", null,
                            partnerDisplay,
                            ".")),
                    React.createElement("div", { className: "modal-commit-body" }, "Every couple that uses The Game Plan goes into birth day more connected, more confident, and less afraid of the unknown."),
                    React.createElement("div", { className: "modal-badges" },
                        React.createElement("div", { className: "modal-badge" },
                            React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "var(--sage)", strokeWidth: "2", strokeLinecap: "round" },
                                React.createElement("path", { d: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" })),
                            "Stronger partnership"),
                        React.createElement("div", { className: "modal-badge" },
                            React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "var(--terra)", strokeWidth: "2", strokeLinecap: "round" },
                                React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })),
                            "Confident advocate"),
                        React.createElement("div", { className: "modal-badge" },
                            React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "var(--sage)", strokeWidth: "2", strokeLinecap: "round" },
                                React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
                                React.createElement("polyline", { points: "12 6 12 12 16 14" })),
                            "15 min together"))),
                React.createElement("div", { className: "modal-dot-row" }, dots.map((_, i) => React.createElement("div", { key: i, className: `modal-dot ${i === 2 ? 'on' : ''}` }))),
                React.createElement("div", { className: "modal-nav", style: { paddingTop: 0 } },
                    React.createElement("button", { className: "modal-nav-ghost", onClick: () => setStep(2) }, "\u2190"),
                    React.createElement("button", { className: "modal-nav-primary terra", onClick: () => onComplete(dadName.trim(), partnerName.trim()) }, "Let's do this together")))));
}
Object.assign(window, { FirstLaunchModal, SymbolHandsInline, SymbolShieldInline });
