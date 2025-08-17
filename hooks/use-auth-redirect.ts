'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function useAuthRedirect(redirectTo: string = '/dashboard') {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (user && !error) {
          // Add a small delay to ensure cookies are properly set
          await new Promise((resolve) => setTimeout(resolve, 200));
          router.refresh();
          router.push(redirectTo);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [router, redirectTo]);

  return { isLoading };
}
