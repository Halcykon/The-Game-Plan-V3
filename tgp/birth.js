"use strict";
// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;
// ─── BIRTH INTERVIEW ─────────────────────────────────────────────────────────
function BirthInterview({ answers, onAnswer, onBack, onFinish, editQuestionId, onEditDone }) {
    const editMode = !!editQuestionId;
    const editIdx = editQuestionId ? BPQ.findIndex((q) => q.id === editQuestionId) : -1;
    const first = editMode ? editIdx : BPQ.findIndex((q) => { const a = getAns(answers, q.id); return a.selected.length === 0 && !a.custom; });
    const [idx, setIdx] = useState(first >= 0 ? first : 0);
    const [showCustom, setShowCustom] = useState(false);
    const [draft, setDraft] = useState("");
    const [infoSheet, setInfoSheet] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    // Reset to editIdx if editQuestionId changes
    useEffect(() => { if (editMode && editIdx >= 0)
        setIdx(editIdx); }, [editQuestionId]);
    useEffect(() => { setShowCustom(false); setDraft(getAns(answers, BPQ[idx].id).custom || ""); }, [idx]);
    const q = BPQ[idx];
    const ans = getAns(answers, q.id);
    const branchId = q.branch ? q.branch.id : null;
    const branchAns = branchId ? getAns(answers, branchId) : null;
    const branchTriggered = q.branch && ans.selected.length > 0 && q.branch.triggerWhen(ans.selected);
    // Progress: count main questions answered + triggered branch questions answered
    const answeredMain = BPQ.filter((qq, i) => i < idx).length;
    const totalBranches = BPQ.filter((qq, i) => i <= idx && qq.branch && getAns(answers, qq.id).selected.length > 0 && qq.branch.triggerWhen(getAns(answers, qq.id).selected)).length;
    const answeredBranches = BPQ.filter((qq, i) => i < idx && qq.branch && getAns(answers, qq.id).selected.length > 0 && qq.branch.triggerWhen(getAns(answers, qq.id).selected) && getAns(answers, qq.branch.id).selected.length > 0).length;
    const totalEffective = BPQ.length + totalBranches;
    const doneEffective = answeredMain + answeredBranches;
    const pct = totalEffective > 0 ? doneEffective / totalEffective : 0;
    const isFreeform = q.type === "freeform";
    const hasAnswer = ans.selected.length > 0 || !!ans.custom;
    const isLast = idx === BPQ.length - 1;
    const toggle = (label) => {
        var _a;
        const sel = ans.selected;
        const newSel = q.type === "single" ?
            sel.includes(label) ? [] : [label] :
            sel.includes(label) ? sel.filter((x) => x !== label) : [...sel, label];
        onAnswer(q.id, { ...ans, selected: newSel });
        const opt = (_a = q.options) === null || _a === void 0 ? void 0 : _a.find((o) => o.label === label);
        if (q.type === "single" && (opt === null || opt === void 0 ? void 0 : opt.noFollow) && branchId) {
            onAnswer(branchId, { selected: [], custom: "", flagged: false });
        }
    };
    const toggleFlag = () => onAnswer(q.id, { ...ans, flagged: !ans.flagged });
    const saveCustom = () => { if (draft.trim()) {
        onAnswer(q.id, { ...ans, custom: draft.trim() });
        setShowCustom(false);
    } };
    const goNext = () => {
        if (editMode) {
            onEditDone();
            return;
        }
        if (!isLast)
            setIdx(idx + 1);
        else
            onFinish();
    };
    const goBack = () => {
        if (editMode) {
            onEditDone();
            return;
        }
        if (idx > 0) {
            setIdx(idx - 1);
            return;
        }
        // On q1, show confirm before leaving
        setShowConfirm(true);
    };
    const typeLabel = q.type === "single" ? "Choose one" : q.type === "multi" ? "Choose all that apply" : null;
    return (React.createElement("div", { className: "screen", style: { position: "relative" } },
        infoSheet && React.createElement(InfoSheet, { infoKey: infoSheet, onClose: () => setInfoSheet(null) }),
        showConfirm &&
            React.createElement("div", { className: "confirm-scrim" },
                React.createElement("div", { className: "confirm-sheet" },
                    React.createElement("div", { className: "confirm-title" }, "Leave the interview?"),
                    React.createElement("div", { className: "confirm-body" }, "Your progress is saved. You can pick up right where you left off."),
                    React.createElement("div", { className: "confirm-btns" },
                        React.createElement("button", { className: "confirm-btn-dest", onClick: onBack }, "Yes, leave for now"),
                        React.createElement("button", { className: "confirm-btn-stay", onClick: () => setShowConfirm(false) }, "Keep going")))),
        React.createElement("div", { className: "ihead" },
            React.createElement("button", { className: "back-btn", onClick: () => { if (editMode) {
                    onEditDone();
                }
                else {
                    setShowConfirm(true);
                } } },
                React.createElement(BackArrow, null)),
            React.createElement("div", { className: "ihead-info" },
                React.createElement("div", { className: "ihead-title", style: { fontSize: editMode ? 14 : 16 } }, editMode ? q.topic : "Birth Plan"),
                !editMode && React.createElement("div", { className: "prog-bar" },
                    React.createElement("div", { className: "prog-fill", style: { width: `${pct * 100}%` } }))),
            React.createElement("div", { className: "ihead-ct" }, editMode ? "Editing" : `${idx + 1}/${BPQ.length}`)),
        React.createElement("div", { className: "qarea" },
            React.createElement("div", { className: "qcard", key: q.id },
                React.createElement("div", { className: "qtag" }, q.topic),
                React.createElement("div", { className: "qtext" }, q.question),
                React.createElement("div", { className: "qctx" }, q.context),
                React.createElement("button", { className: `flag-btn ${ans.flagged ? "on" : ""}`, onClick: toggleFlag },
                    React.createElement(BkIcon, { on: ans.flagged }))),
            isFreeform ? (React.createElement("div", { className: "opts" },
                React.createElement("div", { className: "type-label" }, "Choose one"),
                React.createElement("button", { className: `opt ${ans.selected.includes("Nothing else to add") ? "sel" : ""}`, onClick: () => { onAnswer(q.id, { ...ans, selected: ["Nothing else to add"], custom: "" }); setShowCustom(false); setDraft(""); } },
                    React.createElement("div", { className: "ocheck" }, ans.selected.includes("Nothing else to add") && React.createElement(Chk, null)),
                    React.createElement("div", null,
                        React.createElement("div", { className: "olbl" }, "Nothing else to add"),
                        React.createElement("div", { className: "osub" }, "We are happy with what we have covered"))),
                React.createElement("button", { className: `opt ${ans.selected.includes("Add our own notes") ? "sel" : ""}`, onClick: () => { onAnswer(q.id, { ...ans, selected: ["Add our own notes"] }); setShowCustom(true); } },
                    React.createElement("div", { className: "ocheck" }, ans.selected.includes("Add our own notes") && React.createElement(Chk, null)),
                    React.createElement("div", null,
                        React.createElement("div", { className: "olbl" }, "Add our own notes"),
                        React.createElement("div", { className: "osub" }, "Cultural needs, religious preferences, specific requests\u2026"))),
                ans.selected.includes("Add our own notes") &&
                    React.createElement("div", { className: "custom-row", style: { background: ans.custom ? "var(--sage-bg)" : "white", borderColor: ans.custom ? "var(--sage)" : undefined, animation: "fadeUp 0.2s ease" } },
                        React.createElement("div", { className: "custom-expand" },
                            React.createElement("textarea", { className: "custom-inp", rows: 4, placeholder: "e.g. We observe Shabbat and need a kosher meal option.\ne.g. We want our doula present for all consultations.", value: ans.custom || "", onChange: (e) => onAnswer(q.id, { ...ans, selected: ["Add our own notes"], custom: e.target.value }), style: { resize: "none" }, autoFocus: true }),
                            React.createElement("div", { style: { fontSize: 11, marginTop: 4, fontWeight: 500, minHeight: 16, color: ans.custom ? "var(--sage)" : "var(--soft)" } }, ans.custom ? "✓ Saved" : "Start typing…"))),
                React.createElement("button", { className: `flag-strip ${ans.flagged ? "on" : ""}`, onClick: toggleFlag },
                    React.createElement(BkIcon, { on: ans.flagged }),
                    React.createElement("span", { className: "flag-lbl" }, ans.flagged ? "Flagged — we will come back to this" : "Come back to this later")))) : (React.createElement("div", { className: "opts" },
                typeLabel && React.createElement("div", { className: "type-label" }, typeLabel),
                q.options.map((opt, i) => React.createElement(OptBtn, { key: i, label: opt.label, sub: opt.sub, selected: ans.selected.includes(opt.label), onToggle: toggle, inputType: q.type, infoKey: opt.infoKey, onInfo: setInfoSheet })),
                branchTriggered &&
                    React.createElement(BranchCard, { branch: q.branch, branchAns: branchAns || { selected: [], custom: "" }, onBranchAnswer: (val) => onAnswer(branchId, val), onInfo: setInfoSheet }),
                React.createElement("div", { className: "custom-row", style: { background: ans.custom ? "var(--sage-bg)" : "white", borderColor: ans.custom ? "var(--sage)" : undefined } }, !showCustom ?
                    React.createElement("button", { className: "custom-trigger", onClick: () => { setShowCustom(true); setDraft(ans.custom || ""); } },
                        React.createElement("div", { className: "ocheck-sq", style: { border: "2px dashed oklch(75% 0.04 75)", background: ans.custom ? "var(--sage)" : "transparent" } }, ans.custom && React.createElement(Chk, null)),
                        React.createElement("div", { className: "olbl", style: { color: ans.custom ? "var(--navy)" : "var(--soft)", fontStyle: ans.custom ? "normal" : "italic" } }, ans.custom || "Add our own preference...")) :
                    React.createElement("div", { className: "custom-expand" },
                        React.createElement("textarea", { className: "custom-inp", rows: 2, placeholder: "Describe your preference in your own words...", value: draft, onChange: (e) => setDraft(e.target.value), autoFocus: true }),
                        React.createElement("button", { className: "custom-save", onClick: saveCustom }, "Save"))),
                React.createElement("button", { className: `flag-strip ${ans.flagged ? "on" : ""}`, onClick: toggleFlag },
                    React.createElement(BkIcon, { on: ans.flagged }),
                    React.createElement("span", { className: "flag-lbl" }, ans.flagged ? "Flagged — we will come back to this" : "Come back to this later"))))),
        React.createElement("div", { className: "nav-row" },
            React.createElement("button", { className: "nav-skip", onClick: goBack }, editMode ? "Cancel" : "← Back"),
            React.createElement("button", { className: `nav-next ${isLast && !editMode ? "terra" : ""}`, onClick: goNext, disabled: !isFreeform && !hasAnswer && !ans.flagged }, editMode ? "Save →" : isLast ? "See Summary →" : "Next →"))));
}
// ─── BIRTH SUMMARY ───────────────────────────────────────────────────────────
function BirthSummary({ answers, onBack, onHome, onEditQuestion }) {
    const decided = BPQ.filter((q) => { const a = getAns(answers, q.id); return (a.selected.length > 0 || a.custom) && !a.flagged; });
    const flagged = BPQ.filter((q) => getAns(answers, q.id).flagged);
    const skipped = BPQ.filter((q) => { const a = getAns(answers, q.id); return a.selected.length === 0 && !a.custom && !a.flagged; });
    const TC = ({ q, variant }) => {
        var _a;
        const a = getAns(answers, q.id);
        const branchId = (_a = q.branch) === null || _a === void 0 ? void 0 : _a.id;
        const bAns = branchId ? getAns(answers, branchId) : null;
        const isEmpty = a.selected.length === 0 && !a.custom && !a.flagged;
        return (React.createElement("div", { className: "sum-tc", style: { borderLeft: isEmpty ? "3px solid oklch(88% 0.03 75)" : undefined } },
            React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 5 } },
                React.createElement("div", { className: "sum-tn" }, q.topic),
                React.createElement("button", { onClick: () => onEditQuestion(q.id), style: { border: "none", background: "var(--sage-bg)", color: "var(--sage)", fontSize: 11, fontWeight: 600, borderRadius: 7, padding: "3px 9px", cursor: "pointer", flexShrink: 0, marginLeft: 8 } }, "Edit")),
            q.type === "freeform" ?
                a.custom ?
                    React.createElement("div", { style: { fontSize: 12, color: "var(--navy)", lineHeight: 1.55, fontStyle: "italic" } },
                        "\"",
                        a.custom,
                        "\"") :
                    React.createElement("span", { style: { fontSize: 11, color: "var(--soft)", fontStyle: "italic" } }, "Not answered") :
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "sum-pills" },
                        a.selected.map((s, i) => React.createElement("span", { key: i, className: `spill ${variant === "flagged" ? "amb" : ""}` }, s)),
                        a.custom && React.createElement("span", { className: "spill cust" },
                            "\"",
                            a.custom,
                            "\""),
                        a.selected.length === 0 && !a.custom && React.createElement("span", { style: { fontSize: 11, color: "var(--soft)", fontStyle: "italic" } }, "Not answered")),
                    bAns && bAns.selected.length > 0 &&
                        React.createElement("div", { style: { marginTop: 6, paddingLeft: 8, borderLeft: "2px solid var(--sage-bg)" } },
                            React.createElement("div", { style: { fontSize: 10, color: "var(--sage)", fontWeight: 700, marginBottom: 3 } }, "\u21B3 Also"),
                            React.createElement("div", { className: "sum-pills" }, bAns.selected.map((s, i) => React.createElement("span", { key: i, className: "spill", style: { background: "oklch(92% 0.03 155)" } }, s)))))));
    };
    return (React.createElement("div", { className: "screen" },
        React.createElement("div", { className: "scroll" },
            React.createElement("div", { className: "sum-hero" },
                React.createElement("div", { className: "sum-stats" },
                    React.createElement("div", { className: "sum-stat" },
                        React.createElement("div", { className: "sum-stat-n", style: { color: "var(--sage)" } }, decided.length),
                        React.createElement("div", { className: "sum-stat-l" }, "Decided")),
                    flagged.length > 0 && React.createElement("div", { className: "sum-stat" },
                        React.createElement("div", { className: "sum-stat-n", style: { color: "var(--amber)" } }, flagged.length),
                        React.createElement("div", { className: "sum-stat-l" }, "To revisit")),
                    skipped.length > 0 && React.createElement("div", { className: "sum-stat" },
                        React.createElement("div", { className: "sum-stat-n", style: { color: "var(--soft)" } }, skipped.length),
                        React.createElement("div", { className: "sum-stat-l" }, "Skipped"))),
                React.createElement("div", { className: "sum-title" }, "Your Birth Plan"),
                React.createElement("div", { className: "sum-sub" },
                    decided.length,
                    " of ",
                    BPQ.length,
                    " topics covered")),
            decided.length > 0 &&
                React.createElement("div", { className: "sum-sec" },
                    React.createElement("div", { className: "sum-sec-lbl" },
                        React.createElement("span", { style: { color: "var(--sage)" } }, "\u2713"),
                        " Decided"),
                    decided.map((q) => React.createElement(TC, { key: q.id, q: q, variant: "decided" }))),
            flagged.length > 0 &&
                React.createElement("div", { className: "sum-sec" },
                    React.createElement("div", { className: "sum-sec-lbl" },
                        React.createElement(BkIcon, { on: true }),
                        " Come Back to These"),
                    flagged.map((q) => React.createElement(TC, { key: q.id, q: q, variant: "flagged" }))),
            skipped.length > 0 &&
                React.createElement("div", { className: "sum-sec" },
                    React.createElement("div", { className: "sum-sec-lbl" }, "Not Yet Discussed"),
                    skipped.map((q) => React.createElement("div", { key: q.id, className: "sum-tc", style: { opacity: 0.55, display: "flex", alignItems: "center", justifyContent: "space-between" } },
                        React.createElement("div", { className: "sum-tn", style: { marginBottom: 0 } }, q.topic),
                        React.createElement("button", { onClick: () => onEditQuestion(q.id), style: { border: "none", background: "oklch(93% 0.018 75)", color: "var(--mid)", fontSize: 11, fontWeight: 600, borderRadius: 7, padding: "3px 9px", cursor: "pointer", flexShrink: 0 } }, "Answer")))),
            React.createElement("div", { className: "sum-sec" },
                React.createElement("div", { className: "sum-sec-lbl" }, "At the Hospital"),
                React.createElement("div", { className: "guide-card" }, ["Print 3 copies before you leave home.", "Hand one to your nurse when you arrive.", "Stay flexible — birth rarely follows a plan exactly.", "Your job: be her voice when she cannot speak for herself.", "Ask questions. Do not assume. Advocate kindly."].map((l, i) => React.createElement("div", { key: i, className: "guide-ln" },
                    React.createElement("span", { style: { color: "var(--sage)", fontWeight: 700 } }, "\u2192"),
                    React.createElement("span", null, l))))),
            React.createElement("div", { style: { height: 10 } })),
        React.createElement("div", { className: "act-row" },
            React.createElement("button", { className: "act act-s", onClick: onBack }, "Edit"),
            React.createElement("button", { className: "act act-p", onClick: onHome }, "Done \u2713"))));
}
Object.assign(window, { BirthInterview, BirthSummary });
