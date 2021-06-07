import client from './client.js';

export const addTodo = ({ content, categoryId, ymd}) => 
    client.post('/api/todo', { content, categoryId, ymd });

export const getTodo = ({ categoryId, ymd }) => client.get('/api/todo', { params: { categoryId, ymd } });

export const delTodo = ({ id }) => 
    client.delete('/api/todo', { data: { id } });

export const checkTodo = ({ id }) => 
    client.patch('/api/todo', { id });
