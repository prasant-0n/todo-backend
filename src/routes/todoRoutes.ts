import express from 'express';
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete
} from '../controller/todoController';

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/complete', toggleComplete);

export default router;
