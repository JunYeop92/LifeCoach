import Router from 'koa-router';
import Time from '../model/time.js';

const api = new Router();

api.get('/', async (ctx) => {});

api.post('/', async (ctx) => {
    const { category, ymd, seq, isEnd, insertDate } = ctx.request.body;
    const time = new Time({
        category,
        ymd,
        seq,
        isEnd,
        insertDate,
    });

    try {
        await time.save();
        //ctx.body = time;
    } catch (e) {
        ctx.throw(500, e);
    }
});

export default api;
