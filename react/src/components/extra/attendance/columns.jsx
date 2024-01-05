// import { Badge } from "@ui/badge";
// import { Checkbox } from "@ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  // CrossCircledIcon,
  QuestionMarkCircledIcon,
  // StopwatchIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./../../../main.scss";
// import moment from "moment";

export const statuses = [
  {
    value: "Active",
    label: "Active",
    icon: CheckCircledIcon,
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: CircleIcon,
  },
  {
    value: "Break",
    label: "Break",
    icon: QuestionMarkCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

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

const StatusIcon = ({ status }) => {
  // <CheckCircledIcon className="h-6 w-6 text-green-500" />
  switch (status) {
    case "Present":
      return <CheckCircledIcon className="h-6 w-6 text-green-500" />;
    case "Late":
    case "Undertime":
      return <QuestionMarkCircledIcon className="h-6 w-6 text-yellow-500" />;
    case "Absent":
      return <CrossCircledIcon className="h-6 w-6 text-red-500" />;
    default:
      return <CircleIcon className="h-6 w-6 text-gray-500" />;
  }
};

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-center"
        title="Employees"
      />
    ),
    cell: ({ row }) => {
      let status = row.original.status;
      return (
        <div className="flex space-x-2 ml-4">
          <div className={`avatar ${status.toLowerCase()}`}>
            <Avatar className={`h-10 w-10 border-2 ${getStatusStyle(status)}`}>
              <AvatarImage
                src={`/images/${row.original.employeeId}.png`}
                alt="Avatar"
              />
              <AvatarFallback className="font-semi-bold">
                {row.getValue("name")[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-[100px]">{row.getValue("name")}</div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sunday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Sun"
      />
    ),
    cell: () => {
      return (
        <div className="flex justify-center">
          <span className="max-w-[80px] truncate font-medium">
            {/* {row.getValue("sunday")} */}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "monday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Mon"
      />
    ),
    cell: ({ row }) => {
      // const day = row.original.attendance.filter(
      //   (sun) => moment(sun.datein).format("dddd") === "Monday"
      // );
      // const isoDay = moment(day[0]?.datein)?.format("dddd")?.toLowerCase();
      const isoDay = "monday";
      return (
        <div className="flex justify-center">
          <span className="max-w-[80px] truncate font-medium">
            <StatusIcon status={row.getValue(isoDay)} />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "tuesday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Tue"
      />
    ),
    cell: ({ row }) => {
      // const day = row.original.attendance.filter(
      //   (sun) => moment(sun.datein).format("dddd") === "Tuesday"
      // );
      // const isoDay = moment(day[0]?.datein)?.format("dddd")?.toLowerCase();
      const isoDay = "tuesday";
      return (
        <div className="flex justify-center">
          <span className="max-w-[80px] truncate font-medium">
            <StatusIcon status={row.getValue(isoDay)} />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "wednesday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Wed"
      />
    ),
    cell: ({ row }) => {
      // const day = row.original.attendance.filter(
      //   (sun) => moment(sun.datein).format("dddd") === "Wednesday"
      // );
      // const isoDay = moment(day[0]?.datein)?.format("dddd")?.toLowerCase();
      const isoDay = "wednesday";
      return (
        <div className="flex justify-center">
          <span className="max-w-[80px] truncate font-medium">
            <StatusIcon status={row.getValue(isoDay)} />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "thursday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Thu"
      />
    ),
    cell: ({ row }) => {
      // const day = row.original.attendance.filter(
      //   (sun) => moment(sun.datein).format("dddd") === "Thursday"
      // );
      // const isoDay = moment(day[0]?.datein)?.format("dddd")?.toLowerCase();
      const isoDay = "thursday";
      return (
        <div className="flex justify-center">
          <span className="max-w-[80px] truncate font-medium">
            <StatusIcon status={row.getValue(isoDay)} />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "friday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Fri"
      />
    ),
    cell: ({ row }) => {
      // const day = row.original.attendance.filter(
      //   (sun) => moment(sun.datein).format("dddd") === "Friday"
      // );
      // const isoDay = moment(day[0]?.datein)?.format("dddd")?.toLowerCase();
      const isoDay = "friday";
      return (
        <div className="flex justify-center">
          <span className="max-w-[80px] truncate font-medium">
            <StatusIcon status={row.getValue(isoDay)} />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "saturday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Sat"
      />
    ),
    cell: ({ row }) => {
      // const day = row.original.attendance.filter(
      //   (sun) => moment(sun.datein).format("dddd") === "Saturday"
      // );
      // const isoDay = moment(day[0]?.datein)?.format("dddd")?.toLowerCase();
      // const isoDay = 'saturday';
      return (
        <div className="flex justify-center">
          <span className="max-w-[80px] truncate font-medium">
            {/* <StatusIcon status={row.getValue(isoDay)} /> */}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "tuesday",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     console.log(id);
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "online",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Online" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center">
  //         <span>{row.getValue("online")}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
