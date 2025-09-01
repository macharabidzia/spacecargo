"use client";
import { useEffect, useCallback } from "react"; 
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useClientTranslation } from "@/i18n/i18n-provider";
import {
  getNotificationsFormFields,
  NotificationFormFieldConfig,
} from "@/lib/form/notifications.fields";
import { Box } from "lucide-react";
import { MessageRestrictionDto, RestrictionUpdatePayload, UserData } from "@/types/user";
import { useServerAction } from "@/hooks/useServerAction";
import { changeRestrictMessages, getUserInfo } from "@/actions/user.actions"; 
import { ApiResponse } from "@/types/api";
import Loading from "@/components/common/Loading";

export interface NotificationFormValues {
  marketingNotificationFlag: boolean;
  [key: string]: boolean; 
}

const mapApiActionToBaseName: { [key: string]: string } = {
  Parcel_A: "inWarehouse",
  Parcel_S: "onItsWay",
  Parcel_R: "packageArrived",
  Parcel_C: "parcelCancelled",
  Parcel_U: "parcelUndeclared",
  Invoice_C: "invoicePaid",
};

const getFormInitialValues = (
  apiData: UserData | null
): NotificationFormValues => {
  const values: NotificationFormValues = { marketingNotificationFlag: false };

  getNotificationsFormFields().forEach((fieldConfig) => {
    values[fieldConfig.name] = false; 
  });

  if (apiData) {
    const allApiRestrictions = [
      ...(apiData.messageRestriction?.email || []),
      ...(apiData.messageRestriction?.sms || []),
    ];
    allApiRestrictions.forEach((item) => {
      const baseName = mapApiActionToBaseName[item.name];
      if (baseName) {
        const formFieldName =
          `${baseName}${item.notificationType}` as keyof NotificationFormValues;
        values[formFieldName] = item.status === "A";
      }
    });
  }
  return values;
};

const NotificationsForm: React.FC = () => {
  const { t } = useClientTranslation();

  const {
    isPending: isLoadingUser,
    execute: fetchUserInfo,
    data: user,
  } = useServerAction(getUserInfo);

  const { isPending: isSubmitting, execute: saveNotificationPreferences } =
    useServerAction<[MessageRestrictionDto], ApiResponse>(changeRestrictMessages);

  const form = useForm<NotificationFormValues>({
    defaultValues: getFormInitialValues(null),
    mode: "onChange",
  });

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    if (user) {
      form.reset(getFormInitialValues(user));
    }
  }, [user, form]); 

  const transformFormToApiPayload = useCallback(
    (formValues: NotificationFormValues): MessageRestrictionDto => {
      const restrictions:RestrictionUpdatePayload[] = [];

      getNotificationsFormFields().forEach((fieldConfig) => {
        const isChecked = formValues[fieldConfig.name];
        const status = isChecked ? "Y" : "N";
        restrictions.push({
          action: fieldConfig.action,
          restrictedFlag: status,
          notificationType: fieldConfig.notificationType,
        });
      });

      return {
        marketingNotificationFlag: formValues.marketingNotificationFlag ? "Y" : "N",
        messageLanguage: "GE",
        restriction: restrictions,
      };
    },
    []
  );

  const onSubmit = async (data: NotificationFormValues) => {
    const apiPayload = transformFormToApiPayload(data);
    try {
      await saveNotificationPreferences(apiPayload);
      await fetchUserInfo();
    } catch (error) {
      console.error("Failed to update notification preferences:", error);
    }
  };

  const formFields = getNotificationsFormFields();
  const emailFields = formFields.filter(
    (field) => field.notificationType === "Email"
  );
  const smsFields = formFields.filter(
    (field) => field.notificationType === "SMS"
  );

  if (isLoadingUser || !user) {
    return (
      <Loading/>
    );
  }

  const renderCheckboxField = (fieldConfig: NotificationFormFieldConfig) => (
    <FormField
      key={fieldConfig.name}
      control={form.control}
      name={fieldConfig.name as string}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id={fieldConfig.name}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel
              htmlFor={fieldConfig.name}
              className=" text-base font-medium text-gray-900 dark:text-gray-100"
            >
              {t(fieldConfig.placeholderKey)}
            </FormLabel>
          </div>
          <FormMessage className="text-red-500 dark:text-red-400" />
        </FormItem>
      )}
    />
  );

  return (
    <div className="w-full px-4 py-10 flex flex-col gap-6 dark:text-gray-100">
      <Box size={60} className="text-space-blue dark:text-indigo-400" />
      <h2 className="text-2xl font-semibold mb-6 text-space-blue-muted dark:text-yellow-400">
        {t("notifications.title")}
      </h2>
      <p className="text-gray-500 mb-8 dark:text-gray-300">{t("notifications.description")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
          {/* Marketing Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {t("notifications.marketingSectionTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              <FormField
                control={form.control}
                name="marketingNotificationFlag"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="marketingNotificationFlag"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel
                        htmlFor="marketingNotificationFlag"
                        className=" text-base font-medium text-gray-900 dark:text-gray-100"
                      >
                        {t("notifications.marketingFlagLabel")}
                      </FormLabel>
                    </div>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Email Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-space-blue dark:text-white">
              {t("notifications.emailSectionTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 w-full">
              {emailFields.map(renderCheckboxField)}
            </div>
          </section>

          {/* SMS Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-space-blue dark:text-white">
              {t("notifications.smsSectionTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 w-full">
              {smsFields.map(renderCheckboxField)}
            </div>
          </section>

          {/* Submit Button */}
          <div className="col-span-full flex justify-center pt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto px-10 py-6 bg-space-green hover:bg-space-green/90  text-white font-semibold rounded-lg shadow-md dark:bg-green-600 dark:hover:bg-green-500"
              disabled={isSubmitting || isLoadingUser}
            >
              {isSubmitting ? t("common.saving") : t("declaration.submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NotificationsForm;
