"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert, Phone, Mail } from "lucide-react";
import { useEffect, useCallback } from "react";
import { CommonDictionary } from "@/types/dictionary";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { redirect, useRouter } from "next/navigation";
import { useVerification } from "@/hooks/use-verification";
import { VerificationSectionItem } from "./VerificationSectionItem";
import { UserStatus } from "@/types/user";
import { useServerAction } from "@/hooks/useServerAction";
import {
  resendRegistrationPhone,
  verifyRegistrationPhone,
  verifyRegistrationEmail,
  resendRegistrationEmail,
} from "@/actions/auth.actions";

type VerifyPageProps = {
  dictionary?: CommonDictionary;
  userStatus: UserStatus;
};

export default function VerifyForm({
  userStatus,
}: VerifyPageProps) {
  const router = useRouter();
  const { t } = useClientTranslation();
  const { user_id,phone,email } = userStatus;

  const { isPending: isVerifyingPhone, execute: execVerifyPhone } =
    useServerAction(verifyRegistrationPhone);
  const { isPending: isResendingPhone, execute: execResendPhone } =
    useServerAction(resendRegistrationPhone);
  const { isPending: isVerifyingEmail, execute: execVerifyEmail } =
    useServerAction(verifyRegistrationEmail);
  const { isPending: isResendingEmail, execute: execResendEmail } =
    useServerAction(resendRegistrationEmail);
  useEffect(() => {
    if (userStatus.email_verified && userStatus.phone_verified) {
      redirect("complete");
    }
  }, [userStatus]);
  const phoneVerification = useVerification(
    useCallback(async () => {
      const response = await execResendPhone({ user_id: Number(user_id) });
      return response.type === "success";
    }, [execResendPhone, user_id]),
    useCallback(
      async (code) => {
        const response = await execVerifyPhone({
          user_id: Number(user_id),
          code,
        });
        router.refresh();
        return response.type === "success";
      },
      [execVerifyPhone, user_id, router]
    )
  );

  const emailVerification = useVerification(
    useCallback(async () => {
      const response = await execResendEmail({ user_id: Number(user_id) });
      return response.type === "success";
    }, [execResendEmail, user_id]),
    useCallback(
      async (code) => {
        const response = await execVerifyEmail({
          user_id: Number(user_id),
          code,
        });
        router.refresh();

        return response.type === "success";
      },
      [execVerifyEmail, user_id, router]
    )
  );

  return (
    <div className="flex justify-center p-4 md:p-8 bg-white dark:bg-gray-900">
      <div className="w-full max-w-2xl space-y-10">
        {!userStatus.phone_verified && (
          <VerificationSectionItem
            title={t("auth.phoneVerification", "ტელეფონის დადასტურება")}
            description={t(
              "auth.sendCodeToPhone",
              "შეყვანილ ტელეფონის ნომერზე"
            )}
            contactInfo={String(phone)}
            Icon={Phone}
            verificationState={{
              ...phoneVerification,
              isSendingCode: isResendingPhone,
              isVerifyingCode: isVerifyingPhone,
            }}
            onResend={phoneVerification.handleResend}
            onVerify={phoneVerification.handleVerify}
            t={t}
          />
        )}
        {!userStatus.email_verified && (
          <VerificationSectionItem
            title={t("auth.emailVerification", "ელ. ფოსტის დადასტურება")}
            description={t("auth.sendCodeToEmail", "შეყვანილ ელ. ფოსტაზე")}
            contactInfo={String(email)}
            Icon={Mail}
            verificationState={{
              ...emailVerification,
              isSendingCode: isResendingEmail,
              isVerifyingCode: isVerifyingEmail,
            }}
            onResend={emailVerification.handleResend}
            onVerify={emailVerification.handleVerify}
            t={t}
          />
        )}
        <div className="bg-blue-50 dark:bg-gray-700 px-5 py-4 md:px-6 md:py-5 rounded-lg border border-blue-200 dark:border-gray-600">
          <div className="flex gap-3 items-start text-blue-800 dark:text-blue-300">
            <TriangleAlert className="text-red-500 flex-shrink-0" size={24} />
            <p className="text-sm md:text-base leading-relaxed">
              {t(
                "auth.verifyInfo",
                "თუ კოდი არ მიგიღიათ, გთხოვთ, შეამოწმოთ თქვენი მონაცემები ან სცადოთ ხელახლა გაგზავნა."
              )}
            </p>
          </div>
        </div>
        <Button
          disabled={!userStatus.phone_verified || !userStatus.email_verified}
          className="bg-space-blue-muted px-12 py-6  justify-self-center flex dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
