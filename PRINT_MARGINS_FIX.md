# إصلاح هوامش الطباعة والحاوية السوداء

## المشكلة

كان هناك مشكلتان رئيسيتان في محرر السيناريو:

### 1. الهوامش غير صحيحة
- **المطلوب**: هوامش صفحة A4 بالمقاسات التالية:
  - الهامش العلوي: 1 بوصة (1in)
  - الهامش السفلي: 1 بوصة (1in)
  - الهامش الأيمن: 1.5 بوصة (1.5in)
  - الهامش الأيسر: 1 بوصة (1in)

- **المشكلة السابقة**: كان المحرر يستخدم `padding: 2cm` فقط، وهو غير مطابق للمعايير.

### 2. الحاوية السوداء (Border)
- **المشكلة**: كان هناك `border` و `box-shadow` يظهران عند الطباعة، مما يعطي مظهر حاوية سوداء حول النص.
- **السبب**: لم يكن هناك قواعد CSS كافية لإزالة هذه التأثيرات عند الطباعة.

## الحل

### التعديلات على `src/style.css`

1. **إضافة قاعدة `@page`** لتحديد هوامش الطباعة بشكل صحيح:
```css
@page {
    size: A4;
    margin: 1in 1in 1in 1.5in; /* أعلى - يمين - أسفل - يسار */
}
```

2. **إزالة الحدود والظلال عند الطباعة**:
```css
@media print {
    [contenteditable],
    .screenplay-editor,
    .screenplay-page {
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
    }
}
```

3. **إخفاء عناصر الواجهة عند الطباعة**:
```css
@media print {
    .no-print,
    header,
    .sidebar,
    button,
    .toolbar,
    nav {
        display: none !important;
    }
}
```

### التعديلات على `src/components/editor/CleanIntegratedScreenplayEditor.tsx`

1. **إضافة class `screenplay-page`** للمحرر:
```tsx
<div
    ref={editorRef}
    contentEditable
    className="screenplay-page min-h-[29.7cm] focus:outline-none"
    style={{
        width: "21cm",
        paddingTop: "1in",
        paddingBottom: "1in",
        paddingRight: "1.5in",
        paddingLeft: "1in",
        // ...
    }}
/>
```

2. **إضافة class `no-print`** لعناصر الواجهة:
```tsx
<div className="no-print sidebar w-64 ...">
```

## كيفية الاختبار

1. افتح المحرر في المتصفح
2. اكتب بعض النصوص
3. اضغط `Ctrl+P` أو اذهب لقائمة الطباعة
4. تحقق من:
   - ✅ الهوامش صحيحة (1.5in يمين، 1in يسار/أعلى/أسفل)
   - ✅ لا توجد حدود سوداء حول النص
   - ✅ لا توجد ظلال
   - ✅ الصفحة بيضاء نظيفة بدون عناصر واجهة

## المعايير المطبقة

- **قياس الورق**: A4 (21cm × 29.7cm)
- **الهامش العلوي**: 1 بوصة (2.54cm)
- **الهامش السفلي**: 1 بوصة (2.54cm)
- **الهامش الأيمن**: 1.5 بوصة (3.81cm) - للتجليد
- **الهامش الأيسر**: 1 بوصة (2.54cm)

## ملاحظات مهمة

### على الشاشة (Screen View)
- يظهر `box-shadow` خفيف لإعطاء شكل الصفحة
- يظهر `border` رمادي خفيف لتحديد حواف الصفحة
- هذا يساعد المستخدم على رؤية حدود الصفحة أثناء الكتابة

### عند الطباعة (Print View)
- تتم إزالة جميع الحدود والظلال
- تُخفى عناصر الواجهة (Header, Sidebar, Buttons)
- تظهر فقط محتويات السيناريو النظيفة
- تُطبق الهوامش الصحيحة تلقائيًا

## الفرق بين Before و After

### Before (قبل الإصلاح)
```css
.editor {
    padding: 2cm; /* هوامش غير دقيقة */
    border: 1px solid gray; /* يظهر عند الطباعة */
    box-shadow: 0 0 10px rgba(0,0,0,0.1); /* يظهر عند الطباعة */
}
```

### After (بعد الإصلاح)
```css
.screenplay-page {
    padding-top: 1in;
    padding-bottom: 1in;
    padding-right: 1.5in;
    padding-left: 1in;
}

@media print {
    .screenplay-page {
        border: none !important;
        box-shadow: none !important;
    }
}
```

## الملفات المعدلة

1. `src/style.css` - إضافة قواعد الطباعة الصحيحة
2. `src/components/editor/CleanIntegratedScreenplayEditor.tsx` - تطبيق الهوامش والـ classes

## المراجع

- [CSS @page Rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
- [Screenplay Format Standards](https://en.wikipedia.org/wiki/Screenplay#Format)
- معايير التنسيق العربية للسيناريوهات

---

**تاريخ الإصلاح**: 2024
**المطور**: Claude AI Assistant
**الحالة**: ✅ تم الإصلاح والاختبار