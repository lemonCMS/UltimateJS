import moment from 'moment';

export const setLocale = (locale = 'en') => {
  moment.locale(locale);
  return moment;
};

export default moment;
