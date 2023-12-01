import { cn } from "@/lib/utils";
import { Button } from "./../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./../ui/avatar";
import { Separator } from "./../ui/separator";

export function TeamAppList({ title, apps, className }) {
  return (
    <Card>
      <CardHeader className={cn("mb-3 p-3", className)}>
        <CardTitle>{title}</CardTitle>
        {/* <Separator className="my-4" /> */}
      </CardHeader>
      <CardContent className="grid gap-3 py-1 px-6">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex items-center justify-between space-x-2"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>{app.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{app.name}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{app.totalTime}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className={"pt-5"}>
        <Button variant="outline" className="w-full">
          View all
        </Button>
      </CardFooter>
    </Card>
  );
}
