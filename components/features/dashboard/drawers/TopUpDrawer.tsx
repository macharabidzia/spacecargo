"use client";
import { fillBalance } from "@/actions/courier.actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import CardSvg from '@/public/icons/card.svg';
import BogSvg from '@/public/icons/bog.svg';
import TbcSvg from '@/public/icons/tbc.svg';
import IconInput from "@/components/common/IconInput";
import { Wallet } from "lucide-react";

interface TopUpDrawerProps {
  onClose: () => void;
  open: boolean;
}

export default function TopUpDrawer({ onClose, open }: TopUpDrawerProps) {
  const [selectedBank, setSelectedBank] = useState<"BOG" | "TBC">("BOG");

  const handleSubmit = async (formData: FormData) => {
    const amount = formData.get('amount') as string;
    const res = await fillBalance({
      bankType: selectedBank,
      amount: amount,
      fillType: 'card',
      language: 'ge'
    });
    if (res && res.message) {
      window.open(res.message);
      onClose();
    }
  }

  const bankBaseClasses = "bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 flex flex-col gap-2 flex-1 h-full items-center justify-center rounded-lg shadow-sm  hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors p-2";
  const selectedClass = "ring-2 ring-offset-2 ring-blue-500 shadow-md";

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-[450px] sm:w-[500px]">
        <form action={handleSubmit}>
          <SheetHeader>
            <SheetTitle>ბალანსის შევსება</SheetTitle>
            <SheetDescription>აირჩიეთ გადახდის ტიპი</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-5 px-4 py-6">
            <div className="bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 flex flex-row gap-4 min-h-14 h-full items-center justify-center rounded-lg shadow-sm  hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <CardSvg className="text-blue-500 h-6 w-6" />
              <p className="">ბარათით შევსება</p>
            </div>
            <div className="flex flex-row gap-4 min-h-24 h-full">
              {/* BOG Bank Selection */}
              <div
                className={`${bankBaseClasses} ${selectedBank === "BOG" ? selectedClass : ""}`}
                onClick={() => setSelectedBank("BOG")}
              >
                <BogSvg className="w-full h-20" />
              </div>
              <div
                className={`${bankBaseClasses} ${selectedBank === "TBC" ? selectedClass : ""}`}
                onClick={() => setSelectedBank("TBC")}
              >
                <TbcSvg className="w-full h-20" />
              </div>
            </div>
            <Label
              htmlFor="amount"
              className="text-gray-700 dark:text-gray-300 font-semibold"
            >
              თანხა
            </Label>
            <IconInput Icon={Wallet} id="amount" name="amount" placeholder="500$"
              className="min-h-14 h-full border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 pl-9" />
        
          </div>
          <SheetFooter className="flex flex-row justify-between gap-4 p-4">
            <SheetClose asChild>
              <Button
                className="min-h-14 h-full flex-1  bord er border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                variant="outline"
                onClick={onClose}
              >
                გაუქმება
              </Button>
            </SheetClose>
            <Button
              className="min-h-14 h-full flex-1 bg-blue-600 hover:bg-blue-700 text-white "
              type="submit"
            >
              {"ბალანსის შევსება"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}