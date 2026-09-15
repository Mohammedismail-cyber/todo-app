import React from 'react';
import type { Todo, FilterStatus } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: FilterStatus;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onToggle,
  onDelete,
}) => {
  if (todos.length === 0) {
    let emptyMessage = 'Nothing here yet — add your first task.';
    if (filter === 'active') {
      emptyMessage = 'All caught up — no active tasks remaining.';
    } else if (filter === 'completed') {
      emptyMessage = 'No completed tasks yet.';
    }

    return (
      <div className="py-12 text-center border-b border-border">
        <p className="text-text-muted text-[14px] font-sans">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {todos.map((todo) => (
        <div key={todo._id} className="animate-slide-in">
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};
