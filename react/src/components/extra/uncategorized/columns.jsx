import moment from "moment";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { AlertDialogDemo } from "./delete-categories";
// import { DialogDemo } from "./edit-categories";

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[60px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task Description" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "employee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => {
      const employee = row.getValue("employee");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">{`${employee.first_name} ${employee.last_name}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("time")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "end_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("end_time")}</span>
          {/* <span>
            {moment(row.getValue("end_time", "HH:mm:ss"), "HH:mm:ss").format(
              "mm:ss"
            )}
          </span> */}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      const start = row.getValue("time");
      const end = row.getValue("end_time");
      const duration =
        row.getValue("duration") ??
        moment(end, "HH:mm:ss").diff(moment(start, "HH:mm:ss"), "seconds");
      return (
        <div className="flex items-center">
          <span>{moment.utc(duration * 1000).format("mm:ss")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("date")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Action" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2 my-2">
  //         <DialogDemo id={row.getValue("id")} />
  //         <AlertDialogDemo id={row.getValue("id")} />
  //       </div>
  //     );
  //   },
  // },
];
