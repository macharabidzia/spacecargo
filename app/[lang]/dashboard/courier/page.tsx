"use client";
import CourierTableClient from "@/components/features/dashboard/courier/CourierTableClient";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";


const Courier = () => {
  return (
    <div className="container">
      <Card>
        <CardContent>
          <CourierTableClient  />
        </CardContent>
      </Card>
    </div>
  );
};

export default Courier;
