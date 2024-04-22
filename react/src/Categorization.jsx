import { DashboardContextProvider } from "@/context/DashboardContextProvider";
import { columns } from "@/components/extra/categorization/columns";
import { DataTable } from "@/components/extra/categorization/data-table";
import { useEffect, useState } from "react";
import axiosClient from "./axios-client";
import moment from "moment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import TabContents from "./components/extra/uncategorized/tab-contents";

// import { Button } from "@/components/ui/button";

const Categorization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/categories")
      .then(async ({ data }) => {
        let tmpData = [];
        await data.data.forEach((item) => {
          tmpData.push({
            id: item.id,
            name: item.name,
            description: item.description,
            is_productive: item.is_productive,
            header_name: item.header_name,
            icon: item.icon,
            abbreviation: item.abbreviation,
            priority_id: item.priority_id,
            // header_name: item.header_name,
            // updated_at: item.updated_at,
            // created_at: item.created_at,
            /*
            status: item.status,
            requestedOn: moment(item.created_at).format("YYYY-MM-DD"),
            */
            updated_at:
              item.updated_at ??
              moment(item.updated_at).format("YYYY-MM-DD HH:mm:ss"),
            created_at: item.created_at
              ? moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")
              : null,
          });
        });
        setData(tmpData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardContextProvider>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Categorization
            </h2>
          </div>
        </div>
        <Tabs defaultValue="uncategorized" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="uncategorized" className="relative">
                Uncategorized / Neutral
              </TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="uncategorized">
            <TabContents />
          </TabsContent>
          <TabsContent value="categories">
            <DataTable data={data} columns={columns} />
          </TabsContent>
        </Tabs>

        {/* <Separator className="my-4" /> */}
        <div className="relative"></div>
      </div>
    </DashboardContextProvider>
  );
};

export default Categorization;
