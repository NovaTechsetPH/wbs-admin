import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import AddCategories from "./add-category"; 
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search Categories..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />{" "}
       {table.getColumn("is_productive") && (
          <DataTableFacetedFilter
            column={table.getColumn("is_productive")}
            title="transactions"
            options={[
              {value: '1', label: "Productive"}, 
              {value: '2', label: "Unproductive"}, 
              {value: '0', label: "Neutral"},
            ]}
          />
        )}

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
        <div className="flex">
          <AddCategories/>
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
