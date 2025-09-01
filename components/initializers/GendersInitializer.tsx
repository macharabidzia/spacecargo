"use client";

import { useGlobalDataStore } from "@/store/GlobalDataStore";
import { Gender } from "@/store/slices/genders.slice";
import { useEffect, useRef } from "react";
interface genderInitializerProps {
  gender: Gender[] | null;
}

const GendersInitializer = ({ gender }: genderInitializerProps) => {
  const setGender = useGlobalDataStore((state) => state.setGenders);
  const initialized = useRef(false); 

  useEffect(() => {
    if (!initialized.current) {
      if (gender) {
        setGender(gender);
        console.log("Zustand store initialized with gender data.");
      } else {
        setGender(null);
        console.log("No gender data, store cleared.");
      }
      initialized.current = true;
    }
  }, [gender, setGender]); 

  return null;
};

export default GendersInitializer;
