import React from "react";

type Service = {
  title: string;
  text: string;
  url: string;
};

const Services: React.FC = () => {
  const list: Service[] = [
    {
      title: "ფრენები", // Flights
      text: "გადაზიდვები 300-ზე მეტი მიმართულებით, უსაფრთხო და სწრაფი ფრენა მსოფლიოს გარშემო.",
      url: "/icons/airplane.svg", // Matches "Air Freight" concept
    },
    {
      title: "SMS შეტყობინება", // SMS Notification
      text: "SMS-ით და ელ-ფოსტით ამანათზე ინფორმაციის შეტყობინება",
      url: "/icons/sms-star.svg", // Matches "Warehousing & Distribution" given the icon name, but conceptually more about tracking
    },
    {
      title: "კონსულტაცია", // Consultation
      text: "საკონსულტაციო დახმარება ნებისმიერი სახის საქონლის (კანონით დადგენილი) მოძიებასა და შესყიდვასთან დაკავშირებით.",
      url: "/icons/consulting.svg", // Matches "Road Freight" given the icon name, but conceptually about consulting
    },
    {
      title: "საკურიერო სერვისი", // Courier Service
      text: "საკურიერო სერვისი ქვეყნის მასშტაბით ტვირთის მიწოდება სწრაფად, უსაფრთხოდ და სანდოდ.",
      url: "/icons/truck.svg", // Matches "Ocean Freight" given the icon name, but conceptually about road delivery
    },
    {
      title: "საგადახდო სისტემები", // Payment Systems
      text: "მოქნილი და კომფორტული გადახდის საშუალებები (საბანკო გადარიცხვა, სწრაფი გადახდის აპარატები, ონლაინ და მობაილ გადახდები).",
      url: "/icons/convert-card.svg", // Matches "Rail Freight" given the icon name, but conceptually about payments
    },
    {
      title: "ყოველდღიური რეისები", // Daily Flights/Trips
      text: "ყოველდღიური ფრენები სანდო გადაზიდვისთვის, მოქნილი გრაფიკი და სწრაფი ტრანსპორტირება.",
      url: "/icons/clock.svg", // Matches "Customs Brokerage" given the icon name, but conceptually about daily operations/scheduling
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
            <img
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
