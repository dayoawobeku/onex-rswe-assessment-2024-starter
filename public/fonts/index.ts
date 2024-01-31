import localFont from 'next/font/local';

const graphik = localFont({
  variable: '--font-graphik',
  display: 'swap',
  src: [
    {
      path: './GraphikRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GraphikMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GraphikSemibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './GraphikBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export {graphik};
