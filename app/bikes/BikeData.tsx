'use client';

import BikeList from '@/components/bikes/BikeList';
import { bikes } from '@/lib/generated/prisma';
import { useRouter } from 'next/navigation';
type BikeDataProps = {
  data: bikes[];
};

export default function BikeData({ data }: BikeDataProps) {
  const router = useRouter();

  return (
    <main className="h-screen">
      <BikeList
        data={data || []}
        details
        handleSelect={(id) => router.push(`bikes/${id}`)}
      />
    </main>
  );
}
