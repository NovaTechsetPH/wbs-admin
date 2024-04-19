import { columns } from "@/components/extra/categorization/columns-productive";
import { DataTable } from "@/components/extra/categorization/data-table";
import { useEffect, useState } from "react";
import axiosClient from "@/axios-client";

const Productive = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/categories")
      .then(({ data }) => {
        const tmpData = data.data
        .filter((item) => item.is_productive != 2)
          .map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            header_name: item.header_name,
            icon: item.icon,
            is_productive: item.is_productive,
            abbreviation: item.abbreviation,
            priority_id: item.priority_id,
            updated_at: item.updated_at,
            created_at: item.created_at,
            reason: item.reason,
            edited_by: item.edited_by,
          }));
        setData(tmpData);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="relative">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Productive;
