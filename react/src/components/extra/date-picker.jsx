import * as React from "react";
import { useDashboardContext } from "./../../context/DashboardContextProvider";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./../ui/button";
import { Calendar } from "./../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./../ui/popover";

export function DatePicker({ onDateChanged }) {
  const { date, setDate } = useDashboardContext();
  const btnRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = React.useState(date);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChanged(newDate);
    btnRef.current.click();
    setSelectedDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={btnRef}
          variant={"outline"}
          className={cn(
            "max-w-64 justify-start text-left  font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
