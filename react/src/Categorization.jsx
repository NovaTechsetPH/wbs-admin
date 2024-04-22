import { DashboardContextProvider } from "@/context/DashboardContextProvider";
import { Separator } from "@ui/separator";
import Neutral from "@/components/extra/categorization/neutral";
import Productive from "@/components/extra/categorization/productive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { columns } from "@/components/extra/categorization/columns";
import { DataTable } from "@/components/extra/categorization/data-table";
import { useEffect, useState } from "react";
import axiosClient from "./axios-client";
import moment from "moment";

import { Button } from "@/components/ui/button";

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
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              User Application Categories
            </h2>
          </div>
        </div>
        <Separator className="my-4" />
        <Tabs defaultValue="neutral">
          <TabsList>
            <TabsTrigger value="neutral" className="relative">
              Neutral
            </TabsTrigger>
            <TabsTrigger value="productive">
              Productive/Unproductive
            </TabsTrigger>
          </TabsList>
          <TabsContent value="neutral">
            <Neutral />
          </TabsContent>
          <TabsContent value="productive">
            <Productive />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContextProvider>
  );
};

export default Categorization;
