
import { Shop } from "@/types/shop";
import BrandCard from "./BrandCard";
import Filters from "./Filters";

type IList = {
  data: Shop[];
};
const List = async ({ data }: IList) => {

  const initialSelectedFruit = "banana";

  return (
    <div className="space-y-8">
      <Filters
        initialSelectedFruit={initialSelectedFruit}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-2 lg:px-4">
        {data.map((item) => (
          <BrandCard
            key={item.id}
            logoSrc={item.logoUrl}
            description={item.status}
            href={item.websiteUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
