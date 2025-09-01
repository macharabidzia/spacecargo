"use client";

import { useEffect } from "react";
import { useDialogSlice } from "@/store/slices/dialog.slice";

interface Props {
    message?: string | null;
    title?: string;
}

export default function NotificationClientHandler({ message, title = "Notification" }: Props) {
    const { openDialog } = useDialogSlice();

    useEffect(() => {
        if (message) {
            openDialog(title, message);
        }
    }, [message, openDialog,title]);

    return null;
}
