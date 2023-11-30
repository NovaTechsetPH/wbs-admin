import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Widget = ({ title, content }) => {
  return (
    <Card style={{ height: "193px" }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default Widget;
