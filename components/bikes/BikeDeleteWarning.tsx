'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { bikes } from '@/lib/generated/prisma';

type BikeDeleteWarningProps = {
  data: bikes;
  onClose: () => void;
};

export default function BikeDeleteWarning({
  data: bike,
  onClose,
}: BikeDeleteWarningProps) {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleClick = () => {
    setIsChecked((prev) => !prev);
  };

  const handleClose = () => {
    setIsChecked(false);
    onClose();
  };

  const handleConfirmDelete = async () => {
    const id = bike.id;
    console.log({ id });
    try {
      const res = await fetch('/api/bikes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to delete bike');
      } else {
        setSuccess('Bike deleted successfully!');
        router.push(`/bikes`);
      }
    } catch (err) {
      setError('An unexpected error occurred: ' + err);
    } finally {
      setIsChecked(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2>
        Are you sure you want to delete {bike.name}? This action cannot be
        undone.
      </h2>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <div className="flex flex-row gap-2">
        <input type="checkbox" checked={isChecked} onClick={toggleClick} />
        <p>I am sure</p>
      </div>

      <Button type="submit" onClick={handleClose}>
        Cancel
      </Button>
      <Button type="submit" onClick={handleConfirmDelete} disabled={!isChecked}>
        Confirm
      </Button>
    </div>
  );
}
