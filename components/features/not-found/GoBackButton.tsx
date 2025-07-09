"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

const GoBackButton = () => {
  return (
    <Button
      onClick={() => window.history.back()}
      className="flex cursor-pointer flex-row bg-space-blue-light"
    >
      <ArrowLeft />
      Go back
    </Button>
  );
};

export default GoBackButton;
