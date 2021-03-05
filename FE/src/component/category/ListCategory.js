export default function ListCategory({ $target, initialState, onDelete }) {
    this.state = initialState;
    this.$element;

    this.initialize = () => {
        const $list = document.createElement('div');
        $list.id = 'category-list';
        $target.appendChild($list);
        this.$element = $list;
    };
    this.render = () => {
        const htmlString = this.state.list
            .map(
                (item) =>
                    `<li id='${item._id}'>${item.content}<button id='${item._id}'>삭제</button></li>`
            )
            .join('');
        this.$element.innerHTML = htmlString;
    };
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.attachEvent = () => {
        const eventMap = {
            BUTTON: (e) => {
                onDelete(e.target.id);
            },
        };

        const otherWise = () => {
            console.log('otherwise');
        };

        this.$element.addEventListener('click', (e) => {
            (eventMap[e.target.tagName] || otherWise)(e);
        });
    };

    this.initialize();
    this.render();
    this.attachEvent();
}
