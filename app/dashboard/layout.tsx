import Image from 'next/image';
import Greeting from '@/components/greeting';
import { ThemeProvider } from 'next-themes';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LogoutButton } from '@/components/logout-button';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider>
        <div className="sticky top-0 flex flex-col bg-inherit w-full gap-1">
          <div className="flex flex-row p-2 justify-between">
            <Image src="./icon.svg" alt="app-icon" height={24} width={24} />
            <Greeting />
            <LogoutButton />
            <ThemeSwitcher />
          </div>
          <div className="border-2" />
        </div>
        {children}
      </ThemeProvider>
    </div>
  );
}
