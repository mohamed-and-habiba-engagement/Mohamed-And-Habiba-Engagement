/* =========================================================
   EDIT THESE DETAILS — everything on the page updates from here
   ========================================================= */
const CONFIG = {
  date: "2026-11-20",          // YYYY-MM-DD
  startTime: "19:00",          // 24h, Cairo time
  endTime: "23:00",
  timeLabel: "7:00 PM",        // shown on the page
  timeLabelAr: "٧:٠٠ مساءً",

  venueName: "Four Season Events Hall",
  venueNameAr: "قاعة ودار مناسبات الفور سيزون",
  venueArea: "El Mokattam, Cairo",
  venueAreaAr: "المقطم، القاهرة",
  venueAddress: "Street 9, Al Abageyah, El Mokattam — in front of Mokattam Sports Club, next to the Mobil station",
  venueAddressAr: "شارع ٩، الأباجية، المقطم — أمام نادي المقطم الرياضي، بجوار بنزينة موبيل",
  mapQuery: "30.0116942,31.3021322",                    // pin shown on the embedded map
  mapLink: "https://maps.app.goo.gl/RkpUmjw7H2MU6k5XA", // "Open in Google Maps" button
};

/* =========================================================
   FIREBASE — config from your Firebase project
   (Project settings → General → Your apps → Web app → SDK setup → Config).
   These values are safe to publish; access is controlled by firestore.rules.
   ========================================================= */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBzLwrc-OJY5ogeuPTAuAqe4kw69ohKZ48",
  authDomain: "mohamed-habiba-engagemen-53481.firebaseapp.com",
  projectId: "mohamed-habiba-engagemen-53481",
  storageBucket: "mohamed-habiba-engagemen-53481.firebasestorage.app",
  messagingSenderId: "686961855378",
  appId: "1:686961855378:web:eb069fbb05a3a39ed2cf4b",
};

/* ---------- Fill page from CONFIG (in the current language) ---------- */
const cfg = (key) => (I18N.lang === "ar" && CONFIG[key + "Ar"]) || CONFIG[key];

const mapSrc = "https://www.google.com/maps?q=" + encodeURIComponent(CONFIG.mapQuery) + "&output=embed";
document.getElementById("mapFrame").src = mapSrc;
document.getElementById("mapBtn").href = CONFIG.mapLink;

const ymd = CONFIG.date.replace(/-/g, "");
const hm = (t) => t.replace(":", "") + "00";

function fillConfig() {
  document.querySelectorAll("[data-cfg]").forEach((el) => { el.textContent = cfg(el.dataset.cfg); });
  const ar = I18N.lang === "ar";
  document.getElementById("calBtn").href =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(ar ? "خطوبة محمد و حبيبة" : "Mohamed & Habiba's Engagement") +
    "&dates=" + ymd + "T" + hm(CONFIG.startTime) + "/" + ymd + "T" + hm(CONFIG.endTime) +
    "&ctz=Africa/Cairo" +
    "&details=" + encodeURIComponent(ar ? "في انتظاركم لنحتفل معًا ♡" : "We can't wait to celebrate with you! ♡") +
    "&location=" + encodeURIComponent(cfg("venueName") + ", " + cfg("venueAddress"));
}

/* ---------- Fairy lights ---------- */
document.querySelectorAll(".lights").forEach((box) => {
  const count = +box.dataset.count || 40;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("i");
    const bokeh = Math.random() < 0.25;
    const size = bokeh ? 20 + Math.random() * 40 : 4 + Math.random() * 9;
    s.style.width = s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.setProperty("--d", 2.5 + Math.random() * 4 + "s");
    s.style.setProperty("--delay", -Math.random() * 6 + "s");
    if (bokeh) s.classList.add("bokeh");
    box.appendChild(s);
  }
});

/* ---------- Cover ---------- */
const cover = document.getElementById("cover");
document.getElementById("openBtn").addEventListener("click", () => {
  cover.classList.add("open");
  document.body.classList.remove("locked");
  setTimeout(() => cover.remove(), 1100);
});

/* ---------- Nav background on scroll ---------- */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Countdown ---------- */
const target = new Date(CONFIG.date + "T" + CONFIG.startTime + ":00+02:00").getTime();
const cd = {
  d: document.getElementById("cd-days"),
  h: document.getElementById("cd-hours"),
  m: document.getElementById("cd-mins"),
  s: document.getElementById("cd-secs"),
};
function tick() {
  const diff = target - Date.now();
  if (diff <= 0) {
    document.getElementById("countdown").hidden = true;
    document.getElementById("countdownDone").hidden = false;
    clearInterval(timer);
    return;
  }
  cd.d.textContent = I18N.num(Math.floor(diff / 864e5));
  cd.h.textContent = I18N.pad(Math.floor((diff / 36e5) % 24));
  cd.m.textContent = I18N.pad(Math.floor((diff / 6e4) % 60));
  cd.s.textContent = I18N.pad(Math.floor((diff / 1e3) % 60));
}
const timer = setInterval(tick, 1000);

/* ---------- Lightbox ---------- */
const photos = [...document.querySelectorAll(".polaroid img")].map((img) => img.src);
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
let current = 0;
const show = (i) => { current = (i + photos.length) % photos.length; lbImg.src = photos[current]; };
const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; };

document.querySelectorAll(".polaroid").forEach((p) =>
  p.addEventListener("click", () => {
    show(+p.dataset.index);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  })
);
lb.querySelector(".lb-close").addEventListener("click", closeLb);
lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

/* ---------- Firebase (RSVPs + wishes wall) ---------- */
const FB = "https://www.gstatic.com/firebasejs/12.4.0/";
const firebaseReady = FIREBASE_CONFIG.projectId
  ? Promise.all([import(FB + "firebase-app.js"), import(FB + "firebase-firestore.js")]).then(([app, fs]) => ({
      fs,
      db: fs.getFirestore(app.initializeApp(FIREBASE_CONFIG)),
    }))
  : Promise.reject(new Error("Firebase config is empty"));
firebaseReady.catch((err) => console.warn("Firebase not connected:", err.message));

/* ---------- RSVP form ---------- */
const form = document.getElementById("rsvpForm");
const note = document.getElementById("formNote");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.elements["name"].value.trim().slice(0, 80);
  const attending = form.attending.value === "yes";
  const message = form.message.value.trim().slice(0, 500);
  if (!name) return;

  submitBtn.disabled = true;
  note.textContent = I18N.t("msg.sending");
  try {
    const { db, fs } = await firebaseReady;
    const createdAt = fs.serverTimestamp();
    // Private RSVP list — only visible to you in the Firebase console
    await fs.addDoc(fs.collection(db, "rsvps"), { name, attending, message, createdAt });
    // Public wishes wall — only the name and the wish are shown
    if (message) await fs.addDoc(fs.collection(db, "wishes"), { name, message, createdAt });

    note.textContent = I18N.t(attending ? "msg.thanksYes" : "msg.thanksNo");
    form.reset();
    if (message) document.getElementById("wishes").scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    console.error(err);
    note.textContent = I18N.t("msg.error");
  } finally {
    submitBtn.disabled = false;
  }
});

/* ---------- Wishes wall (live) ---------- */
const wishGrid = document.getElementById("wishGrid");
const wishEmpty = document.getElementById("wishEmpty");
const wishCount = document.getElementById("wishCount");

function timeAgo(date) {
  const s = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));
  if (s < 60) return I18N.t("msg.justNow");
  const rtf = new Intl.RelativeTimeFormat(I18N.lang === "ar" ? "ar-EG" : "en", { numeric: "always" });
  const units = [["year", 31536e3], ["month", 2592e3], ["day", 864e2], ["hour", 3600], ["minute", 60]];
  for (const [unit, sec] of units) {
    const n = Math.floor(s / sec);
    if (n >= 1) return rtf.format(-n, unit);
  }
}

function wishCountText(n) {
  if (!n) return "";
  if (I18N.lang !== "ar") return `${n} wish${n > 1 ? "es" : ""} and counting ♡`;
  if (n === 1) return "تهنئة واحدة ♡";
  if (n === 2) return "تهنئتان ♡";
  return `${I18N.num(n)} ${n <= 10 ? "تهاني" : "تهنئة"} ♡`;
}

let lastWishes = [];
function renderWishes(docs) {
  lastWishes = docs;
  wishGrid.replaceChildren(
    ...docs.map((d) => {
      const w = d.data();
      const card = document.createElement("article");
      card.className = "wish";
      const text = document.createElement("p");
      text.className = "wish-text";
      text.textContent = w.message;
      const meta = document.createElement("div");
      meta.className = "wish-meta";
      const who = document.createElement("span");
      who.className = "wish-name";
      who.textContent = w.name;
      const when = document.createElement("span");
      when.className = "wish-time";
      when.textContent = w.createdAt ? timeAgo(w.createdAt.toDate()) : I18N.t("msg.justNow");
      meta.append(who, when);
      card.append(text, meta);
      return card;
    })
  );
  wishEmpty.hidden = docs.length > 0;
  wishCount.textContent = wishCountText(docs.length);
}

firebaseReady
  .then(({ db, fs }) => {
    const q = fs.query(fs.collection(db, "wishes"), fs.orderBy("createdAt", "desc"), fs.limit(200));
    fs.onSnapshot(q, (snap) => renderWishes(snap.docs), (err) => console.error("Wishes:", err));
  })
  .catch(() => { wishEmpty.hidden = false; });

/* ---------- Language switch ---------- */
I18N.onChange(() => {
  fillConfig();
  tick();
  if (lastWishes.length) renderWishes(lastWishes);
});
I18N.apply();
