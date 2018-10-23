import moment from 'moment';
export var setLocale = function setLocale(locale) {
  if (locale === void 0) {
    locale = 'en';
  }

  moment.locale(locale);
  return moment;
};
export default moment;