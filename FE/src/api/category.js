import client from './client.js';

export const addContent = ({ content }) => client.post('/api/category', { content });

export const listContents = () => client.get('/api/category');

export const delContent = ({ id }) => {
    client.delete('/api/category', { data: { id } });
};
