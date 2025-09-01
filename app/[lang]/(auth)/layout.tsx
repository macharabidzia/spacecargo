import AuthModalProvider from "@/components/common/modals/AuthModalProvider";
import AuthTitle from "@/components/features/auth/AuthTitle";
import { Card, CardHeader } from "@/components/ui/card";
import LogoIcon from '@/public/icons/logo.svg'

type AuthLayoutProps = {
  children: React.ReactNode;
};
export const metadata = {
  title: "Auth Page",
  robots: {
    index: false, 
    follow: true, 
  },
};
const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <div className="container flex items-center justify-center">
      <Card className="px-6 md:min-w-[760px] mx-auto w-fit shadow-lg my-20">
        <CardHeader className="text-center">
          <div className="flex gap-4 flex-col">
            <div className="flex justify-center">
              <LogoIcon className="h-[120px] w-full dark:fill-white fill-space-blue-muted" />
            </div>
            <AuthTitle />
          </div>
        </CardHeader>
        {children}
      </Card>
      <AuthModalProvider />
    </div>
  );
};

export default AuthLayout;
