import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import Navbar from "./layout/Navbar.jsx";

import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { AlbumArtwork } from "./extra/album-artwork";
import { PodcastEmptyPlaceholder } from "./extra/podcast-empty-placeholder";
import { Sidebar } from "./extra/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "./data/album";
import { playlists } from "./data/playlists";
import ActivityChart from "./ActivityChart";
import { CalendarClockIcon } from "lucide-react";
import EmployeeStatus from "./extra/employee-status";
import EmployeeAnomaly from "./extra/employee-anomaly";

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
                      <Button>
                        <CalendarClockIcon className="h-4 w-4" />
                      </Button>
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
                        {/* <p className="text-sm text-muted-foreground">
                          Top picks for you. Updated daily.
                        </p> */}
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                          <ActivityChart />
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                    <div className="mt-6 space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Made for You
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your personal playlists. Updated daily.
                      </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                          {madeForYouAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className="w-[150px]"
                              aspectRatio="square"
                              width={150}
                              height={150}
                            />
                          ))}
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
                    value="present"
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
                    <EmployeeAnomaly />
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
