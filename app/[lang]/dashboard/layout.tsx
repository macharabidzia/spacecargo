import Header from "@/components/features/dashboard/header/Header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { lang } = await params;
  return (
    <>
      <Header lang={lang} />
      {children}
    </>
  );
}
