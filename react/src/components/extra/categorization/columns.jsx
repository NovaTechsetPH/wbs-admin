import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@ui/badge";
import EditCategories from "./edit-category";

//import { Dialog } from "@radix-ui/react-dialog";



import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@ui/badge";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CheckIcon,
  Cross1Icon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import EditCategoryDialog from "./edit"; // Change import statement
//import SendCategoryDialog from "./send-request"; // Change import statement
import { BadgeHelp } from "lucide-react";

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
    value: "Approved",
    label: "Approved",
    icon: CheckCircledIcon,
  },
  {
    value: "Pending",
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Rejected",
    label: "Rejected",
    icon: CrossCircledIcon,
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

const getIconColor = (value) => {
  switch (value) {
    case "Approved":
      return "text-green-500";
    case "Pending":
      return "text-yellow-500";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const handleApprove = (row) => {
  console.log(row, "approve");
};

const handleReject = (row) => {
  console.log(row, "reject");
};

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("id")}</div>
      
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);


      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
     
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">{row.getValue("description")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "is_productive",
    header: ({ column }) => ( 
      <DataTableColumnHeader column={column} title="Transaction" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const is_productive = row.getValue("is_productive") === "2" ? "Neutral" : "";
  
        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{label.label}</Badge>}
            <span className="max-w-[500px] truncate">{is_productive}</span>
          </div>
        );
    },
  },
  

  {
    accessorKey: "header_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Header Name" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">{row.getValue("header_name")}</span>
        </div>
      );
    },
  },

{
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
    
      return (
        <div className="flex space-x-2">
        {row.getValue("icon") ? (
          <img
            src={`/icons/${row.getValue("icon")}`}
            className="aspect-square h-6 w-6"
          />
        ) : (
          <div className="aspect-square h-6 w-6 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full">
            {row.getValue("description")[0]}
          </div>
        )}
      </div>
      
      );
    }

  },
  

  {
    accessorKey: "abbreviation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abbreviation" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">{row.getValue("abbreviation")}</span>
          <span className="max-w-[500px] truncate">
            {row.getValue("abbreviation")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority Id" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">{row.getValue("priority_id")}</span>
        </div>
      );
    },
  },
  /*
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approval Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon
              className={cn(
                "mr-2 h-4 w-4 text-muted-foreground",
                getIconColor(status.value)
              )}
            />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }, */
 
  
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("created_at")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("updated_at")}</span>
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
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <EditCategories 
        id={row.getValue("id")}
        name={row.getValue("name")}
        description={row.getValue("description")} 
        is_productive={row.getValue("is_productive")}
        header_name={row.getValue(" header_name")}
        icon={row.getValue("icon")}
        abbreviation={row.getValue(" abbreviation")}
        priority_id={row.getValue("priority_id")}
        updated_at={row.getValue(" updated_at")}
        created_at={row.getValue("created_at")}
        reason={row.getValue("reason")}
        edited_by={row.getValue("edited_by")}
        />
      </div>
    ),
  },


];

