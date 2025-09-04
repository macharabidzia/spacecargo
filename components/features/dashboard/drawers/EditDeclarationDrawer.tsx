"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useEffect } from "react";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { useServerAction } from "@/hooks/useServerAction";
import { createDeclaration } from "@/actions/parcel.actions";
import { declarationFields } from "@/lib/form/declaration.fields";
import {
  DeclarationFormValues,
  DeclarationSchema,
} from "@/schemas/declaration.schema";
import DynamicForm from "./DynamicForm";

interface EditDeclarationDrawerProps {
  onClose: () => void;
  open: boolean;
  initialData?: Partial<DeclarationFormValues>;
}

export default function EditDeclarationDrawer({
  onClose,
  open,
  initialData,
}: EditDeclarationDrawerProps) {
  const { t } = useClientTranslation();
  const { data, execute: executeCreateDeclaration } =
    useServerAction(createDeclaration);
  const onSubmit = async (values: DeclarationFormValues) => {
    const formData = new FormData();
    formData.append("tdsCode", values.tdsCode.toString());
    formData.append("categoryId", values.categoryId.toString());
    formData.append("price", values.price.toString());
    formData.append("itemsCount", values.itemsCount.toString());
    formData.append("websiteUrl", values.websiteUrl);
    formData.append("websiteOtp", values.websiteOtp?.toString() ?? "");
    formData.append("comment", values.comment ?? "");
    if (values.file && values.file.length > 0) {
      for (const file of values.file) {
        formData.append("file[]", file);
      }
    }
    executeCreateDeclaration(formData);
  };
  useEffect(() => {
    if (data && data.type === "success") {
      onClose()
    }
  }, [data, onClose]);

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex flex-col">
        <SheetHeader className="pb-4 border-b border-gray-200 dark:border-gray-700 py-4">
          <SheetTitle className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {t("declaration.editTitle")}
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400 text-base mt-2">
            {t("declaration.editDescription")}
          </SheetDescription>
        </SheetHeader>

        <DynamicForm
          schema={DeclarationSchema(t)}
          fields={declarationFields}
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
