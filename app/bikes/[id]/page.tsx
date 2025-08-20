import { createClient } from '@/lib/supabase/server';
import BikeDetails from '@/components/bikes/BikeDetails';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  try {
    const { data: bike } = await supabase
      .from('bikes')
      .select('*')
      .eq('id', id)
      .single();

    return (
      <main className="bg-inherit">
        {bike && <BikeDetails data={bike} />}

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
  } catch (error) {
    console.log(`Unable to fetch bike: ${error}`);

    return (
      <div>
        <p>An error occurred</p>
      </div>
    );
  }
}
