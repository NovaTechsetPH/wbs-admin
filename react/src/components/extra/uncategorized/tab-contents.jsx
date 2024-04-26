import React, { useMemo } from "react";
import axiosClient from "@/axios-client";
import {
  DashboardContextProvider,
  useDashboardContext,
} from "@/context/DashboardContextProvider";

import moment from "moment";
import { Button } from "@/components/ui/button";
import { secondsToHuman } from "@/lib/timehash";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { useStateContext } from "@/context/ContextProvider";

const TabContents = () => {
  const { date } = useDashboardContext();
  const { currentTeam } = useStateContext();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <span>#</span>,
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <div className="flex items-center justify-start space-x-2">
              {row.getCanExpand() && (
                <Button
                  variant="ghost"
                  className="leading-6 m-0 p-1"
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM4.50003 7C4.22389 7 4.00003 7.22386 4.00003 7.5C4.00003 7.77614 4.22389 8 4.50003 8H10.5C10.7762 8 11 7.77614 11 7.5C11 7.22386 10.7762 7 10.5 7H4.50003Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </Button>
              )}{" "}
              {getValue()}
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "totalDuration",
        cell: ({ row, getValue }) =>
          row.getCanExpand() ? secondsToHuman(getValue()) : getValue(),
        header: () => <span>Total Duration</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.employee,
        id: "employee",
        cell: (info) => info.getValue(),
        header: () => <span>Employee</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "description",
        header: () => <span>Task Description</span>,
        footer: (props) => props.column.id,
      },
      // {
      //   // accessorFn: (row) => row.description,
      //   // id: "description",
      //   accessorKey: "description",
      //   cell: ({ getValue }) => {
      //     <div
      //       style={{
      //         maxWidth: "300px",
      //       }}
      //     >
      //       {getValue()}
      //     </div>;
      //   },
      //   header: () => <span>Task Description</span>,
      //   footer: (props) => props.column.id,
      // },
      {
        accessorKey: "count",
        header: () => <span>Total Count</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "date",
        header: () => <span>Date</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const formatData = (data) => {
    let formattedData = [];
    const neutralLogs = [];

    data.forEach((item) => {
      let subRow = {
        id: item.userid,
        tolalDuration: item.duration,
        employee: `${item.employee.first_name} ${item.employee.last_name}`,
        description: item.description,
        count: item.time,
        date: item.end_time,
      };
      // console.log(item.duration);

      if (!neutralLogs.includes(item.description)) {
        formattedData.push({
          id: item.userid,
          tolalDuration: item.duration,
          employee: null,
          description: item.description,
          count: 1,
          date: item.date,
          subRows: [subRow],
        });
        neutralLogs.push(item.description);
      } else {
        let index = formattedData.findIndex(
          (x) => x.description === item.description
        );
        formattedData[index].count += 1;
        formattedData[index].totalDuration += item.duration;
        formattedData[index].subRows.push(subRow);
      }
    });

    console.log(formattedData);

    return formattedData;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["neutralData", date, currentTeam],
    queryFn: async () => {
      const res = await axiosClient.get("/apps/neutral", {
        params: {
          date: moment(date).format("YYYY-MM-DD"),
          teamId: currentTeam,
        },
      });

      return formatData(res.data);
    },
  });

  if (isLoading) return <LoadingOverlayWrapper />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <DashboardContextProvider>
      <DataTable data={data} columns={columns} />
    </DashboardContextProvider>
  );
};

export default TabContents;
