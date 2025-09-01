// slices/userSlice.ts
import { StateCreator } from "zustand";
import { GlobalDataState } from "../GlobalDataStore";
import { ApiResponse } from "@/types/api";
import { UserData } from "@/types/user";


export interface UserSlice {
  user: UserData | null;
  setUser: (user: UserData | null) => void;

  updateUser: (response: ApiResponse, updatedUserData?: UserData) => void;
  sendPhoneVerificationCode: (response: ApiResponse) => void;
  verifyPhoneCode: (response: ApiResponse) => void;
}

export const createUserSlice: StateCreator<
  GlobalDataState,
  [],
  [],
  UserSlice
> = (set, get) => ({
  user: null,

  setUser: (user) => set({ user }),

  updateUser: (_response, payload) => {
    const currentUser = get().user;
    if (!currentUser || !currentUser.userInfo) {
      throw new Error("User data not available for update.");
    }
    // Assume POST_CHANGE_USER returns the full updated UserData
    const updatedUserInfo = { ...currentUser.userInfo, ...payload };
    const updatedUser: UserData = {
      ...currentUser,
      userInfo: updatedUserInfo,
    };
    set({ user: { ...currentUser, ...updatedUser } });
  },

  sendPhoneVerificationCode: (_response) => {
    // Do nothing else
  },

  verifyPhoneCode: (_response) => {
    // Do nothing else
  },
});
