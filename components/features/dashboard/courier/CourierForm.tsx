"use client";

import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getCourierFormFields } from "@/lib/form/courier.fields";
import { courierFormSchema } from "@/schemas/courier.schema";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { useServerAction } from "@/hooks/useServerAction";
import {
  courierOrderRegistration,
  getAddCourierInfo,
} from "@/actions/courier.actions";
import CustomSelect from "@/components/common/CustomSelect";
import { CourierCity, CourierDistrict, CourierPackage } from "@/types/courier";

type CourierFormValues = z.infer<ReturnType<typeof courierFormSchema>>;

interface CourierFormProps {
  parcelIds: string[]
}

const CourierForm: React.FC<CourierFormProps> = ({ parcelIds }) => {
  const { data: user, execute: getAddCourierUserInfo } =
    useServerAction(getAddCourierInfo);
  const { execute: createCourierOrder, isPending: courierLoading } =
    useServerAction(courierOrderRegistration);

  const { t } = useClientTranslation();
  const form = useForm<CourierFormValues>({
    resolver: zodResolver(courierFormSchema(t)),
    defaultValues: {
      receiverFullName: "",
      receiverPhone: "+995",
      address: "",
      cityId: "",
      districtId: undefined,
      package: undefined,
      comment: undefined,
    },
  });

  const selectedCityId = form.watch("cityId");

  useEffect(() => {
    getAddCourierUserInfo();
  }, [getAddCourierUserInfo]);

  const isTbilisiSelected = useMemo(() => {
    const selectedCity = user?.cities?.find(
      (city) => city.id.toString() === selectedCityId
    );
    return selectedCity?.desc?.toLowerCase() !== "თბილისი" &&
           selectedCity?.desc?.toLowerCase() !== "tbilisi";
  }, [selectedCityId, user]);

  const onSubmit = async (data: CourierFormValues) => {
    const submission: CourierFormValues & { parcelIds: string[] } = {
      ...data,
      comment: data.comment ?? undefined,
      districtId: data.districtId ?? undefined,
      package: data.package ?? undefined,
      parcelIds,
    };
    createCourierOrder(submission);
  };

  const selectCitiesOptions = useMemo(() => {
    return (
      user?.cities?.map((city: CourierCity) => ({
        value: city.id.toString(),
        label: city.desc,
      })) || []
    );
  }, [user?.cities]);

  const selectDistrictOptions = useMemo(() => {
    return (
      user?.districts?.map((district: CourierDistrict) => ({
        value: district.id.toString(),
        label: district.desc,
      })) || []
    );
  }, [user?.districts]);

  const selectPackageOptions = useMemo(() => {
    return (
      user?.packages?.map((courierPackage: CourierPackage) => ({
        value: courierPackage.name,
        label: courierPackage.desc,
      })) || []
    );
  }, [user?.packages]);

  const formFields = getCourierFormFields();

  return (
    <div className="w-full px-4 py-10 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold text-center text-space-blue-light dark:text-blue-400 mb-10">
        {t("courier.parcelInformationTitle")}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 space-y-3"
        >
          {/* City */}
          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-500 dark:text-gray-300 mb-4">
                  {t("courier.cityPlaceholder")}
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    name="city"
                    options={selectCitiesOptions}
                    contentClassName="py-12"
                    className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* District */}
          <FormField
            control={form.control}
            name="districtId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-500 dark:text-gray-300 mb-4">
                  {t("courier.districtPlaceholder")}
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    onChange={(val) => field.onChange(val)}
                    name={field.name}
                    value={String(field.value)}
                    options={selectDistrictOptions}
                    contentClassName="py-12"
                    className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    disabled={isTbilisiSelected}
                  />
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Package */}
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-500 dark:text-gray-300 mb-4">
                  {t("courier.packageTypePlaceholder")}
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    value={String(field.value)}
                    onChange={(val) => field.onChange(val)}
                    name={field.name}
                    options={selectPackageOptions}
                    contentClassName="py-12"
                    className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    disabled={isTbilisiSelected}
                  />
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {formFields
            .filter(
              (field) =>
                !["cityId", "districtId", "package"].includes(field.name)
            )
            .map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof CourierFormValues}
                render={({ field: formFieldRenderProps }) => (
                  <FormItem className={field.colSpan || "col-span-1"}>
                    <FormLabel className="text-gray-500 dark:text-gray-300 mb-4">
                      {t(field.placeholderKey)}
                    </FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={t(field.placeholderKey)}
                          {...formFieldRenderProps}
                          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-32"
                        />
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={t(field.placeholderKey)}
                          {...formFieldRenderProps}
                          className="py-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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

          <div className="col-span-1 md:col-span-2 flex justify-end mt-6 mx-auto">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-6 bg-blue-600 dark:bg-blue-500 text-white shadow-md"
              disabled={courierLoading}
            >
              {t("courier.submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourierForm;
