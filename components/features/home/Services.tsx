import Image from "next/image";
import React from "react";

type Service = {
  title: string;
  text: string;
  url: string;
};

const Services: React.FC = () => {
  const list: Service[] = [
    {
      title: "ფრენები",
      text: "გადაზიდვები 300-ზე მეტი მიმართულებით, უსაფრთხო და სწრაფი ფრენა მსოფლიოს გარშემო.",
      url: "/icons/airplane.svg",
    },
    {
      title: "SMS შეტყობინება",
      text: "SMS-ით და ელ-ფოსტით ამანათზე ინფორმაციის შეტყობინება",
      url: "/icons/sms-star.svg",
    },
    {
      title: "კონსულტაცია",
      text: "საკონსულტაციო დახმარება ნებისმიერი სახის საქონლის (კანონით დადგენილი) მოძიებასა და შესყიდვასთან დაკავშირებით.",
      url: "/icons/consulting.svg",
    },
    {
      title: "საკურიერო სერვისი",
      text: "საკურიერო სერვისი ქვეყნის მასშტაბით ტვირთის მიწოდება სწრაფად, უსაფრთხოდ და სანდოდ.",
      url: "/icons/truck.svg",
    },
    {
      title: "საგადახდო სისტემები",
      text: "მოქნილი და კომფორტული გადახდის საშუალებები (საბანკო გადარიცხვა, სწრაფი გადახდის აპარატები, ონლაინ და მობაილ გადახდები).",
      url: "/icons/convert-card.svg",
    },
    {
      title: "ყოველდღიური რეისები",
      text: "ყოველდღიური ფრენები სანდო გადაზიდვისთვის, მოქნილი გრაფიკი და სწრაფი ტრანსპორტირება.",
      url: "/icons/clock.svg",
    },
  ];

  return (
    <section>
      <h1 className="text-center text-4xl font-semibold mb-4">სერვისები</h1>
      <p className="text-center mt-2 mb-8 max-w-2xl mx-auto text-gray-400">
        თქვენი ტვირთი — ჩვენი პასუხისმგებლობა ცაში და მიწაზე
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto ">
        {list.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              width={80}
              height={80}
              src={service.url}
              alt={service.title}
              className="w-20 h-20 mb-4 object-contain"
            />
            <h2 className="text-xl font-semibold text-center mb-2 capitalize">
              {service.title}
            </h2>
            <p className="text-center text-sm">{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
