"use client";

import { GenericModalsProps, ModalConfig } from "@/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function GenericModals({ modalsConfig }: GenericModalsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeModalConfig: ModalConfig | undefined = modalsConfig.find(
    (config) => searchParams.get(config.queryParamName) === "true"
  );

  const activeModalName: string | null =
    activeModalConfig?.queryParamName || null;

  const [isOpen, setIsOpen] = useState(Boolean(activeModalName));
  const [currentRenderedModal, setCurrentRenderedModal] = useState<
    ModalConfig | undefined
  >(activeModalConfig);

  useEffect(() => {
    if (activeModalConfig) {
      setCurrentRenderedModal(activeModalConfig);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [activeModalConfig]);

  const requestClose = useCallback(() => {
    setIsOpen(false);

    setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (activeModalName) {
        newSearchParams.delete(activeModalName);
      }

      const queryString = newSearchParams.toString();
      const finalUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(finalUrl, { scroll: false });
      if (!newSearchParams.has(activeModalName || "")) {
        setCurrentRenderedModal(undefined);
      }
    }, 300);
  }, [activeModalName, pathname, router, searchParams]);

  if (!currentRenderedModal || (!isOpen && !activeModalConfig)) {
    return null;
  }

  const ModalComponent = currentRenderedModal.component;

  const commonModalProps = {
    open: isOpen,
    onOpenChange: requestClose,
  };

  return <ModalComponent {...commonModalProps} />;
}
