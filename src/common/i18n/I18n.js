import EN from './languages/en';
import TR from './languages/tr';
import LocalStorage from '../utils/LocalStorage';

const languages = {
  EN,
  TR
};

export const LANGUAGE_KEYS = {
  EN: 'EN',
  TR: 'TR'
};

const defaultLanguage = LANGUAGE_KEYS.TR;

export default class I18n {
  static currentLanguage =
    (LocalStorage.getItem('LANGUAGE') &&
      LocalStorage.getItem('LANGUAGE').toUpperCase()) ||
    defaultLanguage;

  static translate(key, ...params) {
    let translatedString = languages[this.currentLanguage][key];

    if (translatedString === undefined) {
      translatedString = key;
    }

    params.forEach((param, paramIndex) => {
      translatedString = translatedString.replace(`{${paramIndex}}`, param);
    });

    return translatedString;
  }

  static set language(languageKey) {
    const languageKeyInUpper = languageKey.toUpperCase();
    if (languages && languages[languageKeyInUpper]) {
      LocalStorage.setItem('LANGUAGE', languageKeyInUpper);
      this.currentLanguage = languageKeyInUpper;
    }
  }

  static get language() {
    return this.currentLanguage;
  }
}
