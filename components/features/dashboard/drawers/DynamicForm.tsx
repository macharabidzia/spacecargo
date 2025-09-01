"use client";

import IconInput from "@/components/common/IconInput";
import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useClientTranslation } from "@/i18n/i18n-provider";
import CustomSelect from "@/components/common/CustomSelect";
import CustomFileUpload from "@/components/common/CustomFileUpload";
import { useServerAction } from "@/hooks/useServerAction";
import { getCategories, getDepartments } from "@/actions/parcel.actions";
import { FormFieldConfig } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Department } from "@/types/user";
import * as z from "zod";

interface DynamicFormProps<T extends z.ZodTypeAny> {
  schema: T;
  initialData?: Partial<z.infer<T>>;
  onSubmit: (values: z.infer<T>) => void;
  onClose: () => void;
  fields: FormFieldConfig[];
}

export default function DynamicForm<T extends z.ZodTypeAny>({
  schema,
  initialData,
  onSubmit,
  onClose,
  fields,
}: DynamicFormProps<T>) {
  const { t } = useClientTranslation();

  const {
    data: categories,
    isPending: isLoadingCategories,
    execute: executeGetCategories,
  } = useServerAction(getCategories);

  const {
    data: departments,
    isPending: isLoadingDepartments,
    execute: executeGetDepartments,
  } = useServerAction(getDepartments);

  useEffect(() => {
    executeGetCategories();
    executeGetDepartments();
  }, [executeGetCategories, executeGetDepartments]);

  const categoryOptions = categories
    ? categories.map((category) => ({
      value: category.id.toString(),
      label: category.value,
    }))
    : [];

  const departmentOptions =
    departments
      ? departments.map((department: Department) => ({
        value: department.id.toString(),
        label: department.address,
      }))
      : [];

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: (initialData as z.infer<T>) || ({} as z.infer<T>),
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialData && categories && departments) {
      form.reset(initialData);
    }
  }, [initialData, categories, departments, form]);
  useEffect(() => {
    console.log("Current errors:", form.formState.errors);
  }, [form.formState.errors]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-8 flex-grow overflow-y-auto px-1"
      >
        {fields.map((fieldConfig) => {
          const isSelectCategory = fieldConfig.name === "categoryId";
          const isSelectDepartment = fieldConfig.name === "departmentId";

          if (isSelectCategory || isSelectDepartment) {
            const options = isSelectCategory
              ? categoryOptions
              : departmentOptions;
            const loading = isSelectCategory
              ? isLoadingCategories
              : isLoadingDepartments;
            const placeholder = isSelectCategory
              ? t("აირჩიე კატეგორია")
              : t("აირჩიე დეპარტამენტი");

            return (
              <FormField
                key={fieldConfig.name}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t(fieldConfig.labelKey)}
                    </FormLabel>
                    <FormControl>
                      <CustomSelect
                        name={fieldConfig.name}
                        options={options}
                        placeholder={loading ? t("loading") : placeholder}
                        className="w-full py-3.5"
                        disabled={loading}
                        value={field.value?.toString()}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          return (
            <FormField
              key={fieldConfig.name}
              name={fieldConfig.name}
              render={({ field }) => (
                <FormItem
                  className={
                    fieldConfig.type === "checkbox"
                      ? "flex flex-row items-center space-x-3 space-y-0 rounded-md border"
                      : ""
                  }
                >
                  {fieldConfig.type !== "checkbox" && (
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t(fieldConfig.labelKey)}
                    </FormLabel>
                  )}
                  <FormControl>
                    {fieldConfig.type === "textarea" ? (
                      <Textarea
                        id={String(fieldConfig.name)}
                        readOnly={fieldConfig.readOnly}
                        placeholder={t(fieldConfig.placeholderKey ?? "")}
                        className="w-full h-28 resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3"
                        {...field}
                        value={field.value || ""}
                      />
                    ) : fieldConfig.type === "file" ? (
                      <CustomFileUpload
                        id={String(fieldConfig.name)}
                        multiple={true}
                        onChange={field.onChange}
                        value={
                          Array.isArray(field.value)
                            ? field.value.map(f => f.url || f)
                            : []
                        }
                      />
                    ) : fieldConfig.type === "checkbox" ? (
                      <Checkbox
                        id={String(fieldConfig.name)}
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        disabled={fieldConfig.readOnly}
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
                          placeholder={t(fieldConfig.placeholderKey ?? "")}
                          type={fieldConfig.type}
                          readOnly={fieldConfig.readOnly}
                          {...field}
                          value={
                            field.value !== undefined && field.value !== null
                              ? field.value
                              : ""
                          }
                        />
                      </div>
                    )}
                  </FormControl>
                  {fieldConfig.type === "checkbox" && (
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t(fieldConfig.labelKey)}
                      </FormLabel>
                      {fieldConfig.placeholderKey && (
                        <SheetDescription className="text-sm text-gray-500 dark:text-gray-400">
                          {t(fieldConfig.placeholderKey)}
                        </SheetDescription>
                      )}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <SheetFooter className="px-0 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
          <SheetClose asChild>
            <Button
              className="min-h-12 h-auto flex-1  border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-sm transition-all duration-200"
              variant="outline"
              onClick={onClose}
            >
              {t("cancel")}
            </Button>
          </SheetClose>
          <Button
            type="submit"
            className="min-h-12 h-auto flex-1  bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all duration-200 disabled:bg-blue-400"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? t("submitting")
              : t("declaration.submitButton")}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
