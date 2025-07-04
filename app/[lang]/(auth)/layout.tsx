import AuthTitle from "@/components/features/auth/AuthTitle";
import { Card, CardHeader } from "@/components/ui/card";
import { headers } from "next/headers";
import Image from "next/image";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const headersList = await headers();

  const currentPath =
    headersList.get("x-invoke-path") ||
    new URL(headersList.get("referer") || "/").pathname;

  let isRegisterLaw = currentPath.includes("register");

  console.log(isRegisterLaw);
  return (
    <div className="container flex items-center justify-center">
      <Card className="px-10 min-w-[560px] mx-auto w-fit shadow-lg my-20">
        <CardHeader className="text-center">
          <div className="flex gap-4 flex-col">
            <div className="flex justify-center">
              <Image
                src={"/icons/logo.svg"}
                width={100}
                height={100}
                alt="Company Logo"
              />
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
