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
  FormLabel, // Added FormLabel
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { getContactFormFields } from "@/lib/form/contact.fields"; // Import your contact form fields
import { ContactFormSchema, ContactFormValues } from "@/schemas/contact.schema";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const { t } = useClientTranslation("common"); // Or use "contact" namespace if you prefer

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema(t)), // Use ContactFormSchema
    defaultValues: {
      // Set default values for all contact form fields
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const formFields = getContactFormFields(t); // Pass t to get translated placeholders/labels

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 ${
          className || ""
        }`} // Grid for 2 columns
      >
        {formFields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem className={fieldConfig.colSpan}>
                {fieldConfig.labelKey && (
                  <FormLabel>{t(fieldConfig.labelKey)}</FormLabel>
                )}
                <FormControl>
                  <div className="relative flex items-center">
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
                        className={`min-h-[100px] bg-gray-100 border-gray-300 focus:border-blue-500 focus-visible:ring-offset-0 focus-visible:ring-0 resize-y`}
                      />
                    ) : (
                      <Input
                        type={fieldConfig.type}
                        placeholder={t(fieldConfig.placeholderKey)}
                        {...field}
                        className={`h-14 bg-gray-100 border-gray-300 focus:border-blue-500 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                          fieldConfig.prefix ? "pl-[90px]" : "" // Adjust padding for prefix
                        }`}
                      />
                    )}
                  </div>
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-fit h-12 bg-space-blue cursor-pointer hover:bg-indigo-800 text-white font-semibold rounded-md col-span-full mt-4" // Button spans full width
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
