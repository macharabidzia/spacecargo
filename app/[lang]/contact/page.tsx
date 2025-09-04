import ContactForm from "@/components/features/contact/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";

type Lang = "en" | "ka";
type ContactProps = {
  params: Promise<{ lang: Lang }>;
};

export async function generateMetadata({ params }: ContactProps) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).common;

  return {
    title: dict.contact["pageTitle"],
    description: dict.contact["contactInformationSubtitle"],
    openGraph: {
      title: dict.contact["pageTitle"],
      description: dict.contact["contactInformationSubtitle"],
      url: `https://yourdomain.com/${lang}/contact`,
      siteName: "SpaceCargo",
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.contact["pageTitle"],
      description: dict.contact["contactInformationSubtitle"],
    },
  };
}

const Contact = async ({ params }: ContactProps) => {
  const { lang } = await params;
  const fullDictionary = (await getDictionary(lang)).common;

  return (
    <div className="container py-6">
      <h1 className="text-4xl mt-8 text-center text-space-blue dark:text-white mb-12 font-bold">
        {fullDictionary.contact["pageTitle"]}
      </h1>
      <Card className="shadow-lg p-2">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="bg-space-blue dark:bg-space-blue md:rounded-md text-white p-8 flex flex-col justify-between relative overflow-hidden flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {fullDictionary.contact["contactInformationTitle"]}
              </h2>
              <p className="mb-36 text-white">
                {fullDictionary.contact["contactInformationSubtitle"]}
              </p>

              <div className="flex flex-col gap-y-12 mb-auto text-lg text-white">
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
                <Link
                  href="#"
                  aria-label="Website"
                  className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors"
                >
                  <Globe size={24} />
                </Link>
                <Link
                  href="#"
                  aria-label="Message"
                  className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors"
                >
                  <MessageCircle size={24} />
                </Link>
                <Link
                  href="#"
                  aria-label="Share"
                  className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors"
                >
                  <Share2 size={24} />
                </Link>
              </div>

              <div className="absolute bottom-4 right-4 pointer-events-none">
                <Image
                  src="/icons/letter_send.svg"
                  alt="Paper plane illustration"
                  width={100}
                  height={100}
                  className="w-auto h-auto"
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="p-8 rounded-b-md md:rounded-r-md md:rounded-bl-none flex-1">
              <ContactForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
