import React from "react";
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

import { PencilRuler  } from 'lucide-react';

const EditCategoryDialog = ({ row }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><PencilRuler className="mr-2" strokeWidth={1.5}/>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to the category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { label: "Name", id: "name" },
            { label: "Productive", id: "is_productive" },
            { label: "Description", id: "description" },
            { label: "Abbreviation", id: "abbreviation" },
            { label: "Priority ID", id: "priority_id" },
            { label: "Header Name", id: "header_name" },
          ].map(({ label, id }) => (
            <div key={id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={id} className="text-right">
                {label}
              </Label>
              <Input
                id={id}
                value={row.getValue(id)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
