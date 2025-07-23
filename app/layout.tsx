import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import NavigationMobile from '@/components/navigationMobile';
import UserContextProvider from './contexts/UserContext';

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
          <UserContextProvider>
            {children}
            <NavigationMobile />
          </UserContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
