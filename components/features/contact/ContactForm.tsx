"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { getContactFormFields } from "@/lib/form/contact.fields";
import {
  ContactFormSchema,
  ContactFormValues,
} from "@/schemas/contact.schema";
import { Textarea } from "@/components/ui/textarea";
import { useServerAction } from "@/hooks/useServerAction";
import { contact } from "@/actions/common.actions";

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const { t } = useClientTranslation("common");
  const { execute } = useServerAction(contact);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema(t)),
    defaultValues: {
      "contact-name": "",
      "contact-email": "",
      "contact-subject": "",
      "contact-message": "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactFormValues) => {
    execute(values)
    form.reset();
  };

  const formFields = getContactFormFields();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 ${className || ""}`}
      >
        {formFields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name as keyof ContactFormValues}
            render={({ field }) => (
              <FormItem className={fieldConfig.colSpan}>
                {fieldConfig.labelKey && (
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    {t(fieldConfig.labelKey)}
                  </FormLabel>
                )}
                <FormControl>
                  <div className="relative flex items-center w-full">
                    {fieldConfig.prefix && (
                      <div className="absolute left-0 h-full flex items-center z-10">
                        {fieldConfig.prefix}
                      </div>
                    )}
                    {fieldConfig.type === "textarea" ? (
                      <Textarea
                        placeholder={t(fieldConfig.placeholderKey)}
                        rows={fieldConfig.rows}
                        {...field}
                        className="min-h-[100px] w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-y"
                      />
                    ) : (
                      <Input
                        type={fieldConfig.type}
                        placeholder={t(fieldConfig.placeholderKey)}
                        {...field}
                        className={`h-14 w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 ${fieldConfig.prefix ? "pl-[90px]" : ""
                          }`}
                      />
                    )}
                  </div>
                </FormControl>
                <div className="h-5">
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </div>
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-fit h-12 bg-space-blue hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold rounded-md col-span-full mt-4"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? t("contact.sendingMessage")
            : t("contact.sendMessageButton")}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
