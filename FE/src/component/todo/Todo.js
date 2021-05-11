import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';

export default function Todo({ }) {
    this.state = {
        todo: [],
    };
    this.$element = document.createElement('div');
    this.component;

    const initialize = () => {
        const todoList = new TodoList({
            $target,
            initalState: {
                todo: this.state.todo,
            },
        });

        const todoInput = new TodoInput({
            $target,
            onSubmit: {},
        });

        this.component = {
            todoList,
            todoInput,
        };
    };

    // this.setState = () => {};
    // this.render = () => {};

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    }

    initialize();
}
