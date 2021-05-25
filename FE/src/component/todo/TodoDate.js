export default function TodoDate() {
    this.$element = document.createElement('div');

    const initialize = (() => {
        const today = new Date();

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
        const day = dayNames[today.getDay()];

        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();

        const now = `${year}년 ${month}월 ${date}일 ${day}`;

        this.$element.id = 'todo-date';
        this.$element.innerHTML = `${now}`;
    })();

    // this.setState = () => {}
    // this.render= () => {}

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    };
}
