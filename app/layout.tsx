import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import NavigationMobile from '@/components/navigationMobile';
import Image from 'next/image';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'CycCity',
  description: 'Saddle up, baby',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 flex flex-col bg-inherit w-full gap-1">
            <div className="flex flex-row p-2 justify-between">
              <p className="text-2xl">CycCity</p>
              <Image src="./icon.svg" alt="app-icon" height={24} width={24} />
            </div>
            <div className="border-2" />
          </div>
          {children}
          <NavigationMobile />
        </ThemeProvider>
      </body>
    </html>
  );
}
