import { getCashbackTransactions } from "@/actions/cashback.actions";
import CashbackTableClient from "@/components/features/cashback/CashbackTableClient";
import { Card, CardContent } from "@/components/ui/card";
const DEFAULT_PAGE_SIZE = 5;
export const metadata = {
  robots: {
    title:"Cashbacks Page",
    index: false,
    follow: true,
  },
};
const CashbacksPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const perPage =
    typeof params?.perPage === "string"
      ? parseInt(params.perPage)
      : DEFAULT_PAGE_SIZE;
  const result = await getCashbackTransactions(page, perPage);
  const TABLE_UNIQUE_ID = "notificationsTable";
  return (
    <div className="container mt-10">
      <Card className="p-0">
        <CardContent className="p-0 pb-8">
          <CashbackTableClient
            paramName="tds_code"
            tableId={TABLE_UNIQUE_ID}
            data={result.type === "success" ? result.data ?? [] : []}
            pageSize={perPage}
            currentPage={page}
            recordsNumber={
              result.type === "success" ? result.data?.length ?? 0 : 0
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CashbacksPage;
