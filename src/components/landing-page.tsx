import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, BarChart3, Check, Clapperboard, Instagram, Lightbulb, MessageCircle, Play, Sparkles, Target, WandSparkles, Zap } from 'lucide-react';

const features = [
  { icon: Target, title: 'شناخت دقیق محصول', desc: 'ویژگی‌ها، مزیت‌ها و دغدغه‌های مشتری را از اطلاعاتی که خودت ثبت می‌کنی استخراج کن.' },
  { icon: Clapperboard, title: 'ایده و سناریوی ریلز', desc: 'از هوک سه‌ثانیه‌ای تا متن گوینده، صحنه‌ها، کپشن و دعوت به خرید.' },
  { icon: BarChart3, title: 'تحلیل عملکرد محتوا', desc: 'آمار واقعی پست‌هایت را ثبت کن و بفهم کدام فرمت و هوک بهتر جواب می‌دهد.' },
  { icon: Lightbulb, title: 'استراتژی محتوایی', desc: 'برای آگاهی از برند، اعتمادسازی و فروش، مسیر محتوایی مشخص داشته باش.' },
  { icon: MessageCircle, title: 'دستیار اختصاصی فروشگاه', desc: 'با دستیار هوشمند درباره محصولات، کمپین‌ها و محتوای بعدی گفت‌وگو کن.' },
  { icon: Instagram, title: 'تحقیق محتوای بازار', desc: 'نمونه‌ها و آمار قابل‌دسترسی را بررسی کن؛ بدون ادعای دسترسی غیرمجاز به اینستاگرام.' },
];

const plans = [
  { name: 'رایگان', price: '۰', note: 'برای شروع و آشنایی', items: ['۱ فروشگاه', '۳ محصول', '۳ تحلیل در ماه', '۵ سناریوی ریلز در ماه'], featured: false },
  { name: 'حرفه‌ای', price: 'به‌زودی', note: 'برای فروشگاه‌های در حال رشد', items: ['چند محصول', 'تحلیل‌های بیشتر', 'سناریوهای بیشتر', 'تاریخچه و دستیار هوشمند'], featured: true },
  { name: 'کسب‌وکار', price: 'به‌زودی', note: 'برای تیم‌ها و چند فروشگاه', items: ['چند فروشگاه', 'تحلیل پیشرفته', 'گزارش‌های عملکرد', 'سقف مصرف بالاتر'], featured: false },
];

export function LandingPage() {
  return <main>
    <header className="sticky top-0 z-30 border-b border-[#eff0f5] bg-white/90 backdrop-blur-xl">
      <div className="container flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#6755e8] text-white"><Zap size={21} fill="currentColor" /></span>
          <span className="text-[17px] font-black tracking-tight">ViralShop <span className="text-[#6755e8]">AI</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a className="nav-link" href="#features">امکانات</a><a className="nav-link" href="#how">نحوه کار</a><a className="nav-link" href="#pricing">تعرفه‌ها</a><a className="nav-link" href="#faq">سؤالات متداول</a>
        </nav>
        <div className="flex items-center gap-2"><Link className="hidden px-3 py-2 text-sm font-bold text-[#525a72] sm:block" href="/login">ورود</Link><Link className="btn btn-primary !px-4 !py-2.5" href="/register">شروع رایگان <ArrowLeft size={16}/></Link></div>
      </div>
    </header>

    <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[540px] opacity-70" />
      <div className="container relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div className="max-w-[610px]">
          <div className="eyebrow"><Sparkles size={14}/> دستیار هوشمند رشد آنلاین‌شاپ</div>
          <h1 className="mt-6 text-[39px] leading-[1.45] font-black tracking-tight sm:text-[50px] md:text-[56px]">محتوایی بساز که<br/><span className="text-[#6755e8]">فقط دیده نشه؛ بفروشه.</span></h1>
          <p className="mt-5 max-w-[540px] text-[15px] leading-8 text-[#687089] md:text-[17px]">ViralShop AI محصولت رو می‌شناسه، مخاطبت رو تحلیل می‌کنه و برای ریلز، کپشن و کمپین فروش بهت ایده‌های قابل اجرا می‌ده.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3"><Link href="/register" className="btn btn-primary !px-6 !py-3.5">رایگان شروع کن <ArrowLeft size={17}/></Link><a href="#how" className="btn btn-light !px-5 !py-3.5"><Play size={15}/> ببین چطور کار می‌کنه</a></div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[12px] font-medium text-[#7a8197]"><span className="flex items-center gap-1.5"><Check size={15} className="text-emerald-500"/> شروع با پلن رایگان</span><span className="flex items-center gap-1.5"><Check size={15} className="text-emerald-500"/> بدون نیاز به دانش بازاریابی</span><span className="flex items-center gap-1.5"><Check size={15} className="text-emerald-500"/> فارسی و مخصوص بازار ایران</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[510px]">
          <div className="absolute -right-8 top-12 h-40 w-40 rounded-full bg-[#e8e4ff] blur-3xl"/><div className="absolute -bottom-8 -left-8 h-44 w-44 rounded-full bg-[#dff8ef] blur-3xl"/>
          <div className="panel-shadow relative rounded-[25px] border border-[#ececf4] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-[#f0f0f5] pb-4"><div className="flex items-center gap-2"><div className="icon-box !h-9 !w-9 !rounded-xl"><WandSparkles size={18}/></div><div><p className="text-[13px] font-extrabold">تحلیل هوشمند محصول</p><p className="text-[10px] text-[#8b91a4]">گزارش نمونه رابط کاربری</p></div></div><span className="rounded-full bg-[#e8f8f1] px-2.5 py-1 text-[10px] font-bold text-[#16845d]">تحلیل آماده</span></div>
            <div className="mt-4 rounded-2xl bg-[#f8f8fc] p-4"><div className="flex items-center gap-3"><div className="grid h-[62px] w-[62px] place-items-center rounded-xl bg-[#e9e6ff] text-[#6755e8]"><Clapperboard size={27}/></div><div><p className="text-sm font-extrabold">کفش اسپرت روزمره</p><p className="mt-1 text-[11px] text-[#858ba0]">دسته‌بندی: پوشاک و کفش</p></div></div><div className="mt-4 grid grid-cols-3 gap-2"><div className="rounded-xl bg-white p-2.5 text-center"><p className="text-lg font-black text-[#6755e8]">۳</p><p className="text-[10px] text-[#858ba0]">زاویه تبلیغاتی</p></div><div className="rounded-xl bg-white p-2.5 text-center"><p className="text-lg font-black text-[#6755e8]">۵</p><p className="text-[10px] text-[#858ba0]">ایده اولیه</p></div><div className="rounded-xl bg-white p-2.5 text-center"><p className="text-lg font-black text-[#6755e8]">۲</p><p className="text-[10px] text-[#858ba0]">پرسونای مخاطب</p></div></div></div>
            <div className="mt-4"><div className="mb-3 flex items-center justify-between"><p className="text-[12px] font-extrabold">پیشنهاد محتوای بعدی</p><span className="text-[10px] text-[#8a90a4]">بر اساس اطلاعات محصول</span></div><div className="space-y-2.5"><div className="flex items-center gap-3 rounded-xl border border-[#efeff5] p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f0edff] text-[#6755e8]"><Play size={14}/></span><div className="flex-1"><p className="text-[11px] font-bold">۳ اشتباه در انتخاب کفش روزمره</p><p className="mt-1 text-[10px] text-[#9297a8]">هدف: اعتمادسازی</p></div><ArrowUpLeft size={15} className="text-[#a1a5b4]"/></div><div className="flex items-center gap-3 rounded-xl border border-[#efeff5] p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e7f8f1] text-[#15966a]"><Zap size={14}/></span><div className="flex-1"><p className="text-[11px] font-bold">از جعبه تا استایل نهایی</p><p className="mt-1 text-[10px] text-[#9297a8]">هدف: آگاهی از برند</p></div><ArrowUpLeft size={15} className="text-[#a1a5b4]"/></div></div></div>
            <p className="mt-4 text-center text-[9px] text-[#a0a4b2]">نمایش نمونه رابط کاربری؛ داده‌ها واقعی یا نتیجه تحلیل مشتری نیستند.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-[#f0f0f5] bg-[#fbfbfe] py-7"><div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center text-[12px] font-semibold text-[#7a8197]"><span>مخصوص آنلاین‌شاپ‌های ایرانی</span><span>از شناخت محصول تا سناریوی ریلز</span><span>تصمیم‌گیری بر پایه داده، نه حدس</span></div></section>

    <section id="features" className="section-pad"><div className="container"><div className="mx-auto mb-12 max-w-[600px] text-center"><span className="eyebrow">امکانات پلتفرم</span><h2 className="mt-4 text-3xl font-black leading-[1.5] md:text-[38px]">همه ابزارهای محتوایی،<br/>در یک فضای کاری</h2><p className="mt-4 text-sm leading-7 text-[#747b91]">به‌جای چند ابزار پراکنده، یک دستیار که زمینه کسب‌وکارت را می‌فهمد و پیشنهادهای مرتبط می‌دهد.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map(({icon:Icon,title,desc})=><article className="feature-card" key={title}><div className="icon-box"><Icon size={21}/></div><h3 className="mt-5 text-[16px] font-extrabold">{title}</h3><p className="mt-2 text-[13px] leading-7 text-[#747b91]">{desc}</p></article>)}</div></div></section>

    <section id="how" className="bg-[#f8f8fc] section-pad"><div className="container"><div className="mx-auto mb-12 max-w-[580px] text-center"><span className="eyebrow">شروع در سه قدم</span><h2 className="mt-4 text-3xl font-black md:text-[38px]">از محصولت تا محتوای آماده</h2><p className="mt-3 text-sm leading-7 text-[#747b91]">یک مسیر ساده که اطلاعات واقعی فروشگاه را به برنامه محتوایی تبدیل می‌کند.</p></div><div className="grid gap-5 md:grid-cols-3">{[{n:'۰۱',t:'فروشگاهت را بساز',d:'دسته‌بندی، مخاطب هدف و توضیحات کسب‌وکارت را وارد کن.'},{n:'۰۲',t:'محصولت را معرفی کن',d:'تصاویر، ویژگی‌ها، قیمت و مزیت‌های واقعی محصول را ثبت کن.'},{n:'۰۳',t:'ایده بگیر و اجرا کن',d:'تحلیل را ببین، سناریوها را شخصی‌سازی کن و نتیجه را ثبت کن.'}].map(x=><div key={x.n} className="rounded-2xl border border-[#e9e9f1] bg-white p-7"><span className="text-[13px] font-black text-[#6755e8]">{x.n}</span><h3 className="mt-4 text-lg font-extrabold">{x.t}</h3><p className="mt-2 text-[13px] leading-7 text-[#747b91]">{x.d}</p></div>)}</div></div></section>

    <section className="section-pad"><div className="container"><div className="grid items-center gap-10 rounded-[28px] bg-[#171a35] p-7 text-white md:grid-cols-[1fr_auto] md:p-12"><div><span className="text-xs font-bold text-[#bcb4ff]">محتوای بهتر، با تصمیم آگاهانه</span><h2 className="mt-3 max-w-[650px] text-2xl leading-[1.6] font-black md:text-[34px]">قرار نیست هر روز حدس بزنی چه چیزی منتشر کنی.</h2><p className="mt-3 max-w-[600px] text-sm leading-7 text-[#c2c5d6]">با شناخت محصول و بررسی عملکرد محتوا، قدم بعدی را با اطمینان بیشتری انتخاب کن.</p></div><Link href="/register" className="btn !bg-white !px-6 !py-3.5 !text-[#171a35]">ساخت حساب رایگان <ArrowLeft size={17}/></Link></div></div></section>

    <section id="pricing" className="bg-[#fbfbfe] section-pad"><div className="container"><div className="mb-12 text-center"><span className="eyebrow">تعرفه‌ها</span><h2 className="mt-4 text-3xl font-black md:text-[38px]">از رایگان شروع کن، رشد کن</h2><p className="mt-3 text-sm text-[#747b91]">پلن‌ها و سقف مصرف به‌صورت شفاف در حساب کاربری نمایش داده می‌شوند.</p></div><div className="mx-auto grid max-w-[980px] gap-4 md:grid-cols-3">{plans.map(p=><article key={p.name} className={`rounded-2xl border bg-white p-6 ${p.featured?'border-[#6755e8] shadow-[0_14px_40px_#6755e814]':'border-[#e9e9f1]'}`}><div className="flex items-center justify-between"><h3 className="font-extrabold">{p.name}</h3>{p.featured&&<span className="rounded-full bg-[#f0edff] px-2.5 py-1 text-[10px] font-bold text-[#6755e8]">محبوب</span>}</div><p className="mt-2 text-xs text-[#858ba0]">{p.note}</p><p className="mt-6 text-2xl font-black">{p.price}<span className="mr-1 text-xs font-medium text-[#858ba0]">{p.price==='۰'?'تومان':' '}</span></p><ul className="mt-6 space-y-3">{p.items.map(i=><li key={i} className="flex items-center gap-2 text-[12px] text-[#626a81]"><Check size={15} className="text-emerald-500"/>{i}</li>)}</ul><Link href="/register" className={`btn mt-7 w-full ${p.featured?'btn-primary':'btn-light'}`}>{p.price==='۰'?'شروع رایگان':'به‌زودی'}</Link></article>)}</div></div></section>

    <section id="faq" className="section-pad"><div className="container max-w-[780px]"><div className="mb-9 text-center"><span className="eyebrow">سؤالات متداول</span><h2 className="mt-4 text-3xl font-black">قبل از شروع، بدان</h2></div><div className="space-y-3">{[{q:'آیا ViralShop AI به همه اطلاعات اینستاگرام دسترسی دارد؟',a:'خیر. فقط از APIهای رسمی و مجاز، منابع عمومی قابل‌دسترسی، لینک‌ها و آمارهایی که خودت ارائه می‌کنی استفاده می‌کنیم. داده‌ای که در دسترس نباشد، به‌عنوان داده ناموجود اعلام می‌شود.'},{q:'آیا ایده‌ها مخصوص محصول من هستند؟',a:'بله؛ پیشنهادها با تکیه بر مشخصات، تصاویر، مخاطب هدف و داده‌های واقعی ثبت‌شده برای فروشگاهت ساخته می‌شوند. اطلاعات تأییدنشده به‌عنوان واقعیت مطرح نمی‌شوند.'},{q:'برای استفاده به دانش تولید محتوا نیاز دارم؟',a:'خیر. سناریو شامل هوک، ترتیب صحنه‌ها، متن گوینده، نوشته روی تصویر، کپشن و دعوت به اقدام است.'},{q:'آیا شروع کار هزینه دارد؟',a:'پلن رایگان برای شروع در نظر گرفته شده است. قابلیت‌های پولی و درگاه پرداخت پس از آماده‌شدن زیرساخت با جزئیات اعلام می‌شوند.'}].map(item=><details key={item.q} className="group rounded-2xl border border-[#e9e9f1] p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] font-extrabold">{item.q}<span className="text-xl text-[#6755e8] transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 text-[12px] leading-7 text-[#737b91]">{item.a}</p></details>)}</div></div></section>

    <footer className="border-t border-[#eeeef4] py-8"><div className="container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right"><Link href="/" className="text-sm font-black">ViralShop <span className="text-[#6755e8]">AI</span></Link><p className="text-[11px] text-[#9297a8]">ابزار هوشمند بازاریابی محتوایی برای آنلاین‌شاپ‌ها</p><p className="text-[11px] text-[#9297a8]">© ۲۰۲۶ ViralShop AI</p></div></footer>
  </main>;
}
