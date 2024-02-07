// import * as React from "react"

import axiosClient from "@/axios-client";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { useEffect, useState } from "react";

export function TeamSwitcher({ isCollapsed }) {
  const getTeams = async () => {
    const { data } = await axiosClient.get("/teams");
    return data.data;
  };

  const [selectedAccount, setSelectedAccount] = useState("");
  const [teams, setTeams] = useState([]);

  const handleAddTeam = () => {
    console.log("add team");
  };

  const handleOnChange = (value) => {
    if (value === "new") {
      handleAddTeam();
      value = selectedAccount;
    }
    setSelectedAccount(value);
  };

  useEffect(() => {
    getTeams().then((data) => {
      setSelectedAccount(data[0].name);
      setTeams(data);
    });
  }, []);

  return (
    <Select
      defaultValue={selectedAccount}
      value={selectedAccount}
      onValueChange={handleOnChange}
    >
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select team"
      >
        <SelectValue placeholder="Select a team">
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {/* {teams.find((team) => team.name === selectedAccount)?.label} */}
            {selectedAccount}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {teams.map((team) => (
          <SelectItem key={team.id} value={team.name}>
            <div className="cursor-pointer flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {team.name}
            </div>
          </SelectItem>
        ))}
        <SelectItem
          onClick={handleAddTeam}
          className="cursor-pointer"
          value="new"
        >
          Add Team
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
