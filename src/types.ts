export type TodoItemPriority = 1 | 2 | 3; // 1 = High, 2 = Medium, 3 = Low

export type TodoItem = {
  title: string;
  description: string;
  dueDate: number; // unix timestamp
  completed: boolean;
  priority: TodoItemPriority;
  id: string;
};
