"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ClientToastTriggerProps {
  message: string;
}

const ClientToastTrigger: React.FC<ClientToastTriggerProps> = ({ message }) => {
  const hasToasted = useRef(false);

  useEffect(() => {
    if (message && !hasToasted.current) {
      let toastRef;
      setTimeout(() => {
        toastRef = toast.error(message, {
          description: "An error occurred during server-side data fetching.",
          duration: 1000,
        });
      });
      toast.dismiss(toastRef);
      hasToasted.current = true;
    }
  }, [message]);

  return null;
};

export default ClientToastTrigger;
