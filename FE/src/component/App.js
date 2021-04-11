import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import { getTotal } from '../api/time.js';

export default function App() {
    this.state = {};
    this.component;
    this.initialize = () => {
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
            handleListCategory,
        });
        const timer = new Timer({
            $target: { $header, $content },
        });
        this.component = {
            category,
            timer,
        };
    };

    const handleListCategory = async ({ _id, name }) => {
        const ymd = getYmd(new Date());
        const resultToday = await getTotal({
            categoryId: _id,
            ymd,
        });
        this.component.timer.setState({
            ...timer.state,
            todayTime: resultToday.data,
            selectedCategory: { _id, name },
        });
    };

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
