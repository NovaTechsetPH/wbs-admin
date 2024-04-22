import React, { useMemo, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import axiosClient from "@/axios-client";
import {
  DashboardContextProvider,
  useDashboardContext,
} from "@/context/DashboardContextProvider";
import moment from "moment";

const TabContents = () => {
  const { date, currentTeam } = useDashboardContext();
  const [data, setData] = useState({});

  useMemo(() => {
    axiosClient
      .get("/apps/neutral", {
        params: {
          date: moment(date).format("YYYY-MM-DD"),
          page: 1,
          per_page: 10,
          team_id: currentTeam,
        },
      })
      .then(({ data }) => {
        // setData(data)
        console.log(data);
        setData(data.data);
      });
  }, [currentTeam, date]);

  return (
    <DashboardContextProvider>
      <DataTable data={data} columns={columns} />
    </DashboardContextProvider>
  );
};

export default TabContents;
