import moment from 'moment';

export function formatDate(value) {
  return moment(String(value)).format('hh:mm:ss - DD/MM/YYYY');
}
export function formatCurrency(price) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(price);
}
