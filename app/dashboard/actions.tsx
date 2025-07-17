'use client';

import { Button } from '@/components/ui/button';

export default function Actions() {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 items-center">
      <p>Add service</p>
      <Button className="max-w-24 flex-wrap h-auto text-wrap rounded-full">
        <p>LOG TRAVEL</p>
      </Button>
    </div>
  );
}
