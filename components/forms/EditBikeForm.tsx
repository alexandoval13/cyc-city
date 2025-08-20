'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { bikes } from '@/lib/generated/prisma';

type EditBikeFormProps = {
  data: bikes;
  onClose: () => void;
};

export default function EditBikeForm(props: EditBikeFormProps) {
  const { data: bike, onClose } = props;

  const router = useRouter();

  const [name, setName] = useState<string>(bike.name);
  const [makeModel, setMakeModel] = useState<string>(bike.make_model);
  const [specs, setSpecs] = useState<string>(bike.specs);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };
  const handleChangeMakeModel = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMakeModel(e.target.value);
  };
  const handleChangeSpecs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSpecs(e.target.value);
  };

  const handleClose = () => {
    setName('');
    setMakeModel('');
    setSpecs('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setDisabled(true);

    if (!name || !makeModel || !specs) {
      setError('All fields are required.');
      setDisabled(false);
      return;
    }

    const formData: Partial<bikes> = {
      id: bike.id,
      name,
      specs,
      make_model: makeModel,
    };

    try {
      const res = await fetch('/api/bikes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to edit bike');
      } else {
        setSuccess('Bike edited successfully!');
        handleClose();
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred: ' + err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h2>Edit Details</h2>
        <Button type="reset" onClick={() => handleClose()}>
          Cancel
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        <label>Bike Name *</label>
        <Input name="name" value={name} onChange={handleChangeName} />
      </div>

      <div className="flex flex-col gap-1">
        <label>Make & Model *</label>
        <Input
          name="make_model"
          value={makeModel}
          onChange={handleChangeMakeModel}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Specs *</label>
        <Input name="specs" value={specs} onChange={handleChangeSpecs} />
      </div>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </form>
  );
}
