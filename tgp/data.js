"use strict";
// Auto-generated section of The Game Plan — see The Game Plan v2.html for original.
var { useState, useEffect, useRef } = React;
// ─── MEDICAL INFO ─────────────────────────────────────────────────────────────
const MEDICAL_INFO = {
    "arom": {
        name: "Artificial Rupture of Membranes (AROM)",
        what: "A doctor or midwife uses a small plastic hook to break the amniotic sac (your waters), releasing the fluid. It's used to speed up or start labor.",
        why_yes: "Can accelerate stalled labor and allows internal fetal monitoring if needed.",
        why_no: "Once done, it can't be undone. Increases infection risk if delivery doesn't follow soon. May intensify contractions quickly.",
        time: "Takes seconds, usually done during an internal exam. Labor typically begins or accelerates within hours."
    },
    "iv-lock": {
        name: "IV Saline Lock",
        what: "A small plastic tube (cannula) inserted into a vein in the back of the hand or arm. A saline lock means no drip bag is attached — it's access-only, keeping you mobile.",
        why_yes: "Allows medication to be given instantly in an emergency without another needle. Standard of care in most hospitals.",
        why_no: "Some people prefer no IV at all. The lock itself is minimally restrictive compared to a full drip with a bag.",
        time: "Placed on arrival. Takes about 2 minutes. Stays in until you're discharged."
    },
    "pitocin": {
        name: "Pitocin (Oxytocin Augmentation)",
        what: "A synthetic version of the hormone oxytocin, given through an IV drip to start or strengthen contractions when labor is slow or stalled.",
        why_yes: "Effective at getting labor moving. Reduces risk of complications from very prolonged labor.",
        why_no: "Can make contractions stronger and more frequent than natural labor. Requires continuous fetal monitoring. Often leads to requesting an epidural.",
        time: "Started at a low dose and increased gradually until contractions are regular and effective."
    },
    "monitoring": {
        name: "Fetal Monitoring",
        what: "Two soft straps around the belly — one tracks baby's heart rate, one tracks contractions. Intermittent means checked periodically (e.g. every 30 min). Continuous means the monitors stay on throughout active labor.",
        why_yes: "Continuous monitoring catches problems early and is required with epidurals, Pitocin, or high-risk pregnancies.",
        why_no: "Continuous monitoring restricts movement — harder to walk, change positions, or use a birth tub. Evidence shows no difference in outcomes for low-risk pregnancies vs. intermittent.",
        time: "Intermittent checks take a few minutes. Continuous monitors are worn throughout active labor."
    },
    "epidural": {
        name: "Epidural",
        what: "A thin tube placed in the lower back that delivers continuous pain medication into the space around the spinal cord. It numbs the lower body while keeping you awake and alert.",
        why_yes: "The most effective form of pain relief. Allows rest during long labors. You stay fully conscious and present for the birth.",
        why_no: "May slow labor slightly. Limits mobility — you'll be in bed. Small risk of headache or drop in blood pressure. Requires continuous fetal monitoring.",
        time: "Takes 15–20 min to place. Works within 10–20 min. Can be adjusted throughout labor."
    },
    "nitrous": {
        name: "Nitrous Oxide (Gas & Air)",
        what: "A mix of nitrous oxide and oxygen you breathe through a mask during contractions. It takes the edge off pain without numbing you — you stay fully mobile and in control.",
        why_yes: "Works fast, wears off in minutes, no IV needed. You control when you use it. No lasting effect on baby.",
        why_no: "Doesn't eliminate pain — only softens it. Can cause nausea or lightheadedness in some people.",
        time: "Starts working in about 30 seconds. Effect wears off within minutes of stopping."
    },
    "iv-opioids": {
        name: "IV Opioids (Fentanyl / Morphine)",
        what: "Pain medication delivered through the IV that reduces pain intensity for 2–4 hours. It doesn't eliminate pain but makes contractions more manageable.",
        why_yes: "Fast-acting. Doesn't restrict movement as much as an epidural. A good option early in labor or as a bridge.",
        why_no: "Can cause drowsiness and nausea. May cross the placenta and cause temporary breathing effects in newborns if given close to delivery.",
        time: "Works within minutes. Given as needed in doses — not a continuous drip."
    },
    "spinal": {
        name: "Spinal Block",
        what: "A single injection of anesthetic directly into the spinal fluid, causing rapid, complete numbness from the waist down. More immediate and stronger than an epidural.",
        why_yes: "Works faster than an epidural. Most commonly used for planned C-sections or when rapid pain relief is needed urgently.",
        why_no: "Single fixed dose — cannot be topped up. Wears off in 1–2 hours. Less flexible for long labors.",
        time: "Full effect within 5 minutes. Lasts 1–2 hours."
    },
    "delayed-cord": {
        name: "Delayed Cord Clamping",
        what: "Waiting 1–3 minutes (or until the cord stops pulsing) before clamping and cutting the umbilical cord. During this time, blood continues transferring from the placenta to baby.",
        why_yes: "Baby receives up to 50% more blood volume. Increases iron stores, which benefits brain development. WHO recommends it for all births.",
        why_no: "Minimal downsides in healthy births. Not suitable if baby needs immediate resuscitation. May delay cutting if dad wants to cut the cord.",
        time: "Just a 1–3 minute wait after birth. The cord is then clamped and cut as usual."
    },
    "cord-blood": {
        name: "Cord Blood Banking",
        what: "After birth, blood remaining in the umbilical cord is collected and stored — either privately for your family or donated to a public bank. It contains stem cells that can treat certain diseases.",
        why_yes: "Stem cells can treat leukemia, sickle cell, and other blood disorders. Public donation is free and helps others. Private banking provides a family-specific resource.",
        why_no: "Private banking costs $1,000–3,000 upfront plus annual fees. The chance your child will use their own stored cells is very low. Must be arranged well before the due date.",
        time: "Collection happens right after birth in minutes. Must be arranged in advance — the hospital needs a kit."
    },
    "placenta-encapsulation": {
        name: "Placenta Encapsulation",
        what: "The placenta is cleaned, steamed, dehydrated, ground, and placed into capsules for the mother to take after birth, like a supplement.",
        why_yes: "Some mothers report improved mood, energy, and milk supply postpartum. Deeply meaningful in some cultural traditions.",
        why_no: "Limited scientific evidence for benefits. CDC has noted rare risk of bacterial contamination. Must be arranged with a specialist well before the due date.",
        time: "Arranged with an independent specialist. Pills are typically ready 1–3 days after birth."
    },
    "newborn-procedures": {
        name: "Newborn Eye Drops & Vitamin K",
        what: "Eye drops (erythromycin) prevent bacterial infections that can cause blindness. The Vitamin K injection prevents VKDB — a rare but serious bleeding disorder newborns are susceptible to in the first weeks of life.",
        why_yes: "Both are standard of care and very safe. Vitamin K deficiency bleeding is rare but can be severe — causing internal bleeding or brain damage. Eye drops prevent blindness from infections passed during delivery.",
        why_no: "Some parents choose to delay or decline. Eye drops may cause brief blurry vision. The Vitamin K shot is a small injection — brief discomfort for baby.",
        time: "Typically given within the first hour of birth. Both can be delayed to allow bonding time without significant risk."
    }
};
// ─── BIRTH PLAN DATA ─────────────────────────────────────────────────────────
const BPQ = [
    // ── 1. SETS THE PHILOSOPHY ───────────────────────────────────────────────
    { id: "interventions", topic: "Medical Interventions", type: "single",
        question: "What is your overall stance on medical interventions?",
        context: "This sets the baseline for how you will engage with the care team throughout labor.",
        options: [
            { label: "Follow the care team's lead", sub: "We trust their recommendations" },
            { label: "Discuss before consenting to anything", sub: "Inform us, then we decide together" },
            { label: "Prefer minimal intervention", sub: "Natural where possible, medical if needed" },
            { label: "Avoid intervention unless emergency", sub: "Strongly prefer natural progression" }
        ]
    },
    // ── 2. FIRST THINGS ON ARRIVAL ───────────────────────────────────────────
    { id: "procedures", topic: "Medical Procedures & Consent", type: "multi",
        question: "Which procedures do you want to pre-approve vs. discuss first?",
        context: "These are the first things staff will do when you arrive. Knowing your defaults spares you decisions mid-contraction.",
        options: [
            { label: "Limit cervix checks — ask each time", sub: "Prefer minimal internal exams" },
            { label: "No artificial water breaking (AROM) without our consent", sub: "Prefer membranes rupture on their own", infoKey: "arom" },
            { label: "IV saline lock only — no continuous drip", sub: "IV access without being tethered", infoKey: "iv-lock" },
            { label: "No Pitocin augmentation without our consent", sub: "We want to weigh in before speeding things up", infoKey: "pitocin" }
        ],
        branch: {
            triggerWhen: () => true,
            id: "procedures_monitoring",
            question: "What are your fetal monitoring preferences?",
            context: "Continuous monitoring restricts movement. Intermittent allows more freedom during labor.",
            type: "single",
            options: [
                { label: "Intermittent monitoring — more movement", sub: "Checked periodically, not constant", infoKey: "monitoring" },
                { label: "Continuous monitoring is fine", sub: "Happy to stay connected throughout", infoKey: "monitoring" },
                { label: "No preference — defer to the care team", sub: "" }
            ]
        }
    },
    // ── 3. ACTIVE LABOR ──────────────────────────────────────────────────────
    { id: "pain", topic: "Pain Management", type: "single",
        question: "What is her pain management approach?",
        context: "There is no wrong answer. Preferences can change — the goal is knowing her starting intention.",
        options: [
            { label: "Unmedicated — no medication planned", sub: "Breathing, movement, water therapy only", noFollow: true },
            { label: "Open to medication if labor becomes too painful", sub: "Start natural, decide as intensity builds" },
            { label: "Epidural as soon as eligible", sub: "Plan to request it early — no need to wait", infoKey: "epidural" }
        ],
        branch: {
            triggerWhen: (sel) => sel.some((s) => s !== "Unmedicated — no medication planned"),
            id: "pain_meds",
            question: "Which specific pain relief options do you want available?",
            context: "Let your care team know on arrival so they are prepared.",
            type: "multi",
            options: [
                { label: "Epidural", sub: "Regional anesthesia — most common", infoKey: "epidural" },
                { label: "Nitrous oxide (gas & air)", sub: "Mild, self-administered, wears off fast", infoKey: "nitrous" },
                { label: "IV opioids (fentanyl or morphine)", sub: "Fast-acting, temporary relief", infoKey: "iv-opioids" },
                { label: "Spinal block", sub: "Often used for C-sections", infoKey: "spinal" },
                { label: "Whatever helps most in the moment", sub: "No strong preference between options" }
            ]
        }
    },
    // ── 2. FIRST THINGS ON ARRIVAL ───────────────────────────────────────────  // ── 3. ACTIVE LABOR ──────────────────────────────────────────────────────
    { id: "room", topic: "Who's in the Room", type: "single",
        question: "Beyond you and the medical team — will anyone else be present at delivery?",
        context: "Agree on this now so there are no awkward conversations mid-contraction.",
        options: [
            { label: "No — just the two of us", sub: "Medical staff only, fully private", noFollow: true },
            { label: "Yes — we have specific people in mind", sub: "We will choose who below" }
        ],
        branch: {
            triggerWhen: (sel) => sel.includes("Yes — we have specific people in mind"),
            id: "room_who",
            question: "Who should be present?",
            context: "Select everyone you both agree on.",
            type: "multi",
            options: [
                { label: "Her mother", sub: "" },
                { label: "Her father", sub: "" },
                { label: "Your mother", sub: "" },
                { label: "Your father", sub: "" },
                { label: "A doula", sub: "Trained birth support professional" },
                { label: "A close friend or sibling", sub: "" }
            ]
        }
    },
    { id: "photo", topic: "Photography", type: "single",
        question: "What is the photography approach during labor and delivery?",
        context: "Set this expectation now so you are not negotiating it mid-contraction.",
        options: [
            { label: "Document freely — photos and video throughout", sub: "You capture the whole experience" },
            { label: "Photos only after baby arrives", sub: "No labor or delivery footage" },
            { label: "Ask her permission before each photo", sub: "She decides in the moment" },
            { label: "No photos or video at all", sub: "Private and fully present", noFollow: true }
        ],
        branch: {
            triggerWhen: (sel) => !sel.includes("No photos or video at all"),
            id: "photo_hire",
            question: "Are you planning to hire a birth photographer?",
            context: "Good birth photographers book up months in advance.",
            type: "single",
            options: [
                { label: "Yes — already booked", sub: "They have our date and hospital details" },
                { label: "Interested — not booked yet", sub: "Need to start looking soon" },
                { label: "No — just us with our phone", sub: "No professional photographer" }
            ]
        }
    },
    { id: "dadRole", topic: "Your Role as Her Partner", type: "multi",
        question: "How do you and your partner see your role during active labor?",
        context: "Talk through what she actually needs from you. It may surprise you.",
        options: [
            { label: "Physical support: massage and pressure", sub: "Hands-on help through contractions" },
            { label: "Verbal coaching and encouragement", sub: "Her anchor through the hard parts" },
            { label: "Medical advocate with the care team", sub: "Speak up and ask questions for her" },
            { label: "Managing visitors and family updates", sub: "Keep the outside world handled" },
            { label: "Calm presence: follow her lead", sub: "Be steady, reduce her stress" },
            { label: "Logistics: bags, parking, food runs", sub: "Keep the practical side running" }
        ]
    },
    // ── 5. THE BIRTH MOMENT ──────────────────────────────────────────────────
    { id: "cord", topic: "Cord Cutting", type: "single",
        question: "When should the cord be clamped?",
        context: "Delayed clamping lets blood transfer to baby for 1-3 minutes. Worth discussing with your OB in advance.",
        options: [
            { label: "Delayed clamping — wait 1-3 minutes", sub: "Blood continues flowing to baby after birth", infoKey: "delayed-cord" },
            { label: "Immediate clamping", sub: "Standard hospital protocol" },
            { label: "No preference", sub: "Whatever the care team recommends", noFollow: true }
        ],
        branch: {
            triggerWhen: (sel) => !sel.includes("No preference"),
            id: "cord_who",
            question: "Who cuts the cord?",
            context: "",
            type: "single",
            options: [
                { label: "You cut the cord", sub: "A powerful moment if you want it" },
                { label: "Medical staff cuts", sub: "Standard — no action needed from you" },
                { label: "No preference", sub: "Whatever feels right in the moment" }
            ]
        }
    },
    { id: "skin", topic: "Skin-to-Skin", type: "single",
        question: "Who gets skin-to-skin contact first after birth?",
        context: "Skin-to-skin regulates temperature and supports bonding. You can step in if she needs recovery.",
        options: [
            { label: "Her first, then you", sub: "Standard bonding sequence" },
            { label: "You first if she cannot hold baby", sub: "Keep baby with a parent at all times" },
            { label: "Assess baby first, then bonding", sub: "Let the team confirm baby is OK first", noFollow: true }
        ],
        branch: {
            triggerWhen: (sel) => sel.some((s) => s.includes("Her first") || s.includes("You first")),
            id: "skin_procedures",
            question: "What about newborn procedures — weighing, measurements, eye drops?",
            context: "These can usually be delayed up to an hour without harm if bonding is the priority.",
            type: "single",
            options: [
                { label: "Delay all procedures — bonding comes first", sub: "Nothing interrupts the first hour", infoKey: "newborn-procedures" },
                { label: "Procedures alongside bonding if possible", sub: "Minimize disruption, stay flexible", infoKey: "newborn-procedures" },
                { label: "Proceed with procedures promptly", sub: "Get baby assessed, then bond", infoKey: "newborn-procedures" }
            ]
        }
    },
    // ── 6. IMMEDIATELY AFTER ─────────────────────────────────────────────────
    { id: "placenta", topic: "Placenta", type: "single",
        question: "What do you want to do with the placenta?",
        context: "Hospitals dispose of it by default. Let them know in advance if you have other plans.",
        options: [
            { label: "Hospital disposes of it", sub: "Standard, nothing to arrange" },
            { label: "Encapsulation (placenta pills)", sub: "Some mothers report postpartum benefits", infoKey: "placenta-encapsulation" },
            { label: "Cord blood banking", sub: "Store stem cells for potential future use", infoKey: "cord-blood" },
            { label: "Donate to medical research", sub: "Ask your provider how to arrange" },
            { label: "Bury it or plant a tree", sub: "Symbolic or cultural practice" }
        ]
    },
    { id: "nicu", topic: "NICU Scenarios", type: "single",
        question: "If baby needs the NICU — what is the plan?",
        context: "It is rare, but having a plan removes panic from an already stressful moment.",
        options: [
            { label: "You go with baby immediately", sub: "She recovers, you stay with baby until she can join" },
            { label: "Both of you go as soon as she can move", sub: "Stay together as quickly as possible" },
            { label: "We will follow the staff's guidance", sub: "Trust the team to direct us in the moment" }
        ],
        branch: {
            triggerWhen: () => true,
            id: "nicu_prep",
            question: "Have you discussed NICU scenarios with your OB or midwife?",
            context: "",
            type: "single",
            options: [
                { label: "Yes — our provider knows our preferences", sub: "" },
                { label: "We have toured the NICU already", sub: "We know what to expect" },
                { label: "Not yet — on our list before the due date", sub: "" }
            ]
        }
    },
    // ── 7. RECOVERY ──────────────────────────────────────────────────────────
    { id: "postpartum_prefs", topic: "Postpartum Preferences", type: "multi",
        question: "Any early postpartum preferences to set now?",
        context: "The first hours and days matter. Align now, fewer decisions in the fog.",
        options: [
            { label: "Limit visitors for the first 24 hours", sub: "Family time before the crowd" },
            { label: "No social media until we announce", sub: "We share on our terms" },
            { label: "Request a lactation consultant", sub: "Get breastfeeding support from hospital" },
            { label: "You handle all non-feeding newborn care", sub: "Diapers, burping, settling — all you" }
        ],
        branch: {
            triggerWhen: () => true,
            id: "postpartum_discharge",
            question: "When do you plan to leave the hospital?",
            context: "Most hospitals allow 48-72 hours after delivery.",
            type: "single",
            options: [
                { label: "Stay the full allowed time", sub: "Rest and recover fully before going home" },
                { label: "Discharge as soon as medically cleared", sub: "We recover best at home" },
                { label: "Play it by ear", sub: "Decide based on how recovery goes" }
            ]
        }
    },
    // ── 8. OPEN ──────────────────────────────────────────────────────────────
    { id: "other", topic: "Anything Else", type: "freeform",
        question: "Is there anything else important to your birth plan?",
        context: "Cultural preferences, religious needs, specific provider requests, or anything the questions above did not cover."
    }
];
// ─── BAG DATA ────────────────────────────────────────────────────────────────
// stage: "prep" = before you leave | "labor" = during labor | "post" = recovery
const BAG_CATS = [
    { id: "mom", name: "For Her", icon: "🌸", color: "oklch(90% 0.05 50)",
        items: [
            { id: "m1", name: "Comfortable robe or nightgown", note: "Opens easily for feeding and skin-to-skin", stage: "prep" },
            { id: "m2", name: "Non-slip socks or slippers", note: "Hospital floors are cold", stage: "prep" },
            { id: "m3", name: "Toiletries and skincare", note: "Shampoo, body wash, lip balm, dry shampoo", stage: "prep" },
            { id: "m7", name: "Hair ties and headband", note: "She will want hair off her face", stage: "labor" },
            { id: "m8", name: "Pillow from home", note: "Hospital pillows are flat and crinkly", stage: "labor" },
            { id: "m4", name: "Going-home outfit", note: "Loose and comfortable — think maternity size", stage: "post" },
            { id: "m5", name: "Nursing bra or bralette (x2)", note: "Comfortable, easy access", stage: "post" },
            { id: "m6", name: "Nipple cream (lanolin)", note: "Soothing whether or not she breastfeeds", stage: "post" },
            { id: "m9", name: "Snacks she loves", note: "After delivery she will be very hungry", stage: "post" }
        ]
    },
    { id: "baby", name: "For Baby", icon: "👶", color: "oklch(92% 0.05 155)",
        items: [
            { id: "b2", name: "Infant car seat (installed)", note: "Hospital will not discharge without one", stage: "prep" },
            { id: "b3", name: "Swaddle blankets (x2)", note: "Muslin is great — breathable and soft", stage: "prep" },
            { id: "b4", name: "Newborn hat and socks", note: "Even in summer — hospital temps vary", stage: "prep" },
            { id: "b5", name: "Pacifier (if planning to use)", note: "Talk to your provider about timing", stage: "prep" },
            { id: "b1", name: "Coming-home outfit", note: "One newborn size, one 0-3M (size varies)", stage: "post" },
            { id: "b6", name: "Formula or breast milk storage bags", note: "If not breastfeeding or pumping", stage: "post" }
        ]
    },
    { id: "dad", name: "For You", icon: "🎒", color: "oklch(92% 0.04 220)",
        items: [
            { id: "d1", name: "Change of clothes (x2)", note: "You could be there 2-4 days", stage: "prep" },
            { id: "d2", name: "Toiletries", note: "Toothbrush, deodorant — stay fresh for her", stage: "prep" },
            { id: "d3", name: "Phone charger + portable battery", note: "Outlets are often far from the bedside", stage: "prep" },
            { id: "d4", name: "Laptop or tablet", note: "For the long quiet waiting hours", stage: "labor" },
            { id: "d5", name: "Snacks and cash", note: "Hospital food hours do not match labor hours", stage: "labor" },
            { id: "d6", name: "Pillow and light blanket", note: "Pullout chairs are brutal — come prepared", stage: "labor" },
            { id: "d7", name: "Earbuds or headphones", note: "Watch things quietly while she rests", stage: "post" }
        ]
    },
    { id: "docs", name: "Documents", icon: "📋", color: "oklch(92% 0.04 280)",
        items: [
            { id: "doc1", name: "Insurance cards (both)", note: "Front and back, photographed too", stage: "prep" },
            { id: "doc2", name: "ID and driver's license", note: "For both of you", stage: "prep" },
            { id: "doc3", name: "Birth plan (printed x3)", note: "One for chart, one for nurse, one for you", stage: "prep" },
            { id: "doc4", name: "Hospital pre-registration confirmation", note: "If you pre-registered online", stage: "prep" },
            { id: "doc5", name: "OB or midwife contact numbers", note: "Written down, not just in your phone", stage: "prep" },
            { id: "doc6", name: "Pediatrician info", note: "Hospital may ask on admission", stage: "prep" }
        ]
    },
    { id: "entertainment", name: "Entertainment", icon: "🎵", color: "oklch(92% 0.04 50)",
        items: [
            { id: "e1", name: "Labor playlist ready", note: "Calming and uplifting — make it together", stage: "labor" },
            { id: "e2", name: "Downloaded shows or movies", note: "For the long early-labor stretches", stage: "labor" },
            { id: "e4", name: "Small speaker or phone stand", note: "Play music without holding the phone", stage: "labor" },
            { id: "e3", name: "Book or magazine (for you)", note: "For quiet hours while she rests", stage: "post" },
            { id: "e5", name: "Her favorite comfort show downloaded", note: "Something familiar and calming", stage: "post" }
        ]
    },
    { id: "medical", name: "Medical Items", icon: "💊", color: "oklch(90% 0.05 155)",
        items: [
            { id: "med1", name: "Her regular medications", note: "Full list, exact dosages, original bottles", stage: "prep" },
            { id: "med2", name: "Glasses or contact lens kit", note: "Vision matters during delivery", stage: "prep" },
            { id: "med4", name: "Allergy list (both)", note: "Written down, not just remembered", stage: "prep" },
            { id: "med5", name: "GBS test results", note: "Staff will ask if she is GBS positive", stage: "prep" },
            { id: "med3", name: "Birth preferences document", note: "Your priorities list, separate from plan", stage: "labor" },
            { id: "med6", name: "Any special medical equipment", note: "CPAP machine, allergy meds, etc.", stage: "labor" }
        ]
    }
];
// ─── PRO TIPS ────────────────────────────────────────────────────────────────
const PRO_TIPS = [
    { category: "Advocate", tip: "Know the birth plan before you arrive. By delivery day she may be in too much pain to answer questions — you'll be her voice." },
    { category: "Advocate", tip: "Use BRAIN when the care team proposes something. Then ask for a few minutes alone to decide." },
    { category: "Take Initiative", tip: "Observe constantly. Ice running low? Refill it. Cool rag going warm? Rewet it. Don't wait to be asked — just handle it." },
    { category: "Take Initiative", tip: "Know where everything is in the room before labor intensifies: the puke bags, her bag contents, the call button. She won't be able to direct you." },
    { category: "Feeding", tip: "Don't let a sleeping baby skip a feeding. Four hours without eating can cause a hungry, inconsolable newborn who refuses to latch." },
    { category: "Food", tip: "Bring a water bottle with a straw. Holding a regular cup during contractions is almost impossible." },
    { category: "Food", tip: "If she's getting an epidural, don't eat in front of her — she won't be allowed to eat once it's administered." },
    { category: "Food", tip: "After delivery, order food for her. Calling the cafeteria is surprisingly impossible when you're exhausted and holding a newborn." },
    { category: "Comfort", tip: "Prepare a list of her birthing affirmations together beforehand. Say them during labor — she wrote them, so you can't say the wrong thing." },
    { category: "Comfort", tip: "Download her favorite shows and music before you leave. Early labor can be very long, and hospital Wi-Fi is unreliable." },
    { category: "Comfort", tip: "Learn counter-pressure techniques now, not in the parking lot. YouTube tutorials have 3-minute intros — not ideal mid-contraction." },
    { category: "Don't Take It Personally", tip: "She may want you close one minute and far away the next. Follow her lead. Don't get frustrated — stress slows labor." },
    { category: "Sleep", tip: "Try to stay awake during contractions. She needs your presence most in those moments, not between them." },
    { category: "Video", tip: "Clear storage on your phone before labor starts. The first moments happen fast and you don't want to be deleting cat photos." },
    { category: "Video", tip: "Video the first moment baby is placed on her chest. It's the one thing most parents wish they had captured." },
    { category: "Paperwork", tip: "Bring a plastic folder and own all the paperwork. Forms, consent sheets, discharge papers — keep them organized so she doesn't have to." },
    { category: "Apps", tip: "Download a diaper and feeding tracker app — both of you on the same account. Nurses will ask exact times; you won't remember without logging it." },
    { category: "Apps", tip: "Install a contraction timer now and learn how it works. Also map your route to the hospital before the due date." },
    { category: "Communications", tip: "Ask her who she wants you to update and when. Handle all texts and calls yourself — keep the outside world off her plate." },
    { category: "Logistics", tip: "If the hospital only provides a chair, bring a thin inflatable mat or foldable camp bed. Two nights on a pullout chair is brutal." },
    { category: "Delivery", tip: "Decide how you want to be involved in the delivery — holding a leg, cutting the cord — and communicate it to nurses on arrival." }
];
const STAGE_LABELS = { prep: "Before You Leave", labor: "During Labor", post: "Recovery" };
const BADGE_CLASS = { prep: "badge-prep", labor: "badge-labor", post: "badge-post" };
// Bag starts fully included — parents remove what they don't want
function buildInitialIncluded() {
    const map = {};
    BAG_CATS.forEach((cat) => cat.items.forEach((item) => { map[item.id] = true; }));
    return map;
}
Object.assign(window, { MEDICAL_INFO, BPQ, BAG_CATS, PRO_TIPS, STAGE_LABELS, BADGE_CLASS, buildInitialIncluded });
