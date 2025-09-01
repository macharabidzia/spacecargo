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
import { Mail, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useServerAction } from "@/hooks/useServerAction";
import { sendResetPassword } from "@/actions/user.actions";
import { useClientTranslation } from "@/i18n/i18n-provider";

type SendResetEmailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendEmail: (email: string) => void;
  isSending: boolean;
  error?: string;
  successMessage?: string;
};

export default function SendResetEmailModal({
  open,
  onOpenChange,
  isSending,
  error,
  successMessage,
}: SendResetEmailModalProps) {
  const { t } = useClientTranslation("common"); 
  const [email, setEmail] = useState<string>("");
  const { execute, data: res } = useServerAction(sendResetPassword);

  const handleSend = () => {
    if (email) {
      execute({ email });
    }
  };

  useEffect(() => {
    if (res?.type === "success") {
      onOpenChange(false);
    }
  }, [res, onOpenChange]);

  const isLoading = isSending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:min-w-[856px] py-0 my-0 space-y-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-space-blue dark:text-space-blue-light mt-6">
            {t("resetPassword.title")}
          </DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            {t("resetPassword.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5">
          <Mail
            size={40}
            className="text-space-blue dark:text-space-blue-light"
          />
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            {t("resetPassword.infoText")}
          </p>

          <div className="w-full max-w-sm flex flex-col items-center gap-3">
            {successMessage ? (
              <p className="text-green-600 dark:text-green-400 text-center font-semibold">
                {t("resetPassword.successMessage")}
              </p>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder={t("resetPassword.inputPlaceholder")}
                  className="py-6 text-center text-xl tracking-wide dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !email}
                  className="w-full py-6 bg-space-blue-light dark:bg-space-blue-dark  text-white hover:bg-space-blue-dark dark:hover:bg-space-blue-light transition-colors duration-200"
                >
                  {isLoading
                    ? t("resetPassword.sendingButton")
                    : t("resetPassword.sendButton")}
                </Button>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col items-center gap-4 py-4">
          {error && (
            <div className="bg-red-100 dark:bg-red-900 px-4 rounded-md py-3 w-full">
              <div className="flex flex-row gap-3 items-center text-red-700 dark:text-red-400">
                <TriangleAlert
                  className="text-red-500 dark:text-red-300"
                  size={24}
                />
                <p className="text-sm">{error || t("resetPassword.error.general")}</p>
              </div>
            </div>
          )}
          <div className="bg-space-blue dark:bg-space-blue-dark px-4 rounded-md py-6 w-full">
            <div className="flex flex-row gap-5 items-center text-white">
              <TriangleAlert
                className="text-red-500 dark:text-red-300"
                size={40}
              />
              <p className="text-sm">{t("resetPassword.error.spamNotice")}</p>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
