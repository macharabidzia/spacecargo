"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { showToast } from "./SuccessToast";

interface ClientToastTriggerProps {
  message: string;
}

const ClientToastTrigger: React.FC<ClientToastTriggerProps> = ({ message }) => {
  const hasToasted = useRef(false);
  const description = 'An error occurred during server-side data fetching.';
  useEffect(() => {
    if (message && !hasToasted.current) {
      let toastRef;
      setTimeout(() => {
        toastRef = showToast("error", "Error", description)

      });
      toast.dismiss(toastRef);
      hasToasted.current = true;
    }
  }, [message]);

  return null;
};

export default ClientToastTrigger;
