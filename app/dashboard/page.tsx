import { createClient } from '@/lib/supabase/server';
import Dashboard from './dashboard';

export default async function Page() {
  const supabase = await createClient();
  const { data: bikes } = await supabase.from('bikes').select();

  return (
    <main className="h-screen">
      <Dashboard data={bikes || []} />
    </main>
  );
}
