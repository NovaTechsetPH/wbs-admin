import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import AddCategoryDialog from "./add"; // Corrected import statement

export function DataTableToolbar({ table, row }) { // Include 'row' as a prop
  const isFiltered = table.getState().columnFilters.length > 0;
  const [filterOption, setFilterOption] = useState("all");

  const handleFilterChange = (option) => {
    setFilterOption(option);
    // Implement filtering logic based on the selected option
  };

  return (
    <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
            <Input
                placeholder="Search Employee..."
                value={table.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px]"
            />
            <div className="flex space-x-2">
                <AddCategoryDialog row={row} />
            </div>

            {table.getColumn("is_productive") && (
                <DataTableFacetedFilter
                    column={table.getColumn("is_productive")}
                    title="Productive Filter"
                    options={[
                        { value: "0", label: "Neutral" },
                        { value: "1", label: "Productive" },
                        { value: "2", label: "Not Productive" },
                    ]}
                    onChange={(selectedOptions) => {
                        // Convert selected options to an array of values
                        const selectedValues = selectedOptions.map(option => option.value);
                        // Set filter value based on selected options
                        table.getColumn("is_productive")?.setFilterValue(selectedValues.length > 0 ? selectedValues : null);
                    }}
                    filterFn={(filterValue, rowValue) => {
                        // If filterValue is not a string, return false
                        if (typeof filterValue !== 'string') return false;

                        // Convert both filterValue and rowValue to lowercase for case-insensitive comparison
                        const lowerCaseFilterValue = filterValue.toLowerCase();
                        const lowerCaseRowValue = String(rowValue).toLowerCase();

                        // Check if the rowValue includes the filterValue
                        return lowerCaseRowValue.includes(lowerCaseFilterValue);
                    }}
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
        </div>
        <DataTableViewOptions table={table} />
    </div>
);

}
