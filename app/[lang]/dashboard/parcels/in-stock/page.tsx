import { getWarehouseParcels } from "@/actions/parcel.actions";
import ParcelsTableClient from "@/components/features/dashboard/parcels/ParcelsTableClient";
import { ParcelApiResponse } from "@/types/parcel";

const DEFAULT_PAGE_SIZE = 3;
export const dynamic = 'force-dynamic'
const InStockPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const perPage = typeof params?.perPage === 'string' ? parseInt(params.perPage, 3) : DEFAULT_PAGE_SIZE;
    const TABLE_UNIQUE_ID = "inStockParcelsTable"
    const result: ParcelApiResponse = await getWarehouseParcels(page, perPage);
    return (
        <ParcelsTableClient
            canEdit={true}
            
            tableId={TABLE_UNIQUE_ID}
            parcels={result.parcels}
            recordsNumber={result.recordsNumber}
            pageSize={result.perPage}
            currentPage={page}

        />
    );
};

export default InStockPage;