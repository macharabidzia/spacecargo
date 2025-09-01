import { create } from "zustand";

interface DialogSlice {
    isOpen: boolean;
    title: string;
    message: string;
    openDialog: (title: string, message: string) => void;
    closeDialog: () => void;
}

export const useDialogSlice = create<DialogSlice>((set) => ({
    isOpen: false,
    title: "",
    message: "",
    openDialog: (title, message) => set({ isOpen: true, title, message }),
    closeDialog: () => set({ isOpen: false, title: "", message: "" }),
}));
