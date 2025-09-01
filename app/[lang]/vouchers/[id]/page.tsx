

import { getBonusPrizes } from "@/actions/bonus.actions";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { VoucherCard } from "@/components/features/vouchers/VoucherCard";
import { Button } from "@/components/ui/button";
import { SwitchCameraIcon } from "lucide-react";
import { BuyVoucherButton } from "@/components/features/vouchers/BuyVoucherButton";
import { fetchUserDashboard } from "@/actions/user.actions";

type Voucher = {
  ID: number;
  Name: string;
  Description: string;
  Main_iamge_url: string;
  Point: string;
};

type IVoucherPage = {
  params: Promise<{ id: number; lang: Lang }>;
};

const VoucherPage = async ({ params }: IVoucherPage) => {
  const { id, lang } = await params;
  const bonues: Voucher[] = await getBonusPrizes();
  const voucherColors = ["#3b82f6", "#22c55e", "#ef4444", "#a855f7"];
  const bonus = bonues.find((bonus) => bonus.ID === Number(id));
  const bonusIndex = bonues.findIndex((bonus) => bonus.ID === Number(id));
  const user = await fetchUserDashboard();

  return (
    <div className="container my-10">
      <Card className="m-0 border border-border shadow-sm">
        <CardContent className="p-4">
          {bonues && bonues.length > 0 ? (
            <div className="flex flex-col gap-6 md:flex-row">
              <VoucherCard
                key={bonus?.ID}
                voucher={bonus!}
                color={voucherColors[bonusIndex]}
                lang={lang}
              />
              <div className="max-w-[601px] space-y-8">
                <h1 className="text-2xl font-semibold text-foreground">
                  SPACE
                </h1>
                <p className="text-muted-foreground text-wrap">
                  ინოვაციური ლოიალურობის პროგრამა სფეის კარგოს
                  მომხმარებლებისათვის...
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No bonus prizes found.
            </p>
          )}
        </CardContent>

        <CardFooter className="bg-muted p-6 m-4 rounded-lg flex lg:flex-row justify-between items-center lg:gap-0 gap-5 flex-col">
          <div className="flex flex-col md:flex-row gap-5 lg:gap-10 items-center justify-center lg:justify-start pb-4 lg:pb-0 lg:border-r border-border border-b lg:border-b-0 flex-1">
            <Button
              variant="outline"
              className="h-12 bg-background text-foreground"
            >
              {bonus?.Description}
            </Button>
            <SwitchCameraIcon className="text-muted-foreground" />
            <Button
              variant="outline"
              className="h-12 bg-background text-foreground"
            >
              {bonus?.Point} სფეის ქულა
            </Button>
          </div>

          {/* Right side */}
          <div className="flex justify-between flex-row gap-5 flex-1 lg:justify-end items-center">
            <Button className="bg-primary text-primary-foreground h-12">
              თქვენი სფეის ქულები:{" "}
              <span className="font-light">{user.bonusPoint}</span>
            </Button>
            <input type="hidden" name="prizeId" value={bonus?.ID} />
            <BuyVoucherButton voucherId={id} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VoucherPage;
