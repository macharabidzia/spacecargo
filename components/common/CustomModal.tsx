import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, TriangleAlert } from "lucide-react";

type EmailConfirmationModal = {
  isOpen: boolean;
};

export default function EmailConfirmationModal({
  isOpen,
}: EmailConfirmationModal) {
  return (
    <Dialog defaultOpen={isOpen}>
      <DialogContent className="w-full lg:min-w-[856px] py-0 my-0 space-y-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-space-blue mt-6">
            დაადასტურეთ თქვენი ელ-ფოსტის მისამართი
          </DialogTitle>
          <DialogDescription>
            შეამოწმეთ თქვენი ელ-ფოსტა და დაადასტურეთ რეგისტრაციის პროცესი
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-5 items-center">
          <Mail size={40} />
          <p>
            გთხოვთ, დაადასტუროთ თქვენთან გადმოგზავნილი ელ.ფოსტა
            (zurabablu@gmail.com) და გააქტიუროთ თქვენი პროფილი მიღებულ ბმულზე
            ,,დადასტურების”ღილაკზე დაჭერით.
          </p>
        </div>
        <DialogFooter>
          <div className="bg-space-blue px-4 rounded-md py-10">
            <div className="flex flex-row gap-5 items-center text-white">
              <TriangleAlert className="text-red-500" size={60} />
              <p>
                გთხოვთ, დაადასტუროთ თქვენთან გადმოგზავნილი ელ.ფოსტა
                (zurabablu@gmail.com) და გააქტიუროთ თქვენი პროფილი მიღებულ
                ბმულზე ,,დადასტურების”ღილაკზე დაჭერით.
              </p>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
