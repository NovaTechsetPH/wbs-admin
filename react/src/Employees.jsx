import { useEffect, useState } from "react";
import { columns } from "@/components/extra/employee/columns";
import { DataTable } from "@/components/extra/employee/data-table";
import axiosClient from "./axios-client";
import moment from "moment";

// const getOnlineStatus = (item) => {
//   if (item.active_status === "Offline") return "Inactive";
//   if (item.active_status === "Active") return "Active";
//   return "Away";
// };

export const getLastActivity = (act) => {
  if (act) {
    let time = act.end_time ?? act.time;
    return moment(`${act.date} ${time}`).fromNow();
  }
  return "No Activity";
};

const getEmployeeId = (emp) => {
  if (emp.employee_id) {
    return emp.employee_id;
  }
  let zeros = 5 - emp.id.toString().length - 1;
  return `NTP${"0".repeat(zeros)}${emp.id}`;
};

const Employees = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axiosClient
      .get("/employees")
      .then(async ({ data }) => {
        let formatData = [];
        await data.data.forEach((item) => {
          formatData.push({
            id: item.id,
            firstName: item.first_name,
            lastName: item.last_name,
            employeeId: getEmployeeId(item),
            name: `${item.first_name} ${item.last_name}`,
            status:
              item.active_status === "Waiting" ? "Idle" : item.active_status,
            online:
              item.active_status === "Active"
                ? "Now"
                : getLastActivity(item.last_activity),
          });
        });

        setData(formatData.sort((a, b) => (a.status > b.status ? 1 : -1)));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Employees;
