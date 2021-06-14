import client from './client.js';

export const insertTime = ({ categoryId, todoId, ymd, startDate, endDate, totalTime }) =>
    client.post('/api', { categoryId, todoId, ymd, startDate, endDate, totalTime });

export const getTodayTime = ({ categoryId, ymd }) =>
    client.get('/api/todayTime', { params: { categoryId, ymd } });

export const getWeeklyTime = ({ categoryId, startYmd, endYmd }) =>
    client.get('/api/weeklyTime', { params: { categoryId, startYmd, endYmd } });

export const getRecord = ({categoryId}) => client.get('/api/record' , { params: { categoryId } });
