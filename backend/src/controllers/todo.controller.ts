import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Todo, ITodo } from '../models/todo.model';

// In-memory fallback store when MongoDB is not connected
interface MemoryTodo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

let memoryTodos: MemoryTodo[] = [];

const isConnected = () => mongoose.connection.readyState === 1;

// GET /api/todos
export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isConnected()) {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.status(200).json(todos);
      return;
    }

    // Fallback in-memory
    const sorted = [...memoryTodos].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    res.status(200).json(sorted);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// POST /api/todos
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      res.status(400).json({ error: 'Title is required and cannot be empty' });
      return;
    }

    if (title.trim().length > 200) {
      res.status(400).json({ error: 'Title cannot exceed 200 characters' });
      return;
    }

    const trimmedTitle = title.trim();

    if (isConnected()) {
      const newTodo = await Todo.create({
        title: trimmedTitle,
        completed: false,
      });
      res.status(201).json(newTodo);
      return;
    }

    // Fallback in-memory
    const newTodo: MemoryTodo = {
      _id: new mongoose.Types.ObjectId().toString(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryTodos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// PATCH /api/todos/:id
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    const updates: { title?: string; completed?: boolean } = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({ error: 'Title cannot be empty' });
        return;
      }
      if (title.trim().length > 200) {
        res.status(400).json({ error: 'Title cannot exceed 200 characters' });
        return;
      }
      updates.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        res.status(400).json({ error: 'Completed must be a boolean' });
        return;
      }
      updates.completed = completed;
    }

    if (isConnected()) {
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!updatedTodo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.status(200).json(updatedTodo);
      return;
    }

    // Fallback in-memory
    const index = memoryTodos.findIndex((t) => t._id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    if (updates.title !== undefined) {
      memoryTodos[index].title = updates.title;
    }
    if (updates.completed !== undefined) {
      memoryTodos[index].completed = updates.completed;
    }
    memoryTodos[index].updatedAt = new Date();

    res.status(200).json(memoryTodos[index]);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// DELETE /api/todos/:id
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    if (isConnected()) {
      const deletedTodo = await Todo.findByIdAndDelete(id);

      if (!deletedTodo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.status(204).send();
      return;
    }

    // Fallback in-memory
    const index = memoryTodos.findIndex((t) => t._id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    memoryTodos.splice(index, 1);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
