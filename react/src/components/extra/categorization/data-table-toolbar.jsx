import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useState } from 'react';
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import AddCategories from "./add-category"; // Changed import statement

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export function DataTableToolbar({ table }) {
  const [showFilter, setShowFilter] = useState(false);
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
        />
        {table.getColumn("description") && (
          <DataTableFacetedFilter
            column={table.getColumn("description")}
            title="description"
            options={[
              { value: "Productive", label: "Productive" },
              { value: "Unproductive", label: "Unproductive" },
              { value: "Neutral", label: "Neutral" },
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
