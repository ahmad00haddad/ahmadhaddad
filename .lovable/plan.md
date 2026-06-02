# خطة المرحلة الأولى — الموقع العام لـ أحمد حدّاد

موقع شخصي بصري احترافي (Cinematographer / Photographer) ثنائي اللغة: العربية افتراضي + تبديل للإنجليزية. مستوحى من الهوية المرفقة (Carbon Black + Modern Brass + Pure White، خطوط Neue Plak / Forma DJR Text).

## الصفحات (TanStack file-based routes)

```
src/routes/
  __root.tsx          → Header + LanguageSwitcher + Footer + Outlet
  index.tsx           → /              الرئيسية (Hero سينمائي + لمحة خدمات + معاينة أعمال + CTA)
  about.tsx           → /about         نبذة عني + رحلتي + CV
  work.tsx            → /work          الأعمال (أفلام، إعلانات، صور)
  services.tsx        → /services      الخدمات + رابط للـ rate card الخارجي
  contact.tsx         → /contact       نموذج تواصل + روابط السوشيال
  sitemap[.]xml.ts
```

## نظام التصميم (`src/styles.css`)

- Carbon Black `#2A2A2A` كخلفية، Core Black `#141414` للأقسام العميقة، Pure White للنصوص، Modern Brass `#D9A441` كلون مميّز للروابط والـ CTAs.
- خطوط: `Oswald` (بديل مفتوح المصدر يطابق روح Neue Plak المكثّف) للعناوين الإنجليزية، `Tajawal` Bold للعناوين العربية، `Inter` للنصوص الإنجليزية، `Tajawal` Regular للعربية. كلها من Google Fonts.
- اتجاه `dir="rtl"` أو `"ltr"` يتغيّر ديناميكياً حسب اللغة.
- حركات خفيفة عبر `framer-motion` (fade/slide في القسم البطل، hover على بطاقات الأعمال).

## نظام اللغات (i18n)

- مكتبة `react-i18next` + `i18next-browser-languagedetector`.
- ملفّان: `src/i18n/ar.json` (محتوى المستخدم الأصلي من الصور) و `src/i18n/en.json` (ترجمة أوّلية تلقائية أولّدها لكل النصوص).
- `LanguageSwitcher` في الهيدر يحفظ الاختيار في `localStorage` ويبدّل `dir` على `<html>`.
- الافتراضي: العربية.

## صفحة الأعمال — ربط Instagram + YouTube

في هذه المرحلة **بدون** صفحة أدمن وبدون Lovable Cloud (حسب اختيارك). الحلّ الأسهل:
- **YouTube**: استخدام Connector `YouTube Data API` عبر Lovable Connector Gateway. أُنشئ Server Route `/api/youtube-videos` يجلب آخر فيديوهات قناتك (`@ahmad00haddad`) ويعرضها كشبكة فيديوهات قابلة للتشغيل داخل الصفحة.
- **Instagram**: Instagram Graph API يتطلّب حساب Business + Facebook Page مربوطة + إعداد تطبيق ميتا. هذا "صعب" وقلت تأجيله. الحلّ السهل الآن: زرّ "شاهد آخر منشوراتي على Instagram" يفتح بروفايلك + شبكة صور Placeholder احترافية من ملفّاتك الحالية (الصور المرفقة من موقعك القديم). لاحقاً نربطه فعلياً عبر صفحة الأدمن.
- **Behance**: مؤجّل (لا API رسمي).

## CV

- أرفع ملف `Ahmad_Haddad_CV.pdf` كـ Lovable Asset (لا نُدخل الـ binary في الريبو).
- في صفحة About: قسم "تعرّف عليّ عن قرب" مع معاينة + زر تنزيل مباشر.

## معلومات ومحتوى (من الصور والروابط)

- الاسم: أحمد حدّاد — مصور سينمائي | صانع أفلام | مصور فوتوغراف | ملوّن سينمائي
- العنوان: إربد، الأردن — هاتف: 00962799256345 — بريد: ahmad00haddad@gmail.com
- روابط: Instagram, LinkedIn, Behance, YouTube, Facebook (المذكورة).
- روابط خارجية مدمجة: شركة Faii House، Rate Card.
- الخدمات الخمس: إنتاج أفلام قصيرة، إعلانات سينمائية، تلوين سينمائي، تصوير فوتوغراف، تحرير فيديو.

## SEO + الأساسيات

- `head()` فريد لكل صفحة (عربي/إنجليزي حسب اللغة الحالية).
- `sitemap.xml` + `robots.txt`.
- `<html lang>` و `dir` ديناميكيان.

## تفاصيل تقنية

- استخدام Lovable Connector Gateway لربط YouTube (سأطلب منك ربط الموصِّل عند الوصول لتلك الخطوة).
- صور Hero والأقسام تُولَّد بـ `imagegen` (لقطات سينمائية بأسلوب يطابق هويتك المرئية الحالية).
- شعار الكاليجرافي "حدّاد" من الصور المرفقة — سأستخرجه كأصل.

## ما هو **خارج** هذه المرحلة (للمراحل التالية)

1. صفحة Admin Dashboard شاملة (تحتاج Lovable Cloud + Auth + جداول لكل قسم).
2. ربط Instagram Graph API الفعلي.
3. مدوّنة قابلة للتحرير من الداشبورد.
4. نموذج تواصل يحفظ الرسائل في قاعدة بيانات + يرسل إيميل (الآن mailto: مباشر).

بعد اعتمادك لهذه الخطة أبدأ بالتنفيذ مباشرة، وسأطلب منك ربط موصِّل YouTube عند الحاجة.
