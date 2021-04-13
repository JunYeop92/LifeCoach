import AddCategory from './AddCategory.js';
import ListCategory from './ListCategory.js';
import * as api from '../../api/category.js';

export default function Category({ $target, handleSelListCategory, handleDelListCategory }) {
    this.state = {
        list: [],
    };
    this.component;

    this.initialize = async () => {
        const { $header } = $target;

        const $container = document.createElement('div');
        const addCategory = new AddCategory({
            $target: $container,
            onAdd: async (content) => {
                await api.addContent({ content });
                await this.setState();
            },
        });

        const listCategory = new ListCategory({
            $target: $header,
            initialState: {
                list: this.state.list,
            },
            onDelete: async (id) => {
                await api.delContent({ id });
                await this.setState();
                handleDelListCategory();
            },
            onSelect: ({ _id, name }) => {
                handleSelListCategory({ _id, name });
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
