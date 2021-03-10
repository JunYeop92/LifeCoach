export default function ListCategory({ $target, initialState, onSelect }) {
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
            .map((item) => `<li id='${item._id}'><span>${item.content}</span></li>`)
            .join('');
        this.$element.innerHTML = `<h3>${this.state.selectedCategory.content}</h3><ul>${htmlString}</ul>`;
    };
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.attachEvent = () => {
        const eventMap = {
            SPAN: (e) => {
                onSelect({
                    _id: e.target.parentNode.id,
                    content: e.target.textContent,
                });
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
