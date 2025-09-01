// components/ChangePasswordForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useClientTranslation } from "@/i18n/i18n-provider";
import {
  changePasswordFormSchema,
  ChangePasswordFormValues,
} from "@/schemas/settings.schema";
import { getChangePasswordFormFields } from "@/lib/form/courier.fields";
import { useServerAction } from "@/hooks/useServerAction";
import { changePassword } from "@/actions/user.actions";
import Loading from "@/components/common/Loading";

const ChangePasswordForm: React.FC = () => {
  const { t } = useClientTranslation();
  const { isPending: isSubmitting, execute: submitChangePassword } =
    useServerAction(changePassword);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema(t)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    submitChangePassword(data);
  };

  const formFields = getChangePasswordFormFields()
  return (
    <div className="w-full mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-y-4"
        >
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof ChangePasswordFormValues}
              render={({ field: formFieldRenderProps }) => (
                <FormItem className={field.colSpan || "col-span-1"}>
                  {field.labelKey && (
                    <FormLabel className="text-gray-700 dark:text-gray-300 mb-2 text-lg font-medium">
                      {t(field.labelKey)}
                    </FormLabel>
                  )}
                  <FormControl>
                    <div className="flex items-center w-full">
                      {field.prefix && field.prefix}
                      <Input
                        type={field.type}
                        placeholder={t(field.placeholderKey)}
                        {...formFieldRenderProps}
                        className={`py-6 bg-space-muted dark:bg-space-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-lg ${
                          field.prefix ? "rounded-l-none" : ""
                        }`}
                      />
                    </div>
                  </FormControl>
                  <div className="h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}

          <div className="col-span-1 flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-auto px-4 py-7 bg-space-blue-muted dark:bg-space-dark-muted hover:bg-space-blue/90 dark:hover:bg-space-dark-muted/90  text-md text-white dark:text-gray-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loading /> : t("submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
