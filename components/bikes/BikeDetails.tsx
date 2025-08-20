'use client';
import { useState } from 'react';
import { bikes } from '@/lib/generated/prisma';

import EditBikeForm from '../forms/EditBikeForm';

import BikeCard from '@/components/bikes/BikeCard';
import { MenuIcon } from '@/components/icons/menu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import ButtonBase from '@mui/material/ButtonBase';
import BikeDeleteWarning from './BikeDeleteWarning';

type BikeDetailsProps = {
  data: bikes;
};

function BikeDetails({ data: bike }: BikeDetailsProps) {
  const [editFormOpen, setEditFormOpen] = useState<boolean>(false);
  const [deleteWarningOpen, setDeleteWarningOpen] = useState<boolean>(false);

  const handleClickEdit = () => {
    setEditFormOpen(true);
  };

  const handleClickDelete = () => {
    setDeleteWarningOpen(true);
  };

  return (
    <main className="bg-inherit">
      {editFormOpen && (
        <div className="bg-inherit fixed sm:h-full sm: w-full md:h-auto md:max-w-[360px] left-1/2 bottom-20 -translate-x-1/2 -translate-y-1/2">
          <EditBikeForm data={bike} onClose={() => setEditFormOpen(false)} />
        </div>
      )}

      {deleteWarningOpen && (
        <div className="bg-inherit fixed sm:h-full sm: w-full md:h-auto md:max-w-[360px] left-1/2 bottom-20 -translate-x-1/2 -translate-y-1/2">
          <BikeDeleteWarning
            data={bike}
            onClose={() => setDeleteWarningOpen(false)}
          />
        </div>
      )}

      <div className="flex flex-row p-2 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <ButtonBase onClick={handleClickEdit}>Edit details</ButtonBase>

              {/* <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              Archive
              {/* <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ButtonBase onClick={handleClickDelete}>Delete</ButtonBase>
              {/* <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {bike && <BikeCard data={bike} details />}
    </main>
  );
}

export default BikeDetails;
