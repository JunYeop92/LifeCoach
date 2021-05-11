import MeasureTime from './MeasureTime.js';
import CumulativeTime from './CumulativeTime.js';
import WeeklyTime from './WeeklyTime.js'
import FocusRecord from './FocusRecord.js';
import Menu from './Menu.js';
import { insertTime, getTodayTime, getWeeklyTime, getRecord } from '../../api/time.js';
import { getYmd, getWeek } from "../../util.js";

export default function Timer({ loading }) {
    this.state = {
        todayTime: 0, // 분단위, max:24*60
        weeklyTime : 0,
        recordList: [],
        selectedCategory: {
            _id: '',
            name: '',
        },
    };
    this.component;
    this.$element;

    const initialize = () => {
        const $timerWrap = document.createElement('div');
        $timerWrap.id = 'timer-wrap';
        const $timerTitle = document.createElement('div');
        $timerTitle.id = 'timer-title';
        
        this.$element = {
            $timerWrap,
            $timerTitle,
        }

        //FOCUS
        const measureTime = new MeasureTime({
            onSubmit: async ({ ymd, startDate, endDate, totalTime }) => {
                loading.setState({
                    isLoading: true,
                });
                await insertTime({
                    category: this.state.selectedCategory._id,
                    ymd,
                    startDate,
                    endDate,
                    totalTime,
                });

                const resultToday = await getTodayTime({
                    categoryId: this.state.selectedCategory._id,
                    ymd,
                });

                const {startWeekDate, endWeekDate} = getWeek();
                const startYmd = getYmd(startWeekDate);
                const endYmd = getYmd(endWeekDate);

                const resultWeekly = await getWeeklyTime({
                    categoryId : this.state.selectedCategory._id,
                    startYmd,
                    endYmd,
                });

                const resultRecord = await getRecord({
                    categoryId: this.state.selectedCategory._id,
                });
                loading.setState({
                    isLoading : false
                })

                this.setState({
                    ...this.state,
                    todayTime: resultToday.data,
                    weeklyTime : resultWeekly.data,
                    recordList: resultRecord.data,
                });
            },
        });
        

        //TODAY
        const cumulativeTime = new CumulativeTime({
            initialState: {
                time: this.state.todayTime,
            },
        });

        //WEEKLY
        const weeklyTime = new WeeklyTime({
            initialState: {
                time: this.state.weeklyTime,
            },
        });

        const menu = new Menu({
            onClick: (id) => {
                $timerWrap.innerHTML = '';
                eventMap[id]();
            },
        });
        const eventMap = {
            focus: () => {
                measureTime.attachNode($timerWrap)
            },
            today: () => {
                cumulativeTime.attachNode($timerWrap)
            },
            weekly: () => {
                weeklyTime.attachNode($timerWrap)
            },
        };

        const focusRecord = new FocusRecord({
            initialState: {
                recordList: this.state.recordList,
            },
        });

        this.component = {
            menu,
            measureTime,
            cumulativeTime,
            weeklyTime,
            focusRecord,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;
        const { cumulativeTime, focusRecord, weeklyTime } = this.component;

        cumulativeTime.setState({
            time : this.state.todayTime,
        });
        weeklyTime.setState({
            time : this.state.weeklyTime,
        });
        focusRecord.setState({
            recordList : this.state.recordList,
        });
        
        this.$element.$timerTitle.innerHTML 
            = `<span>${this.state.selectedCategory.name}</span>`;
    };
    
    // this.render = () => {};

    this.attachNode = ($target) => {
        const { $header, $content } = $target;
        const { menu, measureTime, cumulativeTime, weeklyTime, focusRecord } = this.component;
        const {$timerWrap, $timerTitle} = this.$element;
        
        menu.attachNode($content);
        $content.appendChild($timerWrap);
        $content.appendChild($timerTitle);
        focusRecord.attachNode($header);
        measureTime.attachNode($timerWrap); //menu 기본 선택(default)
    }

    initialize();
    
}