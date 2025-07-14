import { createClient } from './server';
import { NextRequest } from 'next/server';

export const getSupabaseAuthUser = async (req: NextRequest) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user;
};
