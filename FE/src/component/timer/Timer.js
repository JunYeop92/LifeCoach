import MeasureTime from './MeasureTime.js';
import CumulativeTime from './CumulativeTime.js';
import ListCategory from './ListCategory.js';
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
            content: '',
        },
        init: false,
    };
    this.component;

    this.initialize = () => {
        const {$header, $content} = $target
        const $timerWrap = document.createElement('div');
        $timerWrap.id = 'timer-wrap'

        const menu = new Menu({
            $target: $content,
            onClick : (id) => {
                $timerWrap.innerHTML = '';
                eventMap[id]();
            }
        });
        $content.appendChild($timerWrap);
        

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

        // const listCategory = new ListCategory({
        //     $target: $content,
        //     initialState: {
        //         list: this.state.list,
        //         selectedCategory: this.state.selectedCategory,
        //     },
        //     onSelect: ({ _id, content }) => {
        //         this.setState({
        //             ...this.state,
        //             selectedCategory: { _id, content },
        //         });

        //         this.setStateAPI();
        //     },
        // });

        const focusRecord = new FocusRecord({
            $target: $header,
        })

        this.component = {
            menu,
            measureTime,
            cumulativeTime,
            // listCategory,
            focusRecord,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;

        const { todayTime, list, selectedCategory } = this.state;
        // const { cumulativeTime, listCategory } = this.component;
        const { cumulativeTime } = this.component;

        cumulativeTime.setState({
            todayTime,
        });

        // listCategory.setState({
        //     selectedCategory,
        //     list,
        // });
    };

    // this.setStateAPI = async () => {
    //     if (!this.state.init) {
    //         //카테고리 리스트
    //         const resultCate = await api.listContents();
    //         this.setState({
    //             ...this.state,
    //             list: resultCate.data,
    //             selectedCategory: resultCate.data[0],
    //             init: true,
    //         });
    //     }
    //     //오늘 집중시간
    //     const ymd = getYmd(new Date());
    //     const resultToday = await getTotal({
    //         categoryId: this.state.selectedCategory._id,
    //         ymd,
    //     });
    //     this.setState({
    //         ...this.state,
    //         todayTime: resultToday.data,
    //     });
    // };

    this.render = ($target) => {
        $target.appendChild(this.$element);
    };
    this.initialize();
    // this.setStateAPI();
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
