import { createClient } from '@/lib/supabase/server';
import BikeData from './BikeData';
import AddBike from './AddBike';

export default async function Page() {
  const supabase = await createClient();
  const { data: bikes } = await supabase.from('bikes').select();

  return (
    <main className="bg-inherit">
      <div className="flex flex-row justify-end p-2">
        <AddBike />
      </div>
      <BikeData data={bikes || []} />
    </main>
  );
}
