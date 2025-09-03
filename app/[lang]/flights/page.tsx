import { getFlights } from "@/actions/common.actions";
import FlightsTable from "@/components/features/flights/FlightsTable";
import Pagination from "@/components/common/Pagination";
import ClientToastWrapper from "@/components/common/ClientToastWrapper";
import { getDictionary } from "@/i18n/dictionaries";

type Lang = "en" | "ka";

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
      ? Math.min(parseInt(awaitedSearchParams.perPage, 10), DEFAULT_PAGE_SIZE)
      : DEFAULT_PAGE_SIZE;

  const dictionary = (await getDictionary(lang)).common;
  const allFlights: Flight[] = await getFlights();

  const totalPages = Math.ceil(allFlights.length / perPage);
  const start = (page - 1) * perPage;
  const paginatedFlights = allFlights.slice(start, start + perPage);

  const errorMessage = paginatedFlights.length === 0 ? "ფრენების ჩატვირთვა ვერ მოხერხდა." : null;

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

      <FlightsTable data={paginatedFlights} />

      <div className="mt-4">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Flights;
