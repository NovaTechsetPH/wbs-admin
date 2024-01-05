import { useState } from "react";
import { columns } from "@/components/extra/attendance/columns";
import { DataTable } from "@/components/extra/attendance/data-table";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "./axios-client";
import moment from "moment";
import { useDashboardContext } from "./context/DashboardContextProvider";
import { useQuery } from "@tanstack/react-query";
import { getLastActivity } from "./Employees";

const Attendance = () => {
  const { date } = useDashboardContext();
  const [isFetched, setIsFetched] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["attendance", date],
    queryFn: () =>
      axiosClient
        .get(`/attendance/weekly/${moment(date).format("YYYY-MM-DD")}`)
        .then(({ data }) => {
          let formatData = [];
          data.employees.forEach((emp) => {
            let filterByEmployee = data.data.filter(
              (item) => parseInt(item.userid) === emp.id
            );
            formatData.push({
              id: uuidv4(),
              employeeId: emp.id,
              name: `${emp.first_name} ${emp.last_name}`,
              firstName: emp.first_name,
              lastName: emp.last_name,
              status: emp.active_status,
              online: getLastActivity(emp.last_activity),
              attendance: filterByEmployee,
              holidays: ["2024-01-01"],
            });
          });
          setIsFetched(true);
          return formatData;
        })
        .then((raw) => {
          let formData = [];
          raw.forEach((item) => {
            let days = {
              sunday: "Restday",
              monday: "Absent",
              tuesday: "Absent",
              wednesday: "Absent",
              thursday: "Absent",
              friday: "Absent",
              saturday: "Restday",
            };

            item.attendance.forEach((att) => {
              let day = moment(att.datein).format("dddd");
              days = { ...days, [day.toLowerCase()]: "Present" };
            });

            if (item.holidays.length > 0) {
              item.holidays.forEach((holiday) => {
                let holidayDate = moment(holiday).format("dddd");
                days = { ...days, [holidayDate.toLowerCase()]: "Holiday" };
              });
            }

            formData.push({ ...item, ...days });
          });
          return formData;
        }),
    enabled: !isFetched,
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {!isLoading && <DataTable data={data} columns={columns} />}
    </div>
  );
};

export default Attendance;
