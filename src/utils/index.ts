import {
  differenceInDays,
  differenceInHours,
  format,
  formatDistance,
  isBefore,
} from 'date-fns';
import {SortOption} from '../components/SortButton';
import {TodoItem, TodoItemPriority} from '../types';

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
  if (isBefore(date, new Date())) {
    if (differenceInHours(new Date(), date) < 24) {
      return `at ${getHumanReadableDate(date)}`;
    }
    return `${getHumanReadableDate(date)} ago`;
  } else {
    if (differenceInDays(date, new Date()) > 1) {
      return `on ${format(date, 'HH:mm MMMM d, yyyy')}`;
    } else {
      return `at ${format(date, 'HH:mm MMMM d')}`;
    }
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

export function sortBySortOption(
  todoItems: TodoItem[],
  sortOption: SortOption,
) {
  switch (sortOption) {
    case 'dueDate':
      return [...todoItems]
        .sort(a => (a.dueDate !== null ? -1 : 1))
        .sort((a, b) => {
          if (!a.dueDate || !b.dueDate) {
            return 0;
          }
          return isBefore(new Date(a.dueDate), new Date(b.dueDate)) ? -1 : 1;
        });
    case 'createdOn':
      return [...todoItems].sort((a, b) =>
        isBefore(new Date(a.createdOn), new Date(b.createdOn)) ? -1 : 1,
      );
    case 'priority':
      return [...todoItems]
        .sort((a, b) => a.priority - b.priority)
        .sort(a => (a.priority > 0 ? 1 : -1));
    default:
      return todoItems;
  }
}

export function makeId(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
