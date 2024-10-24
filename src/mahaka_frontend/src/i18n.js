// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files

// Initialize i18next
i18n
  .use(LanguageDetector) // Auto-detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to our application!",
          description: "This is an example of multi-language support.",
               },
      },
      id: {
        translation: {
          welcome: "Selamat datang di aplikasi kami!",
          description: "Ini adalah contoh dukungan multi-bahasa.",
        },
      },
    },
    fallbackLng: "fr", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
