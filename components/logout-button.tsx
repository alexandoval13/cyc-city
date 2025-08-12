'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/contexts/UserContext';
import { useContext } from 'react';

export function LogoutButton() {
  const router = useRouter();

  const { user, clearUser } = useContext(UserContext);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    if (user && clearUser) clearUser();

    router.push('/auth/login');
  };

  return <Button onClick={logout}>Logout</Button>;
}
