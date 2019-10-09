import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import detectBrowserLanguage from 'detect-browser-language';

import translationEng from './locales/en/translation.json';
import translationRu from './locales/ru/translation.json';
const currentLang = detectBrowserLanguage();
i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: currentLang.substring(0,2),
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      en: {
        translations: translationEng
      },
      ru: {
        translations: translationRu
      }
    },

    ns: ['translations'],
    defaultNS: 'translations',
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'],

    cookieMinutes: 10,
    cookieDomain: 'wordsDomain',
    htmlTag: document.documentElement
  });

export default i18n;
