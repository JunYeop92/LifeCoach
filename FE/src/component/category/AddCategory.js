export default function AddCategory({ $target, onAdd }) {
    this.state = {
        category: '',
    };
    this.$element;

    this.initialize = () => {
        const $inputBox = document.createElement('div');
        $inputBox.id = 'add';
        $inputBox.innerHTML = `<input type='text' name='category' spellcheck='false' autofocus>
                                <span id='add-btn'><i class="fas fa-plus"></i></span>`;
        $target.appendChild($inputBox);

        this.$element = $inputBox;
    };

    this.attachEvent = () => {
        this.$element.querySelector('#add-btn').addEventListener('click', () => {
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
