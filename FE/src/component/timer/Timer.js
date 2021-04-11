import MeasureTime from './MeasureTime.js';
import CumulativeTime from './CumulativeTime.js';
import FocusRecord from './FocusRecord.js';
import Menu from './Menu.js';
import * as api from '../../api/category.js';
import { insertTime, getTotal } from '../../api/time.js';

export default function Timer({$target}) {
    this.state = {
        todayTime: 0, // 분단위, max:24*60
        list: [],
        selectedCategory: {
            _id: '',
            name: '',
        },
        init: false,
    };
    this.component;

    this.initialize = () => {
        const {$header, $content} = $target
        const $timerWrap = document.createElement('div');
        $timerWrap.id = 'timer-wrap'
        const $timerTitle = document.createElement('div');
        $timerTitle.id = 'timer-title'
        $timerTitle.innerHTML = `<span>카테고리 선택</span>`;

        

        const menu = new Menu({
            $target: $content,
            onClick : (id) => {
                $timerWrap.innerHTML = '';
                eventMap[id]();
            }
        });
        $content.appendChild($timerWrap);
        $content.appendChild($timerTitle);

        const eventMap = {
            focus: () => {
                $timerWrap.appendChild(measureTime.$element);
            },
            today: () => {
                $timerWrap.appendChild(cumulativeTime.$element);
            },
            weekly: () =>{
                console.log('아직없음');
            }
        };

        const measureTime = new MeasureTime({
            onSubmit: ({ ymd, startDate, endDate, totalTime }) => {
                insertTime({
                    category: this.state.selectedCategory._id,
                    ymd,
                    startDate,
                    endDate,
                    totalTime,
                });
            },
        });
        $timerWrap.appendChild(measureTime.$element); //default
        
        const cumulativeTime = new CumulativeTime({
            initialState: {
                todayTime: this.state.todayTime,
            },
        });

        const focusRecord = new FocusRecord({
            $target: $header,
        })

        this.component = {
            menu,
            measureTime,
            cumulativeTime,
            focusRecord,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;

        const { todayTime, list, selectedCategory } = this.state;
        const { cumulativeTime } = this.component;

        cumulativeTime.setState({
            todayTime,
        });

        document.querySelector('#timer-title').innerHTML = `<span>${this.state.selectedCategory.name}</span>`;
    };


    this.render = ($target) => {
        $target.appendChild(this.$element);
    };
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
