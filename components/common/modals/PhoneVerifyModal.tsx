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
import { Phone, TriangleAlert } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useClientTranslation } from "@/i18n/i18n-provider";

type PhoneVerifyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userPhone: string;
  onResend: () => void;
  onVerify: (code: string) => void;
  isSendingCode: boolean;
  isVerifyingCode: boolean;
  onCountdownEnd: () => void;
};

export default function PhoneVerifyModal({
  open,
  onOpenChange,
  userPhone,
  onResend,
  onVerify,
  isSendingCode,
  isVerifyingCode,
  onCountdownEnd,
}: PhoneVerifyModalProps) {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(30);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(true);
  const { t } = useClientTranslation();

  useEffect(() => {
    if (open) {
      setCountdown(30);
      setIsCountingDown(true);
      setVerificationCode("");
    }
  }, [open]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (open && isCountingDown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountingDown(false);
      onCountdownEnd();
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, isCountingDown, countdown, onCountdownEnd]);

  const handleResend = () => {
    setCountdown(30);
    setIsCountingDown(true);
    setVerificationCode("");
    onResend();
  };

  const handleVerify = () => {
    if (verificationCode) onVerify(verificationCode);
  };

  const isLoading = isSendingCode || isVerifyingCode;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:min-w-[856px] py-0 my-0 space-y-10 dark:bg-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-space-blue dark:text-indigo-400 mt-6">
            {t("phoneVerify.title")}
          </DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            {t("phoneVerify.description", { userPhone })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5">
          <Phone size={40} className="text-space-blue dark:text-indigo-400" />
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            {t("phoneVerify.instruction")}
          </p>

          <div className="w-full max-w-sm flex flex-col items-center gap-3">
            <Input
              type="text"
              placeholder={t("phoneVerify.inputPlaceholder")}
              className="py-6 text-center text-xl tracking-widest dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isLoading}
            />
            <Button
              onClick={handleVerify}
              disabled={isLoading || verificationCode.length !== 4}
              className="w-full py-6 bg-space-blue-light text-white hover:bg-space-blue-dark transition-colors duration-200 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              {isVerifyingCode
                ? t("phoneVerify.verifying")
                : t("phoneVerify.verifyButton")}
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col items-center gap-4 py-4">
          {isCountingDown ? (
            <p className="text-gray-600 dark:text-gray-400">
              {t("phoneVerify.resendCountdown", { seconds: countdown })}
            </p>
          ) : (
            <Button
              onClick={handleResend}
              disabled={isLoading}
              className="py-3 px-6 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              {isSendingCode
                ? t("phoneVerify.resending")
                : t("phoneVerify.resendButton")}
            </Button>
          )}

          <div className="bg-space-blue px-4 rounded-md py-6 w-full dark:bg-indigo-800">
            <div className="flex flex-row gap-5 items-center text-white">
              <TriangleAlert className="text-red-500" size={40} />
              <p className="text-sm">{t("phoneVerify.alert")}</p>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
