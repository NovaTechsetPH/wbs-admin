import { DashboardContextProvider } from "@/context/DashboardContextProvider";
import { Separator } from "@ui/separator";
import Neutral from "@/components/extra/categorization/neutral";
import Productive from "@/components/extra/categorization/productive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const Categorization = () => {
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
