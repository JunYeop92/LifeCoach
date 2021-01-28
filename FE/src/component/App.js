import MeasureTime from './MeasureTime.js';
import RecordTime from './RecordTime.js';

export default function App($target) {
    this.state = {
        totalTime: 0, // 분단위, max:24*60
    };

    this.constructor = () => {};

    const measureTime = new MeasureTime({
        $target,
        setTotal: (time) => {
            this.setState({
                ...this.state,
                totalTime: this.state.totalTime + time,
            });
        },
    });
    const recordTime = new RecordTime({ $target });

    this.setState = (nextState) => {
        this.state = nextState;
        const { totalTime } = this.state;

        recordTime.setState({
            totalTime,
        });
    };
    this.render = () => {};

    this.constructor();
}
