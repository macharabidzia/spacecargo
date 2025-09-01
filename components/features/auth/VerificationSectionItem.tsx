import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVerification } from "@/hooks/use-verification";

type VerificationSectionItemProps = {
    title: string;
    description: string;
    contactInfo: string;
    Icon: React.ElementType;
    verificationState: ReturnType<typeof useVerification>;
    onResend: () => void;
    onVerify: () => void;
    t: (key: string, defaultValue: string) => string;
};

export function VerificationSectionItem({
    title,
    description,
    contactInfo,
    Icon,
    verificationState,
    onResend,
    onVerify,
    t,
}: VerificationSectionItemProps) {
    return (
        <div className="border border-gray-300 dark:border-gray-700 p-6 md:p-8 rounded-xl space-y-5 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3 md:gap-4">
                <Icon size={28} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {title}
                </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {description}:{" "}
                <strong className="text-gray-900 dark:text-gray-100">{contactInfo}</strong>
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
                <Input
                    type="text"
                    placeholder={t("auth.enterVerificationCode", "შეიყვანეთ კოდი")}
                    className="flex-1 py-4 text-center text-lg tracking-widest border-gray-300 rounded-md  dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:border-blue-400"
                    maxLength={6}
                    value={verificationState.code}
                    onChange={(e) => verificationState.setCode(e.target.value)}
                    disabled={
                        verificationState.isVerifyingCode ||
                        verificationState.isSendingCode ||
                        verificationState.isVerified
                    }
                />
                <Button
                    onClick={onVerify}
                    disabled={
                        verificationState.isVerifyingCode ||
                        verificationState.code.length !== 4 ||
                        verificationState.isVerified
                    }
                    className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    {verificationState.isVerifyingCode
                        ? t("auth.verifying", "ვერიფიკაცია...")
                        : t("auth.verify", "დადასტურება")}
                </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
                {verificationState.isCountingDown && !verificationState.isVerified ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t("auth.resendIn", "ხელახლა გაგზავნა")}{" "}
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                            {verificationState.countdown}
                        </span>{" "}
                        {t("common.seconds", "წამში.")}
                    </p>
                ) : (
                    <Button
                        onClick={onResend}
                        disabled={verificationState.isSendingCode || verificationState.isVerified}
                        variant="outline"
                        className="py-2 px-4 text-blue-600 border-blue-600 hover:bg-blue-50 text-sm dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900"
                    >
                        {verificationState.isSendingCode
                            ? t("auth.sending", "ხელახლა გაგზავნა...")
                            : t("auth.resendCode", "კოდის ხელახლა გაგზავნა")}
                    </Button>
                )}
            </div>
        </div>
    );
}
