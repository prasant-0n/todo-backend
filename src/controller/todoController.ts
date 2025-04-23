import { Request, Response } from 'express';
import Todo from '../models/todoModel';
import { Document } from 'mongoose';

const handleError = (res: Response, message: string, error: any, statusCode: number = 500) => {
    console.error(error);
    return res.status(statusCode).json({ message, error });
};

export const getTodos = async (req: Request, res: Response): Promise<any> => {
    try {
        const todos = await Todo.find();
        return res.status(200).json(todos);
    } catch (error) {
        return handleError(res, 'Failed to fetch todos', error);
    }
};

export const createTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title } = req.body;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({ message: 'Title is required and cannot be empty' });
        }

        const newTodo = new Todo({
            title,
            completed: false, // Default value for completed
        });

        const savedTodo = await newTodo.save();
        return res.status(201).json(savedTodo);
    } catch (error) {
        return handleError(res, 'Failed to create todo', error);
    }
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, completed } = req.body;
        const todoId = req.params.id;

        if (!title && typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Either title or completed status is required to update' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { title, completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json(updatedTodo);
    } catch (error) {
        return handleError(res, 'Failed to update todo', error);
    }
};

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        return handleError(res, 'Failed to delete todo', error);
    }
};

export const toggleComplete = async (req: Request, res: Response): Promise<any> => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.completed = !todo.completed;
        await todo.save();

        return res.status(200).json(todo);
    } catch (error) {
        return handleError(res, 'Failed to toggle completion', error);
    }
};
