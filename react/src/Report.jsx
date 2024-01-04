import {
  DashboardContextProvider,
  useDashboardContext,
} from "./context/DashboardContextProvider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "@ui/sonner";
import { DatePicker } from "./components/extra/date-picker";
import { ReportCard } from "./components/extra/report-card";
import * as XLSX from "xlsx";
import { toast } from "sonner";

import moment from "moment";
import axiosClient from "./axios-client";
import { secondsToHuman } from "./lib/timehash";
import { useState } from "react";
import { AlertDialogTemplate } from "./components/layout/alert-dialog-template";

const getWorkDuration = (data, show = true) => {
  if (!moment(data.datein).isSame(moment(), "day") && data.timeout === null) {
    return show ? "No timeout!" : null;
  }

  let diff =
    moment(data.datein).isSame(moment(), "day") && data.timeout === null
      ? moment().diff(moment(data.timein, "HH:mm:ss"), "seconds")
      : moment(data.timeout, "HH:mm:ss").diff(
          moment(data.timein, "HH:mm:ss"),
          "seconds"
        );
  return secondsToHuman(diff);
};

function Report() {
  const { date } = useDashboardContext();
  const [selectedDate, setSelectedDate] = useState(date);
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

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

  const handleAppsExport = () => setDialogOpen(!dialogOpen);

  // TODO: Add export
  // const handleAppsExportDisabled = async () => {
  //   const { data } = await axiosClient.get(
  //     `/reports/apps/${moment(selectedDate).format("YYYY-MM-DD")}`
  //   );
  //   let formattedData = formatExcelData(data.data);
  //   toast.promise(formattedData, {
  //     loading: "Exporting apps data...",
  //     success: (resp) => {
  //       const worksheet = XLSX.utils.json_to_sheet(resp);
  //       const workbook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //       XLSX.writeFile(workbook, "iNTrack-Apps-Report.xlsx");
  //       return `Successfully exported ${resp.length} records`;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     action: {
  //       label: "Close",
  //       onClick: () => console.log("Triggered Close"),
  //     },
  //   });
  // };

  const handleAttendanceExport = async () => {
    const promise = () =>
      new Promise((resolve) => {
        axiosClient
          .get(
            `/reports/attendance/${moment(selectedDate).format("YYYY-MM-DD")}`
          )
          .then((resp) => resolve(formatExcelData(resp.data.data)));
      });

    toast.promise(promise, {
      loading: "Exporting attendance data...",
      success: (resp) => {
        const worksheet = XLSX.utils.json_to_sheet(resp);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "iNTrack-Attendance-Report.xlsx");
        return `Successfully exported ${resp.length} records`;
      },
      error: (err) => {
        console.log(err);
      },
      action: {
        label: "Close",
        onClick: () => console.log("Event has been created"),
      },
    });
  };

  return (
    <DashboardContextProvider>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          </div>
          <div className="ml-auto mr-4">
            <DatePicker onDateChanged={handleDateChange} />
          </div>
        </div>
        <Tabs defaultValue="generate" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="generate" className="relative">
                Generate Export
              </TabsTrigger>
              <TabsTrigger value="late">Export History</TabsTrigger>
            </TabsList>
          </div>
          {/* Generate Reports Tab */}
          <TabsContent value="generate">
            <div className="hidden items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2 xl:grid-cols-3">
              <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                <ReportCard
                  title={"Attendance"}
                  description={
                    "Provides information about team member working times, arrival and leaving times."
                  }
                  onClick={handleAttendanceExport}
                />
              </div>
              <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                <ReportCard
                  title={"Applications"}
                  description={
                    "Shows all of the applications used by the selected employees and the time spent on each."
                  }
                  onClick={handleAppsExport}
                />
              </div>
              <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
                <ReportCard
                  title={"Team Members"}
                  description={
                    "Provides information about team member working times, arrival and leaving times, and productivity."
                  }
                  onClick={handleAppsExport}
                />
              </div>
              <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1"></div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster richColors />
      <AlertDialogTemplate
        title={"Under construction"}
        open={dialogOpen}
        description={"Sorry! comebak again later"}
        setDialogOpen={setDialogOpen}
      />
    </DashboardContextProvider>
  );
}

export default Report;
