import {
  compareAsc,
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

const getSortedTodoListByField = (
  todoItems: TodoItem[],
  sortOption: keyof TodoItem,
  sortFunction: any,
) => {
  const itemsWithoutOption = todoItems.filter(item => !item[sortOption]);
  const sortedItemsWithOption = todoItems
    .filter(item => item[sortOption])
    .sort(sortFunction);

  return [...sortedItemsWithOption, ...itemsWithoutOption];
};

const sortByCompletedState = (todoItems: TodoItem[]) => {
  // Separate out completed items from the incomplete ones, sort them by createdOn, and then concat them.
  const completedItems = todoItems
    .filter(item => item.completed)
    .sort((a, b) => compareAsc(new Date(a.createdOn), new Date(b.createdOn)));
  const incompleteItems = todoItems
    .filter(item => !item.completed)
    .sort((a, b) => compareAsc(new Date(a.createdOn), new Date(b.createdOn)));

  return [...completedItems, ...incompleteItems];
};

export function sortBySortOption(
  todoItems: TodoItem[],
  sortOption: SortOption,
) {
  switch (sortOption) {
    case 'dueDate':
      return getSortedTodoListByField(
        todoItems,
        'dueDate',
        (a: TodoItem, b: TodoItem) => {
          if (a.dueDate && b.dueDate) {
            return compareAsc(new Date(a.dueDate), new Date(b.dueDate));
          }

          return 0;
        },
      );
    case 'createdOn':
      return [...todoItems].sort((a, b) =>
        compareAsc(new Date(a.createdOn), new Date(b.createdOn)),
      );
    case 'priority':
      return getSortedTodoListByField(
        todoItems,
        'priority',
        (a: TodoItem, b: TodoItem) => a.priority - b.priority,
      );
    case 'complete':
      return sortByCompletedState(todoItems);
    case 'incomplete':
      return sortByCompletedState(todoItems).reverse();
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
