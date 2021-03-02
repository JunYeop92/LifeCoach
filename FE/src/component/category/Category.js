import AddCategory from './AddCategory.js';

export default function Category() {
    this.$element;

    this.initialize = () => {
        const $container = document.createElement('div');
        const addCategory = new AddCategory({ $target: $container });
        this.$element = $container;
    };

    this.setState = () => {};
    this.render = ($target) => {
        $target.appendChild(this.$element);
    };

    this.initialize();
}
