"use client";
import { useEffect, useMemo } from "react";
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
  RegisterAddressFormValues,
  registrationAddressSchema,
} from "@/schemas/settings.schema";
import { getAddressFormFields } from "@/lib/form/address.fields";
import CustomSelect from "@/components/common/CustomSelect";
import { useServerAction } from "@/hooks/useServerAction";
import { City } from "@/types/user";
import { addRegistrationAddress } from "@/actions/auth.actions";
import { getUserCities } from "@/actions/user.actions";
import { redirect } from "next/navigation";
const AddressForm = () => {
  const { t } = useClientTranslation();
  const {
    execute: addAddress,
  } = useServerAction(addRegistrationAddress);
  const {
    execute: executeGetUserCities,
    data: citiesResponse,
  } = useServerAction(getUserCities);

  const cities = citiesResponse?.message;
  const form = useForm<RegisterAddressFormValues>({
    resolver: zodResolver(registrationAddressSchema(t)),
    defaultValues: {
      city_id: "",
      address: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    executeGetUserCities();
  }, [executeGetUserCities]);

  const onSubmit = async (data: RegisterAddressFormValues) => {
    const res = await addAddress({
      address: data.address,
      city_id: Number(data.city_id),
    });
    if (res?.type === "success") {
      redirect("/dashboard");
    }
    form.reset();
  };

  const selectCitiesOptions = useMemo(() => {
    if (!Array.isArray(cities)) {
      return [];
    }
    return (
      cities?.map((city: City) => ({
        value: city.id.toString(),
        label: city.city,
      })) || []
    );
  }, [cities]);

  const formFields = getAddressFormFields();
  return (
    <div className="w-full py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap sm:flex-row space-y-10 w-full grow-1 gap-6 items-center"
        >
          <FormField
            control={form.control}
            name="city_id"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-700 font-semibold mb-2 block">
                  {t("categoryLabel")}
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    name="city"
                    options={selectCitiesOptions}
                    contentClassName="py-12"
                    className="w-full py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {formFields
            .filter((field) => field.name !== "cityId")
            .map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof RegisterAddressFormValues}
                render={({ field: formFieldRenderProps }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-gray-700 font-semibold mb-2 block">
                      {t(field.placeholderKey)}
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center w-full">
                        <Input
                          type={field.type}
                          placeholder={t(field.placeholderKey)}
                          {...formFieldRenderProps}
                          className={`h-12 min-w-[250px] border-gray-300 focus:border-space-orange focus:ring-1 focus:ring-space-orange rounded-lg ${
                            field.prefix ? "rounded-l-none" : ""
                          }`}
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />
            ))}

          <div className="flex justify-center mb-3 ">
            <Button
              type="submit"
              className="w-full px-10 py-6 bg-space-green hover:bg-space-green/90  text-white font-semibold rounded-lg shadow-md"
            >
              {t(" submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
