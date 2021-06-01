import AddCategory from './AddCategory.js';
import ListCategory from './ListCategory.js';
import { addContent, listContents, delContent } from '../../api/category.js';

export default function Category({ selCategory, loading }) {
    this.state = {
        list: [],
    };
    this.component;

    const initialize = async () => {
        const listCategory = new ListCategory({
            initialState: {
                list: this.state.list,
            },
            onDelete: async (id) => {
                await delContent({ id });
                await getSetCommonState();
            },
            onSelect: ({ _id, name }) => {
                selCategory({ _id, name });
            },
        });

        const addCategory = new AddCategory({
            onAdd: async (content) => {
                await addContent({ content });
                await getSetCommonState();
            },
        });

        this.component = {
            addCategory,
            listCategory,
        };
        
        getSetCommonState(); //초기화, App에서 첫번째
    };

    const getSetCommonState = async () => {
        loading.setState({
            isLoading: true,
        });
        const result = await listContents();
        this.setState({
            ...this.state,
            list: result.data,
        });
        loading.setState({
            isLoading: false,
        });
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.component.listCategory.setState({
            list: this.state.list,
        });
        //selCategory({ categoryList: this.state.list });
    };
    // this.render = () => {};

    this.attachNode = ($target) => {
        const { $header } = $target;
        const { listCategory, addCategory } = this.component;

        listCategory.attachNode($header);
        addCategory.attachNode(document.querySelector('#category .dropdown-list'));
    }

    initialize();
}
