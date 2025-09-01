"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { authorizedPersonVerify } from "@/actions/user.actions";
import { useServerAction } from "@/hooks/useServerAction";
import { useClientTranslation } from "@/i18n/i18n-provider";

type PhoneVerifyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorizedPersonId: string;
};

export default function AuthorizeUserVerifyPhone({
  open,
  onOpenChange,
  authorizedPersonId,
}: PhoneVerifyModalProps) {
  const { t } = useClientTranslation();
  const [verificationCode, setVerificationCode] = useState<string>("");

  const hasSentInitialCodeRef = useRef(false);
  const { isPending: isVerifyingCodeLocal, execute: executeVerifyCode } =
    useServerAction(authorizedPersonVerify, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });

  useEffect(() => {
    if (open) {
      setVerificationCode("");
      hasSentInitialCodeRef.current = false;
    }
  }, [open]);

  const handleVerify = async () => {
    await executeVerifyCode({
      authorizedPersonId: authorizedPersonId,
      code: Number(verificationCode),
    });
  };

  const isLoading = isVerifyingCodeLocal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:min-w-[856px] py-0 my-0 space-y-10 bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-space-blue dark:text-indigo-400 mt-6">
            {t("phoneVerify.title")}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {t("phoneVerify.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5">
          <Phone
            size={40}
            className="text-space-blue dark:text-indigo-400"
          />
          <p className="text-lg text-gray-700 dark:text-gray-200 text-center">
            {t("phoneVerify.instruction")}
          </p>

          <div className="w-full max-w-sm flex flex-col items-center gap-3">
            <Input
              type="text"
              placeholder={t("phoneVerify.inputPlaceholder")}
              className="py-6 text-center text-xl tracking-widest dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isLoading}
            />
            <Button
              onClick={handleVerify}
              disabled={isLoading || !verificationCode}
              className="w-full py-6 bg-space-blue-light text-white hover:bg-space-blue-dark transition-colors duration-200 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isVerifyingCodeLocal
                ? t("phoneVerify.verifying")
                : t("phoneVerify.verifyButton")}
            </Button>
          </div>
        </div>
        <DialogFooter className="flex flex-col items-center gap-4 py-4"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
