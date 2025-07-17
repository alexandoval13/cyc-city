import Greeting from '@/components/greeting';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Greeting />
      {children}
    </div>
  );
}
