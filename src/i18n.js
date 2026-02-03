import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';
import vi from './locales/vi.json';
import th from './locales/th.json';
import id from './locales/id.json';
import ar from './locales/ar.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import fil from './locales/fil.json';
import ms from './locales/ms.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  vi: { translation: vi },
  th: { translation: th },
  id: { translation: id },
  ar: { translation: ar },
  ja: { translation: ja },
  ko: { translation: ko },
  fil: { translation: fil },
  ms: { translation: ms }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;