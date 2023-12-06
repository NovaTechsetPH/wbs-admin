import {
  DashboardContextProvider,
  useDashboardContext,
} from "./context/DashboardContextProvider";
import ActivityChart from "./components/ActivityChart";
import axiosClient from "@/axios-client";

import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

import { PodcastEmptyPlaceholder } from "./components/extra/podcast-empty-placeholder";
import EmployeeStatus from "./components/extra/employee-status";
import Widget from "./components/extra/widget";
import { TeamAppList } from "./components/extra/team-app-list";
import { DatePicker } from "./components/extra/date-picker";
import { useEffect, useState } from "react";

const CATEGORY = ["Unproductive", "Productive", "Neutral"];

function Dashboard() {
  const { date } = useDashboardContext();
  const [selectedDate, setSelectedDate] = useState(date);
  const [productivity, setProductivity] = useState([]);
  const [appList, setAppList] = useState({
    Productive: [],
    Unproductive: [],
    Neutral: [],
  });

  useEffect(() => {
    // Chart Needle Data
    axiosClient
      .post("/employees/productivity", {
        date: selectedDate,
      })
      .then(({ data }) => setProductivity(data?.data))
      .catch((err) => console.log(err));

    // App Listing
    axiosClient
      .post("/dashboard/apps", {
        date: selectedDate,
      })
      .then(({ data }) => {
        let listApps = {
          Productive: [],
          Unproductive: [],
          Neutral: [],
        };
        let tmp = [];
        data.data.forEach((app) => {
          if (tmp.includes(app.description)) {
            return;
          }

          listApps[CATEGORY[app.category.is_productive]].push({
            id: crypto.randomUUID(),
            name: app.description,
            totalTime: app.time,
          });

          tmp.push(app.description);
        });
        setAppList(listApps);
      });
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

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
              {/* <Button>
                        <CalendarClockIcon className="h-4 w-4" />
                      </Button> */}
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
                      <ActivityChart productivity={productivity} />
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
                      apps={appList.Productive}
                      className={"bg-success text-success-foreground"}
                    />
                  </div>
                  <div className="col-span-1">
                    <TeamAppList
                      title={"Unproductive apps"}
                      apps={appList.Unproductive}
                      className={"bg-warning text-warning-foreground"}
                    />
                  </div>
                  <div className="col-span-1">
                    <TeamAppList
                      title={"Neutral apps"}
                      apps={appList.Neutral}
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
}

export default Dashboard;
