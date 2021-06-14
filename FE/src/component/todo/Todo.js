import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import { addTodo, getTodo, delTodo, checkTodo } from '../../api/todo.js';
import TodoDate from './TodoDate.js';
import { getYmd } from "../../util.js";

export default function Todo({todoUpdate}) {
    this.state = {
        todo: [],
        category: {
            id: '',
            name: '',
        },
        date : new Date()
    };
    this.$element = document.createElement('div');
    this.component;

    const initialize = () => {
        this.$element.id = 'todo';
        
        const todoDate = new TodoDate({
            initalState : this.state.date,
            onChange : async (paramDate) => {
                this.setState({
                    ...this.state,
                    date : paramDate
                });
                await this.getSetCommonState(); 
            }
        });

        const todoList = new TodoList({
            initalState: {
                todo: this.state.todo,
            },
            onCheck : async (id) => {
                await checkTodo({id});
                await this.getSetCommonState();
            },
            onDelete : async (id) => {
                await delTodo({id});
                await this.getSetCommonState();
            }
        });

        const todoInput = new TodoInput({
            onSubmit: async (value) => {
                const ymd = getYmd(this.state.date); 
                await addTodo({
                    content : value,
                    categoryId : this.state.category.id,  
                    ymd  
                });
                await this.getSetCommonState();
                
            },
        });

        this.component = {
            todoList,
            todoInput,
            todoDate,
        };
    };

    this.setState = (nextState) => {
        this.state = nextState;
        const { todoList, todoDate } = this.component

        todoList.setState({
            todo : this.state.todo
        });

        todoDate.setState(this.state.date);
    };

    // this.render = () => {};

    this.attachNode = ($target) => {
        const { $content } = $target;
        const { todoList, todoInput, todoDate } = this.component;
        
        $content.appendChild(this.$element);
        todoDate.attachNode(this.$element);
        todoList.attachNode(this.$element);
        todoInput.attachNode(this.$element);
    }

    this.getSetCommonState = async () => {
        const ymd = getYmd(this.state.date);
        const result = await getTodo({ 
            categoryId : this.state.category.id, 
            ymd
        });
        this.setState({
            ...this.state,
            todo: result.data,
        });
        todoUpdate(result.data);
    }

    initialize();
}
