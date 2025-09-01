export type CommonDictionary = {
  "header.register": string;
  "header.login": string;
  [key: string]: string | CommonDictionary[keyof CommonDictionary] | any;
  "footer.contact": string;
  "footer.phone": string;
  "footer.email": string;
  "footer.address": string;
  "footer.sites.home": string;
  "footer.sites.services": string;
  "footer.sites.about_us": string;
  "footer.sites.contact": string;
  "footer.subscribe": string;
  "footer.subscribe_text": string;
  "footer.email_placeholder": string;
  "footer.copyright": string;

  "sidenav.application": string;
  "sidenav.home": string;
  "sidenav.inbox": string;
  "sidenav.calendar": string;
  "sidenav.search": string;
  "sidenav.settings": string;
  "sidenav.click_button": string;

  "lang.en": string;
  "lang.ka": string;

  welcome: string; // Note: This key does not use dot notation, which is fine.

  // Moved mainNav keys from the previous example to CommonDictionary as they are used in Header
  "mainNav.home": string;
  "mainNav.aboutUs": string;
  "mainNav.flights": string;
  "mainNav.news": string;
  "mainNav.contact": string;

  "site.description": string;
  "site.copyright": string;

  "form.country": string;
  "form.countryPlaceholder": string;
  "form.weight": string;
  "form.volume": string;
  "form.calculate": string;
  "country.china": string;
  "country.usa": string;
  "country.uk": string;
};

// Removed HeadingDictionaryContent as its keys are already defined directly within HomeDictionary.
// This avoids redundancy and simplifies type management.

export type HomeDictionary = {
  // Heading Section
  "heading.title": string;
  "heading.subtitle": string;
  "heading.description": string;
  "heading.buttonText": string;

  // News Section
  "news.title": string;
  "news.card1.title": string;
  "news.card1.footerText": string;
  "news.card2.title": string;
  "news.card2.footerText": string;
  "news.card3.title": string;
  "news.card3.footerText": string;
  "news.card.defaultText": string;
  "news.buttonText": string;

  // Services Section
  "services.mainTitle": string;
  "services.description": string;
  "services.flights.title": string;
  "services.flights.text": string;
  "services.sms.title": string;
  "services.sms.text": string;
  "services.consultation.title": string;
  "services.consultation.text": string;
  "services.courier.title": string;
  "services.courier.text": string;
  "services.paymentSystems.title": string;
  "services.paymentSystems.text": string;
  "services.dailyFlights.title": string;
  "services.dailyFlights.text": string;

  // Tariffs Section
  "tariffs.title": string;
  "tariffs.description": string;
  "tariffs.tabs.physicalPerson": string;
  "tariffs.tabs.legalPerson": string;
  "tableHeader.country": string;
  "tableHeader.importMethod": string;
  "tableHeader.pricePerKg": string;
  "tableHeader.oversizeWeight": string;
  "tariffs.labels.country": string;
  "tariffs.labels.importMethod": string;
  "tariffs.labels.pricePerKg": string;
  "tariffs.labels.oversizeWeight": string;
  "tariffs.yes": string;
  "tariffs.no": string;
  "tariffs.importMethods.air": string;
  "tariffs.importMethods.land": string;
  "tariffs.importMethods.tracking": string;
};

// AppDictionary correctly nests CommonDictionary and HomeDictionary
export type AppDictionary = {
  common: CommonDictionary;
  home: HomeDictionary;
};
