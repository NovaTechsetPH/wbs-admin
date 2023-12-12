import axiosClient from "./axios-client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import ActivityChart from "./components/ActivityChart";

import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

import { PodcastEmptyPlaceholder } from "./components/extra/podcast-empty-placeholder";
import EmployeeStatus from "./components/extra/employee-status";
import Widget from "./components/extra/widget";

import { TeamAppList } from "./components/extra/team-app-list";
import { DatePicker } from "./components/extra/date-picker";
import { CandleData, handleAllocateTime } from "./lib/timehash";
import {
  useDashboardContext,
  DashboardContextProvider,
} from "./context/DashboardContextProvider";

const CATEGORY = ["Unproductive", "Productive", "Neutral"];

const ActivityTracking = () => {
  const { date } = useDashboardContext();
  const [selectedDate, setSelectedDate] = useState(date);
  const [productivity, setProductivity] = useState([]);
  const [rawApps, setRawApps] = useState([]);
  const [apps, setApps] = useState({
    Productive: [],
    Unproductive: [],
    Neutral: [],
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    axiosClient
      .post("/activity/employee", {
        userid: 20,
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
              abbreviation: app.category.abbreviation,
              totalTime: totalTime,
            });
            tmp.push(app.category.header_name);
          }
        });

        setProductivity(candleData);
        setApps(listApps);
      })
      .catch((err) => console.log(err));
  }, [selectedDate]);

  return (
    <DashboardContextProvider>
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="team_productivity" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="team_productivity" className="relative">
                Team Productivity
              </TabsTrigger>
              <TabsTrigger value="late">Tardiness</TabsTrigger>
              <TabsTrigger value="absent">Absences</TabsTrigger>
              <TabsTrigger value="present">Online Users</TabsTrigger>
              <TabsTrigger value="anomaly">Anomalies</TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <DatePicker onDateChanged={handleDateChange} />
            </div>
          </div>
          {/* Team Productivity */}
          <TabsContent
            value="team_productivity"
            className="h-full flex-col border-none p-0"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Productivity Chart
                </h2>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4 col">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <ActivityChart
                        productivity={productivity}
                        rawApps={rawApps}
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <Widget title={"Productivity"} content={"content"} />
                        </div>
                        <div className="col-span-1">
                          <Widget title={"Late"} content={"content2"} />
                        </div>
                        <div className="col-span-1">
                          <Widget title={"Absent"} content={"content"} />
                        </div>
                        <div className="col-span-1">
                          <Widget title={"Present"} content={"content2"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Application List
              </h2>
              <p className="text-sm text-muted-foreground">
                Lists of all applications used by the team.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <TeamAppList
                      title={"Productive apps"}
                      apps={apps.Productive}
                      className={"bg-success text-success-foreground"}
                    />
                  </div>
                  <div className="col-span-1">
                    <TeamAppList
                      title={"Unproductive apps"}
                      apps={apps.Unproductive}
                      className={"bg-warning text-warning-foreground"}
                    />
                  </div>
                  <div className="col-span-1">
                    <TeamAppList
                      title={"Neutral apps"}
                      apps={apps.Neutral}
                      className={"bg-muted text-muted-foreground"}
                    />
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </TabsContent>
          {/* Late */}
          <TabsContent
            value="present"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Employee Tardiness
                </h2>
                {/* <p className="text-sm text-muted-foreground">
                          Your favorite podcasts. Updated daily.
                        </p> */}
              </div>
            </div>
            <Separator className="my-4" />
            <EmployeeStatus />
          </TabsContent>
          {/* Absent */}
          <TabsContent
            value="absent"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Episodes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your favorite podcasts. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <PodcastEmptyPlaceholder />
          </TabsContent>
          {/* Present */}
          <TabsContent
            value="late"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Episodes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your favorite podcasts. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <PodcastEmptyPlaceholder />
          </TabsContent>
          {/* Late */}
          <TabsContent
            value="anomaly"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Invalid time in/out
                </h2>
                {/* <p className="text-sm text-muted-foreground">
                          Your favorite podcasts. Updated daily.
                        </p> */}
              </div>
            </div>
            <Separator className="my-4" />
            <EmployeeStatus />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContextProvider>
  );
};

export default ActivityTracking;
