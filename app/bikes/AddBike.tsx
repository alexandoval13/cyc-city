'use client';
import AddBikeForm from '@/components/forms/AddBikeForm';
import { AddIcon } from '@/components/icons/add';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AddBike() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const handleClose = () => {
    setFormOpen(false);
  };

  // todo: fix bg color with scheme
  return (
    <main className="bg-inherit">
      <Button className="rounded-full" onClick={() => setFormOpen(true)}>
        <AddIcon />
      </Button>
      {formOpen ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1001 w-full h-full bg-gray-600">
          <div className="fixed top-2 right-2">
            <Button onClick={handleClose}>X</Button>
          </div>
          <AddBikeForm />
        </div>
      ) : null}
    </main>
  );
}
