'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error);
        // Even if there's an error, we should still redirect to login
        // as the session might be invalid anyway
      }

      // Clear any local storage or cookies that might be cached
      localStorage.removeItem('supabase.auth.token');

      // Redirect to login page
      router.push('/auth/login');
      router.refresh(); // Force a refresh to clear any cached state
    } catch (error) {
      console.error('Unexpected logout error:', error);
      // Still redirect to login even if there's an error
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={logout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
