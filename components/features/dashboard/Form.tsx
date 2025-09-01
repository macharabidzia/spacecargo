import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircleWarning,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";

interface AddressDetails {
  country: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  countryDesc: string;
  phone: string;
  price: number;
  countryId: number;
  isLand: "Y" | "N";
  notificationDictionaryKey: string | null;
}

type AddressFormProps = {
  addressData: AddressDetails;
  lang: Lang;
};

const AddressForm = async ({ addressData, lang }: AddressFormProps) => {
  const dictionary = (await getDictionary(lang)).common;
  const t = (key: string) => dictionary[key]

  const fields: (keyof AddressDetails)[] = [
    "name",
    "country",
    "address1",
    "address2",
    "city",
    "state",
    "zip",
    "phone",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 w-full">
      <div className="h-full min-h-16 bg-slate-200 dark:bg-gray-800 p-4 rounded-md flex items-center">
        <span className="text-gray-700 dark:text-gray-200">{addressData?.name || t("No Name Provided")}</span>
      </div>

      <Card className="bg-space-blue dark:bg-gray-950">
        <CardContent className="flex flex-row gap-4 p-6">
          <MessageCircleWarning
            size={40}
            className="text-space-red-default"
          />
          <span className="text-white dark:text-gray-200">
            {dictionary['delivery.notice']}
          </span>
        </CardContent>
      </Card>

      {fields.map((fieldItem) => (
        <div key={fieldItem} className="relative h-30">
          <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-4">
            {t(`form.${fieldItem}`) || fieldItem.charAt(0).toUpperCase() + fieldItem.slice(1)}
          </label>
          <div className="h-14 bg-slate-200 dark:bg-gray-800 rounded-md flex items-center px-3 text-gray-800 dark:text-gray-200">
            {addressData[fieldItem as keyof AddressDetails]?.toString() || "N/A"}
          </div>
        </div>
      ))}

      <div className="relative h-30">
        <label className="block text-sm font-medium text-gray-700 mb-4 dark:text-white/90">
          {t('form.countryDescription') || "Country Description"}
        </label>
        <div className="h-14 bg-slate-200 dark:bg-gray-800 rounded-md flex items-center px-3 text-gray-800 dark:text-gray-200">
          {addressData.countryDesc || "N/A"}
        </div>
      </div>
      <div className="relative h-30">
        <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-4">
          {t('form.shippingPrice') || "Shipping Price"}
        </label>
        <div className="h-14 bg-slate-200 dark:bg-gray-800 rounded-md flex items-center px-3 text-gray-800 dark:text-gray-200">
          {addressData.price ? `${addressData.price} GEL` : "N/A"}
        </div>
      </div>
      <div className="relative h-30">
        <label className="block text-sm font-medium text-gray-700 mb-4 dark:text-white/90">
          {t('form.isLand') || "Is Land Shipping?"}
        </label>
        <div className="h-14 bg-slate-200 dark:bg-gray-800 rounded-md flex items-center px-3 text-gray-800 dark:text-gray-200">
          {addressData.isLand === "Y" ? t("Yes") : t("No")}
        </div>
      </div>
      {addressData.notificationDictionaryKey && (
        <div className="relative h-30">
          <label className="block text-sm font-medium text-gray-700 mb-4 dark:text-white/90">
            {t('form.notification')}
          </label>
          <div className="h-14 bg-slate-200 dark:bg-gray-800 rounded-md flex items-center px-3 text-gray-800 dark:text-gray-200">
            {t(addressData.notificationDictionaryKey)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;