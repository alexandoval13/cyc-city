import { createClient as createServerClient } from './server';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Gets the current authenticated user from the server-side session
 * Used in API routes and server components
 */
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
 * Redirects to the login page
 * @param request - The request object
 * @returns A redirect response to the login page
 */
export const redirectToLogin = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = '/auth/login';
  return NextResponse.redirect(url);
};
