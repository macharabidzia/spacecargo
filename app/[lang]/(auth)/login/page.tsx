import LoginForm from "@/components/features/auth/LoginForm";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const page = () => {
  return (
    <div className="container flex items-center justify-center">
      <Card className="px-4 mx-auto max-w-[560px] w-full shadow-lg my-20">
        <CardHeader className="text-center">
          <div className="flex gap-6 flex-col">
            <div className="flex justify-center">
              <Image
                src={"/icons/logo.svg"}
                width={100}
                height={100}
                alt="Company Logo"
              />
            </div>
            <h1 className="text-4xl font-semibold text-space-blue-default">
              ავტორიზაცია
            </h1>
            <p className="text-sm">
              გთხოვთ გაიაროთ ავტორიზაცია, თუ არ გაქვთ ანგარიში გაიარეთ
              რეგისრაცია, რათა ისარგებლოთ ჩვენი სერვისებით
            </p>
          </div>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
};

export default page;
