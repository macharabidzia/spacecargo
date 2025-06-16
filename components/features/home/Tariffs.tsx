import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const tariffsData = [
  {
    country: "აშშ",
    importMethod: "საჰაერო",
    pricePerKg: "8.50$",
    oversizeWeight: "დიახ",
    image: "/icons/usa.svg",
  },
  {
    country: "ჩინეთი",
    importMethod: "საჰაერო",
    pricePerKg: "6.00$",
    oversizeWeight: "არა",
    image: "/icons/china.svg",
  },
  {
    country: "დუბაი",
    importMethod: "საჰაერო",
    pricePerKg: "9.20$",
    oversizeWeight: "დიახ",
    image: "/icons/uae.svg",
  },
  {
    country: "დიდი ბრიტანეთი",
    importMethod: "საჰაერო",
    pricePerKg: "7.80$",
    oversizeWeight: "არა",
    image: "/icons/england.svg",
  },
  {
    country: "თურქეთი",
    importMethod: "სახმელეთო",
    pricePerKg: "4.50$",
    oversizeWeight: "დიახ",
    image: "/icons/turkey.svg",
  },
  {
    country: "საბერძნეთი",
    importMethod: "სახმელეთო",
    pricePerKg: "5.00$",
    oversizeWeight: "არა",
    image: "/icons/greece.svg",
  },
  {
    country: "ჰონგ კონგი",
    importMethod: "საჰაერო",
    pricePerKg: "10.00$",
    oversizeWeight: "დიახ",
    image: "/icons/honk.svg",
  },
];

const Tariffs: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({}) => {
  return (
    <section className="mt-20 space-y-6">
      <h1 className="text-4xl font-bold text-center text-foreground">ტარიფები</h1>
      <p className="text-center text-foreground/60">
        გაიგე ზუსტად რას გადაიხდი — გამჭვირვალე და კონკურენტული ფასები
      </p>
      <Tabs defaultValue="account">
        <TabsList className="w-full h-16 border p-0 ">
          <TabsTrigger
            className="text-gray-100 h-full data-[state=active]:bg-space-blue-light data-[state=active]:shadow-none"
            value="account"
          >
            ფიზიკური პირი
          </TabsTrigger>
          <TabsTrigger
            className="text-gray-400 h-full data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="account"
          >
            იურიდიული პირი
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="shadow-md rounded-lg overflow-hidden">
            <Table className="rounded-lg">
              <TableHeader className="bg-space-blue-light rounded-t-lg hidden md:table-header-group">
                <TableRow>
                  <TableHead className="p-4 text-white">ქვეყანა</TableHead>
                  <TableHead className="p-4 text-gray-100">
                    იმპორტი საქართველოში
                  </TableHead>
                  <TableHead className="p-4 text-gray-100">ფასი(1კგ)</TableHead>
                  <TableHead className="text-right p-4 text-gray-100">
                    არაგაბარიტული წონა
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-background space-y-4">
                {tariffsData.map((tariff) => (
                  <TableRow
                    key={tariff.country}
                    className="block mb-4 p-4 border border-gray-200 rounded-lg md:table-row md:mb-0 md:p-0 md:border-b md:border-none"
                  >
                    <TableCell className="block px-0 py-1 text-gray-700 md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        ქვეყანა:
                      </span>
                      <div className="inline-block md:block text-lg text-foreground">
                        <div className="flex flex-row gap-4 items-center">
                          <Image width={20} height={20} alt="tariff name" className="w-5 h-5" src={tariff.image} />
                          <span>{tariff.country}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="block px-0 py-1 text-foreground md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        იმპორტი საქართველოში:
                      </span>
                      <span className="inline-block md:block text-lg">
                        {tariff.importMethod}
                      </span>
                    </TableCell>
                    <TableCell className="block px-0 py-1 text-foreground md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        ფასი(1კგ):
                      </span>
                      <span className="inline-block md:block text-space-blue-light">
                        {tariff.pricePerKg}
                      </span>
                    </TableCell>
                    <TableCell className="block px-0 py-1 text-right text-foreground md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        არაგაბარიტული წონა:
                      </span>
                      <span className="inline-block md:block text-lg">
                        {tariff.oversizeWeight}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      <br />
    </section>
  );
};

export default Tariffs;
