import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment from "moment";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import axiosClient from "@/axios-client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { getWorkDuration } from "@/Report";
import { DateRangePicker } from "../extra/date-range-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { Checkbox } from "@ui/checkbox";

const FormSchema = z.object({
  date: z
    .enum(["yesterday", "previous-week", "previous-month", "custom"], {
      required_error: "You need to select an export period.",
    })
    .default("custom"),
  employees: z
    .array(z.number())
    .refine((value) => value.some((employee) => employee), {
      message: "You have to select at least one employee.",
    }),
});

const defaultValues = { employees: [] };

function convertSecsToDigital(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const formatExcelData = (data, module) => {
  if (module === "attendance") {
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
  }
  if (module === "applications") {
    let excelData = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const keys = Object.keys(element.info);
      keys.forEach((key) => {
        let duration = 0;
        element.info[key].forEach((d) => (duration += parseInt(d.duration)));
        excelData.push({
          DATE: element.info[key][0].date,
          EMPLOYEE: element.info[key][0].userid,
          CATEGORY: element.info[key][0].category.header_name || "",
          TYPE: element.info[key][0].category.is_productive,
          DURATION: convertSecsToDigital(duration),
          SECONDS: duration,
        });
      });
    }
    return excelData;
  }
};

export const AlertDialogTemplate = ({
  title,
  open,
  setDialogOpen,
  module = "attendance",
}) => {
  const [employees, setEmployees] = useState([]);
  const form = useForm({ resolver: zodResolver(FormSchema), defaultValues });
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(7, "days"),
    to: moment(),
  });

  // useEffect(() => {
  //   console.log(dateRange, "dateRange");
  // }, [dateRange]);

  const onSubmit = (data) => {
    setDialogOpen(false);
    let from = moment(dateRange.from).format("YYYY-MM-DD");
    let to = moment(dateRange.to).format("YYYY-MM-DD");
    const promise = () =>
      new Promise((resolve, reject) => {
        axiosClient
          .get(`/reports/${module}/${from}/${to}`, {
            params: {
              employees: data.employees,
            },
          })
          .then((resp) => resolve(formatExcelData(resp.data.data, module)))
          .catch((err) => reject(err));
      });

    toast.promise(promise, {
      loading: "Generating reports data...",
      success: (resp) => {
        const worksheet = XLSX.utils.json_to_sheet(resp);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
        XLSX.writeFile(workbook, "iNTrack-Applications-Report.xlsx");
        return `Successfully exported`;
      },
      error: (err) => console.log(err),
      action: {
        label: "Close",
        onClick: () => console.log("Event has been created"),
      },
    });
  };

  useEffect(() => {
    axiosClient
      .get("/employees")
      .then(({ data }) => {
        let items = data.data;
        setEmployees(items);
        form.setValue(
          "employees",
          items.map(({ id }) => id)
        );
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setDialogOpen}>
      <Form {...form}>
        <form
          className="w-2/3 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <AlertDialogTrigger asChild></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {title || "Are you absolutely sure?"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base font-semibold">
                      Export period
                    </FormLabel>
                  </div>
                  <FormItem className="flex items-center space-x-3 space-y-0 w-[300px]">
                    <FormControl>
                      <Select defaultValue="custom">
                        <SelectTrigger>
                          <SelectValue placeholder="Select" disabled />
                        </SelectTrigger>
                        <SelectContent className="cursor-pointer">
                          <SelectItem value="today" disabled>
                            Today
                          </SelectItem>
                          <SelectItem value="yesterday" disabled>
                            Yesterday
                          </SelectItem>
                          <SelectItem value="previous-week" disabled>
                            Previous week
                          </SelectItem>
                          <SelectItem value="previous-month" disabled>
                            Previous month
                          </SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <DateRangePicker onDateChange={setDateRange} />
                    </FormControl>
                  </FormItem>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base font-semibold">
                      Employees
                    </FormLabel>
                  </div>
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value.length === employees.length}
                        onCheckedChange={(checked) => {
                          form.setValue(
                            "employees",
                            checked ? employees.map(({ id }) => id) : []
                          );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {field.value.length === employees.length
                        ? "Unselect All"
                        : "Select All"}
                    </FormLabel>
                  </div>
                  {employees.map((employee) => (
                    <FormField
                      key={employee.id}
                      control={form.control}
                      name="employees"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={employee.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(employee.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        employee.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== employee.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {employee.last_name} {employee.first_name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter
              style={{
                diplay: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                Generate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  );
};
