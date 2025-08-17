'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SessionInfo {
  user: {
    id: string;
    email: string | undefined;
    created_at: string;
    last_sign_in_at: string | undefined;
  } | null;
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number | undefined;
    expires_in: number;
  } | null;
}

export function AuthDebug() {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkSession = async () => {
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setError(error.message);
        setSessionInfo(null);
      } else {
        setError(null);
        setSessionInfo({
          user: data.session?.user
            ? {
                id: data.session.user.id,
                email: data.session.user.email,
                created_at: data.session.user.created_at,
                last_sign_in_at: data.session.user.last_sign_in_at,
              }
            : null,
          session: data.session
            ? {
                access_token: data.session.access_token ? 'Present' : 'Missing',
                refresh_token: data.session.refresh_token
                  ? 'Present'
                  : 'Missing',
                expires_at: data.session.expires_at,
                expires_in: data.session.expires_in,
              }
            : null,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setSessionInfo(null);
    }
  };

  const clearSession = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setSessionInfo(null);
    setError(null);
  };

  const refreshSession = async () => {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.refreshSession();

      if (error) {
        setError(error.message);
      } else {
        setError(null);
        await checkSession();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Authentication Debug</CardTitle>
        <CardDescription>
          Debug information for authentication issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={checkSession} variant="outline">
            Check Session
          </Button>
          <Button onClick={refreshSession} variant="outline">
            Refresh Session
          </Button>
          <Button onClick={clearSession} variant="destructive">
            Clear Session
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm font-medium">Error:</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {sessionInfo && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">User Info:</h4>
              <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto">
                {JSON.stringify(sessionInfo.user, null, 2)}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2">Session Info:</h4>
              <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto">
                {JSON.stringify(sessionInfo.session, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {!sessionInfo && !error && (
          <p className="text-gray-500 text-sm">
            No session information available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
