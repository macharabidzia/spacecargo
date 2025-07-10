"use client";
import { Package, Truck, MapPin, CheckCircle } from "lucide-react";
import { defineStepper } from "@/components/stepper";

const ClientTrackingDetails = ({
  currentActiveStepIndex,
}: {
  currentActiveStepIndex: number;
}) => {
  const steps = [
    {
      label: "ტრანზიტი",
      icon: <Package className="h-6 w-6" />,
      id: "transit",
    },
    {
      label: "გზაშია",
      icon: <Truck className="h-6 w-6" />,
      id: "in-transit",
    },
    {
      label: "დანიშნულება",
      icon: <MapPin className="h-6 w-6" />,
      id: "at-destination",
    },
    {
      label: "მიტანილია",
      icon: <CheckCircle className="h-6 w-6" />,
      id: "delivered",
    },
  ];

  const { Stepper } = defineStepper(...steps);

  return (
    <>
      <div className="py-6 mb-6 client-tracking-details">
        <Stepper.Provider
          className="w-full"
          initialStep={steps[currentActiveStepIndex].id.toString()}
        >
          <Stepper.Navigation>
            {steps.map((stepConfig) => (
              <Stepper.Step
                key={stepConfig.id}
                of={stepConfig.id}
                icon={stepConfig.icon}
              >
                <Stepper.Title>{stepConfig.label}</Stepper.Title>
              </Stepper.Step>
            ))}
          </Stepper.Navigation>
        </Stepper.Provider>
      </div>
    </>
  );
};

export default ClientTrackingDetails;
