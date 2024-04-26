// import axiosClient from "@/axios-client";
// import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
// import { FormDescription } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Textarea } from "@ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function NewCategory({ className }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    const promise = () =>
      new Promise((resolve, reject) => {
        setOpen(false);
        setTimeout(() => {
          resolve(true);
        }, 2000);

        // axiosClient
        //   .post(`/categories`, {
        //     params: {

        //     },
        //   })
        //   .then((resp) => resolve(formatExcelData(resp.data.data, module)))
        //   .catch((err) => reject(err));
      });

    toast.promise(promise, {
      loading: "Applying changes...",
      success: (resp) => {
        return `Added category and applied changes`;
      },
      error: (err) => console.log(err),
      action: {
        label: "Close",
        onClick: () => console.log("Event has been created"),
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => setOpen(true)}
      className="sm:max-w-[425px]"
    >
      <DialogTrigger asChild>
        <Button className={cn("mr-3 h-8 px-2 lg:px-3", className)}>
          <FilePlusIcon className="ml-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="grid gap-6">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
          <DialogDescription>
            Add a new category to your list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productivity_type">Type</Label>
              <Select defaultValue="productive">
                <SelectTrigger id="productivity_type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productive">Productive</SelectItem>
                  <SelectItem value="unproductive">Unproductive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="security-level">Priority Level</Label>
              <Select defaultValue="2">
                <SelectTrigger
                  id="security-level"
                  className="line-clamp-1 w-[160px] truncate"
                >
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">High</SelectItem>
                  <SelectItem value="2">Medium</SelectItem>
                  <SelectItem value="3">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="term">Term</Label>
            <Input id="term" placeholder="Enter a term or phrase" />
            <div className="text-gray-500 text-sm italic">
              *Item description that will match to this term will be tagged to
              this category
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="header_name">Header Name</Label>
            <Input id="header_name" placeholder="Display name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Category description." />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="apply_change" className="flex flex-col space-y-1">
              <span>Apply changes to existing data?</span>
              {/* <span className="font-normal leading-snug text-muted-foreground">

  </span> */}
            </Label>
            <Switch id="apply_change" />
          </div>
        </form>

        <DialogFooter className="justify-between space-x-2">
          <Button onClick={handleClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
