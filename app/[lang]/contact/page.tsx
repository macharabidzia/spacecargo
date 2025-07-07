import ContactForm from "@/components/features/contact/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";

import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";

const Contact = async ({ params }: { params: { lang: "en" | "ka" } }) => {
  const { lang } = params;
  const fullDictionary = (await getDictionary(lang)).common;

  return (
    <div className="container py-12">
      <h1 className="text-4xl text-center text-space-blue font-semibold mb-12">
        {fullDictionary.contact["pageTitle"]}
      </h1>
      <Card className="shadow-lg p-2 ">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="bg-space-blue-light md:rounded-md text-white p-8 flex flex-col justify-between relative overflow-hidden flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {fullDictionary.contact["contactInformationTitle"]}
              </h2>
              <p className="mb-36 text-blue-100">
                {fullDictionary.contact["contactInformationSubtitle"]}
              </p>

              <div className="flex flex-col gap-y-12 mb-auto text-lg">
                <div className="flex items-center">
                  <Phone size={24} className="mr-3" />
                  <span>+995 (032) 2 12 09 90</span>
                </div>
                <div className="flex items-center">
                  <Mail size={24} className="mr-3" />
                  <span>customerservice@spacecargo.ge</span>
                </div>
                <div className="flex items-start">
                  <MapPin size={24} className="mr-3 mt-1" />
                  <address className="not-italic">
                    {fullDictionary.contact["addressLine1"]}
                    <br />
                    {fullDictionary.contact["addressLine2"]}
                  </address>
                </div>
              </div>

              <div className="flex space-x-6 mt-36">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>

              <div className="absolute bottom-4 right-4 pointer-events-none">
                <Image
                  src="/icons/letter_send.svg"
                  alt="Paper plane illustration"
                  width={100}
                  height={100}
                  className="w-auto h-auto"
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-b-md md:rounded-r-md md:rounded-bl-none flex-1">
              <ContactForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
