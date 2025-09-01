"use client";

import IconInput from "@/components/common/IconInput";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AuthroizedPersonFormValues,
  AuthorizedPersonSchema,
} from "@/schemas/settings.schema";
import { useServerAction } from "@/hooks/useServerAction";
import { createAuthorizedPerson } from "@/actions/courier.actions";
import { getAuthorizedPersonFormFields } from "@/lib/form/authorized_person.fields";
import AuthroizeUserVerifyPhone from "@/components/common/modals/AuthorizeUserVerifyPhone";

interface AddAuthorizedPersonDrawerProps {
  onClose: () => void;
  open: boolean;
}

export default function AddAuthorizedPersonDrawer({
  onClose,
  open,
}: AddAuthorizedPersonDrawerProps) {
  const { t } = useClientTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isPending: isLoadingCreatePerson,
    execute: createPerson,
    data: createdPerson,
  } = useServerAction(createAuthorizedPerson, {
    onError: () => { },
    onSuccess: () => { },
  });

  const authorizedPersonFormFields = getAuthorizedPersonFormFields();
  const defaultValues: AuthroizedPersonFormValues = {
    agreeTerms: false,
    firstName: "",
    lastName: "",
    phone: "",
    pin: "",
    residentFlag: true,
  };

  const form = useForm<AuthroizedPersonFormValues>({
    resolver: zodResolver(AuthorizedPersonSchema(t)),
    defaultValues,
    mode: "onBlur",
  });

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset(defaultValues);
      onClose();
    } else {
      form.reset(defaultValues);
    }
  };

  useEffect(() => {
    if (createdPerson) setIsModalOpen(true);
  }, [createdPerson]);

  const onSubmit = async (values: AuthroizedPersonFormValues) =>
    createPerson(values);

  const filteredFields = authorizedPersonFormFields.filter(
    (field) => field.name !== "agreeTerms" && field.name !== "residentFlag"
  );

  return (
    <>
      <AuthroizeUserVerifyPhone
        authorizedPersonId={createdPerson?.message ?? ""}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) onClose();
        }}
        open={isModalOpen}
      />
      <Sheet open={open} onOpenChange={handleOnOpenChange}>
        <SheetContent className="bg-background text-foreground flex flex-col">
          <SheetHeader className="pb-4 border-b border-border m-0 p-4">
            <SheetTitle className="text-2xl font-extrabold text-primary">
              {t("authorizedPersons.addTitle")}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-base mt-2">
              {t("authorizedPersons.addDescription")}
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 py-6 px-4 flex-grow overflow-y-auto"
            >
              {filteredFields.map((fieldConfig) => (
                <FormField
                  key={fieldConfig.name}
                  control={form.control}
                  name={fieldConfig.name as keyof AuthroizedPersonFormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium mb-2">
                        {t(fieldConfig.labelKey)}
                      </FormLabel>
                      <FormControl>
                        {fieldConfig.type === "textarea" ? (
                          <Textarea
                            id={String(fieldConfig.name)}
                            readOnly={fieldConfig.readOnly}
                            placeholder={t(fieldConfig.placeholderKey ?? "")}
                            className="w-full h-28 resize-none rounded-md border border-input bg-background p-3 text-foreground placeholder:text-muted-foreground"
                            value={typeof field.value === "string" ? field.value : ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        ) : (
                          <div className="relative flex items-center">
                            {fieldConfig.prefix && (
                              <span className="absolute left-3 text-sm text-muted-foreground">
                                {fieldConfig.prefix}
                              </span>
                            )}
                            <IconInput
                              Icon={fieldConfig.Icon}
                              id={String(fieldConfig.name)}
                              placeholder={t(fieldConfig.placeholderKey ?? "")}
                              type={fieldConfig.type}
                              readOnly={fieldConfig.readOnly}
                              {...field}
                              value={
                                field.value !== undefined && field.value !== null
                                  ? String(field.value)
                                  : ""
                              }
                              className="h-14 border border-input bg-background text-foreground placeholder:text-muted-foreground"
                            />
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Agree Terms */}
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow border-border bg-muted/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="agreeTerms"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel
                        htmlFor="agreeTerms"
                        className="text-sm font-medium"
                      >
                        {t("authorizedPersons.agreeTermsLabel")}
                      </FormLabel>
                      <FormDescription className="text-xs text-muted-foreground">
                        {t("authorizedPersons.agreeTermsDescription")}
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resident Flag */}
              <FormField
                control={form.control}
                name="residentFlag"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 border-border bg-muted/50">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t("authorizedPersons.residentFlagLabel")}
                      </FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        {t("authorizedPersons.residentFlagDescription")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer */}
              <SheetFooter className="px-0 mt-auto pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-4">
                <SheetClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      form.reset(defaultValues);
                      onClose();
                    }}
                  >
                    {t("cancel")}
                  </Button>
                </SheetClose>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!form.formState.isDirty || isLoadingCreatePerson}
                >
                  {t("authorizedPersons.addButton")}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
