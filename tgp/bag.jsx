// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;

// ─── BAG INTERVIEW ───────────────────────────────────────────────────────────
function BagInterview({ included, onToggleIncluded, customItems, onAddCustom, onRemoveCustom, onBack, onFinish, initialCatIdx = 0 }) {
  const [catIdx, setCatIdx] = useState(initialCatIdx);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newStage, setNewStage] = useState("prep");

  const cat = BAG_CATS[catIdx];
  const isLast = catIdx === BAG_CATS.length - 1;
  const customs = customItems[cat.id] || [];
  const allItems = [...cat.items, ...customs];
  const includedCount = allItems.filter((i) => included[i.id] !== false).length;
  const pct = catIdx / BAG_CATS.length;

  const resetForm = () => {setShowAddForm(false);setNewName("");setNewNote("");setNewStage("prep");};
  const addItem = () => {
    if (!newName.trim()) return;
    const newItem = { id: `custom-${cat.id}-${Date.now()}`, name: newName.trim(), note: newNote.trim(), stage: newStage, isCustom: true };
    onAddCustom(cat.id, newItem);
    resetForm();
  };
  const next = () => {resetForm();if (!isLast) setCatIdx(catIdx + 1);else onFinish();};
  const goBack = () => {resetForm();if (catIdx === 0) onBack();else setCatIdx(catIdx - 1);};

  const StagePill = ({ s, label }) =>
  <button className={`stage-pill ${newStage === s ? `active-${s}` : "inactive"}`} onClick={() => setNewStage(s)}>{label}</button>;


  return (
    <div className="screen">
      <div className="ihead">
        <button className="back-btn" onClick={onBack}><BackArrow /></button>
        <div className="ihead-info">
          <div className="ihead-title">Labor Bag</div>
          <div className="prog-bar" style={{ background: "oklch(90% 0.04 50)" }}>
            <div className="prog-fill" style={{ width: `${pct * 100}%`, background: "var(--terra)" }} />
          </div>
        </div>
        <div className="ihead-ct">{catIdx + 1}/{BAG_CATS.length}</div>
      </div>

      <div className="scroll">
        <div className="bag-icard" key={cat.id}>
          <div className="bag-cat-hdr">
            <div className="bag-cat-icon" style={{ background: cat.color }}>{cat.icon}</div>
            <div>
              <div className="bag-cat-name">{cat.name}</div>
              <div className="bag-cat-sub">{includedCount} of {allItems.length} items selected</div>
            </div>
          </div>
          <div className="bag-hint">All items are included by default. Tap <strong>✓ In ×</strong> to remove anything you don't need. Add your own below.</div>

          {/* Preset items */}
          {cat.items.map((item) => {
            const on = included[item.id] !== false;
            return (
              <div key={item.id} className="bag-sel-item">
                <div style={{ flex: 1 }}>
                  <div className={`bag-iname ${on ? "" : "off"}`}>{item.name}</div>
                  {item.note && <div className="bag-inote">{item.note}</div>}
                </div>
                <span className={`bag-stage-badge ${on ? BADGE_CLASS[item.stage] : ""}`} style={!on ? { background: "oklch(92% 0.01 75)", color: "var(--soft)" } : {}}>{STAGE_LABELS[item.stage]}</span>
                <button className={`bag-chip ${on ? "in" : "out"}`} onClick={() => onToggleIncluded(item.id)}>
                  {on ? <>✓ In<div className="bag-chip-x"><svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M1 1l4 4M5 1L1 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></div></> : "+ Add back"}
                </button>
              </div>);

          })}

          {/* Custom items */}
          {customs.map((item) => {
            const on = included[item.id] !== false;
            return (
              <div key={item.id} className="bag-sel-item">
                <div style={{ flex: 1 }}>
                  <div className={`bag-iname ${on ? "" : "off"}`}>{item.name}</div>
                  {item.note && <div className="bag-inote">{item.note}</div>}
                </div>
                <span className={`bag-stage-badge ${on ? BADGE_CLASS[item.stage] : ""}`} style={!on ? { background: "oklch(92% 0.01 75)", color: "var(--soft)" } : {}}>{STAGE_LABELS[item.stage]}</span>
                <button className={`bag-chip ${on ? "in" : "out"}`} onClick={() => onToggleIncluded(item.id)}>
                  {on ? <>✓ In<div className="bag-chip-x"><svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M1 1l4 4M5 1L1 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></div></> : "+ Add back"}
                </button>
                <button className="bag-custom-del" onClick={(e) => {e.stopPropagation();onRemoveCustom(cat.id, item.id);}}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="var(--soft)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>);

          })}

          {/* Add item */}
          {!showAddForm ?
          <button className="bag-add-btn" onClick={() => setShowAddForm(true)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="var(--soft)" strokeWidth="1.8" strokeLinecap="round" /></svg>
                <span className="bag-add-lbl">Add our own item...</span>
              </button> :
          <div className="bag-add-form">
                <input className="bag-add-field" placeholder="Item name (e.g. Favorite snack for her)" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
                <input className="bag-add-field" placeholder="Note or reminder (optional)" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                <div className="stage-pills">
                  <StagePill s="prep" label="Before" />
                  <StagePill s="labor" label="Labor" />
                  <StagePill s="post" label="Recovery" />
                </div>
                <div className="bag-add-row">
                  <button className="bag-add-cancel" onClick={resetForm}>Cancel</button>
                  <button className="bag-add-save" onClick={addItem} disabled={!newName.trim()}>Add Item</button>
                </div>
              </div>
          }
        </div>
      </div>

      <div className="nav-row">
        <button className="nav-skip" onClick={goBack}>← Back</button>
        <button className={`nav-next ${isLast ? "terra" : ""}`} style={!isLast ? { background: "var(--terra)" } : {}} onClick={next}>
          {isLast ? "See Checklist →" : "Next Category →"}
        </button>
      </div>
    </div>);

}

// ─── BAG SUMMARY ─────────────────────────────────────────────────────────────
function BagSummary({ included, customItems, packed, onTogglePacked, onBack, onEditCat, onHome }) {
  const [activeTab, setActiveTab] = useState("all");
  const [hidePacked, setHidePacked] = useState(false);
  const tabs = [{ id: "all", label: "All" }, { id: "prep", label: "Before" }, { id: "labor", label: "Labor" }, { id: "post", label: "Recovery" }];

  const allSelected = BAG_CATS.flatMap((c) => [
  ...c.items.filter((i) => included[i.id] !== false),
  ...(customItems[c.id] || []).filter((i) => included[i.id] !== false)]
  );
  const total = allSelected.length;
  const packedCt = allSelected.filter((i) => packed[i.id]).length;
  const pct = total ? packedCt / total : 0;

  return (
    <div className="screen">
      <div className="scroll">
        <div style={{ background: "linear-gradient(170deg, oklch(92% 0.06 50), oklch(97% 0.012 75))", padding: "22px 20px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{pct === 1 ? "✅" : "🎒"}</div>
          <div className="sum-title">{pct === 1 ? "Bag is Ready!" : "Labor Bag Checklist"}</div>
          <div className="sum-sub" style={{ marginBottom: 14 }}>{packedCt} of {total} items packed</div>
          <div className="bsum-tabs">
            {tabs.map((t) => <button key={t.id} className={`bsum-tab ${activeTab === t.id ? "on" : "off"}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>)}
          </div>
        </div>
        <div style={{ padding: "10px 16px 0", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={() => setHidePacked((h) => !h)} style={{ display: "flex", alignItems: "center", gap: 6, background: hidePacked ? "var(--terra-bg)" : "white", border: "none", borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: hidePacked ? "var(--terra)" : "var(--soft)", cursor: "pointer", boxShadow: "0 1px 4px rgba(28,43,30,0.08)", transition: "all 0.15s" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M3 6h6M5 9h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            {hidePacked ? "Showing unpacked only" : "Hide packed items"}
          </button>
        </div>
        <div style={{ padding: "10px 16px 0" }}>
          {BAG_CATS.map((cat) => {
            const allItems = [
            ...cat.items.filter((i) => included[i.id] !== false),
            ...(customItems[cat.id] || []).filter((i) => included[i.id] !== false)].
            filter((i) => activeTab === "all" || i.stage === activeTab);
            const items = hidePacked ? allItems.filter((i) => !packed[i.id]) : allItems;
            if (!allItems.length) return null;
            const pkd = allItems.filter((i) => packed[i.id]).length;
            if (hidePacked && items.length === 0) return (
              <div key={cat.id} className="bsum-cat">
                <div className="bsum-cat-hdr">
                  <div className="bsum-cat-name"><span>{cat.icon}</span>{cat.name}</div>
                  <div className="bsum-cat-ct" style={{ color: "var(--sage)", fontWeight: 600 }}>All packed ✓</div>
                </div>
              </div>);

            return (
              <div key={cat.id} className="bsum-cat">
                <div className="bsum-cat-hdr">
                  <div className="bsum-cat-name"><span>{cat.icon}</span>{cat.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="bsum-cat-ct">{pkd}/{allItems.length}</div>
                    <button onClick={() => onEditCat(BAG_CATS.findIndex((c) => c.id === cat.id))} style={{ border: "none", background: "var(--terra-bg)", color: "var(--terra)", fontSize: 10, fontWeight: 600, borderRadius: 7, padding: "3px 8px", cursor: "pointer" }}>Edit</button>
                  </div>
                </div>
                <div style={{ background: "white", borderRadius: 14, padding: "4px 10px", boxShadow: "0 2px 8px rgba(28,43,30,0.06)" }}>
                  {items.map((item) =>
                  <div key={item.id} className={`bsum-item ${packed[item.id] ? "pk" : ""}`} onClick={() => onTogglePacked(item.id)}>
                      <div className={`bdot ${packed[item.id] ? "on" : "off"}`}>{packed[item.id] && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}</div>
                      <span>{item.name}</span>
                      {item.isCustom && <span style={{ fontSize: 9, color: "var(--soft)", marginLeft: 4, fontStyle: "italic" }}>custom</span>}
                    </div>
                  )}
                </div>
              </div>);

          })}
        </div>
        <div style={{ height: 8 }} />
      </div>
      <div className="act-row">
        <button className="act act-s" onClick={() => onEditCat(0)}>Edit List</button>
        <button className="act act-t" onClick={onHome}>Done ✓</button>
      </div>
    </div>);

}

Object.assign(window, { BagInterview, BagSummary });
