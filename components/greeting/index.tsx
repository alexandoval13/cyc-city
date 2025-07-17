import { getGreeting } from '@/lib/helpers/localTime';

export default function Greeting() {
  const greeting = getGreeting();

  return (
    <main className="">
      <div className="flex flex-row justify-between space-between p-2">
        <p>{greeting}, user</p>
      </div>
    </main>
  );
}
