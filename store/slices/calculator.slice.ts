// slices/calculatorSlice.ts
import { StateCreator } from "zustand";
import { GlobalDataState } from "../GlobalDataStore";

export interface CalculatorSlice {
    canEdit: boolean;
    setCanEdit: (value: boolean) => void;
    toggleCanEdit: () => void;
}

export const createCalculatorSlice: StateCreator<
    GlobalDataState,
    [],
    [],
    CalculatorSlice
> = (set, get) => ({
    canEdit: false,
    setCanEdit: (value: boolean) =>
        set(() => ({
            canEdit: value,
        })),
    toggleCanEdit: () =>
        set((state) => ({
            canEdit: !state.canEdit,
        })),
});
