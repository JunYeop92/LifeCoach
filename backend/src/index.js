import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api/index.js';

dotenv.config();
const { PORT, MONGO_URI } = process.env;
//MONGO_URI=mongodb://localhost/LifeCoach(로컬에서 실행할 경우)
//MONGO_URI=mongodb://admin:admin@3.36.70.235:27017/LifeCoach?authSource=admin(서버용)
//MONGO_URI=mongodb://admin:admin@localhost/LifeCoach?authSource=admin(서버용)
//admin DB에서 만든 계정이라서 뒤에 authSource를 붙여야 함

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.error(e);
    });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
