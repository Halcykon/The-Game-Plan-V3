// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;

// ─── FIRST LAUNCH MODAL ──────────────────────────────────────────────────────
function SymbolHandsInline({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="38" fill="oklch(88% 0.07 155)" />
      <path d="M14 42c0-2 1.5-4 4-4h4l2-8c.5-2 2-3 3.5-2.5s2 2.2 1.5 3.5L27 36h3l2-9c.4-2 2-3.2 3.5-2.7s2.2 2.2 1.7 3.7L35 36h2l1-6c.4-2 2-3 3.5-2.5s2 2.2 1.5 3.5L42 36h1.5l.5-4c.3-1.8 1.8-3 3.2-2.6 1.5.5 2 2 1.6 3.5L47 42c0 5-3 9-7 10.5L34 54c-4 1.5-8 0-10-3L14 42z" fill="oklch(52% 0.09 155)" opacity="0.8" />
      <path d="M40 31c0-3 2.5-5 5-5s5 2.5 5 5c0 5-5 9-10 12-5-3-10-7-10-12 0-2.5 2.5-5 5-5 2 0 3.5 1 5 3z" fill="oklch(68% 0.14 75)" />
    </svg>);

}
function SymbolShieldInline({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="38" fill="oklch(93% 0.04 50)" />
      <path d="M40 16l-18 8v12c0 11 8 21 18 24 10-3 18-13 18-24V24L40 16z" fill="oklch(93% 0.06 155)" stroke="oklch(52% 0.09 155)" strokeWidth="1.5" />
      <path d="M33 40l5 5 9-9" stroke="oklch(52% 0.09 155)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

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

  return (
    <div className="modal-overlay">
      <div style={{ height: 54 }} />
      <div className="modal-progress">
        <div className="modal-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* STEP 0 — Names */}
      {step === 0 &&
      <div className="modal-step" key="m0">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px 16px', textAlign: 'center', overflowY: 'auto', scrollbarWidth: 'none' }}>
            <div className="modal-float" style={{ marginBottom: 22 }}>
              <SymbolHandsInline size={72} />
            </div>
            <div className="modal-headline-names" style={{ marginBottom: 10 }}>
              The best gift you can give her is knowing <em>exactly</em> what she wants.
            </div>
            <div style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.6, marginBottom: 28, textWrap: 'pretty' }}>
              Welcome to The Game Plan.<br />Who's preparing together?
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
              <div>
                <div className="modal-field-lbl">Your name</div>
                <input className="modal-name-input" type="text" placeholder="e.g. Marcus" value={dadName} onChange={(e) => setDadName(e.target.value)} />
              </div>
              <div>
                <div className="modal-field-lbl">Your partner's name</div>
                <input className="modal-name-input partner" type="text" placeholder="e.g. Sofia" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="modal-nav">
            <button
            className="modal-nav-primary"
            style={{ opacity: canContinue ? 1 : 0.35, cursor: canContinue ? 'pointer' : 'default' }}
            onClick={() => canContinue && setStep(1)}>
            
              Let's go, {canContinue ? dadName.trim() : 'dad'} →
            </button>
          </div>
        </div>
      }

      {/* STEP 1 — The insight */}
      {step === 1 &&
      <div className="modal-step" key="m1">
          <div className="modal-step-bg-sage">
            <div className="modal-float" style={{ marginBottom: 22 }}><SymbolHandsInline size={72} /></div>
            <div className="modal-step-lbl">Step 1 of 3</div>
            <div className="modal-headline">The gift {partnerName.trim() ? partnerName.trim() : 'she'}<br />can't ask for herself</div>
          </div>
          <div className="modal-body-wrap">
            <div className="modal-insight">
              When labor begins, <strong>{partnerDisplay}</strong> will be entirely focused on getting through it. She can't advocate for herself in that moment — but <strong>you can</strong> be ready to do it for her.<br /><br />
              This isn't about being a bystander. It's about being <strong>prepared</strong> so you can speak up, stay calm, and be exactly what she needs.
            </div>
          </div>
          <div className="modal-dot-row">
            {dots.map((_, i) => <div key={i} className={`modal-dot ${i === 0 ? 'on' : ''}`} />)}
          </div>
          <div className="modal-nav" style={{ paddingTop: 0 }}>
            <button className="modal-nav-ghost" onClick={() => setStep(0)}>←</button>
            <button className="modal-nav-primary" onClick={() => setStep(2)}>Continue →</button>
          </div>
        </div>
      }

      {/* STEP 2 — The interviews */}
      {step === 2 &&
      <div className="modal-step" key="m2">
          <div className="modal-step-bg-terra">
            <div className="modal-step-lbl-terra">Step 2 of 3</div>
            <div className="modal-headline">Two interviews.<br />One solid game plan.</div>
            <div className="modal-sub">Do these together before the due date — 15–20 minutes total.</div>
          </div>
          <div className="modal-int-cards">
            <div className="modal-int-card">
              <div className="modal-int-num" style={{ background: 'oklch(94% 0.04 155)', color: 'oklch(42% 0.09 155)' }}>1</div>
              <div>
                <div className="modal-int-name">Birth Plan</div>
                <div className="modal-int-desc">Walk through {partnerPossessive} preferences — who's in the room, pain management, interventions. You'll know her answers cold.</div>
              </div>
            </div>
            <div className="modal-int-card">
              <div className="modal-int-num" style={{ background: 'oklch(93% 0.04 50)', color: 'oklch(44% 0.1 50)' }}>2</div>
              <div>
                <div className="modal-int-name">Labor Bag</div>
                <div className="modal-int-desc">Build the packing list together, sorted by stage. When the moment comes, you know exactly where everything is.</div>
              </div>
            </div>
          </div>
          <div className="modal-dot-row">
            {dots.map((_, i) => <div key={i} className={`modal-dot ${i === 1 ? 'on' : ''}`} />)}
          </div>
          <div className="modal-nav" style={{ paddingTop: 0 }}>
            <button className="modal-nav-ghost" onClick={() => setStep(1)}>←</button>
            <button className="modal-nav-primary" onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      }

      {/* STEP 3 — The commitment */}
      {step === 3 &&
      <div className="modal-step" key="m3">
          <div className="modal-commit-wrap">
            <div className="modal-float" style={{ marginBottom: 24 }}><SymbolShieldInline size={80} /></div>
            <div className="modal-step-lbl">Step 3 of 3</div>
            <div className="modal-commit-headline">
              This is how you<br />show up for <em>{partnerDisplay}.</em>
            </div>
            <div className="modal-commit-body">
              Every couple that uses The Game Plan goes into birth day more connected, more confident, and less afraid of the unknown.
            </div>
            <div className="modal-badges">
              <div className="modal-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                Stronger partnership
              </div>
              <div className="modal-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Confident advocate
              </div>
              <div className="modal-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                15 min together
              </div>
            </div>
          </div>
          <div className="modal-dot-row">
            {dots.map((_, i) => <div key={i} className={`modal-dot ${i === 2 ? 'on' : ''}`} />)}
          </div>
          <div className="modal-nav" style={{ paddingTop: 0 }}>
            <button className="modal-nav-ghost" onClick={() => setStep(2)}>←</button>
            <button className="modal-nav-primary terra" onClick={() => onComplete(dadName.trim(), partnerName.trim())}>Let's do this together</button>
          </div>
        </div>
      }
    </div>);

}

Object.assign(window, { FirstLaunchModal, SymbolHandsInline, SymbolShieldInline });
