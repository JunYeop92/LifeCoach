import axios from 'axios';

export const addContent = ({ content }) => axios.post('/api/category', { content });

export const listContents = () => axios.get('/api/category');

export const delContent = ({ id }) => {
    axios.delete('/api/category', { data: { id } });
};
