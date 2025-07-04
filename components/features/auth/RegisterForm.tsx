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
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterFormSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { FormFieldConfig } from "@/lib/form/register.fields";
import { CommonDictionary } from "@/types/dictionary";
import { useClientTranslation } from "@/i18n/i18n-provider";

type RegisterFormProps = {
  fields: FormFieldConfig[];
  type: "legal" | "natural";
  dictionary: CommonDictionary;
};

export function RegisterForm({ fields, type, dictionary }: RegisterFormProps) {
  const initialDefaultValues: RegisterFormValues = {
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    firstName: "",
    lastName: "",
    idNumber: "",
  };

  if (type === "legal") {
    initialDefaultValues.passport = "";
  }
  const { t } = useClientTranslation();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema(t)),
    defaultValues: initialDefaultValues,
    mode: "onBlur",
  });

  const handleInternalSubmit = (values: RegisterFormValues) => {
    console.log("Registration submitted from RegisterForm:", values);
    alert(t("auth.registerSuccessMessage"));
    form.reset();
  };

  const commonInputClasses =
    "h-12 bg-gray-50 border-gray-200 rounded-md focus:border-blue-500 focus-visible:ring-offset-0 focus-visible:ring-0";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleInternalSubmit)}
        className="space-y-5 pt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {fields.map((fieldConfig) => (
            <FormField
              key={fieldConfig.name}
              control={form.control}
              name={fieldConfig.name}
              render={({ field }) => (
                <FormItem className={fieldConfig.colSpan}>
                  <FormControl>
                    <div className="relative flex items-center">
                      {fieldConfig.prefix && (
                        <div className="flex items-center justify-center h-12 px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                          <span role="img" aria-label={t("common.georgiaFlag")}>
                            🇬🇪
                          </span>
                          <span className="ml-2 text-sm text-gray-700">
                            +995
                          </span>
                        </div>
                      )}
                      <Input
                        type={fieldConfig.type}
                        placeholder={t(fieldConfig.placeholderKey)}
                        {...field}
                        className={`${commonInputClasses} ${
                          fieldConfig.prefix ? "rounded-l-none" : ""
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
        </div>

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 pt-2">
              <FormControl>
                <Checkbox
                  id="termsAccepted"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                />
              </FormControl>
              <div className="grid gap-1.5 leading-none">
                <FormLabel
                  htmlFor="termsAccepted"
                  className="text-sm font-normal text-gray-600 cursor-pointer"
                >
                  {t("auth.termsAccepted")}
                </FormLabel>
                <div className="h-5">
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-base"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? dictionary["auth.registering"]
            : t("auth.registerButton")}
        </Button>
      </form>
    </Form>
  );
}
