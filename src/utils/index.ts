import {
  differenceInDays,
  differenceInMinutes,
  format,
  formatDistance,
} from 'date-fns';
import {TodoItemPriority} from '../types';

export function getPriorityText(priority: TodoItemPriority) {
  switch (priority) {
    case 1:
      return 'High';
    case 2:
      return 'Medium';
    case 3:
      return 'Low';
  }
}

export function getFormattedDate(date: Date) {
  if (differenceInMinutes(new Date(), date) < 0) {
    return `in ${getHumanReadableDate(date)}`;
  } else {
    return `${getHumanReadableDate(date)} ago`;
  }
}

export function getHumanReadableDate(date: Date) {
  if (date) {
    if (differenceInDays(new Date(), new Date(date)) < 1) {
      return format(date, 'HH:mm');
    } else {
      return formatDistance(new Date(date), new Date());
    }
  }
}
