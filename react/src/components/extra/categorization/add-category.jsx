import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set created_at before sending the request
      const newData = { ...formData, created_at: Date.now() };

      const response = await axiosClient.post('/categories', newData);
      console.log('Category added successfully:', response.data);
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        is_productive: '',
        header_name: '',
        icon: '',
        abbreviation: '',
        priority_id: '',
      });

      setTimeout(function () {
        window.location.href = window.location.href; // Replace '/new-page' with your desired URL
      }, 500);
    } catch (error) {
      console.error('Error adding category:', error);
      // Handle error cases, such as displaying an error message to the user
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('categories', {
          params: formData,
        });
        console.log(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [formData]); // Trigger the effect whenever formData changes

  const fields = [
    { key: 'name', label: 'Name', required: true },
    { key: 'description', label: 'Description', required: true },
    { key: 'is_productive', label: 'Is Productive', options: [
      { value: '0', label: 'Neutral' } ], required: true },
    { key: 'header_name', label: 'Header Name', required: true },
    { key: 'icon', label: 'Icon', required: false },
    { key: 'abbreviation', label: 'Abbreviation', required: false },
    { key: 'priority_id', label: 'Priority ID', required: false },
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
                  {field.key !== 'created_at' && (
                    <>
                      <Label htmlFor={field.key} className="text-right">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      {field.key === 'is_productive' ? (
                        <select
                          id={field.key}
                          name={field.key}
                          value={formData[field.key]}
                          onChange={handleChange}
                          className="col-span-3"
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={field.key}
                          name={field.key}
                          value={formData[field.key]}
                          onChange={handleChange}
                          className="col-span-3"
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategories;
