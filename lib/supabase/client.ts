import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Verify connection
async function testConnection() {
  const supabase = createClient();
  try {
    const { error } = await supabase.from('your_table').select('*').limit(1);

    if (error) throw error;

    console.log('Connection successful');
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();
