import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
type Calculator = {
  params: Promise<{ lang: Lang }>;
};
const Calculator = async () => {
  return (
    <div className="container">
      <Card className="p-0 bg-transparent">
        <CardContent className="p-0 m-0 dark:bg-transparent">
          <ShippingCalculator
            canEdit={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
