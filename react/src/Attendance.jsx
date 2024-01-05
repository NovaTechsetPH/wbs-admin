import { useEffect, useState } from "react";
import { columns } from "@/components/extra/attendance/columns";
import { DataTable } from "@/components/extra/attendance/data-table";
// import axiosClient from "./axios-client";
// import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "./axios-client";
import moment from "moment";
import { useDashboardContext } from "./context/DashboardContextProvider";
import { useQuery } from "@tanstack/react-query";
import { getLastActivity } from "./Employees";

// const getOnlineStatus = (item) => {
//   if (item.active_status === "Offline") return "Inactive";
//   if (item.active_status === "Active") return "Active";
//   return "Away";
// };

// const getLastActivity = (act) => {
//   if (act) {
//     let time = act.end_time ?? act.time;
//     return moment(`${act.date} ${time}`).fromNow();
//   }
//   return "No Activity";
// };

const Attendance = () => {
  const { date } = useDashboardContext();
  const [isFetched, setIsFetched] = useState(false);

  // const tmpData = [
  //   {
  //     id: uuidv4(),
  //     employeeId: 1,
  //     name: "Jed Zerna",
  //     status: "Active",
  //     online: "Now",
  //     monday: "Late",
  //     tuesday: "Absent",
  //     wednesday: "Present",
  //     thursday: "Present",
  //     friday: "Present",
  //     saturday: "Restday",
  //     sunday: "Restday",
  //   },
  //   {
  //     id: uuidv4(),
  //     employeeId: 2,
  //     name: "Daisy Ann Laspinas",
  //     status: "Offline",
  //     online: "2 days ago",
  //     monday: "Present",
  //     tuesday: "Present",
  //     wednesday: "Present",
  //     thursday: "Present",
  //     friday: "Absent",
  //     saturday: "Restday",
  //     sunday: "Restday",
  //   },
  //   {
  //     id: uuidv4(),
  //     employeeId: 2,
  //     name: "John Jovence Laspinas",
  //     status: "Away",
  //     online: "a few seconds ago",
  //     monday: "Present",
  //     tuesday: "Present",
  //     wednesday: "Present",
  //     thursday: "Present",
  //     friday: "Absent",
  //     saturday: "Restday",
  //     sunday: "Restday",
  //   },
  // ];

  const { data, isLoading } = useQuery({
    queryKey: ["attendance", date],
    queryFn: () =>
      axiosClient
        .get(`/attendance/weekly/${moment(date).format("YYYY-MM-DD")}`)
        .then(({ data }) => {
          let formatData = [];
          console.log(data);
          data.employees.forEach((emp) => {
            let filterByEmployee = data.data.filter(
              (item) => parseInt(item.userid) === emp.id
            );
            formatData.push({
              id: uuidv4(),
              employeeId: emp.id,
              name: `${emp.first_name} ${emp.last_name}`,
              status: emp.active_status,
              online: getLastActivity(emp.last_activity),
              attendance: filterByEmployee,
            });
          });
          setIsFetched(true);
          return formatData;
        })
        .then((raw) => {
          let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          console.log(raw);
          let formatData = [];
          raw.forEach((item) => {
            let daysObj = {};
            days.forEach((day) => {
              if (moment(item.attendance["datein"]).format("dddd") === day) {
                daysObj = { ...daysObj, [day.toLowerCase()]: "Present" };
              } else {
                daysObj = { ...daysObj, [day.toLowerCase()]: "Absent" };
              }
            });
            formatData.push({ ...item, ...daysObj });
          });
          return formatData;
        }),
    enabled: !isFetched,
  });

  useEffect(() => console.log(data), [data]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {!isLoading && <DataTable data={data} columns={columns} />}
    </div>
  );
};

export default Attendance;
