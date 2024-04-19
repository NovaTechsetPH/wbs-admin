import React, { useState } from 'react';
import { useStateContext } from "@/context/ContextProvider";
import axiosClient from '@/axios-client';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
//import { TrashIcon } from "@radix-ui/react-icons";
import { EditIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { Send } from 'lucide-react';

const EditCategories = ({ id, name, description, is_productive, header_name, icon, abbreviation, priority_id, updated_at, created_at, reason, edited_by }) => {
  const { user } = useStateContext();
  const [editedData, setEditedData] = useState({
    id,
    name,
    description,
    is_productive,
    header_name,
    icon,
    abbreviation,
    priority_id,
    updated_at,
    created_at,
    reason,
    edited_by: user ? user?.name : "",
  });

  const handleChange = (key, value) => {
    setEditedData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };


  
  const handleSave = async () => {
    try {
        // Assuming id comes from editedData.id
        const id = editedData.id; // Make sure editedData.id is defined and not empty

        // Make sure id is defined and not empty before sending the request
        if (!id) {
            console.error('ID is missing or invalid');
            return;
        }

        // Prepare formData
        const formData = {
            id: editedData.id,
            name: editedData.name,
            description: editedData.description,
            is_productive: editedData.is_productive,
            header_name: editedData.header_name,
            icon: editedData.icon,
            abbreviation: editedData.abbreviation,
            priority_id: editedData.priority_id,
            updated_at: editedData.updated_at,
            created_at: editedData.created_at,
            reason: editedData.reason,
            edited_by: editedData.edited_by
        };

        // Send PUT request
        const response = await axiosClient.put(`http://10.0.0.198:8181/api/categories/${id}`, formData);
        console.log('Category edited successfully:', response.data);

        // Reset form after successful submission
        setEditedData(prevState => ({
          ...prevState,
          is_productive: '',
          priority_id: '',
          updated_at: Date.now(),
          reason: '',
        }));        

        setTimeout(function(){
          window.location.href = window.location.href; // Replace '/new-page' with your desired URL
      }, 500);

    } catch (error) {
        console.error('Error editing category:', error);
        // Handle error cases, such as displaying an error message to the user
    }
};

  
  

 /* const handleSendRequest = async () => {
    try {
      // Send request logic here
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosClient.delete(`http://10.0.0.198/api/categories/${id}`);
        console.log('Category deleted successfully:', response.data);

        setTimeout(function(){
          window.location.href = window.location.href; // Replace '/new-page' with your desired URL
      }, 500);

    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  }; */
  

  const fields = [
    { key: "name", value: name, label: "Name" },
    { key: "description", value: description, label: "Description"},
    { key: "is_productive", value: is_productive, label: "Transaction", type: "select", options: [
      {value: '1', label: "Productive"}, 
      {value: '0', label: "Unproductive"}, 
     ] },
     { key: "reason", value: reason, label: "Reason"},
   /* { key: "header_name", value: header_name, label: "Header Name", type: "disabled" },
    { key: "icon", value: icon, label: "Icon", type: "disabled" },
    { key: "abbreviation", value: abbreviation, label: "Abbreviation", type: "disabled" },
    { key: "priority_id", value: priority_id, label: "Priority ID" },
    { key: "updated_at", value: updated_at, label: "Updated At" },
    { key: "created_at", value: created_at, label: "Created At", type: "disabled" } */
  ];

  return (
    <>
    {is_productive !== '1' && is_productive !== '0' && (
      <div className="flex">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="3" variant="outline">
              <EditIcon className="h-4 w-4" color="blue" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Make changes to your category here. Click save when you're done.
            </DialogDescription>
            <div className="grid gap-4 py-4">
              {fields.map(field => (
                <div key={field.key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.key} className="text-right">
                    {field.label}
                  </Label>
                  {field.type === "select" ? (
                    <select
                      id={field.key}
                      name={field.key}
                      value={editedData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="col-span-3"
                    >
                      {field.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={field.key}
                      name={field.key}
                      value={editedData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="col-span-3"
                    />
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )}
    </>

         /*<Dialog>
        <DialogTrigger asChild>
          <Button size="3" variant="outline">
            <Send className="h-4 w-4" color="blue"/> 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send for Request</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to send request?
          </DialogDescription>
          <DialogFooter>
            <Button type="button" onClick={handleSendRequest}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> 

      <Dialog>
        <DialogTrigger asChild>
          <Button size="3" variant="outline">
            <TrashIcon className="h-4 w-4" color="red"/> 
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete category?
          </DialogDescription>
          <DialogFooter>
            <Button type="button" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
          </Dialog> */
   
  );
};

export default EditCategories;
