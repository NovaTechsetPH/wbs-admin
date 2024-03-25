import React, { useState } from 'react';
import axiosClient from '@/axios-client';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const AddCategories = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_productive: '',
    header_name: '',
    icon: '',
    abbreviation: '',
    priority_id: '',
    updated_at: '',
    created_at: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/categories', formData); // Adjust the API endpoint accordingly
      console.log('Category added successfully:', response.data);
      // You can add further handling here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error adding category:', error);
      // Handle error cases, such as displaying an error message to the user
    }
  };

  const fields = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'is_productive', label: 'Is Productive' },
    { key: 'header_name', label: 'Header Name' },
    { key: 'icon', label: 'Icon' },
    { key: 'abbreviation', label: 'Abbreviation' },
    { key: 'priority_id', label: 'Priority ID' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'created_at', label: 'Created At' },
  ];

  return (
    <div className="flex">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>Make changes to your category here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {fields.map((field) => (
                <div key={field.key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.key} className="text-right">
                    {field.label}
                  </Label>
                  <Input
                    id={field.key}
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="button">Cancel</Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategories;
