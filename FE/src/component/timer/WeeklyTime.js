export default function WeeklyTime({ initialState }) {
    this.state = initialState;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'weekly';
        this.$element.innerHTML = 
        `<div id='timer'>   
            <span id='hour'>00</span>
            <span>:</span> 
            <span id='min'>00</span>
        </div>`;
    })();

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const hour = Math.floor(this.state.time / 60);
        const min = this.state.time % 60;
        this.$element.querySelector('#hour').innerText = hour > 9 ? hour : '0' + hour;
        this.$element.querySelector('#min').innerText = min > 9 ? min : '0' + min;
    };

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    }
}
