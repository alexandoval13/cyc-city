'use client';

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
import { handleAuthError } from '@/lib/supabase/client-helpers';

interface AuthErrorBoundaryProps {
  children: React.ReactNode;
}

export function AuthErrorBoundary({ children }: AuthErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const handleError = async (event: ErrorEvent) => {
      const error = event.error;

      // Handle any auth-related error
      if (
        error?.message?.includes('auth') ||
        error?.message?.includes('token') ||
        error?.message?.includes('session')
      ) {
        setErrorMessage('Your session has expired. Please log in again.');
        setHasError(true);

        // Clear the session
        await handleAuthError(error);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', async (event) => {
      if (
        event.reason?.message?.includes('auth') ||
        event.reason?.message?.includes('token') ||
        event.reason?.message?.includes('session')
      ) {
        setErrorMessage('Your session has expired. Please log in again.');
        setHasError(true);

        // Clear the session
        await handleAuthError(event.reason);
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
