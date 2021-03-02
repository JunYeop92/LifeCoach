export default function RecordTime({ $target }) {
    this.state = {
        totalTime: 0,
    };
    this.$element;

    this.initialize = () => {
        const $total = document.createElement('div');
        $total.id = 'total';
        $total.innerHTML = `<h1>Today</h1>
                            <span>TotalTime</span>
                            <span id='hour'>00</span>
                            <span>:</span> 
                            <span id='min'>00</span>`;
        $target.appendChild($total);
        this.$element = $total;
    };
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const hour = Math.floor(this.state.totalTime / 60);
        const min = this.state.totalTime % 60;

        this.$element.querySelector('#hour').innerText = hour > 9 ? hour : '0' + hour;
        this.$element.querySelector('#min').innerText = min > 9 ? min : '0' + min;
    };

    this.initialize();
}
