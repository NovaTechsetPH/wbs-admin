import { useEffect, useState } from "react";
import { columns } from "@/components/extra/attendance/columns";
import { DataTable } from "@/components/extra/attendance/data-table";
// import axiosClient from "./axios-client";
// import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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
  const [data, setData] = useState({});
  useEffect(() => {
    // axiosClient
    //   .get("/employees")
    //   .then(async ({ data }) => {
    //     let formatData = [];
    //     await data.data.forEach((item) => {
    //       formatData.push({
    //         employeeId: item.id,
    //         name: `${item.first_name} ${item.last_name}`,
    //         status: getOnlineStatus(item),
    //         online:
    //           item.active_status === "Active"
    //             ? "Now"
    //             : getLastActivity(item.last_activity),
    //       });
    //     });
    //     setData(formatData);
    //   })
    //   .catch((err) => console.log(err));
    let formatData = [
      {
        id: uuidv4(),
        employeeId: 1,
        name: "Jed Zerna",
        status: "Active",
        online: "Now",
        monday: "Late",
        tuesday: "Absent",
        wednesday: "Present",
        thursday: "Present",
        friday: "Present",
        saturday: "Restday",
        sunday: "Restday",
      },
      {
        id: uuidv4(),
        employeeId: 2,
        name: "Daisy Ann Laspinas",
        status: "Offline",
        online: "2 days ago",
        monday: "Present",
        tuesday: "Present",
        wednesday: "Present",
        thursday: "Present",
        friday: "Absent",
        saturday: "Restday",
        sunday: "Restday",
      },
      {
        id: uuidv4(),
        employeeId: 2,
        name: "John Jovence Laspinas",
        status: "Away",
        online: "a few seconds ago",
        monday: "Present",
        tuesday: "Present",
        wednesday: "Present",
        thursday: "Present",
        friday: "Absent",
        saturday: "Restday",
        sunday: "Restday",
      },
    ];
    console.log(formatData, "formatData");
    setData(formatData);
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Attendance;
