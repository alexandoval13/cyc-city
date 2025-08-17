import { createClient } from './client';

/**
 * Client-side utility functions for authentication
 * These functions can be used in client components without server-side dependencies
 */

/**
 * Generic auth error handler - logs the error and clears the session
 * This approach is more reliable than trying to detect specific error types
 *
 * @param error - Any error that occurred during authentication
 */
export const handleAuthError = async (error: unknown): Promise<void> => {
  // Log the error for debugging
  console.error('Auth error in client:', {
    error,
    errorType: typeof error,
    errorKeys: error && typeof error === 'object' ? Object.keys(error) : [],
    timestamp: new Date().toISOString(),
  });

  // Clear the session when there's any auth error
  await clearSession();
};

/**
 * Clears the current user session
 * Used when authentication errors occur or user logs out
 */
export const clearSession = async (): Promise<void> => {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    console.log('Successfully cleared client session');
  } catch (error) {
    console.error('Failed to clear session:', {
      error,
      errorType: typeof error,
      timestamp: new Date().toISOString(),
    });
  }
};
