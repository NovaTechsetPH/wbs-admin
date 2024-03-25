import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { EditIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditCategories = ({ name, description, is_productive, header_name, icon, abbreviation, priority_id, updated_at, created_at }) => {
  const fields = [
    { key: "name", value: name, label: "Name" },
    { key: "description", value: description, label: "Description" },
    { key: "is_productive", value: is_productive, label: "Is Productive" },
    { key: "header_name", value: header_name, label: "Header Name" },
    { key: "icon", value: icon, label: "Icon" },
    { key: "abbreviation", value: abbreviation, label: "Abbreviation" },
    { key: "priority_id", value: priority_id, label: "Priority ID" },
    { key: "updated_at", value: updated_at, label: "Updated At" },
    { key: "created_at", value: created_at, label: "Created At" }
  ];

  return (
    <div className="flex">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="3" variant="outline" >
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
                <Input id={field.key} value={field.value} className="col-span-3" />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> |


  
      <Dialog>
        <DialogTrigger asChild>
          <Button size="3" variant="outline">
            <TrashIcon className="h-4 w-4" color="red" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete?
          </DialogDescription>
          <DialogFooter>
            <Button type="submit">Cancel</Button>
            <Button type="submit">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCategories;
