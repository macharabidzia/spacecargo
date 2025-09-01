"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useClientTranslation } from "@/i18n/i18n-provider";
import {
    ResetPasswordFormValues,
    ResetPasswordFormSchema,
} from "@/schemas/auth.schema";
import { useServerAction } from "@/hooks/useServerAction";
import { redirect, useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/user.actions";

interface SuccessResponse {
    type: "success";
    message: string;
}
interface ErrorResponse {
    type: "error";
    message: string;
}
type ResetPasswordResponse = SuccessResponse | ErrorResponse;

const ResetPasswordForm = () => {
    const { t } = useClientTranslation();
    const searchParams = useSearchParams();

    const { execute: executeResetPassword, isPending: isSubmitting } =
        useServerAction(resetPassword);

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(ResetPasswordFormSchema(t)),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        const dataToSend = {
            password: data.password,
            confirm_password: data.confirm_password,
        }
        const params = {
            expires: searchParams.get("expires")!,
            userId: searchParams.get("userId")!,
            signature: searchParams.get("signature")!,

        };

        const response = (await executeResetPassword({ data: dataToSend, searchParams: params })) as ResetPasswordResponse;

        if (response?.type === "success") {
            redirect("/dashboard");
        } else {
            form.setError("root.serverError", {
                type: "manual",
                message: response?.message || t("unknownError"),
            });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto py-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-2">{t("passwordLabel")}</FormLabel>
                                <FormControl>
                                    <Input className="h-12" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-2">{t("confirmPasswordLabel")}</FormLabel>
                                <FormControl>
                                    <Input className="h-12" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.formState.errors.root?.serverError && (
                        <div className="text-red-500 text-sm">
                            {form.formState.errors.root.serverError.message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? t("submitting") : t("submitButton")}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ResetPasswordForm;
