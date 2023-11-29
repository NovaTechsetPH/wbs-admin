import { useState } from "react";
import ActivityChart from "./components/ActivityChart";
import { CalendarClockIcon } from "lucide-react";
import EmployeeStatus from "./components/extra/employee-status";
import { listenNowAlbums, madeForYouAlbums } from "./components/data/album";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "./components/ui/button";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

import { AlbumArtwork } from "./components/extra/album-artwork";
import { PodcastEmptyPlaceholder } from "./components/extra/podcast-empty-placeholder";

function Dashboard() {
  return (
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
  );
}

export default Dashboard;
