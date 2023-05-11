export interface TodoList {
  id: string;
  title: string;
  items: TodoItem[];
}

export interface TodoItem {
  id: string;
  title: string;
  content: string;
  deadline: string;
  completed: boolean;
}
