import { Badge } from "@ui/badge";
// import { Checkbox } from "@ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  // CrossCircledIcon,
  QuestionMarkCircledIcon,
  // StopwatchIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./../../../main.scss";

const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

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

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
        <div className="flex space-x-2">
          <div className={`avatar ${status.toLowerCase()}`}>
            <Avatar className={`h-9 w-9 border-2 ${getStatusStyle(status)}`}>
              <AvatarImage
                src={`/images/${row.original.employeeId}.png`}
                alt="Avatar"
              />
              <AvatarFallback>{row.getValue("name")[0]}</AvatarFallback>
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
    accessorKey: "monday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="items-center justify-around"
        title="Mon"
      />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue("monday")}
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
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue("tuesday")}
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
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue("wednesday")}
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
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue("thursday")}
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
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue("friday")}
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
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue("saturday")}
          </span>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[80px] truncate font-medium">
            {row.getValue("sunday")}
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
