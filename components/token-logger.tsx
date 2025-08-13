'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

export default function TokenLogger() {
  useEffect(() => {
    const getToken = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log({ session });
      console.log('Access token:', session?.access_token);
    };

    getToken();
  }, []);

  return null;
}
