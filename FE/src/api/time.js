import axios from 'axios';

export const insertTime = ({ category, ymd, startDate, endDate, totalTime }) =>
    axios.post('/api', { category, ymd, startDate, endDate, totalTime });

export const getTotal = ({ categoryId, ymd }) =>
    axios.get('/api/todayTotal', { params: { categoryId, ymd } });

export const getRecord = () => axios.get('/api/record');
