import Link from 'next/link';
import { AddIcon } from '../icons/add';
import { BikeIcon } from '../icons/bike';
import { HomeIcon } from '../icons/home';
import { ServiceIcon } from '../icons/service';
import { SettingsIcon } from '../icons/settings';

export default function NavigationMobile() {
  return (
    <main className="fixed bottom-0 right-0 left-0 height z-1000 bg-inherit">
      <div className="flex flex-row justify-between space-between p-2">
        <Link href={'/'}>
          <HomeIcon />
        </Link>
        <Link href={'/bikes'}>
          <BikeIcon />
        </Link>
        <Link href={'/dashboard'}>
          <AddIcon />
        </Link>
        <ServiceIcon />
        <SettingsIcon />
      </div>
    </main>
  );
}
