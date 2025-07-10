import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
type Calculator = {
  params: Promise<{ lang: Lang }>;
};
const Calculator = async ({ params }: Calculator) => {
  const { lang } = await params;
  return (
    <div className="container">
      <Card className="dark:bg-black dark:opacity-80">
        <CardContent className="p-0 m-0 dark:bg-black dark:opacity-80">
          <ShippingCalculator
            className="bg-white dark:bg-black dark:opacity-80"
            lang={lang}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
