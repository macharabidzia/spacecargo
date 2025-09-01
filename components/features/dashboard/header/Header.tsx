import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Coins, Percent, UserIcon, Wallet } from "lucide-react";
import React from "react";
import { NavLinkList } from "./NavLinkList";
import { getDictionary } from "@/i18n/dictionaries";
import { fetchUserDashboard, getUserInfo } from "@/actions/user.actions";
import { AddDeclarationButton } from "./AddDeclarationButton";
import { AddBalanceButton } from "./AddBalanceButton";
import { UserDashboardData } from "@/types/user";

type Header = {
  lang: Lang;
};
type AccountKey = "balance" | "transportation" | "payAmount";

const Header = async ({ lang }: Header) => {
  const dictionary = (await getDictionary(lang)).common;
  const user = await getUserInfo();
  const dashboardInfo = await fetchUserDashboard();

  const services = [
    {
      value: "transportation",
      name: "dashboardStats.transportation",
      icon: Percent,
      color: "bg-space-blue-light/20",
      text: "text-space-blue-light",
    },
    {
      value: "balance",
      name: "dashboardStats.balance",
      icon: Wallet,
      color: "bg-space-green/20",
      text: "text-space-green",
    },
    {
      value: "payAmount",
      name: "dashboardStats.debt",
      icon: Wallet,
      color: "bg-space-red/20",
      text: "text-space-red",
    },
    {
      value: "bonusPoint",
      name: "dashboardStats.spaceCoins",
      icon: Coins,
      color: "bg-space-orange/20",
      text: "text-space-orange",
    },
  ];
  function isAccountKey(key: string): key is AccountKey {
    return ["balance", "transportation", "payAmount"].includes(key);
  }
  return (
    <div className="container py-4">
      <Card
        className="
          bg-white/20 
          dark:bg-gray-900/20 
          backdrop-blur-lg
          border border-white/25 
          dark:border-gray-700/30 
          shadow-lg
          rounded-xl
          transition-colors
        "
      >
        <CardContent className="flex flex-col md:flex-row gap-6 px-6 ">
          <NavLinkList />
          <div className="flex flex-col flex-1 px-4 gap-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex items-center gap-5 ">
                <Avatar className="bg-gray-200 dark:bg-gray-800 h-14 w-14 flex items-center justify-center shadow-md">
                  <UserIcon className="text-gray-700 dark:text-gray-200" />
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {user.userInfo.firstNameEn + " " + user.userInfo.lastNameEn}
                  </h3>
                  <small className="text-gray-500 dark:text-gray-400 font-semibold">
                    {user.userInfo.pin}
                  </small>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <AddDeclarationButton />
                <AddBalanceButton />
              </div>
            </div>

            <Separator className="mt-4 ml-2 border-gray-300 dark:border-white dark:bg-white" />

            <div className="flex flex-wrap lg:flex-row gap-6 justify-between">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 flex-1 min-w-[200px] max-w-[300px]"
                >
                  <Avatar
                    className={`h-14 w-14 flex items-center justify-center ${item.color} shadow-md`}
                  >
                    <item.icon className={`${item.text} opacity-90`} />
                  </Avatar>
                  <div>
                    <small className="text-gray-600 dark:text-gray-400">
                      {dictionary[item.name]}
                    </small>
                    <h3
                      className={`${item.text} opacity-90 text-xl font-semibold`}
                    >
                      {isAccountKey(item.value)
                        ? dashboardInfo.account[item.value]
                        : dashboardInfo[
                            item.value as keyof UserDashboardData
                          ] ?? 0}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
