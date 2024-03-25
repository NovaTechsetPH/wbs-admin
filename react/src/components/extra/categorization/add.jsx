import { Button } from "@ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@ui/input";
import { FilePlus } from 'lucide-react';

const AddCategoryDialog = ({ row }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><FilePlus className="mr-2" strokeWidth={1.5}/>Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add items here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_productive" className="text-right">Productive</Label>
            <select id="is_productive" className="col-span-3">
              <option value="productive">Productive</option>
              <option value="unproductive">Unproductive</option>
              <option value="others">Others</option>
            </select>
          </div>
          {[
            { label: "Description", id: "description" },
            { label: "Abbreviation", id: "abbreviation" },
            { label: "Priority ID", id: "priority_id" },
            { label: "Header Name", id: "header_name" },
          ].map(({ label, id }) => (
            <div key={id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={id} className="text-right">
                {label}
              </Label>
              <Input id={id} className="col-span-3" />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;


