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
import { useRouter } from "next/navigation";

export default function TopUpDrawer() {
  const router = useRouter();
  return (
    <Sheet onOpenChange={() => router.back()} defaultOpen={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>ბალანსის შევსება</SheetTitle>
          <SheetDescription>აირჩიეთ გადახდის ტიპი</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 px-4">
          <div className="bg-slate-300 flex flex-row gap-4 min-h-14 h-full items-center justify-center rounded-sm">
            <CalendarFold />
            <p>ბარათით შევსება</p>
          </div>
          <div className="flex flex-row gap-2 min-h-24 h-full">
            <div className="bg-slate-300 flex flex-row gap-4 flex-1 h-full items-center justify-center rounded-sm">
              <CalendarFold />
              <p className="text-xs">ბარათით შევსება</p>
            </div>
            <div className="bg-slate-300 flex flex-row gap-4 flex-1 h-full items-center justify-center rounded-sm">
              <CalendarFold />
              <p className="text-xs">ბარათით შევსება</p>
            </div>
          </div>
          <Label>თანხა</Label>
          <Input placeholder="500$" className="min-h-14 h-full" />
        </div>
        <SheetFooter className="flex flex-row justify-between">
          <SheetClose asChild>
            <Button className="min-h-14 h-full bg-background flex-1 cursor-pointer" variant="outline" >გაუქმება</Button>
          </SheetClose>
          <Button className="min-h-14 h-full flex-1 bg-space-blue-light cursor-pointer" type="submit">ბალანსის შევსება</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
