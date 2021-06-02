import client from './client.js';

export const addTodo = ({ content, categoryId }) => 
    client.post('/api/todo', { content, categoryId });

export const getTodo = ({ categoryId }) => client.get('/api/todo', { params: { categoryId } });

export const delTodo = ({ id }) => 
    client.delete('/api/todo', { data: { id } });

export const checkTodo = ({ id }) => 
    client.patch('/api/todo', { id });
