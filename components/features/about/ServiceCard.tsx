// src/components/common/ServiceCard.tsx

import React from "react";
import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon; // The Lucide icon component itself (e.g., Truck)
  title: string;
  description: string;
  bgColorClass: string; // Tailwind class for background of the whole card
  iconBgClass: string; // Tailwind class for background of the icon's circle
  borderRadiusClasses: string; // Tailwind classes for custom border radius, e.g., "rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg"
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: IconComponent,
  title,
  description,
  bgColorClass,
  iconBgClass,
  borderRadiusClasses,
}) => {
  return (
    <Card
      className={`${bgColorClass} text-white  ${borderRadiusClasses} flex flex-col flex-1 min-w-[325px]`}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className={`${iconBgClass} rounded-full h-fit w-fit p-3 mb-4`}>
          <IconComponent className="text-white" size={40} />
        </div>
        <h2 className="text-sm lg:text-xl dark:text-white font-semibold mb-3">
          {title}
        </h2>
        <p className="opacity-90 dark:text-white text-sm flex-grow overflow-hidden text-ellipsis break-words">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
