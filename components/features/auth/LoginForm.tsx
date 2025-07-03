"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel, // Keeping FormLabel for consistency, though you might hide it with CSS
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormValues, loginFormSchema } from "@/schemas/auth.schema";
import { useClientTranslation } from "@/i18n/i18n-provider"; // Assuming your i18n setup

// Define a prop for the LoginForm to handle switching to register mode
interface LoginFormProps {
  onSwitchToRegister?: () => void;
  // You can add other props like `className` for external styling
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  className,
}) => {
  const { t } = useClientTranslation("common");
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false, // Default for checkbox
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login successful:", values);
      alert("Login successful!");
      form.reset();
      // Here you would typically handle user session/token, redirect, etc.
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4 ${className || ""}`}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>{t("form.email")}</FormLabel> // Uncomment if you want labels */}
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  {...field}
                  className="h-14 bg-gray-100 border-gray-300 focus:border-blue-500 focus-visible:ring-offset-0 focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>{t("form.password")}</FormLabel> // Uncomment if you want labels */}
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    {...field}
                    className="h-14 bg-gray-100 border-gray-300 focus:border-blue-500 focus-visible:ring-offset-0 focus-visible:ring-0 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          >
            დარეგისტრირდი
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
