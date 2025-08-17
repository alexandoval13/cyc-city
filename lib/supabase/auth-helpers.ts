import { createClient } from './server';

export const getSupabaseAuthUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user;
};

export const handleAuthError = async (error: any) => {
  console.error('Auth error:', error);

  // Check if it's a refresh token error
  if (
    error?.message?.includes('invalid refresh token') ||
    error?.message?.includes('JWT expired') ||
    error?.message?.includes('Invalid JWT')
  ) {
    // Clear the session
    const supabase = await createClient();
    await supabase.auth.signOut();

    return {
      shouldRedirect: true,
      redirectTo: '/auth/login',
      error: 'Session expired. Please log in again.',
    };
  }

  return {
    shouldRedirect: false,
    error: error?.message || 'An authentication error occurred',
  };
};

export const refreshSession = async () => {
  const supabase = await createClient();

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
