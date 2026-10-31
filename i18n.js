/* =========================================================
   English / Arabic switch
   English text lives in index.html; Arabic text lives here.
   ========================================================= */
const AR = {
  "cover.invited": "أنتم مدعوون",
  "cover.hint": "اضغط على الختم لفتح الدعوة",
  "names": "محمد و حبيبة",
  "nav.mono": "م <span>♡</span> ح",
  "nav.story": "قصتنا",
  "nav.details": "التفاصيل",
  "nav.location": "المكان",
  "nav.rsvp": "تأكيد الحضور",

  "hero.families": "بمباركة العائلتين",
  "name.mohamed": "محمد",
  "name.and": "و",
  "name.habiba": "حبيبة",
  "hero.sub": "يحتفلان بخطوبتهما",
  "day": "الجمعة",
  "date.short": "٢٠ · ١١ · ٢٠٢٦",
  "date.long": "٢٠ نوفمبر ٢٠٢٦",
  "hero.cta": "احتفلوا معنا",

  "verse.ref": "— سورة الروم · ٢١",

  "story.eyebrow": "قصتنا",
  "story.title": "قلبان… وحكاية <em>واحدة</em>",
  "story.caption": "اللحظة التي قالت فيها نعم",
  "story.lead": "بعض الحكايات تبدأ بهدوء — نظرة، وابتسامة، وحديث لم ينتهِ أبدًا.",
  "story.p1": "وجد محمد وحبيبة في بعضهما الصديق الأقرب، والأمان، ورفيق العمر. وبباقة من الورد الوردي وكثير من الابتسامات المرتبكة، طُرح السؤال — فأضاءت الإجابة المكان كله، أكثر من كل الأضواء من حولهما.",
  "story.p2": "والآن، وسط أحبّ الناس إلى قلبيهما، يستعدان لإعلانها رسميًا — ويسعدهما ويشرّفهما حضوركم.",

  "gallery.eyebrow": "لحظات صغيرة",
  "gallery.title": "لمحات منّا",
  "gallery.c1": "ورد وابتسامات",
  "gallery.c2": "لحظة خجل",
  "gallery.c3": "جنبًا إلى جنب",
  "gallery.c4": "رسميًا معًا",
  "gallery.c5": "تحت الأضواء",
  "gallery.c6": "أنا وأنت",

  "details.eyebrow": "احفظوا الموعد",
  "details.title": "حفل الخطوبة",
  "details.date": "التاريخ",
  "details.time": "الوقت",
  "details.evening": "احتفال مسائي",
  "details.venue": "المكان",
  "details.calendar": "أضف إلى التقويم",
  "cd.days": "يوم",
  "cd.hours": "ساعة",
  "cd.mins": "دقيقة",
  "cd.secs": "ثانية",
  "cd.done": "اليوم هو اليوم الموعود ♡",

  "location.eyebrow": "المكان",
  "location.open": "افتح في خرائط جوجل",

  "rsvp.eyebrow": "نرجو الرد",
  "rsvp.title": "يسعدنا حضوركم",
  "rsvp.sub": "من فضلك أخبرنا إن كنت ستتمكن من الحضور.",
  "rsvp.name": "اسمك",
  "rsvp.namePh": "الاسم بالكامل",
  "rsvp.attend": "هل ستحضر؟",
  "rsvp.yes": "بكل سرور سأحضر",
  "rsvp.no": "أعتذر عن الحضور",
  "rsvp.wish": "تهنئة للعروسين <em>(اختياري)</em>",
  "rsvp.wishPh": "اكتب كلمة حلوة…",
  "rsvp.send": "أرسل تأكيد الحضور",

  "wishes.eyebrow": "من أحبابنا",
  "wishes.title": "تهاني للعروسين",
  "wishes.empty": "كن أول من يترك تهنئة ♡",

  "footer.love": "صُنعت بكل حب للعروسين",

  /* messages created by script.js */
  "msg.sending": "جارٍ الإرسال…",
  "msg.thanksYes": "شكرًا لك! ننتظر رؤيتك ♡",
  "msg.thanksNo": "شكرًا لإخبارنا ♡",
  "msg.error": "عذرًا، حدث خطأ — حاول مرة أخرى بعد قليل.",
  "msg.justNow": "الآن",
};

const EN_MSG = {
  "msg.sending": "Sending…",
  "msg.thanksYes": "Thank you! We can't wait to see you ♡",
  "msg.thanksNo": "Thank you for letting us know ♡",
  "msg.error": "Sorry, something went wrong — please try again in a moment.",
  "msg.justNow": "just now",
};

const I18N = (() => {
  const EN = { ...EN_MSG };
  const listeners = [];
  // remember the original English from the page
  document.querySelectorAll("[data-i18n]").forEach((el) => { EN[el.dataset.i18n] ??= el.innerHTML.trim(); });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { EN[el.dataset.i18nPh] ??= el.placeholder; });

  const saved = localStorage.getItem("lang");
  let lang = saved || ((navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en");

  const t = (key) => (lang === "ar" ? AR[key] : EN[key]) ?? EN[key] ?? key;
  const num = (n) => (lang === "ar" ? Number(n).toLocaleString("ar-EG", { useGrouping: false }) : String(n));
  const pad = (n) => (lang === "ar" ? num(String(n).padStart(2, "0")).padStart(2, "٠") : String(n).padStart(2, "0"));

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang);
    });
    listeners.forEach((fn) => fn(lang));
  }

  document.querySelectorAll(".lang-switch button").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      localStorage.setItem("lang", lang);
      apply();
    })
  );

  return {
    t, num, pad, apply,
    get lang() { return lang; },
    onChange: (fn) => listeners.push(fn),
  };
})();
