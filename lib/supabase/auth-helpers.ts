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

export const handleAuthError = async (error: unknown) => {
  console.error('Auth error:', error);

  // Check if it's a refresh token error
  const errorMessage =
    error && typeof error === 'object' && 'message' in error
      ? String(error.message)
      : '';

  if (
    errorMessage.includes('invalid refresh token') ||
    errorMessage.includes('JWT expired') ||
    errorMessage.includes('Invalid JWT')
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
    error: errorMessage || 'An authentication error occurred',
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
