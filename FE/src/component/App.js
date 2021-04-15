import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import { getTodayTime, getWeeklyTime, getRecord } from '../api/time.js';
import { getYmd, getWeek } from "../util.js";

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
        const {startWeekDate, endWeekDate} = getWeek();
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
        const resultRecord = await getRecord({categoryId});

        timer.setState({
            ...timer.state,
            selectedCategory: { _id: categoryId, name: categoryName },
            recordList: resultRecord.data,
            todayTime: resultToday.data,
            weeklyTime : resultWeekly.data
        });
    }

    this.setState = () => {};
    this.render = () => {};

    this.initialize();
}



 
// test code
// var Dates = new Date().getWeek();
// alert(Dates[0].toLocaleDateString() + ' to '+ Dates[1].toLocaleDateString());
