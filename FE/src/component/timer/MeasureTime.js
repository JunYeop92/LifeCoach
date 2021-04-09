export default function MeasureTime({ onSubmit }) {
    this.state = {
        start: null, //Date형
        end: null, //Date형
        TIME_ID: null, //setTimeout 통제를 위한 변수
        hour: 0,
        min: 0,
    };
    this.$element = document.createElement('div');

    this.initialize = () => {
        this.$element.innerHTML = 
        `<div id='timer'>   
            <span id='hour'>00</span>
            <span>:</span> 
            <span id='min'>00</span>
        </div>
        <div id='btn'>
            <span id='start-btn'><i class="fas fa-play-circle"></i></span>
            <span id='end-btn' style='display:none'><i class="fas fa-stop-circle"></i></span>
        </div>`;
    };

    this.attachEvent = () => {
        this.$element.querySelector('#start-btn').addEventListener('click', (e) => {
            this.state.start = new Date();
            this.setState();
            console.log('start');
            this.$element.querySelector('#start-btn').style.display = 'none';
            this.$element.querySelector('#end-btn').style.display = 'inline-block';
        });

        this.$element.querySelector('#end-btn').addEventListener('click', (e) => {
            if (this.state.TIME_ID) {
                clearTimeout(this.state.TIME_ID);
                console.log('end');
                this.$element.querySelector('#start-btn').style.display = 'inline-block';
                this.$element.querySelector('#end-btn').style.display = 'none';

                const { hour, min } = this.state;
                const totalTime = hour * 60 + min;

                if (totalTime > 0) {
                    const ymd = getYmd(this.state.end);
                    onSubmit({
                        ymd,
                        startDate: this.state.start,
                        endDate: this.state.end,
                        totalTime: totalTime,
                    });
                } else {
                    alert('1분미만의 집중은 저장되지 않습니다.');
                }

                document.querySelector('#hour').innerText = '00';
                document.querySelector('#min').innerText = '00';
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

    this.initialize();
    this.attachEvent();
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
