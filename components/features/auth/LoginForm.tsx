"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as React from "react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormSchema, LoginFormValues } from "@/schemas/auth.schema";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { getLoginFormFields } from "@/lib/form/login.fields";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  className,
}) => {
  const { t } = useClientTranslation("common");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Login successful!");
      form.reset();
    } catch (error) {
      alert("Login failed. Please check your credentials.");
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
                      className={`h-14 bg-gray-100 border-gray-300 focus:border-blue-500 focus-visible:ring-offset-0 focus-visible:ring-0 ${
                        fieldConfig.isPassword ? "pr-10" : ""
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
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                  />
                </FormControl>
                <FormLabel
                  htmlFor="rememberMe"
                  className="text-sm font-normal text-gray-700 cursor-pointer"
                >
                  {t("auth.rememberMe")}
                </FormLabel>
              </FormItem>
            )}
          />
          <Button variant="link" className="text-blue-600 p-0 h-auto">
            {t("auth.forgotPassword")}
          </Button>
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
          <p>არ გაქვს ანგარიში?</p>
          <Button
            variant="link"
            className="text-space-blue-light cursor-pointer"
            onClick={onSwitchToRegister}
          >
            დარეგისტრირდი
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
