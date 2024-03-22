import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function TeamAppList({ title, apps, className }) {
  const convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hourString = hours > 0 ? `${hours}h` : "";
    const minuteString = minutes > 0 ? `${minutes}m` : "";
    const secondString = remainingSeconds > 0 ? `${remainingSeconds}s` : "";

    if (hours > 0) {
      return `${hourString} ${minuteString || "0 m"} ${
        secondString && `${secondString}`
      }`;
    } else if (!hours && minutes > 0) {
      return `${minuteString} ${secondString && `${secondString}`}`;
    }

    return secondString;
  };

  const sortedApps = apps.sort((a, b) => b.totalTime - a.totalTime);

  return (
    <Card>
      <CardHeader className={cn("mb-3 p-3", className)}>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea
          className="grid gap-1 py-1 px-1"
          style={{
            height: 300,
            paddingTop: 1,
            paddingBottom: 1,
            paddingRight: 5,
            paddingLeft: 1,
          }}
        >
          {apps.length > 0 ? (
            sortedApps.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between space-x-1 py-1.5"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      className="h-6 w-6"
                      src={`/icons/${app.icon}`}
                      alt={app.name}
                    />
                    <AvatarFallback>
                      {app.abbreviation
                        ? app.abbreviation
                        : app.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p
                      className="text-sm font-medium leading-none"
                      data-id={app.id}
                    >
                      {app.name}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {convertSeconds(app.totalTime)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground pt-1 text-center">
              No apps found
            </p>
          )}

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
      <CardFooter className={"pt-5"}>
        <Button variant="outline" className="w-full">
          View all
        </Button>
      </CardFooter>
    </Card>
  );
}
