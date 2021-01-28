export default function MeasureTime({ $target, setTotal }) {
    this.state = {
        start: null, //Date형
        end: null, //Date형
        TIME_ID: null, //setTimeout 통제를 위한 변수
        hour: 0,
        min: 0,
    };

    this.constructor = () => {
        const $timer = document.createElement('div');
        $timer.id = 'timer';
        $timer.innerHTML = `<span id='hour'>00</span>
                                <span>:</span> 
                                <span id='min'>00</span>`;
        $target.appendChild($timer);

        const $button = document.createElement('div');
        $button.innerHTML = `<button type='button' id='start-btn'>시작</button>
                            <button type='button' id='end-btn'>종료</button>`;
        $target.appendChild($button);
    };

    this.attachEvent = () => {
        document.querySelector('#start-btn').addEventListener('click', (e) => {
            this.state.start = new Date();
            this.setState();
            console.log('start');
        });
        document.querySelector('#end-btn').addEventListener('click', (e) => {
            if (this.state.TIME_ID) {
                clearTimeout(this.state.TIME_ID);
                const { hour, min } = this.state;
                const totalTime = hour * 60 + min;
                setTotal(totalTime);
                console.log('end');
            }
        });
    };

    this.setState = () => {
        this.state.end = new Date();
        const { start, end } = this.state;
        this.state.hour = Math.floor((end - start) / (60000 * 60));
        const hourRest = (end - start) % (60000 * 60);
        this.state.min = Math.floor(hourRest / 60000);
        this.state.TIME_ID = setTimeout(this.setState, 60000);
        this.render();
    };
    this.render = () => {
        const { hour, min } = this.state;
        document.querySelector('#hour').innerText = hour > 9 ? hour : '0' + hour;
        document.querySelector('#min').innerText = min > 9 ? min : '0' + min;
    };

    this.constructor();
    this.attachEvent();
}
