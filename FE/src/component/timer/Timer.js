import MeasureTime from './MeasureTime.js';
import RecordTime from './RecordTime.js';
import ListCategory from './ListCategory.js';
import * as api from '../../api/category.js';
import { insertTime, getTotal } from '../../api/time.js';

export default function Timer() {
    this.state = {
        totalTime: 0, // 분단위, max:24*60
        list: [],
        selectedCategory: {
            _id: '',
            content: '',
        },
    };

    this.component;
    this.$element = document.createElement('div');

    this.initialize = () => {
        // getTotal({
        //     categoryId: '603f3af07e8ffe313c67999b',
        //     ymd: '20210310',
        // });
        const $container = this.$element;
        const measureTime = new MeasureTime({
            $target: $container,
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
        const recordTime = new RecordTime({ $target: $container });

        const listCategory = new ListCategory({
            $target: $container,
            initialState: {
                list: this.state.list,
                selectedCategory: this.state.selectedCategory,
            },
            onSelect: ({ _id, content }) => {
                this.setState({
                    ...this.state,
                    selectedCategory: { _id, content },
                });
            },
        });
        this.component = {
            measureTime,
            recordTime,
            listCategory,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;

        const { totalTime, list, selectedCategory } = this.state;
        const { recordTime, listCategory } = this.component;

        recordTime.setState({
            totalTime,
        });

        listCategory.setState({
            selectedCategory,
            list,
        });
    };

    this.setStateAPI = async () => {
        const result = await api.listContents();
        this.setState({
            ...this.state,
            list: result.data,
            selectedCategory: result.data[0],
        });
    };

    this.render = ($target) => {
        $target.appendChild(this.$element);
    };
    this.initialize();
    this.setStateAPI();
}
