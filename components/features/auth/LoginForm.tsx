"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema, LoginFormValues } from "@/schemas/auth.schema";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { getLoginFormFields } from "@/lib/form/login.fields";
import { login } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { showToast } from "@/components/common/SuccessToast";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  className,
}) => {
  const { t, lang } = useClientTranslation("common");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    const res = await login(values.email, values.password);
    if (!res.success) {
      showToast("error", "Error", res.message)
    } else {
      showToast("success", "Success", res.message)
      redirect(`/${lang}/dashboard`);
    }
  };
  const formFields = getLoginFormFields(t);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4 ${className || ""}`}
      >
        {formFields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={fieldConfig.type}
                      placeholder={fieldConfig.placeholder}
                      {...field}
                      className={`h-14 bg-gray-100 border-gray-300 ${fieldConfig.isPassword ? "pr-10" : ""
                        }`}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex items-center justify-between text-sm">
          <Link href="?send-reset=true">
            <Button variant="link" className="text-blue-600 p-0 h-auto ">
              {t("auth.forgotPassword")}
            </Button>
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? t("auth.loggingIn")
            : t("auth.loginButton")}
        </Button>
        <div className="flex flex-row justify-center items-center">
          <p>{t("auth.noAccount")}</p>
          <Link href="register">
            <Button
              variant="link"
              className="text-space-blue-light "
              onClick={onSwitchToRegister}
            >
              {t("auth.registerButton")}
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
