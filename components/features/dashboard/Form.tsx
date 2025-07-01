"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

  async function onSubmit(values: AddressFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Address information saved successfully!");
      form.reset();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to save address. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 w-full p-6 md:p-8 "
      >
        {/* Row 1 */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>გვარი (Last Name)</FormLabel>
              <FormControl>
                <Input placeholder="ჯასა გაბაიძბაიშვილი" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>შტატი (State)</FormLabel>
              <FormControl>
                <Input placeholder="Delaware" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Row 2 */}
        <FormField
          control={form.control}
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>მისამართი No1 (Address No1)</FormLabel>
              <FormControl>
                <Input
                  placeholder="TBS-1464759, 1622 E Ayre street"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>საფოსტო კოდი (Zip Code)</FormLabel>
              <FormControl>
                <Input placeholder="19804" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Row 3 */}
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>მისამართი No2 (Address No2)</FormLabel>
              <FormControl>
                <Input placeholder="TBS-1464759" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ქვეყანა (Country)</FormLabel>
              <FormControl>
                <Input placeholder="United States" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Row 4 */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ქალაქი (City)</FormLabel>
              <FormControl>
                <Input placeholder="New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ტელეფონის ნომერი (Phone Number)</FormLabel>
              <FormControl>
                <Input placeholder="+1 (302) 660 8398" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button - spans full width */}
        <div className="col-span-full flex justify-center mt-6">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Save Address"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
