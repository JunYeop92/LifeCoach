import client from './client.js';

export const insertTime = ({ category, ymd, startDate, endDate, totalTime }) =>
    client.post('/api', { category, ymd, startDate, endDate, totalTime });

export const getTodayTime = ({ categoryId, ymd }) =>
    client.get('/api/todayTime', { params: { categoryId, ymd } });

export const getWeeklyTime = ({ categoryId, startYmd, endYmd }) =>
    client.get('/api/weeklyTime', { params: { categoryId, startYmd, endYmd } });

export const getRecord = ({categoryId}) => client.get('/api/record' , { params: { categoryId } });
