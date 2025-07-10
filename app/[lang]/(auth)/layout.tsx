import AuthTitle from "@/components/features/auth/AuthTitle";
import { Card, CardHeader } from "@/components/ui/card";
import { headers } from "next/headers";
import LogoIcon from '@/public/icons/logo.svg'
type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const headersList = await headers();

  const currentPath = headersList.get("x-invoke-path");

  const refererUrl = headersList.get("referer");
  const parsedRefererPath = refererUrl ? new URL(refererUrl).pathname : "/";



  return (
    <div className="container flex items-center justify-center">
      <Card className="px-10 min-w-[560px] mx-auto w-fit shadow-lg my-20">
        <CardHeader className="text-center">
          <div className="flex gap-4 flex-col">
            <div className="flex justify-center">
              <LogoIcon className="h-[120px] w-full dark:fill-white" />
            </div>
            <AuthTitle />
          </div>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
