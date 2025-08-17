import { createClient as createServerClient } from './server';
import { createClient as createBrowserClient } from './client';

export const getSupabaseAuthUser = async () => {
  const supabase = await createServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user;
};

/**
 * Checks if an error is a refresh token error that requires session cleanup
 */
export const isRefreshTokenError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object' || !('message' in error)) {
    return false;
  }

  const message = String(error.message).toLowerCase();
  return (
    message.includes('invalid refresh token') ||
    message.includes('jwt expired') ||
    message.includes('invalid jwt')
  );
};

/**
 * Handles refresh token errors consistently across the application
 */
export const handleRefreshTokenError = async (
  error: unknown,
  context: 'middleware' | 'client' = 'client'
) => {
  if (!isRefreshTokenError(error)) {
    return false;
  }

  console.error(`Refresh token error in ${context}:`, error);

  if (context === 'client') {
    // Client-side: clear session and update state
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    return true;
  }

  // Middleware: return true to indicate cookies should be cleared
  return true;
};

export const refreshSession = async () => {
  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      console.error('Session refresh error:', error);
      return { success: false, error };
    }

    return { success: true, session: data.session };
  } catch (error) {
    console.error('Unexpected error during session refresh:', error);
    return { success: false, error };
  }
};
