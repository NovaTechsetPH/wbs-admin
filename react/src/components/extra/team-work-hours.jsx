import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { useDashboardContext } from "@/context/DashboardContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "@/axios-client";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { secondsToHuman } from "@/lib/timehash";

const getWorkDuration = (data) => {
  if (!moment(data.datein).isSame(moment(), "day") && data.timeout === null) {
    return "No timeout!";
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

const getStatusStyle = (status) => {
  switch (status) {
    case "Active":
      return "border-green-600";
    case "Away":
    case "Idle":
      return "border-yellow-400";
    default:
      return "border-none";
  }
};

const TeamWorkHours = () => {
  const { date } = useDashboardContext();
  const [workLogs, setWorkLogs] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`/dashboard/workhrs/${moment(date).format("YYYY-MM-DD")}`)
      .then(({ data }) => {
        return data.data.map((item) => {
          return {
            id: uuidv4(),
            duration: getWorkDuration(item),
            ...item,
          };
        });
      })
      .then((resp) => setWorkLogs(resp));
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkLogs(
        workLogs.map((item) => {
          if (
            moment(item.datein).isSame(moment(), "day") &&
            item.timeout === null
          ) {
            return {
              ...item,
              duration: getWorkDuration(item),
            };
          }
          return item;
        })
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="space-y-8 h-[18rem]">
      {workLogs.map((item) => (
        <div key={item.id} className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar
                  className={`h-9 w-9 border-2 ${getStatusStyle(
                    item.employee.active_status
                  )}`}
                >
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    {item.employee.first_name[0]}
                    {item.employee.last_name[0]}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.employee.active_status}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {item.employee.last_name} {item.employee.first_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.employee.email}
            </p>
          </div>
          <div className="ml-auto font-medium">{item.duration}</div>
        </div>
      ))}
    </div>
  );
};

export default TeamWorkHours;
