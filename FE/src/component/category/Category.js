import AddCategory from './AddCategory.js';
import ListCategory from './ListCategory.js';
import * as api from '../../api/category.js';

export default function Category() {
    this.state = {
        list: [],
    };
    this.component;
    this.$element = document.createElement('div');

    this.initialize = async () => {
        const $container = this.$element;
        const addCategory = new AddCategory({
            $target: $container,
            onAdd: async (content) => {
                await api.addContent({ content });
                await this.setState();
            },
        });

        const listCategory = new ListCategory({
            $target: $container,
            initialState: {
                list: this.state.list,
            },
            onDelete: async (id) => {
                await api.delContent({ id });
                await this.setState();
            },
        });

        this.component = {
            addCategory,
            listCategory,
        };

        await this.setState();
    };

    this.setState = async () => {
        const result = await api.listContents();
        this.state = {
            ...this.state,
            list: result.data,
        };
        this.component.listCategory.setState({
            list: this.state.list,
        });
    };

    this.initialize();

    this.render = ($target) => {
        $target.appendChild(this.$element);
    };
}
