import dayjs from 'dayjs';
import { rentBookDurationMinutes } from '~constants/api.constants';
import { IRentedTools } from '~typedefs/models/Tools.model';

const formatTimeWithSuffix = (timeString: string) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':').map(Number);
  const hourSuffix = getSuffix(hours, 'h');
  const minuteSuffix = getSuffix(minutes, 'm');

  return `${hours}${hourSuffix} ${minutes}${minuteSuffix}`;
};

const duration = (ended_at: string | null) => {
  const orderStatus = dayjs(ended_at).add(rentBookDurationMinutes, 'minute');
  const difference = orderStatus.diff(new Date());
  const totalHours = dayjs.duration(difference).asHours();
  const hours = Math.floor(totalHours);
  const minutes = (totalHours - hours) * 60;
  const time = formatTimeWithSuffix(`${hours}:${String(Math.floor(minutes)).padStart(2, '0')}`);

  return { difference, time };
};

const dictionary = {
  t: [' инструментов', ' инструмент', ' инструмента'],
  m: [' минут', ' минута', ' минуты'],
  h: [' часов', ' час', ' часа'],
};

export const getSuffix = (number: number, key: 'h' | 'm' | 't') => {
  let lastTwoDigits = number % 100;
  let lastDigit = number % 10;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return dictionary[key][0];
  }
  switch (lastDigit) {
    case 1:
      return dictionary[key][1];
    case 2:
    case 3:
    case 4:
      return dictionary[key][2];
    default:
      return dictionary[key][0];
  }
};

// item.status_type:
//     | 'В процессе аренды' // 0
//     | 'Аренда завершена' //1
//     | 'Не оплачена' //2
//     | 'Заказ оформлен' //3
//     | 'Просрочено'; //4

export const badgeText = (item: IRentedTools) => {
  if (item.status_type === 4) return item.status;
  if (item.status_type === 3)
    return dayjs(item?.ended).format(`[${item.status} до]\nD MMMM[,] HH:mm`);
  if (item.status_type === 2) return dayjs(item.no_paid_ended).format('[бронь до] D MMMM[,] HH:mm');
  if (duration(item?.ended).difference > 0) return duration(item?.ended).time;
  return item.status;
};

export const dropSeconds = (time: string) => dayjs(time, 'HH:mm:ss').format('H:mm');

// 08:00:00 -> 8:00
export const formatTimeString = (input: string) => {
  if (input) return input.replace(/(\d{2}:\d{2}:\d{2})/, match => dropSeconds(match));
  return '';
};
