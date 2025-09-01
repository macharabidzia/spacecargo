// slices/authSlice.ts
import { StateCreator } from "zustand";
import { GlobalDataState } from "../GlobalDataStore";

export interface AuthSlice {
  token: string | null;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

export const createAuthSlice: StateCreator<
  GlobalDataState,
  [],
  [],
  AuthSlice
> = (set, get, store) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearAuth: () => set({ token: null }),
});
