'use client';
import { UserContext } from '@/app/contexts/UserContext';
import { getGreeting } from '@/lib/helpers/localTime';
import { useContext } from 'react';

export default function Greeting() {
  const greeting = getGreeting();

  const { user } = useContext(UserContext);

  const copy = user ? `${greeting}, ${user.email}!` : `${greeting}!`;

  return (
    <main className="">
      <div className="flex flex-row justify-between space-between p-2">
        <p>{copy}</p>
      </div>
    </main>
  );
}
