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
import { z } from "zod";
import * as XLSX from "xlsx";

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
import moment from "moment";
import axiosClient from "@/axios-client";
import { getWorkDuration } from "@/Report";
import { DateRangePicker } from "../extra/date-range-picker";
import { useEffect, useState } from "react";
// import { Button } from "../ui/button";

const FormSchema = z.object({
  type: z
    .enum(["yesterday", "previous-week", "previous-month", "custom"], {
      required_error: "You need to select an export period.",
    })
    .default("custom"),
});

const formatExcelData = (data) => {
  return data.map((d) => {
    return {
      ID: d.employee.employee_id,
      NAME: `${d.employee.first_name} ${d.employee.last_name}`,
      DATE: d.datein,
      "TIME-IN": d.timein,
      "TIME-OUT": d.timeout,
      LATE: "--:--",
      UNDERTIME: "--:--",
      TOTAL: getWorkDuration(d, false),
    };
  });
};

export const AlertDialogTemplate = ({
  title,
  description,
  children,
  open,
  setDialogOpen,
  module = "attendance",
}) => {
  const form = useForm({ resolver: zodResolver(FormSchema) });
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(7, "days"),
    to: moment(),
  });

  useEffect(() => {
    console.log(dateRange, "dateRange");
  }, [dateRange]);

  const onSubmit = (data) => {
    console.log(data);
    setDialogOpen(false);
    let from = moment(dateRange.from).format("YYYY-MM-DD");
    let to = moment(dateRange.to).format("YYYY-MM-DD");
    const promise = () =>
      new Promise((resolve) => {
        axiosClient
          .get(`/reports/${module}/${from}/${to}`)
          .then((resp) => resolve(formatExcelData(resp.data.data)));
      });

    toast.promise(promise, {
      loading: "Generating reports data...",
      success: (resp) => {
        const worksheet = XLSX.utils.json_to_sheet(resp);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
        XLSX.writeFile(workbook, "iNTrack-Applications-Report.xlsx");
        return `Successfully exported ${resp.length} records`;
      },
      error: (err) => JSON.stringify(err),
      action: {
        label: "Close",
        onClick: () => console.log("Event has been created"),
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setDialogOpen}>
      <Form {...form}>
        <form className="w-2/3 space-y-6">
          <AlertDialogTrigger asChild></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {title || "Are you absolutely sure?"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Export Period</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={"custom"}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yesterday" disabled={true} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer disabled">
                          Yesterday
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="previous-week"
                            disabled={true}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Previous week
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="previous-month"
                            disabled={true}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Previous month
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="custom" />
                        </FormControl>
                        <FormLabel
                          className="font-normal cursor-pointer"
                          checked
                        >
                          Custom
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <DateRangePicker onDateChange={setDateRange} />
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter
              style={{
                diplay: "flex",
                justifyContent: "flex-start",
                marginTop: "10px",
              }}
            >
              <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                Submit
              </AlertDialogAction>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  );
};
