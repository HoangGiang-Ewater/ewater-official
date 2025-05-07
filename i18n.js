import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your JSON files
import enTranslations from "./locales/en.json";
import viTranslations from "./locales/vi.json";

i18n
  .use(initReactI18next) // Initialize i18next for React
  .init({
    resources: {
      en: { translation: enTranslations }, // English translations
      vi: { translation: viTranslations }, // Vietnamese translations
    },
    lng: "vi", // Default language (from your i18nConfig.js)
    fallbackLng: "vi", // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
