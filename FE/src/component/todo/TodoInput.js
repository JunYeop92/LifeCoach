export default function TodoInput({ onSubmit }) {
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'todo-add';
        this.$element.innerHTML = 
        `<input type='text' spellcheck='false' autofocus placeholder='New Todo'>
        <span id='btn'><i class="fas fa-plus"></i></span>`;
    })();

    // this.setState = () => {}
    // this.render= () => {}

    const attachEvent = (() => {
        const $inputBox = this.$element.getElementsByTagName('input')[0];
        this.$element.querySelector('#btn').addEventListener('click', () => {
            onSubmit($inputBox.value);
            $inputBox.value = '';
            $inputBox.focus();
        });

        $inputBox.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                onSubmit($inputBox.value);
                $inputBox.value = '';
                $inputBox.focus();
            }
        });
    })();

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    };
}
