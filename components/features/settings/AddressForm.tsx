"use client";

import { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { PlusIcon, Trash2 } from "lucide-react";

import { useClientTranslation } from "@/i18n/i18n-provider";
import {
  AddressSchema,
  ChangeAddressFormValues,
} from "@/schemas/settings.schema";
import CustomSelect from "@/components/common/CustomSelect";
import { useGlobalDataStore } from "@/store/GlobalDataStore";
import { useServerAction } from "@/hooks/useServerAction";
import { addAddresses, getUserInfo, deleteAddress } from "@/actions/user.actions";
import { City } from "@/types/user";
import z from "zod";
import Loading from "@/components/common/Loading";

const AddressForm: React.FC = () => {
  const { t } = useClientTranslation();
  const setUser = useGlobalDataStore((selector) => selector.setUser);
  const user = useGlobalDataStore((selector) => selector.user);

  const { execute: addAddress } = useServerAction(addAddresses);
  const { execute: fetchUserInfo, data: fetchedUser, isPending: isLoadingUser } = useServerAction(getUserInfo);
  const { execute: removeAddress, isPending: isDeleting } = useServerAction(deleteAddress);

  const form = useForm<{ addresses: ChangeAddressFormValues[] }>({
    resolver: zodResolver(
      z.object({
        addresses: AddressSchema(t).array(),
      })
    ),
    defaultValues: {
      addresses: user?.addresses?.map((a) => ({
        cityId: a.cityId.toString(),
        address: a.address,
        id: a.id.toString(),
      })) || [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    if (fetchedUser?.addresses) {
      form.reset({
        addresses: fetchedUser.addresses.map((a) => ({
          cityId: a.cityId.toString(),
          address: a.address,
          id: a.id,
        })),
      });
      setUser(fetchedUser);
    }
  }, [fetchedUser, form, setUser]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
    keyName: "fieldId",
  });

  const selectCitiesOptions = useMemo(() => {
    return (
      user?.cities?.map((city: City) => ({
        value: city.id.toString(),
        label: city.city,
      })) || []
    );
  }, [user?.cities]);

  const handleDelete = async (index: number, id?: number) => {
    if (id && window.confirm(t("settings.confirmDeleteAddress"))) {
      await removeAddress({ id });
      await fetchUserInfo();
    }
    remove(index);
  };

  const onSubmit = async (data: { addresses: ChangeAddressFormValues[] }) => {
    for (const addr of data.addresses) {
      await addAddress({
        ...addr,
        cityId: String(addr.cityId),
      });
    }
    await fetchUserInfo();
    form.reset({
      addresses: fetchedUser?.addresses?.map((a) => ({
        cityId: a.cityId.toString(),
        address: a.address,
        id: a.id,
      })) || [],
    });
  };
  if (isLoadingUser || !user) {
    return (
      <Loading />
    );
  }
  return (
    <div className="w-full pb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.fieldId}
              className="flex flex-col md:flex-row gap-4 items-center border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
              <FormField
                control={form.control}
                name={`addresses.${index}.cityId`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <CustomSelect
                        name={`addresses.${index}.cityId`}
                        value={field.value}
                        onChange={field.onChange}
                        options={selectCitiesOptions}
                        className="w-full py-5.5 min-w-[256px] bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`addresses.${index}.address`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("declaration.addressPlaceholder")}
                        className="h-16 min-w-[256px] bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-black dark:text-gray-200 flex items-center"
                  onClick={() => handleDelete(index, field.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>

              {index === 0 && (
                <Button
                  type="button"
                  onClick={() => append({ cityId: "", address: "" })}
                  className="w-full md:w-auto h-16 hover:bg-gray-200 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <PlusIcon />
                  {t("settings.addNewAddress")}
                </Button>
              )}
            </div>
          ))}

          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-space-blue-muted dark:bg-space-dark-muted min-w-[256px] h-12  text-white dark:text-gray-200 w-full md:w-auto"
            >
              {t("submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
