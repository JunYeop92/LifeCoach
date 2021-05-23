import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import { addTodo, getTodo, delTodo, checkTodo } from '../../api/todo.js';

export default function Todo({ loading }) {
    this.state = {
        todo: [],
        category: {
            id: '',
            name: '',
        },
    };
    this.$element = document.createElement('div');
    this.component;

    const initialize = () => {
        this.$element.id = 'todo';
        this.$element.innerHTML = `
            <div id='todo-title'> 2021년 5월 20일 목요일 </div>
        `

        const todoList = new TodoList({
            initalState: {
                todo: this.state.todo,
            },
            onCheck : async (id) => {
                await checkTodo({id});
                await getSetCommonState();
            },
            onDelete : async (id) => {
                await delTodo({id});
                await getSetCommonState();
            }
        });

        const todoInput = new TodoInput({
            onSubmit: async (value) => {
                await addTodo({
                    content : value,
                    categoryId : this.state.category.id,    
                });
                await getSetCommonState();
                
            },
        });

        this.component = {
            todoList,
            todoInput,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;
        const { todoList } = this.component

        todoList.setState({
            todo : this.state.todo
        })

    };

    // this.render = () => {};

    this.attachNode = ($target) => {
        const { $content } = $target;
        const { todoList, todoInput } = this.component;
        
        $content.appendChild(this.$element);

        todoList.attachNode(this.$element);
        todoInput.attachNode(this.$element);
    }

    const getSetCommonState = async () => {
        loading.setState({
            isLoading: true,
        });
        const result = await getTodo({ categoryId : this.state.category.id });
        this.setState({
            ...this.state,
            todo: result.data,
        });
        loading.setState({
            isLoading: false,
        });
    }

    initialize();
}
