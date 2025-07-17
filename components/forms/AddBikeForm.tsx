'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function AddBikeForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    make_model: '',
    specs: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setDisabled(true);

    if (!formData.name || !formData.make_model || !formData.specs) {
      setError('All fields are required.');
      setDisabled(false);
      return;
    }

    try {
      const res = await fetch('/api/bikes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to add bike');
      } else {
        setSuccess('Bike added successfully!');
        setFormData({ name: '', make_model: '', specs: '' });
        router.push(`/bikes/${data.id}`);
      }
    } catch (err) {
      setError('An unexpected error occurred: ' + err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <h2>Add a New Bike</h2>

      <div className="flex flex-col gap-1">
        <label>Bike Name *</label>
        <Input name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="flex flex-col gap-1">
        <label>Make & Model *</label>
        <Input
          name="make_model"
          value={formData.make_model}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Specs *</label>
        <Input name="specs" value={formData.specs} onChange={handleChange} />
      </div>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </form>
  );
}
