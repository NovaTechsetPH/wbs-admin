import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const Widget = ({ title, content, loading = false }) => {
  return loading ? (
    <Card style={{ height: "193px" }}>
      <CardHeader>
        <Skeleton className={"w-[140px] h-[25px] bg-slate-200"} />
      </CardHeader>
      <CardContent className="text-4xl ">
        <Skeleton className="w-[200px] h-[32px] bg-slate-200" />
      </CardContent>
    </Card>
  ) : (
    <Card style={{ height: "193px" }}>
      <CardHeader>
        <CardTitle className="text-base font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl">{content}</CardContent>
    </Card>
  );
};

export default Widget;
