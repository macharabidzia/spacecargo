"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  LegalProfileSchema,
  PhysicalProfileSchema,
  RegisterFormValues,
} from "@/schemas/auth.schema";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { useEffect, useMemo, useState } from "react";
import { useServerAction } from "@/hooks/useServerAction";
import { completeRegistration } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { Department } from "@/types/user";
import CustomSelect from "@/components/common/CustomSelect";
import { getUserPartments } from "@/actions/user.actions";
import z from "zod";

type RegisterFormProps<T> = {
  fields: {
    name: Path<T>;
    type: string;
    placeholderKey: string;
    colSpan?: string;
    prefix?: boolean;
  }[];
};

export function CompleteForm({ fields }: RegisterFormProps<keyof RegisterFormValues>) {
  const { t } = useClientTranslation();
  const router = useRouter();
  const [isResident, setIsResident] = useState(true);

  const schema = fields.some((f) => f.name === "first_name_en")
    ? LegalProfileSchema(t)
    : PhysicalProfileSchema(t);

  type FormValues = z.infer<typeof schema>;

  const { isPending, execute } = useServerAction(completeRegistration);
  const { data: departments, execute: executeGetDepartments } =
    useServerAction(getUserPartments);

  useEffect(() => {
    executeGetDepartments();
  }, [executeGetDepartments]);

  const departmentOptions = useMemo(() => {
    if (!Array.isArray(departments)) return [];
    return departments.map((d: Department) => ({
      value: d.id.toString(),
      label: d.name,
    }));
  }, [departments]);

  const genderOptions = useMemo(
    () => [
      { value: "F", label: t("common.genderFemale") },
      { value: "M", label: t("common.genderMale") },
    ],
    [t]
  );

const defaultValues: FormValues = fields.reduce((acc, field) => {
  (acc[field.name as keyof FormValues] as string) = "";
  return acc;
}, {} as FormValues);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const handleSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      is_resident: isResident,
      country_code: "+995",
      language: "GE",
      personal_data_flag: "Y",
      personal_data_contract_url:
        "https://www.spacecargo.ge/controler/registration/contracts/Privacy_Policy_GE.pdf; https://www.spacecargo.ge/controler/registration/contracts/Agreement_GEO.pdf",
    };
    const dt = await execute(payload);
    if (dt.type === "success") router.push(`/register/address`);
  };

  const commonInputClasses =
    "h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus-visible:ring-0 text-gray-900 dark:text-gray-100";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 pt-6">
        <div className="w-full">
          <Tabs
            value={isResident ? "resident" : "non_resident"}
            onValueChange={(v) => setIsResident(v === "resident")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 p-1 h-auto bg-transparent gap-4">
              <TabsTrigger
                value="resident"
                className="data-[state=active]:bg-space-blue-light/25 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-blue-200 py-2.5 "
              >
                რეზიდენტი
              </TabsTrigger>
              <TabsTrigger
                value="non_resident"
                className="data-[state=active]:bg-space-blue-light/25 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-blue-200 py-2.5 "
              >
                უცხოელი
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
          {fields.map((fieldConfig) => (
            <FormField
              key={String(fieldConfig.name)}
              control={form.control}
              name={fieldConfig.name as Path<FormValues>}
              render={({ field }) => (
                <FormItem className={fieldConfig.colSpan}>
                  <FormControl>
                    {field.name === "department_id" ? (
                      <CustomSelect
                        className="w-full py-5.5 bg-space-muted text-space-blue placeholder:text-gray-400 text-sm"
                        name={fieldConfig.name as string}
                        options={departmentOptions}
                        onChange={field.onChange}
                        value={String(field.value ?? "")}
                      />
                    ) : field.name === "gender" ? (
                      <CustomSelect
                        className="w-full py-5.5 bg-space-muted text-space-blue placeholder:text-gray-400 text-sm"
                        name={fieldConfig.name as string}
                        options={genderOptions}
                        onChange={field.onChange}
                        value={String(field.value ?? "")}
                      />
                    ) : (
                      <Input
                        
                        type={fieldConfig.type}
                        placeholder={t(fieldConfig.placeholderKey)}
                        {...field}
                        value={String(field.value)}
                        className={commonInputClasses}
                      />
                    )}
                  </FormControl>
                  <div className="h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-base"
          disabled={isPending}
        >
          {isPending ? t("auth.registering") : t("auth.registerButton")}
        </Button>
      </form>
    </Form>
  );
}

export default CompleteForm;
