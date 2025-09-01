"use client";

import { useServerAction } from "@/hooks/useServerAction";
import { sendPhoneVerification, verifyPhone } from "@/actions/user.actions";
import { useEffect } from "react";
import PhoneVerifyModal from "../modals/PhoneVerifyModal";

type PhoneVerifyWrapperProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userPhone?: string;
};

export default function PhoneVerifyWrapper({
    open,
    onOpenChange,
    userPhone = "+995XXXXXXXXX",
}: PhoneVerifyWrapperProps) {
    const { isPending: isSendingCodeLocal, execute: executeSendCode } =
        useServerAction(sendPhoneVerification);

    const { isPending: isVerifyingCodeLocal, execute: executeVerifyCode } =
        useServerAction(verifyPhone, {
            onSuccess: () => {
                onOpenChange(false);
            },
        });

    useEffect(() => {
        if (open) {
            executeSendCode({ phone: userPhone });
        }

    }, [open, userPhone, executeSendCode]);

    const handleResend = () => {
        executeSendCode({ phone: userPhone });
    };

    const handleVerify = (code: string) => {
        console.log(userPhone, code)
        executeVerifyCode({ phone: userPhone.toString(), code: code.toString() });
    };

    return (
        <PhoneVerifyModal
            open={open}
            onOpenChange={onOpenChange}
            userPhone={userPhone}
            onResend={handleResend}
            onVerify={handleVerify}
            isSendingCode={isSendingCodeLocal}
            isVerifyingCode={isVerifyingCodeLocal}
            onCountdownEnd={() => { }}
        />
    );
}