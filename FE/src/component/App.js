import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import { getTodayTime, getWeeklyTime, getRecord } from '../api/time.js';
import { getTodo } from '../api/todo.js';
import { getYmd, getWeek } from '../util.js';
import Todo from './todo/Todo.js';

export default function App() {
    this.state;
    this.component;

    const initialize = () => {
        const category = new Category({
            selCategory,
        });
        const timer = new Timer();
        const todo = new Todo({
            todoUpdate,
        })

        this.component = {
            category,
            timer,
            todo,
        };
    };

    const todoUpdate = (todo) => {
        const { timer } = this.component;
        timer.setState({
            ...timer.state,
            todo
        });
    }

    const selCategory = async ({ _id, name }) => {
        const { timer, todo } = this.component;

        const categoryId = _id;
        const categoryName = name;

        const ymd = getYmd(new Date());
        const { startWeekDate, endWeekDate } = getWeek();
        const startYmd = getYmd(startWeekDate);
        const endYmd = getYmd(endWeekDate);
   
        const resultToday = await getTodayTime({
            categoryId,
            ymd,
        });
        const resultWeekly = await getWeeklyTime({
            categoryId,
            startYmd,
            endYmd,
        });
        const resultRecord = await getRecord({ categoryId });

        timer.setState({
            ...timer.state,
            category: { id: categoryId, name: categoryName },
            recordList: resultRecord.data,
            todayTime: resultToday.data,
            weeklyTime: resultWeekly.data,
        });

        todo.setState({
            ...todo.state,
            category: { id: categoryId, name: categoryName },
        })
        await todo.getSetCommonState();

    };

    const attachEvent = () => {
        const navList = document.querySelector('#navigation').querySelectorAll('.item');
        navList.forEach(ele => {
            ele.addEventListener('click', e => {
                navList.forEach(ele2 => {
                    ele2.classList.remove('selected');
                })
                ele.classList.add('selected');
            })
        })
    };

    // this.setState = () => {};
    // this.render = () => {};

    const attachNode = () => {
        const { category, timer } = this.component;

        const $root = document.querySelector('#app');
        const $header = document.createElement('div');
        const $main = document.createElement('div');
        const $content = document.createElement('div');

        $header.id = 'header';
        $main.id = 'main';
        $content.id = 'content';

        const $navigation = document.createElement('div');
        $navigation.id = 'navigation'
        $navigation.innerHTML = `
            <div><a href='/' class='item selected'>TODO</a></div>
            <div id='bar'><span>|</span></div>
            <div><a href='/timer' class='item'>TIMER</a></div>
        `;

        $root.appendChild($header);
        $root.appendChild($main);
        $main.appendChild($navigation);
        $main.appendChild($content);

        category.attachNode({$header});
        timer.attachNode({$header});
    };

    initialize();
    attachNode();
    attachEvent();
}
