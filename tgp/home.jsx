// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;

// ─── OVERFLOW MENU ───────────────────────────────────────────────────────────
function OverflowMenu({ dadName, partnerName, onSaveNames, onReviewOnboarding, onResetBirth, onResetBag, onResetAll, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const [dadDraft, setDadDraft] = useState(dadName);
  const [partnerDraft, setPartnerDraft] = useState(partnerName);
  const toggle = (key) => setExpanded((e) => e === key ? null : key);

  function OvfIcon({ children, bg, color }) {
    return <div className="ovf-icon" style={{ background: bg, color: color }}>{children}</div>;
  }
  function Chevron({ k }) {
    return <div className={`ovf-chevron ${expanded === k ? 'open' : ''}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
    </div>;
  }

  return (
    <>
      <div className="ovf-scrim" onClick={onClose} />
      <div className="ovf-sheet">
        <div className="ovf-handle"><div className="ovf-drag" /></div>
        <div className="ovf-header">
          <div>
            <div className="ovf-title">Settings</div>
            <div className="ovf-names">{dadName}{partnerName ? ` & ${partnerName}` : ''}</div>
          </div>
          <button className="ovf-close" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--mid)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="ovf-divider" />

        {/* Edit names */}
        <div className="ovf-item" onClick={() => toggle('names')}>
          <OvfIcon bg="var(--sage-bg)" color="var(--sage)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          </OvfIcon>
          <div className="ovf-item-text">
            <div className="ovf-item-label">Edit names</div>
            <div className="ovf-item-sub">Change how we address you two</div>
          </div>
          <Chevron k="names" />
        </div>
        {expanded === 'names' &&
        <div className="ovf-expansion">
            <div className="ovf-exp-lbl">Your name</div>
            <input className="ovf-exp-input" value={dadDraft} onChange={(e) => setDadDraft(e.target.value)} placeholder="Your name" />
            <div className="ovf-exp-lbl">Partner's name</div>
            <input className="ovf-exp-input partner" value={partnerDraft} onChange={(e) => setPartnerDraft(e.target.value)} placeholder="Partner's name" />
            <button className="ovf-exp-save" onClick={() => {onSaveNames(dadDraft.trim(), partnerDraft.trim());setExpanded(null);}}>Save names</button>
          </div>
        }

        {/* Review onboarding — direct action */}
        <div className="ovf-item" onClick={() => { onReviewOnboarding(); onClose(); }}>
          <OvfIcon bg="var(--amber-bg)" color="var(--amber)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </OvfIcon>
          <div className="ovf-item-text">
            <div className="ovf-item-label">Review onboarding</div>
            <div className="ovf-item-sub">Replay the welcome walkthrough</div>
          </div>
          <div className="ovf-chevron" style={{transform:'rotate(-45deg)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

        {/* Export */}
        <div className="ovf-item" onClick={() => toggle('export')}>
          <OvfIcon bg="oklch(93% 0.04 220)" color="oklch(42% 0.08 220)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
          </OvfIcon>
          <div className="ovf-item-text">
            <div className="ovf-item-label">Export / Share</div>
            <div className="ovf-item-sub">Copy your plan as text</div>
          </div>
          <Chevron k="export" />
        </div>
        {expanded === 'export' &&
        <div className="ovf-export-placeholder">
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)', marginBottom: 3 }}>Coming soon</div>
              <div style={{ fontSize: 11, color: 'var(--soft)' }}>PDF export and share link will be available in a future update.</div>
            </div>
            <div className="ovf-soon-badge">Soon</div>
          </div>
        }

        <div className="ovf-divider" style={{ margin: '4px 22px' }} />

        {/* Reset Birth Plan */}
        <div className="ovf-item" onClick={() => toggle('reset-birth')}>
          <OvfIcon bg="var(--sage-bg)" color="var(--sage)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
          </OvfIcon>
          <div className="ovf-item-text">
            <div className="ovf-item-label">Reset Birth Plan</div>
            <div className="ovf-item-sub">Clear all birth plan answers</div>
          </div>
          <Chevron k="reset-birth"/>
        </div>
        {expanded === 'reset-birth' &&
        <div className="ovf-confirm">
            <div className="ovf-confirm-text">This will clear all birth plan answers. Your bag selections are unaffected.</div>
            <div className="ovf-confirm-btns">
              <button className="ovf-confirm-cancel" onClick={() => setExpanded(null)}>Cancel</button>
              <button className="ovf-confirm-go" onClick={() => {onResetBirth();setExpanded(null);onClose();}}>Clear plan</button>
            </div>
          </div>
        }

        {/* Reset Labor Bag */}
        <div className="ovf-item" onClick={() => toggle('reset-bag')}>
          <OvfIcon bg="var(--terra-bg)" color="var(--terra)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
          </OvfIcon>
          <div className="ovf-item-text">
            <div className="ovf-item-label">Reset Labor Bag</div>
            <div className="ovf-item-sub">Clear all bag selections</div>
          </div>
          <Chevron k="reset-bag"/>
        </div>
        {expanded === 'reset-bag' &&
        <div className="ovf-confirm">
            <div className="ovf-confirm-text">This will clear all bag selections and packed items. Your birth plan is unaffected.</div>
            <div className="ovf-confirm-btns">
              <button className="ovf-confirm-cancel" onClick={() => setExpanded(null)}>Cancel</button>
              <button className="ovf-confirm-go" onClick={() => {onResetBag();setExpanded(null);onClose();}}>Clear bag</button>
            </div>
          </div>
        }

        {/* Start over */}
        <div className="ovf-item" onClick={() => toggle('reset-all')}>
          <OvfIcon bg="oklch(95% 0.04 20)" color="oklch(52% 0.15 20)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
          </OvfIcon>
          <div className="ovf-item-text">
            <div className="ovf-item-label dest">Start over</div>
            <div className="ovf-item-sub">Clear everything and restart</div>
          </div>
          <div className={`ovf-chevron ${expanded === 'reset-all' ? 'open' : ''}`} style={{color:'oklch(52% 0.15 20)', opacity:0.6}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
        {expanded === 'reset-all' &&
        <div className="ovf-confirm">
            <div className="ovf-confirm-text">This will clear all answers, bag selections, and your names. Everything starts fresh.</div>
            <div className="ovf-confirm-btns">
              <button className="ovf-confirm-cancel" onClick={() => setExpanded(null)}>Cancel</button>
              <button className="ovf-confirm-go" onClick={() => {onResetAll();onClose();}}>Start over</button>
            </div>
          </div>
        }
      </div>
    </>);

}

// ─── HOME ────────────────────────────────────────────────────────────────────
function Home({ bAnswers, bagIncluded, bagCustom, bagPacked, bagInterviewDone, dadName, partnerName, onStart, onReset, onOpenOverflow }) {
  const allBagItems = [
  ...BAG_CATS.flatMap((c) => c.items.filter((i) => bagIncluded[i.id] !== false)),
  ...Object.values(bagCustom).flat()];

  const bagTotal = allBagItems.length;
  const bagDone = allBagItems.filter((i) => bagPacked[i.id]).length;
  const birthDone = BPQ.filter((q) => {const a = getAns(bAnswers, q.id);return a.selected.length > 0 || a.custom;}).length;
  const birthFlagged = BPQ.filter((q) => getAns(bAnswers, q.id).flagged).length;
  return (
    <div className="screen">
      <div className="scroll">
        <div className="home-hero">
          <div style={{flex:1, minWidth:0}}>
            <div className="eyebrow">{dadName ? `Hey, ${dadName}` : 'Welcome, Dad'}</div>
            <div className="hero-title">The Game Plan</div>
            <div className="hero-sub">{partnerName ? `Prepare together with ${partnerName}.` : 'Two guided conversations to prepare together before labor begins.'}</div>
          </div>
          <button className="overflow-btn" onClick={onOpenOverflow} aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></svg>
          </button>
        </div>
        <div className="prow">
          <button type="button" className="ppill" onClick={() => onStart(birthDone === BPQ.length ? "birth-summary" : "birth")} aria-label={`Birth Plan, ${birthDone} of ${BPQ.length} topics`}>
            <div className="pring"><PRing pct={birthDone / BPQ.length} color="var(--sage)" /><div className="pring-lbl">{birthDone === BPQ.length && <span style={{ color: "var(--sage)" }}>✓</span>}</div></div>
            <div><div className="pinfo-name">Birth Plan</div><div className="pinfo-val">{birthDone}/{BPQ.length} topics</div></div>
          </button>
          <button type="button" className="ppill" onClick={() => onStart(bagInterviewDone ? "bag-summary" : "bag")} aria-label={`Labor Bag, ${bagDone} of ${bagTotal} packed`}>
            <div className="pring"><PRing pct={bagTotal ? bagDone / bagTotal : 0} color="var(--terra)" /><div className="pring-lbl">{bagTotal && bagDone === bagTotal && <span style={{ color: "var(--terra)" }}>✓</span>}</div></div>
            <div><div className="pinfo-name">Labor Bag</div><div className="pinfo-val">{bagDone}/{bagTotal} packed</div></div>
          </button>
        </div>
        <div style={{ height: 4 }} />
        {/* ── The Game Plan section — appears above interviews once complete ── */}
        {(birthDone === BPQ.length || bagInterviewDone) &&
        <>
            <div className="sec-lbl">The Game Plan</div>
            <div className="cards" style={{ marginBottom: 4 }}>
              {birthDone === BPQ.length &&
            <div className="hcard" onClick={() => onStart("birth-summary")} style={{ borderLeft: "4px solid var(--sage)", borderRadius: "0 22px 22px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 13, background: "var(--sage-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🏥</div>
                    <div style={{ flex: 1 }}>
                      <div className="hcard-pre" style={{ marginBottom: 2 }}>Birth Plan</div>
                      <div style={{ fontFamily: "Lora, serif", fontSize: 17, fontWeight: 600, color: "var(--navy)" }}>View our plan →</div>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="11" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>
            }
              {bagInterviewDone &&
            <div className="hcard" onClick={() => onStart("bag-summary")} style={{ borderLeft: "4px solid var(--terra)", borderRadius: "0 22px 22px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 13, background: "var(--terra-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🎒</div>
                    <div style={{ flex: 1 }}>
                      <div className="hcard-pre" style={{ marginBottom: 2 }}>Labor Bag</div>
                      <div style={{ fontFamily: "Lora, serif", fontSize: 17, fontWeight: 600, color: "var(--navy)" }}>View our bag list →</div>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--terra)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="11" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>
            }
            </div>
          </>
        }
        <div style={{ height: 16 }} />
        <div className="sec-lbl">Your Interviews</div>
        <div className="cards">
          <div className="hcard" onClick={() => onStart("birth")} style={{ borderLeft: "4px solid var(--sage)", borderRadius: "0 22px 22px 0" }}>
            <div className="hcard-accent" style={{ background: "var(--sage)" }} />
            <div className="hcard-icon" style={{ background: "var(--sage-bg)" }}>🏥</div>
            <div className="hcard-pre">What's our plan?</div>
            <div className="hcard-title">Birth Plan Interview</div>
            <div className="hcard-sub">Let's build our Birth Plan</div>
            <div className="hcard-desc">Pain management, interventions, who's in the room, cord cutting, skin-to-skin and more — answered together.</div>
            <div className="hcard-foot">
              <div className="hcard-meta">{BPQ.length} topics{birthFlagged > 0 ? ` · ${birthFlagged} flagged` : ""}</div>
              <div className="hcard-cta">{birthDone === BPQ.length ? "Done ✓" : birthDone > 0 ? "Continue →" : "Start →"}</div>
            </div>
          </div>
          <div className="hcard" onClick={() => onStart("bag")} style={{ borderLeft: "4px solid var(--terra)", borderRadius: "0 22px 22px 0" }}>
            <div className="hcard-accent" style={{ background: "var(--terra)" }} />
            <div className="hcard-icon" style={{ background: "var(--terra-bg)" }}>🎒</div>
            <div className="hcard-pre">What to bring?</div>
            <div className="hcard-title">Labor Bag Interview</div>
            <div className="hcard-sub">Checklist items for our Labor Bag</div>
            <div className="hcard-desc">Review suggested items, remove what you don't need, add your own — then pack category by category.</div>
            <div className="hcard-foot">
              <div className="hcard-meta">{bagTotal} items selected · 6 categories</div>
              <div className="hcard-cta" style={{ color: "var(--terra)" }}>{bagInterviewDone ? "Done ✓" : bagDone > 0 ? "Continue →" : "Start →"}</div>
            </div>
          </div>
        </div>

        <ProTips />
      </div>
    </div>);

}

Object.assign(window, { Home, OverflowMenu });
