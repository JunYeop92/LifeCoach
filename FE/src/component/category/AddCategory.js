export default function AddCategory({ onAdd }) {
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'add';
        this.$element.innerHTML = `<input type='text' name='category' spellcheck='false' autofocus>
                                <span id='add-btn'><i class="fas fa-plus"></i></span>`;
    })();

    const attachEvent = (() => {
        const $input = this.$element.getElementsByTagName('input')[0];
        this.$element.querySelector('#add-btn').addEventListener('click', () => {
            onAdd($input.value);
            $input.value = '';
            $input.focus();
        });

        $input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                onAdd($input.value);
                $input.value = '';
                $input.focus();
            }
        });
    })();

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    };
}
