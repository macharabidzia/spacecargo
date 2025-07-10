import ServiceCard from "@/components/features/about/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Package, Plane, Truck } from "lucide-react";
import Image from "next/image";
import React from "react";
const servicesData = [
  {
    icon: Truck,
    title: "სახმელეთო გადაზიდვები",
    description:
      "ისარგებლე საერთაშორისო გადაზიდვების სერვისით. გააგზავნე ტვირთი სასურველი მიმართულებით ყველაზე მარტივად. სპეციალური პირობა, საუკეთესო ტარიფი.",
    bgColorClass: "bg-space-blue-light", // Ensure this is defined in tailwind.config.js
    iconBgClass: "bg-blue-500",
    borderRadiusClasses:
      "rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg",
  },
  {
    icon: Package, // Example icon
    title: "საზღვაო გადაზიდვები",
    description:
      "ეფექტური და უსაფრთხო საზღვაო ტრანსპორტირება ნებისმიერი მოცულობის ტვირთისთვის.",
    bgColorClass: "bg-background", // Example color
    iconBgClass: "bg-space-blue-light",
    borderRadiusClasses:
      "rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl text-black", // Different rounding for variety
  },
  {
    icon: Plane, // Example icon
    title: "საჰაერო გადაზიდვები",
    description:
      "სწრაფი და სანდო საჰაერო ტვირთის მიწოდება მსოფლიოს ნებისმიერ წერტილში საერთაშორისო.",
    bgColorClass: "bg-background", // Example color
    iconBgClass: "bg-space-blue-light",
    borderRadiusClasses:
      "rounded-tr-lg rounded-tl-3xl rounded-br-3xl rounded-bl-lg text-black", // Another different rounding
  },
  // Add more services as needed
];

const About = async () => {
  return (
    <div className="container py-12">
      <Card>
        <CardContent className="px-8 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-12">
            <div className="flex-1 text-center md:text-left py-0">
              <Button variant="outline" className="mb-8 dark:bg-accent">
                ჩვენ შესახებ
              </Button>
              <h2 className="text-4xl md:text-5xl font-normal my-8 leading-tight">
                რას გთავაზობთ
              </h2>
              <p className="text-gray-700 text-lg mt-12 dark:text-gray-400">
                ჩვენი მომსახურების კომპლექსური სპექტრი მოიცავს: შიდა სახმელეთო
                გადაზიდვები (საქართველოს, სომხეთის, ყაზახეთის, უზბეკეთის,
                თურქმენეთის, აზერბაიჯანის და სხვა).
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg mt-12">
                საჰაერო და საზღვაო გადაზიდვები (იმპორტი/ექსპორტი). კონსოლიდირება
                მსოფლიოს მაშტაბით. ტვირთის აღების სერვისი. სასაწყობო
                მომსახურება. კარიდან კარამდე სერვისი. გადაფუთვა. საბაჟო
                ფორმალობების მოწესრიგება.
              </p>
            </div>

            <div className="flex-1 min-h-[548px] relative rounded-md overflow-hidden w-full md:w-auto bg-gray-100 flex items-center justify-center">
              <Image
                className="rounded-md object-cover bg-white"
                fill
                src="/images/1.webp"
                alt="Plane Image"
              />
            </div>
          </div>
          <Button className="bg-space-blue-light flex items-center justify-center py-6 text-lg min-w-[228px] gap-2 md:mt-0 mt-10">
            <p>დაგვიკავშირდი</p>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
      <Card className="mt-12">
        <CardContent className="px-8 py-2">
          <h1 className="text-3xl mb-2">თქვენი ლოჯისტიკური პარტნიორი</h1>
          <p className="text-gray-500">
            ყველაფერი ერთ სივრცეში თქვენი ბიზნესის ეფექტური მიწოდებისთვის.
          </p>
          <div className=""></div>
          <div className="flex mt-8 flex-wrap gap-4">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={index} // Using index as key is okay for static lists, but use a unique ID if from DB
                icon={service.icon}
                title={service.title}
                description={service.description}
                bgColorClass={service.bgColorClass}
                iconBgClass={service.iconBgClass}
                borderRadiusClasses={service.borderRadiusClasses}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
