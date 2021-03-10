import axios from 'axios';

export const insertTime = ({ category, ymd, startDate, endDate, totalTime }) =>
    axios.post('/api', { category, ymd, startDate, endDate, totalTime });

export const getTotal = ({ categoryId, ymd }) => {
    const tmp = axios.get('/api/total', { params: { categoryId, ymd } });
    console.log(tmp);
};
    
