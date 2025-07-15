"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopUpDrawer from "./TopUpDrawer";
import EditProfileDrawer from "./EditProfileDrawer";

export default function DashboardDrawers() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasTopUp = searchParams.get("topUp") === "true";
  const hasEdit = searchParams.get("edit") === "true";
  const drawerFromUrl: "topUp" | "edit" | null = hasTopUp
    ? "topUp"
    : hasEdit
    ? "edit"
    : null;

  const [activeDrawer, setActiveDrawer] = useState(drawerFromUrl);
  const [isOpen, setIsOpen] = useState(Boolean(drawerFromUrl));

  useEffect(() => {
    setActiveDrawer(drawerFromUrl);
    setIsOpen(Boolean(drawerFromUrl));
  }, [drawerFromUrl]);

  useEffect(() => {
    if (hasTopUp && hasEdit) {
      const p = new URLSearchParams(searchParams);
      p.delete("edit");

      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    }
  }, [hasTopUp, hasEdit, pathname, router, searchParams]);

  const requestClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!isOpen) {
      const p = new URLSearchParams(searchParams);
      p.delete("topUp");
      p.delete("edit");
      router.replace(`${pathname}`, {
        scroll: false,
      });
    }
  }, [isOpen, router]);
  if (!activeDrawer) return null;

  const commonSheetProps = {
    open: isOpen,
    onClose: requestClose,
  };

  return activeDrawer === "topUp" ? (
    <TopUpDrawer {...commonSheetProps} />
  ) : (
    <EditProfileDrawer {...commonSheetProps} />
  );
}
