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
}
