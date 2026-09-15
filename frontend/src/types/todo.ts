export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
