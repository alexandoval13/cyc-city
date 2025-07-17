import { QrCode } from '@/components/icons/qrcode';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import CycCityBikeImage from '@/public/cyc-city-bike-bg.svg';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log({ id });
  const supabase = await createClient();

  const { data: bike, error } = await supabase
    .from('bikes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return <div>Error loading bike: {error.message}</div>;
  }

  const { image_url, name, make_model, specs, total_mileage } = bike;

  const img_src = image_url ? image_url : CycCityBikeImage;

  const unit = 'miles'; // TODO: make customizeable

  return (
    <main className="p-4">
      <CardHeader className="p-2 pb-2">
        <div className="flex flex-row p-2 pb-2 items-center justify-between">
          <p className="text-xl">{name}</p>

          <Button className="p-0 h-6 w-6">
            <QrCode className="p-0" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`flex flex-row items-center gap-6 p-4 pr-6 pl-6`}>
        <Image
          src={img_src}
          alt={`Image of ${name}`}
          height={100}
          width={100}
        />

        <div>
          <div className="flex flex-row">
            <p>{make_model}</p>
          </div>
          <div className="flex flex-row gap-6 items-end">
            <p className="text-xs text-red-300">TRAVELED</p>
            <p>
              {total_mileage} {unit}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-row justify-between text-xs">
        <p>{specs}</p>
      </CardFooter>

      <div>
        <ul>
          <li>Travel/Use History</li>
          <li>Last Service Date and Details</li>
          <li>Recommended/Reminder for maintenance</li>
          <li>Actions</li>
        </ul>
      </div>
    </main>
  );
}
