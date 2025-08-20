'use client';
import AddBikeForm from '@/components/forms/AddBikeForm';
import { AddIcon } from '@/components/icons/add';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AddBike() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-full">
          <AddIcon />
        </Button>
      </DialogTrigger>
      <DialogHeader />
      <DialogContent className="h-full md:h-auto md:max-h-[360px] max-w-screen p-0 overflow-auto">
        <AddBikeForm />
      </DialogContent>
      <DialogFooter />
    </Dialog>
  );
}
