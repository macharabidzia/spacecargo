import z from "zod";

export const courierFormSchema = (t: (key: string) => string) => z.object({
    receiverFullName: z.string().min(1, t('validation.requiredReceiverFullName')),
    receiverPhone: z.string().min(1, t('validation.requiredReceiverPhone')),
    address: z.string().min(1, t('validation.requiredAddress')),
    cityId: z.string().min(1, t('validation.requiredCity')),
    districtId: z.string().min(1, t('validation.requiredDistrict')).optional(),  // optional with min length if present
    package: z.string().min(1, t('validation.requiredPackageType')).optional(),  // optional with min length if present
    comment: z.string().optional(),
});

export type ICourierForm = z.infer<ReturnType<typeof courierFormSchema>>;
