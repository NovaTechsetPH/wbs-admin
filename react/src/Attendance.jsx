import { useEffect, useState } from "react";
import { columns } from "@/components/extra/employee/columns";
import { DataTable } from "@/components/extra/employee/data-table";
import axiosClient from "./axios-client";
import moment from "moment";

const getOnlineStatus = (item) => {
  if (item.active_status === "Offline") return "Inactive";
  if (item.active_status === "Active") return "Active";
  return "Away";
};

const getLastActivity = (act) => {
  if (act) {
    let time = act.end_time ?? act.time;
    return moment(`${act.date} ${time}`).fromNow();
  }
  return "No Activity";
};

const Attendance = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axiosClient
      .get("/employees")
      .then(async ({ data }) => {
        let formatData = [];
        await data.data.forEach((item) => {
          formatData.push({
            employeeId: item.id,
            name: `${item.first_name} ${item.last_name}`,
            status: getOnlineStatus(item),
            online:
              item.active_status === "Active"
                ? "Now"
                : getLastActivity(item.last_activity),
          });
        });
        setData(formatData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Attendance;
