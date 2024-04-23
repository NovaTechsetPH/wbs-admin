import React, { useEffect, useState } from "react";
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
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(date, "date");
  }, [date]);

  useEffect(() => {
    axiosClient
      .get("/apps/neutral", {
        params: {
          date: moment("2024-03-06").format("YYYY-MM-DD"),
          page: 50,
          per_page: 20,
          team_id: currentTeam,
        },
      })
      .then(({ data }) => {
        // setData(data)
        console.log(data);
        setTotal(data.total);
        setCurrentPage(data.current_page);
        setPerPage(data.per_page);
        setData(data.data);
      });
  }, [currentTeam, date]);

  return (
    <DashboardContextProvider>
      <DataTable
        data={data}
        total={total}
        currentPage={currentPage}
        perPage={perPage}
        columns={columns}
      />
    </DashboardContextProvider>
  );
};

export default TabContents;
