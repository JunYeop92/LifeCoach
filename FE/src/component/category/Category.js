import AddCategory from './AddCategory.js';
import ListCategory from './ListCategory.js';
import {addContent, listContents, delContent} from '../../api/category.js';

export default function Category({ $target, updateTimer }) {
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
                await addContent({ content });
                const result = await listContents();
                this.setState({
                    ...this.state,
                    list : result.data
                });
            },
        });
        
        const listCategory = new ListCategory({
            $target: $header,
            initialState: {
                list: this.state.list,
            },
            onDelete: async (id) => {
                await delContent({ id });
                const result = await listContents();
                this.setState({
                    ...this.state,
                    list : result.data
                });
            },
            onSelect: ({ _id, name }) => {
                updateTimer({ _id, name });
            },
        });

        this.component = {
            addCategory,
            listCategory,
        };

        const result = await listContents();
        this.setState({
            ...this.state,
            list : result.data
        });
    };

    this.setState =  (nextState) => {
        this.state = nextState;
        this.component.listCategory.setState({
            list: this.state.list,
        });
        updateTimer({categoryList : this.state.list});
    };
    this.render = () => {};

    this.initialize();
}
