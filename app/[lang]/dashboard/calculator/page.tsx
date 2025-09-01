import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
type Calculator = {
  params: Promise<{ lang: Lang }>;
};
const Calculator = async () => {
  return (
    <div className="container">
      <Card className="dark:opacity-80 p-0 bg-transparent">
        <CardContent className="p-0 m-0 dark:bg-transparent dark:opacity-80">
          <ShippingCalculator
            className="bg-white"
            canEdit={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
