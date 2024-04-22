import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import AddCategories from "./add-category"; 
import { DataTableFacetedFilter } from "./data-table-faceted-filter"  

export function DataTableToolbar({ table}) {
  const isFiltered = table.getState().columnFilters.length > 0;
 // const [ setFilterOption] = useState("all");

  /*const handleFilterChange = (option) => {
    setFilterOption(option);
    // Implement filtering logic based on the selected option
  };*/

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
        {table.getColumn("is_productive") && (
          <DataTableFacetedFilter
            column={table.getColumn("is_productive")}
            title="Transactions"
            options={[
              { value: "1", label: "Productive" },
              { value: "0", label: "Unproductive" }
            ]}
          />
        )}
        {
        }
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
