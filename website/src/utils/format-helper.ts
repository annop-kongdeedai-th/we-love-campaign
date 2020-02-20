import moment from 'moment';

type formatDateType =
  | 'DD MMM'
  | 'DD MMM YYYY'
  | 'DD MMMM'
  | 'DD MMMM YYYY'
  | 'MMDDYYYY'
  | 'DD/MM/YYYY'
  | 'YYYY/MM/DD'
  | 'DDMMYYYY'
  | 'MM/DD/YYYY';

export const date_display_CE_TO_BE = (
  value: string | Date,
  targetFormat?: formatDateType
) => {
  let date;
  date = moment(value, 'YYYY/MM/DD');

  return date && date.isValid()
    ? date.add('years', 543).format(targetFormat || 'DD MMMM YYYY')
    : '';
};

export const formatDateThai = (
  value: string | Date,
  targetFormat?: formatDateType
) => {
  let date;
  date = moment(value, 'YYYY/MM/DD');

  return date && date.isValid()
    ? date
        .lang('th')
        .add('years', 543)
        .format(targetFormat || 'DD MMMM YYYY')
    : '';
};

/**
 * Number.prototype.format(n, x)
 *
 * param integer n: length of decimal
 * param integer x: length of sections
 */
export const currency = (value: any, n?: number, x?: number): string => {
  const _n = n !== undefined ? n : 0;
  const _x = x || 3;
  if (value || value === 0) {
    const calVal = value instanceof Number ? value : +value;
    const re = '\\d(?=(\\d{' + _x + '})+' + (_n > 0 ? '\\.' : '$') + ')';

    return calVal
      .toFixed(Math.max(0, ~~_n))
      .replace(new RegExp(re, 'g'), '$&,');
  } else {
    return '0.00';
  }
};

// 1234..format();           // "1,234"
// 12345..format(2);         // "12,345.00"
// 123456.7.format(3, 2);    // "12,34,56.700"
// 123456.789.format(2, 4);  // "12,3456.79"

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
