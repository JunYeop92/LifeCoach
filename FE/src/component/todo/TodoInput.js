export default function TodoInput({ onSubmit }) {
    // this.state;
    this.$element = document.createElement('div');

    const initialize = (() => {
        const $inputBox = document.createElement('input');
        $inputBox.id = 'todo-input';
        $inputBox.type = 'text';
        $inputBox.placeholder = '할 일 입력';
        this.$element.appendChild($inputBox);

        const $addBtn = document.createElement('button');
        $addBtn.id = 'add';
        $addBtn.innerHTML = '추가';
        this.$element.appendChild($addBtn);
        
    })();

    // this.setState = () => {}
    // this.render= () => {}

    const attachEvent = (() => {
        const $inputBox = this.$element.querySelector('#todo-input');
        this.$element.querySelector('#add').addEventListener("click", () => {
            onSubmit($inputBox.value);
            $inputBox.value = "";
            $inputBox.focus();
        })
    })();

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    }
}