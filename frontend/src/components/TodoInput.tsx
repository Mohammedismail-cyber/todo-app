import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (title: string) => Promise<void>;
  disabled?: boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd, disabled = false }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || isSubmitting || disabled) return;

    try {
      setIsSubmitting(true);
      await onAdd(trimmed);
      setTitle('');
    } catch (err) {
      console.error('Error adding todo:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-text-muted select-none flex items-center">
          <Plus size={16} className="text-text-muted" />
        </span>
        <input
          id="todo-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="add a task..."
          disabled={disabled || isSubmitting}
          maxLength={200}
          autoComplete="off"
          className="w-full bg-surface text-text-primary placeholder-text-muted border border-border rounded-none pl-9 pr-14 py-3 text-[15px] font-sans outline-none transition-all duration-150 focus:border-accent focus:shadow-[0_0_12px_rgba(57,255,136,0.35)] disabled:opacity-50"
        />
        {title.trim().length > 0 && (
          <button
            type="submit"
            disabled={isSubmitting}
            id="add-todo-btn"
            className="absolute right-2 px-2.5 py-1 text-xs font-mono text-accent bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all duration-150 cursor-pointer"
          >
            {isSubmitting ? '...' : 'ENTER'}
          </button>
        )}
      </div>
    </form>
  );
};
