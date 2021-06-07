export default function TodoDate({ initalState, onChange }) {
    this.state = initalState;
    this.$element = document.createElement('div');

    const toDateFormat = (paramDate) => {
        const dayNames = [
            '일요일',
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일',
        ];
        // getDay: 해당 요일(0 ~ 6)를 나타내는 정수를 반환한다.
        const day = dayNames[paramDate.getDay()];

        const year = paramDate.getFullYear();
        const month = paramDate.getMonth() + 1;
        const date = paramDate.getDate();

        const dateStr = `${year}년 ${month}월 ${date}일 ${day}`;
        return dateStr;
    }

    const initialize = (() => {
        const dateStr = toDateFormat(this.state);
        this.$element.id = 'todo-date';
        this.$element.innerHTML = `
            <button type="button" class="btn-cal prev"></button>
            <div id='date-str'>${dateStr}</div>
            <button type="button" class="btn-cal next"></button>
        `;
    })();

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render= () => {
        const dateStr = toDateFormat(this.state);
        this.$element.querySelector('#date-str').innerText = dateStr;
    }

    const attachEvent = (() => {
        const $btnPrev = this.$element.querySelector('.btn-cal.prev');
        const $btnNext = this.$element.querySelector('.btn-cal.next');

        $btnPrev.addEventListener("click", () => {
            //Date 객체 깊은복사
            const copyDate = new Date(this.state);
            copyDate.setDate(this.state.getDate() - 1);
            onChange(copyDate);
        });

        $btnNext.addEventListener("click", () => {
            const copyDate = new Date(this.state);
            copyDate.setDate(this.state.getDate() + 1);
            onChange(copyDate);
        });
    })();

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    };
}
