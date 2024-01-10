import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  // AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog";
// import { Form } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { toast } from "sonner";
// import { Button } from "../ui/button";

const FormSchema = z.object({
  type: z.enum(["yesterday", "previous-week", "previous-month", "custom"], {
    required_error: "You need to select an export period.",
  }),
});

export const AlertDialogTemplate = ({
  title,
  description,
  children,
  open,
  setDialogOpen,
}) => {
  const form = useForm({ resolver: zodResolver(FormSchema) });

  function onSubmit(data) {
    console.log(data);
    setDialogOpen(false);
    toast("You submitted the following values", {
      description: "Successfully exported tracking data",
      action: {
        label: "Close",
        onClick: () => console.log("Closed"),
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setDialogOpen}>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <AlertDialogTrigger asChild>
            {/* <Button variant="outline">{label}</Button> */}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {title || "Are you absolutely sure?"}
              </AlertDialogTitle>
              {/* <AlertDialogDescription>
                {description ||
                  "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
              </AlertDialogDescription> */}
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                // {children}
                <FormItem className="space-y-3">
                  <FormLabel>Export Period</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yesterday" />
                        </FormControl>
                        <FormLabel className="font-normal">Yesterday</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="previous-week" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Previous week
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="previous-month" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Previous month
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="custom" />
                        </FormControl>
                        <FormLabel className="font-normal">Custom</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  );
};
