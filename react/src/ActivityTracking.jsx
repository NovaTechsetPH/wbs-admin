import axiosClient from "./axios-client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { TeamAppList } from "./components/extra/team-app-list";
import { DatePicker } from "./components/extra/date-picker";

import ActivityChart from "./components/ActivityChart";
import SelectDialog from "./components/extra/employee-select-dialog";
import Widget from "./components/extra/widget";

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
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState({
    Productive: [],
    Unproductive: [],
    Neutral: [],
  });
  const [summary, setSummary] = useState({
    arrival: "–:––",
    work: "–– ––",
    productive: "–– ––",
    intrack: "–– ––",
  });

  const handleDateChange = (date) => setSelectedDate(date);

  const handleEmployeeChange = (id) => setEmpId(id);

  useEffect(() => {
    axiosClient
      .get("/employees")
      .then(({ data }) => setEmployees(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!empId) return;
    setLoading(true);
    axiosClient
      .get(
        `/activity/employee/${empId}/${moment(selectedDate).format(
          "YYYY-MM-DD"
        )}`
      )
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
      .then(() => {
        setLoading(false);
        setSummary({
          arrival: "09:01",
          work: "12h 46m",
          productive: "2h 38m",
          intrack: "4h 16m",
        });
      })
      .catch((err) => console.log(err));
  }, [selectedDate, empId]);

  return (
    <DashboardContextProvider>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            <SelectDialog
              onEmployeeChanged={handleEmployeeChange}
              data={employees}
            />
          </h2>
          <div className="flex items-center space-x-2">
            <DatePicker onDateChanged={handleDateChange} />
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
                      <Widget
                        loading={loading}
                        title={"Arrival time"}
                        content={summary.arrival}
                      />
                    </div>
                    <div className="col-span-1">
                      <Widget
                        loading={loading}
                        title={"Time at work"}
                        content={summary.work}
                      />
                    </div>
                    <div className="col-span-1">
                      <Widget
                        loading={loading}
                        title={"Productive time"}
                        content={summary.productive}
                      />
                    </div>
                    <div className="col-span-1">
                      <Widget
                        loading={loading}
                        title={"iNTrack time"}
                        content={summary.intrack}
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
      </div>
    </DashboardContextProvider>
  );
};

export default ActivityTracking;
