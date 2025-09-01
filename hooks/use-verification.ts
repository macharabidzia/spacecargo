// hooks/useVerification.ts
import { useState, useEffect, useCallback } from "react";

type VerificationState = {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    countdown: number;
    isCountingDown: boolean;
    isSendingCode: boolean;
    isVerifyingCode: boolean;
    isVerified: boolean;
    verificationError: string | null;
    handleResend: () => Promise<void>;
    handleVerify: () => Promise<void>;
};

export function useVerification(
    onResendAction: () => Promise<boolean>,
    onVerifyAction: (code: string) => Promise<boolean>,
    initialCountdown = 30
): VerificationState {
    const [code, setCode] = useState("");
    const [countdown, setCountdown] = useState(initialCountdown);
    const [isCountingDown, setIsCountingDown] = useState(true);
    const [isSendingCode, setIsSendingCode] = useState(false);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isCountingDown && countdown > 0) {
            timer = setInterval(() => setCountdown((p) => p - 1), 1000);
        } else if (countdown === 0) {
            setIsCountingDown(false);
        }
        return () => timer && clearInterval(timer);
    }, [isCountingDown, countdown]);

    const handleResend = useCallback(async () => {
        setVerificationError(null);
        setIsSendingCode(true);
        try {
            const success = await onResendAction();
            if (success) {
                setCode("");
                setCountdown(initialCountdown);
                setIsCountingDown(true);
            } else {
                setVerificationError("Failed to resend code. Please try again.");
            }
        } catch (e) {
            console.error("Error during resend:", e);
            setVerificationError("An error occurred while resending the code.");
        } finally {
            setIsSendingCode(false);
        }
    }, [onResendAction, initialCountdown]);

    const handleVerify = useCallback(async () => {
        setVerificationError(null);
        setIsVerifyingCode(true);
        try {
            const success = await onVerifyAction(code);
            if (success) {
                setIsVerified(true);
            } else {
                setVerificationError("Incorrect verification code. Please try again.");
            }
        } catch (e) {
            console.error("Error during verification:", e);
            setVerificationError("An error occurred during verification.");
        } finally {
            setIsVerifyingCode(false);
        }
    }, [onVerifyAction, code]);

    return {
        code,
        setCode,
        countdown,
        isCountingDown,
        isSendingCode,
        isVerifyingCode,
        isVerified,
        verificationError,
        handleResend,
        handleVerify,
    };
}
