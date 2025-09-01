import { getUserNotifications } from "@/actions/user.actions";
import NotificationsTableClient from "@/components/features/notifications/NotificationsTableClient";
import { Card, CardContent } from "@/components/ui/card";
const DEFAULT_PAGE_SIZE = 5;
export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};
const NotificationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const perPage = typeof params?.perPage === 'string' ? parseInt(params.perPage) : DEFAULT_PAGE_SIZE;
  const result = await getUserNotifications(page, perPage);
  const TABLE_UNIQUE_ID = "notificationsTable"
  return (
    <div className="container mt-10">
      <Card className="p-0">
        <CardContent className="p-0 pb-8">
          <NotificationsTableClient
            tableId={TABLE_UNIQUE_ID}
            data={result.messages}
            pageSize={result.perPage}
            currentPage={page}
            recordsNumber={result.recordsNumber}
          />
        </CardContent>
      </Card>
    </div>

  );
};

export default NotificationsPage;