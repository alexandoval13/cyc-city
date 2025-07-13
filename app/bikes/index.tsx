import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: bikes } = await supabase.from('bikes').select();

  return <pre>{JSON.stringify(bikes, null, 2)}</pre>;
}
