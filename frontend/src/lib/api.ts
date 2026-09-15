import type { Todo } from '../types/todo';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to fetch todos' }));
    throw new Error(err.error || 'Failed to fetch todos');
  }
  return response.json();
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to create todo' }));
    throw new Error(err.error || 'Failed to create todo');
  }
  return response.json();
}

export async function updateTodo(id: string, data: Partial<Todo>): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to update todo' }));
    throw new Error(err.error || 'Failed to update todo');
  }
  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({ error: 'Failed to delete todo' }));
    throw new Error(err.error || 'Failed to delete todo');
  }
}
