// components/EditProfileDrawer.tsx
"use client";
import IconInput from "@/components/common/IconInput";
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
import { User, Mail } from "lucide-react"; // Assuming lucide-react is installed

interface EditProfileDrawerProps {
  onClose: () => void;
  open: boolean; // Changed from 'any' to 'boolean' for type safety
}

export default function EditProfileDrawer({
  onClose,
  open,
}: EditProfileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex flex-col">
        <SheetHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <SheetTitle className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            პროფილის რედაქტირება
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400 text-base mt-2">
            განაახლეთ თქვენი პირადი ინფორმაცია. ✨
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-8 flex-grow overflow-y-auto">
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              სახელი
            </Label>
            {/* Using the new IconInput component */}
            <IconInput
              Icon={User} // Pass the Lucide User icon component
              id="name"
              name="name" // Good practice to include for form submission
              placeholder="თქვენი სახელი"
              type="text"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              ელ. ფოსტა
            </Label>
            {/* Using the new IconInput component */}
            <IconInput
              Icon={Mail} // Pass the Lucide Mail icon component
              id="email"
              name="email" // Good practice to include for form submission
              type="email"
              placeholder="თქვენი ელ. ფოსტა"
            />
          </div>
        </div>
        <SheetFooter className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
          <SheetClose asChild>
            <Button
              className="min-h-12 h-auto flex-1 cursor-pointer border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-sm transition-all duration-200"
              variant="outline"
              onClick={onClose}
            >
              გაუქმება
            </Button>
          </SheetClose>
          <Button
            className="min-h-12 h-auto flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            type="submit"
          >
            ცვლილებების შენახვა ✨
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
