import Timer from './timer/Timer.js';
import Category from './category/Category.js';
import * as api from '../../api/category.js';

function App() {
    this.initialize = () => {
        const timer = new Timer();
        const category = new Category();
    };
    this.setState = () => {};
    this.render = () => {};

    this.initialize();
}
