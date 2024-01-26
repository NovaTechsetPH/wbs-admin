import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

const SelectDialog = ({ data, onEmployeeChanged }) => {
  const [open, setOpen] = useState(true);
  const [selectedName, setSelectedName] = useState("Select Employee...");
  const [id, setId] = useState("");

  useEffect(() => {
    onEmployeeChanged(id);
  }, [id, onEmployeeChanged]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {id === "" ? "Select Employee..." : selectedName}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Employee..." className="h-9" />
          <CommandEmpty>No employee found.</CommandEmpty>
          <CommandGroup>
            {data &&
              data.map((emp) => (
                <CommandItem
                  key={emp.id}
                  value={emp.id}
                  onSelect={(currentValue) => {
                    setId(id === emp.id ? "" : emp.id);
                    setOpen(false);
                    setSelectedName(
                      currentValue === selectedName
                        ? "Search Employee..."
                        : `${emp.first_name} ${emp.last_name}`
                    );
                  }}
                >
                  {`${emp.first_name} ${emp.last_name}`}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      id === emp.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectDialog;
