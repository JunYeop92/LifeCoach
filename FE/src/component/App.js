import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import { getTotal, getRecord } from '../api/time.js';
import { listContents } from '../api/category.js';

export default function App() {
    this.state = {
        category: {
            list: [],
        },
        timer: {
            todayTime: 0, // 분단위, max:24*60
            recordList: [],
            selectedCategory: {
                _id: '',
                name: '',
            },
        },
    };
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
            handleSelListCategory,
            handleDelListCategory,
        });
        const timer = new Timer({
            $target: { $header, $content },
        });
        this.component = {
            category,
            timer,
        };
        handleDelListCategory();
    };

    const handleDelListCategory = async () => {
        const result = await listContents();
        const resultRecord = await getRecord({categoryId : result.data[0]._id});

        this.state = {
            ...this.state,
            category: {
                list: result.data,
            },
            timer : {
                selectedCategory : {
                    _id: result.data[0]._id,
                     name: result.data[0].content,
                }
            }
        };
        this.component.timer.setState({
            ...timer.state,
            selectedCategory: { _id: result.data[0]._id, name: result.data[0].content },
            recordList: resultRecord.data,
        });
    };

    const handleSelListCategory = async ({ _id, name }) => {
        const ymd = getYmd(new Date());
        const resultToday = await getTotal({
            categoryId: _id,
            ymd,
        });
        const resultRecord = await getRecord({categoryId : _id});
        this.state = {
            ...this.state,
            timer : {
                selectedCategory : {
                    _id,
                    name,
                }
            }
        };
        this.component.timer.setState({
            ...timer.state,
            todayTime: resultToday.data,
            selectedCategory: { _id, name },
            recordList: resultRecord.data,
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
