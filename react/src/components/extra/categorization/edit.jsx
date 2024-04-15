import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil  } from 'lucide-react';
import axios from 'axios';

const EditCategoryDialog = ({ row }) => {
  const [editedFields, setEditedFields] = useState({
    id: "",
    name: "",
    description: "",
    is_productive: "",
    header_name: "",
    icon: "",
    abbreviation: "",
    priority_id: "",
    updated_at: "",
    created_at: "", // Include "created_at" in editedFields state
    reason: "", // Add reason field
  });

  const [isOpen, setIsOpen] = useState(false);

  // Function to set form data based on provided row
  const setFormData = () => {
    setEditedFields({
      id: row.getValue("id"),
      name: row.getValue("name"),
      description: row.getValue("description"),
      is_productive: row.getValue("is_productive"),
      header_name: row.getValue("header_name"),
      icon: row.getValue("icon"),
      abbreviation: row.getValue("abbreviation"),
      priority_id: row.getValue("priority_id"),
      updated_at: row.getValue("updated_at"),
      reason: row.getValue("reason") || "", // Set reason field
    });
  };

  // Call setFormData when the component mounts
  useEffect(() => {
    setFormData();
  }, []);

  const handleFieldChange = (key, value) => {
    setEditedFields({ ...editedFields, [key]: value });
  };

  const handleSaveChanges = () => {
    axios.put(`http://10.0.0.198/api/categories/${editedFields.id}`, {
      is_productive: editedFields.is_productive,
      reason: editedFields.reason, // Include reason in the request body
    }, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer Bearer 432|X5MA5PudbH9cFMhv3J5bByIp2IZUP1qifzkXnQ5X6d1f3400'
      }
    })
    .then(response => {
      console.log("Changes saved successfully:", response.data);
      setIsOpen(false); // Close the modal after saving
    })
    .catch(error => {
      console.error("Error saving changes:", error);
    });
  };

  const fields = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    {
      key: "is_productive",
      label: "Transaction",
      options: [
        { value: "1", label: "Productive" },
        //{ value: "0", label: "Neutral" },
        { value: "2", label: "Not Productive" },
      ],
    },
    { key: "reason", label: "Reason"},
    //{ key: "header_name", label: "Header Name" },
    //{ key: "icon", label: "Icon" },
    //{ key: "abbreviation", label: "Abbreviation" },
    //{ key: "priority_id", label: "Priority ID" },
    //{ key: "updated_at", label: "Updated At" },
    //{ key: "created_at", label: "Created At" },
  ];

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}><Pencil className="mr-2" strokeWidth={1.5} />Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to the category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map(({ label, key, options }) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {label}
              </Label>
              {key === "is_productive" ? (
                <select
                  id={key}
                  value={editedFields[key]}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  className="col-span-3"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                key === "reason" ? ( // Check if it's the reason field
                  <Input
                    id={key}
                    value={editedFields[key]}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="col-span-3"
                    maxLength={250} // Limit reason input to 250 characters
                  />
                ) : (
                  <Input
                    id={key}
                    value={editedFields[key]}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="col-span-3"
                    disabled={key !== "is_productive"} 
                  />
                )
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
