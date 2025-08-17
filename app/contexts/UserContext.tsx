'use client';

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

type UserContextType = { user: User | null };

export const UserContext = createContext<UserContextType>({ user: null });

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error.message);

          // Handle refresh token errors
          if (
            error.message.includes('invalid refresh token') ||
            error.message.includes('JWT expired') ||
            error.message.includes('Invalid JWT')
          ) {
            // Clear the session and redirect to login
            await supabase.auth.signOut();
            setUser(null);
            return;
          }
        }

        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Unexpected error in UserContext:', error);
        setUser(null);
      }
    };

    getUser();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = createClient().auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
