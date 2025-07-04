import { RegisterForm } from "@/components/features/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getLawRegisterFormFields,
  getRegisterFormFields,
} from "@/lib/form/register.fields";
import React from "react";

const Register = async () => {
  const dictionary = await getDictionary("en");
  const formFields = getRegisterFormFields();
  const lawFormFields = getLawRegisterFormFields();
  return (
    <div className="opacity-0 animate-fade-slide-in">
      <Tabs defaultValue="natural" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 h-auto bg-transparent gap-4">
          <TabsTrigger
            value="natural"
            className="data-[state=active]:bg-space-blue-light/25 data-[state=active]:text-blue-700 bg-background py-2.5 cursor-pointer"
          >
            ფიზიკური პირი
          </TabsTrigger>
          <TabsTrigger
            value="legal"
            className="data-[state=active]:bg-space-blue-light/25 data-[state=active]:text-blue-700 bg-background py-2.5 cursor-pointer"
          >
            იურიდიული პირი
          </TabsTrigger>
        </TabsList>
        <TabsContent value="natural">
          <RegisterForm
            type="natural"
            dictionary={dictionary.common}
            fields={lawFormFields}
          />
        </TabsContent>
        <TabsContent value="legal">
          <RegisterForm
            type="legal"
            dictionary={dictionary.common}
            fields={formFields}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Register;
