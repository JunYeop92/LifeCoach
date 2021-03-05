export default function AddCategory({ $target, onAdd }) {
    this.state = {
        category: '',
    };
    this.$element;

    this.initialize = () => {
        const $inputBox = document.createElement('div');
        $inputBox.id = 'add-category';
        $inputBox.innerHTML = `<input type='text' name='category' autofocus>
                                <button id='add'>추가</button>`;
        $target.appendChild($inputBox);

        this.$element = $inputBox;
    };

    this.attachEvent = () => {
        this.$element.querySelector('#add').addEventListener('click', () => {
            const $input = this.$element.getElementsByTagName('input')[0];
            onAdd($input.value);
            $input.value = '';
            $input.focus();
        });
    };

    this.render = () => {};

    this.initialize();
    this.attachEvent();
}
