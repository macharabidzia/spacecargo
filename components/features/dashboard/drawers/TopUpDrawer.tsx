// components/TopUpDrawer.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CalendarFold } from "lucide-react";

interface TopUpDrawerProps {
  onClose: () => void;
  // Add an `open` prop to explicitly control the Sheet's visibility
  open: boolean;
}

export default function TopUpDrawer({ onClose, open }: TopUpDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>ბალანსის შევსება</SheetTitle>
          <SheetDescription>აირჩიეთ გადახდის ტიპი</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 px-4 py-6">
          <div className="bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 flex flex-row gap-4 min-h-14 h-full items-center justify-center rounded-lg shadow-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <CalendarFold className="text-blue-500" />
            <p className="font-medium">ბარათით შევსება</p>
          </div>
          <div className="flex flex-row gap-4 min-h-24 h-full">
            <div className="bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 flex flex-col gap-2 flex-1 h-full items-center justify-center rounded-lg shadow-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors p-2">
              <CalendarFold className="text-green-500" />
              <p className="text-xs text-center">ბარათით შევსება</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 flex flex-col gap-2 flex-1 h-full items-center justify-center rounded-lg shadow-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors p-2">
              <CalendarFold className="text-purple-500" />
              <p className="text-xs text-center">ბარათით შევსება</p>
            </div>
          </div>
          <Label
            htmlFor="amount"
            className="text-gray-700 dark:text-gray-300 font-semibold"
          >
            თანხა
          </Label>
          <Input
            id="amount"
            placeholder="500$"
            className="min-h-14 h-full border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <SheetFooter className="flex flex-row justify-between gap-4 p-4">
          <SheetClose asChild>
            <Button
              className="min-h-14 h-full flex-1 cursor-pointer bord er border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              variant="outline"
              onClick={onClose}
            >
              გაუქმება
            </Button>
          </SheetClose>
          <Button
            className="min-h-14 h-full flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            type="submit"
          >
            ბალანსის შევსება
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
