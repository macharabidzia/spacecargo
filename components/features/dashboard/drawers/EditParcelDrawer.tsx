// components/EditParcelDrawer.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { useSearchParams } from "next/navigation";
import { useServerAction } from "@/hooks/useServerAction";
import { editParcel, getParcel } from "@/actions/parcel.actions";
import { parcelFields } from "@/lib/form/parcel.fields";
import { ParcelFormValues, ParcelSchema } from "@/schemas/parcel.schema";
import DynamicForm from "./DynamicForm";
import { Parcel } from "@/types/parcel";

interface EditParcelDrawerProps {
  onClose: () => void;
  open: boolean;
}

export default function EditParcelDrawer({
  onClose,
  open,
}: EditParcelDrawerProps) {
  const { t } = useClientTranslation();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;

  const { data, execute: executeGetParcel } = useServerAction(getParcel);
  const { execute: executeEditParcel } = useServerAction(editParcel);
  
  useEffect(() => {
    if (id) {
      executeGetParcel(id);
    }
  }, [id, executeGetParcel]);
  const formattedInitialData: Partial<Parcel> | undefined = data
    ? { ...data }
    : undefined;

  const onSubmit = async (values: ParcelFormValues) => {
    const formData = new FormData();
    formData.append("tdsCode", values.tdsCode.toString());
    formData.append("categoryId", values.categoryId.toString());
    formData.append("price", values.declaredAmount.toString());
    formData.append("itemsCount", values.itemsCount.toString());
    formData.append("websiteUrl", values.websiteUrl);
    formData.append("websiteOtp", values.websiteOtp?.toString() ?? "");
    formData.append("comment", values.comment ?? "");
    formData.append("parcelId", id ?? "");
    formData.append("departmentId", values.departmentId.toString() ?? "");
    formData.append("declarationAgreement", values.declarationAgreement ?? "");
    if (values.file && values.file.length > 0) {
      for (const file of values.file) {
        formData.append("file[]", file);
      }
    }
    await executeEditParcel(formData)
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex flex-col">
        <SheetHeader className="pb-4 border-b border-gray-200 dark:border-gray-700 py-4">
          <SheetTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {id ? t("declaration.editTitle") : t("declaration.createTitle")}
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400 text-base mt-2">
            {id
              ? t("declaration.editDescription")
              : t("declaration.createDescription")}
          </SheetDescription>
        </SheetHeader>

        <DynamicForm
          schema={ParcelSchema(t)}
          fields={parcelFields}
          initialData={formattedInitialData}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
