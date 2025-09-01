import { getPersonalData } from "@/actions/user.actions";
import ProfileForm from "@/components/features/settings/ProfileForm";
import { getDictionary } from "@/i18n/dictionaries";
import { ContractsLinks } from "@/types/user";
import Link from "next/link";
type IPersonalInfomrationPage = {
  params: Promise<{ lang: Lang }>;
};
export const dynamic = 'force-dynamic'
const PersonalInfomrationPage = async ({
  params,
}: IPersonalInfomrationPage) => {
  let terms;
  const { lang } = await params;
  try{
    terms = await getPersonalData();
  }catch(error){
    console.log(error)
  }
  const dictionary = (await getDictionary(lang)).common;
  return (
    <>
      <div className="mb-10">
        <ProfileForm />
        <div className="flex flex-col gap-6 mt-10">
            {terms && (Object.keys(terms) as (keyof ContractsLinks)[]).map(
              (termName) => (
                <Link
                  key={termName}
                  target="_blank"
                  className="underline"
                  href={terms[termName]} 
                >
                  {dictionary[termName]}
                </Link>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default PersonalInfomrationPage;
