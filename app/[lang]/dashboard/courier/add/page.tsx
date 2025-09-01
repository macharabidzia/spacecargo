import { getCourierParcels } from "@/actions/courier.actions";
import NotificationClientHandler from "@/components/common/handlers/NotificationClientHandler";
import AddCourierSection from "@/components/features/dashboard/courier/AddCourierSection";
import GoBackButton from "@/components/features/not-found/GoBackButton";

const Add = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const DEFAULT_PAGE_SIZE = 10;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const perPage =
    typeof params?.perPage === "string"
      ? parseInt(params.perPage)
      : DEFAULT_PAGE_SIZE;
  const tdsCode = typeof params.tds_code === "string" ? params.tds_code : "";
  const result = await getCourierParcels(page, perPage, tdsCode);
  const TABLE_UNIQUE_ID = "couriersTableAdd";
  return (
    <>
      <div className="p-4">
        <GoBackButton />
      </div>
      <NotificationClientHandler title={result?.notification?.notification_title } message={result?.notification?.notification_desc}/>
      <AddCourierSection
        tableId={TABLE_UNIQUE_ID}
        data={result.parcels}
        pageSize={perPage}
        currentPage={page}
        recordsNumber={5}
      />
    </>
  );
};

export default Add;
