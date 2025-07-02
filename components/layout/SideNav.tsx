import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { getDictionary } from "@/i18n/dictionaries";

interface SideNavProps {
  currentLang: Lang;
}

export const SideNav = async ({ currentLang }: SideNavProps) => {
  const fullDictionary = await getDictionary(currentLang);
  const items = [
    {
      title: fullDictionary.common["sidenav.home"],
      url: "/",
      icon: Home,
    },
    {
      title: fullDictionary.common["sidenav.inbox"],
      url: "/dashboard/room",
      icon: Inbox,
    },
    {
      title: fullDictionary.common["sidenav.calendar"],
      url: "#",
      icon: Calendar,
    },
    {
      title: fullDictionary.common["sidenav.search"],
      url: "#",
      icon: Search,
    },
    {
      title: fullDictionary.common["sidenav.settings"],
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {fullDictionary.common["sidenav.application"]}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Button variant="outline">
                    {fullDictionary.common["sidenav.click_button"]}
                  </Button>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
