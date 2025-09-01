import { getShops } from "@/actions/shop.actions";
import Pagination from "@/components/common/Pagination";
import List from "@/components/features/shops/List";
import { Card, CardContent } from "@/components/ui/card";

type IShops = {
  searchParams: Promise<{ page: string, perPage: string }>
}
const Shops = async ({ searchParams }: IShops) => {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const perPage = typeof params?.perPage === 'string' ? parseInt(params.perPage) : 5;
  const result = await getShops(page, perPage)
  console.log(result)
  const totalPages = Math.ceil((result?.data.length || 0) / perPage);
  return (
    <div className="container py-20">
      <Card className="bg-background p-0">
        <CardContent className="p-0 m-0">
          <List data={result.data} />
          <div className="pt-4 pb-12 flex justify-center">
            <Pagination totalPages={totalPages} currentPage={page} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Shops;
