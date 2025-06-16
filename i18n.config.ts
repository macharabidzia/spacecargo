const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en", // Your default locale
    locales: ["en", "ka", "ru"], // All supported locales (e.g., English, Georgian, Russian)
    localeDetection: false, // Set to false if you want to handle locale detection manually or rely on prefixing
  },
  // Optional: Set a custom path for your translations if not './public/locales'
  // localePath: path.resolve('./public/locales'),
};
