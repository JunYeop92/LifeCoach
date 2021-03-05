import Router from 'koa-router';
import Time from '../model/time.js';
import Category from '../model/category.js';

const api = new Router();

api.get('/', async (ctx) => {});

api.post('/', async (ctx) => {
    const { category, ymd, isEnd, insertDate } = ctx.request.body;
    const time = new Time({
        category,
        ymd,
        isEnd,
        insertDate,
    });

    try {
        await time.save();
        ctx.body = time;
    } catch (e) {
        ctx.throw(500, e);
    }
});

api.post('/category', async (ctx) => {
    const { content } = ctx.request.body;
    const category = new Category({
        content,
    });

    try {
        await category.save();
        ctx.body = category;
    } catch (e) {
        ctx.throw(500, e);
    }
});

api.get('/category', async (ctx) => {
    try {
        const list = await Category.find().select('_id content').exec();
        ctx.body = list;
    } catch (e) {
        ctx.throw(500, e);
    }
});

api.delete('/category', async (ctx) => {
    const { id } = ctx.request.body;
    try {
        await Category.findByIdAndDelete(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(500, e);
    }
});

export default api;
