'use client';
import BikeList from '@/components/bikes/BikeList';
import { bikes } from '@/lib/generated/prisma';
import { useState } from 'react';
import Actions from './actions';

type DashboardProps = {
  data: bikes[];
};

export default function Dashboard({ data }: DashboardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main>
      <BikeList
        data={data}
        handleSelect={setSelectedId}
        selected={selectedId}
      />
      <Actions />
    </main>
  );
}
