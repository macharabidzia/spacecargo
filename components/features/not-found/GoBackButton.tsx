"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

const GoBackButton = () => {
  return (
    <Button
      onClick={() => window.history.back()}
      className="flex  flex-row bg-space-blue-light dark:text-white"
    >
      <ArrowLeft />
      Go back
    </Button>
  );
};

export default GoBackButton;
