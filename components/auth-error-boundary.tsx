'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { isRefreshTokenError } from '@/lib/supabase/auth-helpers';

interface AuthErrorBoundaryProps {
  children: React.ReactNode;
}

export function AuthErrorBoundary({ children }: AuthErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error = event.error;

      // Check if it's an authentication error
      if (
        isRefreshTokenError(error) ||
        error?.message?.includes('authapierror')
      ) {
        setErrorMessage('Your session has expired. Please log in again.');
        setHasError(true);

        // Clear the session
        const supabase = createClient();
        supabase.auth.signOut();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
      if (
        isRefreshTokenError(event.reason) ||
        event.reason?.message?.includes('authapierror')
      ) {
        setErrorMessage('Your session has expired. Please log in again.');
        setHasError(true);

        // Clear the session
        const supabase = createClient();
        supabase.auth.signOut();
      }
    });

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleRetry = () => {
    setHasError(false);
    setErrorMessage('');
    router.push('/auth/login');
  };

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Session Expired</CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRetry} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
