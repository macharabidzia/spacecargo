import { getAwaitingParcels } from "@/actions/parcel.actions";
import ParcelsTableClient from "@/components/features/dashboard/parcels/ParcelsTableClient";
import { ParcelApiResponse } from "@/types/parcel";

const DEFAULT_PAGE_SIZE = 10;
export const dynamic = "force-dynamic";

const ReceivablePage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {


    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const perPage = typeof params?.perPage === 'string' ? parseInt(params.perPage) : DEFAULT_PAGE_SIZE;
    const tdsCode = typeof params.tds_code === 'string' ? params.tds_code : '';
    const result: ParcelApiResponse = await getAwaitingParcels(page, perPage, tdsCode);

    const TABLE_UNIQUE_ID = "receivableParcelsTable"
    return (
        <div>
            <ParcelsTableClient
                canDelete={true}
                canEdit={true}
                tableId={TABLE_UNIQUE_ID}
                parcels={result.parcels}
                recordsNumber={result.recordsNumber}
                pageSize={result.perPage}
                currentPage={page}
            />
        </div>
    );
};

export default ReceivablePage;