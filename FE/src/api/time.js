import axios from 'axios';

export const insertTime = ({ category, ymd, startDate, endDate, totalTime }) =>
    axios.post('/api', { category, ymd, startDate, endDate, totalTime });

export const getTodayTime = ({ categoryId, ymd }) =>
    axios.get('/api/todayTime', { params: { categoryId, ymd } });

export const getWeeklyTime = ({ categoryId, startYmd, endYmd }) =>
    axios.get('/api/weeklyTime', { params: { categoryId, startYmd, endYmd } });

export const getRecord = ({categoryId}) => axios.get('/api/record' , { params: { categoryId } });
