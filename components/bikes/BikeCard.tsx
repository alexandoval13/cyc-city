import { bikes } from '@/lib/generated/prisma';
import { CardContent, CardFooter, CardHeader } from '../ui/card';
import Image from 'next/image';
import { QrCode } from '../icons/qrcode';
import { Button } from '../ui/button';

type BikeCardProps = {
  data: bikes;
  details?: boolean;
  selected?: boolean;
  handleSelect?: (id: string) => void;
};

export default function BikeCard({
  data,
  details,
  selected,
  handleSelect,
}: BikeCardProps) {
  const { id, name, make_model, total_mileage, image_url } = data;

  const unit = 'miles'; // TODO: make customizeable

  const handleClickBike = () => {
    if (handleSelect) {
      handleSelect(id);
    }
  };

  return (
    <main onClick={handleClickBike}>
      <CardHeader className="p-2 pb-2">
        <div className="flex flex-row p-2 pb-2 items-center justify-between">
          <p className="text-xl">{name}</p>
          {details ? (
            <Button className="p-0 h-6 w-6">
              <QrCode className="p-0" />
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent
        className={`flex flex-row items-center gap-6 p-4 pr-6 pl-6 ${
          selected ? 'border-4' : ''
        }`}
      >
        {image_url ? (
          <Image
            src={image_url}
            alt={`Image of ${name}`}
            height={100}
            width={100}
          />
        ) : null}
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
      {details ? (
        <CardFooter className="flex flex-row justify-between text-xs">
          <p>{data.specs}</p>
        </CardFooter>
      ) : null}
    </main>
  );
}
