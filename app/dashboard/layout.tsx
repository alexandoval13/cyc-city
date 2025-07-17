import Greeting from '@/components/greeting';
import { ThemeProvider } from 'next-themes';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider>
        <Greeting />
        {children}
      </ThemeProvider>
    </div>
  );
}
