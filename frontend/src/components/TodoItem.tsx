import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    if (isUpdating || isDeleting) return;
    try {
      setIsUpdating(true);
      await onToggle(todo._id, !todo.completed);
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      await onDelete(todo._id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`group relative flex items-center justify-between py-3.5 px-3 bg-surface border-b border-border transition-colors duration-150 select-none ${
        isDeleting ? 'opacity-30' : ''
      }`}
    >
      <div
        onClick={handleToggle}
        className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        {/* Custom Terminal Checkbox */}
        <button
          type="button"
          aria-label={todo.completed ? 'Mark task active' : 'Mark task completed'}
          className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-150 cursor-pointer ${
            todo.completed
              ? 'border-accent bg-accent shadow-[0_0_12px_#39FF88]'
              : 'border-[#3D4742] bg-transparent hover:border-accent/70'
          }`}
        >
          {todo.completed && (
            <span className="w-1.5 h-1.5 bg-[#0B0D0C] rounded-full" />
          )}
        </button>

        {/* Task Title */}
        <span
          className={`text-[15px] font-sans truncate transition-all duration-150 ${
            todo.completed
              ? 'line-through text-text-muted opacity-60'
              : 'text-text-primary'
          }`}
        >
          {todo.title}
        </span>
      </div>

      {/* Delete Action */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 text-text-muted hover:text-red-400 transition-all duration-150 cursor-pointer ml-2 flex-shrink-0"
      >
        <X size={15} />
      </button>
    </div>
  );
};
