import AddCategory from './AddCategory.js';
import ListCategory from './ListCategory.js';
import { addContent, listContents, delContent } from '../../api/category.js';

export default function Category({ $target, updateTimer, loading }) {
    this.state = {
        list: [],
    };
    this.component;

    this.initialize = async () => {
        const { $header } = $target;

        const listCategory = new ListCategory({
            $target: $header,
            initialState: {
                list: this.state.list,
            },
            onDelete: async (id) => {
                await delContent({ id });
                await getSetCommonState();
            },
            onSelect: ({ _id, name }) => {
                updateTimer({ _id, name });
            },
        });

        const addCategory = new AddCategory({
            $target: document.querySelector('#category .dropdown-list'),
            onAdd: async (content) => {
                await addContent({ content });
                await getSetCommonState();
                // const result = await listContents();
                // this.setState({
                //     ...this.state,
                //     list: result.data,
                // });
            },
        });

        this.component = {
            addCategory,
            listCategory,
        };
        
        //초기화 리스트
        getSetCommonState();
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
    };

    this.setState = (nextState) => {
        this.state = nextState;
        this.component.listCategory.setState({
            list: this.state.list,
        });
        updateTimer({ categoryList: this.state.list });
    };
    this.render = () => {};

    this.initialize();
}
