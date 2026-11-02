import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'ViralShop AI | استراتژی محتوای فروشگاهی', template: '%s | ViralShop AI' },
  description: 'دستیار هوشمند تولید محتوا و بازاریابی برای آنلاین‌شاپ‌ها؛ از تحلیل محصول تا سناریوی ریلز.',
  applicationName: 'ViralShop AI',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
