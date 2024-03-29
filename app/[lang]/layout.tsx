import type {Metadata} from 'next';
import {Locale, i18n} from '@/i18n.config';
import {graphik} from '../../public/fonts';
import './globals.css';

const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({lang: locale}));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {lang: Locale};
}>) {
  return (
    <html lang={params.lang}>
      <body
        className={`min-h-screen flex flex-col bg-[#FBFCFE] ${graphik.className}`}
      >
        {children}
      </body>
    </html>
  );
}

export {metadata};
