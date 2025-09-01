import { GlobalDialog } from "@/components/common/modals/GlobalDialog";
import Header from "@/components/features/dashboard/header/Header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const { lang } = await params;
  return (
    <>
      <Header lang={lang} />
      {children}
      <GlobalDialog />

    </>
  );
}
