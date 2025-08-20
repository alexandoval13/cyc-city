import BikeDetails from '@/components/bikes/BikeDetails';
import { createClient } from '@/lib/supabase/server';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: bike, error } = await supabase
    .from('bikes')
    .select('*')
    .eq('id', id)
    .single();

  return (
    <main className="bg-inherit">
      <BikeDetails data={bike} />

      <div className="p-4">
        <ul>
          <li>Recommended/Reminder for maintenance</li>
          <li>Last Service Date and Details</li>
          <li>Travel/Use History</li>
          <li>Actions</li>
        </ul>
      </div>
    </main>
  );
}
