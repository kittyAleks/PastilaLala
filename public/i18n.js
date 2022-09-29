import i18n from "i18next";
import Backend from "i18next-http-backend";
import { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationUA from "./ua/translation.json";
import translationRU from "./ru/translation.json";

i18n
  // .use(Backend)
  // .use(i18nextReactNative)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: translationEN,
      },
      uk: {
        translation: translationUA,
      },
      ru: {
        translation: translationRU,
      },
    },
    defaultLocale: "en",
    locales: ["en", "uk"],
    supportedLngs: ["en", "ru", "uk"],
    fallbackLng: "uk",
    // loadPath: `${API_BASE_URL}/xyzzzzzzz/{{lng}}`
    backend: {
      loadPath: "/{{lng}}/translation.json",
    },
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
export default i18n;
