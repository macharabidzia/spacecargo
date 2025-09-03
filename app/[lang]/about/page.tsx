import ServiceCard from "@/components/features/about/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Package, Plane, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

const servicesData = [
  { key: "landTransport", icon: Truck, bgColorClass: "bg-space-blue-light", iconBgClass: "bg-blue-500", borderRadiusClasses: "rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg" },
  { key: "seaTransport", icon: Package, bgColorClass: "bg-background", iconBgClass: "bg-space-blue-light", borderRadiusClasses: "rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl text-black" },
  { key: "airTransport", icon: Plane, bgColorClass: "bg-background", iconBgClass: "bg-space-blue-light", borderRadiusClasses: "rounded-tr-lg rounded-tl-3xl rounded-br-3xl rounded-bl-lg text-black" }
];

type IAbout = {
  params: Promise<{ lang: Lang }>
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).common;

  return {
    title: dictionary["about.title"],
    description: dictionary["about.description1"],
    openGraph: {
      title: dictionary["about.title"],
      description: dictionary["about.description1"],
      images: ["/images/1.webp"],
      type: "website",
    },
    twitter: {
      title: dictionary["about.title"],
      description: dictionary["about.description1"],
      card: "summary_large_image",
      images: ["/images/1.webp"],
    },
  };
}

const About = async ({ params }: IAbout) => {
  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).common;

  return (
    <div className="container py-12">
      <Card>
        <CardContent className="px-8 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-12">
            <div className="flex-1 text-center md:text-left py-0">
              <Button variant="outline" disableAnimation className="mb-8 dark:bg-accent dark:text-white text-black">
                {dictionary["about.button"]}
              </Button>
              <h2 className="text-4xl md:text-5xl font-normal my-8 leading-tight">{dictionary["about.title"]}</h2>
              <p className="text-gray-700 text-lg mt-12 dark:text-gray-400">{dictionary["about.description1"]}</p>
              <p className="text-gray-700 dark:text-gray-400 text-lg mt-12">{dictionary["about.description2"]}</p>
            </div>

            <div className="flex-1 min-h-[548px] relative rounded-md overflow-hidden w-full md:w-auto bg-gray-100 flex items-center justify-center">
              <Image className="rounded-md object-cover bg-white" fill src="/images/1.webp" alt="Plane Image" priority />
            </div>
          </div>

          <Link href="contact">
            <Button className="dark:text-white hover:bg-space-blue-light/90 p-0 m-0 bg-space-blue-light flex items-center justify-center py-6 text-md min-w-[228px] gap-2 lg:mt-0 mt-10">
              <div className="flex flex-row items-center gap-2 cursor-pointer">
                <p className="mb-[2.7px]">{dictionary["about.contactButton"]}</p>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="mt-12">
        <CardContent className="px-8 py-2">
          <h1 className="text-3xl mb-2">{dictionary["about.logisticsTitle"]}</h1>
          <p className="text-gray-500">{dictionary["about.logisticsDescription"]}</p>

          <div className="flex mt-8 flex-wrap gap-4">
            {servicesData.map(service => (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                title={dictionary[`about.services.${service.key}.title`]}
                description={dictionary[`about.services.${service.key}.description`]}
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
