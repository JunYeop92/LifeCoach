export default function AddCategory({ $target }) {
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

    this.initialize();
}
