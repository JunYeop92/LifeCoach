import axios from 'axios';

export const addTodo = ({ content, categoryId }) => 
    axios.post('/api/todo', { content, categoryId });

export const getTodo = ({ categoryId }) => axios.get('/api/todo', { params: { categoryId } });

export const delTodo = ({ id }) => 
    axios.delete('/api/todo', { data: { id } });

export const checkTodo = ({ id }) => 
    axios.patch('/api/todo', { id });
