// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;

// ─── BIRTH INTERVIEW ─────────────────────────────────────────────────────────
function BirthInterview({ answers, onAnswer, onBack, onFinish, editQuestionId, onEditDone }) {
  const editMode = !!editQuestionId;
  const editIdx = editQuestionId ? BPQ.findIndex((q) => q.id === editQuestionId) : -1;
  const first = editMode ? editIdx : BPQ.findIndex((q) => {const a = getAns(answers, q.id);return a.selected.length === 0 && !a.custom;});
  const [idx, setIdx] = useState(first >= 0 ? first : 0);
  const [showCustom, setShowCustom] = useState(false);
  const [draft, setDraft] = useState("");
  const [infoSheet, setInfoSheet] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Reset to editIdx if editQuestionId changes
  useEffect(() => {if (editMode && editIdx >= 0) setIdx(editIdx);}, [editQuestionId]);
  useEffect(() => {setShowCustom(false);setDraft(getAns(answers, BPQ[idx].id).custom || "");}, [idx]);

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
    const sel = ans.selected;
    const newSel = q.type === "single" ?
    sel.includes(label) ? [] : [label] :
    sel.includes(label) ? sel.filter((x) => x !== label) : [...sel, label];
    onAnswer(q.id, { ...ans, selected: newSel });
    const opt = q.options?.find((o) => o.label === label);
    if (q.type === "single" && opt?.noFollow && branchId) {
      onAnswer(branchId, { selected: [], custom: "", flagged: false });
    }
  };
  const toggleFlag = () => onAnswer(q.id, { ...ans, flagged: !ans.flagged });
  const saveCustom = () => {if (draft.trim()) {onAnswer(q.id, { ...ans, custom: draft.trim() });setShowCustom(false);}};
  const goNext = () => {
    if (editMode) {onEditDone();return;}
    if (!isLast) setIdx(idx + 1);else onFinish();
  };
  const goBack = () => {
    if (editMode) {onEditDone();return;}
    if (idx > 0) {setIdx(idx - 1);return;}
    // On q1, show confirm before leaving
    setShowConfirm(true);
  };
  const typeLabel = q.type === "single" ? "Choose one" : q.type === "multi" ? "Choose all that apply" : null;

  return (
    <div className="screen" style={{ position: "relative" }}>
      {infoSheet && <InfoSheet infoKey={infoSheet} onClose={() => setInfoSheet(null)} />}
      {showConfirm &&
      <div className="confirm-scrim">
          <div className="confirm-sheet">
            <div className="confirm-title">Leave the interview?</div>
            <div className="confirm-body">Your progress is saved. You can pick up right where you left off.</div>
            <div className="confirm-btns">
              <button className="confirm-btn-dest" onClick={onBack}>Yes, leave for now</button>
              <button className="confirm-btn-stay" onClick={() => setShowConfirm(false)}>Keep going</button>
            </div>
          </div>
        </div>
      }
      <div className="ihead">
        <button className="back-btn" onClick={() => {if (editMode) {onEditDone();} else {setShowConfirm(true);}}}><BackArrow /></button>
        <div className="ihead-info">
          <div className="ihead-title" style={{ fontSize: editMode ? 14 : 16 }}>{editMode ? q.topic : "Birth Plan"}</div>
          {!editMode && <div className="prog-bar"><div className="prog-fill" style={{ width: `${pct * 100}%` }} /></div>}
        </div>
        <div className="ihead-ct">{editMode ? "Editing" : `${idx + 1}/${BPQ.length}`}</div>
      </div>
      <div className="qarea">
        <div className="qcard" key={q.id}>
          <div className="qtag">{q.topic}</div>
          <div className="qtext">{q.question}</div>
          <div className="qctx">{q.context}</div>
          <button className={`flag-btn ${ans.flagged ? "on" : ""}`} onClick={toggleFlag}><BkIcon on={ans.flagged} /></button>
        </div>

        {isFreeform ? (
        /* ── Freeform as structured options ── */
        <div className="opts">
            <div className="type-label">Choose one</div>
            {/* Option 1: Nothing Else */}
            <button
            className={`opt ${ans.selected.includes("Nothing else to add") ? "sel" : ""}`}
            onClick={() => {onAnswer(q.id, { ...ans, selected: ["Nothing else to add"], custom: "" });setShowCustom(false);setDraft("");}}>
            
              <div className="ocheck">{ans.selected.includes("Nothing else to add") && <Chk />}</div>
              <div><div className="olbl">Nothing else to add</div><div className="osub">We are happy with what we have covered</div></div>
            </button>
            {/* Option 2: Add own notes */}
            <button
            className={`opt ${ans.selected.includes("Add our own notes") ? "sel" : ""}`}
            onClick={() => {onAnswer(q.id, { ...ans, selected: ["Add our own notes"] });setShowCustom(true);}}>
            
              <div className="ocheck">{ans.selected.includes("Add our own notes") && <Chk />}</div>
              <div><div className="olbl">Add our own notes</div><div className="osub">Cultural needs, religious preferences, specific requests…</div></div>
            </button>
            {/* Expanded textarea when "Add notes" is selected */}
            {ans.selected.includes("Add our own notes") &&
          <div className="custom-row" style={{ background: ans.custom ? "var(--sage-bg)" : "white", borderColor: ans.custom ? "var(--sage)" : undefined, animation: "fadeUp 0.2s ease" }}>
                <div className="custom-expand">
                  <textarea
                className="custom-inp"
                rows={4}
                placeholder={"e.g. We observe Shabbat and need a kosher meal option.\ne.g. We want our doula present for all consultations."}
                value={ans.custom || ""}
                onChange={(e) => onAnswer(q.id, { ...ans, selected: ["Add our own notes"], custom: e.target.value })}
                style={{ resize: "none" }}
                autoFocus />
              
                  <div style={{ fontSize: 11, marginTop: 4, fontWeight: 500, minHeight: 16, color: ans.custom ? "var(--sage)" : "var(--soft)" }}>
                    {ans.custom ? "✓ Saved" : "Start typing…"}
                  </div>
                </div>
              </div>
          }
            <button className={`flag-strip ${ans.flagged ? "on" : ""}`} onClick={toggleFlag}>
              <BkIcon on={ans.flagged} />
              <span className="flag-lbl">{ans.flagged ? "Flagged — we will come back to this" : "Come back to this later"}</span>
            </button>
          </div>) : (

        /* ── Structured options ── */
        <div className="opts">
            {typeLabel && <div className="type-label">{typeLabel}</div>}
            {q.options.map((opt, i) =>
          <OptBtn key={i} label={opt.label} sub={opt.sub} selected={ans.selected.includes(opt.label)} onToggle={toggle} inputType={q.type} infoKey={opt.infoKey} onInfo={setInfoSheet} />
          )}

            {branchTriggered &&
          <BranchCard branch={q.branch} branchAns={branchAns || { selected: [], custom: "" }} onBranchAnswer={(val) => onAnswer(branchId, val)} onInfo={setInfoSheet} />
          }

            <div className="custom-row" style={{ background: ans.custom ? "var(--sage-bg)" : "white", borderColor: ans.custom ? "var(--sage)" : undefined }}>
              {!showCustom ?
            <button className="custom-trigger" onClick={() => {setShowCustom(true);setDraft(ans.custom || "");}}>
                    <div className="ocheck-sq" style={{ border: "2px dashed oklch(75% 0.04 75)", background: ans.custom ? "var(--sage)" : "transparent" }}>{ans.custom && <Chk />}</div>
                    <div className="olbl" style={{ color: ans.custom ? "var(--navy)" : "var(--soft)", fontStyle: ans.custom ? "normal" : "italic" }}>{ans.custom || "Add our own preference..."}</div>
                  </button> :
            <div className="custom-expand">
                    <textarea className="custom-inp" rows={2} placeholder="Describe your preference in your own words..." value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
                    <button className="custom-save" onClick={saveCustom}>Save</button>
                  </div>
            }
            </div>

            <button className={`flag-strip ${ans.flagged ? "on" : ""}`} onClick={toggleFlag}>
              <BkIcon on={ans.flagged} />
              <span className="flag-lbl">{ans.flagged ? "Flagged — we will come back to this" : "Come back to this later"}</span>
            </button>
          </div>)
        }
      </div>
      <div className="nav-row">
        <button className="nav-skip" onClick={goBack}>{editMode ? "Cancel" : "← Back"}</button>
        <button className={`nav-next ${isLast && !editMode ? "terra" : ""}`} onClick={goNext} disabled={!isFreeform && !hasAnswer && !ans.flagged}>{editMode ? "Save →" : isLast ? "See Summary →" : "Next →"}</button>
      </div>
    </div>);

}

// ─── BIRTH SUMMARY ───────────────────────────────────────────────────────────

function BirthSummary({ answers, onBack, onHome, onEditQuestion }) {
  const decided = BPQ.filter((q) => {const a = getAns(answers, q.id);return (a.selected.length > 0 || a.custom) && !a.flagged;});
  const flagged = BPQ.filter((q) => getAns(answers, q.id).flagged);
  const skipped = BPQ.filter((q) => {const a = getAns(answers, q.id);return a.selected.length === 0 && !a.custom && !a.flagged;});

  const TC = ({ q, variant }) => {
    const a = getAns(answers, q.id);
    const branchId = q.branch?.id;
    const bAns = branchId ? getAns(answers, branchId) : null;
    const isEmpty = a.selected.length === 0 && !a.custom && !a.flagged;
    return (
      <div className="sum-tc" style={{ borderLeft: isEmpty ? "3px solid oklch(88% 0.03 75)" : undefined }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 5 }}>
          <div className="sum-tn">{q.topic}</div>
          <button onClick={() => onEditQuestion(q.id)} style={{ border: "none", background: "var(--sage-bg)", color: "var(--sage)", fontSize: 11, fontWeight: 600, borderRadius: 7, padding: "3px 9px", cursor: "pointer", flexShrink: 0, marginLeft: 8 }}>Edit</button>
        </div>
        {q.type === "freeform" ?
        a.custom ?
        <div style={{ fontSize: 12, color: "var(--navy)", lineHeight: 1.55, fontStyle: "italic" }}>"{a.custom}"</div> :
        <span style={{ fontSize: 11, color: "var(--soft)", fontStyle: "italic" }}>Not answered</span> :

        <>
            <div className="sum-pills">
              {a.selected.map((s, i) => <span key={i} className={`spill ${variant === "flagged" ? "amb" : ""}`}>{s}</span>)}
              {a.custom && <span className="spill cust">"{a.custom}"</span>}
              {a.selected.length === 0 && !a.custom && <span style={{ fontSize: 11, color: "var(--soft)", fontStyle: "italic" }}>Not answered</span>}
            </div>
            {bAns && bAns.selected.length > 0 &&
          <div style={{ marginTop: 6, paddingLeft: 8, borderLeft: "2px solid var(--sage-bg)" }}>
                <div style={{ fontSize: 10, color: "var(--sage)", fontWeight: 700, marginBottom: 3 }}>↳ Also</div>
                <div className="sum-pills">{bAns.selected.map((s, i) => <span key={i} className="spill" style={{ background: "oklch(92% 0.03 155)" }}>{s}</span>)}</div>
              </div>
          }
          </>
        }
      </div>);

  };

  return (
    <div className="screen">
      <div className="scroll">
        <div className="sum-hero">
          <div className="sum-stats">
            <div className="sum-stat"><div className="sum-stat-n" style={{ color: "var(--sage)" }}>{decided.length}</div><div className="sum-stat-l">Decided</div></div>
            {flagged.length > 0 && <div className="sum-stat"><div className="sum-stat-n" style={{ color: "var(--amber)" }}>{flagged.length}</div><div className="sum-stat-l">To revisit</div></div>}
            {skipped.length > 0 && <div className="sum-stat"><div className="sum-stat-n" style={{ color: "var(--soft)" }}>{skipped.length}</div><div className="sum-stat-l">Skipped</div></div>}
          </div>
          <div className="sum-title">Your Birth Plan</div>
          <div className="sum-sub">{decided.length} of {BPQ.length} topics covered</div>
        </div>
        {decided.length > 0 &&
        <div className="sum-sec">
            <div className="sum-sec-lbl"><span style={{ color: "var(--sage)" }}>✓</span> Decided</div>
            {decided.map((q) => <TC key={q.id} q={q} variant="decided" />)}
          </div>
        }
        {flagged.length > 0 &&
        <div className="sum-sec">
            <div className="sum-sec-lbl"><BkIcon on /> Come Back to These</div>
            {flagged.map((q) => <TC key={q.id} q={q} variant="flagged" />)}
          </div>
        }
        {skipped.length > 0 &&
        <div className="sum-sec">
            <div className="sum-sec-lbl">Not Yet Discussed</div>
            {skipped.map((q) =>
          <div key={q.id} className="sum-tc" style={{ opacity: 0.55, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="sum-tn" style={{ marginBottom: 0 }}>{q.topic}</div>
                <button onClick={() => onEditQuestion(q.id)} style={{ border: "none", background: "oklch(93% 0.018 75)", color: "var(--mid)", fontSize: 11, fontWeight: 600, borderRadius: 7, padding: "3px 9px", cursor: "pointer", flexShrink: 0 }}>Answer</button>
              </div>
          )}
          </div>
        }
        <div className="sum-sec">
          <div className="sum-sec-lbl">At the Hospital</div>
          <div className="guide-card">
            {["Print 3 copies before you leave home.", "Hand one to your nurse when you arrive.", "Stay flexible — birth rarely follows a plan exactly.", "Your job: be her voice when she cannot speak for herself.", "Ask questions. Do not assume. Advocate kindly."].map((l, i) =>
            <div key={i} className="guide-ln"><span style={{ color: "var(--sage)", fontWeight: 700 }}>→</span><span>{l}</span></div>
            )}
          </div>
        </div>
        <div style={{ height: 10 }} />
      </div>
      <div className="act-row">
        <button className="act act-s" onClick={onBack}>Edit</button>
        <button className="act act-p" onClick={onHome}>Done ✓</button>
      </div>
    </div>);

}

Object.assign(window, { BirthInterview, BirthSummary });
