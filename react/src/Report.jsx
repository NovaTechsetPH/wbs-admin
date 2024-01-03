/* eslint-disable no-unused-vars */
import {
  DashboardContextProvider,
  useDashboardContext,
} from "./context/DashboardContextProvider";
// import ActivityChart from "./components/ActivityChart";
import axiosClient from "@/axios-client";

// import { ScrollArea } from "./components/ui/scroll-area";
// import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

import { handleAllocateTime, CandleData, secondsToHuman } from "./lib/timehash";

// import { TeamAppList } from "./components/extra/team-app-list";
import { DatePicker } from "./components/extra/date-picker";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
// import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
// import TeamWorkHours from "./components/extra/team-work-hours";
import { ReportCard } from "./components/extra/report-card";
// import { Skeleton } from "./components/ui/skeleton";

const CATEGORY = ["Unproductive", "Productive", "Neutral"];

function Report() {
  const { date } = useDashboardContext();
  const [selectedDate, setSelectedDate] = useState(date);
  const [productivity, setProductivity] = useState([]);
  const [rawApps, setRawApps] = useState([]);

  const [appList, setAppList] = useState({
    Productive: [],
    Unproductive: [],
    Neutral: [],
  });

  const [total, setTotal] = useState({
    productiveHrs: 0,
    late: 0,
    absent: 0,
    present: 0,
  });

  useEffect(() => {
    let tmpTotal = { ...total };
    let productiveHrs = 0;
    appList.Productive.forEach((app) => {
      productiveHrs += app.totalTime;
    });
    setTotal({ ...tmpTotal, productiveHrs: secondsToHuman(productiveHrs) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appList.Productive]);

  // App Listing
  useEffect(() => {
    axiosClient
      .post("/dashboard/apps", {
        date: selectedDate,
      })
      .then(async ({ data }) => {
        let listApps = {
          Productive: [],
          Unproductive: [],
          Neutral: [],
        };
        let tmp = [];
        setRawApps(data.data);
        let dataLength = data.data.length;
        let cleanCandle = CandleData(
          data.data[0]?.time,
          data.data[dataLength - 1]?.time,
          selectedDate
        ).map((candle) => {
          return {
            label: candle,
            value: 0,
            category: { productive: 0, unproductive: 0, neutral: 0 },
          };
        });

        if (data.data.length === 1) return;
        let candleData = handleAllocateTime(data.data, cleanCandle);

        await data.data.forEach((app) => {
          if (app.end_time === null) return;
          let endTime = moment(app.end_time, "H:mm:ss");
          let startTime = moment(app.time, "H:mm:ss");
          let totalTime = moment.duration(endTime.diff(startTime)).asSeconds();

          if (tmp.includes(app.category.header_name)) {
            let index = listApps[
              CATEGORY[app.category.is_productive]
            ].findIndex((x) => {
              return x.name === app.category.header_name;
            });
            listApps[CATEGORY[app.category.is_productive]][index].totalTime +=
              totalTime;
          } else {
            listApps[CATEGORY[app.category.is_productive]].push({
              id: uuidv4(),
              name: app.category.header_name,
              totalTime: totalTime,
              abbreviation: app.category.abbreviation,
            });
            tmp.push(app.category.header_name);
          }
        });

        setProductivity(candleData);
        setAppList(listApps);
      });
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
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
    </DashboardContextProvider>
  );
}

export default Report;
