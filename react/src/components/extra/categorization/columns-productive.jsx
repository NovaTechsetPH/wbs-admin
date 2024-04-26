import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@ui/badge";


//import { Dialog } from "@radix-ui/react-dialog";




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
      <DataTableColumnHeader column={column} title="Productive" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const is_productive = row.getValue("is_productive") === "1" ? "Yes" : "No";
  
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
    accessorKey: "reason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">{row.getValue("reason")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "edited_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="edited_by" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const editedBy = row.getValue("edited_by");
  
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">{editedBy ? editedBy : ""}</span>
        </div>
      );
    },
  },
  
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




];

