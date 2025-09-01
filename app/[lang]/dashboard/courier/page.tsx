import { getRequests } from "@/actions/courier.actions";
import CourierTableClient from "@/components/features/dashboard/courier/CourierTableClient";
import React from "react";
const DEFAULT_PAGE_SIZE = 10;
const ArrivedPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const perPage = typeof params?.perPage === 'string' ? parseInt(params.perPage) : DEFAULT_PAGE_SIZE;
  const tdsCode = typeof params.tds_code === 'string' ? params.tds_code : '';
  const result = await getRequests(page, perPage, tdsCode);
  const TABLE_UNIQUE_ID = "couriersTable"
  return (

    <CourierTableClient
      paramName="tds_code"
      tableId={TABLE_UNIQUE_ID}
      data={result}
      pageSize={perPage}
      currentPage={page}
      recordsNumber={5}
    />

  );
};

export default ArrivedPage;