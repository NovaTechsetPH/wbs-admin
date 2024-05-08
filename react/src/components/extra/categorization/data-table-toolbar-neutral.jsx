import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import AddCategories from "./add-category"; 
//import { DataTableFacetedFilter } from "./data-table-faceted-filter"

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter by employee ID..."
          value={table.getColumn("employeeId")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("employeeId")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        <Input
          placeholder="Search Category..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />{" "}
        
        
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
          <AddCategories />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}