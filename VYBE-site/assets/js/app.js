/* =========================================================
   VYBE — storefront logic
   ========================================================= */
(function () {
  "use strict";

  var DATA = window.VYBE_CATALOG || { settings: { prices: {}, whatsapp: "201508016013", display: "01508016013" }, categories: [], posters: [] };

  var SZ = ["20x30", "30x40", "40x50"];
  var SZL = { "20x30": "\u202A20×30\u202C", "30x40": "\u202A30×40\u202C", "40x50": "\u202A40×50\u202C" };
  var SZR = { "20x30": [20, 30], "30x40": [30, 40], "40x50": [40, 50] };
  var FRAME_W = { "20x30": "42%", "30x40": "52%", "40x50": "60%" };

  var GOV = {
    ar: ["القاهرة", "الجيزة", "الإسكندرية", "القليوبية", "الشرقية", "الدقهلية", "الغربية", "المنوفية", "البحيرة", "كفر الشيخ", "دمياط", "بورسعيد", "الإسماعيلية", "السويس", "شمال سيناء", "جنوب سيناء", "الفيوم", "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد", "مطروح"],
    en: ["Cairo", "Giza", "Alexandria", "Qalyubia", "Sharqia", "Dakahlia", "Gharbia", "Monufia", "Beheira", "Kafr El Sheikh", "Damietta", "Port Said", "Ismailia", "Suez", "North Sinai", "South Sinai", "Faiyum", "Beni Suef", "Minya", "Assiut", "Sohag", "Qena", "Luxor", "Aswan", "Red Sea", "New Valley", "Matrouh"]
  };

  var WA_MSG = {
    ar: {
      float: "أهلاً VYBE، عايز أسأل عن التصاميم.",
      clinic: "أهلاً VYBE، عندي عيادة وعايز أعرف تفاصيل اللوحات المخصصة.",
      start: "أهلاً VYBE، عايز أبدأ طلب.",
      question: "أهلاً VYBE، عندي سؤال.",
      footer: "أهلاً VYBE، عايز أتواصل معاكم.",
      custom: "أهلاً VYBE، عندي فكرة تصميم مخصوص وعايز أعرف التفاصيل."
    },
    en: {
      float: "Hello VYBE, I have a question about the designs.",
      clinic: "Hello VYBE, I have a clinic and would like details about custom pieces.",
      start: "Hello VYBE, I'd like to place an order.",
      question: "Hello VYBE, I have a question.",
      footer: "Hello VYBE, I'd like to get in touch.",
      custom: "Hello VYBE, I have a custom design idea and would like details."
    }
  };

  var I18N = {
    ar: {
      dir: "rtl",
      "meta.title": "VYBE — فن يليق بجدرانك | بوسترات بإطارات جاهزة للتعليق",
      "meta.desc": "بوسترات فنية بإطارات جاهزة للتعليق، تُصنع بعناية وتوصل لباب بيتك. اختر تصميمك أو ابدأ من صورتك. شحن لكل محافظات مصر والدفع عند الاستلام.",
      "a11y.skip": "تخطى إلى المحتوى",

      "nav.collection": "التصاميم",
      "nav.studio": "جرّب صورتك",
      "nav.sizes": "المقاسات",
      "nav.clinics": "للعيادات",
      "nav.order": "طريقة الطلب",
      "nav.faq": "أسئلة",
      "nav.cart": "السلة",
      "nav.menu": "القائمة",
      "nav.close": "إغلاق",
      "nav.lang": "English",
      "nav.themeDark": "تبديل الوضع الداكن",
      "nav.themeLight": "تبديل الوضع الفاتح",

      announce: ["شحن لكل محافظات مصر", "الدفع عند الاستلام", "إطار جاهز للتعليق", "تصميم مخصص حسب الطلب"],

      "hero.eyebrow": "VYBE ART HOUSE — القاهرة",
      "hero.title1": "فنّ يليق",
      "hero.title2": "بحكايتك.",
      "hero.lead": "بوسترات فنية بإطارات جاهزة للتعليق، تُصنع بعناية وتوصل لباب بيتك. اختر تصميمك أو ابدأ من صورتك، والباقي علينا.",
      "hero.cta1": "تسوّق التصاميم",
      "hero.cta2": "جرّب صورتك",
      "hero.stat1": "مقاسات",
      "hero.stat2": "تصاميم",
      "hero.stat3": "محافظة",
      "hero.caption": "مختارات — 01",

      "features.1t": "إطار جاهز للتعليق",
      "features.1d": "تفتح العلبة وتعلّقها.",
      "features.2t": "دفع عند الاستلام",
      "features.2d": "بدون عربون أو تحويل.",
      "features.3t": "شحن لكل مصر",
      "features.3d": "لـ27 محافظة.",
      "features.4t": "جودة مدروسة",
      "features.4d": "طباعة وتغليف يحمي اللوحة.",

      "collection.eyebrow": "01 — المختارات",
      "collection.title": "تصاميم مختارة بعناية.",
      "collection.lead": "كل لوحة تُطبع بإطار جاهز للتعليق. اختر المقاس اللي يناسب مساحتك، والسعر بيتحدث فورًا.",
      "collection.note": "الأسعار شاملة الإطار",
      "collection.all": "الكل",
      "collection.add": "أضف",
      "collection.badge": "إطار جاهز",
      "collection.empty": "لا توجد تصاميم في القسم ده.",
      "collection.ctaTitle": "عندك فكرة مختلفة؟",
      "collection.ctaText": "نصمم لك لوحة على مقاسك وألوانك.",
      "collection.ctaBtn": "كلمنا على واتساب",
      "collection.unit": "جنيه",

      "studio.eyebrow": "02 — الاستوديو",
      "studio.title": "شوف صورتك على الحائط قبل ما تطلب.",
      "studio.lead": "ارفع صورتك، اختر المقاس ولون الإطار، وشوف النتيجة مباشرة. الصورة تفضل على جهازك ومش بتترفع لأي سيرفر.",
      "studio.live": "معاينة مباشرة",
      "studio.upload": "ارفع صورتك",
      "studio.uploadHint": "JPG أو PNG — تفضل على جهازك",
      "studio.change": "تغيير الصورة",
      "studio.placeholder": "صورتك هتظهر هنا",
      "studio.drag": "اسحب الصورة لضبط مكانها",
      "studio.containHint": "الصورة كاملة داخل الإطار",
      "studio.size": "المقاس",
      "studio.frame": "لون الإطار",
      "studio.black": "أسود",
      "studio.white": "أبيض",
      "studio.oak": "خشبي",
      "studio.fit": "طريقة العرض",
      "studio.cover": "تملّي الإطار",
      "studio.contain": "الصورة كاملة",
      "studio.mat": "هامش أبيض حوالين الصورة",
      "studio.quality": "جودة الطباعة المتوقعة",
      "studio.qGood": "ممتازة",
      "studio.qMid": "جيدة",
      "studio.qLow": "منخفضة",
      "studio.qGoodText": "دقة الصورة كافية للمقاس ده.",
      "studio.qMidText": "هتتطبع كويس، لكن التفاصيل الدقيقة ممكن تقل شوية.",
      "studio.qLowText": "الصورة صغيرة على المقاس ده. جرّب مقاس أصغر أو صورة أوضح.",
      "studio.qEmpty": "ارفع صورة عشان نقدّر جودة الطباعة.",
      "studio.price": "سعر المقاس",
      "studio.add": "أضف إلى السلة",
      "studio.needPhoto": "ارفع صورة الأول.",
      "studio.privacy": "صورتك لا تُرفع لأي سيرفر — تفضل على جهازك.",
      "studio.badFile": "الصورة دي مش مدعومة. جرّب JPG أو PNG.",
      "studio.photoAdded": "تم رفع الصورة.",

      "sizes.eyebrow": "03 — المقاسات",
      "sizes.title": "ثلاثة مقاسات. إطار واحد يليق.",
      "sizes.lead": "الأشكال مرسومة بالنسبة الحقيقية بين المقاسات، وكل سعر شامل الإطار.",
      "sizes.note1": "الشحن يُحسب حسب المحافظة ويُأكد على واتساب.",
      "sizes.note2": "الدفع عند الاستلام بدون عربون.",
      "sizes.popular": "الأكثر طلبًا",
      "sizes.desc1": "للمكتب، الرف، أو جانب السرير.",
      "sizes.desc2": "الاختيار الأنسب للصالة أو غرفة النوم.",
      "sizes.desc3": "لحيطة كبيرة أو تصميم فيه تفاصيل وكتابة كتير.",
      "sizes.cm": "سم",
      "sizes.pick": "اختر تصميمك",

      "values.1t": "طباعة واضحة",
      "values.1d": "ألوان متوازنة وتفاصيل نظيفة.",
      "values.2t": "إطار خفيف",
      "values.2d": "جاهز للتعليق بمسمار واحد.",
      "values.3t": "تغليف آمن",
      "values.3d": "يوصل لبابك بدون خدوش.",

      "clinics.eyebrow": "04 — للعيادات",
      "clinics.title": "جدران العيادة... أول انطباع.",
      "clinics.lead": "لوحات تليق بتخصصك وتخلّي العيادة أهدى وأكثر احترافية. من الاستقبال لغرفة الكشف.",
      "clinics.1": "اسم الطبيب أو شعار العيادة على اللوحة.",
      "clinics.2": "ألوان وتصميم متناسقين مع هوية العيادة.",
      "clinics.3": "3 لوحات أو أكثر للاستقبال وغرفة الكشف بسعر خاص.",
      "clinics.4": "تصميم مخصص حسب الطلب.",
      "clinics.cta": "اطلب عرض لعيادتك",
      "clinics.stamp": "تصميم مخصص",

      "order.eyebrow": "05 — الطلب",
      "order.title": "من الشاشة لباب البيت.",
      "order.cta": "ابدأ طلبك الآن",
      "order.1t": "اختر وأضف للسلة",
      "order.1d": "من التصاميم الجاهزة أو من صورتك الخاصة.",
      "order.2t": "اكتب بياناتك",
      "order.2d": "الاسم، الموبايل، المحافظة، والعنوان بالتفصيل.",
      "order.3t": "أرسل على واتساب",
      "order.3d": "نأكد السعر مع الشحن، وتدفع عند الاستلام.",

      "faq.eyebrow": "06 — أسئلة",
      "faq.title": "كل اللي محتاج تعرفه.",
      "faq.lead": "ولو لسه عندك سؤال، كلمنا على واتساب وهنرد عليك بسرعة.",
      "faq.contactTitle": "لسه عندك سؤال؟",
      "faq.contactText": "كلمنا ونرد عليك في أسرع وقت.",
      "faq.contactBtn": "تواصل على واتساب",
      "faq.q1": "هل يوجد عربون؟",
      "faq.a1": "لا. الدفع كامل عند الاستلام.",
      "faq.q2": "الشحن بيوصل لكل المحافظات؟",
      "faq.a2": "نعم، لـ27 محافظة. تكلفة الشحن تُحسب حسب المحافظة وتُبلغك قبل تأكيد الطلب.",
      "faq.q3": "إزاي أختار المقاس المناسب؟",
      "faq.a3": "20×30 للمكتب والرف، 30×40 للحيطة العادية، و40×50 للحيطة الكبيرة أو التصميم اللي فيه تفاصيل وكتابة كتير.",
      "faq.q4": "ينفع أطلب تصميم مخصوص؟",
      "faq.a4": "أكيد. ابعتلنا الفكرة أو الصورة على واتساب، والسعر يحدد حسب التصميم.",
      "faq.q5": "الصورة اللي برفعها بتتحفظ؟",
      "faq.a5": "لا. معاينة الصورة تتم على جهازك فقط. بعد إرسال الطلب، ابعت الصورة في نفس محادثة واتساب.",
      "faq.q6": "اللوحة بتوصل جاهزة للتعليق؟",
      "faq.a6": "نعم، الإطار مركب واللوحة جاهزة للتعليق.",

      "footer.tagline": "فن يليق بجدرانك. بوسترات بإطارات جاهزة للتعليق، توصل لبابك.",
      "footer.explore": "استكشف",
      "footer.contact": "تواصل",
      "footer.phoneLabel": "واتساب / موبايل",
      "footer.whatsapp": "راسلنا على واتساب",
      "footer.ship": "شحن لكل محافظات مصر",
      "footer.cod": "الدفع عند الاستلام",
      "footer.follow": "تابعنا",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.madeIn": "صُنع بعناية في القاهرة.",
      "footer.top": "لأعلى الصفحة",
      "wa.float": "واتساب",

      "cart.title": "سلة الطلبات",
      "cart.step1": "السلة",
      "cart.step2": "المراجعة",
      "cart.emptyTitle": "سلتك فاضية.",
      "cart.emptyText": "لسه مضفتش أي لوحة. ابدأ من التصاميم أو جرّب صورتك.",
      "cart.emptyBtn": "تصفح التصاميم",
      "cart.remove": "حذف",
      "cart.qty": "الكمية",
      "cart.inc": "زيادة الكمية",
      "cart.dec": "تقليل الكمية",
      "cart.subtotal": "إجمالي المنتجات",
      "cart.shipNote": "الشحن يُحسب حسب المحافظة ويُأكد معاك على واتساب.",
      "cart.formTitle": "بيانات التوصيل",
      "cart.name": "الاسم",
      "cart.phone": "رقم الموبايل",
      "cart.gov": "المحافظة",
      "cart.govPick": "اختر المحافظة",
      "cart.addr": "العنوان بالتفصيل",
      "cart.notes": "ملاحظات (اختياري)",
      "cart.errName": "اكتب اسمك.",
      "cart.errPhone": "اكتب رقم موبايل مصري صحيح (11 رقم).",
      "cart.errGov": "اختر المحافظة.",
      "cart.errAddr": "اكتب العنوان.",
      "cart.review": "راجع الطلب",
      "cart.clear": "تفريغ السلة",
      "cart.readyTitle": "طلبك جاهز للإرسال.",
      "cart.readyHint": "افتح واتساب وابعت الرسالة. لو طلبت صورتك الخاصة، ابعتها في نفس المحادثة.",
      "cart.openWa": "أرسل الطلب على واتساب",
      "cart.copy": "نسخ الرسالة",
      "cart.back": "تعديل الطلب",
      "cart.trust1": "دفع عند الاستلام",
      "cart.trust2": "شحن لكل المحافظات",
      "cart.custom": "صورتي الخاصة",
      "cart.close": "إغلاق السلة",

      "frame.black": "فريم أسود",
      "frame.white": "فريم أبيض",
      "frame.oak": "فريم خشبي",
      "fit.cover": "تملّي الإطار",
      "fit.contain": "الصورة كاملة",
      "mat.yes": "بهامش أبيض",

      "msg.intro": "السلام عليكم VYBE، طلب جديد من الموقع:",
      "msg.total": "إجمالي المنتجات",
      "msg.ship": "الشحن يُحسب حسب المحافظة",
      "msg.cod": "الدفع عند الاستلام",
      "msg.name": "الاسم",
      "msg.phone": "الموبايل",
      "msg.gov": "المحافظة",
      "msg.addr": "العنوان",
      "msg.notes": "ملاحظات",
      "msg.size": "مقاس",
      "msg.qty": "عدد",
      "msg.customNote": "هبعت الصورة في نفس المحادثة",

      "toast.added": "تمت الإضافة إلى السلة.",
      "toast.removed": "تم حذف اللوحة.",
      "toast.cleared": "تم تفريغ السلة.",
      "toast.copied": "تم نسخ الرسالة.",
      "toast.copyFail": "مقدرناش ننسخ. جرّب تاني."
    },

    en: {
      dir: "ltr",
      "meta.title": "VYBE — Art worthy of your walls | Framed posters",
      "meta.desc": "Framed art, made with care and delivered to your door. Choose a design or start with your own photo. Shipping across Egypt, payment on delivery.",
      "a11y.skip": "Skip to content",

      "nav.collection": "Designs",
      "nav.studio": "Try your photo",
      "nav.sizes": "Sizes",
      "nav.clinics": "For clinics",
      "nav.order": "How to order",
      "nav.faq": "FAQ",
      "nav.cart": "Cart",
      "nav.menu": "Menu",
      "nav.close": "Close",
      "nav.lang": "العربية",
      "nav.themeDark": "Toggle dark mode",
      "nav.themeLight": "Toggle light mode",

      announce: ["Shipping across Egypt", "Pay on delivery", "Ready to hang", "Custom designs on request"],

      "hero.eyebrow": "VYBE ART HOUSE — CAIRO",
      "hero.title1": "Art worthy of",
      "hero.title2": "your story.",
      "hero.lead": "Framed art, made with care and delivered to your door. Choose a design or start with your own photo — we take care of the rest.",
      "hero.cta1": "Shop the collection",
      "hero.cta2": "Try your photo",
      "hero.stat1": "Sizes",
      "hero.stat2": "Designs",
      "hero.stat3": "Governorates",
      "hero.caption": "Selected works — 01",

      "features.1t": "Ready to hang",
      "features.1d": "Unbox it and hang it.",
      "features.2t": "Pay on delivery",
      "features.2d": "No deposit or transfer.",
      "features.3t": "Shipping across Egypt",
      "features.3d": "All 27 governorates.",
      "features.4t": "Considered quality",
      "features.4d": "Printing and packaging that protect the piece.",

      "collection.eyebrow": "01 — The Collection",
      "collection.title": "Selected with care.",
      "collection.lead": "Every piece arrives framed and ready to hang. Choose the size that fits your space — the price updates instantly.",
      "collection.note": "Prices include the frame",
      "collection.all": "All",
      "collection.add": "Add",
      "collection.badge": "Ready to hang",
      "collection.empty": "No pieces in this section yet.",
      "collection.ctaTitle": "Have something else in mind?",
      "collection.ctaText": "We'll create a piece in your size and palette.",
      "collection.ctaBtn": "Chat on WhatsApp",
      "collection.unit": "EGP",

      "studio.eyebrow": "02 — The Studio",
      "studio.title": "See your photo on the wall before you order.",
      "studio.lead": "Upload a photo, choose a size and frame colour, and preview it instantly. Your photo stays on your device and is never uploaded to a server.",
      "studio.live": "Live preview",
      "studio.upload": "Upload your photo",
      "studio.uploadHint": "JPG or PNG — stays on your device",
      "studio.change": "Change photo",
      "studio.placeholder": "Your photo will appear here",
      "studio.drag": "Drag the photo to position it",
      "studio.containHint": "The whole photo fits inside the frame",
      "studio.size": "Size",
      "studio.frame": "Frame colour",
      "studio.black": "Black",
      "studio.white": "White",
      "studio.oak": "Oak",
      "studio.fit": "Image fit",
      "studio.cover": "Fill the frame",
      "studio.contain": "Whole photo",
      "studio.mat": "White border around the photo",
      "studio.quality": "Expected print quality",
      "studio.qGood": "Excellent",
      "studio.qMid": "Good",
      "studio.qLow": "Low",
      "studio.qGoodText": "Your photo has enough detail for this size.",
      "studio.qMidText": "It will print well; very fine detail may soften slightly.",
      "studio.qLowText": "The photo is small for this size. Try a smaller size or a sharper image.",
      "studio.qEmpty": "Upload a photo to check print quality.",
      "studio.price": "Price for this size",
      "studio.add": "Add to cart",
      "studio.needPhoto": "Upload a photo first.",
      "studio.privacy": "Your photo never leaves your device.",
      "studio.badFile": "That image is not supported. Try JPG or PNG.",
      "studio.photoAdded": "Photo added.",

      "sizes.eyebrow": "03 — Sizes",
      "sizes.title": "Three sizes. One frame that fits.",
      "sizes.lead": "The frames are drawn in their real proportions, and every price includes the frame.",
      "sizes.note1": "Shipping is calculated by governorate and confirmed on WhatsApp.",
      "sizes.note2": "Pay on delivery, with no deposit.",
      "sizes.popular": "Most popular",
      "sizes.desc1": "For a desk, a shelf, or beside the bed.",
      "sizes.desc2": "The best fit for a living room or bedroom.",
      "sizes.desc3": "For a large wall or a design with lots of detail and text.",
      "sizes.cm": "cm",
      "sizes.pick": "Choose a design",

      "values.1t": "Clear printing",
      "values.1d": "Balanced colour and clean detail.",
      "values.2t": "Lightweight frame",
      "values.2d": "Ready to hang on a single nail.",
      "values.3t": "Safe packaging",
      "values.3d": "Arrives at your door without scratches.",

      "clinics.eyebrow": "04 — For Clinics",
      "clinics.title": "Your clinic walls. A first impression.",
      "clinics.lead": "Pieces that suit your specialty and make your clinic calmer and more professional. From reception to the exam room.",
      "clinics.1": "Your name or clinic logo on the piece.",
      "clinics.2": "Colours and a look that match your clinic identity.",
      "clinics.3": "3 or more pieces for reception and the exam room at a special price.",
      "clinics.4": "Custom design priced per request.",
      "clinics.cta": "Request a clinic quote",
      "clinics.stamp": "Custom design",

      "order.eyebrow": "05 — Ordering",
      "order.title": "From screen to doorstep.",
      "order.cta": "Start your order",
      "order.1t": "Choose and add to cart",
      "order.1d": "From the collection or from your own photo.",
      "order.2t": "Enter your details",
      "order.2d": "Name, mobile, governorate, and full address.",
      "order.3t": "Send on WhatsApp",
      "order.3d": "We confirm the price with shipping, and you pay on delivery.",

      "faq.eyebrow": "06 — FAQ",
      "faq.title": "Everything you need to know.",
      "faq.lead": "Still have a question? Message us on WhatsApp and we'll get back to you quickly.",
      "faq.contactTitle": "Still have a question?",
      "faq.contactText": "Message us and we'll reply as soon as we can.",
      "faq.contactBtn": "Chat on WhatsApp",
      "faq.q1": "Is there a deposit?",
      "faq.a1": "No. You pay in full on delivery.",
      "faq.q2": "Do you ship to every governorate?",
      "faq.a2": "Yes, all 27 governorates. Shipping is calculated by governorate and confirmed before we finalise the order.",
      "faq.q3": "How do I choose a size?",
      "faq.a3": "20×30 for a desk or shelf, 30×40 for a regular wall, and 40×50 for a large wall or a design with lots of detail and text.",
      "faq.q4": "Can I order a custom design?",
      "faq.a4": "Absolutely. Send us your idea or reference on WhatsApp and we'll price it per design.",
      "faq.q5": "Is my uploaded photo stored?",
      "faq.a5": "No. The preview happens on your device only. After you send the order, send the photo in the same WhatsApp chat.",
      "faq.q6": "Does it arrive ready to hang?",
      "faq.a6": "Yes. The frame is fitted and the piece is ready to hang.",

      "footer.tagline": "Art worthy of your walls. Framed posters, delivered to your door.",
      "footer.explore": "Explore",
      "footer.contact": "Contact",
      "footer.phoneLabel": "WhatsApp / Mobile",
      "footer.whatsapp": "Message us on WhatsApp",
      "footer.ship": "Shipping across Egypt",
      "footer.cod": "Pay on delivery",
      "footer.follow": "Follow",
      "footer.rights": "All rights reserved.",
      "footer.madeIn": "Made with care in Cairo.",
      "footer.top": "Back to top",
      "wa.float": "WhatsApp",

      "cart.title": "Your order",
      "cart.step1": "Cart",
      "cart.step2": "Review",
      "cart.emptyTitle": "Your cart is empty.",
      "cart.emptyText": "Nothing here yet. Browse the designs or start with your own photo.",
      "cart.emptyBtn": "Browse designs",
      "cart.remove": "Remove",
      "cart.qty": "Qty",
      "cart.inc": "Increase quantity",
      "cart.dec": "Decrease quantity",
      "cart.subtotal": "Products total",
      "cart.shipNote": "Shipping is calculated by governorate and confirmed on WhatsApp.",
      "cart.formTitle": "Delivery details",
      "cart.name": "Name",
      "cart.phone": "Mobile number",
      "cart.gov": "Governorate",
      "cart.govPick": "Choose governorate",
      "cart.addr": "Full address",
      "cart.notes": "Notes (optional)",
      "cart.errName": "Enter your name.",
      "cart.errPhone": "Enter a valid Egyptian mobile number (11 digits).",
      "cart.errGov": "Choose a governorate.",
      "cart.errAddr": "Enter your address.",
      "cart.review": "Review order",
      "cart.clear": "Clear cart",
      "cart.readyTitle": "Your order is ready to send.",
      "cart.readyHint": "Open WhatsApp and send the message. If you ordered your own photo, send it in the same chat.",
      "cart.openWa": "Send order on WhatsApp",
      "cart.copy": "Copy message",
      "cart.back": "Edit order",
      "cart.trust1": "Pay on delivery",
      "cart.trust2": "Shipping across Egypt",
      "cart.custom": "My own photo",
      "cart.close": "Close cart",

      "frame.black": "black frame",
      "frame.white": "white frame",
      "frame.oak": "oak frame",
      "fit.cover": "fills the frame",
      "fit.contain": "whole photo",
      "mat.yes": "white border",

      "msg.intro": "Hello VYBE, a new order from the website:",
      "msg.total": "Products total",
      "msg.ship": "shipping calculated by governorate",
      "msg.cod": "Pay on delivery",
      "msg.name": "Name",
      "msg.phone": "Mobile",
      "msg.gov": "Governorate",
      "msg.addr": "Address",
      "msg.notes": "Notes",
      "msg.size": "size",
      "msg.qty": "qty",
      "msg.customNote": "I'll send the photo in this chat",

      "toast.added": "Added to cart.",
      "toast.removed": "Removed.",
      "toast.cleared": "Cart cleared.",
      "toast.copied": "Copied.",
      "toast.copyFail": "Couldn't copy. Try again."
    }
  };

  var S = {
    lang: "ar",
    cart: [],
    cartOpen: false,
    menuOpen: false,
    step: "cart",
    form: { name: "", phone: "", gov: "", addr: "", notes: "" },
    errors: {},
    category: "all",
    sizeSel: {},
    defaultSize: "30x40",
    studio: { photo: null, size: "30x40", frame: "black", fit: "cover", mat: true, px: 50, py: 50 },
    lastFocus: null,
    toastTimer: null
  };

  var numberFmt = new Intl.NumberFormat("en-US");

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) { localStorage.removeItem(key); return null; }
      localStorage.setItem(key, value);
      return value;
    } catch (e) { return null; }
  }
  function t(key) {
    var dict = I18N[S.lang] || I18N.ar;
    return dict[key] != null ? dict[key] : (I18N.ar[key] != null ? I18N.ar[key] : key);
  }
  function posterById(id) {
    for (var i = 0; i < DATA.posters.length; i++) if (DATA.posters[i].id === id) return DATA.posters[i];
    return null;
  }
  function posterName(p) { return S.lang === "en" && p.en ? p.en : p.ar; }
  function posterTag(p) { return S.lang === "en" && p.tagEn ? p.tagEn : (p.tagAr || ""); }
  function catName(c) { return S.lang === "en" && c.en ? c.en : c.ar; }
  function imgSrc(p) { return p.img; }
  function priceOf(sz) { return Number(DATA.settings.prices[sz]) || 0; }
  function formatNum(n) { return numberFmt.format(Number(n) || 0); }
  function unit() { return t("collection.unit"); }
  function cartCount() { return S.cart.reduce(function (n, item) { return n + item.qty; }, 0); }
  function total() { return S.cart.reduce(function (n, item) { return n + priceOf(item.size) * item.qty; }, 0); }
  function waNumber() { return String(DATA.settings.whatsapp || "201508016013").replace(/\D/g, ""); }
  function waDisplay() { return DATA.settings.display || ("0" + waNumber().replace(/^20/, "")); }
  function waUrl(text) {
    var base = "https://wa.me/" + waNumber();
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }
  function waMessage(kind) {
    var dict = WA_MSG[S.lang] || WA_MSG.ar;
    return dict[kind] || dict.float;
  }
  function refreshWaLinks() {
    $$("[data-wa]").forEach(function (a) { a.href = waUrl(waMessage(a.getAttribute("data-wa"))); });
  }
  function govName(value) {
    var i = GOV.ar.indexOf(value);
    return i >= 0 ? GOV[S.lang][i] : value;
  }

  /* ---------- theme ---------- */
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"></path></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"></path></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"></path></svg>';
  var BAG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1.1 12H7.1L6 8Z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path></svg>';
  var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"></path></svg>';
  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.45-.72-2.93-1.16-4.78-4.2-4.92-4.4-.14-.19-1.17-1.56-1.17-2.98 0-1.41.74-2.1 1-2.4.26-.29.56-.36.75-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 1.99.88 2.13.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.68-.17 1.36Z"></path></svg>';

  function isDark() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr) return attr === "dark";
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function updateThemeMeta() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark() ? "#14130f" : "#f4f0e6");
  }
  function updateThemeButton() {
    var btn = $("themeBtn");
    if (!btn) return;
    btn.innerHTML = isDark() ? SUN : MOON;
    btn.setAttribute("aria-label", isDark() ? t("nav.themeLight") : t("nav.themeDark"));
  }
  function applyTheme(mode) {
    if (mode === "dark" || mode === "light") {
      document.documentElement.setAttribute("data-theme", mode);
      store("vybe-theme", mode);
    } else {
      document.documentElement.removeAttribute("data-theme");
      store("vybe-theme", null);
    }
    updateThemeButton();
    updateThemeMeta();
  }

  /* ---------- toast and clipboard ---------- */
  function toast(message) {
    var el = $("toast");
    if (!el) return;
    el.innerHTML = CHECK + "<span></span>";
    el.querySelector("span").textContent = message;
    el.classList.add("show");
    clearTimeout(S.toastTimer);
    S.toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }
  function copyText(text, successMessage) {
    function done() { toast(successMessage); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) done(); else toast(t("toast.copyFail"));
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  /* ---------- announcement ---------- */
  function renderAnnounce() {
    var track = $("announceTrack");
    if (!track) return;
    var items = (I18N[S.lang] || I18N.ar).announce || [];
    var group = items.map(function (item) {
      return '<span class="announce__item">' + esc(item) + "</span>";
    }).join("");
    track.innerHTML = '<div class="announce__group">' + group + '</div><div class="announce__group" aria-hidden="true">' + group + "</div>";
  }

  /* ---------- collection ---------- */
  function renderFilters() {
    var box = $("filters");
    if (!box) return;
    var cats = DATA.categories.filter(function (c) {
      return DATA.posters.some(function (p) { return p.cat === c.id; });
    });
    if (S.category !== "all" && !cats.some(function (c) { return c.id === S.category; })) S.category = "all";
    var html = '<button class="filter" type="button" data-action="filter" data-cat="all" aria-pressed="' + (S.category === "all") + '">' +
      esc(t("collection.all")) + "<small>" + DATA.posters.length + "</small></button>";
    cats.forEach(function (c) {
      var count = DATA.posters.filter(function (p) { return p.cat === c.id; }).length;
      html += '<button class="filter" type="button" data-action="filter" data-cat="' + esc(c.id) + '" aria-pressed="' + (S.category === c.id) + '">' +
        esc(catName(c)) + "<small>" + count + "</small></button>";
    });
    box.innerHTML = html;
  }

  function sizeButtons(p, selected) {
    return SZ.map(function (sz) {
      return '<button class="size-opt" type="button" data-action="size" data-pid="' + esc(p.id) + '" data-size="' + sz + '" aria-pressed="' + (sz === selected) + '">' + SZL[sz] + "</button>";
    }).join("");
  }

  function productCard(p) {
    var selected = S.sizeSel[p.id] || S.defaultSize;
    if (!SZR[selected]) selected = "30x40";
    var tag = posterTag(p);
    return '<article class="product" data-pid="' + esc(p.id) + '">' +
      '<div class="product-media">' +
        '<span class="product-badge">' + esc(t("collection.badge")) + "</span>" +
        '<div class="product-frame" style="aspect-ratio:' + (p.w || 3) + "/" + (p.h || 4) + '">' +
          '<img src="' + esc(imgSrc(p)) + '" alt="' + esc(posterName(p)) + '" width="' + (p.w || 600) + '" height="' + (p.h || 800) + '" loading="lazy" decoding="async">' +
        "</div>" +
      "</div>" +
      '<div class="product-info">' +
        '<div class="product-title-row"><h3 class="product-title">' + esc(posterName(p)) + "</h3>" +
          (tag ? '<span class="product-tag">' + esc(tag) + "</span>" : "") +
        "</div>" +
        '<div class="sizes" role="group" aria-label="' + esc(t("studio.size")) + '">' + sizeButtons(p, selected) + "</div>" +
        '<div class="product-buy">' +
          '<span class="product-price"><span data-price>' + formatNum(priceOf(selected)) + "</span><small>" + esc(unit()) + "</small></span>" +
          '<button class="add-btn" type="button" data-action="add" data-pid="' + esc(p.id) + '" aria-label="' + esc(t("collection.add") + " — " + posterName(p)) + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>' +
            "<span>" + esc(t("collection.add")) + "</span>" +
          "</button>" +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function ctaCard() {
    return '<article class="product product--cta">' +
      '<div class="product-media">' +
        '<span class="cta-card__ghost" aria-hidden="true">VYBE</span>' +
        '<div class="cta-card">' +
          "<h3>" + esc(t("collection.ctaTitle")) + "</h3>" +
          "<p>" + esc(t("collection.ctaText")) + "</p>" +
          '<a class="btn btn--cream btn--small" href="' + esc(waUrl(waMessage("custom"))) + '" target="_blank" rel="noopener">' + esc(t("collection.ctaBtn")) + ARROW + "</a>" +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function renderProducts() {
    var box = $("products");
    if (!box) return;
    var list = DATA.posters.filter(function (p) { return S.category === "all" || p.cat === S.category; });
    box.innerHTML = list.map(productCard).join("") + ctaCard();
  }

  function setCategory(cat) {
    S.category = cat;
    $$("#filters .filter").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-cat") === cat));
    });
    renderProducts();
  }

  function updateProductSize(pid, size) {
    if (!SZR[size]) return;
    S.sizeSel[pid] = size;
    var card = document.querySelector('.product[data-pid="' + pid + '"]');
    if (!card) return;
    $$(".size-opt", card).forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-size") === size));
    });
    var price = card.querySelector("[data-price]");
    if (price) price.textContent = formatNum(priceOf(size));
  }

  function pickSize(size) {
    if (!SZR[size]) return;
    S.defaultSize = size;
    DATA.posters.forEach(function (p) { S.sizeSel[p.id] = size; });
    renderProducts();
    var target = $("collection");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- sizes ---------- */
  function renderSizes() {
    var box = $("sizeCards");
    if (!box) return;
    box.innerHTML = SZ.map(function (sz, i) {
      var r = SZR[sz];
      var popular = sz === "30x40";
      return '<article class="size-card' + (popular ? " size-card--popular" : "") + '">' +
        (popular ? '<span class="size-card__badge">' + esc(t("sizes.popular")) + "</span>" : "") +
        '<span class="size-card__num">0' + (i + 1) + "</span>" +
        '<div class="size-scale" aria-hidden="true"><i style="width:calc(var(--u)*' + r[0] + ");height:calc(var(--u)*" + r[1] + ')"></i></div>' +
        '<div class="size-card__dim"><bdi dir="ltr">' + SZL[sz] + "</bdi><small>" + esc(t("sizes.cm")) + "</small></div>" +
        '<div class="size-card__price">' + formatNum(priceOf(sz)) + "<small>" + esc(unit()) + "</small></div>" +
        '<p class="size-card__desc">' + esc(t("sizes.desc" + (i + 1))) + "</p>" +
        '<button class="btn ' + (popular ? "btn--cream" : "btn--outline") + ' btn--small" type="button" data-action="pick-size" data-size="' + sz + '">' + esc(t("sizes.pick")) + ARROW + "</button>" +
      "</article>";
    }).join("");
  }

  /* ---------- studio ---------- */
  function quality() {
    var photo = S.studio.photo;
    if (!photo) return null;
    var need = SZR[S.studio.size];
    var dpi = 150 / 2.54;
    var needShort = need[0] * dpi;
    var needLong = need[1] * dpi;
    var shortSide = Math.min(photo.w, photo.h);
    var longSide = Math.max(photo.w, photo.h);
    var f = Math.min(shortSide / needShort, longSide / needLong);
    return f >= 1 ? "good" : (f >= 0.67 ? "mid" : "low");
  }

  function renderStudio() {
    var st = S.studio;
    var photo = st.photo;
    var frameCls = st.frame === "white" ? " fc-white" : (st.frame === "oak" ? " fc-oak" : "");
    var matCls = st.mat ? "" : " no-mat";
    var content;
    if (photo) {
      content = '<img src="' + esc(photo.url) + '" alt="" style="object-fit:' + st.fit + ";object-position:" + st.px + "% " + st.py + '%">';
    } else {
      content = '<div class="stage-placeholder">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="1"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path></svg>' +
        "<span>" + esc(t("studio.placeholder")) + "</span></div>";
    }
    var frameBox = $("studioFrame");
    if (frameBox) {
      frameBox.innerHTML = '<div class="stage-frame' + frameCls + matCls + '" style="--frame-w:' + FRAME_W[st.size] + '">' +
        '<div class="stage-art' + (photo && st.fit === "cover" ? " is-draggable" : "") + '" id="studioArt" style="aspect-ratio:' + SZR[st.size][0] + "/" + SZR[st.size][1] + '">' + content + "</div>" +
      "</div>";
    }

    var hint = $("studioHint");
    if (hint) {
      if (!photo) {
        hint.hidden = true;
        hint.innerHTML = "";
      } else {
        hint.hidden = false;
        hint.innerHTML = st.fit === "cover"
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"></path></svg><span>' + esc(t("studio.drag")) + "</span>"
          : "<span>" + esc(t("studio.containHint")) + "</span>";
      }
    }

    renderStudioControls();
    bindStudioDrag();
  }

  function studioRadio(key, value, current, label) {
    return '<label><input type="radio" name="studio-' + key + '" value="' + value + '" data-studio="' + key + '"' + (value === current ? " checked" : "") + "><span>" + label + "</span></label>";
  }

  function renderStudioControls() {
    var box = $("studioControls");
    if (!box) return;
    var st = S.studio;
    var photo = st.photo;
    var q = quality();
    var qCount = q === "good" ? 3 : (q === "mid" ? 2 : (q === "low" ? 1 : 0));
    var qLabel = q ? t("studio.q" + (q === "good" ? "Good" : (q === "mid" ? "Mid" : "Low"))) : "";
    var qText = q ? t("studio.q" + (q === "good" ? "Good" : (q === "mid" ? "Mid" : "Low")) + "Text") : t("studio.qEmpty");
    var bars = [0, 1, 2].map(function (i) {
      return '<i class="' + (i < qCount ? "on " + q : "") + '"></i>';
    }).join("");
    var frameLabel = t("studio." + st.frame);

    var html = '<label class="upload-box' + (photo ? " has-file" : "") + '" for="studioFile">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4M8 8l4-4 4 4"></path><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"></path></svg>' +
      "<div><b>" + esc(photo ? t("studio.change") : t("studio.upload")) + "</b><span>" + esc(photo ? photo.name : t("studio.uploadHint")) + "</span></div>" +
      "</label>" +
      '<input id="studioFile" type="file" accept="image/*" hidden>';

    html += '<div><div class="studio-field-label"><span>' + esc(t("studio.size")) + "</span><b>" + SZL[st.size] + "</b></div>" +
      '<div class="seg">' + SZ.map(function (sz) { return studioRadio("size", sz, st.size, SZL[sz]); }).join("") + "</div></div>";

    html += '<div><div class="studio-field-label"><span>' + esc(t("studio.frame")) + "</span><b>" + esc(frameLabel) + "</b></div>" +
      '<div class="swatches">' +
        '<label class="swatch swatch--black"><input type="radio" name="studio-frame" value="black" data-studio="frame"' + (st.frame === "black" ? " checked" : "") + "><i></i><span>" + esc(t("studio.black")) + "</span></label>" +
        '<label class="swatch swatch--white"><input type="radio" name="studio-frame" value="white" data-studio="frame"' + (st.frame === "white" ? " checked" : "") + "><i></i><span>" + esc(t("studio.white")) + "</span></label>" +
        '<label class="swatch swatch--oak"><input type="radio" name="studio-frame" value="oak" data-studio="frame"' + (st.frame === "oak" ? " checked" : "") + "><i></i><span>" + esc(t("studio.oak")) + "</span></label>" +
      "</div></div>";

    html += '<div><div class="studio-field-label"><span>' + esc(t("studio.fit")) + "</span></div>" +
      '<div class="seg">' +
        studioRadio("fit", "cover", st.fit, esc(t("studio.cover"))) +
        studioRadio("fit", "contain", st.fit, esc(t("studio.contain"))) +
      "</div></div>";

    html += '<label class="switch-row"><span>' + esc(t("studio.mat")) + '</span><span class="switch"><input type="checkbox" data-studio="mat"' + (st.mat ? " checked" : "") + "><i></i></span></label>";

    html += '<div><div class="studio-field-label"><span>' + esc(t("studio.quality")) + "</span></div>" +
      '<div class="quality"><div class="q-bars" aria-hidden="true">' + bars + "</div><p><b>" + esc(qLabel) + "</b>" + (qLabel ? " — " : "") + esc(qText) + "</p></div></div>";

    html += '<div class="studio-buy">' +
      '<div class="studio-price"><span>' + esc(t("studio.price")) + "</span><strong>" + formatNum(priceOf(st.size)) + "<small>" + esc(unit()) + "</small></strong></div>" +
      '<button class="btn btn--accent" type="button" data-action="add-custom"' + (photo ? "" : " disabled") + ">" + esc(t("studio.add")) + ARROW + "</button>" +
      "</div>";

    html += '<p class="studio-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="1"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg><span>' + esc(t("studio.privacy")) + "</span></p>";

    box.innerHTML = html;
  }

  function bindStudioDrag() {
    var art = $("studioArt");
    if (!art || !S.studio.photo || S.studio.fit !== "cover") return;
    var img = art.querySelector("img");
    if (!img) return;
    var on = false, sx = 0, sy = 0, px0 = 50, py0 = 50;

    art.addEventListener("pointerdown", function (e) {
      on = true;
      sx = e.clientX;
      sy = e.clientY;
      px0 = S.studio.px;
      py0 = S.studio.py;
      try { art.setPointerCapture(e.pointerId); } catch (x) { /* noop */ }
      e.preventDefault();
    });

    art.addEventListener("pointermove", function (e) {
      if (!on) return;
      var rect = art.getBoundingClientRect();
      var dx = (e.clientX - sx) / rect.width * 100;
      var dy = (e.clientY - sy) / rect.height * 100;
      S.studio.px = Math.max(0, Math.min(100, px0 - dx));
      S.studio.py = Math.max(0, Math.min(100, py0 - dy));
      img.style.objectPosition = S.studio.px + "% " + S.studio.py + "%";
    });

    function end(e) {
      on = false;
      try { art.releasePointerCapture(e.pointerId); } catch (x) { /* noop */ }
    }
    art.addEventListener("pointerup", end);
    art.addEventListener("pointercancel", end);
  }

  function handleStudioFile(input) {
    var file = input.files && input.files[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      toast(t("studio.badFile"));
      input.value = "";
      return;
    }
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      S.studio.photo = { url: url, name: file.name, w: img.naturalWidth, h: img.naturalHeight, px: 50, py: 50 };
      renderStudio();
      toast(t("studio.photoAdded"));
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      toast(t("studio.badFile"));
      input.value = "";
    };
    img.src = url;
  }

  function addCustom() {
    var st = S.studio;
    if (!st.photo) {
      toast(t("studio.needPhoto"));
      return;
    }
    S.cart.push({
      type: "custom",
      size: st.size,
      frame: st.frame,
      fit: st.fit,
      mat: st.mat,
      file: st.photo.name,
      url: st.photo.url,
      qty: 1
    });
    updateCartCount(true);
    if (S.cartOpen) renderCart();
    toast(t("toast.added"));
  }

  /* ---------- cart data ---------- */
  function saveCart() {
    var keep = S.cart.filter(function (item) { return item.type === "poster"; });
    store("vybe-cart", JSON.stringify(keep));
  }
  function loadCart() {
    try {
      var saved = JSON.parse(store("vybe-cart") || "[]");
      if (!Array.isArray(saved)) return;
      S.cart = saved.filter(function (item) {
        return item && item.type === "poster" && SZR[item.size] && item.qty > 0 && posterById(item.pid);
      }).map(function (item) {
        return { type: "poster", pid: item.pid, size: item.size, qty: Math.max(1, Math.min(99, Number(item.qty) || 1)) };
      });
    } catch (e) { S.cart = []; }
  }
  function addPoster(pid, size) {
    var p = posterById(pid);
    if (!p) return;
    if (!SZR[size]) size = "30x40";
    var found = S.cart.filter(function (item) {
      return item.type === "poster" && item.pid === pid && item.size === size;
    })[0];
    if (found) found.qty = Math.min(99, found.qty + 1);
    else S.cart.push({ type: "poster", pid: pid, size: size, qty: 1 });
    saveCart();
    updateCartCount(true);
    if (S.cartOpen) renderCart();
    toast(t("toast.added"));
  }
  function updateCartCount(bump) {
    var n = cartCount();
    var el = $("cartCount");
    if (el) {
      el.textContent = n;
      el.classList.toggle("is-empty", n === 0);
      if (bump) {
        el.classList.remove("bump");
        void el.offsetWidth;
        el.classList.add("bump");
      }
    }
    var btn = $("cartBtn");
    if (btn) btn.setAttribute("aria-label", n ? t("nav.cart") + " (" + n + ")" : t("nav.cart"));
  }

  function cartLineInfo(item) {
    if (item.type === "custom") {
      var sub = SZL[item.size] + " · " + t("frame." + item.frame) + ", " + t("fit." + item.fit) + (item.mat ? ", " + t("mat.yes") : "");
      return { name: t("cart.custom"), sub: sub, thumb: item.url };
    }
    var p = posterById(item.pid);
    return { name: p ? posterName(p) : item.pid, sub: SZL[item.size], thumb: p ? imgSrc(p) : "" };
  }

  function cartLine(item, index) {
    var info = cartLineInfo(item);
    var lineTotal = priceOf(item.size) * item.qty;
    return '<div class="cart-line">' +
      '<div class="cart-thumb"><img src="' + esc(info.thumb) + '" alt="" loading="lazy"></div>' +
      '<div class="cart-line__info">' +
        '<div class="cart-line__top"><h4>' + esc(info.name) + '</h4><button class="cart-remove" type="button" data-action="remove" data-i="' + index + '">' + esc(t("cart.remove")) + "</button></div>" +
        '<div class="cart-line__sub">' + esc(info.sub) + "</div>" +
        '<div class="cart-line__bottom">' +
          '<div class="qty">' +
            '<button type="button" data-action="dec" data-i="' + index + '" aria-label="' + esc(t("cart.dec")) + '">&minus;</button>' +
            "<output>" + item.qty + "</output>" +
            '<button type="button" data-action="inc" data-i="' + index + '" aria-label="' + esc(t("cart.inc")) + '">+</button>' +
          "</div>" +
          '<span class="cart-line__price">' + formatNum(lineTotal) + " <small>" + esc(unit()) + "</small></span>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function cartForm() {
    var f = S.form, e = S.errors;
    var govOpts = '<option value="">' + esc(t("cart.govPick")) + "</option>" + GOV.ar.map(function (g, i) {
      return '<option value="' + esc(g) + '"' + (g === f.gov ? " selected" : "") + ">" + esc(GOV[S.lang][i]) + "</option>";
    }).join("");
    return '<h4 class="cart-form-title">' + esc(t("cart.formTitle")) + "</h4>" +
      '<form class="cart-form" id="orderForm" novalidate>' +
        '<div class="field-row">' +
          '<label class="field' + (e.name ? " has-error" : "") + '"><span>' + esc(t("cart.name")) + '</span><input type="text" name="name" data-bind="form" autocomplete="name" value="' + esc(f.name) + '"' + (e.name ? ' aria-invalid="true"' : "") + '><span class="err">' + (e.name ? esc(t("cart.errName")) : "") + "</span></label>" +
          '<label class="field' + (e.phone ? " has-error" : "") + '"><span>' + esc(t("cart.phone")) + '</span><input type="tel" name="phone" data-bind="form" autocomplete="tel" inputmode="numeric" dir="ltr" value="' + esc(f.phone) + '"' + (e.phone ? ' aria-invalid="true"' : "") + '><span class="err">' + (e.phone ? esc(t("cart.errPhone")) : "") + "</span></label>" +
        "</div>" +
        '<label class="field' + (e.gov ? " has-error" : "") + '"><span>' + esc(t("cart.gov")) + '</span><select name="gov" data-bind="form"' + (e.gov ? ' aria-invalid="true"' : "") + ">" + govOpts + '</select><span class="err">' + (e.gov ? esc(t("cart.errGov")) : "") + "</span></label>" +
        '<label class="field' + (e.addr ? " has-error" : "") + '"><span>' + esc(t("cart.addr")) + '</span><textarea name="addr" data-bind="form" autocomplete="street-address"' + (e.addr ? ' aria-invalid="true"' : "") + ">" + esc(f.addr) + '</textarea><span class="err">' + (e.addr ? esc(t("cart.errAddr")) : "") + "</span></label>" +
        '<label class="field"><span>' + esc(t("cart.notes")) + '</span><textarea name="notes" data-bind="form">' + esc(f.notes) + "</textarea></label>" +
      "</form>";
  }

  function lineText(item) {
    if (item.type === "custom") {
      var opts = t("frame." + item.frame) + ", " + t("fit." + item.fit) + (item.mat ? ", " + t("mat.yes") : "");
      return t("cart.custom") + " (" + item.file + ") — " + t("msg.size") + " " + SZL[item.size] + " — " + opts + " — " + t("msg.qty") + " " + item.qty + " — " + formatNum(priceOf(item.size) * item.qty) + " " + unit() + " (" + t("msg.customNote") + ")";
    }
    var p = posterById(item.pid);
    return (p ? posterName(p) : item.pid) + " — " + t("msg.size") + " " + SZL[item.size] + " — " + t("msg.qty") + " " + item.qty + " — " + formatNum(priceOf(item.size) * item.qty) + " " + unit();
  }

  function orderMessage() {
    var f = S.form;
    var lines = S.cart.map(function (item, i) { return (i + 1) + ") " + lineText(item); });
    var parts = [t("msg.intro"), ""].concat(lines).concat([
      "",
      t("msg.total") + ": " + formatNum(total()) + " " + unit() + " (" + t("msg.ship") + ")",
      t("msg.cod"),
      "",
      t("msg.name") + ": " + f.name,
      t("msg.phone") + ": " + f.phone,
      t("msg.gov") + ": " + govName(f.gov),
      t("msg.addr") + ": " + f.addr
    ]);
    if (f.notes.trim()) parts.push(t("msg.notes") + ": " + f.notes.trim());
    return parts.join("\n");
  }

  function renderCart() {
    var wrap = $("cartWrap");
    if (!wrap) return;
    var count = cartCount();
    var head = '<div class="cart-head"><h3 id="cartTitle">' + esc(t("cart.title")) + (count ? " <small>(" + count + ")</small>" : "") + "</h3>" +
      '<button class="cart-close" type="button" data-action="close-cart" aria-label="' + esc(t("cart.close")) + '">' + CLOSE + "</button></div>";
    var progress = count ? '<div class="cart-progress">' +
      '<span class="' + (S.step === "cart" ? "active" : "") + '"><i>1</i>' + esc(t("cart.step1")) + "</span>" +
      '<span class="' + (S.step === "ready" ? "active" : "") + '"><i>2</i>' + esc(t("cart.step2")) + "</span>" +
      "</div>" : "";

    var body, foot = "";
    if (!S.cart.length) {
      body = '<div class="cart-empty">' + BAG + "<b>" + esc(t("cart.emptyTitle")) + "</b><p>" + esc(t("cart.emptyText")) + "</p>" +
        '<button class="btn btn--accent btn--small" type="button" data-action="browse">' + esc(t("cart.emptyBtn")) + ARROW + "</button></div>";
      foot = '<div class="cart-trust"><span>' + CHECK + esc(t("cart.trust1")) + "</span><span>" + CHECK + esc(t("cart.trust2")) + "</span></div>";
    } else if (S.step === "ready") {
      var msg = orderMessage();
      body = '<div class="cart-review"><h4 class="cart-review-title" tabindex="-1">' + esc(t("cart.readyTitle")) + "</h4>" +
        '<p class="cart-review-hint">' + esc(t("cart.readyHint")) + "</p>" +
        '<div class="cart-preview">' + esc(msg) + "</div></div>";
      foot = '<a class="btn btn--wa btn--block" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener">' + WA_ICON + esc(t("cart.openWa")) + "</a>" +
        '<button class="btn btn--outline btn--block" type="button" data-action="copy-msg">' + esc(t("cart.copy")) + "</button>" +
        '<button class="cart-back" type="button" data-action="back">' + esc(t("cart.back")) + "</button>" +
        '<div class="cart-trust"><span>' + CHECK + esc(t("cart.trust1")) + "</span><span>" + CHECK + esc(t("cart.trust2")) + "</span></div>";
    } else {
      var lines = S.cart.map(cartLine).join("");
      body = '<div class="cart-lines">' + lines + "</div>" +
        '<div class="cart-totals"><span>' + esc(t("cart.subtotal")) + "</span><b>" + formatNum(total()) + " <small>" + esc(unit()) + "</small></b></div>" +
        '<p class="cart-ship-note">' + esc(t("cart.shipNote")) + "</p>" +
        cartForm();
      foot = '<button class="btn btn--accent btn--block" type="button" data-action="review">' + esc(t("cart.review")) + ARROW + "</button>" +
        '<button class="cart-clear" type="button" data-action="clear">' + esc(t("cart.clear")) + "</button>" +
        '<div class="cart-trust"><span>' + CHECK + esc(t("cart.trust1")) + "</span><span>" + CHECK + esc(t("cart.trust2")) + "</span></div>";
    }

    wrap.innerHTML = '<div class="cart-scrim" data-action="close-cart"></div>' +
      '<aside class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle">' +
        head + progress + '<div class="cart-body" id="cartBody">' + body + "</div>" +
        (foot ? '<div class="cart-foot">' + foot + "</div>" : "") +
      "</aside>";
  }

  function syncLock() {
    document.body.classList.toggle("no-scroll", S.cartOpen || S.menuOpen);
  }

  function openCart() {
    if (S.menuOpen) closeMenu();
    S.cartOpen = true;
    S.step = "cart";
    S.lastFocus = document.activeElement;
    renderCart();
    var wrap = $("cartWrap");
    wrap.setAttribute("aria-hidden", "false");
    syncLock();
    requestAnimationFrame(function () { wrap.classList.add("open"); });
    setTimeout(function () {
      var close = wrap.querySelector(".cart-close");
      if (close) close.focus();
    }, 60);
  }

  function closeCart() {
    var wrap = $("cartWrap");
    if (!wrap) return;
    S.cartOpen = false;
    wrap.classList.remove("open");
    wrap.setAttribute("aria-hidden", "true");
    syncLock();
    if (S.lastFocus && document.body.contains(S.lastFocus)) {
      try { S.lastFocus.focus(); } catch (e) { /* noop */ }
    }
    setTimeout(function () {
      if (!S.cartOpen) wrap.innerHTML = "";
    }, 500);
  }

  function openMenu() {
    if (S.cartOpen) closeCart();
    S.menuOpen = true;
    S.lastFocus = document.activeElement;
    var menu = $("mobileMenu");
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    syncLock();
    setTimeout(function () {
      var close = menu.querySelector('[data-action="close-menu"]');
      if (close) close.focus();
    }, 60);
  }

  function closeMenu() {
    var menu = $("mobileMenu");
    if (!menu) return;
    S.menuOpen = false;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    syncLock();
    if (S.lastFocus && document.body.contains(S.lastFocus)) {
      try { S.lastFocus.focus(); } catch (e) { /* noop */ }
    }
  }

  function validate() {
    var f = S.form, e = {};
    if (!f.name.trim()) e.name = 1;
    var phone = String(f.phone).replace(/[\s\-()]/g, "");
    if (phone.indexOf("+20") === 0) phone = "0" + phone.slice(3);
    else if (phone.indexOf("20") === 0 && phone.length === 12) phone = "0" + phone.slice(2);
    else if (phone.indexOf("1") === 0 && phone.length === 10) phone = "0" + phone;
    if (!/^01[0125][0-9]{8}$/.test(phone)) e.phone = 1;
    else S.form.phone = phone;
    if (!f.gov || GOV.ar.indexOf(f.gov) < 0) e.gov = 1;
    if (!f.addr.trim()) e.addr = 1;
    S.errors = e;
    return Object.keys(e).length === 0;
  }

  function reviewOrder() {
    if (!validate()) {
      renderCart();
      var order = ["name", "phone", "gov", "addr"];
      for (var i = 0; i < order.length; i++) {
        if (S.errors[order[i]]) {
          var input = $("cartWrap").querySelector('[name="' + order[i] + '"]');
          if (input) input.focus();
          break;
        }
      }
      return;
    }
    S.step = "ready";
    renderCart();
    var body = $("cartBody");
    if (body) body.scrollTop = 0;
    var title = $("cartWrap").querySelector(".cart-review-title");
    if (title) title.focus();
  }

  function clearError(name) {
    if (!S.errors[name]) return;
    delete S.errors[name];
    var input = $("cartWrap").querySelector('[name="' + name + '"]');
    var field = input ? input.closest(".field") : null;
    if (field) {
      field.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      var err = field.querySelector(".err");
      if (err) err.textContent = "";
    }
  }

  /* ---------- language and static copy ---------- */
  function applyLanguage() {
    var dict = I18N[S.lang] || I18N.ar;
    document.documentElement.setAttribute("lang", S.lang);
    document.documentElement.setAttribute("dir", dict.dir);
    document.title = dict["meta.title"];
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict["meta.desc"]);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", dict["meta.title"]);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", dict["meta.desc"]);
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", S.lang === "ar" ? "ar_EG" : "en_US");

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    var langBtn = document.querySelector('[data-action="lang"]');
    if (langBtn) {
      langBtn.textContent = S.lang === "ar" ? "EN" : "ع";
      langBtn.setAttribute("aria-label", t("nav.lang"));
    }
    var menuBtn = $("menuBtn");
    if (menuBtn) menuBtn.setAttribute("aria-label", t("nav.menu"));
    var menu = $("mobileMenu");
    if (menu) {
      menu.setAttribute("aria-label", t("nav.menu"));
      var menuClose = menu.querySelector('[data-action="close-menu"]');
      if (menuClose) menuClose.setAttribute("aria-label", t("nav.close"));
    }
    updateThemeButton();
    updateCartCount();
    updatePosterAlts();
    updateContact();
    renderAnnounce();
    renderFilters();
    renderProducts();
    renderSizes();
    renderStudio();
    if (S.cartOpen) renderCart();
    refreshWaLinks();
  }

  function updatePosterAlts() {
    $$("[data-poster-alt]").forEach(function (img) {
      var p = posterById(img.getAttribute("data-poster-alt"));
      if (p) img.alt = posterName(p);
    });
  }

  function updateContact() {
    var display = waDisplay();
    var phone = $("footerPhone");
    if (phone) {
      phone.textContent = display;
      phone.href = "tel:+" + waNumber();
    }
    var menuPhone = $("menuPhone");
    if (menuPhone) menuPhone.textContent = display;

    var tk = DATA.settings.tiktok;
    ["tiktokLink", "tiktokLinkMenu"].forEach(function (id) {
      var link = $(id);
      if (!link) return;
      if (tk) {
        link.href = "https://www.tiktok.com/@" + tk;
        link.hidden = false;
      } else {
        link.hidden = true;
      }
    });
    var ig = DATA.settings.instagram;
    var insta = $("instagramLink");
    if (insta) {
      if (ig) {
        insta.href = "https://www.instagram.com/" + ig;
        insta.hidden = false;
      } else {
        insta.hidden = true;
      }
    }
    var year = $("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- reveal ---------- */
  function observeReveals() {
    var items = $$(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window) || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- events ---------- */
  function bindEvents() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-action]");
      if (!el) return;
      var action = el.getAttribute("data-action");

      if (action === "lang") {
        S.lang = S.lang === "ar" ? "en" : "ar";
        store("vybe-lang", S.lang);
        applyLanguage();
      } else if (action === "theme") {
        applyTheme(isDark() ? "light" : "dark");
      } else if (action === "cart") {
        openCart();
      } else if (action === "menu") {
        openMenu();
      } else if (action === "close-cart") {
        closeCart();
      } else if (action === "close-menu") {
        closeMenu();
      } else if (action === "filter") {
        setCategory(el.getAttribute("data-cat"));
      } else if (action === "size") {
        updateProductSize(el.getAttribute("data-pid"), el.getAttribute("data-size"));
      } else if (action === "add") {
        var pid = el.getAttribute("data-pid");
        addPoster(pid, S.sizeSel[pid] || S.defaultSize);
      } else if (action === "pick-size") {
        pickSize(el.getAttribute("data-size"));
      } else if (action === "add-custom") {
        addCustom();
      } else if (action === "review") {
        reviewOrder();
      } else if (action === "back") {
        S.step = "cart";
        renderCart();
        var body = $("cartBody");
        if (body) body.scrollTop = 0;
      } else if (action === "clear") {
        S.cart = [];
        S.errors = {};
        S.step = "cart";
        saveCart();
        updateCartCount(true);
        renderCart();
        toast(t("toast.cleared"));
      } else if (action === "inc") {
        var incIndex = Number(el.getAttribute("data-i"));
        if (S.cart[incIndex]) {
          S.cart[incIndex].qty = Math.min(99, S.cart[incIndex].qty + 1);
          saveCart();
          updateCartCount();
          renderCart();
        }
      } else if (action === "dec") {
        var decIndex = Number(el.getAttribute("data-i"));
        if (S.cart[decIndex] && S.cart[decIndex].qty > 1) {
          S.cart[decIndex].qty -= 1;
          saveCart();
          updateCartCount();
          renderCart();
        }
      } else if (action === "remove") {
        var rmIndex = Number(el.getAttribute("data-i"));
        if (S.cart[rmIndex]) {
          S.cart.splice(rmIndex, 1);
          saveCart();
          updateCartCount(true);
          if (!S.cart.length) S.step = "cart";
          renderCart();
          toast(t("toast.removed"));
        }
      } else if (action === "browse") {
        closeCart();
        setTimeout(function () {
          var target = $("collection");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      } else if (action === "copy-msg") {
        copyText(orderMessage(), t("toast.copied"));
      }
    });

    document.addEventListener("input", function (e) {
      var el = e.target;
      if (el.matches('[data-bind="form"]')) {
        S.form[el.name] = el.value;
        clearError(el.name);
      }
    });

    document.addEventListener("change", function (e) {
      var el = e.target;
      if (el.matches("[data-studio]")) {
        var key = el.getAttribute("data-studio");
        if (key === "mat") S.studio.mat = el.checked;
        else S.studio[key] = el.value;
        renderStudio();
        return;
      }
      if (el.matches('[data-bind="form"]')) {
        S.form[el.name] = el.value;
        clearError(el.name);
        return;
      }
      if (el.id === "studioFile") handleStudioFile(el);
    });

    document.addEventListener("submit", function (e) {
      if (e.target && e.target.id === "orderForm") {
        e.preventDefault();
        reviewOrder();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (S.cartOpen) {
          e.preventDefault();
          closeCart();
          return;
        }
        if (S.menuOpen) {
          e.preventDefault();
          closeMenu();
          return;
        }
      }
      if (e.key !== "Tab") return;
      var container = S.cartOpen ? document.querySelector(".cart-drawer") : (S.menuOpen ? $("mobileMenu") : null);
      if (!container) return;
      var focusables = $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', container).filter(function (el) {
        return el.getClientRects().length > 0;
      });
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    $$("#mobileMenu a[href^='#']").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function onScroll() {
    var head = $("siteHead");
    if (head) head.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function initSchema() {
    var sameAs = [];
    if (DATA.settings.tiktok) sameAs.push("https://www.tiktok.com/@" + DATA.settings.tiktok);
    if (DATA.settings.instagram) sameAs.push("https://www.instagram.com/" + DATA.settings.instagram);
    var schema = {
      "@context": "https://schema.org",
      "@type": "Store",
      name: "VYBE",
      description: "Framed posters, made with care in Cairo and delivered across Egypt.",
      telephone: "+" + waNumber(),
      priceRange: "200–490 EGP",
      currenciesAccepted: "EGP",
      paymentAccepted: "Cash on delivery",
      areaServed: "EG",
      image: "images/barek.jpg",
      sameAs: sameAs
    };
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function initTheme() {
    var saved = store("vybe-theme");
    if (saved === "dark" || saved === "light") applyTheme(saved);
    else {
      updateThemeButton();
      updateThemeMeta();
    }
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var handler = function () {
        if (!document.documentElement.getAttribute("data-theme")) {
          updateThemeButton();
          updateThemeMeta();
        }
      };
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else if (mq.addListener) mq.addListener(handler);
    }
  }

  function init() {
    var savedLang = store("vybe-lang");
    if (savedLang === "ar" || savedLang === "en") S.lang = savedLang;
    document.documentElement.classList.remove("no-js");
    loadCart();
    initTheme();
    bindEvents();
    applyLanguage();
    updateCartCount();
    observeReveals();
    onScroll();
  }

  init();
})();
