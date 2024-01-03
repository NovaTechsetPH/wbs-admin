// /* eslint-disable no-unused-vars */
import {
  DashboardContextProvider,
  useDashboardContext,
} from "./context/DashboardContextProvider";

// import axiosClient from "@/axios-client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

// import { secondsToHuman } from "./lib/timehash";
import { DatePicker } from "./components/extra/date-picker";
import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";

// Excel export
// import { toast } from "sonner";
import { Toaster } from "@ui/sonner";
import { ReportCard } from "./components/extra/report-card";
// import {
//   // ATTENDANCE_SETTINGS,
//   SETTINGS_FOR_EXPORT,
// } from "./lib/export-settings";

function Report() {
  const { date } = useDashboardContext();
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAttendanceExport = () => {
    // axiosClient
    //   .post("/dashboard/export", {
    //     date: selectedDate,
    //   })
    //   .then(({ data }) => {
    //     if (data.success) {
    //       toast.success(data.message);
    //     } else {
    //       toast.error(data.message);
    //     }
    //   });

    const data = {
      table1: [
        {
          number: 1,
          name: "Jack",
          sum: "",
          math: 1,
          physics: 2,
          chemistry: 2,
          informatics: 1,
          literature: 2,
          foreignLang: 1,
          avg: "",
        },
        {
          number: 2,
          name: "Peter",
          sum: "",
          math: 2,
          physics: 2,
          chemistry: 1,
          informatics: 2,
          literature: 2,
          foreignLang: 1,
          avg: "",
        },
      ],
    };
    // const excelExport = new ExcelExport();
    // excelExport.downloadExcel(SETTINGS_FOR_EXPORT, data);
    // await excelExport.downloadExcel(ATTENDANCE_SETTINGS, data);

    // toast.success("Exported Successfully");
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

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
                />
              </div>
              <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
                <ReportCard
                  title={"Team Members"}
                  description={
                    "Provides information about team member working times, arrival and leaving times, and productivity."
                  }
                />
              </div>
            </div>
            {/* <Separator className="my-4" /> */}
          </TabsContent>
        </Tabs>
      </div>
      <Toaster richColors />
    </DashboardContextProvider>
  );
}

export default Report;
