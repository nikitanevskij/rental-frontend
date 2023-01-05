import dayjs from 'dayjs';

export function msToTime(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const seconds = Math.floor(minutesms / 1000);

  const hoursGet = hours < 10 ? '0' + hours : hours;
  const minutesGet = minutes < 10 ? '0' + minutes : minutes;
  // const secondsGet = seconds < 10 ? '0' + seconds : seconds;
  return days + 'д ' + hoursGet + 'ч ' + minutesGet + 'м ';
} // конвертер времени и даты

//////////////////////////////////////////////////////////////////////
const price = [
  {
    specification: '15m',
    minutes: '15',
    priceBike: 2.5,
    priceSam: 3,
  },
  {
    specification: '30m',
    minutes: '30',
    priceBike: 2.5,
    priceSam: 6,
  },
  {
    specification: '45m',
    minutes: '45',
    priceBike: 5,
    priceSam: 9,
  },
  {
    specification: '1h',
    minutes: '60',
    priceBike: 5,
    priceSam: 12,
  },
  {
    specification: '1h 15m',
    minutes: '75',
    priceBike: 5,
    priceSam: 15,
  },
  {
    specification: '1h 30m',
    minutes: '90',
    priceBike: 7.5,
    priceSam: 18,
  },
  {
    specification: '1h 45m',
    minutes: '105',
    priceBike: 10,
    priceSam: 21,
  },
  {
    specification: '2h',
    minutes: '120',
    priceBike: 10,
    priceSam: 24,
  },
  {
    specification: '2h 15m',
    minutes: '135',
    priceBike: 10,
    priceSam: 27,
  },
  {
    specification: '2h 30m',
    minutes: '150',
    priceBike: 12.5,
    priceSam: 30,
  },
]; //массив зависимости цен от времени

const sum = (selectEquipments, price) => {
  const result = selectEquipments.reduce((sum, item) => {
    if (item.includes('bike')) return sum + price.priceBike;
    if (item.includes('sam')) return sum + price.priceSam;
  }, 0);
  return result;
}; // вспомогательная функция, считает сумму исходя из массива оборудования и цены за конкретное время

export const finalPrice = (selectEquipments, startTimeTrip) => {
  const diff = dayjs().diff(startTimeTrip);
  const minutes = Math.trunc(diff / 60000); //converted to minutes

  if (minutes >= 0 && minutes <= 15) return sum(selectEquipments, price[0]);
  if (minutes >= 15 && minutes <= 30) return sum(selectEquipments, price[1]);
  if (minutes >= 30 && minutes <= 45) return sum(selectEquipments, price[2]);
  if (minutes >= 45 && minutes <= 60) return sum(selectEquipments, price[3]);
  if (minutes >= 60 && minutes <= 75) return sum(selectEquipments, price[4]);
  if (minutes >= 75 && minutes <= 90) return sum(selectEquipments, price[5]);
  if (minutes >= 90 && minutes <= 105) return sum(selectEquipments, price[6]);
  if (minutes >= 105 && minutes <= 120) return sum(selectEquipments, price[7]);
  if (minutes >= 120 && minutes <= 135) return sum(selectEquipments, price[8]);
  if (minutes >= 135 && minutes <= 150) return sum(selectEquipments, price[9]);
  return 0;
}; // экспортируемая в компонент функция с итоговой цифрой

///////////////////////////////////////////////////////////////////////////
