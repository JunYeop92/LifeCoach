export default function Loading({initialState}){
    this.state = initialState;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'loading';
        this.$element.innerHTML='<span><i class="fas fa-fan fa-spin fa-6x"></i></span>'
    })();

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$element.style.display = this.state.isLoading ? 'flex' : 'none';
    }

    const attachNode = (() => {
        const $root = document.querySelector('#app');
        $root.appendChild(this.$element)
    })();
}