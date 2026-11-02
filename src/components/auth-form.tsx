'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = { mode: 'login' | 'register' };

export function AuthForm({ mode }: Props) {
  const isRegister = mode === 'register';
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'درخواست انجام نشد. دوباره تلاش کن.');
      router.replace('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ارتباط با سرور برقرار نشد.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7fc] px-4 py-10">
      <section className="w-full max-w-[440px] rounded-[28px] border border-[#e9e9f1] bg-white p-7 shadow-[0_20px_70px_#24234a0d] sm:p-10">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-xl font-black text-[#242044]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6755e8] text-white">V</span>
          ViralShop <span className="text-[#6755e8]">AI</span>
        </Link>
        <h1 className="mt-2 text-2xl font-black text-[#20213a]">{isRegister ? 'ساخت حساب کاربری' : 'خوش برگشتی!'}</h1>
        <p className="mt-2 text-sm leading-7 text-[#777d91]">{isRegister ? 'برای شروع مدیریت هوشمند فروشگاهت، حساب بساز.' : 'برای ورود به پنل فروشگاه، اطلاعات حسابت را وارد کن.'}</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          {isRegister && <label className="block text-sm font-bold text-[#41465c]">نام و نام خانوادگی<input required minLength={2} autoComplete="name" value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-[#e4e5ee] bg-white px-4 py-3 outline-none transition focus:border-[#6755e8]" placeholder="مثلاً علی رضایی" /></label>}
          <label className="block text-sm font-bold text-[#41465c]">ایمیل<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-[#e4e5ee] bg-white px-4 py-3 text-left outline-none transition focus:border-[#6755e8]" dir="ltr" placeholder="name@example.com" /></label>
          <label className="block text-sm font-bold text-[#41465c]">رمز عبور<input required type="password" minLength={8} autoComplete={isRegister ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#e4e5ee] bg-white px-4 py-3 text-left outline-none transition focus:border-[#6755e8]" dir="ltr" placeholder="حداقل ۸ کاراکتر" /></label>
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-[#6755e8] px-5 py-3.5 font-bold text-white transition hover:bg-[#5745d3] disabled:cursor-not-allowed disabled:opacity-60" type="submit">{busy ? 'لطفاً صبر کن...' : isRegister ? 'ساخت حساب' : 'ورود به حساب'}</button>
        </form>
        <p className="mt-7 text-center text-sm text-[#777d91]">{isRegister ? 'قبلاً حساب ساختی؟' : 'هنوز حساب نداری؟'}{' '}
          <Link className="font-bold text-[#6755e8] hover:underline" href={isRegister ? '/login' : '/register'}>{isRegister ? 'وارد شو' : 'ثبت‌نام کن'}</Link>
        </p>
        <Link href="/" className="mt-5 block text-center text-xs text-[#9a9eae] hover:text-[#6755e8]">بازگشت به صفحه اصلی</Link>
      </section>
    </main>
  );
}
