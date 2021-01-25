import MeasureTime from './MeasureTime.js';

export default function App($target) {
    this.constructor = () => {
        const measureTime = new MeasureTime($target);
    };
    this.setState = () => {};
    this.render = () => {};

    this.constructor();
}
