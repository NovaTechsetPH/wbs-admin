import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import Navbar from "./layout/Navbar.jsx";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { PodcastEmptyPlaceholder } from "./extra/podcast-empty-placeholder";
import { Sidebar } from "./extra/sidebar";
import { playlists } from "./data/playlists";
import ActivityChart from "./ActivityChart";
import EmployeeStatus from "./extra/employee-status";
import Widget from "./extra/widget";
import { TeamAppList } from "./extra/team-app-list";
import { DatePicker } from "./extra/date-picker";
// import EmployeeAnomaly from "./extra/employee-status";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  const appUsed = {
    Productive: [
      {
        name: "VS Code",
        totalTime: "16m 37s",
      },
      {
        name: "Stackoverflow",
        totalTime: "9m 59s",
      },
      {
        name: "Teams",
        totalTime: "7m 18s",
      },
      {
        name: "Figma",
        totalTime: "5m 46s",
      },
    ],
    Unproductive: [
      {
        name: "Facebook",
        totalTime: "1h 25m 54s",
      },
      {
        name: "Vivamax",
        totalTime: "54m 54s",
      },
      {
        name: "Dota",
        totalTime: "46m 2s",
      },
      {
        name: "Netflakes",
        totalTime: "17m 25s",
      },
    ],
    Neutral: [
      {
        name: "Github",
        totalTime: "22m 33s",
      },
      {
        name: "Microsoft Excel",
        totalTime: "20m 58s",
      },
      {
        name: "Microsoft Outlook",
        totalTime: "5m 18s",
      },
      {
        name: "Adobe Reader",
        totalTime: "1m 6s",
      },
    ],
  };

  return (
    <div className="md:block">
      <Navbar />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-7">
            <Sidebar playlists={playlists} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-6 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs
                  defaultValue="team_productivity"
                  className="h-full space-y-6"
                >
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger
                        value="team_productivity"
                        className="relative"
                      >
                        Team Productivity
                      </TabsTrigger>
                      <TabsTrigger value="late">Tardiness</TabsTrigger>
                      <TabsTrigger value="absent">Absences</TabsTrigger>
                      <TabsTrigger value="present">Online Users</TabsTrigger>
                      <TabsTrigger value="anomaly">Anomalies</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto mr-4">
                      <DatePicker />
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
                              <ActivityChart />
                            </div>
                            <div className="col-span-1">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                  <Widget
                                    title={"Productivity"}
                                    content={"content"}
                                  />
                                </div>
                                <div className="col-span-1">
                                  <Widget title={"Late"} content={"content2"} />
                                </div>
                                <div className="col-span-1">
                                  <Widget
                                    title={"Absent"}
                                    content={"content"}
                                  />
                                </div>
                                <div className="col-span-1">
                                  <Widget
                                    title={"Present"}
                                    content={"content2"}
                                  />
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
                              apps={appUsed.Productive}
                              className={"bg-success text-success-foreground"}
                            />
                          </div>
                          <div className="col-span-1">
                            <TeamAppList
                              title={"Unproductive apps"}
                              apps={appUsed.Unproductive}
                              className={"bg-warning text-warning-foreground"}
                            />
                          </div>
                          <div className="col-span-1">
                            <TeamAppList
                              title={"Neutral apps"}
                              apps={appUsed.Neutral}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
