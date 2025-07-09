import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
type Calculator = {
  params: any;
};
const Calculator = async ({ params }: Calculator) => {
  const { lang } = await params;
  return (
    <div className="container">
    <Card>
      <CardContent className="p-0 m-0">
        <ShippingCalculator className="bg-white" lang={lang} />
      </CardContent>
    </Card>
    </div>
  );
};

export default Calculator;
