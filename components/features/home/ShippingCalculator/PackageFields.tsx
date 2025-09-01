"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { FormField } from "./FormField";
import { PACKAGE_FIELDS_CONFIG, ShippingFormValues } from "@/config/shipping.config";
import { useGlobalDataStore } from "@/store/GlobalDataStore";

export function PackageFields() {
    const { t } = useClientTranslation();
    const { control, register } = useFormContext<ShippingFormValues>();
    const canEdit = useGlobalDataStore((s) => s.canEdit);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "packages",
    });
    return (
        <div>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="relative mb-4 rounded-lg border p-4 pt-8 flex flex-col"
                >
                    <p className="absolute -top-3 left-3 bg-background px-2 text-sm font-medium text-space-blue-muted">
                        {t('form.package')} {index + 1}
                    </p>

                    <div className="flex md:flex-row flex-col gap-4 items-center">
                        {PACKAGE_FIELDS_CONFIG.map(({ name, labelKey, Icon }) => (
                            <FormField key={name} label={`${t(labelKey)} ${name !== 'weight' ? '(cm)' : '(kg)'}`} Icon={Icon}>
                                <Input
                                    type="number"
                                    step="any"
                                    placeholder="0.0"
                                    {...register(`packages.${index}.${name}`)}
                                    className="font-semibold w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 h-auto"
                                />
                            </FormField>
                        ))}
                        {fields.length > 1 && (
                            <div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    aria-label={`Remove package ${index + 1}`}
                                    className="text-space-blue hover:bg-red-50 hover:text-space-blue/90 bg-white h-14 w-14"
                                >
                                    <Trash2 size={24} />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Delete button row aligned right below inputs */}

                </div>
            ))}
            <div className="flex justify-end mt-4">
                {canEdit && <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ width: "", height: "", length: "", weight: "" })}
                >
                    <PlusCircle size={18} className="mr-2" />
                    {t("form.add")}

                </Button>
                }
            </div>
        </div>
    );
}
