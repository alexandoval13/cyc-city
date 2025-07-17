import { bikes } from '@/lib/generated/prisma';
import BikeCard from './BikeCard';

type BikeListProps = {
  data: bikes[];
  details?: boolean;
  selected?: string | null;
  handleSelect?: (id: string) => void;
};
export default function BikeList({
  data,
  details,
  selected,
  handleSelect,
}: BikeListProps) {
  return (
    <>
      {data?.map((bike: bikes, i: number) => (
        <div key={`bike::dash::${i}${bike.id}`}>
          <BikeCard
            data={bike}
            handleSelect={handleSelect}
            selected={bike.id === selected}
            details={details}
          />
        </div>
      ))}
    </>
  );
}
