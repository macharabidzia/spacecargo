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

interface SideNavProps {
  currentLang: Lang;
}

export const SideNav = async ({ currentLang }: SideNavProps) => {
  const fullDictionary = await getDictionary(currentLang);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-space-blue-muted">
            {fullDictionary.common["sidenav.application"]}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavLinkList
                currentLanguage={currentLang}
                dictionary={fullDictionary.common}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
