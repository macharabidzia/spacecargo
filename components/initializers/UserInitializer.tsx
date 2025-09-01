// components/UserInitializer.tsx
"use client";

import { useGlobalDataStore } from "@/store/GlobalDataStore";
import { UserData } from "@/types/user";
import { useEffect, useRef } from "react";

interface UserInitializerProps {
  user: UserData | null;
}

const UserInitializer = ({ user = null }: UserInitializerProps) => {
  const setUser = useGlobalDataStore((state) => state.setUser);
  const initialized = useRef(false); // This ref is for tracking previous user for comparison, not for initial setting // const previousUserRef = useRef<UserData | null>(null); // Only needed if you want more complex updates
  useEffect(() => {
    if (!initialized.current) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      initialized.current = true;
    }
  }, [user, setUser]);

  return null;
};

export default UserInitializer;
