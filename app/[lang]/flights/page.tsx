import { getFlights } from "@/actions/common.actions";
import FlightsTable from "@/components/features/flights/FlightsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/i18n/dictionaries";
import Pagination from "@/components/common/Pagination";
import ClientToastWrapper from "@/components/common/ClientToastWrapper";
import Image from "next/image";

type Lang = "en" | "ka";

type CountryKey =
  | "dongguan"
  | "newyork"
  | "dubai"
  | "athens"
  | "istanbul"
  | "london"
  | "sharjah";

const countryConfig: Record<CountryKey, { en: string; ka: string; icon: string }> = {
  dongguan: { en: "Dongguan", ka: "დონგუანი", icon: "/icons/china.svg" },
  newyork: { en: "New York", ka: "ნიუ იორკი", icon: "/icons/usa.svg" },
  dubai: { en: "Dubai", ka: "დუბაი", icon: "/icons/uae.svg" },
  athens: { en: "Athens", ka: "ათენი", icon: "/icons/greece.svg" },
  istanbul: { en: "Istanbul", ka: "სტამბოლი", icon: "/icons/turkey.svg" },
  london: { en: "London", ka: "ლონდონი", icon: "/icons/england.svg" },
  sharjah: { en: "Sharjah", ka: "შარჯა", icon: "/icons/uae.svg" },
};

type Flight = {
  Flights_Number: string;
  Come_Date: string;
};

type FlightsProps = {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ page?: string; perPage?: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).common;

  return {
    title: dictionary["flights_title"],
    description: dictionary["flights_subtitle"],
    openGraph: {
      title: dictionary["flights_title"],
      description: dictionary["flights_subtitle"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const DEFAULT_PAGE_SIZE = 5;

const Flights = async ({ params, searchParams }: FlightsProps) => {
  const { lang } = await params;
  const awaitedSearchParams = await searchParams;
  
  const page =
    typeof awaitedSearchParams.page === "string"
      ? parseInt(awaitedSearchParams.page, 10)
      : 1;

  const perPage =
    typeof awaitedSearchParams.perPage === "string"
      ? parseInt(awaitedSearchParams.perPage, 10)
      : DEFAULT_PAGE_SIZE;

  const dictionary = (await getDictionary(lang)).common;
  const allFlights: Flight[] = await getFlights();

  console.log(allFlights)
  const countries = Object.keys(countryConfig) as CountryKey[];

  const flightsByCountry: Record<CountryKey, Flight[]> = {} as Record<CountryKey, Flight[]>;
  countries.forEach((key) => {
    const originName = lang === "en" ? countryConfig[key].en : countryConfig[key].ka;
    flightsByCountry[key] = allFlights.filter((f) =>
      f.Flights_Number.startsWith(originName)
    );
  });

  const totalPagesByCountry: Record<CountryKey, number> = {} as Record<CountryKey, number>;
  const paginatedFlightsByCountry: Record<CountryKey, Flight[]> = {} as Record<CountryKey, Flight[]>;

  countries.forEach((key) => {
    const flights = flightsByCountry[key] || [];
    totalPagesByCountry[key] = Math.ceil(flights.length / perPage);
    const start = (page - 1) * perPage;
    paginatedFlightsByCountry[key] = flights.slice(start, start + perPage);
  });

  const errorMessage: string | null = null;

  return (
    <div className="container py-12 space-y-6">
      {errorMessage && <ClientToastWrapper message={errorMessage} />}

      <div className="space-y-6">
        <h1 className="text-4xl font-semibold text-center text-gray-900 dark:text-gray-100">
          {dictionary["flights_title"]}
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400">
          {dictionary["flights_subtitle"]}
        </p>
      </div>

      <Tabs defaultValue={countries[0]}>
        <TabsList className="w-full h-auto gap-1 border-2 border-slate-200 dark:border-slate-700 p-0 bg-transparent flex-wrap">
          {countries.map((key) => {
            const countryName = lang === "en" ? countryConfig[key].en : countryConfig[key].ka;
            const icon = countryConfig[key].icon;
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="flex items-center gap-2 px-12 h-full border-2 border-gray-200 dark:border-gray-700 
                           bg-slate-200 dark:bg-gray-800 
                           text-black dark:text-gray-200
                           data-[state=active]:text-white data-[state=active]:bg-space-blue-light dark:data-[state=active]:bg-space-blue-light/50 min-h-16"
              >
                <Image
                  src={icon}
                  alt={countryName}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                {countryName}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {countries.map((key) => (
          <TabsContent key={key} value={key}>
            <FlightsTable data={allFlights} />
            <div className="mt-4">
              <Pagination currentPage={page} totalPages={totalPagesByCountry[key]} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Flights;
