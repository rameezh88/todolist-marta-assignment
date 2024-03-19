export type TodoItemPriority = 1 | 2 | 3 | 4; // 1 = High, 2 = Medium, 3 = Low, 4 = None

export type TodoItem = {
  title: string;
  description?: string;
  dueDate?: string; // ISO string
  completed: boolean;
  priority: TodoItemPriority;
  id: string;
  createdOn: string; // ISO string
};
