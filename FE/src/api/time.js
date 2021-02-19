import axios from 'axios';

export const insert = (point) => axios.post('/api', point);
