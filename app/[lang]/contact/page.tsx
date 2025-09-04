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
      <h1 className="text-3xl sm:text-4xl md:text-5xl mt-8 text-center text-space-blue dark:text-white mb-8 md:mb-12 font-bold">
        {fullDictionary.contact["pageTitle"]}
      </h1>

      <Card className="shadow-lg w-full py-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row w-full">
            {/* Left panel */}
            <div className="bg-space-blue dark:bg-space-blue md:rounded-md text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden flex-1 min-w-0">
              <h2 className="text-2xl font-bold mb-2">{fullDictionary.contact["contactInformationTitle"]}</h2>
              <p className="mb-6 md:mb-12 text-white break-words">
                {fullDictionary.contact["contactInformationSubtitle"]}
              </p>

              <div className="flex flex-col gap-y-6 md:gap-y-12 text-base md:text-lg">
                <div className="flex items-center flex-wrap">
                  <Phone size={24} className="mr-3" />
                  <span>+995 (032) 2 12 09 90</span>
                </div>
                <div className="flex items-center flex-wrap">
                  <Mail size={24} className="mr-3" />
                  <span>customerservice@spacecargo.ge</span>
                </div>
                <div className="flex items-start flex-wrap">
                  <MapPin size={24} className="mr-3 mt-1" />
                  <address className="not-italic break-words">
                    {fullDictionary.contact["addressLine1"]}
                    <br />
                    {fullDictionary.contact["addressLine2"]}
                  </address>
                </div>
              </div>

              <div className="flex space-x-4 mt-6 md:mt-12 flex-wrap">
                <Link href="#" aria-label="Website" className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors">
                  <Globe size={24} />
                </Link>
                <Link href="#" aria-label="Message" className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors">
                  <MessageCircle size={24} />
                </Link>
                <Link href="#" aria-label="Share" className="p-2 rounded-full border border-white hover:bg-white hover:text-space-blue-light transition-colors">
                  <Share2 size={24} />
                </Link>
              </div>

              <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 pointer-events-none w-20 h-20 md:w-24 md:h-24">
                <Image
                  src="/icons/letter_send.svg"
                  alt="Paper plane illustration"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>

            {/* Right panel */}
            <div className="p-6 md:p-8 rounded-b-md md:rounded-r-md md:rounded-bl-none flex-1 min-w-0 w-full">
              <ContactForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

  );
};

export default Contact;
