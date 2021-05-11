import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import { getTodayTime, getWeeklyTime, getRecord } from '../api/time.js';
import { getYmd, getWeek } from '../util.js';
import Loading from './Loading.js';

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
            updateTimer,
            loading,
        });
        const timer = new Timer({
            loading,
        });

        this.component = {
            category,
            timer,
            loading,
        };
    };

    const updateTimer = async ({ categoryList, _id, name }) => {
        const { timer, loading } = this.component;

        console.log('오류');
        console.log(_id);
        console.log(categoryList);
        const categoryId = _id || categoryList[0]._id;
        const categoryName = name || categoryList[0].content;

        const ymd = getYmd(new Date());
        const { startWeekDate, endWeekDate } = getWeek();
        const startYmd = getYmd(startWeekDate);
        const endYmd = getYmd(endWeekDate);

        loading.setState({
            isLoading: true,
        });

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

        loading.setState({
            isLoading: false,
        });

        timer.setState({
            ...timer.state,
            selectedCategory: { _id: categoryId, name: categoryName },
            recordList: resultRecord.data,
            todayTime: resultToday.data,
            weeklyTime: resultWeekly.data,
        });
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
    };

    // this.setState = () => {};
    // this.render = () => {};

    this.attachNode = () => {
        const { loading, category, timer } = this.component;

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

        loading.attachNode($root);
        category.attachNode({$header});
        timer.attachNode({$header, $content});
    };

    initialize();
    attachEvent();
    this.attachNode();
}
