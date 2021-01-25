export default function MeasureTime($target) {
    this.state = {
        start: null, //Date형
        end: null, //Date형
        TIME_ID: null, //setTimeout 통제를 위한 변수
    };

    this.constructor = () => {
        const $timer = document.createElement('div');
        $timer.id = 'timer';
        $timer.innerHTML = `<span id='today-hour'>00</span>
                                <span>:</span> 
                                <span id='today-min'>00</span>`;
        $target.appendChild($timer);

        const $button = document.createElement('div');
        $button.innerHTML = `<button type='button' id='start-btn'>시작</button>
                            <button type='button' id='end-btn'>종료</button>`;
        $target.appendChild($button);
    };

    const timeGo = () => {
        this.state.end = new Date();
        const { start, end } = this.state;
        const hour = Math.floor((end - start) / (60000 * 60));
        const hourRest = (end - start) % (60000 * 60);
        const min = Math.floor(hourRest / 60000);

        document.querySelector('#today-hour').innerText =
            hour > 9 ? hour : '0' + hour;
        document.querySelector('#today-min').innerText =
            min > 9 ? min : '0' + min;
        this.state.TIME_ID = setTimeout(timeGo, 60000);
    };

    this.attachEvent = () => {
        document.querySelector('#start-btn').addEventListener('click', (e) => {
            this.state.start = new Date();
            timeGo();
        });
        document.querySelector('#end-btn').addEventListener('click', (e) => {
            if (this.state.TIME_ID) {
                clearTimeout(this.state.TIME_ID);
                alert('end');
            }
        });
    };

    this.setState = () => {};
    this.render = () => {};

    this.constructor();
    this.attachEvent();
}
