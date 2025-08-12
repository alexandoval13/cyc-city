'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

type UserContextType = { user: User | null; clearUser: (() => void) | null };

export const UserContext = createContext<UserContextType>({
  user: null,
  clearUser: null,
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}
