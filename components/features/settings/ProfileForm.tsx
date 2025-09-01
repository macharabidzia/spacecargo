"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import CustomSelect from "@/components/common/CustomSelect";

import { useClientTranslation } from "@/i18n/i18n-provider";

import {
  profileFormSchema,
  ProfileFormValues,
} from "@/schemas/settings.schema";
import {
  FormFieldConfig,
  getDepartmentFormFields,
} from "@/lib/form/profile.fields";

import { Gender } from "@/store/slices/genders.slice";
import { Checkbox } from "@/components/ui/checkbox";
import { changeUser, getUserInfo } from "@/actions/user.actions";
import { getGenders } from "@/actions/common.actions";
import { useServerAction } from "@/hooks/useServerAction";
import { Department, UserData } from "@/types/user";
import PhoneVerifyWrapper from "@/components/common/wrappers/PhoneVerifyWrapper";
import Loading from "@/components/common/Loading";

const getProfileFormInitialValues = (
  user: UserData | null
): ProfileFormValues => ({
  firstNameGe: user?.userInfo?.firstNameGe ?? "",
  firstNameEn: user?.userInfo?.firstNameEn ?? "",
  lastNameGe: user?.userInfo?.lastNameGe ?? "",
  lastNameEn: user?.userInfo?.lastNameEn ?? "",
  email: user?.userInfo?.email ?? "",
  phone: user?.userInfo?.phone ?? "",
  personalNumber: user?.userInfo?.pin ?? "",
  gender: user?.userInfo?.gender ?? undefined,
  departmentId: user?.userInfo?.departmentId.toString() ?? "",
  declarationAgreement: user?.userInfo?.declarationAgreement === "Y",
});

const ProfileForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useClientTranslation();
  const { execute: fetchUserInfo, data: user } = useServerAction(getUserInfo);
  const { execute: fetchGenders, data: genders } = useServerAction(getGenders);
  const { isPending: isSubmitting, execute: submitChangeUser } =
    useServerAction(changeUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema(t)),
    defaultValues: getProfileFormInitialValues(user),
    mode: "onChange",
  });

  useEffect(() => {
    if (user && user.userInfo && Object.keys(user.userInfo).length > 0) {
      form.reset(getProfileFormInitialValues(user));
    }
  }, [user, form, genders]);

  const onSubmit = (data: ProfileFormValues) => {
    const agr = data.declarationAgreement === true ? "Y" : "N";
    const { ...restOfData } = data;
    const dt = { ...restOfData, declarationAgreement: agr };
    submitChangeUser(dt);
  };
  useEffect(() => {
    fetchUserInfo();
    fetchGenders();
  }, [fetchUserInfo, fetchGenders]);

  const selectCitiesOptions = useMemo(() => {
    return (
      user?.departments?.map((department: Department) => ({
        value: department.id.toString(),
        label: department.name,
      })) || []
    );
  }, [user?.departments]);

  const selectedGenders = useMemo(() => {
    return (
      genders?.map((gender: Gender) => ({
        value: gender.value.toString(),
        label: gender.name,
      })) || []
    );
  }, [genders]);

  const formFields: FormFieldConfig[] = getDepartmentFormFields();

  if (!user || !user.userInfo || Object.keys(user.userInfo).length === 0) {
    return (
      <Loading />
    );
  }

  return (
    <div className="w-full mt-5">
      <PhoneVerifyWrapper
        open={isOpen}
        onOpenChange={setIsOpen}
        userPhone={form.control._formValues.phone}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
        >
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof ProfileFormValues}
              render={({ field: formFieldRenderProps }) => (
                <FormItem className={`${field.colSpan || "col-span-1"}`}>
                  <FormLabel className="text-gray-700 dark:text-gray-200 mb-4 text-lg font-medium">
                    {t(field.placeholderKey)}
                  </FormLabel>
                  <FormControl>
                    {field.type === "textarea" ? (
                      <Textarea
                        placeholder={t(field.placeholderKey)}
                        {...formFieldRenderProps}
                        value={String(formFieldRenderProps.value)}
                        className="bg-space-muted dark:bg-gray-800 text-space-blue dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 py-6 text-lg"
                      />
                    ) : field.type === "checkbox" ? (
                      <Checkbox
                        checked={Boolean(formFieldRenderProps.value)}
                        onCheckedChange={formFieldRenderProps.onChange}
                        className="h-6 w-6 text-lg"
                        disabled={field.disabled}
                      />
                    ) : field.type === "select" ? (
                      field.name === "departmentId" ? (
                        <CustomSelect
                          className="w-full py-3 bg-space-muted dark:bg-gray-800 text-space-blue dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          name={formFieldRenderProps.name}
                          options={selectCitiesOptions}
                          onChange={formFieldRenderProps.onChange}
                          value={String(formFieldRenderProps.value)}
                        />
                      ) : (
                        field.name === "gender" && (
                          <CustomSelect
                            className="w-full py-3 bg-space-muted dark:bg-gray-800 text-space-blue dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            name={formFieldRenderProps.name}
                            options={selectedGenders}
                            onChange={formFieldRenderProps.onChange}
                            value={String(formFieldRenderProps.value)}
                            disabled={formFieldRenderProps.disabled}
                          />
                        )
                      )
                    ) : field.name === "phone" ? (
                      <div className="flex flex-row items-center gap-4">
                        <Input
                          type={field.type}
                          disabled={field.disabled}
                          placeholder={t(field.placeholderKey)}
                          {...formFieldRenderProps}
                          value={String(formFieldRenderProps.value)}
                          className={`py-6 flex-1/2 bg-space-muted dark:bg-gray-800 text-space-blue dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-lg ${field.prefix ? "rounded-l-none" : ""
                            }`}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            setIsOpen(true);
                          }}
                          className="py-6 flex-1  bg-space-blue dark:bg-blue-600 text-md text-white"
                        >
                          {t("form.send")}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center w-full">
                        {field.prefix && field.prefix}
                        <Input
                          type={field.type}
                          disabled={field.disabled}
                          placeholder={t(field.placeholderKey)}
                          {...formFieldRenderProps}
                          value={String(formFieldRenderProps.value)}
                          className={`py-6 bg-space-muted dark:bg-gray-800 text-space-blue dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-lg ${field.prefix ? "rounded-l-none" : ""
                            }`}
                        />
                      </div>
                    )}
                  </FormControl>
                  <div className="h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-start mt-8">
            <Button
              type="submit"
              className="w-full md:w-auto px-4 py-6 bg-space-blue-light dark:bg-blue-500  text-md text-white"
              disabled={isSubmitting}
            >
              {t("profile.submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
