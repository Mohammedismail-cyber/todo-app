import { useEffect, useState, useMemo } from 'react';
import type { Todo, FilterStatus } from './types/todo';
import { getTodos, createTodo, updateTodo, deleteTodo } from './lib/api';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { FilterTabs } from './components/FilterTabs';

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err: any) {
      console.error('Failed to load tasks:', err);
      setError('Cannot connect to backend API. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err: any) {
      console.error('Error creating todo:', err);
      setError(err.message || 'Failed to create todo');
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    // Optimistic UI update
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed } : t))
    );

    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      );
    } catch (err: any) {
      console.error('Error toggling todo:', err);
      // Revert on failure
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !completed } : t))
      );
      setError(err.message || 'Failed to update todo');
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic removal
    const previous = todos;
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await deleteTodo(id);
    } catch (err: any) {
      console.error('Error deleting todo:', err);
      // Revert
      setTodos(previous);
      setError(err.message || 'Failed to delete todo');
    }
  };

  const counts = useMemo(() => {
    const all = todos.length;
    const active = todos.filter((t) => !t.completed).length;
    const completed = todos.filter((t) => t.completed).length;
    return { all, active, completed };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 pb-20 selection:bg-accent/20 selection:text-accent">
      <main className="w-full max-w-[560px] flex flex-col">
        {/* Header */}
        <header className="mb-6">
          <h1 className="font-display text-[32px] font-semibold tracking-tight text-text-primary leading-tight">
            Todo
          </h1>
          <p className="font-mono text-xs text-text-muted mt-1 tracking-wide">
            {counts.active} {counts.active === 1 ? 'item' : 'items'} left
          </p>
        </header>

        {/* Global Error Banner if any */}
        {error && (
          <div className="mb-4 px-3 py-2 border border-red-500/30 bg-red-950/20 text-red-300 font-mono text-xs flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-white ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Input */}
        <div className="mb-4">
          <TodoInput onAdd={handleAdd} disabled={loading} />
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="py-12 text-center border-b border-border">
            <p className="font-mono text-xs text-text-muted animate-pulse">
              loading console data...
            </p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            filter={filter}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}

        {/* Filter Navigation */}
        <footer className="w-full flex items-center justify-between">
          <FilterTabs
            currentFilter={filter}
            onChange={setFilter}
            counts={counts}
          />
        </footer>
      </main>
    </div>
  );
}

export default App;
