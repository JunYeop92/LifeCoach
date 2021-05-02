import Router from 'koa-router';
import Time from '../model/time.js';
import Category from '../model/category.js';

const api = new Router();

api.get('/', async (ctx) => {});

api.post('/', async (ctx) => {
    const { category, ymd, startDate, endDate, totalTime } = ctx.request.body;
    const time = new Time({
        category,
        ymd,
        startDate,
        endDate,
        totalTime,
    });

    try {
        await time.save();
        ctx.body = time;
    } catch (e) {
        ctx.throw(500, e);
    }
});

api.get('/todayTime', async (ctx) => {
    const { categoryId, ymd } = ctx.query;
    try {
        const resultList = await Time.find()
            .where('category').equals(categoryId)
            .where('ymd').equals(ymd)
            .sort('insertDate')
            .select('totalTime')
            .exec();

        const sumTime = resultList.reduce((sum, { totalTime }) => {
            return sum + totalTime;
        }, 0);
        ctx.body = sumTime;
    } catch (e) {
        ctx.throw(500, e);
    }
});

api.get('/weeklyTime', async (ctx) => {
    const { categoryId, startYmd, endYmd } = ctx.query;
    try {
        const resultList = await Time.find()
            .where('category').equals(categoryId)
            .where('ymd').gte(startYmd)
            .where('ymd').lte(endYmd)
            .sort('insertDate')
            .select('totalTime')
            .exec();

        const sumTime = resultList.reduce((sum, { totalTime }) => {
            return sum + totalTime;
        }, 0);
        ctx.body = sumTime;
    } catch (e) {
        ctx.throw(500, e);
    }
});

api.get('/record', async (ctx) => {
    const { categoryId, ymd } = ctx.query;
    try {
        const resultList = await Time.find()
            .where('category').equals(categoryId)
            .sort('-ymd')
            .select('ymd startDate endDate totalTime')
            .exec();
        ctx.body = resultList;
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
        await Time.deleteMany({category:id});
        ctx.status = 204;
    } catch (e) {
        ctx.throw(500, e);
    }
});

export default api;
