import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import { getTotal, getRecord } from '../api/time.js';
import { listContents } from '../api/category.js';

export default function App() {
    this.state;
    this.component;

    this.initialize = async () => {
        const $root = document.querySelector('#app');
        const $header = document.createElement('div');
        const $main = document.createElement('div');
        const $content = document.createElement('div');

        $header.id = 'header';
        $main.id = 'main';
        $content.id = 'content';

        $root.appendChild($header);
        $root.appendChild($main);
        $main.appendChild($content);

        const category = new Category({
            $target: { $header },
            updateTimer
        });
        const timer = new Timer({
            $target: { $header, $content },
        });
        this.component = {
            category,
            timer,
        };
    };

    const updateTimer = async ({categoryList, _id, name}) => {
        const {timer} = this.component;
        const categoryId = _id || categoryList[0]._id;
        const categoryName = name || categoryList[0].content;
        const ymd = getYmd(new Date());

        const resultToday = await getTotal({
            categoryId,
            ymd,
        });
        const resultRecord = await getRecord({categoryId});
        
        timer.setState({
            ...timer.state,
            selectedCategory: { _id: categoryId, name: categoryName },
            recordList: resultRecord.data,
            todayTime: resultToday.data,
        });
    }

    this.setState = () => {};
    this.render = () => {};

    this.initialize();
}

const getYmd = (date) => {
    const yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    mm = mm > 9 ? mm : '0' + mm;
    dd = dd > 9 ? dd : '0' + dd;

    const ymd = yy + '' + mm + '' + dd;
    return ymd;
};
