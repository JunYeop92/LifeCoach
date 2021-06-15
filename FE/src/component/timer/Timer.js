import MeasureTime from './MeasureTime.js';
import CumulativeTime from './CumulativeTime.js';
import WeeklyTime from './WeeklyTime.js';
import FocusRecord from './FocusRecord.js';
import Menu from './Menu.js';
import SelectTodo from './SelectTodo.js';
import { insertTime, getTodayTime, getWeeklyTime, getRecord } from '../../api/time.js';
import { getYmd, getWeek } from '../../util.js';

export default function Timer() {
    this.state = {
        todayTime: 0, // 분단위, max:24*60
        weeklyTime: 0,
        recordList: [],
        category: {
            id: '',
            name: '',
        },
        todo: [],
        selTodo: {
            id: '',
            name: '',
        },
    };
    this.component;
    this.$element;

    const initialize = () => {
        const $timerWrap = document.createElement('div');
        $timerWrap.id = 'timer-wrap';
        const $timerFooter = document.createElement('div');
        $timerFooter.id = 'timer-footer';

        this.$element = {
            $timerWrap,
            $timerFooter,
        };

        //FOCUS
        const measureTime = new MeasureTime({
            onSubmit: async ({ ymd, startDate, endDate, totalTime }) => {
                await insertTime({
                    categoryId: this.state.category.id,
                    todoId: this.state.selTodo.id,
                    ymd,
                    startDate,
                    endDate,
                    totalTime,
                });
                await this.getSetCommonState();
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

        const selectTodo = new SelectTodo({
            initialState: {
                todo: this.state.todo,
            },
            onSelect: ({ id, name }) => {
                this.setState({
                    ...this.state,
                    selTodo: {
                        id,
                        name,
                    },
                });
            },
        });

        const menu = new Menu({
            onClick: (id) => {
                $timerWrap.innerHTML = '';
                $timerFooter.innerHTML = '';
                eventMap[id]();
            },
        });
        const eventMap = {
            focus: () => {
                measureTime.attachNode($timerWrap);
                selectTodo.attachNode($timerFooter);
            },
            today: () => {
                cumulativeTime.attachNode($timerWrap);
                $timerFooter.innerHTML = `<div id='timer-category'>${this.state.category.name}</div>`;
            },
            weekly: () => {
                weeklyTime.attachNode($timerWrap);
                $timerFooter.innerHTML = `<div id='timer-category'>${this.state.category.name}</div>`;
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
            selectTodo,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;
        const { cumulativeTime, focusRecord, weeklyTime, selectTodo } = this.component;
        cumulativeTime.setState({
            time: this.state.todayTime,
        });
        weeklyTime.setState({
            time: this.state.weeklyTime,
        });
        focusRecord.setState({
            recordList: this.state.recordList,
        });
        selectTodo.setState({
            todo: this.state.todo,
        });
    };

    this.getSetCommonState = async () => {
        const categoryId = this.state.category.id;

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

        this.setState({
            ...this.state,
            recordList: resultRecord.data,
            todayTime: resultToday.data,
            weeklyTime: resultWeekly.data,
        });
    };
    // this.render = () => {};

    this.attachNode = ($target) => {
        //$header와 $content가 동시에 객체가 있는 경우는 없다.
        const { $header, $content } = $target;

        if ($header) {
            this.component.focusRecord.attachNode($header);
            return;
        }

        if ($content) {
            const { menu, measureTime, selectTodo } = this.component;
            const { $timerWrap, $timerFooter } = this.$element;

            menu.attachNode($content);
            $content.appendChild($timerWrap);
            $content.appendChild($timerFooter);
            //menu 기본 선택(default)
            measureTime.attachNode($timerWrap); 
            selectTodo.attachNode($timerFooter);
            return;
        }
    };

    initialize();
}
