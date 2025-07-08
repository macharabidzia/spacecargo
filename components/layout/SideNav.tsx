import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { getDictionary } from "@/i18n/dictionaries";
import NavLinkList from "./Header/NavLinkList";
import { siteConfig } from "@/config";

interface SideNavProps {
  currentLang: Lang;
}

export const SideNav = async ({ currentLang }: SideNavProps) => {
  const fullDictionary = await getDictionary(currentLang);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {fullDictionary.common["sidenav.application"]}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavLinkList
                currentLanguage={currentLang}
                dictionary={fullDictionary.common}
                mainNav={siteConfig.mainNav}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
