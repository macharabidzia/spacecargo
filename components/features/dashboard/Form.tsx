"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addressFormSchema } from "@/schemas/form.schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BatteryWarning,
  FileWarning,
  MessageCircleWarning,
  PawPrint,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useClientTranslation } from "@/i18n/i18n-provider";
type AddressFormValues = z.infer<typeof addressFormSchema>;

const AddressForm = () => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      lastName: "",
      state: "",
      address1: "",
      zipCode: "",
      address2: "",
      country: "",
      city: "",
      phoneNumber: "",
    },
    mode: "onBlur",
  });
  const fields = Object.keys(form.getValues());
  const { t } = useClientTranslation("common");
  async function onSubmit() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert("Address information saved successfully!");
      form.reset();
    } catch (error) {
      alert("Failed to save address. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 w-full"
      >
        <Input
          placeholder="ჯასა გაბაიძბაიშვილი"
          className="h-full min-h-16 bg-slate-200"
        />
        <Card className="bg-space-blue">
          <CardContent className="flex flex-row gap-4">
            <MessageCircleWarning
              size={40}
              className="text-space-red-default"
            />

            <span className="text-white">
              Space Cargo-სგან დამოუკიდებელი მიზეზების გამო,მოცემული ვადები და
              დღეები შესაძლოა შეიცვალოს.
            </span>
          </CardContent>
        </Card>
        {fields.map((fieldItem: any) => (
          <FormField
            key={fieldItem}
            control={form.control}
            name={fieldItem}
            render={({ field }) => (
              <FormItem className="relative h-30">
                <FormLabel>{t("form." + fieldItem)}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ჯასა გაბაიძბაიშვილი"
                    {...field}
                    className="h-14 bg-slate-200"
                  />
                </FormControl>
                <FormMessage className="absolute bottom-0 text-xs" />
              </FormItem>
            )}
          />
        ))}

        <Card className="bg-space-blue w-full col-span-full">
          <CardHeader>
            <div className="flex flex-row gap-4 mb-4">
              <FileWarning className="text-space-red-default" />
              <p className="text-white">Danger is here</p>
            </div>
            <Separator />
          </CardHeader>
          <CardContent className="flex flex-row text-white sm:justify-between flex-wrap gap-5 ">
            <div className="flex flex-row gap-4">
              <PawPrint />
              <h2>ცხოველები</h2>
            </div>
            <div className="flex flex-row gap-4">
              <PawPrint />
              <h2>ცხოველები</h2>
            </div>
            <div className="flex flex-row gap-4">
              <PawPrint />
              <h2>ცხოველები</h2>
            </div>
            <div className="flex flex-row gap-4">
              <PawPrint />
              <h2>ცხოველები</h2>
            </div>
            <div className="flex flex-row gap-4">
              <PawPrint />
              <h2>ცხოველები</h2>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default AddressForm;
