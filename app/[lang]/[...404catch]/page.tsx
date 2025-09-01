import GoBackButton from "@/components/features/not-found/GoBackButton";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/dictionaries";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

type NotFound = {
  params: Promise<{ lang: "en" | "ka" }>;
};

export default async function NotFound({ params }: NotFound) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).common;
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center bg-gray-50 w-full space-y-4">
      <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        {dict.notFound.pageNotFound}
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        {dict.notFound.pageNotFoundDescription}
      </p>
      <div className="flex items-row gap-4">
        <GoBackButton />
        <Link href="/">
          <Button>
            <HomeIcon />
            {dict.notFound.goHome}
          </Button>
        </Link>
      </div>
    </div>
  );
}
