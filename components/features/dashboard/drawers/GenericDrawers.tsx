"use client";

import { ComponentType } from "react";
export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  id?: string | null;
};

export type DrawerConfig<T extends DrawerProps = DrawerProps> = {
  queryParamName: string;
  component: ComponentType<T>;
};

export interface GenericDrawersProps {
  drawersConfig: DrawerConfig[];
}

// components/GenericDrawers.tsx

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function GenericDrawers({ drawersConfig }: GenericDrawersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeDrawerConfig: DrawerConfig | undefined = drawersConfig.find(
    (config) => searchParams.get(config.queryParamName) === "true"
  );

  const activeDrawerName: string | null = activeDrawerConfig?.queryParamName || null;

  // New: Get the id from search parameters
  const itemId = searchParams.get('id');

  const [isOpen, setIsOpen] = useState(Boolean(activeDrawerName));
  const [currentRenderedDrawer, setCurrentRenderedDrawer] = useState<DrawerConfig | undefined>(activeDrawerConfig);

  useEffect(() => {
    if (activeDrawerConfig) {
      setCurrentRenderedDrawer(activeDrawerConfig);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [activeDrawerConfig]);

  const requestClose = useCallback(() => {
    setIsOpen(false);

    setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (activeDrawerName) {
        newSearchParams.delete(activeDrawerName);
      }

      // New: Also delete the id from the URL on close
      newSearchParams.delete('id');

      const queryString = newSearchParams.toString();
      const finalUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(finalUrl, { scroll: false });
      if (!newSearchParams.has(activeDrawerName || '')) {
        setCurrentRenderedDrawer(undefined);
      }
    }, 300);
  }, [activeDrawerName, pathname, router, searchParams]);

  if (!currentRenderedDrawer || (!isOpen && !activeDrawerConfig)) {
    return null;
  }

  const DrawerComponent = currentRenderedDrawer.component;

  // New: Pass the id as a prop to the component
  const commonSheetProps = {
    open: isOpen,
    onClose: requestClose,
    id: itemId,
  };

  return <DrawerComponent {...commonSheetProps} />;
}