"use server";

import { unstable_cache as cache } from "next/cache";
import { revalidateTag } from "next/cache";

interface Product {
  name: string;
  id: number;
}

export const getProducts = cache(
  async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: "Product A", id: 1 },
          { name: "Product B", id: 2 },
          { name: "Product C", id: 3 },
        ]);
      }, 2000);
    });
  },
  ["products-cache-key"],
  {
    revalidate: 60,
  }
);
