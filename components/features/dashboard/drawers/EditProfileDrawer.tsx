// components/EditDeclarationDrawer.tsx
"use client";

import IconInput from "@/components/common/IconInput";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { declarationFields } from "@/lib/form/declaration.fields";
import { DeclarationSchema } from "@/schemas/declaration.schema";
import { Textarea } from "@/components/ui/textarea";
import { useClientTranslation } from "@/i18n/i18n-provider";

export type DeclarationFormValues = z.infer<typeof DeclarationSchema>;

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
  /** Build default values from config + optional initialData */
  const defaultValues = React.useMemo<DeclarationFormValues>(() => {
    return declarationFields.reduce((acc, f) => {
      acc[f.name] =
        (initialData?.[f.name as keyof DeclarationFormValues] as any) ??
        f.value ??
        "";
      return acc;
    }, {} as DeclarationFormValues);
  }, [initialData]);

  const form = useForm<DeclarationFormValues>({
    resolver: zodResolver(DeclarationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (values: DeclarationFormValues) => {
    console.log("Declaration updated:", values);
    alert("დეკლარაცია განახლდა წარმატებით! ✨");
    onClose();
    form.reset(values);
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex flex-col">
        <SheetHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <SheetTitle className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {t("declaration.editTitle")}
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400 text-base mt-2">
            {t("declaration.editDescription")}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 py-8 flex-grow overflow-y-auto"
          >
            {declarationFields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof DeclarationFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t(fieldConfig.labelKey)} {/* Use t for label */}
                    </FormLabel>
                    <FormControl>
                      {/* textarea gets its own element; others stay with IconInput */}
                      {fieldConfig.type === "textarea" ? (
                        <Textarea
                          id={String(fieldConfig.name)}
                          readOnly={fieldConfig.readOnly}
                          placeholder={t(fieldConfig.placeholderKey ?? "")} // Use t for placeholder
                          className="w-full h-28 resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3"
                          {...field}
                        />
                      ) : (
                        <div className="relative flex items-center">
                          {fieldConfig.prefix && (
                            <span className="absolute left-3 text-sm text-gray-500">
                              {fieldConfig.prefix}
                            </span>
                          )}
                          <IconInput
                            Icon={fieldConfig.Icon}
                            id={String(fieldConfig.name)}
                            placeholder={t(fieldConfig.placeholderKey ?? "")} // Use t for placeholder
                            type={fieldConfig.type}
                            readOnly={fieldConfig.readOnly}
                            {...field}
                          />
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <SheetFooter className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
              <SheetClose asChild>
                <Button
                  className="min-h-12 h-auto flex-1 cursor-pointer border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-sm transition-all duration-200"
                  variant="outline"
                  onClick={onClose}
                >
                  {t("cancel")}
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="min-h-12 h-auto flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all duration-200 disabled:bg-blue-400"
                disabled={!form.formState.isDirty}
              >
                {t("declaration.name")}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
