import { getDictionary } from "@/i18n/dictionaries";
import { HomeDictionary } from "@/types/dictionary";
import Image from "next/image";
import React from "react";

type Lang = "en" | "ka";

interface ServicesProps {
  lang: Lang;
  children?: React.ReactNode;
  className?: string;
}

const Services = async ({ children, lang }: ServicesProps) => {
  const fullDictionary = await getDictionary(lang);
  const servicesDict: HomeDictionary = fullDictionary.home;

  const list: { title: string; text: string; url: string }[] = [
    {
      title: servicesDict["services.flights.title"],
      text: servicesDict["services.flights.text"],
      url: "/icons/airplane.svg",
    },
    {
      title: servicesDict["services.sms.title"],
      text: servicesDict["services.sms.text"],
      url: "/icons/sms-star.svg",
    },
    {
      title: servicesDict["services.consultation.title"],
      text: servicesDict["services.consultation.text"],
      url: "/icons/consulting.svg",
    },
    {
      title: servicesDict["services.courier.title"],
      text: servicesDict["services.courier.text"],
      url: "/icons/truck.svg",
    },
    {
      title: servicesDict["services.paymentSystems.title"],
      text: servicesDict["services.paymentSystems.text"],
      url: "/icons/convert-card.svg",
    },
    {
      title: servicesDict["services.dailyFlights.title"],
      text: servicesDict["services.dailyFlights.text"],
      url: "/icons/clock.svg",
    },
  ];

  return (
    <section className="mt-12 space-y-12">
      <h1 className="text-center text-4xl font-semibold mb-12">
        {servicesDict["services.mainTitle"]}
      </h1>
      <p className="text-center mt-2 mb-8 max-w-2xl mx-auto text-gray-400">
        {servicesDict["services.description"]}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto space-y-12 ">
        {list.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              width={80}
              height={80}
              src={service.url}
              alt={service.title}
              className="w-20 h-20 mb-4 object-contain"
            />
            <h2 className="text-xl font-semibold text-center mb-2 capitalize">
              {service.title}
            </h2>
            <p className="text-center text-sm">{service.text}</p>
          </div>
        ))}
      </div>
      {children}
    </section>
  );
};

export default Services;
