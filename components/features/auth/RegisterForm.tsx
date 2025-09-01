"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { BaseRegisterSchema, BaseRegisterValues } from "@/schemas/auth.schema";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { useServerAction } from "@/hooks/useServerAction";
import { register } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { FormFieldConfig } from "@/lib/form/register.fields";
import { countries } from "country-data-list";
import CustomSelect from "@/components/common/CustomSelect";

type RegisterFormProps = {
  fields: FormFieldConfig<keyof BaseRegisterValues>[];
};

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  ioc: string;
  languages: string[];
  name: string;
  status: string;
  emoji?: string;
}

export function RegisterForm({ fields }: RegisterFormProps) {
  const { t } = useClientTranslation();
  const router = useRouter();
  const { isPending, execute } = useServerAction(register);

  const countriesArray: Country[] = Object.values(countries.all)
    .filter((c: Country) => c.countryCallingCodes.length > 0)
    .map((c: Country) => c);

  const form = useForm<BaseRegisterValues>({
    resolver: zodResolver(BaseRegisterSchema(t)),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      terms_accepted: false,
      user_type: "physical",
      country_code: countriesArray[0]?.countryCallingCodes[0] || "+995",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (values: BaseRegisterValues) => {
    const payload = {
      ...values,
      language: "GE",
      personal_data_flag: "Y",
      personal_data_contract_url:
        "https://www.spacecargo.ge/controler/registration/contracts/Privacy_Policy_GE.pdf; https://www.spacecargo.ge/controler/registration/contracts/Agreement_GEO.pdf",
    };
    const dt = await execute(payload);
    if (dt.type === "success") {
      router.push(`register/verify?user_id=${dt.message.user_id}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* User type tabs */}
        <FormField
          control={form.control}
          name="user_type"
          render={({ field }) => (
            <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
              <TabsList className="flex h-12 w-full gap-2 p-1 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <TabsTrigger
                  value="physical"
                  className="flex-1 text-center py-2 rounded-lg font-medium
                 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700
                 dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-blue-300"
                >
                  {t("auth.userType.physical")}
                </TabsTrigger>
                <TabsTrigger
                  value="legal"
                  className="flex-1 text-center py-2 rounded-lg font-medium
                 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700
                 dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-blue-300"
                >
                  {t("auth.userType.legal")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {fields.map((fieldConfig) => {
            if (fieldConfig.name === "phone") {
              return (
                <div key="phone" className={fieldConfig.colSpan}>
                  <div className="flex gap-3">
                    <FormField
                      control={form.control}
                      name="country_code"
                      render={({ }) => (
                        <FormItem>
                          <FormControl>
                            <CustomSelect
                              name="country_code"
                              options={countriesArray.map((c) => ({
                                value: `${c.countryCallingCodes[0]}-${c.alpha2}`,
                                label: (
                                  <span className="flex items-center gap-2">
                                    <span>{c.emoji}</span>
                                    <span className="text-gray-600 dark:text-gray-300">{c.countryCallingCodes[0]}</span>
                                  </span>
                                ),
                              }))}
                              value={`${form.getValues("country_code")}-${countriesArray.find(
                                (c) => c.countryCallingCodes[0] === form.getValues("country_code")
                              )?.alpha2}`}
                              onChange={(val) => {
                                const code = val.split("-")[0];
                                form.setValue("country_code", code);
                              }}
                              className="w-36 h-12"
                            />
                          </FormControl>
                 
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder={t(fieldConfig.placeholderKey)}
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="h-12 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </FormControl>
                          <div className="h-5">
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            }
            return (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem className={fieldConfig.colSpan}>
                    <FormControl>
                      <Input
                        type={fieldConfig.type}
                        placeholder={t(fieldConfig.placeholderKey)}
                        {...field}
                        value={field.value as string}
                        className="h-12 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <div className="h-5">
                      <FormMessage className="text-red-500 dark:text-red-400" />
                    </div>
                  </FormItem>
                )}
              />
            );
          })}
        </div>

        {/* Terms checkbox */}
        <FormField
          control={form.control}
          name="terms_accepted"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3">
              <FormControl>
                <Checkbox
                  id="terms_accepted"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <div className="flex flex-col">
                <FormLabel
                  htmlFor="terms_accepted"
                  className="text-sm text-gray-700 dark:text-gray-300 "
                >
                  {t("auth.termsAccepted")}
                </FormLabel>
            
              </div>
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg text-base"
          disabled={isPending}
        >
          {isPending ? t("auth.registering") : t("auth.registerButton")}
        </Button>
      </form>
    </Form>
  );
}
