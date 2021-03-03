import MeasureTime from './MeasureTime.js';
import RecordTime from './RecordTime.js';

export default function Timer() {
    this.state = {
        totalTime: 0, // 분단위, max:24*60
    };
    this.component;
    this.$element;

    this.initialize = () => {
        const $container = document.createElement('div');
        const measureTime = new MeasureTime({
            $target: $container,
            setTotal: (time) => {
                this.setState({
                    ...this.state,
                    totalTime: this.state.totalTime + time,
                });
            },
        });
        const recordTime = new RecordTime({ $target: $container });
        this.$element = $container;
        this.component = {
            measureTime,
            recordTime,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;
        const { totalTime } = this.state;

        this.component.recordTime.setState({
            totalTime,
        });
    };
    this.render = ($target) => {
        $target.appendChild(this.$element);
    };
    this.initialize();
}
