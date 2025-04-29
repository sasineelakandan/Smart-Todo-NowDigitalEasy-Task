
export type TodoCategory = 'work' | 'personal' | 'shopping' | 'other';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: TodoCategory;
  dueDate: Date | null;
  createdAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';
