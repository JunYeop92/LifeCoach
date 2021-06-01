import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import { getTodayTime, getWeeklyTime, getRecord } from '../api/time.js';
import { getTodo } from '../api/todo.js';
import { getYmd, getWeek } from '../util.js';
import Loading from './Loading.js';
import Todo from './todo/Todo.js';

export default function App() {
    this.state;
    this.component;

    const initialize = () => {
        const loading = new Loading({
            initialState: {
                isLoading: false,
            },
        });
        const category = new Category({
            selCategory,
            loading,
        });
        const timer = new Timer({
            loading,
        });
        const todo = new Todo({
            loading
        })

        this.component = {
            category,
            timer,
            todo,
            loading,
        };
    };

    const selCategory = async ({ _id, name }) => {
        const { timer, todo, loading } = this.component;

        const categoryId = _id;
        const categoryName = name;

        const ymd = getYmd(new Date());
        const { startWeekDate, endWeekDate } = getWeek();
        const startYmd = getYmd(startWeekDate);
        const endYmd = getYmd(endWeekDate);

        // loading.setState({
        //     isLoading: true,
        // });

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

        const resultTodo = await getTodo({ categoryId });

        todo.setState({
            ...todo.state,
            todo : resultTodo.data,
            category: { id: categoryId, name: categoryName },
        })

        // loading.setState({
        //     isLoading: false,
        // });
    };

    const attachEvent = () => {
        document.querySelector('#app').addEventListener('click', (e) => {
            const targetId =
                e.target.tagName == 'path' ? e.target.parentNode.id : e.target.id;

            //숫자체크
            const myReg = /\d/g;
            const result = myReg.test(targetId);

            if (targetId && !result) {
                const $categoryBtn = e.currentTarget.querySelector('#category .dropbtn');
                if (!$categoryBtn.querySelector(`#${targetId}`)) {
                    $categoryBtn.classList.remove('click');
                }

                const $recordBtn = e.currentTarget.querySelector('#record .dropbtn');
                if (!$recordBtn.querySelector(`#${targetId}`)) {
                    $recordBtn.classList.remove('click');
                }
            }
        });

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
