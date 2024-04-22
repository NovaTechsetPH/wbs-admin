// import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { Badge } from "@ui/badge";
import { AlertDialogDemo } from "./delete-categories";
import { DialogDemo } from "./edit-categories";

// const labels = [
//   {
//     value: "bug",
//     label: "Bug",
//   },
//   {
//     value: "feature",
//     label: "Feature",
//   },
//   {
//     value: "documentation",
//     label: "Documentation",
//   },
// ];

// const statuses = [
//   {
//     value: "Approved",
//     label: "Approved",
//     icon: CheckCircledIcon,
//   },
//   {
//     value: "Pending",
//     label: "Pending",
//     icon: QuestionMarkCircledIcon,
//   },
//   {
//     value: "Rejected",
//     label: "Rejected",
//     icon: CrossCircledIcon,
//   },
// ];

// const priorities = [
//   {
//     label: "Low",
//     value: "low",
//     icon: ArrowDownIcon,
//   },
//   {
//     label: "Medium",
//     value: "medium",
//     icon: ArrowRightIcon,
//   },
//   {
//     label: "High",
//     value: "high",
//     icon: ArrowUpIcon,
//   },
// ];

// const getIconColor = (value) => {
//   switch (value) {
//     case "Approved":
//       return "text-green-500";
//     case "Pending":
//       return "text-yellow-500";
//     case "Rejected":
//       return "text-red-500";
//     default:
//       return "text-gray-500";
//   }
// };

// const handleApprove = (row) => {
//   console.log(row, "approve");
// };

// const handleReject = (row) => {
//   console.log(row, "reject");
// };

const getProductivityType = (value) => {
  switch (value) {
    case "1":
      return "Productive";
    case "0":
      return "Unproductive";
    case "2":
    default:
      return "Neutral";
  }
};

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
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);
      const employee = row.getValue("employee");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">{`${employee.first_name} ${employee.last_name}`}</span>
        </div>
      );
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
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 my-2">
          <DialogDemo id={row.getValue("id")} />
          <AlertDialogDemo id={row.getValue("id")} />
        </div>
      );
    },
  },
];
